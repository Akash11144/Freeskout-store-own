import React, { useState } from "react";
import style from "./customerProfile.module.css";
import globle from "../customerDashGloble.module.css";
import { Input } from "../../../components/commonComponents/input-box";
import { useUserSetting } from "../../../state-managers/cart-state";

const CustomerProfile = () => {
  const userInfo = useUserSetting((state) => state.info);
  return (
    <>
      {/* {console.log({ userInfo })} */}
      <div className={`${style.customerProfileContainer}`}>
        <div className={`${globle.header}`}>
          <h5 className={`${style.customerProfileHead}`}>Profile</h5>
          <button className="btn btn-sm btn-outline-warning">
            <i className="fa-regular fa-pen-to-square"></i>
          </button>
        </div>
        <form className={`${style.cpFormSection}`}>
          <div className={`${style.cpFormInput}`}>
            <label className={`${style.cpFormInputLabel}`}>
              First & Last Name
            </label>
            <div className={`${style.cpFormRightName}`}>
              <Input
                type={"text"}
                placeholder={"First Name"}
                value={userInfo.name.split(" ")[0]}
                disabled={true}
              ></Input>
              <Input
                type={"text"}
                placeholder={"Last Name"}
                value={userInfo.name.split(" ")[1]}
                disabled={true}
              ></Input>
            </div>
          </div>
          <div className={`${style.cpFormInput}`}>
            <label className={`${style.cpFormInputLabel}`}>Gender</label>
            <div className={`${style.cpFormRightGender}`}>
              <input type="radio" name="gender" id="male" value="male" />
              <label htmlfor="male">Male</label>
              <input type="radio" name="gender" id="female" value="male" />
              <label htmlfor="female">Female</label>
              <input type="radio" name="gender" id="other" value="male" />
              <label htmlfor="other">Other</label>
            </div>
          </div>
          <div className={`${style.cpFormInput}`}>
            <label className={`${style.cpFormInputLabel}`}>Email Address</label>
            <div className={`${style.cpFormRightEmail}`}>
              <Input
                type={"email"}
                placeholder={"Email"}
                value={userInfo.email}
                disabled={true}
              ></Input>
            </div>
          </div>
          <div className={`${style.cpFormInput}`}>
            <label className={`${style.cpFormInputLabel}`}>Phone Number</label>
            <div className={`${style.cpFormRightEmail}`}>
              <Input
                type={"text"}
                placeholder={"Phone"}
                value={userInfo.phone}
                disabled={true}
              ></Input>
            </div>
          </div>
          <button
            className={`${style.cpFormBtn}`}
            onClick={(e) => {
              e.preventDefault();
              alert("This functionality will be available soon");
            }}
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default CustomerProfile;
