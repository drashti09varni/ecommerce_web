// CartContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsCart4 } from "react-icons/bs";
import { BsHeart, BsHeartFill } from 'react-icons/bs';


const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [whishlistItem, setWishlistItem] = useState(
    localStorage.getItem('whishlistItem')
      ? JSON.parse(localStorage.getItem('whishlistItem')).map(item => ({ ...item, isInWishlist: true }))
      : []
  );
  

  const addToWishlist = (item) => {
    const isItemInCart = whishlistItem.find((cartItem) => cartItem._id === item._id);
  
    if (isItemInCart) {
      // Item is already in the wishlist
      setWishlistItem(
        whishlistItem.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
      toast.success("Quantity updated in the wishlist.", { icon: <BsHeartFill /> });
    } else {
      // Item is not in the wishlist
      setWishlistItem([...whishlistItem, { ...item, quantity: 1, isInWishlist: true }]);
      toast.success("Added your product to the wishlist.", { icon: <BsHeartFill /> });
    }
  };
  

    // const removeFromWishlist = (item) => {
    //     const isItemInCart = whishlistItem.find((cartItem) => cartItem._id === item._id);
    
    //     if (isItemInCart.quantity === 1) {
    //       setWishlistItem(whishlistItem.filter((cartItem) => cartItem._id !== item._id));
    //     } else {
    //       setWishlistItem(
    //         whishlistItem.map((cartItem) =>
    //           cartItem.id === item.id
    //             ? { ...cartItem, quantity: cartItem.quantity - 1 }
    //             : cartItem
    //         )
    //       );
    //     }
    //   };
    
    const removeFromWishlist = (item) => {
      setWishlistItem(whishlistItem.filter((wishlistItem) => wishlistItem._id !== item._id));
      toast.success("Removed from wishlist.", { icon: <BsHeart /> });
   };

      const clearCart = () => {
        setWishlistItem([]);
      };

      const toggleWishlist = (item) => {
        const isItemInWishlist = whishlistItem.some((wishlistItem) => wishlistItem._id === item._id);
     
        if (isItemInWishlist) {
           removeFromWishlist(item);
        } else {
           addToWishlist(item);
        }
     };

    
      const getCartTotal = () => {
        return whishlistItem.reduce((total, item) => total + item.price * item.quantity, 0);
      };
    
      useEffect(() => {
        localStorage.setItem("whishlistItem", JSON.stringify(whishlistItem));
      }, [whishlistItem]);
    
      useEffect(() => {
        const whishlistItem = localStorage.getItem("whishlistItem");
        if (whishlistItem) {
          setWishlistItem(JSON.parse(whishlistItem));
        }
      }, []);



    const value = {
        addToWishlist,
        whishlistItem,
        removeFromWishlist,
        clearCart,
        getCartTotal,
        toggleWishlist
    };

    return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
    return useContext(WishlistContext);
};
