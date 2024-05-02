import React, { useEffect, useState, useRef } from "react";
import Script from '../Componets/Script/Script'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { TbTruckDelivery, TbTruckReturn } from "react-icons/tb";
import { BsCart4, BsGraphUpArrow, BsHeart, BsHeartFill } from "react-icons/bs";
import { Swiper, SwiperSlide } from 'swiper/react';
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io";
import { BiSolidOffer } from "react-icons/bi";
import { RiCloseFill, RiStore2Fill } from "react-icons/ri";
import { Pagination, Autoplay } from 'swiper/modules';
import ReactImageMagnify from 'react-image-magnify';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import { useCart } from '../Componets/Context/CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsStarFill } from "react-icons/bs";
import { useWishlist } from "./Context/WhishlistContext"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './styles.css';
import ReactPaginate from "react-paginate";
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../css/product-detail.css";
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
// import "../css/card.css"
import "../css/card.css"
import ReactImageGallery from 'react-image-gallery';
import '../css/image-gallery.css';


const API_URL = "https://api.hindustanrides.in/api/v1"



function ShopDetail() {
  const location = useLocation();

  const user = localStorage.getItem('email');
  const navigate = useNavigate()
  const { productData } = location.state || {};
  const { addToWishlist, whishlistItem, toggleWishlist } = useWishlist();
  console.log(productData);

  const [isSizeSelected, setIsSizeSelected] = useState(false);
  const [allSubcategory, setAllSubcategory] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allproduct, setAllProduct] = useState([]);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [getSubCategory, setSubCategory] = useState([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const { cartItems, setCartItems, removeFromCart, clearCart, getCartTotal, addToCart, addToCartNotSize } = useCart();
  // const { addToCart, setCartItems, addToCartNotSize } = useCart();
  const [quantities, setQuantities] = useState(() => {
    const storedQuantities = localStorage.getItem('quantities');
    return storedQuantities ? JSON.parse(storedQuantities) : cartItems.map(() => 1);
  });

  useEffect(() => {
    localStorage.setItem('quantities', JSON.stringify(quantities));
  }, [quantities]);


  const handleAddToCart = (item, selectedSize) => {

    console.log(item, selectedSize);

    const existingCartItem = cartItems.find(
      (cartItem) => cartItem._id === item._id && JSON.stringify(cartItem.selectedSizesArray) === JSON.stringify([selectedSize])
    );

    if (existingCartItem) {
      setCartItems((prevCartItems) => {
        const newCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === item._id && JSON.stringify(cartItem.selectedSizesArray) === JSON.stringify([selectedSize])
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        console.log("Updated Cart Items:", newCartItems);
        return newCartItems;
      });
      toast.success("Quantity updated in the cart.", { icon: <BsCart4 /> });
    } else {
      const newCartItem = { ...item, quantity: 1, selectedSizesArray: [selectedSize] };

      setCartItems((prevCartItems) => [...prevCartItems, newCartItem]);

      toast.success("Added your product to the cart.", { icon: <BsCart4 /> });
    }
  };

  const availableSizes = productData.size
    .concat(productData.bottomSize, productData.shoesSize)
    .filter(size => size.trim() !== '');


  const hasSizes = availableSizes.length > 0;
  console.log("hasSizes", hasSizes)

  // Creating an object to track selected sizes
  const initialSelectedSizes = {};
  availableSizes.forEach((size) => {
    initialSelectedSizes[size] = false;
  });

  const [selectedSizes, setSelectedSizes] = useState(initialSelectedSizes);



  const selectedSizesArray = Object.entries(selectedSizes)
    .filter(([size, isSelected]) => isSelected)
    .map(([size]) => size);

  console.log("Selected sizes:", selectedSizesArray);


  const handleSizeClick = (size) => {
    setSelectedSizes((prevSelectedSizes) => {
      const newSelectedSizes = {};

      // Clear the selection of other sizes
      Object.keys(prevSelectedSizes).forEach((prevSize) => {
        newSelectedSizes[prevSize] = false;
      });

      // Set the selection for the clicked size
      newSelectedSizes[size] = true;

      // Your existing logic for handling quantities
      setQuantities((prevQuantities) => {
        const newQuantities = { ...prevQuantities };
        newQuantities[productData._id] = newSelectedSizes[size] ? 1 : 0;
        return newQuantities;
      });

      setIsSizeSelected(true); // Set to true as at least one size is selected
      return newSelectedSizes;
    });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //continue shopping

  const AllProduct = async (page, limit = 12) => {
    try {
      const response = await fetch(`${API_URL}/getAllProduct/${page}?limit=${limit}`);
      const data = await response.json();
      console.log(data.result)
      setAllProduct(data.result);
      setCurrentPage(data.page);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  }

  useEffect(() => {
    AllProduct(currentPage);
  }, [currentPage]);

  const openSizeModal = (el) => {
    console.log(el)
    setSelectedSizes(el)
    setShowSizeModal(true);
  };
  // Creating an object to track selected sizes

  const closeSizeModal = () => {
    setShowSizeModal(false);
  };

  const isItemInWishlist = (item) => {
    return whishlistItem.some((wishlistItem) => wishlistItem.id === item.id);
  };


  const handleAddToCartProduct = () => {
    if (isSizeSelected) {
      addToCart(selectedSizes, selectedSizes.selectedSize);

    } else {
      // console.log("Please select a size before adding to cart.");
      addToCartNotSize(productData)
    }
  };

  const handleAddToWhilist = (item) => {
    addToWishlist(item);
  };


  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const handleShopNowClick = (productData) => {
    console.log()
    navigate(`/shopdetails?id=${productData._id}`, { state: { productData: productData } });
  };


  const mainSlider = useRef();
  const thumbnailSliderSettings = {
    dots: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    focusOnSelect: true,
    arrows: false,
    afterChange: (currentSlide) => {
      mainSlider.current.slickGoTo(currentSlide);
    }
  };

  const mainSliderSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    asNavFor: '.slider-nav',
    ref: mainSlider,
    infinite: true,
    prevArrow: <IoIosArrowDropleftCircle fill="black" />,
    nextArrow: <IoIosArrowDroprightCircle fill="black" />
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const [mainSliderIndex, setMainSliderIndex] = useState(0);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const thumbnailImages = productData.pImg.slice(0, 5);

  // Custom arrow components
  const handleLinkClick = () => {
    // alert("jhkjhkjh")
    setDrawerOpen(!isDrawerOpen);
  };

  const images = thumbnailImages.map((image) => ({
    original: `http://193.203.162.218:4800/uploads/${image}`,
    thumbnail: `http://193.203.162.218:4800/uploads/${image}`,
  }));

  const handleImageClick = (productData) => {
    console.log('productData =>', productData);

    navigate(`/shopdetails?id=${productData._id}&cat=${productData.MaincategoryName}&sub=${productData.subcategoryName}`, {
      state: { productData: productData },
    });
  };


  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('cat');
  const subcategory = urlParams.get('sub');

  console.log("Category:", category); // Output: Men
  console.log("Subcategory:", subcategory); // Output: T-shirt

  const handleLoadMoreAll = async () => {
    // const nextPage = currentPage + 1;
    try {

      const response = await fetch(`${API_URL}/allSubacategoey`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ page: nextPage }),
      });
      const data = await response.json();


      console.log(' data=>', data);

      setAllSubcategory(data.result);

    } catch (error) {
      console.error("Error fetching all products:", error);
    } finally {
    }
  };

  useEffect(() => {
    handleLoadMoreAll();
  }, []);

  console.log('productData =>', productData);
  console.log('allSubcategory =>', allSubcategory);


  const matchingSubcategory = allSubcategory.find((el) => el.mainCategoryName === category && el.SubCateoryName === subcategory);
  console.log('matchingSubcategory =>', matchingSubcategory);

  // Access sizeImg from matchingSubcategory
  const sizeImg = matchingSubcategory ? matchingSubcategory.sizeImg : null;
  console.log('Size Image from matchingSubcategory:', sizeImg);

  const handleShopNowClickdata = (productData) => {
    navigate(`/shopdetails?id=${productData._id}&cat=${productData.MaincategoryName}&sub=${productData.subcategoryName}`, {
      state: { productData: productData },
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log('productData =>', productData);


  return <>


    <div className="container-fluid" style={{ paddingTop: "10rem", overflow: "" }}>
      <div className="py-5 px-5">
        <div className="card-wrapper">
          <div className="carddata">
            {/* card left */}
            <div className="product-imgs">
              <div className="img-display">
                <div className="img-showcase">
                  <div className="mb-5">
                    {/* <div className="img-item"> */}
                      <SwiperSlide >
                        <ReactImageMagnify
                          {...{
                            smallImage: {
                              alt: `Thumbnail `,
                              isFluidWidth: true,
                              src: images[selectedImageIndex].original,
                            },
                            largeImage: {
                              src: images[selectedImageIndex].original,
                              width: 1200,
                              height: 1200,
                            },
                            enlargedImagePosition: 'over',
                          }}
                        />
                      </SwiperSlide>

                    </div>
                  </div>
                {/* </div> */}
              </div>
              <div className="img-select">
                {thumbnailImages.map((thumbnail, index) => (
                  <div key={index} className="thumbnail-item px-1" onClick={() => handleThumbnailClick(index)}>
                    <img src={`http://193.203.162.218:4800/uploads/${thumbnail}`} alt={`Thumbnail ${index}`} />
                  </div>
                ))}
              </div>
            </div>


            {/* card right */}
            <div className="product-detaill mb-5">
              <div
                className="px-2 py-1"
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",

                  borderRadius: "8px",

                }}
              >
                <h4 className="product-title">{productData.pName}</h4>

                <div className="product-rating">
                  {/* <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star" />
                  <i className="fas fa-star-half-alt" /> */}
                  <span className="mb-0 px-2" style={{ backgroundColor: "#9c4399", color: "white", borderRadius: "5px" }}>{productData.rating} <BsStarFill className="mx-1" /></span>
                </div>
                <div className="product-price">
                  <p className="last-price " >
                    Old Price: <span className=" mb-3 fs-5 " >₹:{productData.discountPrice}</span>
                  </p>
                  <p className="new-price">
                    New Price: <span className=" mb-3 fs-5 " style={{ color: " #9c4399" }}>₹:{productData.price}</span>
                  </p>
                  <p className="">
                    Category: <span className="fw-bold " >{productData.subcategoryName}</span>
                  </p>
                </div>
              </div>


              <div className="product-detail py-3">
                {hasSizes && (
                  <div
                    className="px-2 py-1"
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",

                      borderRadius: "8px",

                    }}
                  >
                    <div className="d-flex ">
                      <div>
                        {hasSizes && <p><b>Size: </b></p>}

                        <div>
                          {availableSizes.map((size, index) => (
                            <>
                              <button
                                key={index}
                                style={{

                                  width: "54px",
                                  height: "32px",
                                  backgroundColor: selectedSizes[size] ? "#9c4399" : "white",
                                  border: "1px solid #ccc",
                                  fontWeight: "bold",
                                }}
                                className="me-1"
                                onClick={() => handleSizeClick(size)}
                              >
                                {size}
                              </button>
                            </>
                          ))}
                        </div>
                        {!isSizeSelected && <p style={{ color: "red", marginTop: "2px" }}>Please select a size before adding to the cart.</p>}

                        <Link
                          className="fw-bold text-success"
                          onClick={handleLinkClick}
                          type="button"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasRight"
                          aria-controls="offcanvasRight"
                          style={{ textDecoration: "underline" }}
                        >
                          {" "}
                          Size Chart
                        </Link>

                        <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                          <div className="offcanvas-header">
                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                          </div>
                          <div className="offcanvas-body">
                            <div className="mb-5">
                              <img
                                src={`http://193.203.162.218:4800/uploads/${sizeImg}`}
                                style={{ maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto" }}
                                alt="Your Alt Text"
                                onClick={() => handleImageClick(productData)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>



              <div
                className="px-2 py-1"
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                  borderRadius: "8px",
                }}
              > <b> Product Details: </b> &nbsp; {productData.details}
              </div>


              <div
                className="px-2 py-1 mt-3"
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                  borderRadius: "8px",
                }}
              > <BiSolidOffer size={20} fill="#9C4399" /> &nbsp; 1 Offer
                <p className="pt-2">
                  <span style={{ color: "#9C4399", fontWeight: "800" }}>FLAT 50% OFF </span>
                  <br />
                  Buy Any One Or More Product And Get Flat 50% Off
                </p>
              </div>



              <div className="purchase-info">
 
                <button type="button" className="btn" onClick={() => handleAddToCart(productData, hasSizes ? selectedSizesArray : null)}>
                  {hasSizes ? "Add to Cart" : "Add to Cart"} <i className="fas fa-shopping-cart" />
                </button>
                
              </div>

            </div>
          </div>
        </div>

      </div>






      <div className="container-fluid featurs py-4">
        <div className="px-5 py-5">
          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <div className="featurs-item text-center rounded bg-light p-4" style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}>
                <div className=" mb-2 mx-auto">
                  <TbTruckDelivery size={70} />

                </div>
                <div className="featurs-content text-center">
                  <h5 className='text-primary'>Standard Delivery</h5>
                  <div className="mb-0 text-primary">
                    <span>COD may be available*</span>
                    <p>Free shipping on orders above 1500</p>

                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4" >
              <div className="featurs-item text-center rounded bg-light p-4" style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}>
                <div className="mx-auto mb-3">
                  <RiStore2Fill size={60} />
                </div>
                <div className="featurs-content text-center">
                  <h5 className='text-primary'>Express Delivery available</h5>
                  <div className="mb-0 ">
                    <p>Please enter a pincode to check availability of express delivery at your location</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="featurs-item text-center rounded bg-light p-4" style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}>
                <div className="mx-auto mb-2">
                  <TbTruckReturn size={70} />
                </div>
                <div className="featurs-content text-center">
                  <h5 className='text-primary'> Express Store Pickup available
                  </h5>
                  <div className="mb-0 ">
                    <p>Please select size to see availability of this product at your nearest store
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>


    <h1 className="fw-bold mb-0">Continue Shoppimg</h1>


    {/* more product */}
    <div className="col-lg-12 px-4">
      <div className="mb-4">
        <ReactPaginate
          previousLabel={<MdKeyboardDoubleArrowLeft />}
          nextLabel={<MdKeyboardDoubleArrowRight />}
          pageCount={totalPages}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
      </div>

      <div className="row g-4 justify-content-center">
        {allproduct && allproduct.length > 0 &&
          allproduct

            .map((el) => {
              console.log("el", el)
              const truncatedName = el.pName.split(' ').slice(0, 2.8).join(' ');
              const isExpanded = expandedProduct === el._id;

              return <>

                <div className="col-md-3 col-sm-6">
                  <div className="product-grid">
                    <div className="product-image">
                      <Swiper
                        spaceBetween={30}
                        pagination={{ clickable: true }}
                        modules={[Navigation, Pagination]}
                        loop={true}
                        className="mySwiper"
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                      >
                        {el.pImg.map((image, index) => (
                          <SwiperSlide key={index} style={{ background: "#000", }}>
                            <img
                              src={`https://api.hindustanrides.in/uploads/${image}`}
                              alt={`Slide ${index + 1}`}
                              onClick={() => handleImageClick(el)}
                              style={{ objectFit: "cover", width: "100%", height: "100%" }}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                      <div
                        className="bg-secondary px-2 py-1 rounded position-absolute"
                        style={{
                          top: 10,
                          left: 10,
                          fontSize: "0.8rem",
                          zIndex: 1,
                          color: "#fff",
                        }}
                      >
                        {el.subcategoryName}
                      </div>
                      <ul className="product-links">
                        <li>
                          <a onClick={() => {
                            if (user) {
                              toggleWishlist(el);
                            } else {
                              toast.error(
                                <b>Please log in before adding to your wishlist.</b>
                              );
                            }
                          }}>
                            {whishlistItem.some(wishlistItem => wishlistItem._id === el._id) ? (
                              <BsHeartFill className="" style={{ cursor: "pointer" }} />
                            ) : (
                              <BsHeart className="" style={{ cursor: "pointer" }} />
                            )}
                          </a>
                        </li>
                        <li>
                          <a onClick={() => handleImageClick(el)} style={{ cursor: "pointer" }}>
                            <i className="fa fa-eye" />
                          </a>
                        </li>
                      </ul>



                      <div className="d-flex ">
                        <button
                          className="border-0 me-1 mr-2"
                          onClick={() => {

                            if (user) {
                              const isSizeDataAvailable =
                                (el.size &&
                                  el.size.length >
                                  0 &&
                                  el.size.some(
                                    (size) =>
                                      size.trim() !==
                                      "" &&
                                      size !== ""
                                  )) ||
                                (el.bottomSize &&
                                  el.bottomSize
                                    .length > 0 &&
                                  el.bottomSize.some(
                                    (size) =>
                                      size.trim() !==
                                      "" &&
                                      size !== ""
                                  )) ||
                                (el.shoesSize &&
                                  el.shoesSize
                                    .length > 0 &&
                                  el.shoesSize.some(
                                    (size) =>
                                      size.trim() !==
                                      "" &&
                                      size !== ""
                                  ));
                              if (
                                isSizeDataAvailable
                              ) {
                                openSizeModal(el);
                              } else {
                                handleAddToCart(el);
                              }
                            }
                            else {

                              // toast.error("Please log in before adding to cart");
                              toast.error(
                                <b>
                                  Please First Login  in before adding to cart.
                                </b>
                              )
                            }

                          }}
                        >
                          {/* <BsCart4 className="fs-4 text-danger" /> */}
                          <a className="add-to-cart">Add to Cart</a>
                        </button>
                        <button
                          className="border-0  me-1 ml-2"
                          style={{
                            marginLeft: "10px",
                            backgroundColor:
                              "#fff",
                          }}
                          onClick={() => {
                            if (user) {
                              toggleWishlist(el)
                            } else {
                              toast.error(
                                <b>
                                  Please First Login  in before adding to wishlist Your Product.
                                </b>
                              )
                            }
                          }

                          }
                        >

                        </button>
                      </div>
                      {el.size == [""] ||
                        el.bottomSize == [""] ||
                        el.shoesSize == [""] ? (
                        <button
                          className="border-0 me-1"
                          onClick={() =>
                            openSizeModal(el)
                          }
                        >
                          {/* <BsCart4 className="fs-4 text-danger" /> */}
                          <a className="add-to-cart ">Add to Cart</a>
                        </button>
                      ) : (
                        <>
                          {showSizeModal ? (
                            <>
                              <div
                                className="modal"
                                style={{
                                  display:
                                    showSizeModal
                                      ? "block"
                                      : "none",
                                  backgroundColor:
                                    "transparent",
                                  border: "none",
                                  position:
                                    "fixed",
                                  top: "50%",
                                  left: "50%",
                                  transform:
                                    "translate(-50%, -50%)",
                                }}
                              >
                                <div className="modal-dialog">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h4 className="modal-title">
                                        Select
                                        Size
                                      </h4>
                                      <Link
                                        type=""
                                        className="closemodal "
                                        onClick={
                                          closeSizeModal
                                        }
                                      >
                                        &times;
                                      </Link>
                                    </div>
                                    <div className="modal-body">
                                      <div style={{ color: "black" }}>
                                        {[
                                          ...selectedSizes.size,
                                          ...selectedSizes.bottomSize,
                                          ...selectedSizes.shoesSize,
                                        ].map(
                                          (
                                            item,
                                            index
                                          ) =>
                                            item &&
                                            item.trim() !==
                                            "" && (
                                              <button
                                                key={
                                                  index
                                                }
                                                style={{
                                                  width:
                                                    "40px",
                                                  height:
                                                    "40px",
                                                  border:
                                                    "1px solid #ccc",
                                                  backgroundColor:
                                                    Array.isArray(
                                                      selectedSizes.selectedSize
                                                    ) &&
                                                      selectedSizes.selectedSize.includes(
                                                        item
                                                      )
                                                      ? "#9c4399"
                                                      : "white", // Ensure selectedSize is an array and then check includes
                                                }}
                                                className="me-2 rounded-circle"
                                              // onClick={() =>
                                              //   handleSizeSelection(
                                              //     item
                                              //   )
                                              // }
                                              >
                                                {
                                                  item
                                                }
                                              </button>
                                            )
                                        )}
                                        <div
                                          style={{
                                            marginTop:
                                              "10px",
                                            color:
                                              "red",
                                          }}
                                        >
                                          {isSizeSelected
                                            ? ""
                                            : "Please select a size before adding to cart."}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="py-2 px-3">
                                      <Link
                                        onClick={() => {
                                          if (user) {

                                            handleAddToCart()
                                          }
                                          else {
                                            toast.error(
                                              <b>
                                                Please First Login  in before adding to cart.
                                              </b>
                                            )
                                          }

                                        }
                                        }
                                        disabled={
                                          !isSizeSelected
                                        }
                                        className="addtocartmodalbtn px-4 py-2"
                                      >
                                        Add to
                                        Cart
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {showSizeModal && (
                                <div className="overlay"></div>
                              )}
                            </>
                          ) : null}
                        </>
                      )}
                    </div>

                    <div className="product-content">
                      <div className="title-price-wrapper d-flex justify-content-between flex-lg-wrap" style={{ fontWeight: "bolder", color: "black" }}>
                        <div className="d-flex flex-column flex-sm-row">
                          <span className="d-flex">
                            <p className="mb-0 
                            px-2 
                            px-sm-1  
                            px-md-1  
                            px-lg-2  
                            px-xl-2  
                            px-xxl-2"
                              style={{ backgroundColor: 'black', color: 'white', borderRadius: "5px" }}>
                              {el.rating} <BsStarFill className="mx-1" />
                            </p>
                          </span>
                        </div>
                        <div className="price text-end fs-6 animated-price">Rs.{el.price}</div>
                      </div>

                      <div
                        className={`${isExpanded ? "text-secoundary cursor-pointer" : ""}`}
                        onClick={() => setExpandedProduct(isExpanded ? null : el._id)}
                        style={{ color: "#9c4399", marginTop: "2%", fontWeight: "bold", cursor: "pointer" }}
                      >
                        {isExpanded ? el.pName : `${truncatedName} ...`}
                      </div>
                    </div>



                  </div>
                </div>
              </>
            })}
      </div>
    </div>
    <Script />

  </>
}
export default ShopDetail