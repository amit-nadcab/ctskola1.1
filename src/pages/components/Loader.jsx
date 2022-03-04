import React from "react";

export default function Loader() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ flex: 1, height: "328px" }}
    >
      <div className="spinner-border text-danger"></div>
    </div>
  );
}
