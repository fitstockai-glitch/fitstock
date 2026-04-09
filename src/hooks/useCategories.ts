import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Category {
  key: string;
  label: string;
  name_en: string | null;
}

/** フッター・ヘッダー下タブなど、写真数順で並べる UI の上限 */
export const CATEGORY_DISPLAY_MAX = 16;

/** 公開写真の件数が多いカテゴリから最大 max 件 */
export function useCategoriesByPhotoCount(max: number) {
  return useQuery({
    // v2: category_id が空でも category_name で categories.name に一致すればカウント
    queryKey: ["categories", "by-photo-count", max, "v2"],
    staleTime: 10 * 60 * 1000,
    queryFn: async (): Promise<Category[]> => {
      const { data: cats, error: catsError } = await supabase
        .from("categories")
        .select("id, name, label, name_en, sort_order")
        .order("sort_order", { ascending: true });

      if (catsError) throw catsError;
      if (!cats?.length) return [];

      const nameToCategoryId = new Map(cats.map((c) => [c.name, c.id]));

      const countByCategoryId = new Map<string, number>();
      const pageSize = 1000;
      let from = 0;

      for (;;) {
        const { data: page, error: photosError } = await supabase
          .from("photos")
          .select("category_id, category_name, categories")
          .eq("is_published", true)
          .is("deleted_at", null)
          .range(from, from + pageSize - 1);

        if (photosError) throw photosError;
        if (!page?.length) break;

        for (const row of page) {
          // categories[] が優先。複数カテゴリをそれぞれカウント
          const cats: string[] = Array.isArray((row as { categories?: unknown }).categories)
            ? ((row as { categories: unknown[] }).categories as string[]).filter((c) => typeof c === "string" && c.trim())
            : [];

          if (cats.length > 0) {
            for (const name of cats) {
              const resolvedId = nameToCategoryId.get(name.trim());
              if (resolvedId) {
                countByCategoryId.set(resolvedId, (countByCategoryId.get(resolvedId) ?? 0) + 1);
              }
            }
            continue;
          }

          // 後方互換: category_id / category_name にフォールバック
          const cid = row.category_id;
          if (cid != null) {
            countByCategoryId.set(cid, (countByCategoryId.get(cid) ?? 0) + 1);
            continue;
          }
          const n = row.category_name != null ? String(row.category_name).trim() : "";
          if (!n) continue;
          const resolvedId = nameToCategoryId.get(n);
          if (resolvedId) {
            countByCategoryId.set(resolvedId, (countByCategoryId.get(resolvedId) ?? 0) + 1);
          }
        }

        if (page.length < pageSize) break;
        from += pageSize;
      }

      const withCount = cats
        .map((c) => ({
          key: c.name,
          label: c.label,
          name_en: c.name_en ?? null,
          sort_order: c.sort_order,
          count: countByCategoryId.get(c.id) ?? 0,
        }))
        // 公開写真がないカテゴリはナビ・フッターに出さない（空の /category/:key を避ける）
        .filter((c) => c.count > 0);

      withCount.sort((a, b) => {
        if (b.count !== a.count) return b.count - a.count;
        return a.sort_order - b.sort_order;
      });

      return withCount.slice(0, max).map(({ key, label, name_en }) => ({ key, label, name_en }));
    },
  });
}

export function useFooterCategories() {
  return useCategoriesByPhotoCount(CATEGORY_DISPLAY_MAX);
}
