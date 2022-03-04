import React from "react";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
export default function LoginORSignup(props) {
  // const { webData } = useSelector((state) => state.websiteDBReducer);
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div
        className="sing-up-button"
        style={{
          textAlign: "center",
          height: "350px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Link to="/login">Login</Link>

        <div
          style={{
            height: "25px",
            width: "25px",
            background: "rgba(255,255,255,0.3)",
            color: "#fff",
            fontSize: 11,
            borderRadius: "13px",
            padding: "5px",
            margin: "15px",
          }}
        >
          {" "}
          OR
        </div>
        <Link to="/create" className="btn-theme-color ">
          Create a new Account
        </Link>
      </div>
    </div>
  );
}
