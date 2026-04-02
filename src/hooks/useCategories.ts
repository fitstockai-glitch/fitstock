import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Category {
  key: string;
  label: string;
}

/** フッター・ヘッダー下タブなど、写真数順で並べる UI の上限 */
export const CATEGORY_DISPLAY_MAX = 16;

/** 公開写真の件数が多いカテゴリから最大 max 件 */
export function useCategoriesByPhotoCount(max: number) {
  return useQuery({
    queryKey: ["categories", "by-photo-count", max],
    staleTime: 10 * 60 * 1000,
    queryFn: async (): Promise<Category[]> => {
      const { data: cats, error: catsError } = await supabase
        .from("categories")
        .select("id, name, label, sort_order")
        .order("sort_order", { ascending: true });

      if (catsError) throw catsError;
      if (!cats?.length) return [];

      const countByCategoryId = new Map<string, number>();
      const pageSize = 1000;
      let from = 0;

      for (;;) {
        const { data: page, error: photosError } = await supabase
          .from("photos")
          .select("category_id")
          .eq("is_published", true)
          .is("deleted_at", null)
          .range(from, from + pageSize - 1);

        if (photosError) throw photosError;
        if (!page?.length) break;

        for (const row of page) {
          const cid = row.category_id;
          if (cid == null) continue;
          countByCategoryId.set(cid, (countByCategoryId.get(cid) ?? 0) + 1);
        }

        if (page.length < pageSize) break;
        from += pageSize;
      }

      const withCount = cats.map((c) => ({
        key: c.name,
        label: c.label,
        sort_order: c.sort_order,
        count: countByCategoryId.get(c.id) ?? 0,
      }));

      withCount.sort((a, b) => {
        if (b.count !== a.count) return b.count - a.count;
        return a.sort_order - b.sort_order;
      });

      return withCount.slice(0, max).map(({ key, label }) => ({ key, label }));
    },
  });
}

export function useFooterCategories() {
  return useCategoriesByPhotoCount(CATEGORY_DISPLAY_MAX);
}
