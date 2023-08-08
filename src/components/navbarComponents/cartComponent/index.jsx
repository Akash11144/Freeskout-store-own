/* eslint-disable jsx-a11y/alt-text */
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {
  useCart,
  useLoginState,
  useSignUpState,
} from "../../../state-managers/cart-state";
import { useScrollLock } from "../../scrolLock";
import Styles from "./index.module.css";
const CartComponent = () => {
  let count = useCart((state) => state.count);
  const setLoginPopUp = useLoginState((state) => state.setLoginPopup);
  const setSignUpPopUp = useSignUpState((state) => state.setSignupPopup);
  const { lockScroll, unlockScroll } = useScrollLock();

  return (
    <Nav.Link
      className={`${Styles.navLinkCont}`}
      to="/cart"
      as={NavLink}
      style={{ position: "relative" }}
      onClick={() => {
        setLoginPopUp(false);
        setSignUpPopUp(false);
        unlockScroll();
      }}
    >
      <div className={`rounded-circle bg-success ${Styles.CartCountCont}`}>
        {count}
      </div>
      <i
        className="fa-solid fa-cart-shopping fs-4"
        style={{ marginTop: "20%" }}
      ></i>
    </Nav.Link>
  );
};

export default CartComponent;
