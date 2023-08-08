/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useCart,
  useUserSetting,
  useWishList,
} from "../../state-managers/cart-state";
import Cartlist from "./cartlist";
import Styles from "./index.module.css";
import { setVisitCount } from "../../utlils/functions";
import {
  getInventoryBySkuIds,
  getMultipleProductData,
  getUserCart,
} from "../../config/configService";
import { removeAuthToken } from "../../services/storageService";
import { formatCurrency } from "../../utlils/variables-and-small functions";
import Loader from "../../components/loader";
import Looking from "../../assets/gif/looking.gif";

// ---------------------------------------------

const Cart = () => {
  const [newCartData, setNewCartData] = useState([]);
  const [inventoryMap, setInventoryMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [emptyCartError, setEmptyCartError] = useState(false);

  // ----------------------------

  const loc = useLocation();
  const navi = useNavigate();

  // -----------------------------

  const userToken = useUserSetting((state) => state.token);
  const resetUser = useUserSetting((state) => state.resetUser);

  const cartData = useCart((state) => state.cartData);
  const count = useCart((state) => state.count);
  const emptyCart = useCart((state) => state.emptyCart);

  const emptyWishlist = useWishList((state) => state.emptyWishlist);

  // -----------------------------

  let i = 0;
  useEffect(() => {
    if (!i) {
      const dt = new Date();
      const time = dt.getTime();
      let slug;

      if (!slug) {
        const sessionData = JSON.parse(sessionStorage.getItem("sesTest"));
        slug =
          sessionData && sessionData.slug
            ? sessionData.slug
            : "unknown_1-2_3-4";
      }

      const data = { slug, time };
      setVisitCount("/cart", data);
    }
    return () => {
      i = 1;
    };
  }, [loc.pathname]);

  useEffect(() => {
    userToken ? DataGen() : generateCartDataforLocal();
  }, [count, userToken]);

  useEffect(() => {
    newCartData.length && initInventory(newCartData);
  }, [newCartData]);

  // /////////////////////////////////

  const initInventory = async (cartDataList) => {
    try {
      // console.log("cartDataList", cartDataList);
      let skuIds = cartDataList.map((el) => {
        return `${el.skuId}__${el.productId}`;
      });

      const res = await getInventoryBySkuIds(skuIds);

      // console.log("cart-inventory result : ", res);
      if (!res) throw new Error("no response from server");
      if (!res.result) throw new Error("something went wrong");

      let newMap = {};
      res.result.map(
        (el) => (newMap[el.skuId] = { available: el.currentCount })
      );
      // console.log("cart inventory-map", newMap);
      setInventoryMap(newMap);
    } catch (error) {
      // console.log("initInventory error", error);
      setError(error.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getOneProductInventoryCount = (item) => {
    if (!item || !item.productId) {
      return false;
    }

    const inventoryKey = item.skuId
      ? `${item.skuId}__${item.productId}`
      : `__${item.productId}`;

    return inventoryMap[inventoryKey] || false;
  };

  const getCartProductImage = (id, d) => {
    // console.log("firstImage", d.previewImage.secureUrl);
    if (!id) {
      return d.images && d.images.length
        ? d.previewImage.secureUrl
        : "no skuId and no base-image found";
    }

    if (!d.variantTypes || !d.variantTypes.length) {
      return "variant not found";
    }

    const foundImage = d.variantTypes
      .filter((ele) => ele.variantName !== "Size")
      .flatMap((ele) => ele.variantOptions)
      .find((option) => id.includes(option.title));

    if (foundImage && foundImage.images && foundImage.images.length) {
      const secureUrl = foundImage.images.find((image) => image.secureUrl);
      return secureUrl ? secureUrl.secureUrl : "";
    }
    return d.previewImage.secureUrl;
  };

  const cartDataGen = (dat) => {
    let arr = [];
    for (let i = 0; i < dat.length; i++) {
      const obj = {
        brandName: "",
        productName: "",
        productId: "",
        skuId: "",
        quantity: 0,
        discount: 0,
        price: 0,
        tax: 0,
        influencerShare: 0,
        image: "",
      };
      const ele = dat[i];
      if (ele && ele.product) {
        obj.brandName = ele.product.brandName;
        obj.productName = ele.product.productName;
        obj.productId = ele.product._id;
        obj.discount = ele.product.discount;
        let p = 0;
        if (ele.skuId === "") {
          p = ele.product.price ? ele.product.price : 0;
        } else {
          p = ele.product.variantPrices[ele.skuId]
            ? ele.product.variantPrices[ele.skuId]
            : 0;
        }
        obj.price = p;
        obj.tax = ele.product.tax;
        obj.influencerShare = ele.product.influencerShare;
        obj.image = getCartProductImage(ele.skuId, ele.product);
        obj.skuId = ele.skuId;
        obj.quantity = ele.quantity;
        arr.push(obj);
      }
    }
    // console.log("cart-data-gen processed data : ", arr, arr[0].image);
    return arr;
  };

  const DataGen = async () => {
    try {
      setLoading(true);
      const r1 = await getUserCart();
      // console.log("cart received cart-product-data: ", r1);
      if (!r1 || r1.issue) {
        setError("something went wrong");
      }
      if (r1.logout) throw new Error("logout");

      if (!r1.result[0]?.products?.length) {
        setNewCartData([]);
        // throw new Error("no product found");
        setEmptyCartError(true);
      }
      const data = r1.result[0].products;
      const nextData = cartDataGen(data);
      // console.log("next-cart-data: ", nextData);
      setNewCartData(nextData);
    } catch (error) {
      // console.log("error getting cart-data : ", error, error?.message);
      if (error?.message === "logout") {
        resetUser();
        emptyCart();
        emptyWishlist();
        removeAuthToken();
        setLoading(false);
        return;
      }
      setError(error.message || "something went wrong");
      setLoading(false);
    }
  };

  const generateCartDataforLocal = async () => {
    try {
      if (!cartData.length) return;
      const productIdsArr = [...new Set(cartData.map((ele) => ele.product))];
      if (!productIdsArr.length) {
        // throw new Error("no product found");
        setEmptyCartError(true);
      }
      setLoading(true);
      const r = await getMultipleProductData(productIdsArr);
      // console.log("cart-page local user product-data : ", r);
      if (r.issue || !r.result || r.result.legth) {
        // throw new Error("no product found");
        setEmptyCartError(true);
      }
      const newArr = cartData.map((ele) => ({
        skuId: ele.skuId,
        quantity: ele.quantity,
        product: r.result.find((el) => ele.product === el._id),
      }));
      const final = cartDataGen(newArr);
      setNewCartData(final);
    } catch (error) {
      // console.log(
      //   "found error while creating cart with local data : ",
      //   error,
      //   error?.message
      // );
      setError(error.message || "something went wrong");
      setLoading(false);
    }
  };

  const FsMoney = () => {
    // console.log("cart-data in FsMoney() : ", newCartData);
    let total = 0;
    if (!newCartData.length) {
      return total;
    }
    for (let i = 0; i < newCartData.length; i++) {
      const ele = newCartData[i];
      if (ele.quantity > getOneProductInventoryCount(ele).available) {
        // console.log("enough product is not available in inventory", ele);
        continue;
      }
      const finalDiscount = (ele.quantity * +ele.price * ele.discount) / 100;
      const priceBeforeDiscount = ele.quantity * ele.price;
      const finalPrice = priceBeforeDiscount - finalDiscount;
      total = total + finalPrice;
    }
    // console.log("total = ", total);
    return total;
  };

  const HandleCheckout = async () => {
    let r = FsMoney();
    // console.log("total money  : ", r);
    if (r === 0) {
      alert("Not enough cart!!");
    } else {
      // console.log("money is there");
      navi("/shipping-info-cart");
    }
  };

  ///////////////////////////////////

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {emptyCartError ? (
            <div className="container py-5">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                <img
                  src={Looking}
                  alt="No Products"
                  style={{ width: "50%", margin: "0 auto" }}
                />
                <h1 className="text-center" style={{ fontFamily: "fantasy" }}>
                  Your cart is feeling lonely. Give it some company by adding
                  products.
                </h1>
              </div>
            </div>
          ) : (
            <div className={Styles.mainCont}>
              <div className={Styles.leftCont}>
                <div
                  style={{
                    padding: "0 2%",
                    wordBreak: "break-all",
                    marginBottom: "10px",
                  }}
                >
                  <div className={Styles.heading}>
                    <h2>Your Cart</h2>
                    <p>{count} Items in cart</p>
                  </div>
                  <div style={{ height: "max-content" }}>
                    {!!newCartData.length &&
                      newCartData.map((item, index) => (
                        <Cartlist
                          key={
                            item.productId
                              ? `${item.skuId}__${item.productId}`
                              : index
                          }
                          item={item}
                          inventory={getOneProductInventoryCount(item)}
                        />
                      ))}
                  </div>
                  {newCartData.length === 0 && (
                    <h1>products not available in cart</h1>
                  )}
                </div>
              </div>
              <div className={Styles.rightCont}>
                <div className="py-3 ps-lg-5 ps-0 flex-1">
                  <div className={Styles.checkOut}>
                    <div className={`${Styles.subtotal}`}>
                      <p>Subtotal</p>
                      <p>{formatCurrency(FsMoney())}</p>
                    </div>
                    <hr />
                    <div className={Styles.tax}>
                      <p
                        className="text-muted"
                        style={{
                          fontSize: "10px",
                          // textAlign: "center",
                          fontWeight: "400",
                          width: "100%",
                        }}
                      >
                        Shipping and tax will be calculated at checkout
                      </p>
                    </div>
                    <div className={Styles.btns}>
                      <button onClick={HandleCheckout}>Checkout</button>
                      <button onClick={() => navi("/")}>
                        Continue Shopping
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Cart;
