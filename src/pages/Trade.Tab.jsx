import React from "react";
import Loader from "./components/Loader";
import { useSelector, useDispatch } from "react-redux";
export default function TradeTab(props) {
  const { webData } = useSelector((state) => state.websiteDBReducer);
  const { trade_history, trade_loading } = useSelector(
    (state) => state.coinDBReducer
  );
  const coin = props?.match?.params?.id?.split("-");
  const coinname = coin[0] + coin[1];
  // let l = trade_history ? [coinname]?.length - 1 : 0;
  let harr = [];
  function reverseArr(input) {
    let ret = new Array();
    for (var i = input.length - 1; i >= 0; i--) {
      ret.push(input[i]);
    }
    const ret1 = ret.sort((a, b) => b.timestamp - a.timestamp);
    return ret1;
  }
  if (
    trade_history &&
    trade_history[coinname] &&
    trade_history[coinname].length > 0
  )
    harr = reverseArr(trade_history[coinname]);

  return (
    <div
      className={`${webData.bg_color}` + " mt-2 mt-md-0 mt-lg-0"}
      style={{ backgroundColor: webData.bg_color_code, overflow: "hidden" }}
    >
      <div style={{ height: "58px" }}>
        <div
          className="tab-header  d-flex align-items-center h-50 p-0 px-2"
          style={{ background: "rgba(0,0,0,0.1)" }}
        >
          Trade History
        </div>
        <div className="row m-0 py-1 pair-border mt-1">
          <div className="col-4 text-center" style={{ fontSize: "10px" }}>
            PRICE
          </div>
          <div className="col-4 text-center" style={{ fontSize: "10px" }}>
            VOLUME
          </div>
          <div className="col-4 text-center" style={{ fontSize: "10px" }}>
            TIME
          </div>
        </div>
      </div>
      <div style={{ height: "300px", overflow: "hidden" }}>
        {trade_loading ? (
          <Loader />
        ) : harr?.length != 0 ? (
          harr ? (
            harr?.map((d, index, arr) => (
              <TradeRow
                isSell={
                  index === 9
                    ? false
                    : parseFloat(d.raw_price) >=
                      parseFloat(harr ? arr[index + 1]?.raw_price : 0)
                    ? false
                    : true
                }
                price={Number(d.raw_price)}
                volume={Number(d.volume)}
                timestamp={d.timestamp}
                key={index}
              />
            ))
          ) : (
            <div
              className="mdfthemetxt d-flex justify-content-center align-items-center "
              style={{ height: "300px" }}
            >
              <p className="mdfthemetxt">No Trade History Found !</p>
            </div>
          )
        ) : (
          <div
            className="mdfthemetxt d-flex justify-content-center align-items-center "
            style={{ height: "300px" }}
          >
            <p className="mdfthemetxt">No Trade History Found !</p>
          </div>
        )}
      </div>
    </div>
  );
}

function TradeRow(props) {
  return (
    <div
      className="row  m-0"
      style={
        props.isSell
          ? {
              background: "rgba(241, 67, 47, 0.1)",
              color: "#f00000",
              padding: "7.79px 0px",
              fontSize: "14px",
            }
          : {
              background: "rgba(35, 172, 80, 0.1)",
              color: "#2bcd76",
              padding: "7.79px 0px",
              fontSize: "14px",
            }
      }
    >
      <div className="col-4 text-center" style={{ fontSize: "10px" }}>
        <i
          className={`fas ${props.isSell ? "fa-arrow-down" : "fa-arrow-up"}`}
        ></i>
        {props.price}
      </div>
      <div className="col-3 text-center text-dark" style={{ fontSize: "10px" }}>
        {props.volume.toString().length > 6
          ? props.volume.toString().substr(0, 8)
          : props.volume}
      </div>
      <div
        className="col-5 text-center text-secondary"
        style={{ fontSize: "10px" }}
      >
        {new Date(props.timestamp).getHours() +
          ":" +
          new Date(props.timestamp).getMinutes() +
          ":" +
          new Date(props.timestamp).getSeconds()}
        {/* {moment(props.time).format("LTS")} */}
        {/* {props.time.raw_price} */}
      </div>
    </div>
  );
}
