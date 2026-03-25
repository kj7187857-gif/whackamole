import React from 'react';
import styles from './ResultOverlay.module.css';

function getResult(score) {
  if (score >= 150) return { emoji: '🏆', title: 'Legendary!' };
  if (score >= 100) return { emoji: '🥇', title: 'Amazing!' };
  if (score >= 60)  return { emoji: '😄', title: 'Nice Work!' };
  if (score >= 20)  return { emoji: '😐', title: 'Not Bad!' };
  return             { emoji: '😢', title: 'Keep Trying!' };
}

export default function ResultOverlay({ score, best, missed, isNewBest, onPlayAgain }) {
  const { emoji, title } = getResult(score);

  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <div className={styles.emoji}>{emoji}</div>
        <div className={styles.title}>{title}</div>
        <div className={styles.score}>{score}</div>
        <p className={styles.body}>
          You scored <strong>{score} pts</strong> with {missed} miss{missed !== 1 ? 'es' : ''}.
          {isNewBest && score > 0 && (
            <><br />🎉 New best score!</>
          )}
        </p>
        <button className={styles.btn} onClick={onPlayAgain}>
          Play Again
        </button>
      </div>
    </div>
  );
}
