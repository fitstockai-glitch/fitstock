import { useParams } from "react-router-dom";
import FitStockHeader from "../components/header/FitStockHeader";
import Footer from "../components/footer/Footer";
import CategoryTabs from "../components/content/CategoryTabs";
import MasonryGallery from "../components/photo/MasonryGallery";
import { photos } from "../data/photos";

const Category = () => {
  const { category } = useParams();
  
  // Capitalize first letter to match tab names
  const activeCategory = category 
    ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
    : "Portrait";

  // For demo, show all photos regardless of category
  const filteredPhotos = photos;

  const handleCategoryChange = (newCategory: string) => {
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
        <MasonryGallery photos={filteredPhotos} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Category;
