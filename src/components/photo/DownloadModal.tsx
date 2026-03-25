import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const heroImages = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80",
];

interface DownloadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "guest" | "upsell_wait" | "limit_reached";
  onDownload?: () => Promise<void> | void;
  isDownloading?: boolean;
}

const DownloadModal = ({
  open,
  onOpenChange,
  mode = "guest",
  onDownload,
  isDownloading = false,
}: DownloadModalProps) => {
  const randomHero = useMemo(
    () => heroImages[Math.floor(Math.random() * heroImages.length)],
    [open]
  );
  const [remainingSeconds, setRemainingSeconds] = useState(5);

  useEffect(() => {
    if (!open || mode !== "upsell_wait") return;
    setRemainingSeconds(5);
    const timer = window.setInterval(() => {
      setRemainingSeconds((current) => (current > 0 ? current - 1 : 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [open, mode]);

  const isWaitCompleted = remainingSeconds <= 0;
  const showAuthCta = mode === "guest";
  const showDownloadButton = mode === "upsell_wait";
  const showLimitMessage = mode === "limit_reached";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-3xl p-0 overflow-hidden border-none">
        <div className="flex flex-col sm:flex-row sm:min-h-[480px]">
          {/* Left: Hero Image */}
          <div className="hidden sm:block sm:w-1/2">
            <img
              src={randomHero}
              alt="Hero"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Content */}
          <div className="sm:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
            <DialogHeader className="space-y-3 mt-6 sm:mt-0 text-left">
              <DialogTitle className="text-2xl font-bold leading-tight">
                制限を気にせず、クリエイティブに集中しよう
              </DialogTitle>
              {showAuthCta ? (
                <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
                  サインアップすると1日10回の無料ダウンロードが可能に。さらに、FitStock Plus（月額¥1,000）に加入すれば無制限のダウンロードが可能になります。
                </DialogDescription>
              ) : (
                <div>
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check size={16} className="text-foreground mt-0.5 flex-shrink-0" />
                      <span>画像ライブラリのすべての素材がダウンロード可能</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check size={16} className="text-foreground mt-0.5 flex-shrink-0" />
                      <span>クリエイティブデジタルおよび印刷物に使用できる加工可能なライセンス</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check size={16} className="text-foreground mt-0.5 flex-shrink-0" />
                      <span>業界最安値</span>
                    </li>
                  </ul>
                </div>
              )}
            </DialogHeader>

            <div className="flex flex-col gap-3 mt-10">
              <Link to="/pricing">
                <Button className="w-full bg-red-500 hover:bg-red-500/80 text-white font-medium py-6 text-base rounded-lg">
                  FitStock Plusに参加する
                </Button>
              </Link>

              {showAuthCta && (
                <Link to="/register">
                  <Button
                    variant="outline"
                    className="w-full font-medium py-6 text-base rounded-lg"
                  >
                    無料登録する
                  </Button>
                </Link>
              )}

              {showDownloadButton && (
                <Button
                  onClick={onDownload}
                  disabled={!isWaitCompleted || isDownloading}
                  className="w-full bg-foreground hover:bg-foreground/90 text-background font-medium py-6 text-base rounded-lg disabled:opacity-70"
                >
                  {isDownloading
                    ? "ダウンロード中..."
                    : isWaitCompleted
                      ? "ダウンロードする"
                      : `${remainingSeconds}秒後にダウンロード可能`}
                </Button>
              )}

              {showLimitMessage && (
                <Button
                  variant="outline"
                  className="w-full font-medium py-6 text-base rounded-lg"
                  onClick={() => onOpenChange(false)}
                >
                  閉じる
                </Button>
              )}
            </div>

            {showAuthCta && (
              <p className="text-center text-sm text-muted-foreground mt-4">
                すでにアカウントをお持ちですか？{" "}
                <Link to="/login" className="text-red-500 hover:underline font-medium">
                  ログイン
                </Link>
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadModal;
