import React from "react";
import { BsFacebook, BsTelegram, BsInstagram } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Footer() {
  AOS.init({ duration: 1000 })
  return (
    <>
      <div className="container-fluid py-5" style={{ background: "#141A28" }}>
        <div className="container mx-auto">
          <div className="row my-5 mx-5 ">
            <div className="col-lg-3 col-md-6 col-sm-12 mb-1 text-center" data-aos="flip-left">
              <div className="footer-logo">
                <img src="../img/ctskola-0.png" alt="logo" style={{ width: "100%" }} />
              </div>
              <div className="d-flex justify-content-center">
                <ul className="d-flex">
                  <li style={{ margin: "0px 12px" }}>
                    <a
                      className="text-light text-decoration-none"
                      href="https://www.facebook.com/CtsKola-102693045651442/"
                      style={{ fontWeight: "400" }}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <BsFacebook className="social-link" style={{ height: "30px", width: "30px", color: "#1873EB" }} />
                    </a>
                  </li>
                  <li style={{ margin: "0px 12px" }}><a
                    style={{ fontWeight: "400" }}
                    className="text-light  text-decoration-none"
                    href="https://instagram.com/ctskola?utm_medium=copy_link/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <BsInstagram className="social-link" style={{ height: "30px", width: "30px", color: "#B41978" }} />
                  </a></li>
                  <li style={{ margin: "0px 12px" }}>
                    <a
                      style={{ fontWeight: "400" }}
                      className="text-light  text-decoration-none py-2"
                      href="https://t.me/+ubgDH4F2B-ZiMDVl/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <BsTelegram className="social-link" style={{ height: "30px", width: "30px", color: "#30A4DC" }} />
                    </a>
                  </li>
                  <li style={{ margin: "0px 12px" }}>
                    <a
                      style={{ fontWeight: "400" }}
                      className="text-light  text-decoration-none py-2"
                      href="https://twitter.com/CtsKola/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <AiFillTwitterCircle className="social-link"
                        style={{ height: "33px", width: "33px", color: "#1C96E8" }}
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 my-3 text-center">
              <h5 style={{ color: "#CDCFD4", fontWeight: "600" }}>About Us</h5>
              <p>
                <a style={{ fontWeight: "400", color: "#CDCFD4" }} href="/about">
                  About
                </a>
              </p>

              <p>
                <a style={{ fontWeight: "400", color: "#CDCFD4" }}>
                  Career
                </a>
              </p>

              <p>
                <a style={{ fontWeight: "400", color: "#CDCFD4" }}>
                  Business Contacts
                </a>
              </p>
              <p>
                <a style={{ fontWeight: "400", color: "#CDCFD4" }}>
                  Community
                </a>
              </p>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 my-2 text-center">
              <h5 style={{ color: "#CDCFD4", fontWeight: "600" }}>Service</h5>
              <p style={{ fontWeight: "400", color: "#CDCFD4" }}>
                INR Trade
              </p>
              <p>
                <a
                  href="#"

                  style={{ fontWeight: "400", color: "#CDCFD4" }}
                >
                  Request TOKEN
                </a>
              </p>
              <p style={{ fontWeight: "400", color: "#CDCFD4" }}>
                Unique trade
              </p>
              <p style={{ fontWeight: "400", color: "#CDCFD4" }}>
                Safe trade
              </p>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 my-2 mmysocial text-center">
              <h5 style={{ color: "#CDCFD4", fontWeight: "600" }}>Social Links</h5>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <a
                  className="text-light text-decoration-none"
                  href="https://www.facebook.com/CtsKola-102693045651442/"
                  style={{ fontWeight: "400" }}
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsFacebook style={{ height: "20px", margin: "0px 12px" }} />
                  <span className="align-top" style={{ color: "#CDCFD4" }}>Facebook</span>
                </a>
                <a
                  style={{ fontWeight: "400" }}
                  className="text-light  text-decoration-none py-2"
                  href="https://twitter.com/CtsKola/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiFillTwitterCircle
                    style={{ height: "20px", margin: "0px 5px" }}
                  />
                  <span className="align-top" style={{ color: "#CDCFD4" }}>Twitter</span>
                </a>
                <a
                  style={{ fontWeight: "400" }}
                  className="text-light  text-decoration-none py-2"
                  href="https://t.me/+ubgDH4F2B-ZiMDVl/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsTelegram style={{ height: "20px", margin: "0px 5px" }} />
                  <span className="align-top" style={{ color: "#CDCFD4" }}>Telegram</span>
                </a>
                <a
                  style={{ fontWeight: "400" }}
                  className="text-light  text-decoration-none"
                  href="https://instagram.com/ctskola?utm_medium=copy_link/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <BsInstagram style={{ height: "20px", margin: "0px 5px" }} />
                  <span className="align-top" style={{ color: "#CDCFD4" }}>Instagram</span>
                </a>
              </div>
            </div>
          </div>

        </div>
        <hr style={{ backgroundColor: "white", width: "100%" }} />
        <div className="d-flex justify-content-center">
            <span className="" style={{padding: "10px"}}>© 2022 Ctskola.</span>
            <a style={{ fontWeight: "400", color: "#CDCFD4", padding: "10px"}} href="/privacy">
              Privacy policy
            </a>
            <a style={{ fontWeight: "400", color: "#CDCFD4", padding: "10px" }} href="/terms_&_conditions">
            Terms & Conditions
            </a>
          
        </div>
      </div>
    </>
  );
}
