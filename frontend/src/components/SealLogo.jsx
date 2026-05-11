import React from 'react';

/**
 * Official Country of Christ Seal — TIV-TEK Human Edification.
 * Pinned to the top-right corner of every route page.
 * Used across: Country of Christ, Crypto Christian Network,
 * The Closet, and G5 GOLD.
 */
const SealLogo = ({ size = 72 }) => {
  return (
    <a
      href="/"
      data-testid="country-of-christ-seal"
      title="Country of Christ • TIV-TEK Human Edification"
      style={{
        position: 'fixed',
        top: 12,
        right: 12,
        zIndex: 100,
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        border: '2px solid #D4AF37',
        boxShadow:
          '0 0 18px rgba(212,175,55,0.55), 0 0 38px rgba(212,175,55,0.25), inset 0 0 8px rgba(0,0,0,0.4)',
        background: '#050505',
        display: 'block',
        transition: 'transform 200ms ease, box-shadow 200ms ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.06)';
        e.currentTarget.style.boxShadow =
          '0 0 28px rgba(212,175,55,0.85), 0 0 52px rgba(212,175,55,0.4), inset 0 0 8px rgba(0,0,0,0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow =
          '0 0 18px rgba(212,175,55,0.55), 0 0 38px rgba(212,175,55,0.25), inset 0 0 8px rgba(0,0,0,0.4)';
      }}
    >
      <img
        src="/assets/seal.jpg"
        alt="Country of Christ official seal"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
    </a>
  );
};

export default SealLogo;
