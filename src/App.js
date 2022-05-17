import React, { useEffect } from 'react';
import { Router } from '@reach/router';
import { useSelector, useDispatch } from 'react-redux';

import AssignUsers from './components/AssignUsers';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Preparation from './components/Preparation';
import Sign from './components/Sign';
import View from './components/View';
import Header from './components/Header';
import PasswordReset from './components/PasswordReset/PasswordReset';
import Welcome from './components/Welcome';
import Tosign from './components/Tosign';
import Toview from './components/Toview';
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
        const { uid, displayName, phone, photoURL,ispaid } = user;
        dispatch(setUser({ uid, displayName, phone, photoURL,ispaid }));
      }
    });
  }, [dispatch]);

  return user ? (
    <div>
      <Router>
        <Welcome path="/" />
       <AssignUsers path="/assignUsers" />
        <Preparation path="/prepareDocument" />
        <Sign path="/signDocument" />
        <View path="/viewDocument" />
        <Tosign path="/tosign" />
        <Toview path="/toview" />
        <Trashcan path="/trash" />
      </Router>
    </div>
  ) : (
    <div>
      <Header />
      <Router>
       <Allhome path="/" />
        <SignIn path="/SignIn" />
        <SignUp path="signUp" />
        <PasswordReset path="passwordReset" />
      </Router>
    </div>
  );
};

export default App;
