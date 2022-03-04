import React, { useEffect, useState } from "react";
import { N_getSupportedCurrency } from "../../redux/helpers/api_functions_new";

export default function AirDrop(props) {
  const [cst_coin, CSTCoin] = useState([]);
  useEffect(() => {
    N_getSupportedCurrency()
      .then((d) => {
        console.log("gpc: ", d);
        d.map((item) => {
          if (item.paired_with === "is_paired_vrx") {
            CSTCoin(item);
          }
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <section className="container">
      <div className="subscribe section-padding-0-0">
        <div className="row">
          <div className="col-sm-12">
            <div className="subscribe-wrapper">
              <div className="section-heading text-center">
                <h2
                  className="wow fadeInUp"
                  data-wow-delay="0.3s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.3s",
                    animationName: "fadeInUp",
                  }}
                >
                  Don’t {cst_coin.currency_coin} Air drop
                </h2>
                <p
                  className="wow fadeInUp"
                  data-wow-delay="0.4s"
                  style={{
                    visibility: "visible",
                    animationDelay: "0.4s",
                    animationName: "fadeInUp",
                  }}
                >
                  {" "}
                  Engagged with {cst_coin.currency_coin} community on social
                  platform and collect your free profitable airdrop.
                </p>
              </div>
              <div className="service-text text-center">
                <div className="subscribe-section has-shadow">
                  <div className="input-wrapper">
                    <img src="/img/bg-img/bnb.png" width="15px" />
                    <input
                      type="text"
                      placeholder="0x2C9973d619d2............"
                    />
                  </div>
                  <button className="btn more-btn">CLAIM</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
