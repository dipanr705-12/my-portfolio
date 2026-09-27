/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection, ProjectData } from './components/ProjectsSection';
import { ContactModal } from './components/ContactModal';
import { SocialModal } from './components/SocialModal';
import { ProjectModal } from './components/ProjectModal';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSocialOpen, setIsSocialOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
    null
  );

  return (
    <div
      className="bg-[#0C0C0C] min-h-screen w-full text-[#D7E2EA]"
      style={{ overflowX: 'clip' }}
    >
      <HeroSection onOpenContact={() => setIsContactOpen(true)} />
      <MarqueeSection />
      <AboutSection onOpenContact={() => setIsSocialOpen(true)} />
      <ServicesSection />
      <ProjectsSection
        onSelectProject={(project) => setSelectedProject(project)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
      <SocialModal
        isOpen={isSocialOpen}
        onClose={() => setIsSocialOpen(false)}
      />
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={() => setIsContactOpen(true)}
      />
    </div>
  );
}
