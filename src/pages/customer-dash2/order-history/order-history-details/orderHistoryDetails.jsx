import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router";
import {
  cancelOrder,
  getInvoiceUrls,
  getOrderDetailShipRocketApi,
  getOrderDetails,
  getTrackingInfo,
} from "../../../../config/configService";
import style from "./orderHistoryDetails.module.css";
import { formatCurrency } from "../../../../utlils/variables-and-small functions";

// -------------------------------------------------------

const Ordered = () => {
  const [orderDetails, setOrderDetails] = useState({});
  const [productList, setProductList] = useState({});
  const [orderData, setOrderData] = useState({});
  const [confirmed, setConfirmed] = useState(false);
  const [shipped, setShipped] = useState(false);
  const [transit, setTransit] = useState(false);
  const [outForDivivery, setOutForDivivery] = useState(false);
  const [dilivered, setDilivered] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [returnOrder, setReturnOrder] = useState([]);
  const [trackingData, setTrackingData] = useState({});
  const [awb, setAwb] = useState("");
  const checkBox = useRef("");

  const aa = useParams();
  const orderId = aa.id.split("__")[0];
  // ----------------------- useEffects --------------------------------

  const fetchOrderDetails = async (orderId) => {
    try {
      setLoading(true);
      console.log("order id in fetch-order-detail:", orderId);
      if (!orderId) return;
      const res = await getOrderDetails(orderId);
      console.log("order details result", res);
      if (!res || res.issue) throw new Error("something went wrong");
      setOrderDetails(res.result);
      console.log("order details result", res.result);
      const abwRes = res.result.orderData.order_id;
      setAwb(abwRes);
      listProduct(res.result);
      PriceGen(res.result);
      fetchTrackingInfo(abwRes);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const fetchTrackingInfo = async (awbData) => {
    try {
      const res = await getOrderDetailShipRocketApi(awbData);
      console.log("tracking info", res);
      setTrackingData(res.result);
      if (res.result.status_code === 5) {
        setCancelled(true);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchOrderDetails(orderId);
  }, []);

  const downloadInvoice = async () => {
    try {
      const orderId = orderDetails.orderData.order_id;
      setLoading(true);
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

  const handleOrderCancel = async () => {
    try {
      const orderId = orderDetails.orderData.order_id;
      setLoading(true);
      const res = await cancelOrder(orderId);
      console.log("Cancelling", res);
      if (!res) throw new Error("no response from server");
      // if (res.error) throw new Error(res.error);
      if (!res.issue) {
        console.log("order cancelled");
        // fetchOrderDetails(orderId);
        fetchTrackingInfo(awb);
        // setTrackingData("CANCELLATION IN PROGRESS");
      }
    } catch (error) {
      console.log("error in cancel order: ", error);
    } finally {
      setLoading(false);
    }
  };

  const listProduct = (ele) => {
    // console.log("list product", ele.awbData.response.data.awb_code);
    if (ele && ele.frontendOrder) {
      let obj = {};
      let a = Object.keys(ele.frontendOrder);
      for (let i = 0; i < a.length; i++) {
        obj[ele.frontendOrder[i].productName] = {
          qty: ele.frontendOrder[i].quantity,
          name: ele.frontendOrder[i].productName,
          img: ele.frontendOrder[i].image,
          brandName: ele.frontendOrder[i].brandName,
          price: ele.frontendOrder[i].price,
          skuId: ele.frontendOrder[i].inventory.skuId,
        };
      }
      setProductList(obj);
    }
  };

  const PriceGen = (ele) => {
    if (ele?.storeOrder) {
      const {
        sub_total = 0,
        total_discount = 0,
        shipping_charges = 0,
        billing_customer_name = "",
        billing_last_name = "",
        billing_address = "",
        billing_address_2 = "",
        shipping_customer_name = "",
        shipping_last_name = "",
        shipping_address = "",
        shipping_address_2 = "",
        payment_method = "",
        billing_pincode = "",
        shipping_pincode = "",
      } = ele.storeOrder;

      setOrderData((prev) => ({
        ...prev,
        sub_total,
        total_discount,
        shipping_charges,
        grandTotal:
          sub_total && shipping_charges ? sub_total + shipping_charges : 0,
        billing_customer_name,
        billing_last_name,
        billing_address,
        billing_address_2,
        shipping_customer_name,
        shipping_last_name,
        shipping_address,
        shipping_address_2,
        payment_method,
        billing_pincode,
        shipping_pincode,
      }));
    }
  };

  // const currentStatus = () => { }
  const handleReturnOrder = () => {};

  // ---------------------------------------------------

  return (
    <div className={style.mainDiv}>
      <div className={`${style.heading} mt-3`}>
        <i className="fa-solid fa-circle-check"></i>
        <h5> We received your order!</h5>
        <p>
          Your order with order id{" "}
          <span style={{ color: "#26a541" }}>
            #{orderDetails?.storeOrder?.order_id || "Empty"}
          </span>{" "}
          is{" "}
          <span style={{ color: cancelled ? "red" : "" }}>
            {trackingData.status}
          </span>
        </p>
      </div>
      {loading ? (
        "Loading..."
      ) : (
        <div className={style.details}>
          <div className={style.left}>
            {/* --------------------------------------- */}
            <div className={style.odrDtls}>
              <h6>Order Details</h6>
              {Object.values(productList).map((productListKey, index) => (
                <div
                  className={style.prodCont}
                  key={productListKey.skuId ? productListKey.skuId : index}
                >
                  <img src={productListKey.img} width={100} alt="" />
                  <div className={style.prodDet}>
                    <div>
                      <p className={style.prodName}>
                        <span>
                          {productListKey.name} x {productListKey.qty}
                        </span>
                      </p>
                      <p className={style.brandName}>
                        {productListKey.brandName}
                      </p>
                    </div>
                    <span className={style.prodPrice}>
                      {formatCurrency(productListKey.price)}
                    </span>
                  </div>
                </div>
              ))}
              <hr />
            </div>
            <div className={style.cartTotal}>
              <div className={style.cartTotalChild}>
                <p>Subtotal</p>
                <p>{formatCurrency(orderData.sub_total)}</p>
              </div>
              <div className={style.cartTotalChild}>
                {/* <p>Discount</p> */}
                {/* <p>{formatCurrency(orderData.total_discount)}</p> */}
              </div>
              <div className={style.cartTotalChild}>
                <p>Shipping</p>
                <p>{formatCurrency(orderData.shipping_charges)}</p>
              </div>
              <hr />
              <div className={`${style.cartTotalLastChild}`}>
                <p>Total</p>
                <p>{formatCurrency(orderData.grandTotal)}</p>
              </div>
            </div>
          </div>
          <aside
            className={style.right}
            style={{
              boxSizing: "border-box",
              border: "1px solid #00053564",
            }}
          >
            <div className={style.rightContainer} style={{ width: "100%" }}>
              <div className={style.rightSecCont}>
                <div className={style.shipAddCont}>
                  <div className={style.addInfo}>
                    <div className={style.addTitle}>
                      <h5>Shipping Address</h5>
                    </div>
                    <div className={style.addName}>
                      <p>
                        {orderData.shipping_customer_name}{" "}
                        {orderData.shipping_last_name}
                      </p>
                    </div>
                    <div className={style.address}>
                      <address>
                        {orderData.shipping_address}, <br />
                        {orderData.shipping_address_2}, <br />
                        {orderData.shipping_pincode}
                      </address>
                    </div>
                  </div>
                  <div className={style.billAddCont}>
                    <div className={style.addInfo}>
                      <div className={style.addTitle}>
                        <h5>Billing Address</h5>
                      </div>
                      <div className={style.addName}>
                        <p>
                          {orderData.billing_customer_name}{" "}
                          {orderData.billing_last_name}
                        </p>
                      </div>
                      <div className={style.address}>
                        <address>
                          {orderData.billing_address} , <br />
                          {orderData.billing_address_2} , <br />{" "}
                          {orderData.billing_pincode}
                        </address>
                      </div>
                    </div>
                  </div>

                  <div className={style.addInfo}>
                    <div className={style.addTitle}>
                      <h5>Payment Info</h5>
                    </div>
                    <div className={style.addName}>
                      <p>
                        {orderData.payment_method === "COD"
                          ? "Cash On Dilivery"
                          : "Online"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={style.rcBtns}>
                <button
                  className={`btn btn-success btn-sm w-100 my-1 ${style.cToABtns}`}
                  onClick={downloadInvoice}
                >
                  Download Invoice
                </button>
                <button
                  className={`btn btn-danger btn-sm w-100 my-1 ${style.cToABtns}`}
                  onClick={() => {
                    handleOrderCancel();
                  }}
                  disabled={cancelled}
                  style={{
                    filter: cancelled ? "grayscale(1)" : "",
                  }}
                >
                  {cancelled ? "Cancelled" : "Cancel Order"}
                </button>

                {/* <button
                  className={`btn btn-secondary btn-sm w-100 my-1 ${style.cToABtns}`}
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdropStart"
                >
                  Return Order
                </button> */}

                <div
                  className="modal fade"
                  id="staticBackdropStart"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">
                          Return Order/Items
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <p className="fs-5">Select Items Return</p>
                        {Object.values(productList).map(
                          (productListKey, index) => (
                            <div
                              key={
                                productListKey.skuId
                                  ? productListKey.skuId
                                  : index
                              }
                              className={style.ItemCont}
                            >
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="flexCheckDefault"
                                  ref={checkBox}
                                  onChange={() => {
                                    setReturnOrder((curr) => {
                                      let found = false;
                                      if (curr && curr.length) {
                                        for (let i = 0; i < curr.length; i++) {
                                          if (
                                            curr[i].name.includes(
                                              productListKey.skuId
                                            )
                                          ) {
                                            found = true;
                                            break;
                                          } else {
                                            found = false;
                                          }
                                        }
                                        if (found) {
                                          let next = curr.filter(
                                            (el) =>
                                              el.skuId !== productListKey.skuId
                                          );
                                          return next;
                                        } else {
                                          let next = [...curr, productListKey];
                                          return next;
                                        }
                                      } else {
                                        let next = [...curr, productListKey];
                                        return next;
                                      }
                                    });
                                  }}
                                />
                                <label
                                  className="form-check-label w-100"
                                  htmlFor="flexCheckDefault"
                                >
                                  <div className={style.prodCont}>
                                    <img
                                      src={productListKey.img}
                                      width={100}
                                      alt=""
                                    />
                                    <div className={style.prodDet}>
                                      <div>
                                        <p className={style.prodName}>
                                          <span> x {productListKey.qty}</span>
                                        </p>
                                        <p className={style.brandName}>
                                          {productListKey.brandName}
                                        </p>
                                      </div>
                                      <span className={style.prodPrice}>
                                        {formatCurrency(productListKey.price)}
                                      </span>
                                    </div>
                                  </div>
                                </label>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" className="btn btn-primary">
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <button
                className={`btn btn-secondary btn-sm w-100 my-1 ${style.cToABtns}`}
                data-bs-toggle="modal"
                data-bs-target="#staticBackdropOne"
              >
                Return Order
              </button>

              <div
                className="modal fade"
                id="staticBackdropOne"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabelOne"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="staticBackdropLabelOne">
                        Provide Details.
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="vidCont">
                        <p className="fs-5">Please Uplaod a video as proof.</p>
                        <InputFile
                          multiple={false}
                          accept={"video/mp4,video/x-m4v,video/*"}
                          imagesData={imagesData}
                          onChange={(v) => {
                            if (errors["imagesData"]) {
                              setErrors((cur) => {
                                let next = { ...cur };
                                delete next["imagesData"];
                                return next;
                              });
                            }
                            setImagesData(v);
                          }}
                          displaySize={"large"}
                          err={errors && errors.imagesData}
                        />
                      </div>
                      <hr />
                      <div className="reasonOfReturn">
                        <p className="fs-5">
                          {" "}
                          Please select reason from the list:
                        </p>
                        <div className={`form-check ${style.reasonsSelector}`}>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            value={"Reason One"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault2"
                          >
                            Reason One
                          </label>
                        </div>
                        <div className={`form-check ${style.reasonsSelector}`}>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            value={"Reason Two"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault2"
                          >
                            Reason Two
                          </label>
                        </div>
                        <div className={`form-check ${style.reasonsSelector}`}>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            value={"Reason Three"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault2"
                          >
                            Reason Three
                          </label>
                        </div>
                        <div className={`form-check ${style.reasonsSelector}`}>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            value={"Reason Four"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault2"
                          >
                            Reason Four
                          </label>
                        </div>
                        <div className={`form-check ${style.reasonsSelector}`}>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            value={"Reason Five"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault2"
                          >
                            Reason Five
                          </label>
                        </div>
                        <div className={`form-check ${style.reasonsSelector}`}>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            value={"Reason Six"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault2"
                          >
                            Reason Six
                          </label>
                        </div>
                        <div className={`form-check ${style.reasonsSelector}`}>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            value={"Reason Seven"}
                          />
                          <label
                            className="form-check-label"
                            for="flexRadioDefault2"
                          >
                            Reason Seven
                          </label>
                        </div>
                      </div>
                      <hr />
                      <div className="commentCont">
                        <div className="form-floating">
                          <p className="fs-5">Provide Comments</p>
                          <textarea
                            className={`form-control ${style.reasonsSelector}`}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="button" className="btn btn-primary">
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div> */}
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Ordered;
