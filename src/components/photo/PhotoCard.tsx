import { Heart, Download } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Photo } from "@/data/photos";
import { Button } from "@/components/ui/button";
import DownloadModal from "@/components/photo/DownloadModal";

interface PhotoCardProps {
  photo: Photo;
}

const PhotoCard = ({ photo }: PhotoCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDownloadModalOpen(true);
  };

  return (
    <>
    <div className="break-inside-avoid mb-4">
      <Link to={`/photo/${photo.id}`}>
        <div 
          className="group relative overflow-hidden rounded-xl bg-muted cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={photo.imageUrl}
            alt={photo.title}
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-100 lg:opacity-0"
          }`}>
            <div className="absolute top-3 right-3 flex gap-2">
              <Button
                variant="secondary"
                size="icon"
                className="h-9 w-9 rounded-full bg-white/90 hover:bg-white text-foreground shadow-md"
                onClick={handleLike}
              >
                <Heart size={16} className={isLiked ? "fill-red-500 text-red-500" : ""} />
              </Button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-end justify-end">
                <Button
                  size="sm"
                  className="rounded-full bg-white hover:bg-white/90 text-foreground font-medium shadow-md"
                  onClick={handleDownload}
                >
                  <Download size={14} />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
    <DownloadModal open={isDownloadModalOpen} onOpenChange={setIsDownloadModalOpen} />
    </>
  );
};

export default PhotoCard;
