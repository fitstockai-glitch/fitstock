import { Link } from "react-router-dom";
import FitStockNavigation from "./FitStockNavigation";
import { useTranslation } from "react-i18next";

interface FitStockHeaderProps {
  hideSearch?: boolean;
}

const FitStockHeader = ({ hideSearch = false }: FitStockHeaderProps) => {
  const { t } = useTranslation();
  return (
    <header className="w-full sticky top-0 z-50">
      {/* Mobile promotional banner */}
      <Link to="/pricing" className="block md:hidden bg-destructive text-destructive-foreground text-center py-2.5 text-sm font-medium rounded-none">
        {t("header.promoBanner")}
      </Link>
      <FitStockNavigation hideSearch={hideSearch} />
    </header>
  );
};

export default FitStockHeader;
