import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Photo } from "@/types/photo";
import { Tables } from "@/integrations/supabase/types";
import {
  buildThumbnailPublicUrl,
  buildThumbnailPublicUrlFlexible,
  buildPreviewPublicUrl,
} from "@/lib/supabaseStorage";

/** トップギャラリー（01〜05）と同じ preview_path だけ true */
export function isThumbnailInRange01To05(previewPath: string | null): boolean {
  if (!previewPath) return false;
  const normalized = previewPath.replace(/^previews\//, "").replace(/^\/+/, "");
  const match = normalized.match(/^(\d{2})_preview\./);
  if (!match) return false;
  const num = Number(match[1]);
  return num >= 1 && num <= 5;
}

function buildTsQuery(rawQuery: string): string {
  return rawQuery
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => `${token}:*`)
    .join(" & ");
}

/** DB / API の tags を string[] に正規化 */
export function normalizePhotoTags(value: unknown): string[] {
  if (value == null) return [];
  if (!Array.isArray(value)) return [];
  return value.filter((t): t is string => typeof t === "string" && t.trim().length > 0);
}

function mapPhotos(photos: Tables<"photos">[]): Photo[] {
  return photos.map((p) => {
    const thumb = buildThumbnailPublicUrlFlexible(p.preview_path);
    const tagsEn = normalizePhotoTags(p.tags_en);
    return {
      id: p.id,
      title: p.title,
      title_en: p.title_en ?? null,
      description: p.description,
      description_en: p.description_en ?? null,
      category_name: p.category_name,
      width: p.width || 1920,
      height: p.height || 1280,
      download_count: p.download_count,
      favorite_count: p.favorite_count,
      imageUrl: thumb ?? "",
      tags: normalizePhotoTags(p.tags),
      tags_en: tagsEn.length > 0 ? tagsEn : null,
    };
  });
}

export function usePhotos(categoryName?: string, tagName?: string, searchQuery?: string) {
  const normalizedQuery = searchQuery?.trim() ?? "";
  return useQuery({
    queryKey: ["photos-v4-tags-array", categoryName, tagName, normalizedQuery],
    staleTime: 5 * 60 * 1000,
    queryFn: async (): Promise<Photo[]> => {
      const baseQuery = () => {
        let query = supabase
          .from("photos")
          .select("*")
          .eq("is_published", true)
          .is("deleted_at", null)
          .order("created_at", { ascending: false });

        if (categoryName && categoryName !== "all") {
          query = query.eq("category_name", categoryName);
        }

        if (tagName && tagName !== "all") {
          query = query.contains("tags", [tagName]);
        }

        return query;
      };

      const queryText = normalizedQuery.trim();
      if (!queryText) {
        const { data, error } = await baseQuery();
        if (error) throw error;
        if (!data || data.length === 0) return [];
        return mapPhotos(data);
      }

      const tsQuery = buildTsQuery(queryText);
      if (tsQuery) {
        // Prefer full-text index first. If no hit or error, fallback to ILIKE for Japanese matching.
        const { data: textData, error: textError } = await baseQuery().textSearch(
          "search_vector",
          tsQuery,
          { type: "plain", config: "simple" }
        );
        if (!textError && textData && textData.length > 0) {
          return mapPhotos(textData);
        }
      }

      const [titleResult, descriptionResult] = await Promise.all([
        baseQuery().ilike("title", `%${queryText}%`),
        baseQuery().ilike("description", `%${queryText}%`),
      ]);

      if (titleResult.error) throw titleResult.error;
      if (descriptionResult.error) throw descriptionResult.error;

      const merged = new Map<string, any>();
      for (const photo of titleResult.data || []) {
        merged.set(photo.id, photo);
      }
      for (const photo of descriptionResult.data || []) {
        merged.set(photo.id, photo);
      }

      return mapPhotos(Array.from(merged.values()));
    },
  });
}

export function usePhoto(id: string | undefined) {
  return useQuery({
    queryKey: ["photo", id],
    enabled: !!id,
    queryFn: async (): Promise<Photo | null> => {
      if (!id) return null;

      const { data, error } = await supabase
        .from("photos")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      const tags = normalizePhotoTags((data as { tags?: unknown }).tags);
      const tagsEnRaw = normalizePhotoTags((data as { tags_en?: unknown }).tags_en);

      const thumb = buildThumbnailPublicUrl(data.preview_path);
      const preview = buildPreviewPublicUrl(data.preview_path) ?? thumb;

      return {
        id: data.id,
        title: data.title,
        title_en: data.title_en ?? null,
        description: data.description,
        description_en: data.description_en ?? null,
        category_name: data.category_name,
        width: data.width || 1920,
        height: data.height || 1280,
        download_count: data.download_count,
        favorite_count: data.favorite_count,
        imageUrl: thumb ?? "",
        previewUrl: preview,
        tags,
        tags_en: tagsEnRaw.length > 0 ? tagsEnRaw : null,
      };
    },
  });
}

export function useRelatedPhotos(excludeId: string | undefined, limit = 24) {
  return useQuery({
    queryKey: ["related-photos", excludeId, limit],
    enabled: !!excludeId,
    staleTime: 5 * 60 * 1000,
    queryFn: async (): Promise<Photo[]> => {
      if (!excludeId) return [];

      const { data, error } = await supabase
        .from("photos")
        .select("*")
        .eq("is_published", true)
        .is("deleted_at", null)
        .neq("id", excludeId)
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) throw error;
      if (!data || data.length === 0) return [];

      return mapPhotos(data);
    },
  });
}
