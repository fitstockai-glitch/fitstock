import { Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslation } from "react-i18next";

const mockBilling = Array.from({ length: 10 }, (_, i) => ({
  id: String(i + 1),
  orderNumber: "2069882365",
  date: "2026年2月30日",
  amount: "10,8901円",
}));

const BillingSection = () => {
  const { t } = useTranslation();

  return (
    <div className="border-b border-border">
      {/* Desktop/Tablet: original 4-column table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-t-0">
              <TableHead className="text-muted-foreground font-normal pl-0">{t("billing.orderNumber")}</TableHead>
              <TableHead className="text-muted-foreground font-normal">{t("billing.purchaseDate")}</TableHead>
              <TableHead className="text-muted-foreground font-normal">{t("billing.amount")}</TableHead>
              <TableHead className="text-muted-foreground font-normal pr-0">{t("billing.document")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockBilling.map((item) => (
              <TableRow key={item.id} className="hover:bg-transparent">
                <TableCell className="text-sm pl-0">{item.orderNumber}</TableCell>
                <TableCell className="text-sm">{item.date}</TableCell>
                <TableCell className="text-sm">{item.amount}</TableCell>
                <TableCell className="pr-0">
                  <button
                    className="inline-flex items-center gap-1.5 text-sm text-destructive hover:underline"
                    onClick={() => console.log("Download receipt:", item.id)}
                  >
                    <Download size={14} />
                    {t("billing.download")}
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile: 3-column table with download button below */}
      <div className="md:hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-t-0">
              <TableHead className="text-muted-foreground font-normal pl-0">{t("billing.orderNumber")}</TableHead>
              <TableHead className="text-muted-foreground font-normal">{t("billing.purchaseDate")}</TableHead>
              <TableHead className="text-muted-foreground font-normal pr-0">{t("billing.amount")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockBilling.map((item) => (
              <>
                <TableRow key={item.id} className="hover:bg-transparent border-b-0">
                  <TableCell className="text-sm pl-0 pb-1">{item.orderNumber}</TableCell>
                  <TableCell className="text-sm pb-1">{item.date}</TableCell>
                  <TableCell className="text-sm pr-0 pb-1">{item.amount}</TableCell>
                </TableRow>
                <TableRow key={`${item.id}-dl`} className="hover:bg-transparent">
                  <TableCell colSpan={3} className="text-sm pl-0 pt-0">
                    <button
                      className="inline-flex items-center gap-1.5 text-xs text-destructive border border-destructive rounded-md px-3 py-1.5 mt-1 hover:bg-destructive hover:text-destructive-foreground transition-colors"
                      onClick={() => console.log("Download receipt:", item.id)}
                    >
                      <Download size={14} />
                      {t("billing.download")}
                    </button>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BillingSection;
