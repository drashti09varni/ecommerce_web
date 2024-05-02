import React, { useState } from 'react';
import SabpaisaIcon from "../img/Sab-Paisa-small.png"
import SabpaisaPaymentGateway from "../Componets/SabpaisaPaymentGateway"
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { Country, State, City } from "country-state-city";
import "../../src/css/shiipingModal.css";
import "../css/editbtn.css"
import Select from "react-select";
import toast from 'react-hot-toast';
import { FaEdit } from 'react-icons/fa';


const Result = ({ setIsOpen, isOpen }) => {

  const [formvisible, setFormVisible] = useState(false);
  const [country, setCountry] = useState('India');

  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const storedFormData = localStorage.getItem('formData');
  const parsedFormData = storedFormData ? JSON.parse(storedFormData) : {};
  const [editFormData, setEditFormData] = useState({ ...parsedFormData });
  // const [selectedState, setSelectedState] = useState(editFormData.state || null);
  // const [selectedCity, setSelectedCity] = useState(editFormData.city || null);
  const [selectedState, setSelectedState] = useState(editFormData.state ? { name: editFormData.state } : null);
  const [selectedCity, setSelectedCity] = useState(editFormData.city ? { name: editFormData.city } : null);

  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false); // Define and initialize the 'show' state variable
  const handleClose = () => setShow(false); // Define handleClose function
  const handleShow = () => setShow(true); // Define handleShow function


  console.log(parsedFormData);

  const handelpayment = () => {
    console.log('paymentopen =>', "paymentopen");
    setIsOpen(true)
  }

  const handleEditClick = () => {
    setShowModal(!showModal);
    const updatedFormData = { ...editFormData, state: selectedState?.name, city: selectedCity?.name };
    localStorage.setItem('formData', JSON.stringify(updatedFormData));
    setFormVisible(!formvisible);
  };



  const handleEditSubmit = async (id) => {
    setShowModal(true);
    try {

      const newErrors = {};
      if (!editFormData.Name) {
        newErrors.Name = 'Name is required';
      }
      if (!editFormData.flatno) {
        newErrors.flatno = 'House No. is required';
      }
      if (!editFormData.streetAddress) {
        newErrors.streetAddress = 'Street Address is required';
      }
      if (!editFormData.selectedState) {
        newErrors.selectedState = 'State is required';
      }
      if (!editFormData.selectedCity) {
        newErrors.selectedCity = 'City is required';
      }



      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      // Update state and city properties of editFormData
      const updatedFormData = {
        ...editFormData,
        state: selectedState?.name || '',
        city: selectedCity?.name || '',
      };

      const response = await fetch(`https://api.hindustanrides.in/api/v1/updateshipping/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      });


      if (response.ok) {
        // Update local storage with the edited shipping data
        localStorage.setItem('formData', JSON.stringify(updatedFormData));
        // Update local state with the edited data
        setEditFormData(updatedFormData);
        setShowModal(false);
        toast.success(<b>Shipping Address Successfully Edited!</b>);
      } else {
        const errorData = await response.json();
        console.error('API error:', errorData);
        // Handle error cases if needed
      }
    } catch (error) {
      console.error('Error during API call:', error);
      // Handle any other errors (e.g., network issues)
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); // Set showModal state to false to close the modal
  };

  return (
    <div className=''>
      <div className="thank-you-message py-5">

        <h2 style={{ color: "rgb(156, 67, 153)" }}>Thank you for your order, {parsedFormData.Name}!</h2>
        <p></p>
        <div className='py-3 border px-3'>
          <p>
            <b className='fs-2'>{parsedFormData.Name}</b>
          </p>

          <p className='fs-5'>
            <strong>Address:</strong> {parsedFormData.flatno}, {parsedFormData.streetAddress}, {parsedFormData.city || ''}, {parsedFormData.state || ''}, India
          </p>
          <div className='d-flex justify-content-between align-items-center'>
            <p className='mb-0'>
              <strong className='fs-5'>Phone No.:</strong> <b className='fs-5'>{parsedFormData.phoneNo} </b>
            </p>
            <button className="edit-address-button" onClick={handleEditClick}>
              <FaEdit className="edit-icon" />
            </button>
          </div>
        </div>


        <div className='py-4'>
          <h5>PYMENT :</h5>
          <button type="submit" className="sabpaisa-section py-4 border px-3" style={{ display: 'flex', alignItems: 'center' }}
            onClick={handelpayment}
          >
            <img src={SabpaisaIcon} style={{ backgroundColor: "antiquewhite", width: "12%", height: "51%", marginRight: '10px', borderRight: '1px solid #ccc', paddingRight: '10px' }} />
            <p className='mb-0 fw-bold'>Cards, UPI, Netbanking, Mobikwik, Wallets, Paypal</p>
          </button>
        </div>
      </div>

      {/* {showModal ? (
        <> */}
      {showModal && (
       <div className="custom-modal mt-5" role="dialog">
       <div className="custom-modal-dialog" role="document">
         <div className="custom-modal-content">
           <div className="custom-modal-header">
             <h3 className="custom-modal-title" style={{ color: "black" }}>Edit Shipping Address</h3>
           </div>
           <div className="custom-modal-body">
             <form action="# " className="">
               <div className="row">
                 <div className="col-md-6">
                   <label className=""></label>
                   <input
                     type="text"
                     className="form-control py-1"
                     placeholder="Name"
                     value={editFormData.Name}
                     name="Name"
                     onChange={(e) => setEditFormData({ ...editFormData, Name: e.target.value })}
                   />
                   {errors.Name && <p className="error-text">{errors.Name}</p>}
                 </div>

                 <div className="col-md-6 ">
                   <label className=""></label>
                   <input
                     type="text"
                     className="form-control py-1"
                     placeholder="House No."
                     value={editFormData.flatno}
                     name="flatno"
                     onChange={(e) => setEditFormData({ ...editFormData, flatno: e.target.value })}
                   />
                   {errors.flatno && <p className="error-text">{errors.flatno}</p>}
                 </div>

                 <div className="col-md-6">
                   <div className="form-item w-100 ">
                     <label className=""></label>
                     <input
                       type="text"
                       className="form-control py-1"
                       placeholder="Address"
                       value={editFormData.streetAddress}
                       name="streetAddress"
                       onChange={(e) => setEditFormData({ ...editFormData, streetAddress: e.target.value })}
                     />
                     {errors.streetAddress && <p className="error-text">{errors.streetAddress}</p>}
                   </div>
                 </div>


                 <div className="col-md-6">
                   <div className="form-item w-100 ">
                     <label className=""></label>
                     <input type="text" className="form-control py-1" value={country} />
                   </div>
                 </div>

                 <div className="col-md-6">
                   <label className=""></label>
                   <Select
                     className="border-none"
                     placeholder="Enter Your State"
                     options={State?.getStatesOfCountry('IN')}
                     getOptionLabel={(options) => options["name"]}
                     getOptionValue={(options) => options["name"]}
                     value={selectedState}
                     onChange={(item) => {
                       console.log('Selected State:', item);
                       setSelectedState(item);
                     }}
                   />
                 </div>
                 {errors.selectedState && <p className="error-text">{errors.selectedState}</p>}

                 <div className="col-md-6">
                   <label className=""></label>

                   <Select
                     className="   "
                     placeholder="Enter Your City"
                     options={City.getCitiesOfState(
                       selectedState?.countryCode,
                       selectedState?.isoCode
                     )}
                     getOptionLabel={(options) => {
                       return options["name"];
                     }}
                     getOptionValue={(options) => {
                       return options;
                     }}
                     value={selectedCity}
                     onChange={(item) => {
                       setSelectedCity(item);
                     }}
                   />
                 </div>
                 {errors.selectedCity && <p className="error-text">{errors.selectedCity}</p>}


                 <div className="col-md-6">
                   <div className="form-item w-100 ">
                     <label className=""></label>
                     <input type="email" name="email" readonly className="form-control py-1" placeholder="Email"
                       value={editFormData.email} onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })} />
                     {/* {formSubmitted && errors.email && <p className="error-text">{errors.email}</p>} */}
                   </div>
                 </div>
               </div>

             </form>
           </div>
           <div className="custom-modal-footer">
             <button
               className="custom-btn custom-btn-danger"
               type="button"
               onClick={() => setShowModal(false)}
             >
               Close
             </button>
             <button
               className="custom-btn custom-btn-success"
               type="button"
               onClick={() => handleEditSubmit(editFormData.id)}
             >
               Save Changes
             </button>
           </div>
         </div>
       </div>
     </div> 
      )}
      {/* </> */}
      {/* )  */}
      {/* : <></>} */}
    </div >
  );
};

export default Result;
