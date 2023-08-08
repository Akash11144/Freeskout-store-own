import style from "../checkout.module.css";
import Styles from "./add-address.module.css";
import { Input } from "../../../components/commonComponents/input-box";
const AddAddressModal = (props) => {
  const {
    handleInput,
    userToken,
    userInfo,
    email,
    setEmail,
    phone,
    setPhone,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    addressLine1,
    setAddressLine1,
    addressLine2,
    setAddressLine2,
    pincode,
    setPincode,
    pinApiCall,
    city,
    setCity,
    state,
    country,
    addAddress,
    errors,
    setShowAddAddressModal,
  } = props;
  return (
    <div className={Styles.mainCont}>
      <div className={Styles.modal}>
        <div className={style.contactInfo}>
          <h5>Contact Information</h5>
          {userToken ? (
            <Input
              type={"text"}
              placeholder={"E-Mail"}
              name={"E-Mail"}
              value={userInfo.email}
              disabled={true}
              onChange={(e) => handleInput(e, "email", setEmail)}
              err={errors && errors.email}
            />
          ) : (
            <Input
              type={"text"}
              placeholder={"E-Mail"}
              name={"E-Mail"}
              value={email}
              onChange={(e) => handleInput(e, "email", setEmail)}
              err={errors && errors.email}
            />
          )}
          <Input
            type={"text"}
            placeholder={"Mobile"}
            minLength={10}
            maxLength={10}
            name={"phone"}
            value={phone}
            onChange={(e) => handleInput(e, "phone", setPhone)}
            err={errors && errors.phone}
          />
        </div>
        <h5 style={{ margin: "20px 0 10px 0" }}>Shipping Information</h5>
        <div className={style.dualInput}>
          <div className={style.dualChildInput}>
            <Input
              type={"text"}
              placeholder={"First Name"}
              name={"firstName"}
              value={firstName}
              onChange={(e) => handleInput(e, "firstName", setFirstName)}
              err={errors && errors.firstName}
            />
          </div>
          <div className={style.dualChildInput}>
            <Input
              type={"text"}
              placeholder={"Last Name"}
              name={"lastName"}
              value={lastName}
              onChange={(e) => handleInput(e, "lastName", setLastName)}
              err={errors && errors.lastName}
            />
          </div>
        </div>
        <Input
          type={"text"}
          placeholder={"Adddress Line 1"}
          name={"addressLine1"}
          value={addressLine1}
          onChange={(e) => handleInput(e, "addressLine1", setAddressLine1)}
          err={errors && errors.addressLine1}
        />
        <Input
          type={"text"}
          placeholder={"Adddress Line 2"}
          name={"addressLine1"}
          value={addressLine2}
          onChange={(e) => handleInput(e, "addressLine2", setAddressLine2)}
          err={errors && errors.addressLine2}
        />
        <div className={style.dualInput}>
          <div className={style.dualChildInput}>
            <Input
              type={"text"}
              placeholder={"City"}
              name={"city"}
              value={city}
              onChange={(e) => handleInput(e, "city", setCity)}
              err={errors && errors.city}
            />
          </div>
          <div className={style.dualChildInput}>
            <Input
              type={"text"}
              placeholder={"Postal Code"}
              minLength={6}
              maxLength={6}
              name={"pincode"}
              value={pincode}
              onChange={(e) => {
                // console.log("pin", e.target.value);
                pinApiCall(e.target.value);
                handleInput(e, "pincode", setPincode);
              }}
              err={errors && errors.pincode}
            />
          </div>
        </div>
        <div className={style.dualInput}>
          <div className={style.dualChildInput}>
            <Input
              type={"text"}
              value={state}
              placeholder={"State"}
              name={"state"}
              disabled={true}
              // onChange={(e) => handleInput(e, "state", setState)}
              err={errors && errors.state}
            />
          </div>
          <div className={style.dualChildInput}>
            <Input
              type={"text"}
              placeholder={"Country"}
              disabled={true}
              value={country}
              name={"country"}
              // onChange={(e) => handleInput(e, "country", setCountry)}
              err={errors && errors.country}
            />
          </div>
        </div>
        <div className={Styles.btnCont}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setShowAddAddressModal(false);
            }}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              addAddress();
              setShowAddAddressModal(false);
            }}
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAddressModal;
