import { useParams } from "react-router-dom";
import FitStockHeader from "../components/header/FitStockHeader";
import Footer from "../components/footer/Footer";
import MasonryGallery from "../components/photo/MasonryGallery";
import { photos } from "../data/photos";

const TagPage = () => {
  const { tag } = useParams();
  const activeTag = tag || "";

  // Filter photos that contain this tag
  const filteredPhotos = photos.filter((p) =>
    p.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase())
  );

  // Fall back to all photos if no match (for demo)
  const displayPhotos = filteredPhotos.length > 0 ? filteredPhotos : photos;

  return (
    <div className="min-h-screen bg-background">
      <FitStockHeader />

      <div className="px-4 md:px-8 pt-8 pb-4">
        <p className="text-sm text-muted-foreground mb-1">タグ</p>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">#{activeTag}</h1>
      </div>

      <main>
        <MasonryGallery photos={displayPhotos} />
      </main>

      <Footer />
    </div>
  );
};

export default TagPage;
