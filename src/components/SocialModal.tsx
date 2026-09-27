import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Linkedin,
  Github,
  Instagram,
  Facebook,
  ArrowUpRight,
} from 'lucide-react';

interface SocialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    handle: 'dipan-roy-aa6316385',
    url: 'https://www.linkedin.com/in/dipan-roy-aa6316385',
    icon: Linkedin,
  },
  {
    name: 'GitHub',
    handle: 'dipanr705-12',
    url: 'https://github.com/dipanr705-12',
    icon: Github,
  },
  {
    name: 'Instagram',
    handle: '@i_am_dipan24_',
    url: 'https://www.instagram.com/i_am_dipan24_/',
    icon: Instagram,
  },
  {
    name: 'Facebook',
    handle: 'dipan.roy.627320',
    url: 'https://www.facebook.com/dipan.roy.627320',
    icon: Facebook,
  },
];

export const SocialModal: React.FC<SocialModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-[36px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-6 sm:p-10 text-[#D7E2EA]"
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h3 className="hero-heading font-black uppercase text-3xl sm:text-4xl leading-none tracking-tight">
                  Connect Me Socially
                </h3>
                <p className="text-sm font-light text-[#D7E2EA]/70 mt-2">
                  Follow or reach out to Dipan Roy across social platforms.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close social modal"
                className="w-10 h-10 rounded-full border border-[#D7E2EA]/30 flex items-center justify-center text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-3.5">
              {SOCIAL_LINKS.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-full border border-[#D7E2EA]/30 bg-[#141416] px-6 py-4 text-[#D7E2EA] transition-all duration-200 hover:border-[#D7E2EA] hover:scale-[1.02]"
                    style={{
                      boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.35)',
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0"
                        style={{
                          background:
                            'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                          outline: '1.5px solid #FFFFFF',
                          outlineOffset: '-2px',
                        }}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block font-bold uppercase tracking-wider text-base sm:text-lg leading-tight">
                          {item.name}
                        </span>
                        <span className="block text-xs font-light text-[#D7E2EA]/60">
                          {item.handle}
                        </span>
                      </div>
                    </div>

                    <div className="w-9 h-9 rounded-full border border-[#D7E2EA]/30 flex items-center justify-center group-hover:bg-[#D7E2EA] group-hover:text-[#0C0C0C] transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </a>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SocialModal;
