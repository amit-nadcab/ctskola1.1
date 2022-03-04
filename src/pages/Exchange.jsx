import React, { useEffect } from "react";
import ExSide from "./components/ExSide";
import Header from "./components/Header";
import OrdersTab from "./components/Orders.tab";
import CandleGraph from "./components/CandleGraph";
import BuyNSell from "./components/BuyNSell";
import Preloader from "./components/PreLoader";
import TradeTab from "./Trade.Tab";
import OrderSystemTab from "./Order.system.tab";
import "./exchange.css";
import { useSelector } from "react-redux";
import Footer from "./HomeComp/Footer";

export default function Exchange(props) {
  const { webData } = useSelector((state) => state.websiteDBReducer);
  const {
    coins_loading,
    wallet_loading,
    pending_order_loading,
    close_order_loading,
    user_fav_loading,
    coins,
  } = useSelector((state) => state.coinDBReducer);
  const { isLoggedIn } = useSelector((state) => state.AuthReducer);
  const [loading, setLoading] = React.useState(true);
  if (!props?.match?.params?.id) props.history.replace("/exchange/btc-inr");
  useEffect(() => {
    let match = 1;
    const browser_currency_pair = props?.match?.params?.id.split("-");
    let vll = Object.values(coins);

    if (vll.length) {
      console.log("vll: ", vll, browser_currency_pair);
      vll.forEach((item) => {
        // console.log("not inr",browser_currency_pair[1].toUpperCase(), item.symbol);
        if (item.symbol === browser_currency_pair[0].toUpperCase()) {
          if (browser_currency_pair[1].toUpperCase() !== "INR") {
            vll.forEach((it) => {
              if (it.symbol === browser_currency_pair[1].toUpperCase()) {
                match = 0;
              }
            });
          } else {
            match = 0;
          }
        }
      });
      if (match === 1) {
        props.history.replace("/exchange/btc-inr");
      }
      // if (!coins) {
      //   let nurl = vll[0]
      //     ? vll[0].symbol + "-" + vll[0]?.pairing_currency
      //     : "btc-inr";
      //   props.history.replace("/exchange/btc-inr");
      // }
      if (isLoggedIn) {
        if (
          coins_loading == false &&
          wallet_loading == false &&
          pending_order_loading == false &&
          close_order_loading == false &&
          user_fav_loading == false
        )
          document.title =
            props?.match?.params?.id?.toUpperCase() +
            " " +
            webData.website_title +
            " Exchange";
        setLoading(false);
      } else {
        if (coins_loading == false) setLoading(false);
      }
    }
  }, [coins_loading, wallet_loading, coins.length, user_fav_loading]);

  return (
    <>
      <Header {...props} />

      {loading ? (
        <Preloader />
      ) : (
        <div className="row p-3" style={{ marginTop: "4.5em" }}>
          <div className="col-12 col-md-3 col-lg-2 p-1">
            <ExSide {...props} />
          </div>

          <div className="col-12 col-md-7 col-lg-7 p-1">
            <CandleGraph {...props} />
            <div className="row" style={{ margin: "5px -2px" }}>
              <div className="col-12 col-lg-8 col-md-8 px-1">
                <OrderSystemTab {...props} />
              </div>
              <div className="col-12 col-lg-4 col-md-4 px-1 overflow-hidden">
                <TradeTab {...props} />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-3 col-lg-3 p-1">
            <div>
              <OrdersTab {...props} />
            </div>
            <div style={{ marginTop: "10px" }}>
              <BuyNSell {...props} />
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
