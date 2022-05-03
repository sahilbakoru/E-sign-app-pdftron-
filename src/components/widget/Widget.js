import React from 'react'
import './widget.css'
import uielement from '../../img/uielement.jpeg'
import uielement2 from '../../img/uielement2.jpeg'
import uielement3 from '../../img/uielement3.jpeg'
import uielement4 from '../../img/uielement4.jpeg'
import uielement5 from '../../img/uielement5.jpeg'
import posted from '../../img/home-location.png'
import rocket from '../../img/rocket.png'
import stats from '../../img/stats.png'
import edit from '../../img/edit.png'
import users from '../../img/users.png'





 const Widget = () => {
  return (
      <div>
         
     
         <ul class="cards">
  <li>
    <a href="#" class="card">
      <img src={uielement} class="card__image" alt="" />
      <div class="card__overlay">
   
        <div class="card__header">
          <svg class="card__arc" xmlns=""><path /></svg>  
                          
          <img class="card__thumb" src={posted} alt="" />
          <div class="card__header-text">
            <h3 class="card__title">home</h3>            
            <span class="card__status">1 hour ago</span>
          </div>
        </div>
        <p class="card__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis?</p>
      </div>
    </a>      
  </li>
  <li>
    <a href="#" class="card">
      <img src={uielement2} class="card__image" alt="" />
      <div class="card__overlay">        
        <div class="card__header">
          <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                 
          <img class="card__thumb" src={edit} alt="" />
          <div class="card__header-text">
            <h3 class="card__title">edit</h3>
            <span class="card__status">3 hours ago</span>
          </div>
        </div>
        <p class="card__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis?</p>
      </div>
    </a>
  </li>
  <li>
      {/* "https://i.imgur.com/oYiTqum.jpg" */}
    <a href="" class="card">
      <img src={uielement3} class="card__image" alt="" />
      <div class="card__overlay">
        <div class="card__header">
          <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
          <img class="card__thumb" src={stats} alt="" />
          <div class="card__header-text">
            <h3 class="card__title">stats</h3>
            <span class="card__tagline"></span>            
            <span class="card__status">1 hour ago</span>
          </div>
        </div>
        <p class="card__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis?</p>
      </div>
    </a>
  </li>
  <li>
    <a href="" class="card">
      <img src={uielement5} class="card__image" alt="" />
      <div class="card__overlay">
        <div class="card__header">
          <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                 
          <img class="card__thumb" src={users} alt="" />
          <div class="card__header-text">
            <h3 class="card__title">users</h3>
            <span class="card__status">3 hours ago</span>
          </div>          
        </div>
        <p class="card__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis?</p>
      </div>
    </a>
  </li>    
</ul>

</div>
  )
}
export default Widget