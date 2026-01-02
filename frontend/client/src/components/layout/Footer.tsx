import { Link, useLocation } from "wouter";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const [location] = useLocation();

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Check if we are linking to a hash on the current page
    const [path, hash] = href.split('#');
    if (location === path && hash) {
      e.preventDefault();
      const element = document.getElementById(hash);
      if (element) {
        const offset = 100; // Height of sticky header + padding
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
        
        // Optionally update URL without reload
        window.history.pushState(null, "", href);
      }
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link 
              href="/"
              className="flex items-center gap-3 mb-6 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleLogoClick}
            >
              <Logo className="text-3xl md:text-4xl text-primary-foreground" />
            </Link>
            <p className="text-primary-foreground/80 leading-relaxed text-sm">
              Enterprise-grade cryptocurrency payment infrastructure for modern businesses.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Product</h4>
            <ul className="space-y-4 text-primary-foreground/80">
              <li><Link href="/features#gateway" className="hover:text-primary-foreground transition-colors cursor-pointer" onClick={(e) => handleLinkClick(e, "/features#gateway")}>Payment Gateway</Link></li>
              <li><Link href="/features#treasury" className="hover:text-primary-foreground transition-colors cursor-pointer" onClick={(e) => handleLinkClick(e, "/features#treasury")}>Treasury Management</Link></li>
              <li><Link href="/features#compliance" className="hover:text-primary-foreground transition-colors cursor-pointer" onClick={(e) => handleLinkClick(e, "/features#compliance")}>Compliance</Link></li>
              <li><Link href="/features#api" className="hover:text-primary-foreground transition-colors cursor-pointer" onClick={(e) => handleLinkClick(e, "/features#api")}>Developer API</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Developers</h4>
            <ul className="space-y-4 text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-colors cursor-pointer">Documentation</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors cursor-pointer">API Reference</a></li>
              <li><Link href="/status" className="hover:text-primary-foreground transition-colors cursor-pointer">Status</Link></li>
              <li><Link href="/partnerships" className="hover:text-primary-foreground transition-colors cursor-pointer">Partnerships</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Legal</h4>
            <ul className="space-y-4 text-primary-foreground/80">
              <li><Link href="/disclaimer" className="hover:text-primary-foreground transition-colors">Disclaimer</Link></li>
              <li><Link href="/privacy" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary-foreground transition-colors">Terms of Service</Link></li>
              <li><Link href="/kyc-aml" className="hover:text-primary-foreground transition-colors">KYC/AML Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mb-8 pt-8 border-t border-primary-foreground/10">
          <p className="font-bold text-xs mb-2 text-primary-foreground/80">Disclaimer</p>
          <p className="text-xs text-primary-foreground/60 leading-relaxed max-w-3xl">
            Bytus is a technology platform, not a bank or licensed financial institution. Fiat services are provided by regulated third-party partners. The platform is currently experimental and non-commercial. Nothing herein constitutes financial or investment advice.
          </p>
        </div>

        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Distributed Systems Labs, LLC. All rights reserved.</p>
          <p>Built for the digital economy.</p>
        </div>
      </div>
    </footer>
  );
}
