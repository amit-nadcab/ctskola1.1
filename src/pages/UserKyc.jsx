import React, { useEffect, useState } from "react";
import ProfileSidebar from "./components/ProfileSidebar";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import Loader from "./components/Loader";
import {
  N_checkKYCStatus,
} from "./redux/helpers/api_functions_new";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { GiMagnifyingGlass } from "react-icons/gi";

export default function UserKYC(props) {
  const { user } = useSelector((state) => state.AuthReducer);
  const [loading, setLoading] = React.useState(true);
  const [kyc, setKyc] = React.useState();
  const { webData } = useSelector((state) => state.websiteDBReducer);

  useEffect(async () => {
    N_checkKYCStatus(user?.params ? user.params.user_id : user.user_id)
      .then((d) => {
        if (d.status === 200) {
          if (d.params.kyc_status === 1) {
            setKyc(d.params.kyc_status);
            setLoading(false);
          } else if (d.params.kyc_status === -1) {
            setKyc(d.params.kyc_status);
            setLoading(false);
          }
          setLoading(false);
        } else {
          NotificationManager.error(d.message);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <Header {...props} />
      <div className="row p-1 " style={{ margin: 0, marginTop: "5em" }}>
        <div className="col-12 col-md-3 col-lg-3 p-0">
          <ProfileSidebar {...props} />
        </div>
        <div
          className="col-12 col-md-8 col-lg-8 p-0"
          style={{ marginTop: "12px" }}
        >
          <div className="p-2 theme-color my-sidebox-shadow">
            <div className="main-profile-pro d-flex align-items-center bb-1 h-25">
              <i className="fa fa-book ml-2 mr-2 mt-2" />
              <h4 className="px-2 font-weight-bold pt-3">KYC</h4>
            </div>
            <article>
              {loading ? (
                <Loader />
              ) : kyc === 1 ? (
                <div className="p-4">
                  <h5>
                    Congratulations! Your {webData.website_title} account is
                    approved.{" "}
                  </h5>
                  <button
                    type="button"
                    className="btn btn-theme-color"
                    onClick={() => props.history.push("/exchange/btc-inr")}
                  >
                    Start Trading
                  </button>
                </div>
              ) : kyc === -1 ? (
                <div
                  className="py-3 px-5 text-secondary d-flex align-content-center"
                  style={{ fontWeight: "bold", fontSize: "14px" }}
                >
                  <span className="text-info mx-2" id="rv">
                    <GiMagnifyingGlass size={26} />
                  </span>
                  Your KYC is under Review. please for wait 72 hours.
                </div>
              ) : (
                <div className="p-4">
                  <h4>Please Complete Your KYC and Start Trading .</h4>
                  <button
                    type="button"
                    className="btn btn-theme-color"
                    onClick={() => props.history.push("/kyc-verify")}
                  >
                    KYC
                  </button>
                </div>
              )}
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
