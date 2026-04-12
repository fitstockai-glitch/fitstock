import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { consumeOauthIntent, saveOauthErrorMessage } from "@/lib/authLoginError";
import { enforceEmailIdentityOrReject } from "@/lib/oauthEmailGate";

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

/**
 * Google OAuth の PKCE コールバック専用。AuthProvider の外で処理し、
 * メール未登録ユーザーにはログイン UI を見せない。
 */
const AuthOAuthCallback = () => {
  const [message, setMessage] = useState("ログイン処理中…");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const params = getOauthParams(window.location.href);
      const err = params["error"] ?? null;
      const errDesc = params["error_description"] ?? null;
      const code = params["code"] ?? null;

      const oauthIntent = consumeOauthIntent();

      console.log("[FitStock auth] AuthOAuthCallback: mount", {
        href: window.location.href,
        hasCode: Boolean(code),
        hasErr: Boolean(err),
        oauthIntent,
      });

      /** エラーメッセージを保存して /login に飛ぶ */
      function redirectLoginWithError(msg: string): void {
        saveOauthErrorMessage(msg);
        console.log("[FitStock auth] AuthOAuthCallback: error → save & redirect /login", { msg });
        window.location.replace("/login");
      }

      if (err) {
        const msg =
          errDesc
            ? decodeURIComponent(errDesc.replace(/\+/g, " "))
            : "Googleログインに失敗しました。もう一度お試しください。";
        if (!cancelled) {
          setMessage(msg);
          redirectLoginWithError(msg);
        }
        return;
      }

      if (!code) {
        console.log("[FitStock auth] AuthOAuthCallback: no code, redirect /login");
        if (!cancelled) window.location.replace("/login");
        return;
      }

      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      if (exchangeError) {
        console.error("[FitStock auth] AuthOAuthCallback: exchangeCodeForSession error", exchangeError);
        if (!cancelled) {
          redirectLoginWithError("Googleログインの認証に失敗しました。もう一度お試しください。");
        }
        return;
      }

      const urlClean = new URL(window.location.href);
      urlClean.searchParams.delete("code");
      const qs = urlClean.searchParams.toString();
      window.history.replaceState({}, document.title, urlClean.pathname + (qs ? `?${qs}` : ""));

      console.log("[FitStock auth] AuthOAuthCallback: exchange OK, calling enforceEmailIdentityOrReject()", {
        cancelled,
        oauthIntent,
      });
      const allowed = await enforceEmailIdentityOrReject({ oauthIntent });
      console.log("[FitStock auth] AuthOAuthCallback: enforceEmailIdentityOrReject() returned", {
        allowed,
        cancelled,
      });

      if (!allowed || cancelled) return;

      console.log("[FitStock auth] AuthOAuthCallback: redirecting to /");
      window.location.replace("/");
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
};

export default AuthOAuthCallback;
