import React from 'react';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { ContactButton } from './ContactButton';

interface AboutSectionProps {
  onOpenContact?: () => void;
}

const ABOUT_TEXT =
  'I am Dipan Roy, an Electronics and Communication Engineering student passionate about electronics, coding, robotics, and innovative technology. Currently, I am strengthening my fundamentals in ECE while developing practical projects using Arduino and other hardware. My future goal is to become a skilled engineer, pursue higher studies, and create impactful technological solutions.';

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenContact }) => {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 overflow-hidden"
    >
      {/* Top-Left Decorative 3D Moon Icon */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none select-none z-0"
      >
        <img
          src="/3d-moon.svg"
          alt="3D Moon Icon"
          loading="lazy"
          className="w-full h-auto object-contain"
        />
      </FadeIn>

      {/* Bottom-Left Decorative 3D Object */}
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px] pointer-events-none select-none z-0"
      >
        <img
          src="/3d-sculpture.svg"
          alt="3D Geometric Sculpture"
          loading="lazy"
          className="w-full h-auto object-contain"
        />
      </FadeIn>

      {/* Top-Right Decorative 3D Lego Icon */}
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none select-none z-0"
      >
        <img
          src="/3d-lego.svg"
          alt="3D Block Sculpture"
          loading="lazy"
          className="w-full h-auto object-contain"
        />
      </FadeIn>

      {/* Bottom-Right Decorative 3D Group */}
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px] pointer-events-none select-none z-0"
      >
        <img
          src="/3d-cluster.svg"
          alt="3D Abstract Cluster"
          loading="lazy"
          className="w-full h-auto object-contain"
        />
      </FadeIn>

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn delay={0} y={40}>
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight text-center"
              style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            >
              About me
            </h2>
          </FadeIn>

          <AnimatedText
            text={ABOUT_TEXT}
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />
        </div>

        <FadeIn delay={0.2} y={20}>
          <ContactButton label="Connect Me Socially" onClick={onOpenContact} />
        </FadeIn>
      </div>
    </section>
  );
};

export default AboutSection;
