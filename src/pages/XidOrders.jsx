import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./components/Loader";
import { SET_ORDER_BOOK } from "./redux/constant";
// import { getOrderBook } from "./redux/actions/coinDBAction";
export default function OrderSystemTab(props) {
  const [activeTab, setActiveTab] = React.useState(0);
  const [obj, setObj] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [sarr, setsarr] = useState([]);
  const [barr, setbarr] = useState([]);
  const { buy_order_book, sell_order_book, order_book_loading } = useSelector(
    (state) => state.coinDBReducer
  );
  const dispatch = useDispatch();
  const coin = props?.match?.params?.id?.split("-");
  const coinname = coin[0] + coin[1];
  const { webData } = useSelector((state) => state.websiteDBReducer);

  // let barr = [];
  // let sarr = [];
  function reverseArr(input) {
    let ret = new Array();
    for (var i = input.length - 1; i >= 0; i--) {
      ret.push(input[i]);
    }
    return ret;
  }

  useEffect(() => {
    if (buy_order_book || sell_order_book) {
      // console.log("test: ", buy_order_book, sell_order_book);
      // Object.keys(buy_order_book).map((item) => {
      // console.log("inbyob: ", item, )
      if (buy_order_book[coinname]) {
        let tarr = reverseArr(
          buy_order_book[coinname].sort((a, b) => b.raw_price - a.raw_price)
        );
        setbarr(tarr);
      } else {
        setbarr();
      }
      // });

      // Object.keys(sell_order_book).map((item) => {
      if (sell_order_book[coinname]) {
        let t1arr = reverseArr(
          sell_order_book[coinname].sort((a, b) => b.raw_price - a.raw_price)
        );
        setsarr(t1arr);
      } else {
        setsarr();
      }
      // });
    }
  }, [buy_order_book, sell_order_book, coinname]);

  function getPercentage(cv, arr) {
    // console.log("perc arr: ", arr);
    let tv = 0;
    for (let i = 0; i < arr.length; i++) {
      tv += parseFloat(arr[i].volume);
    }
    return (Number(cv) * 100) / Number(tv);
  }

  useEffect(() => {
    dispatch({ type: SET_ORDER_BOOK, order_book_loading: false });
  }, []);
  // console.log("tarr: ", barr, sarr);
  return (
    <>
      <div
        className={`${webData.bg_color}`}
        style={{ backgroundColor: webData.bg_color_code }}
      >
        <div style={{ height: "39px" }}>
          <div
            className="bb-1 title-order d-flex p-0"
            style={{
              justifyContent: "space-between",
              background: "rgba(0,0,0,0.1)",
            }}
          >
            <div className="d-flex align-items-center px-3">XID ORDER BOOK</div>
            <nav>
              <div className="nav nav-tabs d-flex" id="nav-tab" role="tablist">
                <a
                  className={`nav-item nav-link ${
                    activeTab === 0 ? "active" : ""
                  }`}
                  id="nav-home-tab"
                  data-toggle="tab"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                  onClick={() => setActiveTab(0)}
                  style={{padding:"6px 10px"}}
                >
                  BUYERS
                </a>
                <a
                  className={`nav-item nav-link ${
                    activeTab === 1 ? "active" : ""
                  }`}
                  id="nav-profile-tab"
                  data-toggle="tab"
                  onClick={() => setActiveTab(1)}
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                  style={{padding:"6px 10px"}}
                >
                  SELLERS
                </a>
              </div>
            </nav>
          </div>
        </div>

        {/* 1st Tab  */}
        <div
          className="tab-content "
          style={{
            height: "360px",
            overflow: "hidden",
          }}
        >
          <div
            className={`tab-pane fade ${activeTab == 0 ? "active show" : ""}`}
          >
            <div className="order-book-container">
              {order_book_loading ? (
                <Loader />
              ) : buy_order_book?.length == 0 || sell_order_book.length == 0 ? (
                <table
                  className="order-book-table order-book-table--open order-book-table--left"
                  style={{ height: "fit-content" }}
                >
                  <colgroup>
                    <col width="10%" />
                    <col width="40%" />
                    <col width="50%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th className="text-left text-uppercase">
                        {" "}
                        <h6>Buy Price</h6>
                      </th>
                      <th className="text-left text-uppercase">
                        <h6>Volume</h6>
                      </th>
                      <th className="text-left text-uppercase">
                        <h6>XID</h6>
                      </th>
                    </tr>
                  </thead>
                  {order_book_loading ? (
                    <Loader />
                  ) : buy_order_book?.length != 0 ||
                    sell_order_book.length != 0 ? (
                    <tbody className="buy">
                      {buy_order_book
                        ? barr?.map((d, index) => (
                            <tr key={index}>
                              <td>{d.volume}</td>
                              <td>{d.volume}</td>
                              <td>{Number(d.raw_price).toFixed(9)}</td>
                              <div
                                className="filler"
                                style={{
                                  width: getPercentage(d.volume, barr) + "%",
                                }}
                              ></div>
                            </tr>
                          ))
                        : null}
                    </tbody>
                  ) : (
                    <div
                      className="d-flex"
                      style={{
                        height: "328px",
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        position:"absolute",
                      }}
                    >
                      <p className="mdfthemetxt">No record found</p>
                    </div>
                  )}
                </table>
              ) : (
                <div
                  className="d-flex"
                  style={{
                    height: "328px",
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p className="mdfthemetxt">No record found</p>
                </div>
              )}
            </div>
          </div>

          {/* 2nd Tab */}
          <div
            className={`tab-pane fade ${activeTab == 1 ? "active show" : ""}`}
          >
            <div className="order-book-container">
              {order_book_loading ? (
                <Loader />
              ) : buy_order_book?.length == 0 || sell_order_book.length == 0 ? (
                <table
                  className="order-book-table order-book-table--open order-book-table--left"
                  style={{ height: "fit-content" }}
                >
                  <colgroup>
                    <col width="10%" />
                    <col width="40%" />
                    <col width="50%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th className="text-left text-uppercase">
                        {" "}
                        <h6>Sell Price</h6>
                      </th>
                      <th className="text-left text-uppercase">
                        <h6>Volume</h6>
                      </th>
                      <th className="text-left text-uppercase">
                        <h6>XID</h6>
                      </th>
                    </tr>
                  </thead>
                  {order_book_loading ? (
                    <Loader />
                  ) : buy_order_book?.length != 0 ||
                    sell_order_book.length != 0 ? (
                    <tbody className="buy">
                      {sell_order_book
                        ? sarr?.map((d, index) => (
                            <tr key={index}>
                              <td>{d.volume}</td>
                              <td>{d.volume}</td>
                              <td>{Number(d.raw_price).toFixed(9)}</td>
                              <div
                                className="filler"
                                style={{
                                  width: getPercentage(d.volume, barr) + "%",
                                }}
                              ></div>
                            </tr>
                          ))
                        : null}
                    </tbody>
                  ) : (
                    <div
                      className="d-flex"
                      style={{
                        height: "328px",
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        position:"absolute",
                      }}
                    >
                      <p className="mdfthemetxt">No record found</p>
                    </div>
                  )}
                </table>
              ) : (
                <div
                  className="d-flex"
                  style={{
                    height: "328px",
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p className="mdfthemetxt">No record found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
