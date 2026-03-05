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
import { User, CreditCard, Heart, Download, FileText, LogOut, ChevronRight, ArrowLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export type PlanStatus = "free" | "plus" | "cancelled";

const mobileNavItems: { id: AccountSection; label: string; icon: React.ReactNode }[] = [
  { id: "profile", label: "プロフィール", icon: <User size={18} /> },
  { id: "plan", label: "プラン", icon: <CreditCard size={18} /> },
  { id: "favorites", label: "お気に入り", icon: <Heart size={18} /> },
  { id: "downloads", label: "ダウンロード履歴", icon: <Download size={18} /> },
  { id: "billing", label: "領収書発行", icon: <FileText size={18} /> },
];

const Account = () => {
  const [activeSection, setActiveSection] = useState<AccountSection | null>(null);
  const [planStatus, setPlanStatus] = useState<PlanStatus>("free");
  const isMobile = useIsMobile();

  // For desktop, default to profile
  const desktopSection = activeSection || "profile";

  const renderSectionContent = (section: AccountSection) => {
    switch (section) {
      case "profile":
        return <ProfilePage />;
      case "plan":
        return (
          <div className="max-w-xl space-y-6">
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
        return <FavoritesSection />;
      case "downloads":
        return <DownloadHistorySection />;
      case "billing":
        return (
          <div className="space-y-6">
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

  const renderDesktopContent = () => {
    const section = desktopSection;
    switch (section) {
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

  const sectionLabel = mobileNavItems.find((item) => item.id === activeSection)?.label || activeSection;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <FitStockHeader hideSearch={isMobile} />

      {/* Mobile layout */}
      <div className="md:hidden flex-1">
        {activeSection === null ? (
          // Menu list
          <nav className="divide-y divide-border border-b border-border">
            {mobileNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className="w-full flex items-center justify-between px-4 py-4 text-sm text-foreground hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                <ChevronRight size={16} className="text-muted-foreground" />
              </button>
            ))}
            <button
              onClick={() => {}}
              className="w-full flex items-center gap-3 px-4 py-4 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              <LogOut size={18} />
              ログアウト
            </button>
          </nav>
        ) : (
          // Section content with back
          <div>
            <button
              onClick={() => setActiveSection(null)}
              className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors border-b border-border w-full"
            >
              <ArrowLeft size={16} />
              <span>{sectionLabel}</span>
            </button>
            <div className="px-4 py-6">
              {renderSectionContent(activeSection)}
            </div>
          </div>
        )}
      </div>

      {/* Desktop: Sidebar layout */}
      <div className="hidden md:flex flex-1 flex-row">
        <AccountSidebar activeSection={desktopSection} onSectionChange={setActiveSection} />
        <main className="flex-1 px-8 py-10">
          {renderDesktopContent()}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Account;
