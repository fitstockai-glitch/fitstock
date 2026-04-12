import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * detectSessionInUrl: false のため、PKCE の code やリカバリ用 hash をここで処理してから子を描画する。
 *
 * ここで扱う ?code= は「メール確認」「パスワードリセット」など /auth/callback 以外に届くケース。
 * Google OAuth の code は /auth/callback（AuthOAuthCallback）で処理済みなので
 * ここでは OAuth ゲート（enforceEmailIdentityOrReject）を呼ばない。
 */
export function SupabaseSessionBootstrap({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");

        if (code) {
          console.log("[FitStock auth] SupabaseSessionBootstrap: code found at non-callback URL, exchanging…", url.pathname);
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (!error) {
            url.searchParams.delete("code");
            const qs = url.searchParams.toString();
            const clean = url.pathname + (qs ? `?${qs}` : "") + url.hash;
            window.history.replaceState({}, document.title, clean);
            console.log("[FitStock auth] SupabaseSessionBootstrap: exchange OK, cleaned URL →", clean);
          } else {
            console.warn("[FitStock auth] SupabaseSessionBootstrap: exchange error", error.message);
          }
        } else {
          const rawHash = url.hash?.startsWith("#") ? url.hash.slice(1) : url.hash;
          if (rawHash && rawHash.includes("access_token")) {
            const params = new URLSearchParams(rawHash);
            const access_token = params.get("access_token");
            const refresh_token = params.get("refresh_token");
            if (access_token && refresh_token) {
              const { error } = await supabase.auth.setSession({
                access_token,
                refresh_token,
              });
              if (!error) {
                window.history.replaceState({}, document.title, url.pathname + url.search);
              }
            }
          }
        }
      } catch (e) {
        console.error("SupabaseSessionBootstrap:", e);
      } finally {
        if (!cancelled) setReady(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-sm text-muted-foreground">
        読み込み中…
      </div>
    );
  }

  return <>{children}</>;
}
