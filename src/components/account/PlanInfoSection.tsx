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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const handleCancelConfirm = () => {
    cancelSubscription.mutate(undefined, {
      onSuccess: (res) => {
        setShowCancelDialog(false);
        if (res?.already_cancelled) {
          toast.info(t("plan.alreadyCancelled"));
        } else {
          toast.success(t("plan.cancelSuccess"));
        }
      },
      onError: (err: Error) => {
        toast.error(err.message || t("plan.cancelError"));
      },
    });
  };

  if (planStatus === "free") {
    return (
      <div className="border border-border rounded-lg p-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold text-foreground">FitStock Plus</h3>
            <p className="text-muted-foreground mt-1">{t("plan.subtitle")}</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Check size={18} className="text-muted-foreground mt-0.5 shrink-0" />
              <span className="text-sm text-muted-foreground">{t("pricing.feature1")}</span>
            </div>
            <div className="flex items-start gap-3">
              <Check size={18} className="text-muted-foreground mt-0.5 shrink-0" />
              <span className="text-sm text-muted-foreground">{t("pricing.feature2")}</span>
            </div>
            <div className="flex items-start gap-3">
              <Check size={18} className="text-muted-foreground mt-0.5 shrink-0" />
              <span className="text-sm text-muted-foreground">{t("plan.feature3")}</span>
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-foreground">¥1,000</span>
              <span className="text-base text-foreground">{t("plan.perMonth")}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{t("plan.yearlyPrice")}</p>
          </div>

          <Button
            onClick={onUpgrade}
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6 text-base rounded-lg"
          >
            {t("plan.joinPlus")}
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
              <p className="text-muted-foreground mt-1">{t("plan.subtitle")}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Check size={18} className="text-muted-foreground mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">{t("pricing.feature1")}</span>
              </div>
              <div className="flex items-start gap-3">
                <Check size={18} className="text-muted-foreground mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">{t("pricing.feature2")}</span>
              </div>
              <div className="flex items-start gap-3">
                <Check size={18} className="text-muted-foreground mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">{t("plan.feature3")}</span>
              </div>
            </div>

            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-foreground">¥1,000</span>
                <span className="text-base text-foreground">{t("plan.perMonth")}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{t("plan.yearlyPrice")}</p>
            </div>

            <button
              onClick={() => setShowCancelDialog(true)}
              className="text-sm text-destructive hover:text-destructive/80 transition-colors"
            >
              {t("plan.cancel")}
            </button>
          </div>
        </div>

        <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t("plan.cancelConfirmTitle")}</AlertDialogTitle>
              <AlertDialogDescription className="space-y-2">
                <p>
                  {periodEndLabel
                    ? t("plan.cancelWithDate", { date: periodEndLabel })
                    : t("plan.cancelWithoutDate")}
                </p>
                <p>{t("plan.cancelAfter")}</p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                disabled={cancelSubscription.isPending}
                className="bg-secondary text-foreground hover:bg-secondary/80"
              >
                {t("common.back")}
              </AlertDialogCancel>
              <Button
                type="button"
                disabled={cancelSubscription.isPending}
                onClick={handleCancelConfirm}
                className="bg-foreground text-background hover:bg-foreground/90"
              >
                {cancelSubscription.isPending ? t("common.processing") : t("plan.continueCancelling")}
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
            <h3 className="text-2xl font-semibold text-foreground">{t("plan.cancelledTitle")}</h3>
            <p className="text-muted-foreground mt-1">
              {periodEndLabel
                ? t("plan.availableUntilDate", { date: periodEndLabel })
                : t("plan.availableUntilEnd")}
            </p>
            <p className="text-muted-foreground mt-1">
              {t("plan.cancelAfter")}
            </p>
          </div>

          <Button
            onClick={onReactivate}
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6 text-base rounded-lg"
          >
            {t("plan.reactivate")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanInfoSection;
