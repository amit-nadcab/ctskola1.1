import $ from "jquery";
// import { browserName } from "react-device-detect";
import { NotificationManager } from "react-notifications";
import axios from "axios";

// const url = "https://api.ctskola.com/api";
// const url = "http://localhost:5000/api";
const url = "https://api.ctskola.com/api";
export const WebsiteURL =  'https://ctskola.com' ;
const orderurl = "https://order.ctskola.com/api";
// const url = "https://api.kingvrx.com/api";

// const signal = new AbortController();

export function N_userRegister(email, password, confirm_password, referral) {
  return fetch(`${url}/register-user`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      confirm_password: confirm_password,
      parent_ref_code: referral,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function N_verifyOTP(otp, session_id) {
  return fetch(`${url}/varifie/email`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ otp: otp, user_id: session_id }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function N_userLogin(email, password) {
  // console.log("N_login: ", email, password);
  return fetch(`${url}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function N_resendOTP(user_id) {
  return fetch(`${url}/resend-otp`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ user_id: user_id }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function N_forgetPassward(email) {
  return fetch(`${url}/forget-password`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      email: email,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function N_verifyForgetOTP(otp, email) {
  return fetch(`${url}/varifie/forget-password`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ otp: otp, email: email }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function N_updatePassword(user_id, password, confirm_password) {
  return fetch(`${url}/set-password`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      access_token: user_id,
      confirm_password: confirm_password,
      password: password,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function N_createBuyOffer(
  raw_price,
  volume,
  currency_type,
  compare_currency,
  user_id,
  type = ""
) {
  return fetch(`${orderurl}/buy-order`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      user_id: user_id,
      currency_type: currency_type,
      volume: volume,
      compare_currency: compare_currency,
      raw_price: raw_price,
      type: type,
    }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function N_createSellOffer(
  raw_price,
  volume,
  currency_type,
  compare_currency,
  user_id,
  type = ""
) {
  return fetch(`${orderurl}/sell-order`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      user_id: user_id,
      currency_type: currency_type,
      volume: volume,
      compare_currency: compare_currency,
      raw_price: raw_price,
      type: type,
    }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function N_userInfoSubmit(body) {
  return fetch(`${url}/kyc/set-personal-info`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      kyc_type: body.type_of_kyc,
      first_name: body.fname,
      middle_name: body.mname,
      last_name: body.lname,
      date_of_birth: new Date(body.dob).getTime(),
      address: body.address,
      country: body.country,
      state: body.state,
      city: body.city,
      pincode: body.pincode,
      user_id: body.user_id,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}
export function N_userEditSubmit(body) {
  return fetch(`${url}/updateprofile`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(body),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function N_setKyc(event, user_id) {
  const formControl = event.target.parentElement;
  let body = {};
  try {
    formControl.querySelector(".spinner-border").style.display = "block";
    const typeInput = formControl.querySelector("input");
    body.user_id = user_id;
    if (typeInput.type === "text") {
      const val = formControl.querySelector("input").value;
      if (typeInput.id === "user_adhar") {
        body.data = {
          value: val,
          type: "Adhar",
        };
        body.title = "docn";
      } else if (typeInput.id === "user_dl") {
        body.data = {
          value: val,
          type: "Driving",
        };
        body.title = "docn";
      } else if (typeInput.id === "user_passport") {
        body.data = {
          value: val,
          type: "Passport",
        };
        body.title = "docn";
      } else if (typeInput.id === "user_pancard") {
        body.data = val;
        body.title = "pann";
      }
    }
  } catch (e) {
    console.log("setkyc: ", e);
  }

  try {
    fetch(`${url}/kyc/update-documents`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "cache-control": "no-cache",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(body),
    })
      .then((d) => d.json())
      .then((res) => {
        if (res && res.status === 200) {
          // console.log("success: ", res);
          $("#" + event.target.id).text("Resend");
        }
        if (res && res.status === 400) {
          console.log("error: ", res);
          NotificationManager.error(res.message);
          $("#" + event.target.id).text("Resend");
        }
        formControl.querySelector(".spinner-border").style.display = "none";
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (error) {
    console.error("An unexpected error happened:", error);
  }
}

export function N_test(event, file, title, user_id) {
  event.preventDefault();
  const formControl = event.target.parentElement;
  formControl.querySelector(".spinner-border").style.display = "block";
  const formData = new FormData();
  console.log(file);
  // The third parameter is required for server
  formData.append("file", file, file.name);
  formData.append("title", title);
  formData.append("user_id", user_id);
  formData.append("data", title);
  console.log("chalform0: ", formData);
  axios
    .post(`${url}/kyc/update-documents`, formData)
    .then((res) => {
      if (res && res.status === 200) {
        console.log("chalform: ", formData);
        $("#" + event.target.id).text("Resend");
      }
      if (res && res.status === 400) {
        NotificationManager.error(res.msg);
        $("#" + event.target.id).text("Resend");
      }
      formControl.querySelector(".spinner-border").style.display = "none";
    })
    .catch((e) => {
      console.log(e);
    });
}

export function N_ScreenShot(event, file, price, user_id, req_no) {
  event.preventDefault();
  const formControl = event.target.parentElement;
  const formData = new FormData();
  // The third parameter is required for server
  if (file && price && user_id) {
    formControl.querySelector(".spinner-border").style.display = "block";
    formData.append("file", file, file.name);
    formData.append("price", price);
    formData.append("req_no", req_no);
    formData.append("user_id", user_id);

    axios
      .post(`${url}/upload-screenshot`, formData)
      .then((res) => {
        const data = res.data;
        if (res.status === 200 && data.status === 200) {
          NotificationManager.success(data.message);
        } else {
          NotificationManager.error(data.message);
        }
        formControl.querySelector(".spinner-border").style.display = "none";
      })
      .catch((e) => {
        NotificationManager.error("Something went Wrong!!");
      });
  } else {
    NotificationManager.error("Provide all Data");
  }
}

// export function N_uploadSelfie(event, user_id) {
//   $("#" + event.target.id).hide();
//   $(".cancelbtn").hide();
//   const formControl = event.target.parentElement;
//   formControl.querySelector(".spinner-border").style.display = "block";
//   var body = {};
//   body.user_id = user_id;
//   const val = formControl.querySelector("img").src;
//   body.data = val;
//   body.title = "docs";
//   console.log(body);
//   try {
//     fetch(`${url}/kyc/update-documents`, {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//         "cache-control": "no-cache",
//         "Access-Control-Allow-Origin": "*",
//       },
//       body: JSON.stringify(body),
//     })
//       .then((d) => d.json())
//       .then((res) => {
//         if (res && res.status === 200) {
//           $(".cancelbtn").show();
//           $(".cancelbtn").text("Reclick");
//           formControl.querySelector(".spinner-border").style.display = "none";
//         }
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   } catch (error) {
//     console.error("An unexpected error happened:", error);
//   }
// }

export function N_checkKYCStatus(user_id) {
  return fetch(`${url}/kyc/check-status`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      user_id: user_id,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function N_ischeckKycSubmited(user_id, data) {
  return fetch(`${url}/kyc/update-documents`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      user_id: user_id,
      title: "kycstatus",
      data: data,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function N_get_wallet(user_id) {
  return fetch(`${url}/get-wallets`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ user_id: user_id }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function N_getSupportedCurrency(user_id) {
  return fetch(`${url}/getpairedCurrency`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ user_id: user_id }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function N_getUserBankDetails(user_id) {
  return fetch(`${url}/banking/get-banking-status`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      user_id: user_id,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function N_addBinficiary(
  account_number,
  confirm_account_number,
  bank_name,
  name,
  ifsc_code,
  account_type,
  user_id
) {
  return fetch(`${url}/banking/set-banking-info`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      bank_name: bank_name,
      name: name,
      account_type: account_type,
      account_number: account_number,
      confirm_account_number: confirm_account_number,
      ifsc_code: ifsc_code,
      user_id: user_id,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function N_OrdersHistory(user_id) {
  return fetch(`${url}/order-history`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      user_id: user_id,
    }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function N_setGoogleAuth(temp, state, user_id) {
  return fetch(`${url}/set-auth-google`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      user_id: user_id,
      secret: temp,
      status: state,
    }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function N_setGoogleAuthOtp(user_id, state) {
  return fetch(`${url}/set-auth-google-otp`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      user_id: user_id,
      status: state,
    }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function N_get_settings(user_id) {
  return fetch(`${url}/get-auth-google-setting`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ user_id: user_id }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function N_getUserProfile(user_id) {
  return fetch(`${url}/user/get-profile-info`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      user_id: user_id,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function N_sendOTPMobile(user_id, mobile_number) {
  return fetch(`${url}/send-mobile-varification-otp`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      user_id: user_id,
      mobile_no: mobile_number,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function N_sendOTPMobileEmail(email, mobile_number) {
  return fetch(`${url}/send-mobile-varification-otp-email`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      email: email,
      mobile_no: mobile_number,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function N_verifyOTPMobile(user_id, otp) {
  return fetch(`${url}/varifie/mobile`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      user_id: user_id,
      otp: otp,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}
export function N_verifyOTPMobileLogin(email, otp) {
  return fetch(`${url}/varifie/mobile-login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      email: email,
      otp: otp,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function N_checkMobileStatus(user_id) {
  return fetch(`${url}/check_user_status`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      user_id: user_id,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function N_getGoogleAuth(email, password) {
  return fetch(`${url}/get-auth-google`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function N_getRefferalData(user_id) {
  return fetch(`${url}/user/get-referals`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      user_id: user_id,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function N_cancleOrderById(user_id, order_id) {
  return fetch(`${url}/cancle-order`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      user_id: user_id,
      order_id: order_id,
    }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function N_DepositUpdate(user_id) {
  return fetch(`${url}/update-wallet`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      user_id: user_id,
    }),
  })
    .then((d) => d)
    .catch((e) => e);
}

export function N_crypto_withdraw(
  user_id,
  symbol,
  address,
  to_address,
  volume,
  remark
) {
  return fetch(`${url}/get-withdraw`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      user_id: user_id,
      fromAddress: address,
      symbol: symbol,
      toAddress: to_address,
      volume: volume,
      remark: remark,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function N_crypto_withdraw_Otp(user_id, otp, wallettype) {
  return fetch(
    `${url}/varifie/mobile-Withdraw
  `,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "cache-control": "no-cache",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        user_id: user_id,
        otp: otp,
        transection_id: wallettype,
      }),
    }
  )
    .then((d) => d.json())
    .catch((e) => e);
}

export function N_crypto_withdraw_Otp_Email(user_id, otp, wallettype) {
  return fetch(
    `${url}/varifie/email-Withdraw
  `,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "cache-control": "no-cache",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        user_id: user_id,
        otp: otp,
        transection_id: wallettype,
      }),
    }
  )
    .then((d) => d.json())
    .catch((e) => e);
}

export function N_inr_withdraw(user_id, volume, symbol, remark) {
  return fetch(`${url}/banking/inr_withdrawal`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      user_id: user_id,
      volume: volume,
      symbol: symbol,
      remark: remark,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function N_withdraw_coin(transection_id) {
  return fetch(`${url}/success-withdrawal`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      transection_id: transection_id,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function N_transectionHistory(user_id) {
  return fetch(`${url}/transection_history`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      user_id: user_id,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function N_withdraw_inr(transection_id) {
  return fetch(`${url}/success-inr-withdrawal`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      transection_id: transection_id,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function N_getCountry(user_id) {
  return fetch(`${url}/kyc/get-country`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ action: "country", user_id: user_id }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function N_getState(country, user_id) {
  return fetch(`${url}/kyc/get-country`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      action: "state",
      country_name: country,
      user_id: user_id,
    }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function N_getCity(country, state, user_id) {
  return fetch(`${url}/kyc/get-country`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      action: "city",
      country_name: country,
      state_name: state,
      user_id: user_id,
    }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function N_getBank(user_id) {
  return fetch(`${url}/banking/get-bank`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      user_id: user_id,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function N_getWebsiteData() {
  return fetch(`${url}/get-website-data`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function N_setActivityReport(user_id) {
  return fetch(`${url}/activity-log`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      action: "set_report",
      user_id: user_id,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}
export function N_getActivityReport(user_id) {
  return fetch(`${url}/activity-log`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      action: "get_report",
      user_id: user_id,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function N_getNotification(user_id) {
  return fetch(`${url}/notification`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      action: "get",
      user_id: user_id,
    }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function N_panVerify(pan_no, user_id) {
  return fetch(`${url}/kyc/verify-pan`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
       "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      pan_no: pan_no,
      user_id:user_id
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function N_sendAADHAROTPMobile(aadhar_no, user_id) {
  return fetch(`${url}/kyc/validate-aadhar`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
       "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      aadhar_no: aadhar_no,
      user_id:user_id
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function N_verifyAADHAROTPMobile(client_id, mobile_no, otp, user_id) {
  return fetch(`${url}/kyc/verify-adhar`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
       "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      otp: otp,
      mobile_no:mobile_no,
      client_id:client_id,
      user_id:user_id
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}
export function getAPICall(urlslug) {
  const urlaction = url+urlslug
  return axios.get(urlaction);
}
export function postAPICall(urlslug,fomdata,order) {
  let gurl = order ? orderurl : url; 
  const urlaction = gurl+"/"+urlslug
  return axios.post(urlaction,fomdata);
}