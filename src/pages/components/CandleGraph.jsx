import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./chart.css";
import { toggleFav } from "../redux/actions/coinDBAction";
import { TVChartContainer } from "./CandleChart";

export default function CandleGraph(props) {
  const dispatch = useDispatch();
  // const url = "https://api.bitflash.io/api";
  // const [fullexe, setFUllexw] = React.useState(false);
  const { coins, currency_graph, user_fav_pairing,paired_curency_price } = useSelector(
    (state) => state.coinDBReducer
  );
  const [isFav, setIsFav] = React.useState(false);
  const [current_price, currentPrice] = React.useState(0);
  const [newgetchart, NewGetChart] = React.useState(false);
  const { user } = useSelector((state) => state.AuthReducer);
  const { isLoggedIn } = useSelector(
    (state) => state.AuthReducer
  );
  const filter = "1h"
  const [prev_symbol, prevSymbol] = React.useState("");

  const coin = props.match.params.id.split("-");
  const SelCurency = coin && coin[1] ? coin[1].toUpperCase() : '';
  const { webData } = useSelector((state) => state.websiteDBReducer);
  const data = Object.values(coins).find((d) => {
    if (d.symbol === coin[0].toUpperCase()) {
      return d;
    }
  });
  // console.log("paired_currency_price: ",data)
  useEffect(() => {
    let match = user_fav_pairing.find(
      (d) =>
        d === data.symbol.toUpperCase()
    );
    setIsFav(match ? true : false);
  }, [...user_fav_pairing, ...coin]);

  
  function getChart(symbol, symbol2) {
    prevSymbol(symbol);
    // console.log("getChart1: ", symbol, symbol2);
    return (
      <>
        <TVChartContainer symbols={symbol} pre_symbols={symbol2} />
      </>
    );
  }
  useEffect(() => {
    let coinsym = coin[0] + "-" + coin[1];
    if(paired_curency_price && data && SelCurency){
      let inrPrice = data.current_price_inr ? data.current_price_inr : 1; 
      let selPrice = (SelCurency == 'INR') ? 1 : paired_curency_price[SelCurency] ? paired_curency_price[SelCurency] : 1; 
      let fPrice = inrPrice*selPrice ? inrPrice/selPrice : 1;
      currentPrice(fPrice)
    }
    NewGetChart(getChart(coinsym, prev_symbol));
  }, [...coin, filter,currency_graph]);
  return (
    <>
      <div
        className="sc-dTdPqK coinsfather-theme-color p-0"
        style={{ backgroundColor: webData.bg_color_code }}
      >
        <div className="sc-bdVaJa rSmgz py-0 px-0 graph-head">
          <div height="24px" width="12px" className="sc-bdVaJa gSxurx"></div>
          <div className="sc-bdVaJa lmEScu p-0">
            <div className="sc-bdVaJa dveUWY p-0">
              <h1 color="#1C1B21" className="sc-bwzfXH iHECUo p-0">
                {props.match.params.id.toUpperCase().replace("-", "/")}
              </h1>
              <span color="#9b9b9b" className="sc-bwzfXH ksDqJJ p-0 px-2">
                {data?.name}
              </span>
            </div>
            <div className="sc-bdVaJa sc-dliRfk iUXzPH p-0">
              <span color="#929292" className="sc-bwzfXH kgoTtc p-0">
                Last Price
              </span>
              <span
                cursor="pointer"
                color="#1C1B21"
                className="sc-bwzfXH jaArUU"
              >
                {current_price ? current_price.toFixed(9) : ''}
              </span>
              <span
                onClick={() => {
                  dispatch(toggleFav(user?.params ? user.params.user_id : user.user_id, (data?.symbol).toUpperCase()));
                  if (isLoggedIn) setIsFav(!isFav);
                }}
              >
                <i
                  className={`fas ${
                    isFav ? "fa-star" : "fa-star-o"
                  } text-warning`}
                ></i>
              </span>
              <div className="sc-bdVaJa sc-jVODtj jZzDMB p-0">
                <i className="mdi mdi-star-outline mdi-18px"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="sc-bdVaJa sc-kUaPvJ kZeBBS row coinsfather-theme-color "
        style={{ backgroundColor: webData.bg_color_code }}
      >
        <div className="sc-bdVaJa sc-giadOv iIMfMq col-12 col-md-8 col-lg-8">
          <div className="sc-bdVaJa bmTiOt">
            <span color="#929292" className="sc-bwzfXH yjNnZ font-weight-bold">
              Volume
            </span>
            <span color="#1C1B21" className="sc-bwzfXH izvMda">
              {data?.volume_24h}
            </span>
          </div>
          <div className="sc-bdVaJa bmTiOt">
            <span color="#929292" className="sc-bwzfXH yjNnZ font-weight-bold">
              High
            </span>
            <span color="#1C1B21" className="text-success sc-bwzfXH izvMda">
            <span class="high_24h">{data?.high_24h}</span>
              <i className="fa fa-caret-up align-top"></i>
            </span>
          </div>
          <div className="sc-bdVaJa bmTiOt">
            <span color="#929292" className="sc-bwzfXH yjNnZ font-weight-bold">
              Low
            </span>
            <span color="#1C1B21" className="text-danger sc-bwzfXH izvMda">
              <span class="low_24h">{data?.low_24h}</span>
              <i className="fa fa-caret-down align-top"></i>
            </span>
          </div>
          <div className="sc-bdVaJa bmTiOt">
            <span color="#929292" className="sc-bwzfXH yjNnZ font-weight-bold">
              AVG
            </span>
            <span color="#1C1B21" className=" sc-bwzfXH izvMda">
              {data?.price_change_percentage_1h_inr} %
            </span>
          </div>
        </div>
      </div>
      <div id="candleCart1">{newgetchart}</div>
    </>
  );
}
