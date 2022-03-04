import React, { useEffect } from "react";
import ProfileSidebar from "./components/ProfileSidebar";
import Header from "./components/Header";
import { N_getSupportedCurrency } from "./redux/helpers/api_functions_new";
import { useDispatch, useSelector } from "react-redux";
import {
  setFavCurrency,
  setFavCurrencyRate,
} from "./redux/actions/coinDBAction";
import Loader from "./components/Loader";
export default function CurrencyPreference(props) {
  const [loading, setLoading] = React.useState(true);
  const [currency, setCurrency] = React.useState([]);
  const { user } = useSelector((state) => state.AuthReducer);
  const activeCurrency ="INR"
  useEffect(() => {
    N_getSupportedCurrency(user?.params ? user.params.user_id : user.user_id)
      .then((d) => {
        setCurrency(d);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [user]);
  return (
    <>
      <Header {...props} />
      <div className="row p-1 " style={{ margin: 0, marginTop: "5em" }}>
        <div className="col-12 col-md-3 col-lg-3 p-0">
          <ProfileSidebar {...props} />
        </div>
        <div
          className="col-12 col-md-8 col-lg-8 p-0"
          style={{ marginTop: "12px" }}
        >
          <div className="p-1 theme-color my-sidebox-shadow">
            <div className="main-profile-pro d-flex align-items-center bb-1 h-25">
              <i className="fa fa-usd ml-2 mr-2 mt-2" />
              <h4 className="px-2 font-weight-bold pt-3">
                Currency Preference
              </h4>
            </div>
            <div className="bb-1" style={{ padding: "10px" }}>
              Select your preferred display currency for all markets
            </div>
            {!loading ? (
              <article>
                {currency?.map((d, index) => {
                  return (
                    <CurrencyCard
                      name={d.currency_name}
                      symbol={d.currency_coin}
                      icon={d.currency_logo}
                      key={index}
                      active={activeCurrency === d.currency_coin}
                    />
                  );
                })}
              </article>
            ) : <Loader />}
          </div>
        </div>
      </div>
    </>
  );
}

function CurrencyCard(props) {
  const dispatch = useDispatch();
  const { user_fav_currency, coins } = useSelector(
    (state) => state.coinDBReducer
  );
  return (
    <div
      className="d-flex bb-1 align-items-center row p-0 m-0"
      style={{ padding: "10px" }}
    >
      <div className="d-flex col-3">
        <div className="p-2">
          <img src={`${props.icon}`} height="25" width="25" alt="" />
        </div>
        <div className="p-1">
          <h5 className="pt-1">
            {props.name} ({props.symbol})
          </h5>
        </div>
      </div>
      <div className="offset-8 col-1">
        <input
          type="radio"
          name="currency"
          id="curreny"
          checked={props.symbol === user_fav_currency.toUpperCase()}
          onChange={() => {
            dispatch(
              setFavCurrency(props.symbol, () => {
                dispatch(
                  setFavCurrencyRate(
                    coins[props.symbol.toUpperCase() + "INR"] !== undefined
                      ? coins[props.symbol.toUpperCase() + "INR"].current_price
                      : 1,
                    () => {}
                  )
                );
              })
            );
          }}
        />
      </div>
    </div>
  );
}
