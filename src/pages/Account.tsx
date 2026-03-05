import { useState, useRef, useEffect } from "react";
import FitStockHeader from "@/components/header/FitStockHeader";
import Footer from "@/components/footer/Footer";
import AccountSidebar, { AccountSection } from "@/components/account/AccountSidebar";
import ProfilePage from "@/components/account/ProfilePage";
import PlanInfoSection from "@/components/account/PlanInfoSection";
import DownloadHistorySection from "@/components/account/DownloadHistorySection";
import FavoritesSection from "@/components/account/FavoritesSection";
import BillingSection from "@/components/account/BillingSection";
import ReceiptInfoSection from "@/components/account/ReceiptInfoSection";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export type PlanStatus = "free" | "plus" | "cancelled";

const mobileNavItems: { id: AccountSection; label: string }[] = [
  { id: "profile", label: "プロフィール" },
  { id: "plan", label: "プラン" },
  { id: "favorites", label: "お気に入り" },
  { id: "downloads", label: "ダウンロード履歴" },
  { id: "billing", label: "領収書発行" },
];

const Account = () => {
  const [activeSection, setActiveSection] = useState<AccountSection>("profile");
  const [planStatus, setPlanStatus] = useState<PlanStatus>("free");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isMobile = useIsMobile();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLabel = mobileNavItems.find((item) => item.id === activeSection)?.label || activeSection;

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
      <FitStockHeader hideSearch={isMobile} />

      {/* Mobile layout */}
      <div className="md:hidden flex-1">
        {/* Dropdown selector */}
        <div className="relative bg-muted" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between px-4 py-3.5 text-sm text-foreground"
          >
            <span>{currentLabel}</span>
            {isDropdownOpen ? (
              <ChevronUp size={18} className="text-muted-foreground" />
            ) : (
              <ChevronDown size={18} className="text-muted-foreground" />
            )}
          </button>

          {isDropdownOpen && (
            <div className="absolute left-0 right-0 top-full bg-muted border-b border-border shadow-lg z-40">
              {mobileNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-6 py-3.5 text-sm transition-colors ${
                    activeSection === item.id
                      ? "bg-muted text-foreground font-medium"
                      : "text-foreground hover:bg-muted/50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="px-6 py-3">
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    // TODO: logout logic
                  }}
                  className="w-full bg-foreground text-background text-sm font-medium py-2.5 rounded-md hover:bg-foreground/90 transition-colors"
                >
                  ログアウト
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="px-4 py-4">
          {renderSectionContent(activeSection)}
        </div>
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
