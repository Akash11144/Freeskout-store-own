const buildUrl = require("build-url");
const {
  GET,
  POST,
  PUT,
  DELETE,
  PATCH,
  POSTFILE,
  GET_UNAUTHENTICATED,
  userUrl,
  productComboUrl,
  reviewUrl,
  shippingUrl,
  paymentUrl,
  cartUrl,
  productUrl,
  influencerUrl,
  brandUrl,
  orderUrl,
  inventoryUrl,
  wishlistUrl,
  storeDataUrl,
  categoryUrl,
} = require("../services/APIService");

const addAddressApi = (body) => {
  return PUT(`${userUrl}/addAddress`, body);
};

const getUserAddresses = () => {
  return GET(`${userUrl}/getUserAddresses`);
};
const getBestSellersCombos = () => {
  return GET(`${productComboUrl}/getBestSellerCombos`);
};

const getAllCombos = () => {
  return GET(`${productComboUrl}/getCombos`);
};

const getSingleComboProducts = (comboId) => {
  return GET(`${productComboUrl}/getCombo/${comboId}`);
};

const reviewProduct = (productID, body) => {
  return POST(`${reviewUrl}/createReview/${productID}`, body);
};

const getReviewApi = (productID) => {
  return GET(`${reviewUrl}/product/${productID}`);
};

const initiateShipping = (body) => {
  return POST(`${shippingUrl}/initiateShipping`, body);
};

const createPayment = (body) => {
  return POST(`${paymentUrl}/create`, body);
};

const verifyPayment = (paymentId, data) => {
  return PUT(`${paymentUrl}/success/${paymentId}`, data);
};

const placeCodOrderApi = (orders, slug) => {
  return POST(`${paymentUrl}/place_cod_order`, { orders, slug });
};

const clearCart = () => {
  return DELETE(`${cartUrl}/deleteCart`);
};

const getAllProducts = (params, signal) => {
  return GET(
    buildUrl(`${productUrl}`, {
      path: `/Allproducts`,
      queryParams: { ...params },
    }),
    signal
  );
};

const getSearchedProductsApi = (searchQuery, signal) => {
  return GET_UNAUTHENTICATED(
    `${productUrl}/product-search/${searchQuery}`,
    signal
  );
};

const getBrandProducts = (brandId) => {
  return GET_UNAUTHENTICATED(
    `${productUrl}/allBrandProductUnauthenticated/${brandId}`
  );
};

const signup = (data) => {
  return POST(`${userUrl}/signUp`, data);
};

const influencerSignup = (data) => {
  return POST(`${influencerUrl}/signup`, data);
};

const getPhoneOtp = (data) => {
  return POST(`${userUrl}/sendSignUpPhoneOtp`, data);
};

const getEmailOtp = (data) => {
  return POST(`${userUrl}/sendSignUpEmailOtp`, data);
};

const getLoginOtp = (data) => {
  return POST(`${userUrl}/sendLoginOtp`, data);
};

const loginApi = (data) => {
  return POST(`${userUrl}/login`, data);
};

const getAllBrands = () => {
  return GET(`${brandUrl}/allBrands`);
};

const getOneProductData = (productId) => {
  return GET(`${productUrl}/oneProduct/` + productId);
};

const getMultipleProductData = (productIdArr) => {
  return POST(`${productUrl}/multiple_product`, productIdArr);
};

const getMyPaginatedOrders = (params) => {
  return GET(
    buildUrl(`${orderUrl}`, {
      path: `/get_my_paginated_orders`,
      queryParams: { ...params },
    })
  );
};

const getMyOrdersPageCount = (params) => {
  return GET(
    buildUrl(`${orderUrl}`, {
      path: `/get_my_orders_page_count`,
      queryParams: { ...params },
    })
  );
};

const getTrackingInfo = (awbs) => {
  return POST(`${shippingUrl}/fetch_tracking_info`, { awbs });
};

const getInvoiceUrls = async (orderIds) => {
  return POST(`${shippingUrl}/get_invoice_urls`, { orderIds });
};
const cancelOrder = async (orderId) => {
  return POST(`${shippingUrl}/cancel_order`, { orderId });
};
const getOrderDetails = (orderId) => {
  return GET(`${orderUrl}/get_order_details/${orderId}`);
};

