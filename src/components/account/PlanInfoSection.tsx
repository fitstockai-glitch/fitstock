import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">📦</span>
              <h3 className="text-lg font-semibold text-foreground">
                現在のプラン: Free Member
              </h3>
            </div>
            <Button 
              onClick={onUpgrade}
              size="lg"
              className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-medium py-6 text-base"
            >
              FitStock Plusで無制限ダウンロード (¥1,000/月)
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (planStatus === "plus") {
    return (
      <>
        <Card className="border-2 border-primary bg-gradient-to-br from-primary/10 to-background">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">⭐</span>
                <h3 className="text-lg font-semibold text-foreground">
                  現在のプラン: FitStock Plus
                </h3>
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
                <p>
                  キャンセルしても、現在の請求期間の終了（2024年2月1日）まではFitStock Plusをご利用いただけます。
                </p>
                <p>
                  その後、アカウントはFree Memberに戻ります。
                </p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-secondary text-foreground hover:bg-secondary/80">
                戻る
              </AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleCancelConfirm}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                キャンセルを続ける
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }

  // Cancelled status
  return (
    <Card className="border-2 border-yellow-500/50 bg-gradient-to-br from-yellow-50 to-background">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚠️</span>
            <h3 className="text-lg font-semibold text-foreground">
              現在のプラン: FitStock Plus（キャンセル済み）
            </h3>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">利用可能期限</span>
              <span className="font-medium text-foreground">2024年2月1日まで</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">その後</span>
              <span className="font-medium text-foreground">Free Memberに戻ります</span>
            </div>
          </div>

          <Button 
            onClick={onReactivate}
            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-medium"
          >
            再アップグレード
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanInfoSection;
