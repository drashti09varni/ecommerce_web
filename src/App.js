import logo from './logo.svg';
import './App.css';
import Header from './Componets/Header';
import Rou from './Componets/Routes/Routes'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './Componets/Footer';
import { ToastContainer } from 'react-toastify';
import { CartProvider } from './Componets/Context/CartContext';
import { WishlistProvider } from "./Componets/Context/WhishlistContext"
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from "./Componets/Context/AuthContext"
import { nlNL } from 'rsuite/esm/locales';
import toast from 'react-hot-toast';
import RoutNotmatch from '../src/Componets/RoutNotmatch'




function App() {

  const userEmail = localStorage.getItem('email');
  console.log('userEmail =>', userEmail);


  return (
    <div className="App">
      <>
        <BrowserRouter>
          <CartProvider>
            <WishlistProvider>
              <AuthProvider>
                <Header />
                <Toaster position="top-center" reverseOrder={false} />
                <ToastContainer closeButton={true} position="bottom-left" />
                {/* <Routes> */}
                {/* {Rou.map((value, i) => {
                  return <Route key={i} path={value.path} exact={value.exact} element={<value.element />}></Route>
                }
                )} */}




                <Routes>
                  {Rou.map((value, i) => (
                    <Route
                      key={i}
                      path={value.path}
                      exact={value.exact}
                      element={
                        // Check if the route requires authentication and if user is authenticated
                        value.requiresAuth && !userEmail ? (
                          // Redirect to the login page if the user is not authenticated and no email is in localStorage

                          <RoutNotmatch />
                        ) : (
                          // Allow access to the cart and checkout routes even if the user is not authenticated but has an email in localStorage
                          (value.path === '/cart' || value.path === '/checkout') && !userEmail ? (
                            <RoutNotmatch />
                          ) : (
                            <value.element />
                          )
                        )
                      }
                    />
                  ))}
                </Routes>
                <Footer/>
              </AuthProvider>
            </WishlistProvider>
          </CartProvider>
        </BrowserRouter>
      </>
    </div>
  );
}

export default App;
