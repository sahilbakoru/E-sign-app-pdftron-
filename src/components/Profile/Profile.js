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
import './Profile.css';


const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { displayName, photoURL, phone } = user;
  const [newname, setName2] = useState()
  const [users, setUsers] = useState([]);
  console.log("all Users",users )


  console.log("user",user)

  const updateName =  async( uid,doc) => {
   
   await firestore.collection("users").doc(user.uid).update({displayName:newname});
   document.location.reload()
  };


  useEffect((e) => { 
   
    firestore.collection('users').onSnapshot(snapshot => {
     
      setUsers(snapshot.docs.map(doc => ({
        // id:doc.id,
        displayName:doc.data().displayName,
      })))
    })
    
 

  },[]);

let exist=true
 
for (var i = 0; i < users.length; i++) {
    console.log(users[i]);
    if (users[i].displayName===newname) {
      exist=true
      break;
    }
    else{
      exist=false
    }
}



  return (
    <Box display="flex" direction="row" paddingY={2} color={'lightGray'}>
      <Column span={9}>
        <Box padding={3}>
          <Link to="/" className='profileLink'><Heading size="lg">Vervebot </Heading></Link>
        </Box>
      </Column>
    
      <Column span={3}>
        <Box padding={1}>
          <Row>

            <Stack>
             
              <Text>{phone}</Text>
            </Stack>


            {displayName==null?"please add username to send or receve docs":""}
            {exist?<h4>❌ </h4>: "" }

&nbsp;
&nbsp; 
{ displayName==null?
<div>
<input placeholder='enter username'onChange={(e) => setName2(e.target.value)} value={displayName} ></input>
<button color='blue' text='add username' onClick={() => {
      updateName(displayName);
    }} >add </button>
</div>:
            <Stack>
              <Text>{displayName}</Text>
            </Stack>

}

            <Box padding={1}>
              <Button
                onClick={() => {
                  auth.signOut();
                  dispatch(setUser(null));
                  dispatch(resetSignee())
                  navigate('/');
                }}
                accessibilityLabel="Sign out of your account"
                text="Sign out"
                color='red'
              />
            </Box>
          </Row>
        </Box>
      </Column>
    </Box>
  );
};
export default ProfilePage;
