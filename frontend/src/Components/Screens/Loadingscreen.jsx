import React from "react";
import "../Styles/LoadingScreen.css";

const LoadingScreen = () => {
  return (
    <div className="loading-screen-user">
      <div className="coffee-cup">
        <div className="coffee-cup-body">
          <div className="steam steam1"></div>
          <div className="steam steam2"></div>
          <div className="steam steam3"></div>
        </div>
        <div className="coffee-handle"></div>
      </div>
      <div className="loading-text">Loading menu...</div>
      <div className="dots">
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
