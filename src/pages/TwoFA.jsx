import React, { useState, useEffect } from "react";
import ProfileSidebar from "./components/ProfileSidebar";
import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import $ from "jquery";
import { user_logout } from "./redux/actions/authActions";

import {
  N_setGoogleAuth,
  N_get_settings,
  N_checkMobileStatus,
} from "./redux/helpers/api_functions_new";
import { NotificationManager } from "react-notifications";
const speakeasy = require("speakeasy-latest");
var QRCode = require("qrcode");
export default function TwoFA(props) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducer);
  const [authenticator, setAuthenticator] = useState(0);
  const [mobile_auth, setMAuthenticator] = useState(0);
  const [url, setUrl] = useState();
  const [userSecret, setUserSecret] = useState();
  const [temp_secret, setSecret] = useState([]);
  const { webData } = useSelector((state) => state.websiteDBReducer);

  useEffect(() => {
    N_get_settings(user?.params ? user.params.user_id : user.user_id)
      .then((d) => {
        if (d.status === 200) {
          setAuthenticator(d.params.authenticator_status);
        }
      })
      .catch((e) => {
        console.log(e);
      });
    N_checkMobileStatus(user?.params ? user.params.user_id : user.user_id)
      .then((d) => {
        console.log(d.params.is_mobile);
        if (d.status === 200 && d.params.is_mobile === 1) {
          setMAuthenticator(1);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
  const generatSecret = () => {
    var secret = speakeasy.generateSecret({ length: 20 });
    setSecret(secret);
    QRCode.toDataURL(secret.otpauth_url, function (err, data_url) {
      setUrl(data_url);
      setUserSecret(secret.base32);
    });
  };
  const setAuthentication = (e, state, action) => {
    e.preventDefault();
    N_setGoogleAuth(
      temp_secret,
      state,
      user?.params ? user.params.user_id : user.user_id
    ).then((data) => {
      if (data.status === 200) {
        if (action === "g") {
          $(".modal-backdrop").hide();
          props.history.replace("/account_authenticator");
        } else {
          NotificationManager.success(data.message);
          window.location.reload();
        }
      } else {
        NotificationManager.error(data.message);
      }
    });
  };

  return (
    <div>
      <Header {...props} />
      <div className="row p-1 " style={{ margin: 0, marginTop: "5em" }}>
        <div className="col-12 col-md-3 col-lg-3 p-0">
          <ProfileSidebar {...props} />
        </div>
        <div
          className="col-12 col-md-8 col-lg-8 p-0"
          style={{ marginTop: "12px" }}
        >
          <div className="p-2 theme-color my-sidebox-shadow">
            <div className="main-profile-pro d-flex align-items-center bb-1 h-25">
              <i className="fa fa-shield ml-2 mr-2 mt-2" />
              <h4 className="px-2 font-weight-bold pt-3">
                Two Factor Authentication
              </h4>
            </div>
            <article>
              <div className="">
                <label
                  className="row m-0 d-flex align-items-center   bb-1 p-2"
                  style={{ height: "50px", cursor: "pointer" }}
                >
                  <div for="securityhigh" className="col-4 p-2">
                    <div className="h6 p-0 m-0">Authenticator App</div>
                    <div className="h6 p-0 m-0 text-secondary">
                      Highly secure
                    </div>
                  </div>
                  <div
                    className="col-1 offset-7"
                    style={{ height: "25px", cursor: "pointer" }}
                  >
                    <input
                      id="securityhigh"
                      type="radio"
                      className="form-check-input"
                      name="security"
                      checked={authenticator == 2}
                      data-toggle="modal"
                      data-target="#modal2FA"
                      onClick={(e) => {
                        generatSecret();
                      }}
                    />
                  </div>
                </label>
              </div>
              <div className="">
                <div
                  className="row m-0 d-flex align-items-center   bb-1 p-2"
                  style={{ height: "50px", cursor: "pointer" }}
                >
                  <div className="col-4 p-2">
                    <div className="h6 p-0 m-0">Mobile SMS</div>
                    <div className="h6 p-0 m-0 text-secondary">
                      Moderately secure
                    </div>
                  </div>
                  <div className="col-1 offset-7" style={{ height: "25px" }}>
                    <input
                      type="radio"
                      className="form-check-input"
                      name="security"
                      checked={authenticator == 1}
                      data-toggle="modal"
                      data-target="#modal2FAMobile"
                      onClick={() =>
                        !mobile_auth
                          ? props.history.push("/mobile-verify")
                          : null
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div
                  className="row m-0 d-flex align-items-center p-2"
                  style={{ height: "50px", cursor: "pointer" }}
                >
                  <div className="col-4 p-2">
                    <div className="h6 p-0 m-0">None</div>
                    <div className="h6 p-0 m-0 text-secondary">not secure</div>
                  </div>
                  <div className="col-1 offset-7" style={{ height: "25px" }}>
                    <input
                      type="radio"
                      className="form-check-input"
                      name="security"
                      checked={authenticator == 0}
                      data-toggle="modal"
                      data-target="#modal2FAnone"
                    />
                  </div>
                </div>
              </div>
              <div
                id="modal2FA"
                className={`modal fade ${webData.bg_color}`}
                role="dialog"
              >
                <div className="modal-dialog">
                  <div className="modal-content light-theme-color">
                    <form>
                      <div className="modal-header">
                        <h3 id="msg">Google Authentication</h3>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                        >
                          &times;
                        </button>
                      </div>
                      <div className="modal-body">
                        <div className="form-group center">
                          <img src={url} />
                        </div>
                        <div className="form-group center">{userSecret}</div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="submit"
                          className="btn btn-theme-color"
                          onClick={(e) => {
                            setAuthentication(e, 0, "g");
                          }}
                        >
                          <i
                            className="loading-icon fas fa-spinner fa-spin"
                            id="loader"
                            style={{ display: "none" }}
                          ></i>
                          Yes
                        </button>
                        <button
                          type="button"
                          className="btn btn-default"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div
                id="modal2FAMobile"
                className={`modal fade ${webData.bg_color}`}
                role="dialog"
              >
                <div className="modal-dialog">
                  <div className="modal-content light-theme-color">
                    <form>
                      <div className="modal-header">
                        <h3 id="msg">Mobile Authentication</h3>
                        <button
                          type="button"
                          className="close text-secondary"
                          data-dismiss="modal"
                        >
                          &times;
                        </button>
                      </div>
                      <div className="modal-body center">
                        Are you sure to Mobile Authenticator?
                      </div>
                      <div className="modal-footer">
                        <button
                          type="submit"
                          className="btn btn-theme-color"
                          onClick={(e) => {
                            setAuthentication(e, 1);
                          }}
                        >
                          <i
                            className="loading-icon fas fa-spinner fa-spin"
                            id="loader"
                            style={{ display: "none" }}
                          ></i>
                          Yes
                        </button>
                        <button
                          type="button"
                          className="btn btn-default"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div
                id="modal2FAnone"
                className={`modal fade ${webData.bg_color}`}
                role="dialog"
              >
                <div className="modal-dialog">
                  <div className="modal-content light-theme-color">
                    <form>
                      <div className="modal-header">
                        <h3 id="msg">Authentication</h3>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                        >
                          &times;
                        </button>
                      </div>
                      <div className="modal-body center">
                        Are you sure Disabled Authenticator?
                      </div>
                      <div className="modal-footer">
                        <button
                          type="submit"
                          className="btn btn-theme-color"
                          onClick={(e) => {
                            setAuthentication(e, 0);
                          }}
                        >
                          <i
                            className="loading-icon fas fa-spinner fa-spin"
                            id="loader"
                            style={{ display: "none" }}
                          ></i>
                          Yes
                        </button>
                        <button
                          type="button"
                          className="btn btn-default"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
