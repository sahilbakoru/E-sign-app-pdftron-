import React, { useEffect,useState } from 'react';
import Profile from './Profile/Profile';
import { navigate } from '@reach/router';
import { useDispatch } from 'react-redux';
import SignList from './Lists/SignList';
import SignedList from './Lists/SignedList';
import { resetDocToView } from './ViewDocument/ViewDocumentSlice';
import { resetDocToSign } from './SignDocument/SignDocumentSlice';
// import { Box, Button, Container, Heading } from 'gestalt';
import 'gestalt/dist/gestalt.css';
import  Widget  from './widget/Widget';
import PricingPage from './Pricing/PricingPage';
import { auth,firestore } from '../firebase/firebase';
import { useSelector} from 'react-redux';
import { selectUser, setUser } from '../firebase/firebaseSlice';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
   let { ispaid } = user;

console.log("ispaid",ispaid)
  useEffect(() => {
    dispatch(resetDocToView());
    dispatch(resetDocToSign());
  }, [dispatch]);

  const [show,setShow]=useState(false)
  const [show2,setShow2]=useState(false)



  return (
    <div>
      <Profile />
      <Widget/>
      <hr/>
      {ispaid>1?"":<PricingPage/>}
      
       
       
     
    </div>
  );
};
export default ProfilePage;
