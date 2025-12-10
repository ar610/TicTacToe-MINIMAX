# AI Tic-Tac-Toe

Welcome! This is a small, friendly demo project that showcases a Tic-Tac-Toe game built with React and Vite, including a simple AI player. It's perfect for learning about game logic, Minimax-style decision making, and how to structure a tiny React app for fun and education.

## What's in this repo

- `tic-tac-toe-01/` - The main demo built with React + Vite. Open-source, minimal, and easy to run.
	- `src/` contains the React app, including components like `Board.jsx`, game logic in `minmax.js`, and the app entry files.
	- `public/` static assets and the `index.html` used by Vite.
- Root-level `package.json` (if present) and other simple project metadata.

## Features

- Play Tic-Tac-Toe against a basic AI (Minimax-style move selection).
- Clean, minimal React UI using Vite for fast development.
- Small codebase intended for learning and experimentation.

## Try it (Windows / bash)

1. Open a bash terminal in the `tic-tac-toe-01` folder.
2. Install dependencies and start the dev server:

```bash
cd tic-tac-toe-01
npm install
npm run dev
```

3. Open the URL shown by Vite (usually `http://localhost:5173`) in your browser and play.

## Project structure (quick)

- `tic-tac-toe-01/src/components/Board.jsx` - The board UI and event handling.
- `tic-tac-toe-01/src/minmax.js` - The AI logic used to choose moves.
- `tic-tac-toe-01/index.html` - Vite entry HTML.
- `tic-tac-toe-01/package.json` - Scripts and dependencies for the demo.

If you want a deeper tour, open `tic-tac-toe-01/src/` and look for `App.jsx`, `main.jsx`, and the `components/` folder.

## Development notes

- The AI is intentionally simple and designed for clarity over performance.
- To experiment with the AI, edit `tic-tac-toe-01/src/minmax.js`.
- The app uses Vite for hot module replacement (HMR), so UI changes update instantly during development.



