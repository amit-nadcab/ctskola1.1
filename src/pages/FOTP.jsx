import React,{useState} from "react";
import Header from "./components/Header";
import { isOtp } from "./redux/helpers/form-validator.functions";
import { useDispatch, useSelector } from "react-redux";
import { opt_forget_verify } from "./redux/actions/authActions";
export default function FOTP(props) {
  const { otp_send, user } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  if (!otp_send) props.history.push("/login");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState();
  const handleProceedSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(
        opt_forget_verify(
        otp,
        user.email,
        () => props.history.push("/update-password"),
        () => setLoading(false)
      )
    );
  };
  return (
    <>
      <Header {...props} />
      <div className="signupContainer">
        <div className="security_header shead-bg">
          <div className="security_head">
            <div className="sec_circle bg_circle shead-circle">
              <i className="fas fa-dot-circle"></i>
              <span color="#ffffff" className="email_span">
                Email
              </span>
            </div>
          </div>
        </div>
        <div className="container shead-bg">
          <div className="row">
            <div className="col-12 col-md-12 col-sm-12">
              <form
                className="signupform mdfthemetxt"
                onSubmit={handleProceedSubmit}
                id="otp_form"
              >
                <div>
                  <h3>Check your inbox for verification mail</h3>
                </div>
                <div className="signupform-control">
                  <small id="msg" style={{ fontSize: "15px" }}>
                    Error message
                  </small>
                </div>
                <div className="signupform-control">
                  <div>
                    An OTP has sent your email
                    <br />
                    <strong>{user.email}</strong>. Don't see it? check your spam
                    folder.
                    <br /> <br />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="user_otp"
                      className="signupform-control"
                      value={otp}
                      id="user_otp"
                      maxLength={6}
                      onChange={(e) => {
                        setOtp(e.target.value);
                        isOtp(e.target.value);
                      }}
                      placeholder="Enter Your OTP"
                    />
                    <i
                      className="fas fa-check-circle"
                      style={{ top: "16px" }}
                    ></i>
                    <i
                      className="fas fa-exclamation-circle"
                      style={{ top: "16px" }}
                    ></i>
                    <small>Error message</small>
                  </div>
                  <button type="submit" id="proceed_btn" className="sendbtn">
                    Verify
                  </button>
                </div>
                {loading ? (
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
