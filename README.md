# 🐹 Whack-a-Mole

A fun, fully browser-based Whack-a-Mole game built with vanilla HTML, CSS, and JavaScript. No frameworks, no dependencies — just open `index.html` and play!

![Game Preview](https://img.shields.io/badge/status-playable-brightgreen) ![License](https://img.shields.io/badge/license-MIT-blue)

## 🎮 How to Play

1. Select a difficulty level (Easy / Medium / Hard)
2. Click **Start Game**
3. Click the moles as they pop up from the holes before they hide
4. Avoid the 💣 bombs — hitting one costs you 5 points!
5. You have **30 seconds** — get the highest score you can

## ✨ Features

- 3 difficulty levels (Easy, Medium, Hard)
- Bomb mechanic — 15% chance per spawn
- Score pop-up animations on every hit
- Animated timer bar that changes colour as time runs out
- Best score tracking for the session
- Fully responsive — works on desktop and mobile (touch-enabled)
- Dark purple space theme with star background

## 📁 Project Structure

```
whack-a-mole/
├── index.html        # Game markup
├── css/
│   └── style.css     # All styles
├── js/
│   └── game.js       # All game logic
└── README.md
```

## 🚀 Getting Started

### Play locally

No build step required — just clone and open:

```bash
git clone https://github.com/your-username/whack-a-mole.git
cd whack-a-mole
open index.html        # macOS
# or
start index.html       # Windows
# or double-click index.html in your file explorer
```

### Deploy to GitHub Pages

1. Push the repo to GitHub
2. Go to **Settings → Pages**
3. Set source to `main` branch, root `/`
4. Your game will be live at `https://your-username.github.io/whack-a-mole`

## 🎯 Scoring

| Action        | Points |
|---------------|--------|
| Hit a mole 🐹 | +10    |
| Hit a bomb 💣 | -5     |
| Miss a mole   | 0      |

## 🛠️ Customisation

Open `js/game.js` and tweak the constants at the top:

```js
const GAME_DURATION = 30;   // Round length in seconds
const BOMB_CHANCE   = 0.15; // Probability of a bomb (0–1)
const SCORE_HIT     = 10;   // Points per mole
const SCORE_BOMB    = -5;   // Points for hitting a bomb

const DIFF_SETTINGS = {
  easy:   { showTime: 1300, interval: 1500 },
  medium: { showTime: 850,  interval: 1000 },
  hard:   { showTime: 500,  interval: 650  },
};
```

## 📄 License

[MIT](LICENSE) — free to use, modify, and distribute.
