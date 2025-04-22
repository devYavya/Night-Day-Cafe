import React from "react";
import "./LoadinDas.css";
const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-spinner">
        <div className="spinner-circle"></div>
        <p>Loading Admin Dashboard...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
