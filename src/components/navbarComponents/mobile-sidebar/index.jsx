import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  useCart,
  useLoginState,
  useSignUpState,
  useUserSetting,
} from "../../../state-managers/cart-state";
import { useScrollLock } from "../../scrolLock";
import DummyUser from "../../../assets/dummyUser.png";
import Styles from "./index.module.css";
import { logout } from "../../../config/configService";
import { removeAuthToken } from "../../../services/storageService";
const MobileSideBar = () => {
  const [isActive, setisActive] = useState(true);
  const setLoginPopUp = useLoginState((state) => state.setLoginPopup);
  const setSignUpPopUp = useSignUpState((state) => state.setSignupPopup);
  const userInfo = useUserSetting((state) => state.info);
  const userToken = useUserSetting((state) => state.token);
  const setToken = useUserSetting((state) => state.setToken);
  const setUserInfo = useUserSetting((state) => state.setUserInfo);
  const emptyCart = useCart((state) => state.emptyCart);
  // console.log({ userInfo });
  const { lockScroll, unlockScroll } = useScrollLock();
  const nameGen = () => {
    let userName = userInfo.name.replace(/\s+/g, " ");
    let temp = userName.split(" ");
    let temp2 = temp[1].split("")[0].trim().toUpperCase() + ".";
    let final = temp[0] + " " + temp2;
    // console.log({ final });
    return final;
  };
  async function handleLogout() {
    try {
      const r1 = await logout({ token: userToken });
      // console.log("response from logout:", r1);
      setToken(false);
      removeAuthToken();
      setUserInfo(null);
      emptyCart();
    } catch (error) {
      // console.log("error in logout:", error);
    }
  }
  return (
    <div className={Styles.mainDiv}>
      <div
        className={Styles.leftMain}
        id="hamburger"
        onClick={() => {
          setisActive(!isActive);
          setLoginPopUp(false);
          setSignUpPopUp(false);
          isActive ? lockScroll() : unlockScroll();
        }}
      >
        <div className={Styles.hamCont}>
          <span
            className={`${Styles.line} ${
              isActive ? Styles.line : Styles.lineTop
            }`}
            id="topLine"
          ></span>
          <span
            className={`${Styles.line}  ${
              isActive ? Styles.line : Styles.lineMiddle
            }`}
            id="bottomLine"
          ></span>
          <span
            className={`${Styles.line} ${
              isActive ? Styles.line : Styles.lineBottom
            }`}
            id="endLine"
          ></span>
        </div>
      </div>
      <div
        className={`${Styles.sideBarCont} ${
          isActive ? Styles.sideBarShow : Styles.sideBarCont
        }`}
        id="sideMenu"
      >
        {!userToken ? (
          <>
            <div className={Styles.userBtnCont}>
              {/* <p className={Styles.mobileMenuItem}>Cart</p>
              <p>Wishlist</p>
              <button
                className={`btn btn-outline-primary ${Styles.logInBtn}`}
                onClick={() => {
                  setisActive(!isActive);
                  setLoginPopUp(true);
                  lockScroll();
                }}
              >
                Log in
              </button>
              <button
                className={`btn btn-outline-secondary ${Styles.signUpBtn}`}
                onClick={() => {
                  setisActive(!isActive);
                  setSignUpPopUp(true);
                  lockScroll();
                }}
              >
                Sign up
              </button> */}
              <p className={Styles.mobileMenuItem}>
                {" "}
                <NavLink
                  to={"cart"}
                  className={Styles.orders}
                  onClick={() => {
                    setisActive(!isActive);
                    unlockScroll();
                  }}
                >
                  Cart
                </NavLink>
              </p>
              <p className={Styles.mobileMenuItem}>
                <NavLink
                  to="/wishlist"
                  className={Styles.wishList}
                  onClick={() => {
                    setisActive(!isActive);
                    unlockScroll();
                  }}
                >
                  Wishlist
                </NavLink>
              </p>
              <p
                className={Styles.mobileMenuItem}
                onClick={() => {
                  setisActive(!isActive);
                  setLoginPopUp(true);
                  lockScroll();
                }}
              >
                Login
              </p>
              <hr />
              <p
                className={Styles.mobileMenuItem}
                onClick={() => {
                  setisActive(!isActive);
                  setSignUpPopUp(true);
                  lockScroll();
                }}
              >
                Sign Up
              </p>
            </div>
          </>
        ) : (
          <div className={Styles.sideBar}>
            <div className={Styles.infoContMain}>
              <div className={Styles.dpCont}>
                <img src={DummyUser} alt="UserImg" />
              </div>
              <div className={Styles.userNameCont}>
                <p className={Styles.userName}>
                  {userInfo != null ? nameGen() : ""}
                </p>
                <p className={Styles.userEmail}>
                  {userInfo != null ? userInfo.email : ""}
                </p>
              </div>
            </div>
            <hr />
            <NavLink
              to={"/profile"}
              className={Styles.profile}
              onClick={() => {
                setisActive(!isActive);
                unlockScroll();
              }}
            >
              Profile
            </NavLink>
            {/* <NavLink
              to={"/profile"}
              className={Styles.settings}
              onClick={() => {
                setisActive(!isActive);
                unlockScroll();
              }}
            >
              Settings
            </NavLink> */}
            <NavLink
              to="/wishlist"
              className={Styles.wishList}
              onClick={() => {
                setisActive(!isActive);
                unlockScroll();
              }}
            >
              Wishlist
            </NavLink>
            <hr />
            <NavLink
              to={"profile/order"}
              className={Styles.orders}
              onClick={() => {
                setisActive(!isActive);
                unlockScroll();
              }}
            >
              Orders
            </NavLink>
            <NavLink
              to={"cart"}
              className={Styles.orders}
              onClick={() => {
                setisActive(!isActive);
                unlockScroll();
              }}
            >
              Cart
            </NavLink>
            {/* <div
              className={Styles.refer}
              onClick={() => {
                setisActive(!isActive);
                unlockScroll();
                alert("Coming Soon");
              }}
            >
              Refer
            </div> */}
            <hr />
            {/* <div
              className={Styles.help}
              onClick={() => {
                setisActive(!isActive);
                unlockScroll();
                alert("Coming Soon");
              }}
            >
              Help
            </div> */}
            <NavLink
              to="/"
              className={Styles.logOut}
              onClick={() => {
                handleLogout();
                setisActive(!isActive);
                unlockScroll();
              }}
              style={{ color: "red" }}
            >
              Logout
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileSideBar;
