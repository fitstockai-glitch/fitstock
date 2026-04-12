import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import FitStockHeader from "@/components/header/FitStockHeader";
import Footer from "@/components/footer/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import {
  LOGIN_URL_ERROR_PARAM,
  OAUTH_FROM_LOGIN,
  saveOauthIntent,
} from "@/lib/authLoginError";
import {
  clearPendingLoginErrorStorage,
  getPendingLoginErrorCode,
} from "@/lib/oauthEmailGate";

/** React 18 Strict Mode で 1 回目の effect がストレージ／URL を消しても、同一ページロード内の再実行でトーストが消えないようにする（ref はリマウントでリセットされるためモジュールで保持） */
let loginOauthRejectToastHandledThisLoad = false;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  useEffect(() => {
    console.log("[FitStock auth] Login.tsx effect", {
      href: window.location.href,
      "searchParams.get(error)": searchParams.get(LOGIN_URL_ERROR_PARAM),
      loginOauthRejectToastHandledThisLoad,
    });

    if (loginOauthRejectToastHandledThisLoad) {
      console.log("[FitStock auth] Login.tsx: skip toast (already handled this page load)");
      return;
    }

    const code = getPendingLoginErrorCode(searchParams);
    if (!code) {
      console.log("[FitStock auth] Login.tsx: no code → no toast");
      return;
    }

    loginOauthRejectToastHandledThisLoad = true;
    console.log("[FitStock auth] Login.tsx: toast.error for code", code);
    toast.error(t("login.oauthSignupRequired"));
    clearPendingLoginErrorStorage();

    if (searchParams.has(LOGIN_URL_ERROR_PARAM)) {
      const next = new URLSearchParams(searchParams);
      next.delete(LOGIN_URL_ERROR_PARAM);
      setSearchParams(next, { replace: true });
      console.log("[FitStock auth] Login.tsx: stripped ?error= from URL (replace)");
    }

    queueMicrotask(() => {
      console.log("[FitStock auth] Login.tsx: after toast microtask, href=", window.location.href);
    });
  }, [searchParams, setSearchParams, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error(error.message === "Invalid login credentials"
        ? t("login.invalidCredentials")
        : error.message);
    } else {
      toast.success(t("login.success"));
      navigate("/");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <FitStockHeader />
      <main className="flex-1 px-4 py-14 md:py-16">
        <div className="mx-auto w-full max-w-[420px]">
          <h1 className="mb-8 text-2xl font-bold text-center text-foreground">
            {t("login.title")}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-foreground/80">{t("common.email")}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm text-foreground/80">{t("common.password")}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 rounded-md"
              />
              <div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-muted-foreground hover:text-foreground underline transition-colors"
                >
                  {t("login.forgotPassword")}
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full h-12 bg-foreground text-background hover:bg-foreground/90 rounded-md text-base"
            >
              {isLoading ? t("login.loggingIn") : t("login.submit")}
            </Button>
          </form>

          <Button
            type="button"
            variant="outline"
            className="mt-6 w-full h-12 rounded-md text-base gap-3 border-border"
            onClick={async () => {
              saveOauthIntent(OAUTH_FROM_LOGIN);
              const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: { redirectTo: `${window.location.origin}/auth/callback` },
              });
              if (error) toast.error(error.message);
            }}
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.07 24.07 0 0 0 0 21.56l7.98-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            {t("login.googleLogin")}
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-background px-2 text-muted-foreground">{t("common.or")}</span>
            </div>
          </div>

          <div className="border border-border rounded-md p-7 text-center">
            <p className="text-sm text-muted-foreground">{t("login.noAccount")}</p>
            <Link
              to="/register"
              className="mt-1 inline-block text-[15px] font-semibold text-foreground underline underline-offset-4 hover:text-foreground/80"
            >
              {t("login.register")}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
