import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

interface PikachuThunderboltModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact?: () => void;
  onDownloadCV?: () => void;
}

type BattlePhase = 'charging' | 'surging' | 'thunderbolt' | 'idle';

interface LightningSegment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  isCyan: boolean;
}

// Fast low-depth fractal bolt generator (max depth 4 -> 16 segments per bolt = zero lag)
function generateFastBolt(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  displace: number,
  isCyan: boolean,
  segments: LightningSegment[],
  depth = 0
) {
  if (displace < 18 || depth >= 4) {
    segments.push({ x1, y1, x2, y2, isCyan });
    return;
  }
  const midX = (x1 + x2) * 0.5 + (Math.random() - 0.5) * displace;
  const midY = (y1 + y2) * 0.5 + (Math.random() - 0.5) * displace;

  generateFastBolt(x1, y1, midX, midY, displace * 0.52, isCyan, segments, depth + 1);
  generateFastBolt(midX, midY, x2, y2, displace * 0.52, isCyan, segments, depth + 1);

  if (depth === 1 && Math.random() < 0.55) {
    const angle = Math.atan2(y2 - y1, x2 - x1) + (Math.random() - 0.5) * 1.2;
    const len = Math.hypot(x2 - x1, y2 - y1) * 0.48;
    generateFastBolt(
      midX,
      midY,
      midX + Math.cos(angle) * len,
      midY + Math.sin(angle) * len,
      displace * 0.45,
      isCyan,
      segments,
      depth + 2
    );
  }
}

