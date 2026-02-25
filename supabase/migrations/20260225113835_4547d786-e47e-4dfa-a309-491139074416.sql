
-- Add missing movie fields: stars, director, screenshots
ALTER TABLE public.movies
ADD COLUMN IF NOT EXISTS stars text,
ADD COLUMN IF NOT EXISTS director text,
ADD COLUMN IF NOT EXISTS screenshots text[];
