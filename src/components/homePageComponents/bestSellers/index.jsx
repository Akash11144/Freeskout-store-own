import Styles from "./index.module.css";
import { AiOutlineArrowRight } from "react-icons/ai";
import Img1 from "../../../assets/bestSellers/1.jpg";
import Img2 from "../../../assets/bestSellers/2.jpg";
import Img3 from "../../../assets/bestSellers/3.jpg";
import Img4 from "../../../assets/bestSellers/4.jpg";
import Img5 from "../../../assets/bestSellers/5.jpg";
import Img6 from "../../../assets/bestSellers/6.jpg";
import Img7 from "../../../assets/bestSellers/7.jpg";
import BestSellerCard from "../card";
import { formatCurrency } from "../../../utlils/variables-and-small functions";
const BestSellers = () => {
  return (
    <div className={Styles.mainCont}>
      <div className={Styles.HeadingCont}>
        <h1>
          Our <span style={{ color: "#0005367d" }}>Bestsellers.</span>
        </h1>
        <p>
          Check All Items
          <AiOutlineArrowRight className={Styles.ArrowRight} />
        </p>
      </div>
      <div className={Styles.cardsCont}>
        <BestSellerCard
          productInfo={{
            brandName: "Nutrogena",
            img: Img1,
            desc: "Get 300 off on any product with cart value above 1499",
            rating: 2,
            count: 342,
            price: formatCurrency(400),
            discount: 20,
          }}
        />
        <BestSellerCard
          productInfo={{
            brandName: "dior",
            img: Img2,
            desc: "Hydrating foundation with serum goodness",
            rating: 4,
            count: 350,
            price: formatCurrency(320),
            discount: 10,
          }}
        />
        <BestSellerCard
          productInfo={{
            brandName: "Bobbi brown",
            img: Img3,
            desc: "Hydrating foundation with serum goodness",
            rating: 4,
            count: 350,
            price: formatCurrency(320),
            discount: 10,
          }}
        />
        <BestSellerCard
          productInfo={{
            brandName: "Bobbi brown",
            img: Img7,
            desc: "Hydrating foundation with serum goodness",
            rating: 4,
            count: 350,
            price: formatCurrency(320),
            discount: 10,
          }}
        />{" "}
        <BestSellerCard
          productInfo={{
            brandName: "Bobbi brown",
            img: Img5,
            desc: "Hydrating foundation with serum goodness",
            rating: 4,
            count: 350,
            price: formatCurrency(320),
            discount: 10,
          }}
        />{" "}
        <BestSellerCard
          productInfo={{
            brandName: "Bobbi brown",
            img: Img6,
            desc: "Hydrating foundation with serum goodness",
            rating: 4,
            count: 350,
            price: formatCurrency(320),
            discount: 10,
          }}
        />{" "}
        <BestSellerCard
          productInfo={{
            brandName: "Bobbi brown",
            img: Img7,
            desc: "Hydrating foundation with serum goodness",
            rating: 1,
            count: 350,
            price: formatCurrency(320),
            discount: 10,
          }}
        />{" "}
        <BestSellerCard
          productInfo={{
            brandName: "Bobbi brown",
            img: Img3,
            desc: "Hydrating foundation with serum goodness",
            rating: 5,
            count: 350,
            price: formatCurrency(320),
            discount: 10,
          }}
        />
      </div>
    </div>
  );
};

export default BestSellers;
