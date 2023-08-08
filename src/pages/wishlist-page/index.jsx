import React, { useEffect, useState } from "react";
import Styles from "./index.module.css";
import { useLocation } from "react-router-dom";
import WishlistCard from "./wishListCards";
import { useUserSetting, useWishList } from "../../state-managers/cart-state";
import { setVisitCount } from "../../utlils/functions";
import {
  getMultipleProductData,
  getPopulatedUserWishlist,
} from "../../config/configService";
import { handleApiErrors } from "../../services/APIService";

////////////////////////////////////////

function WishlistPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  let wishlistData = useWishList((state) => state.list);
  let userToken = useUserSetting((state) => state.token);

  const loc = useLocation();
  const search = useLocation().search;
  const slug = new URLSearchParams(search).get("slug");

  // ----------------------

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
      setVisitCount("/wishlist", data);
    }
    return () => {
      i = 1;
    };
  }, [loc.pathname]);

  const getCartProductImage = (id, d) => {
    if (!id) {
      return d.images && d.images.length
        ? d.images[0].secureUrl
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

    return d.images[0].secureUrl;
  };

  function wishlistDataGen(dat) {
    let arr = [];
    for (let i = 0; i < dat.length; i++) {
      const obj = {
        brandName: "",
        productName: "",
        price: "",
        productId: "",
        skuId: "",
        image: "",
      };
      const ele = dat[i];
      if (ele && ele.product) {
        obj.brandName = ele.product.brandName;
        obj.productName = ele.product.productName;
        obj.productId = ele.product._id;
        obj.skuId = ele.skuId;
        let p = 0;
        if (!ele.skuId || ele.skuId === "") {
          p = ele.product.price ? ele.product.price : 0;
        } else {
          p = ele.product.variantPrices[ele.skuId] // solve error here when product does not have variant then there is no variantPrices and variant dimentions are not there so solve this when we add product from admin panel and for now check and then get price!!!!
            ? ele.product.variantPrices[ele.skuId]
            : 0;
        }
        obj.price = p;
        obj.image = getCartProductImage(ele.skuId, ele.product);
        arr.push(obj);
      }
    }
    //console.log("wishlist data gen : ", arr);
    return arr;
  }

  async function wishlistDataGet() {
    try {
      setLoading(true);
      if (!wishlistData.length) return;
      const productIdArr = [...new Set(wishlistData.map((ele) => ele.product))];
      //console.log({ productIdArr });
      const res = await getMultipleProductData(productIdArr);
      //console.log("wishlist product data : ", res);
      if (!res || res.issue || !res.result) {
        //console.log("inside own error");
        throw new Error("No response from server!!", {
          cause: { ownErrorMsg: true },
        });
      }
      const finalData = wishlistData.map((el) => ({
        product: res.result.find((ele) => ele._id === el.product),
        skuId: el.skuId,
      }));
      //console.log("final data : ", finalData);
      let final = wishlistDataGen(finalData);
      //console.log("final : ", final);
      setData(final);
      setLoading(false);
    } catch (error) {
      //console.log(
      //   "found error while creating wishlist with local data : ",
      //   error.message || error
      // );
      setError(
        error.cause.ownErrorMsg ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  const userWishlistGet = async () => {
    try {
      setLoading(true);
      const r1 = await getPopulatedUserWishlist();
      //console.log("wishlist user wishlist data: ", r1);
      if (r1.issue) throw new Error("Something went wrong!!!");

      if (!r1.result || !r1.result.products || !r1.result.products.length)
        throw new Error("data not found");

      let data = r1.result.products;
      let nextData = wishlistDataGen(data);
      //console.log("next-wishlist-data: ", nextData);
      setData(nextData);
    } catch (error) {
      //console.log("error getting wishlist-data : ", error.message || error);
      const message = handleApiErrors(error);
      if (message.startsWith("Network error"))
        setError("Check your connection!!!");
      else if (message.startsWith("Server error")) setError("Server Error!!!");
      else if (message.startsWith("Request error"))
        setError("Error occured while fetching your data.");
      else setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userToken) {
      userWishlistGet();
    } else {
      wishlistDataGet();
    }
  }, []);

  return (
    <>
      {loading ? (
        <h1>Loading......</h1>
      ) : error ? (
        <p style={{ width: "100%", margin: "unset" }}>
          Emptiness is just the beginning: <br />
          Curate your wishlist and let it become a reflection of your
          aspirations!
        </p>
      ) : (
        <div className={Styles.wishlistContainer}>
          <div className={Styles.heading}>
            <h3>Wishlist</h3>
          </div>
          <div className={Styles.subHeading}>
            <p>your wishes are ought to be fulfilled soon</p>
          </div>
          <section className={Styles.productList}>
            {data.length ? (
              data.map((elem, index) => (
                <WishlistCard
                  key={
                    elem
                      ? elem.skuId && elem.productId
                        ? `${elem.skuId}__${elem.productId}`
                        : `__${elem.productId}`
                      : index
                  }
                  {...elem}
                />
              ))
            ) : (
              <></>
            )}
          </section>
        </div>
      )}
    </>
  );
}

export default WishlistPage;
