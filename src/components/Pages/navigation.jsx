import { navigate } from '@reach/router';

export const Navigation = (props) => {
  return (
    <nav style={{background:"black"}} id='menu' className='navbar navbar-default navbar-fixed-top'>
      <div className='container'>
        <div className='navbar-header'>
          <button
            type='button'
            className='navbar-toggle collapsed'
            data-toggle='collapse'
            data-target='#bs-example-navbar-collapse-1'
          >
            {' '}
            <span className='sr-only'>Toggle navigation</span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
          </button>
          
        </div>

        <div
          className='collapse navbar-collapse'
          id='bs-example-navbar-collapse-1'
        >
          <ul className='nav navbar-nav navbar-right'>
            <li>
              <a style={{color:"white"}} href='#features' className='page-scroll'>
                Features
              </a>
            </li>
            <li>
              <a style={{color:"white"}}href='#about' className='page-scroll'>
                About
              </a>
            </li>
            <li >
              <a style={{color:"white"}} href='#services' className='page-scroll'>
                Services
              </a>
            </li>
            <li>
              <a style={{color:"white"}} href='#portfolio' className='page-scroll'>
                Gallery
              </a>
            </li>
            <li>
              <a  style={{color:"white"}} href='#testimonials' className='page-scroll'>
                Testimonials
              </a>
            </li>
            <li>
              <a  style={{color:"white"}} href='#team' className='page-scroll'>
                Team
              </a>
            </li>
            <li>
              <a style={{color:"white"}} href='#contact' className='page-scroll'>
                Contact
              </a>
            </li>
            <li onClick={event => {
              navigate(`/SignIn`);
            }} >
              <a style={{color:"aqua"}} href='#' className='page-scroll' >
               Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
