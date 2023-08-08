import create from "zustand";
import { persist } from "zustand/middleware";

const HandleAddCartData = (a, b, c) => {
  //console.log("handle add-cart in state : ", a, b, c);
  let len = a.length;
  if (len) {
    let found = false;
    for (let i = 0; i < len; ++i) {
      let ele = a[i];
      if (ele && ele.product) {
        if (ele.product === b && ele.skuId === c) {
          ele.quantity += 1;
          return a;
        }
      } else {
        a.splice(i, 1);
      }
    }
    if (!found) {
      a.push({ product: b, skuId: c, quantity: 1 });
      return a;
    }
  }
  a.push({ product: b, skuId: c, quantity: 1 });
  return a;
};

const HandleDelCartData = (a, b, c) => {
  //console.log("handle delete-cart in state : ", a, b, c);
  let len = a.length;
  if (len) {
    for (let i = 0; i < len; i++) {
      let ele = a[i];
      if (ele && ele.product) {
        if (ele.product === b && ele.skuId === c) {
          if (ele.quantity < 2) {
            a.splice(i, 1);
            return a;
          }
          ele.quantity -= 1;
          return a;
        }
      } else {
        a.splice(i, 1);
      }
    }
  }
  return a;
};

const HandleDelAllCartData = (a, b, c) => {
  //console.log("handle delete-all-cart in state : ", a, b, c);
  let len = a.length;
  if (len) {
    let index = null;
    for (let i = 0; i < len; i++) {
      let ele = a[i];
      if (ele && ele.product) {
        if (ele.product === b && ele.skuId === c) {
          index = i;
          break;
        }
      } else {
        a.splice(i, 1);
      }
    }
    if (index === null) {
      return a;
    }
    a.splice(index, 1);
  }
  return a;
};

let cart = (set) => ({
  count: 0,
  cartData: [],
  incCartData: (data1, data2) => {
    set((state) => ({
      cartData: HandleAddCartData(state.cartData, data1, data2),
    }));
    set((state) => ({ count: state.count + 1 }));
  },
  setNewCart: (data, count) => {
    set((state) => ({ cartData: data, count }));
  },
  delCartData: (data1, data2) =>
    set((state) => ({
      cartData: HandleDelCartData(state.cartData, data1, data2),
      count: state.count - 1,
    })),
  delCartAllData: (data1, data2, remainingCount) =>
    set((state) => ({
      cartData: HandleDelAllCartData(state.cartData, data1, data2),
      count: state.count - remainingCount,
    })),
  emptyCart: () => set((state) => ({ cartData: [], count: 0 })),
});

cart = persist(cart, { name: "user-cart" });

const useCart = create(cart);

// ----------------------------------------------------------------

const HandleAddListData = (a, b, c) => {
  let len = a.length;
  if (len) {
    let found = false;
    for (let i = 0; i < len; ++i) {
      let ele = a[i];
      if (ele && ele.product) {
        if (ele.product === b && ele.skuId === c) {
          return a;
        }
      } else {
        a.splice(i, 1);
      }
    }
    if (!found) {
      a.push({ product: b, skuId: c });
      return a;
    }
  }
  a.push({ product: b, skuId: c });
  return a;
};

const HandleDelListData = (a, b, c) => {
  let len = a.length;
  if (len) {
    for (let i = 0; i < len; i++) {
      let ele = a[i];
      if (ele && ele.product) {
        if (ele.product === b && ele.skuId === c) {
          a.splice(i, 1);
          return a;
        }
      } else {
        a.splice(i, 1);
      }
    }
  }
  return a;
};

let wishlist = (set) => ({
  list: [],
  addList: (data1, data2) => {
    set((state) => ({ list: HandleAddListData(state.list, data1, data2) }));
  },
  delList: (data1, data2) =>
    set((state) => ({ list: HandleDelListData(state.list, data1, data2) })),
  setWishList: (data) => set((state) => ({ list: data })),
  emptyWishlist: () => set((state) => ({ list: [] })),
});

wishlist = persist(wishlist, { name: "user-wishlist" });

const useWishList = create(wishlist);

// ------------------------------------------------------

let userSetting = (set) => ({
  token: "",
  info: {},
  influencerList: null,
  setToken: (t) => set((state) => ({ token: t })),
  setUserInfo: (d) => set((state) => ({ info: d })),
  addInfluencer: (data) => set((state) => ({ influencerList: data })),
  resetUser: () =>
    set((state) => ({ token: "", info: {}, influencerList: null })),
});

userSetting = persist(userSetting, { name: "user-setting" });

const useUserSetting = create(userSetting);

// ----------------------------------------------------------

const loginState = (set) => ({
  isLoginPopup: false,
  setLoginPopup: (v) => set((state) => ({ isLoginPopup: v })),
});

const useLoginState = create(loginState);

// -----------------------------------------------------------
const signupState = (set) => ({
  isSignupPopup: false,
  setSignupPopup: (v) => set((state) => ({ isSignupPopup: v })),
});
const useSignUpState = create(signupState);
// -----------------------------------------------------------

export { useCart, useWishList, useUserSetting, useLoginState, useSignUpState };
