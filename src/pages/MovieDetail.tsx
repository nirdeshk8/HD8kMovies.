import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Download, Loader2, Calendar } from "lucide-react";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: movie, isLoading } = useQuery({
    queryKey: ["movie", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("movies")
        .select("*")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: links } = useQuery({
    queryKey: ["download_links", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("download_links")
        .select("*")
        .eq("movie_id", id!)
        .order("created_at");
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Movie not found</p>
        </div>
      </div>
    );
  }

  const movieName = movie.title?.split("(")[0]?.trim();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Notice Banner */}
      <div className="bg-card border-b border-border">
        <div className="container py-2.5 text-center">
          <p className="text-xs">
            <span className="text-destructive font-bold">✕</span>{" "}
            <span className="text-destructive">Avoid FAKE Copies of HD8Kmovies on Google,</span>{" "}
            <span className="text-muted-foreground">Always use </span>
            <img src="/hd8k-logo.svg" alt="HD8Kmovies" className="h-4 w-auto inline" />
            <span className="text-primary font-bold">HD8Kmovies.Tv</span>
            <span className="text-muted-foreground"> With VPN to get Official Domain & Follow us on </span>
            <span className="text-primary font-bold">Discord</span>
            <span className="text-muted-foreground"> ⓘ </span>
            <span className="text-destructive">For Latest Updates.</span>
          </p>
        </div>
      </div>

      <main className="flex-1 container py-6 max-w-4xl mx-auto">
        {/* Go to HomePage */}
        <div className="text-center mb-4">
          <Link to="/" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
            Go to HomePage 🏠
          </Link>
        </div>

        {/* Title Bar */}
        <div className="bg-card rounded px-4 py-3 mb-4">
          <h1 className="text-sm md:text-base text-foreground flex items-center gap-2">
            🎬 {movie.title}
          </h1>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Share:</span>
            <a href={"https://twitter.com/intent/tweet?text=" + encodeURIComponent(movie.title + " " + window.location.href)} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">Twitter</a>
            <a href={"https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(window.location.href)} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">Facebook</a>
            <a href={"https://api.whatsapp.com/send?text=" + encodeURIComponent(movie.title + " " + window.location.href)} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">WhatsApp</a>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {movie.release_year && (
            <span className="rounded bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" /> {`${movie.release_year}`}
            </span>
          )}
          {movie.genre && movie.genre.split(",").map((g) => (
            <span key={g.trim()} className="rounded bg-secondary border border-border px-2.5 py-1 text-xs text-muted-foreground flex items-center gap-1">
              📁 {g.trim()}
            </span>
          ))}
          {movie.language && (
            <span className="rounded bg-secondary border border-border px-2.5 py-1 text-xs text-muted-foreground flex items-center gap-1">
              📁 {movie.language}
            </span>
          )}
          {movie.quality && (
            <span className="rounded bg-secondary border border-border px-2.5 py-1 text-xs text-muted-foreground flex items-center gap-1">
              📁 {movie.quality}
            </span>
          )}
        </div>

        {/* Description italic */}
        {movie.description && (
          <p className="text-sm text-primary italic text-center mb-6 leading-relaxed">
            Download {movie.title} | Full Movie,
            <br />
            Watch {movieName} Full Movie in Hindi Dubbed Online Free on <span className="text-primary font-bold">HD8Kmovies</span> !
          </p>
        )}

        {/* Poster Image */}
        <div className="flex justify-center mb-6">
          {movie.poster_url ? (
            <img
              src={movie.poster_url}
              alt={movie.title}
              className="max-w-xs md:max-w-sm rounded"
            />
          ) : (
            <div className="w-64 h-96 bg-muted rounded flex items-center justify-center text-muted-foreground font-display text-xl">
              No Poster
            </div>
          )}
        </div>

        {/* How To Download link */}
        <div className="text-center mb-6">
          <span className="text-sm text-muted-foreground">[</span>
          <a href="#" className="text-sm text-primary hover:underline font-semibold">How To Download ⬇</a>
          <span className="text-sm text-muted-foreground"> ]</span>
        </div>

        {/* Movie Info - centered like HD8Kmovies */}
        <div className="text-center mb-8 space-y-1">
          <h2 className="font-display text-xl text-foreground mb-3">
            {movieName} <span className="italic text-muted-foreground">(Hindi Dubbed)</span>
          </h2>
          {movie.rating && (
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">iMDB Rating:</span>{" "}
              <span className="text-primary">{Number(movie.rating)}/10</span>
            </p>
          )}
          {movie.genre && (
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Genre:</span> {movie.genre}
            </p>
          )}
          {movie.stars && (
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Stars:</span> {movie.stars}
            </p>
          )}
          {movie.director && (
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Director:</span> {movie.director}
            </p>
          )}
          {movie.language && (
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Language:</span>{" "}
              <span className="text-primary">{movie.language}</span>
            </p>
          )}
          {movie.quality && (
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Quality:</span>{" "}
              <span className="text-primary">{movie.quality}</span>
            </p>
          )}
        </div>

        {/* Screenshots */}
        {movie.screenshots && movie.screenshots.length > 0 && (
          <div className="mb-8">
            <h2 className="font-display text-xl text-primary text-center mb-4">: Screen-Shots :</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1 max-w-3xl mx-auto">
              {movie.screenshots.map((ss: string, i: number) => (
                <img key={i} src={ss} alt={`Screenshot ${i + 1}`} className="w-full" loading="lazy" />
              ))}
            </div>
          </div>
        )}

        <hr className="border-border my-6" />

        {/* Movie Title + Download Links */}
        <div className="text-center mb-4">
          <h2 className="text-base font-bold text-foreground mb-2">
            {movieName} ({movie.release_year}) Full Movie Dual-Audio [Hindi & English] HD
          </h2>
          <h3 className="font-display text-xl text-primary italic">: DOWNLOAD LINKS :</h3>
        </div>

        {/* Download Links - separated by hr like HD8Kmovies */}
        <div className="max-w-2xl mx-auto mb-8">
          {links && links.length > 0 ? (
            <div className="divide-y divide-border">
              {links.map((link) => (
                <div key={link.id} className="py-3 text-center">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-primary hover:underline"
                  >
                    {link.label}
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">No download links available yet.</p>
          )}
        </div>

        <hr className="border-border my-6" />

        {/* Storyline */}
        {movie.description && (
          <div className="max-w-2xl mx-auto mb-8">
            <h2 className="text-base font-bold text-foreground text-center mb-1">
              Download {movieName} ({movie.release_year}) Hindi Dubbed Full Movie –{" "}
              <span className="text-primary">Storyline</span> :
            </h2>
            <p className="text-sm text-muted-foreground italic text-center leading-relaxed mt-3">
              <span className="font-semibold text-foreground">{movieName} ({movie.release_year}) Hindi Dubbed :</span>{" "}
              {movie.description}
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MovieDetail;
