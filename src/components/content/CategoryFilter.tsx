import { useCategories } from "@/hooks/useCategories";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  const { data: dbCategories = [] } = useCategories();
  const categories = [{ key: "all", label: "すべて" }, ...dbCategories];

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
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
