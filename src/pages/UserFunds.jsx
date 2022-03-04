import React, { useState } from "react";
import Header from "./components/Header";
import QRCode from "qrcode.react";
import {useSelector } from "react-redux";

export default function UserFunds(props) {
  const [copied, setCopied] = useState();
  const [wallet_details, setWalletDetails] = useState([]);
  const { webData } = useSelector((state) => state.websiteDBReducer);
  
  return (
    <>
      <Header {...props}/>
      <div className={`${webData.bg_color}` + " box"} style={{marginTop:"5em", backgroundColor: webData.bg_color_code}}>
        <div className="box-header with-border">
          <h4 className="box-title">Funds And Transfer</h4>
        </div>
        <div className="d-flex align-items-center justify-content-between px-15">
          <div className="btn-group custom-grp color-btn">
            <button type="button" className="btn btn-primary btn-sm active">
              Funds
            </button>
            <button type="button" className="btn btn-primary btn-sm">
              Transfer History
            </button>
          </div>

          <ul className="box-controls pull-right mr-4">
            <li>
              Total: <strong className="wht-col">832.157</strong> INR
            </li>
          </ul>
        </div>
        <div className="box-body px-15 pt-0 pb-10">
          <div className="table-responsive">
            <table className="table table-border no-margin">
              <thead>
                <tr className="bg-pale-dark">
                  <th>Assets</th>
                  <th>Available Balance</th>
                  <th>Locked</th>
                  <th>Total</th>
                  <th>INR Value</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {wallet_details
                  ? wallet_details.map((item) => (
                      <>
                        <tr>
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
                            )}
                            {item.name} ({item.symbol})
                          </td>
                          <td>{item.balance}</td>
                          <td>{item.balance}</td>
                          <td>{item.balance}</td>
                          <td>{item.balance}</td>
                          <td>
                            {item.address ? (
                              item.id === 0 && item.symbol === "INR" ? (
                                <>
                                  <button
                                    className="btn btn-outline-secondary mr-2"
                                    id="deposit"
                                    data-toggle="collapse"
                                    data-target={"#inr_" + item.symbol}
                                    aria-expanded="false"
                                    // onClick={(e) =>
                                    //   changeCollapse(e, "#inr_" + item.symbol)
                                    // }
                                  >
                                    Deposit
                                  </button>
                                  <button
                                    className="btn btn-outline-secondary"
                                    id="withdraw"
                                    data-toggle="collapse"
                                    data-target={"#inr_" + item.symbol}
                                    aria-expanded="false"
                                    // onClick={(e) =>
                                    //   changeCollapse(e, "#inr_" + item.symbol)
                                    // }
                                  >
                                    Withdraw
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    type="button"
                                    className="btn btn-outline-secondary mr-2"
                                    id="deposit"
                                    data-toggle="collapse"
                                    data-target={"#deposit_" + item.symbol}
                                    aria-expanded="false"
                                    // onClick={(e) =>
                                    //   changeCollapse(
                                    //     e,
                                    //     "#deposit_" + item.symbol
                                    //   )
                                    // }
                                  >
                                    Deposit
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    id="withdraw"
                                    data-toggle="collapse"
                                    data-target={"#withdraw_" + item.symbol}
                                    aria-expanded="false"
                                    // onClick={(e) =>
                                    //   changeCollapse(
                                    //     e,
                                    //     "#withdraw_" + item.symbol
                                    //   )
                                    // }
                                  >
                                    Withdraw
                                  </button>
                                </>
                              )
                            ) : (
                              ""
                            )}
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
                                      Send to your Secure {item.name} Address
                                    </div>
                                    <hr className="h_r" />
                                  </div>
                                  <div className="signupform-control">
                                    <label htmlFor="coin_address">
                                      Destination Address
                                    </label>
                                    {/* <CopyToClipboard
                                      text={item.address}
                                      onCopy={() => setCopied({ copied: true })}
                                    >
                                      {copied ? (
                                        <span
                                          className="cop_btn"
                                          style={{
                                            color: "red",
                                            cursor: "none",
                                          }}
                                        >
                                          Copied
                                        </span>
                                      ) : (
                                        <span
                                          className="cop_btn"
                                          style={{ color: "green" }}
                                        >
                                          <i
                                            className="fas fa-copy"
                                            aria-hidden="true"
                                          ></i>
                                          Copy
                                        </span>
                                      )}
                                    </CopyToClipboard> */}
                                    <input
                                      type="text"
                                      className="input_button"
                                      value={item.address}
                                    />
                                  </div>
                                  <div className="signupform-control">
                                    <div>
                                      <i
                                        className="fas fa-warning"
                                        aria-hidden="true"
                                      ></i>
                                      Disclaimer
                                    </div>
                                    <hr className="h_r" />
                                    <label htmlFor="disclaimer">
                                      Please Deposit only {item.symbol} to this
                                      address. If you Deposit any other coins,
                                      It will be lost forever.
                                    </label>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="signupform-control">
                                    <div>Or Scan This QR Code</div>
                                    <hr className="h_r" />
                                  </div>
                                  <div className="signupform-control">
                                    <QRCode value={item.address} />
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
                                      Transfer {item.name} from your {webData.website_title} Wallet
                                      to Another
                                    </div>
                                    <hr className="h_r" />
                                  </div>
                                  <div className="signupform-control">
                                    <label htmlFor="coin_address">Valume</label>
                                    <label
                                      htmlFor="coin_val"
                                      style={{ float: "right" }}
                                    >
                                      Available {item.symbol}: {item.balance}
                                    </label>
                                    <input
                                      type="text"
                                      className="input_button"
                                    />
                                  </div>
                                  <div className="signupform-control">
                                    <label htmlFor="coin_address">
                                      Destination Address
                                    </label>
                                    <input
                                      type="text"
                                      className="input_button"
                                    />
                                  </div>
                                  <div className="signupform-control">
                                    <label htmlFor="coin_address">Remark</label>
                                    <input
                                      type="text"
                                      className="input_button"
                                    />
                                  </div>
                                  <div className="signupform-control">
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                    >
                                      PROCEED WITH WITHDRAWAL
                                    </button>
                                  </div>
                                  <div className="signupform-control">
                                    <div>Disclaimer</div>
                                    <hr className="h_r" />
                                    <label htmlFor="disclaimer">
                                      Please Deposit only {item.symbol} to this
                                      address. If you Deposit any other coins,
                                      It will be lost forever.
                                    </label>
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
                                <div className="card">
                                  <div className="card-header">INR Deposit</div>
                                  <div className="card-body">
                                    <h5 className="card-title">
                                      Instant Deposit (Recommended)
                                    </h5>
                                    <a href="/bankInfo" className="btn btn-primary">
                                      Available
                                    </a>
                                    <p className="card-text">
                                      IMPS, RTGS & NEFT | Automatic | Fee: INR 6
                                      per transection | Minimum deposit amount:
                                      INR 100
                                    </p>
                                  </div>
                                  <div className="card-body">
                                    <h5 className="card-title">
                                      Instant Deposit With UPI
                                    </h5>
                                    {/* <a href="/" className="btn btn-primary">TEMPORARILY UNAVAILABLE</a> */}
                                    <div>TEMPORARILY UNAVAILABLE</div>
                                    <p className="card-text">
                                      IMPS, RTGS & NEFT | Automatic | Fee: INR 6
                                      per transection | Minimum deposit amount:
                                      INR 100
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </>
                    ))
                  : ""}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
