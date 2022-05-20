import React from 'react'
import './pricing.css'
import { firestore } from '../../firebase/firebase';
import { useSelector} from 'react-redux';
import { selectUser, setUser } from '../../firebase/firebaseSlice';

const PricingPage = () => {
    const user = useSelector(selectUser);
    const user2 =useSelector(selectUser)
    let { ispaid } = user;

    const minusOne=async(uid,doc)=>{
        await firestore.collection("users").doc(user2.uid).update({ispaid:user2.ispaid+10});
           console.log("pair doc is paid",user2.ispaid)
           document.location.reload()
            }
 
 console.log("ispaid2",ispaid)
  return (
    <center >
    <div class="pricecolumns" >
      <ul class="priceprice" >
        <li class="header">Pricing</li>
        <li class="grey">€0.99/Per Letter Sent</li>
        <li class="grey">€9.9 For 10 Letter Sent</li>
        <li class="grey2"><button  class="btn btn-primary" onClick={minusOne}>Top Up Now</button></li>
      </ul>
      </div>
      </center>
  )
}

export default PricingPage

