import { useParams, useSearchParams } from "react-router-dom";
import FitStockHeader from "../components/header/FitStockHeader";
import Footer from "../components/footer/Footer";
import CategoryTabs from "../components/content/CategoryTabs";
import MasonryGallery from "../components/photo/MasonryGallery";
import { usePhotos } from "@/hooks/usePhotos";

const Category = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = (searchParams.get("q") ?? "").trim();
  const isSearchMode = searchQuery.length > 0;
  const activeCategory = category || "all";
  const { data: photos = [], isLoading } = usePhotos(activeCategory, undefined, searchQuery);

  const handleCategoryChange = (_newCategory: string) => {
    // Navigation is handled by CategoryTabs
  };

  return (
    <div className="min-h-screen bg-background">
      <FitStockHeader />

      {isSearchMode ? (
        <div className="px-4 md:px-8 pt-8 pb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">{searchQuery}</h1>
        </div>
      ) : (
        <CategoryTabs
          selectedCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      )}

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

export default Category;
