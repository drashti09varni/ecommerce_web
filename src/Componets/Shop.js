

import React, { useEffect, useState } from "react";
import Script from "../Componets/Script/Script";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { BsCart4, BsStarFill } from "react-icons/bs";
import { useCart } from "../Componets/Context/CartContext";
import { useWishlist } from "./Context/WhishlistContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "../../src/css/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import toast from 'react-hot-toast';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles.css";
import fimg from "../img/banner3.png";
import simg from "../img/banner1.png";
import timg from "../img/banner2.png";
import fiimg from "../img/shoes 1.png";
import SixImg from "../img/jewellery 2.png"
import sevenomg from "../img/beauty...png"
import "../../src/css/modalShop.css";
import Spinner from "./Spinner";
import "../../src/css/card.css"
import StarRatings from 'react-star-ratings';
import 'swiper/css';
import 'swiper/css/pagination';
import { color } from "framer-motion";
import "../css/shopfirstslider.css"

import phonecloth from "../../src/img/cloth 01_upscayl_4x_realesrgan-x4plus.png"
import phonejwellery from "../../src/img/JEWELL.png"
import phonebeauty from "../../src/img/Mackup 01_upscayl_4x_realesrgan-x4plus.png"
// import { fontWeight } from "html2canvas/dist/types/css/property-descriptors/font-weight";

const API_URL = "https://api.hindustanrides.in/api/v1";

