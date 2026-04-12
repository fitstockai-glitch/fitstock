import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Google OAuth の PKCE コールバック専用。
 * detectSessionInUrl: true により Supabase が自動で code を exchange するので、
 * SIGNED_IN イベントを待ってトップページへリダイレクト。
 */
const AuthOAuthCallback = () => {
  useEffect(() => {
    const url = new URL(window.location.href);
    const err = url.searchParams.get("error");

    if (err) {
      window.location.replace("/login");
      return;
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        subscription.unsubscribe();
        window.location.replace("/");
      }
    });

    const timer = setTimeout(() => {
      subscription.unsubscribe();
      window.location.replace("/login");
    }, 10_000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <p className="text-sm text-muted-foreground">ログイン処理中…</p>
    </div>
  );
};

export default AuthOAuthCallback;
