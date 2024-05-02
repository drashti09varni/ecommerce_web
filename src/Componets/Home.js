// import React, { useEffect, useState } from 'react'
// import Script from '../Componets/Script/Script'
// import FeatureSection from './FeatursSection'
// import ShopStart from './ShopStart'
// import FeaturesStart from './FeatursStart'
// import Bestproduct from './Bestproduct'
// import Slider from './Slider'
// import Banner from './Banner'
// import Services from './Services'
// import Testimonial from './Tastimonial'
// import InfinateSale from './InfinateSale'
// import AwesomeSlider from 'react-awesome-slider';
// import "react-awesome-slider/dist/custom-animations/cube-animation.css";
// import 'react-awesome-slider/dist/styles.css';
// import firstimg from "../img/fashion-sale-landing-page-template_23-2148592608.jpg"
// import secoundimg from "../img/rivaah-rb-desktop.webp"
// import thirdimg from "../img/bg.jpg"
// import { motion, useAnimation } from 'framer-motion';



// function Home() {
//     const [scrollDirection, setScrollDirection] = useState('down');
//     const [typedText, setTypedText] = useState('this is my first collrction');
//     const controls = useAnimation();

//     useEffect(() => {
//         const handleScroll = () => {
//             const currentScrollY = window.scrollY;

//             if (currentScrollY > 0 && currentScrollY > lastScrollY) {
//                 setScrollDirection('down');
//             } else if (currentScrollY > 0 && currentScrollY < lastScrollY) {
//                 setScrollDirection('up');
//             }

//             lastScrollY = currentScrollY;
//         };

//         let lastScrollY = window.scrollY;

//         window.addEventListener('scroll', handleScroll);

//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);

//     useEffect(() => {
//         const element = document.querySelector('.col-lg-7');

//         if (element) {
//             if (scrollDirection === 'down') {
//                 element.classList.remove('visible');
//             } else {
//                 element.classList.add('visible');
//             }
//         }
//     }, [scrollDirection]);

//     useEffect(() => {
//         controls.start({ opacity: 1, x: 0 });
//     }, [typedText, controls]);

//     const variants = {
//         hidden: { opacity: 0, x: -50 },
//     };

//     const handleTypingAnimation = async () => {
//         const textToType = 'Your Fashion SALE Text Here ';
//         for (let i = 0; i <= textToType.length; i++) {
//             setTypedText(textToType.slice(0, i));
//             await new Promise((resolve) => setTimeout(resolve, 100)); 
//         }
//     };

//     useEffect(() => {
//         handleTypingAnimation();
//     }, []);


//     return <>
//         <div className="container-fluid py-5  mt-5">
//             <AwesomeSlider animation="cubeAnimation" style={{ height: '600px' }}>


//                 <div style={{ position: 'relative' }} data-src={thirdimg}>
//                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)' }}>
//                         <div style={{ gridColumn: 'span 6', position: 'absolute', top: '50%', left: '30%', transform: 'translate(-50%, -50%)' }}>
//                             <motion.div initial="hidden" animate={controls} variants={variants}>
//                                 <h1>{typedText}</h1>
//                             </motion.div>
//                         </div>
//                         <div style={{ gridColumn: 'span 6', background: 'transparent' }}>
//                         </div>
//                     </div>
//                 </div>
//                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} data-src={firstimg}>
//                     <img style={{ maxWidth: '100%', maxHeight: '100%' }} src={firstimg} alt="Slide 1" />
//                 </div>
//                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} data-src={secoundimg}>
//                     <img style={{ maxWidth: '100%', maxHeight: '100%' }} src={secoundimg} alt="Slide 2" />
//                 </div>
//             </AwesomeSlider>
//             <div className="container py-5">
//                 <div className="row g-5 align-items-center">

//                 </div>
//             </div>
//         </div>

//         <FeatureSection />
//         <ShopStart />
//         {/* <Slider/> */}
//         {/* <Banner/> */}
//         <Bestproduct />
//         <InfinateSale />
//         <Services />
//         <Testimonial />
//         <Script />
//     </>
// }

// export default Home

import React, { useEffect, useState } from 'react'
import Script from '../Componets/Script/Script'
import FeatureSection from './FeatursSection'
import ShopStart from './ShopStart'
import FeaturesStart from './FeatursStart'
import Bestproduct from './Bestproduct'
import Slider from './Slider'
import Banner from './Banner'
import Services from './Services'
import Testimonial from './Tastimonial'
import InfinateSale from './InfinateSale'



function Home() {
    const [scrollDirection, setScrollDirection] = useState('down');

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 0 && currentScrollY > lastScrollY) {
                setScrollDirection('down');
            } else if (currentScrollY > 0 && currentScrollY < lastScrollY) {
                setScrollDirection('up');
            }

            lastScrollY = currentScrollY;
        };

        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const element = document.querySelector('.col-lg-7');

        if (element) {
            if (scrollDirection === 'down') {
                element.classList.remove('visible');
            } else {
                element.classList.add('visible');
            }
        }
    }, [scrollDirection]);
    return <>
        <div className="container-fluid  hero-header" style={{ marginTop: "8%" }}>

            <div className="container py-5">
                <div className="row g-5 align-items-center">
                    <div className="col-md-12 col-lg-7">
                        <div className={`animate__animated ${scrollDirection === 'down' ? '' : 'visible'}`}>
                            <h4 className={`text-secondary ${scrollDirection === 'up' ? 'visible' : ''} mt-5 mt-sm-3`}>
                                Up to 50% Off!
                            </h4>



                            <h1 className={`mb-5 display-3 text-primary ${scrollDirection === 'up' ? 'visible' : ''}`}>
                                Explore the Collection & Your Style Awaits
                            </h1>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-5">
                        <div
                            id="carouselId"
                            className="carousel slide position-relative"
                            data-bs-ride="carousel"
                        >
                            <div className="carousel-inner" role="listbox">
                                <div className="carousel-item active rounded">
                                    <img
                                        src="/fruitables-1.0.0/img/Group 2.png"
                                        className="img-fluid w-100 h-100 bg-secondary rounded"
                                        alt="First slide"
                                    />

                                </div>
                                <div className="carousel-item rounded">
                                    <img
                                        src="/fruitables-1.0.0/img/Clothing collection - Copy.png"
                                        className="img-fluid w-100 h-100 rounded"
                                        alt="Second slide"
                                    />

                                </div>

                            </div>
                            <button
                                className="carousel-control-prev"
                                type="button"
                                data-bs-target="#carouselId"
                                data-bs-slide="prev"
                            >
                                <span className="carousel-control-prev-icon" aria-hidden="true" />
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                                className="carousel-control-next"
                                type="button"
                                data-bs-target="#carouselId"
                                data-bs-slide="next"
                            >
                                <span className="carousel-control-next-icon" aria-hidden="true" />
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <FeatureSection />
        <ShopStart />
        <Services />
        <InfinateSale />
        <Bestproduct />
        <Testimonial />
        <Script />
    </>
}

export default Home