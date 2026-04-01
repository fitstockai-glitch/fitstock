import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Photo } from "@/types/photo";
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

function mapPhotos(photos: any[]): Photo[] {
  return photos.map((p) => {
    const thumb = buildThumbnailPublicUrlFlexible(p.preview_path);
    return {
      id: p.id,
      title: p.title,
      description: p.description,
      category_name: p.category_name,
      width: p.width || 1920,
      height: p.height || 1280,
      download_count: p.download_count,
      favorite_count: p.favorite_count,
      imageUrl: thumb ?? "",
      tags: [],
    };
  });
}

export function usePhotos(categoryName?: string, tagName?: string, searchQuery?: string) {
  const normalizedQuery = searchQuery?.trim() ?? "";
  return useQuery({
    queryKey: ["photos-v3-filters", categoryName, tagName, normalizedQuery],
    staleTime: 5 * 60 * 1000,
    queryFn: async (): Promise<Photo[]> => {
      let categoryId: string | null = null;
      let tagPhotoIds: string[] | null = null;

      if (categoryName && categoryName !== "all") {
        const { data: category, error: categoryError } = await supabase
          .from("categories")
          .select("id")
          .eq("name", categoryName)
          .maybeSingle();

        if (categoryError) throw categoryError;
        if (!category) return [];
        categoryId = category.id;
      }

      if (tagName && tagName !== "all") {
        const { data: tag, error: tagError } = await supabase
          .from("tags")
          .select("id")
          .eq("name", tagName)
          .maybeSingle();
        if (tagError) throw tagError;
        if (!tag) return [];

        const { data: photoTags, error: photoTagsError } = await supabase
          .from("photo_tags")
          .select("photo_id")
          .eq("tag_id", tag.id);
        if (photoTagsError) throw photoTagsError;

        tagPhotoIds = (photoTags || []).map((pt) => pt.photo_id);
        if (tagPhotoIds.length === 0) return [];
      }

      const baseQuery = () => {
        let query = supabase
          .from("photos")
          .select("*")
          .eq("is_published", true)
          .is("deleted_at", null)
          .order("created_at", { ascending: false });

        if (categoryId) {
          query = query.eq("category_id", categoryId);
        }

        if (tagPhotoIds && tagPhotoIds.length > 0) {
          query = query.in("id", tagPhotoIds);
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

      // Fetch tags
      const { data: photoTags } = await supabase
        .from("photo_tags")
        .select("tag_id, tags:tag_id(name)")
        .eq("photo_id", id);

      const tags = (photoTags as any[] || [])
        .map((pt) => pt.tags?.name)
        .filter(Boolean);

      const thumb = buildThumbnailPublicUrl(data.preview_path);
      const preview = buildPreviewPublicUrl(data.preview_path) ?? thumb;

      return {
        id: data.id,
        title: data.title,
        description: data.description,
        category_name: data.category_name,
        width: data.width || 1920,
        height: data.height || 1280,
        download_count: data.download_count,
        favorite_count: data.favorite_count,
        imageUrl: thumb ?? "",
        previewUrl: preview,
        tags,
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
