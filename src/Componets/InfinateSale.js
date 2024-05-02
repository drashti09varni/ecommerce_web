import React from "react";
import Script from "../Componets/Script/Script"
import firstImg from "../img/SALE20.png";
import secoundImg from "../img/SALE30.png";
import thirdImg from "../img/SALE50.png";
import Slider from 'react-infinite-logo-slider'
import { Link } from "react-router-dom";

function InfinateSale() {
    return (
        <>
            <div className="container-fluid py-5 slider-container">
                <div className="container position-relative scrollingoff">

                    <Slider
                        duration={20}
                        width="400px"
                        blurBorders={false}
                        blurBoderColor={'#fff'}
                        className="custom-slider"
                    >
                        <Slider.Slide>
                            <Link to="/shop?category=Beauty&subcategory=Nail%20Polish">
                            <img src={firstImg} alt="Sale 20%" className="img-fluid p-3" />
                            </Link>
                        </Slider.Slide>
                        <Slider.Slide>
                            <Link to="/shop?category=Men&subcategory=Sweater">
                            <img src={secoundImg} alt="Sale 30%" className="img-fluid p-3" />
                            </Link>
                        </Slider.Slide>
                        <Slider.Slide>
                            <Link to="/shop?category=Electronics&subcategory=Headphone">
                            <img src={thirdImg} alt="Sale 50%" className="img-fluid p-3" />
                            
                            </Link>
                        </Slider.Slide>
                    </Slider>

                </div>
            </div>

            <Script />
        </>
    );
}

export default InfinateSale;
{/* <marquee className="marq" bgcolor="Black" direction="left" loop="-1">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-md-4 col-12">
                            <img src={firstImg} alt="Sale 20%" className="img-fluid p-2" />
                            
                        </div>
                        <div className="col-md-4 col-12">
                            <img src={secoundImg} alt="Sale 30%" className="img-fluid p-2" />
                        </div>
                        <div className="col-md-4 col-12">
                            <img src={thirdImg} alt="Sale 50%" className="img-fluid p-2" />
                        </div>
                    </div>
                </marquee> */}