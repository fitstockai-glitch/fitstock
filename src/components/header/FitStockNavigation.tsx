import { Search, ImagePlus, Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FitStockNavigation = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-background border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 md:px-8">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center gap-1">
            <span className="text-xl md:text-2xl font-semibold text-foreground">
              /<span className="font-bold">FitStock</span>
            </span>
          </Link>
        </div>

        {/* Center search bar - Hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8">
          <div className={`flex items-center w-full bg-secondary rounded-full px-4 py-2.5 transition-all duration-200 ${
            isSearchFocused ? "ring-2 ring-primary/20" : ""
          }`}>
            <Search size={18} className="text-muted-foreground mr-3" />
            <input
              type="text"
              placeholder="Search for anything"
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            <div className="flex items-center gap-2 ml-2 pl-2 border-l border-border">
              <button className="p-1 text-muted-foreground hover:text-foreground transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 16v-4M12 8h.01"/>
                </svg>
              </button>
              <button className="p-1 text-muted-foreground hover:text-foreground transition-colors">
                <ImagePlus size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            className="hidden md:inline-flex text-foreground hover:text-primary font-medium"
          >
            Sign in
          </Button>
          <button 
            className="p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile search - Shows below header on mobile */}
      <div className="md:hidden px-4 pb-3">
        <div className="flex items-center w-full bg-secondary rounded-full px-4 py-2.5">
          <Search size={18} className="text-muted-foreground mr-3" />
          <input
            type="text"
            placeholder="Search for anything"
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
          />
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4">
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-center">
              Sign in
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default FitStockNavigation;
