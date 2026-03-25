import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export type MembershipTier = "free" | "plus";

export function useMembershipTier() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["membership-tier", user?.id],
    enabled: !!user,
    staleTime: 60 * 1000,
    queryFn: async (): Promise<MembershipTier | null> => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("memberships")
        .select("tier")
        .eq("user_id", user.id)
        .maybeSingle();
      if (error) throw error;
      return (data?.tier as MembershipTier | null) ?? null;
    },
  });
}

