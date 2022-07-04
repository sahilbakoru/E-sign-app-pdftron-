import React, { useEffect,useState } from 'react';
// import Profile from './Profile/Profile';
import Navbar from './navbar/Navbar';
import { navigate } from '@reach/router';
import { useDispatch } from 'react-redux';
// import SignList from './Lists/SignList';
// import SignedList from './Lists/SignedList';
import { resetDocToView } from './ViewDocument/ViewDocumentSlice';
import { resetDocToSign } from './SignDocument/SignDocumentSlice';
// import { Box, Button, Container, Heading } from 'gestalt';
import 'gestalt/dist/gestalt.css';
import  Widget  from './widget/Widget';
// import PricingPage from './Pricing/PricingPage';
// import { auth,firestore } from '../firebase/firebase';
import { useSelector} from 'react-redux';
import { selectUser, setUser } from '../firebase/firebaseSlice';
import { Features } from "../components/Pages/features"
import { About } from "../components/Pages/about"
import { Services } from "../components/Pages/services"
import { Contact } from "../components/Pages/contact"
import JsonData from "../data/data.json";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
   let { ispaid, displayName } = user;

console.log("ispaid",ispaid)
  useEffect(() => {
    dispatch(resetDocToView());
    dispatch(resetDocToSign());
    setLandingPageData(JsonData);
  }, [dispatch]);
  const [landingPageData, setLandingPageData] = useState({});
  
  const [show,setShow]=useState(false)
  const [show2,setShow2]=useState(false)

  const checkName=()=>{
    if(displayName===null){
     navigate("/setname")
    }
   
    
  }
  checkName()
  

  return (
    <div>
      <Navbar />
      <Widget/>
      <hr/>

      <About data={landingPageData.About} />
      <Features data={landingPageData.Features} /> 
      {/* <Services data={landingPageData.Services} /> */}
      <Contact data={landingPageData.Contact} />
    </div>
  );
};
export default ProfilePage;
