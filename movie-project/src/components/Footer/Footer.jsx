import React from "react"
import { FaLinkedin, FaGithub, FaTelegramPlane } from "react-icons/fa"
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
                          href="https://github.com/Mukoni-Nemauluma"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaGithub className="social-icon" />
                        </a>
                        <a
                          href="https://www.linkedin.com/in/konanani-charity-nemauluma-600267147/" //replace with your socials
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaLinkedin className="social-icon" />
                        </a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="developer-info">
                      <p>Konanani Nemauluma</p>
                      <div className="social-icons">
                        <a
                          href="https://github.com/Mukoni-Nemauluma"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaGithub className="social-icon" />
                        </a>
                        <a
                          href="https://www.linkedin.com/in/konanani-charity-nemauluma-600267147/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaLinkedin className="social-icon" />
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
