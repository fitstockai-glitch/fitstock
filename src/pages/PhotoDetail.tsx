import { useParams, Link } from "react-router-dom";
import { Heart, Download, Share2, X, Facebook, Link2, Check, ZoomIn } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import FitStockHeader from "@/components/header/FitStockHeader";
import Footer from "@/components/footer/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { photos } from "@/data/photos";
import MasonryGallery from "@/components/photo/MasonryGallery";
import DownloadModal from "@/components/photo/DownloadModal";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

const PhotoDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isLiked, setIsLiked] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const imageAreaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [zoomIconPosition, setZoomIconPosition] = useState({ top: 16, left: 16 });

  const baseId = id?.split("-")[0] || "1";
  const photo = photos.find((p) => p.id === baseId) || photos[0];
  const relatedPhotos = photos.filter((p) => p.id !== baseId);

  const handleDownload = () => {
    setIsDownloadModalOpen(true);
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(photo.title);
    
    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${url}&description=${text}&media=${encodeURIComponent(photo.imageUrl)}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
    setIsShareOpen(false);
  };

  useEffect(() => {
    const updateZoomIconPosition = () => {
      if (!imageAreaRef.current || !imageRef.current) return;

      const areaRect = imageAreaRef.current.getBoundingClientRect();
      const imageRect = imageRef.current.getBoundingClientRect();

      setZoomIconPosition({
        top: Math.max(8, imageRect.top - areaRect.top + 12),
        left: Math.max(8, imageRect.right - areaRect.left - 12),
      });
    };

    updateZoomIconPosition();

    const imageEl = imageRef.current;
    if (imageEl && !imageEl.complete) {
      imageEl.addEventListener("load", updateZoomIconPosition);
    }

    window.addEventListener("resize", updateZoomIconPosition);

    return () => {
      window.removeEventListener("resize", updateZoomIconPosition);
      if (imageEl) {
        imageEl.removeEventListener("load", updateZoomIconPosition);
      }
    };
  }, [photo.imageUrl]);

  return (
    <div className="min-h-screen bg-background">
      <FitStockHeader />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Title - Full width above columns */}
        <h1 className="text-base md:text-lg font-normal text-foreground mb-6">
          {photo.title}
        </h1>

        {/* Main content - 2 column layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Photo */}
          <div className="flex-1">
            <div 
              ref={imageAreaRef}
              className="overflow-hidden relative group cursor-zoom-in aspect-[20/13] flex items-start justify-center"
              onClick={() => setIsZoomOpen(true)}
            >
              <img
                ref={imageRef}
                src={photo.imageUrl}
                alt={photo.title}
                className="max-w-full max-h-full object-contain"
              />
              <div
                className="absolute p-2 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{
                  top: `${zoomIconPosition.top}px`,
                  left: `${zoomIconPosition.left}px`,
                  transform: "translateX(-100%)",
                }}
              >
                <ZoomIn size={20} className="text-foreground" />
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="lg:w-80 space-y-5">
            {/* Download button */}
            <Button
              onClick={handleDownload}
              className="w-full bg-foreground hover:bg-foreground/90 text-background font-medium py-6"
              size="lg"
            >
              ダウンロード
            </Button>

            {/* Plus plan card */}
            <div className="border border-border rounded-lg p-5 space-y-4">
              <h3 className="font-semibold text-foreground">無制限ダウンロード定額プラン</h3>
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
              <Link to="/pricing">
                <Button
                  className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-medium mt-2"
                >
                  FitStock Plusに参加する
                </Button>
              </Link>
            </div>

            {/* SEO description */}
            <p className="text-xs text-muted-foreground/70 leading-relaxed">
              「{photo.title}」は{photo.tags.map(t => `「${t}」`).join('、')}に関連するフリー素材です。商用利用可能な高品質写真をFitStockで無料ダウンロード。Webデザインや広告、SNS投稿にご活用ください。
            </p>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className={`flex-1 h-11 gap-2 rounded-md justify-start ${
                  isLiked ? "bg-red-50 border-red-200" : ""
                }`}
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart
                  size={16}
                  className={isLiked ? "fill-red-500 text-red-500" : "text-foreground"}
                />
                <span className="text-sm">お気に入りに追加</span>
              </Button>

              <div className="relative flex-1">
                <Button
                  variant="outline"
                  className="w-full h-11 rounded-md justify-start relative"
                  onClick={() => setIsShareOpen(!isShareOpen)}
                >
                  <Share2 size={16} className="text-foreground" />
                  <span className="text-sm absolute inset-0 flex items-center justify-center">シェア</span>
                </Button>

                {isShareOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsShareOpen(false)}
                    />
                    <div className="absolute left-0 top-full mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-50 py-2">
                      <button
                        onClick={() => handleShare("twitter")}
                        className="w-full px-4 py-2.5 text-sm text-left hover:bg-secondary transition-colors flex items-center gap-3"
                      >
                        <X size={16} />
                        X でシェア
                      </button>
                      <button
                        onClick={() => handleShare("facebook")}
                        className="w-full px-4 py-2.5 text-sm text-left hover:bg-secondary transition-colors flex items-center gap-3"
                      >
                        <Facebook size={16} />
                        Facebook でシェア
                      </button>
                      <button
                        onClick={() => handleShare("pinterest")}
                        className="w-full px-4 py-2.5 text-sm text-left hover:bg-secondary transition-colors flex items-center gap-3"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.4.04-3.43l1.4-5.96s-.35-.71-.35-1.77c0-1.66.96-2.9 2.16-2.9 1.02 0 1.51.77 1.51 1.68 0 1.03-.65 2.56-1 3.98-.28 1.2.6 2.17 1.78 2.17 2.14 0 3.78-2.25 3.78-5.5 0-2.88-2.07-4.89-5.02-4.89-3.42 0-5.43 2.57-5.43 5.22 0 1.03.4 2.14.9 2.75.1.12.11.22.08.34l-.34 1.36c-.05.22-.18.27-.41.16-1.52-.7-2.47-2.93-2.47-4.72 0-3.84 2.79-7.36 8.04-7.36 4.22 0 7.5 3.01 7.5 7.02 0 4.19-2.64 7.56-6.31 7.56-1.23 0-2.4-.64-2.79-1.4l-.76 2.9c-.28 1.06-1.03 2.38-1.53 3.19A12 12 0 1 0 12 0z"/>
                        </svg>
                        Pinterest でシェア
                      </button>
                      <button
                        onClick={handleCopyLink}
                        className="w-full px-4 py-2.5 text-sm text-left hover:bg-secondary transition-colors flex items-center gap-3"
                      >
                        {isCopied ? <Check size={16} className="text-green-500" /> : <Link2 size={16} />}
                        {isCopied ? "コピーしました!" : "リンクをコピー"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tags - Full width below columns */}
        <div className="flex flex-wrap gap-2 mt-8">
          {photo.tags.map((tag) => (
            <Link key={tag} to={`/category/${tag}`}>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-accent transition-colors px-3 py-1.5 text-sm font-normal rounded-sm bg-muted border-transparent text-muted-foreground"
              >
                {tag}
              </Badge>
            </Link>
          ))}
        </div>
      </main>

      {/* Related Images Section */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold text-foreground mb-1 px-4 md:px-8">
          関連するイメージ
        </h2>
        <MasonryGallery photos={relatedPhotos} />
      </section>

      <Footer />

      <DownloadModal open={isDownloadModalOpen} onOpenChange={setIsDownloadModalOpen} />

      {/* Zoom Modal */}
      <Dialog open={isZoomOpen} onOpenChange={setIsZoomOpen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-transparent border-none shadow-none [&>button]:text-white [&>button]:opacity-100 [&>button]:hover:text-white/70 [&>button>svg]:h-6 [&>button>svg]:w-6 [&>button]:ring-0 [&>button]:ring-offset-0 [&>button]:focus:ring-0 [&>button]:focus:ring-offset-0">
          <img
            src={photo.imageUrl}
            alt={photo.title}
            className="w-full h-full object-contain max-h-[90vh] rounded-lg"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PhotoDetail;