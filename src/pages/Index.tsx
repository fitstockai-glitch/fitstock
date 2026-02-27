import { useState } from "react";
import FitStockHeader from "../components/header/FitStockHeader";
import Footer from "../components/footer/Footer";
import CategoryTabs from "../components/content/CategoryTabs";
import MasonryGallery from "../components/photo/MasonryGallery";
import { photos } from "../data/photos";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("portrait");

  // For demo, show all photos regardless of category
  const filteredPhotos = photos;

  return (
    <div className="min-h-screen bg-background">
      <FitStockHeader />
      <CategoryTabs 
        selectedCategory={selectedCategory} 
        onCategoryChange={setSelectedCategory} 
      />
      
      <main>
        <MasonryGallery photos={filteredPhotos} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
