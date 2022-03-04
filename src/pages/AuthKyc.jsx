import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import $ from "jquery";
import { isNum } from "./redux/helpers/form-validator.functions";
import { NotificationManager } from "react-notifications";
import {
  N_checkKYCStatus,
  N_ischeckKycSubmited,
  N_setKyc,
  N_test,
} from "./redux/helpers/api_functions_new";

export default function AuthKyc(props) {
  const { isLoggedIn, user } = useSelector((state) => state.AuthReducer);
  const [visibl, setVisiblity] = useState("h");
  // const [visib, setVisiblty] = useState("h");
  const [doc_title, setTitle] = useState();
  // const [v, setv] = useState();
  const [filedata, setFileData] = useState();
  const [camera_type, setcameratype] = useState("user");

  // const constraints = {
  //   audio: false,
  //   video: {
  //     width: { min: 239, max: 239 },
  //     height: { min: 239, max: 239 },
  //     ideal: 1280,
  //     facingMode: camera_type,
  //   },
  // };
  if (!isLoggedIn) props.history.replace("/login");
  else if (user.kyc === -1) props.history.replace("/exchange/btc-inr");

  useEffect(async () => {
    N_checkKYCStatus(user?.params ? user.params.user_id : user.user_id)
      .then((d) => {
        if (d.status === 200) {
          if (d.params.kyc_status === 1) {
            NotificationManager.success(d.message);
            props.history.replace("/login");
          } else if (d.params.kyc_status === -1) {
            NotificationManager.success(d.message);
            props.history.replace("/exchange/btc-inr");
          }
        } else {
          NotificationManager.error(d.message);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  // function showCambtn(event) {
  //   const sel_btn = event.target.parentElement;
  //   sel_btn.className = "signupform-control h";
  //   setVisiblty("vis");
  // }

  // const play = async () => {
  //   if (
  //     "mediaDevices" in navigator &&
  //     "getUserMedia" in navigator.mediaDevices
  //   ) {
  //     // ok, browser supports it
  //     const video = document.querySelector("#video");
  //     const videoStream = await navigator.mediaDevices.getUserMedia(
  //       constraints
  //     );
  //     video.srcObject = videoStream;
  //     setv(video);
  //   }
  // };

  // const takepicture = async () => {
  //   const canvas = document.querySelector("#canvas");
  //   let mime_type = "image/jpeg";
  //   let quality = 30;
  //   canvas.width = v.videoWidth;
  //   canvas.height = v.videoHeight;
  //   canvas.getContext("2d").drawImage(v, 0, 0);
  //   document.getElementById("uploaded_img").src = canvas.toDataURL("image/png");
  //   var file = dataURLtoFile(canvas.toDataURL("image/png"), "selfie.png");
  //   setFileData(file);
  //   document.getElementById("cam").className = "h";
  //   document.getElementById("pic_img").className = "vis";
  //   $("#uploaded_img_btn").show();
  // };

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  // function resumeCam() {
  //   document.getElementById("pic_img").className = "h";
  //   document.getElementById("cam").className = "vis";
  //   play();
  // }
  const comp_btn = (event) => {
    const kyc_btn = event.target.parentElement;
    kyc_btn.className = "signupform-control h";
    setVisiblity("vis");
  };

  function getCard(event) {
    if (document.getElementById("doc_titile").className === "h") {
      document.getElementById("next_doc_btn").style.display = "block";
    }
    console.log("id: ",event.target.id);
    if (event.target.id === "adhar_card") {
      document.getElementById("adhar").className = "vis";
      document.getElementById("dl").className = "h";
      document.getElementById("passport").className = "h";
      setTitle("Adhar");
    }
    if (event.target.id === "dl_card") {
      document.getElementById("dl").className = "vis";
      document.getElementById("adhar").className = "h";
      document.getElementById("passport").className = "h";
      setTitle("Driver’s License");
    }
    if (event.target.id === "passport_card") {
      document.getElementById("adhar").className = "h";
      document.getElementById("dl").className = "h";
      document.getElementById("passport").className = "vis";
      setTitle("Passport");
    }
  }

  function readURL(input) {
    const current_img = input.target.parentElement;
    const img = "#" + current_img.querySelector("img").id;
    const btn = "#" + current_img.querySelector("Button").id;
    const file = input.target.files[0];
    var reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      setFileData(file);
      reader.onload = function (e) {
        $(img).attr("src", e.target.result);
        $(btn).removeClass("h").addClass("vis");
      };
    }
  }
  function nextCard(event) {
    if (event.target.id === "next_doc_btn") {
      document.getElementById("next_doc_btn").style.display = "none";
      $("#doc_titile").removeClass("h").addClass("vis");
      document.getElementById("next_selfie_btn").style.display = "block";
    }
    if (event.target.id === "next_selfie_btn") {
      document.getElementById("next_selfie_btn").style.display = "none";
      $("#pan_detail").removeClass("h").addClass("vis");
    }
  }

  return (
    <>
      <Header {...props} />
      <div className="signupContainer mdfthemetxt">
        <div className="security_header">
          <div className="security_head">
            <div className="sec_circle bg_check_circle">
              <i className="fas fa-check-circle"></i>
              <span color="#ffffff" className="email_span">
                personal info
              </span>
            </div>
            <div className="sec_circle bg_circle">
              <i className="fas fa-dot-circle"></i>
              <span color="#ffffff" className="email_span">
                uploads
              </span>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-12 col-sm-12">
              <form
                className="signupform"
                method="post"
                id="welcome_form"
                encType="multipart/form-data"
              >
                <div className="signupform-control">
                  <h3>Complete your KYC</h3>
                  <span>
                    You will be redirected to a trusted third-party service for
                    instant KYC verification where you have to:
                  </span>
                  <ul>
                    <li>1. Upload Aadhar / Passport / Driver’s License</li>
                    <li>2. Click and Upload Selfie</li>
                    <li>3. Upload Pan Card</li>
                  </ul>
                  <div>
                    <b>Note:</b> We have also sent you a website URL via mobile
                    SMS. If you want to continue KYC verification process via
                    mobile, please click on the link in the SMS.
                  </div>
                  <button
                    type="button"
                    style={{ margin: "10px 10px" }}
                    id="proceed_btn"
                    onClick={(e) => {
                      comp_btn(e);
                    }}
                    className="sendbtn"
                  >
                    Continue
                  </button>                  
                  <button
                    type="button"
                    id="back_per_btn"
                    name="back_per_btn"
                    className="backbtn"
                  >
                    Re-submit Kyc Form
                  </button>
                </div>
                <div id="Doc_page" className={visibl}>
                  <div className="signupform-control mt-2">
                    <div>select one Aadhar / Passport / Driver’s License *</div>
                    <div className="custom-control custom-radio pt-2">
                      <input
                        name="card"
                        id="adhar_card"
                        onClick={(e) => {
                          getCard(e);
                        }}
                        type="radio"
                        className="custom-control-input"
                      />
                      <label htmlFor="adhar_card" className="pr-2">
                        Adhar card
                      </label>
                      <input
                        name="card"
                        id="dl_card"
                        onClick={(e) => {
                          getCard(e);
                        }}
                        type="radio"
                        className="custom-control-input"
                      />
                      <label htmlFor="dl_card" className="pr-2">
                        Driver’s License
                      </label>
                      <input
                        name="card"
                        id="passport_card"
                        onClick={(e) => {
                          getCard(e);
                        }}
                        type="radio"
                        className="custom-control-input"
                      />
                      <label htmlFor="passport_card">Passport</label>
                    </div>
                  </div>
                  <div className="h" id="adhar">
                    <div className="signupform-control">
                      <label htmlFor="user_adhar">ADHAR CARD NUMBER *</label>
                      <input
                        type="text"
                        name="user_adhar"
                        required="required"
                        maxLength={12}
                        minLength={12}
                        className="signupform-control"
                        id="user_adhar"
                        onChange={(e) => {
                          isNum(e.target.value) && e.target.value.length == 12
                            ? (document.getElementById(
                                "user_adhar_btn"
                              ).style.display = "block")
                            : (document.getElementById(
                                "user_adhar_btn"
                              ).style.display = "none");
                        }}
                        placeholder="XXXXXXXXXXXX"
                      />
                      <button
                        type="button"
                        id="user_adhar_btn"
                        onClick={(e) => {
                          isNum(document.getElementById("user_adhar").value)
                            ? N_setKyc(e, user?.params ? user.params.user_id : user.user_id)
                            : NotificationManager.error("Not a valid adhaar");
                        }}
                        className="uploadbtn mt-0 h"
                      >
                        Send
                      </button>
                      <div
                        className="spinner-border text-primary"
                        style={{ display: "none" }}
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                    <div>Upload front image Aadhar *</div>
                    <div className="signupform-control mt-2">
                      <img
                        src="/img/adhar_front.png"
                        height="150px"
                        width="200px"
                        id="front_adhar"
                        alt="adhar pic"
                      />
                      <input
                        id="upload_front_adhar"
                        type="file"
                        onChange={(e) => {
                          readURL(e);
                        }}
                        className="signupform-control border-0 kyc_image"
                      />
                      <button
                        type="button"
                        id="adhar_front_btn"
                        onClick={(e) => {
                          N_test(e, filedata, "docf", user?.params ? user.params.user_id : user.user_id);
                        }}
                        className="uploadbtn h"
                      >
                        Send
                      </button>
                      <div
                        className="spinner-border text-primary"
                        style={{ display: "none" }}
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                    <div>Upload back image Aadhar *</div>
                    <div className="signupform-control mt-2">
                      <img
                        src="/img/adhar_back.png"
                        height="150px"
                        width="200px"
                        id="back_adhar"
                        alt="adhar pic"
                      />
                      <input
                        id="upload_back_adhar"
                        type="file"
                        onChange={(e) => {
                          readURL(e);
                        }}
                        className="signupform-control border-0 kyc_image"
                      />
                      <button
                        type="button"
                        id="adhar_back_btn"
                        onClick={(e) => {
                          N_test(e, filedata, "docb", user?.params ? user.params.user_id : user.user_id);
                        }}
                        className="uploadbtn h"
                      >
                        Send
                      </button>
                      <div
                        className="spinner-border text-primary"
                        style={{ display: "none" }}
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  </div>
                  <div className="h" id="dl">
                    <div className="signupform-control">
                      <label htmlFor="user_dl">
                        DRIVER’S LICENSE CARD NUMBER *
                      </label>
                      <input
                        type="text"
                        name="user_dl"
                        required="required"
                        className="signupform-control"
                        id="user_dl"
                        placeholder="XXXXXXXXXXXX"
                      />
                      <button
                        type="button"
                        id="user_dl_btn"
                        onClick={(e) => {
                          N_setKyc(e, user?.params ? user.params.user_id : user.user_id);
                        }}
                        className="uploadbtn mt-0"
                      >
                        Send
                      </button>
                      <div
                        className="spinner-border text-primary"
                        style={{ display: "none" }}
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                    <div>Upload front image Driver’s License *</div>
                    <div className="signupform-control mt-2">
                      <img
                        src="/img/selfie.png"
                        height="150px"
                        width="200px"
                        id="front_dl"
                        alt="License pic"
                      />
                      <input
                        id="upload_front_dl"
                        type="file"
                        onChange={(e) => {
                          readURL(e);
                        }}
                        className="signupform-control border-0 kyc_image"
                      />
                      <button
                        type="button"
                        id="dl_front_btn"
                        onClick={(e) => {
                          N_test(e, filedata, "docf", user?.params ? user.params.user_id : user.user_id);
                        }}
                        className="uploadbtn h"
                      >
                        Send
                      </button>
                      <div
                        className="spinner-border text-primary"
                        style={{ display: "none" }}
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                    <div>Upload back image Driver’s License *</div>
                    <div className="signupform-control mt-2">
                      <img
                        src="/img/selfie.png"
                        height="150px"
                        width="200px"
                        id="back_dl"
                        alt="License pic"
                      />
                      <input
                        id="upload_back_dl"
                        type="file"
                        onChange={(e) => {
                          readURL(e);
                        }}
                        className="signupform-control border-0 kyc_image"
                      />
                      <button
                        type="button"
                        id="dl_back_btn"
                        onClick={(e) => {
                          N_test(e, filedata, "docb", user?.params ? user.params.user_id : user.user_id);
                        }}
                        className="uploadbtn h"
                      >
                        Send
                      </button>
                      <div
                        className="spinner-border text-primary"
                        style={{ display: "none" }}
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  </div>
                  <div className="h" id="passport">
                    <div className="signupform-control">
                      <label htmlFor="user_passport">
                        PASSPORT CARD NUMBER *
                      </label>
                      <input
                        type="text"
                        name="user_passport"
                        required="required"
                        className="signupform-control"
                        id="user_passport"
                        placeholder="XXXXXXXXXXXX"
                      />
                      <button
                        type="button"
                        id="user_passport_btn"
                        onClick={(e) => {
                          N_setKyc(e, user?.params ? user.params.user_id : user.user_id);
                        }}
                        className="uploadbtn mt-0"
                      >
                        Send
                      </button>
                      <div
                        className="spinner-border text-primary"
                        style={{ display: "none" }}
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                    <div>Upload front image Passport *</div>
                    <div className="signupform-control mt-2">
                      <img
                        src="/img/selfie.png"
                        height="150px"
                        width="200px"
                        id="front_passport"
                        alt="Passport pic"
                      />
                      <input
                        id="upload_front_passport"
                        type="file"
                        onChange={(e) => {
                          readURL(e);
                        }}
                        className="signupform-control border-0 kyc_image"
                      />
                      <button
                        type="button"
                        id="passport_front_btn"
                        onClick={(e) => {
                          N_test(e, filedata, "docf", user?.params ? user.params.user_id : user.user_id);
                        }}
                        className="uploadbtn h"
                      >
                        Send
                      </button>
                      <div
                        className="spinner-border text-primary"
                        style={{ display: "none" }}
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                    <div>Upload back image Passport *</div>
                    <div className="signupform-control mt-2">
                      <img
                        src="/img/selfie.png"
                        height="150px"
                        width="200px"
                        id="back_passport"
                        alt="Passport pic"
                      />
                      <input
                        id="upload_back_passport"
                        type="file"
                        onChange={(e) => {
                          readURL(e);
                        }}
                        className="signupform-control border-0 kyc_image"
                      />
                      <button
                        type="button"
                        id="passport_back_btn"
                        onClick={(e) => {
                          N_test(e, filedata, "docb", user?.params ? user.params.user_id : user.user_id);
                        }}
                        className="uploadbtn h"
                      >
                        Send
                      </button>
                      <div
                        className="spinner-border text-primary"
                        style={{ display: "none" }}
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    id="next_doc_btn"
                    onClick={(e) => {
                      nextCard(e);
                    }}
                    className="reg_btn"
                    style={{ display: "none" }}
                  >
                    Next &raquo;
                  </button>
                  <div className="h" id="doc_titile">
                    <div>Upload a photo with holding {doc_title} *</div>
                    <div className="signupform-control mt-2">
                      <img
                        src="/img/selfie.png"
                        height="150px"
                        width="200px"
                        id="uploaded_img"
                        alt="uploaded img pic"
                      />
                      <input
                        id="uploaded_img"
                        type="file"
                        onChange={(e) => {
                          readURL(e);
                        }}
                        className="signupform-control border-0 kyc_image"
                      />
                      <button
                        type="button"
                        id="uploaded_img_btn"
                        onClick={(e) => {
                          N_test(e, filedata, "docs", user?.params ? user.params.user_id : user.user_id);
                        }}
                        className="uploadbtn h"
                      >
                        Send
                      </button>
                      <div
                        className="spinner-border text-primary"
                        style={{ display: "none" }}
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  </div>
                  {/* <div id="doc_titile" className="h">
                    <div>Upload a photo with holding {doc_title} *</div>
                    <div className="signupform-control mt-2">
                      <img
                        src="/img/selfie.png"
                        height="150px"
                        width="200px"
                        alt="selfie pic"
                      />
                      <button
                        type="button"
                        id="cam_btn"
                        name="cam_btn"
                        onClick={(e) => {
                          showCambtn(e);
                          play();
                        }}
                        className="backbtn ml-2"
                      >
                        Click and Upload Selfie
                      </button>
                    </div>
                    <div className={visib} id="cam">
                      <div className="display-cover">
                        <video autoPlay id="video"></video>
                        <canvas
                          className="d-none position-absolute"
                          id="canvas"
                        ></canvas>

                        <div id="img-cont"></div>

                        <div className="control">
                          <button
                            className="btn mr-4"
                            onClick={() => {
                              camera_type === "user"
                                ? setcameratype("environment")
                                : setcameratype("user");
                              play();
                            }}
                          >
                            <MdCameraswitch
                              size={30}
                              style={{ color: "black" }}
                            />
                          </button>
                          <button
                            className="btn text-dark"
                            style={{ background: "rgba(0,0,0,0.2)" }}
                            onClick={() => takepicture()}
                          >
                            Capture
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 h" id="pic_img">
                      <img
                        id="uploaded_img"
                        height="220px"
                        width="300px"
                        alt="uploaded pic"
                        style={{ margin: "0 auto 10px" }}
                      />
                      <br />
                      <button
                        type="button"
                        className="cancelbtn"
                        onClick={(e) => {
                          resumeCam();
                        }}
                        style={{ margin: "0 30px" }}
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        id="uploaded_img_btn"
                        onClick={(e) => {
                          N_test(e, filedata, "docs", user?.params ? user.params.user_id : user.user_id);
                        }}
                        className="uploadbtn"
                      >
                        Send
                      </button>
                      <div
                        className="spinner-border text-primary"
                        style={{ display: "none" }}
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  </div> */}
                  <button
                    type="button"
                    id="next_selfie_btn"
                    onClick={(e) => {
                      nextCard(e);
                    }}
                    className="reg_btn"
                    style={{ display: "none" }}
                  >
                    Next &raquo;
                  </button>
                  <div className="h" id="pan_detail">
                    <div className="signupform-control">
                      <label htmlFor="user_pancard">PAN CARD NUMBER *</label>
                      <input
                        type="text"
                        name="user_pancard"
                        required="required"
                        className="signupform-control"
                        maxLength={10}
                        minLength={10}
                        onChange={(e) => {
                          e.target.value.length == 10
                            ? (document.getElementById(
                                "user_pancard_btn"
                              ).style.display = "block")
                            : (document.getElementById(
                                "user_pancard_btn"
                              ).style.display = "none");
                        }}
                        id="user_pancard"
                        placeholder="XXXXXXXXXXXX"
                      />
                      <button
                        type="button"
                        id="user_pancard_btn"
                        onClick={(e) => {
                          N_setKyc(e, user?.params ? user.params.user_id : user.user_id);
                        }}
                        className="uploadbtn mt-0 h"
                      >
                        Send
                      </button>
                      <div
                        className="spinner-border text-primary"
                        style={{ display: "none" }}
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                    <div>Upload front image Pan Card *</div>
                    <div className="signupform-control mt-2">
                      <img
                        src="/img/pan_front.png"
                        height="150px"
                        width="200px"
                        id="front_pan"
                        alt="pancard pic"
                      />
                      <input
                        id="upload_front_pan"
                        type="file"
                        onChange={(e) => {
                          readURL(e);
                        }}
                        className="signupform-control border-0 kyc_image"
                      />
                      <button
                        type="button"
                        id="front_pan_btn"
                        onClick={(e) => {
                          N_test(e, filedata, "panf", user?.params ? user.params.user_id : user.user_id);
                        }}
                        className="uploadbtn h"
                      >
                        Send
                      </button>
                      <div
                        className="spinner-border text-primary"
                        style={{ display: "none" }}
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      id="Done_btn"
                      onClick={() => {
                        N_ischeckKycSubmited(
                          user?.params ? user.params.user_id : user.user_id,
                          document.getElementById("user_pancard").value
                        ).then((d) => {
                          if (d.status === 200) {
                            NotificationManager.info(d.message);
                            document.location.reload();
                          } else {
                            console.log(d);
                            NotificationManager.error(d.message);
                          }
                        });
                      }}
                      className="reg_btn"
                    >
                      <i className="loading-icon fas fa-spinner fa-spin h"></i>
                      <span id="reg">Done</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
