import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Seo } from "./Seo";
import { SITE_ORIGIN } from "@/config/site";

/**
 * ホーム・写真詳細以外のルート向けの最低限の SEO（トップ／写真は各ページで上書き）
 */
export function AppRouteSeoFallback() {
  const { pathname, search } = useLocation();
  const { t } = useTranslation();

  if (pathname === "/" || pathname.startsWith("/photo/")) {
    return null;
  }

  const canonicalUrl = `${SITE_ORIGIN}${pathname}${search}`;

  return (
    <Seo
      title="FitStock"
      description={t("seo.defaultDescription")}
      canonicalUrl={canonicalUrl}
      ogUrl={canonicalUrl}
    />
  );
}
