import {
  checkEmail,
  checkPassword,
  checkOtp,
  checkName,
} from "./helper_functions";
export function isEmail(email) {
  const obj = document.getElementById("user_email");
  if (email === "") {
    setErrorFor(obj, "Email cannot be blank");
    return false;
  } else if (!checkEmail(email)) {
    setErrorFor(obj, "Not a valid email");
    return false;
  } else {
    setSuccessFor(obj);
    return true;
  }
}

export function isPass(password) {
  const obj = document.getElementById("pass");
  const obj1 = document.getElementById("passerr");
  if (password === "") {
    setErrorFor1(obj, obj1, "Password cannot be blank");
    return false;
  } else if (!checkPassword(password)) {
    setErrorFor1(obj, obj1, "Not a valid password");
    return false;
  } else {
    setSuccessFor(obj);
    return true;
  }
}
export function isCpass(password2) {
  const obj = document.getElementById("cpass");
  const obj1 = document.getElementById("cpasserr");
  const pass = document.getElementById("pass").value;
  if (password2 === "") {
    setErrorFor1(obj, obj1, "Password cannot be blank");
    return false;
  } else if (pass !== password2) {
    setErrorFor1(obj, obj1, "Passwords does not match");
    return false;
  } else {
    setSuccessFor(obj);
    return true;
  }
}

export function isOtp(otp) {
  const obj = document.getElementById("user_otp");
  if (otp === "") {
    setErrorFor(obj, "OTP cannot be blank");
    return false;
  } else if (!checkOtp(otp)) {
    setErrorFor(obj, "Not a valid OTP");
    return false;
  } else if (otp?.length !== 6) {
    setErrorFor(obj, "Please enter 6 digit OTP");
    return false;
  } else {
    setSuccessFor(obj);
    return true;
  }
}

export function checkValue(obj, message) {
  setErrorFor(obj, message);
}

export function isName(event) {
  const obj = document.getElementById(event.target.id);
  if (event.target.value.length < 3) {
    setErrorFor(obj, "name must be in 3 character");
  } else if (!checkName(event.target.value)) {
    setErrorFor(obj, "Not a valid name");
  } else {
    setSuccessFor(obj);
  }
}
export function isNumber(event) {
  const obj = document.getElementById(event.target.id);
  if (!checkOtp(event.target.value)) {
    setErrorFor(obj, "Not a valid pincode");
  } else {
    setSuccessFor(obj);
  }
}

export function isNum(num) {
  if (num === "") {
    return false;
  } else if (!checkOtp(num)) {
    return false;
  } else {
    return true;
  }
}
export function isDob(event) {
  const obj = document.getElementById(event.target.id);
  // if (!checkDob(event.target.value)) {
  // setErrorFor(obj, 'Not a valid date of birth');
  // } else {
  setSuccessFor(obj);
  // }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "signupform-control error";
  small.innerText = message;
}

function setErrorFor1(input, eobj, message) {
  const formControl = input.parentElement;
  // const small = formControl.querySelector("small");
  formControl.className = "signupform-control error";
  eobj.innerText = message;
  eobj.style.visibility= "visible";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "signupform-control success";
}
