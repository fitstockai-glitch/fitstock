import { Heart, Download, Crown } from "lucide-react";
import { useState } from "react";
import { Photo } from "@/data/photos";
import { Button } from "@/components/ui/button";

interface PhotoCardProps {
  photo: Photo;
}

const PhotoCard = ({ photo }: PhotoCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(photo.imageUrl, "_blank");
  };

  return (
    <div 
      className="group relative overflow-hidden rounded-xl bg-muted break-inside-avoid mb-4 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={photo.imageUrl}
        alt={photo.title}
        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      
      {/* Overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
        isHovered ? "opacity-100" : "opacity-0"
      }`}>
        {/* Premium badge - always visible */}
        {photo.isPremium && (
          <div className="absolute top-3 left-3">
            <span className="flex items-center gap-1 bg-primary text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-full">
              <Crown size={12} />
              Premium
            </span>
          </div>
        )}

        {/* Top right actions */}
        <div className={`absolute top-3 right-3 flex gap-2 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}>
          <Button
            variant="secondary"
            size="icon"
            className="h-9 w-9 rounded-full bg-white/90 hover:bg-white text-foreground shadow-md"
            onClick={handleLike}
          >
            <Heart size={16} className={isLiked ? "fill-red-500 text-red-500" : ""} />
          </Button>
        </div>

        {/* Bottom content */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-white/80 text-xs mb-0.5">by {photo.photographer}</p>
            </div>
            
            <Button
              size="sm"
              className="rounded-full bg-white hover:bg-white/90 text-foreground font-medium shadow-md"
              onClick={handleDownload}
            >
              <Download size={14} className="mr-1.5" />
              Download
            </Button>
          </div>
        </div>
      </div>

      {/* Photographer badge - visible when not hovered (like Studio.Stock) */}
      {!isHovered && (
        <div className="absolute bottom-3 left-3">
          <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">
            by /{photo.photographer.split(' ')[0]}
          </span>
        </div>
      )}
    </div>
  );
};

export default PhotoCard;
