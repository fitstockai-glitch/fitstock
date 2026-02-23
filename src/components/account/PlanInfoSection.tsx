import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { PlanStatus } from "@/pages/Account";

interface PlanInfoSectionProps {
  planStatus: PlanStatus;
  onUpgrade: () => void;
  onCancel: () => void;
  onReactivate: () => void;
}

const PlanInfoSection = ({ 
  planStatus, 
  onUpgrade, 
  onCancel, 
  onReactivate 
}: PlanInfoSectionProps) => {
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const handleCancelConfirm = () => {
    onCancel();
    setShowCancelDialog(false);
  };

  if (planStatus === "free") {
    return (
      <div className="border border-border rounded-lg p-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-foreground">FitStock Plus</h3>
              <p className="text-muted-foreground mt-1">無制限ダウンロード定額プラン</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Check size={18} className="text-muted-foreground mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">画像ライブラリのすべての素材がダウンロード可能</span>
              </div>
              <div className="flex items-start gap-3">
                <Check size={18} className="text-muted-foreground mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">クリエイティブデジタルおよび印刷物に使用できる加工可能なライセンス</span>
              </div>
              <div className="flex items-start gap-3">
                <Check size={18} className="text-muted-foreground mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">業界最安値</span>
              </div>
            </div>

            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-foreground">¥1,000</span>
                <span className="text-base text-foreground">/ 月</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">¥12,000、年払い</p>
            </div>

            <Button 
              onClick={onUpgrade}
              size="lg"
              className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-medium py-6 text-base rounded-lg"
            >
              FitStock Plusに入会する
            </Button>
          </div>
      </div>
    );
  }

  if (planStatus === "plus") {
    return (
      <>
        <Card className="border border-border">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-foreground">FitStock Plus</h3>
                <p className="text-muted-foreground mt-1">現在ご利用中</p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">ダウンロード</span>
                  <span className="font-medium text-foreground">無制限</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">次回請求日</span>
                  <span className="font-medium text-foreground">2024年2月1日</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">請求金額</span>
                  <span className="font-medium text-foreground">¥1,000</span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setShowCancelDialog(true)}
                  className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
                >
                  プランをキャンセルする
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>本当にキャンセルしますか？</AlertDialogTitle>
              <AlertDialogDescription className="space-y-2">
                <p>キャンセルしても、現在の請求期間の終了（2024年2月1日）まではFitStock Plusをご利用いただけます。</p>
                <p>その後、アカウントはFree Memberに戻ります。</p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-secondary text-foreground hover:bg-secondary/80">戻る</AlertDialogCancel>
              <AlertDialogAction onClick={handleCancelConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">キャンセルを続ける</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }

  // Cancelled status
  return (
    <Card className="border border-border">
      <CardContent className="p-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold text-foreground">FitStock Plus（キャンセル済み）</h3>
            <p className="text-muted-foreground mt-1">利用可能期限: 2024年2月1日まで</p>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">その後</span>
              <span className="font-medium text-foreground">Free Memberに戻ります</span>
            </div>
          </div>

          <Button 
            onClick={onReactivate}
            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-medium rounded-lg"
          >
            再アップグレード
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanInfoSection;
