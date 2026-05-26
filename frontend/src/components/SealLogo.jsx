import React from 'react';

/**
 * Country of Christ Seal — TIV-TEK Human Edification.
 * Displays the seal image exactly as the user provided it. No shapes,
 * no borders, no captions added.
 *
 * Variants control display width only.
 */

const WIDTHS = {
  hero:      520,
  header:    340,
  watermark: 420,
};

const SealLogo = ({ variant = 'header', className = '', style: extraStyle = {} }) => {
  const width = WIDTHS[variant] || WIDTHS.header;

  return (
    <img
      src="/assets/seal.jpg"
      alt="Country of Christ official seal"
      data-testid={`country-of-christ-seal-${variant}`}
      className={className}
      style={{
        width,
        maxWidth: '92vw',
        height: 'auto',
        display: 'block',
        ...extraStyle,
      }}
      loading="eager"
    />
  );
};

export default SealLogo;
