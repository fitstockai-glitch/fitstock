import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/** query params と hash fragment の両方からパラメータを取得する */
function getOauthParams(href: string): Record<string, string> {
  const url = new URL(href);
  const params: Record<string, string> = {};
  url.searchParams.forEach((v, k) => { params[k] = v; });
  if (url.hash?.startsWith("#")) {
    new URLSearchParams(url.hash.slice(1)).forEach((v, k) => {
      if (!(k in params)) params[k] = v;
    });
  }
  return params;
}

/** created_at が現在時刻から 30 秒以内なら新規ユーザーと判定 */
function isNewUser(createdAt: string): boolean {
  return Date.now() - new Date(createdAt).getTime() < 30_000;
}

/**
 * Google OAuth の PKCE コールバック専用。
 * from=login かつ新規ユーザーの場合のみサインアウトして /login?error=new_user にリダイレクト。
 */
const AuthOAuthCallback = () => {
  const [message, setMessage] = useState("ログイン処理中…");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const params = getOauthParams(window.location.href);
      const err = params["error"] ?? null;
      const code = params["code"] ?? null;
      const from = params["from"] ?? null;

      if (err) {
        if (!cancelled) {
          setMessage("Googleログインに失敗しました。");
          window.location.replace("/login?error=google_error");
        }
        return;
      }

      if (!code) {
        if (!cancelled) window.location.replace("/login");
        return;
      }

      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      if (exchangeError || !data.session) {
        console.error("[FitStock auth] exchangeCodeForSession error:", exchangeError);
        if (!cancelled) window.location.replace("/login?error=auth_failed");
        return;
      }

      // from=login かつ新規ユーザー → 既存アカウントのみ許可
      const user = data.session.user;
      if (from === "login" && user.created_at && isNewUser(user.created_at)) {
        await supabase.auth.signOut({ scope: "local" });
        if (!cancelled) window.location.replace("/login?error=new_user");
        return;
      }

      if (!cancelled) window.location.replace("/");
    })();

    return () => { cancelled = true; };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
};

export default AuthOAuthCallback;
