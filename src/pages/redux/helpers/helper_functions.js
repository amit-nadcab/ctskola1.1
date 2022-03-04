export function checkEmail(email) {
  const emailToValidate = email ? email : "";
  const emailRegexp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const res = emailRegexp.test(emailToValidate);
  return res;
}

export function checkName(name) {
  const nameToValidate = name ? name : "";
  const nameRegexp = /^[A-Za-z]+(?:[ _-][A-Za-z]+)*$/;
  const res = nameRegexp.test(nameToValidate);
  return res;
}

export function checkDob(dob) {
  const dobToValidate = dob ? dob : "";
  const dobRegexp =
    /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
  const res = dobRegexp.test(dobToValidate);
  return res;
}

export function checkPassword(password) {
  const passwordToValidate = password ? password : "";
  const passwordRegexp =
    /(?=^.{8,15}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[0-9])(?=.*[@_*&.])(?=.*[a-z]).*$/;
  const res = passwordRegexp.test(passwordToValidate);
  return res;
}

export function checkOtp(otp) {
  const otpToValidate = otp ? otp : "";
  const otpRegexp = /^[0-9]*$/;
  const res = otpRegexp.test(otpToValidate);
  return res;
}

export function sortByPair(data, asc = true, setData) {
  let result;
  if (asc)
    result = data.sort((a, b) => {
      let x = a.symbol.toLowerCase();
      let y = b.symbol.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
  else
    result = data.sort((a, b) => {
      let x = a.symbol.toLowerCase();
      let y = b.symbol.toLowerCase();
      if (x < y) {
        return 1;
      }
      if (x > y) {
        return -1;
      }
      return 0;
    });
  setData(result);
}
export function sortByVol(data, asc = true, setData) {
  let result;
  if (asc)
    result = data.sort((a, b) => {
      let x = a.volume_24h;
      let y = b.volume_24h;
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
  else
    result = data.sort((a, b) => {
      let x = a.volume_24h;
      let y = b.volume_24h;
      if (x < y) {
        return 1;
      }
      if (x > y) {
        return -1;
      }
      return 0;
    });
  setData(result);
}
export function sortByChange(data, asc = true, setData) {
  let result;
  if (asc)
    result = data.sort((a, b) => {
      let x = a.price_change_percentage_24h;
      let y = b.price_change_percentage_24h;
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
  else
    result = data.sort((a, b) => {
      let x = a.price_change_percentage_24h;
      let y = b.price_change_percentage_24h;
      if (x < y) {
        return 1;
      }
      if (x > y) {
        return -1;
      }
      return 0;
    });
  setData(result);
}
