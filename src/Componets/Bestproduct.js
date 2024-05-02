import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";

function Bestproduct() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const NextArrow = ({ onClick }) => (
    <button className="slick-arrow slick-next" onClick={onClick}>
      Next
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button className="slick-arrow slick-prev" onClick={onClick}>
      Prev
    </button>
  );

  const sliderSettings = {
    afterChange: (index) => setCurrentSlide(index),
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Default setting for desktop
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200, // Large screens (greater than or equal to 1200px)
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 992, // Medium screens (greater than or equal to 992px)
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768, // Small screens (greater than or equal to 768px)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576, // Extra small screens (less than 576px)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };
  
  const navigateShop = () => {
    let linkToOpen = '';

    // Check the current slide index and set the link accordingly
    console.log("currentSlide,", currentSlide)
    switch (currentSlide) {
      case 0:
        linkToOpen = '/shop?subcategory=Bodycon%20Dress';
        break;
      case 1:
        linkToOpen = '/shop?subcategory=Shirt';
        break;
      case 2:
        linkToOpen = '/shop?subcategory=Headphone';
        break;
      case 3:
        linkToOpen = '/shop?subcategory=Shrugs';
        break;
      case 4:
        linkToOpen = '/shop?subcategory=Sweatshirt';
        break;
      case 5:
        linkToOpen = '/shop?subcategory=Tops';
        break;
      case 6:
        linkToOpen = '/shop?category=Men&subcategory=Watch';
        break;
      case 7:
        linkToOpen = '/shop?category=Women&subcategory=Sneakers';
        break;
        case 8:
          linkToOpen = '/shop?category=Beauty&subcategory=Lipstick';
          break;
          case 9:
            linkToOpen = '/shop?category=Beauty&subcategory=Nail%20Polish';
            break;
      default:
        linkToOpen = '/shop/default-link';
        break;
    }

    navigate(linkToOpen);
  };

  const imageLinks = [
    "/shop?subcategory=Bodycon%20Dress",
    "/shop?subcategory=Shirt",
    "/shop?subcategory=Headphone",
    "/shop?subcategory=Shrugs",
    "/shop?subcategory=Sweatshirt",
    "/shop?subcategory=Tops",
    "/shop?category=Men&subcategory=Watch",
    "/shop?category=Women&subcategory=Sneakers",
    "/shop?category=Beauty&subcategory=Lipstick",
    "/shop?category=Beauty&subcategory=Nail%20Polish",
    "/shop?category=Jewellery&subcategory=Necklace",
    "/shop?category=Jewellery&subcategory=Earring"
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container-fluid py-5">
      <div className="container py-2">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: 700 }}>
          <p>
            <h3 className="text-primary display-5">Bestseller Products</h3>
          </p>
        </div>
        <Slider {...sliderSettings}>
          {[
            "/fruitables-1.0.0/img/Group 1 copy 2.png",
            "/fruitables-1.0.0/img/Group 1 copy 5.png",
           
            "/fruitables-1.0.0/img/Group 1 copy 6.png",
            "/fruitables-1.0.0/img/Group 1 copy 7.png",
            "/fruitables-1.0.0/img/Group 1 copy 8.png",
            "/fruitables-1.0.0/img/Group 1 copy 9.png",
            "/fruitables-1.0.0/img/Group 1 copy 10.png",
            "/fruitables-1.0.0/img/Group 1 copy 11.png",
            "/fruitables-1.0.0/img/Group 1 copy 12.png",
            "/fruitables-1.0.0/img/Group 1 copy 13.png",
            "/fruitables-1.0.0/img/Group 1 copy 15.png",
            "/fruitables-1.0.0/img/Group 1 copy 14.png",
          ].map((image, index) => (
            <div key={index} className="col-md-6 col-lg-6 col-xl-3 rounded position-relative">
              <div className="text-center">
                <div className="image-container">
                  
                    <img
                      src={image}
                      className="img-fluid rounded px-4"
                      alt=""
                    />
               
                  <Link to={imageLinks[index]}>
                  <div className="overlaydemo px-4 rounded">
                    <button className="shop-now-button" onClick={navigateShop}>Shop Now</button>
                  </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Bestproduct;
