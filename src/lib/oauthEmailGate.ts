import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { clearSupabaseAuthStorage } from "@/lib/clearSupabaseAuthStorage";
import {
  FITSTOCK_LOGIN_PENDING_ERROR_KEY,
  LEGACY_LOGIN_ERROR_CODE_EMAIL,
  LEGACY_LOGIN_ERROR_SESSION_KEY,
  LOGIN_ERROR_CODE_OAUTH_SIGNUP_REQUIRED,
  LOGIN_URL_ERROR_PARAM,
  shouldRejectOauthOnlyNewUser,
} from "@/lib/authLoginError";

export { shouldRejectOauthOnlyNewUser };

export function hasEmailIdentity(user: User | null | undefined): boolean {
  return Boolean(user?.identities?.some((i) => i.provider === "email"));
}

async function clearLocalAuthSession(): Promise<void> {
  try {
    await supabase.auth.signOut({ scope: "local" });
  } catch {
    /* ignore */
  } finally {
    clearSupabaseAuthStorage();
  }
}

/** リダイレクト先でトースト表示するため URL・localStorage・sessionStorage にエラーを残す */
export function redirectToLoginWithOauthSignupRejected(): void {
  const code = LOGIN_ERROR_CODE_OAUTH_SIGNUP_REQUIRED;
  try {
    localStorage.setItem(FITSTOCK_LOGIN_PENDING_ERROR_KEY, code);
  } catch {
    /* プライベートモード等 */
  }
  try {
    sessionStorage.setItem(FITSTOCK_LOGIN_PENDING_ERROR_KEY, code);
  } catch {
    /* ignore */
  }
  const url = new URL("/login", window.location.origin);
  url.searchParams.set(LOGIN_URL_ERROR_PARAM, code);
  const target = url.toString();
  console.log("[FitStock auth] redirectToLoginWithOauthSignupRejected:", {
    target,
    code,
    afterReplaceNote: "次のフルロード後、location.href に ?error= が付いているか DevTools で確認",
  });
  window.location.replace(target);
}

export type EnforceEmailIdentityOptions = {
  /** OAuth 開始前に localStorage に保存した intent（login | register） */
  oauthIntent?: string | null;
};

