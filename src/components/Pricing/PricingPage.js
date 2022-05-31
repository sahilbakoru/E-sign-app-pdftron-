import React, { useState ,useEffect} from 'react'
import './pricing.css'
import { firestore } from '../../firebase/firebase';
import { useSelector} from 'react-redux';
import { selectUser, setUser } from '../../firebase/firebaseSlice';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("pk_test_51KQuSuSBe5QxKGr0eblq7KKGVkR8hlPBviRYHv3mj7bSGib7m8Typ1zDPMsPfswk6CrmXB8W49BgnliUei0PhPmK00xbD4TFo1");

const PricingPage = () => {
    const user = useSelector(selectUser);
    const user2 =useSelector(selectUser)
    const [showbt , setshowbt] =useState(false)

    let { ispaid ,paying} = user;
let paymentst= ""

console.log("paymentst",paymentst)

const [clientSecret, setClientSecret] = useState("");

useEffect(() => {
  // Create PaymentIntent as soon as the page loads
  fetch("/create-payment-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
  })
    .then((res) => res.json())
    .then((data) => setClientSecret(data.clientSecret));
}, []);

const appearance = {
  theme: 'stripe',
};
const options = {
  clientSecret,
  appearance,
};

console.log(clientSecret)
        
 

  return (
    <center >
      {showbt===false?
      <div class="pricecolumns"  >
      <ul class="priceprice" >
        <li class="header">Pricing</li>
        <li class="grey">€0.99/Per Letter Sent &nbsp; </li>
      <li class="grey2">€9.9 For 10 Letter Sent &nbsp; <button onClick={setshowbt(true)}> pay</button></li>
      </ul>
      </div>:
       <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>}
    {/* <div class="pricecolumns"  >
      <ul class="priceprice" >
        <li class="header">Pricing</li>
        <li class="grey">€0.99/Per Letter Sent &nbsp; 
       
      <li class="grey2">€9.9 For 10 Letter Sent &nbsp;  { showbt? <button  class="btn btn-primary" onClick={plusten}>Top Up Now </button>:""}</li>

      </ul>
      </div> */}
      </center>
  )
}

export default PricingPage

