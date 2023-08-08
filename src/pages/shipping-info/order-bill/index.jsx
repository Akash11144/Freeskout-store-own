import Prodetails from "../Prodetails";
import style from "../checkout.module.css";
import LoaderCOD from "../../../assets/gif/smileyLoading.gif";
import LoaderOnline from "../../../assets/gif/smileyLight.gif";
import Truck from "../../../assets/gif/truck.gif";
const OrderBill = (props) => {
  const {
    productData,
    subTotalAmount,
    taxRate,
    shippingRate,
    totalRate,
    onPayment,
    handlePayment,
    handleCreateNewAccount,
    sendRegistrationOtp,
    userToken,
    billPageloading,
    paymentLoaderOnline,
    paymentLoaderCOD,
  } = props;
  return (
    <aside className={style.rightSection}>
      <div className={`${style.details} mt-2`}>
        <div className={style.odrDtls}>
          <h6>Order Details</h6>
        </div>
        {!!productData.length &&
          productData.map((item, index) => {
            return <Prodetails key={index} {...item} />;
          })}
        <div className={style.cartTotal}>
          <hr />
          <div className={style.cartTotalChild}>
            <p
              style={{
                marginTop: "0.2rem",
                marginBottom: "0.2rem",
                fontWeight: "500",
              }}
            >
              Subtotal (inc tax)
            </p>
            <p style={{ marginTop: "0.2rem", marginBottom: "0.2rem" }}>
              ₹ {(+subTotalAmount + +taxRate).toFixed(2)}
            </p>
          </div>
          <hr />
          <div className={`${style.cartTotalChild} flex-column`}>
            {onPayment && !isNaN(shippingRate) ? (
              <div className="d-flex justify-content-between align-items-center w-100">
                <p
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: "400",
                    margin: "0.2rem",
                  }}
                >
                  Shipping
                </p>
                <p
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: "500",
                    margin: "0.2rem",
                  }}
                >
                  ₹ {shippingRate}
                </p>
              </div>
            ) : (
              <p
                style={{
                  fontSize: "0.7rem",
                  fontWeight: "300",
                  margin: "0.2rem",
                }}
              >
                Shipping will be calculated on next step
              </p>
            )}
            {/* {onPayment && !isNaN(taxRate) ? (
              <div className="d-flex justify-content-between align-items-center w-100">
                <p
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: "400",
                    margin: "0.2rem",
                  }}
                >
                  Tax
                </p>
                <p
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: "500",
                    margin: 0,
                  }}
                >
                  ₹ {taxRate}
                </p>
              </div>
            ) : (
              <></>
            )} */}
            {onPayment && !isNaN(shippingRate) && !isNaN(taxRate) ? (
              <>
                <hr />
                <div className="d-flex justify-content-between align-items-center w-100 mt-1 mb-2">
                  <p
                    style={{
                      marginTop: "0.2rem",
                      marginBottom: "0.2rem",
                      fontWeight: "500",
                    }}
                  >
                    Total
                  </p>
                  <p
                    style={{
                      marginTop: "0.2rem",
                      marginBottom: "0.2rem",
                    }}
                  >
                    ₹ {totalRate}
                  </p>
                </div>
              </>
            ) : (
              <></>
            )}
            {}
          </div>
          <hr />
        </div>

        {onPayment ? (
          <div className="d-flex flex-column">
            <button
              style={{ backgroundColor: "#000536", color: "#eee" }}
              disabled={paymentLoaderOnline || paymentLoaderCOD}
              onClick={() => {
                handlePayment("Prepaid");
              }}
            >
              {/* {paymentLoaderOnline ? "Processing..." : "Pay Online"} */}
              {paymentLoaderOnline ? (
                <img
                  src={LoaderOnline}
                  style={{ width: "50px", height: "50px" }}
                  alt="Processing..."
                />
              ) : (
                "Pay Online"
              )}
            </button>

            <button
              // disabled={handleDisableShipping()}
              disabled={paymentLoaderCOD || paymentLoaderOnline}
              onClick={() => {
                handlePayment("COD");
              }}
            >
              {paymentLoaderCOD ? (
                <img
                  src={LoaderCOD}
                  alt="Processing..."
                  style={{ width: "50px", height: "50px" }}
                />
              ) : (
                "Cash on Delivery"
              )}
            </button>
          </div>
        ) : (
          <button
            disabled={billPageloading}
            onClick={() => {
              userToken ? handleCreateNewAccount() : sendRegistrationOtp();
            }}
          >
            {billPageloading ? (
              <img
                src={Truck}
                alt="Processing..."
                style={{ width: "50px", height: "50px" }}
              />
            ) : (
              "Continue to Shipping"
            )}
          </button>
        )}
      </div>
    </aside>
  );
};

export default OrderBill;
