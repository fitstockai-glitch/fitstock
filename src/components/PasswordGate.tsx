import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

const SITE_PASSWORD = "linea2025";
const STORAGE_KEY = "site-access-granted";

interface PasswordGateProps {
  children: React.ReactNode;
}

const PasswordGate = ({ children }: PasswordGateProps) => {
  const [granted, setGranted] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "true") {
      setGranted(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === SITE_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      setGranted(true);
    } else {
      setError(true);
    }
  };

  if (granted) return <>{children}</>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6 text-center">
        <div className="flex justify-center">
          <Lock className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-xl font-semibold text-foreground">
          このサイトはパスワードで保護されています
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="パスワードを入力"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            className="h-12 text-center"
            autoFocus
          />
          {error && (
            <p className="text-sm text-destructive">パスワードが正しくありません</p>
          )}
          <Button
            type="submit"
            className="w-full h-12 bg-foreground text-background hover:bg-foreground/90"
          >
            入る
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PasswordGate;
