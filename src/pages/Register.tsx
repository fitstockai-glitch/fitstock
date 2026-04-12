import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import FitStockHeader from "@/components/header/FitStockHeader";
import Footer from "@/components/footer/Footer";
import { supabase } from "@/integrations/supabase/client";
import { buildThumbnailPublicUrlFlexible } from "@/lib/supabaseStorage";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import {
  OAUTH_FROM_REGISTER,
  saveOauthIntent,
} from "@/lib/authLoginError";

const Register = () => {
  const { t } = useTranslation();
  const { data: thumbnailUrls } = useQuery({
    queryKey: ["register-cover-thumbnails"],
    staleTime: 10 * 60 * 1000,
    queryFn: async (): Promise<string[]> => {
      const { data, error } = await supabase
        .from("photos")
        .select("preview_path")
        .eq("is_published", true)
        .is("deleted_at", null)
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      return (data ?? [])
        .map((row) => buildThumbnailPublicUrlFlexible(row.preview_path))
        .filter((u): u is string => Boolean(u));
    },
  });

  const coverUrl = useMemo(() => {
    if (!thumbnailUrls?.length) return null;
    return thumbnailUrls[Math.floor(Math.random() * thumbnailUrls.length)];
  }, [thumbnailUrls]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);
    saveOauthIntent(OAUTH_FROM_REGISTER);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) {
      toast.error(error.message);
      setIsGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: name },
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(t("register.success"));
      navigate("/");
    }
    setIsLoading(false);
  };

  const formContent = (idSuffix: string = "") => (
    <>
      <h1 className="text-2xl font-bold text-foreground">{t("register.title")}</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor={`name${idSuffix}`} className="text-sm font-medium text-foreground">{t("register.name")}</Label>
          <Input id={`name${idSuffix}`} type="text" value={name} onChange={(e) => setName(e.target.value)} required className="h-12" />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`email${idSuffix}`} className="text-sm font-medium text-foreground">{t("common.email")}</Label>
          <Input id={`email${idSuffix}`} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-12" />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`password${idSuffix}`} className="text-sm font-medium text-foreground">{t("common.password")}</Label>
          <Input id={`password${idSuffix}`} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="h-12" />
        </div>
        <Button type="submit" disabled={isLoading} className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 rounded-md text-base">
          {isLoading ? t("register.registering") : t("register.submit")}
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-background px-2 text-muted-foreground">{t("common.or")}</span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        disabled={isLoading || isGoogleLoading}
        className="w-full h-12 rounded-md text-base gap-3 border-border"
        onClick={() => void handleGoogleSignUp()}
      >
        <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
          <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.07 24.07 0 0 0 0 21.56l7.98-6.19z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
        </svg>
        {isGoogleLoading ? t("register.connecting") : t("register.googleSignup")}
      </Button>

      <div className="text-center pt-2">
        <p className="text-sm text-muted-foreground">
          {t("register.haveAccount")}{" "}
          <Link to="/login" className="font-semibold text-foreground underline underline-offset-4 hover:text-foreground/80">{t("common.login")}</Link>
        </p>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <FitStockHeader />
      <main className="flex min-h-0 flex-1 flex-col overflow-x-hidden md:flex-row md:items-stretch md:min-h-[calc(100svh-9rem)]">
        {/* Mobile: 高さはビューポート基準。背景画像はレイアウトに影響しない */}
        <div
          className={`relative flex flex-1 flex-col md:hidden min-h-[calc(100svh-9rem)] overflow-hidden ${coverUrl ? "" : "bg-muted"}`}
          style={
            coverUrl
              ? {
                  backgroundImage: `url(${coverUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : undefined
          }
        >
          <div className="flex flex-1 items-center justify-center px-4 py-10 min-h-0">
            <div className="w-full max-w-md bg-background rounded-xl p-6 space-y-6">
              {formContent("-mobile")}
            </div>
          </div>
        </div>

        {/* Desktop: 画像は絶対配置のため、固有サイズで列高が変わらない */}
        <div className="relative hidden w-1/2 shrink-0 overflow-hidden bg-muted md:block">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              decoding="async"
            />
          ) : null}
        </div>
        <div className="hidden w-1/2 min-w-0 shrink-0 flex-col items-center justify-center px-6 py-16 md:flex">
          <div className="w-full max-w-md space-y-6 rounded-xl bg-background p-8">
            {formContent()}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
