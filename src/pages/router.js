import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthKyc from "./AuthKyc";
import CurrencyPreference from "./currencyPreference";
import Forget from "./Forget";
import Index from "./Index";
import Login from "./Login";
import OTP from "./OTP";
import UpdatePassword from "./UpdatePassword";
import FOTP from "./FOTP";
import Register from "./Register";
import Security from "./Security";
import UserKYC from "./UserKyc";
import UserPayment from "./UserPayment";
import UserReferral from "./UserReferral";
import Welcome from "./Welcome";
import Exchange from "./Exchange";
import UserProfile from "./UserProfile";
import Wallet from "./Wallet";
import GetNotifi from "./Notification";
import Fees from "./Fees";
import TwoFA from "./TwoFA";
import ActivityLog from "./ActivityLog";
import Reports from "./Reports";
import PrivacyControl from "./PrivacyControl";
import Cupon from "./Cupon";
import UpcomingProgram from "./UpcomingProgram";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserBalance,
  getUserOrder,
  viewFav,
} from "./redux/actions/coinDBAction";
import { getWebsite } from "./redux/actions/websiteDBAction";
import InrDeposite from "./InrDeposite";
import MobileVerification from "./MobileVerification";
import ConfimationPopup from "./components/ConfimationPopup";
import AffiliateScreen from "./AffiliateScreen";

import Authenticator from "./Authenticator";
import P2P from "./P2P";
import NftMarketPlace from "./HomeComp/NftMarketPlace";
import BtextLaunched from "./HomeComp/BtextLaunched";
import BtextCryptoBank from "./HomeComp/BtextCryptoBank";
import BtextExplorer from "./HomeComp/BtextExplorer";
import About from "./HomeComp/About";
import Career from "./HomeComp/Career";
import BusinessContact from "./HomeComp/BusinessContact";
import Community from "./HomeComp/Community";
import Notice from "./Notice";
import Success from "./Success";
import createSocketClient from "./redux/helpers/socket";
import {
  GET_COIN_DATA,
  GET_CURRENCY_DATA,
  SET_BUY_ORDER_BOOK,
  SET_SELL_ORDER_BOOK,
  SET_TRADE_HISTORY,
} from "./redux/constant";
import Account_Authenticator from "./Account_Authenticator";
import KYCVerification from "./KYCVerification";
import EditProfile from "./EditProfile";

//privacy
import Privacy from "./HomeComp/Privacy";
import TermsConditions from "./HomeComp/Terms&Conditions";

