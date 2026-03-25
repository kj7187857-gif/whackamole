import React from 'react';
import { GAME_DURATION } from '../constants';
import styles from './TimerBar.module.css';

export default function TimerBar({ timeLeft }) {
  const pct = (timeLeft / GAME_DURATION) * 100;
  const color =
    pct > 50 ? '#4ecb71' :
    pct > 25 ? '#f7c948' :
               '#ff6b6b';

  return (
    <div className={styles.wrap}>
      <div
        className={styles.bar}
        style={{ width: `${pct}%`, background: color }}
      />
    </div>
  );
}
