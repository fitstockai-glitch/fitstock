import { useEffect } from "react";
import FitStockHeader from "@/components/header/FitStockHeader";
import Footer from "../components/footer/Footer";

const TermsOfService = () => {
  useEffect(() => {
    document.title = "利用規約 - FitStock";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <FitStockHeader />
      
      <main className="pt-6">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-light text-foreground mb-4">利用規約</h1>
            <p className="text-muted-foreground">最終更新日: 2024年2月27日</p>
          </header>

          <div className="prose prose-lg max-w-none space-y-8">
            <p className="text-muted-foreground leading-relaxed">
              本利用規約（以下「本規約」といいます）は、FitStock（以下「当サービス」といいます）が提供する写真素材ダウンロードサービスの利用条件を定めるものです。当サービスをご利用いただく際には、本規約に同意したものとみなされます。
            </p>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">第1条（定義）</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">本規約において使用する用語の定義は、以下のとおりとします。</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>当サービス: FitStockが提供する写真素材ダウンロードサービス</li>
                <li>ユーザー: 当サービスを利用するすべての方（Guest、Free Member、FitStock Plus会員を含む）</li>
                <li>登録ユーザー: 当サービスにアカウントを登録した方</li>
                <li>コンテンツ: 当サービスで提供される写真、画像、テキスト、その他の情報</li>
                <li>本規約: 本利用規約および当サービスが別途定めるポリシー・ガイドライン</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">第2条（サービスの概要）</h2>

              <h3 className="text-xl font-light text-foreground mb-2">2.1 サービス内容</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">当サービスは、フィットネス・スポーツ・健康をテーマにした写真素材を提供するプラットフォームです。ユーザーは、本規約に従って写真をダウンロードし、利用することができます。</p>

              <h3 className="text-xl font-light text-foreground mb-2">2.2 プラン構成</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">当サービスは、以下の3つのプランを提供します。</p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm text-muted-foreground border border-border">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left p-3 font-medium text-foreground">プラン</th>
                      <th className="text-left p-3 font-medium text-foreground">料金</th>
                      <th className="text-left p-3 font-medium text-foreground">ダウンロード制限</th>
                      <th className="text-left p-3 font-medium text-foreground">ライセンス</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="p-3">Guest（未登録）</td>
                      <td className="p-3">無料</td>
                      <td className="p-3">不可</td>
                      <td className="p-3">-</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-3">Free Member</td>
                      <td className="p-3">無料</td>
                      <td className="p-3">1日10枚まで</td>
                      <td className="p-3">クレジット表記不要</td>
                    </tr>
                    <tr>
                      <td className="p-3">FitStock Plus</td>
                      <td className="p-3">¥1,000/月</td>
                      <td className="p-3">無制限</td>
                      <td className="p-3">クレジット表記不要</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">第3条（利用登録）</h2>

              <h3 className="text-xl font-light text-foreground mb-2">3.1 登録方法</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">ユーザーは、以下のいずれかの方法で登録できます。</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>メールアドレスとパスワード</li>
                <li>Googleアカウント（OAuth認証）</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">3.2 登録情報の正確性</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">ユーザーは、正確かつ最新の情報を登録する責任を負います。虚偽の情報を登録した場合、当サービスはアカウントを停止または削除することができます。</p>

              <h3 className="text-xl font-light text-foreground mb-2">3.3 アカウント管理責任</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">ユーザーは、自身のアカウント情報（メールアドレス、パスワード）を適切に管理する責任を負います。第三者による不正利用があった場合でも、当サービスは一切の責任を負いません。</p>

              <h3 className="text-xl font-light text-foreground mb-2">3.4 登録拒否事由</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">以下に該当する場合、当サービスは登録を拒否することができます。</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>過去に本規約違反により利用停止された方</li>
                <li>虚偽の情報を登録した場合</li>
                <li>18歳未満の方</li>
                <li>その他、当サービスが不適切と判断した場合</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">第4条（FitStock Plus（月額プラン））</h2>

              <h3 className="text-xl font-light text-foreground mb-2">4.1 料金</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">FitStock Plusの料金は、月額¥1,000（税込）です。</p>

              <h3 className="text-xl font-light text-foreground mb-2">4.2 支払方法</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">クレジットカード決済のみ対応しています。決済は、決済代行サービス（Lemon Squeezy）を通じて処理されます。</p>

              <h3 className="text-xl font-light text-foreground mb-2">4.3 請求タイミング</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>初回: 登録時に即時決済</li>
                <li>2回目以降: 毎月同日に自動請求</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">4.4 プランのキャンセル</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">ユーザーは、いつでもFitStock Plusをキャンセルできます。</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>キャンセル後も次回請求日まで引き続き利用可能</li>
                <li>次回請求日以降は、Free Memberプランに自動移行</li>
                <li>日割り返金は行いません</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">4.5 プランのアップグレード</h3>
              <p className="text-muted-foreground leading-relaxed">Free MemberからFitStock Plusへのアップグレードは、マイページまたはプライシングページからいつでも可能です。</p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">第5条（ライセンス条件）</h2>

              <h3 className="text-xl font-light text-foreground mb-2">5.1 利用許諾</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">当サービスでダウンロードした写真は、以下の条件で利用できます。</p>

              <p className="text-foreground font-medium mt-4 mb-2">許可される用途:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>商用利用（広告、Webサイト、SNS投稿、印刷物、動画など）</li>
                <li>編集・加工</li>
                <li>AI学習データとしての利用</li>
                <li>個人利用</li>
                <li>クレジット表記不要</li>
              </ul>

              <p className="text-foreground font-medium mb-2">禁止される用途:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>写真そのものの再販売（素材サイトでの販売等）</li>
                <li>NFTとしての販売</li>
                <li>商標登録</li>
                <li>公序良俗に反する用途（アダルトコンテンツ、違法行為等）</li>
                <li>他人の権利を侵害する利用</li>
                <li>特定の個人や団体を誹謗中傷する目的での利用</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">5.2 クレジット表記</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">FitStockでは、すべてのプランでクレジット表記は不要です。ただし、任意で「Photo by FitStock」等の表記をしていただくことは歓迎します。</p>

              <h3 className="text-xl font-light text-foreground mb-2">5.3 ライセンスの譲渡禁止</h3>
              <p className="text-muted-foreground leading-relaxed">ダウンロードした写真の利用権は、ダウンロードしたユーザー本人のみに付与されます。第三者への譲渡・再販売はできません。</p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">第6条（知的財産権）</h2>

              <h3 className="text-xl font-light text-foreground mb-2">6.1 著作権</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">当サービスで提供される写真およびコンテンツの著作権は、FitStockまたは正当な権利者に帰属します。</p>

              <h3 className="text-xl font-light text-foreground mb-2">6.2 利用許諾</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">ユーザーは、本規約に従って写真を利用する非独占的な権利を取得します。著作権そのものは移転しません。</p>

              <h3 className="text-xl font-light text-foreground mb-2">6.3 商標権</h3>
              <p className="text-muted-foreground leading-relaxed">「FitStock」およびロゴは、当サービスの商標です。無断使用を禁止します。</p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">第7条（禁止事項）</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">ユーザーは、以下の行為を行ってはなりません。</p>

              <h3 className="text-xl font-light text-foreground mb-2">不正利用</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>複数アカウントの作成による制限回避</li>
                <li>ダウンロード制限を回避する技術的措置</li>
                <li>自動化ツール（ボット）の使用</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">写真の不正利用</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>写真そのものの再販売</li>
                <li>公序良俗に反する用途</li>
                <li>第三者の権利を侵害する利用</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">システムへの攻撃</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>不正アクセス</li>
                <li>サーバーへの過度な負荷</li>
                <li>マルウェアの配布</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">その他</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>虚偽の情報登録</li>
                <li>他人へのなりすまし</li>
                <li>法令違反行為</li>
                <li>当サービスの運営を妨害する行為</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">第8条（利用制限・アカウント停止）</h2>

              <h3 className="text-xl font-light text-foreground mb-2">8.1 利用制限</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">当サービスは、ユーザーが以下に該当する場合、事前の通知なくアカウントを停止または削除できます。</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>本規約に違反した場合</li>
                <li>6ヶ月以上ログインがない場合</li>
                <li>決済の不履行</li>
                <li>その他、当サービスが不適切と判断した場合</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">8.2 停止中の料金</h3>
              <p className="text-muted-foreground leading-relaxed">アカウント停止期間中も、FitStock Plusの料金は発生します。停止を解除する場合は、お問い合わせください。</p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">第9条（免責事項）</h2>

              <h3 className="text-xl font-light text-foreground mb-2">9.1 サービスの提供</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">当サービスは、以下について一切の保証を行いません。</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>サービスの継続性・安定性</li>
                <li>ダウンロードした写真の品質</li>
                <li>写真が特定の目的に適合すること</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">9.2 損害賠償の制限</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">当サービスは、ユーザーに発生した損害について、以下の範囲を超えて責任を負いません。</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>直接かつ現実に発生した損害のみ</li>
                <li>損害賠償額は、過去3ヶ月間に支払われた利用料金を上限とする</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">9.3 ダウンロード後の利用責任</h3>
              <p className="text-muted-foreground leading-relaxed">ダウンロードした写真の利用によって生じた問題（著作権侵害の主張等）については、ユーザー自身の責任で対処するものとします。</p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">第10条（サービスの変更・中断・終了）</h2>

              <h3 className="text-xl font-light text-foreground mb-2">10.1 サービスの変更</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">当サービスは、事前の通知なくサービス内容を変更できます。</p>

              <h3 className="text-xl font-light text-foreground mb-2">10.2 サービスの中断</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">以下の場合、サービスを一時的に中断することがあります。</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>システムメンテナンス</li>
                <li>緊急の不具合対応</li>
                <li>天災・災害</li>
                <li>その他やむを得ない事由</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">10.3 サービスの終了</h3>
              <p className="text-muted-foreground leading-relaxed">当サービスは、30日前の事前通知をもって、サービスを終了できます。</p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">第11条（個人情報の取扱い）</h2>
              <p className="text-muted-foreground leading-relaxed">
                ユーザーの個人情報は、別途定める「プライバシーポリシー」に従って取り扱います。
              </p>
              <p className="text-muted-foreground leading-relaxed mt-2">プライバシーポリシー: https://fitstock.ai/privacy</p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">第12条（規約の変更）</h2>

              <h3 className="text-xl font-light text-foreground mb-2">12.1 変更の通知</h3>
              <p className="text-muted-foreground leading-relaxed mb-2">当サービスは、本規約を変更する場合、以下の方法で通知します。</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                <li>重要な変更: 30日前に登録メールアドレスへ通知</li>
                <li>軽微な変更: 本ページでの告知のみ</li>
              </ul>

              <h3 className="text-xl font-light text-foreground mb-2">12.2 変更後の利用</h3>
              <p className="text-muted-foreground leading-relaxed">規約変更後もサービスを継続利用した場合、変更後の規約に同意したものとみなします。</p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">第13条（準拠法・管轄裁判所）</h2>

              <h3 className="text-xl font-light text-foreground mb-2">13.1 準拠法</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">本規約は、日本法に準拠し、解釈されるものとします。</p>

              <h3 className="text-xl font-light text-foreground mb-2">13.2 管轄裁判所</h3>
              <p className="text-muted-foreground leading-relaxed">本規約に関する紛争については、東京都渋谷区本町3-51-17 402を管轄する裁判所を専属的合意管轄裁判所とします。</p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">第14条（お問い合わせ）</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">本規約に関するご質問は、以下までお問い合わせください。</p>
              <p className="text-muted-foreground">メール: info@fitstock.ai</p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">第15条（分離可能性）</h2>
              <p className="text-muted-foreground leading-relaxed">
                本規約のいずれかの条項が無効または執行不能と判断された場合でも、その他の条項は引き続き有効に存続します。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-foreground mb-4">第16条（言語）</h2>
              <p className="text-muted-foreground leading-relaxed">
                本規約は、日本語を正文とします。翻訳版と日本語版に相違がある場合、日本語版が優先します。
              </p>
            </section>

            <div className="border-t border-border pt-8 mt-8 text-left">
              <p className="text-muted-foreground">以上</p>
              <p className="text-muted-foreground mt-2">FitStock 利用規約</p>
              <p className="text-muted-foreground mt-1">制定日: 2024年2月27日</p>
              <p className="text-muted-foreground mt-1">最終更新日: 2024年2月27日</p>
              <p className="text-muted-foreground mt-2">FitStock 運営チーム</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;
