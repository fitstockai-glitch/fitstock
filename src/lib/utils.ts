import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * MasonryGallery が付与する末尾サフィックス（-b{batch}-{index}）を除去し、
 * 元の写真 ID を返す。
 */
export function extractBasePhotoId(id: string): string {
  return id.replace(/-b\d+-\d+$/, "");
}
