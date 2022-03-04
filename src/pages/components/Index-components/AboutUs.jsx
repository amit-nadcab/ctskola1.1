import React from "react";
import {useSelector } from "react-redux";

export default function AboutUs(props) {
  const { webData } = useSelector((state) => state.websiteDBReducer);
  return (
    <section className="about-us-area section-padding-100 clearfix">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-lg-6 offset-lg-0 col-md-12 no-padding-left">
            <div className="welcome-meter fadeInUp" data-wow-delay="0.7s">
              <img src="/img/core-img/about-1.png" alt="" />
            </div>
          </div>

          <div className="col-12 col-lg-6 offset-lg-0">
            <div className="who-we-contant mt-s">
              <div className="dream-dots text-left fadeInUp" data-wow-delay="0.2s">
                <span className="gradient-text ">{webData.website_title} Trading Platform</span>
              </div>
              <p className="fadeInUp" data-wow-delay="0.4s">
                {webData.website_title} Community as a digital user-focused trading platform is
                revolutionary. The aim is to bring cryptocurrency and various
                blockchain services to global users through an efficiently
                designed and easy-to-use trading interface.
              </p>
              <a
                className="btn more-btn mt-30 fadeInUp"
                data-wow-delay="0.6s"
                href="#"
              >
                ENTER
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
