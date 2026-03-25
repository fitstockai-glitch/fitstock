import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DownloadModal from "@/components/photo/DownloadModal";
import { useDownloadHistory } from "@/hooks/useDownloadHistory";

const DownloadHistorySection = () => {
  const {
    data: items = [],
    isLoading,
    isError,
    requestRedownload,
    redownloadModal,
    closeRedownloadModal,
    downloadAfterUpsellWait,
    isRedownloading,
  } = useDownloadHistory();

  return (
    <div>
      <DownloadModal
        open={redownloadModal.open}
        onOpenChange={(open) => {
          if (!open) closeRedownloadModal();
        }}
        mode={redownloadModal.mode}
        onDownload={downloadAfterUpsellWait}
        isDownloading={isRedownloading}
      />
      {isLoading && (
        <p className="text-sm text-muted-foreground">読み込み中...</p>
      )}
      {isError && (
        <p className="text-sm text-destructive">
          ダウンロード履歴の取得に失敗しました。時間をおいて再度お試しください。
        </p>
      )}
      {!isLoading && !isError && items.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          まだダウンロードした写真がありません。
        </p>
      ) : !isLoading && !isError ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {items.map((item) => (
            <div key={item.downloadId}>
              {item.photoUnavailable ? (
                <div className="block aspect-[4/3] overflow-hidden bg-muted rounded-sm mb-2 flex items-center justify-center px-2">
                  <span className="text-xs text-center text-muted-foreground">
                    画像を表示できません
                  </span>
                </div>
              ) : (
                <Link
                  to={`/photo/${item.photoId}`}
                  className="block aspect-[4/3] overflow-hidden bg-muted rounded-sm mb-2 group"
                >
                  {item.thumbnailUrl ? (
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                      No image
                    </div>
                  )}
                </Link>
              )}
              <p className="text-xs text-muted-foreground mb-1">{item.downloadedAtLabel}</p>
              <p className="text-sm font-medium text-foreground truncate mb-2">{item.title}</p>
              <Button
                variant="outline"
                className="w-full text-sm h-9 rounded-sm"
                disabled={
                  item.photoUnavailable || !item.storagePath || isRedownloading
                }
                onClick={() => requestRedownload(item)}
              >
                再ダウンロード
              </Button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default DownloadHistorySection;
