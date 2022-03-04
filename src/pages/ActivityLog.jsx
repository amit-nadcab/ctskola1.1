import React from "react";
import ProfileSidebar from "./components/ProfileSidebar";
import Header from "./components/Header";
import {  useSelector } from "react-redux";
import { N_getActivityReport } from "./redux/helpers/api_functions_new";

export default function ActivityLog(props) {
  const [activitydata, renderActivityData] = React.useState([]);
  const { user } = useSelector((state) => state.AuthReducer);
  const { webData } = useSelector((state) => state.websiteDBReducer);
  React.useEffect(() => {
    N_getActivityReport(user?.params ? user.params.user_id : user.user_id).then(
      (data) => {
        console.log("AL:",data);
        renderActivityData(data.params.activity_log);
      }
    );
  }, []);

  return (
    <div>
      <Header {...props} />
      <div className="row p-1 " style={{ margin: 0, marginTop: "5em" }}>
        <div className="col-12 col-md-3 col-lg-3 p-0">
          <ProfileSidebar />
        </div>
        <div
          className="col-12 col-md-8 col-lg-8 p-0"
          style={{ marginTop: "12px" }}
        >
          <div
            className={`${webData.bg_color} ` + "p-2 my-sidebox-shadow"}
            style={{ backgroundColor: webData.bg_color_code }}
          >
            <div className="main-profile-pro d-flex align-items-center bb-1 h-25">
              <i class="fa fa-info ml-2 mr-2 mt-2" />
              <h4 className="px-2 font-weight-bold pt-3">Activity Log</h4>
            </div>
            <article>
              {activitydata == 0 ? (
                <div class="row">
                  <div class="col-lg-8">
                    <div class="error-msg-wrapper">
                      <div class="error-msg">
                        <h2>Opps! No record found</h2>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              {activitydata
                ? activitydata.map((item) => (
                    <div className="bb-1 p-2 mdfthemetxt">
                      <div className="row m-0 d-flex align-items-center   p-1 justify-content-between">
                        <div className="col-1">
                          <div className="h6 p-0 m-0">Date</div>
                        </div>
                        <div className="col-4 h6 p-0 m-0 text-secondary">
                          {new Date(item.createdAt).toLocaleString()}
                        </div>
                      </div>
                      <div className="row m-0 d-flex align-items-center    p-1 justify-content-between">
                        <div className="col-1">
                          <div className="h6 p-0 m-0">IP</div>
                        </div>
                        <div className="col-4 h6 p-0 m-0 text-secondary">
                          {item.ip_address}
                        </div>
                      </div>
                      <div className="row m-0 d-flex align-items-center  p-1 justify-content-between">
                        <div className="col-1">
                          <div className="h6 p-0 m-0">Browser</div>
                        </div>
                        <div className="col-4 h6 p-0 m-0 text-secondary">
                          {item.browser_info}
                        </div>
                      </div>
                      <div className="row m-0 d-flex align-items-center  p-1 justify-content-between">
                        <div className="col-1">
                          <div className="h6 p-0 m-0">OS</div>
                        </div>
                        <div className="col-4 h6 p-0 m-0 text-secondary">
                          {item.sys_info}
                        </div>
                      </div>
                    </div>
                  ))
                : ""}
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
