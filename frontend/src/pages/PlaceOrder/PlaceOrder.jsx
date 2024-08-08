// import React from 'react'
// import { useContext, useEffect, useState } from 'react'
import { useContext, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext';
import axios from "axios"

const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(data => ({ ...data, [name]: value }))
  }

  // useEffect(()=>{
  //   console.log(data);
  // },[data])

  const placeOrder = async (event) => {
    event.preventDefault()
    let orderItems = []
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })
    // console.log(orderItems);
    // let orderData = {
    //   address: {
    //     street: data.street,
    //     city: data.city,
    //     state: data.state,
    //     zipcode: data.zipcode,
    //     country: data.country
    //   },
    //   items: orderItems,
    //   amount: getTotalCartAmount() + 2
    // }
    let orderData = {
      address: {
        street: data.street,
        city: data.city,
        state: data.state,
        zipcode: data.zipcode,
        country: data.country
      },
      items: orderItems,
      amount: getTotalCartAmount() + 2,
      contact: {
        email: data.email,
        phone: data.phone,
      },
      customer: {
        firstName: data.firstName,
        lastName: data.lastName,
      },
      currency: "usd"
    };

    let response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });

    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url)
    } else {
      alert("Error");
    }
  }

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">
          Delivery Information
        </p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='ZipCode' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Free</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
            </div>
          </div>
          <button type='submit'>Procced To Payment</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder

// import { useContext, useState } from 'react';
// import './PlaceOrder.css';
// import { StoreContext } from '../../context/StoreContext';
// import axios from "axios";

// const PlaceOrder = () => {
//   const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

//   const [data, setData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: "",
//   });

//   const onChangeHandler = (event) => {
//     const { name, value } = event.target;
//     setData(prevData => ({ ...prevData, [name]: value }));
//   };

//   const placeOrder = async (event) => {
//     event.preventDefault();
//     let orderItems = [];
//     food_list.forEach((item) => {
//       if (cartItems[item._id] > 0) {
//         let itemInfo = { ...item, quantity: cartItems[item._id] };
//         orderItems.push(itemInfo);
//       }
//     });

//     let orderData = {
//       address: {
//         street: data.street,
//         city: data.city,
//         state: data.state,
//         zipcode: data.zipcode,
//         country: data.country
//       },
//       items: orderItems,
//       amount: getTotalCartAmount() + 2,
//       contact: {
//         email: data.email,
//         phone: data.phone,
//       },
//       customer: {
//         firstName: data.firstName,
//         lastName: data.lastName,
//       },
//       currency: "usd"
//     };

//     console.log("Placing order with data:", orderData);

//     try {
//       let response = await axios.post(`${url}/api/order/place`, orderData, {
//         headers: { token }
//       });

//       console.log("Response:", response);

//       if (response.data.success) {
//         const { session_url } = response.data;
//         window.location.replace(session_url);
//       } else {
//         alert("Error placing the order.");
//       }
//     } catch (error) {
//       console.error("Error placing the order:", error);
//       if (error.response) {
//         console.error("Response data:", error.response.data);
//         console.error("Response status:", error.response.status);
//         console.error("Response headers:", error.response.headers);
//         alert(`Error: ${error.response.data.message}`);
//       } else if (error.request) {
//         console.error("Request data:", error.request);
//         alert("Error: No response received from server.");
//       } else {
//         console.error("Error message:", error.message);
//         alert(`Error: ${error.message}`);
//       }
//     }
//   };

//   return (
//     <form onSubmit={placeOrder} className='place-order'>
//       <div className="place-order-left">
//         <p className="title">Delivery Information</p>
//         <div className="multi-fields">
//           <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
//           <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
//         </div>
//         <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' />
//         <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
//         <div className="multi-fields">
//           <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
//           <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
//         </div>
//         <div className="multi-fields">
//           <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='ZipCode' />
//           <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
//         </div>
//         <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
//       </div>
//       <div className="place-order-right">
//         <div className="cart-total">
//           <h2>Cart Total</h2>
//           <div>
//             <div className="cart-total-details">
//               <p>SubTotal</p>
//               <p>{getTotalCartAmount()}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <p>Delivery Fee</p>
//               <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <p>Total</p>
//               <p>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
//             </div>
//           </div>
//           <button type='submit'>Proceed To Payment</button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PlaceOrder;
