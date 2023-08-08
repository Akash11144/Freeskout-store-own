import React from "react";
import Styles from "./index.module.css";
import ExclusiveItemsCarousel from "./ItemsCarousel";
import NotificationAlerts from "./notificationAlerts";
const HomePageExclusiveDiv = () => {
  return (
    <React.Fragment>
      <div className={Styles.HomePageExclusiveCont}>
        <div className={Styles.leftDiv}>
          <NotificationAlerts />
        </div>
        <div className={Styles.rightDiv}>
          <ExclusiveItemsCarousel />
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomePageExclusiveDiv;
