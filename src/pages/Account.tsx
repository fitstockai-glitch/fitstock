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
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { User, CreditCard, Heart, Download, FileText, LogOut } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export type PlanStatus = "free" | "plus" | "cancelled";

const accordionItems: { id: AccountSection; label: string; icon: React.ReactNode }[] = [
  { id: "profile", label: "プロフィール", icon: <User size={16} /> },
  { id: "plan", label: "プラン", icon: <CreditCard size={16} /> },
  { id: "favorites", label: "お気に入り", icon: <Heart size={16} /> },
  { id: "downloads", label: "ダウンロード履歴", icon: <Download size={16} /> },
  { id: "billing", label: "領収書発行", icon: <FileText size={16} /> },
];

const Account = () => {
  const [activeSection, setActiveSection] = useState<AccountSection>("profile");
  const [planStatus, setPlanStatus] = useState<PlanStatus>("free");
  const isMobile = useIsMobile();

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
    const section = activeSection;
    // Wrap with titles for desktop
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <FitStockHeader hideSearch={isMobile} />

      {/* Mobile: Accordion layout */}
      <div className="md:hidden flex-1">
        <Accordion type="single" collapsible defaultValue="profile">
          {accordionItems.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="border-b border-border">
              <AccordionTrigger className="px-4 py-3 text-sm font-normal hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-6">
                {renderSectionContent(item.id)}
              </AccordionContent>
            </AccordionItem>
          ))}
          {/* Logout */}
          <div className="border-b border-border">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors text-left">
              <LogOut size={16} />
              ログアウト
            </button>
          </div>
        </Accordion>
      </div>

      {/* Desktop: Sidebar layout */}
      <div className="hidden md:flex flex-1 flex-row">
        <AccountSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <main className="flex-1 px-8 py-10">
          {renderDesktopContent()}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Account;
