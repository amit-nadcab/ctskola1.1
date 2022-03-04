import React, {useState} from 'react';

const Modal = (props) => {
    const [token, setToken] = useState()
    const [isToken, setIsToken] = useState(0);
    if (props.show) return;
    else
      return (
        <div>
            <div id="modal" className="modal" role="dialog">
              <div className="modal-dialog">
                  <div className="modal-content" style={{background:'#085ab9'}}>
                      <form>
                          <div className="modal-header">
                              <h3 id="msg"> {isToken === 2? 'Google App':isToken === 1?'Mobile':null} Authentication</h3>
                              <button type="button" className="close" data-dismiss="modal">&times;</button>
                          </div>
                              <div className="modal-body center">
                                  <div className={`signupform-control`}>
                                    <label htmlFor="user_password">Authenticator Code</label>
                                    <input
                                      type="text"
                                      name="user_otp"
                                      id="user_otp"
                                      value={token}
                                      onChange={(e) => setToken(e.target.value)}
                                      required=""
                                      placeholder="Token"
                                    />
                                    <i className="fas fa-check-circle"></i>
                                    <i className="fas fa-exclamation-circle"></i>
                                    <small></small>
                                  </div>
                              </div>
                            <div className="modal-footer">
                              {/* <button type="submit" className="btn btn-primary" onClick={(e) => {setAuthentication(e,1)}}><i className="loading-icon fas fa-spinner fa-spin" id="loader" style={{display:'none'}}></i>Yes</button> */}
                              <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => {props.onClose()}}>Close</button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
        </div>
    )
}

export default Modal
