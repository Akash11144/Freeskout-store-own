import Styles from "./index.module.css";
const Loader = () => {
  return (
    <div className={Styles.mainDiv}>
      <div className={`spinner-grow ${Styles.contDiv}`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
