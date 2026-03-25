import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Category {
  key: string;
  label: string;
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories", "db"],
    staleTime: 10 * 60 * 1000,
    queryFn: async (): Promise<Category[]> => {
      const { data, error } = await supabase
        .from("categories")
        .select("name, label")
        .order("sort_order", { ascending: true });

      if (error) throw error;

      return (data || []).map((c) => ({ key: c.name, label: c.label }));
    },
  });
}
