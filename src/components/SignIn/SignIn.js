import React, { useState } from 'react';
import { Link, navigate } from '@reach/router';
import { auth, signInWithGoogle } from '../../firebase/firebase';
import {firebase, generateUserDocument,firestore} from '../../firebase/firebase';



import {
  Box,
  Button,
  Toast,
  Container,
  Text,
  TextField,
  Heading,
} from 'gestalt';
import 'gestalt/dist/gestalt.css';
import { Label } from 'gestalt';
import { Spinner } from 'gestalt';

const SignIn = () => {
  // Inputs
  const [phone, setnumber] = useState("");
  const [otp, setotp] = useState('');
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState('');
  const [show2, setshow2] = useState(false);

 
 
 
    
  const signin =  () => {

      if (phone === "" || phone.length < 10) return;

      let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container');

    //   try{
    //     const {user} = await auth.signInWithPhoneNumber( phone, verify)
    //     generateUserDocument(user, {phone})
    //     .then((result) => {
    //         setfinal(result);
    //         // alert("code sent")
    //         console.log(phone);
    
    //         setshow(true)
            
    //     }) 

         
    //   }
    //   catch(error){
    //     console.log(error);
    //   }
    
    
     
 


  auth.signInWithPhoneNumber(phone, verify).then((result) => {
   
          setfinal(result);
          // alert("code sent")
          console.log(phone);

          setshow(true)
        
      })
     
       
      console.log(phone)
      setnumber("");
      
  }
  // Validate OTP
const ValidateOtp = () => {
    setshow2(true)
    if (otp === null || final === null)
        return;
    final.confirm(otp).then((result) => {
        // success
       
    }).catch((err) => {
        alert("Wrong code");
    })

  } 
  
 



  return (
      <div style={{ "marginTop": "8%" }}>
          <center><h1 style={{"color":"grey"}}>Login / SignUp</h1></center>
          <br></br>
          <center>
              <br></br>
              <div style={{ display: !show ? "block" : "none" }}>
                 
                 <h6 style={{color:"blueviolet"}}>Enter Phone with country-code</h6>
                      <input  value={phone} onChange={(e) => { 
                     setnumber (e.target.value) }}
                      placeholder="Phone number" />
                  <br /><br />
                  <div id="recaptcha-container"></div>
             
                  <button className='btn btn-primary' onClick={signin}>Send OTP</button>
              </div>
              <div style={{ display: show ? "block" : "none" }}>
                  <input type="text" placeholder={"Enter your OTP"}
                      onChange={(e) => { setotp(e.target.value) }}></input>
                  <br /><br />
                
                {show2 ?<Spinner show={true} ></Spinner>:""}
               
                  <button className='btn btn-warning' onClick={ValidateOtp}>Verify</button>
                 
              </div>

          </center>
      </div>
  );
}

export default SignIn;
