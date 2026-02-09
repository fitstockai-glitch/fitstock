import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-background text-foreground pt-12 pb-6 px-4 md:px-8 border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Browse */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4">Browse</h4>
          <ul className="space-y-2">
            <li><Link to="/category/portrait" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Portrait</Link></li>
            <li><Link to="/category/landscape" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Landscape</Link></li>
            <li><Link to="/category/abstract" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Abstract</Link></li>
            <li><Link to="/category/business" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Business</Link></li>
          </ul>
        </div>




        {/* Social */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4">Follow us</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Twitter</a></li>
            <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Instagram</a></li>
            <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Facebook</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-border pt-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">/<span className="font-bold">FitStock</span></span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/privacy-policy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link to="/terms-of-service" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <a href="mailto:contact@fitstock.com" className="hover:text-foreground transition-colors">
              Contact
            </a>
            <span>© 2024 FitStock</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
