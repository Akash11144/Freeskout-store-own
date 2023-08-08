import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { getInvoiceUrls } from "../../../config/configService";
import { TRACKING_STATUS_MAP } from "../../../constants";
import {
  calculateTotalPrice,
  dateTimeFormat,
  formatCurrency,
} from "../../../utlils/variables-and-small functions";
import style from "./productStatusNav.module.css";

const ProductStatusNav = (props) => {
  const { order, orderTrackingData } = props;
  const [loading, setLoading] = useState(false);
  const navi = useNavigate();

  const orderDate = useMemo(() => {
    if (order && order.createdAt) {
      return dateTimeFormat(order.createdAt);
    }
    return "no date found";
  }, [order]);

  const trackingStatus = useMemo(() => {
    if (
      !orderTrackingData ||
      !orderTrackingData.tracking_data ||
      isNaN(orderTrackingData.tracking_data.track_status)
    )
      return "no status yet!";

    if (orderTrackingData.tracking_data.track_status === 0)
      return "Ready for Pickup";
    if (
      !orderTrackingData ||
      !orderTrackingData.tracking_data ||
      !orderTrackingData.tracking_data.shipment_status
    )
      return "checking..";
    const num = orderTrackingData.tracking_data.shipment_status;
    return TRACKING_STATUS_MAP[num] || "no status yet";
  }, [orderTrackingData]);

  const totalCount = useMemo(() => {
    if (!order || !order.storeOrder || !order.storeOrder.sub_total) {
      // console.log("heheheeheheheheheheh");
      return "Checking..";
    }
    const total = calculateTotalPrice(order.storeOrder);
    // console.log("total", total);
    return total.toFixed(2);
  }, [order]);

  const orderId = useMemo(() => {
    if (!order || !order.orderData || !order.orderData.order_id) {
      return "Checking..";
    }
    const id = order.orderData.order_id;
    return id;
  }, [order]);

  const downloadInvoice = async () => {
    try {
      setLoading(true);
      const orderId = order.orderData.order_id;
      const res = await getInvoiceUrls([orderId]);
      if (!res) throw new Error("no response from server");
      if (res.error) throw new Error(res.error);

      // console.log("shipping label generation response", res.result);

      let url = res.result.invoiceData.invoice_url;
      window.open(url, "_self");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const goToOrder = () => {
    console.log("click", order);
    if (!order || !order._id) return;
    navi(`/profile/orderDetails/${order._id}`);
    console.log("shubham");
  };
  return (
    <div className={`${style.mainCont}`}>
      <div className={style.stsCont}>
        <div className={`${style.orderIdCont}`}>
          <span>Order ID: </span> <span>{orderId}</span>
        </div>
        <div className={`${style.orderIdCont}`}>
          <span>Date: </span> <span>{orderDate}</span>
        </div>
        <div className={`${style.orderIdCont}`}>
          <span>Order Status: </span> <span>{trackingStatus}</span>
        </div>
      </div>
      <div className={`${style.btnCont}`}>
        <button
          className="btn btn-secondary btn-sm me-2"
          onClick={downloadInvoice}
        >
          View Invoice
        </button>
        <button onClick={goToOrder} className="btn btn-primary btn-sm">
          View Order
        </button>
      </div>
    </div>
  );
};

export default ProductStatusNav;
