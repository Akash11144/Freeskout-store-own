import { FaUserAlt } from "react-icons/fa";
import { Nav } from "react-bootstrap";
import Styles from "./index.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  useLoginState,
  useSignUpState,
  useUserSetting,
} from "../../../state-managers/cart-state";
import { useEffect } from "react";
import { useScrollLock } from "../../scrolLock";
const UserAvatarMobile = () => {
  const navi = useNavigate();
  const userInfo = useUserSetting((state) => state.info);
  const userToken = useUserSetting((state) => state.token);
  const setToken = useUserSetting((state) => state.setToken);
  const setUserInfo = useUserSetting((state) => state.setUserInfo);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const setLoginPopUp = useLoginState((state) => state.setLoginPopup);
  const setSignUpPopUp = useSignUpState((state) => state.setSignupPopup);
  const { lockScroll, unlockScroll } = useScrollLock();

  let a;
  let b;
  if (userToken) {
    a = userInfo.name;
    b = a.split(" ")[0];
  }
  return (
    <div className={Styles.navLinkCont}>
      <Nav.Link>
        <FaUserAlt
          className="fs-4"
          onClick={() => {
            setSignUpPopUp(false);
            if (!userToken) {
              setLoginPopUp(true);
              lockScroll();
            }
          }}
        ></FaUserAlt>
      </Nav.Link>
    </div>
  );
};

export default UserAvatarMobile;
