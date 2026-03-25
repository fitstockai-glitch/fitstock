import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FitStockHeader from "@/components/header/FitStockHeader";
import Footer from "@/components/footer/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { FunctionsHttpError } from "@supabase/supabase-js";

async function readDeleteAccountErrorMessage(
  err: unknown,
): Promise<string> {
  if (err instanceof FunctionsHttpError) {
    try {
      const body = (await err.context.json()) as {
        message?: string;
        error?: string;
      };
      if (typeof body.message === "string" && body.message.length > 0) {
        return body.message;
      }
      if (typeof body.error === "string" && body.error.length > 0) {
        return body.error;
      }
    } catch {
      /* ignore */
    }
    return `サーバーエラー (${err.context.status})`;
  }
  return err instanceof Error ? err.message : "アカウントの削除に失敗しました";
}

const DeleteAccount = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = () => {
    if (!user) {
      toast.error("ログインが必要です");
      navigate("/login");
      return;
    }
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!user) return;
    setIsDeleting(true);
    try {
      const { error: refreshError } = await supabase.auth.refreshSession();
      if (refreshError) {
        console.warn("refreshSession before delete-account:", refreshError.message);
      }

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      const accessToken = session?.access_token;
      if (sessionError || !accessToken) {
        throw new Error(
          "ログインの有効期限が切れているか、セッションがありません。再度ログインしてください。",
        );
      }

      // getAccessToken が null のとき anon キーが Bearer になり verify_jwt で Invalid JWT になるのを防ぐ
      const { error } = await supabase.functions.invoke("delete-account", {
        body: {},
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (error) {
        const msg = await readDeleteAccountErrorMessage(error);
        throw new Error(msg || "アカウントの削除に失敗しました");
      }

      await signOut();
      toast.success("アカウントを削除しました");
      // GoTrueClient のメモリ上のセッションが残ることがあるため、フルリロードで確実に未ログインにする
      window.setTimeout(() => {
        window.location.replace("/");
      }, 200);
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "アカウントの削除に失敗しました";
      toast.error(message);
    } finally {
      setIsDeleting(false);
      setConfirmOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <FitStockHeader hideSearch />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <Card className="w-full max-w-sm p-8 text-center space-y-6 border border-border rounded-xl shadow-sm">
          <h1 className="text-lg font-bold text-foreground">
            FitStockアカウントを削除
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            アカウントを削除すると、お客様の個人情報および設定のすべてが削除されます。
          </p>
          <Button
            onClick={handleDeleteClick}
            disabled={isDeleting}
            className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-md"
          >
            アカウントを削除
          </Button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="block w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            キャンセル
          </button>
        </Card>
      </main>

      <AlertDialog
        open={confirmOpen}
        onOpenChange={(open) => {
          if (!isDeleting) setConfirmOpen(open);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>アカウントの削除</AlertDialogTitle>
            <AlertDialogDescription>
              本当に削除しますか？この操作は取り消せません
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>キャンセル</AlertDialogCancel>
            <Button
              variant="destructive"
              disabled={isDeleting}
              onClick={() => void handleConfirmDelete()}
            >
              {isDeleting ? "削除中..." : "削除する"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>
  );
};

export default DeleteAccount;
