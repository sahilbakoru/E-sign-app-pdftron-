import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/functions';
import { mergeAnnotations } from '../components/MergeAnnotations/MergeAnnotations';

const firebaseConfig = {
  apiKey: "AIzaSyBgj9TdN3a5GDnPoj7trCuOiq23Ueycshc",
  authDomain: "ipostbox.firebaseapp.com",
  databaseURL: "https://ipostbox-default-rtdb.firebaseio.com",
  projectId: "ipostbox",
  storageBucket: "ipostbox.appspot.com",
  messagingSenderId: "689322563382",
  appId: "1:689322563382:web:aa408fd828cbdced808597",
  measurementId: "G-KVMGJXLE4P"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const functions = firebase.functions();
export { firebase};

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user,additionalData, phone) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
 const phonenew= auth.currentUser.phoneNumber

  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL ,ispaid} = user;
    try {
      await userRef.set({
        displayName,
        phone:phonenew,
        photoURL,
        ispaid:1,
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

export const addDocumentToSign = async (uid, phone, docRef, phones) => {
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
      phone,
      docRef,
      phones,
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

export const updateDocumentToSign = async (docId, phone, xfdfSigned) => {
  const documentRef = firestore.collection('documentsToSign').doc(docId);
  documentRef
    .get()
    .then(async doc => {
      if (doc.exists) {
        const { signedBy, phones, xfdf, docRef } = doc.data();
        if (!signedBy.includes(phone)) {
          const signedByArray = [...signedBy, phone];
          const xfdfArray = [...xfdf, xfdfSigned];
          await documentRef.update({
            xfdf: xfdfArray,
            signedBy: signedByArray,
          });

          if (signedByArray.length === phones.length) {
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

export const searchForDocumentToSign = async phone => {
  const documentsRef = firestore.collection('documentsToSign');
  const query = documentsRef
    .where('phones', 'array-contains', phone)
    .where('signed', '==', false);

  const querySigned = documentsRef
    .where('signedBy', 'array-contains', phone);

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
        const { docRef, phone, requestedTime } = doc.data();
        const docId = doc.id;
        if (!docIdSigned.includes(docId)) {
          docIds.push({ docRef, phone, requestedTime, docId });
        }
      });
    })
    .catch(function (error) {
      console.log('Error getting documents: ', error);
    });
  return docIds;
};

export const searchForDocumentsSigned = async phone => {
  const documentsRef = firestore.collection('documentsToSign');

  const docIds = [];

  let query = documentsRef
    .where('phone', '==', phone)
    .where('signed', '==', true);

  await query
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const { docRef, phones, signedTime,isdelete } = doc.data();
        const docId = doc.id;
        docIds.push({ docRef, phones, signedTime, docId,isdelete });
      });
    })
    .catch(function (error) {
      console.log('Error getting documents: ', error);
    });

  return docIds;
};

export const searchForDocumentsSend = async phone => {
  const documentsRef = firestore.collection('documentsToSign');

  const docIds = [];

  let query = documentsRef
    .where('phone', '==', phone)
    .where('signed', '==', false);

  await query
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        const { docRef, phones, signedTime,isdelete,requestedTime } = doc.data();
        const docId = doc.id;
        docIds.push({ docRef, phones, signedTime,requestedTime, docId,isdelete });
      });
    })
    .catch(function (error) {
      console.log('Error getting documents: ', error);
    });

  return docIds;
};
