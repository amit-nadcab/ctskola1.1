import React, { useEffect } from "react";
import Header from "./components/Header";
import OrdersTab from "./components/Orders.tab";
import P2PBuyNSell from "./components/p2pBuyNSell";
import Preloader from "./components/PreLoader";
import TradeTab from "./Trade.Tab";
import OrderSystemTab from "./Order.system.tab";
import XidOrders from "./XidOrders";
import StaticUSDPage from "./components/StaticUSDPage";
import "./exchange.css";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./components/Index-components/Footer";

export default function P2P(props) {
  const { coins_loading, pending_order_loading, close_order_loading, coins } =
    useSelector((state) => state.coinDBReducer);
  const { isLoggedIn } = useSelector((state) => state.AuthReducer);
  const [loading, setLoading] = React.useState(true);
  const { webData } = useSelector((state) => state.websiteDBReducer);
  useEffect(() => {
    document.title = props?.match?.params?.id?.toUpperCase() + " P2P";
    if (Object.values(coins).length) {
      if (isLoggedIn) {
        if (
          coins_loading == false &&
          pending_order_loading == false &&
          close_order_loading == false
        )
          setLoading(false);
      } else {
        if (coins_loading == false) setLoading(false);
      }
    }
  }, [coins_loading, pending_order_loading, close_order_loading, coins.length]);
  return (
    <>
      <Header {...props} />
      {loading ? (
        <Preloader />
      ) : (
        <div className="row p-3" style={{ marginTop: "4.5em" }}>
          <div className="col-12 col-md-8 col-lg-8 p-1">
            <div className="row" style={{ margin: "5px -2px" }}>
              <div className=" col-12 col-lg-6 col-md-8 px-1">
                <OrderSystemTab {...props} type="p2p" />
              </div>
              <div className="col-12 col-lg-6 col-md-4 px-1">
                <TradeTab {...props} type="p2p" />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 col-lg-4 p-1">
            <div className="row" style={{ margin: "5px -2px" }}>
              <div className=" col-12 col-lg-12 col-md-12 px-1">
                <StaticUSDPage {...props} />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-8 col-lg-8 p-1">
            <div className="row" style={{ margin: "5px -2px" }}>
              <div className=" col-12 col-lg-6 col-md-8 px-1">
                <XidOrders {...props} type="p2p"/>
              </div>
              <div className="col-12 col-lg-6 col-md-4 px-1">
                <OrdersTab {...props} type="p2p" />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 col-lg-4 p-1">
            <div className="row" style={{ margin: "5px -2px" }}>
              <div className=" col-12 col-lg-12 col-md-12 px-1">
                <P2PBuyNSell {...props} type="p2p" />
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
