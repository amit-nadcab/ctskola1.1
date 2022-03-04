import React, { useEffect, useState } from "react";
import { MdOutlineError } from "react-icons/md";
import { Link } from "react-router-dom";
import FullLoader from "./components/FullLoader";
import {
  N_withdraw_inr,
} from "./redux/helpers/api_functions_new";
import { IoMdCheckmarkCircle } from "react-icons/io";

export default function Notice(props) {
  const [success, setsuccess] = useState(false);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const transection_id = params.get("id");

    N_withdraw_inr(transection_id)
      .then((res) => {
        console.log("res", res);
        if (res.status === 200) {
          console.log("res", res);
          setloading(false);
          setsuccess(true);
        } else {
          setloading(false);
          setsuccess(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("hf", transection_id);
  }, []);

  return (
    <>
      {loading ? (
        <FullLoader />
      ) : success ? (
        <div className="container" style={{ height: "100%" }}>
          <div className="row mt-5">
            <div className="col-6 offset-3">
              <div
                className="fs-5 card rounded-start text-center shadow-lg"
                style={{ height: "300px", background: "gainsboro" }}
              >
                <div className="text-success fs-5 h-100">
                  <IoMdCheckmarkCircle
                    style={{ height: "90px", width: "90px", margin: "auto" }}
                  />

                  <div>Withdrawal Successfully!!</div>
                  <Link to="/exchange/btc-inr" className="btn btn-success mt-5">
                    Continue
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container" style={{ height: "100%" }}>
          <div className="row mt-5">
            <div className="col-6 offset-3">
              <div
                className="fs-5 card rounded-start text-center shadow-lg"
                style={{ height: "300px", background: "gainsboro" }}
              >
                <div className="text-danger fs-5 h-100">
                  <MdOutlineError
                    style={{ height: "90px", width: "90px", margin: "auto" }}
                  />
                  <div>Somthing Went Wrong. Try After Some Time!!</div>
                  <Link to="/exchange/btc-inr" className="btn btn-danger mt-5">
                    Continue
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
