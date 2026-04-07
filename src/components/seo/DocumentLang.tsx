import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

/** <html lang> を UI 言語に合わせる */
export function DocumentLang() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith("en") ? "en" : "ja";
  return <Helmet htmlAttributes={{ lang }} />;
}
