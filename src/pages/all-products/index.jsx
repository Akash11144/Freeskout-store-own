import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getAllProducts } from "../../config/configService";
import { setVisitCount } from "../../utlils/functions";
import styles from "./index.module.css";
import ProductCard from "../../components/homePageComponents/card";
import { formatCurrency } from "../../utlils/variables-and-small functions";
import InfiniteScroll from "../../components/commonComponents/infinteScrollableProducts";
import { productUrl } from "../../services/APIService";

export default function AllProducts() {
  const [productsData, setProductsData] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [pageError, setPageError] = useState(false);

  const loc = useLocation();
  const slug = new URLSearchParams(loc.search).get("slug");
  const getPrice = (data) => {
    let v = data
      ? data.hasVariant
        ? Object.values(data.variantPrices).length
          ? Object.values(data.variantPrices)[0]
          : "not available"
        : data.price
      : "not available";
    return v;
  };
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
      setVisitCount("/allProducts-page", data);
    }
    return () => {
      i = 1;
    };
  }, [loc.pathname]);

  const fetchProducts = async (signal) => {
    try {
      // console.log("fetching products...");
      setPageLoading(true);
      setPageError(false);
      let res = await getAllProducts(true, signal);
      // console.log("products data : ", res);
      if (!res || !res.result || res.issue) {
        throw new Error("Something went wrong");
      }
      setPageError(false);
      setProductsData(res.result);
    } catch (error) {
      if (error.name === "AbortError") {
        // console.log("fetch aborted in all-products-page in fetch products");
      } else {
        // console.log("error in fetch products : ", error);
      }
      setPageError(error.message ? error.message : "Something went wrong");
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    // console.log("inside useEffect of allProducts-page", signal);
    fetchProducts(signal);

    return () => {
      // console.log("unmounting allProducts-page");
      controller.abort();
      // console.log("signal in useEffect : ", signal);
    };
  }, []);

  return (
    <div>
      {pageLoading ? (
        <>
          <h1>Loading....</h1>
        </>
      ) : (
        <>
          {pageError ? (
            <>
              <h1>{pageError}</h1>
            </>
          ) : (
            <>
              <InfiniteScroll
                apis={{
                  productApi: `${productUrl}/allProducts?page=`,
                  countApi: `${productUrl}/allProductsPageCount`,
                }}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
