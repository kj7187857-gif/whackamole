import React from 'react';
import styles from './HUD.module.css';

function StatCard({ label, value, variant }) {
  return (
    <div className={styles.card}>
      <div className={styles.label}>{label}</div>
      <div className={`${styles.value} ${variant ? styles[variant] : ''}`}>
        {value}
      </div>
    </div>
  );
}

export default function HUD({ score, best, timeLeft, missed }) {
  return (
    <div className={styles.hud}>
      <StatCard label="Score"  value={score}    variant="gold" />
      <StatCard label="Best"   value={best}     variant="gold" />
      <StatCard label="Time"   value={timeLeft} />
      <StatCard label="Missed" value={missed}   variant="red"  />
    </div>
  );
}
