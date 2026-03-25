import React from 'react';

/**
 * Renders all active floating score pop-up labels.
 * Each pop is positioned absolutely using fixed coords from getBoundingClientRect.
 */
export default function ScorePops({ pops }) {
  return (
    <>
      {pops.map(({ id, x, y, text, color }) => (
        <div
          key={id}
          className="score-pop"
          style={{ left: x, top: y, color }}
        >
          {text}
        </div>
      ))}
    </>
  );
}
