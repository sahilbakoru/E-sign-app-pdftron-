import React, { useState } from 'react'
import './pricing.css'
import { firestore } from '../../firebase/firebase';
import { useSelector} from 'react-redux';
import { selectUser, setUser } from '../../firebase/firebaseSlice';

const PricingPage = () => {
    const user = useSelector(selectUser);
    const user2 =useSelector(selectUser)
    const [showbt , setshowbt] =useState(true)
    let { ispaid ,paying} = user;
let paymentst= ""
console.log("paymentst",paymentst)

    const plusten= ()=>{
      setshowbt(false)
       paymentRun()
       fetch("http://localhost:3001/create-checkout-session",{
         method:'post',
         headers:{
           'content-Type':'application/json',
         },
          body:JSON.stringify({
            items:[
              {id:1, quantity:1}
            ]
          })
       }).then(res=>{
         if(res.ok) return res.json()
         return res.json().then( json => Promise.reject(json))
       })
       .then(({ url}) => {
         console.log(url)
         window.location = url
       })
      .catch(e=>{
         console.error(e.error)
       })
            }

            const paymentRun=async(uid,doc)=>{
              await firestore.collection("users").doc(user2.uid).update({paying:"true"});
                 console.log("pair ",user2.paying)
                  }
 

  return (
    <center >
    <div class="pricecolumns"  >
      <ul class="priceprice" >
        <li class="header">Pricing</li>
        <li class="grey">€0.99/Per Letter Sent &nbsp; <button  class="btn btn-success" > Add one  </button></li>
      <li class="grey2">€9.9 For 10 Letter Sent &nbsp;  { showbt? <button  class="btn btn-primary" onClick={plusten}>Top Up Now </button>:""}</li>
      </ul>
      </div>
      </center>
  )
}

export default PricingPage

