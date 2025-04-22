import React from "react";
import "./Homepage.css";
import { Link, useNavigate } from "react-router";

const Homepage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/menu");
  };
  return (
    <div className="homepage">
      <header className="hero">
        <div className="hero-content">
          <h1>Welcome to Café Night & Day</h1>
          <p>Experience the perfect blend of comfort and taste</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button className="cta-button" onClick={handleClick}>
                View Menu
              </button>
              <button className="cta-button">
                <Link
                  to="/Admin/Login"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Login
                </Link>
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="features">
        <div className="feature-card">
          <i className="fas fa-coffee"></i>
          <h2>Coffee</h2>
          <p>Sourced from the finest beans around the world</p>
        </div>
        <div className="feature-card">
          <i className="fas fa-bread-slice"></i>
          <h2>Where Comfort Meets Craft</h2>
          <p>Every detail, freshly designed for your presence</p>
        </div>
        <div className="feature-card">
          <i className="fas fa-wifi"></i>
          <h2>Free WiFi</h2>
          <p>Stay connected while you enjoy</p>
        </div>
      </section>

      <section className="about">
        <div className="about-content">
          <h2>Our Story</h2>
          <p>
            Founded in 2023, Café Night & Day serves the Jaipur community as
            both a vibrant café and a convenient mart. We offer the finest
            coffee, freshly baked goods, and a selection of everyday essentials.
            Our passion for quality and service makes us your perfect
            destination for a delightful café experience and quick shopping
            needs.
          </p>
        </div>
      </section>
      <section className="contact">
        <h2>Visit Us</h2>
        <div className="contact-info">
          <div className="address">
            <h3>Location</h3>
            <p>Goner Road</p> <p> Near Khatipura Railway Station, Jagatpura</p>
            <p>Café Night & Day </p>
          </div>
          <div className="hours">
            <h3>Hours</h3>
            <p>Monday - Sunday: 11am - 10pm</p>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-content">
          <div className="social-links">
            <p>
              &copy; 2020 Night & Day Café. All rights reserved. Located in
              Jaipur, Rajasthan, India.
            </p>
            <a
              href="https://www.instagram.com/night.and.day_001?igsh=MWNxaW5mNG4zeGtyeQ=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-instagram"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
