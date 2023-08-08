import { Input } from "../../../components/commonComponents/input-box";
const OTPdiv = (props) => {
  const {
    email,
    handleInput,
    setMailOtp,
    errors,
    handleCreateNewAccount,
    closeOtpModal,
    billPageloading,
  } = props;
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Enter OTP sent to{" "}
              <span style={{ fontSize: "16px", color: "#4f0b27" }}>
                {email}
              </span>
            </h5>
          </div>
          <div className="modal-body">
            <Input
              type="text"
              placeholder="One Time Password"
              name={"mailOtp"}
              minLength={4}
              maxLength={4}
              onChange={(e) => handleInput(e, "mailOtp", setMailOtp)}
              err={errors && errors.mailOtp}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              ref={closeOtpModal}
            >
              Close
            </button>
            <button
              type="button"
              disabled={billPageloading}
              className="btn btn-primary"
              onClick={() => {
                handleCreateNewAccount();
              }}
            >
              {billPageloading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPdiv;
