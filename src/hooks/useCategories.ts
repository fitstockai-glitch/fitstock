import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Category {
  key: string;
  label: string;
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async (): Promise<Category[]> => {
      const { data, error } = await supabase
        .from("categories")
        .select("name, label")
        .order("sort_order", { ascending: true });

      if (error) throw error;

      const all: Category = { key: "all", label: "すべて" };
      const cats = (data || []).map((c) => ({ key: c.name, label: c.label }));
      return [all, ...cats];
    },
  });
}
