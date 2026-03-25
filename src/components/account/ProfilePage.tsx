import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useProfileData, useUpdateProfileDisplayName } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ProfilePage = () => {
  const { data: profile, isLoading, isError } = useProfileData();
  const updateDisplayName = useUpdateProfileDisplayName();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!profile) return;
    setDisplayName(profile.displayName);
    setEmail(profile.email);
  }, [profile]);

  const handleSaveProfile = async () => {
    try {
      await updateDisplayName.mutateAsync(displayName);
      toast.success("プロフィールを保存しました");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "保存に失敗しました";
      toast.error(message);
    }
  };

  const handleChangePassword = async () => {
    if (!newPassword && !currentPassword && !confirmPassword) {
      toast.error("パスワードを変更する場合は各項目を入力してください");
      return;
    }
    if (!newPassword) {
      toast.error("新しいパスワードを入力してください");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("新しいパスワードは6文字以上で入力してください");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("新しいパスワードが一致しません");
      return;
    }
    if (!currentPassword) {
      toast.error("現在のパスワードを入力してください");
      return;
    }

    try {
      const { data: userResult, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      const authUser = userResult.user;
      if (!authUser?.email) throw new Error("メールアドレスを取得できませんでした");

      const { error: signError } = await supabase.auth.signInWithPassword({
        email: authUser.email,
        password: currentPassword,
      });
      if (signError) {
        throw new Error("現在のパスワードが正しくありません");
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (updateError) throw updateError;

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("パスワードを変更しました");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "パスワードの変更に失敗しました";
      toast.error(message);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-xl">
        <h1 className="text-2xl font-semibold text-foreground hidden md:block mb-8">
          プロフィール
        </h1>
        <p className="text-sm text-muted-foreground">読み込み中...</p>
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="max-w-xl">
        <h1 className="text-2xl font-semibold text-foreground hidden md:block mb-8">
          プロフィール
        </h1>
        <p className="text-sm text-destructive">
          プロフィールの読み込みに失敗しました。再度お試しください。
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold text-foreground hidden md:block mb-8">
        プロフィール
      </h1>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label className="text-sm text-muted-foreground font-normal">お名前</Label>
          <Input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="rounded-md"
            placeholder="未設定"
            autoComplete="name"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm text-muted-foreground font-normal">メールアドレス</Label>
          <Input
            type="email"
            value={email}
            readOnly
            disabled
            className="rounded-md bg-muted"
            autoComplete="email"
          />
        </div>
        <Button
          type="button"
          onClick={handleSaveProfile}
          disabled={updateDisplayName.isPending}
          className="rounded-md bg-foreground text-background hover:bg-foreground/90 px-6"
        >
          {updateDisplayName.isPending ? "保存中..." : "変更を保存"}
        </Button>
      </div>

      <div className="space-y-4 mt-10">
        <h2 className="text-base font-semibold text-foreground">パスワードの変更</h2>
        <p className="text-xs text-muted-foreground">
          メール／パスワードで登録したアカウントのみ変更できます。
        </p>
        <div className="space-y-1.5">
          <Label className="text-sm text-muted-foreground font-normal">
            現在のパスワード
          </Label>
          <Input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="rounded-md"
            autoComplete="current-password"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm text-muted-foreground font-normal">
            新しいパスワード
          </Label>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="rounded-md"
            autoComplete="new-password"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm text-muted-foreground font-normal">
            新しいパスワードを確認
          </Label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="rounded-md"
            autoComplete="new-password"
          />
        </div>

        <Button
          type="button"
          onClick={handleChangePassword}
          className="rounded-md bg-foreground text-background hover:bg-foreground/90 px-6"
        >
          パスワードを更新
        </Button>
      </div>

      <div className="space-y-3 pt-6 mt-2">
        <h2 className="text-base font-semibold text-foreground">ユーザー詳細</h2>
        <div className="border border-border rounded-md p-4 space-y-2">
          <p className="text-sm text-muted-foreground">
            これにより、個人データはすべて完全に削除されます。
          </p>
          <Link
            to="/account/delete"
            className="text-sm text-destructive hover:text-destructive/80 transition-colors"
          >
            アカウントを削除
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
