import React, { useState } from 'react';
import { Link, navigate } from '@reach/router';
import { auth, signInWithGoogle } from '../../firebase/firebase';
import {firebase } from '../../firebase/firebase';

import sidegif2 from '../../img/back2.gif'

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'




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
  const [phone, setnumber] = useState()
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
  
  

      
  }
  // Validate OTP
const ValidateOtp = () => {
    setshow2(true)
    if (otp === null || final === null)
        return;
    final.confirm(otp).then((result) => {
      navigate(`/`)
       
    }).catch((err) => {
        alert("Wrong code");
    })

  } 
  
 


  console.log("phone",phone)


  return (
<div >
<div className="login-float-child" >
      <div  className="login_animate" style={{ paddingBottom:"40rem",paddingTop:"25rem"}}>
          <center ><h1 className="logintext"style={{fontSize:"5rem",fontWeight:"500",paddingBottom:"4rem"}}>Login</h1></center>
     
          <center>
              <br></br>
              <div   style={{ display: !show ? "block" : "none" }}>
                 
                 <h5 style={{color:"white"}}>Enter Phone with country-code</h5>
                 <PhoneInput
                 style={{width:"50%",height:"2rem" , borderRadius:"0px",border:"none",backgroundColor:"white",color:"black"}}
                 defaultCountry="RU"
      placeholder="Enter phone number"
      value={phone}
      onChange={setnumber}/>
                      {/* <input className="form-control"  style={{width:"40%",borderRadius:"0px",border:"none",backgroundColor:"white",color:"black"}} 
                       onChange={(e)=> setnumber(e.target.value)}
                     value={phone}
                      placeholder="Phone number" /> */}
                  <br /><br />
                  
                  <div id="recaptcha-container"></div>
             
                  <button  style={{  background:"linear-gradient(245deg, rgba(11,116,255,1) 0%, rgba(130,242,182,1) 100%)"}}className='btn btn-primary' onClick={signin}>Send OTP</button>
              </div>
              <div style={{ display: show ? "block" : "none" }}>
                  <input className="form-control" style={{width:"40%",borderRadius:"0px",border:"none",backgroundColor:"white",color:"black"}} 
                   type="text" placeholder={"Enter your OTP"}
                      onChange={e => setotp(e.target.value)}
                      value={otp}
                      />
                  <br /><br />
                
                {show2 ?<Spinner show={true} ></Spinner>:""}
               
                  <button className='btn btn-primary' 
                  style={{  background:"linear-gradient(245deg, rgba(130,242,182,1) 25%, rgba(11,116,255,1) 100%)",width:"100px"}}
                  onClick={ValidateOtp}>Verify</button>
                 
              </div>

          </center>
     
      </div>
      </div>
        <img className="login-float-child" height={850} width={200} src={sidegif2} />
      </div>
  );
}

export default SignIn;
