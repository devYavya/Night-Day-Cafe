import React from "react";
import "../Styles/LoadingScreen.css";

const LoadingScreen = () => {
  return (
    <div class="loading-screen">
      <div class="teacup">
        <div class="steam steam1"></div>
        <div class="steam steam2"></div>
        <div class="steam steam3"></div>
      </div>
      <div class="loading-text">Loading menu...</div>
      <div class="dots">
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
