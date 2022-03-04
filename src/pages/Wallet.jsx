import React, { useState, useEffect } from "react";
import { isNum, isOtp } from "./redux/helpers/form-validator.functions";
import QRCode from "qrcode.react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import FullLoader from "./components/FullLoader";
import { NotificationManager } from "react-notifications";
import $ from "jquery";
import {
  N_get_wallet,
  N_crypto_withdraw,
  N_crypto_withdraw_Otp,
  N_DepositUpdate,
  N_inr_withdraw,
  N_transectionHistory,
  N_ScreenShot,
  N_crypto_withdraw_Otp_Email,
  postAPICall,
} from "./redux/helpers/api_functions_new";
import Switch from "react-switch";

export default function Wallet() {
  let get_token = []
  const [hide_zero, setHideZero] = useState(false);
  const [copied, setCopied] = useState();
  const [volume, setVolume] = useState();
  const [to_address, setToAddress] = useState();
  const [remark, setRemark] = useState();
  const [req_no, setReqno] = useState();
  // const [withdral_fee, setWthdrawalFee] = useState();
  const [famount, setFinalAmount] = useState(45);
  const [wallet_details, setWalletDetails] = useState([]);
  const [history, setHistory] = useState("");
  // const [collapseClass, setcollapseClass] = useState(false);
  const [activeTab, setActivetab] = useState(0);
  const [total_inr, setTotalInr] = useState(0);
  const [loading, setLoading] = useState(true);
  const [withLoading, setWithLoading] = useState(false);
  const [price, setPrice] = useState("");
  // const [suser, setUser] = useState();
  const [status, setStatus] = useState(false);
  const [popup, showpopup] = useState(false);
  const [ctime, setctime] = useState("02:00");
  const [wallettype, setwallettype] = useState("");
  const [otp, setOtp] = useState("");
  const [wotp, setwOtp] = useState("");
  const [otpv, setotpv] = useState(false);
  const [filedata, setFileData] = useState();
  const [l1, setl1] = useState("");
  const [l2, setl2] = useState("");
  const { webData } = useSelector((state) => state.websiteDBReducer);
  const { coins } = useSelector((state) => state.coinDBReducer);
  const { user_fav_currency, currency_prefix, paired_curency_price } =
    useSelector((state) => state.coinDBReducer);
  const { user } = useSelector((state) => state.AuthReducer);

  function getCoinRate(coin) {
    let coins1 = Object.values(coins);
    // console.log("coins: ", coins);
    let res = coins1.find((d) => d.symbol === coin.toUpperCase());
    // console.log("inr price: ", res, coin);
    if (coin === "INR") {
      return 1;
    } else {
      return res?.current_price_inr ? res.current_price_inr : 0;
    }
  }

  const uploadIMG = (input) => {
    if (input.target.files && input.target.files[0]) {
      console.log("fileset****");
      setFileData(input.target.files[0]);
    }
  };

  function getWallets() {

    N_get_wallet(user?.params ? user.params.user_id : user.user_id)
      .then((d) => {
        // console.log("get_token: ", get_token)
        if (d.status === 200) {
          // console.log("coin rates: ", d.params.wallets);
          let total = 0;
          let final_data = Object.keys(d.params.wallets).map((res, i) => {
            let wallet_type = d.params.wallets[res]?.symbol.toUpperCase();
            let rate = getCoinRate(res, "INR");
            // console.log("wallet_type: ", wallet_type)
            let get_sup_currency = null
            
            if(get_token){
              let sp = get_token.filter(gets => gets.symbol === wallet_type)
              get_sup_currency = sp[0]
              // console.log("sp: ", sp)
            }
            // console.log("getToken1: ", get_token)
            // console.log("suppoted_currency: ", get_sup_currency)
            let inr_val =
              Math.round(rate * d.params.wallets[res]?.balance * 1000) / 1000;
            total = total + parseFloat(inr_val);
            // console.log("inrvaljust: ", inr_val, Math.round(rate * d.params.wallets[res]?.balance * 1000) / 1000, rate);
            return {
              id: d.params.wallets[res]?.id,
              deposit_limit: d.params.wallets[res]?.deposit_limit
                ? d.params.wallets[res].deposit_limit
                : 0,
              icon: d.params.wallets[res]?.icon,
              symbol: wallet_type,
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
              min_deposit: get_sup_currency ? get_sup_currency?.min_deposite_limit : '',
              min_withdrawal: get_sup_currency ? get_sup_currency?.min_withdraw_limit: '',
              max_withdrawal: get_sup_currency ? get_sup_currency?.max_withdraw_limit: '',
            };
          });
          console.log("final_data: ", final_data)
          setWalletDetails(final_data);
          setTotalInr(total);
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
    let c_user_id = user?.params?.user_id ? user.params.user_id : user.user_id
    let alltxtData = {
      admin_user_id : c_user_id
    }
    postAPICall('gettoken',alltxtData)
    .then(response => {
      if(response.data){
        get_token = response.data
      }
    })

  }, []);

  useEffect(() => {
    if (total_inr <= 0) {
      console.log("getWallets2")
      getWallets();
    }
  }, [coins]);


  useEffect(() => {
    N_transectionHistory(user.user_id)
      .then((dt) => {
        // if (status !== -5) setHistory(dt);
        if (dt.status === 200) {
          setHistory(dt.params.withdraw);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [activeTab]);

  useEffect(() => {
    let c_user_id = user?.params?.user_id ? user.params.user_id : user.user_id
    N_DepositUpdate(c_user_id);
    

  }, []);

  function changeCollapse(event, txt) {
    setCopied(false);
    $(".deposit_c").removeClass("show").addClass("collapse");
    $(".withdraw_c").removeClass("show").addClass("collapse");
  }

  const otpCountdown = () => {
    let duration = 60 * 5;
    // const display = document.getElementById("#timer");
    let timer = duration,
      minutes,
      seconds;
    const tint = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      setctime(minutes + ":" + seconds);

      if (--timer < 0) {
        // timer = duration;
        clearInterval(tint);
      }
    }, 1000);
  };
  return (
    <>
      {/* <Popup /> */}

      {popup ? (
        <>
          <div
            style={{
              position: "fixed",
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              zIndex: 200,
              backgroundColor: "rgba(0,0,0,0.3)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "20%",
                zIndex: 1000,
                boxShadow: "2px 2px 20px rgba(0,0,0,0.4)",
                display: "flex",
                flexDirection: "column",
                alignSelf: "center",
              }}
            >
              <div className="security_header shead-bg"></div>
              <div className="container shead-bg">
                <div className="row">
                  <div className="col-12 col-md-12 col-sm-12">
                    {otpv ? (
                      <>
                        <form className="signupform mdfthemetxt" id="otp_form">
                          <div>
                            <h3>Email OTP verification </h3>
                          </div>
                          <div className="signupform-control">
                            <small id="msg" style={{ fontSize: "15px" }}>
                              Error message
                            </small>
                          </div>
                          <div className="signupform-control">
                            <div>
                              <input
                                type="text"
                                name="user_otp"
                                className="signupform-control"
                                id="user_otp"
                                maxLength={6}
                                onChange={(e) => {
                                  setwOtp(e.target.value);
                                  isOtp(e.target.value);
                                }}
                                value={wotp}
                                placeholder="Enter Your OTP"
                              />
                              <i
                                className="fas fa-check-circle"
                                style={{ top: "16px" }}
                              ></i>
                              <i
                                className="fas fa-exclamation-circle"
                                style={{ top: "16px" }}
                              ></i>
                              <small>Error message</small>
                              <div className="resend_btn text-info" id="timer">
                                {ctime}
                              </div>
                            </div>
                          </div>
                          <div className="signupform-control" id="btns">
                            <button
                              type="button"
                              id="withdrawal_btn"
                              className="sendbtn"
                              onClick={(e) => {
                                e.preventDefault();
                                setl1("spinner-border spinner-border-sm");
                                document.getElementById(
                                  "withdrawal_btn"
                                ).disabled = true;
                                N_crypto_withdraw_Otp_Email(
                                  user?.params
                                    ? user.params.user_id
                                    : user.user_id,
                                  wotp,
                                  wallettype
                                )
                                  .then((res) => {
                                    setl1("");
                                    showpopup(false);
                                    if (res.status === 200) {
                                      NotificationManager.success(
                                        "Withdrawal SuccessFully"
                                      );
                                      document.location.reload();
                                    } else {
                                      NotificationManager.error(
                                        "Withdrawal Not SuccessFully"
                                      );
                                      document.location.reload();
                                    }
                                  })
                                  .catch((err) => {
                                    NotificationManager.error(
                                      "Somthing Went Wrong!"
                                    );
                                    document.location.reload();
                                    console.log(err);
                                  });
                              }}
                            >
                              <span className={`${l1}`}></span>
                              Withdraw
                            </button>
                          </div>
                          {loading ? (
                            <div
                              className="spinner-border text-primary"
                              role="status"
                            >
                              <span className="sr-only">Loading...</span>
                            </div>
                          ) : null}
                        </form>
                      </>
                    ) : (
                      <form className="signupform mdfthemetxt" id="otp_form">
                        <div>
                          <h3>Mobile OTP verification </h3>
                        </div>
                        <div className="signupform-control">
                          <small id="msg" style={{ fontSize: "15px" }}>
                            Error message
                          </small>
                        </div>
                        <div className="signupform-control">
                          <div>
                            <input
                              type="text"
                              name="user_otp"
                              className="signupform-control"
                              id="user_otp"
                              maxLength={6}
                              onChange={(e) => {
                                setOtp(e.target.value);
                                isOtp(e.target.value);
                              }}
                              value={otp}
                              placeholder="Enter Your OTP"
                            />
                            <i
                              className="fas fa-check-circle"
                              style={{ top: "16px" }}
                            ></i>
                            <i
                              className="fas fa-exclamation-circle"
                              style={{ top: "16px" }}
                            ></i>
                            <small>Error message</small>
                            <div className="resend_btn text-info" id="timer">
                              {ctime}
                            </div>
                          </div>
                        </div>
                        <div className="signupform-control" id="btns">
                          <button
                            type="button"
                            id="proceed_btn"
                            className="sendbtn"
                            onClick={(e) => {
                              e.preventDefault();
                              setl2("spinner-border spinner-border-sm");
                              N_crypto_withdraw_Otp(
                                user?.params
                                  ? user.params.user_id
                                  : user.user_id,
                                otp,
                                wallettype
                              )
                                .then((res) => {
                                  setl2("");
                                  if (res.status === 200) {
                                    NotificationManager.success(
                                      "OTP Send. Please Check Your Email"
                                    );
                                    setotpv(true);
                                  } else {
                                    NotificationManager.error(res.message);
                                    showpopup(false);
                                    document.location.reload();
                                  }
                                })
                                .catch((err) => {
                                  console.log(err);
                                });
                            }}
                          >
                            <span className={`${l2}`}></span>
                            Verify
                          </button>
                        </div>
                        {loading ? (
                          <div
                            className="spinner-border text-primary"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : null}
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      <Header />

      <div
        className={`${webData.bg_color}` + " box container"}
        style={{
          marginTop: "80px",
          marginBottom: "30px",
          backgroundColor: webData.bg_color_code,
        }}
      >
        <div className="box-header with-border">
          <h4 className="box-title theme-color-text float-left">Funds And Transfer</h4>
          <div className="float-right">
            <h5 className="box-title theme-color-text float-left mr-3">Hide zero balance</h5>
            <div className="float-left">
              <Switch
                onChange={(e) => {
                  setHideZero(hide_zero ? false : true);
                }}
                checked={hide_zero}
              />
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between mb-3 px-15">
          <div className="btn-group custom-grp color-btn">
            <button
              type="button"
              className={`mdfthemetxt  btn btn-primary btn-sm ${
                activeTab == 0 ? "active" : ""
              }`}
              onClick={() => setActivetab(0)}
            >
              Funds
            </button>
            <button
              type="button"
              className={`mdfthemetxt btn btn-primary btn-sm ${
                activeTab == 1 ? "active" : ""
              }`}
              onClick={() => setActivetab(1)}
            >
              Transfer History
            </button>
          </div>

          <ul className="box-controls pull-right mr-4">
            <li>
              Total:{currency_prefix[user_fav_currency]}{" "}
              <strong className="">
                {user_fav_currency === "INR"
                  ? total_inr.toFixed(5)
                  : (
                      total_inr / paired_curency_price[user_fav_currency]
                    ).toFixed(8)}
                {/* {Math.round((total_inr / user_fav_currency_rate) * 10000) /
                  10000 !=
                0
                  ? Math.round((total_inr / user_fav_currency_rate) * 10000) /
                    10000
                  : Math.round(
                      (total_inr / user_fav_currency_rate) * 100000000
                    ) / 100000000} */}
              </strong>
            </li>
          </ul>
        </div>
        <div className="box-body px-15 pt-0 pb-10">
          <div className="table-responsive">
            {activeTab == 0 ? (
              <table
                className="mdfthemetxt table table-border no-margin"
                style={{
                  overflow: "hidden",
                }}
              >
                <thead>
                  <tr className="bg-pale-dark">
                    <th>ASSETS</th>
                    <th style={{ textAlign: "center" }}>AVAILABLE BALANCE</th>
                    <th>LOCKED</th>
                    <th>TOTAL</th>
                    <th>{user_fav_currency} VALUE</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={8}>
                        <FullLoader />
                      </td>
                    </tr>
                  ) : wallet_details ? (
                    wallet_details.map((item, index) => (
                      <>
                        {index === 0
                          ? wallet_details.map((item, index) => (
                              <>
                                {((hide_zero && item.balance > 0) && item.symbol === "INR") || (!hide_zero && item.symbol === "INR") ? (
                                  <>
                                    <tr key={index * 6}>
                                      <td>
                                        {item.icon ? (
                                          <img
                                            src={item.icon}
                                            alt={item.symbol}
                                            width="20"
                                            height="20"
                                          />
                                        ) : (
                                          ""
                                        )}{" "}
                                        {item.name} ({item.symbol})
                                      </td>
                                      <td style={{ textAlign: "center" }}>
                                        {item.avl_balance}
                                      </td>
                                      <td>{item.locked}</td>
                                      <td>{item.balance.toFixed(4)}</td>
                                      <td>
                                        {currency_prefix[user_fav_currency]}{" "}
                                        {item.inr_balance}
                                      </td>
                                      <td>
                                        {parseInt(item.status) === 1 ||
                                        (parseInt(item.status) === 3 &&
                                          item.symbol == "INR") ? (
                                          <button
                                            className="btn btn-theme-color mr-2"
                                            id="deposit"
                                            data-toggle="collapse"
                                            data-target={"#inr_" + item.symbol}
                                            aria-expanded="false"
                                            onClick={(e) =>
                                              changeCollapse(
                                                e,
                                                "#inr_" + item.symbol
                                              )
                                            }
                                          >
                                            Deposit
                                          </button>
                                        ) : null}

                                        {parseInt(item.status) === 2 ||
                                        (parseInt(item.status) === 3 &&
                                          item.symbol == "INR") ? (
                                          <>
                                            <button
                                              className="btn btn-theme-color"
                                              id="withdraw"
                                              data-toggle="collapse"
                                              data-target={
                                                "#inrw_" + item.symbol
                                              }
                                              aria-expanded="false"
                                              onClick={(e) =>
                                                changeCollapse(
                                                  e,
                                                  "#inrw_" + item.symbol
                                                )
                                              }
                                            >
                                              Withdraw
                                            </button>
                                          </>
                                        ) : null}
                                      </td>
                                    </tr>
                                    <tr
                                      className="collapse deposit_c"
                                      id={"deposit_" + item.symbol}
                                    >
                                      <td colSpan="6">
                                        <form>
                                          <div className="row">
                                            <div className="col-md-6">
                                              <div className="signupform-control">
                                                <div>
                                                  Send to your Secure{" "}
                                                  {item.name} Address
                                                </div>
                                                <hr className="h_r" />
                                              </div>
                                              <div className="signupform-control">
                                                
                                                <label htmlFor="coin_address">
                                                  Destination Address
                                                </label>
                                                <CopyToClipboard
                                                  text={item.address}
                                                  onCopy={() =>
                                                    setCopied({ copied: true })
                                                  }
                                                >
                                                  {copied ? (
                                                    <span className="cop_btn text-success">
                                                      Copied
                                                    </span>
                                                  ) : (
                                                    <span className="cop_btn theme-color-text">
                                                      <i
                                                        className="fas fa-copy"
                                                        aria-hidden="true"
                                                      ></i>
                                                      Copy
                                                    </span>
                                                  )}
                                                </CopyToClipboard>
                                                <input
                                                  type="text"
                                                  className="input_button"
                                                  value={item.address}
                                                />
                                              </div>
                                              <div className="signupform-control ">
                                                <div className=" text-warning">
                                                  <i
                                                    className="fas fa-warning"
                                                    aria-hidden="true"
                                                  ></i>{" "}
                                                  Disclaimer
                                                </div>
                                                <hr className="h_r" />
                                                <label htmlFor="disclaimer">
                                                  Please Deposit {item.min_deposit ? " minimum "+item.min_deposit+" "  : " only "}
                                                  {item.symbol} to this address.
                                                  If you Deposit any other
                                                  coins or below minimum limit, It will be lost
                                                  forever.
                                                </label>
                                              </div>
                                            </div>
                                            <div className="col-md-6">
                                              <div className="signupform-control">
                                                <div>Or Scan This QR Code</div>
                                                <hr className="h_r" />
                                              </div>
                                              <div className="signupform-control">
                                                <div
                                                  className="p-3"
                                                  style={{
                                                    width: "fit-content",
                                                    backgroundColor: "#fff",
                                                  }}
                                                >
                                                  <QRCode
                                                    value={item.address}
                                                    size={200}
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </form>
                                      </td>
                                    </tr>
                                    <tr
                                      className="collapse withdraw_c"
                                      id={"withdraw_" + item.symbol}
                                    >
                                      <td colSpan="6">
                                        <form>
                                          <div className="row">
                                            <div
                                              className="col-md-8"
                                              style={{ margin: "0 auto" }}
                                            >
                                              <div className="signupform-control">
                                                <div>
                                                  Transfer {item.name} from your{" "}
                                                  {webData.website_short_name}
                                                  Wallet to Another
                                                </div>
                                                <hr className="h_r" />
                                              </div>
                                              <div className="signupform-control">
                                                <label htmlFor="coin_address">
                                                  Volume
                                                </label>
                                                <label
                                                  htmlFor="coin_val"
                                                  style={{ float: "right" }}
                                                >
                                                  Available {item.symbol}:{" "}
                                                  {item.balance}
                                                </label>
                                                <input
                                                  type="text"
                                                  className="input_button"
                                                  value={item.volume}
                                                  maxLength={15}
                                                  onChange={(e) => {
                                                    setVolume(
                                                      e.target.value
                                                        .replace(/[^0-9.]/g, "")
                                                        .replace(
                                                          /(\..*?)\..*/g,
                                                          "$1"
                                                        )
                                                    );
                                                    setFinalAmount(
                                                      e.target.value
                                                        .replace(/[^0-9.]/g, "")
                                                        .replace(
                                                          /(\..*?)\..*/g,
                                                          "$1"
                                                        ) - item.withdral_fee
                                                    );
                                                  }}
                                                />
                                              </div>
                                              <div className="signupform-control">
                                                <label htmlFor="coin_address">
                                                  Destination Address
                                                </label>
                                                <input
                                                  type="text"
                                                  className="input_button"
                                                  maxLength={60}
                                                  onChange={(e) =>
                                                    setToAddress(e.target.value)
                                                  }
                                                />
                                              </div>
                                              <div className="signupform-control">
                                                <label htmlFor="coin_address">
                                                  Withdrawal Fee
                                                </label>
                                                <input
                                                  type="text"
                                                  className="input_button"
                                                  value={item.withdral_fee}
                                                  readOnly
                                                />
                                              </div>
                                              <div className="signupform-control">
                                                <label htmlFor="coin_address">
                                                  Final Valume
                                                </label>
                                                <input
                                                  type="text"
                                                  className="input_button"
                                                  value={
                                                    famount >= 0 ? famount : "0"
                                                  }
                                                  maxLength={15}
                                                />
                                              </div>
                                              <div className="signupform-control">
                                                <label htmlFor="coin_address">
                                                  Remark
                                                </label>
                                                <input
                                                  type="text"
                                                  className="input_button"
                                                  value={remark}
                                                  maxLength={60}
                                                  onChange={(e) =>
                                                    setRemark(e.target.value)
                                                  }
                                                />
                                              </div>
                                              <div className="signupform-control">
                                                <button
                                                  type="button"
                                                  className="btn btn-danger"
                                                  onClick={() => {
                                                    setWithLoading(true);

                                                    N_crypto_withdraw(
                                                      user?.params
                                                        ? user.params.user_id
                                                        : user.user_id,
                                                      item.symbol,
                                                      item.address,
                                                      to_address,
                                                      volume,
                                                      remark
                                                    ).then((d) => {
                                                      setWithLoading(false);
                                                      if (d.status == 200) {
                                                        showpopup(true);
                                                        otpCountdown();
                                                        setwallettype(
                                                          d.params
                                                            .transection_id
                                                        );
                                                        setStatus(!status);
                                                        console.log("wr1: ", d);
                                                        NotificationManager.success(
                                                          d.message
                                                        );
                                                      } else {
                                                        NotificationManager.error(
                                                          d.message
                                                        );
                                                      }
                                                    });
                                                  }}
                                                >
                                                  {withLoading ? (
                                                    <span className="loading-icon fas fa-spinner fa-spin mr-2"></span>
                                                  ) : (
                                                    "PROCEED WITH WITHDRAWAL"
                                                  )}
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </form>
                                      </td>
                                    </tr>
                                    <tr
                                      className="collapse deposit_c"
                                      id={"inr_" + item.symbol}
                                    >
                                      <td colSpan="6">
                                        <div className="row">
                                          <div
                                            className="col-md-6"
                                            style={{ margin: "0 auto" }}
                                          >
                                            <div className="card light-theme-color">
                                              <div className="card-header">
                                                Deposit
                                              </div>
                                              <div className="card-body">
                                                <div className="signupform-control">
                                                  <div
                                                    className="p-3"
                                                    style={{
                                                      width: "fit-content",
                                                      backgroundColor: "#fff",
                                                    }}
                                                  >
                                                    <img src="theme/img/paymentQr.jpeg" />
                                                  </div>
                                                </div>
                                                <div className="signupform-control ">
                                                  <div className=" text-warning">
                                                    <i
                                                      className="fas fa-warning"
                                                      aria-hidden="true"
                                                    ></i>{" "}
                                                    Disclaimer
                                                  </div>
                                                  <hr className="h_r" />
                                                  <label htmlFor="disclaimer">
                                                    Please Deposit {item.min_deposit ? " minimum "+item.min_deposit+" " : " only "}
                                                    {item.symbol} to this address.
                                                    If you Deposit any other
                                                    QR or below minimum limit, It will be lost
                                                    forever.
                                                  </label>
                                                </div>
                                                <label for="screenshot">
                                                  Upload Screenshot File:{" "}
                                                </label>
                                                <input
                                                  type="file"
                                                  onChange={(e) => {
                                                    uploadIMG(e);
                                                  }}
                                                />
                                                <h5 className="card-title mt-2">
                                                  Price
                                                </h5>
                                                <input
                                                  type="text"
                                                  className="form-control"
                                                  required
                                                  id="price"
                                                  value={price}
                                                  onChange={(e) => {
                                                    setPrice(e.target.value);
                                                  }}
                                                />
                                                <br />
                                                <a
                                                  className="btn btn-theme-color"
                                                  onClick={(e) => {
                                                    N_ScreenShot(
                                                      e,
                                                      filedata,
                                                      price,
                                                      user?.params
                                                        ? user.params.user_id
                                                        : user.user_id
                                                    );
                                                  }}
                                                >
                                                  UpLoad
                                                </a>
                                                <div
                                                  className="spinner-border text-primary"
                                                  style={{ display: "none" }}
                                                  role="status"
                                                >
                                                  <span className="sr-only">
                                                    Loading...
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr
                                      className="collapse deposit_c"
                                      id={"inrw_" + item.symbol}
                                    >
                                      <td colSpan="6">
                                        <div className="row">
                                          <div
                                            className="col-md-6"
                                            style={{ margin: "0 auto" }}
                                          >
                                            <div className="card">
                                              <div className="card-header">
                                                Withdraw
                                              </div>
                                              <div className="card-body">
                                                <strong>
                                                  &#8377;{" "}
                                                  {Number(item.withdral_fee)}{" "}
                                                  per Transection
                                                </strong>
                                                <h5 className="card-title">
                                                  Amount
                                                </h5>
                                                <input
                                                  type="text"
                                                  className="form-control"
                                                  required
                                                  id="price"
                                                  value={price}
                                                  onChange={(e) => {
                                                    setPrice(e.target.value);
                                                  }}
                                                />
                                                <h5 className="card-title">
                                                  Remark
                                                </h5>
                                                <input
                                                  type="text"
                                                  className="form-control"
                                                  required
                                                  id="remark"
                                                  value={remark}
                                                  onChange={(e) => {
                                                    setRemark(e.target.value);
                                                  }}
                                                />
                                                <br />
                                                <a
                                                  className="btn btn-theme-color"
                                                  onClick={() => {
                                                    setWithLoading(true);
                                                    N_inr_withdraw(
                                                      user.user_id,
                                                      price,
                                                      item.symbol,
                                                      remark
                                                    ).then((d) => {
                                                      showpopup(true);
                                                      otpCountdown();
                                                      setWithLoading(false);
                                                      if (d.status == 200) {
                                                        setwallettype(
                                                          d.params
                                                            .transection_id
                                                        );
                                                        NotificationManager.success(
                                                          d.message
                                                        );
                                                        setStatus(!status);
                                                      } else {
                                                        NotificationManager.error(
                                                          d.message
                                                        );
                                                        setStatus(!status);
                                                      }
                                                    });
                                                  }}
                                                >
                                                  {withLoading ? (
                                                    <span className="loading-icon fas fa-spinner fa-spin mr-2"></span>
                                                  ) : (
                                                    "Withdraw"
                                                  )}
                                                </a>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </>
                                ) : null}
                              </>
                            ))
                          : null}
                        {((hide_zero && item.balance > 0) && item.symbol !== "INR") || (!hide_zero && item.symbol !== "INR") ? (
                          <>
                            <tr key={index * 3}>
                              <td>
                                {item.icon ? (
                                  <img
                                    src={item.icon}
                                    alt={item.symbol}
                                    width="20"
                                    height="20"
                                  />
                                ) : (
                                  ""
                                )}{" "}
                                {item.name}
                                {item.symbol === "USDT"
                                  ? "(" + item.symbol + ")" + " (TRC20)"
                                  : item.symbol === "BUSD"
                                  ? "(" + item.symbol + ")" + " (BEP20)"
                                  : "(" + item.symbol + ")"}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {item.balance > 0
                                  ? item.avl_balance.toFixed(4)
                                  : item.balance}
                              </td>
                              <td>
                                {item.locked > 0
                                  ? item.locked.toFixed(4)
                                  : item.locked}
                              </td>
                              <td>
                                {item.avl_balance > 0
                                  ? (
                                      Number(item.avl_balance) +
                                      Number(item.locked)
                                    ).toFixed(4)
                                  : item.avl_balance}
                              </td>
                              <td>
                                {currency_prefix[user_fav_currency] + " "}
                                {user_fav_currency === "INR"
                                  ? item.inr_balance
                                  : item.inr_balance > 0
                                  ? (
                                      item.inr_balance /
                                      Number(
                                        paired_curency_price[user_fav_currency]
                                      )
                                    ).toFixed(8)
                                  : 0}
                              </td>
                              <td>
                                {(item.address &&
                                  parseInt(item.status) === 1) ||
                                parseInt(item.status) === 3 ? (
                                  <button
                                    type="button"
                                    className="btn btn-theme-color mr-2"
                                    id="deposit"
                                    data-toggle="collapse"
                                    // data-target={"#inrw_" + item.symbol}
                                    // aria-expanded="false"
                                    // onClick={(e) =>
                                    //   changeCollapse(e, "#inrw_" + item.symbol)
                                    // }
                                    data-target={"#deposit_" + item.symbol}
                                    aria-expanded="false"
                                    onClick={(e) =>
                                      changeCollapse(
                                        e,
                                        "#deposit_" + item.symbol
                                      )
                                    }
                                  >
                                    Deposit
                                  </button>
                                ) : null}
                                {(item.address &&
                                  parseInt(item.status) === 2) ||
                                parseInt(item.status) === 3 ? (
                                  <button
                                    type="button"
                                    className="btn btn-theme-color"
                                    id="withdraw"
                                    data-toggle="collapse"
                                    data-target={"#withdraw_" + item.symbol}
                                    aria-expanded="false"
                                    onClick={(e) =>
                                      changeCollapse(
                                        e,
                                        "#withdraw_" + item.symbol
                                      )
                                    }
                                  >
                                    Withdraw
                                  </button>
                                ) : null}
                              </td>
                            </tr>
                            <tr
                              className="collapse deposit_c"
                              id={"deposit_" + item.symbol}
                            >
                              <td colSpan="6">
                                <form>
                                  <div className="row">
                                    <div className="col-md-6">
                                      <div className="signupform-control">
                                        <div>
                                          Send to your Secure {item.name}{" "}
                                          Address
                                        </div>
                                        <hr className="h_r" />
                                      </div>
                                      <div className="signupform-control">
                                        <label htmlFor="coin_address">
                                          Destination Address
                                        </label>
                                        <CopyToClipboard
                                          text={item.address}
                                          onCopy={() =>
                                            setCopied({ copied: true })
                                          }
                                        >
                                          {copied ? (
                                            <span className="cop_btn text-success">
                                              Copied
                                            </span>
                                          ) : (
                                            <span className="cop_btn theme-color-text">
                                              <i
                                                className="fas fa-copy"
                                                aria-hidden="true"
                                              ></i>
                                              Copy
                                            </span>
                                          )}
                                        </CopyToClipboard>
                                        <input
                                          type="text"
                                          className="input_button"
                                          value={item.address}
                                        />
                                      </div>
                                      <div className="signupform-control ">
                                        <div className=" text-warning">
                                          <i
                                            className="fas fa-warning"
                                            aria-hidden="true"
                                          ></i>{" "}
                                          Disclaimer
                                        </div>
                                        <hr className="h_r" />
                                        <label htmlFor="disclaimer">
                                          Please Deposit {item.min_deposit ? " minimum "+item.min_deposit+" " : " only "}
                                          {item.symbol} to this address.
                                          If you Deposit any other
                                          coins or below minimum limit, It will be lost
                                          forever.
                                        </label>
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="signupform-control">
                                        <div>Or Scan This QR Code</div>
                                        <hr className="h_r" />
                                      </div>
                                      <div className="signupform-control">
                                        <div
                                          className="p-3"
                                          style={{
                                            width: "fit-content",
                                            backgroundColor: "#fff",
                                          }}
                                        >
                                          <QRCode
                                            value={item.address}
                                            size={200}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </td>
                            </tr>
                            <tr
                              className="collapse withdraw_c"
                              id={"withdraw_" + item.symbol}
                            >
                              <td colSpan="6">
                                <form>
                                  <div className="row">
                                    <div
                                      className="col-md-8"
                                      style={{ margin: "0 auto" }}
                                    >
                                      <div className="signupform-control">
                                        <div>
                                          Transfer {item.name} from your{" "}
                                          {webData.website_short_name}
                                          Wallet to Another
                                        </div>
                                        <hr className="h_r" />
                                      </div>
                                      <div className="signupform-control">
                                        <label htmlFor="coin_address">
                                          Volume
                                        </label>
                                        <label
                                          htmlFor="coin_val"
                                          style={{
                                            float: "right",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          Available {item.symbol}:{" "}
                                          {item.balance}
                                        </label>
                                        <input
                                          type="text"
                                          className="input_button"
                                          value={item.volume}
                                          maxLength={15}
                                          onChange={(e) => {
                                            setVolume(
                                              e.target.value
                                                .replace(/[^0-9.]/g, "")
                                                .replace(/(\..*?)\..*/g, "$1")
                                            );
                                            setFinalAmount(
                                              e.target.value
                                                .replace(/[^0-9.]/g, "")
                                                .replace(/(\..*?)\..*/g, "$1") -
                                                item.withdral_fee
                                            );
                                          }}
                                        />
                                      </div>
                                      <div className="signupform-control">
                                        <label htmlFor="coin_address">
                                          Destination Address
                                        </label>
                                        <input
                                          type="text"
                                          className="input_button"
                                          maxLength={60}
                                          onChange={(e) =>
                                            setToAddress(e.target.value)
                                          }
                                        />
                                      </div>
                                      {/* <div className="signupform-control">
                                        <label htmlFor="coin_address">
                                          Withdrawal Fee
                                        </label>
                                        <input
                                          type="text"
                                          className="input_button"
                                          value={item.withdral_fee}
                                          readOnly
                                        />
                                      </div>
                                      <div className="signupform-control">
                                        <label htmlFor="coin_address">
                                          Final Valume
                                        </label>
                                        <input
                                          type="text"
                                          className="input_button"
                                          value={famount >= 0 ? famount : "0"}
                                          maxLength={15}
                                        />
                                      </div> */}
                                      <div className="signupform-control">
                                        <label htmlFor="coin_address">
                                          Remark
                                        </label>
                                        <input
                                          type="text"
                                          className="input_button"
                                          value={remark}
                                          maxLength={60}
                                          onChange={(e) =>
                                            setRemark(e.target.value)
                                          }
                                        />
                                      </div>
                                      <div className="signupform-control">
                                        <button
                                          type="button"
                                          className="btn btn-danger"
                                          onClick={() => {
                                            setWithLoading(true);

                                            N_crypto_withdraw(
                                              user?.params
                                                ? user.params.user_id
                                                : user.user_id,
                                              item.symbol,
                                              item.address,
                                              to_address,
                                              volume,
                                              remark
                                            ).then((d) => {
                                              setWithLoading(false);
                                              if (d.status == 200) {
                                                showpopup(true);
                                                otpCountdown();
                                                setwallettype(
                                                  d.params.transection_id
                                                );
                                                console.log("wr2: ", d);
                                                setStatus(!status);
                                                NotificationManager.success(
                                                  d.message
                                                );
                                              } else {
                                                NotificationManager.error(
                                                  d.message
                                                );
                                              }
                                            });
                                          }}
                                        >
                                          {withLoading ? (
                                            <span className="loading-icon fas fa-spinner fa-spin mr-2"></span>
                                          ) : (
                                            "PROCEED WITH WITHDRAWAL"
                                          )}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </td>
                            </tr>
                            <tr
                              className="collapse deposit_c"
                              id={"inr_" + item.symbol}
                            >
                              <td colSpan="6">
                                <div className="row">
                                  <div
                                    className="col-md-8"
                                    style={{ margin: "0 auto" }}
                                  >
                                    <div className="card light-theme-color">
                                      <div className="card-header">Deposit</div>
                                      <div className="card-body">
                                        <div className="signupform-control">
                                          <a
                                            className="btn btn-theme-color"
                                            style={{
                                              border: "1px solid",
                                              background: "#c2efc9",
                                            }}
                                            href="https://payarrowonline.org/payarrowpanel/index.php/site/register"
                                            target="_blank"
                                          >
                                            Deposit Site Url
                                          </a>
                                          {/* <CopyToClipboard
                                                      text="https://payarrowonline.org/payarrowpanel/index.php/site/register"
                                                      onCopy={() =>
                                                        setCopied({ copied: true })
                                                      }
                                                    >
                                                        <span className="cop_btn theme-color-text">
                                                          <i
                                                            className="fas fa-copy"
                                                            aria-hidden="true"
                                                          ></i>
                                                          Copy
                                                        </span>
                                                    </CopyToClipboard>
                                                    <input
                                                      type="text"
                                                      className="input_button"
                                                      value="https://payarrowonline.org/payarrowpanel/index.php/site/register"
                                                    /> */}
                                        </div>
                                        <div className="signupform-control">
                                          <label htmlFor="user_id">
                                            User ID/Choice ID
                                          </label>
                                          <CopyToClipboard
                                            text={
                                              user?.params
                                                ? user.params.user_id
                                                : user.user_id
                                            }
                                            onCopy={() =>
                                              setCopied({ copied: true })
                                            }
                                          >
                                            <span className="cop_btn theme-color-text">
                                              <i
                                                className="fas fa-copy"
                                                aria-hidden="true"
                                              ></i>
                                              Copy
                                            </span>
                                          </CopyToClipboard>
                                          <input
                                            type="text"
                                            className="input_button"
                                            value={
                                              user?.params
                                                ? user.params.user_id
                                                : user.user_id
                                            }
                                          />
                                        </div>
                                        <div className="signupform-control">
                                          <lebal for="screenshot">
                                            <b style={{ color: "#cc7575" }}>
                                              Notice: Please Upload Deposinting
                                              Reciept and Correct Amount!{" "}
                                            </b>
                                            <br />
                                            <br />
                                            Upload Screenshot File:
                                          </lebal>
                                          <input
                                            type="file"
                                            onChange={(e) => {
                                              uploadIMG(e);
                                            }}
                                          />
                                        </div>
                                        
                                        <div className="signupform-control">
                                          <label htmlFor="price">Amount</label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            required
                                            id="price"
                                            value={price}
                                            onChange={(e) => {
                                              setPrice(e.target.value);
                                            }}
                                          />
                                        </div>
                                        <div className="signupform-control">
                                          <label htmlFor="price">
                                            Request No
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            required
                                            id="req_no"
                                            value={req_no}
                                            onChange={(e) => {
                                              setReqno(e.target.value);
                                            }}
                                          />
                                        </div>
                                        <a
                                          className="btn btn-theme-color"
                                          onClick={(e) => {
                                            N_ScreenShot(
                                              e,
                                              filedata,
                                              price,
                                              req_no,
                                              user?.params
                                                ? user.params.user_id
                                                : user.user_id
                                            );
                                          }}
                                        >
                                          UpLoad
                                        </a>
                                        <div
                                          className="spinner-border text-primary"
                                          style={{ display: "none" }}
                                          role="status"
                                        >
                                          <span className="sr-only">
                                            Loading...
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr
                              className="collapse deposit_c"
                              id={"inrw_" + item.symbol}
                            >
                              <td colSpan="6">
                                <div className="row">
                                  <div
                                    className="col-md-6"
                                    style={{ margin: "0 auto" }}
                                  >
                                    <div className="card">
                                      <div className="card-header">
                                        Withdraw
                                      </div>
                                      <div className="card-body">
                                        <strong>
                                          &#8377; {Number(item.withdral_fee)}{" "}
                                          per Transection
                                        </strong>
                                        <h5 className="card-title">Amount</h5>
                                        <input
                                          type="text"
                                          className="form-control"
                                          required
                                          id="price"
                                          value={price}
                                          onChange={(e) => {
                                            setPrice(e.target.value);
                                          }}
                                        />
                                        <h5 className="card-title">Remark</h5>
                                        <input
                                          type="text"
                                          className="form-control"
                                          required
                                          id="remark"
                                          value={remark}
                                          onChange={(e) => {
                                            setRemark(e.target.value);
                                          }}
                                        />
                                        <br />
                                        <a
                                          className="btn btn-theme-color"
                                          onClick={() => {
                                            setWithLoading(true);
                                            N_inr_withdraw(
                                              user.user_id,
                                              price,
                                              item.symbol,
                                              remark
                                            ).then((d) => {
                                              showpopup(true);
                                              otpCountdown();
                                              setWithLoading(false);
                                              if (d.status == 200) {
                                                setwallettype(
                                                  d.params.transection_id
                                                );
                                                NotificationManager.success(
                                                  d.message
                                                );
                                                setStatus(!status);
                                              } else {
                                                NotificationManager.error(
                                                  d.message
                                                );
                                                setStatus(!status);
                                              }
                                            });
                                          }}
                                        >
                                          {withLoading ? (
                                            <span className="loading-icon fas fa-spinner fa-spin mr-2"></span>
                                          ) : (
                                            "Withdraw"
                                          )}
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </>
                        ) : null}
                      </>
                    ))
                  ) : (
                    ""
                  )}
                </tbody>
              </table>
            ) : (
              <table className="table table-border no-margin mdfthemetxt ">
                <thead>
                  <tr className="bg-pale-dark">
                    <th>ASSET</th>
                    <th>TYPE</th>
                    <th>VOLUME</th>
                    <th>STATUS</th>
                    <th className="">ADDRESS</th>
                    <th>HASH OR TX ID </th>
                    <th>TIME</th>
                  </tr>
                </thead>
                {history ? (
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={8}>
                          <FullLoader />
                        </td>
                      </tr>
                    ) : history ? (
                      history.map((d, index) => (
                        <tr key={index * 5}>
                          <td>{d.symbol}</td>
                          <td>{d.type}</td>
                          <td>{d.amount}</td>
                          <td>
                            {d.status == 1
                              ? "Success"
                              : d.status == -2
                              ? "Cancel"
                              : "Pending"}
                          </td>
                          <td>
                            <div className="list-inline-item">{d.to_address}</div>
                            <CopyToClipboard
                              text={d.to_address}
                              onCopy={() =>
                                NotificationManager.info("Copied!")
                              }
                            >
                              <button
                                className="btn btn-theme-color"
                                type="button"
                                
                              >
                                COPY
                              </button>
                            </CopyToClipboard>
                          </td>
                          <td>
                            <div className="list-inline-item"
                              style={{
                                width: "200px",
                              }}
                              >
                                {d.tx_id ? d.tx_id.substr(0,20)+"..." : ''}
                            </div>
                            <CopyToClipboard
                              text={d.tx_id}
                              onCopy={() =>
                                NotificationManager.info("Copied!")
                              }
                            >
                              <button
                                className="btn btn-theme-color"
                                type="button"
                                
                              >
                                COPY
                              </button>
                            </CopyToClipboard>
                          </td>
                          <td>{new Date(d.createdAt).toLocaleString()}</td>
                        </tr>
                      ))
                    ) : null}
                  </tbody>
                ) : null}
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
