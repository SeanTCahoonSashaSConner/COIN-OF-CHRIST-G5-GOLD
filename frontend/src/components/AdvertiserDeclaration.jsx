import React from 'react';
import { ShieldAlert, Ban, Heart, Users } from 'lucide-react';

/**
 * Clean Content Declaration — shown on every advertiser-facing page
 * and the Merchant Covenant. Non-negotiable content standards for the
 * Country of Christ.
 */
const AdvertiserDeclaration = () => {
  return (
    <section
      className="glass rounded-2xl border border-[#3B82F6]/40 p-6 md:p-8 my-8 relative overflow-hidden"
      data-testid="advertiser-declaration"
    >
      <div className="absolute -top-px left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent opacity-70" />
      <div className="flex items-start gap-4 mb-5">
        <div className="w-12 h-12 rounded-full bg-[#3B82F6]/15 border border-[#3B82F6]/40 flex items-center justify-center flex-shrink-0">
          <ShieldAlert className="w-6 h-6" style={{ color: '#3B82F6' }} />
        </div>
        <div>
          <h3 className="text-2xl font-serif" style={{ color: '#3B82F6' }}>
            Advertiser Clean-Content Declaration
          </h3>
          <p className="text-sm text-[#A8A29E] mt-1">
            Non-negotiable content standards for every brand who advertises
            inside the <span className="g5-gold">Country of Christ</span>.
          </p>
        </div>
      </div>

      <p className="text-[#FAFAF9] leading-relaxed mb-5">
        The <span className="g5-gold">Country of Christ</span> only accepts{' '}
        <strong className="text-white">clean, E-for-Everyone</strong> products
        and advertisements for our citizens. Our citizen roster houses young
        children from <span className="wb-num">11</span> years old and up —
        please be mindful of the content you place in front of our citizens.
      </p>

      <div className="grid sm:grid-cols-2 gap-3 mb-5" data-testid="banned-content-grid">
        {[
          'No age-sensitive material',
          'No dating sites',
          'No dating apps',
          'No alcohol advertisements',
          'No cigarette / tobacco / vape ads',
          'No nudity or suggestive content',
          'No gambling promotions',
          'E-for-Everyone advertisements only',
        ].map((rule) => (
          <div
            key={rule}
            className="flex items-center gap-3 bg-red-500/5 border border-red-500/25 rounded-lg px-4 py-3"
          >
            <Ban className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span className="text-sm text-[#FAFAF9]">{rule}</span>
          </div>
        ))}
      </div>

      <div className="bg-red-500/10 border border-red-500/35 rounded-xl p-4 mb-5">
        <p className="text-sm text-red-300 leading-relaxed">
          <strong className="text-red-400">Violation Penalty:</strong> Any
          advertiser who places age-sensitive, dating, alcohol, tobacco, nudity
          or otherwise non-E-for-Everyone content in front of our citizens will
          be <strong className="text-white">banned from all auctions and
          future donation participations indefinitely</strong>.
        </p>
      </div>

      <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/35 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Heart className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-[#D4AF37] mb-1">
              Citizenship Requirement for Merchants
            </h4>
            <p className="text-sm text-[#FAFAF9] leading-relaxed">
              The only requirements to advertise inside{' '}
              <span className="font-mono text-[#3B82F6]">countryofchrist.sol</span>{' '}
              are: become a <strong className="text-white">G5 Citizen</strong>{' '}
              and <strong className="text-white">accept{' '}
              <span className="g5-gold">G5 GOLD</span> online and offline in
              all your stores</strong>. That is the entire bar to entry into
              the digital nation.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-5 text-xs text-[#A8A29E]">
        <Users className="w-4 h-4" />
        <span>
          Citizen roster includes minors aged{' '}
          <span className="wb-num">11</span>+. Steward your platform
          responsibly.
        </span>
      </div>
    </section>
  );
};

export default AdvertiserDeclaration;
