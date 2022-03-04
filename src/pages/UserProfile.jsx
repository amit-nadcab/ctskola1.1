import React, { useEffect } from "react";
import Header from "./components/Header";
import ProfileSidebar from "./components/ProfileSidebar";
import { N_getUserProfile } from "./redux/helpers/api_functions_new";
import { useSelector } from "react-redux";
import Loader from "./components/Loader";
import { Link } from "react-router-dom";
export default function UserProfile(props) {
  const { user } = useSelector((state) => state.AuthReducer);
  const [loading, setLoading] = React.useState(true);
  const [profile, setProfile] = React.useState({});
  useEffect(() => {
    N_getUserProfile(user?.params ? user.params.user_id : user.user_id)
      .then((d) => {
        // console.log("userProfile",d?.params.profile_info);
        if(d.status === 200) {
          setProfile(d?.params.profile_info);
        }
        setLoading(false);
       
      })
      .catch((e) => {
        console.log(e);
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
          style={{
            marginTop: "12px",
            fontFamily: "Open Sans, Lato, sans-serif",
          }}
        >
          <div
            className="p-1 theme-color my-sidebox-shadow"
          >
            <div className="p-1 theme-color">
              <div className="main-profile-pro d-flex align-items-center bb-1 h-25">
                <i className="fa fa-user ml-2 mr-2 mt-2" />
                <h4 className="px-1 pt-3">Profile</h4>
              </div>
            </div>
            <article>
              {loading ? <Loader /> : null}
              {!loading && profile?.name != "" ? (
                <div className="my-1 d-flex align-items-center">
                  <div className="col-1 pr-0">
                    <div className=" float-right  bold">Name :</div>
                    <i className="float-right fa mr-2 theme-color-text fa-user" style={{ fontSize: "17px" }} ></i>
                      
                  </div>
                  <div className="col-2">
                    <div className="float-left ml-1"> {profile.name ? profile.name : "Not Saved" }</div>
                    {/* <Link className="float-left text-underline ml-2" to="/edit_profile">
                        <i className="fa mr-2 theme-color-text fa-pencil-square-o" style={{ fontSize: "17px" }} ></i>
                        Edit
                    </Link> */}
                  </div>
                </div>
              ) : null}
              {!loading && profile?.email != "" ? (
                <div className="my-1 d-flex align-items-center">
                  <div className="col-1 pr-0">
                    <div className=" float-right  bold">Email :</div>
                    <i className="float-right fa mr-2 theme-color-text fa-envelope" style={{ fontSize: "17px" }} ></i>
                  </div>
                  <div className="col-2">
                    <div className="float-left ml-1"> {profile.email ? profile.email : "Please login again"}</div>
                    <Link className="float-left text-underline ml-2" to="/edit_profile">
                        <i className="fa mr-2 theme-color-text fa-pencil-square-o" style={{ fontSize: "17px" }} ></i>
                        Edit
                    </Link>
                  </div>
                </div>

              ) : null}
              {!loading && profile?.mobile_number != "" ? (
                <div className="my-1 d-flex align-items-center">
                <div className="col-1 pr-0">
                  <div className=" float-right  bold">Mobile :</div>
                  <i className="float-right fa mr-2 theme-color-text fa-phone" style={{ fontSize: "17px" }} ></i>
                </div>
                <div className="col-2">
                  <div className="float-left ml-1"> 
                    {profile.mobile_number > 1
                      ? "+91 " + profile.mobile_number
                      : "Not Saved"}
                  </div>
                  <Link className="float-left text-underline ml-2" to={`/mobile-verify?action=edit&mob=`+profile.mobile_number}>
                    <i className="fa mr-2 theme-color-text fa-pencil-square-o" style={{ fontSize: "17px" }} ></i>
                    Edit
                  </Link>
                </div>
              </div>
              ) : null}
              {!loading && profile?.mobile_number == "" ? (
                <div className="px-2 py-4">
                  <button
                    className="btn btn-secondary"
                    onClick={() => props.history.push("/mobile-verify")}
                  >
                    Verify Your Mobile
                  </button>
                </div>
              ) : null}
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
