import React, { useState } from 'react';
import { Link, navigate } from '@reach/router';
import { auth, signInWithGoogle } from '../../firebase/firebase';
import {firebase } from '../../firebase/firebase';



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
    <Container>
      <div  class="login_animate" style={{ "marginTop": "8%" , padding:"8rem",borderRadius:"2rem",  boxShadow: "#00000014 0px -1px 27px 16px"}}>
          <center ><h1 class="logintext"style={{fontSize:"5rem",fontWeight:"200",paddingBottom:"4rem"}}>login</h1></center>
      
          <center>
              <br></br>
              <div   style={{ display: !show ? "block" : "none" }}>
                 
                 <h5 style={{color:"blueviolet"}}>Enter Phone with country-code</h5>
                      <TextField class="form-control"  
                       onChange={event => setnumber(event.value)}
                     value={phone}
                      placeholder="Phone number" />
                  <br /><br />
                  
                  <div id="recaptcha-container"></div>
             
                  <button  style={{borderRadius:"10px"}}className='btn btn-primary' onClick={signin}>Send OTP</button>
              </div>
              <div style={{ display: show ? "block" : "none" }}>
                  <TextField class="form-control"  type="text" placeholder={"Enter your OTP"}
                      onChange={event => setotp(event.value)}
                      value={otp}
                      />
                  <br /><br />
                
                {show2 ?<Spinner show={true} ></Spinner>:""}
               
                  <button className='btn btn-warning' onClick={ValidateOtp}>Verify</button>
                 
              </div>

          </center>
     
      </div>
      </Container>
  );
}

export default SignIn;
