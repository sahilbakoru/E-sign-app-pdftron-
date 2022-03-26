import React, { useState } from 'react';
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
  console.log(user)

  const updateName =  async( uid,doc) => {
    //  const newname2 =JSON.stringify(id)
    // console.log("set users", setName2)
 console.log("newname", newname)
console.log("id", user.uid)

   await firestore.collection("users").doc(user.uid).update({displayName:newname});
  };
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
{ displayName==null?
<div>
<input placeholder='enter username'onChange={(e) => setName2(e.target.value)} value={displayName} ></input>
<button color='blue' text='add username' onClick={() => {
      updateName(displayName);
    }} >add username</button>
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
