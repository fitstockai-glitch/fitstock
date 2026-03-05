import { useParams } from "react-router-dom";
import FitStockHeader from "../components/header/FitStockHeader";
import Footer from "../components/footer/Footer";
import MasonryGallery from "../components/photo/MasonryGallery";
import { photos } from "../data/photos";

const TagPage = () => {
  const { tag } = useParams();
  const activeTag = tag || "";

  // Always pass all photos so MasonryGallery can generate infinite batches
  // (tag filtering is cosmetic — in production this would be a backend query)

  return (
    <div className="min-h-screen bg-background">
      <FitStockHeader />

      <div className="px-4 md:px-8 pt-8 pb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">{activeTag}</h1>
      </div>

      <main>
        <MasonryGallery photos={photos} />
      </main>

      <Footer />
    </div>
  );
};

export default TagPage;
