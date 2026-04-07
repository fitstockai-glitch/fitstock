import { Helmet } from "react-helmet-async";
import { DEFAULT_OGP_IMAGE_PATH, SITE_ORIGIN, siteAssetUrl } from "@/config/site";

export type SeoProps = {
  title: string;
  /** meta description & og:description */
  description?: string;
  /** <link rel="canonical"> */
  canonicalUrl?: string;
  /** og:url（未指定時は canonicalUrl → SITE_ORIGIN） */
  ogUrl?: string;
  /** 絶対URL推奨。未指定時はサイト既定の /ogp.png */
  ogImage?: string | null;
};

function normalizeDescription(text: string | undefined, maxLen = 300): string | undefined {
  if (text == null || !String(text).trim()) return undefined;
  const oneLine = String(text).replace(/\s+/g, " ").trim();
  if (oneLine.length <= maxLen) return oneLine;
  return `${oneLine.slice(0, maxLen - 1).trimEnd()}…`;
}

/**
 * OGP / Twitter Card / 基本 meta。
 * 全ページ共通: og:site_name, og:type, twitter:card
 */
export function Seo({ title, description, canonicalUrl, ogUrl, ogImage }: SeoProps) {
  const desc = normalizeDescription(description);
  const image =
    ogImage && String(ogImage).trim() !== ""
      ? String(ogImage).trim()
      : siteAssetUrl(DEFAULT_OGP_IMAGE_PATH);
  const url = (ogUrl ?? canonicalUrl ?? SITE_ORIGIN).trim();

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      {desc != null ? <meta name="description" content={desc} /> : null}
      {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}

      <meta property="og:site_name" content="FitStock" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />

      <meta property="og:title" content={title} />
      {desc != null ? <meta property="og:description" content={desc} /> : null}
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      <meta name="twitter:title" content={title} />
      {desc != null ? <meta name="twitter:description" content={desc} /> : null}
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
