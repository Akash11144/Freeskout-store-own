import React, { useEffect, useState } from "react";
import style from "./customerSideNav.module.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useUserSetting } from "../../../state-managers/cart-state";
import { useCart } from "../../../state-managers/cart-state";
import { removeAuthToken } from "../../../services/storageService";
import { logout } from "../../../config/configService";

const CustomerSideNav = () => {
  const loc = useLocation();
  const [currentPath, setCurrentPath] = useState(loc.pathname);
  useEffect(() => setCurrentPath(loc.pathname), [loc.pathname]);
  const navi = useNavigate();
  const userInfo = useUserSetting((state) => state.info);
  const userToken = useUserSetting((state) => state.token);
  const setToken = useUserSetting((state) => state.setToken);
  const setUserInfo = useUserSetting((state) => state.setUserInfo);
  const emptyCart = useCart((state) => state.emptyCart);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownShown, setisDropdownShown] = useState(false);
  return (
    <>
      <div className={`${style.customerAsideNav}`}>
        <nav>
          <NavLink
            to="/profile"
            className={`${style.cusNavChild} ${
              currentPath === "/profile" || currentPath === "/profile/"
                ? style.activeLink
                : ""
            }`}
          >
            <p style={{ margin: "unset" }}>
              <i className="fa-solid fa-house"></i> Profile
            </p>
          </NavLink>
          <NavLink
            to="/profile/order"
            className={`${style.cusNavChild} ${
              currentPath === "/profile/order" ? style.activeLink : ""
            }`}
          >
            <p style={{ margin: "unset" }}>
              <i className="fa-solid fa-box-open"></i> Orders
            </p>
          </NavLink>
          {/* <NavLink
            to="/profile/whishlist"
            className={`${style.cusNavChild} ${
              currentPath === "/profile/whishlist" ? style.activeLink : ""
            }`}
          >
            <p style={{margin:"unset"}}>
              <i className="fa-solid fa-heart"></i> Whishlist
            </p>
          </NavLink> */}
          <NavLink
            className={`${style.cusNavChild} ${style.logoutBtn}`}
            to="/"
            onClick={() => {
              handleLogout();
            }}
          >
            <p style={{ margin: "unset" }}>
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </p>
          </NavLink>
        </nav>
      </div>
    </>
  );

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
};

export default CustomerSideNav;
