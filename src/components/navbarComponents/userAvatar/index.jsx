import { FaUserAlt } from "react-icons/fa";
import { Nav } from "react-bootstrap";
import Styles from "./index.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import {
  useLoginState,
  useSignUpState,
  useUserSetting,
} from "../../../state-managers/cart-state";
import { useEffect } from "react";
import { useScrollLock } from "../../scrolLock";
import { Input } from "../../commonComponents/input-box";
import MyToast from "../../toast";
import { toast } from "react-toastify";
import { setAuthToken } from "../../../services/storageService";
import { getLoginOtp, loginApi } from "../../../config/configService";

const UserAvatar = () => {
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [pageError, setPageError] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [sentOtpn, setSentOtpn] = useState(false);
  const [display, setDisplay] = useState(false);
  const [otp, setOtp] = useState("");
  const [isDropdownShown, setisDropdownShown] = useState(false);

  const tNc = useRef("");

  const userInfo = useUserSetting((state) => state.info);
  const userToken = useUserSetting((state) => state.token);
  const setUserInfo = useUserSetting((state) => state.setUserInfo);
  const setToken = useUserSetting((state) => state.setToken);
  const setLoginPopUp = useLoginState((state) => state.setLoginPopup);
  const setSignupPopUp = useSignUpState((state) => state.setSignupPopup);

  const { lockScroll, unlockScroll } = useScrollLock();

  const navi = useNavigate();

  let a;
  let b;
  if (userToken) {
    a = userInfo.name;
    b = a.split(" ")[0];
  }

  function handleError(key, val) {
    if (!key || !key.length) return;
    setErrors((cur) => {
      let next = { ...cur };
      next[key] = val;
      return next;
    });
  }
  // --------
  function handleInput(e, errorKey, setterFunction) {
    if (errors[errorKey]) {
      setErrors((cur) => {
        let next = { ...cur };
        delete next[errorKey];
        return next;
      });
    }
    setterFunction(e.target.value);
  }
  const handleOtpValidate = () => {
    let validate = false;
    if (!otp) {
      validate = false;
      handleError("otp", "Filed can't be Empty");
    } else if (isNaN(otp)) {
      validate = false;
      handleError("otp", "Otp Should be a Number");
    } else {
      validate = true;
    }
    return validate;
  };
  const handleTncValidate = () => {
    let validate = false;
    if (tNc.current.checked) {
      validate = true;
    } else {
      validate = false;
      alert("Please agree to terms and condition");
    }
    return validate;
  };

  async function handleOtpSend() {
    setPageLoading(true);
    try {
      if (email) {
        const r1 = await getLoginOtp({ email });
        // console.log("user avtar received login otp : ", r1);
        if (r1.issue) {
          toast.error(r1.message ? r1.message : "something went wrong");
        } else {
          toast.info("check your email for otp");
          setSentOtpn(true);
        }
      } else {
        if (!email) {
          handleError("email", "Filed can't be Empty");
        }
      }
    } catch (error) {
      toast.error("Some Error Occoured");
      // console.log(error);
    } finally {
      setPageLoading(false);
    }
  }

  async function handleLogin(e) {
    if (handleOtpValidate()) {
      if (handleTncValidate()) {
        setPageLoading(true);
        try {
          if (email && otp) {
            const r1 = await loginApi({ email, otp });
            // console.log("user-avatar received login data : ", r1);
            if (r1.issue) {
              toast.error(r1.message ? r1.message : "something went wrong");
            } else {
              setToken(r1.result ? r1.result : false);
              setUserInfo(r1.data ? r1.data : null);
              setAuthToken(r1.result ? r1.result : false);
              unlockScroll();
            }
          } else {
            toast.info("Please complete both fields");
          }
        } catch (error) {
          // console.log(error);
        }
      }
    }
  }

  return (
    <div className={Styles.navLinkCont}>
      <Nav.Link>
        <FaUserAlt
          className="fs-4"
          onClick={() => {
            setisDropdownShown(!isDropdownShown);
          }}
        ></FaUserAlt>
      </Nav.Link>
      <div
        className={`${Styles.showDropDown} ${
          isDropdownShown ? Styles.showDropDown : Styles.hideDropDown
        }`}
      >
        <div className={Styles.userAvatarSecondaryDiv}>
          {userToken ? <span>Hi, {userInfo ? b : "user"}</span> : ""}
          {userToken ? (
            <NavLink to={"/profile"}>
              <button
                className={`btn btn-outline-info ${Styles.avatarBtn}`}
                onClick={() => {
                  setisDropdownShown(!isDropdownShown);
                }}
              >
                My Account
              </button>
            </NavLink>
          ) : (
            <div className={Styles.userBtnCont}>
              <button
                className={`btn btn-outline-primary ${Styles.logInBtn}`}
                onClick={() => {
                  // setisDropdownShown(!isDropdownShown);
                  // setDisplay(true);
                  setLoginPopUp(true);
                  setisDropdownShown(false);
                  lockScroll();
                }}
              >
                Log in
              </button>
              <button
                className={`btn btn-outline-secondary ${Styles.signUpBtn}`}
                onClick={() => {
                  setisDropdownShown(false);
                  setSignupPopUp(true);
                  lockScroll();
                }}
              >
                Sign up
              </button>
            </div>
          )}
        </div>
      </div>
      {display ? (
        <div className={Styles.mainCont}>
          {lockScroll()}
          <div
            className={Styles.secondaryCont}
            style={{ position: "relative" }}
          >
            <button
              className={`${Styles.cancelBtn} btn btn-sm btn-danger`}
              style={{ position: "absolute", right: "5%" }}
              onClick={() => {
                setDisplay(false);
                setSentOtpn(false);
                unlockScroll();
              }}
            >
              X
            </button>
            <h1>Login</h1>
            <p>Welcome to Freeskout</p>
            <div className={Styles.inputCont}>
              <Input
                type={"text"}
                placeholder={"E-Mail/Phone"}
                onChange={(e) => handleInput(e, "email", setEmail)}
                err={errors && errors.email}
              ></Input>
              {sentOtpn ? (
                ""
              ) : (
                <button
                  className={`${Styles.getOtpBtn} btn btn-sm btn-secondary my-1`}
                  onClick={() => {
                    handleOtpSend();
                  }}
                >
                  Get Otp
                </button>
              )}
              {sentOtpn ? (
                <Input
                  type={"text"}
                  placeholder={"otp"}
                  onChange={(e) => handleInput(e, "otp", setOtp)}
                  err={errors && errors.otp}
                ></Input>
              ) : (
                ""
              )}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  ref={tNc}
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  I agree to the <a href="./"> Terms & Conditions </a> of
                  Freeskout
                </label>
              </div>
            </div>
            <div className={Styles.btnCont}>
              {sentOtpn ? (
                <button
                  className={`${Styles.loginBtn} btn  btn-primary my-2`}
                  onClick={() => {
                    handleLogin() && setDisplay(false);
                  }}
                >
                  Login
                </button>
              ) : (
                ""
              )}
              <button className={`${Styles.loginBtn} btn  btn-secondary`}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {/* <div style={{ position: "absolute", top: "0" }}>
        <MyToast
          position={"top-right"}
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={"light"}
        ></MyToast>
      </div> */}
    </div>
  );
};

export default UserAvatar;
