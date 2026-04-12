import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Google OAuth の PKCE コールバック専用。
 * exchangeCodeForSession 後にトップページへリダイレクト。
 */
const AuthOAuthCallback = () => {
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const url = new URL(window.location.href);
      const err = url.searchParams.get("error");
      const code = url.searchParams.get("code");

      if (err) {
        if (!cancelled) window.location.replace("/login");
        return;
      }

      if (!code) {
        if (!cancelled) window.location.replace("/login");
        return;
      }

      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      if (exchangeError) {
        console.error("[FitStock auth] exchangeCodeForSession error:", exchangeError);
        if (!cancelled) window.location.replace("/login");
        return;
      }

      if (!cancelled) window.location.replace("/");
    })();

    return () => { cancelled = true; };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <p className="text-sm text-muted-foreground">ログイン処理中…</p>
    </div>
  );
};

export default AuthOAuthCallback;
