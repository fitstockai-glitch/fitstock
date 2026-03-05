import { Link } from "react-router-dom";
import FitStockNavigation from "./FitStockNavigation";

const FitStockHeader = () => {
  return (
    <header className="w-full sticky top-0 z-50">
      {/* Mobile promotional banner */}
      <Link to="/pricing" className="block md:hidden bg-destructive text-destructive-foreground text-center py-2.5 text-sm font-medium rounded-none">
        無制限ダウンロードプランに参加する
      </Link>
      <FitStockNavigation />
    </header>
  );
};

export default FitStockHeader;
