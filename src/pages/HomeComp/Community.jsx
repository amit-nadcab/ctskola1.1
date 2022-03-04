import React, { useEffect } from "react";
import Banner from "./Banner";
import Footer from "./Footer";
import Header from "./Header";

export default function Community() {
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
      <Banner image={"bussiness_community.png"} />
      <Footer />
    </>
  );
}
