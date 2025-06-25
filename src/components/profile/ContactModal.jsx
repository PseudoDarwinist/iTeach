import React, { useEffect, useRef } from "react";
import "./ContactModal.css";

const ContactModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLinkedInClick = () => {
    const linkedinUrl = import.meta.env.VITE_LINKEDIN_URL || 'https://www.linkedin.com/in/chetan-singh-484407b5/';
    window.open(linkedinUrl, '_blank', 'noopener,noreferrer');
  };

  const handleXClick = () => {
    const twitterUrl = import.meta.env.VITE_TWITTER_URL || 'https://x.com/hItLeRsInGs';
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="contact-modal-overlay">
      <div 
        ref={modalRef}
        className="contact-modal"
      >
        <button 
          className="contact-modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        
        <div className="contact-modal-content">
          <div className="contact-modal-header">
            <h3>Let's Connect</h3>
            <p>Choose your preferred platform to get in touch</p>
          </div>
          
          <div className="contact-options">
            <button 
              className="contact-option linkedin"
              onClick={handleLinkedInClick}
            >
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <div className="contact-text">
                <span className="contact-title">LinkedIn</span>
                <span className="contact-subtitle">Professional network</span>
              </div>
              <div className="contact-arrow">→</div>
            </button>
            
            <button 
              className="contact-option twitter"
              onClick={handleXClick}
            >
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                </svg>
              </div>
              <div className="contact-text">
                <span className="contact-title">X (Twitter)</span>
                <span className="contact-subtitle">Quick updates & thoughts</span>
              </div>
              <div className="contact-arrow">→</div>
            </button>
          </div>
          
          <div className="contact-modal-footer">
            <p>I typically respond within 24 hours</p>
          </div>
        </div>
        
        {/* Holographic effects */}
        <div className="modal-shine"></div>
        <div className="modal-glare"></div>
      </div>
    </div>
  );
};

export default ContactModal;