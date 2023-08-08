import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getSearchedProductsApi } from "../../../../config/configService";
import Styles from "./index.module.css";
import ProductCard from "../../card";
import { formatCurrency } from "../../../../utlils/variables-and-small functions";
import InfiniteScroll from "../../../commonComponents/infinteScrollableProducts";
import { productUrl } from "../../../../services/APIService";
const CategoryProducts = () => {
  const { categoryId } = useParams();
  useEffect(() => {
    // fetchProducts();
  }, []);

  return (
    <>
      {/* <div>
        <p> {categoryId} Products</p>
      </div> */}
      <InfiniteScroll
        apis={{
          productApi: `${productUrl}/allProducts?category=${categoryId}&page=`,
          countApi: `${productUrl}/allProductsPageCount?category=${categoryId}`,
        }}
      />
    </>
  );
};

export default CategoryProducts;
