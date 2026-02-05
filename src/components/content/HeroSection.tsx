import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative py-16 md:py-24 px-4 md:px-6 bg-gradient-to-br from-secondary to-background">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6">
          高品質な<span className="text-primary">ストック写真</span>を
          <br className="hidden md:block" />
          見つけよう
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          プロフェッショナルな写真素材をダウンロード。
          商用利用可能な高解像度画像を今すぐ入手。
        </p>
        
        {/* Search bar */}
        <div className="max-w-2xl mx-auto relative">
          <div className="flex items-center bg-background border-2 border-border rounded-full px-4 py-2 shadow-lg focus-within:border-primary transition-colors">
            <Search size={20} className="text-muted-foreground mr-3" />
            <input
              type="text"
              placeholder="キーワードで写真を検索..."
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none py-2"
            />
            <Button className="bg-primary hover:bg-primary-hover text-primary-foreground rounded-full px-6">
              検索
            </Button>
          </div>
        </div>

        {/* Quick tags */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <span className="text-sm text-muted-foreground">トレンド:</span>
          {["自然", "ビジネス", "テクノロジー", "風景", "ライフスタイル"].map((tag) => (
            <button
              key={tag}
              className="text-sm text-foreground hover:text-primary transition-colors underline-offset-2 hover:underline"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
