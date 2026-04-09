export interface Photo {
  id: string;
  title: string;
  title_en: string | null;
  description: string | null;
  description_en: string | null;
  category_name: string | null;
  categories: string[];
  width: number;
  height: number;
  download_count: number;
  favorite_count: number;
  /** 一覧・カード用（thumbnails バケット） */
  imageUrl: string;
  /** 詳細ページのメイン画像用（previews バケット）。未設定時は imageUrl を使う */
  previewUrl?: string | null;
  tags: string[];
  tags_en: string[] | null;
}
