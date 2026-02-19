import { useNavigate } from "react-router-dom";
import FitStockHeader from "@/components/header/FitStockHeader";
import Footer from "@/components/footer/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DeleteAccount = () => {
  const navigate = useNavigate();

  const handleDelete = () => {
    // TODO: delete logic
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <FitStockHeader />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <Card className="w-full max-w-sm p-8 text-center space-y-6 border border-border rounded-xl shadow-sm">
          <h1 className="text-lg font-bold text-foreground">
            FitStockアカウントを削除
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            アカウントを削除すると、お客様の個人情報および設定のすべてが削除されます。
          </p>
          <Button
            onClick={handleDelete}
            className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-md"
          >
            アカウントを削除
          </Button>
          <button
            onClick={() => navigate(-1)}
            className="block w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            キャンセル
          </button>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default DeleteAccount;
