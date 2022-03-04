import React from 'react';
import ProfileSidebar from "./components/ProfileSidebar";
import Header from "./components/Header";

export default function PrivacyControl(props) {
    return (
        <div>
            <Header {...props}/>
            <div className="row p-1 " style={{ margin: 0, marginTop: "5em" }}>
                <div className="col-12 col-md-3 col-lg-3 p-0">
                <ProfileSidebar  {...props}/>
                </div>
                <div className="col-12 col-md-8 col-lg-8 p-0" style={{ marginTop: "12px" }} >
                    <div className="p-2 theme-color my-sidebox-shadow">
                        <div className="main-profile-pro d-flex align-items-center bb-1 h-25">
                            <i className="fa fa-shield ml-2 mr-2 mt-2"/>
                            <h4 className="px-2 font-weight-bold pt-3">Privacy Policy Control</h4>
                        </div>
                        <article>
                            <div className="col-md-10">
                                <div className="sanfont ">
                                    <div className="bold mb-2">You control your data, and we respect that.</div>
                                    <div className="text-secondary">For requests regarding: </div>
                                    <ul className="text-secondary mb-2">
                                        <li className="ml-3 "><i className="fa fa-minus mr-1 " aria-hidden="true"></i> Copy of your data</li>
                                        <li className="ml-3"><i className="fa fa-minus mr-1" aria-hidden="true"></i> Data export</li>
                                        <li className="ml-3"><i className="fa fa-minus mr-1" aria-hidden="true"></i> Data correction</li>
                                    </ul>
                                    <div className="text-secondary"> Please reach out to us. Our team will be happy to help you out.</div>
                                    <a href="#support" className="btn btn-secondary mt-2 mb-2 bold" > Contact Us</a>
                                </div>
                            </div>    
                        </article>
                    </div>
                </div>
            </div>
        </div>
    )
}
