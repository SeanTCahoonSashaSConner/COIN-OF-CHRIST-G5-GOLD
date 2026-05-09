import React from 'react';

/**
 * Golden railroad-tie low fence — used as a visual border at top/bottom
 * of pages. Optionally renders a labelled "gate" (opening) in the middle.
 */
const RailroadFence = ({ label = null, ties = 32 }) => {
  if (label) {
    const half = Math.floor(ties / 2);
    return (
      <div
        className="railroad-fence-with-gate"
        data-testid="railroad-fence-gate"
        aria-hidden="true"
      >
        <div className="railroad-fence">
          {Array.from({ length: half }).map((_, i) => (
            <div key={`l-${i}`} className="railroad-tie" />
          ))}
        </div>
        <div className="railroad-gate">{label}</div>
        <div className="railroad-fence">
          {Array.from({ length: half }).map((_, i) => (
            <div key={`r-${i}`} className="railroad-tie" />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="railroad-fence" data-testid="railroad-fence" aria-hidden="true">
      {Array.from({ length: ties }).map((_, i) => (
        <div key={i} className="railroad-tie" />
      ))}
    </div>
  );
};

export default RailroadFence;
