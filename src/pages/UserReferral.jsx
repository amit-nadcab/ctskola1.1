import React, { useEffect, useState } from "react";
import ProfileSidebar from "./components/ProfileSidebar";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import { NotificationManager } from "react-notifications";
import Loader from "./components/Loader";
import {
  N_checkKYCStatus,
  N_getRefferalData,
} from "./redux/helpers/api_functions_new";

export default function UserReferral(props) {
  const [loading, setLoading] = React.useState(true);
  const { user } = useSelector((state) => state.AuthReducer);
  const [activeTab, setActiveTab] = React.useState(0);
  const [refferalData, setRefferalData] = React.useState();
  const [total_ref, settotal_ref] = React.useState([]);
  const [kyc_status, setstatus] = React.useState(0);
  const [refcode, setrefcode] = useState("");
  const { webData } = useSelector((state) => state.websiteDBReducer);
  useEffect(() => {
    N_getRefferalData(user?.params ? user.params.user_id : user.user_id)
      .then((d) => {
        if (d.status === 200) {
          setLoading(false);
          console.log("getreferal data: ", d);
          setRefferalData(
            d.params.total_referal_earning ? d.params.total_referal_earning : 0
          );
          settotal_ref(d.params.total_referals ? d.params.total_referals : 0);
          setrefcode(d.params.referral_code ? d.params.referral_code : 0);
        } else {
          setLoading(false);
          console.log("something went wrong  to fetch refferal: ", d);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [kyc_status === 1]);

  useEffect(() => {
    N_checkKYCStatus(user?.params ? user.params.user_id : user.user_id)
      .then((res) => {
        console.log("k st: ", res);
        if (res.status === 200) {
          setstatus(res.params.kyc_status);
        } else {
          console.log("Sorry kyc status not fetched!!! ");
        }
      })
      .catch((err) => {
        console.log("error: ", err);
      });
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
          <div
            className={`${webData.bg_color}` + " p-1 my-sidebox-shadow"}
            style={{ backgroundColor: webData.bg_color_code }}
          >
            <div className="main-profile-pro d-flex align-items-center bb-1 h-25">
              <i className="fa fa-tree ml-2 mr-2 mt-2" />
              <h4 className="px-2 font-weight-bold pt-3">Referral</h4>
            </div>
            {loading ? (
              <Loader />
            ) : Number(kyc_status) === 1 ? (
              <article className="p-2">
                <div className="row my-1">
                  <div className="col-12 offset-md-6 offset-lg-6 col-md-5 col-lg-5 px-2">
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className=" form-control light-theme-color  mdfthemetxt"
                        id="copy"
                        value={webData.site_url + `create/${refcode}`}
                        readOnly
                      />
                      <div className="">
                        <button
                          className="btn btn-theme-color"
                          type="button"
                          onClick={() => {
                            var copyText = document.getElementById("copy");
                            copyText.select();
                            copyText.setSelectionRange(0, 99999);
                            document.execCommand("copy");
                            NotificationManager.info("Referral URL Copied!");
                          }}
                        >
                          COPY
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row m-1">
                  <div className="col-12 col-md-4 col-lg-4 p-1">
                    <div className="card p-4 light-theme-color">
                      <div className="mb-0 card-body p-1">
                        <h6 className="card-title text-center">
                          TOTAL REFERRED FRIENDS
                        </h6>
                        <div className="card-text d-flex justify-content-center align-items-center">
                          <div className="card-text h2">
                            {total_ref?.length > 0 ? total_ref.length : 0}
                          </div>
                          <i className="fa fa-users fa-2x theme-color-text p-1"></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-4 col-lg-4 p-1">
                    <div className="card p-4 light-theme-color">
                      <div className="mb-0 card-body p-1">
                        <h6 className="card-title text-center">
                          TOTAL COMMISSIONS EARNED
                        </h6>
                        <div className="card-text d-flex justify-content-center align-items-center">
                          <div className="card-text h2">
                            {refferalData ? refferalData : 0} (
                            {webData.referral_coin})
                            {/* { parseInt(refferalData?.total_referral_commission) } in INR   */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-4 col-lg-4 p-1">
                    <div className="card p-4 light-theme-color">
                      <div className="mb-0 card-body p-1">
                        <h6 className="card-title text-center">
                          YOUR COMMISSION RATE
                        </h6>
                        <div className="card-text d-flex justify-content-center align-items-center">
                          <div className="card-text h2">
                            {webData.referral_fee} ({webData.referral_coin})
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className>
                  <a href="#history" role="tab">
                    <h2>Commission History</h2>
                  </a>
                  <div className="tab-content" id="nav-tabContent">
                    <div
                      className={`tab-pane fade ${
                        activeTab === 0 ? "active show" : null
                      }`}
                      id="nav-home"
                      role="tabpanel"
                    >
                      <table className="table table-striped mdfthemetxt">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">NAME</th>
                            <th scope="col">DATES</th>
                            <th scope="col">coin</th>
                            <th scope="col">COMMISSION</th>
                            <th scope="col">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {total_ref?.map((d, index) => (
                            <tr>
                              <td>{++index}</td>
                              <td>{d?.name}</td>
                              <td>
                                {d?.time
                                  ? new Date(Number(d?.time)).toLocaleString()
                                  : "00:00"}
                              </td>
                              <td>{d?.wallet_type}</td>
                              <td>{d?.valume}</td>
                              <td>
                                {d?.kyc_status == 1
                                  ? "Verified"
                                  : d?.kyc_status == 2
                                  ? "Rejected"
                                  : d.kyc_status == -1
                                  ? "Pending"
                                  : "Not Filled"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </article>
            ) : (
              <div>
                <h5 className="px-5 py-4 text-dark">
                  Pending Kyc (If filled wait for aproval.)
                </h5>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
