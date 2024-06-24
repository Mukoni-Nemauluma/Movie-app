import React from "react"
import {
  FaFacebookF,
  FaTwitter,
  FaGooglePlusG,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelopeOpen,
  FaTelegramPlane,
} from "react-icons/fa"
import "../../App.css"

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-content">
          <div className="flex-container">
            {/* Web Developers Section */}
            <section className="web-developers">
              <div className="widget">
                <div className="footer-widget-heading">
                  <h3>
                    <span className="highlight">Web</span> Developers
                  </h3>
                </div>
                <ul className="developer-list">
                  <li>
                    <div className="developer-info">
                      <p>Nonhlanhla Mazibuko</p>
                      <div className="social-icons">
                        <a
                          href="[GitHub Link]"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaFacebookF className="social-icon" />
                        </a>
                        <a
                          href="[LinkedIn Link]"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaTwitter className="social-icon" />
                        </a>
                        <a
                          href="[Google Plus Link]"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaGooglePlusG className="social-icon" />
                        </a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="developer-info">
                      <p>Konanani Nemauluma</p>
                      <div className="social-icons">
                        <a
                          href="[GitHub Link]"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaFacebookF className="social-icon" />
                        </a>
                        <a
                          href="[LinkedIn Link]"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaTwitter className="social-icon" />
                        </a>
                        <a
                          href="[Google Plus Link]"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaGooglePlusG className="social-icon" />
                        </a>
                      </div>
                    </div>
                  </li>
                </ul>
                <form className="subscribe-form" action="#">
                  <div>
                    <p className="update">
                      Stay updated with the latest movies
                    </p>
                  </div>

                  <input type="text" placeholder="Email Address" />
                  <button>
                    <FaTelegramPlane />
                  </button>
                </form>
              </div>
            </section>

            {/* Social Media Handles Section */}
          </div>
        </div>

        {/* Copyright Section */}
        <div className="copyright">
          <p>&copy; 2024 Movie Reel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
