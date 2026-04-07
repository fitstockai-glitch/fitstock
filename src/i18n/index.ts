import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ja from "./ja.json";
import en from "./en.json";

const browserLang =
  (typeof navigator !== "undefined" && (navigator.language || navigator.languages?.[0])) || "ja";
const defaultLng = browserLang.toLowerCase().startsWith("en") ? "en" : "ja";

i18n.use(initReactI18next).init({
  resources: {
    ja: { translation: ja },
    en: { translation: en },
  },
  lng: defaultLng,
  fallbackLng: "ja",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
