import { Link } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

const topLinks = [
  { label: "Disclaimer", path: "/about" },
  { label: "How To Download ?", path: "/" },
  { label: "Join Our Group !", path: "/" },
  { label: "Movie Request Page", path: "/" },
];

const categories = [
  { label: "4KHDHub", path: "/" },
  { label: "HD8Kmovies Home🏠", path: "/" },
  { label: "BollyWood", path: "/" },
  { label: "HollyWood", path: "/" },
  { label: "Hindi Dubbed", path: "/" },
  { label: "South Hindi", path: "/" },
  { label: "Web Series", path: "/" },
  { label: "18+", path: "/" },
  { label: "GENREs ▾", path: "/" },
  { label: "More ▾", path: "/" },
];

const Header = ({ searchQuery = "", onSearchChange }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fetch movies for poster carousel strip
  const { data: carouselMovies } = useQuery({
    queryKey: ["carousel-movies"],
    queryFn: async () => {
      const { data } = await supabase
        .from("movies")
        .select("id, title, poster_url")
        .not("poster_url", "is", null)
        .order("created_at", { ascending: false })
        .limit(20);
      return data || [];
    },
  });

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar: logo + links */}
      <div className="bg-card border-b border-border">
        <div className="container flex h-14 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <img src="/hd8k-logo.svg" alt="HD8Kmovies" className="h-10 w-auto" />
            <span className="hidden sm:inline font-display text-2xl tracking-wider text-gradient-gold">HD8Kmovies</span>
          </Link>

          {/* Top links - desktop */}
          <nav className="hidden md:flex items-center gap-6">
            {topLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-foreground">
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Poster Carousel Strip */}
      {carouselMovies && carouselMovies.length > 0 && (
        <div className="bg-background overflow-hidden">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide">
            {carouselMovies.map((movie) => (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="flex-shrink-0 w-[100px] h-[140px] relative group"
              >
                <img
                  src={movie.poster_url!}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Category Navigation Bar */}
      <nav className="bg-secondary overflow-x-auto scrollbar-hide border-b border-border">
        <div className="container flex items-center gap-0">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              to={cat.path}
              className="whitespace-nowrap px-3 py-2.5 text-xs font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-colors border-r border-border/30 last:border-r-0"
            >
              {cat.label}
            </Link>
          ))}

          {/* Search - desktop */}
          <div className="hidden md:flex ml-auto pl-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search here..."
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="w-48 rounded border border-border bg-card px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
              <Search className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            </div>
          </div>

          <Link
            to="/admin"
            className="hidden md:block whitespace-nowrap px-3 py-2.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors ml-2"
          >
            Admin
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card p-4 animate-fade-in">
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Search here..."
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="w-full rounded border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
              autoFocus
            />
          </div>
          <nav className="flex flex-col gap-1">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                to={cat.path}
                className="px-3 py-2 text-sm text-foreground hover:bg-primary hover:text-primary-foreground rounded transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {cat.label}
              </Link>
            ))}
            {topLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/admin" className="px-3 py-2 text-sm text-muted-foreground hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
              Admin
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
