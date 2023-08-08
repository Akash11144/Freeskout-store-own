import React, { useEffect, useMemo, useState } from "react";
import { useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { Input } from "../../components/commonComponents/input-box";
import {
  useCart,
  useUserSetting,
  useWishList,
} from "../../state-managers/cart-state";
import style from "./checkout.module.css";
import Prodetails from "./Prodetails";
import {
  addAddressApi,
  createPayment,
  getUserAddresses,
  initiateShipping,
  placeCodOrderApi,
  verifyPayment,
  clearCart,
  updateInventory,
  updatePaymentInventory,
  getInventoryBySkuIds,
  getUserCart,
  getEmailOtp,
  getOneProductInfo,
  getOneProductData,
} from "../../config/configService";
import { logger } from "../../utlils/logger";
import {
  generateOrderDate,
  gramsToKgs,
  setVisitCount,
  validateIndianMobile,
} from "../../utlils/functions";
import { removeAuthToken, setAuthToken } from "../../services/storageService";
import { emailChecker } from "../../utlils/functions";
import ShippingContactInformation from "./shipping-contact-info";
import SavedContactInfo from "./saved-contact-info";
import OTPdiv from "./otp-popup";
import OrderConfirmed from "./order-confirmed";
import OrderBill from "./order-bill";

//////////////////////////////////////////////////////////////////////////////////////////////////////////

const ShippingInfo = () => {
  const [productData, setProductData] = useState([]);
  const [productDataWithInventory, setProductDataWithInventory] = useState([]);
  const [errors, setErrors] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [mailOtp, setMailOtp] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isShippingBilling, setIsShippingBilling] = useState(true);
  const [billingFirstName, setBillingFirstName] = useState("");
  const [billingLastName, setBillingLastName] = useState("");
  const [billingAddressLine1, setBillingAddressLine1] = useState("");
  const [billingAddressLine2, setBillingAddressLine2] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingState, setBillingState] = useState("");
  const [billingCountry, setBillingCountry] = useState("");
  const [billingPincode, setBillingPincode] = useState("");
  const [billingGst, setBillingGst] = useState("");
  const [addPageloading, setAddPageloading] = useState(false);
  const [billPageloading, setBillPageloading] = useState("");
  const [paymentLoaderOnline, setPaymentLoaderOnline] = useState(false);
  const [paymentLoaderCOD, setPaymentLoaderCOD] = useState(false);
  const [newCartData, setNewCartData] = useState([]);
  const [error, setError] = useState(false);
  const [onPayment, setOnPayment] = useState(false);
  const [onOrderConfirmed, setOnOrderConfirmed] = useState(false);
  const [finalObj, setfinalObj] = useState({});
  const [rates, setRates] = useState({});
  const [containerDimensions, setContainerDimensions] = useState({});
  const [weights, setWeights] = useState({});
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const [failedOrders, setFailedOrders] = useState([]);
  const [productList, setProductList] = useState([]);
  const [message, setMessage] = useState({ message: "", type: "" });
  const [pageLoading, setPageLoading] = useState(false);
  const [pageError, setPageError] = useState(false);
  const [noAdd, setNoAdd] = useState(false);

  const otpModelCloseBtnRef = useRef(null);
  const closeOtpModal = useRef(null);
  const launchAddAddressModal = useRef();
  const launchUnregUserOtpModal = useRef();

  const navi = useNavigate();
  const loc = useLocation();

  const userInfo = useUserSetting((state) => state.info);
  const setUserInfo = useUserSetting((state) => state.setUserInfo);
  const setToken = useUserSetting((state) => state.setToken);
  const userToken = useUserSetting((state) => state.token);
  const infData = useUserSetting((state) => state.influencerList);
  const resetUser = useUserSetting((state) => state.resetUser);

  let cartData = useCart((state) => state.cartData);
  let emptyCart = useCart((state) => state.emptyCart);

  const emptyWishlist = useWishList((state) => state.emptyWishlist);

  const slug = new URLSearchParams(loc.search).get("slug");

  // ///////////////////////////////////////////////////////////////////////////////////////////

  let i = 0;
  useEffect(() => {
    if (!i) {
      let dt = new Date();
      let time = dt.getTime();
      let data = null;
      if (slug) {
        data = { slug, time };
      } else {
        let t2 = JSON.parse(sessionStorage.getItem("sesTest"));
        if (t2 && t2.slug) {
          data = { slug: t2.slug, time };
        } else {
          data = { slug: "unknown_1-2_3-4", time };
        }
      }
      setVisitCount("/shipping-page", data);
    }
    return () => {
      i = 1;
    };
  }, [loc.pathname]);

  const paramsData = useParams();

  useEffect(() => {
    console.log(paramsData);
    const pid = paramsData?.productID || null;
    const sid = paramsData?.skuID || null;
    if (pid) {
      getBuyNowProductData(pid, sid);
    } else {
      if (userToken) {
        DataGen();
      } else {
        generateCartDataforLocal();
      }
    }
  }, []);

  const getBuyNowProductData = async (productID, skuID) => {
    try {
      setPageLoading(true);
      const res = await getOneProductData(productID);
      console.log({ res });
      if (!res || res.issue || !res.result) {
        throw new Error(res);
      }
      const resData = res.result;
      const data = {
        product: resData,
        skuId: skuID,
        quantity: 1,
      };
      cartDataGen([data]);
    } catch (error) {
      navi("/");
    } finally {
      setPageLoading(false);
    }
  };

  // --------------------------------------- Cart Functions -------------------------------------

  const newProductArray = (data) => {
    // //console.log({ data });
    let obj = {};
    for (let i = 0; i < data.length; i++) {
      if (obj[data[i].inventory.address.addressId]) {
        obj[data[i].inventory.address.addressId].push(data[i]);
      } else {
        obj[data[i].inventory.address.addressId] = [data[i]];
      }
    }
    // //console.log("new-product-array : ", obj);
    setfinalObj(obj);
    // //console.log("shubhamU", obj);
  };

  const cartDataGen = async (dat) => {
    console.log({ dat });
    let skuIdarr = [];
    let allInventory = [];
    if (dat && dat.length) {
      skuIdarr = dat
        .filter((ele) => ele && ele.product)
        .map((ele) => `${ele.skuId}__${ele.product._id}`);
    }
    if (skuIdarr.length) {
      const r = await getInventoryBySkuIds(skuIdarr);
      if (!r.issue && r.result && r.result.length) {
        allInventory = r.result;
      }
    }
    // //console.log("all-inventory : ", skuIdarr, allInventory);
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
        pinCode: "",
        currentCount: "",
        inventory: "",
        dimensions: "",
      };
      const ele = dat[i];
      if (ele && ele.product) {
        obj.brandName = ele.product.brandName;
        obj.productName = ele.product.productName;
        obj.productId = ele.product._id;
        obj.skuId = ele.skuId;
        obj.quantity = ele.quantity;
        obj.discount = ele.product.discount;
        obj.image = getCartProductImage(ele.skuId, ele.product);
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
        let dim = "";
        if (ele.product.hasVariant) {
          dim = ele.product.variantDimensions[ele.skuId];
        } else {
          dim = ele.product.dimensions ? ele.product.dimensions : "";
        }
        obj.dimensions = dim;
        obj.inventory =
          allInventory.length &&
          allInventory.find(
            (el) => el.skuId === `${ele.skuId}__${ele.product._id}`
          );
        arr.push(obj);
      }
    }
    // console.log({ arr });
    setProductDataWithInventory(arr);
    newProductArray(arr);
    return arr;
  };

  const DataGen = async () => {
    try {
      const r1 = await getUserCart();
      // //console.log("Shipping-info cart-page sync data: ", r1);
      if (!r1) throw new Error("no response from server");
      if (r1.logout) throw new Error("logout");
      if (r1.issue || !r1.result) throw new Error("something went wrong");
      if (
        !r1.result.length ||
        !r1.result[0].products ||
        !r1.result[0].products.length
      ) {
        setNewCartData([]);
        return;
      }
      let data = r1.result[0].products;
      setProductList(r1.result[0].products);
      let nextData = await cartDataGen(data);
      //console.log({ nextData });
      setNewCartData(nextData);
    } catch (error) {
      //console.log("error getting cart-data : ", error);
      setError(error?.message || "Something went wrong");
      if (error?.message === "logout") {
        resetUser();
        emptyCart();
        emptyWishlist();
        removeAuthToken();
      }
    }
  };

  const generateCartDataforLocal = async () => {
    try {
      let arr = [];
      if (!cartData.length) return;
      for (let i = 0; i < cartData.length; i++) {
        const element = cartData[i];
        if (element && element.product) {
          const r1 = await getOneProductInfo(element.product);
          //console.log("shipping-info one product info : ", r1);
          if (!r1 || r1.issue || !r1.result)
            throw new Error("some error getting error");
          if (r1.result) {
            arr.push({
              product: r1.result,
              quantity: element.quantity,
              skuId: element.skuId,
            });
          }
        }
      }
      let final = await cartDataGen(arr);
      setNewCartData(final);
    } catch (error) {
      //console.log("found error while creating cart with local data : ", error);
    }
  };

  const getCartProductImage = (id, d) => {
    //console.log("received data at get-cart-product-image : ", id, d);
    if (!id) {
      if (!d.images || !d.images.length) {
        return "no skuId and no base-image found";
      }
      return d.images[0].secureUrl;
    }
    if (!d.variantTypes || !d.variantTypes.length) {
      return "variant not found";
    }
    let ele = d.variantTypes;
    for (let i = 0; i < ele.length; i++) {
      if (ele[i].variantName === "Size") continue;

      if (!ele[i].variantOptions || !ele[i].variantOptions.length) continue;

      let ele1 = ele[i].variantOptions;
      for (let j = 0; j < ele1.length; j++) {
        if (!id.includes(ele1[j].title)) continue;

        if (!ele1[j].images || !ele1[j].images.length) continue;

        for (let k = 0; k < ele1[j].images.length; k++) {
          if (ele1[j].images[k].secureUrl) {
            return ele1[j].images[k].secureUrl;
          }
        }
      }
    }
    return "";
  };

  // --------------------------- inventory check ----------------------------

  const validateInventory = async () => {
    let inventoryValiate = true;
    if (productDataWithInventory.length) {
      for (let i = 0; i < productDataWithInventory.length; i++) {
        let ele = productDataWithInventory[i];
        //console.log("element in valiadte inventory : ", ele);
        if (ele.inventory.currentCount < ele.quantity) {
          inventoryValiate = false;
          break;
        }
      }
    }
    if (!inventoryValiate) {
      alert("Some items went out of stock ");
      navi("/cart");
      return;
    }
    return inventoryValiate;
  };

  const updateShippingInventory = async () => {
    let inventoryUpdatedSuccessfully = true;
    let arr = [];
    try {
      for (let i = 0; i < productDataWithInventory.length; i++) {
        let ele = productDataWithInventory[i];
        arr.push({
          id: ele.inventory._id,
          quantity: ele.quantity,
        });
      }
      const res = await updateInventory(arr);
      //console.log("inventory update : ", res);
      if (!res) {
        inventoryUpdatedSuccessfully = false;
        throw new Error("No response from server");
      }
      if (res.error && res.error === "out of stock") {
        alert("Some products went out of stock please check!!");
        navi("/cart");
        return;
      }
      if (res.issue) {
        inventoryUpdatedSuccessfully = false;
        throw new Error("Error while updating inventory");
      }
    } catch (error) {
      //console.log(
      //   "error updating inventory in initate shipping!!!",
      //   error,
      //   error?.message
      // );
      inventoryUpdatedSuccessfully = false;
    } finally {
      return inventoryUpdatedSuccessfully;
    }
  };

  // -------------------------- init razorpay --------------------------------

  useEffect(() => {
    initialise("https://checkout.razorpay.com/v1/checkout.js").then((resp) => {
      //console.log("response", resp);
    });
  }, []);

  const initialise = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (orders) => {
    if (validatePaymentInfo()) {
      //console.log("Payment Info is Valid");
      // check if inventory still in blocked
      // if not in blocked, check if currentCount > item quantity
      // if not left redirect to view cart page
      let inventoryError = false;
      try {
        setPaymentLoaderOnline(true);
        for (let i = 0; i < productDataWithInventory.length; i++) {
          let ele = productDataWithInventory[i];
          const res = await updatePaymentInventory({
            id: ele.inventory._id,
            quantity: ele.quantity,
          });
          //console.log("inventory-payment update : ", ele, res);
          if (!res || res.issue)
            throw new Error("Error while updating inventory");

          if (res.error && res.error === "out of stock") {
            alert("Some items went out of stock");
            navi("/cart");
            return;
          }
        }
        // setPaymentLoaderOnline(false);
      } catch (error) {
        inventoryError = true;
        console.log(
          "some error while setting payment-inventory :",
          error,
          error?.message
        );
      } finally {
        // setPaymentLoaderOnline(false);
      }

      if (!inventoryError) {
        let amount = 0;
        const shippingCharges = orders[0].shipping_charges;
        for (let order of orders) amount += order.sub_total;

        let payment = {
          payer: userInfo.id,
          // amount: 100,
          amount: Math.round((amount + shippingCharges) * 100),
        };
        //console.log("payment", payment);
        const res = await createPayment(payment);
        if (!res)
          setMessage({ message: "No Response from Server", type: "danger" });

        if (res.error) {
          setMessage({ message: res.error, type: "danger" });
          return;
        }

        if (res.result) {
          setMessage({ message: res.message, type: "success" });
          //console.log("Result - ", res.result);

          const {
            order: { amount, id: order_id, currency },
            id: paymentId,
          } = res.result;

          const options = {
            key: "rzp_live_gW7C36aKualfn2", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "Freeskout",
            description: `Ordering stuff`,
            image: "https://freeskout.com/img/freeskout-logo.png",
            order_id: order_id,
            handler: async function (response) {
              //console.log("in payment handler", { response });
              const data = {
                orderCreationId: order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                orders,
                slug: infData || null,
              };
              //console.log("inside payment handler data : ", data);
              const orderResponse = await verifyPayment(paymentId, data);

              //console.log("orderResponse - ", orderResponse);
              if (
                orderResponse &&
                orderResponse.result &&
                orderResponse.result.successfulOrders &&
                orderResponse.result.successfulOrders.length
              ) {
                setConfirmedOrders(orderResponse.result.successfulOrders);
                setFailedOrders(orderResponse.result.failedOrders);

                // redirect to Thank you for ordering page
                setOnOrderConfirmed(true);
                // clear cart
                await emptyCart();
                await clearCart();
              } else {
                alert(
                  "some error placing order please try again after some time"
                );
              }
            },
            prefill: {
              name: userInfo.name || "User",
              email: userInfo.email,
              contact: phone.toString(),
            },
            theme: {
              color: "#4f0b27",
            },
          };

          const paymentObject = new window.Razorpay(options);
          paymentObject.open();
          // reinitialise();
          // onClose();
          // return;
          setPaymentLoaderOnline(false);
        }
      } else {
        //console.log("display-razorpay inventory-error");
        setPaymentLoaderOnline(false);
      }
    } else {
      //console.log("payment data Invalid");
      setPaymentLoaderOnline(false);
    }
  };

  const validatePaymentInfo = () => {
    return true;
  };

  //cc-------------------------- user address functions ----------------------

  useEffect(() => {
    if (userInfo && userInfo.phone && userInfo.phone.length) {
      setPhone(userInfo.phone);
    }
  }, [userInfo]);

  // useEffect(() => {
  //   if (userToken) {
  //     DataGen();
  //   } else {
  //     generateCartDataforLocal();
  //   }
  // }, []);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    if (userToken) {
      setAddPageloading(true);
      const res = await getUserAddresses();
      //console.log("address res", res);
      if (!res) throw new Error("no response from server");
      if (res.issue) throw new Error(res.issueDetail);

      if (res.result) {
        //console.log("addresses result", res.result);
        if (res.result.length == 1) {
          setSelectedAddress(res.result[0]);
        }
        setAddresses(res.result);
        setAddPageloading(false);
      }
    }
  };

  // --------------------------------- Amounts --------------------------------

  const taxRate = useMemo(() => {
    if (Object.keys(finalObj).length) {
      let total = Object.values(finalObj).reduce((acc, cur) => {
        let currentTotal = 0;
        if (cur && cur.length) {
          cur.map(
            (el) =>
              (currentTotal +=
                (parseFloat(el.price) -
                  parseFloat(el.price) * (parseFloat(el.discount) / 100)) *
                el.quantity *
                (parseFloat(el.tax) / 100))
          );
        }
        if (!currentTotal) return acc;
        return acc + currentTotal;
      }, 0);

      return total.toFixed(2);
    }
    return null;
  }, [finalObj]);

  const subTotalAmount = useMemo(() => {
    if (Object.keys(finalObj).length) {
      let total = Object.values(finalObj).reduce((acc, cur) => {
        let currentTotal = 0;
        if (cur && cur.length) {
          cur.map(
            (el) =>
              (currentTotal +=
                parseFloat(el.price) * el.quantity -
                parseFloat(el.price) * el.quantity * (el.discount / 100))
          );
        }
        if (!currentTotal) return acc;
        return acc + currentTotal;
      }, 0);

      return total.toFixed(2);
    }
    return null;
  }, [finalObj]);

  const totalDiscount = useMemo(() => {
    if (Object.keys(finalObj).length) {
      let total = Object.values(finalObj).reduce((acc, cur) => {
        let currentTotal = 0;
        if (cur && cur.length) {
          cur.map(
            (el) =>
              (currentTotal +=
                parseFloat(el.price) * el.quantity * (el.discount / 100))
          );
        }
        if (!currentTotal) return acc;
        return acc + currentTotal;
      }, 0);

      return total.toFixed(2);
    }
    return null;
  }, [finalObj]);

  const shippingRate = useMemo(() => {
    if (rates && Object.keys(rates).length) {
      let total = Object.values(rates).reduce((acc, cur) => {
        return acc + cur.rate;
      }, 0);
      return total;
    }
    return null;
  }, [rates]);

  const totalRate = useMemo(() => {
    return (
      parseFloat(subTotalAmount || 0) +
      parseFloat(shippingRate || 0) +
      parseFloat(taxRate || 0)
    ).toFixed(2);
  }, [subTotalAmount, shippingRate, taxRate]);

  // --------------------------- component functions -------------------------

  function handleError(key, val) {
    if (!key || !key.length) return;
    setErrors((cur) => {
      let next = { ...cur };
      next[key] = val;
      return next;
    });
  }
  // --------
  function handleInput(e, errorKey, setterFunction) {
    if (errors[errorKey]) {
      setErrors((cur) => {
        let next = { ...cur };
        delete next[errorKey];
        return next;
      });
    }
    setterFunction(e.target.value);
  }
  // --------
  function handleValidate() {
    let validate = true;
    if (!firstName) {
      validate = false;
      handleError("firstName", "Enter First Name");
    }
    if (!lastName) {
      validate = false;
      handleError("secondName", "Enter Second Name");
    }
    if (!email) {
      validate = false;
      handleError("email", "Enter Email");
    }

    if (!addressLine1) {
      validate = false;
      handleError("addressLine1", "Enter Address");
    }
    if (!addressLine2) {
      validate = false;
      handleError("addressLine2", "Enter Address");
    }

    if (!city) {
      validate = false;
      handleError("city", "Enter City");
    }

    if (!pincode) {
      validate = false;
      handleError("pincode", "Enter Postal Code");
    }
    let aa = !isNaN(phone);
    if (!phone) {
      validate = false;
      handleError("phone", "Enter Phone");
    } else if (!aa) {
      validate = false;
      handleError("phone", "Invalid Phone");
    }

    if (!isShippingBilling) {
      if (!billingFirstName || !billingFirstName.length) {
        validate = false;
        handleError("billingFirstName", "first name is required");
      }
      if (!billingLastName || !billingLastName.length) {
        validate = false;
        handleError("billingLastName", "last name is required");
      }
      if (!billingAddressLine1 || !billingAddressLine1.length) {
        validate = false;
        handleError("billingAddressLine1", "address line 1 is required");
      }
      if (!billingPincode || !billingPincode.length) {
        validate = false;
        handleError("billingPincode", "postal code is required");
      }
      if (!billingCity || !billingCity.length) {
        validate = false;
        handleError("billingCity", "city is required");
      }
      if (!billingState || !billingState.length) {
        validate = false;
        handleError("billingState", "state is required");
      }
      if (!billingCountry || !billingCountry.length) {
        validate = false;
        handleError("billingCountry", "country is required");
      }
    }
    return validate;
  }

  function validateOtp() {
    // if user is logged in, no need for verification
    if (userToken && userToken.length) {
      return true;
    }
    let validate = true;
    let aa = !isNaN(mailOtp);
    if (!mailOtp) {
      validate = false;
      handleError("mailOtp", "Enter OTP");
    } else if (!aa) {
      validate = false;
      handleError("mailOtp", "Invalid Otp");
    }
    return validate;
  }

  async function pinApiCall(ele, isBilling = false) {
    //console.log("pincode api call", ele);
    if (ele.length === 6) {
      let aa = !isNaN(ele);
      if (aa) {
        let api = "https://api.postalpincode.in/pincode/";
        //console.log(api + ele);
        fetch(api + ele)
          .then((response) => response.json())
          .then((data) => {
            if (data[0].PostOffice) {
              if (isBilling) {
                handleError("billingState", "");
                handleError("billingCountry", "");
                setBillingState(data[0].PostOffice[0].State);
                setBillingCountry(data[0].PostOffice[0].Country);
              } else {
                handleError("state", "");
                handleError("country", "");
                setState(data[0].PostOffice[0].State);
                setCountry(data[0].PostOffice[0].Country);
              }
            } else {
              handleError("pincode", "Postal Code does not exists");
            }
          });
      } else {
        handleError("pincode", "Invalid Postal Code");
      }
    } else {
      if (isBilling) {
        setBillingCity("");
        setBillingState("");
        setBillingCountry("");
      } else {
        setCity("");
        setState("");
        setCountry("");
      }
    }
  }

  async function handleCreateNewAccount() {
    if (!validateBillingAddress()) {
      alert("Please fill all the fields");
      return;
    }
    if (!phone || !phone.length) {
      return handleError("phone", "Phone number is required");
    }
    if (!validateIndianMobile(phone)) {
      return handleError("phone", "Invalid Phone");
    }
    if (
      userInfo &&
      userInfo.name &&
      (!selectedAddress || !selectedAddress.name)
    ) {
      alert("Please select an address");
      setNoAdd(true);
      return handleError("add-address", "add an address");
    }
    if (validateOtp()) {
      setBillPageloading(true);
      let obj = {};
      if (userToken && userToken.length && userInfo && userInfo.name) {
        let userName = userInfo.name;
        let userEmail = userInfo.email;
        let userPhone = (userInfo && userInfo.phone) || null;

        obj = {
          name: userName,
          email: userEmail.toLowerCase(),
          alternameMobileNo: [],
          address: [
            {
              name: selectedAddress.name,
              line1: selectedAddress.line1,
              line2: selectedAddress.line2 || null,
              pincode: selectedAddress.pincode,
              country: selectedAddress.country,
              state: selectedAddress.state,
              city: selectedAddress.city,
            },
          ],
        };
        if (userPhone && userPhone.length) {
          obj.alternameMobileNo.push(userPhone);
        }
      } else {
        obj = {
          name: `${firstName} ${lastName}`,
          email: email.toLowerCase(),
          alternameMobileNo: [phone],
          address: [
            {
              name: `${firstName} ${lastName}`,
              line1: addressLine1,
              line2: addressLine2 || null,
              pincode: pincode,
              country: country,
              state: state,
              city: city,
            },
          ],
        };
      }
      let r = await initiateShipping({
        emailOtp: mailOtp,
        userData: obj,
        isLogin: userToken ? true : false,
        cartData: userToken ? [] : cartData,
        orderData: finalObj,
      });
      logger.info("initiate shipping result", r);
      setBillPageloading(false);
      if (r.issue) {
        alert(r.message ? r.message : "something went wrong signing up");
      } else {
        if (r.result) {
          const {
            token,
            payload,
            ratesMap,
            containerDimensionsMap,
            weightMap,
            currentAddresses,
          } = r.result;

          if (token) {
            setToken(token);
            setAuthToken(token);
          }

          if (payload) setUserInfo(payload);

          if (ratesMap && Object.keys(ratesMap).length) {
            setPageLoading(true);
            setRates(ratesMap);
            setOnPayment(true);
            setPageLoading(false);
          }

          if (
            containerDimensionsMap &&
            Object.keys(containerDimensionsMap).length
          ) {
            setContainerDimensions(containerDimensionsMap);
          }

          if (weightMap && Object.keys(weightMap).length) {
            setWeights(weightMap);
          }

          if (currentAddresses && currentAddresses.length) {
            setAddresses(currentAddresses);
            setSelectedAddress(currentAddresses[currentAddresses.length - 1]);
          }

          const res = validateInventory();
          if (res) {
            let updateInventoryResponse = await updateShippingInventory();
            //console.log(
            //   "update-inventory-response : ",
            //   updateInventoryResponse
            // );
            if (updateInventoryResponse) {
            } else {
              alert("some error while setting shipping!!!");
            }
          } else {
            alert("some error while setting shipping!!!");
          }
        }
        closeOtpModal.current.click();
        // otpModelCloseBtnRef.current.click();
      }
    } else {
      alert("Something Went wrong in OTP set up");
    }
  }

  async function sendRegistrationOtp() {
    if (handleValidate() && validateBillingAddress()) {
      if (!email || !email.length || !emailChecker(email)) {
        return alert("Invalid Email");
      } else if (!phone || !phone.length || !validateIndianMobile(phone)) {
        return alert("Invalid Phone");
      } else if (email) {
        const r1 = await getEmailOtp({ email: email.toLowerCase() });
        //console.log("shipping-info received email otp : ", r1);
        if (r1.issue) {
          alert(r1.message ? r1.message : "something went wrong");
        } else {
          alert("check your email for otp");
          launchUnregUserOtpModal.current.click();
        }
      } else {
        alert("Enter valid Email");
      }
    }
  }

  const addAddress = async () => {
    try {
      if (!handleAddressValidation()) return;
      let address = {
        name: `${firstName.trim()} ${lastName.trim()}`.trim(),
        phone,
        line1: addressLine1,
        pincode: pincode,
        city,
        state,
        country,
      };

      if (addressLine2 && addressLine2.trim().length) {
        address.line2 = addressLine2;
      }

      const res = await addAddressApi({ address });
      if (!res) throw new Error("no response from server");
      if (res.issue) throw new Error(res.issueDetail);

      if (res.result) {
        await fetchAddresses();
      } else {
        throw new Error("");
      }
    } catch (e) {
      //console.log(e.message);
    } finally {
    }
  };

  const selectAddress = (item) => {
    if (!item || !item._id) return;
    setSelectedAddress(item);
  };

  const handleAddressValidation = () => {
    //console.log(
    //   firstName,
    //   lastName,
    //   phone,
    //   addressLine1,
    //   pincode,
    //   city,
    //   state,
    //   country
    // );
    let flag = true;
    if (!firstName || !firstName.length) {
      flag = false;
      handleError("firstName", "first name is required");
    }
    if (!lastName || !lastName.length) {
      flag = false;
      handleError("lastName", "last name is required");
    }
    if (!phone || !phone.length) {
      flag = false;
      handleError("phone", "phone is required");
    }
    if (!addressLine1 || !addressLine1.length) {
      flag = false;
      handleError("addressLine1", "address line 1 is required");
    }
    if (!pincode || !pincode.length) {
      flag = false;
      handleError("pincode", "postal code is required");
    }
    if (!city || !city.length) {
      flag = false;
      handleError("city", "city is required");
    }
    if (!state || !state.length) {
      flag = false;
      handleError("state", "state is required");
    }
    if (!country || !country.length) {
      flag = false;
      handleError("country", "country is required");
    }

    return flag;
  };

  const validateBillingAddress = () => {
    let flag = true;
    if (!isShippingBilling) {
      if (!billingFirstName || !billingFirstName.length) {
        flag = false;
        handleError("billingFirstName", "first name is required");
      }
      if (!billingLastName || !billingLastName.length) {
        flag = false;
        handleError("billingLastName", "last name is required");
      }
      if (!billingAddressLine1 || !billingAddressLine1.length) {
        flag = false;
        handleError("billingAddressLine1", "address line 1 is required");
      }
      if (!billingPincode || !billingPincode.length) {
        flag = false;
        handleError("billingPincode", "postal code is required");
      }
      if (!billingCity || !billingCity.length) {
        flag = false;
        handleError("billingCity", "city is required");
      }
      if (!billingState || !billingState.length) {
        flag = false;
        handleError("billingState", "state is required");
      }
      if (!billingCountry || !billingCountry.length) {
        flag = false;
        handleError("billingCountry", "country is required");
      }
    }

    return flag;
  };

  const handleDisableShipping = () => {
    if (
      userInfo &&
      userInfo.name &&
      (!selectedAddress || !selectedAddress.name)
    ) {
      return true;
    }
    return false;
  };

  const generateOrderData = (paymentType) => {
    const orders = [];
    let currentFirstName = firstName;
    let currentLastName = lastName;
    let currentLine1 = addressLine1;
    let currentLine2 = addressLine2;
    let currentCity = city;
    let currentState = state;
    let currentCountry = country;
    let currentPincode = pincode;
    if (selectedAddress && selectedAddress.name) {
      currentFirstName = selectedAddress.name.split(" ")[0];
      currentLastName = selectedAddress.name.split(" ")[1];
      currentLine1 = selectedAddress.line1;
      currentLine2 = selectedAddress.line2;
      currentCity = selectedAddress.city;
      currentState = selectedAddress.state;
      currentCountry = selectedAddress.country;
      currentPincode = selectedAddress.pincode;
    }

    const finalObjKeys = Object.keys(finalObj);
    for (let i = 0; i < finalObjKeys.length; i += 1) {
      const currentAddressId = finalObjKeys[i];
      const data = finalObj[currentAddressId];
      //console.log("generate-order-data : ", data);
      const currentContainerDimensions = containerDimensions[currentAddressId];
      const currentWeights = weights[currentAddressId];

      const obj = {
        order_id: `${new Date().getTime() + Math.floor(Math.random() * 1000)}`,
        order_date: generateOrderDate(), // "2019-07-24 11:11"
        pickup_location: data[0].inventory.address.name,
        // channel_id: "",
        // comment: "Reseller: M/s Goku",
        billing_customer_name: isShippingBilling
          ? currentFirstName
          : billingFirstName,
        billing_last_name: isShippingBilling
          ? currentLastName
          : billingLastName,
        billing_address: isShippingBilling ? currentLine1 : billingAddressLine1,
        // billing_address_2: isShippingBilling ? currentLine2 : billingAddressLine2,
        billing_city: isShippingBilling ? currentCity : billingCity,
        billing_pincode: isShippingBilling ? currentPincode : billingPincode,
        billing_state: isShippingBilling ? currentState : billingState,
        billing_country: isShippingBilling ? currentCountry : billingCountry,
        billing_email: userInfo && userInfo.email ? userInfo.email : email,
        billing_phone: phone,
        shipping_is_billing: isShippingBilling,
        shipping_customer_name: currentFirstName,
        shipping_last_name: currentLastName,
        shipping_address: currentLine1,
        // shipping_address_2: currentLine2,
        shipping_city: currentCity,
        shipping_pincode: currentPincode,
        shipping_state: currentState,
        shipping_country: currentCountry,
        shipping_email: userInfo && userInfo.email ? userInfo.email : email,
        shipping_phone: phone,
        order_items: data.map((elem) => {
          //console.log(elem.price);
          //console.log(elem.discount);
          //console.log("elem", elem);
          return {
            name: elem.productName,
            sku: `${elem.skuId}__${elem.productId}`,
            units: elem.quantity,

            selling_price:
              parseFloat(elem.price) +
              (parseFloat(elem.price) -
                parseFloat((elem.price * parseFloat(elem.discount)) / 100)) *
                (parseFloat(elem.tax) / 100),
            discount: parseFloat(elem.price) * (elem.discount / 100),
            tax: elem.tax,
          };
        }),
        payment_method: paymentType,
        shipping_charges: shippingRate,
        // giftwrap_charges: 0,
        // transaction_charges: 0,
        // total_discount: parseFloat(totalDiscount), // calculate this
        // sub_total: parseFloat(subTotalAmount),
        sub_total: data.reduce((acc, cur) => {
          return (
            acc +
            (parseFloat(cur.price) -
              parseFloat((cur.price * parseFloat(cur.discount)) / 100) +
              (parseFloat(cur.price) -
                parseFloat((cur.price * parseFloat(cur.discount)) / 100)) *
                (parseFloat(cur.tax) / 100)) *
              cur.quantity
          );
        }, 0),
        length: parseFloat(currentContainerDimensions.x),
        breadth: parseFloat(currentContainerDimensions.y),
        height: parseFloat(currentContainerDimensions.z),
        weight: parseFloat(
          gramsToKgs(
            parseFloat(currentWeights) +
              parseFloat(currentContainerDimensions.wt)
          )
        ),
        courier_id: rates[currentAddressId].courier_company_id,
        frontendOrder: finalObj[currentAddressId],
      };

      if (currentLine2 && currentLine2.length) {
        obj.shipping_address_2 = currentLine2;
      }

      if (isShippingBilling) {
        if (currentLine2 && currentLine2.length) {
          obj.billing_address_2 = currentLine2;
        }
      } else {
        if (billingAddressLine2 && billingAddressLine2.length) {
          obj.billing_address_2 = billingAddressLine2;
        }
      }

      orders.push(obj);
    }

    logger.info("orders", orders);

    return orders;
  };

  const handlePayment = (paymentType) => {
    if (paymentType === "Prepaid") {
      const orders = generateOrderData(paymentType);
      displayRazorpay(orders);
    } else if (paymentType === "COD") {
      const orders = generateOrderData(paymentType);
      placeCodOrder(orders);
    }
  };

  const placeCodOrder = async (orders) => {
    // check if inventory still in blocked
    // if not in blocked, check if currentCount > item quantity
    // if not left redirect to view cart page
    let inventoryError = false;
    try {
      setPaymentLoaderCOD(true);
      for (let i = 0; i < productDataWithInventory.length; i++) {
        let ele = productDataWithInventory[i];
        const res = await updatePaymentInventory({
          id: ele.inventory._id,
          quantity: ele.quantity,
        });
        //console.log("inventory-payment update : ", ele, res);
        if (!res) {
          throw new Error("Error while updating inventory");
        }
        if (res.error && res.error === "out of stock") {
          alert("Some items went out of stock");
          navi("/cart");
          return;
        }
        if (res.issue) {
          throw new Error("Error while updating inventory");
        }
      }
      // setPaymentLoaderCOD(false);
    } catch (error) {
      inventoryError = true;
      //console.log(
      //   "some error while setting payment-inventory :",
      //   error,
      //   error?.message
      // );
    }
    if (!inventoryError) {
      let res = await placeCodOrderApi(orders, infData || null);
      if (!res) throw new Error("no response from server");
      if (res.error) throw new Error(res.error);

      //console.log("orderResponse - ", res);
      if (
        res.result &&
        res.result.successfulOrders &&
        res.result.successfulOrders.length
      ) {
        // redirect to thankyou for ordering page
        setConfirmedOrders(res.result.successfulOrders);
        setFailedOrders(res.result.failedOrders);
        // redirect to Thank you for ordering page
        setOnOrderConfirmed(true);
        // clear cart
        setPaymentLoaderOnline(false);
        await emptyCart();
        await clearCart();
      } else {
        //console.log("place-cod-order error ");
        setPaymentLoaderOnline(false);
      }
    }
  };

  const toggleIsShippingBilling = () => {
    resetBillingErrors();
    setIsShippingBilling(!isShippingBilling);
  };

  const resetBillingErrors = () => {
    handleError("billingFirstName", "");
    handleError("billingLastName", "");
    handleError("billingAddressLine1", "");
    handleError("billingAddressLine2", "");
    handleError("billingCity", "");
    handleError("billingPincode", "");
    handleError("billingState", "");
    handleError("billingCountry", "");
    handleError("billingGst", "");
  };

  // //////////////////////////// render ////////////////////////////////

  return !onOrderConfirmed ? (
    <>
      <div style={{ width: "95%", margin: "0 auto" }}>
        <div>
          <img src="" alt="" />
        </div>
        <div className={`${style.headCont} py-3`}>
          <h4>Checkout</h4>
        </div>
        <div className={style.sectionMain}>
          {userToken ? (
            <SavedContactInfo
              handleInput={handleInput}
              errors={errors}
              addresses={addresses}
              selectAddress={selectAddress}
              selectedAddress={selectedAddress}
              launchAddAddressModal={launchAddAddressModal}
              onPayment={onPayment}
              isShippingBilling={isShippingBilling}
              toggleIsShippingBilling={toggleIsShippingBilling}
              billingFirstName={billingFirstName}
              billingLastName={billingLastName}
              billingAddressLine1={billingAddressLine1}
              billingAddressLine2={billingAddressLine2}
              billingCity={billingCity}
              billingState={billingState}
              billingCountry={billingCountry}
              billingPincode={billingPincode}
              billingGst={billingGst}
              setBillingFirstName={setBillingFirstName}
              setBillingLastName={setBillingLastName}
              setBillingAddressLine1={setBillingAddressLine1}
              setBillingAddressLine2={setBillingAddressLine2}
              setBillingCity={setBillingCity}
              setBillingState={setBillingState}
              setBillingCountry={setBillingCountry}
              setBillingPincode={setBillingPincode}
              setBillingGst={setBillingGst}
              userToken={userToken}
              userInfo={userInfo}
              addAddress={addAddress}
              pincode={pincode}
              setPincode={setPincode}
              pinApiCall={pinApiCall}
              phone={phone}
              setPhone={setPhone}
              state={state}
              setState={setState}
              country={country}
              setCountry={setCountry}
              setEmail={setEmail}
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              addressLine1={addressLine1}
              setAddressLine1={setAddressLine1}
              addressLine2={addressLine2}
              setAddressLine2={setAddressLine2}
              city={city}
              setCity={setCity}
              addPageloading={addPageloading}
            />
          ) : (
            <ShippingContactInformation
              handleInput={handleInput}
              setEmail={setEmail}
              errors={errors}
              setPhone={setPhone}
              setFirstName={setFirstName}
              setLastName={setLastName}
              setAddressLine1={setAddressLine1}
              setAddressLine2={setAddressLine2}
              setCity={setCity}
              setPincode={setPincode}
              setState={setState}
              setCountry={setCountry}
              setBillingFirstName={setBillingFirstName}
              setBillingLastName={setBillingLastName}
              setBillingAddressLine1={setBillingAddressLine1}
              setBillingAddressLine2={setBillingAddressLine2}
              setBillingCity={setBillingCity}
              setBillingPincode={setBillingPincode}
              setBillingState={setBillingState}
              setBillingCountry={setBillingCountry}
              setBillingGst={setBillingGst}
              pinApiCall={pinApiCall}
              isShippingBilling={isShippingBilling}
              toggleIsShippingBilling={toggleIsShippingBilling}
              onPayment={onPayment}
              billingFirstName={billingFirstName}
              billingLastName={billingLastName}
              billingAddressLine1={billingAddressLine1}
              billingAddressLine2={billingAddressLine2}
              billingCity={billingCity}
              billingPincode={billingPincode}
              billingState={billingState}
              billingCountry={billingCountry}
              billingGst={billingGst}
              country={country}
              state={state}
            />
          )}
          <OrderBill
            productData={productData}
            subTotalAmount={subTotalAmount}
            taxRate={taxRate}
            shippingRate={shippingRate}
            totalRate={totalRate}
            onPayment={onPayment}
            handlePayment={handlePayment}
            handleCreateNewAccount={handleCreateNewAccount}
            sendRegistrationOtp={sendRegistrationOtp}
            userToken={userToken}
            handleDisableShipping={handleDisableShipping}
            billPageloading={billPageloading}
            paymentLoaderOnline={paymentLoaderOnline}
            paymentLoaderCOD={paymentLoaderCOD}
          />
        </div>
      </div>
      <button
        type="button"
        ref={launchUnregUserOtpModal}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <OTPdiv
        email={email}
        handleInput={handleInput}
        setMailOtp={setMailOtp}
        errors={errors}
        handleCreateNewAccount={handleCreateNewAccount}
        billPageloading={billPageloading}
        closeOtpModal={closeOtpModal}
      />
    </>
  ) : (
    <OrderConfirmed
      confirmedOrders={confirmedOrders}
      failedOrders={failedOrders}
      subTotalAmount={subTotalAmount}
      taxRate={taxRate}
      shippingRate={shippingRate}
      totalRate={totalRate}
      productList={productList}
      getCartProductImage={getCartProductImage}
    />
  );
};

export default ShippingInfo;
