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
         <ul className="cards">
           <center>
            
  <li style={{ padding:"3rem", border:"1px solid black", borderRadius:"3rem",background:"linear-gradient(to right, #12c2e9, #c471ed, #f64f59)"}} >
  <h2  style={{color:"wheat"}} >  <i className="fa fa-user"></i> {displayName}'s Dashboard </h2>
  <br/>
  <h2  >  <i className="fa fa-files-o"></i> balance : {ispaid-1} </h2>

  <h3 > Phone : {phone} </h3>
  </li>
  </center>
  <li>
  <PricingPage/>
  </li>
  
</ul>

</div>
  )
}
export default Widget