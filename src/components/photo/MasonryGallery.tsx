import { Photo } from "@/data/photos";
import PhotoCard from "./PhotoCard";

interface MasonryGalleryProps {
  photos: Photo[];
}

const MasonryGallery = ({ photos }: MasonryGalleryProps) => {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 px-4 md:px-8 py-6">
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} />
      ))}
    </div>
  );
};

export default MasonryGallery;
