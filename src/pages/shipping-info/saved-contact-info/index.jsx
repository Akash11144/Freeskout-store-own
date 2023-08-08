import style from "../checkout.module.css";
import { Input } from "../../../components/commonComponents/input-box";
import AddAddressModal from "../add-address";
import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { MdLocationSearching } from "react-icons/md";
import Select from "../../../assets/select.png";
// import { CiLocationOn } from "react-icons/ci";
import { ImLocation } from "react-icons/im";
import Loader from "../../../assets/gif/smileyLoading.gif";
//-----------------------------------------------------------------------------------------------
const SavedContactInfo = (props) => {
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const {
    handleInput,
    setPhone,
    phone,
    errors,
    addresses,
    selectAddress,
    selectedAddress,
    userToken,
    onPayment,
    isShippingBilling,
    toggleIsShippingBilling,
    billingFirstName,
    billingLastName,
    billingAddressLine1,
    billingAddressLine2,
    billingCity,
    billingState,
    billingCountry,
    billingPincode,
    billingGst,
    setBillingFirstName,
    setBillingLastName,
    setBillingAddressLine1,
    setBillingAddressLine2,
    setBillingCity,
    setBillingState,
    setBillingCountry,
    setBillingPincode,
    setBillingGst,
    pinApiCall,
    addAddress,
    state,
    country,
    setEmail,
    userInfo,
    otpModelCloseBtnRef,
    firstName,
    lastName,
    addressLine1,
    addressLine2,
    city,
    pincode,
    setState,
    setCountry,
    setFirstName,
    setLastName,
    setAddressLine1,
    setAddressLine2,
    setCity,
    setPincode,
    addPageloading,
  } = props;
  return (
    <>
      {addPageloading ? (
        <div
          style={{
            display: "grid",
            placeItems: "center",
            width: "50%",
            height: "200px",
          }}
        >
          <img src={Loader} alt="loader" style={{ width: "50%" }} />
        </div>
      ) : (
        <section className={style.leftSection}>
          {showAddAddressModal && (
            <AddAddressModal
              handleInput={handleInput}
              userToken={userToken}
              userInfo={userInfo}
              setPhone={setPhone}
              setEmail={setEmail}
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              addressLine1={addressLine1}
              setAddressLine1={setAddressLine1}
              addressLine2={addressLine2}
              setAddressLine2={setAddressLine2}
              city={city}
              setCity={setCity}
              pincode={pincode}
              setPincode={setPincode}
              pinApiCall={pinApiCall}
              state={state}
              setState={setState}
              country={country}
              setCountry={setCountry}
              addAddress={addAddress}
              errors={errors}
              otpModelCloseBtnRef={otpModelCloseBtnRef}
              showAddAddressModal={showAddAddressModal}
              setShowAddAddressModal={setShowAddAddressModal}
            />
          )}
          <div className={style.savedAddCont}>
            <div className="">
              <p className="mb-0 bold mt-4">Phone</p>
              <Input
                disabled={onPayment}
                type={"text"}
                placeholder={"Mobile"}
                minLength={10}
                maxLength={10}
                name={"phone"}
                value={phone}
                onChange={(e) => handleInput(e, "phone", setPhone)}
                err={errors && errors.phone}
              />
              <h5 className={`bold mt-5`}>Saved Addresses</h5>
            </div>

            {userToken && !onPayment && (
              <button
                className="btn btn-outline-primary my-3"
                onClick={() => {
                  setShowAddAddressModal(true);
                }}
              >
                Add New Address
              </button>
            )}
            <div className={style.allAddCont}>
              {/* {console.log({ addresses })} */}
              {addresses &&
                !!addresses.length &&
                addresses.map((item, index) => (
                  <div
                    key={index}
                    className={`${style.secondaryCont}`}
                    style={{
                      background:
                        selectedAddress && selectedAddress._id === item._id
                          ? "#cae7e7"
                          : "",
                      position: "relative",
                    }}
                    disabled={
                      selectedAddress && selectedAddress._id === item._id
                    }
                    onClick={() => selectAddress(item)}
                  >
                    {/* <div className={style.addressCont}>
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          padding: "2% 3%",
                          width: "max-content",
                        }}
                      >
                        <AiOutlineUser
                          style={{
                            marginRight: "20px",
                            fontSize: "20px",
                            color:
                              selectedAddress &&
                              selectedAddress._id === item._id
                                ? "goldenrod"
                                : "",
                          }}
                        />
                        <span>
                          <b>{item.name}</b>
                        </span>
                      </span>
                      <span
                        style={{ position: "absolute", top: "1%", right: "1%" }}
                      >
                        {selectedAddress && selectedAddress._id === item._id ? (
                          <img
                            src={Select}
                            style={{
                              width: "40px",
                              height: "40px",
                              objectFit: "contain",
                            }}
                            alt="select"
                          ></img>
                        ) : (
                          ""
                        )}
                      </span>
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          padding: "2% 3%",
                          width: "max-content",
                        }}
                      >
                        <BsTelephone
                          style={{
                            marginRight: "20px",
                            fontSize: "20px",
                            color:
                              selectedAddress &&
                              selectedAddress._id === item._id
                                ? "goldenrod"
                                : "",
                          }}
                        />
                        <span>{item.phone ? item.phone : "No Phone"}</span>
                      </span>
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",

                          padding: "2% 3%",
                          width: "max-content",
                        }}
                      >
                        <AiOutlineHome
                          style={{
                            marginRight: "20px",
                            fontSize: "20px",
                            color:
                              selectedAddress &&
                              selectedAddress._id === item._id
                                ? "goldenrod"
                                : "",
                          }}
                        />
                        {item.line1}
                        {item.line2 && item.line2.length ? (
                          <>
                            <br />
                            {item.line2}
                            <br />
                          </>
                        ) : (
                          <></>
                        )}
                      </span>
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",

                          padding: "2% 3%",
                          width: "max-content",
                        }}
                      >
                        <MdLocationSearching
                          style={{
                            marginRight: "20px",
                            fontSize: "20px",
                            color:
                              selectedAddress &&
                              selectedAddress._id === item._id
                                ? "goldenrod"
                                : "",
                          }}
                        />
                        <span>
                          {item.city}, {item.state}
                        </span>
                        {" - "}
                        <span>{item.country}</span>
                        {" - "}
                        <span>{item.pincode}</span>
                      </span>
                      <p></p>
                    </div> */}
                    <div className={style.addressCont}>
                      <span
                        style={{ position: "absolute", top: "1%", right: "1%" }}
                      >
                        {selectedAddress && selectedAddress._id === item._id ? (
                          <img
                            src={Select}
                            style={{
                              width: "40px",
                              height: "40px",
                              objectFit: "contain",
                            }}
                            alt="select"
                          ></img>
                        ) : (
                          ""
                        )}
                      </span>
                      <p>
                        <AiOutlineUser
                          style={{
                            marginRight: "10px",
                            fontSize: "16px",
                            color:
                              selectedAddress &&
                              selectedAddress._id === item._id
                                ? "goldenrod"
                                : "",
                          }}
                        />
                        <span>
                          <b>{item.name}</b>
                        </span>
                        {"  "}
                        {item.phone ? (
                          <p style={{ margin: "unset" }}>
                            <AiOutlineUser
                              style={{
                                marginRight: "10px",
                                fontSize: "16px",
                                color:
                                  selectedAddress &&
                                  selectedAddress._id === item._id
                                    ? "goldenrod"
                                    : "",
                              }}
                            />{" "}
                            <span>
                              <b>{item.phone}</b>
                            </span>
                          </p>
                        ) : (
                          <></>
                        )}
                      </p>
                      <p>
                        <MdLocationSearching
                          style={{
                            marginRight: "10px",
                            fontSize: "16px",
                            color:
                              selectedAddress &&
                              selectedAddress._id === item._id
                                ? "goldenrod"
                                : "",
                          }}
                        />{" "}
                        <span>{item.line1}</span>
                        {/* {item.line2 && item.line2.length ? (
                          <> {item.line2} </>
                        ) : (
                          <></>
                        )} */}
                      </p>
                      <p>
                        <ImLocation
                          style={{
                            marginRight: "10px",
                            fontSize: "16px",
                            color:
                              selectedAddress &&
                              selectedAddress._id === item._id
                                ? "goldenrod"
                                : "",
                          }}
                        />{" "}
                        <span>
                          {item.city}, {item.state}
                        </span>
                        <span>, {item.country}</span>
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {!onPayment && (
            <div className="p-3">
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

              {!isShippingBilling && (
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
                            {billingAddressLine2 &&
                            billingAddressLine2.length ? (
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
                              handleInput(
                                e,
                                "billingLastName",
                                setBillingLastName
                              )
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
                              handleInput(
                                e,
                                "billingPincode",
                                setBillingPincode
                              );
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
                              handleInput(
                                e,
                                "billingCountry",
                                setBillingCountry
                              )
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
          )}
        </section>
      )}
    </>
  );
};

export default SavedContactInfo;
