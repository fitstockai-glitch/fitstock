/**
 * Privacy / Terms / Legal は JA と EN で別ルートのため、言語切り替え時に相当パスへ遷移する。
 * 該当しないパスでは null を返す（呼び出し側で URL 変更しない）。
 */
export function getLegalPathForLanguage(
  pathname: string,
  nextLang: "ja" | "en",
): string | null {
  const path = pathname.replace(/\/$/, "") || "/";

  const toEn: Record<string, string> = {
    "/privacy-policy": "/en/privacy-policy",
    "/terms": "/en/terms",
    "/legal": "/en/legal",
    "/legal-notice": "/en/legal",
  };

  const toJa: Record<string, string> = {
    "/en/privacy-policy": "/privacy-policy",
    "/en/terms": "/terms",
    "/en/legal": "/legal",
    "/en/legal-notice": "/legal",
  };

  if (nextLang === "en") {
    return toEn[path] ?? null;
  }
  return toJa[path] ?? null;
}