export const PikachuThunderboltModal: React.FC<PikachuThunderboltModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [phase, setPhase] = useState<BattlePhase>('charging');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const phaseRef = useRef<BattlePhase>('charging');

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  const playThunderboltAudio = useCallback(() => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(160, now);
      osc1.frequency.exponentialRampToValueAtTime(880, now + 0.9);
      gain1.gain.setValueAtTime(0.01, now);
      gain1.gain.linearRampToValueAtTime(0.09, now + 0.7);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 1.0);
      osc1.connect(gain1).connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 1.0);

      const bufferSize = Math.floor(ctx.sampleRate * 1.4);
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.45));
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(900, now + 1.2);
      filter.frequency.exponentialRampToValueAtTime(200, now + 2.5);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.2, now + 1.2);
      noiseGain.gain.exponentialRampToValueAtTime(0.005, now + 2.55);

      whiteNoise.connect(filter).connect(noiseGain).connect(ctx.destination);
      whiteNoise.start(now + 1.2);
      whiteNoise.stop(now + 2.6);

      setTimeout(() => {
        ctx.close().catch(() => {});
      }, 3000);
    } catch {
      // Ignore audio errors if blocked
    }
  }, []);

  const triggerThunderboltSequence = useCallback(() => {
    setPhase('charging');
    playThunderboltAudio();

    const t1 = setTimeout(() => setPhase('surging'), 850);
    const t2 = setTimeout(() => setPhase('thunderbolt'), 1250);
    const t3 = setTimeout(() => setPhase('idle'), 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [playThunderboltAudio]);

  useEffect(() => {
    if (!isOpen) return;
    const cleanup = triggerThunderboltSequence();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      cleanup();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, triggerThunderboltSequence]);

  // Ultra-lightweight 60fps Canvas (ZERO shadowBlur, batched paths, small crisp 9px coding letters)
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId = 0;
    let frame = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const SMALL_CODE_TOKENS = [
      'c++',
      'js',
      'html',
      'css',
      'py',
      ' eagle',
      'kicad',
      'wokwi',
      '0x1',
      '{;}',
      '</>',
      'int',
      'def',
      'var',
      'pcb',
    ];

    const vortexNodes = Array.from({ length: 24 }, (_, idx) => ({
      angle: (idx / 24) * Math.PI * 2,
      radius: 85 + (idx % 5) * 42,
      speed: 0.022 + (idx % 4) * 0.008,
      isCyan: idx % 3 === 0,
      token: SMALL_CODE_TOKENS[idx % SMALL_CODE_TOKENS.length],
    }));

    const render = () => {
      frame++;
      const w = canvas.width;
      const h = canvas.height;
      const currentPhase = phaseRef.current;

      const cx = w * 0.5;
      const cy = currentPhase === 'surging' || currentPhase === 'thunderbolt' ? h * 0.34 : h * 0.42;

      ctx.clearRect(0, 0, w, h);

      // 1. Lightweight Electric Vortex Rings (batched, no shadowBlur)
      const ringCount = currentPhase === 'thunderbolt' ? 4 : 3;
      ctx.lineWidth = 1.5;
      for (let i = 0; i < ringCount; i++) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(frame * (0.03 + i * 0.01) * (i % 2 === 0 ? 1 : -1));
        ctx.beginPath();
        const rx = 95 + i * 44;
        const ry = rx * (currentPhase === 'charging' ? 0.48 : 0.72);
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 1.5);
        ctx.strokeStyle = i % 2 === 0 ? 'rgba(255, 234, 0, 0.45)' : 'rgba(56, 189, 248, 0.4)';
        ctx.stroke();
        ctx.restore();
      }

      // 2. Small Orbiting Coding Letters in Vortex (9px monospace)
      ctx.font = '700 9px monospace';
      for (let i = 0; i < vortexNodes.length; i++) {
        const sp = vortexNodes[i];
        sp.angle += sp.speed * (currentPhase === 'thunderbolt' ? 1.8 : 1);
        const r =
          currentPhase === 'charging'
            ? sp.radius * (0.55 + 0.25 * Math.sin(frame * 0.06))
            : sp.radius;
        const px = cx + Math.cos(sp.angle) * r;
        const py = cy + Math.sin(sp.angle) * r * 0.65;
        ctx.fillStyle = sp.isCyan ? 'rgba(125, 211, 252, 0.85)' : 'rgba(255, 234, 0, 0.85)';
        ctx.fillText(sp.token, px, py);
      }

      // 3. Fast Speed Trails during Surge / Thunderbolt (small 8.5px letters)
      if (currentPhase === 'surging' || currentPhase === 'thunderbolt') {
        ctx.font = '700 8.5px monospace';
        ctx.lineWidth = 1.2;
        for (let i = 0; i < 14; i++) {
          const sx = cx + ((i * 89) % 520) - 260;
          const sy = (frame * 26 + i * 97) % (h * 0.72);
          const len = 48 + (i % 3) * 20;
          const isCyan = i % 3 === 0;
          ctx.strokeStyle = isCyan ? 'rgba(56, 189, 248, 0.4)' : 'rgba(255, 234, 0, 0.45)';
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(sx, sy + len);
          ctx.stroke();
          ctx.fillStyle = isCyan ? '#7DD3FC' : '#FFF59D';
          ctx.fillText(SMALL_CODE_TOKENS[i % SMALL_CODE_TOKENS.length], sx + 4, sy + len * 0.5);
        }
      }

      // 4. Branching Fractal Lightning Arcs (Recomputed every 2nd frame for smooth anime look & zero CPU load)
      const segments: LightningSegment[] = [];
      const leftCheekX = cx - 46;
      const rightCheekX = cx + 46;
      const cheekY = cy - 10;

      if (currentPhase === 'charging') {
        for (let b = 0; b < 2; b++) {
          const angleL = Math.PI + (Math.random() - 0.5) * 1.4;
          const angleR = (Math.random() - 0.5) * 1.4;
          generateFastBolt(
            leftCheekX,
            cheekY,
            leftCheekX + Math.cos(angleL) * 135,
            cheekY + Math.sin(angleL) * 135,
            28,
            false,
            segments
          );
          generateFastBolt(
            rightCheekX,
            cheekY,
            rightCheekX + Math.cos(angleR) * 135,
            cheekY + Math.sin(angleR) * 135,
            28,
            b === 1,
            segments
          );
        }
      } else if (currentPhase === 'surging') {
        for (let b = 0; b < 4; b++) {
          const tx = cx + (Math.random() - 0.5) * 420;
          const ty = cy + 160 + Math.random() * 120;
          generateFastBolt(cx, cy, tx, ty, 42, b % 2 === 0, segments);
        }
      } else if (currentPhase === 'thunderbolt') {
        const targets = [
          [w * 0.08, h * 0.06],
          [w * 0.28, h * 0.03],
          [w * 0.5, 0],
          [w * 0.72, h * 0.03],
          [w * 0.92, h * 0.06],
          [w * 0.05, h * 0.42],
          [w * 0.95, h * 0.42],
          [w * 0.18, h * 0.68],
          [w * 0.82, h * 0.68],
        ];
        for (let idx = 0; idx < targets.length; idx++) {
          const [tx, ty] = targets[idx];
          const ox = idx % 2 === 0 ? leftCheekX : rightCheekX;
          generateFastBolt(
            ox,
            cheekY,
            tx + (Math.random() - 0.5) * 80,
            ty + (Math.random() - 0.5) * 50,
            65,
            idx % 3 === 0,
            segments
          );
        }
      } else if (frame % 3 === 0) {
        generateFastBolt(
          leftCheekX,
          cheekY,
          leftCheekX - 75 + (Math.random() - 0.5) * 25,
          cheekY + (Math.random() - 0.5) * 55,
          18,
          false,
          segments
        );
        generateFastBolt(
          rightCheekX,
          cheekY,
          rightCheekX + 75 + (Math.random() - 0.5) * 25,
          cheekY + (Math.random() - 0.5) * 55,
          18,
          true,
          segments
        );
      }

      // BATCHED STROKE PASS 1: Outer Electric Halo (Single GPU draw call!)
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      for (let i = 0; i < segments.length; i++) {
        const s = segments[i];
        ctx.moveTo(s.x1, s.y1);
        ctx.lineTo(s.x2, s.y2);
      }
      ctx.strokeStyle = 'rgba(255, 234, 0, 0.38)';
      ctx.lineWidth = currentPhase === 'thunderbolt' ? 6 : 4;
      ctx.stroke();

      // BATCHED STROKE PASS 2: Crisp Inner Bolt Core (Single GPU draw call!)
      ctx.beginPath();
      for (let i = 0; i < segments.length; i++) {
        const s = segments[i];
        ctx.moveTo(s.x1, s.y1);
        ctx.lineTo(s.x2, s.y2);
      }
      ctx.strokeStyle = '#FFFDE7';
      ctx.lineWidth = currentPhase === 'thunderbolt' ? 2 : 1.4;
      ctx.stroke();

      // PASS 3: Small, Crisp Coding Letters Along the Lightning Bolts (9px monospace, no rotation overhead)
      ctx.font = '700 9px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (let i = 0; i < segments.length; i += 2) {
        const s = segments[i];
        const mx = (s.x1 + s.x2) * 0.5;
        const my = (s.y1 + s.y2) * 0.5;
        const label = SMALL_CODE_TOKENS[(i + frame) % SMALL_CODE_TOKENS.length];
        ctx.fillStyle = s.isCyan ? '#7DD3FC' : '#FFEA00';
        ctx.fillText(label, mx, my - 6);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex flex-col justify-between overflow-hidden select-none"
          style={{
            background:
              'radial-gradient(circle at 50% 42%, #192242 0%, #0b1022 58%, #05070e 100%)',
          }}
        >
          {/* 60FPS Batched Fractal Code-Lightning Canvas */}
          <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-10 w-full h-full"
          />

          {/* Top Bar: ONLY Back Button */}
          <div className="relative z-30 flex items-center justify-start px-5 sm:px-8 pt-5 sm:pt-7">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#FFEA00] bg-[#0C0C0C]/80 text-[#FFEA00] font-bold uppercase tracking-wider px-5 py-2.5 text-xs sm:text-sm hover:bg-[#FFEA00] hover:text-[#0C0C0C] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          </div>

          {/* Center: Classic Anime Pikachu Battle Pose (GPU-accelerated transform only) */}
          <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-4">
            <div
              onClick={triggerThunderboltSequence}
              style={{
                transform:
                  phase === 'surging' || phase === 'thunderbolt'
                    ? 'translateY(-32px) scale(1.12)'
                    : phase === 'charging'
                    ? 'translateY(10px) scale(0.95)'
                    : 'translateY(0px) scale(1)',
                transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
                willChange: 'transform',
              }}
              className="relative w-[260px] sm:w-[330px] md:w-[390px] cursor-pointer"
              title="Click Pikachu to fire Code Thunderbolt"
            >
              {/* Classic Anime Pikachu Full-Body SVG (No expensive SVG feGaussianBlur filters) */}
              <svg viewBox="0 0 900 860" className="w-full h-auto overflow-visible">
                <defs>
                  <radialGradient id="animeBodyGrad" cx="48%" cy="38%" r="58%">
                    <stop offset="0%" stopColor="#FFF76B" />
                    <stop offset="62%" stopColor="#FFEA00" />
                    <stop offset="90%" stopColor="#F5C400" />
                    <stop offset="100%" stopColor="#D9A300" />
                  </radialGradient>

                  <linearGradient id="tailBoltGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#E5B200" />
                    <stop offset="45%" stopColor="#FFEA00" />
                    <stop offset="100%" stopColor="#FFF978" />
                  </linearGradient>

                  <radialGradient id="redCheekGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FF5765" />
                    <stop offset="65%" stopColor="#F01124" />
                    <stop offset="100%" stopColor="#B80012" />
                  </radialGradient>

                  <linearGradient id="pinkTongueGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#B84B62" />
                    <stop offset="38%" stopColor="#E66482" />
                    <stop offset="100%" stopColor="#FF8FAB" />
                  </linearGradient>

                  <clipPath id="animeLeftEarClip">
                    <path d="M 320 220 C 235 110, 145 65, 65 55 C 75 155, 130 250, 215 310 Z" />
                  </clipPath>

                  <clipPath id="animeRightEarClip">
                    <path d="M 555 215 C 640 105, 745 55, 830 50 C 815 155, 760 245, 665 305 Z" />
                  </clipPath>
                </defs>

                {/* Yellow Lightning Bolt Tail */}
                <g>
                  <path
                    d="M 545 610 L 625 545 L 595 495 L 705 405 L 660 335 L 835 205 L 775 395 L 710 385 L 745 455 L 635 535 L 660 575 L 565 650 Z"
                    fill="url(#tailBoltGrad)"
                    stroke="#141414"
                    strokeWidth="16"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 548 610 L 620 550 L 602 515 L 652 572 L 565 646 Z"
                    fill="#8C4A19"
                    stroke="#141414"
                    strokeWidth="12"
                    strokeLinejoin="round"
                  />
                </g>

                {/* Legs & Feet */}
                <path
                  d="M 295 625 C 245 660, 225 715, 250 755 C 278 785, 345 755, 365 695 Z"
                  fill="url(#animeBodyGrad)"
                  stroke="#141414"
                  strokeWidth="16"
                  strokeLinejoin="round"
                />
                <path
                  d="M 246 735 L 268 722 M 262 752 L 284 736"
                  stroke="#141414"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  d="M 515 615 C 565 645, 605 695, 585 745 C 560 778, 495 750, 465 685 Z"
                  fill="url(#animeBodyGrad)"
                  stroke="#141414"
                  strokeWidth="16"
                  strokeLinejoin="round"
                />
                <path
                  d="M 584 725 L 560 712 M 570 742 L 546 728"
                  stroke="#141414"
                  strokeWidth="8"
                  strokeLinecap="round"
                />

                {/* Lower Torso */}
                <path
                  d="M 285 455 C 250 545, 265 665, 335 695 C 395 718, 475 718, 535 690 C 595 660, 610 545, 575 455 Z"
                  fill="url(#animeBodyGrad)"
                  stroke="#141414"
                  strokeWidth="18"
                  strokeLinejoin="round"
                />

                {/* Perked Black-Tipped Ears */}
                <g>
                  <path
                    d="M 320 220 C 235 110, 145 65, 65 55 C 75 155, 130 250, 215 310 Z"
                    fill="url(#animeBodyGrad)"
                    stroke="#141414"
                    strokeWidth="18"
                    strokeLinejoin="round"
                  />
                  <g clipPath="url(#animeLeftEarClip)">
                    <path
                      d="M 45 35 L 185 88 C 165 142, 145 182, 132 232 L 45 185 Z"
                      fill="#141414"
                    />
                  </g>
                  <path
                    d="M 320 220 C 235 110, 145 65, 65 55 C 75 155, 130 250, 215 310"
                    fill="none"
                    stroke="#141414"
                    strokeWidth="18"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                <g>
                  <path
                    d="M 555 215 C 640 105, 745 55, 830 50 C 815 155, 760 245, 665 305 Z"
                    fill="url(#animeBodyGrad)"
                    stroke="#141414"
                    strokeWidth="18"
                    strokeLinejoin="round"
                  />
                  <g clipPath="url(#animeRightEarClip)">
                    <path
                      d="M 850 30 L 705 85 C 725 140, 745 180, 758 230 L 850 180 Z"
                      fill="#141414"
                    />
                  </g>
                  <path
                    d="M 555 215 C 640 105, 745 55, 830 50 C 815 155, 760 245, 665 305"
                    fill="none"
                    stroke="#141414"
                    strokeWidth="18"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                {/* Head & Cheeks */}
                <path
                  d="M 315 212 C 385 185, 495 185, 565 212 C 625 235, 672 295, 688 388 C 700 452, 725 505, 718 565 C 708 655, 605 725, 440 725 C 275 725, 172 655, 162 565 C 155 505, 180 452, 192 388 C 208 295, 255 235, 315 212 Z"
                  fill="url(#animeBodyGrad)"
                  stroke="#141414"
                  strokeWidth="18"
                  strokeLinejoin="round"
                />

                {/* Raised Battle Arms */}
                <path
                  d="M 215 495 C 125 445, 92 375, 130 342 C 165 315, 225 365, 265 435"
                  fill="url(#animeBodyGrad)"
                  stroke="#141414"
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M 125 352 L 142 368 M 138 338 L 155 356 M 156 334 L 168 352"
                  stroke="#141414"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path
                  d="M 665 495 C 755 445, 788 375, 750 342 C 715 315, 655 365, 615 435"
                  fill="url(#animeBodyGrad)"
                  stroke="#141414"
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M 755 352 L 738 368 M 742 338 L 725 356 M 724 334 L 712 352"
                  stroke="#141414"
                  strokeWidth="6"
                  strokeLinecap="round"
                />

                {/* Glowing Red Cheek Pouches + Crisp Starburst Flares */}
                <circle
                  cx="236"
                  cy="562"
                  r="62"
                  fill="url(#redCheekGlow)"
                  stroke="#141414"
                  strokeWidth="14"
                />
                <circle
                  cx="644"
                  cy="562"
                  r="62"
                  fill="url(#redCheekGlow)"
                  stroke="#141414"
                  strokeWidth="14"
                />
                {(phase === 'charging' || phase === 'thunderbolt') && (
                  <>
                    <polygon
                      points="236,482 250,538 305,526 260,562 302,600 248,585 236,640 224,585 170,600 212,562 167,526 222,538"
                      fill="#FFEA00"
                      opacity="0.88"
                    />
                    <polygon
                      points="644,482 658,538 713,526 668,562 710,600 656,585 644,640 632,585 578,600 620,562 575,526 630,538"
                      fill="#FFEA00"
                      opacity="0.88"
                    />
                  </>
                )}

                {/* Eyes */}
                <circle cx="305" cy="424" r="54" fill="#141414" />
                <circle cx="318" cy="402" r="21" fill="#FFFFFF" />
                <circle cx="292" cy="444" r="9" fill="#FFFFFF" opacity="0.85" />

                <circle cx="575" cy="424" r="54" fill="#141414" />
                <circle cx="562" cy="402" r="21" fill="#FFFFFF" />
                <circle cx="588" cy="444" r="9" fill="#FFFFFF" opacity="0.85" />

                {/* Nose */}
                <path
                  d="M 422 472 Q 440 465 458 472 Q 452 494 440 494 Q 428 494 422 472 Z"
                  fill="#141414"
                />

                {/* Open Joyful Anime Mouth & Pink Tongue */}
                <path
                  d="M 378 538 Q 412 548 440 522 Q 468 548 502 538 C 496 620, 472 668, 440 668 C 408 668, 384 620, 378 538 Z"
                  fill="url(#pinkTongueGrad)"
                  stroke="#141414"
                  strokeWidth="14"
                  strokeLinejoin="round"
                />
                <path
                  d="M 346 518 C 368 548, 416 548, 440 520 C 464 548, 512 548, 534 518"
                  fill="none"
                  stroke="#141414"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PikachuThunderboltModal;
