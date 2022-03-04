import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import NotificationBanner from "../BannerData";
export default function Header(props) {
  const { webData } = useSelector((state) => state.websiteDBReducer);
  return (
    <>
      <NotificationBanner/>
      <nav className="navbar navbar-expand-lg navbar-white fixed-top" id="banner">
        <div className="container">
          {/* <!-- Brand --> */}
          <Link className="navbar-brand" to="/">
            <span>
              <img
                src={`${"/theme/img/"+webData.logo_img_name}`}
                alt="logo"
                style={{ width: "130px" }}
              />
            </span>
          </Link>

          {/* <!-- Toggler/collapsibe Button --> */}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* <!-- Navbar links --> */}
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/exchange/btc-inr">
                  Exchange
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/p2p/usd-inr">
                  P2P
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/p2p/usd-inr">
                  STF
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/affiliate">
                  AFFILIATE
                </NavLink>
              </li>
              {/* <li className="lh-55px">
                <NavLink to="/login" className="btn login-btn ml-50">
                  Login
                </NavLink>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
