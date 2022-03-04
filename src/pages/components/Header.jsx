import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import "./header.css";
import { user_logout } from "../redux/actions/authActions";
import { switchTheme } from "../redux/actions/coinDBAction";
import { GiHamburgerMenu } from "react-icons/gi";
import NotificationBanner from "./BannerData";
import NewsLater from "./NewsLater";

export default function Header(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isLoggedIn } = useSelector((state) => state.AuthReducer);
  const { webData } = useSelector((state) => state.websiteDBReducer);
  async function backRouter() {
    dispatch(
      user_logout(() => {
        props.history.replace("/exchange/btc-inr");
        document.location.reload();
      })
    );
  }
  async function swtchTheme(theme_name) {
    dispatch(switchTheme(theme_name));
  }

  return (
    <>
      {/* <NotificationBanner/> */}
      <header id="head">
        <nav
          className={`${webData.bg_color}
            navbar navbar-expand-lg navbar-light fixed-top sticky-lg-top`}
          style={{ backgroundColor: webData.bg_color_code, position: "fixed !important", top: '0' }}
        >
          <Link className="navbar-brand mb-2" to="/">
            <img
              className="logodesign"
              height="35"
              src="/theme/img/logo.png"
              alt="logo"
              width="137"
            />
          </Link>
          <span className="brand-title">
            {" "}
            {webData.logo_with_title === 1 ? webData.website_short_name : ""}
          </span>
          <button
            type="button"
            data-toggle="collapse"
            data-target="#ca-navbar"
            aria-controls="ca-navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
            className="navbar-toggler mx-3 mynav-button-resize"
          >
            <GiHamburgerMenu
              style={{ height: "20px", width: "20px", color: "black" }}
            />
            {/* <span className="navbar-toggler-icon"></span> */}
          </button>
          <div id="ca-navbar" className="collapse navbar-collapse manu_header">
            <ul id="nav" className="navbar-nav">
              <li className="nav-item" style={{ borderTop: "0px!important" }}>
                <Link
                  className=" nav-link theme-color-text"
                  to="/exchange/btc-inr"
                >
                  EXCHANGE
                </Link>
              </li>
              <li className="nav-item" style={{ borderTop: "0px!important" }}>
                <Link className="nav-link theme-color-text" to="/p2p/rbc-inr">
                  P2P
                </Link>
              </li>
              {/* <li className="nav-item" style={{ borderTop: "0px!important" }}>
                <Link className="nav-link theme-color-text " to="/stf">
                  STF
                </Link>
              </li>
              <li className="nav-item" style={{ borderTop: "0px!important" }}>
                <a
                  className="nav-link theme-color-text"
                  target="_bank"
                  href={`${webData.zendesk_url}`}
                >
                  Help
                </a>
              </li> */}
            </ul>
            <div className="sing-up-button d-lg-none">
              {location.pathname !== "/login" && !isLoggedIn ? (
                <Link to="/login">Login</Link>
              ) : null}
              {location.pathname !== "/create" && !isLoggedIn ? (
                <Link to="/create">Register</Link>
              ) : null}
              {isLoggedIn ? (
                <>
                  <Link to="/wallet" className="nav-link">
                    Funds
                  </Link>
                  <Link to="/profile" className="nav-link">
                    Account
                  </Link>
                  <a
                    href="https://bitflash.zendesk.com/hc/"
                    className="nav-link my-2"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Support
                  </a>
                  <p
                    className="nav-link my-2"
                    onClick={() => {
                      backRouter();
                    }}
                    style={{cursor:"pointer"}}
                  >
                    Logout
                  </p>
                </>
              ) : null}
            </div>
          </div>
          <div>
          <NewsLater />
        </div>
          <div
            className="nav-user theme-color-text dropdown mx-3 p-2"
            style={{ fontSize: "18px" }}
          >
            <a
              href="#light"
              onClick={() => {
                swtchTheme("light");
              }}
              className="theme-color-text d-none d-lg-block float-left mr-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-sun"
                viewBox="0 0 16 16"
              >
                <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
              </svg>
            </a>
            <a
              href="#dark"
              onClick={() => {
                swtchTheme("dark");
              }}
              className="theme-color-text d-none d-lg-block float-left mr-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-moon"
                viewBox="0 0 16 16"
              >
                <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
              </svg>
            </a>
            <a
              href="/notification"
              className="theme-color-text d-none d-lg-block float-left"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-bell"
                viewBox="0 0 16 16"
              >
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
              </svg>
            </a>
          </div>
          <div className="sing-up-button d-none d-lg-block">
            {location.pathname !== "/login" &&
            location.pathname !== "/otp" &&
            location.pathname !== "/kyc" &&
            !isLoggedIn ? (
              <Link to="/login">Login</Link>
            ) : null}
            {location.pathname !== "/create" &&
            location.pathname !== "/otp" &&
            location.pathname !== "/kyc" &&
            !isLoggedIn ? (
              <Link className="btn-theme-color" to="/create">
                Register
              </Link>
            ) : null}
            {isLoggedIn ? (
              <>
                <div
                  className="nav-user theme-color-text dropdown mr-3 p-2"
                  style={{ fontSize: "18px" }}
                >
                  <div
                    className="dropdown-toogle"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    data-target="#drp"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style={{cursor:"pointer"}}
                  >
                    <i className="fa fa-user"></i>
                  </div>
                  <div
                    className="dropdown-menu coinsfather-theme-color "
                    aria-labelledby="dropdownMenuLink"
                    id="drp"
                    style={{ left: "-100px" }}
                  >
                    <Link to="/wallet" className="dropdown-item">
                      Funds
                    </Link>
                    <Link to="/profile" className="dropdown-item">
                      Account
                    </Link>
                    <a
                      href="https://bitflash.zendesk.com/hc/"
                      className="dropdown-item cursor"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Support
                    </a>
                    <p
                      className="dropdown-item cursor"
                      onClick={() => {
                        backRouter();
                      }}
                      style={{cursor:"pointer"}}
                    >
                      Logout
                    </p>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </nav>
      </header>
    </>
  );
}
