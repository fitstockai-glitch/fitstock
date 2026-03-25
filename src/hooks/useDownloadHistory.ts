import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { format, parseISO } from "date-fns";
import { ja } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import {
  buildThumbnailPublicUrlFlexible,
  normalizeOriginalStoragePath,
} from "@/lib/supabaseStorage";

export type DownloadHistoryItem = {
  downloadId: string;
  photoId: string;
  downloadedAt: string;
  downloadedAtLabel: string;
  title: string;
  thumbnailUrl: string | null;
  storagePath: string | null;
  photoUnavailable: boolean;
};

type RedownloadModalMode = "upsell_wait" | "limit_reached";

type RedownloadModalState = {
  open: boolean;
  mode: RedownloadModalMode;
  /** upsell_wait のあと実行する対象 */
  pendingItem: DownloadHistoryItem | null;
};

type PhotoJoin = {
  id: string;
  title: string;
  preview_path: string | null;
  storage_path: string;
} | null;

/** PostgREST によって photos がオブジェクトまたは 1 件配列で返る場合がある */
function normalizePhotoJoin(
  raw: PhotoJoin | PhotoJoin[] | null | undefined
): PhotoJoin {
  if (raw == null) return null;
  if (Array.isArray(raw)) return raw[0] ?? null;
  return raw;
}

type DownloadRow = {
  id: string;
  photo_id: string;
  downloaded_at: string;
  photos: PhotoJoin;
};

function downloadFilename(title: string, storagePath: string): string {
  const ext = storagePath.match(/\.[a-zA-Z0-9]+$/)?.[0] ?? ".jpg";
  const base = title.replace(/[/\\?%*:|"<>]/g, "_").trim() || "fitstock";
  return `${base}${ext}`;
}

function formatDownloadedAt(iso: string): string {
  try {
    return format(parseISO(iso), "yyyy年M月d日 HH:mm", { locale: ja });
  } catch {
    return iso;
  }
}

const initialModal: RedownloadModalState = {
  open: false,
  mode: "limit_reached",
  pendingItem: null,
};

export function useDownloadHistory() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isRedownloading, setIsRedownloading] = useState(false);
  const [redownloadModal, setRedownloadModal] = useState<RedownloadModalState>(initialModal);

  const closeRedownloadModal = () => setRedownloadModal(initialModal);

  const query = useQuery({
    queryKey: ["download-history", user?.id],
    enabled: !!user,
    queryFn: async (): Promise<DownloadHistoryItem[]> => {
      const { data, error } = await supabase
        .from("downloads")
        .select(
          `
          id,
          photo_id,
          downloaded_at,
          photos (
            id,
            title,
            preview_path,
            storage_path
          )
        `
        )
        .eq("user_id", user!.id)
        .order("downloaded_at", { ascending: false });

      if (error) throw error;

      return ((data ?? []) as DownloadRow[]).map((row) => {
        const photo = normalizePhotoJoin(row.photos as PhotoJoin | PhotoJoin[] | null);
        const photoUnavailable = !photo;
        const thumbnailUrl = photo
          ? buildThumbnailPublicUrlFlexible(photo.preview_path)
          : null;
        return {
          downloadId: row.id,
          photoId: row.photo_id,
          downloadedAt: row.downloaded_at,
          downloadedAtLabel: formatDownloadedAt(row.downloaded_at),
          title: photo?.title ?? "（削除済みまたは非公開の写真）",
          thumbnailUrl,
          storagePath: photo?.storage_path ?? null,
          photoUnavailable,
        };
      });
    },
  });

  const performRedownload = async (item: DownloadHistoryItem) => {
    if (!user) return;
    if (!item.storagePath) throw new Error("オリジナルファイルの場所が不明です");

    const objectPath = normalizeOriginalStoragePath(item.storagePath);
    const { data: signed, error: signError } = await supabase.storage
      .from("originals")
      .createSignedUrl(objectPath, 300);
    if (signError) throw signError;
    if (!signed?.signedUrl) throw new Error("署名付きURLの取得に失敗しました");

    const res = await fetch(signed.signedUrl);
    if (!res.ok) throw new Error("ファイルのダウンロードに失敗しました");
    const blob = await res.blob();

    const { error: insertError } = await supabase.from("downloads").insert({
      user_id: user.id,
      photo_id: item.photoId,
    });
    if (insertError) throw insertError;

    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = downloadFilename(item.title, item.storagePath);
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(objectUrl);

    await queryClient.invalidateQueries({ queryKey: ["download-history", user.id] });
  };

  const requestRedownload = async (item: DownloadHistoryItem) => {
    if (!user) return;

    try {
      const { data: membership, error: membershipError } = await supabase
        .from("memberships")
        .select("tier")
        .eq("user_id", user.id)
        .maybeSingle();
      if (membershipError) throw membershipError;

      if (membership?.tier === "plus") {
        setIsRedownloading(true);
        try {
          await performRedownload(item);
        } finally {
          setIsRedownloading(false);
        }
        return;
      }

      const { data: todayCount, error: countError } = await supabase.rpc(
        "get_today_download_count",
        { target_user_id: user.id }
      );
      if (countError) throw countError;

      const nextDownloadIndex = Number(todayCount ?? 0) + 1;

      if (nextDownloadIndex > 10) {
        setRedownloadModal({
          open: true,
          mode: "limit_reached",
          pendingItem: null,
        });
        return;
      }

      if (nextDownloadIndex === 5) {
        setRedownloadModal({
          open: true,
          mode: "upsell_wait",
          pendingItem: item,
        });
        return;
      }

      setIsRedownloading(true);
      try {
        await performRedownload(item);
      } finally {
        setIsRedownloading(false);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "再ダウンロードに失敗しました";
      toast.error(message);
    }
  };

  const downloadAfterUpsellWait = async () => {
    const item = redownloadModal.pendingItem;
    if (!item) return;
    setIsRedownloading(true);
    try {
      await performRedownload(item);
      closeRedownloadModal();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "再ダウンロードに失敗しました";
      toast.error(message);
    } finally {
      setIsRedownloading(false);
    }
  };

  return {
    ...query,
    requestRedownload,
    redownloadModal,
    closeRedownloadModal,
    downloadAfterUpsellWait,
    isRedownloading,
  };
}
