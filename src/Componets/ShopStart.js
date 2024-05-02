import React, { useEffect, useState } from "react";
import Script from "../Componets/Script/Script";
import { Link } from "react-router-dom";
import lodingImg from "../img/loading.gif";
import { useNavigate, useLocation } from "react-router-dom";
import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import '../../src/css/slick-theme.css';
import "../css/slick.css"
import '../../src/css/slick-theme-banner.css'
import allImg from "../img/allproduct.png"
import { get } from "animejs";

const API_URL = "https://api.hindustanrides.in/api/v1";

function ShopStart() {
  const [getCategory, setGetCategory] = useState([]);
  // const [getProduct, setGetProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Product");
  const [allSubcategory, setAllSubcategory] = useState([]);
  const [getProduct, setGetProduct] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingAll, setLoadingAll] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(12);
  // const [visibleCategories, setVisibleCategories] = useState(getCategory.slice(0, 3)); // Display only 3 categories initially
  // const remainingCategories = getCategory.slice(3); // Categories for the slider

  const productsPerPage = 12;


  const loadMoreAllProduct = () => {
    setVisibleProducts(prevVisibleProducts => prevVisibleProducts + 10); // Increment by 2 on each click
  };


  const loadMoreAllProductData = () => {
    setVisibleProducts(prevVisibleProducts => prevVisibleProducts + 10); // Increment by 2 on each click
  };




  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const subcategoryName = queryParams.get("subcategory");

  const handleCategoryClick = async (mainCategoryName) => {


    setSelectedCategory(mainCategoryName);
    setAllSubcategory([]);
    setLoadingCategory(true);
    await fetchData(mainCategoryName);

    // Remove 'active' class from all images first
    const categoryImages = document.querySelectorAll('.small-image');
    categoryImages.forEach(image => {
      image.classList.remove('active');
    });

    // Add 'active' class to the clicked image
    const clickedImage = document.querySelector(`img[alt="${mainCategoryName}"]`);
    console.log('clickedImage =>', clickedImage);

    clickedImage.classList.add('active');
  };


  const handleAllCatClick = async () => {
    setSelectedCategory(null);
    setLoadingAll(true);
    try {
      const response = await fetch(`${API_URL}/allSubacategoey`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

      });
      const data = await response.json();
      console.log('data =>', data);

      setAllSubcategory(data.result);

    } catch (error) {
      console.error("Error fetching all products:", error);
    } finally {
      setLoadingAll(false);
    }
  };




  const fetchData = async (mainCategoryName) => {
    setLoadingCategory(true);
    try {
      const response = await fetch(`http://localhost:4800/api/v1/subcategoryWiseGetData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mainCategoryName }),
      });
      const data = await response.json();
      console.log('dataddddddddddddd =>', data);

      if (mainCategoryName === "All Product") {
   
        setGetProduct(data.data);
      }

      setGetProduct(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingCategory(false);
    }
  };

  useEffect(() => {
    fetchgetData();
  }, []);


  useEffect(() => {
    handleAllCatClick();
  }, []);




  // const fetchgetData = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(`http://localhost:4800/api/v1/getcategorynotpage`);
  //     const data = await response.json();
  //     console.log('data =>', data);

  //     setGetCategory(data.result);

  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const fetchgetData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4800/api/v1/getcategorynotpage`);
      const data = await response.json();
      setGetCategory(data.result);
      
      // Find the category "All Product" and fetch data for it
      const allProductCategory = data.result.find(
        (category) => category.MaincategoryName === "All Product"
      );
      
      if (allProductCategory) {
        fetchData("All Product");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setVisibleProducts(12);
  }, [selectedCategory]);
  // Check if the number of categories is greater than 7
  // const shouldShowSlider = getCategory.length > 7;

  const settings = {
    // dots: true, // Show dots for navigation
    infinite: true, // Loop through slides infinitely
    speed: 500, // Transition speed in milliseconds
    slidesToShow: 6, // Number of slides to show at a time
    slidesToScroll: 1, // Number of slides to scroll at a time
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
          slidesToShow: 4,
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




  return (
    <>

      <div className="container-fluid fruite py-2">
        <div className="container ">
          <div className="tab-class text-center">
            <div className="col-lg-2 ">
              <h3 className="text-primary text-center">SubCategory</h3>
            </div>

            <div className="col-lg-12 d-xxl-block d-xl-block d-lg-block d-md-none d-sm-none d-none">
              {getCategory?.length > 0 && getCategory.map((el) => (
                console.log('getCategory =>', getCategory),

                <ul
                  key={el.id}
                  className="nav nav-pills d-inline-flex text-center mb-5"
                >
                  <li className="nav-item d-flex flex-column align-items-center">
                    <img
                      src={`https://api.hindustanrides.in/uploads/${el.categoryImg}`}
                      className={`rounded-image small-image ${selectedCategory === el.MaincategoryName ? "active" : ""}`}
                      alt={el.MaincategoryName}
                    />
                    <Link
                      className={`d-flex m-2 py-2 ${selectedCategory === el.MaincategoryName
                        ? "active"
                        : ""
                        }`}
                      data-bs-toggle="pill"
                      onClick={() =>
                        handleCategoryClick(el.MaincategoryName)
                      }
                    >
                      <span
                        className="fw-bold hovercolorchnage"
                        style={{ width: "90px" }}
                      >
                        {el.MaincategoryName}
                      </span>
                    </Link>
                  </li>
                </ul>
              ))}
            </div>

            <div className="col-lg-12 d-xxl-none d-xl-none  d-lg-none d-md-block d-sm-block d-block">
              <Slider {...settings}>
                {getCategory?.length > 0 && getCategory.map((el) => (
                  <ul
                    key={el.id}
                    className="nav nav-pills d-inline-flex text-center mb-5"
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
                        onClick={() =>
                          handleCategoryClick(el.MaincategoryName)
                        }
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

            <div className="tab-content">
              <div className="tab-pane fade show p-0 active">
                <div class="row ">
                  {loading && <div className="col-12 text-center my-3"></div>}
                  {selectedCategory === "All Product" ? (
                    <>
                      {Array.isArray(getProduct) && getProduct.slice(0, visibleProducts).map(
                        (product) => (
                          
                          (
                            <div
                              key={product.id}
                              class="col-xxl-2 col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6"
                            >
                              <div class="card">
                                <div class="image-container">
                                  <Link
                                    to={`/shop?mainCategory=${encodeURIComponent(product.mainCategoryName)}&subcategory=${encodeURIComponent(product.SubCateoryName)}`}
                                  >

                                    <img
                                      src={`https://api.hindustanrides.in/uploads/${product.subCatImg}`}
                                      alt={product.SubCateoryName}
                                      class="img-fluid rounded thumbnail-image"
                                    />{" "}
                                  </Link>
                                </div>

                                <div class="product-detail-container p-2">
                                  <div class="text-center">
                                    <h5 class="dress-name " style={{ textAlign: "ce" }}>
                                      {product.SubCateoryName}
                                    </h5>

                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        )
                      )}
                    </>
                  ) : (
                    <>
                      {getProduct.slice(0, visibleProducts).map(
                        (product) => (
                          console.log("product =>", getProduct),
                          (
                            <div
                              key={product.id}
                              class="col-xxl-2 col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6"
                            >
                              <div class="card">
                                <div class="image-container">
                                  <Link
                                    to={`/shop?subcategory=${encodeURIComponent(
                                      product.SubCateoryName
                                    )}`}
                                  >

                                    <img
                                      src={`https://api.hindustanrides.in/uploads/${product.subCatImg}`}
                                      alt={product.SubCateoryName}
                                      class="img-fluid rounded thumbnail-image"
                                    />{" "}
                                  </Link>
                                </div>

                                <div class="product-detail-container p-2">
                                  <div class="text-center">
                                    <h5 class="dress-name " style={{ textAlign: "ce" }}>
                                      {product.SubCateoryName}
                                    </h5>

                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        )
                      )}
                    </>
                  )}
                  {selectedCategory === null ? (

                    <>
                      {allSubcategory.length > visibleProducts && (
                        <div className="col-12 d-flex justify-content-center">
                          <button
                            onClick={loadMoreAllProduct}
                            className="mx-auto px-5 py-2 my-4 border-0 text-white"
                            style={{
                              background: "#9c4399",
                              borderRadius: "5px",
                              boxShadow:
                                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;",
                              // Make the button full-width
                            }}
                          >
                            Load More{" "}
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {getProduct.length > visibleProducts && (
                        <div className="col-12 d-flex justify-content-center">
                          <button
                            onClick={loadMoreAllProduct}
                            className="mx-auto d-block px-5 py-2 my-4 border-0 text-white"
                            style={{
                              background: "#9c4399",
                              borderRadius: "5px",
                              boxShadow:
                                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;",

                            }}
                          >
                            Load More{" "}
                          </button>
                        </div>
                      )}
                    </>)}
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div >

      <Script />
    </>
  );
}

export default ShopStart;
