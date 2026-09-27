import React from 'react';
import { FadeIn } from './FadeIn';

interface SkillCategory {
  letter: string;
  name: string;
  skills: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    letter: 'A',
    name: 'Languages',
    skills: ['C++', 'JavaScript', 'HTML', 'CSS', 'Python'],
  },
  {
    letter: 'B',
    name: 'PCB Design',
    skills: ['Eagle PCB Software', 'KiCad PCB Design'],
  },
  {
    letter: 'C',
    name: 'Hardware',
    skills: ['Wokwi', 'Tinkercad Circuits', 'CircuitLab', 'Tinkercad'],
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="skills"
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="text-[#0C0C0C] font-black uppercase text-center leading-none tracking-tight mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Skills
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto pb-8 sm:pb-12">
        {SKILL_CATEGORIES.map((category, i) => (
          <FadeIn key={category.letter} delay={i * 0.1} y={30}>
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12 md:gap-16 py-8 sm:py-10 md:py-12"
              style={{
                borderBottom:
                  i < SKILL_CATEGORIES.length - 1
                    ? '1px solid rgba(12, 12, 12, 0.15)'
                    : 'none',
              }}
            >
              <span
                className="font-black leading-none text-[#0C0C0C] shrink-0 tabular-nums select-none"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {category.letter}
              </span>

              <div className="flex flex-col gap-4 sm:gap-5 w-full">
                <h3
                  className="font-bold uppercase text-[#0C0C0C] leading-tight tracking-wide"
                  style={{ fontSize: 'clamp(1.25rem, 2.4vw, 2.2rem)' }}
                >
                  {category.letter}) {category.name}
                </h3>

                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {category.skills.map((skill, idx) => (
                    <div
                      key={skill}
                      className="inline-flex items-center gap-2.5 rounded-full border-2 border-[#0C0C0C] bg-[#0C0C0C]/5 px-5 py-2.5 sm:px-6 sm:py-3 text-[#0C0C0C] font-medium transition-colors duration-200 hover:bg-[#0C0C0C] hover:text-[#FFFFFF]"
                      style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.15rem)' }}
                    >
                      <span className="font-bold opacity-60">
                        {idx + 1})
                      </span>
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
