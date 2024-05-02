import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

import Script from "../Componets/Script/Script";
import sliderfirstImg from "../img/shoesbanner.png";
import slidersecoundImg from "../img/buetybanner.png";
import sliderThirdImg from "../img/watchbanner.png";
import sliderFourthImg from "../img/jewellery.png";

import Shoesimgphone from "../img/Shoes_.png";
import Beutyphone from "../img/Beauty1_upscayl_4x_realesrgan-x4plus.png";
import jellweryyPhone from "../img/jewellery_upscayl_4x_realesrgan-x4plus.png";

function Services() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    afterChange: (index) => setCurrentSlide(index), // Update current slide index
  };

  const content = [
    {
      title: 'UP TO 70% OFF',
      description: 'Sneakers',
      button: 'Shop Shoes',
      image: sliderfirstImg,
      id: 1,
    },
    {
      title: 'Title 2',
      description: 'Foundation',
      button: 'Shop Makeup',
      image: slidersecoundImg,
      id: 2,
    },
    {
      title: 'Title 2',
      description: 'Watch',
      button: 'Shop Watch',
      image: sliderThirdImg,
      id: 3,
    },
    {
      title: 'Title 2',
      description: 'Watch',
      button: 'Shop Watch',
      image: sliderFourthImg,
      id: 4,
    },
  ];

  const contentt = [
    {
      title: 'UP TO 70% OFF',
      description: 'Sneakers',
      button: 'Shop Shoes',
      image: Shoesimgphone,
      id: 1,
    },
    {
      title: 'UP TO 70% OFF',
      description: 'Sneakers',
      button: 'Shop Shoes',
      image: Beutyphone,
      id: 2,
    },
    {
      title: 'UP TO 70% OFF',
      description: 'Sneakers',
      button: 'Shop Shoes',
      image: jellweryyPhone,
      id: 3,
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* First slider (content) for screens 576 pixels and above */}
      <div
        className="container-fluid py-5 slider-container d-none d-sm-block"
        id="serviceslider"
      >
        <div className="container position-relative">
          <Slider {...settings}>
            {content.map((item, index) => (
              <Link
                key={index}
                to={`/shop`}
                className="position-relative"
              >
                <img
                  src={item.image}
                  className="img-fluid w-100 h-100"
                  alt={`slide-${index}`}
                />
              </Link>
            ))}
          </Slider>
        </div>
      </div>

      {/* Second slider (contentt) for screens smaller than 576 pixels */}
      <div
        className="container-fluid py-5 slider-container d-block d-sm-none"
        id="serviceslider"
      >
        <div className="container position-relative">
          <Slider {...settings}>
            {contentt.map((item, index) => (
              <Link
                key={index}
                to={`/shop`}
                className="position-relative"
              >
                <img
                  src={item.image}
                  className="img-fluid w-100 h-100"
                  alt={`slide-${index}`}
                />
              </Link>
            ))}
          </Slider>
        </div>
      </div>

      <Script />
    </>
  );
}

export default Services;
