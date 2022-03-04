import {
  SET_USER_BALANCE,
  SET_USER_ORDER_PENDING,
  SET_USER_ORDER_CLOSE,
  SET_USER_FAV_PAIRING,
  SET_USER_FAV_CURRENCY_RATE,
  SET_USER_FAV_CURRENCY,
  SWITCH_THEME,
} from "../constant";
import {
  // getClosedOrders,
  // getCoinsData,
  // getOpenOrders,
  // get_wallet,
  // getAllOrderBook,
  // getTradeHistory,
  // getChartData,
  addfavcoin,
  viewAllfavcoin,
} from "../helpers/api_functions";
import { N_get_wallet, N_OrdersHistory } from "../helpers/api_functions_new";

// export function getData() {
//   return (dispatch) =>
//     getCoinsData()
//       .then((data) => {
//         // console.log(data);
//         dispatch({ type: GET_COIN_DATA, data: data, coin_loading: false });
//         return data;
//       })
//       .catch((e) => e);
// }

// export function getGraphData(currency_type, compare_currency, interval) {
//   return (dispatch) =>
//     getChartData(currency_type, compare_currency, interval)
//       .then((data) => {
//         dispatch({ type: GET_CURRENCY_DATA, data: Object.values(data) });
//         return data;
//       })
//       .catch((e) => e);
// }

export function getUserBalance(user_id) {
  return (dispatch) => {
    N_get_wallet(user_id).then((d) => {
      dispatch({
        type: SET_USER_BALANCE,
        data: Object.values(d),
        wallet_loading: false,
      });
    });
  };
}

export function getUserOrder(user_id) {
  // console.log("myoh");
  return (dispatch) => {
    N_OrdersHistory(user_id)
      .then((res) => {
        // console.log("res: ", res);
        if (res.status === 200) {
          // console.log("open close orders: ", res);
          dispatch({
            type: SET_USER_ORDER_PENDING,
            data: res.params.trade_history.pending,
            pending_order_loading: false,
          });
          dispatch({
            type: SET_USER_ORDER_CLOSE,
            data: res.params.trade_history.compleated,
            close_order_loading: false,
          });
        } else {
          console.log("error to fetch open and close orders: ", res);
        }
      })
      .catch((e) => console.log(e));
    // getOpenOrders(token,action)
    //   .then((d) => {
    // dispatch({
    //   type: SET_USER_ORDER_PENDING,
    //   data: d,
    //   pending_order_loading: false,
    // });
    //     getClosedOrders(token,action)
    //       .then((order) => {
    // dispatch({
    //   type: SET_USER_ORDER_CLOSE,
    //   data: order,
    //   close_order_loading: false,
    // });
    //       })
    //       .catch((e) => {
    //         console.log(e);
    //       });
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  };
}

// export function getOrderBook(currency_type, compare_currency, cb, action) {
//   return (dispatch) => {
//     getAllOrderBook(currency_type, compare_currency, action)
//       .then((d) => {
//         dispatch({ type: SET_ORDER_BOOK, data: d, order_book_loading: false }); //kjjk
//         cb();
//       })
//       .catch((e) => {
//         console.log(e);
//         cb();
//       });
//   };
// }

// export function getTradeHist(currency_type, compare_currency, cb, action) {
//   return (dispatch) => {
//     getTradeHistory(action, "", currency_type, compare_currency)
//       .then((d) => {
//         dispatch({ type: SET_TRADE_HISTORY, data: d, trade_loading: false });
//         cb();
//       })
//       .catch((e) => {
//         console.log(e);
//         cb();
//       });
//   };
// }

export function toggleFav(token, pair) {
  return (dispatch) => {
    addfavcoin(token, pair)
      .then((d) => {
        dispatch({ type: SET_USER_FAV_PAIRING, data: d.data });
      })
      .catch((e) => {
        console.log(e);
      });
  };
}

export function viewFav(token) {
  return (dispatch) => {
    viewAllfavcoin(token)
      .then((d) => {
        dispatch({ type: SET_USER_FAV_PAIRING, data: d.data });
      })
      .catch((e) => {
        console.log(e);
      });
  };
}

export function setFavCurrency(currency, cb) {
  return (dispatch) => {
    dispatch({ type: SET_USER_FAV_CURRENCY, data: currency });
    cb();
  };
}

export function setFavCurrencyRate(rate, cb) {
  return (dispatch) => {
    dispatch({ type: SET_USER_FAV_CURRENCY_RATE, data: rate });
    cb();
  };
}
export function switchTheme(theme_name) {
  return (dispatch) => {
    dispatch({ type: SWITCH_THEME, data: theme_name });
  };
}
