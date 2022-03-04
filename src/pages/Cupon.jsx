import React from "react";
import ProfileSidebar from "./components/ProfileSidebar";
import Header from "./components/Header";
import { useSelector } from "react-redux";

export default function Cupon(props) {
  const { webData } = useSelector((state) => state.websiteDBReducer);
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
            <i className="fa fa-gift ml-2 mr-2 mt-2"/>
              <h4 className="px-2 font-weight-bold pt-3">Coupon Rewards</h4>
            </div>
            <article>
              <div className="col-md-10">
                <div className="sanfont ">
                    <div className="bold mb-1">Claim your coupon reward on {webData.website_title}</div>
                    <div className="float-right"><i className="fa fa-gift gift_icon" aria-hidden="true"></i></div>
                    <div className="mb-3">Enter your coupon code and perform the required activities to claim your reward. </div>
                    <div className="form-row mdfthemetxt">
                      <div className="form-group col-md-6 p-0">
                        <label for="inputEmail4" className="mdfthemetxt">Enter a coupon code</label>
                        <input type="email" className="form-control" id="inputEmail4" placeholder="Enter Code"/>
                      </div>
                      <div className="form-group col-md-6">
                        <label for="inputEmail5"></label>
                        <div className="">
                          <a href="#support" className="btn btn-secondary mt-2 mb-2 bold"> Apply</a>
                        </div>
                      </div>
                    </div>
                </div>
              </div>  
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
