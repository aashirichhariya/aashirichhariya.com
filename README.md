# aashirichhariya.com

Portfolio for Aashi Richhariya — Principal Design System Lead, Toronto.

React 19 · TypeScript · Framer Motion · React Router 7

## Run

```bash
npm install
npm start          # http://localhost:3000
npm run build      # production bundle in build/
```

## Environment

The chat assistant calls the Gemini API. Copy `.env.example` to `.env.local` and add a key:

```
REACT_APP_GEMINI_API_KEY=your-key
```

**The key is inlined into the client bundle at build time and is readable by anyone who views source.**
Before this goes live, move the call behind a serverless function that holds the key server-side and
have the client POST to that instead. Treat any key used here as public.

## Structure

```
src/
  content.ts              all copy and project data — edit here, not in the pages
  styles/tokens.css       design tokens: colour, type scale, space, motion
  styles/pages.css        page and component styles
  components/motion/      Reveal, Stagger, LineReveal, Magnetic, Counter, CursorGlow
  components/layout/      Nav, Footer
  pages/                  Home, Work, Clients, Talk
```

Content lives in one file so copy never drifts between views. Animation primitives are shared so
timing and easing stay consistent — both honour `prefers-reduced-motion`.

## Known work

- Create React App is deprecated and has had no security updates since 2023. Migrating to Vite is
  roughly a half-hour mechanical change.
- The Gemini key needs the serverless proxy described above.
