import React from "react";
import { useSelector } from "react-redux";
import "./p2p.css";

export default function StaticUSDPage(props) {
  const { paired_curency_price } = useSelector((state) => state.coinDBReducer);
  const { webData } = useSelector((state) => state.websiteDBReducer);
  return (
    <>
      <div
        className={`${webData.bg_color} mt-2 mt-md-0 mt-lg-0`}
        style={{ backgroundColor: webData.bg_color_code }}
      >
        <div className="usdt_design1 btn-theme-color">
          <div className="usdt_design2 "> RBC / INR </div>
          <div className="mdfthemetxt usdt_design3 light-theme-color">
            &#8377;{" "}
            {paired_curency_price ? paired_curency_price.RBC.toFixed(5) : "0"}{" "}
          </div>
        </div>
        <div className="">
          <div className="dtue4">P2P Market</div>
          <div className="dtue3">
            Use {webData.website_title} P2P when you want to buy USDT to trade
            cryptos, or when you want to sell USDT and cash out to INR. It's
            safe and hassle free!
          </div>
          <div className="dtue3">How it works</div>
          <div content="How it works" className="dtue2"></div>
          <img
            src="../img/how-it-works.png"
            alt="how-it-works"
            className="dtue00"
          ></img>
        </div>
      </div>
    </>
  );
}