const getInventoryBySkuIds = (skuIds) => {
  return POST(`${inventoryUrl}/getSkuListInfoUnauthorized`, { skuIds });
};

const updateInventory = (data) => {
  return PATCH(`${inventoryUrl}/updateInventory`, { data });
};

const updatePaymentInventory = (data) => {
  return PATCH(`${inventoryUrl}/updatePaymentInventory`, { data });
};

const getUserCart = () => {
  return GET(`${cartUrl}/getUserCart`);
};

const addCartProduct = (data) => {
  return PATCH(`${cartUrl}/addProductCart`, { data });
};

const deleteCartProduct = (data) => {
  return PATCH(`${cartUrl}/delProductCart`, { data });
};

const deleteAllCartProduct = (data) => {
  return PATCH(`${cartUrl}/delAllCartProduct`, { data });
};

const setNewcart = (data) => {
  return POST(`${cartUrl}/setNewCart`, { data });
};

const getUserWishlist = () => {
  return GET(`${wishlistUrl}/getUserWishlist`);
};

const addWishlistProduct = (data) => {
  return PATCH(`${wishlistUrl}/addWishlist`, { data });
};

const deleteWishlistProduct = (data) => {
  return PATCH(`${wishlistUrl}/delWishlist`, { data });
};

const getPopulatedUserWishlist = () => {
  return GET(`${wishlistUrl}/getUserWishlistPopulated`);
};

const getOneProductInfo = (productId) => {
  return GET(`${productUrl}/oneProduct/${productId}`);
};

const logout = (data) => {
  return POST(`${userUrl}/logout`, { data });
};

const addHomepageVisit = (data) => {
  return PATCH(`${storeDataUrl}/set-homepage-visit`, { data });
};

const addCartVisit = (data) => {
  return PATCH(`${storeDataUrl}/set-cart-visit`, { data });
};

const addProductInfoVisit = (data) => {
  return PATCH(`${storeDataUrl}/set-productInfo-visit`, { data });
};
const addWishlistVisit = (data) => {
  return PATCH(`${storeDataUrl}/set-wishlist-visit`, { data });
};
const addBrandVisit = (data) => {
  return PATCH(`${storeDataUrl}/set-brand-visit`, { data });
};
const addShippingVisit = (data) => {
  return PATCH(`${storeDataUrl}/set-shipping-visit`, { data });
};
const addAllProductVisit = (data) => {
  return PATCH(`${storeDataUrl}/set-allProduct-visit`, { data });
};
const initiateRefundApi = (data) => {
  return POST(`${paymentUrl}/create_refund`, data);
};
const getOrderDetailShipRocketApi = async (orderId) => {
  return GET(`${orderUrl}/get_order_detail_shiprocket/${orderId}`);
};
const getAllCategories = async () => {
  return GET(`${categoryUrl}/getAll`);
};
const getProductsbyCategory = async (category) => {
  return GET(`${productUrl}/getProductByString/${category}`);
};
export {
  signup,
  influencerSignup,
  loginApi,
  logout,
  addAddressApi,
  initiateShipping,
  createPayment,
  verifyPayment,
  placeCodOrderApi,
  clearCart,
  getUserAddresses,
  getAllProducts,
  getSearchedProductsApi,
  getBrandProducts,
  getPhoneOtp,
  getEmailOtp,
  getLoginOtp,
  getAllBrands,
  getOneProductData,
  getMultipleProductData,
  getMyPaginatedOrders,
  getMyOrdersPageCount,
  getTrackingInfo,
  getInvoiceUrls,
  getOrderDetails,
  getInventoryBySkuIds,
  updateInventory,
  updatePaymentInventory,
  getUserCart,
  addCartProduct,
  deleteCartProduct,
  deleteAllCartProduct,
  setNewcart,
  getUserWishlist,
  addWishlistProduct,
  deleteWishlistProduct,
  getPopulatedUserWishlist,
  getOneProductInfo,
  addHomepageVisit,
  addCartVisit,
  addProductInfoVisit,
  addBrandVisit,
  addShippingVisit,
  addWishlistVisit,
  addAllProductVisit,
  getBestSellersCombos,
  getAllCombos,
  getSingleComboProducts,
  reviewProduct,
  getReviewApi,
  cancelOrder,
  initiateRefundApi,
  getOrderDetailShipRocketApi,
  getAllCategories,
  getProductsbyCategory,
};
