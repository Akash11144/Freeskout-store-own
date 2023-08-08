// ** if user does'nt came with slug then we'll check slug in his/her acc. at checkout time

import React, { useEffect } from "react";
import Styles from "./App.module.css";
// -----------
import {
  DIMENSITY_GET_ROUTE_INFO,
  LOCAL_LINK,
} from "./utlils/variables-and-small functions";
import { SetSyncCart } from "./utlils/functions";
// -----------
import { Route, Routes, useLocation } from "react-router-dom";
// -----------
import {
  useCart,
  useLoginState,
  useSignUpState,
  useUserSetting,
  useWishList,
} from "./state-managers/cart-state";
// -----------
import { MainRoutes } from "./mainRoutes";
import { removeAuthToken, setAuthToken } from "./services/storageService";
import SignUp from "./components/signUp";
import NewNav from "./components/navbar";
import Footer from "./components/footer";
import UserLogin from "./components/login";
import MyToast from "./components/toast";
import {
  getUserCart,
  getUserWishlist,
  influencerSignup,
} from "./config/configService";
import CurrentUserLogin from "./components/login";
import UserSignUp from "./components/signUp";
import { influencerUrl } from "./services/APIService";

// ////////////////////////////////////////////////

function App() {
  const userToken = useUserSetting((state) => state.token);
  const influencerData = useUserSetting((state) => state.influencerList);
  const addInfluencerState = useUserSetting((state) => state.addInfluencer);
  const resetUser = useUserSetting((state) => state.resetUser);

  const cartData = useCart((state) => state.cartData);
  const newCart = useCart((state) => state.setNewCart);
  const emptyCart = useCart((state) => state.emptyCart);

  const emptyWishlist = useWishList((state) => state.emptyWishlist);
  const setWishList = useWishList((state) => state.setWishList);
  const isLoginPopup = useLoginState((state) => state.isLoginPopup);
  const isSignupPopup = useSignUpState((state) => state.isSignupPopup);

  // ----------------

  const search = useLocation().search;
  const slug = new URLSearchParams(search).get("slug");

  // ----------------

  const dt = new Date();

  // ---------------

  let i = 0;
  useEffect(() => {
    if (!i) {
      getInfluencerData();
    }
    return () => {
      i = 1;
    };
  }, []);

  let j = 0;
  useEffect(() => {
    // useEffect to sync local data and logged-in user data
    if (!j) {
      // console.log(
      //   "app.js use-effect : ",
      //   "login =>",
      //   userToken,
      //   " influencer-data => ",
      //   influencerData,
      //   " slug => ",
      //   slug
      // );
      if (userToken) {
        // console.log("user logged in");
        setAuthToken(userToken);
        SyncCart();
        syncWishlist();
        setInfluencerToServer(dt.getTime());
      }
      //  else console.log("user logged out!!!");
    }
    return () => (j = 1);
  }, [userToken]);

  // ///////////////////////////////////////

  const getInfluencerData = async () => {
    // console.log("slug from params: ", slug);
    if (slug) {
      try {
        let r = await fetch(`${DIMENSITY_GET_ROUTE_INFO}/${slug}`);
        // console.log("get-influencer-data response : ", r);
        let r1 = await r.json();
        // console.log("influencer data : ", r1);
        if (!r1 || !r1.result || !r1.result.length || r1.issue) {
          throw new Error("influencer data not found by slug");
        }
        let data = r1.result[0];
        const resData = await influencerSignup({
          email: data.for_email,
          name: data.for_name,
          slug: [slug],
        });
        // console.log("app setting up influencer data in shop backend", resData);
        if (!resData || resData.issue) {
          throw new Error("error setting up user in shop backend");
        }
        let infData = {
          slug,
          data,
          time: dt.getTime(),
        };
        // console.log("app setting inluencer data to local", infData);
        slug && addInfluencerState(infData);
        slug && sessionStorage.setItem("sesTest", JSON.stringify(infData));
        // to track user, if someone came with influencer then leave and then again he/she comes directly.
      } catch (error) {
        // console.log(
        //   "app get-influencer-data catch : ",
        //   error,
        //   error.message && error.message
        // );
      }
    }
  };

  const SyncCart = async () => {
    try {
      const r1 = await getUserCart();
      // console.log("app cart-page sync data: ", r1);
      // console.log("app cart-page local data: ", cartData);
      if (!r1) throw new Error("no response from server");
      if (r1.logout) throw new Error("logout");
      if (r1.issue || !r1.result) throw new Error("something went wrong");

      const serverData = r1.result[0]?.products || [];
      let localData = cartData;
      // ------------------
      if (!serverData.length && !localData.length) {
        // console.log("no data present on local and server");
        return;
      }
      if (!serverData.length) {
        // console.log("data present locally only");
        await SetSyncCart([...localData]);
        return;
      }
      // console.log("data present on server only");
      const clientData = serverData
        .filter((el) => el && el.product)
        .map((ele) => {
          return {
            product: ele.product._id,
            skuId: ele.skuId,
            quantity: ele.quantity,
          };
        });
      const totalCount = serverData.reduce((acc, curr) => {
        if (curr && curr.product) {
          return acc + curr.quantity || 0;
        } else return acc + 0;
      }, 0);
      // console.log("sync server data : ", clientData, totalCount);
      newCart(clientData, totalCount);
    } catch (error) {
      // console.log(
      //   "appjs SyncCart catch: error getting data from user-cart, redirect to homepage: ",
      //   error,
      //   error?.message
      // );
      if (error?.message === "logout") {
        resetUser();
        emptyCart();
        emptyWishlist();
        removeAuthToken();
      }
    }
  };

  const syncWishlist = async () => {
    try {
      const r1 = await getUserWishlist();
      // console.log("app wishlist sync data: ", r1);
      if (!r1) throw new Error("no response from server");
      if (r1.logout) throw new Error("logout");
      if (r1.issue || !r1.result) throw new Error("something went wrong");
      if (!r1.result.products || !r1.result.products.length)
        return emptyWishlist();

      const nextWishlist = r1.result.products.map(({ product, skuId }) => ({
        product,
        skuId,
      }));
      // console.log("next-wishlist :", nextWishlist);
      setWishList(nextWishlist);
    } catch (error) {
      // console.log("app error from syncWishlist : ", error, error?.message);
      if (error?.message === "logout") {
        resetUser();
        emptyCart();
        emptyWishlist();
        removeAuthToken();
      }
    }
  };

  // ----------------

  const setInfluencerToServer = async (time) => {
    // console.log("inside set-influencer-to-server", slug);
    if (slug) {
      fetch(`${influencerUrl}/addUserInf`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          influencer: influencerData,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log("setInfluencerToServer data in appjs: ", data);
        })
        .catch(
          (err) =>
            // console.log("error from setInfluencerToServer in appjs: ", err)
            ""
        );
    }
  };

  // /////////////////////////////////////////////////////

  return (
    <React.Fragment>
      {/* {console.log("app.js redering...")} */}
      <div className={`fluid p-0 ${Styles.mainAppCont}`}>
        <Routes>
          <Route
            path="/*"
            element={
              <>
                <NewNav />
                <div className={`fluid ${Styles.mainAppSecondaryCont}`}>
                  {/* {isLoginPopup ? "True" : "false"} */}
                  <div className={Styles.LoginCont}>
                    {isLoginPopup ? <CurrentUserLogin /> : ""}
                  </div>
                  <div className={Styles.LoginCont}>
                    {isSignupPopup ? <UserSignUp /> : ""}
                  </div>
                  <MainRoutes />
                </div>
                <Footer />
              </>
            }
          />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
        <div style={{ position: "absolute", top: "0" }}>
          <MyToast
            position={"top-right"}
            autoClose={500}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={"light"}
          ></MyToast>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;

// ------------------------------------------------------------------------------------------------------------------------------------------------------
