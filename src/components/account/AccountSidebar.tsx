import { User, Heart, Download, FileText, LogOut, CreditCard } from "lucide-react";
import { useTranslation } from "react-i18next";

export type AccountSection = "profile" | "plan" | "favorites" | "downloads" | "billing" | "receipt-info" | "logout";

interface AccountSidebarProps {
  activeSection: AccountSection;
  onSectionChange: (section: AccountSection) => void;
  onLogout: () => void;
}

const AccountSidebar = ({ activeSection, onSectionChange, onLogout }: AccountSidebarProps) => {
  const { t } = useTranslation();

  const navItems: { id: AccountSection; label: string; icon: React.ReactNode }[] = [
    { id: "profile", label: t("account.profile"), icon: <User size={16} /> },
    { id: "plan", label: t("account.plan"), icon: <CreditCard size={16} /> },
    { id: "favorites", label: t("account.favorites"), icon: <Heart size={16} /> },
    { id: "downloads", label: t("account.downloads"), icon: <Download size={16} /> },
    { id: "billing", label: t("account.billing"), icon: <FileText size={16} /> },
  ];

  return (
    <aside className="w-full md:w-52 flex-shrink-0 border-r border-border min-h-full">
      <nav className="pt-[36px] pb-2 px-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 mb-1 text-sm transition-colors text-left rounded-md ${
              activeSection === item.id
                ? "bg-muted text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}

        {/* Logout */}
        <div className="border-t border-border mt-1 pt-1">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:rounded-md transition-colors text-left"
          >
            <LogOut size={16} />
            {t("account.logout")}
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default AccountSidebar;
