import { useEffect, useState } from "react";
import { getSearchedProductsApi } from "../../../config/configService";

export default function useSearchProduct(searchQuery) {
  const [state, setState] = useState({
    searchResult: [],
    searchLoading: false,
    searchError: false,
  });

  useEffect(() => {
    // console.log("inside useSearchProduct", searchQuery);
    const controller = new AbortController();
    if (!searchQuery) {
      setState((prev) => {
        return {
          ...prev,
          searchResult: [],
          searchError: false,
          searchLoading: false,
        };
      });
    } else {
      setState((prev) => {
        return {
          ...prev,
          searchLoading: true,
          searchError: false,
        };
      });
      const { signal } = controller;
      getSearchedProductsApi(searchQuery, signal)
        .then((res) => {
          // console.log("res data from get-searched-product", searchQuery, res);
          if (res.result && res.result.length) {
            const newData = res.result.flatMap(
              ({ _id, productName, skus, previewImage }) => {
                if (skus.length) {
                  return skus.map((sku) => {
                    return {
                      _id: _id,
                      productName: productName,
                      sku,
                      previewImage,
                    };
                  });
                } else {
                  return {
                    _id: _id,
                    productName: productName,
                    sku: "",
                    previewImage,
                  };
                }
              }
            );
            // console.log("new-data", newData);
            setState((prev) => {
              return {
                ...prev,
                searchResult: newData,
                searchError: false,
                searchLoading: false,
              };
            });
          } else {
            setState((prev) => {
              return {
                ...prev,
                searchResult: [],
                searchError: false,
                searchLoading: false,
              };
            });
          }
        })
        .catch((e) => {
          // console.log("useSearchProduct error : ", e);
          if (e.name === "AbortError") {
            // console.log("Fetch request was aborted");
          } else {
            setState((prev) => {
              return {
                ...prev,
                searchError: true,
                searchLoading: false,
              };
            });
          }
        });
    }

    return () => {
      // console.log("unmouting useSearchProduct");
      controller.abort();
    };
  }, [searchQuery]);

  return state;
}
