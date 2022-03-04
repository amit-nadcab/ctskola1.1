import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import FullLoader from "./components/FullLoader";
import { useSelector } from "react-redux";
import "./login.css";
import { NotificationManager } from "react-notifications";
import {
  N_checkKYCStatus,
  N_panVerify,
  N_sendAADHAROTPMobile,
  N_verifyAADHAROTPMobile,
} from "./redux/helpers/api_functions_new";
import { Link } from "react-router-dom";
export default function KYCVerification(props) {
  const { isLoggedIn } = useSelector((state) => state.AuthReducer);
  const { user } = useSelector((state) => state.AuthReducer);
  const [mobile, setMobile] = useState();
  const [aadhar_no, setAadharNo] = useState();
  const [type_of_kyc, setTypeofKyc] = useState("Individual");
  const [client_id, setClientId] = useState();
  const [disable, setDisable] = useState(true);
  const [visibl, setVisiblity] = useState("h");
  const [disableSend, setDisableSend] = useState(false);
  const [fullScreenLoader, setFullScreenLoader] = useState(true);
  const [loading, setLoading] = useState(false);
  const [otploader, setOtpLoader] = useState(false);
  const [isverifypan, isVerifyPan] = useState(false);
  const [isOtpSend, setOtpSend] = useState(false);
  const [aadharVerify, setAadharVerify] = useState(false);
  const [otp, setOTP] = useState();
  const [ctime, setctime] = useState("10:00");
  const [personalData, setPersnalData] = useState();
  const [ispanverify, setPanVerify] = useState(false);
  const [pan_no, setPanNo] = useState();
  if (!isLoggedIn) props.history.replace("/login");
  const otpCountdown = () => {
    let duration = 600;
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
        setOtpSend(false);
      }
    }, 1000);
  };
  useEffect(() => {
    N_checkKYCStatus(user?.params ? user.params.user_id : user.user_id).then(
      (d) => {
        if (d.status === 200) {
          if (d.params.kyc_status === 1)
            props.history.replace("/exchange/btc-inr");
        }
        setFullScreenLoader(false);
      }
    );
  }, []);
  if (fullScreenLoader) return <FullLoader />;
  else
    return (
      <>
        <Header {...props} />
        <div className="signupContainer mdfthemetxt">
          <div className="container shead-bg">
            <div className="row">
              <div className="col-12 col-md-12 col-sm-12">
                <form
                  className="signupform theme-color-text"
                  method="post"
                  id="loginForm"
                  autoComplete="off"
                >
                  <div>
                    <h2 className="g_color">KYC Form</h2>
                  </div>
                  <div className="signupform-control">
                    <label htmlFor="type_of_kyc">TYPE OF KYC</label>
                    <select
                      id="type_of_kyc"
                      name="type_of_kyc"
                      className="form-control"
                      data-role="select-dropdown"
                      onChange={(e) => {
                        setTypeofKyc(e.target.value);
                      }}
                    >
                      <option value="Individual">Individual</option>
                      <option value="Corporate">Corporate</option>
                    </select>
                  </div>
                  <div className="signupform-control" id="kyc_btn">
                    <div className="feature_checklist">
                      <div className="feature_checklist_section partial">
                        <div className="feature_checklist_section_title">
                          WITHOUT KYC
                        </div>
                        <ul className="feature_checklist_section_list">
                          <li className="feature_checklist_section_item">
                            <svg
                              viewBox="0 0 48 48"
                              width="12"
                              height="12"
                              fill="#FFC800"
                            >
                              <path
                                d="m24 48c-13.254834 0-24-10.745166-24-24s10.745166-24 24-24 24 10.745166 24 24-10.745166 24-24 24zm12.5693021-33.5729524c-.5066705-.502545-1.3281286-.502545-1.8349005 0l-15.5444523 15.4164894-5.9750331-5.9257883c-.5066706-.502545-1.3281287-.5024947-1.8349006 0-.5067213.5024947-.5067213 1.3171825 0 1.8197275l6.8924834 6.8355767c.5065185.5024947 1.3285848.5021429 1.8349006 0l16.4619025-16.3262275c.5067213-.5024947.5066706-1.3172328 0-1.8197778z"
                                fill="#55bd6c"
                              ></path>
                            </svg>
                            <span className="feature_checklist_section_item_text">
                              Deposit
                            </span>
                          </li>
                          <li className="feature_checklist_section_item">
                            <svg
                              viewBox="0 0 48 48"
                              width="12"
                              height="12"
                              fill="#FFC800"
                            >
                              <path
                                d="m24 48c-13.254834 0-24-10.745166-24-24s10.745166-24 24-24 24 10.745166 24 24-10.745166 24-24 24zm12.5693021-33.5729524c-.5066705-.502545-1.3281286-.502545-1.8349005 0l-15.5444523 15.4164894-5.9750331-5.9257883c-.5066706-.502545-1.3281287-.5024947-1.8349006 0-.5067213.5024947-.5067213 1.3171825 0 1.8197275l6.8924834 6.8355767c.5065185.5024947 1.3285848.5021429 1.8349006 0l16.4619025-16.3262275c.5067213-.5024947.5066706-1.3172328 0-1.8197778z"
                                fill="#55bd6c"
                              ></path>
                            </svg>
                            <span className="feature_checklist_section_item_text">
                              Trade
                            </span>
                          </li>
                          <li className="feature_checklist_section_item">
                            <svg
                              viewBox="0 0 48 48"
                              width="12"
                              height="12"
                              fill="rgba(28, 27, 33, 0.24)"
                            >
                              <path d="m24 48c-13.254834 0-24-10.745166-24-24s10.745166-24 24-24 24 10.745166 24 24-10.745166 24-24 24zm2.5259167-23.5067083 9.039-9.039c.5615833-.5611042.5615833-1.4715209 0-2.032625-.5615834-.5615834-1.4710417-.5615834-2.032625 0l-9.039 9.039-9.0394792-9.039c-.5615833-.5615834-1.4710417-.5615834-2.032625 0-.5615833.5611041-.5615833 1.4715208 0 2.032625l9.0394792 9.039-9.0394792 9.039c-.5615833.5611041-.5615833 1.4715208 0 2.032625.2807917.2803125.6487917.4207083 1.0163125.4207083s.7355208-.1403958 1.0163125-.4211875l9.0394792-9.039 9.039 9.039c.2807916.2807917.6487916.4211875 1.0163125.4211875.3675208 0 .7355208-.1403958 1.0163125-.4211875.5615833-.5611042.5615833-1.4715208 0-2.032625z"></path>
                            </svg>
                            <span className="feature_checklist_section_item_text disabled">
                              Withdrawal
                            </span>
                          </li>
                          <li className="feature_checklist_section_item">
                            <svg
                              viewBox="0 0 48 48"
                              width="12"
                              height="12"
                              fill="rgba(28, 27, 33, 0.24)"
                            >
                              <path d="m24 48c-13.254834 0-24-10.745166-24-24s10.745166-24 24-24 24 10.745166 24 24-10.745166 24-24 24zm2.5259167-23.5067083 9.039-9.039c.5615833-.5611042.5615833-1.4715209 0-2.032625-.5615834-.5615834-1.4710417-.5615834-2.032625 0l-9.039 9.039-9.0394792-9.039c-.5615833-.5615834-1.4710417-.5615834-2.032625 0-.5615833.5611041-.5615833 1.4715208 0 2.032625l9.0394792 9.039-9.0394792 9.039c-.5615833.5611041-.5615833 1.4715208 0 2.032625.2807917.2803125.6487917.4207083 1.0163125.4207083s.7355208-.1403958 1.0163125-.4211875l9.0394792-9.039 9.039 9.039c.2807916.2807917.6487916.4211875 1.0163125.4211875.3675208 0 .7355208-.1403958 1.0163125-.4211875.5615833-.5611042.5615833-1.4715208 0-2.032625z"></path>
                            </svg>
                            <span className="feature_checklist_section_item_text disabled">
                              P2P
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="feature_checklist_section">
                        <div className="feature_checklist_section_title">
                          WITH KYC
                        </div>
                        <ul className="feature_checklist_section_list">
                          <li className="feature_checklist_section_item">
                            <svg
                              viewBox="0 0 48 48"
                              width="12"
                              height="12"
                              fill="#FFC800"
                            >
                              <path
                                d="m24 48c-13.254834 0-24-10.745166-24-24s10.745166-24 24-24 24 10.745166 24 24-10.745166 24-24 24zm12.5693021-33.5729524c-.5066705-.502545-1.3281286-.502545-1.8349005 0l-15.5444523 15.4164894-5.9750331-5.9257883c-.5066706-.502545-1.3281287-.5024947-1.8349006 0-.5067213.5024947-.5067213 1.3171825 0 1.8197275l6.8924834 6.8355767c.5065185.5024947 1.3285848.5021429 1.8349006 0l16.4619025-16.3262275c.5067213-.5024947.5066706-1.3172328 0-1.8197778z"
                                fill="#55bd6c"
                              ></path>
                            </svg>
                            <span className="feature_checklist_section_item_text">
                              Deposit
                            </span>
                          </li>
                          <li className="feature_checklist_section_item">
                            <svg
                              viewBox="0 0 48 48"
                              width="12"
                              height="12"
                              fill="#FFC800"
                            >
                              <path
                                d="m24 48c-13.254834 0-24-10.745166-24-24s10.745166-24 24-24 24 10.745166 24 24-10.745166 24-24 24zm12.5693021-33.5729524c-.5066705-.502545-1.3281286-.502545-1.8349005 0l-15.5444523 15.4164894-5.9750331-5.9257883c-.5066706-.502545-1.3281287-.5024947-1.8349006 0-.5067213.5024947-.5067213 1.3171825 0 1.8197275l6.8924834 6.8355767c.5065185.5024947 1.3285848.5021429 1.8349006 0l16.4619025-16.3262275c.5067213-.5024947.5066706-1.3172328 0-1.8197778z"
                                fill="#55bd6c"
                              ></path>
                            </svg>
                            <span className="feature_checklist_section_item_text">
                              Trade
                            </span>
                          </li>
                          <li className="feature_checklist_section_item">
                            <svg
                              viewBox="0 0 48 48"
                              width="12"
                              height="12"
                              fill="#FFC800"
                            >
                              <path
                                d="m24 48c-13.254834 0-24-10.745166-24-24s10.745166-24 24-24 24 10.745166 24 24-10.745166 24-24 24zm12.5693021-33.5729524c-.5066705-.502545-1.3281286-.502545-1.8349005 0l-15.5444523 15.4164894-5.9750331-5.9257883c-.5066706-.502545-1.3281287-.5024947-1.8349006 0-.5067213.5024947-.5067213 1.3171825 0 1.8197275l6.8924834 6.8355767c.5065185.5024947 1.3285848.5021429 1.8349006 0l16.4619025-16.3262275c.5067213-.5024947.5066706-1.3172328 0-1.8197778z"
                                fill="#55bd6c"
                              ></path>
                            </svg>
                            <span className="feature_checklist_section_item_text">
                              Withdrawal
                            </span>
                          </li>
                          <li className="feature_checklist_section_item">
                            <svg
                              viewBox="0 0 48 48"
                              width="12"
                              height="12"
                              fill="#FFC800"
                            >
                              <path
                                d="m24 48c-13.254834 0-24-10.745166-24-24s10.745166-24 24-24 24 10.745166 24 24-10.745166 24-24 24zm12.5693021-33.5729524c-.5066705-.502545-1.3281286-.502545-1.8349005 0l-15.5444523 15.4164894-5.9750331-5.9257883c-.5066706-.502545-1.3281287-.5024947-1.8349006 0-.5067213.5024947-.5067213 1.3171825 0 1.8197275l6.8924834 6.8355767c.5065185.5024947 1.3285848.5021429 1.8349006 0l16.4619025-16.3262275c.5067213-.5024947.5066706-1.3172328 0-1.8197778z"
                                fill="#55bd6c"
                              ></path>
                            </svg>
                            <span className="feature_checklist_section_item_text">
                              P2P
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="backbtn"
                      onClick={() => {
                        props.history.push("/exchange/btc-inr");
                      }}
                    >
                      SKIP FOR NOW
                    </button>
                    <button
                      type="button"
                      id="proceed_btn"
                      className="sendbtn"
                      onClick={(e) => {
                        const kyc_btn = e.target.parentElement;
                        kyc_btn.className = "signupform-control h";
                        document.getElementById("verify_pan").style.display =
                          "block";
                      }}
                    >
                      COMPLETE KYC
                    </button>
                  </div>
                  <div id="verify_pan" style={{ display: "none" }}>
                    <div className="signupform-control g_color">
                      <label htmlFor="user_mobile">PAN Number:</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          id="pan_no"
                          name="pan_no"
                          value={pan_no}
                          maxLength={10}
                          minLength={10}
                          onChange={(e) => setPanNo(e.target.value)}
                          placeholder="Enter your PAN number"
                        />
                        <div className="input-group-append">
                          {!ispanverify ? (
                            <button
                              className="btn bg-transparent btn-outline-light text-info"
                              type="button"
                              disabled={disableSend}
                              onClick={() => {
                                if (pan_no?.length === 10) {
                                  isVerifyPan(true);
                                  N_panVerify(
                                    pan_no,
                                    user?.params
                                      ? user.params.user_id
                                      : user.user_id
                                  ).then((d) => {
                                    if (d.status == 200) {
                                      NotificationManager.success(d.message);
                                      setPanVerify(true);
                                    } else {
                                      NotificationManager.error(d.message);
                                      setPanNo("");
                                      document.getElementById(
                                        "pan_id"
                                      ).style.display = "block";
                                    }
                                    isVerifyPan(false);
                                  });
                                } else {
                                  NotificationManager.error(
                                    "Please Enter valid PAN number"
                                  );
                                }
                              }}
                              id="button-addon2"
                            >
                              {isverifypan ? (
                                <span className="loading-icon fas fa-spinner fa-spin mr-2"></span>
                              ) : (
                                "Verify"
                              )}
                            </button>
                          ) : (
                            <button
                              type="button"
                              id="button-addon2"
                              disabled="disabled"
                              className="btn bg-transparent btn-outline-light text-danger"
                            >
                              Verified
                            </button>
                          )}
                        </div>
                      </div>
                      <div
                        id="pan_id"
                        className="mt-2"
                        style={{ display: "none" }}
                      >
                        If Your Pan is Not Valid then{" "}
                        <Link to="/welcome">Click here</Link> to fill Manual
                        Record
                        <p>
                          <b
                            style={{ fontSize: "15px" }}
                            className=" text-danger"
                          >
                            Note:
                          </b>
                          <strong
                            style={{ fontSize: "12px", fontWeight: "500" }}
                          >
                            &nbsp;&nbsp;&nbsp;If you fill kyc manually, then you
                            have to wait for 72 hours for KYC verification.
                          </strong>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div id="verify_aadhar" className={ispanverify ? "vis" : "h"}>
                    <div className="signupform-control g_color">
                      <label htmlFor="user_aadhar">AADHAR Number:</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          id="user_aadhar"
                          name="user_aadhar"
                          value={aadhar_no}
                          maxLength={12}
                          minLength={12}
                          onChange={(e) =>
                            setAadharNo(
                              e.target.value
                                .replace(/[^0-9.]/g, "")
                                .replace(/(\..*?)\..*/g, "$1")
                            )
                          }
                          placeholder="Enter your AADHAR number"
                        />
                        <div className="input-group-append">
                          {!isOtpSend ? (
                            <button
                              className="btn bg-transparent btn-outline-light text-info"
                              type="button"
                              disabled={disableSend}
                              onClick={() => {
                                if (aadhar_no?.length === 12) {
                                  setOtpLoader(true);
                                  N_sendAADHAROTPMobile(
                                    aadhar_no,
                                    user?.params
                                      ? user.params.user_id
                                      : user.user_id
                                  ).then((d) => {
                                    console.log(d);
                                    if (d.status == 200) {
                                      NotificationManager.success(d.message);
                                      setClientId(d.result);
                                      setDisable(false);
                                      setOtpSend(true);
                                      otpCountdown();
                                    } else {
                                      NotificationManager.error(d.message);
                                      setAadharNo("");
                                      document.getElementById(
                                        "pan_id"
                                      ).style.display = "block";
                                    }
                                    setOtpLoader(false);
                                  });
                                } else {
                                  NotificationManager.error(
                                    "Please Enter valid AADHAR number"
                                  );
                                }
                              }}
                              id="button-addon2"
                            >
                              {otploader ? (
                                <span className="loading-icon fas fa-spinner fa-spin mr-2"></span>
                              ) : (
                                "Send"
                              )}
                            </button>
                          ) : (
                            <button
                              type="button"
                              id="button-addon2"
                              disabled="disabled"
                              className="btn btn-outline-info btn-outline-light text-danger"
                            >
                              {isOtpSend ? ctime : null}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className={`signupform-control g_color`}>
                      <label htmlFor="user_mobile">MOBILE Number</label>
                      <input
                        type="text"
                        name="user_mobile"
                        id="user_mobile"
                        className="bg-white"
                        maxLength={10}
                        disabled={disable}
                        value={mobile}
                        onChange={(e) =>
                          setMobile(
                            e.target.value
                              .replace(/[^0-9.]/g, "")
                              .replace(/(\..*?)\..*/g, "$1")
                          )
                        }
                        required=""
                        placeholder="Enter your mobile number"
                      />
                      <i className="fas fa-check-circle"></i>
                      <i className="fas fa-exclamation-circle"></i>
                      <small></small>
                    </div>
                    <div
                      className={`signupform-control g_color ${
                        aadharVerify ? "h" : "vis"
                      }`}
                    >
                      <label htmlFor="user_otp">OTP</label>
                      <input
                        type="text"
                        name="user_otp"
                        id="user_otp"
                        className="bg-white"
                        maxLength={6}
                        disabled={disable}
                        value={otp}
                        onChange={(e) =>
                          setOTP(
                            e.target.value
                              .replace(/[^0-9.]/g, "")
                              .replace(/(\..*?)\..*/g, "$1")
                          )
                        }
                        required=""
                        placeholder="Enter 6 digit otp"
                      />
                      <i className="fas fa-check-circle"></i>
                      <i className="fas fa-exclamation-circle"></i>
                      <small></small>
                    </div>
                    <button
                      type="button"
                      id="aadhar_otp"
                      className={`reg_btn btn-theme-color`}
                      onClick={() => {
                        if (
                          !isNaN(otp) &&
                          !isNaN(mobile) &&
                          otp?.length === 6 &&
                          mobile?.length === 10
                        ) {
                          setLoading(true);
                          N_verifyAADHAROTPMobile(
                            client_id,
                            mobile,
                            otp,
                            user?.params ? user.params.user_id : user.user_id
                          ).then((d) => {
                            console.log(d);
                            setLoading(false);
                            if (d.status == 200) {
                              setVisiblity("vis");
                              setPersnalData(d.result);
                              setAadharVerify(true);
                              document.getElementById(
                                "aadhar_otp"
                              ).style.display = "none";
                              NotificationManager.success(d.message);
                            } else {
                              NotificationManager.error(d.message);
                            }
                          });
                        } else {
                          NotificationManager.error("invalid input !");
                        }
                      }}
                    >
                      {loading ? (
                        <i className="loading-icon fas fa-spinner fa-spin mr-2"></i>
                      ) : null}
                      <span id="reg">Verify OTP</span>
                    </button>
                  </div>
                  <div id="personal_info" className={visibl}>
                    <div>
                      <h3>PERSONAL INFO</h3>
                    </div>
                    <div className="signupform-control">
                      <label htmlFor="user_fname">FIRST NAME *</label>
                      <input
                        type="text"
                        name="user_name"
                        readOnly
                        className="signupform-control"
                        id="user_name"
                        value={personalData?.full_name}
                      />
                      <img
                        src={`data:image/png;base64,${personalData?.profile_image}`}
                        height="150px"
                        width="200px"
                        id="aadhar_selfie"
                        name="aadhar_selfie"
                        alt="adhar pic"
                      />
                    </div>
                    <div className="signupform-control">
                      <label htmlFor="gender">Gender *</label>
                      <input
                        type="text"
                        name="gender"
                        className="signupform-control"
                        id="gender"
                        readOnly
                        value={personalData?.gender == "M" ? "MALE" : "FEMALE"}
                      />
                    </div>
                    <div className="signupform-control">
                      <label htmlFor="user_dob">DATE OF BIRTH *</label>
                      <input
                        type="date"
                        name="user_dob"
                        id="user_dob"
                        readOnly
                        className="signupform-control"
                        value={personalData?.dob}
                      />
                    </div>
                    <div className="signupform-control">
                      <label htmlFor="user_address">Address *</label>
                      <textarea
                        className="form-control"
                        style={{
                          border: "2px solid #f0f0f0",
                          borderRadius: "4px",
                        }}
                        id="user_address"
                        name="user_address"
                        readOnly
                        rows="3"
                        value={
                          personalData?.address.house +
                          " " +
                          personalData?.address.vtc +
                          " " +
                          personalData?.address.po +
                          " " +
                          personalData?.address.landmark +
                          " " +
                          personalData?.address.loc
                        }
                      ></textarea>
                    </div>
                    <div className="signupform-control">
                      <label htmlFor="country">COUNTRY *</label>
                      <input
                        type="text"
                        name="country"
                        className="signupform-control"
                        id="country"
                        readOnly
                        value={personalData?.address.country}
                      />
                    </div>
                    <div className="signupform-control">
                      <label htmlFor="state">STATE *</label>
                      <input
                        type="text"
                        name="state"
                        className="signupform-control"
                        id="state"
                        readOnly
                        value={personalData?.address.state}
                      />
                    </div>
                    <div className="signupform-control">
                      <label htmlFor="country">CITY *</label>
                      <input
                        type="text"
                        name="city"
                        className="signupform-control"
                        id="city"
                        readOnly
                        value={personalData?.address.dist}
                      />
                    </div>
                    <div className="signupform-control">
                      <label htmlFor="user_pincode">PINCODE *</label>
                      <input
                        type="text"
                        name="user_pincode"
                        className="signupform-control"
                        id="user_pincode"
                        readOnly
                        value={personalData?.zip}
                      />
                    </div>
                    <button
                      type="button"
                      id="btn_submit"
                      className="reg_btn"
                      onClick={() => {
                        props.history.replace("/exchange/btc-inr");
                      }}
                    >
                      {loading ? (
                        <i className="loading-icon fas fa-spinner fa-spin mr-2"></i>
                      ) : null}
                      <span id="reg">SUBMIT</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
