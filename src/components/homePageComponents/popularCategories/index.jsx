import React, { useEffect, useState } from "react";
import PopularCategoryCard from "./card";
import Styles from "./index.module.css";
import { AiOutlineArrowRight } from "react-icons/ai";
import img1 from "../../../assets/categoriesCardImg/1.jpg";
import img2 from "../../../assets/categoriesCardImg/2.jpg";
import img3 from "../../../assets/categoriesCardImg/3.jpg";
import {
  getAllCategories,
  getAllProducts,
} from "../../../config/configService";
const PopularCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();
      if (res) {
        console.log("handling data for categories", res.categories);
        setCategories(res.categories);
      }
    } catch (error) {
      console.log("error in fetching categories", error);
    }
  };
  return (
    <React.Fragment>
      {" "}
      <div className={Styles.popularCategoriesCont}>
        <div className={Styles.popularCategoriesHeadingCont}>
          <h3>
            Popular
            <span style={{ color: "rgba(0, 5, 54, 0.49)" }}>
              {" "}
              Categories.{" "}
            </span>{" "}
          </h3>
          {/* <div className={Styles.popularCategoriesMainBtn}>
            <span>SEE ALL</span>
            <span>
              <AiOutlineArrowRight />
            </span>
          </div> */}
        </div>
        <div className={Styles.productCardCont}>
          {categories && categories.length ? (
            categories.map((item, index) => (
              <div key={index}>
                <PopularCategoryCard
                  imgSrc={item.image.secureUrl}
                  imgAlt={item.title}
                  category={item.title}
                />
              </div>
            ))
          ) : (
            <>No Cat Found</>
          )}
          {categories && categories.length ? (
            categories.map((item, index) => (
              <div key={index}>
                <PopularCategoryCard
                  imgSrc={item.image.secureUrl}
                  imgAlt={item.title}
                  category={item.title}
                />
              </div>
            ))
          ) : (
            <>No Cat Found</>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default PopularCategories;
