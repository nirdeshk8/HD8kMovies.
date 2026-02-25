Render deployment instructions
=============================

This project can be deployed to Render as a Static Site. I added `render.yaml` to the repository which defines a `static_site` service that builds with `npm ci && npm run build` and publishes the `dist` folder.

Steps to deploy on Render (manual):

1. Sign in to https://render.com and create a new Static Site.
2. Connect your GitHub account and select the `nirdeshk8/HD8kMovies` repository.
3. Use branch `main`.
4. For Build Command enter:

   npm ci && npm run build

5. For Publish Directory enter:

   dist

6. Add the following Environment Variables in the Render dashboard (Settings → Environment):
   - `VITE_SUPABASE_PROJECT_ID` (your Supabase project id)
   - `VITE_SUPABASE_PUBLISHABLE_KEY` (your Supabase anon/public key)
   - `VITE_SUPABASE_URL` (your Supabase URL)
   - `VITE_OMDB_API_KEY` (OMDb key for IMDb import)
   - `VITE_GA_ID` (optional Google Analytics ID)

7. Create the site. Render will build and deploy automatically; the URL will be shown in the Render dashboard.

Notes and security:
- I removed the committed `.env` from the repo — do NOT re-commit secrets. Use Render dashboard environment settings to store API keys securely.
- If you want me to trigger the Render deployment automatically, provide a Render service token (not recommended to paste here). Alternatively, after following the above steps the site deploys on push.

If you want I can also:
- Prepare a one-click Render button or a small script to create the service using Render's API (requires a Render API key).
- Help set up preview deploys or a custom domain.
Render deployment instructions
=============================

This project can be deployed to Render as a static site. Follow these steps to enable automatic deploys from this repository.

1) Create a Render account and connect your GitHub account:
   - https://dashboard.render.com/

2) Import this repository:
   - New → Web Service / Static Site → Connect a repository → select `nirdeshk8/HD8kMovies`.
   - Render will detect `render.yaml` and create a `HD8Kmovies` static site using the `main` branch.

3) Environment variables (required)
   - In Render dashboard, open the service → Environment → Environment Variables.
   - Add the following variables (do NOT commit secrets to the repo):
     - `VITE_SUPABASE_PROJECT_ID` = (your supabase project id)
     - `VITE_SUPABASE_PUBLISHABLE_KEY` = (your supabase anon key)
     - `VITE_SUPABASE_URL` = (your supabase URL)
     - `VITE_OMDB_API_KEY` = (your OMDb API key)
     - `VITE_GA_ID` = (optional Google Analytics ID)

4) Deploy
   - After adding secrets, trigger a manual deploy from the Render dashboard or push to `main`.
   - Build command (from `render.yaml`): `npm ci && npm run build`
   - Publish directory: `dist`

5) Admin / Supabase
   - The admin UI (`/admin`) requires a Supabase user with `admin` role in the `user_roles` table. Create the user in Supabase Auth and add a `user_roles` entry for that user with `role = 'admin'`.

Notes
-----
- This `render.yaml` config uses the free static site plan.
- Keep secret keys in Render (not in the repo).
- If you prefer, I can set this up and monitor the first deploy — you'll need to grant me access to your Render/GitHub account.
