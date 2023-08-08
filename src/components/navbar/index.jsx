import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import CartComponent from "../navbarComponents/cartComponent";
import NavLogo from "../navbarComponents/navLogo";
import Notification from "../navbarComponents/notification";
import UserAvatar from "../navbarComponents/userAvatar";
import WishList from "../navbarComponents/wishList";
import Styles from "./index.module.css";
import { useUserSetting } from "../../state-managers/cart-state";
import MobileSideBar from "../navbarComponents/mobile-sidebar";
import MobileSearchBox from "../navbarComponents/mobileSearchBar";

// ///////////////////////////

const NewNav = () => {
  const navi = useNavigate();
  const userInfo = useUserSetting((state) => state.info);
  const userToken = useUserSetting((state) => state.token);
  const setToken = useUserSetting((state) => state.setToken);
  const setUserInfo = useUserSetting((state) => state.setUserInfo);

  // -----------

  return (
    <>
      <div className={Styles.mainNavCont}>
        <div className={Styles.navLeft}>
          <NavLogo />
        </div>
        <div className={Styles.navCenter}>
          <div className={Styles.mobileSearchbox}>
            <MobileSearchBox />
          </div>
        </div>
        <div className={Styles.navRight}>
          {/* <div className={Styles.DesktopMenuBtn}>
            <Notification />
          </div> */}
          <div className={Styles.DesktopMenuBtn}>
            <WishList />
          </div>
          <div className={Styles.DesktopMenuBtn}>
            <CartComponent />
          </div>
          <div className={Styles.DesktopMenuBtn}>
            <UserAvatar />
          </div>
          <div className={Styles.mobileSideBar}>
            <MobileSideBar />
          </div>
        </div>
      </div>
    </>
  );
  // -------
};

export default NewNav;
