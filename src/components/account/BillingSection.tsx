import { Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockBilling = Array.from({ length: 10 }, (_, i) => ({
  id: String(i + 1),
  orderNumber: "2069882365",
  date: "2026年2月30日",
  amount: "10,8901円",
}));

const BillingSection = () => {
  return (
    <div className="rounded-md border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-muted-foreground font-normal">ご注文番号</TableHead>
            <TableHead className="text-muted-foreground font-normal">ご購入日</TableHead>
            <TableHead className="text-muted-foreground font-normal">金額</TableHead>
            <TableHead className="text-muted-foreground font-normal text-right">ドキュメント</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockBilling.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="text-sm">{item.orderNumber}</TableCell>
              <TableCell className="text-sm">{item.date}</TableCell>
              <TableCell className="text-sm">{item.amount}</TableCell>
              <TableCell className="text-right">
                <button
                  className="inline-flex items-center gap-1.5 text-sm text-destructive hover:underline"
                  onClick={() => console.log("Download receipt:", item.id)}
                >
                  <Download size={14} />
                  ダウンロード
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BillingSection;
