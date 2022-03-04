import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getPairedCoin } from '../../redux/helpers/api_functions';

export default function TokenDistribution(props) {
  const [cst_coin, CSTCoin] = useState([]);
  const { token } = useSelector((state) => state.AuthReducer.user);
  useEffect(() => {
      getPairedCoin("get","cst_coin",token).then((data) => {
          CSTCoin(data);
      })
  }, [])
  return (
    <>
      <section className="token-distribution section-padding-100-85">
        <div className="container">
          <div className="section-heading text-center">
            {/* <!-- Dream Dots --> */}
            <div
              className="dream-dots justify-content-center fadeInUp"
              data-wow-delay="0.2s"
            >
              <span>ICO Distribution</span>
            </div>
            <h2 className="fadeInUp" data-wow-delay="0.3s">
              Our ICO Distribution
            </h2>
            <p className="fadeInUp" data-wow-delay="0.4s">
            {cst_coin.currency_coin} Token distribution plan
            </p>
          </div>

          <div className="row align-items-center">
            <div className="col-lg-6 col-sm-12">
              <div className=" ">
                <h2
                  className="text-center mb-30 fadeInUp"
                  data-wow-delay="0.3s"
                >
                  Funds Allocation
                </h2>
                <img
                  src="/img/tokenomics.png"
                  className="center-block"
                  height="595"
                  alt=""
                />
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 mt-s">
              <h2 className="text-center mb-30 fadeInUp" data-wow-delay="0.3s">
                Token Distribution
              </h2>
              <div className="row">
                <div className="col-sm-4">
                  {/* <div className="">
                    <img
                      src="/img/core-img/graph-11.png"
                      className="center-block"
                      alt=""
                    />
                  </div> */}
                </div>
                <div className="col-sm-8">
                  <div className="token-info">
                    <div className="info-wrapper one">
                      <div className="token-icon">10%</div>
                      <div className="token-descr">Private Sale</div>
                    </div>
                  </div>
                  <div className="token-info">
                    <div className="info-wrapper two">
                      <div className="token-icon">10%</div>
                      <div className="token-descr">Affiliate </div>
                    </div>
                  </div>

                  <div className="token-info">
                    <div className="info-wrapper four">
                      <div className="token-icon">40%</div>
                      <div className="token-descr">Public Sale</div>
                    </div>
                  </div>
                  <div className="token-info">
                    <div className="info-wrapper five">
                      <div className="token-icon">20%</div>
                      <div className="token-descr"> Exchange</div>
                    </div>
                  </div>
                  <div className="token-info">
                    <div className="info-wrapper three">
                      <div className="token-icon">2%</div>
                      <div className="token-descr">Airdrop</div>
                    </div>
                  </div>
                  <div className="token-info">
                    <div className="info-wrapper six">
                      <div className="token-icon">8%</div>
                      <div className="token-descr">Stacking</div>
                    </div>
                  </div>
                  <div className="token-info">
                    <div className="info-wrapper seven">
                      <div className="token-icon">10%</div>
                      <div className="token-descr">Gamification</div>
                    </div>
                  </div>
                  {/* <div className="token-info">
                    <div className="info-wrapper eight">
                      <div className="token-icon">27</div>
                      <div className="token-descr"> Paltform Operations</div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="roadmap section-padding-0-0" id="roadmap">
        <div className="section-heading text-center">
          {/* <!-- Dream Dots --> */}
          <div
            className="dream-dots justify-content-center fadeInUp"
            data-wow-delay="0.2s"
          >
            <span>ICO Roadmap</span>
          </div>
          <h2 className="fadeInUp" data-wow-delay="0.3s">
            Our ICO Roadmap
          </h2>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <img src="/img/roadmap.png" height="100" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
