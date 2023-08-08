import { BsHeart } from "react-icons/bs";
import { Nav } from "react-bootstrap";
import Styles from "./index.module.css";
import { NavLink } from "react-router-dom";
import {
  useLoginState,
  useSignUpState,
} from "../../../state-managers/cart-state";
import { useScrollLock } from "../../scrolLock";
const WishList = () => {
  const setLoginPopUp = useLoginState((state) => state.setLoginPopup);
  const setSignUpPopUp = useSignUpState((state) => state.setSignupPopup);
  const { lockScroll, unlockScroll } = useScrollLock();
  return (
    <Nav.Link
      to="/wishlist"
      as={NavLink}
      className={`${Styles.navLinkCont}`}
      onClick={() => {
        setLoginPopUp(false);
        setSignUpPopUp(false);
        unlockScroll();
      }}
    >
      <BsHeart className="fs-4"></BsHeart>
    </Nav.Link>
  );
};

export default WishList;
