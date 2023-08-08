import "bootstrap/dist/css/bootstrap.min.css";
import Styles from "./signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import {
  useLoginState,
  useSignUpState,
  useUserSetting,
} from "../../state-managers/cart-state";
import CompanyLogo from "../../assets/icons/logo-internal-150x150.png";
import { getEmailOtp, getPhoneOtp, signup } from "../../config/configService";
import { setAuthToken } from "../../services/storageService";
import { useScrollLock } from "../scrolLock";

// ///////////////////////////////////////

const UserSignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [mobileOtp, setMobileOtp] = useState("");
  const [pageError, setPageError] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  const setToken = useUserSetting((state) => state.setToken);
  const setUserInfo = useUserSetting((state) => state.setUserInfo);
  const setLoginPopUp = useLoginState((state) => state.setLoginPopup);
  const setSignupPopUp = useSignUpState((state) => state.setSignupPopup);
  const { lockScroll, unlockScroll } = useScrollLock();

  const navi = useNavigate();

  // ---------------

  async function handleEmailOtp() {
    if (email) {
      let r = await getEmailOtp({ email });

      if (r.issue) {
        setPageError("something went wrong!");
      } else {
        // console.log("otp received : ", r);
        setPageError("otp send please check your email");
      }
    } else {
      setPageError("Enter valid Email");
    }
  }

  async function handleMobileOtp() {
    if (number) {
      let r = await getPhoneOtp({ phone: number });
      if (r.issue) {
        setPageError("something went wrong!");
      } else {
        // console.log("otp received : ", r);
        setPageError("otp send please check your phone");
      }
    } else {
      setPageError("Enter valid Mobile number");
    }
  }

  async function handleCreateAccount(e) {
    try {
      setPageLoading(true);
      e.preventDefault();
      // console.log(
      //   // values,
      //   firstName,
      //   lastName,
      //   email,
      //   number,
      //   emailOtp,
      //   mobileOtp
      // );

      let data = {
        emailOtp,
        mobileOtp,
        data: { name: `${firstName} ${lastName}`, email, mobileNo: number },
      };

      let r = await signup(data);

      // console.log("user creation response : ", r);
      if (r.issue) {
        setPageError(r.message ? r.message : "something went wrong");
      } else {
        setToken(r.result ? r.result : false);
        setAuthToken(r.result ? r.result : false);
        setUserInfo(r.data ? r.data : null);
        navi("/");
        document.querySelector("form").classList.add("was-validated");
      }
    } catch (error) {
      // console.log("error in signup catch : ", error);
      setPageError("Something went wrong");
    } finally {
      setPageLoading(false);
    }
  }

  return (
    <div className={`${Styles.mainCont}`}>
      {pageLoading ? (
        <>
          <h1>Loading...</h1>
        </>
      ) : (
        <>
          {pageError ? (
            <>
              <h1>{pageError}</h1>
            </>
          ) : (
            <></>
          )}
          <div className="row mx-auto border border-1 rounded-2  py-3 bg-light position-relative">
            <button
              className={`${Styles.closeIcon} btn btn-sm btn-outline-danger`}
              style={{ position: "absolute", right: "5%" }}
              onClick={() => {
                setSignupPopUp(false);
                unlockScroll();
              }}
            >
              X
            </button>
            <div className="col-xs-10 col-md-9 col-lg-9 col-xl-8 py-xl-2 m-auto">
              <div className={`${Styles.logoCont} mx-auto  text-center`}>
                <img src={CompanyLogo} alt="FS Logo" />
              </div>
              <p className={`text-center col-12 fs-4 ${Styles.loginHead}`}>
                Sign Up for Freeskout
                <span className={Styles.loginHeadSpan}> Shop.</span>
              </p>
              <form>
                <div className={`input-group mb-2`}>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="First Name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={`form-control ${Styles.inputCls}`}
                  />
                  <input
                    type="text"
                    id="lastName"
                    required
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={`form-control ${Styles.inputCls}`}
                  />
                </div>
                <div className={`input-group mb-2`}>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value.toLocaleLowerCase())
                    }
                    className={`form-control ${Styles.inputCls}`}
                  />
                  <span
                    className={`input-group-text ${Styles.otpText}`}
                    onClick={handleEmailOtp}
                  >
                    Send OTP
                  </span>
                </div>
                <div className={`input-group mb-2`}>
                  <input
                    type="number"
                    id="mobile"
                    placeholder="Mobile"
                    required
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className={`form-control ${Styles.inputCls}`}
                  />
                  <span
                    className={`input-group-text ${Styles.otpText}`}
                    onClick={handleMobileOtp}
                  >
                    Send OTP
                  </span>
                </div>
                <div className={`input-group mb-2`}>
                  <input
                    type="Number"
                    id="emailOtp"
                    placeholder="Email OTP"
                    required
                    length={"4"}
                    value={emailOtp}
                    onChange={(e) => setEmailOtp(e.target.value)}
                    className={`form-control ${Styles.inputCls}`}
                  />
                </div>
                <div className={`input-group mb-2`}>
                  <input
                    type="Number"
                    id="mobileOtp"
                    placeholder="Mobile Otp"
                    required
                    length={"4"}
                    value={mobileOtp}
                    onChange={(e) => setMobileOtp(e.target.value)}
                    className={`form-control ${Styles.inputCls}`}
                  />
                </div>
                <p className={`fs-6 fw-light lh-sm mt-3  ${Styles.tcCont}`}>
                  We will send OTP to mobile & mail for verification. Message
                  and Data rates may apply.
                </p>
                <button
                  className={`btn btn-primary col-12 mt-1 ${Styles.loginBtn}`}
                  onClick={handleCreateAccount}
                >
                  Create Account
                </button>
              </form>
              <p className={`fs-6 fw-light lh-sm mt-3 ${Styles.tcCont}`}>
                By continuing, you agree to our
                <a href="#" className="link-primary  text-decoration-none">
                  {" "}
                  Conditions of Use{" "}
                </a>
                and
                <a href="#" className="link-primary  text-decoration-none">
                  {" "}
                  Privacy Notice {""}
                </a>
              </p>
              {/* <div
                className={`col-12 d-flex justify-content-evenly align-items-center my-3 ${Styles.dividerDiv}`}
              >
                <div className={`col-5 ${Styles.dividerLSideDiv}`}></div>
                <span className="fs-6">OR</span>
                <div className={`col-5 ${Styles.dividerRSideDiv}`}></div>
              </div>
              <button
                className={`btn btn-secondary col-12 mt-1 ${Styles.loginBtn}`}
                onClick={() => {
                  setLoginPopUp(true);
                  setSignupPopUp(false);
                }}
              >
                Log In
              </button> */}
            </div>
          </div>
        </>
      )}
    </div>
  );

  // -----
};

export default UserSignUp;
