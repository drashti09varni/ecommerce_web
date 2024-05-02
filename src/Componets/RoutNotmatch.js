import React from 'react';

const RoutNotmatch = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // Adjust as needed to center vertically
  };

  return (
    <div style={containerStyle}>
        {/* <h3>Shopping Cart</h3> */}
      <p className='fw-bold mt-2 '>Please first login and then add to Cart your    </p> 
      <h5 className='alltextcolor fw-bold'>Product & Whishlist & Checkout. 🛍️</h5>
    </div>
  );
};

export default RoutNotmatch;
