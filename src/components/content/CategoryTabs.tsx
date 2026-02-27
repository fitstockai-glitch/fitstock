import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface CategoryTabsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { key: "portrait", label: "ポートレート" },
  { key: "landscape", label: "風景" },
  { key: "abstract", label: "抽象" },
  { key: "business", label: "ビジネス" },
  { key: "mockup", label: "モックアップ" },
  { key: "food", label: "フード" },
  { key: "family", label: "ファミリー" },
  { key: "building", label: "建物" },
  { key: "autumn", label: "秋" },
  { key: "winter", label: "冬" },
  { key: "wedding", label: "ウェディング" },
  { key: "technology", label: "テクノロジー" },
  { key: "nature", label: "自然" },
  { key: "animals", label: "動物" },
];

const CategoryTabs = ({ selectedCategory, onCategoryChange }: CategoryTabsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [sortOption, setSortOption] = useState("Daily Picks");
  const navigate = useNavigate();

  const handleCategoryClick = (key: string) => {
    onCategoryChange(key);
    navigate(`/category/${key}`);
  };

  return (
    <div className="border-b border-border bg-background sticky top-16 z-40">
      <div className="flex items-center justify-between px-4 md:px-8">
        {/* Scrollable categories */}
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
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort dropdown */}
        <div className="hidden md:flex items-center gap-2 pl-4 border-l border-border ml-4">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary rounded-md transition-colors">
            {sortOption}
            <ChevronDown size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;
