import React, { useState } from "react";
//import "./Header.css"
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import init from "../redux/helpers/events";
import NotificationBanner from "../components/BannerData";

export default function Header() {
  const { webData } = useSelector((state) => state.websiteDBReducer);
  const [active, setactive] = useState("e");
  return (
    <>
      <NotificationBanner />

      {/*   <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ background: "#141A28", position: "fixed", top: '0', width: "100%", zIndex: "99"}}
      >
        <div className="container-fluid">   
          <Link className="navbar-brand fw-bolder text-light" to="/">
            {webData.website_short_name}
          </Link>
          <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"az
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <GiHamburgerMenu />
            {<span className="navbar-toggler-icon"></span>}
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul
              className="navbar-nav mb-2 mb-lg-0 ml-auto d-flex"
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <li className="nav-item">
                <Link
                  className={`nav-link text-secondary bg-light ${
                    active === 'e' ? "nmactive" : "mactive"
                  }`}
                  to="/exchange/btc-inr"
                  onClick={() => {
                    setactive("e");
                  }}
                >
                  Exchange
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link text-secondary bg-light ${
                    active === 'l' ? "nmactive" : "mactive"
                  }`}
                  to="/login"
                  onClick={() => {
                    setactive("l");
                  }}
                >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link text-secondary bg-light ${
                    active === 's' ? "nmactive" : "mactive"
                  }`}
                  to="/create"
                  onClick={() => {
                    setactive("s");
                  }}
                >
                  Signup
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}

    <header className="wrap-1">
        <nav className="navbar navbar-expand-lg navbar-light container" >
        <Link className="navbar-brand fw-bolder text-light" to="/"> {/* {webData.website_short_name} */} <img className="img-logo" src="../img/ctskola-0.png" alt="" /> </Link>
          {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button> */}
          <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"az
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <GiHamburgerMenu style={{color: "white"}}/>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul
              className="navbar-nav mb-2 mb-lg-0 ml-auto d-flex"
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <li className="nav-item">
                <Link
                 style={{color:"#09BE8B"}}
                  className={`nav-link bg-light ${
                    active === 'e' ? "nmactive" : "mactive"
                  }`}
                  to="/exchange/btc-inr"
                  onClick={() => {
                    setactive("e");
                  }}
                >
                  Exchange
                </Link>
              </li>
              <li className="nav-item">
                <Link
                style={{color:"#09BE8B"}}
                  className={`nav-link bg-light ${
                    active === 'l' ? "nmactive" : "mactive"
                  }`}
                  to="/login"
                  onClick={() => {
                    setactive("l");
                  }}
                  sty
                >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link text-secondary sign ${
                    active === 's' ? "nmactive" : "mactive"
                  }`}
                  to="/create"
                  onClick={() => {
                    setactive("s");
                  }}
                >
                  Signup
                </Link>
              </li>
            </ul>

          </div>
        </nav>

      </header>
    </>
  );
}
