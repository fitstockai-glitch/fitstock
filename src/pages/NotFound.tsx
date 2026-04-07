import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import FitStockHeader from "@/components/header/FitStockHeader";
import Footer from "@/components/footer/Footer";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <FitStockHeader />
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-8xl font-light tracking-tight mb-6">404</h1>
          <p className="text-lg text-muted-foreground mb-5">{t("notFound.message")}</p>
          <Link to="/">
            <Button className="bg-foreground hover:bg-foreground/90 text-background font-medium px-8 py-6 rounded-md">
              {t("notFound.backHome")}
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
