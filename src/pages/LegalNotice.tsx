import { useEffect } from "react";
import FitStockHeader from "@/components/header/FitStockHeader";
import Footer from "../components/footer/Footer";

const LegalNotice = () => {
  useEffect(() => {
    document.title = "特定商取引法に基づく表記 - FitStock";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <FitStockHeader />
      
      <main className="pt-6">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-light text-foreground mb-4">特定商取引法に基づく表記</h1>
            <p className="text-muted-foreground">最終更新日: 2026年4月2日</p>
          </header>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">販売事業者</h2>
              <p className="text-muted-foreground leading-relaxed">株式会社FLUID</p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">代表者名</h2>
              <p className="text-muted-foreground leading-relaxed">森田 敏之</p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">所在地</h2>
              <p className="text-muted-foreground leading-relaxed">
                東京都渋谷区本町3-51-17 402
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm">
                ※ お問い合わせがあった場合、遅滞なく開示いたします。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">連絡先</h2>
              <p className="text-muted-foreground leading-relaxed">
                メール: support@fitstock.com（ドメイン取得後に更新）
              </p>
              <p className="text-muted-foreground leading-relaxed">
                お問い合わせフォーム:{" "}
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
              <h2 className="text-2xl font-light text-foreground mb-4">サービス名</h2>
              <p className="text-muted-foreground leading-relaxed">FitStock</p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">販売価格</h2>
              <p className="text-muted-foreground leading-relaxed">FitStock Plus: ¥1,000 / 月（税込）</p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">支払方法</h2>
              <p className="text-muted-foreground leading-relaxed">
                クレジットカード（Visa / Mastercard / American Express / その他）
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm">
                ※ 決済代行サービス Lemon Squeezy を通じて処理されます。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">支払時期</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>初回: ご登録時に即時決済</li>
                <li>2回目以降: 毎月同日に自動更新・自動決済</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">サービス提供時期</h2>
              <p className="text-muted-foreground leading-relaxed">決済完了後、即時ご利用いただけます。</p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">キャンセル・返金について</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>マイページよりいつでもキャンセル可能です。</li>
                <li>キャンセル後も次回請求日まで引き続きご利用いただけます。</li>
                <li>日割り返金は行いません。</li>
                <li>次回請求日以降は Free Member プランに自動移行されます。</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">動作環境</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>対応ブラウザ: Google Chrome / Safari / Firefox / Edge（最新版推奨）</li>
                <li>インターネット接続環境が必要です。</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">販売数量</h2>
              <p className="text-muted-foreground leading-relaxed">制限なし</p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">商品の性質</h2>
              <p className="text-muted-foreground leading-relaxed">
                デジタルコンテンツ（写真素材のダウンロードサービス）のため、購入後の返品・交換はお受けできません。
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LegalNotice;
