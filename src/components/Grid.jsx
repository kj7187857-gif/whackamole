import React from 'react';
import Hole from './Hole';
import styles from './Grid.module.css';

export default function Grid({ holes, onWhack }) {
  return (
    <div className={styles.grid}>
      {holes.map((hole, i) => (
        <Hole key={i} index={i} hole={hole} onWhack={onWhack} />
      ))}
    </div>
  );
}
