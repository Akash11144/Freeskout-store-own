import React from "react";
import Styles from "./index.module.css";
import { BsApple } from "react-icons/bs";
import { FaGooglePlay } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { MdCall } from "react-icons/md";
const Footer = () => {
  return (
    <>
      <footer className={Styles.footerContainer}>
        <div className={Styles.footerIcons}>
          <div className={Styles.socialIcons}>
            <div className={Styles.borderWrapper}>
              <BsTwitter className={`${Styles.i}`} />
            </div>
            <div className={Styles.borderWrapper}>
              <FaFacebookF className={`${Styles.i}`} />
            </div>
            <div className={Styles.borderWrapper}>
              <BsInstagram className={`${Styles.i}`} />
            </div>
            <div className={Styles.borderWrapper}>
              <FiMail className={`${Styles.i}`} />
            </div>
            <div className={Styles.borderWrapper}>
              <MdCall className={`${Styles.i}`} />
            </div>
          </div>
          <div className={Styles.copyright}>
            <p>©️ Copyright 2022, All Right Reserved by Freeskout</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
