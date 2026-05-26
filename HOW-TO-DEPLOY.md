# How to Put SprachFlow on Your Phone (in about 5 minutes)

This folder is a complete, working web app. Here's how to get it live at a
web link you can tap from your iPhone home screen — no coding needed.

Your progress (star ratings, reps) now saves directly on YOUR device using your
browser's storage, so it works anywhere and survives between visits.

------------------------------------------------------------------

## THE EASIEST PATH: Netlify Drop (drag-and-drop, no account-juggling)

There is one catch worth understanding first: this app is written in modern
code that has to be "built" into plain website files before it can go live.
Netlify Drop won't do that build step for you, so you have two clean options:

### Option A — Let Netlify build it for you (recommended, ~5 min)

This uses a free GitHub account so Netlify can build the app automatically.
It also means future updates go live by themselves.

1. Make a free account at https://github.com
2. Make a free account at https://netlify.com (click "Sign up with GitHub")
3. In GitHub, click the "+" (top right) → "New repository."
   - Name it "sprachflow," leave it Public, click "Create repository."
4. On the new repo page, click "uploading an existing file."
5. Drag EVERY file and the `src` folder from this project into the upload box.
   (index.html, package.json, vite.config.js, .gitignore, and the src folder)
6. Click "Commit changes."
7. Go to Netlify → "Add new site" → "Import an existing project" → pick GitHub
   → choose your "sprachflow" repo.
8. Netlify will auto-detect Vite. Confirm these settings if asked:
   - Build command:  `npm run build`
   - Publish directory:  `dist`
9. Click "Deploy." Wait ~1 minute. You'll get a link like
   `https://sprachflow-xyz.netlify.app`

That link is your app. Done.

### Option B — Build it on your own computer first, then drag the result

If you'd rather not use GitHub:

1. Install Node.js (free): https://nodejs.org  (get the "LTS" version)
2. Open Terminal (Mac) or Command Prompt (Windows).
3. Navigate into this folder. On Mac, type `cd ` then drag the folder onto
   the window and press Enter.
4. Type:  `npm install`   (press Enter, wait)
5. Type:  `npm run build` (press Enter, wait)
6. A new `dist` folder appears inside this project.
7. Go to https://app.netlify.com/drop and drag ONLY the `dist` folder onto it.
8. You get your live link instantly.

------------------------------------------------------------------

## PUT IT ON YOUR HOME SCREEN (so it opens like a real app)

Once you have your link:

1. Open the link in Safari on your iPhone.
2. Tap the Share button (the square with the arrow).
3. Tap "Add to Home Screen."
4. Name it "SprachFlow," tap Add.

Now there's an icon on your home screen. Tapping it opens the app full-screen,
no browser bars, just like a native app. Your progress saves on the phone.

------------------------------------------------------------------

## HOW TO UPDATE IT LATER (adding new word packs)

When we build new packs (like the next batch of the 625), you'll get an updated
`SprachFlow.jsx` file. To update your live app:

- If you used **Option A (GitHub):** Go to your repo → open `src/SprachFlow.jsx`
  → click the pencil (Edit) → paste the new version → "Commit changes."
  Netlify rebuilds and your app updates automatically in about a minute.

- If you used **Option B (manual):** Replace `src/SprachFlow.jsx` with the new
  file, run `npm run build` again, and re-drag the new `dist` folder to
  Netlify Drop.

GitHub (Option A) is genuinely worth the small setup because updates become
trivial and you never lose a version.

------------------------------------------------------------------

## TO RUN IT ON YOUR OWN COMPUTER FIRST (optional, to preview)

1. Install Node.js (see above).
2. In Terminal, navigate into this folder.
3. Type:  `npm install`   then   `npm run dev`
4. Open the link it shows you (usually http://localhost:5173).

------------------------------------------------------------------

## A NOTE ON AUDIO

The app's pronunciation audio uses your device's built-in text-to-speech.
On iPhone it works automatically in Safari. The first tap may be silent while
the voice loads — tap again and it speaks. For the best German voice, you can
add one in iPhone Settings → Accessibility → Spoken Content → Voices → German.

------------------------------------------------------------------

## WHAT'S IN THIS FOLDER

- `index.html` ............ the page shell (sets up the app, mobile-friendly)
- `package.json` .......... lists what the app needs to build
- `vite.config.js` ........ build settings
- `.gitignore` ............ tells GitHub which files to skip
- `src/main.jsx` .......... the entry point that loads the app
- `src/SprachFlow.jsx` .... the actual app — all your packs and logic live here

That's it. Viel Erfolg!
