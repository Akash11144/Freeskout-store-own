import { ToastContainer } from "react-toastify";

const MyToast = (props) => {
  const {
    position, //top-left top-right top-center bottom-left bottom-right bottom-center
    autoClose, // time in ms
    hideProgressBar, // true or false
    newestOnTop, //true or false
    rtl, // true or false
    theme, //light dark colored
  } = props;
  return (
    <ToastContainer
      position={position}
      autoClose={autoClose}
      hideProgressBar={hideProgressBar}
      newestOnTop={newestOnTop}
      closeOnClick
      rtl={rtl}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={theme}
    />
  );
};

export default MyToast;
