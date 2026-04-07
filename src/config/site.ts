/** 本番の正規オリジン（OGP・canonical 用） */
export const SITE_ORIGIN = "https://fitstock.ai";

export const DEFAULT_OGP_IMAGE_PATH = "/ogp.png";

export function siteAssetUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${p}`;
}
