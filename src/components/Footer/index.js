import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-heading">rent vroom</div>
      <div className="footer-details">
        <p>Rentvroom pvt. ltd.</p>
        <address>
          No: 296, 3rd cross rd, jakkasandra, 1st block, kormangla, bengaluru,
          karnataka 560034
        </address>
      </div>
      <div className="footer-icons">
        <i className="fab fa-twitter mr-5"></i>
        <i className="fab fa-instagram mr-5"></i>
        <i className="fab fa-linkedin"></i>
      </div>
      <div className="footer-links d-flex justify-content-between">
        <span className="d-flex justify-content-between footer-nav__links">
          <a href="/">home</a>
          <a href="/">contact</a>
          <a href="/">about</a>
        </span>
        <span className="d-flex justify-content-between footer-nav__links-small">
          <a href="/">privacy policy</a>
          <a href="/">terms of services</a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
