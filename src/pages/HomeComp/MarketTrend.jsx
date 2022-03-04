import React from "react";
import { useSelector } from "react-redux";
import { BsArrowUpShort } from 'react-icons/all'
import { BsArrowDownShort } from 'react-icons/all'
import { FcSalesPerformance, BiGitCompare, HiCubeTransparent } from 'react-icons/all'
import Card from './Card';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function MarketTrend() {
  AOS.init()
  const { coins } = useSelector((state) => state.coinDBReducer);
  let coins1 = Object.values(coins);
  // console.log(coins1)
  const market_child = coins1 && coins1.map((item, index) => {
    let usdtprize = coins1 && coins1.find((item) => item.symbol == 'USDT');
    return (
      <>
        {item.symbol == 'BTC' || item.symbol == 'BNB' || item.symbol == 'ETH' || item.symbol == 'TRX' || item.symbol == 'RBC' ?
          <tr
            style={{
              fontSize: "20px",
              height: "80px",
              //  lineHeight: "80px"
            }}
          >
            <td className="px-2">
              <img src={item.icon} alt="coin symbole" className="px-3 img-fluid" style={{ width: "50px" }} />
              {item.symbol}&nbsp;&nbsp;&nbsp;
              <span className="text-secondary">{item.name}</span>
            </td>
            <td>${(item.raw_current_price_inr / usdtprize.raw_current_price_inr).toFixed(8)}</td>
            <td><span className={item.direction_inr === 'up' ? "text-success " : "text-danger"}>{item.price_change_percentage_1h_inr}% {item.direction_inr === 'up' ? <BsArrowUpShort /> : <BsArrowDownShort />}</span></td>
          </tr>
          : ''}
      </>
    )
  })
  return (
    <>
      <div className="wrap-4" style={{ background: "#141A28" }}>
        <div className="container text-light py-5" /* style={{ background: "#141A28" }} */>
          <h2 className="text-center py-4">Market Trend</h2>
          <div className="row d-flex justify-content-between" data-aos="fade-up">
            <div className="col-lg-12 col-md-12 col-sm-12 table-responsive">
              <table
                className=" text-light table-sm"
                style={{ width: "100%", margin: 'auto', borderRadius: "20px", background: "#1E2738" }}
              >
                <tbody>
                  <tr
                    style={{
                      fontSize: "13px",
                      height: "80px",
                      // lineHeight: "80px",
                      borderBottom: "1px solid white",

                    }}
                  >
                    <td style={{ fontSize: "20px", fontWeight: "600", paddingLeft: "20px" }}>Name</td>
                    <td style={{ fontSize: "20px", fontWeight: "600" }}> Last Price</td>
                    <td style={{ fontSize: "20px", fontWeight: "600" }}>24h Change</td>
                  </tr >
                  {market_child}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-5" style={{ background: "#141A28" }}>
        <div className="container mx-auto">
          <h2 className="text-center py-4">Ctskola Key Features</h2>
          <div className="row d-flex align-center justify-content-center">
            <div className="col-lg-4 col-md-6 col-12 d-flex justify-content-center" data-aos="zoom-in-up">
              <Card title="Real-Time Price"
                content="Find the crypto data you need  whether you’re looking to trade on a new to the exchange, invest in a fresh currency."
                comp={<FcSalesPerformance style={{ fontSize: "3rem", color: "#CB9615" }} className="m-3" />} />
            </div>
            <div className="col-lg-4 col-md-6 col-12 d-flex justify-content-center" data-aos="zoom-in-up">
              <Card title="Comparisons"
                content="Find the crypto data you need  whether you’re looking to trade on a new to the exchange, invest in a fresh currency."
                comp={<BiGitCompare style={{ fontSize: "3rem", color: "#CB9615" }} className="m-3" />} />
            </div>
            <div className="col-lg-4 col-md-6 col-12 d-flex justify-content-center" data-aos="zoom-in-up">
              <Card title="Transparent"
                content="Find the crypto data you need  whether you’re looking to trade on a new to the exchange, invest in a fresh currency."
                comp={<HiCubeTransparent style={{ fontSize: "3rem", color: "#CB9615" }} className="m-3" />} />
            </div>
          </div>
        </div>
      </div>

    </>
  );
}