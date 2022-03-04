import React, { useState, useEffect } from "react";
import "./exside.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  sortByChange,
  sortByPair,
  sortByVol,
} from "../redux/helpers/helper_functions";
import { N_getSupportedCurrency } from "../redux/helpers/api_functions_new";
import { NotificationManager } from "react-notifications";
import { SET_PAIRED_CURRENCY_PRICE } from "../redux/constant";
import { BiBitcoin } from "react-icons/bi";

export default function ExSide(props) {
  const coin = props.match.params.id.split("-");
  const [active, setActive] = useState(coin[1] ? coin[1] : "inr");
  const [data, setData] = useState([]);
  const [change, setChange] = useState(true);
  const [searchTxt, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [paired_cur, pairedCur] = useState([]);
  let { coins, user_fav_pairing } = useSelector((state) => state.coinDBReducer);
  const { webData } = useSelector((state) => state.websiteDBReducer);
  let coins_data = Object.values(coins);
  const { user } = useSelector((state) => state.AuthReducer);
  const [pc_price, setpc_price] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    N_getSupportedCurrency(user?.params ? user.params.user_id : user.user_id)
      .then((data) => {
        if (!data.error && data) {
          // console.log("prdc: ", data);
          pairedCur(data);
        } else {
          console.log(data);
          NotificationManager.error(data.message);
        }
      })
      .catch((e) => {
        console.log("error in getcrnc: ", e);
      });
  }, []);

  useEffect(() => {
    let dd = coins_data.filter((d) => {
      if (d.symbol !== active.toUpperCase()) return d;
    });
    setData(dd);
  }, [coins_data.length, coins]);

  useEffect(() => {
    let dd;
    if (searchTxt != "") {
      dd = Object.values(coins_data).filter((d) => {
        if (d.symbol.startsWith(searchTxt?.toUpperCase())) return d;
      });
    } else {
      dd = Object.values(coins_data).filter((d) => {
        if (d.symbol !== active.toUpperCase()) return d;
      });
    }
    setData(dd);
  }, [searchTxt, active]);

  useEffect(() => {
    let ddt = {};
    coins_data?.map((d, i) => {
      for (let i = 0; i < paired_cur.length; i++) {
        if (d.symbol === paired_cur[i].currency_coin) {
          ddt[d.symbol] = d.current_price_inr;
        }
      }
    });
    dispatch({ type: SET_PAIRED_CURRENCY_PRICE, data: ddt });
    setpc_price(ddt);
  }, [paired_cur]);

  return (
    <div
      className={`${webData.bg_color}` + " box eth-market"}
      style={{ backgroundColor: webData.bg_color_code }}
    >
      <div className="box-body px-0 pb-0">
        <div className="d-flex flex-column">
          <div className="row p-0 m-0 ">
            <div className="col-12 d-flex p-0 mp_exside_btn exide-bg">
              <div
                className={`light-theme-color exide-bg text-center p-0 py-2 px-1 ${
                  active == "fav" ? "active" : ""
                } `}
                id="pln_currency"
                onClick={() => setActive("fav")}
                name="pln_currency"
              >
                <i className="fa fa-star text-warning"></i>{" "}
              </div>
              {paired_cur
                ? paired_cur.map((item, i) => (
                    <>
                      <div
                        id={i * 2 + 5}
                        className={`light-theme-color exide-bg text-center fw-bold p-0 py-2 px-1  ${
                          active == item.currency_coin.toLowerCase()
                            ? "active"
                            : ""
                        } `}
                        id="pln_currency"
                        onClick={() =>
                          setActive(item.currency_coin.toLowerCase())
                        }
                        name="pln_currency"
                        style={{
                          fontSize: "14px",
                          cursor: "pointer",
                          lineHeight: "13px",
                          width: "20%",
                        }}
                      >
                        {item.currency_coin}
                      </div>
                    </>
                  ))
                : null}
            </div>
          </div>

          <div className="input-group py-3 px-3">
            <div className="input-group border" style={{ borderRadius: "4px" }}>
              <div className="input-group-prepend pl-1">
                <div className="text-dark pt-1">
                  <i
                    className="fa fa-search"
                    style={{ color: "rgba(0,0,0,0.2)" }}
                  ></i>
                </div>
              </div>
              <input
                type="text"
                className="form-control mp-exide-form"
                aria-label="Text input with checkbox"
                placeholder="search"
                value={searchTxt}
                onChange={(e) => setSearch(e.target.value.toUpperCase())}
                style={{
                  background: "transparent",
                  height: "20px",
                  border: "none",
                }}
              />
            </div>
          </div>
        </div>
        <div
          className="table-responsive scrollbar force-overflow"
          id="style-3"
          style={{ overflowX: "hidden" }}
        >
          <table
            id="coins_table"
            className="table table-striped no-border no-margin tablesorter"
            style={{ height: "auto" }}
          >
            <thead>
              <tr>
                <th
                  style={{ cursor: "pointer", outline: "none" }}
                  onClick={() => {
                    if (sort == "pair-asc") {
                      sortByPair(data, true, (result) => {
                        setData(result);
                        setChange(!change);
                        setSort("pair-dsc");
                      });
                    } else {
                      sortByPair(data, false, (result) => {
                        setData(result);
                        setChange(!change);
                        setSort("pair-asc");
                      });
                    }
                  }}
                >
                  Pair
                  {sort == "pair-asc" ? (
                    <i
                      className="fa fa-arrow-up"
                      aria-hidden="true"
                      style={{ fontSize: "10px" }}
                    ></i>
                  ) : null}
                  {sort == "pair-dsc" ? (
                    <i
                      className="fa fa-arrow-down"
                      aria-hidden="true"
                      style={{ fontSize: "10px" }}
                    ></i>
                  ) : null}
                </th>
                <th
                  style={{ cursor: "pointer", outline: "none" }}
                  onClick={() => {
                    if (sort == "vol-asc") {
                      sortByVol(data, true, (result) => {
                        setData(result);
                        setChange(!change);
                        setSort("vol-dsc");
                      });
                    } else {
                      sortByVol(data, false, (result) => {
                        setData(result);
                        setChange(!change);
                        setSort("vol-asc");
                      });
                    }
                  }}
                >
                  Vol
                  {sort == "vol-asc" ? (
                    <i
                      className="fa fa-arrow-up"
                      aria-hidden="true"
                      style={{ fontSize: "10px" }}
                    ></i>
                  ) : null}
                  {sort == "vol-dsc" ? (
                    <i
                      className="fa fa-arrow-down"
                      aria-hidden="true"
                      style={{ fontSize: "10px" }}
                    ></i>
                  ) : null}
                </th>
                <th
                  style={{ cursor: "pointer", outline: "none" }}
                  onClick={() => {
                    if (sort == "change-asc") {
                      sortByChange(data, true, (result) => {
                        setData(result);
                        setChange(!change);
                        setSort("change-dsc");
                      });
                    } else {
                      sortByChange(data, false, (result) => {
                        setData(result);
                        setChange(!change);
                        setSort("change-asc");
                      });
                    }
                  }}
                >
                  Change
                  {sort == "change-asc" ? (
                    <i
                      className="fa fa-arrow-up"
                      aria-hidden="true"
                      style={{ fontSize: "10px" }}
                    ></i>
                  ) : null}
                  {sort == "change-dsc" ? (
                    <i
                      className="fa fa-arrow-down"
                      aria-hidden="true"
                      style={{ fontSize: "10px" }}
                    ></i>
                  ) : null}
                </th>
              </tr>
            </thead>
            <tbody>
              {active != "fav"
                ? data?.map((d, index) => {
                    if (active.toUpperCase() != d.symbol.toUpperCase())
                      return (
                        <>
                          {active.toUpperCase() !== "BTC" &&
                          active.toUpperCase() !== "INR" &&
                          active.toUpperCase() !== "USDT" ? (
                            d["is_paired_custom_coin"] === 1 ? (
                              <CoinRow
                                {...d}
                                id={index * 5}
                                pairing_currency={active}
                                pc_price={pc_price}
                              />
                            ) : null
                          ) : d[`is_paired_${active.toLowerCase()}`] === 1 ? (
                            <CoinRow
                              {...d}
                              id={index * 2 * 5}
                              pairing_currency={active}
                              pc_price={pc_price}
                            />
                          ) : null}
                        </>
                      );
                    else return <></>;
                  })
                : user_fav_pairing?.map((d, index) => (
                    <CoinRow {...coins[d]} key={index * 7} />
                    // console.log("fav_coin",)
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function CoinRow(props) {
  const history = useHistory();
  let price = 0;
  // console.log("check symbol_1: ", props.symbol, props.pc_price, props.pairing_currency);

  switch (props.pairing_currency.toUpperCase()) {
    case "INR":
      price = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 8,
        maximumSignificantDigits: 8,
      }).format(
        props.raw_current_price_inr ? props.raw_current_price_inr : 0.12
      );

      break;

    case "USDT":
      price = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 8,
        maximumSignificantDigits: 8,
      }).format(
        props.raw_current_price_inr
          ? props.raw_current_price_inr / props.pc_price.USDT
          : 0.03
      );

      break;
    case "BTC":
      price = props.raw_current_price_inr
        ? Number(props.raw_current_price_inr / props.pc_price.BTC).toFixed(8)
        : 0.03;
      // console.log("check symbol_2: ", props.symbol, price);
      break;
    case "RBC":
      price = props.raw_current_price_inr
        ? Number(props.raw_current_price_inr / props.pc_price.RBC).toFixed(8)
        : 0.03;
      break;
    default:
      price = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "USD",
      }).format(
        props.raw_current_price_inr ? props.raw_current_price_inr : 0.03
      );
  }
  return (
    <tr
      id={props.id}
      style={{ cursor: "pointer", overflow: "hidden" }}
      onClick={() => {
        // dispatch(
        //   changeActiveCoin(props.symbol.toLowerCase(), props.active_tab, () =>
        localStorage.setItem(
          "precoinpair",
          `/exchange/${props.symbol.toLowerCase()}-${props.pairing_currency.toLowerCase()}`
        );
        history.push(
          `/exchange/${props.symbol.toLowerCase()}-${props.pairing_currency.toLowerCase()}`
          //   )
          // )
        );
      }}
    >
      <td colSpan="2">
        <div className="d-flex justify-content-start align-items-center">
          <img
            src={props.icon}
            alt={props.symbol}
            width="20"
            className="m-1"
            height="20"
          />
          <div className="p-1">
            <div className="mdfthemetxt">
              {props.symbol}/{props.pairing_currency?.toUpperCase()}
            </div>
            <div className="no-wrap">
              <span
                className={
                  props.direction_inr == "up" ? "text-success" : "text-danger"
                }
                style={{ fontSize: "11px" }}
              >
                <i
                  className={
                    props.direction_inr == "up"
                      ? "fa fa-caret-up"
                      : "fa fa-caret-down"
                  }
                ></i>{" "}
                {props.price_change_percentage_1h_inr}%
              </span>
            </div>
          </div>
        </div>
      </td>
      <td>
        <p className="no-margin text-fade" style={{ fontSize: "11px" }}>
          {props.pairing_currency?.toUpperCase() === "BTC" ? (
            <>
              <BiBitcoin size={12} />
              {price}
            </>
          ) : (
            price
          )}
        </p>
      </td>
    </tr>
  );
}
