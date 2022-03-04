import React from "react";
import { Link } from "react-router-dom";
import {useSelector } from "react-redux";

export default function Footer(props) {
  const { webData } = useSelector((state) => state.websiteDBReducer);
  return (
    <section
      className="awesome-feature-area section_padding_0_50 clearfix footer-pro"
      id="footer"
    >
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-6 col-lg-4">
            <div className="single-feature">
              <Link className="navbar-brand" to="/">
                <img className="logo_height" src="/img/logo2.png" alt="logo" />
              </Link>
            </div>
            <div className="footer_social-media">
              <a href="#" target="_blank">
                <img
                  className="footer_social-media-icon"
                  src="/img/facebook.svg"
                  alt="Facebook icon"
                />
              </a>
              <a href="#" target="_blank">
                <img
                  className="footer_social-media-icon"
                  src="/img/twitter.svg"
                  alt="Twitter icon"
                />
              </a>
              <a href="#" target="_blank">
                <img
                  className="footer_social-media-icon"
                  src="/img/linkedin.svg"
                  alt="LinkedIn icon"
                />
              </a>
            </div>
            <p className="footer_copy-large">
              Let's talk: <br />
              <a className="footer_contact" href={`"mailto:"+${webData.info_email}`}>
              {webData.info_email}
              </a>
            </p>
          </div>
          <div className="col-12 col-sm-6 col-lg-4">
            <div className="single-feature footer_menu">
              <h4 className="footer_heading">Menu</h4>
              <ul className="footer_menu-list">
                <li className="footer_menu-list-item">
                  <a className="footer_menu-list-item-link" href="" target="_blank">
                  {webData.website_title}
                  </a>
                </li>
                <li className="footer_menu-list-item">
                  <a className="footer_menu-list-item-link" href="https://docs.google.com/forms/d/e/1FAIpQLSdVd4_U6k-Czp6uTnSnCRVKQQ29zvfU0XLb7Oxz2thrp-c9vQ/viewform?usp=sf_link" target="_blank">
                    List Your Token
                  </a>
                </li>
                <li className="footer_menu-list-item">
                  <a className="footer_menu-list-item-link" href="" target="_blank">
                    Wallets
                  </a>
                </li>
                <li className="footer_menu-list-item">
                  <a className="footer_menu-list-item-link" href="" target="_blank">
                    Security
                  </a>
                </li>
                <li className="footer_menu-list-item">
                  <a className="footer_menu-list-item-link" href="" target="_blank">
                    Regulations
                  </a>
                </li>
                <li className="footer_menu-list-item">
                  <a className="footer_menu-list-item-link" href="" target="_blank">
                    Contact us
                  </a>
                </li>
                <li className="footer_menu-list-item">
                  <a className="footer_menu-list-item-link" href="" target="_blank">
                    Terms of use
                  </a>
                </li>
                <li className="footer_menu-list-item">
                  <a className="footer_menu-list-item-link" href="" target="_blank">
                    Privacy policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-4">
            <div className="single-feature footer_menu">
              <h4 className="footer_heading">SUBMIT FOR UPDATES</h4>
              <p className="footer__copy footer__description">
                Subscribe to get updates and notifications about our exchange
                and products.
              </p>
              <form className="newsletter__input-wrapper" method="POST">
                <div className="form-group">
                  <label className="form-input__label" htmlFor="footerMailchimpEmail">
                    <div className="form-input__input-wrapper form-input__input-wrapper--type-email">
                      <input
                        type="email"
                        className="form-input__input newsletter__input"
                        id="footerMailchimpEmail"
                        name="EMAIL"
                        readOnly
                        placeholder="Email address"
                        value=""
                      />
                    </div>
                  </label>
                </div>
                <button
                  type="submit"
                  className="g-button newsletter__input-submit"
                  value="Subscribe"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                ></button>
              </form>
            </div>
          </div>
        </div>
        <hr className="footer__divider" />
        <div className="footer__info-wrapper">
          <div className="footer__info">
            <p className="footer__copyright footer__copy--small">
              Copyright © 2021
            </p>
          </div>
          <div>
            <span>Language: </span>
            <span className="footer__language" role="button" tabIndex="0">
              English
            </span>
            <span className="footer__language" role="button" tabIndex="0">
              Polish
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
