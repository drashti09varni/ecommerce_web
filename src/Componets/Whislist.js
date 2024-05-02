import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useWishlist } from '../Componets/Context/WhishlistContext';
import { FaArrowLeft } from "react-icons/fa";
import wishlistImg from "../img/wishlist.png"


const Whislist = () => {

  const { addToWishlist, whishlistItem, removeFromWishlist } = useWishlist();
  const location = useLocation();
  const { productData } = location.state || {};
  console.log(whishlistItem)

  // navigate shop page
  const navigate = useNavigate();

  const navigateShop = () => {
    navigate("/shop")

  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const handelcartbackshopdetail = (productData) => {
    console.log();
    navigate(`/shopdetails?id=${productData._id}`, {
      state: { productData: productData },
    });
  };

  return <>
    <>
      <div className="container-fluid " style={{ paddingTop: "3rem", paddingBottom: "6rem" }}>
        {/* <h1 className="text-center text-white display-6">Cart</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Pages</a>
          </li>
          <li className="breadcrumb-item active text-white">Whislist</li>
        </ol> */}
      </div>
    </>
    <div className="px-3 py-1">
      <button className="btn btn " style={{ backgroundColor: "#9c4399", color: "white" }} onClick={navigateShop}>
        <FaArrowLeft className="back-icon fw-bold" />
      </button>
    </div>
    <div className="container-fluid mt-3">
      <nav aria-label="breadcrumb" className="px-2" style={{ backgroundColor: "rgb(251 242 242)" }}>
        <ol className="breadcrumb">
          <li className="breadcrumb-item fw-bold mt-1 mb-1">
            <Link to="/" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>Home</Link>
          </li>
          <li className="breadcrumb-item fw-bold alltextcolor mt-1 mb-1" style={{ cursor: "pointer", textDecoration: 'underline' }}>
            Wishlist
          </li>
        </ol>
      </nav>

      {/* <div className="container">
        <button className="btn btn " style={{ backgroundColor: "#9c4399", color: "white" }} onClick={navigateShop}>
          <FaArrowLeft className="back-icon fw-bold" />
        </button>
      </div> */}
      <div className="container py-5">
        <div className="table-responsive" style={{ overflowX: "hidden" }}>
          <div className="row" >
            {whishlistItem.length > 0 ? (
              <table className="table">
                <thead>
                  <tr className="text-center">
                    <th scope="col">No.</th>
                    <th scope="col">Products</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    {/* <th scope="col">Quantity</th>
                  <th scope="col">Total</th> */}
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>

                  {whishlistItem.map((el, i = 1) => {
                    return (<>
                      <tr>
                        <td>
                          <p className="mb-0 mt-4">{i + 1}</p>
                        </td>
                        <th scope="row">
                          <div className="d-flex align-items-center">
                            <img
                              src={`https://api.hindustanrides.in/uploads/${el.pImg[0]}`}
                              className="img-fluid me-5 rounded"
                              style={{ width: 80, height: 80, cursor: "pointer" }}
                              alt={el.pName}
                              onClick={() => handelcartbackshopdetail(el)}
                            />
                          </div>
                        </th>
                        <td>
                          <p className="mb-0 mt-4">{el.pName}</p>
                        </td>
                        <td>
                          <p className="mb-0 mt-4">{el.price}</p>
                        </td>
                        <td>
                          <button
                            className="btn btn-md rounded-circle bg-light border mt-4"
                            onClick={() => removeFromWishlist(el)}
                          >
                            <i className="fa fa-times text-danger" />
                          </button>
                        </td>
                      </tr>
                    </>)
                  })}
                </tbody>
              </table>
            ) : (
              <img src={wishlistImg} alt="Cart is empty" className="img-fuild" />
            )}
          </div>
        </div>
        {/* <div className="mt-5">
          <input
            type="text"
            className="border-0 border-bottom rounded me-5 py-3 mb-4"
            placeholder="Coupon Code"
          />
          <button
            className="btn border-secondary rounded-pill px-4 py-3 text-primary"
            type="button"
          >
            Apply Coupon
          </button>
        </div>
        <div className="row g-4 justify-content-end">
          <div className="col-8" />
          <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
            <div className="bg-light rounded">
              <div className="p-4">
                <h1 className="display-6 mb-4">
                  Cart <span className="fw-normal">Total</span>
                </h1>
                <div className="d-flex justify-content-between mb-4">
                  <h5 className="mb-0 me-4">Subtotal:</h5>
                  <p className="mb-0 fw-bold  fs-4 text-dark">Rs.{overallSum}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <h5 className="mb-0 me-4">Shipping</h5>
                  <div className="">
                    <p className="mb-0">Flat rate: $3.00 (baki)</p>
                  </div>
                </div>
                <p className="mb-0 text-end">Shipping to Ukraine.</p>
              </div>
              <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                <h5 className="mb-0 ps-4 me-4">Total</h5>
                <p className="mb-0 pe-4">Rs.{overallSum}</p>
              </div>
              <Link to="/checkout">
                <button
                  className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4"
                  type="button"
                >
                  Proceed Checkout
                </button>
              </Link>
            </div>
          </div>
        </div> */}
      </div>
    </div>

  </>

}

export default Whislist