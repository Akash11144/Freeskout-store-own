import Check from "../../../assets/icons/Check";
import style from "../checkout.module.css";
const OrderConfirmed = (props) => {
  const {
    confirmedOrders,
    failedOrders,
    subTotalAmount,
    taxRate,
    shippingRate,
    totalRate,
    productList,
    getCartProductImage,
  } = props;
  return (
    <div className="container">
      {/* <h6 className={`${style.regular} text-muted`}>Order Details</h6> */}
      <div className="p-3 my-3 d-flex row">
        <div className="col-xl-8 col-lg-8 col-md-12 col-12">
          <div className="pt-3">
            <div className="d-flex justify-content-start align-items-center gap-2 py-3">
              <Check size={60} color={"#4f0b27"} />
              <div className="ms-2">
                <h4 className={`${style.size26} ${style.extraBold}`}>
                  Order Confirmed!
                </h4>
                <p className={`${style.light} mb-0 text-muted`}>
                  Thank you for ordering.
                  {/* Your order is confirmed and is ready to ship. */}
                </p>
              </div>
            </div>

            <hr />
          </div>

          {confirmedOrders && !!confirmedOrders.length && (
            <>
              {confirmedOrders.map((item, orderIndex) => (
                <div key={orderIndex}>
                  <p className={`text-muted mt-4 ${style.size12}`}>
                    <span className={`${style.light}`}>Order </span>
                    <span
                      className={`${style.italic} ${style.underline} ${style.light}`}
                    >
                      #{item.storeOrder.order_id}
                    </span>
                  </p>

                  <div>
                    {item.storeOrder.order_items.map(
                      (orderItem, orderItemIndex) => (
                        <div
                          key={orderItemIndex}
                          className="d-flex justify-content-start align-items-center gap-2 py-3"
                        >
                          <div>
                            <img
                              className={`${style.smallImg}`}
                              src={getCartProductImage(
                                orderItem.sku,
                                productList &&
                                  productList.length &&
                                  productList.filter(
                                    (el) =>
                                      `${el.skuId}__${
                                        el.product ? el.product._id : ""
                                      }` === orderItem.sku
                                  )[0].product
                              )}
                              alt={"product"}
                            />
                          </div>
                          <div className="ms-2">
                            <div>
                              <p className={`${style.bold} mb-0`}>
                                {productList &&
                                  productList.length &&
                                  productList.filter(
                                    (el) =>
                                      `${el.skuId}__${
                                        el.product ? el.product._id : ""
                                      }` === orderItem.sku
                                  )[0].product.productName}
                              </p>
                              <p className={`${style.light} text-muted mb-4`}>
                                {orderItem.sku.split("__")[0]}
                              </p>
                            </div>

                            <div>
                              <p className={`${style.bold} mb-0`}>
                                ₹ {orderItem.selling_price}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                  {/* <p className="my-1">{JSON.stringify(item, null, 2)}</p> */}
                </div>
              ))}

              <hr />

              <div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="text-muted">Subtotal</p>
                  <p className="text-muted">₹ {subTotalAmount}</p>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <p className="text-muted">Tax</p>
                  <p className="text-muted">₹ {taxRate}</p>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <p className="text-muted">Shipping</p>
                  <p className="text-muted">₹ {shippingRate}</p>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <p className={`${style.bold} mb-0`}>Total</p>
                  <p className={`${style.bold} mb-0`}>₹ {totalRate}</p>
                </div>
              </div>

              <div className="col-xl-4 col-lg-4 col-md-12">
                <div className={`${style.lightBg} p-4 rounded`}>
                  <p className={`${style.bold} ${style.size18}`}>
                    Shipping Address
                  </p>

                  <div className="my-4">
                    <p
                      className={`${style.semiBold} ${style.size16} mb-2 text-dark`}
                    >
                      {confirmedOrders[0].storeOrder.shipping_customer_name}{" "}
                      {
                        confirmedOrders[0].storeOrder
                          .shipping_customer_last_name
                      }
                    </p>
                    <p className="mb-0 text-secondary">
                      {confirmedOrders[0].storeOrder.shipping_address}
                    </p>
                    {confirmedOrders[0].storeOrder.shipping_address_2 &&
                      confirmedOrders[0].storeOrder.shipping_address_2.length}
                    <p className="mb-0 text-secondary">
                      {confirmedOrders[0].storeOrder.shipping_address_2}
                    </p>
                    <p className="mb-0 text-secondary">
                      {confirmedOrders[0].storeOrder.shipping_city},{" "}
                      {confirmedOrders[0].storeOrder.shipping_state},{" "}
                      {confirmedOrders[0].storeOrder.shipping_country} -{" "}
                      {confirmedOrders[0].storeOrder.shipping_pincode}
                    </p>
                  </div>

                  <p className={`${style.bold} ${style.size18} mt-5`}>
                    Billing Address
                  </p>

                  <div className="my-4">
                    <p
                      className={`${style.semiBold} ${style.size16} mb-2 text-dark`}
                    >
                      {confirmedOrders[0].storeOrder.billing_customer_name}{" "}
                      {confirmedOrders[0].storeOrder.billing_customer_last_name}
                    </p>
                    <p className="mb-0 text-secondary">
                      {confirmedOrders[0].storeOrder.billing_address}
                    </p>
                    {confirmedOrders[0].storeOrder.billing_address_2 &&
                      confirmedOrders[0].storeOrder.billing_address_2.length}
                    <p className="mb-0 text-secondary">
                      {confirmedOrders[0].storeOrder.billing_address_2}
                    </p>
                    <p className="mb-0 text-secondary">
                      {confirmedOrders[0].storeOrder.billing_city},{" "}
                      {confirmedOrders[0].storeOrder.billing_state},{" "}
                      {confirmedOrders[0].storeOrder.billing_country} -{" "}
                      {confirmedOrders[0].storeOrder.billing_pincode}
                    </p>
                  </div>

                  <p className={`${style.bold} ${style.size18} mt-5`}>
                    Payment Mode
                  </p>

                  <div className="my-4">
                    <p className={`${style.semiBold} mb-2 text-secondary`}>
                      {confirmedOrders[0].storeOrder.payment_method === "COD"
                        ? "Cash on Delivery"
                        : "Paid Online"}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
          <hr />
        </div>

        {failedOrders && !!failedOrders.length && (
          <>
            <h5>Failed Orders</h5>
            {failedOrders.map((item) => (
              <div>
                <p className="my-1">{JSON.stringify(item, null, 2)}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmed;
