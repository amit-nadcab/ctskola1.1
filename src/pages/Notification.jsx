import React, { useEffect, useState } from "react";
import ProfileSidebar from "./components/ProfileSidebar";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import { N_getNotification } from "./redux/helpers/api_functions_new";

export default function GetNotifi(props) {
  const [getallnoti, getAllNoti] = useState(0);
  const { user } = useSelector((state) => state.AuthReducer);
  useEffect(() => {
    N_getNotification(user?.params ? user.params.user_id : user.user_id).then(
      (data) => {
        if (data.status === 200) getAllNoti(data.params.notification);
      }
    );
  }, []);
  return (
    <div>
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
              <i className="fa fa-bell ml-2 mr-2 mt-2" />
              <h4 className="px-2 font-weight-bold pt-3">Notifications</h4>
            </div>
            <article>
              {getallnoti == 0 ? (
                <>
                  <h2 className="m-2">No any Notification.</h2>
                </>
              ) : (
                <>
                  <div className="col-md-12">
                    <table className="table table-hover table-bordered mdfthemetxt">
                      <thead className="light-theme-color">
                        <tr>
                          <th className="tdCenter">No.</th>
                          <th className="tdCenter">Area</th>
                          <th className="tdCenter">MSG</th>
                          <th className="tdCenter">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getallnoti
                          ? getallnoti.map((item, i) => (
                              <>
                                <tr>
                                  <td className="tdCenter">{++i}</td>
                                  <td className="tdCenter">{item.name}</td>
                                  <td className="tdCenter"> {item.msg} </td>
                                  <td className="tdCenter"> {new Date(item.createdAt).toLocaleString()} </td>
                                </tr>
                              </>
                            ))
                          : null}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