/** PKCE 等でセッションが付いた直後に呼ぶ。intent=login かつメール identity がなければ Edge で削除し /login へ。intent=register は Google 新規を許可。続行可能なら true。 */
export async function enforceEmailIdentityOrReject(
  options?: EnforceEmailIdentityOptions,
): Promise<boolean> {
  const intent = options?.oauthIntent ?? null;
  const rejectOauthOnly = shouldRejectOauthOnlyNewUser(intent);

  console.log("[FitStock auth] enforceEmailIdentityOrReject: called", {
    oauthIntent: intent,
    rejectOauthOnlyNewUser: rejectOauthOnly,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    console.log("[FitStock auth] enforceEmailIdentityOrReject: no session.user → allow (true)");
    return true;
  }

  const identities = session.user.identities?.map((i) => i.provider) ?? [];
  const emailOk = hasEmailIdentity(session.user);
  console.log("[FitStock auth] enforceEmailIdentityOrReject: session ok", {
    userId: session.user.id,
    identities,
    hasEmailIdentity: emailOk,
  });

  if (emailOk) {
    console.log("[FitStock auth] enforceEmailIdentityOrReject: email identity present → allow (true), skip Edge Function");
    return true;
  }

  if (!rejectOauthOnly) {
    console.log(
      "[FitStock auth] enforceEmailIdentityOrReject: register OAuth flow → allow Google-only new user (skip Edge Function)",
    );
    return true;
  }

  console.log("[FitStock auth] enforceEmailIdentityOrReject: invoking Edge Function reject-google-only-signup …");
  const { data, error } = await supabase.functions.invoke("reject-google-only-signup", {
    body: {},
    headers: { Authorization: `Bearer ${session.access_token}` },
  });

  console.log("[FitStock auth] enforceEmailIdentityOrReject: Edge Function raw", { data, error });
  try {
    console.log(
      "[FitStock auth] enforceEmailIdentityOrReject: Edge Function data (JSON)",
      data !== undefined && data !== null ? JSON.stringify(data) : String(data),
    );
  } catch {
    console.log("[FitStock auth] enforceEmailIdentityOrReject: Edge Function data (non-serializable)", data);
  }
  if (error) {
    console.error("[FitStock auth] enforceEmailIdentityOrReject: Edge Function error branch → redirect login", {
      name: error.name,
      message: error.message,
      error,
    });
    await clearLocalAuthSession();
    redirectToLoginWithOauthSignupRejected();
    return false;
  }

  if (data && typeof data === "object" && "deleted" in data && data.deleted === true) {
    console.log("[FitStock auth] enforceEmailIdentityOrReject: data.deleted === true → redirect login");
    await clearLocalAuthSession();
    redirectToLoginWithOauthSignupRejected();
    return false;
  }

  console.log("[FitStock auth] enforceEmailIdentityOrReject: allow (true), Edge returned without delete redirect");
  return true;
}

/** ログインページで表示すべき OAuth 拒否エラーか（URL またはストレージの値） */
export function isOauthSignupRejectedCode(code: string | null): boolean {
  if (!code) return false;
  return (
    code === LOGIN_ERROR_CODE_OAUTH_SIGNUP_REQUIRED || code === LEGACY_LOGIN_ERROR_CODE_EMAIL
  );
}

/**
 * URL クエリ → localStorage → sessionStorage の順で参照（いずれかが拒否コードならそれを返す）
 * @param routerSearchParams React Router の useSearchParams()（初回描画で window と同期しない場合があるため優先）
 */
export function getPendingLoginErrorCode(routerSearchParams?: URLSearchParams): string | null {
  if (typeof window === "undefined") return null;
  try {
    const fromRouter = routerSearchParams?.get(LOGIN_URL_ERROR_PARAM) ?? null;
    console.log("[FitStock auth] getPendingLoginErrorCode: router ?.", LOGIN_URL_ERROR_PARAM, "=", fromRouter);

    const fromWindow = new URLSearchParams(window.location.search).get(LOGIN_URL_ERROR_PARAM);
    console.log("[FitStock auth] getPendingLoginErrorCode: window.location.href=", window.location.href);
    console.log("[FitStock auth] getPendingLoginErrorCode: window.location.search error=", fromWindow);

    if (isOauthSignupRejectedCode(fromRouter)) {
      console.log("[FitStock auth] getPendingLoginErrorCode: resolved from router →", fromRouter);
      return fromRouter;
    }
    if (isOauthSignupRejectedCode(fromWindow)) {
      console.log("[FitStock auth] getPendingLoginErrorCode: resolved from window URL →", fromWindow);
      return fromWindow;
    }

    for (const storageKey of [FITSTOCK_LOGIN_PENDING_ERROR_KEY, LEGACY_LOGIN_ERROR_SESSION_KEY]) {
      const ls = localStorage.getItem(storageKey);
      console.log("[FitStock auth] getPendingLoginErrorCode: localStorage", storageKey, "=", ls);
      if (isOauthSignupRejectedCode(ls)) {
        console.log("[FitStock auth] getPendingLoginErrorCode: resolved from localStorage →", ls);
        return ls;
      }
      const ss = sessionStorage.getItem(storageKey);
      console.log("[FitStock auth] getPendingLoginErrorCode: sessionStorage", storageKey, "=", ss);
      if (isOauthSignupRejectedCode(ss)) {
        console.log("[FitStock auth] getPendingLoginErrorCode: resolved from sessionStorage →", ss);
        return ss;
      }
    }
    console.log("[FitStock auth] getPendingLoginErrorCode: no matching code");
  } catch (e) {
    console.warn("[FitStock auth] getPendingLoginErrorCode: exception", e);
    return null;
  }
  return null;
}

/** 表示後にストレージを掃除（レガシーキーも） */
export function clearPendingLoginErrorStorage(): void {
  try {
    localStorage.removeItem(FITSTOCK_LOGIN_PENDING_ERROR_KEY);
    localStorage.removeItem(LEGACY_LOGIN_ERROR_SESSION_KEY);
    sessionStorage.removeItem(FITSTOCK_LOGIN_PENDING_ERROR_KEY);
    sessionStorage.removeItem(LEGACY_LOGIN_ERROR_SESSION_KEY);
  } catch {
    /* ignore */
  }
}
