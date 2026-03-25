/**
 * Supabase Auth が localStorage に保存するセッションを削除する。
 * ユーザー削除直後など /logout が失敗してもクライアントを未ログイン状態に戻すために使う。
 */
export function clearSupabaseAuthStorage(): void {
  if (typeof window === "undefined") return;
  try {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (!key) continue;
      if (key.startsWith("sb-") && key.endsWith("-auth-token")) {
        localStorage.removeItem(key);
        continue;
      }
      if (key.includes("supabase.auth.token")) {
        localStorage.removeItem(key);
        continue;
      }
      if (key.endsWith("-code-verifier")) {
        localStorage.removeItem(key);
      }
    }
  } catch {
    /* ignore */
  }
}
