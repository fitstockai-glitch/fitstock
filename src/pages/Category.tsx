import { useParams } from "react-router-dom";
import FitStockHeader from "../components/header/FitStockHeader";
import Footer from "../components/footer/Footer";
import CategoryTabs from "../components/content/CategoryTabs";
import MasonryGallery from "../components/photo/MasonryGallery";
import { photos } from "../data/photos";

const Category = () => {
  const { category } = useParams();
  
  // Capitalize first letter to match tab names
  const activeCategory = category || "portrait";

  // For demo, show all photos regardless of category
  const filteredPhotos = photos;

  const handleCategoryChange = (newCategory: string) => {
    // Navigation is handled by CategoryTabs
  };

  const categoryLabel = activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <FitStockHeader />
      
      {/* Category title */}
      <div className="px-4 md:px-8 pt-8 pb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">{categoryLabel}</h1>
      </div>

      <CategoryTabs 
        selectedCategory={activeCategory} 
        onCategoryChange={handleCategoryChange} 
      />

      <main>
        <MasonryGallery photos={filteredPhotos} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Category;
