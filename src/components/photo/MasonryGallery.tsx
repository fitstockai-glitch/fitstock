import { useState, useEffect, useRef, useCallback } from "react";
import { Photo } from "@/types/photo";
import PhotoCard from "./PhotoCard";
import Masonry from "react-masonry-css";

interface MasonryGalleryProps {
  photos: Photo[];
}

const breakpointColumns = {
  default: 4,
  1280: 4,
  1024: 3,
  768: 2,
  640: 1,
};

const MasonryGallery = ({ photos }: MasonryGalleryProps) => {
  const [displayedPhotos, setDisplayedPhotos] = useState<Photo[]>([]);
  const batchRef = useRef(0);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const lastLoadTime = useRef(0);

  const generateBatch = useCallback((batchNum: number): Photo[] => {
    const shuffled = [...photos].sort(() => Math.random() - 0.5);
    return shuffled.map((p, i) => ({
      ...p,
      id: `${p.id}-b${batchNum}-${i}`,
      imageUrl: `${p.imageUrl}`,
    }));
  }, [photos]);

  const loadMore = useCallback(() => {
    if (photos.length === 0) return;

    const now = Date.now();
    if (now - lastLoadTime.current < 50) return;
    lastLoadTime.current = now;

    const next1 = batchRef.current + 1;
    const next2 = next1 + 1;
    batchRef.current = next2;

    const batch1 = generateBatch(next1);
    const batch2 = generateBatch(next2);

    setDisplayedPhotos((current) => [...current, ...batch1, ...batch2]);
  }, [photos, generateBatch]);

  useEffect(() => {
    if (photos.length > 0) {
      batchRef.current = 0;
      setDisplayedPhotos([...photos]);
    }
  }, [photos]);

  // Intersection Observer
  useEffect(() => {
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
  }, [loadMore]);

  // Backup: scroll listener
  useEffect(() => {
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
  }, [loadMore]);

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
