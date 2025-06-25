import React from "react";
import ProfileCard from "./ProfileCard";
import "./CredentialsCard.css";

const CredentialsCard = ({ enableTilt = true, className = "", ...otherProps }) => {
  return (
    <div className="credentials-wrapper">
      {/* Use ProfileCard for the holographic background only */}
      <ProfileCard
        enableTilt={enableTilt}
        showUserInfo={false}
        className={`credentials-base-card ${className}`}
        {...otherProps}
      />
      
      {/* Overlay with clean text content */}
      <div className="credentials-text-overlay">
        <div className="credentials-header">
          <h2>Hey! I'm Chetan.</h2>
        </div>
        
        <div className="credentials-body">
          <h3>I'm the instructor of these courses.</h3>
          
          <p>
            I'm a <span className="highlight">Software engineer</span> with 1.5 decades of experience building and scaling 
            enterprise software in various Client locations like US, Spain, Sweden etc.
          </p>
          
          <p>
            From 2011 to 2023, I had the privilege of building systems for companies like 
            South West Airlines, IAG, Iberia, Scandinavian Airlines among others. 
            Across these projects, I learned what it takes to build reliable and scalable software that works.
          </p>
          
          <p>
            I started using AI right when it all started and have been a power user of all the tools. 
            I would like to pay it forward.
          </p>
          
          <p className="closing">I can't wait to see you in class!</p>
        </div>
      </div>
    </div>
  );
};

export default CredentialsCard;