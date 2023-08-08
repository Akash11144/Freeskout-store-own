import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Styles from "./index.module.css";
import MainCarousel from "../../components/homePageComponents/mainCarousel";
import HomePageExclusiveDiv from "../../components/homePageComponents/homePageExclusiveDiv";
import ProductShowCase from "../../components/homePageComponents/productShowCase";
import PopularCategories from "../../components/homePageComponents/popularCategories";
import Spotlight from "../../components/homePageComponents/spotlight";
import Referals from "../../components/homePageComponents/referral";
import Brandspecific from "../../pages/brand-specific-produts";
import { setVisitCount } from "../../utlils/functions";
import AllBrands from "../../components/homePageComponents/all-brands";
import { useUserSetting } from "../../state-managers/cart-state";
import BestSellers from "../../components/homePageComponents/bestSellers";
import TertiaryCarousel from "../../components/homePageComponents/tertiaryCarousel";
import ProductsCategoriesSection from "../../components/homePageComponents/productsCategoriesSection";
import RecomendedSection from "../../components/homePageComponents/recomendedSection";
import FeaturedBrands from "../../components/homePageComponents/combos";
import Combo from "../../components/homePageComponents/combos";

// ///////////////////////////////////////////////////

const Homepage = () => {
  const loc = useLocation();
  const search = useLocation().search;
  const slug = new URLSearchParams(search).get("slug");

  let i = 0;
  useEffect(() => {
    if (!i) {
      // console.log("homepage useEffect : ");
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
      setVisitCount("/", data);
    }
    return () => {
      i = 1;
    };
  }, [loc.pathname]);

  return (
    <div className={Styles.homeMainCont}>
      {/* {console.log("homepage redering....")} */}
      <MainCarousel />
      {/* <HomePageExclusiveDiv /> */}
      <ProductShowCase />
      <AllBrands />
      {/* <Combo /> */}
      <PopularCategories />
      {/* <BestSellers /> */}
      <RecomendedSection
        myProp={{
          Heading1: "Fashion",
          Heading2: "Essentials.",
          type: "fashion",
          seeAllTo: "/categoryProducts/fashion",
          colorOne: "rgba(217, 217, 217, 0.60)",
        }}
      />
      <RecomendedSection
        myProp={{
          Heading1: "Beauty",
          Heading2: "Safe",
          seeAllTo: "/categoryProducts/Beauty",
          type: "Beauty",
          colorOne: "white",
        }}
      />
      <RecomendedSection
        myProp={{
          Heading1: "Nourish & Style",
          Heading2: "Hair",
          seeAllTo: "/categoryProducts/Hair",
          type: "Hair",
          colorOne: "rgba(217, 217, 217, 0.60)",
        }}
      />
      <RecomendedSection
        myProp={{
          Heading1: "Skin",
          Heading2: "Care",
          seeAllTo: "/categoryProducts/Skin care",
          type: "Skin care",
          colorOne: "white",
        }}
      />
      <RecomendedSection
        myProp={{
          Heading1: "Hair Care",
          Heading2: "devices",
          seeAllTo: "/categoryProducts/Haircare Devices",
          type: "Haircare Devices",
          colorOne: "rgba(217, 217, 217, 0.60)",
        }}
      />
      <RecomendedSection
        myProp={{
          Heading1: "Make",
          Heading2: "Up",
          seeAllTo: "/categoryProducts/Make Up",
          type: "Make Up",
          colorOne: "white",
        }}
      />
      <Spotlight />
      <Referals />
    </div>
  );
};

export default Homepage;
