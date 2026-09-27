import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Copy, Send } from 'lucide-react';
import { ContactButton } from './ContactButton';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TARGET_EMAIL = 'dipanr705@gmail.com';

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const buildMailtoUrl = () => {
    const subject = encodeURIComponent(`New Message from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message || 'No additional details provided.'}`
    );
    return `mailto:${TARGET_EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSending(true);
    try {
      await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message: message || 'Message from portfolio website',
          _subject: `New Message from ${name}`,
        }),
      });
    } catch {
      // Fallback to mailto client if network request is blocked
      window.location.href = buildMailtoUrl();
    } finally {
      setIsSending(false);
      setSubmitted(true);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(TARGET_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setMessage('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleResetAndClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl rounded-[36px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-6 sm:p-10 text-[#D7E2EA]"
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h3 className="hero-heading font-black uppercase text-3xl sm:text-4xl leading-none tracking-tight">
                  Contact Me
                </h3>
                <p className="text-sm font-light text-[#D7E2EA]/70 mt-2">
                  Have a question or want to get in touch? Send Dipan a message.
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetAndClose}
                aria-label="Close contact modal"
                className="w-10 h-10 rounded-full border border-[#D7E2EA]/30 flex items-center justify-center text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="py-8 text-center flex flex-col items-center gap-5">
                <div className="w-14 h-14 rounded-full border-2 border-[#D7E2EA] flex items-center justify-center">
                  <Check className="w-7 h-7 text-[#D7E2EA]" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold uppercase tracking-wide text-[#D7E2EA]">
                    Message Sent
                  </h4>
                  <p className="text-sm font-light text-[#D7E2EA]/70 mt-2 max-w-sm">
                    Thanks, {name}. Your message has been sent to{' '}
                    <span className="text-[#D7E2EA] font-medium">
                      {TARGET_EMAIL}
                    </span>
                    . Dipan will reply to {email} shortly.
                  </p>
                </div>
                <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={buildMailtoUrl()}
                    className="rounded-full border border-[#D7E2EA]/40 px-6 py-3 text-xs uppercase tracking-widest text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors"
                  >
                    Open in Email App
                  </a>
                  <ContactButton
                    label="Back to Portfolio"
                    onClick={handleResetAndClose}
                  />
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#D7E2EA]/60 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Mercer"
                      className="w-full rounded-2xl border border-[#D7E2EA]/25 bg-[#141416] px-4 py-3 text-sm text-[#D7E2EA] placeholder:text-[#D7E2EA]/30 focus:border-[#D7E2EA] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#D7E2EA]/60 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@studio.com"
                      className="w-full rounded-2xl border border-[#D7E2EA]/25 bg-[#141416] px-4 py-3 text-sm text-[#D7E2EA] placeholder:text-[#D7E2EA]/30 focus:border-[#D7E2EA] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#D7E2EA]/60 mb-1.5">
                    Share Your Thoughts
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share your goals, deliverables, or target launch window..."
                    className="w-full rounded-2xl border border-[#D7E2EA]/25 bg-[#141416] px-4 py-3 text-sm text-[#D7E2EA] placeholder:text-[#D7E2EA]/30 focus:border-[#D7E2EA] focus:outline-none resize-none"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#D7E2EA]/15">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#D7E2EA]/70 hover:text-[#D7E2EA] transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Copied {TARGET_EMAIL}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>{TARGET_EMAIL}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="rounded-full text-white font-medium uppercase tracking-widest px-8 py-3 text-xs sm:text-sm whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2 transition-transform duration-200 hover:scale-[1.03] disabled:opacity-60"
                    style={{
                      background:
                        'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                      boxShadow:
                        '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                      outline: '2px solid #FFFFFF',
                      outlineOffset: '-3px',
                    }}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSending ? 'Sending...' : 'Send Brief'}</span>
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
