import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import FitStockHeader from "@/components/header/FitStockHeader";
import Footer from "@/components/footer/Footer";
import signupHero from "@/assets/signup-hero.jpg";

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
        {/* Left: Hero Image */}
        <div className="w-full md:w-1/2 h-[300px] md:h-auto">
          <img
            src={signupHero}
            alt="Sign up hero"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Sign up form */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-16">
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
