import { Link } from "react-router-dom";
import { useMemo } from "react";
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
}

const DownloadModal = ({ open, onOpenChange }: DownloadModalProps) => {
  const randomHero = useMemo(
    () => heroImages[Math.floor(Math.random() * heroImages.length)],
    [open]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden border-none">
        <div className="flex flex-col sm:flex-row min-h-[420px]">
          {/* Left: Hero Image */}
          <div className="hidden sm:block sm:w-1/2">
            <img
              src={randomHero}
              alt="Hero"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Content */}
          <div className="sm:w-1/2 p-8 flex flex-col justify-center">
            <DialogHeader className="space-y-3">
              <DialogTitle className="text-2xl font-bold leading-tight">
                制限を気にせず、クリエイティブに集中しよう
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
                サインアップすると1日10回の無料ダウンロードが可能に。さらに、FitStock Plus（月額¥1,000）に加入すれば無制限のダウンロードが可能になります。
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-3 mt-4">
              <Link to="/pricing">
                <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-6 text-base rounded-lg">
                  FitStock Plusに参加する
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  variant="outline"
                  className="w-full font-medium py-6 text-base rounded-lg"
                >
                  無料登録する
                </Button>
              </Link>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-4">
              すでにアカウントをお持ちですか？{" "}
              <Link to="/login" className="text-red-500 hover:underline font-medium">
                ログイン
              </Link>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadModal;
