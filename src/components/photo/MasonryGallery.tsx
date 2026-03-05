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

const BATCH_SIZE = 12;

const MasonryGallery = ({ photos }: MasonryGalleryProps) => {
  const [displayedPhotos, setDisplayedPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [batchCount, setBatchCount] = useState(0);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Generate a new batch of photos with unique keys by shuffling and offsetting IDs
  const loadMore = useCallback(() => {
    if (loading || photos.length === 0) return;
    setLoading(true);

    setBatchCount((prev) => {
      const nextBatch = prev + 1;
      const shuffled = [...photos].sort(() => Math.random() - 0.5);
      const newPhotos = shuffled.map((p, i) => ({
        ...p,
        id: `${p.id}-batch${nextBatch}-${i}`,
        imageUrl: `${p.imageUrl}&sig=${nextBatch}-${i}`,
      }));
      setDisplayedPhotos((current) => [...current, ...newPhotos]);
      return nextBatch;
    });
    setLoading(false);
  }, [loading, photos]);

  // Load initial batch
  useEffect(() => {
    if (photos.length > 0 && displayedPhotos.length === 0) {
      setDisplayedPhotos(photos);
      setBatchCount(1);
    }
  }, [photos]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMore();
        }
      },
      { rootMargin: "8000px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore, loading]);

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

      {loading && (
        <div className="flex justify-center py-8">
          <div className="w-6 h-6 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default MasonryGallery;
