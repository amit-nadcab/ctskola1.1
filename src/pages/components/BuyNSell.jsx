import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NotificationManager } from "react-notifications";
import { GiWallet } from "react-icons/gi";
import {
  createBuyOffer,
  createSellOffer,
} from "../redux/helpers/api_functions";
import {
  getOrderBook,
  getTradeHist,
  getUserBalance,
  getUserOrder,
} from "../redux/actions/coinDBAction";
import {
  N_createBuyOffer,
  N_createSellOffer,
  N_get_wallet,
} from "../redux/helpers/api_functions_new";
import createSocketClient from "../redux/helpers/socket";
import {
  BUY_MARKET_PRICE,
  SELL_MARKET_PRICE,
  SET_BUY_ORDER_BOOK,
  SET_ORDER_BOOK,
  SET_SELL_ORDER_BOOK,
  SET_TRADE_HISTORY,
} from "../redux/constant";
// import socket from "../redux/helpers/events";

export default function BuyNSell(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(props.activeTab || 0);
  const [atPrice, setATPrice] = React.useState(0);
  const [wallet_balance, setWalletBalance] = React.useState(0);
  const [currency_balance, setCurrencyBalance] = React.useState(0);
  const [amount, setAmount] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [stopLimit, setStoplimit] = React.useState(0);
  const [total_inr, setTotalInr] = React.useState(0);
  const [wallet_details, setWalletDetails] = React.useState([]);
  const [buybalance, setbuybalance] = React.useState(0);
  const [sellbalance, setsellbalance] = React.useState(0);
  const coin = props?.match?.params?.id
    ? props.match.params.id.split("-")
    : "btc-inr".split("-");
  const { isLoggedIn, user } = useSelector((state) => state.AuthReducer);
  const { token } = useSelector((state) => state.AuthReducer.user);
  const { coins, wallet, paired_curency_price } = useSelector(
    (state) => state.coinDBReducer
  );
  let current_coin = coins[(coin[0] + coin[1]).toUpperCase()];
  const { webData } = useSelector((state) => state.websiteDBReducer);
  const { buymarket, sellmarket } = useSelector((state) => state.coinDBReducer);
  const [price, setprice] = React.useState(0);
  let time = 0;

  function setCurrentBuySellTokenBalance() {
    wallet_details.map((item, i) => {
      if (item.symbol === coin[1].toUpperCase()) {
        setbuybalance(item.avl_balance);
      } else if (item.symbol === coin[0].toUpperCase()) {
        setsellbalance(item.avl_balance);
      }
    });
  }

  function getCurrentBuySellTokenBalance() {
    N_get_wallet(user?.params ? user.params.user_id : user.user_id)
      .then((d) => {
        if (d.status === 200) {
          let total = 0;
          let final_data = Object.keys(d.params.wallets).map((res, i) => {
            let rate = getCoinRate(res, coin[1]);
            let inr_val =
              Math.round(rate * d.params.wallets[res]?.balance * 1000) / 1000;
            // console.log(
            //   "coin rates: ",
            //   inr_val,
            //   rate,
            //   d.params.wallets[res]?.balance
            // );
            total = total + parseFloat(inr_val);
            return {
              id: d.params.wallets[res]?.id,
              icon: d.params.wallets[res]?.icon,
              symbol: d.params.wallets[res]?.symbol.toUpperCase(),
              name: d.params.wallets[res]?.name,
              status: d.params.wallets[res]?.status,
              withdral_fee: d.params.wallets[res]?.withdrawal_fee,
              locked:
                Math.round(d.params.wallets[res]?.locked * 10000) / 10000 != 0
                  ? Math.round(
                      Math.abs(
                        d.params.wallets[res]?.locked
                          ? d.params.wallets[res]?.locked
                          : 0
                      ) * 10000
                    ) / 10000
                  : Math.round(d.params.wallets[res]?.locked * 100000000) /
                    100000000,
              address: d.params.wallets[res]?.wallet_address,
              balance:
                Math.round(d.params.wallets[res]?.balance * 10000) / 10000 != 0
                  ? Math.round(d.params.wallets[res]?.balance * 10000) / 10000
                  : Math.round(d.params.wallets[res]?.balance * 100000000) /
                    100000000,
              avl_balance:
                Math.round(d.params.wallets[res]?.available * 10000) / 10000 !=
                0
                  ? Math.round(
                      (d.params.wallets[res]?.balance -
                        d.params.wallets[res]?.locked) *
                        10000
                    ) / 10000
                  : Math.round(
                      (d.params.wallets[res]?.balance -
                        d.params.wallets[res]?.locked) *
                        100000000
                    ) / 100000000,
              inr_balance: inr_val,
            };
          });
          setWalletDetails(final_data);
          setTotalInr(total);
          // console.log("fdata: ", final_data);
          setTimeout(() => setLoading(false), 800);
        } else {
          console.log(d);
        }
      })
      .catch((e) => {
        console.log("er", e);
      });
  }

  useEffect(() => {
    setCurrentBuySellTokenBalance();
  }, [coin, wallet_details]);

  useEffect(() => {
    Object.values(coins)?.map((d, i) => {
      if (d.symbol === coin[0].toUpperCase()) {
        setprice(
          Number(d.current_price_inr) /
            Number(
              paired_curency_price
                ? paired_curency_price[coin[1].toUpperCase()]
                  ? paired_curency_price[coin[1].toUpperCase()]
                  : 1
                : 1
            )
        );
      }
    });
  });

  useEffect(() => {
    const socket = new createSocketClient("kujgwvfq-a-ghosttown-z-1fhhup0p6");
    socket.on("buy_order_updated", (res) => {
      // console.log("buy_order_updated: ", res);
      dispatch({
        type: SET_BUY_ORDER_BOOK,
        data: res,
        order_book_loading: false,
      });
    });
    // socket.on("welcome", (msg) => {
    //   console.log("Welcome message", msg);
    // });
    socket.on("sell_order_updated", (res) => {
      // console.log("sell_order_updated: ", res);
      dispatch({
        type: SET_SELL_ORDER_BOOK,
        data: res,
        order_book_loading: false,
      });
    });
    socket.on("order_history_updated", (res) => {
      // console.log("order_history_updated", res);
      dispatch({ type: SET_TRADE_HISTORY, data: res, trade_loading: false });
    });
    // socket.on("connect", () => {
    //   console.log("connected!");
    // });
    // socket.on("error", (eror) => {
    //   console.log("eror", eror);
    // });
  }, []);

  useEffect(() => {
    let coin_wallet = Object.values(wallet)?.find((d) => {
      if (d.symbol == coin[0].toUpperCase()) return d;
    });
    let currency_wallet = Object.values(wallet)?.find((d) => {
      if (d.symbol == coin[1].toUpperCase()) return d;
    });
    // console.log("wallet", coin_wallet, currency_wallet);
    if (price && time == 0) {
      setATPrice(price.toFixed(8));
      // console.log("price", price);
      time = 1;
    }
    setWalletBalance(coin_wallet?.available);
    setCurrencyBalance(currency_wallet?.available);
  }, [price, wallet]);

  function getCoinRate(coin, currency) {
    let coins1 = Object.values(coins);
    // console.log("coins: ",coins1);
    let res = coins1.find((d) => d.symbol === coin.toUpperCase());
    return res?.current_price_inr ? res.current_price_inr : 0;
  }

  useEffect(() => {
    getCurrentBuySellTokenBalance();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setInterval(() => {
        getCurrentBuySellTokenBalance();
        dispatch(
          getUserOrder(user?.params ? user.params.user_id : user.user_id)
        );
      }, 10000);
    }, 10000);
  }, []);

  useEffect(() => {
    // dispatch({
    //   type: SELL_MARKET_PRICE,
    //   data: {
    //     marketprice: 0,
    //     marketvolume: 0,
    //     active: 0,
    //   },
    // });
    setActiveTab(buymarket.active);
    setATPrice(Number(buymarket.marketprice));
    setAmount(Number(buymarket.marketvolume));
    setTotal(Number(buymarket.marketvolume) * Number(buymarket.marketprice));
  }, [buymarket]);

  useEffect(() => {
    // dispatch({
    //   type: BUY_MARKET_PRICE,
    //   data: {
    //     marketprice: 0,
    //     marketvolume: 0,
    //     active: 0,
    //   },
    // });
    setATPrice(Number(sellmarket.marketprice));
    setAmount(Number(sellmarket.marketvolume));
    setTotal(Number(sellmarket.marketvolume) * Number(sellmarket.marketprice));
    setActiveTab(sellmarket.active);
  }, [sellmarket]);

  function buyCoin(atPrice, amount, c, cp) {
    setLoading(true);
    N_createBuyOffer(
      atPrice,
      amount,
      c,
      cp,
      user?.params ? user.params.user_id : user.user_id
    )
      .then((d) => {
        if (d.status == 200) {
          // console.log("res buy: ", d);
          getCurrentBuySellTokenBalance();
          dispatch(
            getUserOrder(user?.params ? user.params.user_id : user.user_id)
          );

          NotificationManager.success(d.message);
        } else if (d.status == 400) {
          // console.log("res buy: ", d);
          getCurrentBuySellTokenBalance();
          dispatch(
            getUserOrder(user?.params ? user.params.user_id : user.user_id)
          );
          NotificationManager.success(d.message);
        }

        // dispatch(getUserOrder(token));
        // dispatch(getUserBalance(token));
        // dispatch(getOrderBook(coin[0], coin[1], () => {}));
        // dispatch(getTradeHist(coin[0], coin[1], () => {}));
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
    // createBuyOffer(atPrice, amount, c, cp, token)
    //   .then((d) => {
    //     if (d.status == 0) {
    //       NotificationManager.error(d.msg);
    //     } else if (d.status == 1) {
    //       NotificationManager.info(d.msg);
    //     }
    //     dispatch(getUserOrder(token));
    //     dispatch(getUserBalance(token));
    //     dispatch(getOrderBook(coin[0], coin[1], () => {}));
    //     dispatch(getTradeHist(coin[0], coin[1], () => {}));
    //     setLoading(false);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  }

  function sellCoin(atPrice, amount, c, cp) {
    setLoading(true);
    // console.log("buy user: ", user);
    N_createSellOffer(
      atPrice,
      amount,
      c,
      cp,
      user?.params ? user.params.user_id : user.user_id
    )
      .then((d) => {
        if (d.status == 200) {
          // console.log("res sell: ", d);
          getCurrentBuySellTokenBalance();
          dispatch(
            getUserOrder(user?.params ? user.params.user_id : user.user_id)
          );
          NotificationManager.success(d.message);
        } else if (d.status == 400) {
          // console.log("res sell: ", d);
          getCurrentBuySellTokenBalance();
          dispatch(
            getUserOrder(user?.params ? user.params.user_id : user.user_id)
          );
          NotificationManager.success(d.message);
        }
        // dispatch(getUserOrder(token));
        // dispatch(getUserBalance(token));
        // dispatch(getOrderBook(coin[0], coin[1], () => {}));
        // dispatch(getTradeHist(coin[0], coin[1], () => {}));
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  let wallet_coin;

  switch (coin[1]) {
    case "inr":
      wallet_coin = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 8,
        maximumSignificantDigits: 8,
      }).format(currency_balance ? currency_balance : 0);
      break;
    case "usdt":
      wallet_coin = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 8,
        maximumSignificantDigits: 8,
      }).format(currency_balance ? currency_balance : 0);
      break;
    case "btc":
      wallet_coin = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "BTC",
        maximumFractionDigits: 8,
        maximumSignificantDigits: 8,
      }).format(currency_balance ? currency_balance : 0);
      break;
    default:
      wallet_coin = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 8,
        maximumSignificantDigits: 8,
      }).format(currency_balance ? currency_balance : 0);
  }

  return (
    <>
      <nav
        className={`${webData.bg_color}`}
        style={{ border: "0.3px solid #ffffff33" }}
      >
        <div className="nav nav-tabs d-flex" id="nav-tab" role="tablist">
          <a
            className={`nav-item nav-link p-0  ${
              activeTab == 0 ? "active" : ""
            }`}
            id="nav-home-tab"
            data-toggle="tab"
            role="tab"
            onClick={() => setActiveTab(0)}
            aria-controls="nav-home"
            aria-selected="true"
            style={{ flex: 0.5, height: "30px", lineHeight: "30px" }}
          >
            Buy
          </a>
          <a
            className={`nav-item nav-link buy p-0 ${
              activeTab == 1 ? "active" : ""
            }`}
            id="nav-profile-tab"
            data-toggle="tab"
            onClick={() => setActiveTab(1)}
            role="tab"
            aria-controls="nav-profile"
            aria-selected="false"
            style={{ flex: 0.5, height: "30px", lineHeight: "30px" }}
          >
            Sell
          </a>
        </div>
      </nav>
      <div
        className={`${webData.bg_color}` + " tab-content "}
        style={{ minHeight: "300px", backgroundColor: webData.bg_color_code }}
      >
        {/* buy tab         */}

        <div
          className={`tab-pane fade ${activeTab == 0 ? "show active" : ""}`}
          id="open-order"
        >
          <div className="offset-7 col-5 py-5">
            <select
              className="custom-select bg-light text-secondary border buy-sell-form-bg buy-sell-theme d-none"
              value={stopLimit}
              onChange={(e) =>
                setStoplimit(
                  e.target.value
                    .replace(/[^0-9.]/g, "")
                    .replace(/(\..*?)\..*/g, "$1")
                )
              }
              style={{
                borderColor: "#cacacc",
              }}
            >
              <option value={0}>Limit</option>
              <option value={1}>Stop Limit</option>
            </select>
          </div>
          <div className="p-3">
            {stopLimit === 1 ? (
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text buy-sell-form-bg buy-sell-theme"
                    style={{
                      fontSize: "10px",
                      // backgroundColor: "#162538a6",
                      // color: "#fff",
                      borderColor: "#cacacc",
                    }}
                  >
                    STOP PRICE
                    <br />
                    INR
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control buy-sell-form-bg buy-sell-theme"
                  value="0"
                  style={{
                    // backgroundColor: "#162538a6",
                    // color: "#fff",
                    borderColor: "#cacacc",
                  }}
                />
              </div>
            ) : null}
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span
                  className="input-group-text buy-sell-form-bg buy-sell-theme"
                  style={{
                    fontSize: "10px",
                    // backgroundColor: "white",
                    // color: "#fff",
                    borderColor: "#cacacc",
                  }}
                >
                  AT PRICE
                  <br />
                  {coin[1].toUpperCase()}
                </span>
              </div>
              <input
                type="text"
                className="form-control buy-sell-form-bg buy-sell-theme"
                value={atPrice}
                onChange={(e) => {
                  setATPrice(
                    e.target.value
                      .replace(/[^0-9.]/g, "")
                      .replace(/(\..*?)\..*/g, "$1")
                  );
                  setTotal(
                    e.target.value
                      .replace(/[^0-9.]/g, "")
                      .replace(/(\..*?)\..*/g, "$1") * amount
                  );
                }}
                style={{
                  // backgroundColor: "#162538a6",
                  // color: "#fff",
                  borderColor: "#cacacc",
                  borderRight: "none",
                }}
              />
              <div className="input-group-append">
                <button
                  className="btn text-success buy-sell-form-bg low-price"
                  type="button"
                  style={{
                    borderLeft: "none",
                    fontSize: "13px",
                  }}
                >
                  Lowest Price
                </button>
              </div>
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span
                  className="input-group-text buy-sell-form-bg buy-sell-theme"
                  style={{
                    fontSize: "10px",
                    // backgroundColor: "white",
                    // color: "#fff",
                    borderColor: "#cacacc",
                  }}
                >
                  AMOUNT
                  <br />
                  {coin[0].toUpperCase()}
                </span>
              </div>
              <input
                type="text"
                className="form-control buy-sell-form-bg buy-sell-theme"
                value={amount}
                onChange={(e) => {
                  setAmount(
                    e.target.value
                      .replace(/[^0-9.]/g, "")
                      .replace(/(\..*?)\..*/g, "$1")
                  );
                  setTotal(
                    e.target.value
                      .replace(/[^0-9.]/g, "")
                      .replace(/(\..*?)\..*/g, "$1") * atPrice
                  );
                }}
                style={{
                  // backgroundColor: "#162538a6",
                  // color: "#fff",
                  borderColor: "#cacacc",
                }}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span
                  className="input-group-text buy-sell-form-bg buy-sell-theme"
                  style={{
                    fontSize: "10px",
                    // backgroundColor: "white",
                    // color: "#fff",
                    borderColor: "#cacacc",
                  }}
                >
                  TOTAL AMT
                  <br />
                  {coin[1].toUpperCase()}
                </span>
              </div>
              <input
                type="text"
                className="form-control buy-sell-form-bg buy-sell-theme"
                value={total}
                onChange={(e) => {
                  setAmount(
                    e.target.value
                      .replace(/[^0-9.]/g, "")
                      .replace(/(\..*?)\..*/g, "$1") / atPrice
                  );
                  setTotal(
                    e.target.value
                      .replace(/[^0-9.]/g, "")
                      .replace(/(\..*?)\..*/g, "$1")
                  );
                }}
                style={{
                  // backgroundColor: "#162538a6",
                  // color: "#fff",
                  borderColor: "#cacacc",
                }}
              />
            </div>
            <div className="row px-3 mb-1">
              <div
                className="col-6 pl-1"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {/* <i className="fas fa-wallet px-2"></i> */}
                <span className="mx-2" title="wallet">
                  <GiWallet size={24} className="text-secondary" />
                </span>
                {coin[1] !== "inr"
                  ? buybalance.toFixed(8)+" "+coin[1].toUpperCase()
                  : buybalance.toFixed(4)+" INR"}
              </div>
              <div className="col-6 d-flex justify-content-between">
                <div
                  className="cursor"
                  onClick={() => {
                    setTotal(Number(buybalance ? buybalance * 0.25 : 0));
                    setAmount(
                      Number((buybalance ? buybalance * 0.25 : 0) / atPrice)
                    );
                  }}
                >
                  25%
                </div>
                <div
                  className="px-1 cursor"
                  onClick={() => {
                    setTotal(buybalance ? buybalance * 0.5 : 0);
                    setAmount(buybalance ? (buybalance * 0.5) / atPrice : 0);
                  }}
                >
                  50%
                </div>
                <div
                  className="px-1 cursor"
                  onClick={() => {
                    setTotal(buybalance ? buybalance * 0.75 : 0);
                    setAmount(buybalance ? (buybalance * 0.75) / atPrice : 0);
                  }}
                >
                  75%
                </div>
                <div
                  className="cursor"
                  onClick={() => {
                    setTotal(buybalance ? buybalance : 0);
                    setAmount(buybalance ? buybalance / atPrice : 0);
                  }}
                >
                  100%
                </div>
              </div>
            </div>
            <button
              className="btn  text-light btn-block my-2"
              style={{ background: "#6cb77d" }}
              disabled={loading}
              onClick={() => {
                if (isLoggedIn) {
                  buyCoin(atPrice, amount, coin[0], coin[1]);
                } else {
                  NotificationManager.error(
                    "First login then perform buy/sell"
                  );
                }
              }}
            >
              {loading ? (
                <i className="loading-icon fas fa-spinner fa-spin mr-2"></i>
              ) : null}
              BUY {coin[0].toUpperCase()}
            </button>
            <div className="px-3 m-0">
              Fee: Maker fee: 0.1%| Taker fee: 0.1%
            </div>
          </div>
        </div>

        {/* sell tab */}

        <div
          id="order-history"
          className={`tab-pane fade ${activeTab == 1 ? "show active" : ""}`}
        >
          <div className="offset-7 col-5 py-5 ">
            <select
              className="custom-select buy-sell-form-bg buy-sell-theme d-none"
              style={{
                // backgroundColor: "#162538a6",
                // color: "#fff",
                borderColor: "#cacacc",
              }}
            >
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
                  <span
                    className="input-group-text buy-sell-form-bg buy-sell-theme"
                    style={{
                      fontSize: "10px",
                      // backgroundColor: "#162538a6",
                      // color: "#fff",
                      borderColor: "#cacacc",
                    }}
                  >
                    STOP PRICE
                    <br />
                    INR
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control buy-sell-form-bg buy-sell-theme"
                  value="0"
                  style={{
                    // backgroundColor: "#162538a6",
                    // color: "#fff",
                    borderColor: "#cacacc",
                  }}
                />
              </div>
            ) : null}
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span
                  className="input-group-text buy-sell-form-bg buy-sell-theme"
                  style={{
                    fontSize: "10px",
                    // backgroundColor: "white",
                    // color: "#fff",
                    borderColor: "#cacacc",
                  }}
                >
                  AT PRICE
                  <br />
                  {coin[1].toUpperCase()}
                </span>
              </div>
              <input
                type="text"
                className="form-control buy-sell-form-bg buy-sell-theme"
                value={atPrice}
                onChange={(e) => {
                  setATPrice(
                    e.target.value
                      .replace(/[^0-9.]/g, "")
                      .replace(/(\..*?)\..*/g, "$1")
                  );
                  setTotal(
                    e.target.value
                      .replace(/[^0-9.]/g, "")
                      .replace(/(\..*?)\..*/g, "$1") * amount
                  );
                }}
                style={{
                  // backgroundColor: "#162538a6",
                  // color: "#fff",
                  borderColor: "#cacacc",
                }}
              />
              <div className="input-group-append">
                <button
                  className="btn text-danger buy-sell-form-bg high-price"
                  type="button"
                  style={{
                    // background: "white",
                    borderColor: "#cacacc",
                    borderLeft: "none",
                    fontSize: "13px",
                  }}
                >
                  Highest Price
                </button>
              </div>
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span
                  className="input-group-text buy-sell-form-bg buy-sell-theme"
                  style={{
                    fontSize: "10px",
                    backgroundColor: "white",
                    // color: "#fff",
                    borderColor: "#cacacc",
                  }}
                >
                  AMOUNT
                  <br />
                  {coin[0].toUpperCase()}
                </span>
              </div>
              <input
                type="text"
                className="form-control buy-sell-form-bg buy-sell-theme"
                value={amount}
                onChange={(e) => {
                  setAmount(
                    e.target.value
                      .replace(/[^0-9.]/g, "")
                      .replace(/(\..*?)\..*/g, "$1")
                  );
                  setTotal(
                    e.target.value
                      .replace(/[^0-9.]/g, "")
                      .replace(/(\..*?)\..*/g, "$1") * atPrice
                  );
                }}
                style={{
                  // backgroundColor: "#162538a6",
                  // color: "#fff",
                  borderColor: "#cacacc",
                }}
              />
            </div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span
                  className="input-group-text buy-sell-form-bg buy-sell-theme"
                  style={{
                    fontSize: "10px",
                    // backgroundColor: "white",
                    // color: "#fff",
                    borderColor: "#cacacc",
                  }}
                >
                  TOTAL AMT
                  <br />
                  {coin[1].toUpperCase()}
                </span>
              </div>
              <input
                type="text"
                className="form-control buy-sell-form-bg buy-sell-theme"
                value={total}
                onChange={(e) => {
                  setAmount(
                    e.target.value
                      .replace(/[^0-9.]/g, "")
                      .replace(/(\..*?)\..*/g, "$1") / atPrice
                  );
                  setTotal(
                    e.target.value
                      .replace(/[^0-9.]/g, "")
                      .replace(/(\..*?)\..*/g, "$1")
                  );
                }}
                style={{
                  // backgroundColor: "#162538a6",
                  // color: "#fff",
                  borderColor: "#cacacc",
                }}
              />
            </div>
            <div className="row px-3 mb-1">
              <div
                className="col-6 pl-1"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <span className="mx-2" title="wallet">
                  <GiWallet size={24} className="text-secondary" />
                </span>
                {sellbalance
                  ? coin[1] !== "inr"
                    ? sellbalance.toFixed(8)
                    : sellbalance.toFixed(4)
                  : 0}{" "}
                {coin[0].toUpperCase()}
              </div>
              <div className="col-6 d-flex justify-content-between">
                <span
                  className="cursor"
                  onClick={() => {
                    setAmount(sellbalance ? sellbalance * 0.25 : 0);
                    setTotal(sellbalance ? atPrice * sellbalance * 0.25 : 0);
                  }}
                >
                  25%
                </span>
                <span
                  className="px-1 cursor"
                  onClick={() => {
                    setAmount(sellbalance ? sellbalance * 0.5 : 0);
                    setTotal(sellbalance ? atPrice * sellbalance * 0.5 : 0);
                  }}
                >
                  50%
                </span>
                <span
                  className="pl-1 cursor"
                  onClick={() => {
                    setAmount(sellbalance ? sellbalance * 0.75 : 0);
                    setTotal(sellbalance ? atPrice * sellbalance * 0.75 : 0);
                  }}
                >
                  75%
                </span>
                <span
                  className="pl-1 cursor"
                  onClick={() => {
                    setAmount(sellbalance ? sellbalance : 0);
                    setTotal(sellbalance ? atPrice * sellbalance : 0);
                  }}
                >
                  100%
                </span>
              </div>
            </div>

            <button
              className="btn btn-block text-light my-2"
              style={{ background: "#fb6e7b" }}
              disabled={loading}
              onClick={() => {
                if (isLoggedIn) {
                  sellCoin(atPrice, amount, coin[0], coin[1]);
                } else {
                  NotificationManager.error(
                    "First login then perform buy/sell"
                  );
                }
              }}
            >
              {loading ? (
                <i className="loading-icon fas fa-spinner fa-spin mr-2"></i>
              ) : null}
              SELL {coin[0].toUpperCase()}
            </button>
            <div className="px-3 m-0">
              Fee: Maker fee: 0.1%| Taker fee: 0.1%
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
