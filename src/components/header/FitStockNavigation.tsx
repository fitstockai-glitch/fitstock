import { Search, User, Globe, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type Language = "ja" | "en";

const FitStockNavigation = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>("ja");

  const toggleLanguage = () => {
    setLanguage(language === "ja" ? "en" : "ja");
  };

  const navItems = [
    { name: language === "ja" ? "写真を探す" : "Explore", href: "/category/all" },
    { name: language === "ja" ? "カテゴリ" : "Categories", href: "/category/nature" },
    { name: language === "ja" ? "人気" : "Popular", href: "/category/popular" },
  ];

  const popularSearches = language === "ja" 
    ? ["風景", "ビジネス", "テクノロジー", "自然", "都市", "抽象"]
    : ["Landscape", "Business", "Technology", "Nature", "Urban", "Abstract"];

  return (
    <nav 
      className="relative" 
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)'
      }}
    >
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Mobile hamburger button */}
        <button
          className="lg:hidden p-2 text-nav-foreground hover:text-primary transition-colors duration-200"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 h-5 relative">
            <span className={`absolute block w-5 h-px bg-current transform transition-all duration-300 ${
              isMobileMenuOpen ? 'rotate-45 top-2.5' : 'top-1.5'
            }`}></span>
            <span className={`absolute block w-5 h-px bg-current transform transition-all duration-300 top-2.5 ${
              isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}></span>
            <span className={`absolute block w-5 h-px bg-current transform transition-all duration-300 ${
              isMobileMenuOpen ? '-rotate-45 top-2.5' : 'top-3.5'
            }`}></span>
          </div>
        </button>

        {/* Left navigation - Hidden on mobile */}
        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-nav-foreground hover:text-primary transition-colors duration-200 text-sm font-medium"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Center logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" className="block">
            <span className="text-2xl font-bold text-primary">
              Fit<span className="text-foreground">Stock</span>
            </span>
          </Link>
        </div>

        {/* Right icons */}
        <div className="flex items-center space-x-1 md:space-x-2">
          {/* Search button */}
          <button 
            className="p-2 text-nav-foreground hover:text-primary transition-colors duration-200"
            aria-label="Search"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search size={20} />
          </button>

          {/* Language toggle */}
          <button
            className="p-2 text-nav-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1"
            onClick={toggleLanguage}
            aria-label="Toggle language"
          >
            <span className="text-lg">{language === "ja" ? "🇯🇵" : "🇺🇸"}</span>
          </button>

          {/* Login/Signup buttons - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-nav-foreground hover:text-primary">
              <User size={18} className="mr-1" />
              {language === "ja" ? "ログイン" : "Login"}
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary-hover text-primary-foreground">
              {language === "ja" ? "会員登録" : "Sign Up"}
            </Button>
          </div>

          {/* Mobile user icon */}
          <button 
            className="md:hidden p-2 text-nav-foreground hover:text-primary transition-colors duration-200"
            aria-label="Account"
          >
            <User size={20} />
          </button>
        </div>
      </div>

      {/* Search overlay */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-border z-50 shadow-lg">
          <div className="px-4 md:px-6 py-6">
            <div className="max-w-2xl mx-auto">
              {/* Search input */}
              <div className="relative mb-6">
                <div className="flex items-center border-b-2 border-primary pb-2">
                  <Search size={20} className="text-primary mr-3" />
                  <input
                    type="text"
                    placeholder={language === "ja" ? "写真を検索..." : "Search photos..."}
                    className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-lg"
                    autoFocus
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="p-1 text-muted-foreground hover:text-foreground"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Popular searches */}
              <div>
                <h3 className="text-foreground text-sm font-medium mb-3">
                  {language === "ja" ? "人気の検索" : "Popular Searches"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((search, index) => (
                    <button
                      key={index}
                      className="text-nav-foreground hover:text-primary text-sm py-2 px-4 border border-border rounded-full transition-colors duration-200 hover:border-primary hover:bg-accent"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile navigation menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border z-50 shadow-lg">
          <div className="px-4 py-6">
            <div className="space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-foreground hover:text-primary transition-colors duration-200 text-lg font-medium block py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-border space-y-2">
                <Button variant="outline" className="w-full justify-center">
                  <User size={18} className="mr-2" />
                  {language === "ja" ? "ログイン" : "Login"}
                </Button>
                <Button className="w-full justify-center bg-primary hover:bg-primary-hover text-primary-foreground">
                  {language === "ja" ? "会員登録" : "Sign Up"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default FitStockNavigation;
