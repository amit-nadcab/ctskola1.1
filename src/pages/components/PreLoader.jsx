import React from "react";

export default function PreLoader(props) {
  return (
    <div>
      <div id="preloader">
        <div className="preload-content">
          <h5
            className="text-dark"
            style={{
              position: "absolute",
              whiteSpace: "nowrap",
              top: "-46%",
              left: "-70%",
            }}
          >
            Security Checking.....
          </h5>
          <div id="dream-load"></div>
        </div>
      </div>
    </div>
  );
}
