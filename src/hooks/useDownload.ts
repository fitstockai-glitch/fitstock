import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { normalizeOriginalStoragePath } from "@/lib/supabaseStorage";

type DownloadModalMode = "guest" | "upsell_wait" | "limit_reached";

interface DownloadModalState {
  open: boolean;
  mode: DownloadModalMode;
  photoId?: string;
}

export function useDownload() {
  const { user } = useAuth();
  const [isDownloading, setIsDownloading] = useState(false);
  const [modalState, setModalState] = useState<DownloadModalState>({
    open: false,
    mode: "guest",
  });

  const closeModal = () => setModalState((current) => ({ ...current, open: false }));

  const executeDownload = async (photoId: string) => {
    if (!user) return;

    setIsDownloading(true);
    try {
      const { data: photo, error: photoError } = await supabase
        .from("photos")
        .select("id, storage_path, title")
        .eq("id", photoId)
        .maybeSingle();
      if (photoError) throw photoError;
      if (!photo?.storage_path) throw new Error("ダウンロード対象の画像が見つかりませんでした");

      const objectPath = normalizeOriginalStoragePath(photo.storage_path);
      const { data: fileBlob, error: downloadError } = await supabase.storage
        .from("originals")
        .download(objectPath);
      if (downloadError) throw downloadError;
      if (!fileBlob) throw new Error("ダウンロードデータの取得に失敗しました");

      const { error: insertError } = await supabase.from("downloads").insert({
        user_id: user.id,
        photo_id: photo.id,
      });
      if (insertError) throw insertError;

      // 同一ページ上で保存ダイアログを開く（新規タブは開かない）
      const objectUrl = URL.createObjectURL(fileBlob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = `${photo.title || "fitstock"}.jpg`;
      link.rel = "noopener";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);
    } finally {
      setIsDownloading(false);
    }
  };

  const requestDownload = async (photoId: string) => {
    try {
      if (!user) {
        setModalState({ open: true, mode: "guest", photoId });
        return;
      }

      const { data: membership, error: membershipError } = await supabase
        .from("memberships")
        .select("tier")
        .eq("user_id", user.id)
        .maybeSingle();
      if (membershipError) throw membershipError;

      if (membership?.tier === "plus") {
        await executeDownload(photoId);
        return;
      }

      const { data: todayCount, error: countError } = await supabase.rpc(
        "get_today_download_count",
        { target_user_id: user.id }
      );
      if (countError) throw countError;

      // todayCount = 本日すでに完了したDL件数。次の操作で (todayCount+1) 回目のDL。
      // 10回まで無料 → 11回目で上限モーダル（従来 next>=10 だと10回目がブロックされ実質9回になっていた）
      const nextDownloadIndex = Number(todayCount ?? 0) + 1;

      if (nextDownloadIndex > 10) {
        setModalState({ open: true, mode: "limit_reached", photoId });
        return;
      }

      if (nextDownloadIndex === 5) {
        setModalState({ open: true, mode: "upsell_wait", photoId });
        return;
      }

      await executeDownload(photoId);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "ダウンロード処理に失敗しました";
      toast.error(message);
    }
  };

  const downloadAfterWait = async () => {
    if (!modalState.photoId) return;
    try {
      await executeDownload(modalState.photoId);
      closeModal();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "ダウンロード処理に失敗しました";
      toast.error(message);
    }
  };

  return {
    requestDownload,
    modalState,
    closeModal,
    downloadAfterWait,
    isDownloading,
  };
}
