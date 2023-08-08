import React, { useState } from "react";
import style from "./index.module.css";
import CustomerProfile from "./customer-profile/customerProfile";
import CustomerSideNav from "./sidebar-nav/customerSideNav";
import { Routes, Route, useNavigate } from "react-router-dom";
import Wishlist from "./customer-wishlist/index";
import OrderHistory from "./order-history/orderHistory";
import Ordered from "./order-history/order-history-details/orderHistoryDetails";
import { useUserSetting } from "../../state-managers/cart-state";

const CustomerDash2 = () => {
  const [active, setActive] = useState(false);

  return (
    <div>
      <div className={`${style.customerDashContainer}`}>
        <div style={{ position: "relative" }} className={`${style.mobileDas}`}>
          <i
            className="fa-solid fa-bars"
            onClick={() => setActive(!active)}
          ></i>
        </div>
        <div
          style={{ position: "relative" }}
          className={`${style.cusDashWrapper}`}
        >
          <div className={`${style.cdSidebarMain}`}>
            <div
              style={{ transition: "all .3s ease" }}
              className={` ${active ? style.mobSidebar : ""}`}
            >
              <CustomerSideNav />
            </div>
          </div>
          <div className={`${style.cdMainSection}`}>
            <Routes>
              <Route path="/" element={<CustomerProfile />} />
              <Route path="/order" element={<OrderHistory />} />
              <Route path="/orderDetails/:id" element={<Ordered />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDash2;
