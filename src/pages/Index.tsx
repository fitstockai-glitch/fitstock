import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FitStockHeader from "../components/header/FitStockHeader";
import Footer from "../components/footer/Footer";
import CategoryTabs from "../components/content/CategoryTabs";
import MasonryGallery from "../components/photo/MasonryGallery";
import { usePhotos } from "@/hooks/usePhotos";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Seo } from "@/components/seo/Seo";
import { SITE_ORIGIN } from "@/config/site";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const location = useLocation();
  const searchQuery = (new URLSearchParams(location.search).get("q") ?? "").trim();
  const isSearchMode = searchQuery.length > 0;
  const { data: photos = [], isLoading } = usePhotos(
    isSearchMode ? "all" : selectedCategory,
    undefined,
    searchQuery
  );
  const visiblePhotos = photos.filter((p) => Boolean(p.imageUrl));
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={t("seo.home.title")}
        description={t("seo.home.description")}
        canonicalUrl={SITE_ORIGIN}
        ogUrl={SITE_ORIGIN}
      />
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
          <div className="flex justify-center py-20 text-muted-foreground">{t("common.loading")}</div>
        ) : isSearchMode && visiblePhotos.length === 0 ? (
          <div className="px-4 md:px-8 py-20">
            <div className="mx-auto max-w-2xl text-center space-y-6">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {t("index.noResultsLine1", { query: searchQuery })}
                <br />
                {t("index.noResultsLine2")}
              </p>
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/">{t("index.backHome")}</Link>
              </Button>
            </div>
          </div>
        ) : visiblePhotos.length === 0 ? (
          <div className="px-4 md:px-8 py-20">
            <div className="mx-auto max-w-2xl text-center space-y-4 text-muted-foreground">
              <p className="text-base md:text-lg leading-relaxed">
                {t("index.noPhotos")}
              </p>
              <p className="text-sm leading-relaxed">
                Supabase の{" "}
                <span className="font-mono text-foreground/80">photos</span>{" "}
                で、匿名ユーザーが読める行があるか確認してください。
                通常は{" "}
                <span className="font-mono text-foreground/80">is_published = true</span>
                かつ{" "}
                <span className="font-mono text-foreground/80">deleted_at</span>{" "}
                が空である必要があります。また{" "}
                <span className="font-mono text-foreground/80">photos_select_public</span>{" "}
                ポリシーが存在するか Table Editor の RLS を確認してください。
              </p>
            </div>
          </div>
        ) : (
          <MasonryGallery photos={visiblePhotos} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
