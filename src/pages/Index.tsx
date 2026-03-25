import { useState } from "react";
import { useLocation } from "react-router-dom";
import FitStockHeader from "../components/header/FitStockHeader";
import Footer from "../components/footer/Footer";
import CategoryTabs from "../components/content/CategoryTabs";
import MasonryGallery from "../components/photo/MasonryGallery";
import { usePhotos } from "@/hooks/usePhotos";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const location = useLocation();
  const searchQuery = (new URLSearchParams(location.search).get("q") ?? "").trim();
  const isSearchMode = searchQuery.length > 0;
  // 検索中は URL が /?q= のみになるため、タブの selectedCategory が残っても全体検索する
  const { data: photos = [], isLoading } = usePhotos(
    isSearchMode ? "all" : selectedCategory,
    undefined,
    searchQuery
  );
  const visiblePhotos = photos.filter((p) => /\/thumbnails\/0[1-5]_thumb\.png$/.test(p.imageUrl));

  return (
    <div className="min-h-screen bg-background">
      <FitStockHeader />
      {isSearchMode ? (
        <div className="px-4 md:px-8 pt-8 pb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            {searchQuery}
          </h1>
        </div>
      ) : (
        <CategoryTabs
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          stayOnPage
        />
      )}
      
      <main>
        {isLoading ? (
          <div className="flex justify-center py-20 text-muted-foreground">読み込み中...</div>
        ) : (
          <MasonryGallery photos={visiblePhotos} />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
