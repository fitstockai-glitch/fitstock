import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import FitStockHeader from "@/components/header/FitStockHeader";
import Footer from "@/components/footer/Footer";
import { supabase } from "@/integrations/supabase/client";
import { buildThumbnailPublicUrlFlexible } from "@/lib/supabaseStorage";
import { toast } from "sonner";

const Register = () => {
  const { data: thumbnailUrls } = useQuery({
    queryKey: ["register-cover-thumbnails"],
    staleTime: 10 * 60 * 1000,
    queryFn: async (): Promise<string[]> => {
      const { data, error } = await supabase
        .from("photos")
        .select("preview_path")
        .eq("is_published", true)
        .is("deleted_at", null)
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      return (data ?? [])
        .map((row) => buildThumbnailPublicUrlFlexible(row.preview_path))
        .filter((u): u is string => Boolean(u));
    },
  });

  const coverUrl = useMemo(() => {
    if (!thumbnailUrls?.length) return null;
    return thumbnailUrls[Math.floor(Math.random() * thumbnailUrls.length)];
  }, [thumbnailUrls]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: name },
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("アカウントが作成されました。確認メールをご確認ください。");
      navigate("/");
    }
    setIsLoading(false);
  };

  const formContent = (idSuffix: string = "") => (
    <>
      <h1 className="text-2xl font-bold text-foreground">アカウント作成</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor={`name${idSuffix}`} className="text-sm font-medium text-foreground">お名前</Label>
          <Input id={`name${idSuffix}`} type="text" value={name} onChange={(e) => setName(e.target.value)} required className="h-12" />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`email${idSuffix}`} className="text-sm font-medium text-foreground">メールアドレス</Label>
          <Input id={`email${idSuffix}`} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-12" />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`password${idSuffix}`} className="text-sm font-medium text-foreground">パスワード</Label>
          <Input id={`password${idSuffix}`} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="h-12" />
        </div>
        <Button type="submit" disabled={isLoading} className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 rounded-md text-base">
          {isLoading ? "登録中..." : "登録する"}
        </Button>
      </form>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          すでにアカウントをお持ちですか？{" "}
          <Link to="/login" className="font-semibold text-foreground underline underline-offset-4 hover:text-foreground/80">ログイン</Link>
        </p>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <FitStockHeader />
      <main className="flex min-h-0 flex-1 flex-col overflow-x-hidden md:flex-row md:items-stretch md:min-h-[calc(100svh-9rem)]">
        {/* Mobile: 高さはビューポート基準。背景画像はレイアウトに影響しない */}
        <div
          className={`relative flex flex-1 flex-col md:hidden min-h-[calc(100svh-9rem)] overflow-hidden ${coverUrl ? "" : "bg-muted"}`}
          style={
            coverUrl
              ? {
                  backgroundImage: `url(${coverUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : undefined
          }
        >
          <div className="flex flex-1 items-center justify-center px-4 py-10 min-h-0">
            <div className="w-full max-w-md bg-background rounded-xl p-6 space-y-6">
              {formContent("-mobile")}
            </div>
          </div>
        </div>

        {/* Desktop: 画像は絶対配置のため、固有サイズで列高が変わらない */}
        <div className="relative hidden w-1/2 shrink-0 overflow-hidden bg-muted md:block">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              decoding="async"
            />
          ) : null}
        </div>
        <div className="hidden w-1/2 min-w-0 shrink-0 flex-col items-center justify-center px-6 py-16 md:flex">
          <div className="w-full max-w-md space-y-6 rounded-xl bg-background p-8">
            {formContent()}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
