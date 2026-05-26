import React, { useEffect, useState } from 'react';
import { Wallet, Smartphone, QrCode as QrCodeIcon, Crown, ExternalLink, Check } from 'lucide-react';

/**
 * G5 Wallet Card Add-to-Wallet page.
 *
 * Pass2U handles the actual .pkpass / Google Pay token generation.
 * This page simply presents the connection link as:
 *   1. A big "Add to Wallet" button (mobile flow)
 *   2. A QR code (desktop → scan with phone)
 *
 * For Sasha Conner (Co-Founder), the link is pre-wired below.
 * In future builds we'll generate per-citizen links from the
 * generate-g5-card Edge Function.
 */

const CARDS = {
  sasha: {
    name: 'Sasha Conner',
    role: 'Co-Founder',
    id: 'g5-sash-15',
    crown: true,
    pass2uUrl: 'https://www.pass2u.net/p/EcAU5Mn_73ar?openExternalBrowser=1',
  },
};

const WalletCard = ({ slug = 'sasha' }) => {
  const card = CARDS[slug];
  const [copied, setCopied] = useState(false);

  // Auto-redirect mobile devices directly to the Pass2U flow
  useEffect(() => {
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    if (isMobile && card?.pass2uUrl) {
      // Small delay so the user sees confirmation before redirect
      const t = setTimeout(() => {
        window.location.href = card.pass2uUrl;
      }, 1800);
      return () => clearTimeout(t);
    }
  }, [card]);

  if (!card) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#FAFAF9] flex items-center justify-center p-6">
        <p>No wallet card found.</p>
      </div>
    );
  }

  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(card.pass2uUrl)}&bgcolor=050505&color=D4AF37&margin=12`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(card.pass2uUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_e) { /* ignore */ }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAF9] flex flex-col items-center justify-center px-6 py-10" data-testid="wallet-card-page">
      <div className="max-w-md w-full text-center">

        {/* Card identity */}
        <div className="flex items-center justify-center gap-3 mb-3">
          {card.crown && <Crown className="w-7 h-7 text-[#D4AF37]" />}
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#D4AF37] font-bold">
            {card.role}
          </p>
          {card.crown && <Crown className="w-7 h-7 text-[#D4AF37]" />}
        </div>
        <h1 className="text-4xl font-serif text-[#FAFAF9] mb-2" data-testid="cardholder-name">
          {card.name}
        </h1>
        <p className="font-mono text-sm text-[#3B82F6] tracking-[0.18em] mb-8">{card.id}</p>

        {/* The big Add-to-Wallet button */}
        <a
          href={card.pass2uUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-5 rounded-2xl bg-gradient-to-b from-[#FFE066] to-[#D4AF37] text-black font-bold text-lg tracking-wider transition transform hover:scale-[1.02]"
          style={{ boxShadow: '0 0 32px rgba(212,175,55,0.55)' }}
          data-testid="add-to-wallet-button"
        >
          <span className="inline-flex items-center gap-3">
            <Wallet className="w-6 h-6" />
            Add to Wallet
          </span>
        </a>

        <p className="text-xs text-[#A8A29E] mt-3 flex items-center justify-center gap-1.5">
          <Smartphone className="w-3.5 h-3.5" />
          Opens Apple Wallet or Google Pay on phone
        </p>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-[#1f1f1f]" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#A8A29E]">or scan</span>
          <div className="flex-1 h-px bg-[#1f1f1f]" />
        </div>

        {/* QR code — for desktop users to scan with phone */}
        <div className="rounded-2xl bg-[#0d0d0d] border border-[#1f1f1f] p-6">
          <div className="flex items-center justify-center gap-2 text-xs text-[#A8A29E] mb-3">
            <QrCodeIcon className="w-4 h-4" />
            Scan with your phone camera
          </div>
          <img
            src={qrSrc}
            alt={`QR code to add ${card.name}'s G5 wallet card`}
            className="mx-auto rounded-xl border border-[#D4AF37]/30"
            data-testid="wallet-qr-code"
          />
        </div>

        {/* Copy link fallback */}
        <button
          onClick={copyLink}
          className="mt-6 inline-flex items-center gap-2 text-xs text-[#A8A29E] hover:text-[#D4AF37] transition"
          data-testid="copy-wallet-link"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <ExternalLink className="w-4 h-4" />}
          {copied ? 'Link copied' : 'Copy share link'}
        </button>

        <p className="text-[10px] text-[#5a5a5a] mt-8 max-w-xs mx-auto">
          Pass2U handles the Apple Wallet & Google Pay token generation.
          The card lives offline on the device once added.
        </p>
      </div>
    </div>
  );
};

export default WalletCard;
