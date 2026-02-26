import FitStockHeader from "@/components/header/FitStockHeader";
import Footer from "@/components/footer/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <FitStockHeader />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 md:py-24">
        {/* Headline */}
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-relaxed">
            制限を気にせず、必要な写真をすぐに選べる。
            <br />
            待ち時間もなく、クリエイティブに集中できる環境を。
          </h1>
        </div>

        {/* Pricing Card */}
        <div className="w-full max-w-lg border border-border rounded-xl p-8 md:p-10">
          <div className="mb-1">
            <span className="text-4xl font-bold text-foreground">¥1,000</span>
            <span className="text-base text-foreground ml-1">月額</span>
          </div>
          <p className="text-sm text-muted-foreground mb-8">¥12,000 / 年払い</p>

          <div className="space-y-5 mb-10">
            <div className="flex items-start gap-3">
              <Check size={18} className="text-muted-foreground mt-0.5 shrink-0" />
              <span className="text-sm text-muted-foreground">画像ライブラリのすべての素材がダウンロード可能</span>
            </div>
            <div className="flex items-start gap-3">
              <Check size={18} className="text-muted-foreground mt-0.5 shrink-0" />
              <span className="text-sm text-muted-foreground">
                クリエイティブデジタルおよび印刷物に
                <br className="hidden sm:block" />
                使用できる加工可能なライセンス
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Check size={18} className="text-muted-foreground mt-0.5 shrink-0" />
              <span className="text-sm text-muted-foreground">業界最安値の金額</span>
            </div>
          </div>

          <Link to="/register">
            <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-6 text-base rounded-lg">
              FitStock Plusに参加する
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