export default function Router(props) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.AuthReducer.user);
  const { isLoggedIn } = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    const socket = new createSocketClient("kujgwvfq-a-ghosttown-z-1fhhup0p6");
    socket.on("cmc_updated", (res) => {
      // console.log("res cmc: ", res);
      if (res[0]?.raw_current_price_inr) {
        dispatch({ type: GET_COIN_DATA, data: res, coin_loading: false });
      }
      dispatch({
        type: GET_CURRENCY_DATA,
        data: { currency_coin: Date.now(), currency_price: 2 },
      });
    });
    socket.on("buy_order_updated", (res) => {
      // console.log("buy_order_updated: ", res);
      dispatch({
        type: SET_BUY_ORDER_BOOK,
        data: res,
        order_book_loading: false,
      });
    });
    // socket.on("welcome", (msg) => {
    //   console.log("Welcome message", msg);
    // });
    socket.on("sell_order_updated", (res) => {
      // console.log("sell_order_updated: ", res);
      dispatch({
        type: SET_SELL_ORDER_BOOK,
        data: res,
        order_book_loading: false,
      });
    });
    socket.on("order_history_updated", (res) => {
      // console.log("order_history_updated", res);
      dispatch({ type: SET_TRADE_HISTORY, data: res, trade_loading: false });
    });
    // socket.on("connect", () => {
    //   console.log("connected!");
    // });
    // socket.on("error", (eror) => {
    //   console.log("eror", eror);
    // });
    // dispatch(getData());
    dispatch(getWebsite());
    // dispatch(getOrderBook("btc","inr",()=>{}))
    if (isLoggedIn && token) dispatch(getUserBalance(token));
    if (isLoggedIn && token) dispatch(getUserOrder(token));
    if (isLoggedIn && token) dispatch(viewFav(token));
    // if (isLoggedIn && token) {
    //   crypto_function(token).then((d)=>{
    //     if(d.status===-5)
    //     dispatch(user_logout(() => document.location.reload()));
    //   });
    //   setInterval(() => crypto_function(token), 30000);
    // }
  }, [token]);

  return (
    <Switch>
      <Route exact path="/" component={Index} />
      <Route exact path="/ref/:id?" component={Index} />
      <Route exact path="/login" component={Login} />
      <Route path="/create/:id?" component={Register} />
      <Route path="/otp" component={OTP} />
      <Route path="/security" component={Security} />
      <Route path="/welcome" component={Welcome} />
      <Route path="/edit_profile" component={EditProfile} />
      <Route path="/kyc" component={AuthKyc} />
      <Route path="/update-password" component={UpdatePassword} />
      <Route
        exact
        path="/forget"
        render={(props) =>
          !isLoggedIn ? <Forget {...props} /> : <Redirect to="/" />
        }
      />
      <Route
        exact
        path="/forget-password"
        render={(props) =>
          !isLoggedIn ? <FOTP {...props} /> : <Redirect to="/" />
        }
      />
      <Route path="/exchange/:id?" component={Exchange} />
      <Route path="/p2p/:id?" component={P2P} />
      <Route path="/authenticator" component={Authenticator} />
      <Route
        path="/account_authenticator"
        render={(props) =>
          isLoggedIn ? (
            <Account_Authenticator {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
      <Route
        path="/profile"
        render={(props) =>
          isLoggedIn ? <UserProfile {...props} /> : <Redirect to="/login" />
        }
      />
      <Route
        path="/currency_preference"
        render={(props) =>
          isLoggedIn ? (
            <CurrencyPreference {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
      <Route
        path="/activity_log"
        render={(props) =>
          isLoggedIn ? <ActivityLog {...props} /> : <Redirect to="/login" />
        }
      />
      <Route path="/referral" component={UserReferral} />
      <Route path="/notice/:id?" component={Notice} />
      <Route path="/success" component={Success} />
      <Route path="/payment_option" component={UserPayment} />
      <Route path="/user_kyc" component={UserKYC} />
      <Route path="/notification" component={GetNotifi} />
      <Route path="/fees" component={Fees} />
      <Route
        path="/2fa"
        render={(props) =>
          isLoggedIn ? <TwoFA {...props} /> : <Redirect to="/login" />
        }
      />
      <Route
        path="/download_report"
        render={(props) =>
          isLoggedIn ? <Reports {...props} /> : <Redirect to="/login" />
        }
      />
      <Route path="/privacy_control" component={PrivacyControl} />
      <Route path="/coupan" component={Cupon} />
      <Route path="/upcoming_program" component={UpcomingProgram} />
      <Route path="/mobile-verify/:action?" component={MobileVerification} />
      <Route path="/kyc-verify" component={KYCVerification} />
      <Route
        path="/wallet"
        render={(props) =>
          isLoggedIn ? <Wallet {...props} /> : <Redirect to="/login" />
        }
      />
      <Route
        path="/inr-deposit"
        render={(props) =>
          isLoggedIn ? <InrDeposite {...props} /> : <Redirect to="/login" />
        }
      />
      <Route path="/transaction/:status/:msg" component={ConfimationPopup} />
      <Route path="/affiliate" component={AffiliateScreen} />
      <Route path="/nftmarketplace" component={NftMarketPlace} />
      <Route path="/btextlaunched" component={BtextLaunched} />
      <Route path="/btextcryptobank" component={BtextCryptoBank} />
      <Route path="/btextexplorer" component={BtextExplorer} />
      <Route path="/about" component={About} />
      <Route path="/career" component={Career} />
      <Route path="/businesscontact" component={BusinessContact} />
      <Route path="/community" component={Community} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms_&_conditions" component={TermsConditions} />
    </Switch>
  );
}
