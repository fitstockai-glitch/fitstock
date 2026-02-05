import { Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const mockDownloads = [
  {
    id: "1",
    title: "Mountain Sunrise",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200",
    downloadedAt: "2024年1月15日 14:30",
  },
  {
    id: "2",
    title: "Urban Architecture",
    imageUrl: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=200",
    downloadedAt: "2024年1月14日 10:15",
  },
  {
    id: "3",
    title: "Ocean Waves",
    imageUrl: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=200",
    downloadedAt: "2024年1月13日 18:45",
  },
];

const DownloadHistorySection = () => {
  const handleRedownload = (imageUrl: string) => {
    window.open(imageUrl.replace("w=200", "w=1920"), "_blank");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">ダウンロード履歴</CardTitle>
      </CardHeader>
      <CardContent>
        {mockDownloads.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            まだダウンロードした写真がありません。
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {mockDownloads.map((item) => (
              <div key={item.id} className="group relative">
                <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-2 space-y-1">
                  <p className="text-sm font-medium text-foreground truncate">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.downloadedAt}
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full mt-2"
                    onClick={() => handleRedownload(item.imageUrl)}
                  >
                    <Download size={14} className="mr-1" />
                    再ダウンロード
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DownloadHistorySection;
