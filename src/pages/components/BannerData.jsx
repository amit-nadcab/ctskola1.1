import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { N_getWebsiteData, WebsiteURL } from "../redux/helpers/api_functions_new";
import "./BannerData.css";
import { useSelector } from "react-redux";
// import { bannerClose } from "../redux/actions/authActions";
// var ms = new Date(2022 - 1 - 22).getTime();

const NotificationBanner = (props) => {
    const [bannerStatus, setbannerStatus] = useState(false);
    const [bannerURL, setBannerurl] = useState('');
    const [showBanner, setShowBanner] = useState(false);
    const { last_banner_close } = useSelector((state) => state.AuthReducer);
    const url = WebsiteURL+'/theme/img/'
    useEffect(() => {
        let h24 = last_banner_close ? last_banner_close.getTime()+Number(24*60*60*1000) : false
        let today = new Date().getTime();
        if(h24 && h24 < today ){
            setShowBanner(false)
        }else{
            setShowBanner(true)
        }
        N_getWebsiteData()
        .then((data) => {
            if (data.status === 200) {
                let banner_status = data.params?.website?.banner_status
                let banner_url = data.params?.website?.banner_url
                if(banner_status && banner_url){
                    setBannerurl(banner_url);
                    setbannerStatus(banner_status);
                }
            }
        })
    }, '')
    return (
        <>
            {bannerStatus && showBanner ?
                <div className='notification--type-success'>
                    <div className="notification__body">
                        <img src={bannerURL  ? url+bannerURL : ''} alt="" />
                    </div>
                    <i className="notification__close cursor-pointer fa fa-times" 
                        onClick={() => { 
                            console.log("bannerClose() : ")
                            // bannerClose(); 
                            setbannerStatus(false);  
                        }}>
                    </i>
                </div>
            : null}
        </>

    );
};

// Notification.propTypes = {
//     type: React.PropTypes.oneOf(['success', 'error', 'notify']).isRequired,
// };

export default NotificationBanner;