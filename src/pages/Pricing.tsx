import FitStockHeader from "@/components/header/FitStockHeader";
import Footer from "@/components/footer/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";

const LEMON_SQUEEZY_CHECKOUT_URL =
  "https://fitstock.lemonsqueezy.com/checkout/buy/f3fe4e0b-1ef6-4d98-94dc-7a9771e4f081";

const Pricing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubscribeClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    const url = new URL(LEMON_SQUEEZY_CHECKOUT_URL);
    url.searchParams.set("checkout[custom][user_id]", user.id);
    window.location.href = url.toString();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <FitStockHeader />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 md:py-24">
        {/* Headline */}
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-relaxed">
            {t("pricing.headlineLine1")}
            <br />
            {t("pricing.headlineLine2")}
          </h1>
        </div>

        {/* Pricing Card */}
        <div className="w-full max-w-lg border border-border rounded-xl p-8 md:p-10">
          <div className="mb-1">
            <span className="text-4xl font-bold text-foreground">¥1,000</span>
            <span className="text-base text-foreground ml-1">{t("pricing.monthlyPrice")}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-8">{t("pricing.yearlyPrice")}</p>

          <div className="space-y-5 mb-10">
            <div className="flex items-start gap-3">
              <Check size={18} className="text-muted-foreground mt-0.5 shrink-0" />
              <span className="text-sm text-muted-foreground">{t("pricing.feature1")}</span>
            </div>
            <div className="flex items-start gap-3">
              <Check size={18} className="text-muted-foreground mt-0.5 shrink-0" />
              <span className="text-sm text-muted-foreground">
                {t("pricing.feature2")}
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Check size={18} className="text-muted-foreground mt-0.5 shrink-0" />
              <span className="text-sm text-muted-foreground">{t("pricing.feature3")}</span>
            </div>
          </div>

          <Button
            onClick={handleSubscribeClick}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-6 text-base rounded-lg"
          >
            {t("pricing.subscribe")}
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
