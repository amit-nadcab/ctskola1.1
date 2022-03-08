import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { BsApple } from 'react-icons/all'
import { DiAndroid } from 'react-icons/all'
import { FaGooglePlay } from 'react-icons/all'
import { DiWindows } from 'react-icons/all'
import { FaLinux } from 'react-icons/all'

export default function Downloads() {

    useEffect(() => {
        document.title = "Downloads"
    }, [])
    return (
        <>
            <Header />
            <div className='wrap-downloads py-5'>
                <div className='row container py-5 mx-auto'>
                    <div className="col-md-6 col-12 py-5 text-light">

                        <h2>Trade. Anywhere.</h2>
                        <p>All the power of CTSKOLA's cryptocurrency exchange, in the palm of your hand. Download the CTSKOLA mobile crypto trading app today</p>
                        <div>
                            <button type="button" className="btn btn-lg download-button p-2"><BsApple />  Download from App Store</button>
                        </div>
                        <div>
                            <button type="button" className="btn btn-lg download-button p-2"><DiAndroid />  Download for Android</button>
                        </div>
                        <div>
                            <button type="button" className="btn btn-lg download-button p-2"><FaGooglePlay />  Download from Google play</button>
                        </div>

                    </div>
                    <div className="col-md-6 col-12 d-flex justify-content-center align-items-center">

                        <img src="../img/Ctskola_mobile.png" alt="" className='downloads-img1' />
                    </div>
                </div>

                <div className='row container py-5 mx-auto'>

                    <div className="col-md-6 col-12 d-flex justify-content-center align-items-center">

                        <img src="../img/ctskola_black.png" alt="" className='downloads-img1' />
                    </div>
                    <div className="col-md-6 col-12 py-5 text-light">

                        <h2>Desktop</h2>
                        <p>Powerful crypto trading platform for those who mean business. The CTSKOLA crypto trading experience, tailor-made for your Windows or MacOS device.</p>
                        <div>
                            <button type="button" className="btn btn-lg download-button p-2"><BsApple />  Download for Mac OS</button>
                        </div>
                        <div>
                            <button type="button" className="btn btn-lg download-button p-2"><DiWindows />  Download for Windows</button>
                        </div>
                        <div>
                            <button type="button" className="btn btn-lg download-button p-2"><FaLinux /> Linux</button>
                        </div>

                    </div>
                </div>

                <div className='row container py-5 mx-auto'>
                    <div className="col-md-6 col-12 py-5 text-light">

                        <h2>Integration with ease</h2>
                        <p>The CTSKOLA API is designed to provide an easy and efficient way to integrate your trading application into our platform.</p>
                       {/*  <div>
                            <button type="button" className="btn btn-lg download-button p-3"><BsApple />  Download from App Store</button>
                        </div>
                        <div>
                            <button type="button" className="btn btn-lg download-button p-3"><DiAndroid />  Download for Android</button>
                        </div>
                        <div>
                            <button type="button" className="btn btn-lg download-button p-3"><FaGooglePlay />  Download from Google play</button>
                        </div> */}

                    </div>
                    <div className="col-md-6 col-12 d-flex justify-content-center align-items-center">

                        <img src="../img/ctskola_laptop.png" alt="" className='downloads-img1' />
                    </div>
                </div>

                <div className='row container py-5 mx-auto'>

                    <div className="col-md-6 col-12 d-flex justify-content-center align-items-center">

                        <img src="../img/Ctskola_mobile.png" alt="" className='downloads-img1' />
                    </div>
                    <div className="col-md-6 col-12 py-5 text-light">

                        <h2>CTSKOLA Authenticator</h2>
                        <p>CTSKOLA authenticator generates 2-Step verification codes. Increase your account safety by downloading the CTSKOLA authenticator for a second step of verification.</p>
                        <div>
                            <button type="button" className="btn btn-lg download-button p-2"><BsApple />  Download for iPhone</button>
                        </div>
                        <div>
                            <button type="button" className="btn btn-lg download-button p-2"><DiWindows />  Download for android</button>
                        </div>
                        
                    </div>
                </div>


            </div>
            <Footer />
        </>
    )
}