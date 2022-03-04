import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getPairedCoin } from '../../redux/helpers/api_functions';


export default function FAQ(props) {
  const [cst_coin, CSTCoin] = useState([]);
  const { token } = useSelector((state) => state.AuthReducer.user);
  useEffect(() => {
      getPairedCoin("get","cst_coin",token).then((data) => {
          CSTCoin(data);
      })
  }, [])
  return (
    <div className="faq-timeline-area section-padding-0-85" id="faq">
      <div className="container">
        <div className="section-heading text-center">
          {/* <!-- Dream Dots --> */}
          <div
            className="dream-dots justify-content-center fadeInUp"
            data-wow-delay="0.2s"
          >
            <span>Token FAQ</span>
          </div>
          <h2 className="fadeInUp" data-wow-delay="0.3s">
            {" "}
            Frequently Questions
          </h2>
          {/* <p className="fadeInUp" data-wow-delay="0.4s">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis
            accumsan nisi Ut ut felis congue nisl hendrerit commodo.
          </p> */}
        </div>
        <div className="row align-items-center">
          <div className="col-12 col-lg-6 offset-lg-0 col-md-8 offset-md-2 col-sm-12">
            <img
              src="/img/svg/faq.svg"
              alt=""
              className="center-block img-responsive"
            />
          </div>
          <div className="col-12 col-lg-6 col-md-12">
            <div className="dream-faq-area mt-s ">
              <dl style={{ marginBottom: "0" }}>
                {/* <!-- Single FAQ Area --> */}
                <dt className="wave fadeInUp" data-wow-delay="0.2s">
                  What are the objectives of this Token?
                </dt>
                <dd className="fadeInUp" data-wow-delay="0.3s">
                  <p>
                    The prime objective of {cst_coin.currency_coin} Community is to provide an easy
                    to use and safe trading environment through effective tools
                    for risk and profit management. We will offer support and
                    allow users to create personalized trading strategies. As
                    the crypto market grows, the user base also increases. We
                    wish to serve this ever-growing section and meet their
                    demands. The current cryptocurrency exchanges have outdated
                    interfaces, inefficient tools which are confusing, and there
                    is also a lack of customer support. Thus, it does not
                    empower amateur traders to trade smartly coupled with the
                    lack of understanding of the traditional exchanges.
                  </p>
                </dd>
                {/* <!-- Single FAQ Area --> */}
                <dt className="wave fadeInUp" data-wow-delay="0.3s">
                  What is the best features and services we deiver?
                </dt>
                <dd>
                  <p>
                    The blockchain space has undoubtedly developed a lot in the
                    short time span since its existence. Numerous exchanges have
                    emerged which allow trading of cryptocurrencies in different
                    ways. However, significant challenges still remain to be
                    solved.
                  </p>
                </dd>
                {/* <!-- Single FAQ Area --> */}
                <dt className="wave fadeInUp" data-wow-delay="0.4s">
                  Why this ICO important to me?
                </dt>
                <dd>
                  <p>
                    Typical financial markets are controlled by long-established
                    players and are mostly constructed in a too complicated
                    manner to adopt emerging technologies. The prospect of
                    integrating emerging technologies appears attractive, while
                    the challenges associated are huge. Technologydriven systems
                    can certainly provide the same business while being more
                    efficient.
                  </p>
                </dd>
                {/* <!-- Single FAQ Area --> */}
                <dt className="wave fadeInUp" data-wow-delay="0.5s">
                  how may I take part in and purchase this Token?
                </dt>
                <dd>
                  <p>
                    By Using DAPP Browser like Metamask , Trust Wallet , Math
                    Wallet and by Wallet connect. You will interact with system
                    and BNB smartchain currency used for purchasing.
                  </p>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
