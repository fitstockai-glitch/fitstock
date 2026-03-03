import { Search, ImagePlus, Globe, Check, User, Heart } from "lucide-react";
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
          <Link to="/" className="flex items-center">
            <svg width="105" height="23" viewBox="0 0 172 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M66.9199 1.44043C68.6478 1.44045 70.3915 1.74461 72.1514 2.35254C73.9433 2.96051 75.4957 3.87197 76.8076 5.08789L72.8721 9.4082C72.2321 8.5762 71.3197 7.88775 70.1357 7.34375C68.9838 6.76781 67.8158 6.48048 66.6318 6.48047C65.9278 6.48047 65.2235 6.57655 64.5195 6.76855C63.8157 6.92856 63.1755 7.20004 62.5996 7.58398C62.0236 7.93598 61.5441 8.41644 61.1602 9.02441C60.8082 9.60032 60.6319 10.3039 60.6318 11.1357C60.6318 11.9037 60.7913 12.5605 61.1113 13.1045C61.4313 13.6484 61.8642 14.1121 62.4082 14.4961C62.9841 14.88 63.6719 15.216 64.4717 15.5039C65.2716 15.7919 66.1515 16.0802 67.1113 16.3682C68.1993 16.7202 69.3197 17.1204 70.4717 17.5684C71.6555 18.0163 72.7276 18.6079 73.6875 19.3438C74.6795 20.0797 75.4799 21.008 76.0879 22.1279C76.7278 23.2478 77.0478 24.6399 77.0479 26.3037C77.0479 28.1277 76.712 29.7285 76.04 31.1045C75.3681 32.4484 74.4715 33.5679 73.3516 34.4639C72.2316 35.3598 70.92 36.0325 69.416 36.4805C67.9121 36.9284 66.328 37.1523 64.6641 37.1523C62.4561 37.1523 60.2956 36.7521 58.1836 35.9521C56.0716 35.1201 54.344 33.9037 53 32.3037L57.3193 28.2725C58.1513 29.4244 59.2559 30.3358 60.6318 31.0078C62.0398 31.6798 63.4158 32.0156 64.7598 32.0156C65.4638 32.0156 66.1839 31.9364 66.9199 31.7764C67.6558 31.5844 68.3117 31.2802 68.8877 30.8643C69.4957 30.4483 69.9761 29.9361 70.3281 29.3281C70.712 28.6883 70.9033 27.9043 70.9033 26.9766C70.9033 26.0806 70.6953 25.3445 70.2793 24.7686C69.8633 24.1606 69.3036 23.6484 68.5996 23.2324C67.8956 22.7844 67.0635 22.4001 66.1035 22.0801L63.0801 21.0723C62.0561 20.7523 61.0318 20.3679 60.0078 19.9199C58.9839 19.4719 58.0556 18.8805 57.2236 18.1445C56.4236 17.4085 55.7679 16.512 55.2559 15.4561C54.7439 14.3681 54.4873 13.0238 54.4873 11.4238C54.4873 9.69594 54.84 8.2079 55.5439 6.95996C56.2799 5.71204 57.224 4.68766 58.376 3.8877C59.5598 3.0559 60.8877 2.44842 62.3594 2.06445C63.8634 1.64845 65.3839 1.44043 66.9199 1.44043ZM108.594 12.5762C110.322 12.5762 111.953 12.8645 113.489 13.4404C115.025 14.0164 116.354 14.8318 117.474 15.8877C118.594 16.9437 119.473 18.2245 120.113 19.7285C120.785 21.2004 121.121 22.8481 121.121 24.6719C121.121 26.4959 120.785 28.1601 120.113 29.6641C119.473 31.1679 118.594 32.4638 117.474 33.5518C116.354 34.6078 115.025 35.4399 113.489 36.0479C111.953 36.6558 110.322 36.9599 108.594 36.96C106.866 36.96 105.233 36.6559 103.697 36.0479C102.161 35.4399 100.834 34.6077 99.7139 33.5518C98.5939 32.4638 97.6974 31.1681 97.0254 29.6641C96.3854 28.1601 96.0654 26.4959 96.0654 24.6719C96.0655 22.8481 96.3855 21.2004 97.0254 19.7285C97.6974 18.2245 98.5939 16.9437 99.7139 15.8877C100.834 14.8319 102.162 14.0164 103.697 13.4404C105.233 12.8644 106.866 12.5762 108.594 12.5762ZM136.259 12.5762C137.955 12.5762 139.586 12.8962 141.154 13.5361C142.754 14.1761 144.018 15.0559 144.946 16.1758L141.011 19.6318C140.563 18.9918 139.89 18.4639 138.994 18.0479C138.098 17.6 137.187 17.376 136.259 17.376C135.203 17.376 134.275 17.6 133.475 18.0479C132.675 18.4639 132.002 19.0245 131.458 19.7285C130.946 20.4323 130.563 21.2322 130.307 22.1279C130.051 22.9919 129.923 23.8726 129.923 24.7686C129.923 25.6644 130.051 26.5602 130.307 27.4561C130.595 28.32 131.011 29.1037 131.555 29.8076C132.099 30.5116 132.77 31.0881 133.57 31.5361C134.402 31.9521 135.362 32.1601 136.45 32.1602C137.346 32.1602 138.243 31.9838 139.139 31.6318C140.035 31.2798 140.755 30.7676 141.299 30.0957L144.898 33.7441C143.938 34.7681 142.706 35.5685 141.202 36.1445C139.73 36.6884 138.13 36.96 136.402 36.96C134.707 36.96 133.091 36.6884 131.555 36.1445C130.051 35.6005 128.722 34.8001 127.57 33.7441C126.45 32.6882 125.555 31.4081 124.883 29.9043C124.243 28.4004 123.923 26.6884 123.923 24.7686C123.923 22.9126 124.243 21.2325 124.883 19.7285C125.555 18.2245 126.45 16.9437 127.57 15.8877C128.69 14.8319 129.986 14.0164 131.458 13.4404C132.962 12.8644 134.563 12.5762 136.259 12.5762ZM46.7852 13.248H51.9688L51.1523 17.8076H46.0645L44.0488 28.6562C43.9529 29.1362 43.9053 29.5841 43.9053 30C43.9053 30.832 44.145 31.4085 44.625 31.7285C45.1369 32.0484 45.8089 32.208 46.6406 32.208C47.0246 32.208 47.3931 32.1763 47.7451 32.1123C48.129 32.0483 48.4809 31.968 48.8008 31.8721L48.4648 36.1445C47.985 36.3365 47.409 36.4802 46.7373 36.5762C46.0974 36.7042 45.5049 36.7685 44.9609 36.7686C42.5289 36.7686 40.8004 36.2881 39.7764 35.3281C38.7526 34.3362 38.2413 33.0402 38.2412 31.4404C38.2412 30.9924 38.2571 30.512 38.2891 30C38.3531 29.456 38.4333 28.9597 38.5293 28.5117L40.4971 17.8076H36.417L37.2324 13.248H41.2168L42.3691 6.52832H47.9365L46.7852 13.248ZM87.9609 13.248H93.7207V17.8564H87.9609V28.5605C87.961 29.5843 88.1373 30.4326 88.4893 31.1045C88.8734 31.7762 89.7056 32.1123 90.9854 32.1123C91.3693 32.1123 91.7855 32.0796 92.2334 32.0156C92.6811 31.9197 93.0808 31.7917 93.4326 31.6318L93.625 36.1445C93.113 36.3365 92.5047 36.4802 91.8008 36.5762C91.0969 36.7041 90.425 36.7685 89.7852 36.7686C88.2492 36.7686 87.001 36.5605 86.041 36.1445C85.0811 35.6966 84.3133 35.1041 83.7373 34.3682C83.1934 33.6002 82.809 32.7363 82.585 31.7764C82.393 30.7845 82.2969 29.7283 82.2969 28.6084V17.8564H78.2646V13.248H82.2969V6.57617H87.9609V13.248ZM26.1113 7.48828H10.9922L9.31152 16.8965H23.5195L22.6562 21.8877H8.44824L5.9043 36.2881H0L6 2.30371H27.0234L26.1113 7.48828ZM30.292 36.2881H24.6758L28.708 13.248H34.3721L30.292 36.2881ZM154.56 22.9443H154.704L163.439 13.248H170.832L160.848 23.6641L171.456 36.2881H163.824L154.704 24.4805H154.56V36.2881H148.8V0H154.56V22.9443ZM108.594 17.2803C107.442 17.2803 106.449 17.5041 105.617 17.9521C104.785 18.3681 104.098 18.928 103.554 19.6318C103.01 20.3358 102.594 21.1362 102.306 22.0322C102.05 22.8961 101.922 23.776 101.922 24.6719C101.922 25.5679 102.05 26.4644 102.306 27.3604C102.594 28.2562 103.01 29.0559 103.554 29.7598C104.098 30.4637 104.785 31.0403 105.617 31.4883C106.449 31.9363 107.442 32.1602 108.594 32.1602C109.746 32.1601 110.737 31.9362 111.569 31.4883C112.401 31.0403 113.09 30.4638 113.634 29.7598C114.178 29.0559 114.578 28.2562 114.834 27.3604C115.122 26.4644 115.266 25.5679 115.266 24.6719C115.266 23.776 115.122 22.8961 114.834 22.0322C114.578 21.1362 114.178 20.3358 113.634 19.6318C113.09 18.9278 112.401 18.3681 111.569 17.9521C110.737 17.5042 109.746 17.2803 108.594 17.2803ZM32.9795 2.01562C33.9075 2.01562 34.6762 2.31977 35.2842 2.92773C35.9242 3.50373 36.2441 4.30412 36.2441 5.32812C36.2441 6.25609 35.9083 7.07239 35.2363 7.77637C34.5963 8.48037 33.7959 8.83203 32.8359 8.83203C31.9079 8.83203 31.1075 8.54377 30.4355 7.96777C29.7959 7.39187 29.4757 6.5761 29.4756 5.52051C29.4756 4.49651 29.8282 3.66441 30.5322 3.02441C31.2361 2.35252 32.0517 2.01573 32.9795 2.01562Z" fill="currentColor"/>
            </svg>
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
            placeholder="画像を検索する"
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-0">
          {/* Language Switcher */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
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

          {/* Favorites */}
          <Link to="/account?section=favorites">
            <button
              className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Favorites"
            >
              <Heart size={20} />
            </button>
          </Link>

          {/* User Account */}
          <Link to="/account">
            <button
              className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Account"
            >
              <User size={20} />
            </button>
          </Link>

          {/* Upgrade to Plus */}
          <Link to="/pricing" className="ml-2">
            <Button 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-medium text-sm px-4"
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
            placeholder="画像を検索する"
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
          />
        </div>
      </div>
    </nav>
  );
};

export default FitStockNavigation;
