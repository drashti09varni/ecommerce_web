import React from "react";
import Slider from 'react-animated-slider';
import horizontalCss from 'react-animated-slider/build/horizontal.css';
import imges1 from "../img/Artboard9.png"
import imges2 from "../img/Artboard9.png"


function Banner() {
  
  const content = [
    {
      title: 'UP TO 70% OFF',
      description: 'Handbags to gift,own, or simlply addmire',
      button: 'Shop Now',
      image: imges1,
    },
    {
      title: 'Title 2',
      description: 'Description 2',
      button: 'Button 2',
      image: imges2,
    },

  ];




  return <>
    <div className="container-fluid">
      <div className="container py-5  ">
        <div className="row g-4 align-items-center">

          <Slider classNames={horizontalCss}>
            {content.map((item, index) => (
              <div
                key={index}
                style={{ background: `url('${item.image}') no-repeat right mt-5` }}
                className="slider-item"
              >
                {/* <div className="center text-content" style={{ marginLeft: '120px', marginTop: '120px' }}>
                  <h1 className="text-primary title">{item.title}</h1>
                  <p className="description">{item.description}</p>
                  <button className="btn">{item.button}</button>
                </div> */}
              </div>
            ))}
          </Slider>

          {/* <div className="col-lg-6">
        <div className="py-4">
          <h1 className="display-3 text-white">Fresh Exotic Fruits</h1>
          <p className="fw-normal display-3 text-dark mb-4">in Our Store</p>
          <p className="mb-4 text-dark">
            The generated Lorem Ipsum is therefore always free from repetition
            injected humour, or non-characteristic words etc.
          </p>
          <a
            href="#"
            className="banner-btn btn border-2 border-white rounded-pill text-dark py-3 px-5"
          >
            BUY
          </a>
        </div>
      </div> */}
          {/* <div className="col-lg-6">
        <div className="position-relative px-5">
        <img
                  src="/fruitables-1.0.0/img/png-clipart-shopping-bags-trolleys-shopping-bags-trolleys-mall-promotions-accessories-shopping-centre-removebg-preview.png"
                  className="img-fluid rounded"
                  alt=""
                  style={{ width: "100%", maxWidth: "400px", height: "500px" }}
                />
          <div
            className="d-flex align-items-center justify-content-center bg-white rounded-circle position-absolute"
            style={{ width: 140, height: 140, top: 0, left: 0 }}
          >
            <h1 style={{ fontSize: 100 }}></h1>
            <div className="d-flex flex-column">
              <span className=" mb-0 text-primary fs-bold" style={{fontSize:"45px"}}>50%</span>
              <span className="h4 text-primary mb-0 text-center" style={{fontSize:"25px"}}>OFF</span>
            </div>
          </div>
        </div>
      </div> */}
        </div>
      </div>
    </div>

  </>
}
export default Banner