import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FitStockHeader from "@/components/header/FitStockHeader";
import Footer from "@/components/footer/Footer";
import AccountSidebar, { AccountSection } from "@/components/account/AccountSidebar";
import ProfilePage from "@/components/account/ProfilePage";
import PlanInfoSection from "@/components/account/PlanInfoSection";
import DownloadHistorySection from "@/components/account/DownloadHistorySection";
import FavoritesSection from "@/components/account/FavoritesSection";
import BillingSection from "@/components/account/BillingSection";
import ReceiptInfoSection from "@/components/account/ReceiptInfoSection";
import { ChevronUp, ChevronDown, ChevronLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { useMembershipTier } from "@/hooks/useMembership";
import { toast } from "sonner";

const LEMON_SQUEEZY_CHECKOUT_URL =
  "https://fitstock.lemonsqueezy.com/checkout/buy/f3fe4e0b-1ef6-4d98-94dc-7a9771e4f081";

export type PlanStatus = "free" | "plus" | "cancelled";

const mobileNavItems: { id: AccountSection; label: string }[] = [
  { id: "profile", label: "プロフィール" },
  { id: "plan", label: "プラン" },
  { id: "favorites", label: "お気に入り" },
  { id: "downloads", label: "ダウンロード履歴" },
  { id: "billing", label: "領収書発行" },
];

const allowedSections: AccountSection[] = [
  "profile",
  "plan",
  "favorites",
  "downloads",
  "billing",
  "receipt-info",
];

const getSectionFromSearch = (search: string): AccountSection => {
  const params = new URLSearchParams(search);
  const section = params.get("section");
  if (section && allowedSections.includes(section as AccountSection)) {
    return section as AccountSection;
  }
  return "profile";
};

const Account = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<AccountSection>(() =>
    getSectionFromSearch(location.search)
  );
  const [planStatus, setPlanStatus] = useState<PlanStatus>("free");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isMobile = useIsMobile();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleUpgradeToPlus = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    const url = new URL(LEMON_SQUEEZY_CHECKOUT_URL);
    url.searchParams.set("checkout[custom][user_id]", user.id);
    window.location.href = url.toString();
  };

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      const message = error instanceof Error ? error.message : "ログアウトに失敗しました";
      toast.error(message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setActiveSection(getSectionFromSearch(location.search));
  }, [location.search]);

  const handleSectionChange = (section: AccountSection) => {
    setActiveSection(section);

    const params = new URLSearchParams(location.search);
    if (section === "profile") {
      params.delete("section");
    } else {
      params.set("section", section);
    }

    const search = params.toString();
    navigate(`/account${search ? `?${search}` : ""}`, { replace: true });
  };

  const currentLabel = mobileNavItems.find((item) => item.id === activeSection)?.label || activeSection;

  const renderSectionContent = (section: AccountSection) => {
    switch (section) {
      case "profile":
        return <ProfilePage />;
      case "plan":
        return (
          <div className="max-w-xl space-y-6">
            {planStatus === "plus" ? (
              <div>
                <p className="text-sm text-muted-foreground">FitStock PLusに入会中</p>
                <p className="text-sm text-muted-foreground">2026年4月1日</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">最高品質の素材を無制限にダウンロードできるプランに入会しませんか。</p>
            )}
            <PlanInfoSection
              planStatus={planStatus}
              onUpgrade={handleUpgradeToPlus}
              onCancel={() => setPlanStatus("cancelled")}
              onReactivate={handleUpgradeToPlus}
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
              <button onClick={() => handleSectionChange("receipt-info")} className="text-sm text-destructive hover:text-destructive/80 transition-colors mt-1 inline-block">領収書の宛名・住所</button>
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
            {planStatus === "plus" ? (
              <div>
                <p className="text-sm text-muted-foreground">FitStock PLusに入会中</p>
                <p className="text-sm text-muted-foreground">2026年4月1日</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">最高品質の素材を無制限にダウンロードできるプランに入会しませんか。</p>
            )}
            <PlanInfoSection
              planStatus={planStatus}
              onUpgrade={handleUpgradeToPlus}
              onCancel={() => setPlanStatus("cancelled")}
              onReactivate={handleUpgradeToPlus}
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
              <button onClick={() => handleSectionChange("receipt-info")} className="text-sm text-destructive hover:text-destructive/80 transition-colors mt-1 inline-block">領収書の宛名・住所</button>
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

      {isMobile ? (
        <div className="flex flex-1 flex-col">
          {activeSection === "receipt-info" ? (
            <div className="bg-muted">
              <button
                onClick={() => handleSectionChange("billing")}
                className="flex items-center gap-1 px-4 py-3.5 text-sm text-foreground"
              >
                <ChevronLeft size={18} className="text-muted-foreground" />
                <span>領収書発行</span>
              </button>
            </div>
          ) : (
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
                        handleSectionChange(item.id);
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
                      onClick={handleLogout}
                      className="w-full bg-foreground text-background text-sm font-medium py-2.5 rounded-md hover:bg-foreground/90 transition-colors"
                    >
                      ログアウト
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="px-4 py-4 flex-1">
            {renderSectionContent(activeSection)}
          </div>
        </div>
      ) : (
        <div className="flex flex-1 flex-row">
          <AccountSidebar
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            onLogout={handleLogout}
          />
          <main className="flex-1 px-8 py-10">
            {renderDesktopContent()}
          </main>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Account;
