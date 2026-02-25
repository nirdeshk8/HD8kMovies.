export async function fetchFromOmdb(imdbId: string) {
  const key = import.meta.env.VITE_OMDB_API_KEY;
  if (!key) throw new Error("OMDb API key not set (VITE_OMDB_API_KEY)");

  const id = (imdbId.match(/tt\d+/) || [imdbId])[0];
  const url = `https://www.omdbapi.com/?i=${encodeURIComponent(id)}&apikey=${key}&plot=full`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch from OMDb");
  const data = await res.json();
  if (data.Response === "False") throw new Error(data.Error || "OMDb lookup failed");

  return {
    title: data.Title || "",
    description: data.Plot || "",
    release_year: data.Year ? parseInt(data.Year, 10) : null,
    genre: data.Genre || "",
    poster_url: data.Poster && data.Poster !== "N/A" ? data.Poster : "",
    rating: data.imdbRating && data.imdbRating !== "N/A" ? data.imdbRating : "",
    duration: data.Runtime || "",
    stars: data.Actors || "",
    director: data.Director || "",
  };
}
