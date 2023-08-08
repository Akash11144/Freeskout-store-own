import CarImgOne from "../../../assets/CarouselIMg/1.jpg";
import CarImgTwo from "../../../assets/CarouselIMg/2.jpg";
import CarImgThree from "../../../assets/CarouselIMg/3.jpg";
import CarImgFour from "../../../assets/CarouselIMg/4.jpg";
import CarImgFive from "../../../assets/CarouselIMg/5.jpg";

import Styles from "./index.module.css";
const MainCarousel = () => {
  return (
    <>
      <div
        id="carouselExampleDark"
        className="carousel carousel-dark slide"
        data-bs-ride="carousel"
      >
        <div className={`carousel-indicators ${Styles.carIndi}`}>
          <button
            style={{
              width: "15px",
              height: "15px",
              borderRadius: "50%",
              margin: "0 10px",
            }}
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            style={{
              width: "15px",
              height: "15px",
              borderRadius: "50%",
              margin: "0 10px",
            }}
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            style={{
              width: "15px",
              height: "15px",
              borderRadius: "50%",
              margin: "0 10px",
            }}
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
          <button
            style={{
              width: "15px",
              height: "15px",
              borderRadius: "50%",
              margin: "0 10px",
            }}
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>
          <button
            style={{
              width: "15px",
              height: "15px",
              borderRadius: "50%",
              margin: "0 10px",
            }}
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="4"
            aria-label="Slide 5"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="2000">
            <div className={Styles.carouselImgDiv}>
              <img src={CarImgOne} className={Styles.CarouselImages} />
            </div>
            <div className={`carousel-caption d-none d-md-block`}>
              <h5 className={`${Styles.CarImgLabel}`}>First slide label</h5>
              <p className={`${Styles.CarImgDesc}`}>
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <div className={Styles.carouselImgDiv}>
              <img src={CarImgTwo} className={Styles.CarouselImages} />
            </div>
            <div className="carousel-caption d-none d-md-block">
              <h5 className={`${Styles.CarImgLabel}`}>Second slide label</h5>
              <p className={`${Styles.CarImgDesc}`}>
                Some representative placeholder content for the second slide.
              </p>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <div className={Styles.carouselImgDiv}>
              <img src={CarImgThree} className={Styles.CarouselImages} />
            </div>
            <div className="carousel-caption d-none d-md-block">
              <h5 className={`${Styles.CarImgLabel}`}>Third slide label</h5>
              <p className={`${Styles.CarImgDesc}`}>
                Some representative placeholder content for the third slide.
              </p>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <div className={Styles.carouselImgDiv}>
              <img src={CarImgFour} className={Styles.CarouselImages} />
            </div>
            <div className="carousel-caption d-none d-md-block">
              <h5 className={`${Styles.CarImgLabel}`}>Fourthslide label</h5>
              <p className={`${Styles.CarImgDesc}`}>
                Some representative placeholder content for the fourth slide.
              </p>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <div className={Styles.carouselImgDiv}>
              <img src={CarImgFive} className={Styles.CarouselImages} />
            </div>
            <div className="carousel-caption d-none d-md-block">
              <h5 className={`${Styles.CarImgLabel}`}>Fifthslide label</h5>
              <p className={`${Styles.CarImgDesc}`}>
                Some representative placeholder content for the fifth slide.
              </p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default MainCarousel;
