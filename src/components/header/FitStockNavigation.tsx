import { Search, ImagePlus, Globe, Check, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type Language = "ja" | "en";

const FitStockNavigation = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>("ja");
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "ja" as Language, label: "日本語" },
    { code: "en" as Language, label: "English" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        <div className="flex items-center gap-1 md:gap-2">
          {/* Language Switcher */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Language"
            >
              <Globe size={20} />
            </button>
            
            {isLanguageDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-36 bg-background border border-border rounded-lg shadow-lg z-50 py-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLanguage(lang.code);
                      setIsLanguageDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-sm text-left hover:bg-secondary transition-colors flex items-center justify-between"
                  >
                    <span className={currentLanguage === lang.code ? "text-foreground font-medium" : "text-muted-foreground"}>
                      {lang.label}
                    </span>
                    {currentLanguage === lang.code && (
                      <Check size={16} className="text-primary" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Account */}
          <Link to="/account">
            <button
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Account"
            >
              <User size={20} />
            </button>
          </Link>

          {/* Upgrade to Plus */}
          <Link to="/pricing">
            <Button 
              className="bg-foreground text-background hover:bg-foreground/90 font-medium text-sm px-4"
            >
              Upgrade to Plus
            </Button>
          </Link>
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
    </nav>
  );
};

export default FitStockNavigation;
