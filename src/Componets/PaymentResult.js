import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import logohedre from "../img/Group34.png";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';
import rightpng from '../../src/img/rightimg.webp';
import easyinvoice from 'easyinvoice';
import { TbFileInvoice } from "react-icons/tb";
import "../css/thankyoupage.css"
import { useReactToPrint } from 'react-to-print';
import { useCart } from './Context/CartContext';
import { ReactToPrint } from 'react-to-print';
import html2pdf from 'html2pdf.js';



const PaymentResult = ({ clearCart }) => {
    const componentRef = useRef();
    const navigate = useNavigate()
    const location = useLocation();
    const [paymentData, setPaymentData] = useState({});
    const [isGenerating, setIsGenerating] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const [formData, setFormData] = useState({});
    const [isConfettiActive, setIsConfettiActive] = useState(false);
    console.log('formData =>', formData);

    const { cartItems, setCartItems, removeFromCart, getCartTotal } = useCart();
    useEffect(() => {
        const formDataFromLocalStorage = JSON.parse(localStorage.getItem('formData'));
        if (formDataFromLocalStorage) {
            setFormData(formDataFromLocalStorage);
        }
    }, []);

    const fullAdress = formData.flatno + " ," + formData.streetAddress + " , " + formData.city + " , " + formData.state
    console.log('fullAdress =>', fullAdress);






    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        if (searchParams) {
            // clearCart();
        }


        setPaymentData({
            payerName: searchParams.get('payerName') || '',
            payerEmail: searchParams.get('payerEmail') || '',
            payerAddress: searchParams.get('payerAddress') || '',
            payerMobile: searchParams.get('payerMobile') || '',
            amount: searchParams.get('amount') || '',
            paymentMode: searchParams.get('paymentMode') || '',
            status: searchParams.get('status') || '',
            transDate: searchParams.get('transDate') || '',
            clientTxnId: searchParams.get('clientTxnId') || '',
            status: searchParams.get('status') || '',
            paymentMode: searchParams.get('paymentMode') || '',
            bankTxnId: searchParams.get('bankTxnId') || '',

        });

    }, [location.search]);


    // me page refresh  karu tab muje 

    useEffect(() => {
        if (paymentData.status === 'FAILED') {
            try {
                clearCart();
                localStorage.removeItem('currentStepIndex');
                localStorage.removeItem('quantities');
                console.log('Before setTimeout');
                setTimeout(() => {
                    console.log('Inside setTimeout');
                    navigate('/');
                    localStorage.removeItem('formData');
                    localStorage.removeItem('currentStepIndex');
                }, 2000);
                console.log('After setTimeout');
            } catch (error) {
                console.error("Error removing item from localStorage:", error);
            }
        }
    }, [paymentData.status]);

    

    var id = Math.random().toString(4).slice(2)

    console.log(id)

    const orderDate = new Date().toISOString().slice(0, 10)
    console.log('orderDate =>', orderDate);


    function generateOrderId(prefix, length) {
        const randomNumber = Math.floor(Math.random() * Math.pow(10, length));
        return prefix + randomNumber.toString().padStart(length, '0');
    }

    // Usage example:
    const orderId = generateOrderId("MT", 8);
    const subtotal = formData.productData ? formData.productData.reduce((acc, product) => acc + (product.quantity * product.price), 0).toFixed(2) : 0;


    const calculateGST = (subtotal) => {
        const gstRate = 0.18;
        return subtotal * gstRate;
    };

    // Calculate subtotal and GST
    // Calculate subtotal and GST
    const subtotall = getCartTotal();
    const gstAmount = calculateGST(subtotall);


    // final total
    const subtotalValue = parseFloat(subtotal);
    const Total = subtotalValue + gstAmount;
    const finalTotal = Total.toFixed(0);

    const downloadInvoice = () => {
        const invoiceElement = componentRef.current;
        const opt = {
            margin: 0.5,
            filename: 'invoice.pdf',
            image: {type:'jpg',quality:0.99 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().from(invoiceElement).set(opt).save();
    };
    

    return (
        <>
            <div>
                <div className="container d-flex justify-content-center">
                    <div className="">
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                                type="button"
                                className="btn py-1 px-2"
                                style={{ fontSize: "12px", backgroundColor: "#9c4399", color: "white" }}
                                onClick={downloadInvoice}
                            >
                                <TbFileInvoice className='mb-1 fw-bold' /> Download Invoice
                            </button>
                        </div>
                        <div ref={componentRef}   className="card">
                            <div className="text-left logo p-2 px-5">
                                <img src={logohedre} width={50} alt="Logo" className="logo-img" />
                            </div>
                            <div className="invoice p-5">

                                <div className="row border-bottom">
                                    <div className="col-md-6">
                                        <div className="py-2">
                                            <h5 style={{ color: "black" }}>Your order Confirmed!</h5>
                                        </div>
                                    </div>
                                    <div className="col-md-6 text-md-end">
                                        <div className="py-2">
                                            <span className="d-block text-muted">Phone No.</span>
                                            <span style={{ fontSize: "12px", fontWeight: "bold" }}>+91 {formData.phoneNo}</span>
                                        </div>
                                    </div>
                                </div>
                                <span className="font-weight-bold d-block mt-4">Hello,&nbsp;<b>{formData.Name} </b></span>
                                <span>
                                    Your order has been confirmed and will be shipped in the <b> next two days!</b>
                                </span>

                                <div className="payment border-top mt-3 mb-3 border-bottom">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="py-2">
                                                <span className="d-block text-muted">Order Date</span>
                                                <span style={{ fontSize: "12px", fontWeight: "bold" }}>{orderDate}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-6 text-md-end">
                                            <div className="py-2">
                                                <span className="d-block text-muted">Order No</span>
                                                <span style={{ fontSize: "12px", fontWeight: "bold" }}>{orderId}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-7">
                                            <div className="py-2">
                                                <span className="d-block text-muted">Shipping Address</span>
                                                <span className='' style={{ fontSize: "12px", fontWeight: "bold" }}>{fullAdress}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-5 text-md-end">
                                            <div className="py-2">
                                                <span className="d-block text-muted">Payment</span>
                                                <span style={{ fontSize: "12px", fontWeight: "bold" }}>{paymentData.paymentMode}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="product border-bottom table-responsive">
                                    <table className="table table-borderless ">
                                        <tbody>
                                            {formData.productData && formData.productData.map((product, index) => (
                                                <tr key={index} className='border-bottom'>
                                                    {/* <td width="20%">
                                                        <img src={`http://193.203.162.218:4800/uploads/${product.pImg[0]}`} width={90} alt="Product" />
                                                    </td> */}
                                                    <td width="60%" style={{ verticalAlign: 'middle'}}>
                                                        <span className="font-weight-bold">{product.productName}</span>
                                                        <div className="product-qty">
                                                            <div className='d-flex '>
                                                                <span className="d-block mr-2 mt-1 fw-bold" style={{ color: "black" }}>Quantity&nbsp;:&nbsp;&nbsp;{product.quantity}</span>
                                                            </div>
                                                            <span className="d-block ml-2 mt-1 fw-bold" style={{ color: "black" }}>Size&nbsp;:&nbsp;&nbsp;{product.selectedSizesArray}</span>
                                                            <span className="d-block ml-2 mt-1 fw-bold" style={{ color: "black" }}>Price&nbsp;:&nbsp;&nbsp;{product.price}</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>


                                <div className="row d-flex justify-content-end">
                                    <div className="">

                                        <table className="table table-borderless">
                                            <tbody className="totals">
                                                <tr>
                                                    <td style={{ padding: '4px 8px' }}>
                                                        <div className="text-left">
                                                            <span className="fw-bold" style={{ color: "#9c4399" }}>Subtotal : </span>
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: '4px 8px' }}>
                                                        <div className="text-right">
                                                            <span className='fs-6 fw-bold'>RS.{subtotal}</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {/* <tr>
                                                <td>
                                                    <div className="text-left">
                                                        <span className="text-muted">Shipping Fee</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="text-right">
                                                        <span>$22</span>
                                                    </div>
                                                </td>
                                            </tr> */}
                                                <tr>
                                                    <td style={{ padding: '4px 8px' }} className="border-top border-bottom">
                                                        <div className="text-left">
                                                            <span className='fw-bold' style={{ color: "#9c4399" }}>GST (18%)</span>
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: '4px 8px' }} className="border-top border-bottom">
                                                        <div className="text-right">
                                                            <span className='fs-6 fw-bold'>Rs.{gstAmount.toFixed(0)}</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {/* <tr>
                                                <td>
                                                    <div className="text-left">
                                                        <span className="text-muted">Discount</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="text-right">
                                                        <span className="text-success">$168.50</span>
                                                    </div>
                                                </td>
                                            </tr> */}
                                                <tr className="border-top border-bottom">
                                                    <td style={{ padding: '4px 8px' }}>
                                                        <div className="text-left">
                                                            <span className="fw-bold" style={{ color: "#9c4399" }}>Grand Total</span>
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: '4px 8px' }}>
                                                        <div className="text-right">
                                                            <span className='fs-6 fw-bold'>Rs.{finalTotal}</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                </div>

                                {/* <p className="font-weight-bold mb-0">Thanks for shopping with us!</p> */}

                                <div className="row border-bottom">
                                    <div className="col-md-7">
                                        <div className="py-2">
                                            <h5 style={{ color: "black" }}>Thanks for shopping with us!</h5>
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div className="d-flex justify-content-between footer p-3">
                                <span>
                                    Need Help? Visit our <a href="#">help center.</a>
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


        </>
    );

};

