import React, { useEffect } from "react";
import Banner from "./Banner";
import Footer from "./Footer";
import Header from "./Header";

export default function NftMarketPlace() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
  return (
    <>
      <Header />
      <Banner image={"nft_marketplace_banner.png"} />
      <div></div>
      <Footer />
    </>
  );
}
