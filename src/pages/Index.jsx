import React, { useEffect } from "react";

import Banner from "./HomeComp/Banner";
import MarketTrend from "./HomeComp/MarketTrend";
import StartTrade from "./HomeComp/StartTrade";
import Header from "./HomeComp/Header";
import Footer from "./HomeComp/Footer";

export default function Index(props) {
  useEffect(() => {
    var Tawk_API = Tawk_API || {},
      Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/61826b076bb0760a4940ed61/1fjin45kt";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []);

  return (
    <div className="bg-white">
      <Header />
      <Banner />
      <MarketTrend />
      <StartTrade />
      <Footer />
    </div>
  );
}
