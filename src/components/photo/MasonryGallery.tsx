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
};

const MasonryGallery = ({ photos }: MasonryGalleryProps) => {
  return (
    <div className="px-4 md:px-8 pt-4 pb-0">
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex -ml-4 w-auto"
        columnClassName="pl-4 bg-clip-padding"
      >
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </Masonry>
    </div>
  );
};

export default MasonryGallery;
