import { useEffect, useRef, useState } from "react";
import Styles from "./index.module.css";
import {
  useLoginState,
  useSignUpState,
} from "../../../state-managers/cart-state";
import { useScrollLock } from "../../scrolLock";
import { Link } from "react-router-dom";
import useSearchProduct from "./useSearchProduct";
import Image from "../../../assets/dummyUser.png";

///////////////////////////////////////////////////

const MobileSearchBox = () => {
  const [searchData, setSearchData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const setLoginPopUp = useLoginState((state) => state.setLoginPopup);
  const setSignUpPopUp = useSignUpState((state) => state.setSignupPopup);

  const { lockScroll, unlockScroll } = useScrollLock();
  const { searchResult, searchLoading, searchError } =
    useSearchProduct(searchQuery);

  const timerRef = useRef(null);

  // ----------------------------------------------
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(
      () =>
        searchText.length > 1 ? setSearchQuery(searchText) : setSearchData([]),
      300
    );

    return () => clearTimeout(timerRef.current);
  }, [searchText]);

  useEffect(() => {
    setSearchData(searchResult);
  }, [searchResult]);

  const handleLinkClick = () => {
    setSearchData([]);
    setSearchText("");
  };

  const handleChange = (e) => {
    setSearchText(e.target.value);
    setLoginPopUp(false);
    setSignUpPopUp(false);
    unlockScroll();
  };

  return (
    <>
      <div className="d-flex form-inputs w-100">
        <input
          className="form-control"
          type="text"
          placeholder="Search any product..."
          onChange={handleChange}
          value={searchText}
          onBlur={() => {
            setSearchText("");
          }}
        />
        <i className="bx bx-search"></i>
      </div>
      {searchLoading ? (
        <p className="text-center text-bg-primary m-0 mt-1 rounded-2">
          {"Searching..."}
        </p>
      ) : (
        <>
          {searchError && (
            <p className="text-center text-bg-danger m-0 mt-1 rounded-2">
              {"Something went wrong..."}
            </p>
          )}
        </>
      )}
      {!!searchData.length && (
        <div
          style={{
            maxHeight: "50vh",
            overflowY: "scroll",
            maxWidth: "90%",
            zIndex: 999,
          }}
          className="position-absolute mt-2 mb-1 shadow border-2 bg-white rounded d-grid center"
        >
          {searchData.map(({ _id, productName, sku, previewImage }, index) => (
            <Link
              to={`/product-info/${_id}`}
              key={
                `${_id}${sku}${index}`.length > 0
                  ? `${_id}${sku}${index}`
                  : index
              }
              className={`${Styles.searchItem}`}
              onClick={handleLinkClick}
            >
              <img
                height={"40px"}
                width={"40px"}
                style={{ objectFit: "contain", paddingRight: "5px" }}
                src={previewImage?.secureUrl || Image}
                alt={productName}
              />
              {productName}
              {sku && <p className="m-0 ps-1 text-light-emphasis">{sku}</p>}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default MobileSearchBox;
