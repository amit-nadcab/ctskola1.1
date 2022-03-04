import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import {  isName } from "./redux/helpers/form-validator.functions";
import { submitKyc } from "./redux/actions/authActions";

import FullLoader from "./components/FullLoader";
import { useDispatch, useSelector } from "react-redux";
import {
  N_checkKYCStatus,
  N_getCity,
  N_getCountry,
  N_getState,
} from "./redux/helpers/api_functions_new";

export default function Welcome(props) {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.AuthReducer);
  const [loading, setLoading] = useState();
  const [fullloading, setFullLoader] = useState(true);
  const [countryData, setCountry] = useState();
  const [stateData, setState] = useState();
  const [cityData, setCity] = useState();
  const [type_of_kyc, setTypeofKyc] = useState("Individual");
  const [fname, setFname] = useState();
  const [mname, setMname] = useState();
  const [lname, setLname] = useState();
  const [dob, setDob] = useState();
  const [address, setAddress] = useState();
  const [pincode, setPincode] = useState();
  const [visibl, setVisiblity] = useState("h");
  if (!isLoggedIn) props.history.replace("/login");
  else if (user.kyc === 1) props.history.replace("/exchage/btc-inr");
  const backKyc = () => {
    props.history.push("/exchange/btc-inr");
  };

  const comp_btn = (event) => {
    const kyc_btn = event.target.parentElement;
    kyc_btn.className = "signupform-control h";
    setVisiblity("vis");
  };
  function changeCountry(event) {
    N_getState(
      event.target.value,
      user?.params ? user.params.user_id : user.user_id
    )
      .then((res) => {
        if (res.status === 200) {
          // console.log("resofcountry: ",res);
          // setCity();
          setState(res.params.country_data);
          changeState("country");
        }
      })
      .catch((e) => {
        console.log("con erer:", e);
      });
  }

  function changeState(event) {
    if (event == "country") {
      N_getCity(
        document.getElementById("country").value,
        document.getElementById("state").value,
        user?.params ? user.params.user_id : user.user_id
      )
        .then((res) => {
          if (res.status === 200) {
            // console.log("resofcountry: ",res);
            setCity(res.params.country_data);
          }
        })
        .catch((e) => {
          console.log("con erer:", e);
        });
    } else {
      N_getCity(
        document.getElementById("country").value,
        event.target.value,
        user?.params ? user.params.user_id : user.user_id
      )
        .then((res) => {
          if (res.status === 200) {
            // console.log("resofcountry: ",res);
            setCity(res.params.country_data);
          }
        })
        .catch((e) => {
          console.log("con erer:", e);
        });
    }
  }

  useEffect(() => {
    N_checkKYCStatus(user?.params ? user.params.user_id : user.user_id).then(
      (d) => {
        if (d.status === 200) {
          if (d.params.kyc_status === 1)
            // console.log("kst; ", d);
            props.history.replace("/exchange/btc-inr");
        }
        setFullLoader(false);
      }
    );
    N_getCountry(user?.params ? user.params.user_id : user.user_id)
      .then((res) => {
        if (res.status === 200) {
          // console.log("resofcountry: ",res);
          setCountry(res.params.country_data);
        }
      })
      .catch((e) => {
        console.log("con erer:", e);
      });

    N_getState("India", user?.params ? user.params.user_id : user.user_id)
      .then((res) => {
        if (res.status === 200) {
          // console.log("resofstate: ",res);
          setState(res.params.country_data);
        }
      })
      .catch((e) => {
        console.log("erer:", e);
      });
    N_getCity(
      "India",
      "Andaman and Nicobar Islands",
      user?.params ? user.params.user_id : user.user_id
    )
      .then((res) => {
        if (res.status === 200) {
          // console.log("resofcity: ",res);
          setCity(res.params.country_data);
        }
      })
      .catch((e) => {
        console.log("erer:", e);
      });
  }, []);

  const submit = (e) => {
    e.preventDefault();
    const body = {
      type_of_kyc: type_of_kyc,
      fname: fname ? fname : "",
      mname: mname ? mname : "",
      lname: lname ? lname : "",
      dob: dob ? dob : "",
      address: address,
      country: document.getElementById("country").value,
      state: document.getElementById("state").value,
      city: document.getElementById("city").value,
      pincode: pincode ? pincode : "",
      user_id: user?.params ? user.params.user_id : user.user_id,
    };
    console.log(body);
    setLoading(true);
    dispatch(
      submitKyc(
        body,
        () => {
          setLoading(false);
          props.history.replace("/kyc");
        },
        () => setLoading(false)
      )
    );
  };
  if (fullloading)
    return (
      <>
        <Header {...props} />
        <FullLoader />
      </>
    );
  else
    return (
      <>
        <Header {...props} />
        <div className="signupContainer mdfthemetxt">
          <div className="security_header shead-bg">
            <div className="security_head">
              <div className="sec_circle bg_check_circle shead-circle">
                <i className="fas fa-check-circle"></i>
                <span color="#ffffff" className="email_span">
                  Email
                </span>
              </div>
              <div className="sec_circle bg_check_circle shead-circle">
                <i className="fas fa-check-circle"></i>
                <span color="#ffffff" className="email_span">
                  Security
                </span>
              </div>
              <div className="sec_circle bg_circle shead-circle">
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
                  className="signupform"
                  onSubmit={submit}
                  method="post"
                  id="welcome_form"
                >
                  <div className="signupform-control">
                    <small id="msg" style={{ fontSize: "15px" }}>
                      Error message
                    </small>
                  </div>
                  <div>
                    <h3>KYC</h3>
                  </div>
                  <div className="signupform-control">
                    <label htmlFor="type_of_kyc">TYPE OF KYC</label>
                    <select
                      id="type_of_kyc"
                      className="form-control"
                      data-role="select-dropdown"
                      onChange={(e) => {
                        setTypeofKyc(e.target.value);
                      }}
                    >
                      <option value="Individual">Individual</option>
                      <option value="Corporate">Corporate</option>
                    </select>
                  </div>
                  <div className="signupform-control" id="kyc_btn">
                    <div className="feature_checklist">
                      <div className="feature_checklist_section partial">
                        <div className="feature_checklist_section_title">
                          WITHOUT KYC
                        </div>
                        <ul className="feature_checklist_section_list">
                          <li className="feature_checklist_section_item">
                            <svg
                              viewBox="0 0 48 48"
                              width="12"
                              height="12"
                              fill="#FFC800"
                            >
                              <path
                                d="m24 48c-13.254834 0-24-10.745166-24-24s10.745166-24 24-24 24 10.745166 24 24-10.745166 24-24 24zm12.5693021-33.5729524c-.5066705-.502545-1.3281286-.502545-1.8349005 0l-15.5444523 15.4164894-5.9750331-5.9257883c-.5066706-.502545-1.3281287-.5024947-1.8349006 0-.5067213.5024947-.5067213 1.3171825 0 1.8197275l6.8924834 6.8355767c.5065185.5024947 1.3285848.5021429 1.8349006 0l16.4619025-16.3262275c.5067213-.5024947.5066706-1.3172328 0-1.8197778z"
                                fill="#55bd6c"
                              ></path>
                            </svg>
                            <span className="feature_checklist_section_item_text">
                              Deposit
                            </span>
                          </li>
                          <li className="feature_checklist_section_item">
                            <svg
                              viewBox="0 0 48 48"
                              width="12"
                              height="12"
                              fill="#FFC800"
                            >
                              <path
                                d="m24 48c-13.254834 0-24-10.745166-24-24s10.745166-24 24-24 24 10.745166 24 24-10.745166 24-24 24zm12.5693021-33.5729524c-.5066705-.502545-1.3281286-.502545-1.8349005 0l-15.5444523 15.4164894-5.9750331-5.9257883c-.5066706-.502545-1.3281287-.5024947-1.8349006 0-.5067213.5024947-.5067213 1.3171825 0 1.8197275l6.8924834 6.8355767c.5065185.5024947 1.3285848.5021429 1.8349006 0l16.4619025-16.3262275c.5067213-.5024947.5066706-1.3172328 0-1.8197778z"
                                fill="#55bd6c"
                              ></path>
                            </svg>
                            <span className="feature_checklist_section_item_text">
                              Trade
                            </span>
                          </li>
                          <li className="feature_checklist_section_item">
                            <svg
                              viewBox="0 0 48 48"
                              width="12"
                              height="12"
                              fill="rgba(28, 27, 33, 0.24)"
                            >
                              <path d="m24 48c-13.254834 0-24-10.745166-24-24s10.745166-24 24-24 24 10.745166 24 24-10.745166 24-24 24zm2.5259167-23.5067083 9.039-9.039c.5615833-.5611042.5615833-1.4715209 0-2.032625-.5615834-.5615834-1.4710417-.5615834-2.032625 0l-9.039 9.039-9.0394792-9.039c-.5615833-.5615834-1.4710417-.5615834-2.032625 0-.5615833.5611041-.5615833 1.4715208 0 2.032625l9.0394792 9.039-9.0394792 9.039c-.5615833.5611041-.5615833 1.4715208 0 2.032625.2807917.2803125.6487917.4207083 1.0163125.4207083s.7355208-.1403958 1.0163125-.4211875l9.0394792-9.039 9.039 9.039c.2807916.2807917.6487916.4211875 1.0163125.4211875.3675208 0 .7355208-.1403958 1.0163125-.4211875.5615833-.5611042.5615833-1.4715208 0-2.032625z"></path>
                            </svg>
                            <span className="feature_checklist_section_item_text disabled">
                              Withdrawal
                            </span>
                          </li>
                          <li className="feature_checklist_section_item">
                            <svg
                              viewBox="0 0 48 48"
                              width="12"
                              height="12"
                              fill="rgba(28, 27, 33, 0.24)"
                            >
                              <path d="m24 48c-13.254834 0-24-10.745166-24-24s10.745166-24 24-24 24 10.745166 24 24-10.745166 24-24 24zm2.5259167-23.5067083 9.039-9.039c.5615833-.5611042.5615833-1.4715209 0-2.032625-.5615834-.5615834-1.4710417-.5615834-2.032625 0l-9.039 9.039-9.0394792-9.039c-.5615833-.5615834-1.4710417-.5615834-2.032625 0-.5615833.5611041-.5615833 1.4715208 0 2.032625l9.0394792 9.039-9.0394792 9.039c-.5615833.5611041-.5615833 1.4715208 0 2.032625.2807917.2803125.6487917.4207083 1.0163125.4207083s.7355208-.1403958 1.0163125-.4211875l9.0394792-9.039 9.039 9.039c.2807916.2807917.6487916.4211875 1.0163125.4211875.3675208 0 .7355208-.1403958 1.0163125-.4211875.5615833-.5611042.5615833-1.4715208 0-2.032625z"></path>
                            </svg>
                            <span className="feature_checklist_section_item_text disabled">
                              P2P
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="feature_checklist_section">
                        <div className="feature_checklist_section_title">
                          WITH KYC
                        </div>
                        <ul className="feature_checklist_section_list">
                          <li className="feature_checklist_section_item">
                            <svg
                              viewBox="0 0 48 48"
                              width="12"
                              height="12"
                              fill="#FFC800"
                            >
                              <path
                                d="m24 48c-13.254834 0-24-10.745166-24-24s10.745166-24 24-24 24 10.745166 24 24-10.745166 24-24 24zm12.5693021-33.5729524c-.5066705-.502545-1.3281286-.502545-1.8349005 0l-15.5444523 15.4164894-5.9750331-5.9257883c-.5066706-.502545-1.3281287-.5024947-1.8349006 0-.5067213.5024947-.5067213 1.3171825 0 1.8197275l6.8924834 6.8355767c.5065185.5024947 1.3285848.5021429 1.8349006 0l16.4619025-16.3262275c.5067213-.5024947.5066706-1.3172328 0-1.8197778z"
                                fill="#55bd6c"
                              ></path>
                            </svg>
                            <span className="feature_checklist_section_item_text">
                              Deposit
                            </span>
                          </li>
                          <li className="feature_checklist_section_item">
                            <svg
                              viewBox="0 0 48 48"
                              width="12"
                              height="12"
                              fill="#FFC800"
                            >
                              <path
                                d="m24 48c-13.254834 0-24-10.745166-24-24s10.745166-24 24-24 24 10.745166 24 24-10.745166 24-24 24zm12.5693021-33.5729524c-.5066705-.502545-1.3281286-.502545-1.8349005 0l-15.5444523 15.4164894-5.9750331-5.9257883c-.5066706-.502545-1.3281287-.5024947-1.8349006 0-.5067213.5024947-.5067213 1.3171825 0 1.8197275l6.8924834 6.8355767c.5065185.5024947 1.3285848.5021429 1.8349006 0l16.4619025-16.3262275c.5067213-.5024947.5066706-1.3172328 0-1.8197778z"
                                fill="#55bd6c"
                              ></path>
                            </svg>
                            <span className="feature_checklist_section_item_text">
                              Trade
                            </span>
                          </li>
                          <li className="feature_checklist_section_item">
                            <svg
                              viewBox="0 0 48 48"
                              width="12"
                              height="12"
                              fill="#FFC800"
                            >
                              <path
                                d="m24 48c-13.254834 0-24-10.745166-24-24s10.745166-24 24-24 24 10.745166 24 24-10.745166 24-24 24zm12.5693021-33.5729524c-.5066705-.502545-1.3281286-.502545-1.8349005 0l-15.5444523 15.4164894-5.9750331-5.9257883c-.5066706-.502545-1.3281287-.5024947-1.8349006 0-.5067213.5024947-.5067213 1.3171825 0 1.8197275l6.8924834 6.8355767c.5065185.5024947 1.3285848.5021429 1.8349006 0l16.4619025-16.3262275c.5067213-.5024947.5066706-1.3172328 0-1.8197778z"
                                fill="#55bd6c"
                              ></path>
                            </svg>
                            <span className="feature_checklist_section_item_text">
                              Withdrawal
                            </span>
                          </li>
                          <li className="feature_checklist_section_item">
                            <svg
                              viewBox="0 0 48 48"
                              width="12"
                              height="12"
                              fill="#FFC800"
                            >
                              <path
                                d="m24 48c-13.254834 0-24-10.745166-24-24s10.745166-24 24-24 24 10.745166 24 24-10.745166 24-24 24zm12.5693021-33.5729524c-.5066705-.502545-1.3281286-.502545-1.8349005 0l-15.5444523 15.4164894-5.9750331-5.9257883c-.5066706-.502545-1.3281287-.5024947-1.8349006 0-.5067213.5024947-.5067213 1.3171825 0 1.8197275l6.8924834 6.8355767c.5065185.5024947 1.3285848.5021429 1.8349006 0l16.4619025-16.3262275c.5067213-.5024947.5066706-1.3172328 0-1.8197778z"
                                fill="#55bd6c"
                              ></path>
                            </svg>
                            <span className="feature_checklist_section_item_text">
                              P2P
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="backbtn"
                      onClick={() => {
                        backKyc();
                      }}
                    >
                      SKIP FOR NOW
                    </button>
                    <button
                      type="button"
                      id="proceed_btn"
                      className="sendbtn"
                      onClick={(e) => {
                        comp_btn(e);
                      }}
                    >
                      COMPLETE KYC
                    </button>
                  </div>
                  <div id="personal_info" className={visibl}>
                    <div>
                      <h3>PERSONAL INFO</h3>
                    </div>
                    <div className="signupform-control">
                      <label htmlFor="user_fname">FIRST NAME *</label>
                      <input
                        type="text"
                        name="user_fname"
                        required="required"
                        onChange={(e) => {
                          isName(e);
                          setFname(e.target.value);
                        }}
                        className="signupform-control"
                        id="user_fname"
                      />
                      <i className="fas fa-check-circle"></i>
                      <i className="fas fa-exclamation-circle"></i>
                      <small>Error message</small>
                    </div>
                    <div className="signupform-control">
                      <label htmlFor="user_mname">MIDDLE NAME</label>
                      <input
                        type="text"
                        name="user_mname"
                        onChange={(e) => {
                          isName(e);
                          setMname(e.target.value);
                        }}
                        className="signupform-control"
                        id="user_mname"
                      />
                      <i className="fas fa-check-circle"></i>
                      <i className="fas fa-exclamation-circle"></i>
                      <small>Error message</small>
                    </div>
                    <div className="signupform-control">
                      <label htmlFor="user_lname">LAST NAME</label>
                      <input
                        type="text"
                        name="user_lname"
                        onChange={(e) => {
                          isName(e);
                          setLname(e.target.value);
                        }}
                        className="signupform-control"
                        id="user_lname"
                      />
                      <i className="fas fa-check-circle"></i>
                      <i className="fas fa-exclamation-circle"></i>
                      <small>Error message</small>
                    </div>
                    <div className="signupform-control">
                      <label htmlFor="user_dob">DATE OF BIRTH *</label>
                      <input
                        type="date"
                        name="user_dob"
                        id="user_dob"
                        required="required"
                        onChange={(e) => {
                          setDob(e.target.value);
                        }}
                        className="signupform-control"
                        placeholder="DD-MM-YYYY"
                      />
                      <i className="fas fa-check-circle"></i>
                      <i className="fas fa-exclamation-circle"></i>
                      <small>Error message</small>
                    </div>
                    <div className="signupform-control">
                      <label htmlFor="user_address">Address *</label>
                      <textarea
                        className="form-control"
                        style={{
                          border: "2px solid #f0f0f0",
                          borderRadius: "4px",
                        }}
                        id="user_address"
                        required="required"
                        rows="3"
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                      ></textarea>
                    </div>
                    <div className="signupform-control">
                      <label htmlFor="country">COUNTRY *</label>
                      <select
                        id="country"
                        className="form-control"
                        onChange={(e) => {
                          changeCountry(e);
                        }}
                        style={{
                          border: "2px solid #f0f0f0",
                          borderRadius: "4px",
                        }}
                        data-role="select-dropdown"
                      >
                        {countryData
                          ? countryData.map((country) => (
                              <option
                                value={country}
                                selected={country == "India" ? "selected" : ""}
                              >
                                {country}
                              </option>
                            ))
                          : ""}
                      </select>
                    </div>
                    <div className="signupform-control">
                      <label htmlFor="state">STATE *</label>
                      <select
                        id="state"
                        className="form-control"
                        onChange={(e) => {
                          changeState(e);
                        }}
                        style={{
                          border: "2px solid #f0f0f0",
                          borderRadius: "4px",
                        }}
                        data-role="select-dropdown"
                      >
                        {stateData
                          ? stateData.map((state) => (
                              <option value={state}>{state}</option>
                            ))
                          : ""}
                      </select>
                    </div>
                    <div className="signupform-control">
                      <label htmlFor="country">CITY *</label>
                      <select
                        id="city"
                        className="form-control"
                        style={{
                          border: "2px solid #f0f0f0",
                          borderRadius: "4px",
                        }}
                        data-role="select-dropdown"
                      >
                        {cityData
                          ? cityData?.map((city) => (
                              <option value={city}>{city}</option>
                            ))
                          : ""}
                      </select>
                    </div>
                    <div className="signupform-control">
                      <label htmlFor="user_pincode">PINCODE *</label>
                      <input
                        type="text"
                        name="user_pincode"
                        required="required"
                        className="signupform-control"
                        id="user_pincode"
                        onChange={(e) => {
                          setPincode(e.target.value);
                        }}
                      />
                      <i className="fas fa-check-circle"></i>
                      <i className="fas fa-exclamation-circle"></i>
                      <small>Error message</small>
                    </div>
                    <input type="hidden" name="session_id" id="session_id" />
                    <button type="submit" id="btn_submit" className="reg_btn">
                      {loading ? (
                        <i className="loading-icon fas fa-spinner fa-spin mr-2"></i>
                      ) : null}
                      <span id="reg">SUBMIT</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
