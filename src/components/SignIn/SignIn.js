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

const SignIn = () => {
  // Inputs
  const [phone, setnumber] = useState("");
  const [otp, setotp] = useState('');
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState('');

  // Sent OTP
 
    
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
    if (otp === null || final === null)
        return;
    final.confirm(otp).then((result) => {
        // success
    }).catch((err) => {
        alert("Wrong code");
    })
  } 
  
 



  return (
      <div style={{ "marginTop": "200px" }}>
          <center>
              <div class="input-field" >
              <input type="text" id="username" required placeholder='username'></input>
              <label for="username" >username</label>
              </div>
              <br></br>
              <div style={{ display: !show ? "block" : "none" }}>
                  <input  value={phone} onChange={(e) => { 
                     setnumber (e.target.value) }}
                      placeholder="phone number" />
                  <br /><br />
                  <div id="recaptcha-container"></div>
                  <button onClick={signin}>Send OTP</button>
              </div>
              <div style={{ display: show ? "block" : "none" }}>
                  <input type="text" placeholder={"Enter your OTP"}
                      onChange={(e) => { setotp(e.target.value) }}></input>
                  <br /><br />
                  <button onClick={ValidateOtp}>Verify</button>
              </div>
          </center>
      </div>
  );
}

export default SignIn;
// const SignIn = () => {
//   const [phone, setphone] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);

//   const signInWithphoneAndPasswordHandler = (event, phone, password) => {
//     auth.signInWithphoneAndPassword(phone, password).catch(error => {
//       setError("Error signing in with password and phone!");
//       console.error("Error signing in with password and phone", error);
//     });
//   };

//   return (
//     <div>
//       <Box padding={3}>
//         <Container>
//           <Box padding={3}>
//             {error !== null && <Toast text={error} />}
//             <Heading size="md">Sign in</Heading>
//           </Box>
//           <Box padding={2}>
//             <TextField
//               id="phone"
//               onChange={event => setphone(event.value)}
//               placeholder="Enter your phone"
//               label="phone"
//               value={phone}
//               type="phone"
//             />
//           </Box>
//           <Box padding={2}>
//             <TextField
//               id="password"
//               onChange={event => setPassword(event.value)}
//               placeholder="Enter your password"
//               label="Password"
//               value={password}
//               type="password"
//             />
//           </Box>
//           <Box padding={2}>
//             <Button
//               onClick={event => {
//                 signInWithphoneAndPasswordHandler(event, phone, password);
//                 navigate('/');
//               }}
//               text="Sign in"
//               color="blue"
//               inline
//             />
//           </Box>

//           <Box padding={2}>
//             <Text>or</Text>
//           </Box>
//           <Box padding={2}>
//             <Button onClick={signInWithGoogle} text="Sign in with Google" color="red" inline />
//           </Box>
//           <Box padding={2}>
//             <Text>Don't have an account?</Text>
//           </Box>
//           <Box padding={2}>
//             <Link to="signUp" className="text-blue-500 hover:text-blue-600">
//               Sign up here
//             </Link>
//           </Box>
//           <Box padding={2}>
//             <Link
//               to="passwordReset"
//               className="text-blue-500 hover:text-blue-600"
//             >
//               Forgot Password?
//             </Link>
//           </Box>
//         </Container>
//       </Box>
//     </div>
//   );
// };
// export default SignIn;
