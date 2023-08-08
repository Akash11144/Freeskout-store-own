import Styles from "./index.module.css";
const NotificationAlerts = () => {
  return (
    <div className={Styles.NotificationAlertsCont}>
      <h1 className={`${Styles.subscribeHead}`}>
        We sell goods made with goodness
      </h1>
      <p className={`${Styles.subscribeDesc}`}>
        Subscribe to our newsletter for exclusive deals and new arrivals. Don't
        miss out on the best offers. Join now and stay in the loop!
      </p>
      <p className={`${Styles.subscribeDivider}`}>///////////////////</p>
      <div className={`${Styles.notificationSubscriberDiv}`}>
        <p className={`${Styles.subscribePara}`}>
          Join in to get weekely updates
        </p>
        <div className={`${Styles.SubscriberNotificationInputHolder}`}>
          <div className={Styles.colorDiv}></div>
          <div className={`input-group mb-3 ${Styles.subscribeInputHolders}`}>
            <input
              type="email"
              className={`form-control ${Styles.subscribeInput}`}
              placeholder="E-Mail"
              aria-label="E-Mail"
              aria-describedby="subscribe-aria"
            />
            <span className={`input-group-text ${Styles.subscribeBtn}`}>
              Subscribe
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationAlerts;
