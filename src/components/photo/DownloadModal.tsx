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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
                {t("modal.title")}
              </DialogTitle>
              {showAuthCta ? (
                <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
                  {t("modal.guestDescription")}
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
                  {t("modal.joinPlus")}
                </Button>
              </Link>

              {showAuthCta && (
                <Link to="/register">
                  <Button
                    variant="outline"
                    className="w-full font-medium py-6 text-base rounded-lg"
                  >
                    {t("modal.freeRegister")}
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
                    ? t("modal.downloading")
                    : isWaitCompleted
                      ? t("modal.download")
                      : t("modal.waitDownload", { count: remainingSeconds })}
                </Button>
              )}

              {showLimitMessage && (
                <Button
                  variant="outline"
                  className="w-full font-medium py-6 text-base rounded-lg"
                  onClick={() => onOpenChange(false)}
                >
                  {t("common.close")}
                </Button>
              )}
            </div>

            {showAuthCta && (
              <p className="text-center text-sm text-muted-foreground mt-4">
                {t("modal.haveAccount")}{" "}
                <Link to="/login" className="text-red-500 hover:underline font-medium">
                  {t("common.login")}
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
