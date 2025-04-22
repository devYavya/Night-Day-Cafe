import {  motion } from "framer-motion";
import "../Styles/UnderConstruction.css";
import { useNavigate } from "react-router-dom";


export default function UnderConstruction() {

    const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/admin/dashboard"); 
  };
  return (
    <div className="Construction-container">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-container"
      >
        <h1 className="title">Coming Soon</h1>
        <p className="subtitle">
          We're working hard to bring you something amazing.
        </p>
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="animation-container">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
            className="rotating-border"
          ></motion.div>
          <div className="emoji">🚧</div>
        </div>
      </motion.div>
      <button className="backbutton" onClick={handleBackToHome}>
        ← Back to Home
      </button>{" "}
    </div>
  );
}
