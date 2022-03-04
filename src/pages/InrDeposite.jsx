import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NotificationManager } from "react-notifications";
import { N_addBinficiary, N_getBank } from "./redux/helpers/api_functions_new";

export default function InrDeposite(props) {
  const [loading, setLoading] = React.useState(true);
  const [accountNo, setAccountNo] = React.useState();
  const [reaccountNo, setReAccountNo] = React.useState();
  const [account_name, setAccountName] = React.useState();
  const [selectedBank, setSelectedBank] = React.useState();
  const [bankIFCS, setIFSC] = React.useState([]);
  const [banklist, setBank] = React.useState();
  const [accountType, setAccountType] = React.useState();
  const { user } = useSelector((state) => state.AuthReducer);
  useEffect(() => {
    N_getBank(user?.params ? user.params.user_id : user.user_id)
      .then((d) => {
        if (d.status === 200) {
          setBank(d.params.bank);
          setLoading(false);
        }
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (accountNo !== reaccountNo) {
      NotificationManager.error("Account Number not matched!");
    } else {
      if (accountNo == "" && bankIFCS == "") {
        NotificationManager.error("Fill all field!");
      } else {
        setLoading(true);
        N_addBinficiary(
          accountNo,
          reaccountNo,
          selectedBank,
          account_name,
          bankIFCS,
          accountType,
          user?.params ? user.params.user_id : user.user_id
        ).then((d) => {
          console.log("AddBenificiery", d);
          if (d.status == 200) {
            window.location.reload();
            NotificationManager.info(d.message);
          } else {
            NotificationManager.error(d.message);
          }
          setLoading(false);
        });
      }
    }
  };
  return (
    <>
      {/* <Header {...props} /> */}
      <div
        className=""
        style={{
          backgroundColor: "#ffffff00",
          borderRadius: "5px",
          boxShadow: "0 2px 5px rgb(0 0 0 / 30%)",
          overflow: "hidden",
          maxWidth: "100%",
          position: "relative",
          width: "80%",
          margin: "20px auto",
        }}
      >
        <div className="">
          <div className="row">
            <div className="col-12 col-md-12 col-sm-12">
              <form
                className="signupform mdfthemetxt"
                method="post"
                id="loginForm"
                autoComplete="off"
                onSubmit={onSubmit}
              >
                <div>
                  <h5>Add your bank account details for IMPS payments</h5>
                </div>
                <div className="form-group">
                  <label for="exampleInputEmail1">ACCOUNT NUMBER</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Account no"
                    value={accountNo}
                    onChange={(e) =>
                      setAccountNo(
                        e.target.value
                          .replace(/[^0-9.]/g, "")
                          .replace(/(\..*?)\..*/g, "$1")
                      )
                    }
                  />
                  {/* <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small> */}
                </div>

                <div className="form-group">
                  <label for="exampleInputEmail1">RE-ACCOUNT NUMBER</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Re-Enter Account no"
                    value={reaccountNo}
                    onChange={(e) =>
                      setReAccountNo(
                        e.target.value
                          .replace(/[^0-9.]/g, "")
                          .replace(/(\..*?)\..*/g, "$1")
                      )
                    }
                  />
                  {/* <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small> */}
                </div>
                <div className="form-group">
                  <label for="exampleInputEmail1">Account Holder Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Account Name"
                    value={account_name}
                    onChange={(e) => setAccountName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label for="exampleInputEmail1">BANK NAME</label>
                  <select
                    className="form-control text-dark"
                    onChange={(e) => setSelectedBank(e.target.value)}
                  >
                    <option selected>Please Select</option>
                    {banklist?.map((d) => (
                      <option className="text-dark">{d.bank_name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label for="exampleInputEmail1">ACCOUNT TYPE</label>
                  <select
                    className="form-control text-dark"
                    onChange={(e) => setAccountType(e.target.value)}
                  >
                    <option selected className="text-dark">
                      Please Select
                    </option>
                    <option className="text-dark">Current</option>
                    <option className="text-dark">Saving</option>
                  </select>
                </div>

                <div className="form-group">
                  <label for="exampleInputEmail1">BANK IFSC</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Bank IFSC"
                    value={bankIFCS}
                    onChange={(e) => setIFSC(e.target.value)}
                  />
                </div>
                <button type="submit" className="reg_btn">
                  {loading ? (
                    <i className="loading-icon fas fa-spinner fa-spin mr-2"></i>
                  ) : null}
                  <span id="reg">SUBMIT</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
