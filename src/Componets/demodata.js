import React from 'react'
import logoImg from "../img/K16-1-A.webp"
import logo2 from "../img/K17-3-A_360x.webp"
import "../../src/css/card.css"

const demodata = () => {
    return (
        <div className='container'>


            <div className="row " style={{ marginTop: "10rem" }}>
                <div className="row">
                    
                    <div className="col-md-3 col-sm-6">
                        <div className="product-grid">
                            <div className="product-image">
                                <a href="#" className="image">
                                    <img className="pic-1" src={logoImg} />
                                    <img className="pic-2" src={logo2} />
                                </a>
                                <a href="#" className="product-like-icon" data-tip="Add to Wishlist">
                                    <i className="far fa-heart" />
                                </a>
                                <ul className="product-links">
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-search" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fas fa-shopping-cart" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="fa fa-random" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="product-content">
                                <h3 className="title">
                                    <a href="#">Women's Top</a>
                                </h3>
                                <div className="price">$75.99</div>
                            </div>
                        </div>
                    </div>
                    
                </div>

            </div>
        </div>

    )
}

export default demodata