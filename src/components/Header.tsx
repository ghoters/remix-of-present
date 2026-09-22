import { Link, useRouter } from "@tanstack/react-router";
import { ArrowRight, Menu, Search, ShoppingCart, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/logo.png.asset.json";

function Logo() {
  return (
    <Link to="/" className="flex shrink-0 items-center" aria-label="prezent3d.com — strona główna">
      <img src={logoAsset.url} alt="prezent3d.com" className="h-9 w-auto" />
    </Link>
  );
}

export function Header() {
  const router = useRouter();
  const pathname = router.state.location.pathname;

  const navLinkBase = "py-6 transition-colors";
  const activeClass = "border-b-2 border-primary text-primary";
  const inactiveClass = "text-foreground transition-colors duration-200 hover:text-primary-dark focus-visible:text-primary-dark focus-visible:outline-none";

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-card">
      <div className="section-shell grid h-[68px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-5">
        <Logo />
        <nav
          className="hidden items-center justify-center gap-6 text-[12px] font-semibold lg:flex"
          aria-label="Główna nawigacja"
        >
          <Link
            to="/"
            className={`${navLinkBase} ${isActive("/") ? activeClass : inactiveClass}`}
          >
            Strona główna
          </Link>
          <Link
            to="/oferta"
            className={`${navLinkBase} ${isActive("/oferta") ? activeClass : inactiveClass}`}
          >
            Oferta⌄
          </Link>
          <Link to="/" hash="realizacje" className={`${navLinkBase} ${inactiveClass}`}>
            Galeria
          </Link>
          <Link to="/" hash="proces" className={`${navLinkBase} ${inactiveClass}`}>
            Jak to działa?
          </Link>
          <Link to="/oferta" hash="podsumowanie" className={`${navLinkBase} ${inactiveClass}`}>
            Cennik
          </Link>
          <a href="#" className={`${navLinkBase} ${inactiveClass}`}>
            FAQ
          </a>
          <Link to="/" hash="kontakt" className={`${navLinkBase} ${inactiveClass}`}>
            Kontakt
          </Link>
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <Search className="size-4" aria-hidden="true" />
          <UserRound className="size-4" aria-hidden="true" />
          <ShoppingCart className="size-4" aria-hidden="true" />
          <Button variant="hero" size="default">
            Stwórz swoją figurkę <ArrowRight />
          </Button>
        </div>
        <Menu className="size-6 lg:hidden" aria-label="Otwórz menu" />
      </div>
    </header>
  );
}
