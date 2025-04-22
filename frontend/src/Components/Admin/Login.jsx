import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../../services/apiService";
import "./Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: enter email, 2: enter OTP
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");
    try {
      const response = await apiService.requestOtp({ email });
      setInfo(`OTP sent to your email. (For demo: OTP is ${response.otp})`);
      setStep(2);
    } catch (err) {
      setError(err.response?.data || "Failed to request OTP.");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");
    try {
      const response = await apiService.loginWithOtp({ email, otp });
      onLogin(true);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data || "Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">☕ Welcome to Café Admin</h2>
        {error && <div className="login-error">{error}</div>}
        {info && <div className="login-info">{info}</div>}
        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className="login-form">
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-btn">
              Request OTP
            </button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleOtpSubmit} className="login-form">
            <div className="input-group">
              <label htmlFor="otp">Enter OTP</label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-btn">
              Verify OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
