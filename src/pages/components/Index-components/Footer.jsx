import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Footer(props) {
  const { webData } = useSelector((state) => state.websiteDBReducer);
  return (
    <footer
      className="footer-area bg-img"
      style={{ backgroundImage: "url(img/core-img/pattern.png)" }}
    >
      <div
        className={`${webData.bg_color} footer-content-area `}
        style={{ backgroundColor: webData.bg_color_code }}
      >
        <div className="container">
          <div className="row ">
            <div className="col-12 col-lg-4 col-md-6">
              <div className="footer-copywrite-info">
                {/* <!-- Copywrite --> */}
                <div className="copywrite_text fadeInUp" data-wow-delay="0.2s">
                  <div className="footer-logo">
                    <div>
                      <img
                        className="oppbacktheme logodesign"
                        src={`${"/theme/img/" + webData.logo_img_name}`}
                        alt="logo"
                        style={{ width: "200px" }}
                      />
                    </div>
                  </div>
                </div>
                {/* <!-- Social Icon --> */}
                <div
                  className="footer-social-info fadeInUp"
                  data-wow-delay="0.4s"
                >
                  <div className="mr-2">
                    <i className="fa fa-facebook ml-3" aria-hidden="true"></i>
                  </div>
                  <div className="mr-2">
                    <i className="fa fa-twitter ml-3" aria-hidden="true"></i>
                  </div>
                  <div className="mr-2">
                    <i
                      className="fa fa-google-plus ml-3"
                      aria-hidden="true"
                    ></i>
                  </div>
                  <div className="mr-2">
                    <i className="fa fa-instagram ml-3" aria-hidden="true"></i>
                  </div>
                  <div className="mr-2">
                    <i className="fa fa-linkedin ml-3" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-3 col-md-6">
              <div className="contact_info_area d-sm-flex justify-content-between">
                {/* <!-- Content Info --> */}
                <div
                  className="contact_info mt-x text-center fadeInUp"
                  data-wow-delay="0.3s"
                >
                  <h5>ICO Checker</h5>

                  <a
                    href="https://forms.gle/T1wda46DDpMGQ2YZ8"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <p>ICO AIRDROP</p>
                  </a>
                  <p>COIN CLARITY</p>
                  <p>TOKEN MARKET</p>
                  <p>ICO ALERT</p>
                  <p>ICO WATCHLIST</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-2 col-md-6 ">
              {/* <!-- Content Info --> */}
              <div className="contact_info_area d-sm-flex justify-content-between">
                <div
                  className="contact_info mt-s text-center fadeInUp"
                  data-wow-delay="0.2s"
                >
                  <h5>TOKEN Checker</h5>
                    <p>Poocoin</p>
                    <p>Pancake</p>
                    <p>Binance Smart Chain</p>
                    <p>{webData.website_title} EXCHANGE</p>
                    <p>Connect</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-3 col-md-6 ">
              <div className="contact_info_area d-sm-flex justify-content-between">
                {/* <!-- Content Info --> */}
                <div
                  className="contact_info mt-s text-center fadeInUp"
                  data-wow-delay="0.4s"
                >
                  <h5>EXCHANGE </h5>
                  <p>Buy BTF</p>
                  <p>
                    <Link to="/exchange/btc-inr"> BUY BITCOIN (BTC) </Link>
                  </p>
                  <p>
                    <Link to="/exchange/eth-inr"> BUY ETHEREUM (ETH) </Link>
                  </p>
                  <p>
                    <a href="https://forms.gle/AmQNvPtK782WzqBPA">
                      LIST YOUR TOKEN
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
