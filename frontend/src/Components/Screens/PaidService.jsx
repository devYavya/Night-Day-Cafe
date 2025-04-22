import React from "react";
import { Lock } from "lucide-react";
import "../Styles/PaidService.css";
import { useNavigate } from "react-router-dom";

const PaidService = () => {
    
        const navigate = useNavigate();
    const handleBackToHome = () => {
      navigate("/admin/dashboard");
    };
  return (
    <div className="paid-service-wrapper">
      <div className="paid-service-card">
        <div className="lock-icon animated-pop">
          <Lock size={64} />
        </div>
        <h1 className="headline">Oops! This Feature is Locked 🔒</h1>
        <p className="sub-message">
          This is a <strong>paid service</strong>. Access is restricted to
          authorized users.
        </p>
        <p className="contact-note">
          🚀 Need access? Contact your developer to unlock this feature.
        </p>
        <div className="contact-footer">
          Visit us at:{" "}
          <a
            href="https://www.bytespheredigital.com"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            Byte Sphere Digital
          </a>
        </div>
        <button className="paid-backbutton" onClick={handleBackToHome}>
          ← Back to Home
        </button>{" "}
      </div>
    </div>
  );
};

export default PaidService;
