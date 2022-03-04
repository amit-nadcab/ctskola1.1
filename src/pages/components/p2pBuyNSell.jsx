import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NotificationManager } from "react-notifications";
import {
  N_createBuyOffer,
  N_createSellOffer,
} from "../redux/helpers/api_functions_new";
import {
  getUserOrder
} from "../redux/actions/coinDBAction";
import "./p2p.css";
export default function P2PBuyNSell(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(props.activeTab || 0);
  const [atPrice, setATPrice] = React.useState(0);
  const [amount, setAmount] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [stopLimit, setStoplimit] = React.useState(0);
  const coin = props.match.params.id.split("-");
  const { isLoggedIn, user } = useSelector((state) => state.AuthReducer);
  const { wallet, paired_curency_price } = useSelector((state) => state.coinDBReducer);
  const { webData } = useSelector((state) => state.websiteDBReducer);
  let price = paired_curency_price?paired_curency_price.RBC:0
  let [time, settime] = React.useState(0);

  useEffect(() => {
    if (price && time === 0) {
      setATPrice(price.toFixed(8));
      settime(1);
    }
  }, [price, wallet, time]);

  function buyCoin(atPrice, amount, c, cp) {
    if (!isLoggedIn) {
      NotificationManager.error("First login then perform buy/sell");
      return false;
    }
    setLoading(true);
    N_createBuyOffer(
      atPrice,
      amount,
      c,
      cp,
      user?.params ? user.params.user_id : user.user_id,
      props.type
    )
      .then((d) => {
        if (d.status === 200) {
          dispatch(
            getUserOrder(user?.params ? user.params.user_id : user.user_id)
          );

          NotificationManager.info(d.message);
        } else if (d.status === 400) {
          NotificationManager.error(d.message);
        }
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function sellCoin(atPrice, amount, c, cp) {
    if (!isLoggedIn) {
      NotificationManager.error("First login then perform buy/sell");
      return false;
    }
    setLoading(true);
    N_createSellOffer(
      atPrice,
      amount,
      c,
      cp,
      user?.params ? user.params.user_id : user.user_id,
      props.type
    )
      .then((d) => {
        if (d.status === 200) {
          dispatch(
            getUserOrder(user?.params ? user.params.user_id : user.user_id)
          );
          NotificationManager.info(d.message);
        } else if (d.status === 400) {
          NotificationManager.error(d.message);
        }
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <>
      <div
        className={webData.bg_color}
        style={{ backgroundColor: webData.bg_color_code, boxShadow:"0px 0px 2px rgba(0,0,0,0.2)" }}
      >
        <nav style={{ border: "0.3px solid #ffffff33" }}>
          <div className="nav nav-tabs d-flex" id="nav-tab" role="tablist">
            <div
              className={`nav-item nav-link ${activeTab === 0 ? "active" : ""}`}
              id="nav-home-tab"
              data-toggle="tab"
              role="tab"
              onClick={() => setActiveTab(0)}
              aria-controls="nav-home"
              aria-selected="true"
              style={{ flex: 0.5 }}
            >
              Buy
            </div>
            <div
              className={`nav-item nav-link buy ${
                activeTab === 1 ? "active" : ""
              }`}
              id="nav-profile-tab"
              data-toggle="tab"
              onClick={() => setActiveTab(1)}
              role="tab"
              aria-controls="nav-profile"
              aria-selected="false"
              style={{ flex: 0.5 }}
            >
              Sell
            </div>
          </div>
        </nav>
        <div className="tab-content theme-color" style={{ minHeight: "300px" }}>
          <div
            className={`tab-pane fade ${activeTab === 0 ? "show active" : ""}`}
            id="open-order"
          >
            <div className="offset-7 col-5 py-3">
              <select
                className="custom-select inpdesign buy-sell-form-bg buy-sell-theme buy-sell-form-bg buy-sell-theme"
                value={stopLimit}
                onChange={(e) => setStoplimit(e.target.value)}
              >
                <option value={0}>Limit</option>
                <option value={1}>Stop Limit</option>
              </select>
            </div>
            <div className="p-3">
              {stopLimit === 1 ? (
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text itdesign buy-sell-form-bg buy-sell-theme">
                      STOP PRICE
                      <br />
                      INR
                    </span>
                  </div>
                  <input
                    type="number"
                    className="form-control inpdesign buy-sell-form-bg buy-sell-theme"
                    value="0"
                  />
                </div>
              ) : null}
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text itdesign buy-sell-form-bg buy-sell-theme">
                    AT PRICE
                    <br />
                    {coin[1].toUpperCase()}
                  </span>
                </div>
                <input
                  type="number"
                  className="form-control inpdesign buy-sell-form-bg buy-sell-theme"
                  value={atPrice}
                  readOnly
                  onChange={(e) => {
                    setATPrice(atPrice);
                    setTotal(atPrice * amount);
                  }}
                  style={{borderRight:"none"}}
                />
                <div className="input-group-append buy-sell-form-bg">
                  <button
                    className="btn low-price"
                    type="button"
                    style={{
                      backgroundColor: "transparent",
                      borderLeft:"none",
                      fontSize: "13px",
                    }}
                  >
                    Lowest Price
                  </button>
                </div>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text itdesign buy-sell-form-bg buy-sell-theme">
                    AMOUNT
                    <br />
                    {coin[0].toUpperCase()}
                  </span>
                </div>
                <input
                  type="number"
                  className="form-control inpdesign buy-sell-form-bg buy-sell-theme"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setTotal(e.target.value * atPrice);
                  }}
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text itdesign buy-sell-form-bg buy-sell-theme">
                    TOTAL AMT
                    <br />
                    {coin[1].toUpperCase()}
                  </span>
                </div>
                <input
                  type="number"
                  className="form-control inpdesign buy-sell-form-bg buy-sell-theme "
                  value={total}
                  onChange={(e) => {
                    setAmount(e.target.value / atPrice);
                    setTotal(e.target.value);
                  }}
                />
              </div>
              <button
                className="btn btn-success btn-block my-2"
                disabled={loading}
                onClick={() => {
                  buyCoin(atPrice, amount, coin[0], coin[1]);
                }}
              >
                {loading ? (
                  <i className="loading-icon fas fa-spinner fa-spin mr-2"></i>
                ) : null}
                BUY {coin[0].toUpperCase()}
              </button>
              <div className="px-3 m-0">
                Fee: Maker fee: 0.2% | Taker fee: 0.2%
              </div>
            </div>
          </div>
          <div
            id="order-history"
            className={`tab-pane fade ${activeTab === 1 ? "show active" : ""}`}
          >
            <div className="offset-7 col-5 py-3">
              <select className="custom-select inpdesign buy-sell-form-bg buy-sell-theme">
                <option value="0" selected>
                  Limit
                </option>
                <option value="1">Stop Limit</option>
              </select>
            </div>
            <div className="p-3">
              {stopLimit === 1 ? (
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text itdesign buy-sell-form-bg buy-sell-theme">
                      STOP PRICE
                      <br />
                      INR
                    </span>
                  </div>
                  <input
                    type="number"
                    className="form-control inpdesign buy-sell-form-bg buy-sell-theme"
                    value="0"
                  />
                </div>
              ) : null}
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text itdesign buy-sell-form-bg buy-sell-theme">
                    AT PRICE
                    <br />
                    {coin[1].toUpperCase()}
                  </span>
                </div>
                <input
                  type="number"
                  className="form-control inpdesign buy-sell-form-bg buy-sell-theme"
                  value={atPrice}
                  onChange={(e) => {
                    setATPrice(atPrice);
                    setTotal(atPrice * amount);
                  }}
                  style={{borderRight:"none"}}
                />
                <div className="input-group-append buy-sell-form-bg">
                  <button
                    className="btn high-price"
                    type="button"
                    style={{
                      backgroundColor: "transparent",
                      // borderColor: "#5f5d84",
                      fontSize: "13px",
                    }}
                  >
                    Highest Price
                  </button>
                </div>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text itdesign buy-sell-form-bg buy-sell-theme">
                    AMOUNT
                    <br />
                    {coin[0].toUpperCase()}
                  </span>
                </div>
                <input
                  type="number"
                  className="form-control inpdesign buy-sell-form-bg buy-sell-theme"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setTotal(e.target.value * atPrice);
                  }}
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text itdesign buy-sell-form-bg buy-sell-theme">
                    TOTAL AMT
                    <br />
                    {coin[1].toUpperCase()}
                  </span>
                </div>
                <input
                  type="number"
                  className="form-control inpdesign buy-sell-form-bg buy-sell-theme"
                  value={total}
                  onChange={(e) => {
                    setAmount(e.target.value / atPrice);
                    setTotal(e.target.value);
                  }}
                />
              </div>
              <button
                className="btn btn-danger btn-block my-2"
                disabled={loading}
                onClick={() => {
                  sellCoin(atPrice, amount, coin[0], coin[1]);
                }}
              >
                {loading ? (
                  <i className="loading-icon fas fa-spinner fa-spin mr-2"></i>
                ) : null}
                SELL {coin[0].toUpperCase()}
              </button>
              <div className="px-3 m-0">
                Fee: Maker fee: 0.2% | Taker fee: 0.2%
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
