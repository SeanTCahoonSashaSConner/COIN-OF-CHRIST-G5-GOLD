import React from 'react';

/**
 * Country of Christ Seal — TIV-TEK Human Edification.
 *
 * Variants:
 *   - "hero"       : large centered seal (Constitution, landing splashes)
 *   - "header"     : medium-large inline seal (Witness Jury, Debt Exile headers)
 *   - "watermark"  : strategically offset semi-transparent crest (dashboards)
 *
 * Designed to read as untouchable authority — bold gold ring, deep glow,
 * never overlapping other UI.
 */

const VARIANTS = {
  hero: {
    size: 280,
    ring: 4,
    glow: '0 0 60px rgba(212,175,55,0.7), 0 0 120px rgba(212,175,55,0.35), inset 0 0 20px rgba(0,0,0,0.5)',
  },
  header: {
    size: 140,
    ring: 3,
    glow: '0 0 36px rgba(212,175,55,0.6), 0 0 72px rgba(212,175,55,0.25), inset 0 0 14px rgba(0,0,0,0.5)',
  },
  watermark: {
    size: 180,
    ring: 3,
    glow: '0 0 40px rgba(212,175,55,0.55), 0 0 80px rgba(212,175,55,0.25), inset 0 0 14px rgba(0,0,0,0.5)',
  },
};

const SealLogo = ({ variant = 'header', className = '', style: extraStyle = {}, withCaption = false }) => {
  const v = VARIANTS[variant] || VARIANTS.header;

  return (
    <div
      data-testid={`country-of-christ-seal-${variant}`}
      className={className}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        ...extraStyle,
      }}
    >
      <div
        title="Country of Christ • TIV-TEK Human Edification"
        style={{
          width: v.size,
          height: v.size,
          borderRadius: '50%',
          overflow: 'hidden',
          border: `${v.ring}px solid #D4AF37`,
          boxShadow: v.glow,
          background: '#050505',
          position: 'relative',
        }}
      >
        <img
          src="/assets/seal.jpg"
          alt="Country of Christ official seal — TIV-TEK Human Edification"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
          loading="eager"
        />
      </div>
      {withCaption && (
        <div style={{ textAlign: 'center' }}>
          <p
            style={{
              fontFamily: "'Cinzel', serif",
              fontWeight: 800,
              letterSpacing: '0.22em',
              fontSize: variant === 'hero' ? 18 : 13,
              color: '#D4AF37',
              textShadow: '0 0 12px rgba(212,175,55,0.45)',
              margin: 0,
            }}
          >
            TIV-TEK · HUMAN EDIFICATION
          </p>
          <p
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: variant === 'hero' ? 12 : 10,
              letterSpacing: '0.3em',
              color: '#3B82F6',
              marginTop: 4,
            }}
          >
            COUNTRY OF CHRIST
          </p>
        </div>
      )}
    </div>
  );
};

export default SealLogo;
