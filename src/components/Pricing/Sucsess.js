import React from 'react'
import { firestore } from '../../firebase/firebase';
import { useSelector} from 'react-redux';
import { selectUser, setUser } from '../../firebase/firebaseSlice';
import { navigate } from '@reach/router';

const Sucsess = () => {

    const user = useSelector(selectUser);
    const user2 =useSelector(selectUser)
    let { ispaid,paying } = user;

    const plusOne=async(uid,doc)=>{
        if(paying==="true"){
        await firestore.collection("users").doc(user2.uid).update({paying:"false",ispaid:ispaid+10});

           }
            }
            plusOne()

      setTimeout(() => {Navigate();}, 10)
            const Navigate=()=>{
                if(paying==="false"){
                  navigate(`/justincase`)
                }
              }
              const navigateHome=()=>{
                if(paying==="true"){
                  navigate(`/`)
                }
              }
              setTimeout(() => {navigateHome();}, 3000)
  return (
    <div>
<h1>payment sucsessfull </h1>
    </div>
  )
}

export default Sucsess