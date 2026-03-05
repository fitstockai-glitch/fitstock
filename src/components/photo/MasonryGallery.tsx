import { useState, useEffect, useRef, useCallback } from "react";
import { Photo } from "@/data/photos";
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
  const isLoadingRef = useRef(false);

  const generateBatch = useCallback((batchNum: number): Photo[] => {
    const shuffled = [...photos].sort(() => Math.random() - 0.5);
    return shuffled.map((p, i) => ({
      ...p,
      id: `${p.id}-b${batchNum}-${i}`,
      imageUrl: `${p.imageUrl}&sig=${batchNum}-${i}`,
    }));
  }, [photos]);

  const loadMore = useCallback(() => {
    if (isLoadingRef.current || photos.length === 0) return;
    isLoadingRef.current = true;

    const next = batchRef.current + 1;
    batchRef.current = next;

    // Load 2 batches at once for speed
    const batch1 = generateBatch(next);
    const next2 = next + 1;
    batchRef.current = next2;
    const batch2 = generateBatch(next2);

    setDisplayedPhotos((current) => [...current, ...batch1, ...batch2]);

    // Allow next load on next frame
    requestAnimationFrame(() => {
      isLoadingRef.current = false;
    });
  }, [photos, generateBatch]);

  // Load initial photos immediately
  useEffect(() => {
    if (photos.length > 0 && displayedPhotos.length === 0) {
      batchRef.current = 1;
      setDisplayedPhotos(photos);
      // Preload second batch immediately
      const batch2 = generateBatch(2);
      batchRef.current = 2;
      setDisplayedPhotos((c) => [...c, ...batch2]);
    }
  }, [photos]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "8000px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
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

      {/* Sentinel element for infinite scroll trigger */}
      <div ref={sentinelRef} className="w-full h-10" />
    </div>
  );
};

export default MasonryGallery;
