import { CATEGORY_DISPLAY_MAX, useCategoriesByPhotoCount } from "@/hooks/useCategories";
import { useTranslation } from "react-i18next";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language.startsWith("en");
  const { data: dbCategories = [] } = useCategoriesByPhotoCount(CATEGORY_DISPLAY_MAX);
  const categories = [{ key: "all", label: t("categories.all"), name_en: null as string | null }, ...dbCategories];

  return (
    <div className="flex flex-wrap justify-center gap-2 px-4 md:px-6 py-6">
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onCategoryChange(cat.key)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedCategory === cat.key
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-foreground hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          {isEn ? (cat.name_en ?? cat.label) : cat.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
