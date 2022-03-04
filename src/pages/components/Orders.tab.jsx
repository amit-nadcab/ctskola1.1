import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoginORSignup from "./LoginORSignup";
import { NotificationManager } from "react-notifications";
import "./order.css";
import Loader from "./Loader";
import { getUserBalance, getUserOrder } from "../redux/actions/coinDBAction";
import { N_cancleOrderById } from "../redux/helpers/api_functions_new";
export default function OrdersTab(props) {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.AuthReducer);
  const { user } = useSelector((state) => state.AuthReducer);
  const { webData } = useSelector((state) => state.websiteDBReducer);
  const { user_order_pending, user_order_close } = useSelector(
    (state) => state.coinDBReducer
  );
  const [pendingOrder, setpendingOrder] = useState([]);
  const [closeOrder, setcloseOrder] = useState([]);
  // const coin = props.match.params.id.split("-");
  useEffect(() => {
    dispatch(getUserOrder(user?.params ? user.params.user_id : user.user_id));
  }, [user, dispatch]);

  useEffect(() => {
    setpendingOrder(
      user_order_pending.sort(
        (a, b) => Number(b.timestamp) - Number(a.timestamp)
      )
    );
    setcloseOrder(
      user_order_close.sort((a, b) => Number(b.timestamp) - Number(a.timestamp))
    );
  }, [user_order_pending, user_order_close]);

  return (
    <>
      <div
        className={`${webData.bg_color}`}
        style={{ backgroundColor: webData.bg_color_code }}
      >
        <nav style={{ border: "0.2px solid #ffffff11" }}>
          <div className="nav nav-tabs d-flex" id="nav-tab" role="tablist">
            <div
              className={` nav-item nav-link  p-0  ${
                activeTab === 0 ? "active" : ""
              }`}
              id="nav-home-tab"
              data-toggle="tab"
              role="tab"
              aria-controls="nav-home"
              aria-selected="true"
              onClick={() => setActiveTab(0)}
              style={{ flex: 0.5, height: "30px", lineHeight: "30px" }}
            >
              <div></div>
              Open Orders
            </div>
            <div
              className={` nav-item nav-link  p-0  ${
                activeTab === 1 ? "active" : ""
              }`}
              id="nav-profile-tab"
              data-toggle="tab"
              onClick={() => setActiveTab(1)}
              role="tab"
              aria-controls="nav-profile"
              aria-selected="false"
              style={{ flex: 0.5, height: "30px", lineHeight: "30px" }}
            >
              Completed Orders
            </div>
          </div>
        </nav>

        {!isLoggedIn ? (
          <div
            className=" tab-content orders"
            style={{ borderColor: "#19205733" }}
          >
            <LoginORSignup />
          </div>
        ) : null}
        {activeTab === 0 && isLoggedIn ? (
          <div
            className="row m-0 p-0 py-1"
            style={{ borderTop: "0.1px solid rgba(0,0,0,0.1)" }}
          >
            {/* <div
              className="offset-8 col-4 text-center text-danger cursor"
              style={{ fontSize: "12px" }}
              onClick={() =>
                cancleOrder(token, props.type)
                  .then((d) => {
                    if (d.status === 1) {
                      NotificationManager.success(d.msg);
                      dispatch(getUserOrder(token, props.type));
                      dispatch(getUserBalance(token));
                      dispatch(
                        getOrderBook(coin[0], coin[1], () => {}, props.type)
                      );
                      dispatch(
                        getTradeHist(coin[0], coin[1], () => {}, props.type)
                      );
                    } else {
                      NotificationManager.error(d.msg);
                    }
                  })
                  .catch((e) => {
                    console.log(e);
                  })
              }
            >
              Cancel All
            </div> */}
          </div>
        ) : null}
        {isLoggedIn ? (
          <>
            <div className="row m-0 p-0 py-1 theme-color pair-border">
              <div className="col-3 text-center" style={{ fontSize: "10px" }}>
                PAIR
              </div>
              <div className="col-3 text-center" style={{ fontSize: "10px" }}>
                AMOUNT
              </div>
              <div className="col-3 text-center" style={{ fontSize: "10px" }}>
                PRICE
              </div>
              <div className="col-3 text-center" style={{ fontSize: "10px" }}>
                TOTAL
              </div>
            </div>
            <div
              className="tab-content orders theme-color"
              style={{
                height: "335px",
                overflowY: "auto",
              }}
            >
              <div
                className={`tab-pane fade ${
                  activeTab === 0 ? "show active" : ""
                }`}
                id="open-order"
              >
                {pendingOrder && pendingOrder?.length > 0
                  ? pendingOrder.map((d, index) => {
                      return (
                        <OrderRow
                          {...d}
                          key={index}
                          // deleteOrder={(order_id, order_type) =>
                          //   deleteOrder(order_id, order_type)
                          // }
                          user_id={
                            user?.params ? user.params.user_id : user.user_id
                          }
                        />
                      );
                    })
                  : null}
                {pendingOrder?.length === 0 ? (
                  <div
                    className=" d-flex justify-content-center align-items-center"
                    style={{ flex: 1, height: "328px" }}
                  >
                    <p className="mdfthemetxt">No Open Orders..</p>
                  </div>
                ) : null}
                {loading ? <Loader /> : null}
              </div>

              <div
                id="order-history"
                className={`tab-pane fade ${
                  activeTab === 1 ? "show active" : ""
                }`}
              >
                {closeOrder && closeOrder?.length > 0
                  ? closeOrder.map((d, index) => {
                      return <OrderRow {...d} key={index} order_type={1} />;
                    })
                  : null}
                {closeOrder?.length === 0 ? (
                  <div
                    className="mdfthemetxt d-flex justify-content-center align-items-center"
                    style={{ flex: 1, height: "338px" }}
                  >
                    <p className="mdfthemetxt">No Completed Orders..</p>
                  </div>
                ) : null}
                {loading ? <Loader /> : null}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

function OrderRow(props) {
  const [popup, setpopup] = useState(false);
  const [spin, setspin] = useState("");
  const dispatch = useDispatch();
  let progress_width = 0;
  let back = "rgb(16 129 53 / 10%)";
  const [dis, setdis] = useState(false);
  if (props["total_buy"] === undefined) {
    progress_width = (props.total_executed * 100) / props.volume;
    back = props.type === "buy" ? "rgba(35, 172, 80, 0.4)" : "#81101026";
  } else {
    progress_width = (props.total_executed * 100) / props.volume;
    back = "rgb(16 129 53 / 10%)";
  }

  const deleteOrder = (order_id, user_id) => {
    setspin("spinner-border spinner-border-sm");
    N_cancleOrderById(user_id, order_id)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getUserOrder(user_id, props.type));
          dispatch(getUserBalance(user_id));
          setTimeout(() => {
            setspin("");
            setpopup(false);
            setdis(false);
          }, 1000);
          // setLoading(false);
          NotificationManager.success(res.message);
        } else {
          NotificationManager.error(res.message);
        }
      })
      .catch((e) => {
        console.log("error: ", e);
      });
  };

  // function getDateTime(props) {
  //   let ddate = props.order_date;
  //   if (ddate === 0) {
  //     ddate = props.execution_date;
  //   }
  //   return ddate;
  // }

  return (
    <>
      {popup ? (
        <>
          <div
            style={{
              position: "absolute",
              height: "43%",
              width: "99%",
              display: "flex",
              flexDirection: "column",
              zIndex: 200,
              backgroundColor: "rgba(0,0,0,0.3)",
              top:"45px",
              left:"2px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "20%",
                zIndex: 1000,
                boxShadow: "2px 2px 20px rgba(0,0,0,0.4)",
                display: "flex",
                flexDirection: "column",
                alignSelf: "center",
              }}
            >
              <div className="shead-bg"></div>
              <div
                className="container shead-bg"
                style={{ width: "256px", padding: "0px 14px" }}
              >
                <div className="row">
                  <div className="col-12 col-md-12 col-sm-12">
                    <div
                      className="text-secondary"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                        textAlign: "center",
                      }}
                    >
                      <p className="py-2">Delete Order</p>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <button
                          type="button"
                          className="btn btn-success my-3"
                          onClick={() => {
                            if (!dis) {
                              setdis(true);
                              deleteOrder(
                                props.order_id,
                                props.user_id,
                                props["total_buy"] === undefined
                                  ? "sell"
                                  : "buy"
                              );
                            }
                          }}
                        >
                          {dis ? (
                            <span
                              className={`${spin} mx-2`}
                              role="status"
                              aria-hidden="true"
                            ></span>
                          ) : null}
                          Okay
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger my-3 mx-2"
                          onClick={() => {
                            if (!dis) {
                              setpopup(false);
                            }
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      <div className="order_cont">
        <div
          className="row m-0 p-0 py-1 align-items-center order"
          style={{
            borderLeft: `5px solid ${props.type === "buy" ? "green" : "red"}`,
            height: "40px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: progress_width + "%",
              height: "100%",
              background: back,
              position: "absolute",
              left: "0px",
              top: "0px",
              zIndex: "-1",
            }}
          ></div>
          <div className="col-3 text-center" style={{ fontSize: "10px" }}>
            <div className="font-weight-bold">
              {props?.currency_type?.toUpperCase()}
            </div>
            <div>{props?.compare_currency?.toUpperCase()}</div>
          </div>
          <div className="col-3 text-center" style={{ fontSize: "10px" }}>
            <div className="font-weight-bold">
              {props.type === "buy"
                ? props.total_executed
                : props.total_executed}
            </div>
            <div>{Number(props?.volume)?.toFixed(4)}</div>
          </div>
          <div className="col-3 text-center" style={{ fontSize: "10px" }}>
            {Number(props?.raw_price)?.toFixed(4)}
          </div>
          <div className="col-3 text-center" style={{ fontSize: "10px" }}>
            {Number(props?.volume * props?.raw_price).toFixed(4)}
          </div>

          <div className="orderrow-hover">
            {/* Date(getDateTime(props?.timestamp)).toLocaleDateString() */}
            {/* new Date(props?.timestamp).toLocaleDateString() */}
            {props?.order_type !== 1 ? (
              <span className="">
                {new Date(Number(props.timestamp)).toLocaleString()}
              </span>
            ) : (
              <span className="">
                {new Date(Number(props.timestamp)).toLocaleString()}
              </span>
            )}
            {props?.order_type !== 1 ? (
              <div
                title="Cancel order"
                className=""
                onClick={() => {
                  setpopup(true);
                }}
              >
                <i className="fa fa-times-circle text-danger"></i>
              </div>
            ) : (
              <span>Executed</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
