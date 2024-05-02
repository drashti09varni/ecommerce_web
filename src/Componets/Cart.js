import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from '../Componets/Context/CartContext';
import { IoArrowBackCircle } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Fill } from "react-icons/ri";
import cartempty from "../img/cart.png"
import { IoBagCheckOutline } from "react-icons/io5";
import { FaShoppingBag } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { AuthContext } from '../Componets/Context/AuthContext';

function Cart() {
  const location = useLocation();

  const { productData } = location.state || {};
  const { cartItems, setCartItems, removeFromCart, clearCart, getCartTotal } = useCart();
  const [quantities, setQuantities] = useState(() => {
    const storedQuantities = localStorage.getItem('quantities');
    const parsedQuantities = storedQuantities ? JSON.parse(storedQuantities) : {};

    // Ensure that quantities are defined for all items in cartItems
    const updatedQuantities = cartItems.reduce((acc, item) => {
      acc[item._id] = parsedQuantities[item._id] || 1;
      return acc;
    }, {});

    return updatedQuantities;
  });

  useEffect(() => {
    localStorage.setItem('quantities', JSON.stringify(quantities));
  }, [quantities]);


  useEffect(() => {
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };

      // Update quantities for existing items
      cartItems.forEach((item) => {
        newQuantities[item._id] = newQuantities[item._id] || 1;
      });

      // Remove quantities for items that are no longer in the cartItems
      Object.keys(newQuantities).forEach((itemId) => {
        if (!cartItems.some((item) => item._id === itemId)) {
          delete newQuantities[itemId];
        }
      });

      return newQuantities;
    });
  }, [cartItems]);



  const calculateGST = (subtotal) => {
    const gstRate = 0.18;
    return subtotal * gstRate;
  };


  // Calculate subtotal and GST
  const subtotal = getCartTotal();
  const gstAmount = calculateGST(subtotal);

  const increaseQuantity = (itemId, selectedSize, selectedSizesArray) => {

    setQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      const key = `${itemId}_${selectedSize}_${selectedSizesArray}`;
      updatedQuantities[key] = (updatedQuantities[key] || 1) + 1;
      return updatedQuantities;
    });

    setCartItems((prevCartItems) => {
      return prevCartItems.map((item) =>
        item._id === itemId && item.selectedSize === selectedSize && item.selectedSizesArray === selectedSizesArray
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
    });
  };

  const decreaseQuantity = (itemId, selectedSize, selectedSizesArray) => {

    setQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      const key = `${itemId}_${selectedSize}_${selectedSizesArray}`;
      updatedQuantities[key] = Math.max((updatedQuantities[key] || 1) - 1, 1);
      return updatedQuantities;
    });

    setCartItems((prevCartItems) => {
      return prevCartItems.map((item) =>
        item._id === itemId && item.selectedSize === selectedSize && item.selectedSizesArray === selectedSizesArray
          ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 1) }
          : item
      );
    });
  };


  //  sub total
  const overallSum = cartItems.reduce((sum, el, i) => sum + el.price * quantities[el._id], 0);

  // final total
  const Total = overallSum + gstAmount
  const finalTotal = Total.toFixed(0)



  // navigate shop page
  const navigate = useNavigate();

  const navigateShop = () => {
    navigate("/shop")
  }

  const handelcartbackshopdetail = (productData) => {
    navigate(`/shopdetails?id=${productData._id}`, {
      state: { productData: productData },
    });
  };


  return <>
    <>

      <div className="container-fluid " style={{ paddingTop: "3rem", paddingBottom: "6rem" }}>
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
            Cart
          </li>
        </ol>
      </nav>

      <div className="px-2 mt-1">
        <div className="row">
        <div className={cartItems.length === 0 ? "col-md-12" : "col-md-8"}>
            <div className="table-responsive border" style={{ maxHeight: "500px", overflowY: "auto" }}>
              {cartItems.length > 0 ? (
                <table className="table  ">
                  <thead className="sticky-top mt-2 " style={{ backgroundColor: "rgb(239 239 239)" }}>
                    <tr className="text-center">
                      <th scope="col" >Products</th>
                      <th scope="col">Size</th>
                      <th scope="col">Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Qty</th>
                      <th scope="col">Subtotal</th>
                      <th scope="col">Remove</th>
                    </tr>
                  </thead>
                  <tbody>

                    {cartItems.map((el, i = 1) => {
                     
                      return (<>
                        <tr style={{ fontSize: "79%" }}>

                          <th scope="row" >
                            <div className="align-items-center px-1">
                              <img
                                src={`https://api.hindustanrides.in/uploads/${el.pImg?.[0]}`}
                                className="img-fluid me-5 rounded"
                                style={{ width: 80, height: 80, cursor: "pointer" }}
                                alt={el.pName}
                                onClick={() => handelcartbackshopdetail(el)}
                              />
                            </div>
                          </th>

                          <td>


                            {el.selectedSizesArray && Array.isArray(el.selectedSizesArray) && el.selectedSizesArray.length > 0 && el.selectedSizesArray[0] && el.selectedSizesArray[0].length > 0 ? (
                              <p className="mb-0 mt-4 border text-center" style={{ fontWeight: "bold" }}>{el.selectedSizesArray}</p>
                            ) : el.selectedSize && el.selectedSize.length > 0 ? (
                              <p className="mb-0 mt-4 border" >{el.selectedSize}</p>
                            ) : (
                              <h3 className="mb-0 mt-4 border text-center">-</h3>
                            )}


                          </td>
                          <td className="" >
                            <p className="mb-0 mt-4 ml-5">{el.pName}</p>


                          </td>

                          <td>
                            <p className="mb-0 mt-4" style={{ fontWeight: "bold" }}>Rs. {el.price}</p>
                          </td>

                          <td>
                            <div className="input-group quantity mt-4" style={{ width: 100 }}>
                              <div className="">
                                <button className="border" style={{ backgroundColor: "#9c4399", color: "white" }}
                                >
                                  <i className="fa fa-minus" onClick={() => decreaseQuantity(el._id, el.selectedSize, el.selectedSizesArray)} />
                                </button>
                              </div>
                              <input
                                type="text"
                                className="form-control form-control-sm text-center border-0 " style={{ fontWeight: "bold" }}
                                value={el.quantity}
                              />
                              <div className="">
                                <button className="border " style={{ backgroundColor: "#9c4399", color: "white" }}
                                  onClick={() => increaseQuantity(el._id, el.selectedSize, el.selectedSizesArray)}
                                >
                                  <i className="fa fa-plus" />
                                </button>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="mb-0 mt-4" style={{ fontWeight: "bold" }}>Rs. {el.price * el.quantity}</p>
                          </td>

                          <td>
                            {/* <button
                          className="border mt-4"
                         
                        > */}
                            {/* </button> */}
                            <p className=" mt-4">
                              <RiDeleteBin6Fill className="" style={{ fontSize: "140%", color: "rgb(156, 67, 153)", cursor: "pointer" }} onClick={() => removeFromCart(el, el.selectedSize, el.selectedSizesArray
                              )} />
                            </p>
                          </td>
                        </tr>
                      </>)
                    })}
                  </tbody>
                </table>
              ) : (
                <div className="">
                  <div>
                    <img src={cartempty} alt="Cart is empty" className="" />
                  </div>
                </div>
              )}
            </div>
          </div>
          {cartItems.length == 0 ? (null) : (
            <>
              <div className="col-md-4">
                <div className="container">
                  <div className="row justify-content-between">
                    <div className="">
                      <div className="bg-light rounded p-3">
                        <table className="table table-bordered table-sm mb-0">
                          <thead>
                            <tr>
                              <th colSpan="2" className="text-center">
                                <h4 className="display-2 alltextcolor" style={{ fontSize: '1.5rem' }}>
                                  Cart <span className="fw-normal">Total</span>
                                </h4>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="fw-bold">
                            <tr >
                              <td>Subtotal : &nbsp;({cartItems.length} Items)</td>
                              <td className="text-end">Rs.{overallSum}</td>
                            </tr>
                            <tr>
                              <td>Tax (GST 18%):</td>
                              <td className="text-end">Rs.{gstAmount.toFixed(0)}</td>
                            </tr>
                            <tr>
                              <td>Total:</td>
                              <td className="text-end text-end fw-bold fs-4 alltextcolor bg-dark-subtle">Rs. {finalTotal}</td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="py-2 px-3 mb-4 border-bottom border-start border-end d-flex justify-content-center align-items-center">
                          <Link to="/checkout">
                            <button
                              className="border demo px-3 py-1 text-uppercase ms-4 text-light"
                              type="button"
                              style={{ backgroundColor: "rgb(156, 67, 153)", fontWeight: "bold", borderRadius: "20px" }}
                            >
                              Proceed to Checkout  
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </>
          )}
        </div>
      </div>
    </div>

  </>
}
export default Cart