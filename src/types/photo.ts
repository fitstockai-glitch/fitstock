export interface Photo {
  id: string;
  title: string;
  description: string | null;
  category_name: string | null;
  width: number;
  height: number;
  download_count: number;
  favorite_count: number;
  imageUrl: string;
  tags: string[];
}
