import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { normalizePhotoTags } from "@/hooks/usePhotos";

export interface TagOption {
  key: string;
  label: string;
}

/**
 * 公開中写真の photos.tags を集約したタグ一覧（マスタ tags テーブルは使わない）
 */
export function useTags() {
  return useQuery({
    queryKey: ["tags-from-photos"],
    staleTime: 10 * 60 * 1000,
    queryFn: async (): Promise<TagOption[]> => {
      const { data, error } = await supabase
        .from("photos")
        .select("tags")
        .eq("is_published", true)
        .is("deleted_at", null);

      if (error) throw error;

      const names = new Set<string>();
      for (const row of data || []) {
        for (const t of normalizePhotoTags(row.tags)) {
          names.add(t);
        }
      }

      const sorted = [...names].sort((a, b) => a.localeCompare(b, "ja"));
      const all: TagOption = { key: "all", label: "すべて" };
      return [all, ...sorted.map((name) => ({ key: name, label: name }))];
    },
  });
}
