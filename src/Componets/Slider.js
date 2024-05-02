import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Script from './Script/Script';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Slider() {
    const products = [
        {
            image: "/fruitables-1.0.0/img/imresizer-1705395700227.jpg",
            name: "Product 1",
        },
        {
            image: "/fruitables-1.0.0/img/imresizer-1705395729708.jpg",
            name: "Product 2",
        },
        // Add more products as needed
    ];

    const owlOptions = {
        loop: true,
        margin: 10,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 3,
            },
            1000: {
                items: 6,
            },
        },
        nav: true, // Display navigation arrows
        navText: [
            <span className='arrow-left'><FaChevronLeft /></span>,
            <span className='arrow-right'><FaChevronRight /></span>,
        ],
    };

    return (
        <>
            <div className="container-fluid vesitable py-3">
                <div className="container py-3">
                    <h1 className="mb-0">Fresh Organic Vegetables</h1>
                    <OwlCarousel className="owl-carousel vegetable-carousel" {...owlOptions}>
                        {products.map((product, index) => (
                            <div key={index} className="vesitable-item position-relative">
                                <div className="vesitable-img">
                                    <img
                                        src={product.image}
                                        className="img-fluid rounded-t-none"
                                        alt={product.name}
                                        style={{ width: "220px", height: "300px" }}
                                    />
                                </div>
                            </div>
                        ))}
                    </OwlCarousel>
                </div>
            </div>

            <Script />
        </>
    );
}

export default Slider;
