import { useEffect, useState } from "react";

export default function useProductFetch(
  query,
  pageNumber,
  countApi,
  productsApi
) {
  const [data, setData] = useState({
    products: [],
    hasMore: false,
    loading: true,
    error: false,
  });

  useEffect(() => {
    setData((prev) => {
      // console.log(query, pageNumber, countApi, productsApi);
      return { ...prev, products: [] };
    });
  }, [query]);

  useEffect(() => {
    setData((prev) => {
      return { ...prev, loading: true, error: false };
    });
    const controller = new AbortController();
    fetch(countApi, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("useProductFetch : all-product-page-count: ", data);
        fetch(productsApi, { signal: controller.signal })
          .then((res1) => res1.json())
          .then((data1) => {
            // console.log("useProductFetch : all-product: ", data1);
            setData((prev) => {
              return {
                ...prev,
                products: data1.result,
                hasMore: pageNumber < data.result.count,
                loading: false,
              };
            });
          })
          .catch((e) => {
            if (e.name === "AbortError") {
              // console.log("Fetch aborted in all-product in useProductFetch");
            } else {
              // console.log(" useProductFetch error in getting all-product: ", e);
            }
            setData((prev) => {
              return { ...prev, error: true, loading: false };
            });
          });
      })
      .catch((e) => {
        if (e.name === "AbortError") {
          // console.log(
          //   "Fetch aborted in all-product-page-count in useProductFetch"
          // );
        } else {
          // console.log("error in all-product-page-count: ", e);
        }
        setData((prev) => {
          return { ...prev, error: true, loading: false };
        });
      });
    return () => {
      controller.abort();
    };
  }, [query, pageNumber, countApi, productsApi]);

  return data;
}
