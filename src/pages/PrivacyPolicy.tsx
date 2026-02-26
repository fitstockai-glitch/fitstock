import { useEffect } from "react";
import FitStockHeader from "@/components/header/FitStockHeader";
import Footer from "../components/footer/Footer";

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "プライバシーポリシー - FitStock";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <FitStockHeader />
      
      <main className="pt-6">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-light text-foreground mb-4">プライバシーポリシー</h1>
            <p className="text-muted-foreground">最終更新日: 2024年2月27日</p>
          </header>

          <div className="prose prose-lg max-w-none space-y-8">
            <p className="text-muted-foreground leading-relaxed">
              FitStock（以下「当サービス」といいます）は、ユーザーの皆様の個人情報を大切に保護することをお約束します。本プライバシーポリシーは、当サービスがどのような個人情報を収集し、どのように利用・管理するかを説明するものです。
            </p>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">1. 事業者情報</h2>
              <ul className="list-none text-muted-foreground space-y-1">
                <li>サービス名: FitStock（フィットストック）</li>
                <li>運営者: [運営者名]</li>
                <li>所在地: [住所]</li>
                <li>お問い合わせ窓口: support@fitstock.example.com</li>
                <li>お問い合わせフォーム: https://fitstock.example.com/contact</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">2. 収集する個人情報</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">当サービスでは、以下の個人情報を収集します。</p>

              <h3 className="text-xl font-light text-foreground mb-2">2.1 登録時に収集する情報</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>メールアドレス（必須）</li>
                <li>表示名（任意）</li>
                <li>パスワード（ハッシュ化して保存）</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">2.2 サービス利用時に収集する情報</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>ダウンロード履歴</li>
                <li>お気に入り登録情報</li>
                <li>検索履歴</li>
                <li>サービス利用ログ</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">2.3 決済情報</h3>
              <p className="text-muted-foreground leading-relaxed mb-1">決済情報（クレジットカード情報等）</p>
              <p className="text-muted-foreground leading-relaxed text-sm mb-4">※当サービスでは直接保存せず、決済代行サービス（Lemon Squeezy）を通じて処理されます</p>

              <h3 className="text-xl font-light text-foreground mb-2">2.4 自動的に収集される情報</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>IPアドレス</li>
                <li>ブラウザの種類とバージョン</li>
                <li>オペレーティングシステム</li>
                <li>訪問日時</li>
                <li>閲覧ページ</li>
                <li>リファラー（参照元）情報</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">3. 個人情報の利用目的</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">収集した個人情報は、以下の目的で利用します。</p>

              <h3 className="text-xl font-light text-foreground mb-2">サービスの提供・運営</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>ユーザー認証</li>
                <li>ダウンロード機能の提供</li>
                <li>お気に入り機能の提供</li>
                <li>プラン管理（Free Member / FitStock Plus）</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">決済処理</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>FitStock Plusサブスクリプションの請求</li>
                <li>領収書の発行</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">カスタマーサポート</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>お問い合わせへの対応</li>
                <li>技術的な問題解決</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">サービスの改善・分析</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>利用状況の分析</li>
                <li>新機能の開発</li>
                <li>ユーザー体験の向上</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">重要なお知らせの送信</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>サービスに関する重要な変更</li>
                <li>セキュリティに関する通知</li>
                <li>プラン変更のお知らせ</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">不正利用の防止</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>アカウントの不正利用検知</li>
                <li>セキュリティ対策</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">4. 第三者への情報提供</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">当サービスでは、以下のサービスプロバイダーに個人情報を提供します。これらのプロバイダーは、サービスの提供に必要な範囲でのみ情報を利用し、適切なセキュリティ対策を講じています。</p>

              <h3 className="text-xl font-light text-foreground mb-2">4.1 必須サービス</h3>
              <div className="space-y-4 mb-6">
                <div className="text-muted-foreground">
                  <p className="font-medium text-foreground">Supabase（米国）</p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>提供情報: ユーザー認証情報、データベース情報、ストレージファイル</li>
                    <li>目的: 認証、データベース管理、画像ストレージ</li>
                    <li>プライバシーポリシー: https://supabase.com/privacy</li>
                  </ul>
                </div>
                <div className="text-muted-foreground">
                  <p className="font-medium text-foreground">Lemon Squeezy（米国）</p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>提供情報: 決済情報、サブスクリプション情報</li>
                    <li>目的: 決済処理、サブスクリプション管理</li>
                    <li>プライバシーポリシー: https://www.lemonsqueezy.com/privacy</li>
                  </ul>
                </div>
                <div className="text-muted-foreground">
                  <p className="font-medium text-foreground">Vercel（米国）</p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>提供情報: アクセスログ、利用統計</li>
                    <li>目的: ホスティング、パフォーマンス分析</li>
                    <li>プライバシーポリシー: https://vercel.com/legal/privacy-policy</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-light text-foreground mb-2">4.2 任意サービス（OAuth認証時のみ）</h3>
              <div className="text-muted-foreground mb-6">
                <p className="font-medium text-foreground">Google（米国）</p>
                <ul className="list-disc list-inside space-y-1 mt-1">
                  <li>提供情報: Googleアカウント情報</li>
                  <li>目的: OAuth認証</li>
                  <li>プライバシーポリシー: https://policies.google.com/privacy</li>
                </ul>
              </div>

              <h3 className="text-xl font-light text-foreground mb-2">4.3 広告サービス（Free Member / Guest のみ）</h3>
              <div className="space-y-4 text-muted-foreground mb-4">
                <div>
                  <p className="font-medium text-foreground">Google AdSense（米国）</p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>提供情報: Cookie、アクセス情報</li>
                    <li>目的: パーソナライズド広告の配信</li>
                    <li>プライバシーポリシー: https://policies.google.com/privacy</li>
                    <li>オプトアウト: https://adssettings.google.com/</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-foreground">アフィリエイトプログラム</p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Amazon Associates、Adobe Affiliate Program、Shutterstock Affiliate</li>
                    <li>提供情報: Cookie、クリック情報</li>
                    <li>目的: アフィリエイト広告の効果測定</li>
                  </ul>
                </div>
              </div>
              <p className="text-muted-foreground font-medium">FitStock Plus会員は、すべての広告が非表示となります。</p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">5. Cookieの使用</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">当サービスでは、以下の目的でCookieを使用します。</p>

              <h3 className="text-xl font-light text-foreground mb-2">5.1 必須Cookie</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>ユーザー認証情報の保持</li>
                <li>セッション管理</li>
                <li>セキュリティ対策</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">5.2 機能的Cookie</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>言語設定の保存</li>
                <li>UI設定の保存</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">5.3 分析Cookie</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>Vercel Analytics（匿名化された利用統計）</li>
                <li>サービス改善のためのアクセス解析</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">5.4 広告Cookie（Free Member / Guest のみ）</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>Google AdSense（パーソナライズド広告）</li>
                <li>アフィリエイトトラッキング</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">Cookieの無効化方法</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">ブラウザの設定でCookieを無効化できますが、一部機能が正常に動作しなくなる可能性があります。</p>
              <p className="text-muted-foreground leading-relaxed mb-2">主要ブラウザの設定方法:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Chrome: 設定 &gt; プライバシーとセキュリティ &gt; Cookie と他のサイトデータ</li>
                <li>Safari: 環境設定 &gt; プライバシー &gt; Cookie とウェブサイトのデータ</li>
                <li>Firefox: オプション &gt; プライバシーとセキュリティ &gt; Cookie とサイトデータ</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">6. セキュリティ対策</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">当サービスでは、以下のセキュリティ対策を実施しています。</p>

              <h3 className="text-xl font-light text-foreground mb-2">通信の暗号化</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>SSL/TLS（HTTPS）による全通信の暗号化</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">アクセス制御</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>Supabase Row Level Security（RLS）によるデータベースアクセス制限</li>
                <li>役割ベースのアクセス制御</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">パスワード保護</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>bcryptによるパスワードのハッシュ化</li>
                <li>平文での保存は一切行いません</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">定期的な監査</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>セキュリティログの監視</li>
                <li>定期的な脆弱性スキャン</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">バックアップ</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>日次の自動バックアップ（Backblaze B2）</li>
                <li>災害復旧計画の策定</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">7. ユーザーの権利</h2>

              <h3 className="text-xl font-light text-foreground mb-2">7.1 開示請求</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">ご自身の個人情報の開示を請求できます。</p>

              <h3 className="text-xl font-light text-foreground mb-2">7.2 訂正・削除請求</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">個人情報の訂正または削除を請求できます。</p>

              <h3 className="text-xl font-light text-foreground mb-2">7.3 利用停止請求</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">個人情報の利用停止を請求できます。</p>

              <h3 className="text-xl font-light text-foreground mb-2">7.4 データポータビリティ（GDPR対応）</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">ご自身の個人情報を機械可読形式で受け取ることができます。</p>

              <h3 className="text-xl font-light text-foreground mb-2">7.5 アカウント削除</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">マイページからいつでもアカウントを削除できます。削除後、以下の処理が行われます。</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>個人情報の完全削除（30日以内）</li>
                <li>ダウンロード履歴の削除</li>
                <li>お気に入り情報の削除</li>
                <li>サブスクリプションの自動キャンセル</li>
              </ul>

              <p className="text-muted-foreground leading-relaxed">請求方法: お問い合わせフォーム（/contact）または privacy@fitstock.example.com までご連絡ください。</p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">8. データの保持期間</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>アカウント情報: アカウント削除まで</li>
                <li>ダウンロード履歴: アカウント削除まで</li>
                <li>決済履歴: 法令で定められた期間（最大7年間）</li>
                <li>アクセスログ: 90日間</li>
                <li>Cookie: ブラウザ設定に依存（最大2年間）</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">9. 未成年者の利用</h2>
              <p className="text-muted-foreground leading-relaxed">
                当サービスは、18歳未満の方の利用を想定していません。18歳未満の方が誤って登録された場合、速やかに削除いたしますので、お問い合わせください。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">10. GDPR対応（EU圏ユーザー向け）</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">EU一般データ保護規則（GDPR）に基づき、以下の権利を保障します。</p>

              <h3 className="text-xl font-light text-foreground mb-2">10.1 データ処理の法的根拠</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>契約の履行（サービス提供）</li>
                <li>正当な利益（サービス改善、セキュリティ対策）</li>
                <li>ユーザーの同意（広告配信、メールマガジン）</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">10.2 EU域外へのデータ転送</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">当サービスでは、米国のサービスプロバイダー（Supabase、Lemon Squeezy、Vercel等）を利用しています。これらのプロバイダーは、適切なデータ保護措置を講じています。</p>

              <h3 className="text-xl font-light text-foreground mb-2">10.3 データ保護責任者</h3>
              <p className="text-muted-foreground leading-relaxed">お問い合わせ先: privacy@fitstock.example.com</p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">11. プライバシーポリシーの変更</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">当サービスは、法令の改正やサービス内容の変更に伴い、本プライバシーポリシーを変更することがあります。</p>
              <p className="text-muted-foreground leading-relaxed mb-2">変更方法:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>重要な変更の場合: 30日前に登録メールアドレスへ通知</li>
                <li>軽微な変更の場合: 本ページでの告知のみ</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-2">最終更新日: 各変更時に更新</p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">12. お問い合わせ</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">プライバシーポリシーに関するご質問は、以下までお問い合わせください。</p>
              <div className="text-muted-foreground space-y-1">
                <p>メール: privacy@fitstock.example.com</p>
                <p>お問い合わせフォーム: https://fitstock.example.com/contact</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">13. 準拠法・管轄裁判所</h2>
              <p className="text-muted-foreground leading-relaxed">
                本プライバシーポリシーは、日本法に準拠し、解釈されるものとします。本プライバシーポリシーに関する紛争については、[運営者所在地]を管轄する裁判所を専属的合意管轄裁判所とします。
              </p>
            </section>

            <div className="border-t border-border pt-8 mt-8 text-center">
              <p className="text-muted-foreground">以上</p>
              <p className="text-muted-foreground mt-2">FitStock 運営チーム</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
