import { Link } from "react-router-dom";

interface MovieCardProps {
  id: string;
  title: string;
  poster_url: string | null;
  release_year: number | null;
  quality: string | null;
  rating: number | null;
  language: string | null;
}

const MovieCard = ({ id, title, poster_url }: MovieCardProps) => {
  return (
    <Link
      to={`/movie/${id}`}
      className="group block overflow-hidden"
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden rounded bg-muted mb-2">
        {poster_url ? (
          <img
            src={poster_url}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <span className="font-display text-lg">No Poster</span>
          </div>
        )}
      </div>

      {/* Title below poster - matching HD8Kmovies style */}
      <p className="text-xs text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-4">
        {title}
      </p>
    </Link>
  );
};

export default MovieCard;
