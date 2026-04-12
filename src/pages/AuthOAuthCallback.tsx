import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { consumeOauthIntent } from "@/lib/authLoginError";
import { enforceEmailIdentityOrReject } from "@/lib/oauthEmailGate";

/**
 * Google OAuth の PKCE コールバック専用。AuthProvider の外で処理し、
 * メール未登録ユーザーにはログイン UI を見せない。
 */
const AuthOAuthCallback = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("ログイン処理中…");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const url = new URL(window.location.href);
      const err = url.searchParams.get("error");
      const errDesc = url.searchParams.get("error_description");
      const code = url.searchParams.get("code");

      // OAuth 開始前に保存した intent を読み取る（Supabase が redirectTo のクエリを削除しても確実に取得できる）
      const oauthIntent = consumeOauthIntent();

      console.log("[FitStock auth] AuthOAuthCallback: mount", {
        href: window.location.href,
        hasCode: Boolean(code),
        hasErr: Boolean(err),
        oauthIntent,
      });

      if (err) {
        if (!cancelled) {
          setMessage(errDesc || "ログインに失敗しました");
          window.setTimeout(() => navigate("/login", { replace: true }), 800);
        }
        return;
      }

      if (!code) {
        if (!cancelled) navigate("/login", { replace: true });
        return;
      }

      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      if (exchangeError) {
        console.error("exchangeCodeForSession:", exchangeError);
        if (!cancelled) navigate("/login", { replace: true });
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
      const allowed = await enforceEmailIdentityOrReject({
        oauthIntent,
      });
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
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
};

export default AuthOAuthCallback;
