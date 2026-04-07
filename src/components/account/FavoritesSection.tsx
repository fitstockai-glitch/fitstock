import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavoritePhotos, useToggleFavorite } from "@/hooks/useFavorites";
import { useTranslation } from "react-i18next";

const FavoritesSection = () => {
  const { data: favorites = [], isLoading } = useFavoritePhotos();
  const toggleFavorite = useToggleFavorite();
  const { t } = useTranslation();

  const handleRemove = (photoId: string) => {
    toggleFavorite.mutate({ photoId, isFavorited: true });
  };

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">{t("common.loading")}</p>;
  }

  return (
    <div>
      {favorites.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          {t("favorites.empty")}
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {favorites.map((item) => (
            <div key={item.id} className="group relative aspect-square overflow-hidden bg-muted rounded-sm">
              <Link to={`/photo/${item.id}`}>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </Link>
              <button
                className="absolute top-2 right-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/90 hover:bg-white text-xs font-medium text-foreground shadow-sm"
                onClick={() => handleRemove(item.id)}
              >
                <Heart size={12} className="fill-red-500 text-red-500" />
                {t("favorites.remove")}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesSection;
