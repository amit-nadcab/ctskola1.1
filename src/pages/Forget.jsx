import React,{useState} from "react";
import Header from "./components/Header";
import "./login.css";
import {
  isEmail
} from "./redux/helpers/form-validator.functions";
import {user_forget} from './redux/actions/authActions';
import {  useDispatch } from "react-redux";
export default function Forget(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
  const [email, setEmail] = useState();
  const onSubmit = (e) => {
    e.preventDefault();
    if (isEmail(email)) {
      setLoading(true);
      dispatch(
        user_forget(
          email,
          () => {
            setLoading(false);
            props.history.replace("/forget-password");
          },
          () => setLoading(false)
        )
      );
    }
  };
  return (
    <>
      <Header {...props}/>
      <div className="signupContainer mdfthemetxt">
        <div className="container shead-bg">
          <div className="row">
            <div className="col-12 col-md-12 col-sm-12">
            <form
                className="signupform"
                method="post"
                id="signupform"
                onSubmit={onSubmit}
              >
                <div>
                  <h2>Forget Password</h2>
                </div>
                <div className="signupform-control">
                  <small id="msg" style={{fontSize: "15px"}}>
                    Error message
                  </small>
                </div>
                <div className="signupform-control">
                  <label htmlFor="user_email">EMAIL</label>
                  <input
                    type="email"
                    name="user_email"
                    required=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="signupform-control"
                    id="user_email"
                    placeholder="example@gmail.com"
                  />
                  <i className="fas fa-check-circle"></i>
                  <i className="fas fa-exclamation-circle"></i>
                  <small>Error message</small>
                </div>
                <button type="submit" id="btn_submit" className="reg_btn">
                  <i className="loading-icon fas fa-spinner fa-spin h"></i>
                  <span id="reg">Send</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
