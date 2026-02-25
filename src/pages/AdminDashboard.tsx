import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Film, Plus, Trash2, LogOut, Loader2, X } from "lucide-react";

interface MovieForm {
  title: string;
  description: string;
  release_year: string;
  genre: string;
  quality: string;
  language: string;
  poster_url: string;
  rating: string;
  duration: string;
  stars: string;
  director: string;
  screenshots: string;
}

const emptyForm: MovieForm = {
  title: "",
  description: "",
  release_year: "",
  genre: "",
  quality: "720p",
  language: "Hindi",
  poster_url: "",
  rating: "",
  duration: "",
  stars: "",
  director: "",
  screenshots: "",
};

interface LinkForm {
  label: string;
  url: string;
}

const AdminDashboard = () => {
  const [form, setForm] = useState<MovieForm>(emptyForm);
  const [imdbInput, setImdbInput] = useState("");
  const [importing, setImporting] = useState(false);
  const [links, setLinks] = useState<LinkForm[]>([{ label: "720p", url: "" }]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/admin"); return; }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin");
      if (!roles || roles.length === 0) navigate("/admin");
    };
    checkAuth();
  }, [navigate]);

  const { data: movies, isLoading } = useQuery({
    queryKey: ["admin-movies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("movies")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const addMovie = useMutation({
    mutationFn: async () => {
      const screenshotUrls = form.screenshots
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);

      const movieData: any = {
        title: form.title.trim(),
        description: form.description.trim() || null,
        release_year: form.release_year ? parseInt(form.release_year) : null,
        genre: form.genre.trim() || null,
        quality: form.quality.trim() || null,
        language: form.language.trim() || null,
        poster_url: form.poster_url.trim() || null,
        rating: form.rating ? parseFloat(form.rating) : null,
        duration: form.duration.trim() || null,
        stars: form.stars.trim() || null,
        director: form.director.trim() || null,
        screenshots: screenshotUrls.length > 0 ? screenshotUrls : null,
      };

      const { data: movie, error } = await supabase
        .from("movies")
        .insert(movieData)
        .select()
        .single();
      if (error) throw error;

      const validLinks = links.filter((l) => l.url.trim());
      if (validLinks.length > 0) {
        const { error: linkError } = await supabase
          .from("download_links")
          .insert(validLinks.map((l) => ({ movie_id: movie.id, label: l.label, url: l.url })));
        if (linkError) throw linkError;
      }

      return movie;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-movies"] });
      setForm(emptyForm);
      setLinks([{ label: "720p", url: "" }]);
      setShowForm(false);
      toast({ title: "Movie added successfully!" });
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const deleteMovie = useMutation({
    mutationFn: async (movieId: string) => {
      const { error } = await supabase.from("movies").delete().eq("id", movieId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-movies"] });
      toast({ title: "Movie deleted" });
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 px-4 py-3">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Film className="h-6 w-6 text-primary" />
            <span className="font-display text-xl text-gradient-gold">Admin Panel</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-foreground">
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-6">
          <h2 className="font-display text-lg text-foreground mb-2">Import from IMDb</h2>
          <div className="flex gap-2">
            <Input placeholder="Paste IMDb URL or ID (e.g. https://www.imdb.com/title/tt0111161/)" value={imdbInput} onChange={(e) => setImdbInput(e.target.value)} className="bg-secondary border-border" />
            <Button onClick={async () => {
              if (!imdbInput.trim()) return;
              setImporting(true);
              try {
                const { fetchFromOmdb } = await import("@/lib/omdb");
                const extracted = (imdbInput.match(/tt\d+/) || [imdbInput])[0];
                const data = await fetchFromOmdb(extracted);
                setForm({
                  ...form,
                  title: data.title,
                  description: data.description,
                  release_year: data.release_year ? String(data.release_year) : "",
                  genre: data.genre || "",
                  poster_url: data.poster_url || "",
                  rating: data.rating ? String(data.rating) : "",
                  duration: data.duration || "",
                  stars: data.stars || "",
                  director: data.director || "",
                });
                toast({ title: "Imported from OMDb", description: "Review fields and save movie." });
              } catch (err: any) {
                toast({ title: "Import failed", description: err.message || "Could not fetch metadata", variant: "destructive" });
              } finally {
                setImporting(false);
              }
            }} disabled={importing} className="bg-primary text-primary-foreground">
              {importing ? "Importing…" : "Import"}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">You need to set <strong>VITE_OMDB_API_KEY</strong> in your environment for automatic metadata import.</p>
        </div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-3xl text-foreground">Movies</h1>
          <Button onClick={() => setShowForm(!showForm)} className="bg-gradient-gold text-primary-foreground hover:opacity-90">
            <Plus className="h-4 w-4 mr-2" /> Add Movie
          </Button>
        </div>

        {showForm && (
          <div className="mb-8 rounded-lg border border-border bg-card p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl text-foreground">New Movie</h2>
              <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label className="text-foreground">Title *</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1 bg-secondary border-border" />
              </div>
              <div>
                <Label className="text-foreground">Poster URL</Label>
                <Input value={form.poster_url} onChange={(e) => setForm({ ...form, poster_url: e.target.value })} className="mt-1 bg-secondary border-border" placeholder="https://..." />
              </div>
              <div>
                <Label className="text-foreground">Release Year</Label>
                <Input type="number" value={form.release_year} onChange={(e) => setForm({ ...form, release_year: e.target.value })} className="mt-1 bg-secondary border-border" />
              </div>
              <div>
                <Label className="text-foreground">Genre</Label>
                <Input value={form.genre} onChange={(e) => setForm({ ...form, genre: e.target.value })} className="mt-1 bg-secondary border-border" placeholder="Action, Drama" />
              </div>
              <div>
                <Label className="text-foreground">Quality</Label>
                <Input value={form.quality} onChange={(e) => setForm({ ...form, quality: e.target.value })} className="mt-1 bg-secondary border-border" />
              </div>
              <div>
                <Label className="text-foreground">Language</Label>
                <Input value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })} className="mt-1 bg-secondary border-border" />
              </div>
              <div>
                <Label className="text-foreground">Rating (0-10)</Label>
                <Input type="number" step="0.1" min="0" max="10" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} className="mt-1 bg-secondary border-border" />
              </div>
              <div>
                <Label className="text-foreground">Duration</Label>
                <Input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="mt-1 bg-secondary border-border" placeholder="2h 15m" />
              </div>
              <div>
                <Label className="text-foreground">Director</Label>
                <Input value={form.director} onChange={(e) => setForm({ ...form, director: e.target.value })} className="mt-1 bg-secondary border-border" />
              </div>
              <div>
                <Label className="text-foreground">Stars</Label>
                <Input value={form.stars} onChange={(e) => setForm({ ...form, stars: e.target.value })} className="mt-1 bg-secondary border-border" placeholder="Actor 1, Actor 2" />
              </div>
              <div className="md:col-span-2">
                <Label className="text-foreground">Description</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1 bg-secondary border-border" rows={3} />
              </div>
              <div className="md:col-span-2">
                <Label className="text-foreground">Screenshot URLs (one per line)</Label>
                <Textarea value={form.screenshots} onChange={(e) => setForm({ ...form, screenshots: e.target.value })} className="mt-1 bg-secondary border-border" rows={3} placeholder="https://screenshot1.jpg&#10;https://screenshot2.jpg" />
              </div>
            </div>

            {/* Download Links */}
            <div className="mt-6">
              <Label className="text-foreground">Download Links</Label>
              <div className="space-y-2 mt-2">
                {links.map((link, i) => (
                  <div key={i} className="flex gap-2">
                    <Input value={link.label} onChange={(e) => { const u = [...links]; u[i].label = e.target.value; setLinks(u); }} placeholder="Label (e.g. 720p)" className="w-32 bg-secondary border-border" />
                    <Input value={link.url} onChange={(e) => { const u = [...links]; u[i].url = e.target.value; setLinks(u); }} placeholder="Download URL" className="flex-1 bg-secondary border-border" />
                    {links.length > 1 && (
                      <Button variant="ghost" size="icon" onClick={() => setLinks(links.filter((_, idx) => idx !== i))} className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" onClick={() => setLinks([...links, { label: "", url: "" }])} className="mt-2 text-primary">
                <Plus className="h-3 w-3 mr-1" /> Add Link
              </Button>
            </div>

            <Button onClick={() => addMovie.mutate()} disabled={!form.title.trim() || addMovie.isPending} className="mt-6 bg-gradient-gold text-primary-foreground hover:opacity-90">
              {addMovie.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Save Movie
            </Button>
          </div>
        )}

        {/* Movies List */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : movies && movies.length > 0 ? (
          <div className="space-y-3">
            {movies.map((movie) => (
              <div key={movie.id} className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/30">
                <div className="h-16 w-12 rounded overflow-hidden bg-muted flex-shrink-0">
                  {movie.poster_url ? (
                    <img src={movie.poster_url} alt={movie.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground">N/A</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{movie.title}</h3>
                  <p className="text-xs text-muted-foreground">{movie.release_year} • {movie.quality} • {movie.language}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => { if (confirm("Delete this movie?")) deleteMovie.mutate(movie.id); }} className="text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-12">No movies yet. Add your first movie!</p>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
