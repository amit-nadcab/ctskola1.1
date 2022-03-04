// import React, { useEffect } from "react";
// import {useSelector} from "react-redux";
// import { NotificationManager } from "react-notifications";
// import Header from "./components/Index-components/Header";
// import { getAffilateTableData } from "./redux/helpers/api_functions";
// import {
//   getStacking,
//   getTokenPrice,
//   getUserId,
//   startNow,
//   sellToken,
//   withdrawStacking,
//   getUserSellIncome,
//   getTotalUser,
//   getTotalInvestment,
//   getTotalBuy,
// } from "./redux/helpers/contract_functions";
// import Chart from "./components/Chart";
// export default function AffiliateScreen(props) {
//   const [investment, setInvestment] = React.useState(0);
//   const [LevelData, setLevelData] = React.useState([]);
//   const [userId, setUserId] = React.useState(0);
//   const [reward, setReward] = React.useState(0);
//   const [totalIncom, setTotalIncom] = React.useState(0);
//   const [withdrawLoading, setWithdrawLoading] = React.useState(false);
//   const [currentPrice, setCurrentPrice] = React.useState();
//   const [sellLoading, setSellLoading] = React.useState(false);
//   const [totalUser, setTotalUser] = React.useState(0);
//   const [totalInvestment, setTotalInvestment] = React.useState(0);
//   const [totalBuyToken, setTotalBuyToken] = React.useState(0);
//   const { webData } = useSelector((state) => state.websiteDBReducer);
//   useEffect(() => {
//     getUserId()
//       .then((d) => setUserId(d))
//       .catch((e) => console.log(e));
//     getTokenPrice()
//       .then((d) => {
//         console.log("current", d);
//         setCurrentPrice(d);
//       })
//       .catch((e) => console.log(e));
//     getStacking()
//       .then((d) => {
//         console.log(d);
//         let invest = 0;
//         let re_ward = 0;
//         d[2]?.map((token) => (invest += parseInt(token) / 1e18));
//         d[4]?.map((re__ward) => (re_ward += parseInt(re__ward) / 1e18));
//         setInvestment(invest);
//         setReward(re_ward);
//         console.log("reward", re_ward);
//       })
//       .catch((e) => console.log(e));
//   });
//   useEffect(() => {
//     getAffilateTableData(window.userAddress)
//       .then((d) => {
//         setLevelData(d);
//         console.log("level", d);
//         getUserSellIncome()
//           .then((d) => {
//             console.log("sell income", d);
//             setTotalIncom(d);
//           })
//           .catch((e) => console.log(e));
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   }, [window.contract]);

