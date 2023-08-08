import NavDropdown from "react-bootstrap/NavDropdown";
import {
  useLoginState,
  useSignUpState,
} from "../../../state-managers/cart-state";
import { useScrollLock } from "../../scrolLock";
import Styles from "./index.module.css";
const ExploreDropDown = () => {
  const setLoginPopUp = useLoginState((state) => state.setLoginPopup);
  const setSignUpPopUp = useSignUpState((state) => state.setSignupPopup);
  const { lockScroll, unlockScroll } = useScrollLock();

  return (
    <NavDropdown
      title="Explore"
      menuVariant="dark"
      className={`${Styles.dropDown} ms-2`}
      onClick={() => {
        setLoginPopUp(false);
        setSignUpPopUp(false);
        unlockScroll();
      }}
    >
      <NavDropdown.Item>Exclusive Item</NavDropdown.Item>
      <NavDropdown.Item>Latest Launches</NavDropdown.Item>
      <NavDropdown.Item>Our Pick</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item>Explore All</NavDropdown.Item>
    </NavDropdown>
  );
};

export default ExploreDropDown;
