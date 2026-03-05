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
    <div className="border-b border-border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-t-0">
            <TableHead className="text-muted-foreground font-normal pl-0">ご注文番号</TableHead>
            <TableHead className="text-muted-foreground font-normal">ご購入日</TableHead>
            <TableHead className="text-muted-foreground font-normal pr-0">金額</TableHead>
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
                    className="inline-flex items-center gap-1.5 text-sm text-destructive hover:underline"
                    onClick={() => console.log("Download receipt:", item.id)}
                  >
                    <Download size={14} />
                    ダウンロード
                  </button>
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BillingSection;
