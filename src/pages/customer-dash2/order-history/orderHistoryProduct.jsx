import React, { useEffect, useMemo, useState } from "react";
import style from "./orderHistoryProduct.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { getInvoiceUrls } from "../../../config/configService";
import { dateTimeFormat } from "../../../utlils/variables-and-small functions";

const OrderHistoryProduct = (props) => {
  // console.log({ props });
  const { order, orderTrackingData } = props;
  const [loading, setLoading] = useState(false);
  const [productData, setproductData] = useState([]);
  const [productList, setProductList] = useState({});

  const navi = useNavigate();

  // ----------------------- useEffects --------------------------------

  const showEstimatedPickupDate = useMemo(() => {
    if (
      !orderTrackingData ||
      !orderTrackingData.tracking_data ||
      isNaN(orderTrackingData.tracking_data.track_status)
    )
      return true;
    if (orderTrackingData.tracking_data.track_status === 0) return true;
    return false;
  }, [orderTrackingData]);

  const estimatedPickupDate = useMemo(() => {
    if (showEstimatedPickupDate) {
      return order.pickupData.response.pickup_scheduled_date;
    }
    return null;
  }, [order, showEstimatedPickupDate]);

  const subtotal = useMemo(() => {
    if (!order || !order.storeOrder || !order.storeOrder.sub_total) {
      return "Calculating";
    }
    return order.storeOrder.sub_total;
  }, [order]);

  const discount = useMemo(() => {
    if (!order || !order.storeOrder || !order.storeOrder.total_discount) {
      return "Calculating";
    }
    return order.storeOrder.total_discount;
  }, [order]);

  const shipping = useMemo(() => {
    if (!order || !order.storeOrder || !order.storeOrder.shipping_charges) {
      return "Calculating";
    }
    return order.storeOrder.shipping_charges;
  }, [order]);

  const settingProductData = async (arr) => {
    let a = Object.keys(arr).length;
    let b = [];
    let length = a > 2 ? 2 : arr.length;
    for (let i = 0; i < length; i++) {
      b.push(arr[i]);
      // console.log(arr[i], i, b);
    }
    setproductData(b);
  };
  const listProduct = () => {
    let obj = {};
    let a = Object.keys(props.order.frontendOrder);
    for (let i = 0; i < a.length; i++) {
      obj[props.order.frontendOrder[i].productName] = [
        props.order.frontendOrder[i].quantity,
        props.order.frontendOrder[i].image,
        props.order.frontendOrder[i].brandName,
        props.order.frontendOrder[i].price,
      ];
    }
    setProductList(obj);
  };
  useEffect(() => {
    settingProductData(props.order.frontendOrder);
    listProduct();
  }, [order]);

  const calculateTotal = (a, b, c) => {
    let d = a + b - c;
    return d;
  };
  return (
    <>
      {/* {console.log({ order })} */}
      <div className={`${style.mainCont}`}>
        <div className={style.secondaryCont}>
          <div className={style.secondaryLeftCont}>
            <div className="w-50">
              {productList &&
                Object.keys(productList).map((productListKey, index) => (
                  <div className={style.prodCont} key={index}>
                    <img
                      src={productList[productListKey][1]}
                      width={100}
                      alt=""
                      className={style.prodImg}
                    />
                    <div className={style.prodDet}>
                      <div>
                        <p className={style.prodName}>
                          {productListKey}
                          <span> x {productList[productListKey][0]}</span>
                        </p>
                        <p className={style.brandName}>
                          {productList[productListKey][2]}
                        </p>
                      </div>{" "}
                      <span className={style.prodPrice}>
                        {"₹"}
                        {productList[productListKey][3]}
                      </span>
                    </div>
                    <hr />
                  </div>
                ))}
            </div>
            <div className={style.secondaryRightCont}>
              {showEstimatedPickupDate ? (
                <>
                  <p className={style.estCont}>Scheduled Pickup Date: </p>{" "}
                </>
              ) : (
                <>
                  <p className={style.estCont}>Estimated Delivery Date: </p>{" "}
                </>
              )}
              <span className={style.estDate}>
                {" "}
                {showEstimatedPickupDate
                  ? dateTimeFormat(new Date(estimatedPickupDate))
                  : orderTrackingData
                  ? dateTimeFormat(
                      new Date(orderTrackingData.tracking_data.etd)
                    )
                  : ""}
              </span>
            </div>
          </div>
        </div>
        <div className={style.tertiaryCont}>
          <div>
            <span className={style.footerHeadingCont}>Sub Total : </span>
            <span className={style.footerDataCont}>₹ {subtotal}</span>
          </div>
          <div>
            <span className={style.footerHeadingCont}>Shipping : </span>
            <span className={style.footerDataCont}>₹ {shipping}</span>
          </div>
          {/* <div>
            <span className={style.footerHeadingCont}>Disount : </span>
            <span className={style.footerDataCont}>₹ {discount}</span>
          </div> */}
          <div>
            <span className={style.footerHeadingCont}>Total : </span>
            <span className={style.footerDataCont}>
              ₹ {calculateTotal(subtotal, shipping, 0)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderHistoryProduct;
