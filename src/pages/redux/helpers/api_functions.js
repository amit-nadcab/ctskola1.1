import $ from "jquery";
import { browserName } from 'react-device-detect';
import { NotificationManager } from "react-notifications";

const url = "https://ctskola.com/api";
const signal = new AbortController();

export function userLogin(email, password) {
  return fetch(`${url}/login`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      // "content-type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function userRegister(email, password, referral) {
  return fetch(`${url}/signup`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      // "content-type": "application/json",
      // "cache-control": "no-cache",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      referrer: referral,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function updatePassword(email, password) {
  return fetch(`${url}/password/update_password.php`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      // "content-type": "application/json",
      // "cache-control": "no-cache",
    },
    body: JSON.stringify({
      email: email,
      password: password
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function forgetPassward(email) {
  return fetch(`${url}/password/forget_pass.php`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    signal: signal.signal,
    headers: {
      // "content-type": "application/json",
      // "cache-control": "no-cache",
    },
    body: JSON.stringify({
      email: email,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function verifyOTP(otp, session_id) {
  return fetch(`${url}/verify`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      // "content-type": "application/json",
      // "cache-control": "no-cache",
    },
    body: JSON.stringify({ otp: otp, user_id: session_id }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function verifyForgetOTP(otp, email) {
  return fetch(`${url}/password/verify_otp.php`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    signal: signal.signal,
    headers: {
      // "content-type": "application/json",
      // "cache-control": "no-cache",
    },
    body: JSON.stringify({ otp: otp, email: email }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function userInfoSubmit(body) {
  return fetch(`${url}/basic_info_kyc`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    // headers: {
    //   "content-type": "application/json",
    //   "cache-control": "no-cache",
    // },
    body: JSON.stringify({
      type_of_kyc: body.type_of_kyc,
      fname: body.fname,
      mname: body.mname,
      lname: body.lname,
      dob: body.dob,
      address: body.address,
      country: body.country,
      state: body.state,
      city: body.city,
      pincode: body.pincode,
      token_id: body.session_id,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function setKyc(event, session_id) {
  const formControl = event.target.parentElement;
  formControl.querySelector(".spinner-border").style.display = "block";
  const typeInput = formControl.querySelector("input");
  var body = {};
  body.token_id = session_id;
  if (typeInput.type === "text") {
    const val = formControl.querySelector("input").value;
    body.doc_no = val;
    if (typeInput.id === "user_adhar") {
      body.doc_type = "AdharCard";
      body.field_type = "doc_1";
    } else if (typeInput.id === "user_pancard") {
      body.doc_type = "PanCard";
      body.field_type = "doc_2";
    }
  } else if (typeInput.type === "file") {
    const img = formControl.querySelector("img");
    const val = img.src;
    body.value = val;
    body.size = "10000";
    body.type = "image/jpg";
    if (img.id === "front_adhar") {
      body.field_type = "doc1f";
    } else if (img.id === "back_adhar") {
      body.field_type = "doc1b";
    } else if (img.id === "front_dl") {
      body.field_type = "doc1f";
    } else if (img.id === "back_dl") {
      body.field_type = "doc1b";
    } else if (img.id === "front_passport") {
      body.field_type = "doc1f";
    } else if (img.id === "back_passport") {
      body.field_type = "doc1b";
    } else if (img.id === "front_pan") {
      body.field_type = "doc2f";
    } else if (img.id === "back_pan") {
      body.field_type = "doc2b";
    }
  }

  try {
    fetch(`${url}/submit_kyc_doc`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      // headers: {
      //   "content-type": "application/json",
      //   "cache-control": "no-cache",
      // },
      body: JSON.stringify(body),
    })
      .then((d) => d.json())
      .then((res) => {
        if (res && res.status === 1) {
          $("#" + event.target.id).text("Resend");
        }
        if (res && res.status === 0) {
          NotificationManager.error(res.msg)
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

export function ischeckKycSubmited(token_id,ac,pc) {
return fetch(`${url}/submit_kyc_doc`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({ 
      token_id: token_id,
      ac: ac,
      pc: pc,
      field_type: "final" 
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function uploadSelfie(event, session_id) {
  $("#" + event.target.id).hide();
  $(".cancelbtn").hide();
  const formControl = event.target.parentElement;
  formControl.querySelector(".spinner-border").style.display = "block";
  var body = {};
  body.token_id = session_id;
  const val = formControl.querySelector("img").src;
  body.value = val;
  body.size = "10000";
  body.type = "image/jpg";
  body.field_type = "doc1s";
  try {
    fetch(`${url}/submit_kyc_doc`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      // headers: {
      //   "content-type": "application/json",
      //   "cache-control": "no-cache",
      // },
      body: JSON.stringify(body),
    })
      .then((d) => d.json())
      .then((res) => {
        if (res && res.status === 1) {
          $(".cancelbtn").show();
          $(".cancelbtn").text("Reclick");
          formControl.querySelector(".spinner-border").style.display = "none";
        }
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (error) {
    console.error("An unexpected error happened:", error);
  }
}

export function getCoinsData() {
  return fetch(`${url}/currency_socket_copy`)
    .then((d) => d.json())
    .catch((e) => e);
}

export function get_wallet(session_id) {
  return fetch(`${url}/user_wallet`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({ token_id: session_id }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function get_settings(token_id) {
  return fetch(`${url}/get_setting_detail`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({ token_id: token_id }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function setGoogleAuth(temp, state, token_id) {
  return fetch(`${url}/set_auth_google.php`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({
       token_id: token_id,
       temp_secret:temp,
       state:state
      }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function getGoogleAuth(email, password) {
  return fetch(`${url}/get_google_auth.php`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({
      email: email,
      password:password
      }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function getCountry() {
  return fetch(`${url}/get_country`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    // headers: {
    //   "content-type": "application/json",
    //   "cache-control": "no-cache",
    // },
    body: JSON.stringify({ action: "country" }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function getState(country) {
  return fetch(`${url}/get_country`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({
      action: "state",
      country_name: country,
    }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function getCity(country, state) {
  return fetch(`${url}/get_country`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({
      action: "city",
      country_name: country,
      state_name: state,
    }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function createBuyOffer(
  price,
  quantity,
  currency_type,
  compare_currency,
  session_id,
  action
) {
  return fetch(`${url}/buy_stack`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    // headers: {
    //   "content-type": "application/json",
    //   "cache-control": "no-cache",
    // },
    body: JSON.stringify({
      price: price,
      quantity: quantity,
      currency_type: currency_type,
      compare_currency: compare_currency,
      token_id: session_id,
      action: action,
    }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function createSellOffer(
  price,
  quantity,
  currency_type,
  compare_currency,
  session_id,
  action
) {
  return fetch(`${url}/sell_stack`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({
      price: price,
      quantity: quantity,
      currency_type: currency_type,
      compare_currency: compare_currency,
      token_id: session_id,
      action: action
    }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function getOpenOrders(token_id,action) {
  return fetch(`${url}/open_order`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({
      token_id: token_id,
      action: action,
    }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function getClosedOrders(token_id) {
  return fetch(`${url}/close_order`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({
      token_id: token_id,
    }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function cancleOrderById(token_id, order_id, order_type,action) {
  return fetch(`${url}/cancle_order`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({
      token_id: token_id,
      order_id: order_id,
      order_type: order_type,
      action: action,
    }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function cancleOrder(token_id,action) {
  return fetch(`${url}/cancle_all`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({
      token_id: token_id,
      action: action,
    }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function getAllOrderBook(currency_type, compare_currency, action) {
  return fetch(`${url}/order_book`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({
      currency_type: currency_type,
      compare_currency: compare_currency,
      action: action,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function getTradeHistory(action,subaction,currency_type, compare_currency) {
  return fetch(`${url}/trade_history`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({
      action: action,
      subaction: subaction,
      currency_type: currency_type,
      compare_currency: compare_currency,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}
export function getUserTradeHistory(action,subaction,raw) {
  return fetch(`${url}/trade_history`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({
      action: action,
      subaction: subaction,
      raw: raw,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function getChartData(currency_type, compare_currency, interval) {
  return fetch(`${url}/trade_graph`, {
    method: "POST",
    mode: "cors",
    signal: signal.signal,
    credentials: "include",
    body: JSON.stringify({
      currency_type: currency_type,
      compare_currency: compare_currency,
      interval: interval,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function getBank() {
  return fetch(`${url}/get_bank`, {
    method: "POST",
    mode: "cors",
    signal: signal.signal,
    credentials: "include",
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function addBinficiary(
  account_number,
  bank_name,
  ifsc_code,
  account_type,
  token
) {
  return fetch(`${url}/add_bank_details`, {
    method: "POST",
    mode: "cors",
    signal: signal.signal,
    credentials: "include",
    body: JSON.stringify({
      bank_name: bank_name,
      account_type: account_type,
      account_number: account_number,
      ifsc_code: ifsc_code,
      token_id: token,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function checkBankStatus(token_id) {
  return fetch(`${url}/check_user_status`, {
    method: "POST",
    mode: "cors",
    signal: signal.signal,
    credentials: "include",
    body: JSON.stringify({
      token_id: token_id,
      action: "bank",
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function checkEmailStatus(token_id) {
  return fetch(`${url}/check_user_status`, {
    method: "POST",
    mode: "cors",
    signal: signal.signal,
    credentials: "include",
    body: JSON.stringify({
      token_id: token_id,
      action: "email",
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function checkKYCStatus(token_id) {
  return fetch(`${url}/check_user_status`, {
    method: "POST",
    mode: "cors",
    signal: signal.signal,
    credentials: "include",
    body: JSON.stringify({
      token_id: token_id,
      action: "kyc",
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}
function detectOs () {
  const os = ['Windows', 'Linux', 'Mac']; // add your OS values
  return os.find(v=>navigator.appVersion.indexOf(v) >= 0);
}
export function setActivityReport(token) {
  return fetch(`${url}/activity_report`, {
    method: "POST",
    mode: "cors",
    signal: signal.signal,
    credentials: "include",
    body: JSON.stringify({
      action: "set_report",
      token : token,
      browser:  browserName,
      OS : detectOs(),
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}
export function getActivityReport(token) {
  console.log('success_one');
  return fetch(`${url}/activity_report`, {
    method: "POST",
    mode: "cors",
    signal: signal.signal,
    credentials: "include",
    body: JSON.stringify({
      action  : "get_report",
      token : token,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function checkMobileStatus(token_id) {
  return fetch(`${url}/check_user_status`, {
    method: "POST",
    mode: "cors",
    signal: signal.signal,
    credentials: "include",
    body: JSON.stringify({
      token_id: token_id,
      action: "mobile",
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function getUserProfile(token_id) {
  return fetch(`${url}/user_profile`, {
    method: "POST",
    mode: "cors",
    signal: signal.signal,
    credentials: "include",
    body: JSON.stringify({
      token_id: token_id,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function paymentExecuted(token_id, payment_id, email, user_id, amount) {
  return fetch(`${url}/razorpay/index`, {
    method: "POST",
    mode: "cors",
    signal: signal.signal,
    credentials: "include",
    body: JSON.stringify({
      token_id: token_id,
      payment_id:payment_id,
      email:email,
      user_id:user_id,
      amount:amount
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function getRefferalData(token_id) {
  return fetch(`${url}/user_referral`, {
    method: "POST",
    mode: "cors",
    signal: signal.signal,
    credentials: "include",
    body: JSON.stringify({
      token_id: token_id,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function getSupportedCurrency(action,sub_action) {
  return fetch(`${url}/token/coin`, {
    method: "POST",
    mode: "cors",
    signal: signal.signal,
    credentials: "include",
    body: JSON.stringify({
      action: action,
      sub_action: sub_action,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function sendOTPMobile(token, mobile_number) {
  return fetch(`${url}/verify_mobile`, {
    method: "POST",
    mode: "cors",
    signal: signal.signal,
    credentials: "include",
    body: JSON.stringify({
      token_id: token,
      mobile_number: mobile_number,
      action: "send_otp",
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function resendOTPMobile(token, mobile_number) {
  return fetch(`${url}/verify_mobile`, {
    method: "POST",
    mode: "cors",
    signal: signal.signal,
    credentials: "include",
    body: JSON.stringify({
      token_id: token,
      mobile_number: mobile_number,
      action: "resend_otp",
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function verifyOTPMobile(token, otp) {
  return fetch(`${url}/verify_mobile`, {
    method: "POST",
    mode: "cors",
    signal: signal.signal,
    credentials: "include",
    body: JSON.stringify({
      token_id: token,
      otp: otp,
      action: "verify_otp",
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function crypto_function(token) {
  return fetch(`${url}/update_balance`, {
    method: "POST",
    mode: "cors",
    signal: signal.signal,
    credentials: "include",
    body: JSON.stringify({
      token_id: token,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function crypto_withdraw(token,symbol,address,to_address,volume,remark) {
  return fetch(`${url}/bank/requestCoinWithdraw.php`, {
    method: "POST",
    mode: "cors",
    signal: signal.signal,
    credentials: "include",
    body: JSON.stringify({
      token_id: token,
      fromAddress:address,
      symbol: symbol,
      toAddress: to_address,
      volume: volume,
      remark: remark
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function inr_withdraw(token,volume,remark) {
  return fetch(`${url}/bank/request_withdraw.php`, {
    method: "POST",
    mode: "cors",
    signal: signal.signal,
    credentials: "include",
    body: JSON.stringify({
      token_id: token,
      volume: volume,
      remark: remark
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function getTransactionHistory(token) {
  return fetch(`${url}/crypto_withdrawal_history`, {
    method: "POST",
    mode: "cors",
    signal: signal.signal,
    credentials: "include",
    body: JSON.stringify({
      token_id: token,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function transectionHistory(token) {
  return fetch(`${url}/transection_history.php`, {
    method: "POST",
    mode: "cors",
    signal: signal.signal,
    credentials: "include",
    body: JSON.stringify({
      token_id: token,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}
export function getUserBankDetails(token) {
  return fetch(`${url}/bank_list`, {
    method: "POST",
    mode: "cors",
    signal: signal.signal,
    credentials: "include",
    body: JSON.stringify({
      token_id: token,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}
export function deleteUserBank(action,sub_action,user_id,set_status) {
  return fetch(`${url}/bank_delete`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({ 
      action: action,
      sub_action: sub_action ,
      user_id: user_id ,
      set_status: set_status 
    }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}
export function addfavcoin(token, pairing) {
  return fetch(`${url}/favorite`, {
    method: "POST",
    mode: "cors",
    signal: signal.signal,
    credentials: "include",
    body: JSON.stringify({
      token_id: token,
      pairing: pairing,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function viewAllfavcoin(token) {
  return fetch(`${url}/favorite`, {
    method: "POST",
    mode: "cors",
    signal: signal.signal,
    credentials: "include",
    body: JSON.stringify({
      token_id: token,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function getPending(session_id) {
  return fetch(`${url}/kyc/ed/getPending`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
    },
    body: JSON.stringify({ session_id: session_id }),
  })
    .then((res) => res.json())
    .catch((e) => {
      return e;
    });
}

export async function updateKyc(txt, msg, id, session_id) {
  let body = null;
  if (txt === "reject") {
    body = {
      msg: msg,
      id: id,
      status: 0,
      session_id: session_id,
    };
  } else {
    body = {
      msg: msg,
      id: id,
      status: 1,
      session_id: session_id,
    };
  }
  return fetch(`${url}/kyc/ed/update_kyc`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((e) => {
      return e;
    });
}

export function resendOTP($email) {
  return fetch(`${url}/register`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    // headers: {
    //   "content-type": "application/json",
    //   "cache-control": "no-cache",
    // },
    body: JSON.stringify({ isResend: $email }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function verifySession() {
  return fetch(`${url}/checkSession`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
    },
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function userLogout() {
  return fetch(`${url}/logout`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
    },
  })
    .then((res) => res.json())
    .catch((e) => e);
}

export function sendPastEventData(data, block) {
  return fetch(`${url}/ajax_events`, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify({
      events: data,
      current_block: block,
      action: "set_Event",
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function getCurrentBlockFromServer() {
  return fetch(`${url}/ajax_events`, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify({
      action: "get_block",
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function getAffilateTableData(userAddress) {
  return fetch(`${url}/my_referral`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      user_address: userAddress,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}
export function getBtfgraph(){
  return fetch(`${url}/btf_graph`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((d) => d.json())
    .catch((e) => e);
}
export function getWebsiteData() {
  return fetch(`${url}/config`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      action: "website_data",
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}
export function getPairedCoin(action,sub_action,token_id,data) {
  return fetch(`${url}/token/coin.php`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({ 
      action: action,
      sub_action: sub_action ,
      token_id: token_id ,
      data: data 
    }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}
export function getNotification(action,sub_action,user_id,data) {
  return fetch(`${url}/notification.php`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({ 
      action: action,
      sub_action: sub_action ,
      user_id: user_id ,
      data: data 
    }),
  })
    .then((res) => res.json())
    .catch((e) => e);
}