import { Nav } from "react-bootstrap";
import comapanyLogo from "../../../assets/icons/logo-internal-150x150.png";
import comapanyLogoM from "../../../assets/icons/logo.ico";
import Styles from "./index.module.css";
import { NavLink } from "react-router-dom";
import {
  useLoginState,
  useSignUpState,
} from "../../../state-managers/cart-state";
import { useScrollLock } from "../../scrolLock";
const NavLogo = () => {
  const setLoginPopUp = useLoginState((state) => state.setLoginPopup);
  const setSignUpPopUp = useSignUpState((state) => state.setSignupPopup);
  const { lockScroll, unlockScroll } = useScrollLock();

  return (
    <Nav.Link
      className={`navbar-brand ${Styles.navLink}`}
      to="/"
      as={NavLink}
      onClick={() => {
        setLoginPopUp(false);
        setSignUpPopUp(false);
        unlockScroll();
      }}
    >
      <img
        src={comapanyLogo}
        alt="logo"
        width={80}
        className={Styles.logo}
      ></img>
      <img
        src={comapanyLogoM}
        alt="logo"
        width={45}
        className={Styles.logoM}
      ></img>
    </Nav.Link>
  );
};

export default NavLogo;
