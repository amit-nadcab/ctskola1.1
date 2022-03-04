import React from "react";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function StartTrade() {
  AOS.init({duration:1000})
  return (
    <>
      <div className="container-fluid text-dark" style={{background: "#141A28"}}>
        <div className="row text-center py-5">
          <div className="col-12">
            <h4 style={{color: "#CDCFD4"}}>Start Trading now</h4>
            <div className="trading-container my-4">
              <Link data-aos="fade-right" className="tradingBtn mx-4" to="/login" >Register Now</Link>
              <Link
                className="btn btn-light mx-4"
                data-aos="fade-left"
                style={{
                  padding: "10px 40px",
                }}
                to="/exchange/btc-inr"
              >
                Trade Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
