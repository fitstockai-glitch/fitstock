import { useState } from "react";
import FitStockHeader from "../components/header/FitStockHeader";
import Footer from "../components/footer/Footer";
import HeroSection from "../components/content/HeroSection";
import CategoryFilter from "../components/content/CategoryFilter";
import MasonryGallery from "../components/photo/MasonryGallery";
import { photos } from "../data/photos";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPhotos = selectedCategory === "All" 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <FitStockHeader />
      
      <main>
        <HeroSection />
        <CategoryFilter 
          selectedCategory={selectedCategory} 
          onCategoryChange={setSelectedCategory} 
        />
        <section className="pb-16">
          <MasonryGallery photos={filteredPhotos} />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
