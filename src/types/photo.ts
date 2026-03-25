export interface Photo {
  id: string;
  title: string;
  description: string | null;
  category_name: string | null;
  width: number;
  height: number;
  download_count: number;
  favorite_count: number;
  /** 一覧・カード用（thumbnails バケット） */
  imageUrl: string;
  /** 詳細ページのメイン画像用（previews バケット）。未設定時は imageUrl を使う */
  previewUrl?: string | null;
  tags: string[];
}
