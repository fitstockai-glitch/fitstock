import { Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const billingHistory = [
  {
    id: "1",
    date: "2024年1月1日",
    amount: "¥1,000",
    status: "支払い済み",
  },
  {
    id: "2",
    date: "2023年12月1日",
    amount: "¥1,000",
    status: "支払い済み",
  },
  {
    id: "3",
    date: "2023年11月1日",
    amount: "¥1,000",
    status: "支払い済み",
  },
];

const SubscriptionHistorySection = () => {
  const handleDownloadReceipt = (_id: string) => {
    // placeholder
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">サブスクリプション履歴</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Subscription info */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">サブスクリプション開始日</span>
            <span className="font-medium text-foreground">2023年11月1日</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">次回請求日</span>
            <span className="font-medium text-foreground">2024年2月1日</span>
          </div>
        </div>

        {/* Billing history table */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">請求履歴</h4>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/50">
                  <TableHead className="text-foreground">日付</TableHead>
                  <TableHead className="text-foreground">金額</TableHead>
                  <TableHead className="text-foreground">ステータス</TableHead>
                  <TableHead className="text-foreground text-right">領収書</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {billingHistory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-sm">{item.date}</TableCell>
                    <TableCell className="text-sm font-medium">{item.amount}</TableCell>
                    <TableCell>
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-primary hover:text-primary-hover"
                        onClick={() => handleDownloadReceipt(item.id)}
                      >
                        <Download size={14} className="mr-1" />
                        ダウンロード
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionHistorySection;
