import { useState } from "react";
import { useNavigate } from "react-router";
import { getLoginOtp, loginApi } from "../../config/configService";
import {
  useLoginState,
  useSignUpState,
  useUserSetting,
} from "../../state-managers/cart-state";
import { Input } from "../commonComponents/input-box";
import Styles from "./index.module.css";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import MyToast from "../toast";
import { emailChecker } from "../../utlils/functions";
import { setAuthToken } from "../../services/storageService";
import { useScrollLock } from "../scrolLock";

const CurrentUserLogin = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [sentOtpn, setSentOtpn] = useState(false);
  const [errors, setErrors] = useState({});
  const [pageLoading, setPageLoading] = useState(false);
  const [pageError, setPageError] = useState(false);
  const navi = useNavigate();
  const setUserInfo = useUserSetting((state) => state.setUserInfo);
  const setToken = useUserSetting((state) => state.setToken);
  const setLoginPopUp = useLoginState((state) => state.setLoginPopup);
  const setSignupPopUp = useSignUpState((state) => state.setSignupPopup);
  const { lockScroll, unlockScroll } = useScrollLock();

  // -------------------

  function handleError(key, val) {
    if (!key || !key.length) return;
    setErrors((cur) => {
      let next = { ...cur };
      next[key] = val;
      return next;
    });
  }
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
  const handlEmailValidate = () => {
    let validate = false;
    if (!email) {
      validate = false;
      handleError("email", "Field can't be empty");
    } else {
      validate = true;
    }
    return validate;
  };
  const handleOtpValidate = () => {
    let validate = false;
    if (!otp) {
      validate = false;
      handleError("otp", "Filed can't be Empty");
      toast.error("OTP Can`t be empty");
    } else if (isNaN(otp)) {
      validate = false;
      handleError("otp", "Otp Should be a Number");
      toast.error("Only numbers are allowed in OTP");
    } else {
      validate = true;
    }
    return validate;
  };
  async function handleOtpSend() {
    handlEmailValidate();
    if (emailChecker(email) === false) {
      toast.warning("INVALID Email");
    } else {
      if (handlEmailValidate()) {
        try {
          setPageLoading(true);
          if (email) {
            // console.log(email.toLowerCase(), email, "handleOtpSend");
            let r = await getLoginOtp({ email: email.toLowerCase() });
            // console.log("received login otp : ", r);
            if (r.issue) {
              setPageError(r.message ? r.message : "something went wrong");
              toast.error(r.message ? r.message : "something went wrong");
            } else {
              toast.info("Check Email for OTP");
              setSentOtpn(true);
            }
          } else {
            setPageError("Filed can't be Empty");
            toast.error("Filed can't be Empty");
          }
        } catch (error) {
          setPageError("Some Error Occoured");
          toast.error("Some Error Occoured");
          // console.log(error);
        } finally {
          setPageLoading(false);
        }
      }
    }
  }
  async function handleLogin(e) {
    if (handleOtpValidate()) {
      try {
        setPageLoading(true);
        if (email && otp) {
          let res = await loginApi({ email: email.toLowerCase(), otp });

          // console.log("received login data : ", res);
          if (res.issue) {
            setPageError(res.message ? res.message : "something went wrong");
            toast.error(res.message ? res.message : "something went wrong");
          } else {
            setToken(res.result ? res.result : false);
            setUserInfo(res.data ? res.data : null);
            setAuthToken(res.result ? res.result : false);
            setLoginPopUp(false);
            unlockScroll();
            navi("/");
          }
        } else {
          setPageError("please complete both fields");
          toast.warning("Fields can't be empty");
        }
      } catch (error) {
        // console.log(error);
        setPageError("Something went wrong!!");
        toast.error("Something went wrong");
      } finally {
        setPageLoading(false);
      }
    }
  }

  return (
    <div className={Styles.mainCont}>
      <div className={Styles.secondaryCont} style={{ position: "relative" }}>
        <button
          className={`${Styles.cancelBtn} btn btn-sm btn-danger`}
          style={{ position: "absolute", right: "5%" }}
          onClick={() => {
            setSentOtpn(false);
            setLoginPopUp(false);
            unlockScroll();
          }}
        >
          X
        </button>
        <h1 style={{ textAlign: "center" }} className={"my-1"}>
          Login
        </h1>
        <p style={{ textAlign: "center" }} className={"my-1"}>
          Welcome to Freeskout
        </p>
        <div className={`${Styles.inputCont} mt-3`}>
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
              className={`${Styles.getOtpBtn} btn w-100 my-2`}
              onClick={() => {
                // console.log({ pageError });
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
        </div>
        <div className={Styles.btnCont}>
          {sentOtpn ? (
            <button
              className={`${Styles.loginBtn} btn  btn-primary my-2`}
              onClick={() => {
                handleLogin();
              }}
            >
              Login
            </button>
          ) : (
            ""
          )}
          <button
            className={`${Styles.signUpBtn} btn  btn-secondary`}
            onClick={() => {
              setSignupPopUp(true);
              setLoginPopUp(false);
              lockScroll();
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrentUserLogin;
