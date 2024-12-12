import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2 className="section-title">Contacto</h2>
          <p className="contact-info"><FaPhoneAlt className="icon" /> +1 (123) 456-7890</p>
          <p className="contact-info"><FaEnvelope className="icon" /> contacto@sanantonio.com</p>
          <p className="contact-info"><FaMapMarkerAlt className="icon" /> Calle Falsa 123, Ciudad, País</p>
        </div>
        <div className="footer-section">
          <h2 className="section-title">Enlaces Rápidos</h2>
          <ul className="link-list">
            <li><a href="#home" className="link">Inicio</a></li>
            <li><a href="#services" className="link">Servicios</a></li>
            <li><a href="#about" className="link">Sobre Nosotros</a></li>
            <li><a href="#contact" className="link">Contacto</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h2 className="section-title">Redes Sociales</h2>
          <div className="social-icons">
            <a href="https://facebook.com/sanantonio" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaFacebookF className="social-icon" />
            </a>
            <a href="https://twitter.com/sanantonio" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaTwitter className="social-icon" />
            </a>
            <a href="https://instagram.com/sanantonio" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaInstagram className="social-icon" />
            </a>
          </div>
        </div>
      </div>
      <div>
        <p className="footer-text">&copy; 2024 Policlínico San Antonio. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
