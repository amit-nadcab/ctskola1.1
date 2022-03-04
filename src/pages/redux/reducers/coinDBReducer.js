import {
  GET_COIN_DATA,
  SET_USER_BALANCE,
  SET_USER_ORDER_PENDING,
  SET_USER_ORDER_CLOSE,
  SET_BUY_ORDER_BOOK,
  SET_SELL_ORDER_BOOK,
  SET_TRADE_HISTORY,
  GET_CURRENCY_DATA,
  SET_USER_FAV_PAIRING,
  SET_USER_FAV_CURRENCY,
  SET_USER_FAV_CURRENCY_RATE,
  SET_ORDER_BOOK,
  SET_PAIRED_CURRENCY_PRICE,
  SET_WALLET_DETAILS,
  BUY_MARKET_PRICE,
  SELL_MARKET_PRICE,
} from "../constant";

const initialState = {
  coins: [],
  coins_loading: true,
  currency_graph: [],
  wallet: [],
  wallet_loading: true,
  user_order_pending: [],
  pending_order_loading: true,
  user_order_close: [],
  close_order_loading: true,
  buy_order_book: {},
  order_book_loading: true,
  trade_loading: true,
  sell_order_book: {},
  trade_history: {},
  user_fav_pairing: [],
  user_fav_loading: true,
  user_fav_currency: "INR",
  user_fav_currency_rate: 1,
  currency_prefix: { INR: "₹ ", USDT: "$ ", BTC: " ฿", BTEX: "BTEX" },
  paired_curency_price: {},
  wallet_details: [],
  buymarket: {
    marketprice: 0,
    marketvolume: 0,
    active: 0,
  },
  sellmarket: {
    marketprice: 0,
    marketvolume: 0,
    active: 0,
  },
};

export default function coinDBReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COIN_DATA:
      return {
        ...state,
        coins: { ...action.data },
        coins_loading: false,
        // currency_graph: { ...action.data.currency_graph },
      };
    case GET_CURRENCY_DATA:
      return {
        ...state,
        currency_graph: { ...action.data },
      };
    case SET_USER_BALANCE:
      return {
        ...state,
        wallet: [...action.data],
        wallet_loading: false,
      };

    case SET_WALLET_DETAILS:
      return {
        ...state,
        wallet_details: [...action.data],
        // wallet_loading: false,
      };

    case SET_USER_ORDER_PENDING:
      return {
        ...state,
        user_order_pending: [...action.data],
        pending_order_loading: false,
      };
    case SET_USER_ORDER_CLOSE:
      return {
        ...state,
        user_order_close: [...action.data],
        close_order_loading: false,
      };
    case SET_BUY_ORDER_BOOK:
      return {
        ...state,
        buy_order_book: action.data,
        order_book_loading: false,
      };
    case SET_SELL_ORDER_BOOK:
      return {
        ...state,
        sell_order_book: action.data,
        order_book_loading: false,
      };
    case SET_ORDER_BOOK:
      return {
        ...state,
        order_book_loading: false,
      };
    case SET_TRADE_HISTORY:
      return {
        ...state,
        trade_history: action.data,
        trade_loading: false,
      };
    case SET_USER_FAV_PAIRING:
      return {
        ...state,
        user_fav_pairing: [...action.data],
        user_fav_loading: false,
      };
    case SET_USER_FAV_CURRENCY:
      return {
        ...state,
        user_fav_currency: action.data,
      };
    case SET_USER_FAV_CURRENCY_RATE:
      return {
        ...state,
        user_fav_currency_rate: action.data,
      };
    case SET_PAIRED_CURRENCY_PRICE:
      return {
        ...state,
        paired_curency_price: action.data,
      };
    case BUY_MARKET_PRICE:
      return {
        ...state,
        buymarket: action.data,
      };
    case SELL_MARKET_PRICE:
      return {
        ...state,
        sellmarket: action.data,
      };
    default:
      return {
        ...state,
      };
  }
}
