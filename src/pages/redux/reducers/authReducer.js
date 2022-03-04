import {
  AUTH_FORGET,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  SEND_OTP,
  F_OTP,
  SEND_AUTH,
  SWITCH_THEME,
} from "../constant";
// let session = localStorage.getItem("exchange-inrx-session");
let user_id = localStorage.getItem("exchange-inrx-userid");

const initialState = {
  user: {
    id: 0,
    email: "",
    kyc: 0,
    verify: 0,
    // token: session ? session : "",
    user_id: user_id ? user_id : "",
  },
  otp_send: false,
  isLoggedIn: user_id ? true : false,
  switch_theme: "light",
};

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      localStorage.setItem("exchange-inrx-userid", action.data.params.user_id);
      console.log(action.data, action.type);
      // localStorage.setItem("exchange-inrx-session", action.data.token);
      return {
        ...state,
        user: { ...action.data },
        otp_send: false,
        isLoggedIn: true,
      };
    case SEND_OTP:
      return {
        ...state,
        otp_send: true,
        user: { ...action.data },
      };
    case F_OTP:
      return {
        ...state,
        otp_send: true,
        user: { ...action.data },
      };
    case SEND_AUTH:
      return {
        ...state,
        otp_send: true,
        user: { ...action.data },
      };
    case AUTH_FORGET:
      return {
        ...state,
      };

    case AUTH_LOGOUT:
      localStorage.removeItem("exchange-inrx-userid");
      localStorage.removeItem("exchange-inrx-session");
      return {
        ...state,
        isLoggedIn: false,
      };
    case SWITCH_THEME:
      return {
        ...state,
        switch_theme: action.data,
      };
    
    default:
      return {
        ...state,
      };
  }
}