export default PaymentResult;







{/* <div className="row">
<div className="col-sm-6 py-2 no-gutters">Name:</div>
<div className="col-sm-6 py-2 no-gutters">{paymentData.payerName}</div>
</div>

<div className="row">
<div className="col-sm-6 py-2">Email:</div>
<div className="col-sm-6 py-2">{paymentData.payerEmail}</div>
</div>
<div className="row">
<div className="col-sm-6 py-2">Address:</div>
<div className="col-sm-6 py-2">{fullAdress}</div>
</div>
<div className="row">
<div className="col-sm-6 py-2">Mobile:</div>
<div className="col-sm-6 py-2">{paymentData.payerMobile}</div>
</div>
<div className="row">
<div className="col-sm-6 py-2">Amount:</div>
<div className="col-sm-6 py-2">{paymentData.amount}</div>
</div>
<div className="row">
<div className="col-sm-6 py-2">Payment Mode:</div>
<div className="col-sm-6 py-2">{paymentData.paymentMode}</div>
</div>
<div className="row">
<div className="col-sm-6 py-2">Status:</div>
<div className="col-sm-6 py-2">{paymentData.status}</div>
</div>
<div className="row">
<div className="col-sm-6 py-2">Transaction Date:</div>
<div className="col-sm-6 py-2">{paymentData.transDate}</div>
</div> */}