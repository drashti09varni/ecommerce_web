

import React from "react";
import Script from '../Componets/Script/Script'
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import { useCart } from '../Componets/Context/CartContext';
import SabpaisaPaymentGateway from "./SabpaisaPaymentGateway";
import toast from 'react-hot-toast';
import Result from "./Result";
import Stepper from 'react-stepper-horizontal';
import Otp from '../Componets/OtpForm';
import PaymentResult from "./PaymentResult";
import { Modal, Button, Form } from 'react-bootstrap';



const intialForm = {
    Name: '',
    flatno: '',
    streetAddress: '',
    landmark: '',
    country: '',
    state: '',
    city: '',
    phoneNo: '',
    email: localStorage.getItem('email') || "",
    productData: []
}


function Checkout() {
    const location = useLocation();
    const [country, setCountry] = useState('India');
    const [isFormVisible, setFormVisibility] = useState(false);
    const [errors, setErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [showThankYouMessage, setShowThankYouMessage] = useState(false);

    const [formData, setFormData] = useState(intialForm);
    const navigate = useState()
    const [complete, setComplete] = useState(false);
    const { cartItems, setCartItems, removeFromCart, clearCart, getCartTotal } = useCart();
    console.log('cartItems =>', cartItems);

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

    const steps = [
        { title: 'Shipping Address' },
        { title: 'Conformation your Email' },
        { title: 'Order Information' },
        { title: 'Payment' },

    ];

    //payment state
    const [isOpen, setIsOpen] = useState(false);

    const [clientCode, setClientCode] = useState("RAVI76");
    const [transUserName, setTransUserName] = useState("ravi.onepluse_15268");
    const [transUserPassword, setTransUserPassword] = useState("RAVI76_SP15268");
    const [authkey, setAuthkey] = useState("b6wcogQ8RX2V3rxR");
    const [authiv, setAuthiv] = useState("rT5lcnOUCMPxAzZG");
    const [loading, setLoading] = useState(false);
    const [callbackUrl, setCallbackUrl] = useState("http://localhost:3000/response");

    const [currentStepIndex, setCurrentStepIndex] = useState(() => {
        const storedStepIndex = localStorage.getItem('currentStepIndex');
        return storedStepIndex ? parseInt(storedStepIndex, 10) : 1; // Set to 1 if not found in localStorage
    });

    const nextStep = () => {
        const newStepIndex = Math.min(currentStepIndex + 1, steps.length);
        localStorage.setItem('currentStepIndex', newStepIndex);
        setCurrentStepIndex(newStepIndex);
    };

    const handleStepClick = (stepIndex) => {
        setCurrentStepIndex(stepIndex);
        localStorage.setItem('currentStepIndex', stepIndex);
    };

    const overallSum = cartItems.reduce((sum, el, i) => sum + el.price * quantities[el._id], 0);

    // Calculate GST (18%)

    const calculateGST = (subtotal) => {
        const gstRate = 0.18;
        return subtotal * gstRate;
    };

    // Calculate subtotal and GST
    const subtotal = getCartTotal();
    const gstAmount = calculateGST(subtotal);

    // final total
    const Total = overallSum + gstAmount
    const finalTotal = Total.toFixed(0)


    const validateForm = () => {
        const errors = {};

        if (!formData.Name.trim()) {
            errors.Name = 'Name is required';
        }

        if (!formData.flatno.trim()) {
            errors.flatno = 'Flat/Building No. is required';
        }

        // if (!streetAddress.trim()) {
        //     errors.streetAddress = 'Street Address is required';
        // }

        // if (!landmark.trim()) {
        //     errors.landmark = 'Landmark is required';
        // }

        if (!formData.phoneNo.trim()) {
            errors.phoneNo = 'Phone No. is required';
        } else if (formData.phoneNo.trim().length > 10) {
            errors.phoneNo = 'Phone No. must be 10 digits or less';
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        }

        if (!selectedState) {
            errors.selectedState = 'State is required';
        }

        if (!selectedCity) {
            errors.selectedCity = 'City is required';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    // const nextStep = () => {
    //     setCurrentStep(prevStep => Math.min(prevStep + 1, 4)); // Ensure step doesn't exceed 4
    // };


    const handleSubmit = async (event) => {
        setLoading(true);
        setFormSubmitted(true);
        event.preventDefault();


        if (!validateForm()) {
            return;
        }

        if (cartItems.length === 0) {
            toast.error(<b>Add items to the cart before submitting the form.</b>);
            return;
        }

        const newFormData = {
            country: formData.country,
            state: selectedState?.name || '',
            city: selectedCity?.name || '',
            Name: formData.Name,
            flatno: formData.flatno,
            streetAddress: formData.streetAddress,
            phoneNo: formData.phoneNo,
            email: formData.email,
            productData: cartItems.map(item => ({
                productId: item._id,
                productName: item.pName,
                quantity: quantities[item._id],
                price: item.price,
                mainCategoryName: item.mainCategoryName,
                bottomSize: item.bottomSize,
                createdAt: item.createdAt,
                details: item.details,
                discountPrice: item.discountPrice,
                pImg: item.pImg,
                shoesSize: item.shoesSize,
                size: item.size,
                subCategoryId: item.subCategoryId,
                subcategoryName: item.subcategoryName,
                rating: item.rating,
                selectedSizesArray: item.selectedSizesArray,
                updatedAt: item.updatedAt,
                __v: item.__v,
                _id: item._id,

            })),

        };
        console.log('formData =>', formData);

        setFormData(newFormData);

        try {
            const response = await fetch('http://localhost:4800/api/v1/addshipping', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newFormData),
            });



            if (response.ok) {
                const responseData = await response.json();
                // clearCart();

                console.log('Shipping data inserted successfully!', responseData);

                // Update local storage with the received id
                const updatedFormData = {
                    ...newFormData,
                    id: responseData.result.id,
                };
                localStorage.setItem('formData', JSON.stringify(updatedFormData));
                setCountry('India');

                setErrors({});
                // setFormSubmitted(false);
                setShowThankYouMessage(true);
                nextStep(1);
                // setIsOpen(true);
                // Set loading back to false after one second
                setTimeout(() => {
                    setLoading(false);
                }, 1000);

            } else {
                console.error('Error inserting shipping data:', response.statusText);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error inserting shipping data:', error.message);
            setLoading(false);
        }
    };

    const handleFormVisibility = (visible) => {
        setFormVisibility(visible);
    };

    useEffect(() => {
        // Function to check query parameters and update currentStep
        const checkQueryParams = () => {
            const searchParams = new URLSearchParams(location.search);
            const payerName = searchParams.get('payerName');
            const payerEmail = searchParams.get('payerEmail');
            const payerMobile = searchParams.get('payerMobile');
            const payerAddress = searchParams.get('payerAddress');
            const paidAmount = searchParams.get('paidAmount');
            const status = searchParams.get('status');
            const sabpaisaTxnId = searchParams.get('sabpaisaTxnId');
            const transDate = searchParams.get('transDate');

            if (payerName && payerEmail && payerMobile && payerAddress && paidAmount && status && sabpaisaTxnId && transDate) {
                handleStepClick(4)
            }

        };

        checkQueryParams();
    }, [location.search]);
    // donga.divyesh22@oksbi


    return <>

        <div className="container-fluid" style={{ paddingTop: "3rem", overflow: "hidden" }}></div>

        <div className="container-fluid py-5">
            <div className="container py-5 mt-3">
                {/* {showThankYouMessage ? (null) : (<h4 className="mb-2 mt-2">Shipping Address</h4>)} */}


                <div className="row g-5">
                    <div className={`col-md-12 col-lg-6 ${currentStepIndex ===4 || currentStepIndex ===3  ? 'col-lg-12' : ''}`}>
                        {currentStepIndex == 4 ? (null) : (
                            <><Stepper
                                steps={steps}
                                activeStep={currentStepIndex - 1}
                                activeColor="#9c4399"
                                completeColor="#9c4399"
                                size={32}
                                circleFontSize={16}
                                titleFontSize={14}
                                circleTop={-1}
                                onClick={handleStepClick}
                                circleFillColor={currentStepIndex === 1 ? "#5cb85c" : "transparent"}
                                circleBorderStyle="1px solid #5cb85c"
                            /></>)}

                        {currentStepIndex === 4 && (
                            <div className="d-flex justify-content-center"> {/* Centering the component */}
                              {  localStorage.removeItem('cartItems')}
                              {localStorage.removeItem('quantities')}
                              {localStorage.removeItem('currentStepIndex')}
                                <PaymentResult clearCart={clearCart} />
                            </div>
                        )}

                        {currentStepIndex === 3 && (
                            <>
                                <Result
                                    formData={formData}
                                    setIsOpen={setIsOpen}
                                    isOpen={isOpen}
                                    handleFormVisibility={handleFormVisibility}
                                />
                            </>
                        )}
                        {currentStepIndex === 2 && (
                            <>
                                <Otp nextStep={nextStep} />
                            </>
                        )}
                        {currentStepIndex === 1 && (
                            <>
                                <form action="# " className="mt-4">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className=""></label>
                                            <input
                                                type="text"
                                                className="form-control py-1"
                                                placeholder="Name"
                                                value={formData.Name}
                                                name="Name"
                                                onChange={handleChange}
                                            />
                                            {formSubmitted && errors.Name && <p className="error-text">{errors.Name}</p>}
                                        </div>

                                        <div className="col-md-6 ">
                                            <label className=""></label>
                                            <input
                                                type="text"
                                                className="form-control py-1"
                                                placeholder="House No."
                                                value={formData.flatno}
                                                name="flatno"
                                                onChange={handleChange}
                                            />
                                            {formSubmitted && errors.flatno && <p className="error-text ">{errors.flatno}</p>}
                                        </div>
                                    </div>

                                    <div className="form-item w-100 ">
                                        <label className=""></label>
                                        <input
                                            type="text"
                                            className="form-control py-1"
                                            placeholder="Address"
                                            value={formData.streetAddress}
                                            name="streetAddress"
                                            onChange={handleChange}
                                        />
                                        {formSubmitted && errors.streetAddress && <p className="error-text">{errors.streetAddress}</p>}
                                    </div>



                                    <div className="form-item w-100 ">
                                        <label className=""></label>
                                        <input type="text" className="form-control py-1" value={country} />
                                    </div>

                                    <label className=""></label>
                                    <Select className=" border-none " placeholder="Enter Your State"
                                        options={State?.getStatesOfCountry('IN')}
                                        getOptionLabel={(options) => {
                                            return options["name"];
                                        }}
                                        getOptionValue={(options) => {
                                            return options["name"];
                                        }}
                                        value={selectedState}
                                        onChange={(item) => {
                                            setSelectedState(item);
                                        }}
                                    />
                                    {formSubmitted && errors.selectedState && <p className="error-text">{errors.selectedState}</p>}

                                    <label className=""></label>
                                    <Select className="   " placeholder="Enter Your City"
                                        options={City.getCitiesOfState(
                                            selectedState?.countryCode,
                                            selectedState?.isoCode
                                        )}
                                        getOptionLabel={(options) => {
                                            return options["name"];
                                        }}
                                        getOptionValue={(options) => {
                                            return options["name"];
                                        }}
                                        value={selectedCity}
                                        onChange={(item) => {
                                            setSelectedCity(item);
                                        }}
                                    />
                                    {formSubmitted && errors.selectedCity && <p className="error-text">{errors.selectedCity}</p>}

                                    <div className="form-item w-100 ">
                                        <label className=""></label>
                                        <input type="tel" name="phoneNo" className="form-control py-1" maxLength={10} placeholder="Phone No" value={formData.phoneNo} onChange={handleChange} />
                                        {formSubmitted && errors.phoneNo && <p className="error-text">{errors.phoneNo}</p>}
                                    </div>

                                    <div className="form-item w-100 ">
                                        <label className=""></label>
                                        <input type="email" name="email" readonly className="form-control py-1" placeholder="Email" value={formData.email} onChange={handleChange} />
                                        {formSubmitted && errors.email && <p className="error-text">{errors.email}</p>}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="submit-button py-2 px-4"
                                        style={{ marginTop: "20px" }}
                                        disabled={loading}
                                    >
                                        {loading ? 'Loading...' : 'Submit'}
                                    </button>

                                </form>
                            </>)}


                    </div>

                    {currentStepIndex !== 3 && currentStepIndex !== 4 && (

                        <div className="col-md-12 col-lg-6 col-xl-5" style={{ zIndex: "-1" }}>
                            {/* overfloechaneg ye class niche na class ma add akrvo  */}
                            <div className="table-responsive " >

                                <table className="table">
                                    {currentStepIndex !== 4 && (
                                        <thead className="sticky-top mt-2" >

                                            <tr className="text-center">
                                                <th scope="col">Products</th>
                                                <th scope="col">Name</th>
                                                <th>Size</th>
                                                <th scope="col">Qty</th>
                                                <th scope="col">Total</th>
                                            </tr>

                                        </thead>
                                    )}
                                    <tbody>


                                        {cartItems.map((el, index) => (
                                            console.log('cartItems =>', cartItems),

                                            <tr key={index} style={{ fontSize: "79%" }}>
                                                <th scope="row">
                                                    <div className="d-flex align-items-center">
                                                        <img
                                                            src={`https://api.hindustanrides.in/uploads/${el.pImg?.[0]}`}
                                                            style={{ width: 49, height: 49 }}
                                                            alt=""
                                                        />
                                                    </div>
                                                </th>
                                                <td className="align-middle">
                                                    <div>
                                                        <p className="mb-1">{el.pName}</p>
                                                        {/* <p className="mb-1"> Qty: {el.quantity}</p> */}

                                                        <p className="mb-1">Rs. {el.price} |  <strike>Rs.{el.discountPrice}</strike></p>
                                                    </div>
                                                </td>

                                                <td className="align-middle">


                                                    {el.selectedSizesArray && Array.isArray(el.selectedSizesArray) && el.selectedSizesArray.length > 0 && el.selectedSizesArray[0] && el.selectedSizesArray[0].length > 0 ? (
                                                        <p className="" style={{ fontWeight: "bold" }}>{el.selectedSizesArray}</p>
                                                    ) : el.selectedSize && el.selectedSize.length > 0 ? (
                                                        <p className="" >{el.selectedSize}</p>
                                                    ) : (
                                                        <h3 className="" style={{ color: "black" }}>-</h3>
                                                    )}


                                                </td>
                                                <td className="align-middle">{el.quantity}</td>
                                                <td className="align-middle fw-bold ">₹ {el.price * el.quantity}</td>

                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>

                            {currentStepIndex !== 4 && (
                                <div className="card mt-4">
                                    <div className="card-body">

                                        <div className="d-flex justify-content-between">
                                            <span className="fw-bold">Subtotal : &nbsp;({cartItems.length} Items):</span>
                                            <span className="fw-bold">Rs.{overallSum}</span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span className="fw-bold">Tax (GST 18%):</span>
                                            <span className="fw-bold">Rs.{gstAmount.toFixed(0)}</span>
                                        </div>
                                        <hr />
                                        <div className="d-flex justify-content-between">
                                            <h5 style={{ color: "#9c4399" }}>Grand Total:</h5>
                                            <h5 style={{ fontFamily: "Arial, Helvetica, sans-serif", color: "#9c4399" }}>Rs.{finalTotal}</h5>
                                        </div>

                                    </div>
                                </div>
                            )}

                        </div>
                    )}

                </div>
            </div>
        </div>
        <SabpaisaPaymentGateway clientCode={clientCode} transUserName={transUserName} transUserPassword={transUserPassword}
            authkey={authkey} authiv={authiv}
            finalTotal={finalTotal} setIsOpen={setIsOpen} formData={formData} callbackUrl={callbackUrl} isOpen={isOpen} />

        <Script />
    </>
}

export default Checkout
