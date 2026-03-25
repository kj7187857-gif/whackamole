import React, { useState } from 'react';
import { useGame } from './hooks/useGame';
import HUD from './components/HUD';
import TimerBar from './components/TimerBar';
import Grid from './components/Grid';
import ResultOverlay from './components/ResultOverlay';
import ScorePops from './components/ScorePops';
import styles from './App.module.css';

export default function App() {
  const {
    holes, score, best, missed, timeLeft,
    running, diff, setDiff,
    message, scorePops,
    startGame, whack,
  } = useGame();

  // Show result overlay once the game has run at least once and is now stopped
  const [hasPlayed, setHasPlayed] = useState(false);
  const [prevScore, setPrevScore] = useState(0);
  const [prevBest,  setPrevBest]  = useState(0);
  const [prevMissed, setPrevMissed] = useState(0);

  function handleStart() {
    if (running) return;
    startGame();
    setHasPlayed(false);
  }

  // Capture final score when game ends (timeLeft hits 0 and running flips false)
  React.useEffect(() => {
    if (!running && timeLeft === 0) {
      setPrevScore(score);
      setPrevBest(best);
      setPrevMissed(missed);
      setHasPlayed(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  const showOverlay = hasPlayed && !running && timeLeft === 0;

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Whack-a-Mole</h1>
      <p className={styles.subtitle}>Click the moles before they hide!</p>

      <HUD score={score} best={best} timeLeft={timeLeft} missed={missed} />

      <div className={styles.controls}>
        <span className={styles.diffLabel}>Difficulty:</span>
        <select
          value={diff}
          onChange={e => setDiff(e.target.value)}
          disabled={running}
          className={styles.select}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <TimerBar timeLeft={timeLeft} />

      <Grid holes={holes} onWhack={whack} />

      <p className={`${styles.msg} ${message.type ? styles[message.type] : ''}`}>
        {message.text}
      </p>

      <button
        className={styles.startBtn}
        onClick={handleStart}
        disabled={running}
      >
        {running ? 'Running…' : 'Start Game'}
      </button>

      <div className={styles.legend}>
        <span>🐹🐭🐾 Hit = +10pts</span>
        <span>💣 Bomb = -5pts</span>
      </div>

      {showOverlay && (
        <ResultOverlay
          score={prevScore}
          best={prevBest}
          missed={prevMissed}
          isNewBest={prevScore >= prevBest && prevScore > 0}
          onPlayAgain={handleStart}
        />
      )}

      <ScorePops pops={scorePops} />
    </div>
  );
}
