import React from "react";
import { AiFillApple } from "react-icons/ai";
import { IoLogoAndroid } from "react-icons/io";
import { FaGooglePlay, FaLinux } from "react-icons/fa";
import { BsCodeSquare, BsWindows } from "react-icons/bs";

export default function TradeAnyWhere() {
  return (
    <>
      <div className="container-fluid text-dark bg-light">
      <h2 className="mx-5">Trade. Anywhere.</h2>
        <div className="row px-5 py-5 d-flex justify-content-between">
          <div className="col-lg-5">
            <p>
              Compatible with multiple devices, start trading with safety and
              convenience.
            </p>
            <img src="./img/2.svg" className="img-fluid" />
          </div>
          <div className="col-lg-5">
            <div className="container">
              <div className="row d-flex px-3">
                <div className="col-2 bg-light my-2 mx-2 text-center trade_icons  p-5">
                  <div>
                    <AiFillApple style={{ height: "25px", width: "25px" }} />
                  </div>
                  <div>app Store</div>
                </div>
                <div className="col-2 bg-light my-2 mx-2 text-center trade_icons  p-5">
                  <div>
                    <IoLogoAndroid style={{ height: "25px", width: "25px" }} />
                  </div>
                  Android APK
                </div>
                <div className="col-2 bg-light my-2 mx-2 text-center trade_icons  p-5">
                  <div>
                    <FaGooglePlay style={{ height: "25px", width: "25px" }} />
                  </div>
                  Google play
                </div>
                <div className="col-2 bg-light my-2 mx-2 text-center trade_icons  p-5">
                  <div>
                    <BsCodeSquare style={{ height: "25px", width: "25px" }} />
                  </div>
                  API
                </div>
                <div className="col-2 bg-light my-2 mx-2 text-center trade_icons  p-5">
                  <div>
                    <BsWindows style={{ height: "25px", width: "25px" }} />
                  </div>
                  Windows
                </div>
                <div className="col-2 bg-light my-2 mx-2 trade_icons  p-5">
                  <div>
                    <FaLinux style={{ height: "25px", width: "25px" }} />
                  </div>
                  Linux
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
