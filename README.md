# 🐹 Whack-a-Mole (React)

A fun, fully browser-based Whack-a-Mole game built with **React 18**. Clean component architecture, custom hooks, and CSS Modules — no external UI libraries required.

![Game Preview](https://img.shields.io/badge/status-playable-brightgreen) ![React](https://img.shields.io/badge/React-18-61DAFB?logo=react) ![License](https://img.shields.io/badge/license-MIT-blue)

## 🎮 How to Play

1. Select a difficulty level (Easy / Medium / Hard)
2. Click **Start Game**
3. Click the moles as they pop up from the holes before they hide
4. Avoid the 💣 bombs — hitting one costs you 5 points!
5. You have **30 seconds** — get the highest score you can

## ✨ Features

- 3 difficulty levels (Easy, Medium, Hard)
- Bomb mechanic with shake animation
- Floating score pop-ups on every hit
- Animated timer bar that changes colour as time runs out
- Session best-score tracking
- Fully responsive and touch-enabled
- Dark purple space theme

## 📁 Project Structure

```
whack-a-mole-react/
├── public/
│   └── index.html               # HTML shell
├── src/
│   ├── components/
│   │   ├── Grid.jsx             # 3×3 hole grid
│   │   ├── Grid.module.css
│   │   ├── Hole.jsx             # Single hole + mole
│   │   ├── Hole.module.css
│   │   ├── HUD.jsx              # Score / best / time / missed
│   │   ├── HUD.module.css
│   │   ├── ResultOverlay.jsx    # End-of-game modal
│   │   ├── ResultOverlay.module.css
│   │   ├── ScorePops.jsx        # Floating +10 / -5 labels
│   │   ├── TimerBar.jsx         # Shrinking progress bar
│   │   └── TimerBar.module.css
│   ├── hooks/
│   │   └── useGame.js           # All game logic as a custom hook
│   ├── constants.js             # Tunable game constants
│   ├── App.jsx                  # Root component
│   ├── App.module.css
│   ├── index.js                 # React entry point
│   └── index.css                # Global styles & CSS variables
└── package.json
```

## 🚀 Getting Started

### Run locally

```bash
git clone https://github.com/your-username/whack-a-mole-react.git
cd whack-a-mole-react
npm install
npm start
```

The app opens at `http://localhost:3000`.

### Build for production

```bash
npm run build
```

Output goes to the `build/` folder — ready to deploy anywhere.

### Deploy to GitHub Pages

```bash
npm install --save-dev gh-pages
```

Add to `package.json`:

```json
"homepage": "https://your-username.github.io/whack-a-mole-react",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

Then run:

```bash
npm run deploy
```

## 🎯 Scoring

| Action        | Points |
|---------------|--------|
| Hit a mole 🐹 | +10    |
| Hit a bomb 💣 | -5     |
| Miss a mole   | 0      |

## 🛠️ Customisation

All tunable values live in `src/constants.js`:

```js
export const GAME_DURATION = 30;    // Round length in seconds
export const BOMB_CHANCE   = 0.15;  // Probability of a bomb (0–1)
export const SCORE_HIT     = 10;    // Points per mole
export const SCORE_BOMB    = -5;    // Points for hitting a bomb

export const DIFF_SETTINGS = {
  easy:   { showTime: 1300, interval: 1500 },
  medium: { showTime: 850,  interval: 1000 },
  hard:   { showTime: 500,  interval: 650  },
};
```

## 📄 License

[MIT](LICENSE) — free to use, modify, and distribute.
