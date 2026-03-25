import React, { useRef } from 'react';
import styles from './Hole.module.css';

/**
 * Renders a single hole. Forwards the DOM rect to the whack handler
 * so the parent can position the floating score pop-up.
 */
export default function Hole({ hole, index, onWhack }) {
  const ref = useRef(null);

  function handleClick() {
    const rect = ref.current ? ref.current.getBoundingClientRect() : null;
    onWhack(index, rect);
  }

  function handleTouch(e) {
    e.preventDefault();
    const rect = ref.current ? ref.current.getBoundingClientRect() : null;
    onWhack(index, rect);
  }

  const holeClass = [
    styles.hole,
    hole.state === 'up'      ? styles.up      : '',
    hole.state === 'hit'     ? styles.hit      : '',
    hole.state === 'explode' ? styles.explode  : '',
  ].join(' ').trim();

  return (
    <div
      ref={ref}
      className={holeClass}
      onClick={handleClick}
      onTouchStart={handleTouch}
      aria-label={`Hole ${index + 1}`}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && handleClick()}
    >
      <span className={styles.mole}>{hole.emoji}</span>
    </div>
  );
}
