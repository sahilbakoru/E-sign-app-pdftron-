import React from 'react'
import './widget.css'

import PricingPage from '../Pricing/PricingPage';
// import { firestore } from '../../firebase/firebase';
import { useSelector} from 'react-redux';
import { selectUser } from '../../firebase/firebaseSlice';
import Helmet from 'react-helmet';





 const Widget = () => {
  const user = useSelector(selectUser);
  let { ispaid,displayName,phone} = user;




  return (
      <div>
         <ul className="cards" >
           <div >
           <center >
            
  <li  style={{ padding:"2.5rem", border:"1px solid black", borderRadius:"3rem",background:"linear-gradient(to right, #9796f0, #fbc7d4)"}} >
  <h2 >  <i className="fa fa-user"></i> {displayName}'s Dashboard </h2>
  <br/>
  <h2  >  <i className="fa fa-files-o"></i> balance : {ispaid-1} </h2>

  <h3 > Phone : {phone} </h3>
  </li>
  </center>
  </div>
  <li>
  <PricingPage/>
  </li>
  
</ul>

</div>
  )
}
export default Widget