import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Photo } from "@/types/photo";

const SUPABASE_URL = "https://oytupgguadlpgkzigykz.supabase.co";

function buildImageUrl(previewPath: string | null, storagePath: string): string {
  const path = previewPath || storagePath;
  return `${SUPABASE_URL}/storage/v1/object/public/${path}`;
}

export function usePhotos(categoryName?: string) {
  return useQuery({
    queryKey: ["photos", categoryName],
    queryFn: async (): Promise<Photo[]> => {
      // Fetch photos
      let query = supabase
        .from("photos")
        .select("*")
        .order("created_at", { ascending: false });

      if (categoryName && categoryName !== "all") {
        query = query.eq("category_name", categoryName);
      }

      const { data: photosData, error: photosError } = await query;
      if (photosError) throw photosError;
      if (!photosData || photosData.length === 0) return [];

      // Fetch all tags for these photos
      const photoIds = photosData.map((p) => p.id);
      const { data: photoTags, error: tagsError } = await supabase
        .from("photo_tags")
        .select("photo_id, tag_id, tags:tag_id(name)")
        .in("photo_id", photoIds);

      if (tagsError) throw tagsError;

      // Build tag map
      const tagMap: Record<string, string[]> = {};
      if (photoTags) {
        for (const pt of photoTags as any[]) {
          const photoId = pt.photo_id;
          const tagName = pt.tags?.name;
          if (tagName) {
            if (!tagMap[photoId]) tagMap[photoId] = [];
            tagMap[photoId].push(tagName);
          }
        }
      }

      return photosData.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        category_name: p.category_name,
        width: p.width || 1920,
        height: p.height || 1280,
        download_count: p.download_count,
        favorite_count: p.favorite_count,
        imageUrl: buildImageUrl(p.preview_path, p.storage_path),
        tags: tagMap[p.id] || [],
      }));
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

      return {
        id: data.id,
        title: data.title,
        description: data.description,
        category_name: data.category_name,
        width: data.width || 1920,
        height: data.height || 1280,
        download_count: data.download_count,
        favorite_count: data.favorite_count,
        imageUrl: buildImageUrl(data.preview_path, data.storage_path),
        tags,
      };
    },
  });
}
