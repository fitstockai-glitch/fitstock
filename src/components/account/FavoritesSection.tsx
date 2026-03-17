import { useState } from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { usePhotos } from "@/hooks/usePhotos";

const FavoritesSection = () => {
  const { data: photos = [] } = usePhotos();
  const [favorites, setFavorites] = useState(photos.slice(0, 20));

  const handleRemove = (id: string) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div>
      {favorites.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          まだお気に入り登録した写真がありません。
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
                />
              </Link>
              {/* Remove button on hover */}
              <button
                className="absolute top-2 right-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/90 hover:bg-white text-xs font-medium text-foreground shadow-sm"
                onClick={() => handleRemove(item.id)}
              >
                <Heart size={12} className="fill-red-500 text-red-500" />
                お気に入り削除
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesSection;
