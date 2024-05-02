// import React, { useState, useEffect } from 'react';
// import uniqid from 'uniqid';
// import { PaymentInitModal } from "pg-test-project";
// import { useCart } from '../Componets/Context/CartContext';
// import toast from 'react-hot-toast';


// const SabpaisaPaymentGateway = ({ Name, clientCode, transUserName, transUserPassword,
//     authkey, authiv, email, phoneNo, finalTotal, isOpen, setIsOpen, streetAddress }) => {
//     console.log('Name,email,phoneNo =>', Name, email, phoneNo);


//     const [amount, setAmout] = useState(finalTotal)
//     const [channelId, setchannelId] = useState("");
//     const [clientTxnId, setclientTxnId] = useState("3828972293337345");
//     const [programId, setprogramId] = useState("");
//     const [mcc, setmcc] = useState("");
//     const [amountType, setamountType] = useState("");
//     const { cartItems, setCartItems, removeFromCart, clearCart, getCartTotal } = useCart();
//     console.log('isOpen =>', isOpen);

//     // useEffect(() => {
//     //     setIsOpen(isOpen);
//     // }, [isOpen]);

//     // Retrieve form data from localStorage
//     const storedFormData = localStorage.getItem('formData');
//     const parsedFormData = storedFormData ? JSON.parse(storedFormData) : {};
//     console.log('parsedFormData.Name =>', parsedFormData.Name);
//     const Nameprint = parsedFormData.Name
//     const emailprint = parsedFormData.email
//     const phonprint = parsedFormData.phoneNo
//     const addressprint = parsedFormData.streetAddress

//     // Generate a unique clientTxnId
//     //   const clientTxnId = uniqid();
//     console.log(' clientTxnId=>', clientTxnId);

//     return (

//         <div>
//             <PaymentInitModal
//                 clientCode={clientCode}
//                 transUserPassword={transUserPassword}
//                 transUserName={transUserName}
//                 isOpen={isOpen}
//                 clientTxnId={clientTxnId}
//                 authkey={authkey}
//                 authiv={authiv}
//                 payerName={Nameprint}
//                 payerEmail={emailprint}
//                 payerMobile={phonprint}
//                 payerAddress={addressprint}
//                 amount={finalTotal}
//                 amountType={amountType}
//                 onToggle={() => setIsOpen(true)}
//                 channelId={channelId}
//                 programId={programId}
//                 mcc={mcc}
//                 label={"Production"}
//                 env={'stag'}

//             />

//         </div>
//     );
// };

// export default SabpaisaPaymentGateway;


import React, { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import { PaymentInitModal } from 'pg-test-project';
import { useCart } from '../Componets/Context/CartContext';
import toast from 'react-hot-toast';
const GET_CAT_API_BASE_URL = 'https://api.hindustanrides.in/api/v1';

const SabpaisaPaymentGateway = ({ Name, clientCode, transUserName, transUserPassword, authkey, authiv, email, phoneNo, finalTotal, isOpen, setIsOpen, streetAddress }) => {
  console.log('finalTotal =>',finalTotal);
  
  // const [amount, setAmout] = useState(finalTotal);
  const { cartItems, clearCart } = useCart();
  const [paymentResult, setPaymentResult] = useState(null);
  // Generate a unique clientTxnId for each transaction
  const [clientTxnId, setclientTxnId] = useState(uniqid());
  const [shipingData, setShippingData] = useState([])


  // Retrieve form data from localStorage
  const storedFormData = localStorage.getItem('formData');
  const parsedFormData = storedFormData ? JSON.parse(storedFormData) : {};
  const Nameprint = parsedFormData.Name;
  const emailprint = parsedFormData.email;
  const phonprint = parsedFormData.phoneNo;
  const addressprint = parsedFormData.streetAddress;
  console.log('addressprint =>',addressprint);

  console.log('clientTxnId =>',clientTxnId);

  //get
  const fetchCategories = () => {
    fetch(`${GET_CAT_API_BASE_URL}/getshipping`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            setShippingData(data.result);
            console.log('data.result =>', data.result.flatno + data.result.streetAddress + data.result.state ,"India");
            console.log('shipingData =>',shipingData);
            

        })
        .catch((error) => {
            console.error('Error:', error);
        });
};

useEffect(() => {
    fetchCategories();
}, []);
  
  return (
    <div>
      <PaymentInitModal
        clientCode={clientCode}
        transUserPassword={transUserPassword}
        transUserName={transUserName}
        isOpen={isOpen}
        clientTxnId={uniqid()}
        authkey={authkey}
        authiv={authiv}
        payerName={Nameprint}
        payerEmail={emailprint} 
        payerMobile={phonprint}
        payerAddress={addressprint}
        amount={finalTotal}
        onToggle={() => setIsOpen(true)}
        env={'prod'}
      />
    </div>
  );
};

export default SabpaisaPaymentGateway;
