import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ja from "./ja.json";
import en from "./en.json";

/** ヘッダー x-vercel-ip-country をミドルウェアが載せる Cookie（ブラウザから参照） */
const VERCEL_COUNTRY_COOKIE = "fitstock-vercel-country";
/** ユーザーが言語メニューで選んだ値を保持（最優先） */
const MANUAL_LOCALE_STORAGE_KEY = "fitstock-i18n-locale";

type AppLocale = "ja" | "en";

function readManualLocale(): AppLocale | null {
  try {
    const v = localStorage.getItem(MANUAL_LOCALE_STORAGE_KEY);
    if (v === "ja" || v === "en") return v;
  } catch {
    /* ignore */
  }
  return null;
}

function browserPrefersJapanese(): boolean {
  if (typeof navigator === "undefined") return false;
  const list = navigator.languages?.length ? navigator.languages : [navigator.language];
  return list.some((lang) => lang.toLowerCase().startsWith("ja"));
}

function readVercelCountryFromCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${VERCEL_COUNTRY_COOKIE}=([^;]*)`),
  );
  if (!match?.[1]) return null;
  try {
    return decodeURIComponent(match[1].trim());
  } catch {
    return match[1].trim();
  }
}

/** 国のみから初期言語を決める（Cookie 未設定時は日本以外とみなして英語） */
function defaultLocaleFromCountry(): AppLocale {
  const country = readVercelCountryFromCookie();
  if (country === "JP") return "ja";
  return "en";
}

/**
 * 優先順位: 手動選択 > ブラウザが日本語 > Vercel 国コード（JP=日本語・それ以外=英語）
 */
function resolveInitialLanguage(): AppLocale {
  const manual = readManualLocale();
  if (manual) return manual;
  if (browserPrefersJapanese()) return "ja";
  return defaultLocaleFromCountry();
}

i18n.use(initReactI18next).init(
  {
    resources: {
      ja: { translation: ja },
      en: { translation: en },
    },
    lng: resolveInitialLanguage(),
    fallbackLng: "ja",
    interpolation: {
      escapeValue: false,
    },
  },
  () => {
    // init 時に飛ぶ languageChanged を拾わないよう、同期処理の後に登録する
    setTimeout(() => {
      i18n.on("languageChanged", (lng) => {
        try {
          const code: AppLocale = lng.startsWith("en") ? "en" : "ja";
          localStorage.setItem(MANUAL_LOCALE_STORAGE_KEY, code);
        } catch {
          /* ignore */
        }
      });
    }, 0);
  },
);

export default i18n;
