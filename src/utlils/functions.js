import {
  addCartProduct,
  addWishlistProduct,
  deleteAllCartProduct,
  deleteCartProduct,
  deleteWishlistProduct,
  addHomepageVisit,
  addCartVisit,
  addProductInfoVisit,
  addWishlistVisit,
  addBrandVisit,
  addShippingVisit,
  addAllProductVisit,
  setNewcart,
} from "../config/configService";

export const setItemServer = async (incre, allDelete, productID, skuId) => {
  if (allDelete) {
    const r1 = await deleteAllCartProduct({
      product: productID,
      skuId,
    });
    // console.log("set-item-server delete-all-cart-product", r1);
    if (r1.issue) {
      return false;
    }
    return true;
  } else {
    if (incre) {
      const r1 = await addCartProduct({ product: productID, skuId });
      // console.log("set-item-server add-cart-product", r1);
      if (r1.issue) {
        return false;
      }
      return true;
    } else {
      const r1 = await deleteCartProduct({ product: productID, skuId });
      // console.log("set-item-server delete-cart-product", r1);
      if (r1.issue) {
        return false;
      }
      return true;
    }
  }
};

export const setWishlistServer = async (add, productID, skuId) => {
  if (add) {
    const r1 = await addWishlistProduct({ product: productID, skuId });
    // console.log("wishlist add server response:", r1);
    if (r1.issue) {
      return false;
    }
    return true;
  }
  const r1 = await deleteWishlistProduct({ product: productID, skuId });
  // console.log("wishlist delete server response:", r1);
  if (r1.issue) {
    return false;
  }
  return true;
};

// ----------------------------------------------------------------------------------------------------------------------------------------------------

export const setVisitCount = async (path, data) => {
  // console.log("inside set visit count function: ", path);
  switch (path) {
    case "/":
      addHomepageVisit(data);
      //   .then((res) =>
      //     console.log("homepage visit response : ", res))
      //   .catch((err) => console.log("homepage visit error : ", err));
      break;
    case "/cart":
      addCartVisit(data);
      //   .then((res) => console.log("cart visit response : ", res))
      //   .catch((err) => console.log("cart visit error : ", err));
      break;
    case "/product-info":
      addProductInfoVisit(data);
      //   .then((res) =>
      //     console.log("addProductInfoVisit visit response : ", res)
      //   )
      //   .catch((err) => console.log("addProductInfoVisit visit error : ", err));
      break;
    case "/wishlist":
      addWishlistVisit(data);
      // .then((res) => console.log("addWishlistVisit visit response : ", res))
      // .catch((err) => console.log("addWishlistVisit visit error : ", err));
      break;
    case "/brand-page":
      addBrandVisit(data);
      // .then((res) => console.log("addBrandVisit visit response : ", res))
      // .catch((err) => console.log("addBrandVisit visit error : ", err));
      break;
    case "/shipping-page":
      addShippingVisit(data);
      // .then((res) => console.log("addShippingVisit visit response : ", res))
      // .catch((err) => console.log("addShippingVisit visit error : ", err));
      break;
    case "/allProducts-page":
      addAllProductVisit(data);
      // .then((res) => console.log("addAllProductVisit visit response : ", res))
      // .catch((err) => console.log("addAllProductVisit visit error : ", err));
      break;
    default:
      // console.log("no case worked in setVisitCount()");
      break;
  }
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------

export const SetSyncCart = async (products, token) => {
  // console.log("inside setSynccart func. : ", products, token);
  const r3 = await setNewcart(products);
  // console.log("functions set-new-cart", r3);
  if (r3.issue) return r3;
  else return r3;
};

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------

export const generateOrderDate = (dateString = new Date()) => {
  let currentDate = new Date(dateString);
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth() + 1;
  let currentDay = currentDate.getDate();
  let currentHours = currentDate.getHours();
  let currentMinutes = currentDate.getMinutes();
  if (`${currentMonth}`.length == 1) currentMonth = `0${currentMonth}`;
  if (`${currentDay}`.length == 1) currentDay = `0${currentDay}`;
  if (`${currentHours}`.length == 1) currentHours = `0${currentHours}`;
  if (`${currentMinutes}`.length == 1) currentMinutes = `0${currentMinutes}`;
  return `${currentYear}-${currentMonth}-${currentDay} ${currentHours}:${currentMinutes}`;
};

export const gramsToKgs = (grams) => {
  if (isNaN(grams)) return null;
  return `${parseFloat(grams) / 1000}`;
};

export const validateIndianMobile = (mobile) => {
  const re = /^[6-9]\d{9}$/;
  let regexTest = re.test(mobile);
  if (!regexTest) return false;
  const numberString = String(mobile);

  const firstDigit = numberString[0];

  const sameDigits = numberString
    .split("")
    .every((digit) => digit === firstDigit);

  return !sameDigits;
};

export const emailChecker = (item) => {
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let res = regex.test(item);
  return res;
};

export const convertToPaise = (rupees) => {
  return rupees * 100;
};
