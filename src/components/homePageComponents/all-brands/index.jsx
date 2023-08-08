import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { getAllBrands } from "../../../config/configService";
import MyToast from "../../toast";
import altImgUrl from "../../../assets/noBrandIMg.png";
import Styles from "./index.module.css";

export default function AllBrands() {
  const [brandsData, setBrandsData] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const [pageError, setPageError] = useState(false);

  const navi = useNavigate();

  const getImage = (brand) => {
    if (brand.brandLogo && brand.brandLogo.secureUrl)
      return brand.brandLogo.secureUrl;
    else return "";
  };

  const fetchBrands = async () => {
    try {
      setPageLoading(true);
      let resData = await getAllBrands();
      // console.log("homepage fetch-brands response : ", resData);
      if (!resData || !resData.result || resData.issue) {
        // toast.default("Coming soon!");
        setPageError("Coming soon!!");
        setPageLoading(false);
        return;
      }

      setBrandsData(resData.result);
    } catch (error) {
      // console.log("error in catch in fetching brands : ", error);
      toast.default("Coming soon!");
      setPageError("Coming soon!!");
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <div className={`${Styles.mainCont}`}>
      <h1>
        Explore <span style={{ color: "#0005367d" }}>Brands.</span>
      </h1>
      <div className={`${Styles.secCont}`}>
        {pageLoading ? (
          <>
            <h5 className="placeholder-glow w-100">
              <span className="placeholder col-10"></span>
              <span className="placeholder col-8"></span>
              <span className="placeholder col-6"></span>
            </h5>
          </>
        ) : (
          <>
            {brandsData.length ? (
              brandsData.map((item, index) => {
                let imageUrl = getImage(item);
                if (imageUrl) {
                  return (
                    <div
                      onClick={() => navi(`/brandProducts/${item.id}`)}
                      key={index}
                      className={Styles.brandImgCont}
                    >
                      <img
                        src={imageUrl ? imageUrl : altImgUrl}
                        alt={item.brandName}
                        className={Styles.brandImg}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div
                      onClick={() => navi(`/brandProducts/${item.id}`)}
                      key={index}
                      className={Styles.brandImgCont}
                    >
                      <img
                        src={altImgUrl}
                        alt={item.brandName}
                        className={Styles.brandImg}
                      />
                    </div>
                  );
                }
              })
            ) : (
              <></>
            )}
            <p className={Styles.moreTextCont}>250+</p>
          </>
        )}
      </div>
    </div>
  );
}
