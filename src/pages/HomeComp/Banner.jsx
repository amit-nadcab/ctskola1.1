import React from "react";
import { useSelector } from "react-redux";
import AOS from 'aos';
import 'aos/dist/aos.css';




export default function Banner(props) {
  AOS.init({duration:1000})
  const { coins } = useSelector((state) => state.coinDBReducer);
  let coins1 = Object.values(coins);

  const banner_child = coins1 && coins1.map((item, index) => {
    let usdtprize = coins1 && coins1.find((item) => item.symbol == 'USDT');
    return (
      <>
        {item.symbol == 'BTC' || item.symbol == 'BNB' || item.symbol == 'ETH' || item.symbol == 'TRX' || item.symbol == 'RBC' ?
          <div className="col-lg-2 col-md-4 mx-sm-3 col-sm-12" key={index}>
            <div className="card border-0" style={{ backgroundColor: "#1E2738" }}>
              <div className="card-body">
                <p className="text-light">
                  {item.symbol}/USDT&nbsp;&nbsp;
                  <span className={item.direction_inr == 'up' ? "text-success font-weight-bold" : "text-danger font-weight-bold"} >{item.price_change_percentage_1h_inr}%</span>
                </p>
                <h5 style={{ color: '#fff' }}>${(item.raw_current_price_inr / usdtprize.raw_current_price_inr).toFixed(8)}</h5>
              </div>
            </div>
          </div>
          : ''}
      </>
    )
  })
  return (
    <>
    <div className="wrap-2 " >
      <div
        className="container text-dark p-0 m-0 mx-auto"
        style={{ background: "white" }}
      >
        <div className="row m-0 banner">
          <div className="col-12 col-md-6 py-5 bannerLeft" style={{ margin: "auto" }}>
            <div>
              <h2 className="bannertxt text-light">Buy & sell Crypto</h2>
              <p style={{ fontWeight: "600", color: "#CDCFD4", fontSize:"16px" }}>
                The Highly Efficient exchange for stable and secure Trade.
              </p>
            </div>
            <a
              className="btn bannerBtn text-light py-2 my-3"
            /*   style={{
                padding: "0px 60px",
                backgroundColor: "#04DA9A",
              }} */
              href="/login"
            >
              Register Now
            </a>
          </div>
          
              <div className="bannerRight col-12 col-md-6 d-flex justify-content-center align-items-center">
                <img className="bannerImg " src="../img/Pro-Max.png" alt="" />
                <div className = "img-1 position-absolute" data-aos="fade-right">
                <img src="../img/mobile/Group-22.svg" className="img-fluid" alt="" />
                </div>
                <div className="img-2 position-absolute" data-aos="fade-right">
                  <img src="../img/mobile/Group-23-1.svg" className="img-fluid" alt="" />
                </div>
                <div className="img-3 position-absolute" data-aos="fade-left">
                <img src="../img/mobile/Group-24.svg" className="img-fluid" alt="" />
                </div>
                
                
              </div>
          {/* <div className="col-lg-6 col-sm-12 "></div> */}
        </div>
      </div>

      <div
        className="container-fluid text-dark"
        style={{ background: "#141A28"}}
      >
        <div className="row py-5 text-center d-flex justify-content-center"  data-aos="zoom-in-right">
          {banner_child}
        </div>
      </div>
      </div>
    </>
  );
}
