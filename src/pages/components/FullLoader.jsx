import React from "react";

export default function FullLoader(props) {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
      <div className="spinner-border text-warning" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
