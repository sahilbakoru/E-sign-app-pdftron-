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
         <ul class="cards">
           <center>
            
  <li style={{ padding:"3rem", border:"1px solid black", borderRadius:"3rem",background:"linear-gradient(to right, #12c2e9, #c471ed, #f64f59)"}} >
  <h2  style={{color:"wheat"}} >  <i class="fa fa-user"></i> {displayName}'s Dashboard </h2>
  <br/>
  <h2  >  <i class="fa fa-files-o"></i> balance : {ispaid-1} </h2>

  <h3 > Phone : {phone} </h3>
  </li>
  </center>
  <li>
  <PricingPage/>
  </li>
  {/* <li>

    <a  style={{border:"1px solid black"}} href="" class="card">
      <img src={uielement3} class="card__image" alt="" />
      <div class="card__overlay">
        <div class="card__header">
          <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
          <img class="card__thumb" src={stats} alt="" />
          <div class="card__header-text">
            <h3 class="card__title">stats</h3>
            <span class="card__tagline"></span>            
            <span class="card__status"></span>
          </div>
        </div>
        <p class="card__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis?</p>
      </div>
    </a>
  </li>
     */}
</ul>

</div>
  )
}
export default Widget