import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { buildThumbnailPublicUrlFlexible } from "@/lib/supabaseStorage";
import PlanBenefitsList from "@/components/photo/PlanBenefitsList";

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
  const { data: galleryThumbUrls = [] } = useQuery({
    queryKey: ["download-modal-gallery-thumbnails"],
    staleTime: 10 * 60 * 1000,
    queryFn: async (): Promise<string[]> => {
      const { data, error } = await supabase
        .from("photos")
        .select("preview_path")
        .eq("is_published", true)
        .is("deleted_at", null)
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      return (data ?? [])
        .map((row) => buildThumbnailPublicUrlFlexible(row.preview_path))
        .filter((u): u is string => Boolean(u));
    },
  });

  const randomHero = useMemo(() => {
    if (!galleryThumbUrls.length) return null;
    return galleryThumbUrls[Math.floor(Math.random() * galleryThumbUrls.length)];
  }, [open, galleryThumbUrls]);
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
          {randomHero ? (
            <div className="hidden sm:block sm:w-1/2 bg-muted">
              <img
                src={randomHero}
                alt=""
                className="w-full h-full min-h-[480px] object-cover"
              />
            </div>
          ) : null}

          <div
            className={
              randomHero ? "sm:w-1/2 p-6 sm:p-8 flex flex-col justify-center" : "w-full p-6 sm:p-8 flex flex-col justify-center"
            }
          >
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
                  <PlanBenefitsList />
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
