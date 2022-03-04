import React, { useEffect } from "react";
import swal from "sweetalert";
export default function ConfimationPopup(props) {
  useEffect(() => {
    swal({
      title:
        props.match.params.status === "success"
          ? "Withdrawal Success"
          : "Sorry ! Some Issue Occured",
      text: props.match.params.msg,
      icon: props.match.params.status,
      button: "Go To Home",
    });
  });
  return (
    <>
      {/* <div className="signupContainer">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-12 col-sm-12 py-5">
              <h1>{props.match.params.status}</h1>
              <h2>{props.match.params.msg}</h2>
            </div>
            <div className="offset-1 col-10 col-md-10 col-lg-10 py-5">
              <Link className="btn btn-info btn-block" to="/">
                Go Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
