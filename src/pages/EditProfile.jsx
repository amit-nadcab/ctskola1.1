import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import { submitKyc } from "./redux/actions/authActions";

import FullLoader from "./components/FullLoader";
import { useDispatch, useSelector } from "react-redux";
import {
  N_checkKYCStatus,
  N_getCity,
  N_userEditSubmit,
  N_getState,
  N_getUserProfile,
} from "./redux/helpers/api_functions_new";
import { NotificationManager } from "react-notifications";
import { SEND_OTP } from "./redux/constant";

export default function EditProfile(props) {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.AuthReducer);
  const [loading, setLoading] = useState();
  const [getUser, setUser] = useState();
  const [fullloading, setFullLoader] = useState(true);


  let user_id = user?.params ? user.params.user_id : user.user_id;
  useEffect(() => {
    N_getUserProfile(user_id).then((res) => {
        if(res?.params?.profile_info){
            setFullLoader(false)
            setUser(res.params.profile_info)
        }
    })
  }, []);

  const submit = (e) => {
    e.preventDefault();
    const body = {
        user_id: user?.params ? user.params.user_id : user.user_id,
        first_name: document.getElementById("user_fname").value,
        middle_name: document.getElementById("user_mname").value,
        last_name: document.getElementById("user_lname").value,
        email: document.getElementById("user_email").value,
    };
    console.log(body);
    setLoading(true);
    N_userEditSubmit(body).then((res)=> {
        if(res.status === 200){
            NotificationManager.success(res.message)
            NotificationManager.success("OTP Sent to your Email")
            dispatch({
                type: SEND_OTP,
                data: { email: document.getElementById("user_email").value, user_id: user_id },
            });
            props.history.replace("/otp?action=change_email&new_email="+document.getElementById("user_email").value);
        }else{
            NotificationManager.error(res.message)
        }
    })
  };
  if (fullloading)
    return (
      <>
        <Header {...props} />
        <FullLoader />
      </>
    );
  else
    return (
      <>
        <Header {...props} />
        <div className="signupContainer mdfthemetxt">
          <div className="container shead-bg">
            <div className="row">
              <div className="col-12 col-md-12 col-sm-12">
                <form
                  className="signupform"
                  onSubmit={submit}
                  method="post"
                  id="welcome_form"
                >
                  <div id="personal_info" className=''>
                    <div>
                      <h3>PERSONAL INFO</h3>
                    </div>
                    <div className="signupform-control h">
                      <label htmlFor="user_fname">FIRST NAME (Name: {getUser && getUser.name ? getUser.name : ''})</label>
                      <input
                        type="text"
                        name="user_fname"
                        className="signupform-control"
                        id="user_fname"
                      />
                      <i className="fas fa-check-circle"></i>
                      <i className="fas fa-exclamation-circle"></i>
                      <small>Error message</small>
                    </div>
                    <div className="signupform-control h">
                      <label htmlFor="user_mname">MIDDLE NAME</label>
                      <input
                        type="text"
                        name="user_mname"
                        className="signupform-control"
                        id="user_mname"
                      />
                      <i className="fas fa-check-circle"></i>
                      <i className="fas fa-exclamation-circle"></i>
                      <small>Error message</small>
                    </div>
                    <div className="signupform-control h">
                      <label htmlFor="user_lname">LAST NAME</label>
                      <input
                        type="text"
                        name="user_lname"
                        className="signupform-control"
                        id="user_lname"
                      />
                      <i className="fas fa-check-circle"></i>
                      <i className="fas fa-exclamation-circle"></i>
                      <small>Error message</small>
                    </div>
                    <div className="signupform-control">
                      <label htmlFor="user_email">Email</label>
                      <input
                        type="text"
                        name="user_email"
                        defaultValue={getUser && getUser.email ? getUser.email : ''}
                        className="signupform-control"
                        id="user_email"
                      />
                    </div>
                    <input type="hidden" name="session_id" id="session_id" />
                    <button type="submit" id="btn_submit" className="reg_btn">
                      {loading ? (
                        <i className="loading-icon fas fa-spinner fa-spin mr-2"></i>
                      ) : null}
                      <span id="reg">SUBMIT</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
