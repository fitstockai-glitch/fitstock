import { Heart, Download } from "lucide-react";
import { useState, memo, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Photo } from "@/types/photo";
import { Button } from "@/components/ui/button";
import DownloadModal from "@/components/photo/DownloadModal";
import { useAuth } from "@/contexts/AuthContext";
import { useFavoriteIds, useToggleFavorite } from "@/hooks/useFavorites";
import { useDownload } from "@/hooks/useDownload";
import { extractBasePhotoId } from "@/lib/utils";

interface PhotoCardProps {
  photo: Photo;
}

const PhotoCard = memo(({ photo }: PhotoCardProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: favoriteIds } = useFavoriteIds();
  const toggleFavorite = useToggleFavorite();
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { requestDownload, modalState, closeModal, downloadAfterWait, isDownloading } = useDownload();

  const baseId = extractBasePhotoId(photo.id);
  const isLiked = useMemo(() => favoriteIds?.has(baseId) ?? false, [favoriteIds, baseId]);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      navigate("/login");
      return;
    }
    toggleFavorite.mutate({ photoId: baseId, isFavorited: isLiked });
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    requestDownload(baseId);
  };

  // Estimate aspect ratio from photo dimensions for skeleton
  const aspectRatio = photo.height / photo.width;

  return (
    <>
    <div className="break-inside-avoid mb-4">
      <Link to={`/photo/${baseId}`}>
        <div 
          className="group relative overflow-hidden rounded-xl bg-muted cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Skeleton placeholder */}
          {!isLoaded && (
            <div
              className="w-full animate-pulse bg-muted"
              style={{ paddingBottom: `${aspectRatio * 100}%` }}
            />
          )}
          <img
            src={photo.imageUrl}
            alt={photo.title}
            className={`pointer-events-none select-none w-full h-auto object-cover transition-all duration-500 group-hover:scale-105 ${
              isLoaded ? "opacity-100" : "opacity-0 absolute inset-0"
            }`}
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            onContextMenu={(e) => e.preventDefault()}
          />
          
          {/* Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-100 lg:opacity-0"
          }`}>
            <div className="absolute top-3 right-3 lg:flex gap-2 hidden">
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
              <div className="flex items-end justify-between">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-9 w-9 rounded-full bg-white/90 hover:bg-white text-foreground shadow-md lg:hidden"
                  onClick={handleLike}
                >
                  <Heart size={16} className={isLiked ? "fill-red-500 text-red-500" : ""} />
                </Button>
                <Button
                  size="sm"
                  className="rounded-full bg-white hover:bg-white/90 text-foreground font-medium shadow-md ml-auto"
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
    <DownloadModal
      open={modalState.open}
      onOpenChange={(open) => {
        if (!open) closeModal();
      }}
      mode={modalState.mode}
      onDownload={downloadAfterWait}
      isDownloading={isDownloading}
    />
    </>
  );
});

PhotoCard.displayName = "PhotoCard";

export default PhotoCard;
