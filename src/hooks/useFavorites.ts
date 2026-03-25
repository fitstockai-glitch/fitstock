import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Photo } from "@/types/photo";
import { buildThumbnailPublicUrl } from "@/lib/supabaseStorage";

export function useFavoriteIds() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["favoriteIds", user?.id],
    enabled: !!user,
    staleTime: 2 * 60 * 1000,
    queryFn: async (): Promise<Set<string>> => {
      if (!user) return new Set();

      const { data, error } = await supabase
        .from("favorites")
        .select("photo_id")
        .eq("user_id", user.id);

      if (error) throw error;
      return new Set((data || []).map((f) => f.photo_id));
    },
    select: (data) => data,
  });
}

export function useFavoritePhotos() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["favoritePhotos", user?.id],
    enabled: !!user,
    staleTime: 2 * 60 * 1000,
    queryFn: async (): Promise<Photo[]> => {
      if (!user) return [];

      const { data, error } = await supabase
        .from("favorites")
        .select("photo_id, photos(*)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (!data) return [];

      return data
        .map((f) => {
          const p = f.photos as any;
          if (!p) return null;
          return {
            id: p.id,
            title: p.title,
            description: p.description,
            category_name: p.category_name,
            width: p.width || 1920,
            height: p.height || 1280,
            download_count: p.download_count,
            favorite_count: p.favorite_count,
            imageUrl: buildThumbnailPublicUrl(p.preview_path) ?? "",
            tags: [],
          } as Photo;
        })
        .filter(Boolean) as Photo[];
    },
  });
}

export function useToggleFavorite() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ photoId, isFavorited }: { photoId: string; isFavorited: boolean }) => {
      if (!user) throw new Error("Not authenticated");

      if (isFavorited) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("photo_id", photoId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("favorites")
          .insert({ user_id: user.id, photo_id: photoId });
        if (error) throw error;
      }
    },
    onMutate: async ({ photoId, isFavorited }) => {
      await queryClient.cancelQueries({ queryKey: ["favoriteIds", user?.id] });
      const previous = queryClient.getQueryData<Set<string>>(["favoriteIds", user?.id]);

      queryClient.setQueryData<Set<string>>(["favoriteIds", user?.id], (old) => {
        const next = new Set(old);
        if (isFavorited) {
          next.delete(photoId);
        } else {
          next.add(photoId);
        }
        return next;
      });

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["favoriteIds", user?.id], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favoriteIds", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["favoritePhotos", user?.id] });
    },
  });
}
