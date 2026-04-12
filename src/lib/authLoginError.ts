/** ログインページで表示する待機エラー（localStorage / sessionStorage） */
export const FITSTOCK_LOGIN_PENDING_ERROR_KEY = "fitstock_login_pending_error";

/** URL クエリ名: /login?error=… */
export const LOGIN_URL_ERROR_PARAM = "error";

/** Google OAuth のみ新規の拒否（URL・ストレージ共通の値） */
export const LOGIN_ERROR_CODE_OAUTH_SIGNUP_REQUIRED = "oauth_signup_required";

/** 旧実装との互換 */
export const LEGACY_LOGIN_ERROR_SESSION_KEY = "fitstock_login_error";
export const LEGACY_LOGIN_ERROR_CODE_EMAIL = "oauth_email_required";

/** OAuth 開始直前に localStorage へ保存する intent キー */
export const OAUTH_INTENT_KEY = "fitstock_oauth_intent";
/** ログイン経路 */
export const OAUTH_FROM_LOGIN = "login";
/** 登録経路 */
export const OAUTH_FROM_REGISTER = "register";

/** ログイン経路のみ Google のみ新規ユーザーを拒否する（intent 未指定はログイン扱いで厳格） */
export function shouldRejectOauthOnlyNewUser(intent: string | null): boolean {
  if (!intent) return true;
  const v = intent.trim().toLowerCase();
  return v !== OAUTH_FROM_REGISTER;
}

/** OAuth 開始前に intent を localStorage に保存する */
export function saveOauthIntent(intent: typeof OAUTH_FROM_LOGIN | typeof OAUTH_FROM_REGISTER): void {
  try {
    localStorage.setItem(OAUTH_INTENT_KEY, intent);
    console.log("[FitStock auth] saveOauthIntent:", intent);
  } catch {
    /* プライベートモード等は無視 */
  }
}

/** AuthOAuthCallback で intent を読み取り、消去して返す */
export function consumeOauthIntent(): string | null {
  try {
    const v = localStorage.getItem(OAUTH_INTENT_KEY);
    localStorage.removeItem(OAUTH_INTENT_KEY);
    console.log("[FitStock auth] consumeOauthIntent:", v);
    return v;
  } catch {
    return null;
  }
}
