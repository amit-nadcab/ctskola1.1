import React, { useState, useEffect } from "react";
import {  useSelector } from "react-redux";
import "./login.css";
import { NotificationManager } from "react-notifications";
import {  NavLink } from "react-router-dom";
import {
  N_get_settings,
  N_setGoogleAuthOtp,
} from "./redux/helpers/api_functions_new";
export default function Account_Authenticator(props) {
  const { user } = useSelector((state) => state.AuthReducer);
  const [otp, setOTP] = useState();
  const [authenticator_key, setAuthenticator] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    N_get_settings(user?.params ? user.params.user_id : user.user_id)
      .then((d) => {
        console.log("get setting: ", d);
        if (d.status === 200) {
          setAuthenticator(d.params.authenticator_key);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const submit = (e) => {
    e.preventDefault();
    var speakeasy = require("speakeasy-latest");
    try {
      const { base32: secret } = authenticator_key;
      var tokenValidates = speakeasy.totp.verify({
        secret: secret,
        encoding: "base32",
        token: otp,
        window: 6,
      });
      if (tokenValidates) {
        N_setGoogleAuthOtp(user?.params ? user.params.user_id : user.user_id, 2)
          .then((res) => {
            // if (res.status === 200) {
            console.log("set gauth: ", res);
            NotificationManager.success(res.message);
            props.history.replace("/exchange/btc-inr");

            // }
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        console.log(tokenValidates, otp, secret);
        NotificationManager.error("Somthing Wrong!!");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="signupContainer">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-12 col-sm-12">
              <form
                className="signupform"
                method="post"
                onSubmit={submit}
                id="loginForm"
                autoComplete="off"
              >
                <div>
                  <h2>Verify Your Google Authentication</h2>
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
                <button type="submit" className="reg_btn">
                  {loading ? (
                    <i className="loading-icon fas fa-spinner fa-spin mr-2"></i>
                  ) : null}
                  <span id="reg">Verify OTP</span>
                </button>
                <NavLink className="signupform-login" to="/2fa">
                  Back
                </NavLink>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
