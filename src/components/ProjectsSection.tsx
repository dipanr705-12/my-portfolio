import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { Github, ExternalLink } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { LiveProjectButton } from './LiveProjectButton';

export interface ProjectData {
  number: string;
  name: string;
  category: string;
  col1Img1: string;
  col1Img2?: string;
  col2Img: string;
  extraImages?: string[];
  summary: string;
  deliverables: string;
  year: string;
  githubUrl: string;
  liveUrl?: string;
}

export const PROJECTS: ProjectData[] = [
  {
    number: '01',
    name: 'My Portfolio',
    category: 'Web Application · React / TS / Tailwind',
    col2Img: '/my-portfolio/screen1-hero.svg',
    col1Img1: '/my-portfolio/screen2-projects.svg',
    col1Img2: '/my-portfolio/screen3-thunderbolt.svg',
    summary:
      'Dipan Roy’s personal interactive portfolio landing page built with React 19, TypeScript, Tailwind CSS v4, Motion animations, Pikachu Thunderbolt battle mode, contact form, and dynamic GitHub API project sync.',
    deliverables: 'React 19 · TypeScript · Tailwind CSS · Motion · Vite',
    year: '2026',
    githubUrl: 'https://github.com/dipanr705-12/my-portfolio',
    liveUrl: 'https://github.com/dipanr705-12/my-portfolio',
  },
  {
    number: '02',
    name: 'Winter Guidance',
    category: 'Web Application · HTML / CSS / JS',
    col2Img: '/winter-guidance/screen1-home.svg',
    col1Img1: '/winter-guidance/screen2-darjeeling.svg',
    col1Img2: '/winter-guidance/screen3-kerala.svg',
    extraImages: [
      '/winter-guidance/screen4-leisure.svg',
      '/winter-guidance/screen5-ladakh.svg',
    ],
    summary:
      'A responsive winter tourism, sports, and destination guidance web project featuring interactive travel guides for Leh-Ladakh, Darjeeling, Kerala, Winter Leisure Fun, user ratings, and continuous Netlify deployment.',
    deliverables: 'HTML5 · CSS3 · JavaScript · Netlify',
    year: '2025',
    githubUrl: 'https://github.com/dipanr705-12/Winter-guidence',
    liveUrl: 'https://sparkling-macaron-78a7c6.netlify.app',
  },
  {
    number: '03',
    name: 'WhatsApp Bot',
    category: 'Automation · Node.js & Docker',
    col2Img: '/whatsapp-bot/screen1-setup.svg',
    col1Img1: '/whatsapp-bot/screen2-waking.svg',
    summary:
      'Automated 24/7 WhatsApp photo forwarding bot engineered in JavaScript with Puppeteer session initialization, phone number forwarding setup, and containerized Docker cloud deployment on Render.',
    deliverables: 'JavaScript · Node.js · Puppeteer · Docker · Render',
    year: '2026',
    githubUrl: 'https://github.com/dipanr705-12/whatsapp-bot',
    liveUrl: 'https://whatsapp-bot-7u6g.onrender.com',
  },
  {
    number: '04',
    name: 'ECE & Coding Hub',
    category: 'GitHub Profile · dipanr705-12',
    col1Img1: '/ece-hub-1.svg',
    col1Img2: '/ece-hub-2.svg',
    col2Img: '/ece-hub-3.svg',
    summary:
      'Dipan Roy’s open-source engineering hub featuring C, C++, Python, Java, and JavaScript implementations alongside Electronics & Communication Engineering and Arduino projects.',
    deliverables: 'C · C++ · Python · Java · Arduino',
    year: '2026',
    githubUrl: 'https://github.com/dipanr705-12/dipanr705-12',
    liveUrl: 'https://github.com/dipanr705-12',
  },
];

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  onSelectProject?: (project: ProjectData) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  progress,
  range,
  targetScale,
  onSelectProject,
}) => {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="h-[85vh] flex items-start justify-center sticky top-24 md:top-32">
      <motion.div
        style={{
          scale,
          top: `${index * 28}px`,
          willChange: 'transform',
        }}
        className="relative w-full max-w-6xl mx-auto rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 origin-top"
      >
        {/* Top Row: Number, Category, Project Name, and Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 sm:mb-6 px-2 sm:px-4">
          <div className="flex items-center gap-4 sm:gap-8 md:gap-10">
            <span
              className="font-black leading-none text-[#D7E2EA] tabular-nums select-none"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {project.number}
            </span>

            <div className="flex flex-col gap-1">
              <span className="text-xs sm:text-sm md:text-base font-light uppercase tracking-wider text-[#D7E2EA]/60">
                {project.category}
              </span>
              <h3
                className="font-medium uppercase text-[#D7E2EA] leading-tight"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {project.name}
              </h3>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-[#D7E2EA] bg-transparent text-[#D7E2EA] font-light uppercase tracking-wider px-5 py-2.5 sm:px-6 sm:py-3.5 text-xs sm:text-sm whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-200 hover:bg-[#D7E2EA]/10 flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-[#D7E2EA]/40 bg-transparent text-[#D7E2EA] font-light uppercase tracking-wider px-5 py-2.5 sm:px-6 sm:py-3.5 text-xs sm:text-sm whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-200 hover:border-[#D7E2EA] hover:bg-[#D7E2EA]/10 flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}

            <LiveProjectButton
              label="Details"
              onClick={() => onSelectProject?.(project)}
            />
          </div>
        </div>

        {/* Bottom Row: Two-Column Image Grid */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5">
          {/* Left Column (40% width): 1 tall image if col1Img2 is omitted, or 2 stacked images */}
          {project.col1Img2 ? (
            <div className="w-full sm:w-[40%] flex flex-col gap-3 sm:gap-4 md:gap-5">
              <div
                onClick={() => onSelectProject?.(project)}
                className="w-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#161618] cursor-pointer group"
                style={{ height: 'clamp(130px, 16vw, 230px)' }}
              >
                <img
                  src={project.col1Img1}
                  alt={`${project.name} detail 1`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>

              <div
                onClick={() => onSelectProject?.(project)}
                className="w-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#161618] cursor-pointer group"
                style={{ height: 'clamp(160px, 22vw, 340px)' }}
              >
                <img
                  src={project.col1Img2}
                  alt={`${project.name} detail 2`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
            </div>
          ) : (
            <div
              onClick={() => onSelectProject?.(project)}
              className="w-full sm:w-[50%] overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#161618] cursor-pointer group h-[240px] sm:h-auto"
              style={{
                minHeight: 'clamp(290px, 38vw, 590px)',
              }}
            >
              <img
                src={project.col1Img1}
                alt={`${project.name} detail 1`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>
          )}

          {/* Right Column (60% width): 1 tall image or hero + 2 extra screenshots */}
          {project.extraImages && project.extraImages.length > 0 ? (
            <div className="w-full sm:w-[60%] flex flex-col gap-3 sm:gap-4 md:gap-5">
              <div
                onClick={() => onSelectProject?.(project)}
                className="w-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#161618] cursor-pointer group"
                style={{
                  height: 'clamp(170px, 23vw, 350px)',
                }}
              >
                <img
                  src={project.col2Img}
                  alt={`${project.name} primary showcase`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                {project.extraImages.map((imgUrl, extraIdx) => (
                  <div
                    key={extraIdx}
                    onClick={() => onSelectProject?.(project)}
                    className="w-full overflow-hidden rounded-[32px] sm:rounded-[40px] md:rounded-[50px] bg-[#161618] cursor-pointer group"
                    style={{
                      height: 'clamp(120px, 15vw, 220px)',
                    }}
                  >
                    <img
                      src={imgUrl}
                      alt={`${project.name} extra view ${extraIdx + 1}`}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-[32px] sm:rounded-[40px] md:rounded-[50px] transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div
              onClick={() => onSelectProject?.(project)}
              className="w-full sm:w-[60%] overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#161618] cursor-pointer group h-[240px] sm:h-auto"
              style={{
                minHeight: 'clamp(290px, 38vw, 590px)',
              }}
            >
              <img
                src={project.col2Img}
                alt={`${project.name} primary showcase`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

interface ProjectsSectionProps {
  onSelectProject?: (project: ProjectData) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<ProjectData[]>(PROJECTS);

  useEffect(() => {
    // Dynamically append any additional public repositories added to dipanr705-12
    fetch('https://api.github.com/users/dipanr705-12/repos?sort=updated')
      .then((res) => (res.ok ? res.json() : []))
      .then((repos) => {
        if (!Array.isArray(repos)) return;
        const knownUrls = new Set(
          PROJECTS.map((p) => p.githubUrl.toLowerCase())
        );
        const extraRepos: ProjectData[] = repos
          .filter(
            (r) =>
              r &&
              typeof r.html_url === 'string' &&
              !knownUrls.has(r.html_url.toLowerCase())
          )
          .map((r, idx) => {
            const num = String(PROJECTS.length + idx + 1).padStart(2, '0');
            const fallbackProject = PROJECTS[idx % PROJECTS.length];
            return {
              number: num,
              name: String(r.name).replace(/[-_]/g, ' '),
              category: r.language ? `${r.language} Project` : 'GitHub Project',
              col1Img1: fallbackProject.col1Img1,
              col1Img2: fallbackProject.col1Img2,
              col2Img: fallbackProject.col2Img,
              summary:
                r.description ||
                `Open-source repository ${r.name} by Dipan Roy on GitHub.`,
              deliverables: r.language
                ? `${r.language} · GitHub Repository`
                : 'Open Source · GitHub Repository',
              year: r.created_at
                ? new Date(r.created_at).getFullYear().toString()
                : '2026',
              githubUrl: r.html_url,
              liveUrl: r.homepage || undefined,
            };
          });

        if (extraRepos.length > 0) {
          setProjects([...PROJECTS, ...extraRepos]);
        }
      })
      .catch(() => {
        // Keep default curated GitHub projects if offline
      });
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const totalCards = projects.length;

  return (
    <section
      id="projects"
      className="relative z-10 bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24 sm:pb-36"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Project
        </h2>
      </FadeIn>

      <div ref={containerRef} className="relative">
        {projects.map((project, index) => {
          const targetScale = 1 - (totalCards - 1 - index) * 0.03;
          const startRange = index * (1 / totalCards);
          return (
            <ProjectCard
              key={project.number}
              project={project}
              index={index}
              totalCards={totalCards}
              progress={scrollYProgress}
              range={[startRange, 1]}
              targetScale={targetScale}
              onSelectProject={onSelectProject}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ProjectsSection;
