import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const ReceiptInfoSection = () => {
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [address, setAddress] = useState("");
  const { t } = useTranslation();

  const handleSave = () => {
    // Save logic placeholder
  };

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-semibold text-foreground">{t("receipt.title")}</h1>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm text-foreground">
            {t("receipt.companyName")}
            <span className="text-muted-foreground ml-2 text-xs">{t("receipt.optional")}</span>
          </label>
          <Input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-foreground">{t("receipt.contactName")}</label>
          <Input
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-foreground">
            {t("receipt.address")}
            <span className="text-muted-foreground ml-2 text-xs">{t("receipt.optional")}</span>
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
          {t("receipt.save")}
        </Button>
      </div>
    </div>
  );
};

export default ReceiptInfoSection;
