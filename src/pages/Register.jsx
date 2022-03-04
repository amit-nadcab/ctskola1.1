import React, { useState } from "react";
import Header from "./components/Header";
import { Link } from "react-router-dom";
import {
  isCpass,
  isEmail,
  isPass,
} from "./redux/helpers/form-validator.functions";
import { useDispatch, useSelector } from "react-redux";
import { user_Register } from "./redux/actions/authActions";
import $ from "jquery";
import { NotificationManager } from "react-notifications";

export default function Register(props) {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.AuthReducer);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confPassword, setConfPassword] = useState();
  const [referral_code, setReferral] = useState(
    props?.match?.params?.id ? props?.match?.params?.id : ""
  );
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState();
  const { webData } = useSelector((state) => state.websiteDBReducer);
  if (isLoggedIn) props.history.replace("/exchange/btc-inr");
  const hsPassword = (_id) => {
    var _idv = document.querySelector("#" + _id);
    if (_idv.getAttribute("type") == "text") {
      _idv.setAttribute("type", "password");
    } else {
      _idv.setAttribute("type", "text");
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if (isEmail(email) && isPass(password) && isCpass(confPassword)) {
      if (agree) {
        $(".main_terms").removeClass("border-danger");
        setLoading(true);
        dispatch(
          user_Register(
            email,
            password,
            confPassword,
            referral_code,
            () => {
              setLoading(false);
              props.history.replace("/otp");
            },
            () => setLoading(false)
          )
        );
      } else {
        NotificationManager.error("Please Agree with term condition !");
        $(".main_terms").addClass("border-danger");
      }
    }
  };
  return (
    <>
      <Header {...props} />
      <div className="signupContainer mdfthemetxt">
        <div
          className={`${webData.bg_color}` + " container"}
          style={{ backgroundColor: webData.bg_color_code }}
        >
          <div className="row">
            <div className="col-12 col-md-12 col-sm-12 ">
              <form
                className="signupform theme-color-text"
                method="post"
                id="signupform"
                onSubmit={onSubmit}
              >
                <div>
                  <h2>
                    Signup to <span>{webData.website_title}</span>
                  </h2>
                </div>
                <div className="signupform-control">
                  <small id="msg" style={{ fontSize: "15px" }}>
                    Error Message
                  </small>
                </div>
                <div className={`signupform-control`}>
                  <label htmlFor="user_email">EMAIL</label>
                  <input
                    type="email"
                    name="user_email"
                    required=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="signupform-control"
                    id="user_email"
                    placeholder="example@gmail.com"
                  />
                  <i className="fas fa-check-circle"></i>
                  <i className="fas fa-exclamation-circle"></i>
                  <small></small>
                </div>
                <div className={`signupform-control`}>
                  <label htmlFor="user_password">PASSWORD</label>
                  <div className="input-group mb-3">
                    <input
                      type="password"
                      className="form-control"
                      name="user_password"
                      required=""
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      id="pass"
                      placeholder="password"
                    />
                    <div className="input-group-append">
                      <a
                        href="#view_qr"
                        className="input-group-text"
                        style={{ border: "1px" }}
                        onClick={(e) => {
                          hsPassword("pass");
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#d29d0e"
                          className="bi bi-eye"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  {/* <i className="fas fa-check-circle"></i> */}
                  {/* <i className="fas fa-exclamation-circle"></i> */}
                  <p className="text-info" style={{fontSize:"13px"}}>
                    Password must be contain atleast 1 Capital charcter , 1
                    digit , 1 symbol and length should be greater than 8.
                  </p>
                  <small id="passerr" className="text-danger" style={{top:"53%"}}></small>
                </div>
                <div className={`signupform-control`}>
                  <label htmlFor="user_cpassword">CONFIRM PASSWORD</label>
                  <div className="input-group mb-3">
                    <input
                      type="password"
                      className="form-control"
                      name="user_cpassword"
                      id="cpass"
                      required=""
                      value={confPassword}
                      onChange={(e) => setConfPassword(e.target.value)}
                      placeholder="confirm password"
                    />
                    <div className="input-group-append">
                      <a
                        href="#view_qr"
                        className="input-group-text"
                        style={{ border: "1px" }}
                        onClick={(e) => {
                          hsPassword("cpass");
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#d29d0e"
                          className="bi bi-eye"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  {/* <i className="fas fa-check-circle"></i> */}
                  {/* <i className="fas fa-exclamation-circle"></i> */}
                  <small id="cpasserr" className="text-danger" style={{top:"70%"}}></small>
                </div>
                <div className={`signupform-control`}>
                  <label htmlFor="refercode">REFERRAL CODE (OPTIONAL)</label>
                  <input
                    type="text"
                    name="refercode"
                    id="refercode"
                    required=""
                    value={referral_code}
                    onChange={(e) => setReferral(e.target.value)}
                    placeholder="Referral code"
                  />
                  <i className="fas fa-check-circle"></i>
                  <i className="fas fa-exclamation-circle"></i>
                  <small></small>
                </div>
                <div className="main_terms">
                  <input
                    type="checkbox"
                    id="agree_terms"
                    name="agree_terms"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                  />
                  <span className="terms">
                    I agree to {webData.website_title}'s
                    <span className="terms_condition"> Terms of Service</span>
                  </span>
                </div>
                <button
                  type="submit"
                  id="btn_submit"
                  className="reg_btn btn-theme-color"
                >
                  {loading ? (
                    <i className="loading-icon fas fa-spinner fa-spin mr-2"></i>
                  ) : null}
                  <span id="reg">REGISTER</span>
                </button>
                <Link className="signupform-login text-white" to="/login">
                  LOGIN
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
