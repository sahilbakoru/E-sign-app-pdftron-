import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { navigate } from '@reach/router';
import {
  Box,
  Button,
  Container,
  Heading,
  TextField,
  Table,
  Text,
  Toast,
} from 'gestalt';
import 'gestalt/dist/gestalt.css';
import { addSignee, selectAssignees } from './AssignSlice';
import { selectUser } from '../../firebase/firebaseSlice';
import { auth,firestore } from '../../firebase/firebase';

const Assign = () => {
  let [phone, setphone] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showToast, setShowToast] = useState(false);
  const assignees = useSelector(selectAssignees);
  const user2 =useSelector(selectUser)
  const [usersAssign, setUsersAssign] = useState([]);
  const dispatch = useDispatch();


 

  const noNavigate=()=>{
    if(user2.ispaid===1){
      console.log(user2.ispaid)
      navigate(`/`)
    }
  }
  setTimeout(() => {noNavigate();}, 10)

  const noUsername=()=>{
    if(user2.displayName===null){
      navigate(`/`)
    }
  }
  setTimeout(() => {noUsername();}, 1)

  const prepare = () => {
    if (assignees.length > 0) {
      navigate(`/prepareDocument`);
    } else {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 1000);
    }
  };

  

  useEffect((e) => { 
   
    firestore.collection('users').onSnapshot(snapshot => {
     
      setUsersAssign(snapshot.docs.map(doc => ({
        phone:doc.data().phone,
        displayName:doc.data().displayName,
      })))
    })
    
 

  },[]);


let exist="something"
  for (var i = 0; i < usersAssign.length; i++) {
    if (usersAssign[i].displayName===displayName) {
        (exist = usersAssign[i].phone)
        console.log("exist",exist)
     break
    }
    else{
   console.log("not exist")
    }

}

let setingphone=()=>{
  setphone(exist.toLowerCase())
}
setTimeout(() => {setingphone();}, 100)



  const addUser = (name, phone) => {
    const key = `${new Date().getTime()}${phone}`;
    if (name !== '' && phone !== '') {
      dispatch(addSignee({ key, name, phone }));
      setphone('');
      setDisplayName('');
    }
  };

  console.log("phone",phone)
  console.log("displayName",displayName)


  return (
    <div>
      <Box padding={3}>
        <Container>
          <Box padding={3}>
            <Heading size="md">Who needs to sign?</Heading>
          </Box>
          <Box padding={2} >
            <TextField
              id="displayName"
              onChange={event => setDisplayName(event.value)}
              placeholder="Enter recipient's name"
              label="Name"
              value={displayName.toLowerCase()}
              type="text"
            />
          </Box>
          {/* <Box padding={2}>
            <TextField
              id="phone"
              onChange={event => setphone(event.value)}
              placeholder="Enter recipient's phone"
              label="phone"
              value={phone}
              type="phone"
            />
          </Box> */}
          
          <Box padding={2}>
            <Button
              onClick={event => {
                addUser(displayName.toLowerCase(), phone);
              }}
              text="Add user"
              color="blue"
              inline
            />
          </Box>
          <Box padding={2}>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    <Text weight="bold">Name</Text>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    {/* <Text weight="bold">phone</Text> */}
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {assignees.map(user => (
                  <Table.Row key={user.key}>
                    <Table.Cell>
                      <Text>{user.name.toLowerCase()}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      {/* <Text>{user.phone}</Text> */}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Box>
          <Box padding={2}>
            <Button onClick={prepare} text="Continue" color="blue" inline />
          </Box>
          <Box
            fit
            dangerouslySetInlineStyle={{
              __style: {
                bottom: 50,
                left: '50%',
                transform: 'translateX(-50%)',
              },
            }}
            paddingX={1}
            position="fixed"
          >
            {showToast && (
              <Toast color="red" text={<>Please add at least one user</>} />
            )}
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default Assign;
