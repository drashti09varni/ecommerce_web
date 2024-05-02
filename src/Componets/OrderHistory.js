// import React, { useEffect, useState } from 'react';
// import { Col, Offcanvas, Row, Image, Card, ListGroup } from 'react-bootstrap';
// import "../css/orderhistory.css"

// function OrderHistory({ showOffcanvas, handleCloseOffcanvas }) {

//     const [shippingData, setShippingData] = useState([]);
//     const email = localStorage.getItem('email');

//     // Function to fetch shipping data from the API
//     const fetchShippingData = async () => {
//         try {
//             // Fetch shipping data from the API
//             const response = await fetch('https://api.hindustanrides.in/api/v1/getshipping');
//             if (response.ok) {
//                 // Parse the JSON data
//                 const data = await response.json();
//                 const allShippingData = data.result; // Assuming data.result contains the array of shipping data

//                 // Retrieve the email from localStorage
//                 const userEmail = localStorage.getItem('email');

//                 // Filter the data to find only the data that matches the user's email
//                 const filteredData = allShippingData.filter(item => item.email === userEmail);
//                 console.log('filteredData =>', filteredData);

//                 // Store the filtered data in the state variable
//                 setShippingData(filteredData);
//             } else {
//                 console.error('Failed to fetch shipping data:', response.statusText);
//             }
//         } catch (error) {
//             console.error('Error fetching shipping data:', error);
//         }
//     };

//     // Call the function to fetch shipping data when Offcanvas is shown
//     useEffect(() => {
//         if (showOffcanvas && email) {
//             fetchShippingData();
//         }
//     }, [showOffcanvas, email]);

//     console.log('shippingData =>',shippingData.productData);

//     return (
//         <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas} placement="end">
//         <Offcanvas.Header closeButton>
//           <Offcanvas.Title>Order History</Offcanvas.Title>
//         </Offcanvas.Header>
//         <Offcanvas.Body>
//           {/* Display order date, time, and ID */}
//           <Row className="mb-3">
//             <Col>
//               <p><strong>Order Date:</strong> {new Date(shippingData.createdAt).toLocaleDateString()}</p>
//               <p><strong>Order Time:</strong> {new Date(shippingData.createdAt).toLocaleTimeString()}</p>
//               <p><strong>Order ID:</strong> {shippingData.id}</p>
//             </Col>
//           </Row>

//           {/* Display product details */}
//           <div className="order-history-item">

//           </div>
//         </Offcanvas.Body>
//       </Offcanvas>
//     );
// }

// export default OrderHistory;





import React, { useEffect, useState } from 'react';
import { Col, Offcanvas, Row, Image, Card, ListGroup } from 'react-bootstrap';
import "../css/orderhistory.css";

function OrderHistory({ showOffcanvas, handleCloseOffcanvas }) {
    const [shippingData, setShippingData] = useState([]);
    const email = localStorage.getItem('email');

    // Function to fetch shipping data from the API
    const fetchShippingData = async () => {
        try {
            const response = await fetch('https://api.hindustanrides.in/api/v1/getshipping');
            if (response.ok) {
                const data = await response.json();
                const allShippingData = data.result;
                const userEmail = localStorage.getItem('email');
                const filteredData = allShippingData.filter(item => item.email === userEmail);
                setShippingData(filteredData);
                console.log('filteredData =>', filteredData);

            } else {
                console.error('Failed to fetch shipping data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching shipping data:', error);
        }
    };

    useEffect(() => {
        if (showOffcanvas && email) {
            fetchShippingData();
        }
    }, [showOffcanvas, email]);

    return (
        <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Order History</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className=''>
              
                {shippingData.map((shipping, index) => (
                    <div key={index}>
                        {/* Display order date and ID */}
                        <Row className="mb-3">
                            <Col xs={6}>
                                <p><strong>Order Date:</strong> {new Date(shipping.createdAt).toLocaleDateString()}</p>
                            </Col>
                            <Col xs={6} className="text-end">
                                <p><strong>Order ID:</strong> {shipping.id}</p>
                            </Col>
                        </Row>



                        {shipping.productData && shipping.productData.map((product, idx) => (
                            <Card key={idx} className="mb-3 product-card " >
                                <ListGroup variant="flush">
                                    <ListGroup.Item className="product-list-item">
                                        <Row className="product-info">
                                            {/* Column for product details */}
                                            <Col xs={10}>
                                                <div className="product-details">
                                                    <p><strong></strong> {product.productName}</p>
                                                    <p><strong>Price:</strong> {product.price}</p>
                                                    <p><strong>Quantity:</strong> {product.quantity}</p>
                                                </div>
                                            </Col>

                                            {/* Column for product image */}
                                            <Col xs={2} className="text-end">
                                                {product.pImg && product.pImg.length > 0 && (
                                                    <Image
                                                        src={`http://193.203.162.218:4800/uploads/${product.pImg[0]}`}
                                                        alt={product.productName}
                                                        className="product-image"
                                                        style={{ width: "76px", height: "80px" }}
                                                    />
                                                )}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        ))}

                    </div>
                ))}
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default OrderHistory;

