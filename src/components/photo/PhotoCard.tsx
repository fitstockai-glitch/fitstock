import { Heart, Download, Crown } from "lucide-react";
import { useState } from "react";
import { Photo } from "@/data/photos";
import { Button } from "@/components/ui/button";

interface PhotoCardProps {
  photo: Photo;
}

const PhotoCard = ({ photo }: PhotoCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(photo.likes);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Download functionality will be implemented later
    window.open(photo.imageUrl, "_blank");
  };

  return (
    <div className="group relative overflow-hidden rounded-lg bg-muted break-inside-avoid mb-4">
      <img
        src={photo.imageUrl}
        alt={photo.title}
        className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      
      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {/* Top badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {photo.isPremium && (
            <span className="flex items-center gap-1 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
              <Crown size={12} />
              Premium
            </span>
          )}
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-medium text-sm mb-1">{photo.title}</h3>
          <p className="text-white/70 text-xs mb-3">by {photo.photographer}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-white/80 text-xs">
              <span className="flex items-center gap-1">
                <Heart size={14} className={isLiked ? "fill-primary text-primary" : ""} />
                {likes}
              </span>
              <span className="flex items-center gap-1">
                <Download size={14} />
                {photo.downloads}
              </span>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:text-primary hover:bg-white/20"
                onClick={handleLike}
              >
                <Heart size={18} className={isLiked ? "fill-primary text-primary" : ""} />
              </Button>
              <Button
                variant="default"
                size="sm"
                className="h-8 bg-primary hover:bg-primary-hover text-primary-foreground"
                onClick={handleDownload}
              >
                <Download size={14} className="mr-1" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;
