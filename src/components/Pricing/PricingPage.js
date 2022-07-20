// this component is not used in the apps
import React, { useState ,useEffect} from 'react'
import './pricing.css'
import { Spinner } from 'gestalt';
import { firestore } from '../../firebase/firebase';
import { useSelector} from 'react-redux';
import { selectUser, setUser } from '../../firebase/firebaseSlice';
import { loadStripe } from "@stripe/stripe-js";
import { Elements ,CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import axios from "axios"

 const stripeTestPromise = loadStripe("pk_test_51KQuSuSBe5QxKGr0eblq7KKGVkR8hlPBviRYHv3mj7bSGib7m8Typ1zDPMsPfswk6CrmXB8W49BgnliUei0PhPmK00xbD4TFo1");

const PricingPage = () => {
    const user = useSelector(selectUser);
    const user2 =useSelector(selectUser)
    const [showbt , setshowbt] =useState(false)
  const [show, setShow] = useState(false);
  const [success, setSuccess ] = useState(false)
  const stripe = useStripe()
  const elements = useElements()

    let { ispaid ,paying} = user;
let paymentst= ""

console.log("paymentst",paymentst)

const [clientSecret, setClientSecret] = useState("");

//useEffect(() => {

  // Create PaymentIntent as soon as the page loads
  // fetch("/create-payment-intent", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
  // })
  //   .then((res) => res.json())
  //   .then((data) => setClientSecret(data.clientSecret));
//}, []);

const plusTen=async(uid,doc)=>{
  setShow(true)
  await firestore.collection("users").doc(user2.uid).update({paying:"false",ispaid:ispaid+10});
  document.location.reload()
      }

      const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


    if(!error) {
        try {
            const {id} = paymentMethod
            const response = await axios.post("http://localhost:4000/create-payment-intent", {
                amount: 1000,
                id
            })

            if(response.data.success) {
                console.log("Successful payment")
                setSuccess(true)
            }

        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
    }
}


// const stripeReq=()=>{
//   fetch("/create-payment-intent", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
//   })
//     .then((res) => res.json())
//     .then((data) => setClientSecret(data.clientSecret));
// }


const appearance = {
  theme: 'stripe',
};
const options = {
  clientSecret,
  appearance,
};

console.log(clientSecret)
        
 const showpay =()=>{
   setshowbt(true)

 }

  return (
   
    
      <Elements stripe={stripeTestPromise}>
      {/* Dont remove this comment it's a placeholder for code */}
    {!success ? 
        <form onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement/>
                </div>
            </fieldset>
            <button>Pay</button>
        </form>
        :
       <div>
           <h2>You just bought a sweet spatula congrats this is the best decision of you're life</h2>
       </div> 
        }
        </Elements>
    
  )
}

export default PricingPage

