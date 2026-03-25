import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export type ProfileData = {
  displayName: string;
  email: string;
};

export function useProfileData() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user,
    queryFn: async (): Promise<ProfileData> => {
      const { data: userResult, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      const authUser = userResult.user;
      if (!authUser) throw new Error("認証情報を取得できませんでした");

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("id", authUser.id)
        .maybeSingle();
      if (error) throw error;

      const metaNameRaw = authUser.user_metadata?.display_name;
      const metaName =
        typeof metaNameRaw === "string" ? metaNameRaw.trim() : "";
      const dbName = (profile?.display_name ?? "").trim();

      return {
        displayName: dbName || metaName,
        email: authUser.email ?? "",
      };
    },
  });
}

export function useUpdateProfileDisplayName() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (displayName: string) => {
      const { data: userResult, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      const authUser = userResult.user;
      if (!authUser) throw new Error("認証情報を取得できませんでした");

      const trimmed = displayName.trim();
      const { error } = await supabase
        .from("profiles")
        .update({ display_name: trimmed === "" ? null : trimmed })
        .eq("id", authUser.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
    },
  });
}
