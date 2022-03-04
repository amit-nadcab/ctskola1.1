import React from "react";

export default function OurTeam(props) {
  return (
    <section className="our_team_area section-padding-100-0 clearfix" id="team">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-heading text-center">
              {/* <!-- Dream Dots --> */}
              <div
                className="dream-dots justify-content-center fadeInUp"
                data-wow-delay="0.2s"
              >
                <span>Our Team</span>
              </div>
              <h2 className="fadeInUp" data-wow-delay="0.3s">
                BLOCKCHAIN EXPLORER
              </h2>
              <p className="fadeInUp" data-wow-delay="0.4s">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                quis accumsan nisi Ut ut felis congue nisl hendrerit commodo.
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          {/* <!-- Single Team Member --> */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="single-team-member fadeInUp" data-wow-delay="0.2s">
              {/* <!-- Image --> */}
              <div className="team-member-thumb">
                <img src="/img/team-img/1.png" className="center-block" alt="" />
              </div>
              {/* <!-- Team Info --> */}
              <div className="team-info">
                <h5 className="w-text">AMAN VATHS</h5>
                <p className="g-text">Executive Officer</p>
              </div>
              {/* <!-- Social Icon --> */}
              <div className="team-social-icon">
                <a href="#">
                  <i className="fa fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>

          {/* <!-- Single Team Member --> */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="single-team-member fadeInUp" data-wow-delay="0.3s">
              {/* <!-- Image --> */}
              <div className="team-member-thumb">
                <img src="/img/team-img/2.png" className="center-block" alt="" />
              </div>
              {/* <!-- Team Info --> */}
              <div className="team-info">
                <h5 className="w-text">WAZID KHAN</h5>
                <p className="g-text">Business Development</p>
              </div>
              {/* <!-- Social Icon --> */}
              <div className="team-social-icon">
                <a href="#">
                  <i className="fa fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>

          {/* <!-- Single Team Member --> */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="single-team-member fadeInUp" data-wow-delay="0.4s">
              {/* <!-- Image --> */}
              <div className="team-member-thumb">
                <img src="/img/team-img/3.png" className="center-block" alt="" />
              </div>
              {/* <!-- Team Info --> */}
              <div className="team-info">
                <h5 className="w-text">Josha Michal</h5>
                <p className="g-text">UX/UI Designer</p>
              </div>
              {/* <!-- Social Icon --> */}
              <div className="team-social-icon">
                <a href="#">
                  <i className="fa fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>

          {/* <!-- Single Team Member --> */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="single-team-member fadeInUp" data-wow-delay="0.5s">
              {/* <!-- Image --> */}
              <div className="team-member-thumb">
                <img src="/img/team-img/4.png" className="center-block" alt="" />
              </div>
              {/* <!-- Team Info --> */}
              <div className="team-info">
                <h5 className="w-text">Johan Wright</h5>
                <p className="g-text">Head of Marketing</p>
              </div>
              {/* <!-- Icon --> */}
              <div className="team-social-icon">
                <a href="#">
                  <i className="fa fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
