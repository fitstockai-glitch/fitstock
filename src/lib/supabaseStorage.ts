/** Supabase Storage の public URL を組み立てる（バケット名は URL パスに含める） */

const SUPABASE_URL = "https://oytupgguadlpgkzigykz.supabase.co";
/** UUID ファイル名（thumbnails / previews と同名キー想定）。拡張子はよくある画像形式を許容 */
const UUID_IMAGE_FILE_REGEX =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}\.(jpe?g|png|webp)$/i;

/** DB の storage_path から originals バケット内のオブジェクトキーへ（先頭の originals/ を除去） */
export function normalizeOriginalStoragePath(storagePath: string): string {
  return storagePath.replace(/^originals\//, "").replace(/^\/+/, "");
}

/**
 * 一覧用サムネイル URL。
 * - `previews/{id}_preview.jpg` → `thumbnails/{id}_thumb.jpg`
 * - デモ用 `01_preview.png` 形式は buildThumbnailPublicUrl にフォールバック
 */
export function buildThumbnailPublicUrlFlexible(previewPath: string | null | undefined): string | null {
  if (previewPath == null || String(previewPath).trim() === "") return null;
  const key = String(previewPath).replace(/^previews\//, "").replace(/^\/+/, "");
  if (/_preview\./.test(key)) {
    const thumbKey = key.replace(/_preview\./, "_thumb.");
    return `${SUPABASE_URL}/storage/v1/object/public/thumbnails/${thumbKey}`;
  }
  const legacyThumb = buildThumbnailPublicUrl(previewPath);
  if (legacyThumb) return legacyThumb;
  return buildPreviewPublicUrl(previewPath);
}

/**
 * 一覧・ギャラリー用: thumbnails バケット。
 * preview_path(例: 02_preview.png / previews/02_preview.png) から
 * 02_thumb.png を組み立てる。
 */
export function buildThumbnailPublicUrl(previewPath: string | null | undefined): string | null {
  if (previewPath == null || String(previewPath).trim() === "") return null;
  const key = String(previewPath)
    .replace(/^previews\//, "")
    .replace(/^\/+/, "");

  // UUID ファイル名（{uuid}.jpg）は同名で thumbnails バケットを参照する
  if (UUID_IMAGE_FILE_REGEX.test(key)) {
    return `${SUPABASE_URL}/storage/v1/object/public/thumbnails/${key}`;
  }

  const match = key.match(/^(\d{2})_preview\.[a-zA-Z0-9]+$/);
  if (!match) return null;
  const num = Number(match[1]);
  if (num < 1 || num > 5) return null;
  const thumbFile = `${match[1]}_thumb.png`;
  return `${SUPABASE_URL}/storage/v1/object/public/thumbnails/${thumbFile}`;
}

/**
 * 詳細ページ用: previews バケット。
 * preview_path は DB 上で `01_preview.png` のようにバケット名を含まないファイル名。
 * もし `previews/xxx` 形式で入っている場合は先頭のプレフィックスを除く。
 */
export function buildPreviewPublicUrl(previewPath: string | null | undefined): string | null {
  if (previewPath == null || String(previewPath).trim() === "") return null;
  const key = String(previewPath).replace(/^previews\//, "").replace(/^\/+/, "");

  if (UUID_IMAGE_FILE_REGEX.test(key)) {
    return `${SUPABASE_URL}/storage/v1/object/public/thumbnails/${key}`;
  }

  return `${SUPABASE_URL}/storage/v1/object/public/previews/${key}`;
}
