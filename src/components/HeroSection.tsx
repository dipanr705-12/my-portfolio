import React, { useState } from 'react';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';
import { ContactButton } from './ContactButton';
import { PikachuThunderboltModal } from './PikachuThunderboltModal';

interface HeroSectionProps {
  onOpenContact?: () => void;
}

const PORTRAIT_URL = './pikachu-face.svg';

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  const [isThunderboltOpen, setIsThunderboltOpen] = useState(false);
  const handleDownloadCV = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
6 0 obj
<< /Length 580 >>
stream
BT
/F1 22 Tf 50 730 Td (DIPAN ROY - ECE ENGINEER & 3D CREATOR) Tj
/F2 10 Tf 0 -20 Td (Email: dipanr705@gmail.com | GitHub: github.com/dipanr705-12) Tj
0 -15 Td (LinkedIn: linkedin.com/in/dipan-roy-aa6316385) Tj
/F1 13 Tf 0 -35 Td (SUMMARY) Tj
/F2 10 Tf 0 -16 Td (ECE student passionate about electronics, microcontrollers, web apps & hardware.) Tj
/F1 13 Tf 0 -30 Td (SKILLS) Tj
/F2 10 Tf 0 -16 Td (- Programming: C, C++, JavaScript, HTML, CSS, Python, Node.js) Tj
0 -15 Td (- Hardware & PCB: Arduino, KiCad, Eagle PCB, Wokwi, Tinkercad Circuits) Tj
/F1 13 Tf 0 -30 Td (FEATURED PROJECTS) Tj
/F2 10 Tf 0 -16 Td (- Winter Guidance: Travel & destination web platform (HTML/CSS/JS)) Tj
0 -15 Td (- WhatsApp Bot: Automated Node.js/Docker cloud service) Tj
0 -15 Td (- ECE & Coding Hub: Open-source robotics & hardware repository) Tj
ET
endstream
endobj
xref
0 7
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000244 00000 n 
0000000312 00000 n 
0000000375 00000 n 
trailer
<< /Size 7 /Root 1 0 R >>
startxref
1025
%%EOF`;

    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Dipan_Roy_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    if (targetId === 'contact' && onOpenContact) {
      onOpenContact();
      return;
    }
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative h-screen w-full flex flex-col justify-between bg-[#0C0C0C] select-none"
      style={{ overflowX: 'clip' }}
    >
      {/* Top Group: Navbar + Massive Hero Heading */}
      <div className="w-full relative z-20">
        <FadeIn
          as="nav"
          delay={0}
          y={-20}
          className="flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8"
        >
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, 'about')}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 whitespace-nowrap"
          >
            About
          </a>
          <a
            href="#download-cv"
            onClick={handleDownloadCV}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 whitespace-nowrap"
          >
            Download CV
          </a>
          <a
            href="#projects"
            onClick={(e) => handleNavClick(e, 'projects')}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 whitespace-nowrap"
          >
            Projects
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 whitespace-nowrap"
          >
            Contact
          </a>
        </FadeIn>

        <div className="overflow-hidden w-full text-center px-2">
          <FadeIn delay={0.15} y={40}>
            <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[13vw] sm:text-[14vw] md:text-[15vw] lg:text-[16.2vw] mt-6 sm:mt-4 md:-mt-5">
              Hi, i&apos;m dipan
            </h1>
          </FadeIn>
        </div>
      </div>

      {/* Centered Hero Portrait with Animated Electric & Circuit Background */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-2 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[500px] pointer-events-auto">
        <FadeIn delay={0.6} y={30} className="w-full">
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            wrapperClassName="w-full"
            innerClassName="w-full"
          >
            <div
              role="button"
              tabIndex={0}
              aria-label="Click Pikachu face to open Classic Anime Pikachu Thunderbolt & Quick Hub"
              onClick={() => setIsThunderboltOpen(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsThunderboltOpen(true);
                }
              }}
              className="relative w-full flex items-center justify-center cursor-pointer group outline-none"
            >
              {/* Layer 1: Lightweight GPU Radial Glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -m-6 sm:-m-10 rounded-full opacity-75"
                style={{
                  background:
                    'radial-gradient(circle, rgba(255, 234, 0, 0.32) 0%, rgba(245, 158, 11, 0.16) 42%, rgba(56, 189, 248, 0.08) 65%, rgba(12, 12, 12, 0) 75%)',
                }}
              />

              {/* Layer 2: Rotating Electronics Circuit Ring + Small Coding Lightning SVG */}
              <svg
                aria-hidden="true"
                viewBox="0 0 600 600"
                className="pointer-events-none absolute w-[124%] h-[124%] -z-10 overflow-visible"
              >
                <defs>
                  <linearGradient id="elecRing" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFEA00" stopOpacity="0.75" />
                    <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#FF2E3D" stopOpacity="0.75" />
                  </linearGradient>
                </defs>

                {/* Outer Slow-Rotating Dashed Circuit Orbit */}
                <g className="origin-center animate-spin-slow" style={{ transformOrigin: '300px 300px', willChange: 'transform' }}>
                  <circle
                    cx="300"
                    cy="300"
                    r="255"
                    fill="none"
                    stroke="url(#elecRing)"
                    strokeWidth="1.5"
                    strokeDasharray="18 14 6 14"
                    opacity="0.6"
                  />
                  <circle cx="300" cy="45" r="4" fill="#FFEA00" />
                  <circle cx="555" cy="300" r="4" fill="#38BDF8" />
                  <circle cx="300" cy="555" r="4" fill="#FF2E3D" />
                  <circle cx="45" cy="300" r="4" fill="#FFEA00" />
                </g>

                {/* Inner Counter-Rotating Tech Ring */}
                <g className="origin-center animate-spin-reverse" style={{ transformOrigin: '300px 300px', willChange: 'transform' }}>
                  <circle
                    cx="300"
                    cy="300"
                    r="220"
                    fill="none"
                    stroke="#FFEA00"
                    strokeWidth="1.2"
                    strokeDasharray="40 28"
                    opacity="0.4"
                  />
                  <path
                    d="M 300 68 L 300 48 M 532 300 L 552 300 M 68 300 L 48 300"
                    stroke="#38BDF8"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </g>

                {/* Crisp Electric Bolts & Small Coding Letters Around Face */}
                <g>
                  <path
                    d="M 88 210 L 112 228 L 94 246 L 124 274"
                    fill="none"
                    stroke="#FFEA00"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.85"
                  />
                  <path
                    d="M 512 205 L 488 225 L 506 244 L 476 272"
                    fill="none"
                    stroke="#FFEA00"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.85"
                  />
                  <path
                    d="M 110 430 L 136 418 L 124 442 L 152 432"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.8"
                  />
                  <path
                    d="M 490 430 L 464 418 L 476 442 L 448 432"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.8"
                  />

                  {/* Small Coding-Language Labels */}
                  <text
                    x="76"
                    y="198"
                    fill="#FFEA00"
                    fontFamily="monospace"
                    fontWeight="700"
                    fontSize="9"
                    opacity="0.85"
                  >
                    c++
                  </text>
                  <text
                    x="502"
                    y="196"
                    fill="#FFEA00"
                    fontFamily="monospace"
                    fontWeight="700"
                    fontSize="9"
                    opacity="0.85"
                  >
                    js()
                  </text>
                  <text
                    x="60"
                    y="342"
                    fill="#38BDF8"
                    fontFamily="monospace"
                    fontWeight="700"
                    fontSize="8.5"
                    opacity="0.8"
                  >
                    &lt;html&gt;
                  </text>
                  <text
                    x="502"
                    y="342"
                    fill="#38BDF8"
                    fontFamily="monospace"
                    fontWeight="700"
                    fontSize="8.5"
                    opacity="0.8"
                  >
                    py
                  </text>
                  <text
                    x="88"
                    y="464"
                    fill="#FFEA00"
                    fontFamily="monospace"
                    fontWeight="700"
                    fontSize="8.5"
                    opacity="0.8"
                  >
                    css
                  </text>
                  <text
                    x="484"
                    y="464"
                    fill="#FFEA00"
                    fontFamily="monospace"
                    fontWeight="700"
                    fontSize="8.5"
                    opacity="0.8"
                  >
                    pcb
                  </text>
                </g>
              </svg>

              {/* Cartoon Character Face Foreground */}
              <img
                src={PORTRAIT_URL}
                alt="Dipan — Cartoon Character Portrait (Click for Thunderbolt)"
                referrerPolicy="no-referrer"
                className="relative z-10 w-full h-auto object-contain block select-none transition-transform duration-200 group-hover:scale-[1.03] active:scale-95"
              />
            </div>
          </Magnet>
        </FadeIn>
      </div>

      {/* Classic Anime Pikachu Thunderbolt & Useful Portfolio Hub Modal */}
      <PikachuThunderboltModal
        isOpen={isThunderboltOpen}
        onClose={() => setIsThunderboltOpen(false)}
        onOpenContact={() => {
          setIsThunderboltOpen(false);
          onOpenContact?.();
        }}
        onDownloadCV={() => {
          const fakeEvent = { preventDefault: () => {} } as React.MouseEvent<HTMLAnchorElement>;
          handleDownloadCV(fakeEvent);
        }}
      />

      {/* Bottom Bar */}
      <div className="relative z-20 flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            Where electronics meets code, my journey begins
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton onClick={onOpenContact} />
        </FadeIn>
      </div>
    </section>
  );
};

export default HeroSection;
