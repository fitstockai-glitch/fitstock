import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DownloadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DownloadModal = ({ open, onOpenChange }: DownloadModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-8">
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

        <p className="text-center text-sm text-muted-foreground mt-2">
          すでにアカウントをお持ちですか？{" "}
          <Link to="/login" className="text-red-500 hover:underline font-medium">
            ログイン
          </Link>
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadModal;
