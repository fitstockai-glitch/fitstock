import { useParams, Link } from "react-router-dom";
import { Heart, Download, Share2, X, Facebook, Link2, Check, ZoomIn } from "lucide-react";
import { useState } from "react";
import FitStockHeader from "@/components/header/FitStockHeader";
import Footer from "@/components/footer/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { photos } from "@/data/photos";
import MasonryGallery from "@/components/photo/MasonryGallery";
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

  // Find the photo by id (handle the infinite scroll id format)
  const baseId = id?.split("-")[0] || "1";
  const photo = photos.find((p) => p.id === baseId) || photos[0];

  // Get related photos (exclude current photo)
  const relatedPhotos = photos.filter((p) => p.id !== baseId);

  const handleDownload = () => {
    window.open(photo.imageUrl, "_blank");
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

  return (
    <div className="min-h-screen bg-background">
      <FitStockHeader />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Main content - 2 column layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Photo */}
          <div className="flex-1 space-y-8">
            {/* Main photo */}
            <div 
              className="rounded-xl overflow-hidden bg-muted relative group cursor-zoom-in"
              onClick={() => setIsZoomOpen(true)}
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-auto object-cover"
              />
              {/* Zoom icon overlay */}
              <div className="absolute top-4 right-4 p-2 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <ZoomIn size={20} className="text-foreground" />
              </div>
            </div>

          </div>

          {/* Right sidebar */}
          <div className="lg:w-80 space-y-6">
            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
              {photo.title}
            </h1>

            {/* Download button */}
            <Button
              onClick={handleDownload}
              className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-medium py-6"
              size="lg"
            >
              <Download className="mr-2" size={20} />
              ダウンロード
            </Button>

            {/* FitStock Plus card */}
            <div className="bg-secondary rounded-xl p-5 space-y-3">
              <h3 className="font-semibold text-foreground">FitStock Plus</h3>
              <p className="text-sm text-muted-foreground">
                無制限ダウンロード / 広告なし / 月額¥1,000
              </p>
              <Link to="/pricing">
                <Button
                  variant="outline"
                  className="w-full border-foreground text-foreground hover:bg-foreground hover:text-background"
                >
                  今すぐアップグレード
                </Button>
              </Link>
            </div>

            {/* SEO description */}
            <p className="text-xs text-muted-foreground/70 leading-relaxed">
              「{photo.title}」は{photo.tags.map(t => `「${t}」`).join('、')}に関連するフリー素材です。商用利用可能な高品質写真をFitStockで無料ダウンロード。Webデザインや広告、SNS投稿にご活用ください。
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {photo.tags.map((tag) => (
                <Link key={tag} to={`/category/${tag}`}>
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-accent transition-colors px-3 py-1.5 text-sm"
                  >
                    #{tag}
                  </Badge>
                </Link>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              {/* Favorite button */}
              <Button
                variant="outline"
                size="icon"
                className={`h-12 w-12 rounded-full ${
                  isLiked ? "bg-red-50 border-red-200" : ""
                }`}
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart
                  size={20}
                  className={isLiked ? "fill-red-500 text-red-500" : "text-foreground"}
                />
              </Button>

              {/* Share button */}
              <div className="relative">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 rounded-full"
                  onClick={() => setIsShareOpen(!isShareOpen)}
                >
                  <Share2 size={20} className="text-foreground" />
                </Button>

                {/* Share dropdown */}
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

      </main>

      {/* Related Images Section - Full width */}
      <section className="mt-16">
        <h2 className="text-xl font-semibold text-foreground mb-4 px-4 md:px-8">
          関連するイメージ
        </h2>
        <MasonryGallery photos={relatedPhotos} />
      </section>

      <Footer />

      {/* Zoom Modal */}
      <Dialog open={isZoomOpen} onOpenChange={setIsZoomOpen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-transparent border-none">
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
