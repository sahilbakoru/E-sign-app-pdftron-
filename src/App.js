import React, { useEffect } from 'react';
import { Router } from '@reach/router';
import { useSelector, useDispatch } from 'react-redux';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import AssignUsers from './components/AssignUsers';
import SignIn from './components/SignIn/SignIn';
import Profile from './components/Profile/Profile';
// import SignUp from './components/SignUp/SignUp';
import Sucsess from './components/Pricing/Sucsess';
import Cancel from './components/Pricing/Cancel';
import Allusers from './components/allUsers/Allusers';
import Preparation from './components/Preparation';
import Sign from './components/Sign';
import View from './components/View';
import Header from './components/Header';
// import PasswordReset from './components/PasswordReset/PasswordReset';
import Welcome from './components/Welcome';
import Tosign from './components/Tosign';
import Toview from './components/Toview';
import Sends from './components/Sends';
import Trashcan from './components/Trashcan';
import Allhome from './Allhome';
import { auth, generateUserDocument } from './firebase/firebase';
import { setUser, selectUser } from './firebase/firebaseSlice';

import './App.css';

const App = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const user = await generateUserDocument(userAuth);
        const { uid, displayName, phone, photoURL,ispaid,paying } = user;
        dispatch(setUser({ uid, displayName, phone, photoURL,ispaid,paying }));
      }
    });
  }, [dispatch]);


  return user ? (
    <div>
    {user.displayName===!null?"":
    <Profile path="/setname"/>}  
      <Router>
      <Privacy path="/privacy" />
        <Welcome path="/" />
       <AssignUsers path="/assignUsers" />
        <Preparation path="/prepareDocument" />
        <Sign path="/signDocument" />
        <View path="/viewDocument" />
        <Tosign path="/tosign" />
        <Toview path="/toview" />
        <Trashcan path="/trash" />
        <Sends path="/send" />
        <Sucsess path="/sucsess" />
        <Cancel path="/justincase"/>
        <Terms path="/terms" />
        <Allusers path="/allusers"/>
      </Router>
    </div>
  ) : (
    <div>
      <Header />
      <Router>
       <Allhome path="/" />
        <SignIn path="/SignIn" />
        <Privacy path="/privacy" />
      <Terms path="/terms" />
      </Router>
    </div>
  );
};

export default App;
