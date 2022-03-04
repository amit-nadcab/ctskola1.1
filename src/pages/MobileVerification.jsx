import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import FullLoader from "./components/FullLoader";
import { useSelector } from "react-redux";
import "./login.css";
import { NotificationManager } from "react-notifications";
import {
  N_checkMobileStatus,
  N_sendOTPMobile,
  N_verifyOTPMobile,
} from "./redux/helpers/api_functions_new";
export default function MobileVerification(props) {
  const { isLoggedIn } = useSelector((state) => state.AuthReducer);
  const { user } = useSelector((state) => state.AuthReducer);
  const [mobile, setMobile] = useState();
  const [old_mobile, setOldMobile] = useState();
  const [action, setAction] = useState();
  const [disable, setDisable] = useState(true);
  const [disableSend, setDisableSend] = React.useState(false);
  const [fullScreenLoader, setFullScreenLoader] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [otploader, setOtpLoader] = useState(false);
  const [isOtpSend, setOtpSend] = useState(false);
  const [otp, setOTP] = useState();
  const [ctime, setctime] = useState("01:00");

  // if (!isLoggedIn) props.history.replace("/login");
  let newparams = new URLSearchParams(window.location.search);
  // console.log("props: ",newparams.get('action'), newparams.get('mob'), props)
  useEffect(() => {
      if(newparams.get('mob')){
        setOldMobile(newparams.get('mob'))
      }
      if(newparams.get('action')){
        setAction(newparams.get('action'))
      }
      if(action != "edit"){
        N_checkMobileStatus(user?.params ? user.params.user_id : user.user_id)
          .then((d) => {
            if (d.status === 200 && d.params.is_mobile === 1) {
              // props.history.replace("/exchange/btc-inr");
              
            }
            setFullScreenLoader(false);
          })
          .catch((e) => {
            console.log(e);
          });
      }
  }, []);
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      setDisableSend(false);
      return <></>;
    } else {
      // Render a countdown
      setDisableSend(true);
      return (
        <span className="text-success text-right h5">
          0{minutes}:{seconds}
        </span>
      );
    }
  };

  const otpCountdown = () => {
    let duration = 60;
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

  if (fullScreenLoader) return <FullLoader />;
  else
    return (
      <>
        <Header {...props} />
        <div className="signupContainer">
          <div className="container shead-bg">
            <div className="row">
              <div className="col-12 col-md-12 col-sm-12">
                <form
                  className="signupform theme-color-text"
                  method="post"
                  onSubmit={(e) => e.preventDefault()}
                  id="loginForm"
                  autoComplete="off"
                >
                  <div>
                    <h2 className="g_color">{action && action == 'edit' ? "Edit " : 'Verify '} Your Mobile Number</h2>
                  </div>
                  <div className={`signupform-control`}>
                    <small id="msg" style={{ fontSize: "15px" }}>
                      Error Message
                    </small>
                  </div>
                  <div className="signupform-control g_color">
                    <label htmlFor="user_mobile">{action && action == 'edit' ? 'Old' : ''} Mobile Number: {action && action == 'edit' && old_mobile ? old_mobile : ''}</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        id="user_mobile"
                        value={mobile}
                        maxLength={10}
                        onChange={(e) =>
                          setMobile(
                            e.target.value
                              .replace(/[^0-9.]/g, "")
                              .replace(/(\..*?)\..*/g, "$1")
                          )
                        }
                        placeholder="Enter your 10 digit mobile number"
                      />
                      <div className="input-group-append">
                        {!isOtpSend ? (
                          <button
                            className="btn bg-transparent btn-outline-light text-info"
                            type="button"
                            disabled={disableSend}
                            onClick={() => {
                              if (mobile?.length === 10) {
                                setOtpLoader(true);
                                N_sendOTPMobile(
                                  user?.params
                                    ? user.params.user_id
                                    : user.user_id,
                                  mobile
                                ).then((d) => {
                                  if (d.status == 200) {
                                    NotificationManager.success(d.message);
                                    setDisable(false);
                                    setOtpSend(true);
                                    otpCountdown();
                                  } else {
                                    NotificationManager.error(d.message);
                                  }
                                  setOtpLoader(false);
                                });
                              } else {
                                NotificationManager.error(
                                  "Please Enter valid Mobile number"
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
                            className="btn btn-outline-info btn-outline-light text-info"
                          >
                            {isOtpSend ? ctime : null}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={`signupform-control g_color`}>
                    <label htmlFor="user_otp">OTP</label>
                    <input
                      type="text"
                      name="user_otp"
                      id="otp"
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
                    type="submit"
                    className="reg_btn btn-theme-color"
                    onClick={() => {
                      if (!isNaN(otp) && otp?.length === 6) {
                        setLoading(true);
                        N_verifyOTPMobile(
                          user?.params ? user.params.user_id : user.user_id,
                          otp
                        ).then((d) => {
                          setLoading(false);
                          if (d?.status == 200) {
                            props.history.push("/welcome");
                          } else {
                            NotificationManager.error(d.message);
                          }
                        });
                      } else {
                        NotificationManager.error("invalid Otp !");
                      }
                    }}
                  >
                    {loading ? (
                      <i className="loading-icon fas fa-spinner fa-spin mr-2"></i>
                    ) : null}
                    <span id="reg">Verify OTP</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
