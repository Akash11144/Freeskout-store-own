import { useCallback, useEffect, useRef, useState } from "react";
import appStyles from "./index.module.css";
import useProductFetch from "./useProductFetch";
import ProductCard from "../../homePageComponents/card";
import { formatCurrency } from "../../../utlils/variables-and-small functions";
import Image from "../../../assets/dummyUser.png";
// //////////////////////////////////////////////////////////////////////////

function InfiniteScroll(props) {
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState([]);
  const [dataToRender, setdataToRender] = useState([]);
  const [sortSts, setSortSts] = useState("");
  const [filterSts, setFilterSts] = useState("");
  const { products, hasMore, loading, error } = useProductFetch(
    "",
    pageNumber,
    props.apis.countApi,
    props.apis.productApi + pageNumber
  );

  useEffect(() => {
    setData((prev) => {
      const newData = [...prev, ...products];
      const uniqueData = [...new Set([...newData.map((ele) => ele._id)])].map(
        (id) => newData.find((ele) => ele._id === id)
      );
      return uniqueData;
    });
    setdataToRender((prev) => {
      const newData = [...prev, ...products];
      const uniqueData = [...new Set([...newData.map((ele) => ele._id)])].map(
        (id) => newData.find((ele) => ele._id === id)
      );
      return uniqueData;
    });
  }, [products]);

  const observer = useRef();
  const lastProductObserverRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
      // console.log(node);
    },
    [hasMore, loading]
  );

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

  const handleSortChange = (event) => {
    setSortSts(event.target.value);
    renderData(data, event.target.value);
  };
  const handleFilterChange = (event) => {
    setFilterSts(event.target.value);
  };

  const renderData = (data, curr) => {
    // console.log("first data", data);
    if (curr === "popularity") {
      let newData = data.sort((a, b) => {
        return b.getPrice(b) - a.getPrice(b);
      });
      setdataToRender(newData);
    } else if (curr === "price") {
      let newData = data.sort((a, b) => {
        return getPrice(a) - getPrice(b);
      });
      setdataToRender(newData);
    } else if (curr === "rating") {
      let newData = data.sort((a, b) => {
        return b.rating - a.rating;
      });
      setdataToRender(newData);
    } else if (curr === "newest") {
      let newData = data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setdataToRender(newData);
    } else if (curr === "discount") {
      let newData = data.sort((a, b) => {
        return b.discount - a.discount;
      });
      setdataToRender(newData);
    } else if (curr === "oldest") {
      let newData = data.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
      setdataToRender(newData);
    } else {
      setdataToRender(data);
    }
  };

  // --------------------------------------------------------------------------------------------

  return (
    <div className={appStyles.app}>
      {/* {console.log(" sort ", sortSts)}
      {console.log(" filter ", filterSts)} */}

      <div className={appStyles.sortNfilter}>
        <div className={appStyles.sort}>
          <select
            className={appStyles.sortSelect}
            value={sortSts}
            onChange={handleSortChange}
          >
            <option value="" disabled selected>
              Sort
            </option>
            <option value="popularity">Popularity</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
            <option value="newest">Newest</option>
            <option value="discount">Discount</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
        {/* <div className={appStyles.filter}>
          <select
            className={appStyles.filterSelect}
            value={filterSts}
            onChange={handleFilterChange}
          >
            <option value="" disabled selected>
              Filter
            </option>
            <option value="all">All</option>
            <option value="Beauty">Beauty</option>
            <option value="Skin care">Skin care</option>
            <option value="Hair care">Hair care</option>
            <option value="fashion">fashion</option>
            <option value="Make Up">Make Up</option>
            <option value="Haircare Devices">Haircare Devices</option>
          </select>
        </div> */}
      </div>
      <div className={appStyles.titlesCont}>
        {!!dataToRender.length &&
          dataToRender.map((ele, index) => {
            if (index === dataToRender.length - 1) {
              return (
                <ProductCard
                  ref={lastProductObserverRef}
                  key={index}
                  productInfo={{
                    brandName: ele.brandName,
                    img: ele.previewImage?.secureUrl || Image,
                    desc: ele.productName,
                    rating: ele.rating.averageRating,
                    count: ele.rating.totalReviews,
                    price: formatCurrency(getPrice(ele)),
                    discount: ele.discount,
                    productID: ele ? ele._id : "",
                    skuId: ele
                      ? ele.skus.length
                        ? ele.skus[0]
                        : ele.skus
                      : "",
                    inventory: ele.inventory,
                  }}
                />
              );
            } else {
              return (
                <ProductCard
                  key={index}
                  productInfo={{
                    brandName: ele.brandName,
                    img: ele.previewImage?.secureUrl || Image,
                    desc: ele.productName,
                    rating: ele.rating.averageRating,
                    count: ele.rating.totalReviews,
                    price: formatCurrency(getPrice(ele)),
                    discount: ele.discount,
                    productID: ele ? ele._id : "",
                    skuId: ele
                      ? ele.skus.length
                        ? ele.skus[0]
                        : ele.skus
                      : "",
                    inventory: ele.inventory,
                  }}
                />
              );
            }
          })}
      </div>
      {loading && (
        <>
          <h5 className="placeholder-glow w-100">
            <span className="placeholder col-10"></span>
            <span className="placeholder col-8"></span>
            <span className="placeholder col-6"></span>
          </h5>
        </>
      )}
      {error && (
        // <h1 className={appStyles.error}>Some Error while getting data</h1>
        <></>
      )}
    </div>
  );
}

export default InfiniteScroll;
