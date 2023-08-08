import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { AiFillHeart } from "react-icons/ai";
import image1 from "../../../../assets/permiumProductsCarousel/1.jpg";
import image2 from "../../../../assets/permiumProductsCarousel/2.jpg";
import image3 from "../../../../assets/permiumProductsCarousel/3.jpg";
import image4 from "../../../../assets/permiumProductsCarousel/4.jpg";
import image5 from "../../../../assets/permiumProductsCarousel/5.jpg";
import image6 from "../../../../assets/permiumProductsCarousel/6.jpg";
import Styles from "./index.module.css";
const ExclusiveItemsCarousel = () => {
  return (
    <React.Fragment>
      <div className={Styles.threeCardCarousel}>
        <div
          id="carouselExampleIndicators"
          className={`carousel slide  ${Styles.ExclusiveItemsCarouselMainCont} ${Styles.ThreeCardsCarousel}`}
          data-bs-ride="true"
        >
          <div
            className={`carousel-indicators ${Styles.ExclusiveItemsCarouselIndicatorsCont}`}
          >
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className={`active ${Styles.indicatorBtns}`}
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
              className={`${Styles.indicatorBtns}`}
            ></button>
          </div>
          <div className="carousel-inner">
            <div className={`carousel-item active`}>
              <div className={`${Styles.carouselElementsHolder}`}>
                <div className={`card ${Styles.ExclusiveItemsCarouselCards}`}>
                  <div
                    className={Styles.ImageDiv}
                    style={{ background: `url(${image1})` }}
                  ></div>
                  <div
                    className={`card-body ${Styles.ExclusiveItemsCarouselCardsBody}`}
                  >
                    <h5
                      className={`card-title ${Styles.ExclusiveItemsCarouselCardsTitle}`}
                    >
                      Card title
                    </h5>
                    <p
                      className={`card-text ${Styles.ExclusiveItemsCarouselCardsText}`}
                    >
                      1 Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <div className={Styles.cardFooter}>
                      <span
                        className={`btn ${Styles.ExclusiveItemsCarouselCardsBtn}`}
                      >
                        View
                      </span>
                      <AiFillHeart
                        className={`fs-4 ${Styles.wishlistIconExc}`}
                      ></AiFillHeart>
                    </div>
                  </div>
                </div>

                <div className={`card ${Styles.ExclusiveItemsCarouselCards}`}>
                  <div
                    className={Styles.ImageDiv}
                    style={{ background: `url(${image2})` }}
                  ></div>
                  <div
                    className={`card-body ${Styles.ExclusiveItemsCarouselCardsBody}`}
                  >
                    <h5
                      className={`card-title ${Styles.ExclusiveItemsCarouselCardsTitle}`}
                    >
                      Card title
                    </h5>
                    <p
                      className={`card-text ${Styles.ExclusiveItemsCarouselCardsText}`}
                    >
                      2 Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <div className={Styles.cardFooter}>
                      <span
                        className={`btn ${Styles.ExclusiveItemsCarouselCardsBtn}`}
                      >
                        View
                      </span>
                      <AiFillHeart
                        className={`fs-4 ${Styles.wishlistIconExc}`}
                      ></AiFillHeart>
                    </div>
                  </div>
                </div>

                <div className={`card ${Styles.ExclusiveItemsCarouselCards}`}>
                  <div
                    className={Styles.ImageDiv}
                    style={{ background: `url(${image3})` }}
                  ></div>
                  <div
                    className={`card-body ${Styles.ExclusiveItemsCarouselCardsBody}`}
                  >
                    <h5
                      className={`card-title ${Styles.ExclusiveItemsCarouselCardsTitle}`}
                    >
                      Card title
                    </h5>
                    <p
                      className={`card-text ${Styles.ExclusiveItemsCarouselCardsText}`}
                    >
                      3 Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <div className={Styles.cardFooter}>
                      <span
                        className={`btn ${Styles.ExclusiveItemsCarouselCardsBtn}`}
                      >
                        View
                      </span>
                      <AiFillHeart
                        className={`fs-4 ${Styles.wishlistIconExc}`}
                      ></AiFillHeart>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`carousel-item`}>
              <div className={`${Styles.carouselElementsHolder}`}>
                <div className={`card ${Styles.ExclusiveItemsCarouselCards}`}>
                  <div
                    className={Styles.ImageDiv}
                    style={{ background: `url(${image4})` }}
                  ></div>
                  <div
                    className={`card-body ${Styles.ExclusiveItemsCarouselCardsBody}`}
                  >
                    <h5
                      className={`card-title ${Styles.ExclusiveItemsCarouselCardsTitle}`}
                    >
                      Card title
                    </h5>
                    <p
                      className={`card-text ${Styles.ExclusiveItemsCarouselCardsText}`}
                    >
                      4 Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <div className={Styles.cardFooter}>
                      <span
                        className={`btn ${Styles.ExclusiveItemsCarouselCardsBtn}`}
                      >
                        View
                      </span>
                      <AiFillHeart
                        className={`fs-4 ${Styles.wishlistIconExc}`}
                      ></AiFillHeart>
                    </div>
                  </div>
                </div>
                <div className={`card ${Styles.ExclusiveItemsCarouselCards}`}>
                  <div
                    className={Styles.ImageDiv}
                    style={{ background: `url(${image5})` }}
                  ></div>
                  <div
                    className={`card-body ${Styles.ExclusiveItemsCarouselCardsBody}`}
                  >
                    <h5
                      className={`card-title ${Styles.ExclusiveItemsCarouselCardsTitle}`}
                    >
                      Card title
                    </h5>
                    <p
                      className={`card-text ${Styles.ExclusiveItemsCarouselCardsText}`}
                    >
                      5 Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <div className={Styles.cardFooter}>
                      <span
                        className={`btn ${Styles.ExclusiveItemsCarouselCardsBtn}`}
                      >
                        View
                      </span>
                      <AiFillHeart
                        className={`fs-4 ${Styles.wishlistIconExc}`}
                      ></AiFillHeart>
                    </div>
                  </div>
                </div>
                <div className={`card ${Styles.ExclusiveItemsCarouselCards}`}>
                  <div
                    className={Styles.ImageDiv}
                    style={{ background: `url(${image6})` }}
                  ></div>
                  <div
                    className={`card-body ${Styles.ExclusiveItemsCarouselCardsBody}`}
                  >
                    <h5
                      className={`card-title ${Styles.ExclusiveItemsCarouselCardsTitle}`}
                    >
                      Card title
                    </h5>
                    <p
                      className={`card-text ${Styles.ExclusiveItemsCarouselCardsText}`}
                    >
                      6 Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <div className={Styles.cardFooter}>
                      <span
                        className={`btn ${Styles.ExclusiveItemsCarouselCardsBtn}`}
                      >
                        View
                      </span>
                      <AiFillHeart
                        className={`fs-4 ${Styles.wishlistIconExc}`}
                      ></AiFillHeart>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={Styles.twoCardCarousel}>
        <div
          id="carouselExampleIndicators2C"
          className={`carousel slide  ${Styles.ExclusiveItemsCarouselMainCont} ${Styles.ThreeCardsCarousel}`}
          data-bs-ride="true"
        >
          <div
            className={`carousel-indicators ${Styles.ExclusiveItemsCarouselIndicatorsCont}`}
          >
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators2C"
              data-bs-slide-to="0"
              className={`active ${Styles.indicatorBtns}`}
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators2C"
              data-bs-slide-to="1"
              aria-label="Slide 2"
              className={`${Styles.indicatorBtns}`}
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators2C"
              data-bs-slide-to="2"
              aria-label="Slide 3"
              className={`${Styles.indicatorBtns}`}
            ></button>
          </div>
          <div className="carousel-inner">
            <div className={`carousel-item active`}>
              <div className={`${Styles.carouselElementsHolder}`}>
                <div className={`card ${Styles.ExclusiveItemsCarouselCards}`}>
                  <div
                    className={Styles.ImageDiv}
                    style={{ background: `url(${image1})` }}
                  ></div>
                  <div
                    className={`card-body ${Styles.ExclusiveItemsCarouselCardsBody}`}
                  >
                    <h5
                      className={`card-title ${Styles.ExclusiveItemsCarouselCardsTitle}`}
                    >
                      Card title
                    </h5>
                    <p
                      className={`card-text ${Styles.ExclusiveItemsCarouselCardsText}`}
                    >
                      1 Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <div className={Styles.cardFooter}>
                      <span
                        className={`btn ${Styles.ExclusiveItemsCarouselCardsBtn}`}
                      >
                        View
                      </span>
                      <AiFillHeart
                        className={`fs-4 ${Styles.wishlistIconExc}`}
                      ></AiFillHeart>
                    </div>
                  </div>
                </div>

                <div className={`card ${Styles.ExclusiveItemsCarouselCards}`}>
                  <div
                    className={Styles.ImageDiv}
                    style={{ background: `url(${image2})` }}
                  ></div>
                  <div
                    className={`card-body ${Styles.ExclusiveItemsCarouselCardsBody}`}
                  >
                    <h5
                      className={`card-title ${Styles.ExclusiveItemsCarouselCardsTitle}`}
                    >
                      Card title
                    </h5>
                    <p
                      className={`card-text ${Styles.ExclusiveItemsCarouselCardsText}`}
                    >
                      2 Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <div className={Styles.cardFooter}>
                      <span
                        className={`btn ${Styles.ExclusiveItemsCarouselCardsBtn}`}
                      >
                        View
                      </span>
                      <AiFillHeart
                        className={`fs-4 ${Styles.wishlistIconExc}`}
                      ></AiFillHeart>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`carousel-item`}>
              <div className={`${Styles.carouselElementsHolder}`}>
                <div className={`card ${Styles.ExclusiveItemsCarouselCards}`}>
                  <div
                    className={Styles.ImageDiv}
                    style={{ background: `url(${image3})` }}
                  ></div>
                  <div
                    className={`card-body ${Styles.ExclusiveItemsCarouselCardsBody}`}
                  >
                    <h5
                      className={`card-title ${Styles.ExclusiveItemsCarouselCardsTitle}`}
                    >
                      Card title
                    </h5>
                    <p
                      className={`card-text ${Styles.ExclusiveItemsCarouselCardsText}`}
                    >
                      3 Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <div className={Styles.cardFooter}>
                      <span
                        className={`btn ${Styles.ExclusiveItemsCarouselCardsBtn}`}
                      >
                        View
                      </span>
                      <AiFillHeart
                        className={`fs-4 ${Styles.wishlistIconExc}`}
                      ></AiFillHeart>
                    </div>
                  </div>
                </div>

                <div className={`card ${Styles.ExclusiveItemsCarouselCards}`}>
                  <div
                    className={Styles.ImageDiv}
                    style={{ background: `url(${image4})` }}
                  ></div>
                  <div
                    className={`card-body ${Styles.ExclusiveItemsCarouselCardsBody}`}
                  >
                    <h5
                      className={`card-title ${Styles.ExclusiveItemsCarouselCardsTitle}`}
                    >
                      Card title
                    </h5>
                    <p
                      className={`card-text ${Styles.ExclusiveItemsCarouselCardsText}`}
                    >
                      4 Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <div className={Styles.cardFooter}>
                      <span
                        className={`btn ${Styles.ExclusiveItemsCarouselCardsBtn}`}
                      >
                        View
                      </span>
                      <AiFillHeart
                        className={`fs-4 ${Styles.wishlistIconExc}`}
                      ></AiFillHeart>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`carousel-item`}>
              <div className={`${Styles.carouselElementsHolder}`}>
                <div className={`card ${Styles.ExclusiveItemsCarouselCards}`}>
                  <div
                    className={Styles.ImageDiv}
                    style={{ background: `url(${image5})` }}
                  ></div>
                  <div
                    className={`card-body ${Styles.ExclusiveItemsCarouselCardsBody}`}
                  >
                    <h5
                      className={`card-title ${Styles.ExclusiveItemsCarouselCardsTitle}`}
                    >
                      Card title
                    </h5>
                    <p
                      className={`card-text ${Styles.ExclusiveItemsCarouselCardsText}`}
                    >
                      5 Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <div className={Styles.cardFooter}>
                      <span
                        className={`btn ${Styles.ExclusiveItemsCarouselCardsBtn}`}
                      >
                        View
                      </span>
                      <AiFillHeart
                        className={`fs-4 ${Styles.wishlistIconExc}`}
                      ></AiFillHeart>
                    </div>
                  </div>
                </div>
                <div className={`card ${Styles.ExclusiveItemsCarouselCards}`}>
                  <div
                    className={Styles.ImageDiv}
                    style={{ background: `url(${image6})` }}
                  ></div>
                  <div
                    className={`card-body ${Styles.ExclusiveItemsCarouselCardsBody}`}
                  >
                    <h5
                      className={`card-title ${Styles.ExclusiveItemsCarouselCardsTitle}`}
                    >
                      Card title
                    </h5>
                    <p
                      className={`card-text ${Styles.ExclusiveItemsCarouselCardsText}`}
                    >
                      6 Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <div className={Styles.cardFooter}>
                      <span
                        className={`btn ${Styles.ExclusiveItemsCarouselCardsBtn}`}
                      >
                        View
                      </span>
                      <AiFillHeart
                        className={`fs-4 ${Styles.wishlistIconExc}`}
                      ></AiFillHeart>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={Styles.oneCardCarousel}>
        <div
          id="carouselExampleIndicators3C"
          className={`carousel slide  ${Styles.ExclusiveItemsCarouselMainCont} ${Styles.ThreeCardsCarousel}`}
          data-bs-ride="true"
        >
          <div
            className={`carousel-indicators ${Styles.ExclusiveItemsCarouselIndicatorsCont}`}
          >
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators3C"
              data-bs-slide-to="0"
              className={`active ${Styles.indicatorBtns}`}
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators3C"
              data-bs-slide-to="1"
              aria-label="Slide 2"
              className={`${Styles.indicatorBtns}`}
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators3C"
              data-bs-slide-to="2"
              aria-label="Slide 3"
              className={`${Styles.indicatorBtns}`}
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators3C"
              data-bs-slide-to="3"
              aria-label="Slide 4"
              className={`${Styles.indicatorBtns}`}
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators3C"
              data-bs-slide-to="4"
              aria-label="Slide 5"
              className={`${Styles.indicatorBtns}`}
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators3C"
              data-bs-slide-to="5"
              aria-label="Slide 6"
              className={`${Styles.indicatorBtns}`}
            ></button>
          </div>
          <div className="carousel-inner">
            <div className={`carousel-item active`}>
              <div className={`${Styles.carouselElementsHolder}`}>
                <div className={`card ${Styles.ExclusiveItemsCarouselCards}`}>
                  <div
                    className={Styles.ImageDiv}
                    style={{ background: `url(${image1})` }}
                  ></div>
                  <div
                    className={`card-body ${Styles.ExclusiveItemsCarouselCardsBody}`}
                  >
                    <h5
                      className={`card-title ${Styles.ExclusiveItemsCarouselCardsTitle}`}
                    >
                      Card title
                    </h5>
                    <p
                      className={`card-text ${Styles.ExclusiveItemsCarouselCardsText}`}
                    >
                      1 Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <div className={Styles.cardFooter}>
                      <span
                        className={`btn ${Styles.ExclusiveItemsCarouselCardsBtn}`}
                      >
                        View
                      </span>
                      <AiFillHeart
                        className={`fs-4 ${Styles.wishlistIconExc}`}
                      ></AiFillHeart>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`carousel-item active`}>
              <div className={`${Styles.carouselElementsHolder}`}>
                <div className={`card ${Styles.ExclusiveItemsCarouselCards}`}>
                  <div
                    className={Styles.ImageDiv}
                    style={{ background: `url(${image2})` }}
                  ></div>
                  <div
                    className={`card-body ${Styles.ExclusiveItemsCarouselCardsBody}`}
                  >
                    <h5
                      className={`card-title ${Styles.ExclusiveItemsCarouselCardsTitle}`}
                    >
                      Card title
                    </h5>
                    <p
                      className={`card-text ${Styles.ExclusiveItemsCarouselCardsText}`}
                    >
                      2 Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <div className={Styles.cardFooter}>
                      <span
                        className={`btn ${Styles.ExclusiveItemsCarouselCardsBtn}`}
                      >
                        View
                      </span>
                      <AiFillHeart
                        className={`fs-4 ${Styles.wishlistIconExc}`}
                      ></AiFillHeart>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`carousel-item`}>
              <div className={`${Styles.carouselElementsHolder}`}>
                <div className={`card ${Styles.ExclusiveItemsCarouselCards}`}>
                  <div
                    className={Styles.ImageDiv}
                    style={{ background: `url(${image3})` }}
                  ></div>
                  <div
                    className={`card-body ${Styles.ExclusiveItemsCarouselCardsBody}`}
                  >
                    <h5
                      className={`card-title ${Styles.ExclusiveItemsCarouselCardsTitle}`}
                    >
                      Card title
                    </h5>
                    <p
                      className={`card-text ${Styles.ExclusiveItemsCarouselCardsText}`}
                    >
                      3 Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <div className={Styles.cardFooter}>
                      <span
                        className={`btn ${Styles.ExclusiveItemsCarouselCardsBtn}`}
                      >
                        View
                      </span>
                      <AiFillHeart
                        className={`fs-4 ${Styles.wishlistIconExc}`}
                      ></AiFillHeart>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`carousel-item`}>
              <div className={`${Styles.carouselElementsHolder}`}>
                <div className={`card ${Styles.ExclusiveItemsCarouselCards}`}>
                  <div
                    className={Styles.ImageDiv}
                    style={{ background: `url(${image4})` }}
                  ></div>
                  <div
                    className={`card-body ${Styles.ExclusiveItemsCarouselCardsBody}`}
                  >
                    <h5
                      className={`card-title ${Styles.ExclusiveItemsCarouselCardsTitle}`}
                    >
                      Card title
                    </h5>
                    <p
                      className={`card-text ${Styles.ExclusiveItemsCarouselCardsText}`}
                    >
                      4 Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <div className={Styles.cardFooter}>
                      <span
                        className={`btn ${Styles.ExclusiveItemsCarouselCardsBtn}`}
                      >
                        View
                      </span>
                      <AiFillHeart
                        className={`fs-4 ${Styles.wishlistIconExc}`}
                      ></AiFillHeart>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`carousel-item`}>
              <div className={`${Styles.carouselElementsHolder}`}>
                <div className={`card ${Styles.ExclusiveItemsCarouselCards}`}>
                  <div
                    className={Styles.ImageDiv}
                    style={{ background: `url(${image5})` }}
                  ></div>
                  <div
                    className={`card-body ${Styles.ExclusiveItemsCarouselCardsBody}`}
                  >
                    <h5
                      className={`card-title ${Styles.ExclusiveItemsCarouselCardsTitle}`}
                    >
                      Card title
                    </h5>
                    <p
                      className={`card-text ${Styles.ExclusiveItemsCarouselCardsText}`}
                    >
                      5 Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <div className={Styles.cardFooter}>
                      <span
                        className={`btn ${Styles.ExclusiveItemsCarouselCardsBtn}`}
                      >
                        View
                      </span>
                      <AiFillHeart
                        className={`fs-4 ${Styles.wishlistIconExc}`}
                      ></AiFillHeart>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`carousel-item`}>
              <div className={`${Styles.carouselElementsHolder}`}>
                <div className={`card ${Styles.ExclusiveItemsCarouselCards}`}>
                  <div
                    className={Styles.ImageDiv}
                    style={{ background: `url(${image6})` }}
                  ></div>
                  <div
                    className={`card-body ${Styles.ExclusiveItemsCarouselCardsBody}`}
                  >
                    <h5
                      className={`card-title ${Styles.ExclusiveItemsCarouselCardsTitle}`}
                    >
                      Card title
                    </h5>
                    <p
                      className={`card-text ${Styles.ExclusiveItemsCarouselCardsText}`}
                    >
                      6 Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <div className={Styles.cardFooter}>
                      <span
                        className={`btn ${Styles.ExclusiveItemsCarouselCardsBtn}`}
                      >
                        View
                      </span>
                      <AiFillHeart
                        className={`fs-4 ${Styles.wishlistIconExc}`}
                      ></AiFillHeart>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ExclusiveItemsCarousel;
