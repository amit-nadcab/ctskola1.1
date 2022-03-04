import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getPairedCoin } from '../../redux/helpers/api_functions';

export default function OurFeature(props) {
  const { webData } = useSelector((state) => state.websiteDBReducer);
  const [cst_coin, CSTCoin] = useState([]);
  const { token } = useSelector((state) => state.AuthReducer.user);
  useEffect(() => {
      getPairedCoin("get","cst_coin",token).then((data) => {
          CSTCoin(data);
      })
  }, [])
  return (
    <>
      <section className="join-us section-padding-0-100 clearfix" id="services">
        <div className="container">
          <div className="section-heading text-center hidden-lg">
            {/* <!-- Dream Dots --> */}
            <div
              className="dream-dots justify-content-center fadeInUp"
              data-wow-delay="0.2s"
            >
              <span>Our Services</span>
            </div>
            <h2 className="fadeInUp" data-wow-delay="0.3s">
              What we speciaized in
            </h2>
            <p className="fadeInUp" data-wow-delay="0.4s">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis
              accumsan nisi Ut ut felis congue nisl hendrerit commodo.
            </p>
          </div>

          <div className="row dark-row pt-60">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="contribution-c-wapper has-arrow-right-lg has-arrow-top-md has-arrow-right-md has-arrow-down-sm">
                {/* <!-- Content --> */}
                <div
                  className="service_single_content text-center mb-30 fadeInUp"
                  data-wow-delay="0.2s"
                >
                  {/* <!-- Icon --> */}
                  <div className="cycle_icon">
                    <span className="gradient-t orange">1</span>
                  </div>
                  <h6>Creative Chart Modules</h6>
                  <p>
                    {webData.website_title} create tradeingview custom chart library on the basis
                    of OHLCV data and provide realtime chart data of all
                    cryptocurrency with their possible pairing currency.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 mt-sm-30">
              <div className="contribution-c-wapper has-arrow-right-lg has-arrow-bottom-md has-arrow-down-sm">
                <div
                  className="service_single_content text-center mb-30 fadeInUp"
                  data-wow-delay="0.3s"
                >
                  {/* <!-- Icon --> */}
                  <div className="cycle_icon">
                    <span className="gradient-t pink">2</span>
                  </div>
                  <h6>Faster Trade Engine</h6>
                  <p>
                    {webData.website_title} Trade engine has power to excute real time trade with
                    matching all buying selling market trade ,in case of
                    nonmatch byppass on liquidity pool .
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 mt-s">
              <div className="contribution-c-wapper has-arrow-top-md has-arrow-down-sm">
                <div
                  className="service_single_content text-center mb-30 fadeInUp"
                  data-wow-delay="0.4s"
                >
                  {/* <!-- Icon --> */}
                  <div className="cycle_icon">
                    <span className="gradient-t blue">3</span>
                  </div>
                  <h6>Coinnode Embedded</h6>
                  <p>
                    Exchange has use all blockchain coin and token node for
                    secure, cheaper and faster transaction. Wallet mananageent
                    is easy on deposit and withdrwal.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 hidden-md hidden-sm hidden-xs">
              <img
                src="/img/svg/join-bottom.svg"
                className="arrow-img rotated"
                alt=""
              />
            </div>
            <div className="col-lg-4 text-center hidden-md hidden-sm hidden-xs">
              <div
                className="dream-dots justify-content-center fadeInUp"
                data-wow-delay="0.2s"
              >
                <span>Join us</span>
              </div>
              <h2 className="fadeInUp" data-wow-delay="0.3s">
                {webData.website_title} EXCHANGE PROPERTY
              </h2>
            </div>
            <div className="col-lg-4 hidden-md hidden-sm hidden-xs">
              <img src="/img/svg/join-bottom.svg" className="arrow-img" alt="" />
            </div>

            <div className="col-12 col-md-6 col-lg-4 mt-30">
              <div className="contribution-c-wapper has-arrow-left-lg has-arrow-bottom-md has-arrow-down-sm">
                {/* <!-- Content --> */}
                <div
                  className="service_single_content text-center mb-30 fadeInUp"
                  data-wow-delay="0.2s"
                >
                  {/* <!-- Icon --> */}
                  <div className="cycle_icon">
                    <span className="gradient-t green">6</span>
                  </div>
                  <h6>Multiple Fiat currency</h6>
                  <p>
                    {webData.website_title} exchange used multiple fiat currency for trade value
                    and wallet value but provide only INR pair for buy sell.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 mt-30">
              <div className="contribution-c-wapper has-arrow-left-lg has-arrow-left-md has-arrow-down-sm">
                <div
                  className="service_single_content text-center mb-30 fadeInUp"
                  data-wow-delay="0.3s"
                >
                  {/* <!-- Icon --> */}
                  <div className="cycle_icon">
                    <span className="gradient-t green">5</span>
                  </div>
                  <h6>Easy P2P Trade</h6>
                  <p>
                  {webData.website_title} also provide service of p2p trade inside exchange
                    where system will play role of midiator on trade.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 mt-30">
              <div className="contribution-c-wapper ">
                <div
                  className="service_single_content text-center mb-30 fadeInUp"
                  data-wow-delay="0.4s"
                >
                  {/* <!-- Icon --> */}
                  <div className="cycle_icon">
                    <span className="gradient-t pink">4</span>
                  </div>
                  <h6>Token Launchpad</h6>
                  <p>
                    Exchange will also have a token launchpad for those who want
                    launch thier coin or token on the market.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="trust-section section-padding-0-70">
        <div className="section-heading text-center">
          {/* <!-- Dream Dots --> */}
          <div
            className="dream-dots justify-content-center wow fadeInUp"
            data-wow-delay="0.2s"
            style={{
              visibility: "visible",
              animationDelay: "0.2s",
              animationName: "fadeInUp",
            }}
          >
            <span>ICO Rating</span>
          </div>
          <h2
            className="wow fadeInUp"
            data-wow-delay="0.3s"
            style={{
              visibility: "visible",
              animationDelay: "0.3s",
              animationName: "fadeInUp",
            }}
          >
            We are trusted
          </h2>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6 col-md-3">
              {/* <!-- Single Cool Fact --> */}
              <div
                className="trust-item text-center wow fadeInUp"
                data-wow-delay="0.2s"
                style={{
                  visibility: "visible",
                  animationDelay: "0.2s",
                  animationName: "fadeInUp",
                }}
              >
                <div className="ico-platform-logo">
                  <div className="card-title">DOWNLOAD TRUSTWALLET</div>
                  <div className="card-body">
                   Visit TRUSTWALLET.COM & download the application. The
                    app is secure and widely used in the DeFi market. Remember
                    never share seed phrase!
                  </div>
                </div>
                {/* <!-- Single Cool Detail --> */}
              </div>
            </div>

            <div className="col-6 col-md-3">
              {/* <!-- Single Cool Fact --> */}
              <div
                className="trust-item text-center wow fadeInUp"
                data-wow-delay="0.3s"
                style={{
                  visibility: "visible",
                  animationDelay: "0.3s",
                  animationName: "fadeInUp",
                }}
              >
                <div className="ico-platform-logo">
                  <div className="card-title">FUND YOUR WALLET</div>
                  <div className="card-body">
                    Purchase BNB for txn fee and BUSD of Binance Smart Chain
                    fund your wallet. BUSD coins are used for purchasing BTF
                    Token.
                  </div>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3">
              {/* <!-- Single Cool Fact --> */}
              <div
                className="trust-item text-center wow fadeInUp"
                data-wow-delay="0.4s"
                style={{
                  visibility: "visible",
                  animationDelay: "0.4s",
                  animationName: "fadeInUp",
                }}
              >
                <div className="ico-platform-logo">
                  <div className="card-title">BUY {cst_coin.currency_coin} TOKEN</div>
                  <div className="card-body">
                    Visit {webData.website_name} go buy section set BUSD amount that will
                    used for purchase {cst_coin.currency_coin} Token . Authenticate Dapp Wallet and
                    wait for txn confirmation.
                  </div>
                </div>
                {/* <!-- Single Cool Detail --> */}
              </div>
            </div>

            <div className="col-6 col-md-3">
              {/* <!-- Single Cool Fact --> */}
              <div
                className="trust-item text-center wow fadeInUp"
                data-wow-delay="0.5s"
                style={{
                  visibility: "visible",
                  animationDelay: "0.5s",
                  animationName: "fadeInUp",
                }}
              >
                <div className="ico-platform-logo">
                  <div className="card-title">SELL AFFILIATE INCOME TOKEN</div>
                  <div className="card-body">
                    Affiliate Income will be available for sale on current price
                    of token . BUSD will be received against token on your same
                    wallet.
                  </div>
                </div>
                {/* <!-- Single Cool Detail --> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- ##### Our Services Area Start ##### --> */}
      <section
        className="our_services_area section-padding-0-0 clearfix"
        id="services"
      >
        <div className="container">
          <div className="section-heading text-center">
            {/* <!-- Dream Dots --> */}
            <div
              className="dream-dots justify-content-center fadeInUp"
              data-wow-delay="0.2s"
            >
              <span>Why choose us</span>
            </div>
            <h2 className="fadeInUp" data-wow-delay="0.3s">
              Our Main Features
            </h2>
          </div>

          <div className="row">
            <div className="col-12 col-md-6 col-lg-3">
              {/* <!-- Content --> */}
              <div
                className="service_single_content text-center mb-100 fadeInUp"
                data-wow-delay="0.2s"
              >
                {/* <!-- Icon --> */}
                <div className="service_icon">
                  <img src="/img/features/feature-1.svg" alt="" />
                </div>
                <h6>Instant settlement</h6>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              {/* <!-- Content --> */}
              <div
                className="service_single_content text-center mb-100 fadeInUp"
                data-wow-delay="0.3s"
              >
                {/* <!-- Icon --> */}
                <div className="service_icon">
                  <img src="/img/features/feature-2.svg" alt="" />
                </div>
                <h6>Flexibility</h6>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              {/* <!-- Content --> */}
              <div
                className="service_single_content text-center mb-100 fadeInUp"
                data-wow-delay="0.4s"
              >
                {/* <!-- Icon --> */}
                <div className="service_icon">
                  <img src="/img/features/feature-3.svg" alt="" />
                </div>
                <h6>Blockchain technology</h6>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              {/* <!-- Content --> */}
              <div
                className="service_single_content text-center mb-100 fadeInUp"
                data-wow-delay="0.5s"
              >
                {/* <!-- Icon --> */}
                <div className="service_icon">
                  <img src="/img/features/feature-4.svg" alt="" />
                </div>
                <h6>Experienced team</h6>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              {/* <!-- Content --> */}
              <div
                className="service_single_content text-center mb-100 fadeInUp"
                data-wow-delay="0.6s"
              >
                {/* <!-- Icon --> */}
                <div className="service_icon">
                  <img src="/img/features/feature-5.svg" alt="" />
                </div>
                <h6>Connect free</h6>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              {/* <!-- Content --> */}
              <div
                className="service_single_content text-center mb-100 fadeInUp"
                data-wow-delay="0.7s"
              >
                {/* <!-- Icon --> */}
                <div className="service_icon">
                  <img src="/img/features/feature-6.svg" alt="" />
                </div>
                <h6>AI matching</h6>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              {/* <!-- Content --> */}
              <div
                className="service_single_content text-center mb-100 fadeInUp"
                data-wow-delay="0.7s"
              >
                {/* <!-- Icon --> */}
                <div className="service_icon">
                  <img src="/img/features/feature-7.svg" alt="" />
                </div>
                <h6>Low cost</h6>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              {/* <!-- Content --> */}
              <div
                className="service_single_content text-center mb-100 fadeInUp"
                data-wow-delay="0.7s"
              >
                {/* <!-- Icon --> */}
                <div className="service_icon">
                  <img src="/img/features/feature-8.svg" alt="" />
                </div>
                <h6>Digital personas</h6>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features section-padding-0-100 ">
        <div className="container">
          <div className="section-heading text-center">
            {/* <!-- Dream Dots --> */}
            <div
              className="dream-dots justify-content-center fadeInUp"
              data-wow-delay="0.2s"
              style={{
                visibility: "visible",
                animationDelay: "0.2s",
                animationName: "fadeInUp",
              }}
            ></div>
            <h2
              className="fadeInUp"
              data-wow-delay="0.3s"
              style={{
                visibility: "visible",
                animationDelay: "0.3s",
                animationName: "fadeInUp",
              }}
            >
              {cst_coin.currency_coin} TOKENOMICS
            </h2>
            <p
              className="fadeInUp"
              data-wow-delay="0.4s"
              style={{
                visibility: "visible",
                animationDelay: "0.4s",
                animationName: "fadeInUp",
              }}
            >
              {cst_coin.currency_coin} community have launched unique {webData.website_title} EXCHANGE TOKEN that have
              have unique economics structure
            </p>
          </div>
          <div className="row align-items-center">
            <div className="service-img-wrapper col-lg-5 col-md-12 col-sm-12 no-padding-right">
              <div className="features-list">
                <div className="who-we-contant">
                  <h4 className="w-text fadeInUp" data-wow-delay="0.3s">
                    Powerful platform.
                  </h4>
                  <p className="w-text fadeInUp" data-wow-delay="0.4s">
                    We are dedicated to providing professional service with the
                    highest degree of honesty and integrity, and strive to add
                    value to our tax and consulting services.
                  </p>
                </div>
                <ul className="list-marked">
                  <li className="text-white">
                    <i className="fa fa-check"></i>Competent Professionals
                  </li>
                  <li className="text-white">
                    <i className="fa fa-check"></i>Affordable Prices
                  </li>
                  <li className="text-white">
                    <i className="fa fa-check"></i>High Successful Recovery
                  </li>
                  <li className="text-white">
                    <i className="fa fa-check"></i>Creative Layout
                  </li>
                </ul>
                <a
                  className="btn more-btn mt-30 fadeInUp"
                  data-wow-delay="0.6s"
                  href="#"
                >
                  Read More
                </a>
              </div>
            </div>

            <div className="service-img-wrapper col-lg-7 col-md-12 col-sm-12 mt-s">
              <div className="image-box">
                <img
                  src="/img/core-img/platform.png"
                  className="center-block img-responsive phone-img"
                  alt=""
                />
                <img
                  src="/img/core-img/rings.png"
                  className="center-block img-responsive rings "
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features section-padding-0-70 ">
        <div className="container">
          <div className="section-heading text-center">
            {/* <!-- Dream Dots --> */}
            <div
              className="dream-dots justify-content-center fadeInUp"
              data-wow-delay="0.2s"
              style={{
                visibility: "visible",
                animationDelay: "0.2s",
                animationName: "fadeInUp",
              }}
            ></div>
            <h2
              className="fadeInUp"
              data-wow-delay="0.3s"
              style={{
                visibility: "visible",
                animationDelay: "0.3s",
                animationName: "fadeInUp",
              }}
            >
              {cst_coin.currency_coin} Token Prices
            </h2>
            <p
              className="fadeInUp"
              data-wow-delay="0.4s"
              style={{
                visibility: "visible",
                animationDelay: "0.4s",
                animationName: "fadeInUp",
              }}
            >
              {cst_coin.currency_coin} community had made a secret algorythm for token public sale
              that will boost token price on public sale life cycle.
            </p>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-3 col-sm-6 col-xs-12">
              <div className="pricing-item ">
                <h4>Cycle 1</h4>
                <h3>
                  <strong className="xzc-1-month">0.0125$</strong>
                </h3>
                {/* <span>1 BNB = 500 Token</span>  */}
                <div className="pricing">500,000 Token</div>
                <label>
                  <strong>5% Dividend</strong>
                </label>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-xs-12">
              <div className="pricing-item ">
                <h4>Cycle 10</h4>
                <h3>
                  <strong className="xzc-1-month">0.125$</strong>
                </h3>
                {/* <span>1 ETH = 500 Token</span>  */}
                <div className="pricing">200,000 Token</div>
                <label>
                  <strong>5% Dividend</strong>
                </label>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-xs-12">
              <div className="pricing-item ">
                <h4>Cycle 100</h4>
                <h3>
                  <strong className="xzc-1-month">1.25$</strong>
                </h3>
                {/* <span>1 ETH = 500 Token</span>  */}
                <div className="pricing">200,000 Token</div>
                <label>
                  <strong>5% Dividend</strong>
                </label>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 col-xs-12">
              <div className="pricing-item ">
                <h4>Last cycle </h4>
                <h3>
                  <strong className="xzc-1-month">3.6252$</strong>
                </h3>
                {/* <span>1 ETH = 500 Token</span>  */}
                <div className="pricing">50,000 Token</div>
                <label>
                  <strong>5% Dividend</strong>
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
