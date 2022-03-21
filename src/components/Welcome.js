import React, { useEffect } from 'react';
import Profile from './Profile/Profile';
import { navigate } from '@reach/router';
import { useDispatch } from 'react-redux';
import SignList from './Lists/SignList';
import SignedList from './Lists/SignedList';
import { resetDocToView } from './ViewDocument/ViewDocumentSlice';
import { resetDocToSign } from './SignDocument/SignDocumentSlice';
import { Box, Button, Container, Heading } from 'gestalt';
import 'gestalt/dist/gestalt.css';


const ProfilePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetDocToView());
    dispatch(resetDocToSign());
  }, [dispatch]);

  return (
    <div>
      <Profile />
      <Container>
        <Box padding={3}>
          <Heading size="md" color="orange" >{` Documents to sign ✍🏻`}</Heading>
        </Box>
      

        <Box padding={5}>
          <SignList />
        </Box>
        <hr/>
        <Box padding={3}>
          <Heading size="md"  color="black">{`Prepare Document 📝`}</Heading>
        </Box>
        <Box padding={3}>
          <Button
            onClick={event => {
              navigate(`/assignUsers`);
            }}
            text="Prepare Document for Signing"
            color="blue"
            inline      
          />
        <hr/>
        </Box>
        <Box padding={10}>
          <Heading size="md" >{`Review Signed Documents  📄`}</Heading>
        </Box>
        <Box padding={5}>
          <SignedList />
        </Box>
      </Container>
    </div>
  );
};
export default ProfilePage;
