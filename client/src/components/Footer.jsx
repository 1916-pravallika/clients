import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";
import "./Footer.css";
import ToggleColorMode from "./ToggleColorMode";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer text-white">
      <div className="container">
        <div className="row">
          {/* About Me Section */}
          <div className="col-md-6 col-lg-3 mb-4">
            <h4 className="footer-heading">About Me</h4>
            <p className="footer-text">
             Galeeb&Co
            </p>
          </div>
          {/* Quick Links Section */}
          <div className="col-md-6 col-lg-3 mb-4">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <a href="http://localhost:5173/" className="footer-link">
                  <FaUser className="footer-icon" /> About
                </a>
              </li>
              <li>
                <a href="/contact" className="footer-link">
                  <FaEnvelope className="footer-icon" /> Contact
                </a>
              </li>
            </ul>
          </div>
          {/* Contact Info Section */}
          <div className="col-md-6 col-lg-3 mb-4">
            <h4 className="footer-heading">Contact Info</h4>
            <ul className="footer-info">
              <li>
                <FaEnvelope className="footer-icon" />{" "}
                http://localhost:5173/
              </li>
              <li>
                <FaMapMarkerAlt className="footer-icon" /> KLU guys
              </li>
            </ul>
          </div>
          {/* Social Media Section */}
          <div className="col-md-6 col-lg-3 mb-4">
            <h4 className="footer-heading">Follow Me</h4>
            <ul className="footer-social">
              <li>
                <a
                  href="http://localhost:5173/"
                  className="footer-link"
                >
                  <FaGithub className="footer-icon" /> GitHub
                </a>
              </li>
              <li>
                <a
                  href="http://localhost:5173/"
                  className="footer-link"
                >
                  <FaLinkedin className="footer-icon" /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="http://localhost:5173/"
                  className="footer-link"
                >
                  <FaInstagram className="footer-icon" /> Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom mt-4 pt-4 text-center">
        <p className="footer-text" >
          &copy; {currentYear} Galeeb BHAAi. All rights reserved.
        </p>
       
      </div>
    </footer>
  );
};

export default Footer;
