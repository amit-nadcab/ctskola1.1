import React, { useState } from "react";
import Header from "./components/Header";
import "./login.css";
import {
  isCpass,
  isPass,
} from "./redux/helpers/form-validator.functions";
import { password_update } from "./redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";

export default function Forget(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
  const [password, setPassword] = useState();
  const [confPassword, setConfPassword] = useState();
  const { otp_send, user } = useSelector((state) => state.AuthReducer);
  if (!otp_send) props.history.push("/login");
  const onSubmit = (e) => {
    e.preventDefault();
    if (isPass(password) && isCpass(confPassword)) {
      setLoading(true);
      dispatch(
        password_update(
          user?.params ? user.params.user_id : user.user_id,
          password,
          confPassword,
          () => {
            setLoading(false);
            props.history.replace("/login");
          },
          () => setLoading(false)
        )
      );
    }
  };
  return (
    <>
      <Header {...props} />
      <div className="signupContainer mdfthemetxt">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-12 col-sm-12">
              <form
                className="signupform"
                method="post"
                id="signupform"
                onSubmit={onSubmit}
              >
                <div>
                  <h2>Update Password</h2>
                </div>
                <div className="signupform-control">
                  <small id="msg" style={{ fontSize: "15px" }}>
                    Error message
                  </small>
                </div>
                <div className={`signupform-control`}>
                  <label htmlFor="user_password">PASSWORD</label>
                  <input
                    type="password"
                    name="user_password"
                    required=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="pass"
                    placeholder="password"
                  />
                  <i className="fas fa-check-circle"></i>
                  <i className="fas fa-exclamation-circle"></i>
                  <p>
                    Password must be contain atleast 1 Capital charcter , 1
                    digit , 1 symbol and length should be greater than 8.
                  </p>
                  <small className="text-danger" id="passerr"></small>
                </div>
                <div className={`signupform-control`}>
                  <label htmlFor="user_cpassword">CONFIRM PASSWORD</label>
                  <input
                    type="password"
                    name="user_cpassword"
                    id="cpass"
                    required=""
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                    placeholder="confirm password"
                  />
                  <i className="fas fa-check-circle"></i>
                  <i className="fas fa-exclamation-circle"></i>
                  <small className="text-danger" id="cpasserr"></small>
                </div>
                <button type="submit" id="btn_submit" className="reg_btn">
                  <i className="loading-icon fas fa-spinner fa-spin h"></i>
                  <span id="reg">Change</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
