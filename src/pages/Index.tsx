import { useState } from "react";
import FitStockHeader from "../components/header/FitStockHeader";
import Footer from "../components/footer/Footer";
import CategoryTabs from "../components/content/CategoryTabs";
import MasonryGallery from "../components/photo/MasonryGallery";
import { usePhotos } from "@/hooks/usePhotos";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { data: photos = [], isLoading } = usePhotos();

  return (
    <div className="min-h-screen bg-background">
      <FitStockHeader />
      <CategoryTabs 
        selectedCategory={selectedCategory} 
        onCategoryChange={setSelectedCategory} 
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

export default Index;
