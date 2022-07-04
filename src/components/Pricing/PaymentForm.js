import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'
import { firestore,functions } from '../../firebase/firebase';
import { useSelector} from 'react-redux';
import Stripe from 'stripe';
import { selectUser, setUser } from '../../firebase/firebaseSlice';
import './pricing.css'

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "black",
			color: "black",
			fontWeight: 700,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "black" },
			"::placeholder": { color: "black" }
		},
		invalid: {
			iconColor: "red",
			color: "red"
		}
	}
}

export default function PaymentForm() {
    const [success, setSuccess ] = useState(false)
    const user = useSelector(selectUser);
    const user2 =useSelector(selectUser)
const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(true);
  const [payerror, setpayerror] = useState(false);

    let { ispaid } = user;

    const plusTen=async(uid,doc)=>{
     
        await firestore.collection("users").doc(user2.uid).update({paying:"false",ispaid:ispaid+10});
        document.location.reload()
            }

   if(success){
    plusTen()
   } 

   const setpaycard =()=>{
    setShow(false)
   }

const createPaymentIntent = functions.httpsCallable('createPaymentIntent');
//    const stripe = Stripe('pk_test_51KQuSuSBe5QxKGr0eblq7KKGVkR8hlPBviRYHv3mj7bSGib7m8Typ1zDPMsPfswk6CrmXB8W49BgnliUei0PhPmK00xbD4TFo1');
   const stripeSubmit=()=>{
    createPaymentIntent()
    .then(response => {
       const  type = "card";
       const card = elements.getElement(CardElement);
    });
   };


    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


    if(!error) {
        try {
            const {id} = paymentMethod
            const response = await axios.post("https://us-central1-ipostbox.cloudfunctions.net/createPaymentIntent", {
                headers: {
                    'Content-Type': 'application/json'
                    },
            amount: 999,  
            id
            })

            if(response.data.success) {
                console.log("Successful payment")
                setSuccess(true)
            }

        } catch (error) {
            console.log("Error", error)
            setpayerror(true)
        }
    } else {
        console.log(error.message)
    }
}

    return (
        <div>
        {show?
      <div className="pricecolumns"  >
      <ul className="priceprice" >
        <li className="header">Pricing</li>
        <li className="grey">€0.99/Per Letter Sent &nbsp; </li>
      <li className="grey2">€9.9 For 10 Letter Sent &nbsp;
<button className='btn btn-success' onClick={setpaycard} > Top Up Now </button> </li>
      </ul>
      </div>  :
      <form onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
           <center>
             {!isLoading?<button 
             disabled={isLoading}
             className="btn btn-success">
            Pay
            </button>:<div>{payerror?<h5>some error</h5>:<h5>processing...</h5>}</div>}
            </center>
        </form>
        
 }
            
        </div>
    )
}
