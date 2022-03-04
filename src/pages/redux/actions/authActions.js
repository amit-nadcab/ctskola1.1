import { NotificationManager } from "react-notifications";
import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  SEND_OTP,
  F_OTP,
  SEND_AUTH,
} from "../constant";
import {
  userLogout,
} from "../helpers/api_functions";

import {
  N_forgetPassward,
  N_resendOTP,
  N_setActivityReport,
  N_updatePassword,
  N_userInfoSubmit,
  N_userLogin,
  N_userRegister,
  N_verifyForgetOTP,
  N_verifyOTP,
} from "../helpers/api_functions_new";

export function user_Login(email, password, resolve, reject) {
  return (dispatch) => {
    N_userLogin(email, password)
      .then((res) => {
        console.log("node user login: ", res);
        if (res.status === 200) {
          if (!res.params.ev) {
            console.log("uid: ", res.params.user_id);
            N_resendOTP(res.params.user_id).then((res1) => {
              console.log(res1);
              if (res1.status === 200) {
                dispatch({
                  type: SEND_OTP,
                  data: { email: email, user_id: res.params.user_id },
                });
                resolve();
              } else {
                NotificationManager.error(res.message);
                reject();
              }
            });
          } else {
            dispatch({ type: AUTH_LOGIN, data: res });
            N_setActivityReport(res.params.user_id);
            resolve();
          }
        } else {
          NotificationManager.error(res.message, "Error", 3000);
          reject();
        }
      })
      .catch((e) => {
        console.log(e);
        NotificationManager.error(e.message);
        reject();
      });

    // userLogin(email, password)
    //   .then((res) => {
    //     console.log("Login", res);
    //     if (res.status === 1) {
    //       dispatch({ type: AUTH_LOGIN, data: res });
    //       setActivityReport(res.token);
    //       resolve();
    //     } else {
    //       NotificationManager.error(res.msg, "Error", 3000);
    //       reject();
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     NotificationManager.error(e.message);
    //     reject();
    //   });
  };
}

export function user_authentication(
  email,
  password,
  authenticator,
  authenticator_key,
  resolve
) {
  return (dispatch) => {
    dispatch({
      type: SEND_AUTH,
      data: {
        email: email,
        password: password,
        authenticator: authenticator,
        authenticator_key: authenticator_key,
      },
    });
    resolve();
  };
}

export function password_update(
  user_id,
  password,
  confirm_password,
  resolve,
  reject
) {
  return (dispatch) => {
    N_updatePassword(user_id, password, confirm_password)
      .then((res) => {
        console.log("password update", res, user_id);
        if (res.status === 200) {
          // dispatch({ type: AUTH_LOGIN, data: res });
          resolve();
        } else {
          NotificationManager.error(res.msg, "Error", 3000);
          reject();
        }
      })
      .catch((e) => {
        console.log(e);
        NotificationManager.error(e.message);
        reject();
      });
    // updatePassword(email, password)
    //   .then((res) => {
    //     console.log("password update", res);
    //     if (res.status === 1) {
    //       dispatch({ type: AUTH_LOGIN, data: res });
    //       resolve();
    //     } else {
    //       NotificationManager.error(res.msg, "Error", 3000);
    //       reject();
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     NotificationManager.error(e.message);
    //     reject();
    //   });
  };
}

export function user_Register(
  email,
  password,
  c_password,
  referral,
  resolve,
  reject
) {
  return (dispatch) => {
    N_userRegister(email, password, c_password, referral)
      .then((res) => {
        console.log("Register", res);
        if (res.status === 200) {
          NotificationManager.success(res.message);
          dispatch({
            type: SEND_OTP,
            data: { email: email, user_id: res.params.user_id },
          });
          resolve();
        } else {
          NotificationManager.error(res.message);
          reject();
        }
      })
      .catch((e) => {
        console.log("n-user_reg err", e);
      });

    // userRegister(email, password, referral)
    //   .then((res) => {
    //     console.log("Register", res);
    // // // if (res.status === 1) {
    // // //   NotificationManager.success(res.msg);
    // // //   dispatch({
    // // //     type: SEND_OTP,
    // // //     data: { email: email, sessionId: res.user_id },
    // // //   });
    // //   resolve();
    // } else {
    //   NotificationManager.error(res.msg);
    //   reject();
    // }
    // })
    // .catch((e) => {
    //   console.log(e);
    //   reject();
    // });
  };
}

export function user_forget(email, resolve, reject) {
  return (dispatch) => {
    N_forgetPassward(email)
      .then((res) => {
        if (res.status === 200) {
          NotificationManager.success(res.message);
          dispatch({
            type: F_OTP,
            data: { email: email },
          });
          resolve();
        } else {
          NotificationManager.error(res.message);
          reject();
        }
      })
      .catch((e) => {
        console.log(e);
        reject();
      });
    // forgetPassward(email)
    //   .then((res) => {
    //     if (res.status === 1) {
    //       NotificationManager.success(res.msg);
    //       dispatch({
    //         type: F_OTP,
    //         data: { email: email },
    //       });
    //       resolve();
    //     } else {
    //       NotificationManager.error(res.msg);
    //       reject();
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     reject();
    //   });
  };
}

export function opt_verify(otp, user_id, resolve, reject) {
  return (dispatch) => {
    // console.log("OTP", otp, "session", session_id);
    N_verifyOTP(otp, user_id)
      .then((res) => {
        console.log("otp verify Node: ", res);
        if (res.status === 200) {
          dispatch({ type: AUTH_LOGIN, data: res });
          NotificationManager.success(res.message);
          resolve();
        } else {
          NotificationManager.error(res.message);
          reject();
        }
      })
      .catch((err) => {
        console.log("err otp verify:", err);
      });
    // verifyOTP(otp, session_id)
    //   .then((res) => {
    //     console.log("Verify:", res);
    //     if (res.status === 1) {
    //       dispatch({ type: AUTH_LOGIN, data: res });
    //       resolve();
    //     } else {
    //       NotificationManager.error(res.msg);
    //       reject();
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     NotificationManager.error(e.message);
    //     reject();
    //   });
  };
}

export function opt_forget_verify(otp, email, resolve, reject) {
  return (dispatch) => {
    N_verifyForgetOTP(otp, email)
      .then((res) => {
        if (res.status === 200) {
          // console.log("Fotp user_id", res);
          dispatch({
            type: F_OTP,
            data: { email: email, user_id: res.params.access_token },
          });
          NotificationManager.success(res.message);
          resolve();
        } else {
          NotificationManager.error(res.message);
          reject();
        }
      })
      .catch((e) => {
        console.log(e);
        NotificationManager.error(e.message);
        reject();
      });
    // verifyForgetOTP(otp, email)
    //   .then((res) => {
    //     if (res.status == 1) {
    //       dispatch({ type: F_OTP, data: { email: email } });
    //       resolve();
    //     } else {
    //       NotificationManager.error(res.msg);
    //       reject();
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     NotificationManager.error(e.message);
    //     reject();
    //   });
  };
}

export function user_logout(cb) {
  return (dispatch) => {
    userLogout();
    dispatch({ type: AUTH_LOGOUT });
    cb();
  };
}

export function submitKyc(body, resolve, reject) {
  console.log("ac body: ", body);
  return (dispatch) => {
    N_userInfoSubmit(body)
      .then((res) => {
        if (res.status === 200) {
          console.log("sres: ", res);
          NotificationManager.success(res.message);
          resolve();
        } else {
          console.log("s err: ", res);
          NotificationManager.error(res.message);
          reject();
        }
      })
      .catch((e) => {
        console.log(e);
        reject();
      });
  };
}
