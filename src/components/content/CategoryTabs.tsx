import { ChevronDown } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORY_DISPLAY_MAX, useCategoriesByPhotoCount } from "@/hooks/useCategories";
import { useTranslation } from "react-i18next";

interface CategoryTabsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  /** トップページ（/）では遷移せずその場でフィルタ。false の場合は /category/:key へ遷移 */
  stayOnPage?: boolean;
}

const CategoryTabs = ({
  selectedCategory,
  onCategoryChange,
  stayOnPage = false,
}: CategoryTabsProps) => {
  const { t } = useTranslation();

  const sortOptions = [
    { key: "daily-picks", label: t("sort.dailyPicks") },
    { key: "popular", label: t("sort.popular") },
    { key: "newest", label: t("sort.newest") },
    { key: "trending", label: t("sort.trending") },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = i18n.language.startsWith("en");
  const { data: dbCategories = [] } = useCategoriesByPhotoCount(CATEGORY_DISPLAY_MAX);
  const categories = [
    { key: "all", label: t("categories.all"), name_en: null },
    ...dbCategories,
  ];

  const handleCategoryClick = (key: string) => {
    onCategoryChange(key);
    if (!stayOnPage) {
      navigate(`/category/${key}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="border-b border-border bg-background sticky top-[156px] md:top-16 z-40">
      <div className="flex items-center justify-between px-4 md:px-8">
        <div
          ref={scrollRef}
          className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-3 flex-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => handleCategoryClick(cat.key)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-md transition-colors ${
                selectedCategory === cat.key
                  ? "bg-foreground text-background"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              {isEn ? (cat.name_en ?? cat.label) : cat.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2 pl-4 border-l border-border ml-4 relative" ref={dropdownRef}>
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary rounded-md transition-colors"
          >
            {selectedSort.label}
            <ChevronDown size={16} className={`transition-transform ${isSortOpen ? "rotate-180" : ""}`} />
          </button>
          {isSortOpen && (
            <div className="absolute top-full right-0 mt-1 bg-background border border-border rounded-md shadow-lg min-w-[160px] py-1 z-50">
              {sortOptions.map((option) => (
                <button
                  key={option.key}
                  onClick={() => {
                    setSelectedSort(option);
                    setIsSortOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                    selectedSort.key === option.key
                      ? "bg-secondary font-medium text-foreground"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;
