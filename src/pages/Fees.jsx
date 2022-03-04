import React, { useEffect } from "react";
import ProfileSidebar from "./components/ProfileSidebar";
import Header from "./components/Header";
import Switch from "react-switch";
import { N_getSupportedCurrency } from "./redux/helpers/api_functions_new";

export default function Fees(props) {
  const [get_cstcoin, setcstCoin] = React.useState(0);
  const [set_enable, setEnable] = React.useState(0);
  useEffect(() => {
    N_getSupportedCurrency()
      .then((d) => {
        // console.log("gpc: ", d);
        d.map((item) => {
          if (item.paired_with === "is_paired_vrx") {
            setcstCoin(item);
          }
        });
      })
      .catch((e) => {
        console.log(e);
      });
   
  }, []);
  return (
    <div>
      <Header {...props} />
      <div className="row p-1 " style={{ margin: 0, marginTop: "5em" }}>
        <div className="col-12 col-md-3 col-lg-3 p-0">
          <ProfileSidebar {...props} />
        </div>
        <div
          className="col-12 col-md-8 col-lg-8 p-0"
          style={{ marginTop: "12px" }}
        >
          <div className="p-2 theme-color my-sidebox-shadow">
            <div className="main-profile-pro d-flex align-items-center bb-1 h-25">
              <i className="fa fa-inr ml-2 mr-2 mt-2" />
              <h4 className="px-2 font-weight-bold pt-3"> Fee</h4>
            </div>
            <article>
              <div className="col-md-10">
                <div className="sanfont ">
                  <div className="bold mb-2">
                    Pay trading fees with {get_cstcoin.currency_coin}
                  </div>
                  <div className="float-right">
                    <Switch
                      onChange={(e) => setEnable(set_enable ? 0 : 1)}
                      checked={set_enable}
                    />
                  </div>
                  <div className="text-secondary">
                    Enable this option to pay trading fees with:{" "}
                  </div>
                  <ul className="text-secondary mb-2">
                    <li className="ml-3">
                      <i className="fa fa-minus mr-1" aria-hidden="true"></i>{" "}
                      {get_cstcoin.currency_coin} you buy from the exchange
                    </li>
                    <li className="ml-3">
                      <i className="fa fa-minus mr-1" aria-hidden="true"></i>{" "}
                      Unlocked {get_cstcoin.currency_coin} balance reserved for
                      trading fees
                    </li>
                  </ul>
                  <div className="text-secondary">
                    <b>Note:</b> You'll get 50% discount if you pay fees via{" "}
                    {get_cstcoin.currency_coin}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
