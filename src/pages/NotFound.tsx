import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import FitStockHeader from "@/components/header/FitStockHeader";
import Footer from "@/components/footer/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <FitStockHeader />
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center space-y-6">
          <h1 className="text-8xl font-light tracking-tight">404</h1>
          <p className="text-lg text-muted-foreground">The page you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="inline-block border border-foreground px-8 py-3 text-sm tracking-widest uppercase hover:opacity-70 transition-opacity"
          >
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
