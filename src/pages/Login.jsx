import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./login.css";
import { isEmail, isPass } from "./redux/helpers/form-validator.functions";
import { user_Login, user_authentication } from "./redux/actions/authActions";
import {
  N_getGoogleAuth,
  N_sendOTPMobileEmail,
} from "./redux/helpers/api_functions_new";
import { NotificationManager } from "react-notifications";

export default function Login(props) {
  const { isLoggedIn } = useSelector((state) => state.AuthReducer);
  if (isLoggedIn) props.history.replace("/exchange/btc-inr");
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState();
  const { webData } = useSelector((state) => state.websiteDBReducer);
  const [eye, seteye] = useState(false);
  const hsPassword = (_id) => {
    var _idv = document.querySelector("#" + _id);
    if (_idv.getAttribute("type") == "text") {
      _idv.setAttribute("type", "password");
      seteye(false);
    } else {
      _idv.setAttribute("type", "text");
      seteye(true);
    }
  };
  const submit = (e) => {
    e.preventDefault();
    if (isEmail(email) && isPass(password)) {
      N_getGoogleAuth(email, password).then((data) => {
        if (data.status === 200 && data.params.authenticator_status === 0) {
          setLoading(true);
          dispatch(
            user_Login(
              email,
              password,
              () => {
                setLoading(false);
                props.history.replace("/otp");
              },
              () => setLoading(false)
            )
          );
        } else {
          
          console.log("called");
          if (data.status === 200 && data.params.authenticator_status === 1) {
            N_sendOTPMobileEmail(email, data.params.mobile_no);
            dispatch(
              user_authentication(
                email,
                password,
                data.params.authenticator_status,
                data.params.mobile_no,
                () => {
                  setLoading(false);
                  props.history.replace("/authenticator");
                }
              )
            );
          } else if (
            data.status === 200 &&
            data.params.authenticator_status === 2
          ) {
            dispatch(
              user_authentication(
                email,
                password,
                data.params.authenticator_status,
                data.params.authenticator_key,
                () => {
                  setLoading(false);
                  props.history.replace("/authenticator");
                }
              )
            );
          } else if(data.status === 400) {
            NotificationManager.error("User Not Found!");
          }
        }
      });
    }
  };

  // useEffect(() => {
  //   const notice = document.getElementById("notice");
  //   function startBlinking() {
  //     setInterval(function () {
  //       blink();
  //     }, 2000);
  //   }
  //   function blink() {
  //     // note no timeout for the hiding part
  //     notice.style.display = "none";
  //     setTimeout(function () {
  //       notice.style.display = "block";
  //     }, 1000);
  //   }

  //   startBlinking();
  // }, []);

  return (
    <>
      <Header {...props} />
      <div className="signupContainer">
        <div
          className={`${webData.bg_color}` + " container "}
          style={{ backgroundColor: webData.bg_color_code }}
        >
          <div className="row">
            <div className="col-12 col-md-12 col-sm-12">
              <form
                className="signupform mdfthemetxt"
                method="post"
                id="loginForm"
                onSubmit={submit}
                autoComplete="off"
              >
                <div>
                  <h2>
                    Signin to{" "}
                    <span className="text-uppercase">
                      {webData.website_title}
                    </span>
                  </h2>
                </div>
                <div className={`signupform-control`}>
                  <small id="msg" style={{ fontSize: "15px" }}>
                    Error Message
                  </small>
                </div>
                <div className={`signupform-control`}>
                  <label htmlFor="user_email" className="theme-color-text">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    name="user_email"
                    className="signupform-control"
                    required=""
                    value={email}
                    id="user_email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                  />
                  <i className="fas fa-check-circle"></i>
                  <i className="fas fa-exclamation-circle"></i>
                  <small></small>
                </div>
                <div className="signupform-control ">
                  <label htmlFor="user_password" className="theme-color-text">
                    PASSWORD
                  </label>
                  <Link className="resend_btn theme-color-text" to="/forget">
                    Forgot Password
                  </Link>
                  <div className="input-group mb-3 d-flex">
                    <input
                      type="password"
                      className="form-control"
                      name="user_password"
                      id="pass"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required=""
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
                        {/* <i className="far fa-eye"></i> */}
                        {eye ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="#d29d0e"
                            className="bi bi-eye-slash-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                            <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="#d29d0e"
                            className="bi bi-eye-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                          </svg>
                        )}
                      </a>
                    </div>
                  </div>
                  <i className="fas fa-check-circle"></i>
                  <i className="fas fa-exclamation-circle"></i>
                  <small id="passerr" style={{ fontSize: "13px" }}></small>
                </div>
                {/* <h6 id="notice" style={{ position: "absolute", top: "60%" }}>
                  Notice: User register before 10/28/2021 needs to change
                  password.
                </h6> */}
                <button
                  type="submit"
                  id="login_btn"
                  className="reg_btn btn-theme-color"
                >
                  {loading ? (
                    <i className="loading-icon fas fa-spinner fa-spin mr-2"></i>
                  ) : null}
                  <span id="reg">LOGIN</span>
                </button>
                <Link
                  className="signupform-login theme-color-text"
                  to="/create"
                >
                  REGISTER
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
