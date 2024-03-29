

import React from 'react';
import './Package.css'
import axios from 'axios';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';

function Package() {
  const [book, setbook] = useState({
    name: "lifeStory",
    author:"Anmol",
    img:"https://th.bing.com/th?id=OIP.O8X2cM_d8XTou4d3_YlbgAHaLH&w=204&h=306&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
    price:500,
  });
  const initPayment = (data) => {
    const options = {
      key: "rzp_test_UH0rkDW0Rkm44R",
      amount : data.amount,
      currency : data.currency,
      name : book.name,
      description : "Test Transaction",
      img : book.img,
      order_id : data.id,
      handler : async (response) => {
        try {
          const verifyUrl = 'https://razorpaybackend-sshk.onrender.com/verify';
          const {data} = await axios.post(verifyUrl, response);
          console.log("verifyData",data);
        } catch (error) {
          console.log(error)
        }
      },
      theme:{
        color: "#3399cc"
      },
    }
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }

  const handlePayment = async () => {
    try {
      const orderUrl = 'https://razorpaybackend-sshk.onrender.com/orders';
      const {data} = await axios.post(orderUrl, {
        amount: book.price
      });
      console.log("orderData",data);
      initPayment(data.data);
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='pakage-container'>
       <h2>Choose a <span>Right plan</span> for you</h2>
       <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae quos nemo totam unde quaerat odit facere.</p>
   
    <div className="package">
      
      <div className="package-card">
       
      <div className=" package-card-2">
        <h2>5 Users</h2>
        <div style={{display:'flex', flexDirection:'row'}}>
        <FontAwesomeIcon icon={faCheckSquare} style={{marginRight:'15px', color:'white', marginTop:'5px'}}/><p>Ideal for small teams </p>
        </div>
        <div style={{display:'flex', flexDirection:'row'}}>
        <FontAwesomeIcon icon={faCheckSquare} style={{marginRight:'15px', color:'white', marginTop:'5px'}}/><p>Ideal for small teams </p>
        </div>
        <div style={{display:'flex', flexDirection:'row', textAlign:'center'}}>
        <FontAwesomeIcon icon={faCheckSquare} style={{marginRight:'15px', color:'white', marginTop:'5px'}}/><p>Ideal for small teams </p>
        </div>
        <div style={{display:'flex', flexDirection:'row'}}>
        <FontAwesomeIcon icon={faCheckSquare} style={{marginRight:'15px', color:'white', marginTop:'5px'}}/><p>Ideal for small teams </p>
        </div>
       
        <h3>{book.price}</h3>
        <button onClick={handlePayment}>SELECT</button>
      </div>
      </div>
    </div>
    </div>
  );
}

export default Package;