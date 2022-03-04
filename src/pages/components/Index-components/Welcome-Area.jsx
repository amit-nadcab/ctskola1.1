import React, { useState, useEffect } from "react";
import {
  buyToken,
  calBuyAmt,
  calcBuyToken,
  getBUSDBalance,
  getCurrentBlock,
  getPastEvent,
  getTokenPrice,
  getTotalBuy,
} from "../../redux/helpers/contract_functions";
import { sendPastEventData } from "../../redux/helpers/api_functions";
import { NotificationManager } from "react-notifications";
import { RiWallet3Line } from "react-icons/ri";

export default function WelcomeArea(props) {
  const [amount, setAmount] = useState();
  const [progress, setProgress] = useState(0);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [calcPrice, setCalcPrice] = useState(0);
  const [currentPrice, setCurrentPrice] = useState();
  function init__() {
    getTotalBuy()
      .then((d) => {
        console.log("D", d);
        setProgress((d * 100) / 20000000);
      })
      .catch((e) => {
        console.log(e);
      });
    getTokenPrice()
      .then((d) => {
        console.log("token price", d);
        setCurrentPrice(d);
      })
      .catch((e) => console.log(e));
    getBUSDBalance()
      .then((d) => {
        setBalance(d);
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    console.log("refferal id", props?.match?.params?.id);
    getPastEvent()
      .then((d) => {
        getCurrentBlock().then((block) => {
          sendPastEventData(d, block)
            .then((data) => {
              console.log(data);
            })
            .catch((e) => console.log(e));
        });
      })
      .catch((e) => {
        console.log((e) => {
          console.log(e);
        });
      });
    init__();
  }, [window.contract]);

  return (
    <section className="hero-section moving section-padding" id="home">
      <div className="moving-bg"></div>
      {/* <!-- Hero Content --> */}
      <div className="hero-section-content">
        <div className="container ">
          <div className="row align-items-center">
            {/* <!-- Welcome Content --> */}

            <div className="col-lg-6">
              <div className="dotted mt-30 fadeInUp" data-wow-delay="0.5s">
                <img src="/img/platform2.png" alt="" />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="col-12 ">
                <div className="ico-counter mb-30">
                  <div className="counter-down">
                    <div className="content">
                      <div className="conuter-header">
                        <h3 className=" text-center">
                          TOKEN SALE ENDS IN
                        </h3>
                      </div>
                      <div className="counterdown-content">
                        {/* <!-- Countdown  --> */}
                        <div className="count-down titled circled text-center">
                          <div className="simple_timer"></div>
                        </div>

                        <div className="ico-progress">
                          <ul className="list-unstyled list-inline clearfix mb-10">
                            <li className="strength">75m</li>
                            <li className="title pull-right pr-0 pr-md-4">
                              33m
                            </li>
                          </ul>
                          {/* <!-- skill strength --> */}
                          <div className="current-progress">
                            <div
                              className="progress-bar has-gradient"
                              style={{ width: progress + "%" }}
                            ></div>
                          </div>
                          <span className="pull-right">Hardcap</span>
                          <span className="pull-right pr-3">Softcap</span>
                        </div>
                        <div className="text-center">
                          <div className="col-9 row mt-5">
                            <div className="col-5 text-left px-0">
                              <b>Current Price :</b>
                            </div>
                            <div className="col-6 text-left text-success px-0">
                              <b>
                                {" "}
                                {currentPrice ? currentPrice : "     "} BUSD
                              </b>
                            </div>
                          </div>
                          <div className="col-3"></div>
                        </div>
                        <div className="text-center">
                          <div className="input-group my-1">
                            <input
                              type="text"
                              className="form-control mt-1"
                              placeholder="Enter Token Amount .."
                              value={amount}
                              onChange={(e) => {
                                setAmount(
                                  e.target.value
                                    .replace(/[^0-9]/g, "")
                                    .replace(/(\..*?)\..*/g, "$1")
                                );
                                calBuyAmt(
                                  e.target.value
                                    .replace(/[^0-9]/g, "")
                                    .replace(/(\..*?)\..*/g, "$1")
                                )
                                  .then((d) => setCalcPrice(d))
                                  .catch((e) => console.log(e));
                              }}
                            />
                            <div className="input-group-append">
                              <button
                                className="btn dream-btn mt-1 fadeInUp"
                                type="button"
                                disabled={loading}
                                onClick={() => {
                                  if (amount && amount >= 500) {
                                    calBuyAmt(Math.round(amount))
                                      .then((d) => {
                                        getBUSDBalance()
                                          .then((balnace) => {
                                            console.log(
                                              "calc Price",
                                              d,
                                              "balnce",
                                              balnace
                                            );
                                            if (d <= balnace) {
                                              setLoading(true);
                                              buyToken(
                                                amount,
                                                props?.match?.params?.id
                                              )
                                                .then((d) => {
                                                  init__();
                                                  setLoading(false);
                                                })
                                                .catch((e) => {
                                                  console.log(e);
                                                  setLoading(false);
                                                });
                                            } else {
                                              NotificationManager.error(
                                                "Insufficient Balance!"
                                              );
                                            }
                                          })
                                          .catch((e) => {
                                            console.log(e);
                                          });
                                      })
                                      .catch((e) => {
                                        console.log(e);
                                      });
                                  } else {
                                    NotificationManager.error(
                                      "Minimum buy amount should be 500"
                                    );
                                  }
                                }}
                              >
                                {loading ? (
                                  <div
                                    className="spinner-border mr-2"
                                    role="status"
                                    style={{ height: "1rem", width: "1rem" }}
                                  >
                                    <span className="sr-only">Loading...</span>
                                  </div>
                                ) : null}
                                Buy Token ({Math.round(calcPrice * 1000) / 1000}{" "}
                                BUSD)
                              </button>
                            </div>
                          </div>
                          <div className="col-12 row">
                            <div className="col-6 text-left">
                              <RiWallet3Line style={{height:"20px", width:"20px",}} /> {balance}{" "}
                              BUSD
                            </div>
                            <div className="col-6 text-right">
                              <span
                                className="pr-3 cursor"
                                onClick={() => {
                                  calcBuyToken(Math.floor(balance * 0.25))
                                    .then((d) => {
                                      setAmount(Math.floor(d));
                                      calBuyAmt(Math.floor(d))
                                        .then((d) => setCalcPrice(d))
                                        .catch((e) => console.log(e));
                                    })
                                    .catch((e) => console.log(e));
                                }}
                              >
                                25%
                              </span>
                              <span
                                className="pr-3 cursor"
                                onClick={() =>
                                  calcBuyToken(Math.floor(balance * 0.5))
                                    .then((d) => {
                                      setAmount(Math.floor(d));
                                      calBuyAmt(Math.floor(d))
                                        .then((d) => setCalcPrice(d))
                                        .catch((e) => console.log(e));
                                    })
                                    .catch((e) => console.log(e))
                                }
                              >
                                50%
                              </span>
                              <span
                                className="pr-3 cursor"
                                onClick={() =>
                                  calcBuyToken(Math.floor(balance * 0.75))
                                    .then((d) => {
                                      setAmount(Math.floor(d));
                                      calBuyAmt(Math.floor(d))
                                        .then((d) => setCalcPrice(d))
                                        .catch((e) => console.log(e));
                                    })
                                    .catch((e) => console.log(e))
                                }
                              >
                                75%
                              </span>
                              <span
                                className="pr-3 cursor"
                                onClick={() =>
                                  calcBuyToken(Math.floor(balance))
                                    .then((d) => {
                                      setAmount(Math.floor(d));
                                      calBuyAmt(Math.floor(d))
                                        .then((d) => setCalcPrice(d))
                                        .catch((e) => console.log(e));
                                    })
                                    .catch((e) => console.log(e))
                                }
                              >
                                100%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
