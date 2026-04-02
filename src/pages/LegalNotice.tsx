import { useEffect } from "react";
import FitStockHeader from "@/components/header/FitStockHeader";
import Footer from "../components/footer/Footer";

const LegalNotice = () => {
  useEffect(() => {
    document.title = "特定商取引法に基づく表記 - FitStock";
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <FitStockHeader />
      
      <main className="pt-6 flex-1">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-2xl font-bold text-foreground mb-8">特定商取引法に基づく表記</h1>

          <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-base font-semibold text-foreground mb-3">事業者名</h2>
              <p>FitStock 運営チーム</p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground mb-3">代表者</h2>
              <p>お問い合わせください</p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground mb-3">所在地</h2>
              <p>請求があった場合は遅滞なく開示いたします。</p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground mb-3">連絡先</h2>
              <p>
                お問い合わせフォーム：
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScuM8dFtyjbjKnHvbU8iD7ywx3ud1zPWJNurheoaGItccCAKw/viewform?usp=header"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline hover:opacity-70 transition-opacity"
                >
                  こちら
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground mb-3">販売価格</h2>
              <p>各プランの料金ページに表示された価格に準じます（税込）。</p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground mb-3">支払方法</h2>
              <p>クレジットカード決済（Stripe経由）</p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground mb-3">支払時期</h2>
              <p>サブスクリプション登録時に即時決済。以降は契約期間ごとに自動更新・決済されます。</p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground mb-3">サービス提供時期</h2>
              <p>決済完了後、直ちにサービスをご利用いただけます。</p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground mb-3">返品・キャンセルについて</h2>
              <p>デジタルコンテンツの性質上、購入後の返金は原則として行っておりません。サブスクリプションは次回更新日前にキャンセルすることで、次回以降の課金を停止できます。</p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-foreground mb-3">動作環境</h2>
              <p>最新のウェブブラウザ（Google Chrome、Safari、Firefox、Microsoft Edge）を推奨します。</p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LegalNotice;
