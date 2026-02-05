import { useState } from "react";
import { Heart, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const initialFavorites = [
  {
    id: "4",
    title: "Tokyo Night",
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=200",
  },
  {
    id: "5",
    title: "Forest Path",
    imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=200",
  },
  {
    id: "6",
    title: "Cherry Blossoms",
    imageUrl: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=200",
  },
  {
    id: "7",
    title: "Northern Lights",
    imageUrl: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=200",
  },
];

const FavoritesSection = () => {
  const [favorites, setFavorites] = useState(initialFavorites);

  const handleRemove = (id: string) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDownload = (imageUrl: string) => {
    window.open(imageUrl.replace("w=200", "w=1920"), "_blank");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">お気に入り一覧</CardTitle>
      </CardHeader>
      <CardContent>
        {favorites.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            まだお気に入り登録した写真がありません。
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {favorites.map((item) => (
              <div key={item.id} className="group relative">
                <div className="aspect-square rounded-lg overflow-hidden bg-muted relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay with actions */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 rounded-full"
                      onClick={() => handleDownload(item.imageUrl)}
                    >
                      <Download size={14} />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 rounded-full"
                      onClick={() => handleRemove(item.id)}
                    >
                      <Heart size={14} className="fill-red-500 text-red-500" />
                    </Button>
                  </div>
                </div>
                <p className="mt-2 text-sm font-medium text-foreground truncate">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FavoritesSection;
