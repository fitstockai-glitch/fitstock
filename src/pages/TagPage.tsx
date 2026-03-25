import { useParams, useSearchParams } from "react-router-dom";
import FitStockHeader from "../components/header/FitStockHeader";
import Footer from "../components/footer/Footer";
import MasonryGallery from "../components/photo/MasonryGallery";
import { usePhotos } from "@/hooks/usePhotos";

const TagPage = () => {
  const { tag } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") ?? "";
  const activeTag = tag || "all";
  const { data: photos = [], isLoading } = usePhotos("all", activeTag, searchQuery);

  return (
    <div className="min-h-screen bg-background">
      <FitStockHeader />

      <div className="px-4 md:px-8 pt-8 pb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">{activeTag}</h1>
      </div>

      <main>
        {isLoading ? (
          <div className="flex justify-center py-20 text-muted-foreground">読み込み中...</div>
        ) : (
          <MasonryGallery photos={photos} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default TagPage;
