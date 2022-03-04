import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./login.css";
import { isOtp } from "./redux/helpers/form-validator.functions";
import { NotificationManager } from "react-notifications";
import { Link } from "react-router-dom";
import {
  N_verifyOTPMobileLogin,
} from "./redux/helpers/api_functions_new";
import { user_Login } from "./redux/actions/authActions";
export default function Authenticator(props) {
  const { otp_send, user } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const [otp, setOTP] = useState();
  const [loading, setLoading] = useState(false);
  if (!otp_send) props.history.push("/login");
  const submit = (e) => {
    e.preventDefault();
    if(isOtp(otp)) {
      setLoading(true);
      if(user.authenticator===1) {
        N_verifyOTPMobileLogin(user.email, otp).then((d) => {
            setLoading(false);
            if (d?.status == 200) {
              dispatch(
                user_Login(
                  user.email,
                  user.password,
                  () => {
                    setLoading(false);
                    props.history.replace("/exchange/btc-inr");
                  },
                  () => setLoading(false)
                )
              );
            } else {
              NotificationManager.error(d.msg);
            }
          });
      } else if(user.authenticator===2) {
      var speakeasy = require("speakeasy-latest");
    try {
      const { base32: secret } = user.authenticator_key; 
      var tokenValidates = speakeasy.totp.verify({
        secret:secret,
        encoding: 'base32',
        token:otp,
        window: 6
      });
        if(tokenValidates) {
          dispatch(
            user_Login(
              user.email,
              user.password,
              () => {
                setLoading(false);
                props.history.replace("/exchange/btc-inr");
              },
              () => setLoading(false)
            )
          );
        } else {
          console.log(tokenValidates, otp, secret)
          NotificationManager.error('Somthing Wrong!!');
          setLoading(false)
        }
    } catch(error) {
      console.error(error);
    };
      }
  } else {
    NotificationManager.error('OTP is Not Correct');
  }
  };
    return (
      <>
        <div className="signupContainer">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-12 col-sm-12">
                <form
                  className="signupform mdfthemetxt"
                  method="post"
                  onSubmit={submit}
                  id="loginForm"
                  autoComplete="off"
                >
                  <div>
                    <h2>Verify Your {user.authenticator===1?'Mobile Authentication':'Google Authentication'}</h2>
                  </div>
                  <div className={`signupform-control`}>
                    <label htmlFor="user_otp">OTP</label>
                    <input
                      type="text"
                      name="user_otp"
                      id="user_otp"
                      maxLength={6}
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
                    className="reg_btn"
                  >
                    {loading ? (
                      <i className="loading-icon fas fa-spinner fa-spin mr-2"></i>
                    ) : null}
                    <span id="reg">Verify OTP</span>
                  </button>
                  <Link className="signupform-login" to="/login">
                  Back
                </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
