import { Photo } from "@/data/photos";
import PhotoCard from "./PhotoCard";
import { useState, useEffect, useRef, useCallback } from "react";
import Masonry from "react-masonry-css";

interface MasonryGalleryProps {
  photos: Photo[];
}

const breakpointColumns = {
  default: 4,
  1280: 4,
  1024: 3,
  768: 2,
};

const MasonryGallery = ({ photos }: MasonryGalleryProps) => {
  const [displayedPhotos, setDisplayedPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const loaderRef = useRef<HTMLDivElement>(null);
  const photosPerPage = 8;

  // Generate infinite photos by cycling through the original set
  const getMorePhotos = useCallback((pageNum: number) => {
    const startIndex = (pageNum - 1) * photosPerPage;
    const newPhotos: Photo[] = [];
    
    for (let i = 0; i < photosPerPage; i++) {
      const originalIndex = (startIndex + i) % photos.length;
      const photo = photos[originalIndex];
      newPhotos.push({
        ...photo,
        id: `${photo.id}-${pageNum}-${i}`,
      });
    }
    
    return newPhotos;
  }, [photos]);

  // Initial load
  useEffect(() => {
    if (photos.length > 0) {
      setDisplayedPhotos(getMorePhotos(1));
    }
  }, [photos, getMorePhotos]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Load more photos when page changes
  useEffect(() => {
    if (page > 1) {
      const newPhotos = getMorePhotos(page);
      setDisplayedPhotos((prev) => [...prev, ...newPhotos]);
    }
  }, [page, getMorePhotos]);

  return (
    <div className="px-4 md:px-8 py-6">
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex -ml-4 w-auto"
        columnClassName="pl-4 bg-clip-padding"
      >
        {displayedPhotos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </Masonry>
      
      {/* Loader trigger */}
      <div 
        ref={loaderRef} 
        className="h-20 flex items-center justify-center text-muted-foreground"
      >
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
};

export default MasonryGallery;
