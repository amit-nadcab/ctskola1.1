import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { isOtp } from "./redux/helpers/form-validator.functions";
import { useDispatch, useSelector } from "react-redux";
import { opt_verify } from "./redux/actions/authActions";
import { NotificationManager } from "react-notifications";
import { N_resendOTP, N_userEditSubmit } from "./redux/helpers/api_functions_new";

const OTP = (props) => {
  const { otp_send, user } = useSelector((state) => state.AuthReducer);
  const [ctime, setctime] = useState("00:00");
  const [timer, settimer] = useState(true);
  const dispatch = useDispatch();
  if (!otp_send) props.history.push("/create");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState();
  let newparams = new URLSearchParams(window.location.search);
  const handleProceedSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let user_id = user?.params ? user.params.user_id : user.user_id
    dispatch(
      opt_verify(
        otp,
        user_id,
        () => {
          setLoading(false);
          newparams.get('action') == 'change_email' ? changeEmail(user_id,newparams.get('new_email')) : props.history.replace("/security");
        },
        () => setLoading(false)
      )
    );
  };

  const changeEmail = (user_id,email) => {
    const body = {
      user_id: user_id,
      action: 'set_email',
      email: email,
    };
    N_userEditSubmit(body).then((res)=> {
      if(res.status === 200){
          NotificationManager.success(res.message)
          props.history.replace("/profile")
      }else{
          NotificationManager.error(res.message)
      }
  })
  };
  const resendEmail = (user_id) => {
    N_resendOTP(user_id).then((data) => {
      if (data.status === 200) {
        NotificationManager.success(data.message);
      } else if (data.status == 1) {
        NotificationManager.error(data.message);
      }
    });
  };

  const otpCountdown = () => {
    let duration = 60 * 2;
    // const display = document.getElementById("#timer");
    let timer = duration,
      minutes,
      seconds;
    const tint = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      setctime(minutes + ":" + seconds);

      if (--timer < 0) {
        // timer = duration;
        clearInterval(tint);
        settimer(false);
      }
    }, 1000);
  };
  
  useEffect(() => {
    otpCountdown();
  }, []);

  return (
    <>
      <Header {...props} />
      <div className="signupContainer mdfthemetxt">
        <div className="security_header shead-bg">
          <div className="security_head">
            <div className="sec_circle bg_circle shead-circle">
              <i className="fas fa-dot-circle"></i>
              <span color="#ffffff" className="email_span">
                Email
              </span>
            </div>
            <div className="sec_circle bg_dot_circle shead-circle">
              <i className="fas fa-dot-circle"></i>
              <span color="#ffffff" className="email_span">
                Security
              </span>
            </div>
            <div className="sec_circle bg_dot_circle shead-circle">
              <i className="fas fa-dot-circle"></i>
              <span color="#ffffff" className="email_span">
                Welcome
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
                    <br />
                    If the email adress is wrong then click
                    <strong>back</strong> button.
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
                    {timer ? (
                      <div className="resend_btn text-info" id="timer">
                        {ctime}
                      </div>
                    ) : (
                      <div
                        className="resend_btn text-info"
                        onClick={(e) => {
                          resendEmail(user?.params ? user.params.user_id : user.user_id);
                          settimer(true);
                          otpCountdown();
                        }}
                      >
                        Resend
                      </div>
                    )}
                  </div>
                </div>
                <div className="signupform-control" id="btns">
                  <button
                    type="button"
                    onClick={(e) => props.history.push("/create")}
                    className="backbtn"
                  >
                    BACK
                  </button>
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
};

export default OTP;
