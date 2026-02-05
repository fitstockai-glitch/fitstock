import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-secondary text-foreground pt-12 pb-4 px-4 md:px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
          {/* Brand - Left side */}
          <div>
            <Link to="/" className="block mb-4">
              <span className="text-2xl font-bold text-primary">
                Fit<span className="text-foreground">Stock</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md mb-6">
              高品質なストック写真を提供するプラットフォーム。
              商用利用可能な写真を簡単に見つけてダウンロード。
            </p>
            
            {/* Contact Information */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground mb-1">お問い合わせ</p>
                <p>support@fitstock.com</p>
              </div>
            </div>
          </div>

          {/* Link lists - Right side */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Browse */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-4">写真を探す</h4>
              <ul className="space-y-2">
                <li><Link to="/category/nature" className="text-sm text-muted-foreground hover:text-primary transition-colors">自然</Link></li>
                <li><Link to="/category/architecture" className="text-sm text-muted-foreground hover:text-primary transition-colors">建築</Link></li>
                <li><Link to="/category/urban" className="text-sm text-muted-foreground hover:text-primary transition-colors">都市</Link></li>
                <li><Link to="/category/lifestyle" className="text-sm text-muted-foreground hover:text-primary transition-colors">ライフスタイル</Link></li>
                <li><Link to="/category/abstract" className="text-sm text-muted-foreground hover:text-primary transition-colors">抽象</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-4">サポート</h4>
              <ul className="space-y-2">
                <li><Link to="/about/our-story" className="text-sm text-muted-foreground hover:text-primary transition-colors">FitStockについて</Link></li>
                <li><Link to="/about/customer-care" className="text-sm text-muted-foreground hover:text-primary transition-colors">ヘルプセンター</Link></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">ライセンス</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">よくある質問</a></li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-4">フォロー</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Twitter</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Instagram</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Facebook</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="max-w-7xl mx-auto border-t border-border pt-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-sm text-muted-foreground">
            © 2024 FitStock. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              プライバシーポリシー
            </Link>
            <Link to="/terms-of-service" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              利用規約
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
