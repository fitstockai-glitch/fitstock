import { Link } from "react-router-dom";
import { User, Heart, Download, FileText, LogOut, CreditCard } from "lucide-react";

export type AccountSection = "profile" | "plan" | "favorites" | "downloads" | "billing" | "receipt-info" | "logout";

interface AccountSidebarProps {
  activeSection: AccountSection;
  onSectionChange: (section: AccountSection) => void;
}

const navItems: { id: AccountSection; label: string; icon: React.ReactNode }[] = [
  { id: "profile", label: "プロフィール", icon: <User size={16} /> },
  { id: "plan", label: "プラン", icon: <CreditCard size={16} /> },
  { id: "favorites", label: "お気に入り", icon: <Heart size={16} /> },
  { id: "downloads", label: "ダウンロード履歴", icon: <Download size={16} /> },
  { id: "billing", label: "領収書発行", icon: <FileText size={16} /> },
];

const AccountSidebar = ({ activeSection, onSectionChange }: AccountSidebarProps) => {
  return (
    <aside className="w-full md:w-52 flex-shrink-0 border-r border-border min-h-full">
      <nav className="py-2 px-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-left rounded-md ${
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
        <div className="border-t border-border mt-4 pt-2">
        <button
          onClick={() => {}}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:rounded-md transition-colors text-left"
        >
          <LogOut size={16} />
          ログアウト
        </button>
        </div>
      </nav>
    </aside>
  );
};

export default AccountSidebar;
