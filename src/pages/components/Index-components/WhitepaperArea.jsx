import React from "react";
import {useSelector } from "react-redux";

export default function WhitepaperArea(props) {
  const { webData } = useSelector((state) => state.websiteDBReducer);
  return (
    <section className="spread-map download">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-xs-12">
            <div className="welcome-meter fadeInUp" data-wow-delay="0.7s">
              <img
                src="/img/core-img/whitepaper.png"
                className="center-block"
                alt=""
              />
            </div>
          </div>
          <div className="col-lg-6 col-xs-12 mt-s">
            <div className="who-we-contant">
              <div
                className="dream-dots text-left fadeInUp"
                data-wow-delay="0.2s"
                style={{
                  visibility: "visible",
                  animationDelay: "0.2s",
                  animationName: "fadeInUp",
                }}
              >
                <img src="/img/svg/section-icon-11.svg" alt="" />
              </div>
              <h4 className="text-white fadeInUp" data-wow-delay="0.3s">
                Downoad Our Whitepaper
              </h4>
              <p className="text-white">
                Download and view {webData.website_title} Whitepaper and Roadmap
              </p>
              <a
                className="btn dream-btn mt-30 fadeInUp"
                data-wow-delay="0.6s"
                href='docs/whitepaper.pdf'
                target="_blank"
              >
                Get Whitepaper
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
