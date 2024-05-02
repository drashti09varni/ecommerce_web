import React, { useEffect, useRef } from 'react';
import Script from '../Componets/Script/Script';
import { motion, useAnimation } from 'framer-motion';

function FeatureSection() {
  const controls = useAnimation();
  const ref = useRef();

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const elementTop = ref.current.offsetTop;
  //     const scrollY = window.scrollY;

  //     if (scrollY > elementTop - window.innerHeight / 2) {
  //       controls.start({
  //         opacity: 1,
  //         y: 0,
  //         transition: { duration: 1 }
  //       });
  //     }
  //   };

  //   controls.start({ opacity: 0, y: -50 });

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [controls]);

  return (
    <>
       <div className="container-fluid featurs py-2 mb-5">
        <div className="container mb-5">
          
            <div className="row g-4">
              <div className=" col-xxl-3  col-xl-3  col-xl-3  col-lg-3 col-md-6 col-sm-6 col-6">
                <div
                  className="featurs-item text-center rounded bg-light p-4"
                  whilehover={{ scale: 1.1 }}  style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", height:"250px"}}
                >
                  <div className="mb-5 mx-auto">
                    <i className="fas fa-car-side fa-3x " style={{color:"#9c4399"}} />
                  </div>
                  <div className="featurs-content text-center">
                    <h5 className="text-primary">Free Shipping</h5>
                    <p className="mb-0 text-primary">Free on order over $300</p>
                  </div>
                </div>
              </div>

              <div className=" col-xxl-3  col-xl-3  col-xl-3  col-lg-3 col-md-6 col-sm-6 col-6">
                <div
                  className="featurs-item text-center rounded bg-light p-4"
                  whilehover={{ scale: 1.1 }}  style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", height:"250px"}}
                >
             
                    <div className="mb-5 mx-auto">
                    <i className="fas fa-user-shield fa-3x " style={{color:"#9c4399"}} />
                  </div>
                  <div className="featurs-content text-center">
                    <h5 className="text-primary">Security Payment</h5>
                    <p className="mb-0 text-primary">100% security payment</p>
                  </div>
                </div>
              </div>

              <div className=" col-xxl-3  col-xl-3  col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6" > 
                <div
                  className="featurs-item text-center rounded bg-light p-4"
                  whilehover={{ scale: 1.1 }}  style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", height:"250px"}}
                >
                
                    <div className="mb-5 mx-auto">
                    <i className="fas  fa-exchange-alt fa-3x " style={{color:"#9c4399"}} />
                  </div>
                  <div className="featurs-content text-center">
                    <h5 className="text-primary">30 Day Return</h5>
                    <p className="mb-0 ">30 day money guarantee</p>
                  </div>
                </div>
              </div>

          
              <div className=" col-xxl-3  col-xl-3  col-xl-3 col-lg-3  col-md-6 col-sm-6 col-6" >
                <div
                  className="featurs-item text-center rounded bg-light p-4"
                  whilehover={{ scale: 1.1 }}  style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", height:"250px"}}
                >
                  
                    <div className="mb-5 mx-auto">
                    <i className="fas fa-phone-alt fa-3x " style={{color:"#9c4399"}} />
                  </div>
                  <div className="featurs-content text-center">
                    <h5 className="text-primary">24/7 Support</h5>
                    <p className="mb-0 ">Support every time fast</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      <Script />
    </>
  );
}

export default FeatureSection;
