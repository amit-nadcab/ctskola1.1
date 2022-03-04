import React, { useState } from "react";
import ProfileSidebar from "./components/ProfileSidebar";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import { NotificationManager } from "react-notifications";
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

export default function Reports(props) {
  const { webData } = useSelector((state) => state.websiteDBReducer);
  const { close_order_loading, user_order_close } = useSelector(
    (state) => state.coinDBReducer
  );
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState(new Date());
  const [all_report, allReport] = useState();
  const [downloadb, downloadB] = useState(0);


  const downloadReport = () => {
    console.log("user_order_close", user_order_close);
    console.log(startDate,endDate);
    if(close_order_loading == false) {
      // let raw = {
      //   user_id : user_id,
      //   start_date : startDate,
      //   end_date : endDate,
      // }
      allReport(user_order_close);
        downloadB(1);
      // getUserTradeHistory("get","user_trade_history",raw).then((data) => {
      //   console.log("data ", data);
      //     allReport(data);
      //     downloadB(1);
      //     NotificationManager.info("Report fetch successfull. Now you can Download the report.");
          
      // })
    } else {
      NotificationManager.info("Report Not Ready");
    }
   
    
  }

  return (
    <div>
      <Header {...props} />
      <div className="row p-1 " style={{ margin: 0, marginTop: "5em" }}>
        <div className="col-12 col-md-3 col-lg-3 p-0">
          <ProfileSidebar {...props} />
        </div>
        <div
          className="col-12 col-md-8 col-lg-8 p-0"
          style={{ marginTop: "12px" }}
        >
          <div className={`${webData.bg_color}` + " p-2 my-sidebox-shadow"} style={{ backgroundColor: webData.bg_color_code, }}>
            <div className="main-profile-pro d-flex align-items-center bb-1 h-25">
            <i className="fa fa-file ml-2 mr-2 mt-2"/>
              <h4 className="px-2 font-weight-bold pt-3">User Reports</h4>
            </div>
            <article>
              <div className="col-md-10 sanfont">
                  <div className="bold mb-2 ">Get your trading report on your email. </div>
                  <div className="col-md-4 mb-2">
                    <div className="bold">Select Start Date </div>
                    <ReactDatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                  </div>
                  <div className="col-md-4 mb-2">
                    <div className="bold">Select End Date </div>
                    <ReactDatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                  </div>
                  <div className="text-secondary">The report will include: </div>
                  <ul className="text-secondary mb-2">
                      <li className="ml-3"><i className="fa fa-minus mr-1" aria-hidden="true"></i>  Exchange Trades</li>
                      <li className="ml-3"><i className="fa fa-minus mr-1" aria-hidden="true"></i> P2P Trades</li>
                      <li className="ml-3"><i className="fa fa-minus mr-1" aria-hidden="true"></i> STF Trades</li>
                      <li className="ml-3"><i className="fa fa-minus mr-1" aria-hidden="true"></i> Current Coin Balance</li>
                      <li className="ml-3"><i className="fa fa-minus mr-1" aria-hidden="true"></i> Deposit and Withdrawals</li>
                      <li className="ml-3"><i className="fa fa-minus mr-1" aria-hidden="true"></i> Ledger History</li>
                      <li className="ml-3"><i className="fa fa-minus mr-1" aria-hidden="true"></i> Airdrops and other distributions</li>
                  </ul>
                    <button className="btn btn-secondary mt-2 mb-2 bold mr-3" onClick={(e) => {downloadReport()}}> Get Report</button>
                    {downloadb == 1 ? (
                      <>
                        <ReactHTMLTableToExcel id="test-table-xls-button" className="download-table-xls-button btn btn-secondary mt-2 mb-2 bold" table="table-to-xls" filename="tablexls" sheet="tablexls" buttonText="Download Trading Report" />
                      
                      </>
                    ) : ''}
                </div>
                  <div className="">
                    <table id="table-to-xls" className="h">
                        <tr>
                            <th>#</th>
                            <th>Price</th>
                            <th>Volume</th>
                            <th>Currency</th>
                            <th>Date</th>
                        </tr>
                        {all_report ? all_report.map((item,i) => (
                          <>
                            <tr>
                              <td>{++i}</td>
                              <td>{item.raw_price}</td>
                              <td>{item.volume}</td>
                              <td>{item.currency_type}/{item.compare_currency}</td>
                              <td>{new Date(Number(item.timestamp)).toLocaleString()}</td>
                            </tr>
                          </>
                        )):null}
                    </table>
                  </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