function Shop() {

  const user = localStorage.getItem('email');
  console.log('user =>', user);


  const [visibleProducts, setVisibleProducts] = useState(10); // Initial number of visible products to display
  const [visibleProductsOnHome, setVisibleProductsOnHome] = useState(10);
  const [visibleProductsOnSelect, setVisibleProductsOnSelect] = useState(10);
  const [showSpinner, setShowSpinner] = useState(true);

  const [searchParamsList, setSearchParams] = useSearchParams();
  const { addToCart, setCartItems, addToCartNotSize } = useCart();
  const { addToWishlist, whishlistItem, toggleWishlist } = useWishlist();

  const [count, setCount] = useState(0);
  const [getCategory, setGetCategory] = useState([]);
  const [getSubCategory, setSubCategory] = useState([]);
  const [selectedMainCategory, setSelectedMainCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState([]);
  const [allproduct, setAllProduct] = useState([]);
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);
  const [categoryNameParmas, setCategoryNamePrams] = useState([]);

  const [activeBreadcrumb, setActiveBreadcrumb] = useState('');
  const [selectedSorting, setSelectedSorting] = useState("select sorting");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSizeModal, setShowSizeModal] = useState(false);

  const [isSizeSelected, setIsSizeSelected] = useState(false);
  const [homeProduct, setHomeProduct] = useState([]);

  // const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // Add this state variable at the top of your component
  const [activeCategory, setActiveCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currPage = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState(currPage);
  const subcategory = searchParams.get("subcategory");
  console.log('subcategory =>', subcategory);

  const categorywisepage = searchParams.get("category");
  console.log('categorywisepage =>', categorywisepage);

  const categoryName = searchParams.get("categoryName");
  console.log('categoryName =>', categoryName);

  const subcategorywisepage = searchParams.get("subcategory");
  console.log('subcategorywisepage =>', subcategorywisepage);

  const [productCount, setProductCount] = useState(0);

  const [selectedSizes, setSelectedSizes] = useState({
    size: [],
    bottomSize: [],
    shoesSize: [],
  });

  const productsPerPage = 10;
  const productsPerPageOnHome = 10;
  const productsPerPageOnSelect = 10;

  const loadMoreAllProduct = () => {
    setVisibleProducts(prevVisibleProducts => prevVisibleProducts + productsPerPage); // Increment visible products by 10
  };

  const loadMoreOnHome = () => {
    setVisibleProductsOnHome(prevVisibleProducts => prevVisibleProducts + productsPerPageOnHome); // Increment visible products by 10
  };

  const loadMoreOnSelect = () => {
    setVisibleProductsOnSelect(prevVisibleProducts => prevVisibleProducts + productsPerPageOnSelect); // Increment visible products by 10
  };

  useEffect(() => {
    updateProductCount();
  }, [subcategorywisepage, productData]);

  const updateProductCount = () => {
    const filteredProducts = productData.filter(product => product.subcategoryName === subcategorywisepage);
    setProductCount(filteredProducts.length);
  };


  useEffect(() => {
    setTimeout(() => {
      setShowSpinner(false);
    }, 4000);
  }, []);


  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  const fetachCatParams = async (MaincategoryName, page) => {

    try {
      const response = await fetch(
        `${API_URL}/allcatwiseProductdata/${page}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            MaincategoryName,
          }),
        }
      );
      const data = await response.json();

      setTotalPages(data.totalPages);
      setCategoryNamePrams(data.result);
      // setCurrentPage(data.page);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (selectedMainCategory) {


      fetachCatParams(selectedMainCategory, currentPage);
    }
  }, [selectedMainCategory]);

  const openSizeModal = (el) => {
    setSelectedSizes(el);
    setShowSizeModal(true);
  };


  const closeSizeModal = () => {
    setShowSizeModal(false);
  };

  const handleSizeSelection = (item) => {
    setSelectedSizes((prevSelectedSizes) => {
      const newSelectedSizes = { ...prevSelectedSizes };
      newSelectedSizes.selectedSize = [item];
      const selected = Object.values(newSelectedSizes).some(
        (size) => size.length > 0
      );
      setIsSizeSelected(selected);
      return newSelectedSizes;
    });
  };



  const navigate = useNavigate();

  const handleImageClick = (productData) => {

    navigate(`/shopdetails?id=${productData._id}&cat=${productData.MaincategoryName}&sub=${productData.subcategoryName}`, {
      state: { productData: productData },
    });
  };

  const handleShopNowClick = (productData) => {

    navigate(`/shopdetails?id=${productData._id}`, {
      state: { productData: productData },
    });
  };

  const isItemInWishlist = (item) => {
    return whishlistItem.some((wishlistItem) => wishlistItem.id === item.id);
  };

  const handleAddToWhilist = (item) => {
    addToWishlist(item);
  };

  const fetchgetData = async () => {
    try {
      const response = await fetch(`http://localhost:4800/api/v1/getcategory/page=1?limit=5`);
      const data = await response.json();
      setGetCategory(data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (selectedMainCategory && selectedSubCategory) {

      fetchProductsBySubcategory(
        selectedMainCategory,
        selectedSubCategory
      );
    }
  }, [selectedMainCategory, selectedSubCategory]);

  const fetchgetSubData = async (MaincategoryName) => {
    console.log('MaincategoryName =>', MaincategoryName);

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/categorywiseSubcategory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ MaincategoryName }),
      });
      const data = await response.json();

      const finalData = data.data;

      setSubCategory(finalData);
      finalData.length > 0 && setSelectedSubCategory(finalData[0].SubCateoryName)
    } catch (error) {
      console.error("Error fetching subcategory data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsBySubcategory = async (
    mainCategoryName,
    subCategoryName,

  ) => {
    try {
      const response = await fetch(
        `https://api.hindustanrides.in/api/v1/subCategoryNamewiseProduct`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mainCategoryName,
            subCategoryName,
            sorting: selectedSorting,
            searchQuery: searchQuery.trim(),
          }),
        }
      );
      const data = await response.json();


      setProducts(data.result);
      setActiveBreadcrumb('subcategory');
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (selectedMainCategory) {
      fetchgetSubData(selectedMainCategory);
    }
  }, [selectedMainCategory]);

  const handleCategoryClick = (MaincategoryName) => {
    fetchgetSubData(MaincategoryName);
    setSelectedMainCategory(MaincategoryName);
    setActiveCategory(MaincategoryName);
    setSelectedSubCategory(null);
    setIsModalOpen(true);
    setSelectedCategory(selectedCategory === categoryName ? null : categoryName);


  };



  const handleSubCategoryClick = (subCategoryName) => {
    setSelectedSubCategory(subCategoryName);

    fetchProductsBySubcategory(
      selectedMainCategory,
      subCategoryName,
      currentPage
    );
    setActiveSubCategory(subCategoryName);
    localStorage.setItem('selectedSubCategory', subCategoryName);
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchgetData();
  }, []);

  useEffect(() => {
    const storedSubCategory = localStorage.getItem('selectedSubCategory');
    if (storedSubCategory) {
      setSelectedSubCategory(storedSubCategory);
    }
  }, []);

  const AllProduct = async () => {
    try {
      const response = await fetch(
        `https://api.hindustanrides.in/api/v1/getAllProductNotPage`
      );
      const data = await response.json();
      setProductData(data.result);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };



  useEffect(() => {
    AllProduct(currentPage);
  }, [currentPage]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `${API_URL}/serchallproduct?q=${searchQuery}`
      );
      const data = await response.json();

      if (data.result) {
        setAllProduct(data.result);
      } else {
        console.error("Data result is undefined:", data);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const fetchProductsByHomeSubcategory = async (SubCateoryName) => {
    try {
      const response = await fetch(
        `https://api.hindustanrides.in/api/v1/homeSubcategoryPrint`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",

          },
          body: JSON.stringify({
            subcategoryName: SubCateoryName,
          }),
        }
      );
      const data = await response.json();

      setHomeProduct(data.result);
      // setTotalPages(data.totalPages);
      // setCurrentPage(data.page)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (subcategory) {
      fetchProductsByHomeSubcategory(subcategory);
    }
  }, [subcategory]);



  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        setShowSpinner(true);
        if (subcategory) {
          let apiUrl = `https://api.hindustanrides.in/api/v1/subcatgeorywisedatacount/${subcategory}`;
          const response = await fetch(apiUrl);
          const data = await response.json();

          if (data.status === 'success') {
            setCount(data.data.count);
          } else {
            console.error('Error fetching count:', data.message);
          }
        } else if (categoryName) {
          let apiUrl = `https://api.hindustanrides.in/api/v1/mainCategorycount/${categoryName}`;
          const response = await fetch(apiUrl);
          const data = await response.json();

          if (data.status === 'success') {
            setCount(data.data.count);
          } else {
            console.error('Error fetching count:', data.message);
          }
        } else {
          // Fetch count for all products
          let apiUrl = `https://api.hindustanrides.in/api/v1/mainCategorycount`;
          const response = await fetch(apiUrl);
          const data = await response.json();

          if (data.status === 'success') {
            setCount(data.data.count);
          } else {
            console.error('Error fetching count:', data.message);
          }
        }
      } catch (error) {
        console.error('Error fetching count:', error.message);
        setCount(0);
      } finally {
        // setShowSpinner(false);
      }
    };

    fetchData();
  }, [subcategory, categoryName]);




  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const categoryNameFromURL = urlSearchParams.get('categoryName');

    if (categoryNameFromURL) {
      handleCategoryClick(categoryNameFromURL);
      setActiveCategory(categoryNameFromURL);
    }
  }, [location.search]);

  const handelshopNavigate = () => {
    navigate("/shop")
    window.location.reload()
  }

  const handleShopClick = () => {
    setActiveBreadcrumb('');
  };



  const handleAddToCart = (el) => {
    console.log('el =>', el);

    if (isSizeSelected) {
      console.log('isSizeSelected =>', isSizeSelected);

      addToCart(selectedSizes, selectedSizes.selectedSize);
      setShowSizeModal(false);
      // window.location.reload();
    }
    addToCartNotSize(el);
    // window.location.reload();
  };

  const NextArrow = ({ onClick }) => (
    <button className="slick-arrow slick-next" onClick={onClick}>
      Next
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button className="slick-arrow slick-prev" onClick={onClick}>
      Prev
    </button>
  );


  const settingss = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    variableWidth: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1400, // xxl screens
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 1200, // xl screens
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 992, // lg screens
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 768, // md screens
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 576, // sm screens
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 375, // xs screens
        settings: {
          slidesToShow: 3,
        },
      },
    ],

  };

  //star print
  const renderRating = (rating) => {
    let customRating = rating;
    if (rating % 1 !== 0) {
      // If the rating is not an integer (has a decimal part)
      customRating = Math.floor(rating) + 0.75; // Set the rating to be 0.75 more than the integer part
    }
    return customRating;
  };

  return (
    <>
      <>
        <div className="container-fluid">

          <div className="container col-lg-12 text-center d-xxl-block d-xl-block d-lg-block d-md-block d-sm-block d-none slider-container">
            <Slider {...settings}>
              <div className="page-header">
                <Link to="/shop?category=Women&subcategory=Kurtis">
                  <img
                    src={fimg}
                    className="img-fluid img-height-sm img-height-md img-height-lg img-height-xl img-height-xxl"
                    alt="First Slide"
                  />
                </Link>
              </div>
              <div className="page-header">
                <Link to="/shop?category=Electronics&subcategory=Headphone">
                  <img
                    src={SixImg}
                    className="img-fluid img-height-sm img-height-md img-height-lg img-height-xl img-height-xxl"
                    alt="Second Slide"
                  />
                </Link>
              </div>
              <div className="page-header">
                <Link to="/shop?category=Women&subcategory=Sarees">
                  <img
                    src={sevenomg}
                    className="img-fluid img-height-sm img-height-md img-height-lg img-height-xl img-height-xxl"
                    alt="Third Slide"
                  />
                </Link>
              </div>
              <div className="page-header">
                <Link to="/shop?category=Men&subcategory=Sneakers">
                  <img
                    src={fimg}
                    className="img-fluid img-height-sm img-height-md img-height-lg img-height-xl img-height-xxl"
                    alt="Fourth Slide"
                  />
                </Link>
              </div>
              <div className="page-header">
                <Link to="/shop?category=Men&subcategory=Jewellery">
                  <img
                    src={sevenomg}
                    className="img-fluid img-height-sm img-height-md img-height-lg img-height-xl img-height-xxl"
                    alt="Fifth Slide"
                  />
                </Link>
              </div>
              <div className="page-header">
                <Link to="/shop?category=Women&subcategory=Jewellery">
                  <img
                    src={SixImg}
                    className="img-fluid img-height-sm img-height-md img-height-lg img-height-xl img-height-xxl"
                    alt="Sixth Slide"
                  />
                </Link>
              </div>
            </Slider>
          </div>


          <div className="col-lg-12 text-center d-xxl-none d-xl-none d-lg-none d-md-none d-sm-none d-xs-none d-xxs-block d-block slider-container " style={{marginTop:"111px"}}>
            <Slider {...settings}>
              <div className="page-header">
                <Link to="/shop?category=Women&subcategory=Kurtis">
                  <img
                    src={phonecloth}
                    className="img-fluid img-height-sm img-height-md img-height-lg img-height-xl img-height-xxl img-height-xxs"
                    alt="First Slide"
                  />
                </Link>
              </div>
              <div className="page-header">
                <Link to="/shop?category=Electronics&subcategory=Headphone">
                  <img
                    src={phonejwellery}
                    className="img-fluid img-height-sm img-height-md img-height-lg img-height-xl img-height-xxl img-height-xxs"
                    alt="Second Slide"
                  />
                </Link>
              </div>
              <div className="page-header">
                <Link to="/shop?category=Women&subcategory=Sarees">
                  <img
                    src={phonebeauty}
                    className="img-fluid img-height-sm img-height-md img-height-lg img-height-xl img-height-xxl img-height-xxs"
                    alt="Third Slide"
                  />
                </Link>
              </div>
              
            </Slider>
          </div>




          {/* 768screen ti 375 screen */}

          {/* <div className="container">
            <Slider {...settings}>
              <div className="page-header">
                <Link to="/shop?category=Women&subcategory=Kurtis">
                  <img
                    src={fimg}
                    className="img-fluid img-height-sm img-height-md img-height-lg img-height-xl img-height-xxl"
                    alt="First Slide"
                  />
                </Link>
              </div>
              <div className="page-header">
                <Link to="/shop?category=Electronics&subcategory=Headphone">
                  <img
                    src={SixImg}
                    className="img-fluid img-height-sm img-height-md img-height-lg img-height-xl img-height-xxl"
                    alt="Second Slide"
                  />
                </Link>
              </div>
              <div className="page-header">
                <Link to="/shop?category=Women&subcategory=Sarees">
                  <img
                    src={sevenomg}
                    className="img-fluid img-height-sm img-height-md img-height-lg img-height-xl img-height-xxl"
                    alt="Third Slide"
                  />
                </Link>
              </div>
              <div className="page-header">
                <Link to="/shop?category=Men&subcategory=Sneakers">
                  <img
                    src={fimg}
                    className="img-fluid img-height-sm img-height-md img-height-lg img-height-xl img-height-xxl"
                    alt="Fourth Slide"
                  />
                </Link>
              </div>
              <div className="page-header">
                <Link to="/shop?category=Men&subcategory=Jewellery">
                  <img
                    src={sevenomg}
                    className="img-fluid img-height-sm img-height-md img-height-lg img-height-xl img-height-xxl"
                    alt="Fifth Slide"
                  />
                </Link>
              </div>
              <div className="page-header">
                <Link to="/shop?category=Women&subcategory=Jewellery">
                  <img
                    src={SixImg}
                    className="img-fluid img-height-sm img-height-md img-height-lg img-height-xl img-height-xxl"
                    alt="Sixth Slide"
                  />
                </Link>
              </div>
            </Slider>
          </div> */}
        </div>

        <div className="container-fluid fruite" id="shopfirstslider">
          <div className="container ">
            <div className="row g-4 d-flex " >

              <div className="col-lg-12 text-center d-xxl-block d-xl-block d-lg-block d-md-none d-sm-none d-none mt-lg-4 mt-md-5">
                <ul className="nav nav-pills d-inline-flex text-center justify-content-center">
                  {getCategory?.length > 0 && getCategory.map((el) => (
                    <li key={el.id} className="nav-item d-flex flex-column align-items-center">
                      <img
                        src={`https://api.hindustanrides.in/uploads/${el.categoryImg}`}
                        className={`rounded-image small-image ${selectedCategory === el.MaincategoryName ? "active" : ""}`}
                        alt={el.MaincategoryName}
                      />
                      <Link
                        className={`d-flex m-2 py-2 ${selectedCategory === el.MaincategoryName ? "active" : ""}`}
                        data-bs-toggle="pill"
                        onClick={() => handleCategoryClick(el.MaincategoryName)}
                      >
                        <span className="fw-bold hovercolorchange" style={{ width: '90px' }}>
                          {el.MaincategoryName}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Second section for smaller screens */}
              <div className="col-lg-12 text-center d-xxl-none d-xl-none d-lg-none d-md-block d-sm-block d-block mt-md-5 mt-sm-and-below">
                <Slider {...settingss}>
                  {getCategory?.length > 0 && getCategory.map((el) => (
                    <ul
                      key={el.id}
                      className="nav nav-pills d-inline-flex text-center"
                    >
                      <li className="nav-item d-flex flex-column align-items-center" style={{ cursor: "pointer" }}>
                        <img
                          src={`https://api.hindustanrides.in/uploads/${el.categoryImg}`}
                          className="rounded-image " style={{ width: "62px" }}
                          alt={el.MaincategoryName}
                        />

                        <Link
                          className={`d-flex mt-2 py-2 ${selectedCategory === el.MaincategoryName
                            ? "active"
                            : ""
                            }`}
                          data-bs-toggle="pill"
                          onClick={() => handleCategoryClick(el.MaincategoryName)}
                        >
                          <span
                            className="fw-bold hovercolorchnage "
                            style={{ width: "90px", marginTop: "-10px" }}
                          >
                            {el.MaincategoryName}
                          </span>
                        </Link>
                      </li>
                    </ul>
                  ))}
                </Slider>
              </div>



              {isModalOpen && (
                <div
                  className="mb-5 "
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {selectedMainCategory && (
                    <div
                      className="subcategories-container rounded box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;"
                      style={{
                        backgroundColor: "#fff",
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(150px, 1fr))",
                        gap: "10px",
                        justifyContent: "space-between",
                        border: "5px solid #9c4399",
                        padding: "10px",
                      }}
                    >
                      {loading ? (
                        <p>Loading...</p>
                      ) : (
                        <ul
                          className="dropdown-subcategories list-unstyled mb-0"
                          style={{
                            display: "grid",
                            gridTemplateColumns:
                              "repeat(auto-fit, minmax(150px, 1fr))",
                            gap: "10px",
                          }}
                        >


                          {getSubCategory.map((subCategory) => (
                            <>
                              <Link
                                to={`/shop?category=${encodeURIComponent(
                                  selectedMainCategory
                                )}&subcategory=${encodeURIComponent(
                                  subCategory.SubCateoryName
                                )}`}
                                className="subcategories-link"
                              >
                                <li
                                  key={subCategory._id}
                                  className={`subCategoryItem px-2 category-info ${activeSubCategory ===
                                    subCategory.SubCateoryName
                                    ? "active-subcategory"
                                    : ""
                                    }`}
                                  onClick={() =>
                                    handleSubCategoryClick(
                                      subCategory.SubCateoryName
                                    )
                                  }
                                >
                                  {subCategory.SubCateoryName}
                                </li>
                              </Link>
                            </>
                          ))}
                        </ul>
                        // </Link>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div class="row g-4 mt-3">
                <div class="col-12 col-md-6 col-lg-3">
                  <div class="input-group mx-auto">
                    <input
                      type="search"
                      class="form-control p-3"
                      placeholder="Search keywords"
                      aria-describedby="search-icon-1"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <span
                      id="search-icon-1"
                      class="input-group-text p-3"
                      onClick={handleSearch}
                    >
                      <i class="fa fa-search" />
                    </span>
                  </div>
                </div>

                <div class="d-none d-md-block col-md-6 col-lg-6"></div>

                <div class="col-12 col-md-6 col-lg-3">
                  <div class="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                    <label for="sorting-select">Sorting:</label>
                    <select
                      id="sorting-select"
                      name="sorting"
                      class="form-select form-select-sm border-0 bg-light me-3"
                      value={selectedSorting}
                      onChange={(e) => setSelectedSorting(e.target.value)}
                    >
                      <option value="select sorting">Select Sorting</option>
                      <option value="high to low">High to Low</option>
                      <option value="low to high">Low to High</option>
                    </select>
                  </div>
                </div>
              </div>


              <div className="" style={{ marginTop: "-22px" }}>
                <div className="col-xl-3 py-3">
                  <div className="input-group w-100 mx-auto d-flex">
                    <p className="fw-bold position-relative">
                      {subcategory ? (
                        <>
                          {categorywisepage} &nbsp;for &nbsp;{subcategory}   &nbsp;:&nbsp;
                          <span
                            className="position-absolute   d-flex align-items-center justify-content-center px-1"
                            style={{ height: '30px', width: '30px', top: '50%', left: '110%', transform: 'translate(-50%, -50%)', color: "#9c4399" }}
                          >
                            <b> {count}</b>
                          </span>
                        </>
                      ) : categoryName ? (
                        <>
                          {categoryName} &nbsp; : &nbsp;&nbsp;
                          <span
                            className="position-absolute   d-flex align-items-center justify-content-center px-1"
                            style={{ height: '30px', width: '30px', top: '50%', left: '110%', transform: 'translate(-50%, -50%)', color: "#9c4399" }}
                          >
                            <b> {count}</b>
                          </span>
                        </>
                      ) : (
                        <>
                          All Product  &nbsp;: &nbsp;&nbsp;
                          <span
                            className="position-absolute   d-flex align-items-center justify-content-center px-1"
                            style={{ height: '30px', width: '30px', top: '50%', left: '110%', transform: 'translate(-50%, -50%)', fontWeight: "bold", color: "#9c4399" }}
                          >
                            <b> {count}</b>
                          </span>
                        </>
                      )}

                    </p>
                  </div>
                </div>

                <div className="col-6" /></div>

              <div className="" style={{ marginTop: "-19px" }}>
                {selectedMainCategory ? (
                  <>
                    <div className="col-lg-12" >
                      <div className="row g-4 justify-content-center" >
                        {products &&
                          products.length > 0 &&
                          products
                            .slice()
                            .sort((a, b) => {
                              if (selectedSorting === "high to low") {
                                return b.price - a.price;
                              } else if (selectedSorting === "low to high") {
                                return a.price - b.price;
                              }
                              return 0;
                            })
                            .slice(0, visibleProductsOnSelect).map((el) => {
                              const truncatedName = el.pName
                                .split(" ")
                                .slice(0, 2.8)
                                .join(" ");
                              const isExpanded = expandedProduct === el._id;

                              return (
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
                                              src={`https:api.hindustanrides.in/uploads/${image}`}
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

                                              toast.error("Please log in before adding to cart");
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
                                                                      : "white",
                                                                }}
                                                                className="me-2 rounded-circle"
                                                                onClick={() =>
                                                                  handleSizeSelection(
                                                                    item
                                                                  )
                                                                }
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
                                                 px-sm-1  /* Adjusting px-2 for sm screens */
                                                 px-md-1  /* Adjusting px-2 for md screens */
                                                 px-lg-2  /* Keeping px-2 for lg screens */
                                                 px-xl-2  /* Keeping px-2 for xl screens */
                                                 px-xxl-2"  /* Keeping px-2 for xxl screens */
                                              style={{ backgroundColor: 'black', color: 'white', borderRadius: "5px" }}>
                                              {el.rating} <BsStarFill className="mx-1" />
                                            </p>
                                          </span>
                                        </div>
                                        <div className="price text-end fs-6 animated-price">Rs.{el.price}</div>
                                      </div>

                                      <div
                                        className={`${isExpanded
                                          ? "text-secoundary cursor-pointer"
                                          : ""
                                          }`}
                                        onClick={() =>
                                          setExpandedProduct(
                                            isExpanded
                                              ? null
                                              : el._id
                                          )
                                        }
                                        style={{ color: "#9c4399", marginTop: "2%", fontWeight: "bold", cursor: "pointer" }}
                                      >
                                        {isExpanded
                                          ? el.pName
                                          : `${truncatedName} ...`}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {searchQuery && allproduct.length > 0 ? (
                      <>
                        <div className="col-lg-12">
                          <div className="row g-4 justify-content-center">
                            {allproduct
                              .slice()
                              .sort((a, b) => {
                                if (selectedSorting === "high to low") {
                                  return b.price - a.price;
                                } else if (
                                  selectedSorting === "low to high"
                                ) {
                                  return a.price - b.price;
                                }
                                return 0;
                              })
                              .map((el) => {
                                const truncatedName = el.pName
                                  .split(" ")
                                  .slice(0, 2.8)
                                  .join(" ");
                                const isExpanded = expandedProduct === el._id;

                                return (

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
                                                src={`https:api.hindustanrides.in/uploads/${image}`}
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

                                                toast.error("Please log in before adding to cart");
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
                                                                        : "white",
                                                                  }}
                                                                  className="me-2 rounded-circle"
                                                                  onClick={() =>
                                                                    handleSizeSelection(
                                                                      item
                                                                    )
                                                                  }
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
                                                   px-sm-1  /* Adjusting px-2 for sm screens */
                                                   px-md-1  /* Adjusting px-2 for md screens */
                                                   px-lg-2  /* Keeping px-2 for lg screens */
                                                   px-xl-2  /* Keeping px-2 for xl screens */
                                                   px-xxl-2"  /* Keeping px-2 for xxl screens */
                                                style={{ backgroundColor: 'black', color: 'white', borderRadius: "5px" }}>
                                                {el.rating} <BsStarFill className="mx-1" />
                                              </p>
                                            </span>
                                          </div>
                                          <div className="price text-end fs-6 animated-price">Rs.{el.price}</div>
                                        </div>

                                        <div
                                          className={`${isExpanded
                                            ? "text-secoundary cursor-pointer"
                                            : ""
                                            }`}
                                          onClick={() =>
                                            setExpandedProduct(
                                              isExpanded
                                                ? null
                                                : el._id
                                            )
                                          }
                                          style={{ color: "#9c4399", marginTop: "2%", fontWeight: "bold", cursor: "pointer" }}
                                        >
                                          {isExpanded
                                            ? el.pName
                                            : `${truncatedName} ...`}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="col-lg-12">
                          <div className="row g-4 justify-content-center">
                            {subcategory ? (
                              <>
                                {homeProduct &&
                                  homeProduct
                                    .sort((a, b) => {
                                      if (selectedSorting === "high to low") {
                                        return b.price - a.price;
                                      } else if (
                                        selectedSorting === "low to high"
                                      ) {
                                        return a.price - b.price;
                                      }
                                      return 0;
                                    })
                                    .slice(0, visibleProductsOnHome).map((el) => {
                                      const truncatedName = el.pName
                                        .split(" ")
                                        .slice(0, 2.8)
                                        .join(" ");
                                      const isExpanded =
                                        expandedProduct === el._id;

                                      return (
                                        <>
                                          {/* change code */}
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
                                                        src={`https:api.hindustanrides.in/uploads/${image}`}
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

                                                        toast.error("Please log in before adding to cart");
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
                                                                                : "white",
                                                                          }}
                                                                          className="me-2 rounded-circle"
                                                                          onClick={() =>
                                                                            handleSizeSelection(
                                                                              item
                                                                            )
                                                                          }
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
                                                                 px-sm-1  /* Adjusting px-2 for sm screens */
                                                                 px-md-1  /* Adjusting px-2 for md screens */
                                                                 px-lg-2  /* Keeping px-2 for lg screens */
                                                                 px-xl-2  /* Keeping px-2 for xl screens */
                                                                 px-xxl-2"  /* Keeping px-2 for xxl screens */
                                                        style={{ backgroundColor: 'black', color: 'white', borderRadius: "5px" }}>
                                                        {el.rating} <BsStarFill className="mx-1" />
                                                      </p>
                                                    </span>
                                                  </div>
                                                  <div className="price text-end fs-6 animated-price">Rs.{el.price}</div>
                                                </div>

                                                <div
                                                  className={`${isExpanded
                                                    ? "text-secoundary cursor-pointer"
                                                    : ""
                                                    }`}
                                                  onClick={() =>
                                                    setExpandedProduct(
                                                      isExpanded
                                                        ? null
                                                        : el._id
                                                    )
                                                  }
                                                  style={{ color: "#9c4399", marginTop: "2%", fontWeight: "bold", cursor: "pointer" }}
                                                >
                                                  {isExpanded
                                                    ? el.pName
                                                    : `${truncatedName} ...`}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      );
                                    })}
                              </>
                            ) : (
                              <>
                                {showSpinner ? <Spinner /> : (
                                  <>
                                    {productData &&
                                      productData
                                        .sort((a, b) => {
                                          if (selectedSorting === "high to low") {
                                            return b.price - a.price;
                                          } else if (
                                            selectedSorting === "low to high"
                                          ) {
                                            return a.price - b.price;
                                          }
                                          return 0;
                                        })
                                        .slice(0, visibleProducts).map((el) => {
                                          console.log('elRtaing =>', el.rating);

                                          const truncatedName = el.pName
                                            .split(" ")
                                            .slice(0, 2.8)
                                            .join(" ");
                                          const isExpanded =
                                            expandedProduct === el._id;

                                          return (
                                            <>

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
                                                            src={`https:api.hindustanrides.in/uploads/${image}`}
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

                                                            toast.error("Please log in before adding to cart");
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
                                                                                    : "white",
                                                                              }}
                                                                              className="me-2 rounded-circle"
                                                                              onClick={() =>
                                                                                handleSizeSelection(
                                                                                  item
                                                                                )
                                                                              }
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
                                                                 px-sm-1  /* Adjusting px-2 for sm screens */
                                                                 px-md-1  /* Adjusting px-2 for md screens */
                                                                 px-lg-2  /* Keeping px-2 for lg screens */
                                                                 px-xl-2  /* Keeping px-2 for xl screens */
                                                                 px-xxl-2"  /* Keeping px-2 for xxl screens */
                                                            style={{ backgroundColor: 'black', color: 'white', borderRadius: "5px" }}>
                                                            {el.rating} <BsStarFill className="mx-1" />
                                                          </p>
                                                        </span>
                                                      </div>
                                                      <div className="price text-end fs-6 animated-price">Rs.{el.price}</div>
                                                    </div>

                                                    <div
                                                      className={`${isExpanded
                                                        ? "text-secoundary cursor-pointer"
                                                        : ""
                                                        }`}
                                                      onClick={() =>
                                                        setExpandedProduct(
                                                          isExpanded
                                                            ? null
                                                            : el._id
                                                        )
                                                      }
                                                      style={{ color: "#9c4399", marginTop: "2%", fontWeight: "bold", cursor: "pointer" }}
                                                    >
                                                      {isExpanded
                                                        ? el.pName
                                                        : `${truncatedName} ...`}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </>
                                          );
                                        })}
                                  </>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>



            </div>
          </div>
        </div>

      </>

      {
        searchParams.size === 0 && productData.length > visibleProducts && (
          <button onClick={loadMoreAllProduct} className="mx-auto d-block px-5 py-2 my-4 border-0 text-white"
            style={{ background: "#9c4399", borderRadius: "5px", boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;" }}>
            Load More {categoryName}</button>
        )
      }


      {
        searchParams.size === 1 && homeProduct.length > visibleProductsOnHome && (
          <button onClick={loadMoreOnHome} className="mx-auto d-block px-5 py-2 my-4 border-0 text-white"
            style={{ background: "#9c4399", borderRadius: "5px", boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;" }}>
            Load More {subcategory} </button>
        )
      }


      {
        searchParams.size === 2 && products.length > visibleProductsOnSelect && (
          <button onClick={loadMoreOnSelect} className="mx-auto d-block px-5 py-2 my-4 border-0 text-white"
            style={{ background: "#9c4399", borderRadius: "5px", boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;" }}>
            Load More on select </button>
        )
      }


      <Script />
    </>
  );
}
export default Shop;
