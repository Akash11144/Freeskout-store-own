import { useRef, useState } from "react";
import Styles from "./index.module.css";
import { useScrollLock } from "../../scrolLock";
import { AiTwotoneStar } from "react-icons/ai";
import { reviewProduct } from "../../../config/configService";
import { MdOutlineRateReview } from "react-icons/md";
const Review = (props) => {
  const getReviews = props.reviewData.getReviews;
  const [show, setShow] = useState(false);
  const { lockScroll, unlockScroll } = useScrollLock();
  const [rating, setRating] = useState(0);
  const review = useRef(null);

  const handleClick = (index) => {
    setRating(index);
  };
  const handleSaveReview = async () => {
    if (rating === 0) {
      alert("Please select a rating.");
      return;
    }
    if (review.current.value === "") {
      alert("Please enter a review.");
      return;
    }
    let reviewObj = {
      rating: rating,
      description: review.current.value,
    };
    let r = await reviewProduct(props.reviewData.productDetails.id, reviewObj);
    if (r.issue) {
      // console.log("issue in review : ", r.issue);
    } else {
      // console.log("review saved : ", r);
      getReviews();
      setShow(!show);
    }
  };
  function StarRating() {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <AiTwotoneStar
          key={i}
          className={
            i <= rating ? `${Styles.star} ${Styles.selected}` : `${Styles.star}`
          }
          onClick={() => {
            handleClick(i);
          }}
        ></AiTwotoneStar>
      );
    }

    return <div>{stars}</div>;
  }

  return (
    <>
      <MdOutlineRateReview
        onClick={() => {
          setShow(!show);
          show === true ? lockScroll() : unlockScroll();
        }}
        style={{
          cursor: "pointer",
          fontSize: "30px",
          color: "goldenrod",
          display: "grid",
          placeItems: "center",
        }}
      />
      {show && (
        <div className={`modal ${Styles.modal}`} style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Leave a review.
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShow(!show);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <p className={Styles.productDetailsPara}>
                  {/* {console.log(props.productDetails)} */}
                  Leave a product review for{" "}
                  <span style={{ color: "#AF3F56" }}>
                    {" "}
                    {props.reviewData.productDetails.name} -{" "}
                    {props.reviewData.productDetails.variant}
                  </span>{" "}
                  and help other customers make a buying decision.
                </p>
                <div className={Styles.starContainer}>
                  Select Stars {StarRating()}
                </div>
                <div className={Styles.reviewInput}>
                  <textarea
                    ref={review}
                    className={Styles.myTextarea}
                    name="myTextarea"
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShow(!show);
                  }}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    handleSaveReview();
                  }}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Review;
