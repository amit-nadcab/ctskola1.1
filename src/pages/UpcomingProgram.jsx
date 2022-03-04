import React from "react";
import ProfileSidebar from "./components/ProfileSidebar";
import Header from "./components/Header";

export default function UpcomingProgram(props) {
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
            <i className="fa fa-lock ml-2 mr-2 mt-2"/>
              <h4 className="px-2 font-weight-bold pt-3">Upcoming Program</h4>
            </div>
            <article>
              <h1>Coming Soon</h1>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
