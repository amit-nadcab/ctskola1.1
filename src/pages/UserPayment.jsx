import React, { useEffect } from "react";
import ProfileSidebar from "./components/ProfileSidebar";
import Header from "./components/Header";
import InrDeposite from "./InrDeposite";

import { useSelector } from "react-redux";
import Loader from "./components/Loader";
import {
  N_getUserBankDetails,
} from "./redux/helpers/api_functions_new";
export default function UserPayment(props) {
  const { user } = useSelector((state) => state.AuthReducer);
  const [bankStatus, setBankStatus] = React.useState(-1);
  const [bankDetails, setBankDetails] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
      N_getUserBankDetails(user?.params ? user.params.user_id : user.user_id)
        .then((data) => {
          if(data.status === 200) {
          setBankStatus(data.params.bank_details.status);
          if(data.params.bank_details.status == 1)
            setBankDetails(data.params.bank_details);
          } else if(data.status === 400) {
            setBankStatus(data.params.bank_status);
          }
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
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
          className="col-12 col-md-8 col-lg-8 p-0 "
          style={{ marginTop: "12px" }}
        >
          <div className="p-2 theme-color my-sidebox-shadow pb-4">
            <div className="main-profile-pro d-flex align-items-center bb-1 h-25">
            <i className="fa fa-usd ml-2 mr-2 mt-2"/>
              <h4 className="px-2 font-weight-bold pt-3">Payment Option</h4>
            </div>
            <article>
              {loading ? <Loader /> : null}
              {!loading && bankStatus == 1? (
                <>
                <div className="content-body ">
                  <div className="container-fluid">
                      <div className="row mt-2 mb-2">
                        <h2 className="col-md-12 page-title">Your bank account details for IMPS payments</h2>
                      </div>
                 
                    <div className="row">
                      <div className="col-md-12">
                        <table className="table table-hover table-bordered mdfthemetxt">
                            <thead className="bg-secondary text-white">
                                <tr>
                                    <th className="tdCenter">Account Number</th>
                                    <th className="tdCenter">IFSC Code</th>
                                    <th className="tdCenter">Account Type</th>
                                    <th className="tdCenter">Status</th>
                                    {/* <th className="tdCenter">Action</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                    <tr>
                                        <td className="tdCenter">{bankDetails.account_number}</td>
                                        <td className="tdCenter"> {bankDetails.ifsc} </td>
                                        <td className="tdCenter"> {bankDetails.account_type} </td>
                                        <td className="tdCenter"> Active</td>
                                        {/* <td className="tdCenter"> 
                                          <div className="dropdown  ">
                                              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                  Action
                                              </button>
                                              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                  <a href='#delete_bank' onClick={(e) => { delteBank(bankDetails.user_id,2)}} className={` dropdown-item `}> 
                                                      {bankStatus == 3 ? 'Requested For Delete Again' : 'Remove'}  
                                                  </a>
                                                  {bankStatus == 3 ? (
                                                    <>
                                                      <a href='#active' onClick={(e) => { delteBank(bankDetails.user_id,1)}} className={` dropdown-item `}> 
                                                          Request For Active 
                                                      </a>
                                                    </>
                                                  ) : ''}
                                              </div>
                                          </div>
                                        </td> */}
                                    </tr>
                            </tbody>
                        </table>
                    </div>
                  </div>
                  </div>
                </div>
                </>
              ) : null}
              {!loading && bankStatus == -1 ? (
                <div className="h5 p-2">
                  Your Bank details under Review for 72 Hours .{" "}
                </div>
              ) : null}
              {!loading && ((bankStatus == 0) || (bankStatus == 2) ) ? <InrDeposite /> : null}
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
