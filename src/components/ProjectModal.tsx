import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Github, ExternalLink } from 'lucide-react';
import { ProjectData } from './ProjectsSection';
import { ContactButton } from './ContactButton';

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
  onInquire: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onInquire,
}) => {
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  useEffect(() => {
    setActiveImgIndex(0);
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const images = [
    project.col2Img,
    project.col1Img1,
    project.col1Img2,
    ...(project.extraImages || []),
  ].filter((img): img is string => Boolean(img));

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-5 sm:p-8 text-[#D7E2EA] my-auto"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-4 sm:gap-6">
                <span className="font-black text-4xl sm:text-6xl leading-none text-[#D7E2EA] tabular-nums">
                  {project.number}
                </span>
                <div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-light uppercase tracking-wider text-[#D7E2EA]/60">
                    <span>{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="font-bold uppercase text-xl sm:text-3xl text-[#D7E2EA] leading-tight">
                    {project.name}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close project viewer"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-[#D7E2EA] flex items-center justify-center text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Active Showcase Image */}
            <div className="w-full h-[260px] sm:h-[380px] md:h-[440px] rounded-[32px] overflow-hidden bg-[#141416] mb-4">
              <img
                src={images[activeImgIndex]}
                alt={`${project.name} view ${activeImgIndex + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Switcher + Project Details */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2">
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                {images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImgIndex(idx)}
                    className={`w-16 h-12 sm:w-20 sm:h-14 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      activeImgIndex === idx
                        ? 'border-[#D7E2EA] scale-105'
                        : 'border-transparent opacity-50 hover:opacity-80'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${project.name} thumbnail ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              <div className="flex-1 max-w-md">
                <p className="text-xs uppercase tracking-widest text-[#D7E2EA]/50 mb-1">
                  {project.deliverables}
                </p>
                <p className="text-sm font-light text-[#D7E2EA]/85 leading-relaxed">
                  {project.summary}
                </p>
              </div>

              <div className="shrink-0 flex flex-wrap items-center gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border-2 border-[#D7E2EA] bg-transparent text-[#D7E2EA] font-light uppercase tracking-wider px-5 py-3 text-xs sm:text-sm whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-200 hover:bg-[#D7E2EA]/10 flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repo</span>
                </a>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border-2 border-[#D7E2EA]/50 bg-transparent text-[#D7E2EA] font-light uppercase tracking-wider px-5 py-3 text-xs sm:text-sm whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-200 hover:border-[#D7E2EA] hover:bg-[#D7E2EA]/10 flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                )}

                <ContactButton
                  label="Contact Me"
                  onClick={() => {
                    onClose();
                    onInquire();
                  }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
