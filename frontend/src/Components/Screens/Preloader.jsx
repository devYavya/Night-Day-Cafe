import React, { useEffect } from "react";
import { preLoaderAnim } from "../../Animation";
import "../Styles/Preloader.css";

const Preloader = () => {
  useEffect(() => {
    preLoaderAnim();
  }, []);

  const handleImageError = () => {
    console.log("Image failed to load.");
  };

  return (
    <div className="preloader">
      <div className="texts-container">
        <span>
          <img
            className="img"
            src="./logopre.png"
            alt="Loading Logo"
            onError={handleImageError}
          />
        </span>
      </div>
    </div>
  );
};

export default Preloader;
