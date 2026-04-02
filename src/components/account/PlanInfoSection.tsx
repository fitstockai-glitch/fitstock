import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { PlanStatus } from "@/pages/Account";
import { formatPeriodEndJa, useCancelSubscription, useMembershipPlan } from "@/hooks/useMembership";
import { toast } from "sonner";

interface PlanInfoSectionProps {
  planStatus: PlanStatus;
  onUpgrade: () => void;
  onReactivate: () => void;
}

const PlanInfoSection = ({
  planStatus,
  onUpgrade,
  onReactivate,
}: PlanInfoSectionProps) => {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const { data: membershipPlan } = useMembershipPlan();
  const cancelSubscription = useCancelSubscription();
  const periodEndLabel = formatPeriodEndJa(membershipPlan?.current_period_end);

  const handleCancelConfirm = () => {
    cancelSubscription.mutate(undefined, {
      onSuccess: (res) => {
        setShowCancelDialog(false);
        if (res?.already_cancelled) {
          toast.info("すでにキャンセル済みです");
        } else {
          toast.success("プランをキャンセルしました。請求期間の終了までご利用いただけます。");
        }
      },
      onError: (err: Error) => {
        toast.error(err.message || "キャンセルに失敗しました");
      },
    });
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
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6 text-base rounded-lg"
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

            <button
              onClick={() => setShowCancelDialog(true)}
              className="text-sm text-destructive hover:text-destructive/80 transition-colors"
            >
              プランをキャンセル
            </button>
          </div>
        </div>

        <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>本当にキャンセルしますか？</AlertDialogTitle>
              <AlertDialogDescription className="space-y-2">
                <p>
                  {periodEndLabel
                    ? `キャンセルしても、現在の請求期間の終了（${periodEndLabel}）まではFitStock Plusをご利用いただけます。`
                    : "キャンセルしても、現在の請求期間が終了するまではFitStock Plusをご利用いただけます。"}
                </p>
                <p>その後、アカウントはFree Memberに戻ります。</p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                disabled={cancelSubscription.isPending}
                className="bg-secondary text-foreground hover:bg-secondary/80"
              >
                戻る
              </AlertDialogCancel>
              <Button
                type="button"
                disabled={cancelSubscription.isPending}
                onClick={handleCancelConfirm}
                className="bg-foreground text-background hover:bg-foreground/90"
              >
                {cancelSubscription.isPending ? "処理中…" : "キャンセルを続ける"}
              </Button>
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
            <p className="text-muted-foreground mt-1">
              {periodEndLabel
                ? `利用可能期限: ${periodEndLabel}まで`
                : "利用可能期限: 現在の請求期間が終了するまで"}
            </p>
            <p className="text-muted-foreground mt-1">
              その後、Free Memberに戻ります。
            </p>
          </div>

          <Button
            onClick={onReactivate}
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6 text-base rounded-lg"
          >
            再アップグレード
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanInfoSection;
