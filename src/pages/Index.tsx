import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import MovieCard from "@/components/MovieCard";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";

const MOVIES_PER_PAGE = 30;

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["movies", searchQuery, currentPage],
    queryFn: async () => {
      const from = (currentPage - 1) * MOVIES_PER_PAGE;
      const to = from + MOVIES_PER_PAGE - 1;

      let query = supabase
        .from("movies")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to);

      if (searchQuery.trim()) {
        query = query.ilike("title", `%${searchQuery.trim()}%`);
      }

      const { data, error, count } = await query;
      if (error) throw error;
      return { movies: data, total: count || 0 };
    },
  });

  const movies = data?.movies || [];
  const totalPages = Math.ceil((data?.total || 0) / MOVIES_PER_PAGE);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header searchQuery={searchQuery} onSearchChange={(q) => { setSearchQuery(q); setCurrentPage(1); }} />

      {/* Notice Banner */}
      <div className="bg-card border-b border-border">
        <div className="container py-2.5 text-center">
          <p className="text-xs flex items-center justify-center gap-2">
            <span className="text-destructive font-bold">✕</span>
            <span className="text-destructive">Avoid FAKE Copies of</span>
            <img src="/hd8k-logo.svg" alt="HD8Kmovies" className="h-4 w-auto inline" />
            <span className="text-muted-foreground">Always use </span>
            <span className="text-primary font-bold">HD8Kmovies.Tv</span>
            <span className="text-muted-foreground"> With VPN to get Official Domain & Follow us on </span>
            <span className="text-primary font-bold">Discord</span>
            <span className="text-muted-foreground"> ⓘ </span>
            <span className="text-destructive">For Latest Updates.</span>
          </p>
        </div>
      </div>

      <main className="flex-1 container py-6">
        {/* Section Title */}
        <div className="bg-card rounded px-4 py-2.5 mb-6 flex items-center gap-2">
          <span className="text-primary">⚡</span>
          <h2 className="font-display text-xl text-foreground tracking-wide">Latest Releases</h2>
        </div>

        {/* Movie Grid - 5 columns like HD8Kmovies */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : movies.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  poster_url={movie.poster_url}
                  release_year={movie.release_year}
                  quality={movie.quality}
                  rating={movie.rating ? Number(movie.rating) : null}
                  language={movie.language}
                />
              ))}
            </div>

            {/* Pagination - matching HD8Kmovies style */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1.5 mt-8">
                {getPageNumbers().map((page, idx) =>
                  page === "..." ? (
                    <span key={`ellipsis-${idx}`} className="px-2 py-1.5 text-sm text-muted-foreground">…</span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page as number)}
                      className={`min-w-[36px] px-3 py-1.5 rounded text-sm transition-colors ${
                        currentPage === page
                          ? "bg-primary text-primary-foreground font-bold"
                          : "bg-secondary text-secondary-foreground hover:bg-primary/80 hover:text-primary-foreground"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
                {currentPage < totalPages && (
                  <button
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="px-4 py-1.5 rounded bg-secondary text-secondary-foreground text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    Next
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-muted-foreground text-lg">No movies found</p>
            <p className="text-muted-foreground text-sm mt-1">
              {searchQuery ? "Try a different search term" : "Movies will appear here once added by admin"}
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
