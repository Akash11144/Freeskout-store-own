/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import AddDelProduct from "../../components/AddDelProduct";
import { FaShareAlt } from "react-icons/fa";
import Like from "../../components/like";
import Image from "../../assets/dummyUser.png";
import { AiTwotoneStar } from "react-icons/ai";
import { BsCart3 } from "react-icons/bs";
import { MdOutlineRateReview } from "react-icons/md";
import {
  getInventoryBySkuIds,
  getOneProductData,
  getReviewApi,
} from "../../config/configService";
import { setVisitCount } from "../../utlils/functions";
import productStyle from "./index.module.css";
import Loader from "../../components/loader";
import { RWebShare } from "react-web-share";
import Review from "../../components/commonComponents/review";
import {
  useLoginState,
  useSignUpState,
  useUserSetting,
  useCart,
} from "../../state-managers/cart-state";
import ProductCarouselMob from "./productCarouselMob";

// ///////////////////////////////////

const ProductInfo = () => {
  const { productID } = useParams();
  const [isPurchased, setIsPurchased] = useState(true);
  const [data, setData] = useState([]);
  const [currentVariantData, setCurrentVariantData] = useState({});
  const [inventory, setInventory] = useState({});
  const [reviews, setReviews] = useState({});
  const [imgPreviewUrl, setImgPreviewUrl] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState(false);
  const userToken = useUserSetting((state) => state.token);
  const count = useCart((state) => state.count);
  const loc = useLocation();
  const search = useLocation().search;
  const slug = new URLSearchParams(search).get("slug");

  // -----
  const [url, setUrl] = useState(window.location.href);
  const StarRating = (n) => {
    const renderStars = () => {
      const stars = [];
      for (let i = 0; i < n; i++) {
        stars.push(
          <span key={i}>
            <AiTwotoneStar style={{ color: "goldenrod", fontSize: "20px" }} />
          </span>
        );
      }
      return stars;
    };

    return <div>{renderStars()}</div>;
  };
  const reviewDate = (n) => {
    const dateObj = new Date(n);

    const formattedDate = dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  };
  const textRef = useRef(null);
  const handleCopy = () => {
    textRef.current.select();
    document.execCommand("copy");
    alert("Copied to clipboard");
  };

  const getReviews = async () => {
    try {
      const res = await getReviewApi(productID);
      // console.log("reviews", res);
      if (!res || res.issue) throw new Error("something went wrong");
      setReviews(res.reviews.reverse());
    } catch (error) {
      // console.log(error);
    }
  };

  const getAvgRating = (reviews) => {
    let sum = 0;
    for (let i = 0; i < reviews.length; i++) {
      sum += reviews[i].rating;
    }
    return {
      avgRating: reviews.length ? sum / reviews.length : 0,
      length: reviews.length ? reviews.length : 0,
    };
  };

  useEffect(() => {
    getReviews();
  }, [productID]);

  useEffect(() => {
    const handleUrlChange = () => {
      setUrl(window.location.href);
    };
    window.addEventListener("popstate", handleUrlChange);
    return () => {
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, []);

  let i = 0;
  useEffect(() => {
    if (!i) {
      let dt = new Date();
      let time = dt.getTime();
      let data = null;
      if (slug) {
        data = { slug, time, productId: productID };
      } else {
        let t2 = JSON.parse(sessionStorage.getItem("sesTest"));
        if (t2 && t2.slug) {
          data = { slug: t2.slug, time, productId: productID };
        } else {
          data = { slug: "unknown_1-2_3-4", time, productId: productID };
        }
      }
      setVisitCount("/product-info", data);
    }
    return () => {
      i = 1;
    };
  }, [loc.pathname]);

  useEffect(() => {
    getProductData();
  }, [productID]);

  const getProductData = async () => {
    try {
      setPageLoading(true);
      let res = await getOneProductData(productID);
      // console.log("product-info product-data response : ", res);
      if (res.issue) {
        setPageError("Product data will be available soon....");
      } else {
        let aa = res.result;
        setData(aa);
        const inventories = aa.inventory;

        const inventoryObj = inventories.reduce((acc, skuData) => {
          acc[skuData.skuId] = skuData.currentCount;
          return acc;
        }, {});

        // console.log({ inventoryObj });
        setInventory(inventoryObj);

        let newData = {
          brandName: "",
          productName: "",
          productId: "",
          productDetail: "",
          dimentions: "",
          images: [],
          price: "",
          discount: "",
          influencerShare: "",
          skuId: "",
        };
        if (aa.hasVariant) {
          newData.brandName = aa.brandName;
          newData.productId = aa._id;
          newData.productName = aa.productName;
          newData.productDetail = aa.productDetail;
          newData.dimentions = aa.variantDimensions[aa.skus[0]];
          newData.price = aa.variantPrices[aa.skus[0]]
            ? aa.variantPrices[aa.skus[0]]
            : 0;
          newData.discount = aa.discount;
          newData.influencerShare = aa.influencerShare;
          newData.skuId = aa.skus[0];
          newData.images = aa.variantTypes[0].variantOptions[0].images;

          for (let i = 0; i < aa.variantTypes.length; i++) {
            let ele = aa.variantTypes[i];
            if (ele.variantName === "Size") {
              continue;
            } else {
              newData.images = aa.variantTypes[i].variantOptions[0].images;
            }
          }

          let a = aa.variantTypes;
          // console.log("variant data: ", a);
        } else {
          newData.brandName = aa.brandName;
          newData.productName = aa.productName;
          newData.productId = aa._id;
          newData.productDetail = aa.productDetail;
          newData.images = aa.images;
          newData.dimentions = aa.dimentions;
          newData.price = aa.price ? aa.price : 0;
          newData.discount = aa.discount;
          newData.influencerShare = aa.influencerShare;
          newData.skuId = "";
        }

        if (newData.images.length < 5 && aa.images.length >= 5) {
          let newImgList = [];
          for (let i = 0; i < aa.images.length; i += 1) {
            if (newData.images[i]) {
              newImgList.push(newData.images[i]);
            } else {
              newImgList.push(aa.images[i]);
            }
          }

          if (newImgList.length) {
            newData.images = [...newImgList];
          }
        }
        // console.log("product-info current variant data ", newData);
        setImgPreviewUrl(
          newData.images.length ? newData.images[0].secureUrl : ""
        );
        setCurrentVariantData(newData);
      }
    } catch (error) {
      // console.log("product-info catch error", error);
      setPageError("Error getting product information!!");
    } finally {
      setPageLoading(false);
    }
  };

  const handleCurrentVariant = (imgUrl) => {
    // console.log("data in handle-current-variant : ", imgUrl, data);
    window.scrollTo({ top: 0, behavior: "smooth" });
    let newData = {
      brandName: data.brandName,
      productId: data._id,
      productName: data.productName,
      productDetail: data.productDetail,
      dimentions: {},
      price: 0,
      discount: data.discount,
      influencerShare: data.influencerShare,
      images: [],
      skuId: imgUrl,
    };
    let imgArr = [];
    if (data && data.variantTypes) {
      for (let i = 0; i < data.variantTypes.length; i++) {
        let ele = data.variantTypes[i];
        for (let j = 0; j < ele.variantOptions.length; j++) {
          let n = ele.variantOptions[j].title;
          if (imgUrl.includes(n)) {
            let result = ele.variantOptions[j].images;
            imgArr = [...imgArr, ...result];
          }
        }
      }
      newData.images = imgArr;
      newData.price = data.variantPrices && data.variantPrices[imgUrl];
      newData.dimentions =
        data.variantDimensions && data.variantDimensions[imgUrl];
    }

    // console.log("next current-variant-data : ", newData);

    if (newData.images.length < 5 && data.images.length >= 5) {
      let newImgList = [];
      for (let i = 0; i < data.images.length; i += 1) {
        if (newData.images[i]) {
          newImgList.push(newData.images[i]);
        } else {
          newImgList.push(data.images[i]);
        }
      }

      if (newImgList.length) {
        newData.images = [...newImgList];
      }
    }
    setImgPreviewUrl(
      newData.images && newData.images.length ? newData.images[0].secureUrl : ""
    );
    setCurrentVariantData(newData);
  };

  const getVariantImage = (variantImageName) => {
    // console.log("get-variant-image : ", variantImageName, data);

    const foundImage = data.variantTypes
      .filter((ele) => ele.variantName !== "Size")
      .flatMap((ele) => ele.variantOptions)
      .find((option) => variantImageName.includes(option.title));

    if (foundImage && foundImage.images && foundImage.images.length) {
      return foundImage.images[0].secureUrl;
    }

    return data.images[0].secureUrl;
  };

  const getOutOfStock = (item) => {
    if (!Object.keys(inventory).length) return true;
    if (
      inventory[`${item.skuId}__${item.productId}`] &&
      inventory[`${item.skuId}__${item.productId}`] > 0
    ) {
      return false;
    }
    return true;
  };

  const getAvailable = (item) => {
    if (!Object.keys(inventory).length) return 0;
    if (
      inventory[`${item.skuId}__${item.productId}`] &&
      inventory[`${item.skuId}__${item.productId}`] > 0
    ) {
      return inventory[`${item.skuId}__${item.productId}`];
    }
    return 0;
  };

  // -----------------------------------------------------------------

  return (
    <div className={productStyle.productDetailBody}>
      {pageLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          {pageError ? (
            <>
              <h1>{pageError}</h1>
            </>
          ) : (
            <></>
          )}
          {Object.keys(data).length ? (
            <div>
              <section className={productStyle.pdmainContainer}>
                <div className={productStyle.pdleftContainer}>
                  <div className={productStyle.imgContainer}>
                    <div className={productStyle.thumbnailContainer}>
                      {currentVariantData &&
                      currentVariantData.images &&
                      currentVariantData.images.length ? (
                        currentVariantData.images.map((item, index) => (
                          <img
                            loading="lazy"
                            key={item.secureUrl}
                            src={item.secureUrl}
                            alt={`${index} product image`}
                            style={{ cursor: "pointer" }}
                            onClick={() => setImgPreviewUrl(item.secureUrl)}
                          />
                        ))
                      ) : data && data.images && data.images.length ? (
                        data.images.map((item, index) => (
                          <img
                            loading="lazy"
                            key={item.secureUrl}
                            src={item.secureUrl}
                            alt={`${index} product image`}
                            style={{ cursor: "pointer" }}
                            onClick={() => setImgPreviewUrl(item.secureUrl)}
                          />
                        ))
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className={productStyle.imgPreviewContainer}>
                      <img src={imgPreviewUrl} alt={"product-Image"} />
                    </div>
                  </div>
                </div>
                <div className={productStyle.rightCont}>
                  <div className={productStyle.productDesc}>
                    <h3 className={productStyle.productName}>
                      {currentVariantData.productName}
                    </h3>
                    <p style={{ margin: "unset" }}>
                      <em>
                        <b style={{ color: "#BB2649" }}>
                          {currentVariantData.skuId}
                        </b>
                      </em>
                    </p>
                    <p className={productStyle.brandName}>
                      {currentVariantData.brandName}
                    </p>
                    <p className={productStyle.priceCont}>
                      <span className={`${productStyle.price}`}>
                        ₹{" "}
                        {(+currentVariantData.price *
                          (100 - +currentVariantData.discount)) /
                          100}
                      </span>
                      <s className={`${productStyle.discountedPrice}`}>
                        {+currentVariantData.price}
                      </s>
                    </p>
                    <p className={productStyle.discount}>
                      Save{" "}
                      <span className={productStyle.discountNo}>
                        {currentVariantData.discount}
                      </span>
                      % right now
                    </p>
                    <div className={productStyle.features}>
                      <h6>Product Description.</h6>
                      <p className={productStyle.description}>
                        {currentVariantData.productDetail}
                      </p>
                    </div>
                    <div className={productStyle.btnCont}>
                      <div>
                        <div>
                          <AddDelProduct
                            productID={productID}
                            skuId={currentVariantData.skuId}
                            isOutOfStock={getOutOfStock(currentVariantData)}
                            available={getAvailable(currentVariantData)}
                          />
                        </div>
                        <div>
                          <Link
                            to={`/shipping-info/${productID}/${currentVariantData.skuId}`}
                            className="btn btn-small btn-secondary"
                          >
                            Buy Now
                          </Link>
                        </div>
                        {!!count && (
                          <Link
                            to="/cart"
                            className={productStyle.glowButton}
                            style={{
                              display: "grid",
                              placeItems: "center",
                              textDecoration: "none",
                            }}
                          >
                            <button className="btn-success btn-small btn">
                              View Cart
                            </button>
                          </Link>
                        )}
                      </div>
                      <div>
                        {userToken && isPurchased ? (
                          <Review
                            reviewData={{
                              getReviews: getReviews,
                              productDetails: {
                                name: currentVariantData.productName,
                                id: productID,
                                variant: currentVariantData.skuId,
                              },
                            }}
                          />
                        ) : (
                          ""
                        )}
                        <div className={productStyle.likeIconPC}>
                          <Like
                            productID={productID}
                            skuId={currentVariantData.skuId}
                          />
                        </div>
                        <RWebShare
                          data={{
                            text: "Web Share - GfG",
                            url: url,
                            title: "Share Link",
                          }}
                          // onClick={() => console.log("shared successfully!")}
                        >
                          <FaShareAlt
                            className={productStyle.shareIcon}
                          ></FaShareAlt>
                        </RWebShare>
                      </div>
                    </div>
                  </div>
                  <hr></hr>
                  <div className="d-flex flex-wrap gap-3 justify-content-start align-items-center mb-2">
                    {data.hasVariant ? (
                      <>
                        {data.skus.length ? (
                          data.skus.map((item, index) => {
                            return (
                              <div
                                key={index}
                                className={`${
                                  currentVariantData.skuId === item
                                    ? productStyle.selected_variant
                                    : ""
                                }`}
                                style={{
                                  cursor: "pointer",
                                  textAlign: "center",
                                }}
                                onClick={() => handleCurrentVariant(item)}
                              >
                                {/* {console.log("product-info variants :", item)} */}
                                <img
                                  src={getVariantImage(item)}
                                  alt={"product image"}
                                  style={{
                                    objectFit: "cover",
                                    height: "80px",
                                    maxWidth: "80px",
                                    borderRadius: "5px",
                                  }}
                                />
                                <p
                                  style={{
                                    fontSize: "0.7rem",
                                    margin: 0,
                                  }}
                                  className="px-2 py-1 text-muted"
                                >
                                  {item.split("_").join(" / ")}
                                </p>
                              </div>
                            );
                          })
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </section>
              <section className={productStyle.pdmainContainerOnline}>
                <div className={productStyle.pdleftContainerOnline}>
                  <div className={productStyle.imgContainerOnline}>
                    <div className={productStyle.thumbnailContainerOnline}>
                      {currentVariantData &&
                      currentVariantData.images &&
                      currentVariantData.images.length ? (
                        <ProductCarouselMob
                          item={currentVariantData.images}
                          data={{ productID, skuId: currentVariantData.skuId }}
                        />
                      ) : data && data.images && data.images.length ? (
                        <ProductCarouselMob
                          item={data.images}
                          data={{ productID, skuId: data.skuId }}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
                <div className={productStyle.rightCont}>
                  <div className={productStyle.productDesc}>
                    <h3 className={productStyle.productName}>
                      {currentVariantData.productName}
                    </h3>
                    <p style={{ margin: "unset" }}>
                      <em>
                        <b style={{ color: "#BB2649" }}>
                          {currentVariantData.skuId}
                        </b>
                      </em>
                    </p>
                    <p className={productStyle.brandName}>
                      {currentVariantData.brandName}
                    </p>
                    <p className={productStyle.priceCont}>
                      <span className={`${productStyle.price}`}>
                        ₹{" "}
                        {(+currentVariantData.price *
                          (100 - +currentVariantData.discount)) /
                          100}
                      </span>
                      <s className={`${productStyle.discountedPrice}`}>
                        {+currentVariantData.price}
                      </s>
                    </p>
                    <p className={productStyle.discount}>
                      Save{" "}
                      <span className={productStyle.discountNo}>
                        {currentVariantData.discount}
                      </span>
                      % right now
                    </p>
                    <div className={productStyle.features}>
                      <h6>Product Description.</h6>
                      <p className={productStyle.description}>
                        {currentVariantData.productDetail}
                      </p>
                    </div>
                    <div className={productStyle.btnContMob}>
                      <div>
                        <AddDelProduct
                          productID={productID}
                          skuId={currentVariantData.skuId}
                          isOutOfStock={getOutOfStock(currentVariantData)}
                          available={getAvailable(currentVariantData)}
                        />
                        <Link
                          to={`/shipping-info/${productID}/${currentVariantData.skuId}`}
                          className="btn btn-small btn-secondary"
                        >
                          Buy Now
                        </Link>
                      </div>
                      <div>
                        {!!count && (
                          <Link to="/cart" className={productStyle.glowButton}>
                            <BsCart3 className={productStyle.cartIcon} />
                          </Link>
                        )}
                        {userToken && isPurchased ? (
                          <Review
                            reviewData={{
                              getReviews: getReviews,
                              productDetails: {
                                name: currentVariantData.productName,
                                id: productID,
                                variant: currentVariantData.skuId,
                              },
                            }}
                          />
                        ) : (
                          ""
                        )}
                        <RWebShare
                          data={{
                            text: "Web Share - GfG",
                            url: url,
                            title: "Share Link",
                          }}
                          // onClick={() => console.log("shared successfully!")}
                        >
                          <FaShareAlt
                            className={productStyle.shareIcon}
                          ></FaShareAlt>
                        </RWebShare>
                      </div>
                    </div>
                  </div>
                  <hr></hr>
                  <div className="d-flex flex-wrap gap-3 justify-content-start align-items-center mb-2">
                    {data.hasVariant ? (
                      <>
                        {data.skus.length ? (
                          data.skus.map((item, index) => {
                            return (
                              <div
                                key={index}
                                className={`${
                                  currentVariantData.skuId === item
                                    ? productStyle.selected_variant
                                    : ""
                                }`}
                                style={{
                                  cursor: "pointer",
                                  textAlign: "center",
                                }}
                                onClick={() => handleCurrentVariant(item)}
                              >
                                {/* {console.log("product-info variants :", item)} */}
                                <img
                                  src={getVariantImage(item)}
                                  alt={"product image"}
                                  style={{
                                    objectFit: "cover",
                                    height: "80px",
                                    maxWidth: "80px",
                                    borderRadius: "5px",
                                  }}
                                />
                                <p
                                  style={{
                                    fontSize: "0.7rem",
                                    margin: 0,
                                  }}
                                  className="px-2 py-1 text-muted"
                                >
                                  {item.split("_").join(" / ")}
                                </p>
                              </div>
                            );
                          })
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </section>
              {reviews.length ? (
                <section className={productStyle.secSection}>
                  <div className={productStyle.reviewCont}>
                    <p className={productStyle.reviewHead}>
                      <span>Reviews</span>
                      <span>
                        {getAvgRating(reviews).avgRating.toFixed(1)}
                        <AiTwotoneStar
                          style={{ color: "goldenrod", fontSize: "20px" }}
                        />{" "}
                        ( {getAvgRating(reviews).length} )
                      </span>
                    </p>
                    <div className={productStyle.allReviews}>
                      {reviews && reviews.length ? (
                        reviews.reverse().map((item, index) => {
                          return (
                            <div key={index} className={productStyle.review}>
                              <div className={productStyle.imgCont}>
                                <img src={Image} alt="User" />
                              </div>
                              <div className={productStyle.reviewData}>
                                <div className={productStyle.star}></div>{" "}
                                {StarRating(item.rating)}
                                <p className={productStyle.reviewText}>
                                  {item.description}
                                </p>
                                <p className={productStyle.reviewer}>
                                  {item.user.name}
                                </p>
                                <p className={productStyle.reviewDate}>
                                  {reviewDate(item.createdAt)}
                                </p>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <>No Reviews yet</>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className={productStyle.similarProducts}>k</div>
                  </div>
                </section>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default ProductInfo;
