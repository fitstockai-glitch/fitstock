import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface TagOption {
  key: string;
  label: string;
}

export function useTags() {
  return useQuery({
    queryKey: ["tags"],
    staleTime: 10 * 60 * 1000,
    queryFn: async (): Promise<TagOption[]> => {
      const { data, error } = await supabase
        .from("tags")
        .select("name")
        .order("name", { ascending: true });

      if (error) throw error;

      const all: TagOption = { key: "all", label: "すべて" };
      const tags = (data || []).map((t) => ({ key: t.name, label: t.name }));
      return [all, ...tags];
    },
  });
}
