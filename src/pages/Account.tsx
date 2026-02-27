import { useState } from "react";
import FitStockHeader from "@/components/header/FitStockHeader";
import Footer from "@/components/footer/Footer";
import AccountSidebar, { AccountSection } from "@/components/account/AccountSidebar";
import ProfilePage from "@/components/account/ProfilePage";
import PlanInfoSection from "@/components/account/PlanInfoSection";
import DownloadHistorySection from "@/components/account/DownloadHistorySection";
import FavoritesSection from "@/components/account/FavoritesSection";
import BillingSection from "@/components/account/BillingSection";
import ReceiptInfoSection from "@/components/account/ReceiptInfoSection";

export type PlanStatus = "free" | "plus" | "cancelled";

const Account = () => {
  const [activeSection, setActiveSection] = useState<AccountSection>("profile");
  const [planStatus, setPlanStatus] = useState<PlanStatus>("free");

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <ProfilePage />;
      case "plan":
        return (
          <div className="max-w-xl space-y-6">
            <h1 className="text-2xl font-semibold text-foreground">プラン</h1>
            <p className="text-sm text-muted-foreground">最高品質の素材を無制限にダウンロードできるプランに入会しませんか。</p>
            <PlanInfoSection
              planStatus={planStatus}
              onUpgrade={() => setPlanStatus("plus")}
              onCancel={() => setPlanStatus("cancelled")}
              onReactivate={() => setPlanStatus("plus")}
            />
          </div>
        );
      case "favorites":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-foreground">お気に入り</h1>
            <FavoritesSection />
          </div>
        );
      case "downloads":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-foreground">ダウンロード履歴</h1>
            <DownloadHistorySection />
          </div>
        );
      case "billing":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">領収書発行</h1>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">過去の支払い履歴と領収書のダウンロードが可能です。</p>
              <button onClick={() => setActiveSection("receipt-info")} className="text-sm text-destructive hover:text-destructive/80 transition-colors mt-1 inline-block">領収書の宛名・住所</button>
            </div>
            <BillingSection />
          </div>
        );
      case "receipt-info":
        return <ReceiptInfoSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <FitStockHeader />

      <div className="flex flex-1 flex-col md:flex-row">
        <AccountSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <main className="flex-1 px-8 py-10">
          {renderContent()}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Account;
