import { useState, useEffect, useRef, useCallback } from "react";
import { Photo } from "@/types/photo";
import PhotoCard from "./PhotoCard";
import Masonry from "react-masonry-css";
import { extractBasePhotoId } from "@/lib/utils";

function dedupePhotosById(photos: Photo[]): Photo[] {
  const seen = new Set<string>();
  const out: Photo[] = [];
  for (const p of photos) {
    const id = extractBasePhotoId(p.id);
    if (seen.has(id)) continue;
    seen.add(id);
    out.push({ ...p, id });
  }
  return out;
}

interface MasonryGalleryProps {
  photos: Photo[];
  infinite?: boolean;
}

const breakpointColumns = {
  default: 4,
  1280: 4,
  1024: 3,
  768: 2,
  640: 1,
};

const MasonryGallery = ({ photos, infinite = true }: MasonryGalleryProps) => {
  const [displayedPhotos, setDisplayedPhotos] = useState<Photo[]>([]);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const lastLoadTime = useRef(0);

  const loadMore = useCallback(() => {
    if (!infinite) return;
    const pool = dedupePhotosById(photos);
    if (pool.length === 0) return;

    const now = Date.now();
    if (now - lastLoadTime.current < 50) return;
    lastLoadTime.current = now;

    setDisplayedPhotos((current) => {
      const seen = new Set(current.map((p) => extractBasePhotoId(p.id)));
      const remaining = pool.filter((p) => !seen.has(extractBasePhotoId(p.id)));
      if (remaining.length === 0) return current;

      const shuffled = [...remaining].sort(() => Math.random() - 0.5);
      const chunkSize = Math.min(24, remaining.length);
      return [...current, ...shuffled.slice(0, chunkSize)];
    });
  }, [photos, infinite]);

  useEffect(() => {
    setDisplayedPhotos(dedupePhotosById(photos));
  }, [photos]);

  // Intersection Observer
  useEffect(() => {
    if (!infinite) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "3000px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore, infinite]);

  // Backup: scroll listener
  useEffect(() => {
    if (!infinite) return;
    const handleScroll = () => {
      const sentinel = sentinelRef.current;
      if (!sentinel) return;
      const rect = sentinel.getBoundingClientRect();
      if (rect.top < window.innerHeight + 8000) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore, infinite]);

  return (
    <div className="px-4 md:px-8 pt-4 pb-0">
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex -ml-4 w-auto"
        columnClassName="pl-4 bg-clip-padding"
      >
        {displayedPhotos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </Masonry>

      <div ref={sentinelRef} className="w-full h-10" />
    </div>
  );
};

export default MasonryGallery;