//   useEffect(() => {
//     startNow();
//     getTotalUser()
//       .then((d) => setTotalUser(d))
//       .catch((e) => console.log(e));
//     getTotalInvestment()
//       .then((d) => setTotalInvestment(d))
//       .catch((e) => console.log(e));
//     getTotalBuy()
//       .then((d) => setTotalBuyToken(d))
//       .catch((e) => console.log(e));
//   }, []);
//   function copy_refferal() {
//     var copyText = document.getElementById("copy");
//     copyText.select();
//     copyText.setSelectionRange(0, 99999);
//     document.execCommand("copy");
//     NotificationManager.success("Refferal Link Copied!");
//   }
//   return (
//     <>
//       <Header />
//       <section className="about-us-area section-padding-100 clearfix" id="home">
//         <div className="container">
//           <div className="row mb-3">
//             <div className="offset-md-8  col-md-4 ">
//               <div className="input-group mb-3">
//                 <input
//                   id="copy"
//                   className="form-control"
//                   type="text"
//                   value={`${webData.website_name}/ref/${userId}`}
//                   readOnly
//                 />
//                 <div className="input-group-append">
//                   <button
//                     className="btn btn-primary"
//                     type="button"
//                     onClick={copy_refferal}
//                   >
//                     Copy
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-12 col-md-8 col-lg-8">
//               <div className="row my-2 ">
//                 <div className="pull-left col-6 col-md-4">
//                   <div className="input-group mb-3">
//                     <input
//                       className="form-control"
//                       type="text"
//                       placeholder=""
//                       value={totalIncom}
//                       readOnly
//                     />
//                     <div className="input-group-append">
//                       <button
//                         className="btn btn-danger"
//                         type="button"
//                         onClick={() => {
//                           setSellLoading(true);
//                           sellToken(totalIncom)
//                             .then((d) => {
//                               console.log(d);
//                               setSellLoading(false);
//                             })
//                             .catch((e) => {
//                               console.log(e);
//                               setSellLoading(false);
//                             });
//                         }}
//                       >
//                         {sellLoading ? (
//                           <div
//                             className="spinner-border mr-2"
//                             role="status"
//                             style={{ height: "1rem", width: "1rem" }}
//                           >
//                             <span className="sr-only">Loading...</span>
//                           </div>
//                         ) : null}
//                         Sell
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//                 {/* <div className="pull-right offset-2 offset-md-4 col-4">
//                   <div className="form-group">
//                     <select
//                       className="form-control custom-select"
//                       onChange={(e) =>
//                         setFilter(e.target.selectedOptions[0].value)
//                       }
//                       style={{
//                         background: "#1f2065",
//                         borderColor: "#1f2065",
//                         color: "#ccc",
//                       }}
//                     >
//                       <option value="0">All Level</option>
//                       <option value="1">Level 1</option>
//                       <option value="2">Level 2</option>
//                       <option value="3">Level 3</option>
//                       <option value="4">Level 4</option>
//                     </select>
//                   </div>
//                 </div> */}
//               </div>
//               <table className="table table-striped table-hover">
//                 <thead className="thead-dark">
//                   <tr>
//                     <th scope="col" className="align-center">
//                       Level #
//                     </th>
//                     <th scope="col" className="align-center">
//                       Total Member
//                     </th>
//                     <th scope="col" className="align-center">
//                       Income
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>Level 1</td>
//                     <td>
//                       {LevelData[0]?.total_member
//                         ? LevelData[0]?.total_member
//                         : 0}
//                     </td>
//                     <td>
//                       {LevelData[0]?.total_income
//                         ? Math.round(LevelData[0]?.total_income*100000)/100000
//                         : 0}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>Level 2</td>
//                     <td>
//                       {LevelData[1]?.total_member
//                         ? LevelData[1]?.total_member
//                         : 0}
//                     </td>
//                     <td>
//                       {LevelData[1]?.total_income
//                         ?  Math.round(LevelData[1]?.total_income*100000)/100000
//                         : 0}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>Level 3</td>
//                     <td>
//                       {LevelData[2]?.total_member
//                         ? LevelData[2]?.total_member
//                         : 0}
//                     </td>
//                     <td>
//                       {LevelData[2]?.total_income
//                         ?  Math.round(LevelData[2]?.total_income*100000)/100000
//                         : 0}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>Level 4</td>
//                     <td>
//                       {LevelData[3]?.total_member
//                         ? LevelData[3]?.total_member
//                         : 0}
//                     </td>
//                     <td>
//                       {LevelData[3]?.total_income
//                         ?  Math.round(LevelData[3]?.total_income*100000)/100000
//                         : 0}
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>Level 5</td>
//                     <td>
//                       {LevelData[4]?.total_member
//                         ? LevelData[4]?.total_member
//                         : 0}
//                     </td>
//                     <td>
//                       {LevelData[4]?.total_income
//                         ?  Math.round(LevelData[4]?.total_income*100000)/100000
//                         : 0}
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//             <div className="col-12 col-md-4 col-lg-4 mt-5 mt-md-0 mt-lg-0">
//               <h3 className="text-center mt-3 mt-md-0 mt-lg-0">Stacking</h3>
//               <div
//                 className="p-2"
//                 style={{ background: "#1f2065", borderRadius: 10 }}
//               >
//                 <div
//                   className="d-flex"
//                   style={{
//                     height: "45px",
//                     alignItems: "center",
//                     justifyContent: "space-around",
//                     borderBottom: "1px dotted #ffffff22",
//                     textAlign: "center",
//                   }}
//                 >
//                   <div className="d-title">Investment</div>
//                   <div className="d-value" style={{ fontSize: "13px" }}>
//                     {investment} BUSD
//                   </div>
//                 </div>
//                 <div
//                   className="d-flex"
//                   style={{
//                     height: "45px",
//                     alignItems: "center",
//                     justifyContent: "space-around",
//                     borderBottom: "1px dotted #ffffff22",
//                   }}
//                 >
//                   <div className="d-title">Reward</div>
//                   <div className="d-value" style={{ fontSize: "13px" }}>
//                     {Math.round(reward * 10000) / 10000} BUSD
//                   </div>
//                 </div>
//                 <div
//                   className="d-flex"
//                   style={{
//                     height: "45px",
//                     alignItems: "center",
//                     justifyContent: "space-around",
//                     borderBottom: "1px dotted #ffffff22",
//                   }}
//                 >
//                   <div className="d-title">Total Token</div>
//                   <div className="d-value" style={{ fontSize: "13px" }}>
//                     {Math.round((reward / currentPrice) * 10000) / 10000} BTF
//                   </div>
//                 </div>
//                 <div
//                   className="d-flex"
//                   style={{
//                     height: "45px",
//                     alignItems: "center",
//                     justifyContent: "space-around",
//                     borderBottom: "1px dotted #ffffff22",
//                   }}
//                 >
//                   <div className="d-title">Period</div>
//                   <div className="d-value" style={{ fontSize: "13px" }}>
//                     18 month
//                   </div>
//                 </div>
//                 <div className="d-flex justify-content-center align-items-center p-3">
//                   <button
//                     className="btn dream-btn btn-block"
//                     onClick={() => {
//                       setWithdrawLoading(true);
//                       withdrawStacking()
//                         .then((d) => {
//                           setWithdrawLoading(false);
//                         })
//                         .catch((e) => {
//                           console.log(e);
//                           setWithdrawLoading(false);
//                         });
//                     }}
//                   >
//                     {withdrawLoading ? (
//                       <div
//                         className="spinner-border mr-2"
//                         role="status"
//                         style={{ height: "1rem", width: "1rem" }}
//                       >
//                         <span className="sr-only">Loading...</span>
//                       </div>
//                     ) : null}
//                     Withdraw
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <div className="chartScreen container">
//         <div className="row mb-5">
//           <div className="col-12 col-md-8 col-lg-8 mb-5">
//             <Chart />
//           </div>
//           <div className="col-12 col-md-4 col-lg-4 mb-5">
//             <h3 style={{ textAlign: "center" }}>Statistics</h3>
//             <div
//               className="p-2"
//               style={{
//                 // background: "#1f2065",
//                 borderRadius: 10,
//                 // boxShadow: "0px 0px 1px 5px #483d8b4f",
//               }}
//             >
//               <div
//                 className="d-flex"
//                 style={{
//                   height: "70px",
//                   alignItems: "center",
//                   justifyContent: "space-around",
//                   borderBottom: "1px dotted #ffffff22",
//                   textAlign: "center",
//                   background: "linear-gradient(45deg, #0e2a53, #030239)",
//                 }}
//               >
//                 <div className="d-title">Total User </div>
//                 <div className="d-value" style={{ fontSize: "13px" }}>
//                   <i className="fa fa-users"></i> <span>{totalUser}</span>
//                 </div>
//               </div>
//               <div
//                 className="d-flex"
//                 style={{
//                   height: "70px",
//                   alignItems: "center",
//                   justifyContent: "space-around",
//                   borderBottom: "1px dotted #ffffff22",
//                   background: "linear-gradient(45deg, rgb(3, 2, 57), #00004a)",
//                 }}
//               >
//                 <div className="d-title">Total Investment</div>
//                 <div className="d-value" style={{ fontSize: "13px" }}>
//                   <i className="fa fa-dollar"></i> {Math.round(totalInvestment*1000)/1000} BUSD
//                 </div>
//               </div>
//               <div
//                 className="d-flex"
//                 style={{
//                   height: "70px",
//                   alignItems: "center",
//                   justifyContent: "space-around",
//                   borderBottom: "1px dotted #ffffff22",
//                   background:
//                     "linear-gradient(45deg, rgb(14, 42, 83), #030236)",
//                 }}
//               >
//                 <div className="d-title">Total Token Buy</div>
//                 <div className="d-value" style={{ fontSize: "13px" }}>
//                   {totalBuyToken} BTF
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
