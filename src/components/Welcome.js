import React, { useEffect,useState } from 'react';
import Profile from './Profile/Profile';
import { navigate } from '@reach/router';
import { useDispatch } from 'react-redux';
import SignList from './Lists/SignList';
import SignedList from './Lists/SignedList';
import { resetDocToView } from './ViewDocument/ViewDocumentSlice';
import { resetDocToSign } from './SignDocument/SignDocumentSlice';
import { Box, Button, Container, Heading } from 'gestalt';
import 'gestalt/dist/gestalt.css';
import  Widget  from './widget/Widget';
// import Navbar from './navbar/Navbar';


const ProfilePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetDocToView());
    dispatch(resetDocToSign());
  }, [dispatch]);

  const [show,setShow]=useState(false)
  const [show2,setShow2]=useState(false)



  return (
    <div>
      <Profile />
      
      {/* <Navbar/> */}
      <Widget/>


        {/* <Box padding={3}>
          <Heading size="md" color="orange" >{` Documents to sign ✍🏻`}  <button style={{"marginLeft":"40%"}} className='btn btn-primary ' onClick={()=>setShow(!show)} >Hide / Show</button></Heading>
        </Box> */}
        {/* {
       show?<Box padding={5}>
       <SignList />
     </Box>
:null
     }

        <hr/> */}
        {/* <Box padding={3}>
          <Heading size="md"  color="black">{`Prepare Document 📝`}</Heading>
        </Box> */}
        {/* <Box padding={3}>
          <Button
            onClick={event => {
              navigate(`/assignUsers`);
            }}
            text="Prepare Document for Signing"
            color="blue"
            inline      
          />
        
        </Box> */}
     
        {/* <Box padding={10}>
          <Heading size="md" >{`Review Signed Documents  📄`} <button style={{"marginLeft":"25%"}} className='btn btn-primary ' onClick={()=>setShow2(!show2)} >Hide / Show</button></Heading>
        </Box>
        */}
        {/* {
       show2?<Box padding={5}>
       <SignedList />
     </Box>
:null
     } */}
       
     
    </div>
  );
};
export default ProfilePage;
