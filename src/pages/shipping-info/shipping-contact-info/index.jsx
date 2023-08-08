import style from "../checkout.module.css";
import { Input } from "../../../components/commonComponents/input-box";

// -------------------------------------------
const ShippingContactInformation = (props) => {
  const {
    handleInput,
    setEmail,
    errors,
    setPhone,
    setFirstName,
    setLastName,
    setAddressLine1,
    setAddressLine2,
    setCity,
    setPincode,
    setState,
    setCountry,
    setBillingFirstName,
    setBillingLastName,
    setBillingAddressLine1,
    setBillingAddressLine2,
    setBillingCity,
    setBillingPincode,
    setBillingState,
    setBillingCountry,
    setBillingGst,
    pinApiCall,
    isShippingBilling,
    toggleIsShippingBilling,
    onPayment,
    billingFirstName,
    billingLastName,
    billingAddressLine1,
    billingAddressLine2,
    billingCity,
    billingPincode,
    billingState,
    billingCountry,
    billingGst,
    country,
    state,
  } = props;

  return (
    <div style={{ width: "60%" }}>
      <div className={style.firstAddMain}>
        <div className={style.contactForm}>
          <div className={style.contactInfo}>
            <h5 className="mt-4">Contact Information</h5>
            <Input
              type={"text"}
              placeholder={"E-Mail"}
              name={"E-Mail"}
              // value={userInfo.email}
              // disabled={true}
              onChange={(e) => handleInput(e, "email", setEmail)}
              err={errors && errors.email}
            />
            <Input
              type={"text"}
              placeholder={"Mobile"}
              minLength={10}
              maxLength={10}
              name={"phone"}
              onChange={(e) => handleInput(e, "phone", setPhone)}
              err={errors && errors.phone}
            />
          </div>
          <h5 style={{ marginBottom: "8px" }}>Shipping Information</h5>
          <div className={style.dualInput}>
            <div className={style.dualChildInput}>
              <Input
                type={"text"}
                placeholder={"First Name"}
                name={"firstName"}
                onChange={(e) => handleInput(e, "firstName", setFirstName)}
                err={errors && errors.firstName}
              />
            </div>
            <div className={style.dualChildInput}>
              <Input
                type={"text"}
                placeholder={"Last Name"}
                name={"lastName"}
                onChange={(e) => handleInput(e, "lastName", setLastName)}
                err={errors && errors.lastName}
              />
            </div>
          </div>
          <Input
            type={"text"}
            placeholder={"Adddress Line 1"}
            name={"addressLine1"}
            onChange={(e) => handleInput(e, "addressLine1", setAddressLine1)}
            err={errors && errors.addressLine1}
          />
          <Input
            type={"text"}
            placeholder={"Adddress Line 2"}
            name={"addressLine1"}
            onChange={(e) => handleInput(e, "addressLine2", setAddressLine2)}
            err={errors && errors.addressLine2}
          />
          <div className={style.dualInput}>
            <div className={style.dualChildInput}>
              <Input
                type={"text"}
                placeholder={"City"}
                name={"city"}
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
                onChange={(e) => {
                  handleInput(e, "pincode", setPincode);
                  if (e.target.value.length == 6) pinApiCall(e.target.value);
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
                onChange={(e) => handleInput(e, "state", setState)}
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
                onChange={(e) => handleInput(e, "country", setCountry)}
                err={errors && errors.country}
              />
            </div>
          </div>
        </div>

        <div className="py-3">
          <div
            className={`d-flex justify-content-start align-items-center gap-2 ${style["cursor-pointer"]}`}
            onClick={toggleIsShippingBilling}
          >
            <div
              style={
                isShippingBilling
                  ? {
                      backgroundColor: "#4f0b27",
                      borderRadius: "0.5rem",
                      border: "1px solid #029a45",
                      width: "1rem",
                      height: "1rem",
                    }
                  : {
                      backgroundColor: "#9ab3",
                      borderRadius: "0.5rem",
                      border: "1px solid #9ab9",
                      width: "1rem",
                      height: "1rem",
                    }
              }
            ></div>

            <small>Billing same as shipping</small>
          </div>

          {isShippingBilling ? (
            <></>
          ) : (
            <>
              <h5 style={{ marginBottom: "2rem", marginTop: "2rem" }}>
                Billing Address
              </h5>

              {onPayment ? (
                <>
                  <div className={`${style.secondaryCont}`}>
                    <div className={style.addressCont}>
                      <p>
                        <span>
                          <b>
                            {billingFirstName} {billingLastName}
                          </b>
                        </span>
                      </p>
                      <p>
                        {billingAddressLine1}
                        {billingAddressLine2 && billingAddressLine2.length ? (
                          <>
                            <br />
                            {billingAddressLine2}
                            <br />
                          </>
                        ) : (
                          <></>
                        )}
                      </p>
                      <p>
                        <span>
                          {billingCity}, {billingState}
                        </span>
                        <span>{billingCountry}</span>
                        {" - "}
                        <span>{billingPincode}</span>
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <div className={`${style.dualInput} my-2`}>
                    <div className={style.dualChildInput}>
                      <Input
                        type={"text"}
                        placeholder={"First Name"}
                        name={"billingFirstName"}
                        value={billingFirstName}
                        onChange={(e) =>
                          handleInput(
                            e,
                            "billingFirstName",
                            setBillingFirstName
                          )
                        }
                        err={errors && errors.billingFirstName}
                      />
                    </div>
                    <div className={style.dualChildInput}>
                      <Input
                        type={"text"}
                        placeholder={"Last Name"}
                        name={"billingLastName"}
                        value={billingLastName}
                        onChange={(e) =>
                          handleInput(e, "billingLastName", setBillingLastName)
                        }
                        err={errors && errors.billingLastName}
                      />
                    </div>
                  </div>
                  <Input
                    containerClasses={"my-2"}
                    type={"text"}
                    placeholder={"Address Line 1"}
                    name={"billingAddressLine1"}
                    value={billingAddressLine1}
                    onChange={(e) =>
                      handleInput(
                        e,
                        "billingAddressLine1",
                        setBillingAddressLine1
                      )
                    }
                    err={errors && errors.billingAddressLine1}
                  />
                  <Input
                    containerClasses={"my-2"}
                    type={"text"}
                    placeholder={"Address Line 2"}
                    name={"billingAddressLine2"}
                    value={billingAddressLine2}
                    onChange={(e) =>
                      handleInput(
                        e,
                        "billingAddressLine2",
                        setBillingAddressLine2
                      )
                    }
                    err={errors && errors.billingAddressLine2}
                  />
                  <div className={`${style.dualInput} my-2`}>
                    <div className={style.dualChildInput}>
                      <Input
                        type={"text"}
                        placeholder={"City"}
                        name={"billingCity"}
                        value={billingCity}
                        onChange={(e) =>
                          handleInput(e, "billingCity", setBillingCity)
                        }
                        err={errors && errors.billingCity}
                      />
                    </div>
                    <div className={style.dualChildInput}>
                      <Input
                        type={"text"}
                        placeholder={"Postal Code"}
                        minLength={6}
                        maxLength={6}
                        name={"billingPincode"}
                        value={billingPincode}
                        onChange={(e) => {
                          handleInput(e, "billingPincode", setBillingPincode);
                          if (e.target.value.length == 6)
                            pinApiCall(e.target.value, true);
                        }}
                        err={errors && errors.billingPincode}
                      />
                    </div>
                  </div>
                  <div className={`${style.dualInput} my-2`}>
                    <div className={style.dualChildInput}>
                      <Input
                        type={"text"}
                        placeholder={"State"}
                        name={"billingState"}
                        value={billingState}
                        disabled={true}
                        onChange={(e) =>
                          handleInput(e, "billingState", setBillingState)
                        }
                        err={errors && errors.billingState}
                      />
                    </div>
                    <div className={style.dualChildInput}>
                      <Input
                        type={"text"}
                        placeholder={"Country"}
                        disabled={true}
                        value={billingCountry}
                        name={"billingCountry"}
                        onChange={(e) =>
                          handleInput(e, "billingCountry", setBillingCountry)
                        }
                        err={errors && errors.billingCountry}
                      />
                    </div>
                  </div>
                  <Input
                    containerClasses={"my-2"}
                    type={"text"}
                    placeholder={"GST Number"}
                    name={"billingGst"}
                    value={billingGst}
                    onChange={(e) =>
                      handleInput(e, "billingGst", setBillingGst)
                    }
                    err={errors && errors.billingGst}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShippingContactInformation;
