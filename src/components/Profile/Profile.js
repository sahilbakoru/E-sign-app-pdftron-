import React, { useState,useEffect } from 'react';
import {
  Box,
  Button,
  Text,
  Avatar,
  Row,
  Stack,
  Column,
  Heading,
} from 'gestalt';
import 'gestalt/dist/gestalt.css';
import { auth,firestore } from '../../firebase/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, setUser } from '../../firebase/firebaseSlice';
import { resetSignee } from '../Assign/AssignSlice';
import { navigate, Link } from '@reach/router';
import { Spinner } from 'gestalt';
import Navbar from '../navbar/Navbar';
import './Profile.css';
  import  download  from '../../img/newlogo.png';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
   let { displayName, photoURL, phone,ispaid } = user;
  const [newname, setName2] = useState()
  const [users, setUsers] = useState([]);
  const [show2, setshow2] = useState(false);
  const [mshow, setmshow] = useState(false);
  const [showmodal, setshowmodal] = useState(false);
  // console.log("all Users",users )
 


  // console.log("user",user)

  const alert2= ()=>{
    alert("You have to pay to access this feature")
  }

  const updateName =  async( uid,doc) => {
    setshow2(true)
   await firestore.collection("users").doc(user.uid).update({displayName:newname.toLowerCase()});
   document.location.reload()
  };
 
  useEffect((e) => { 
   
    firestore.collection('users').onSnapshot(snapshot => {
     
      setUsers(snapshot.docs.map(doc => ({
        phone:doc.data().phone,
        displayName:doc.data().displayName,
      })))
    })
    
 

  },[]);



let exist=true
 
for (var i = 0; i < users.length; i++) {
    // console.log(users[i]);
  
    if (users[i].displayName===newname) {
      exist=true
      break;
    }
    else{
      exist=false
    }
}

const modaltriger = () => {
  setshowmodal(true);
}
console.log(showmodal)


  return (
    <div>
 

         
{showmodal==true?<h4>hello</h4>:""}
      
    
{displayName==null?

      <div class="container">
  <h4 style={{"color":"red"}}>You don't have a username.</h4>
  <h4>Please add username to send or receve docs</h4>
 
  <button type="button" class="btn btn-info btn-lg" id="myBtn" onClick={modaltriger}>Add Username</button>

 

    

      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Select a unique username</h4>
          <h5>This username will be used to send or recive documents</h5>
          <h5 style={{"color":"red"}} >NOTE: You will not be able to change it later.</h5>

        </div>
        <div class="modal-body">
        { displayName==null?
<div>
<input class="form-control"  placeholder='enter new username'onChange={(e) => setName2(e.target.value)} value={displayName} ></input>
<br></br>
</div>:
            ""

}
{show2 ?<Spinner show={true} ></Spinner>:""}

{exist?"":<button class="btn btn-primary" text='add username' onClick={() => {
      updateName(displayName);
    }} >Add </button>}
            {exist?<h4 style={{"color":"red"}} >This username is taken</h4>: "" }
        </div>
        <div class="modal-footer">  
        </div>
      </div>
  
</div>:""

}


  
     

    
    <Navbar/>
   
    </div>

  );
};
export default ProfilePage;
