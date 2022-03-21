import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import { mergeAnnotations } from '../components/MergeAnnotations/MergeAnnotations';

const firebaseConfig = {
  apiKey: "AIzaSyA9At5Ox5pV5wmHX3atBAHTnn8t7kefMb8",
  authDomain: "habydate-test.firebaseapp.com",
  databaseURL: "https://habydate-test-default-rtdb.firebaseio.com",
  projectId: "habydate-test",
  storageBucket: "habydate-test.appspot.com",
  messagingSenderId: "511126883810",
  appId: "1:511126883810:web:b2227137787cb4a0a4fdbb",
  measurementId: "G-BSXWY4F9FD"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData,
      });
    } catch (error) {
      console.error('Error creating user document', error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error('Error fetching user', error);
  }
};

export const addDocumentToSign = async (uid, email, docRef, emails) => {
  if (!uid) return;
  const signed = false;
  const xfdf = [];
  const signedBy = [];
  const requestedTime = new Date();
  const signedTime = '';
  firestore
    .collection('documentsToSign')
    .add({
      uid,
      email,
      docRef,
      emails,
      xfdf,
      signedBy,
      signed,
      requestedTime,
      signedTime,
    })
    .then(function (docRef) {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch(function (error) {
      console.error('Error adding document: ', error);
    });
};

export const updateDocumentToSign = async (docId, email, xfdfSigned) => {
  const documentRef = firestore.collection('documentsToSign').doc(docId);
  documentRef
    .get()
    .then(async doc => {
      if (doc.exists) {
        const { signedBy, emails, xfdf, docRef } = doc.data();
        if (!signedBy.includes(email)) {
          const signedByArray = [...signedBy, email];
          const xfdfArray = [...xfdf, xfdfSigned];
          await documentRef.update({
            xfdf: xfdfArray,
            signedBy: signedByArray,
          });

          if (signedByArray.length === emails.length) {
            const time = new Date();
            await documentRef.update({
              signed: true,
              signedTime: time,
            });

            mergeAnnotations(docRef, xfdfArray);
          }
        }
      } else {
        console.log('No such document!');
      }
    })
    .catch(function (error) {
      console.log('Error getting document:', error);
    });
};

export const searchForDocumentToSign = async email => {
  const documentsRef = firestore.collection('documentsToSign');
  const query = documentsRef
    .where('emails', 'array-contains', email)
    .where('signed', '==', false);

  const querySigned = documentsRef
    .where('signedBy', 'array-contains', email);

  const docIds = [];
  const docIdSigned = [];

  await querySigned
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const docId = doc.id;
        docIdSigned.push(docId);
      });
    })
    .catch(function (error) {
      console.log('Error getting documents: ', error);
    });

  await query
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const { docRef, email, requestedTime } = doc.data();
        const docId = doc.id;
        if (!docIdSigned.includes(docId)) {
          docIds.push({ docRef, email, requestedTime, docId });
        }
      });
    })
    .catch(function (error) {
      console.log('Error getting documents: ', error);
    });
  return docIds;
};

export const searchForDocumentsSigned = async email => {
  const documentsRef = firestore.collection('documentsToSign');

  const docIds = [];

  let query = documentsRef
    .where('email', '==', email)
    .where('signed', '==', true);

  await query
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const { docRef, emails, signedTime } = doc.data();
        const docId = doc.id;
        docIds.push({ docRef, emails, signedTime, docId });
      });
    })
    .catch(function (error) {
      console.log('Error getting documents: ', error);
    });

  return docIds;
};
