import { Button } from "@/components/ui/button";

const mockDownloads = [
  {
    id: "1",
    title: "写真名写真名写真名写真名",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
    downloadedAt: "2024年1月15日 14:30",
  },
  {
    id: "2",
    title: "写真名写真名写真名写真名",
    imageUrl: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600",
    downloadedAt: "2024年1月15日 14:30",
  },
  {
    id: "3",
    title: "写真名写真名写真名写真名",
    imageUrl: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600",
    downloadedAt: "2024年1月15日 14:30",
  },
  {
    id: "4",
    title: "写真名写真名写真名写真名",
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600",
    downloadedAt: "2024年1月15日 14:30",
  },
  {
    id: "5",
    title: "写真名写真名写真名写真名",
    imageUrl: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=600",
    downloadedAt: "2024年1月15日 14:30",
  },
  {
    id: "6",
    title: "写真名写真名写真名写真名",
    imageUrl: "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?w=600",
    downloadedAt: "2024年1月15日 14:30",
  },
  {
    id: "7",
    title: "写真名写真名写真名写真名",
    imageUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600",
    downloadedAt: "2024年1月15日 14:30",
  },
  {
    id: "8",
    title: "写真名写真名写真名写真名",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600",
    downloadedAt: "2024年1月15日 14:30",
  },
];

const DownloadHistorySection = () => {
  const handleRedownload = (imageUrl: string) => {
    window.open(imageUrl.replace("w=600", "w=1920"), "_blank");
  };

  return (
    <div>
      {mockDownloads.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          まだダウンロードした写真がありません。
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {mockDownloads.map((item) => (
            <div key={item.id}>
              <div className="aspect-[4/3] overflow-hidden bg-muted rounded-sm mb-2">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-muted-foreground mb-1">{item.downloadedAt}</p>
              <p className="text-sm font-medium text-foreground truncate mb-2">{item.title}</p>
              <Button
                variant="outline"
                className="w-full text-sm h-9 rounded-sm"
                onClick={() => handleRedownload(item.imageUrl)}
              >
                再ダウンロード
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DownloadHistorySection;
