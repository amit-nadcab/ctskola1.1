import React from "react";

export default function Plan() {
  return (
    <>
      <div className="container-fluid bg-light">
        <div className="row px-4 py-3">
          <div className="col-lg-3 col-md-6 col-sm-12 my-2">
            <img src="./img/image_banner/launchpad.png" className="img-fluid" />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 my-2">
            <img
              src="./img/image_banner/CRYPTOBANKING.png"
              className="img-fluid"
            />
          </div>

          <div className="col-lg-3 col-md-6 col-sm-12 my-2">
            <img
              src="./img/image_banner/NFT_MARKETPLACE.png"
              className="img-fluid"
            />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 my-2">
            <img
              src="./img/image_banner/blockchain_explorer.png"
              className="img-fluid"
            />
          </div>
        </div>
        <div className="row px-4 py-1 mx-5 text-center bg-light">
          <div className="col-12">
            <p style={{ fontWeight: "500" }}>
              BITFLASH initiate in market with exchange and its own token BTEX.
              Future planning of BITFLASH is gathering of trading community in
              BITFLASH Exchange
            </p>
            <p style={{ fontWeight: "500" }}>
              BITFLASH preparing own blockchain explorer that will launch mid
              feb 2022, with testnet and crypto wallet.
            </p>
            <p style={{ fontWeight: "500" }}>
              BTEX NFT Market Place for art tokenization will coming soon.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
