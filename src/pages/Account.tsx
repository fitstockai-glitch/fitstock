import { useState } from "react";
import FitStockHeader from "@/components/header/FitStockHeader";
import Footer from "@/components/footer/Footer";
import ProfileSection from "@/components/account/ProfileSection";
import PlanInfoSection from "@/components/account/PlanInfoSection";
import DownloadHistorySection from "@/components/account/DownloadHistorySection";
import FavoritesSection from "@/components/account/FavoritesSection";
import SubscriptionHistorySection from "@/components/account/SubscriptionHistorySection";

export type PlanStatus = "free" | "plus" | "cancelled";

const Account = () => {
  const [planStatus, setPlanStatus] = useState<PlanStatus>("free");
  const [displayName, setDisplayName] = useState("ユーザー名");

  const handleUpgrade = () => {
    setPlanStatus("plus");
  };

  const handleCancel = () => {
    setPlanStatus("cancelled");
  };

  const handleReactivate = () => {
    setPlanStatus("plus");
  };

  return (
    <div className="min-h-screen bg-background">
      <FitStockHeader />
      
      <main className="max-w-4xl mx-auto px-4 md:px-8 py-8 space-y-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-8">
          マイページ
        </h1>

        <ProfileSection 
          displayName={displayName} 
          onSave={setDisplayName} 
        />

        <PlanInfoSection 
          planStatus={planStatus}
          onUpgrade={handleUpgrade}
          onCancel={handleCancel}
          onReactivate={handleReactivate}
        />

        <DownloadHistorySection />

        <FavoritesSection />

        {(planStatus === "plus" || planStatus === "cancelled") && (
          <SubscriptionHistorySection />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Account;
