import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ReceiptInfoSection = () => {
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [address, setAddress] = useState("");

  const handleSave = () => {
    // Save logic placeholder
  };

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-semibold text-foreground">領収書情報</h1>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm text-foreground">
            会社名 / 屋号 (領収書の宛名)
            <span className="text-muted-foreground ml-2 text-xs">※ 必要なければ空欄</span>
          </label>
          <Input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-foreground">担当者名</label>
          <Input
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-foreground">
            住所 (領収書に記載する場合のみ)
            <span className="text-muted-foreground ml-2 text-xs">※ 必要なければ空欄</span>
          </label>
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <Button
          onClick={handleSave}
          className="rounded-sm bg-foreground text-background hover:bg-foreground/90"
        >
          変更を保存
        </Button>
      </div>
    </div>
  );
};

export default ReceiptInfoSection;
