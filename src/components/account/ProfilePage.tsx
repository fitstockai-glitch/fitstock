import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useProfileData, useUpdateProfileDisplayName } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const ProfilePage = () => {
  const { data: profile, isLoading, isError } = useProfileData();
  const updateDisplayName = useUpdateProfileDisplayName();
  const { t } = useTranslation();

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
      toast.success(t("profile.saveSuccess"));
    } catch (error) {
      const message =
        error instanceof Error ? error.message : t("profile.saveError");
      toast.error(message);
    }
  };

  const handleChangePassword = async () => {
    if (!newPassword && !currentPassword && !confirmPassword) {
      toast.error(t("profile.passwordErrors.allFields"));
      return;
    }
    if (!newPassword) {
      toast.error(t("profile.passwordErrors.newPassword"));
      return;
    }
    if (newPassword.length < 6) {
      toast.error(t("profile.passwordErrors.minLength"));
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error(t("profile.passwordErrors.mismatch"));
      return;
    }
    if (!currentPassword) {
      toast.error(t("profile.passwordErrors.currentRequired"));
      return;
    }

    try {
      const { data: userResult, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      const authUser = userResult.user;
      if (!authUser?.email) throw new Error(t("profile.passwordErrors.emailError"));

      const { error: signError } = await supabase.auth.signInWithPassword({
        email: authUser.email,
        password: currentPassword,
      });
      if (signError) {
        throw new Error(t("profile.passwordErrors.currentWrong"));
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (updateError) throw updateError;

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success(t("profile.passwordChangeSuccess"));
    } catch (error) {
      const message =
        error instanceof Error ? error.message : t("profile.passwordErrors.updateError");
      toast.error(message);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-xl">
        <h1 className="text-2xl font-semibold text-foreground hidden md:block mb-8">
          {t("profile.title")}
        </h1>
        <p className="text-sm text-muted-foreground">{t("common.loading")}</p>
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="max-w-xl">
        <h1 className="text-2xl font-semibold text-foreground hidden md:block mb-8">
          {t("profile.title")}
        </h1>
        <p className="text-sm text-destructive">
          {t("profile.loadError")}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold text-foreground hidden md:block mb-8">
        {t("profile.title")}
      </h1>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label className="text-sm text-muted-foreground font-normal">{t("profile.name")}</Label>
          <Input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="rounded-md"
            placeholder={t("profile.notSet")}
            autoComplete="name"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm text-muted-foreground font-normal">{t("common.email")}</Label>
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
          {updateDisplayName.isPending ? t("profile.saving") : t("profile.saveChanges")}
        </Button>
      </div>

      <div className="space-y-4 mt-10">
        <h2 className="text-base font-semibold text-foreground">{t("profile.changePassword")}</h2>
        <p className="text-xs text-muted-foreground">
          {t("profile.passwordNote")}
        </p>
        <div className="space-y-1.5">
          <Label className="text-sm text-muted-foreground font-normal">
            {t("profile.currentPassword")}
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
            {t("profile.newPassword")}
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
            {t("profile.confirmPassword")}
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
          {t("profile.updatePassword")}
        </Button>
      </div>

      <div className="space-y-3 pt-6 mt-2">
        <h2 className="text-base font-semibold text-foreground">{t("profile.userDetails")}</h2>
        <div className="border border-border rounded-md p-4 space-y-2">
          <p className="text-sm text-muted-foreground">
            {t("profile.deleteWarning")}
          </p>
          <Link
            to="/account/delete"
            className="text-sm text-destructive hover:text-destructive/80 transition-colors"
          >
            {t("profile.deleteAccount")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
