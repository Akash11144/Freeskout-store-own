import { Nav } from "react-bootstrap";
import { BsBell } from "react-icons/bs";
import {
  useLoginState,
  useSignUpState,
} from "../../../state-managers/cart-state";
import { useScrollLock } from "../../scrolLock";
import Styles from "./index.module.css";
const Notification = () => {
  const setLoginPopUp = useLoginState((state) => state.setLoginPopup);
  const setSignUpPopUp = useSignUpState((state) => state.setSignupPopup);
  const { lockScroll, unlockScroll } = useScrollLock();
  return (
    <Nav.Link
      className={`${Styles.navLinkCont}`}
      onClick={() => {
        setLoginPopUp(false);
        setSignUpPopUp(false);
        unlockScroll();
      }}
    >
      <BsBell className="fs-4"></BsBell>
    </Nav.Link>
  );
};

export default Notification;
