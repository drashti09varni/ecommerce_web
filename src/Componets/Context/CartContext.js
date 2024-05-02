// // CartContext.js
// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { BsCart4 } from "react-icons/bs";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//     const [cartItems, setCartItems] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])

//     const addToCart = (item) => {
//         const isItemInCart = cartItems.find((cartItem) => cartItem._id === item._id);

//         if (isItemInCart) {
//             setCartItems(
//                 cartItems.map((cartItem) =>
//                     cartItem._id === item._id
//                         ? { ...cartItem, quantity: cartItem.quantity + 1 }
//                         : cartItem
//                 )
//             );
//             toast.success("Quantity updated in the cart.", { icon: <BsCart4 /> });
//         } else {
//           setCartItems([...cartItems, { ...item, quantity: 1 }]);
//             toast.success("Added your product in  cart.", { icon: <BsCart4 /> });
//         }
//     };

//     const removeFromCart = (item) => {
//         const isItemInCart = cartItems.find((cartItem) => cartItem._id === item._id);
    
//         if (isItemInCart.quantity === 1) {
//           setCartItems(cartItems.filter((cartItem) => cartItem._id !== item._id));
//         } else {
//           setCartItems(
//             cartItems.map((cartItem) =>
//               cartItem.id === item.id
//                 ? { ...cartItem, quantity: cartItem.quantity - 1 }
//                 : cartItem
//             )
//           );
//         }
//       };
    
//       const clearCart = () => {
//         setCartItems([]);
//       };
    
//       const getCartTotal = () => {
//         return cartItems.reduce((total, item) => total + item.price , 0);
//       };
      
    
//       useEffect(() => {
//         localStorage.setItem("cartItems", JSON.stringify(cartItems));
//       }, [cartItems]);
    
//       useEffect(() => {
//         const cartItems = localStorage.getItem("cartItems");
       
//         if (cartItems) {
//           setCartItems(JSON.parse(cartItems));
//         }
//       }, []);

      
//     const value = {
//         cartItems,
//         addToCart,
//         removeFromCart,
//         clearCart,
//         getCartTotal,
//     };

//     return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };

// export const useCart = () => {
//     return useContext(CartContext);
// };



import React, { createContext, useContext, useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import toast from 'react-hot-toast';
import { BsCart4 } from "react-icons/bs";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(
        localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
    );

  const addToCart = (item, selectedSizesArray) => {
    
    
    const isItemInCart = cartItems.find(
        (cartItem) =>
            cartItem._id === item._id &&
            JSON.stringify(cartItem.selectedSizesArray) === JSON.stringify(selectedSizesArray)
    );

    if (isItemInCart) {
        setCartItems((prevCartItems) =>
            prevCartItems.map((cartItem) =>
                cartItem._id === item._id && JSON.stringify(cartItem.selectedSizesArray) === JSON.stringify(selectedSizesArray)
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            )
        );
        // toast.success("Quantity updated in the cart.", { icon: <BsCart4 /> });
        toast.success(<b>Quantity updated in the cart.</b>);
    } else {
        setCartItems([...cartItems, { ...item, quantity: 1, selectedSizesArray }]);
        // toast.success("Added your product to the cart.", { icon: <BsCart4 /> });
        toast.success(<b>Added your product to the cart.</b>);
    }
};
    
const removeFromCart = (item, selectedSize, selectedSizesArray) => {
  setCartItems((prevCartItems) => {
    let itemRemoved = false;

    const updatedCartItems = prevCartItems.filter((cartItem) => {
      if (cartItem._id !== item._id || itemRemoved) {
        return true;
      }

      const sizeMatch =
        cartItem.selectedSize === selectedSize ||
        (cartItem.selectedSizesArray && cartItem.selectedSizesArray.includes(selectedSize));

      if (sizeMatch && !itemRemoved) {
        itemRemoved = true; 
       
        toast.success(<b>Delete Your Product Successfully.</b>);
        return false; 
      }

      return true; 
    });

    return updatedCartItems;
  });
};



// not size avavliable select 
const addToCartNotSize = (item) => {
  if (!item || typeof item !== 'object' || !('_id' in item)) {
    console.error('Invalid item object:', item);
    return; // Exit the function if the item is not valid
  }

  const isItemInCart = cartItems.find((cartItem) => cartItem._id === item._id);

  if (isItemInCart) {
    setCartItems(
      cartItems.map((cartItem) =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
    toast.success("Quantity updated in the cart.", { icon: <BsCart4 /> });
  } else {
    setCartItems([...cartItems, { ...item, quantity: 1 }]);
    toast.success("Added your product to the cart.", { icon: <BsCart4 /> });
  }
};




// muje aesa kaena he ki meri do same product  he but uski size alg alg he but mere passs 1 id he and size L and dusra record  1 id he but uski size XXL to me XXL vala and id 1 he uska data delete karna  he  1 id or L size as it is rakhni he





    

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    // useEffect(() => {
    //     const storedCartItems = localStorage.getItem("cartItems");

    //     if (storedCartItems) {
    //         setCartItems(JSON.parse(storedCartItems));
    //     }
    // }, []);


    useEffect(() => {
        const storedCartItems = localStorage.getItem("cartItems");
      
        if (storedCartItems) {
          const parsedCartItems = JSON.parse(storedCartItems);
      
          const updatedCartItems = parsedCartItems.map((item) => {
            if (!item.selectedSizesArray) {
              item.selectedSizesArray = [];
            }
            return item;
          });
      
          setCartItems(updatedCartItems);
        }
      }, []);
      
    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        setCartItems,
        addToCartNotSize
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    return useContext(CartContext);
};