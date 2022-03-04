import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";
import { useSelector } from "react-redux";

export default function ProfileSidebar(props) {
  const { isLoggedIn } = useSelector((state) => state.AuthReducer);
  if (!isLoggedIn) props.history.replace("/login");
  return (
    <div
      id="vertical_tab_nav"
      className="theme-color-text my-side-shadow"
      style={{ margin: "13px 20px 0px" }}
    >
      <ul>
        <li>
          <NavLink to="/profile">
            <i className="fa fa-user ml-2 mr-3 mt-1" /> Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/currency_preference">
            <i className="fa fa-usd ml-2 mr-3 mt-1" /> Currency preference
          </NavLink>
        </li>
        <li>
          <NavLink to="/referral">
            <i className="fa fa-tree ml-2 mr-3 mt-1" /> Referral
          </NavLink>
        </li>
        <li>
          <NavLink to="/user_kyc">
            <i className="fa fa-book ml-2 mr-3 mt-1" /> Verify KYC
          </NavLink>
        </li>
        <li>
          <NavLink to="/payment_option">
            <i className="fa fa-usd ml-2 mr-3 mt-1" /> Payment options
          </NavLink>
        </li>
        <li>
          <NavLink to="/notification">
            <i className="fa fa-bell ml-2 mr-3 mt-1" /> Notification preferences
          </NavLink>
        </li>
        <li>
          <NavLink to="/fees">
            <i className="fa fa-inr ml-2 mr-3 mt-1" /> Fees
          </NavLink>
        </li>
        <li>
          <NavLink to="/2fa">
            <i className="fa fa-shield ml-2 mr-3 mt-1" /> Two Factor
            Authontication
          </NavLink>
        </li>
        <li>
          <NavLink to="/activity_log">
            <i className="fa fa-info ml-2 mr-3 mt-1" /> Activity Logs
          </NavLink>
        </li>
        <li>
          <NavLink to="/download_report">
            <i className="fa fa-file ml-2 mr-3 mt-1" /> Download trading report
          </NavLink>
        </li>
        <li>
          <NavLink to="/privacy_control">
            <i className="fa fa-shield ml-2 mr-3 mt-1" /> Privacy Control
          </NavLink>
        </li>
        <li>
          <NavLink to="/coupan">
            <i className="fa fa-gift ml-2 mr-3 mt-1" /> Coupon Rewards
          </NavLink>
        </li>
        <li>
          <NavLink to="/upcoming_program">
            <i className="fa fa-lock ml-2 mr-3 mt-1" /> Unlock Programs
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
