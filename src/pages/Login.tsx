import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import FitStockHeader from "@/components/header/FitStockHeader";
import Footer from "@/components/footer/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: implement authentication
    console.log("Login attempt", { email });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <FitStockHeader />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md space-y-8">
          <h1 className="text-2xl font-bold text-center text-foreground">
            ログイン
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
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
              ログイン
            </Button>
          </form>

          <div className="text-center -mt-4">
            <Link
              to="/forgot-password"
              className="text-sm text-muted-foreground hover:text-foreground underline"
            >
              パスワードをお忘れですか？
            </Link>
          </div>

          <div className="border border-border p-6 text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              アカウントをお持ちではありませんか？
            </p>
            <Link
              to="/register"
              className="text-sm font-semibold text-foreground underline underline-offset-4 hover:text-foreground/80"
            >
              登録する
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
