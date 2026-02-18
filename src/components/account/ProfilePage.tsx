import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const ProfilePage = () => {
  const [name, setName] = useState("山田 太郎");
  const [email, setEmail] = useState("XXXXXXXX@gmail.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = () => {
    // TODO: save logic
  };

  return (
    <div className="max-w-xl space-y-8">
      <h1 className="text-2xl font-semibold text-foreground">プロフィール</h1>

      {/* Basic info */}
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label className="text-sm text-muted-foreground font-normal">お名前</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-md"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm text-muted-foreground font-normal">メールアドレス</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md"
          />
        </div>
      </div>

      <Separator />

      {/* Password change */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">パスワードの変更</h2>
        <div className="space-y-1.5">
          <Label className="text-sm text-muted-foreground font-normal">
            現在のパスワード（変更しない場合は空欄）
          </Label>
          <Input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="rounded-md"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm text-muted-foreground font-normal">
            新しいパスワード（変更しない場合は空欄）
          </Label>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="rounded-md"
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
          />
        </div>

        <Button
          onClick={handleSave}
          className="rounded-md bg-foreground text-background hover:bg-foreground/90 px-6"
        >
          変更を保存
        </Button>
      </div>

      <Separator />

      {/* Delete account */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">ユーザー詳細</h2>
        <div className="border border-border rounded-md p-4 space-y-2">
          <p className="text-sm text-muted-foreground">
            これにより、個人データはすべて完全に削除されます。
          </p>
          <button className="text-sm text-red-500 hover:text-red-600 transition-colors">
            アカウントを削除
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
