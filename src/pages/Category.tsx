import { useParams } from "react-router-dom";
import FitStockHeader from "../components/header/FitStockHeader";
import Footer from "../components/footer/Footer";
import CategoryTabs from "../components/content/CategoryTabs";
import MasonryGallery from "../components/photo/MasonryGallery";
import { usePhotos } from "@/hooks/usePhotos";

const Category = () => {
  const { category } = useParams();
  const activeCategory = category || "all";
  const { data: photos = [], isLoading } = usePhotos(activeCategory);

  const handleCategoryChange = (_newCategory: string) => {
    // Navigation is handled by CategoryTabs
  };

  return (
    <div className="min-h-screen bg-background">
      <FitStockHeader />
      
      <CategoryTabs 
        selectedCategory={activeCategory} 
        onCategoryChange={handleCategoryChange} 
      />

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
