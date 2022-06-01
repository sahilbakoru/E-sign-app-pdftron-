import { useState,useRef } from 'react'
import emailjs from '@emailjs/browser';
import { navigate } from '@reach/router';


export const Contact = (props) => {
const [send,setsend] = useState(false)
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_sqlagp8', 'template_vankz85', form.current, 'y37TpNVFos_t9LQz-')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
        });
      e.target.reset();
setsend(true)
const tothetop=()=>{
  window.scrollTo(0,0)
}

 setInterval(tothetop,2000)
      };


  return (
    <div>
      <div id='contact'>
        <div className='container'>
          <div className='col-md-8'>
            <div className='row'>
              <div className='section-title'>
                <h2>Get In Touch</h2>
                <p>
                  Please fill out the form below to send us an email and we will
                  get back to you as soon as possible.
                </p>
              </div>
{send?<div class="alert alert-success" role="alert">
  Message send successfully 
</div>
:""}
              <form ref={form} onSubmit={sendEmail}>
      <label style={{fontSize:"2rem"}}>Message</label>
      <textarea name="message" 
      d='message'
      className='form-control'
      rows='4'
      placeholder='Type something here...'
      />
    
      <input type="submit" value="Send" className='btn btn-custom btn-lg' />
    </form>
              {/* <form name='sentMessage' validate onSubmit={handleSubmit}>
                <div className='row'>
                </div>
                <div className='form-group'>
                  <textarea
                    name='message'
                    id='message'
                    className='form-control'
                    rows='4'
                    placeholder='Message'
                    required
                    onChange={handleChange}
                  ></textarea>
                  <p className='help-block text-danger'></p>
                </div>
                <div id='success'></div>
                <button type='submit' className='btn btn-custom btn-lg'>
                  Send Message
                </button>
              </form> */}
            </div>
          </div>
          <div className='col-md-3 col-md-offset-1 contact-info'>
            <div className='contact-item'>
              <h3>Contact Info</h3>
              <p>
                <span>
                  <i className='fa fa-map-marker'></i> Address
                </span>
                {props.data ? props.data.address : 'loading'}
              </p>
            </div>
            <div className='contact-item'>
              <p>
                <span>
                  <i className='fa fa-phone'></i> Phone
                </span>{' '}
                {props.data ? props.data.phone : 'loading'}
              </p>
            </div>
            <div className='contact-item'>
              <p>
                <span>
                  <i className='fa fa-envelope-o'></i> Email
                </span>{' '}
                {props.data ? props.data.email : 'loading'}
              </p>
            </div>
          </div>
          <div className='col-md-12'>
            <div className='row'>
              <div className='social'>
                <ul>
                  <li>
                    <a href={props.data ? props.data.facebook : '/'}>
                      <i className='fa fa-facebook'></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.twitter : '/'}>
                      <i className='fa fa-twitter'></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.instagram : '/'}>
                      <i className='fa fa-instagram'></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.linkedin : '/'}>
                      <i className='fa fa-linkedin'></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
       <div id='footer'>
        <div className='container text-center'>
          <p>
            &copy; Vervebot , Design by{' '}
            <a href='http://www.vervebot.io' rel='nofollow'>
              vervebot
            </a> 
          </p>
        <button  className="btn" onClick={event => {
            navigate(`/privacy`);
            window.scrollTo(0, 0)
          }}>Privacy Policy</button>
        </div>
      </div> 
    </div>
  )
}
