import React, { useState } from "react";
import ProfileCard from "./ProfileCard";
import CredentialsCard from "./CredentialsCard";
import ContactModal from "./ContactModal";
import "./StackedProfileCards.css";

const StackedProfileCards = ({
  // Props for the first card (your existing profile card)
  avatarUrl = "/profile.png",
  name = "Chetan A. Singh",
  title = "Software Engineer",
  handle = "chetansingh",
  status = "Online",
  contactText = "Contact Me",
  onContactClick,
  enableTilt = true,
  // You can add props for the second card later
  className = "",
  ...otherProps
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleStackClick = (event) => {
    // Don't expand/collapse if clicking on interactive elements
    if (
      event.target.closest('.pc-contact-btn') ||
      event.target.closest('.pc-user-info')
    ) {
      return;
    }
    setIsExpanded(!isExpanded);
  };

  const handleContactClick = () => {
    setIsContactModalOpen(true);
  };

  const handleCloseContactModal = () => {
    setIsContactModalOpen(false);
  };

  return (
    <div 
      className={`stacked-profile-cards ${isExpanded ? 'expanded' : ''} ${className}`.trim()}
      onClick={handleStackClick}
    >
      {/* First card - your existing profile card */}
      <div className="stacked-card stacked-card-front">
        <ProfileCard
          avatarUrl={avatarUrl}
          name={name}
          title={title}
          handle={handle}
          status={status}
          contactText={contactText}
          onContactClick={handleContactClick}
          {...otherProps}
        />
      </div>
      
      {/* Second card - credentials card */}
      <div className="stacked-card stacked-card-back">
        <CredentialsCard
          enableTilt={enableTilt}
          {...otherProps}
        />
      </div>
      
      {/* Click hint when stacked */}
      {!isExpanded && (
        <div className="click-hint">
          <span>Click to expand</span>
        </div>
      )}
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={handleCloseContactModal}
      />
    </div>
  );
};

export default StackedProfileCards;