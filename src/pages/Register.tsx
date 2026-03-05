import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import FitStockHeader from "@/components/header/FitStockHeader";
import Footer from "@/components/footer/Footer";
import signupHero from "@/assets/signup-hero.jpg";

const heroImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80",
];
const randomHero = heroImages[Math.floor(Math.random() * heroImages.length)];

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register attempt", { name, email });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <FitStockHeader />
      <main className="flex-1 flex flex-col md:flex-row">
        {/* Mobile: background image with white card form */}
        <div
          className="relative flex-1 flex flex-col md:hidden min-h-[80vh]"
          style={{
            backgroundImage: `url(${randomHero})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex-1 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md bg-background rounded-xl p-6 space-y-6">
              <h1 className="text-2xl font-bold text-foreground">
                アカウント作成
              </h1>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name-mobile" className="text-sm font-medium text-foreground">お名前</Label>
                  <Input id="name-mobile" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-mobile" className="text-sm font-medium text-foreground">メールアドレス</Label>
                  <Input id="email-mobile" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-mobile" className="text-sm font-medium text-foreground">パスワード</Label>
                  <Input id="password-mobile" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="h-12" />
                </div>

                <Button type="submit" className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 rounded-md text-base">
                  登録する
                </Button>
              </form>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  すでにアカウントをお持ちですか？{" "}
                  <Link to="/login" className="font-semibold text-foreground underline underline-offset-4 hover:text-foreground/80">ログイン</Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: side-by-side layout */}
        <div className="hidden md:block w-1/2 h-auto">
          <img
            src={randomHero}
            alt="Sign up hero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="hidden md:flex w-1/2 items-center justify-center px-6 py-16">
          <div className="w-full max-w-md space-y-8">
            <h1 className="text-2xl font-bold text-foreground">
              アカウント作成
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">お名前</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">パスワード</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 rounded-md text-base"
              >
                登録する
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                すでにアカウントをお持ちですか？{" "}
                <Link
                  to="/login"
                  className="font-semibold text-foreground underline underline-offset-4 hover:text-foreground/80"
                >
                  ログイン
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
