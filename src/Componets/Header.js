import React, { useEffect, useState } from 'react';
import Script from '../Componets/Script/Script';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { IoMdHeartEmpty } from 'react-icons/io';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { useCart } from '../Componets/Context/CartContext';
import { PiUserCircleLight } from 'react-icons/pi';
import { useWishlist } from './Context/WhishlistContext';
import anime from 'animejs';
import Slider from 'react-infinite-logo-slider';
import Login from './Login';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import toast from 'react-hot-toast';
import RoutNotmatch from './RoutNotmatch';
import logoImg from '../img/Group34 (1).png';
import { CgProfile } from "react-icons/cg";
import OrderHistory from './OrderHistory';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import "../css/Header.css"

// import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  const { cartItems } = useCart();
  const { whishlistItem } = useWishlist();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showOrderHistory, setShowOrderHistory] = useState(false);

  const location = useLocation()
  console.log("location.pathname,", location.pathname)
  const navigate = useNavigate();
  const [saleText, setSaleText] = useState(
    'Fashion SALE 🛍️         '.repeat(60).split(' ').join('\u00A0')
  );
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(
    localStorage.getItem('email') !== null
  );

  const handleIconClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOrderHistoryClick = () => {
    setShowOrderHistory(true);
  };

  const userEmail = localStorage.getItem('email');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
    });

    const animation = anime({
      duration: 20000,
      loop: true,
      easing: 'linear',
      direction: 'reverse'
    });

    return () => {
      unsubscribe();
      animation.pause();
      animation.seek(0);
      animation.remove();
    };
  }, []);

  const handleLoginClick = () => {
    setLoginOpen(true);
  };

  const closeLogin = () => {
    setLoginOpen(false);
  };

  const handleLogoutClick = () => {
    const auth = getAuth();
    auth
      .signOut()
      .then(() => {
        localStorage.removeItem('email');
        toast.success(<b>Logout successful!</b>);
        setLoggedIn(false);
        navigate('/');
      })
      .catch((error) => {
        console.error('Logout Error:', error);
      });
  };

  const handleCartClick = () => {
    if (userEmail) {
      navigate('/cart');
    } else {
      toast.error(<b>Please log in first to view your cart!</b>);
    }
  };

  const handlewhishlistClick = () => {
    if (userEmail) {
      navigate('/whishlist');
    } else {
      toast.error(<b>Please log in first to view your cart!</b>);
    }
  };

  const route = userEmail ? '/cart' : 'null';

  return (
    <>
      <div
        id="spinner"
        className="show w-100 vh-100 bg-white position-fixed translate-middle top-50 start-50 d-flex align-items-center justify-content-center"
      >
        <div className="spinner-grow text-primary" role="status" />
      </div>

      <div className="container-fluid fixed-top shadow">
        <div className="container topbar bg-primary d-none d-lg-block">
          <div className="d-flex justify-content-between">
            <div className="top-info ps-2 container">
              <marquee
                className="marq"
                bgcolor=""
                direction="left"
                loop=""
              >
                <div className="text-light py-1">
                  <b>{saleText} </b>
                </div>
              </marquee>
            </div>
          </div>
        </div>

        <div className="container px-0">
          <nav className="navbar navbar-expand-md navbar-light bg-white navbar-custom ">
            <div className="container">
              <Link className="navbar-brand">
                <img src={logoImg} style={{ width: '56%' }} alt="Logo" />
              </Link>


              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
              </button>


              <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                <ul className="navbar-nav custom-navbar-nav">
                  <li className="nav-item">
                    <NavLink to="/" exact className={`nav-link fw-bold fs-5 ${location.pathname === '/' ? 'active' : ''}`}>Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/shop" className={`nav-link fw-bold fs-5 ${location.pathname === '/shop' ? 'active' : ''}`}>Shop</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/contact" className={`nav-link fw-bold fs-5 ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</NavLink>
                  </li>
                </ul>
                <div className="d-flex">
                  <Link
                    to={userEmail ? '/cart' : '/routenotmatch'}
                    className="position-relative me-4 my-auto"
                  >
                    <HiOutlineShoppingBag className="fs-4" />
                    <span
                      className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                      style={{
                        top: '-5px',
                        left: 15,
                        height: 20,
                        minWidth: 20
                      }}
                    >
                      {cartItems.length}
                    </span>
                  </Link>

                  <Link
                    to={userEmail ? '/whishlist' : '/routenotmatch'}
                    className="position-relative me-4 my-auto"
                  >
                    <IoMdHeartEmpty className="fs-4" />
                    <span
                      className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                      style={{
                        top: '-5px',
                        left: 15,
                        height: 20,
                        minWidth: 20
                      }}
                    >
                      {whishlistItem.length}
                    </span>
                  </Link>

                  <Dropdown className="position-relative mt-1">
                    <Dropdown.Toggle
                      variant="light"
                      id="dropdown-basic"
                      className="p-0 d-flex align-items-center justify-content-center"
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        boxShadow: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <CgProfile className="fs-4" style={{ color: "#333" }} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className='mt-4'>
                      <Dropdown.Item onClick={handleOrderHistoryClick}>
                        Order History
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item href="/logout">Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  <Link
                    to={route}
                    className="position-relative me-4 my-auto"
                  >
                    {isLoggedIn ? (
                      <button
                        className="btn py-1 px-3"
                        style={{
                          backgroundColor: 'black',
                          color: 'white',
                          cursor: 'pointer'
                        }}
                        onClick={handleLogoutClick}
                      >
                        Logout
                      </button>
                    ) : (
                      <button
                        className="btn py-1 px-3"
                        style={{
                          backgroundColor: 'black',
                          color: 'white',
                          cursor: 'pointer'
                        }}
                        onClick={handleLoginClick}
                      >
                        Login
                      </button>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
      {isLoginOpen && (
        <Login
          onClose={closeLogin}
          isLoginOpen={isLoginOpen}
          setLoginOpen={setLoginOpen}
        />
      )}
    
      <OrderHistory
        showOffcanvas={showOrderHistory}
        handleCloseOffcanvas={() => setShowOrderHistory(false)}
      />
      <Script />
    </>

  );
}

export default Header;




