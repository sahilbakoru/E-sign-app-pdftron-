import { navigate ,Link} from '@reach/router';
import download from "../../img/newlogo.png";

export const Navigation = (props) => {
  return (
    <nav style={{background:"#0f2a61"}} id='menu' className='navbar navbar-default navbar-fixed-top'>
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
          <Link to="/" className="profileLink">
          <img style={{ width: "14rem" }} src={download}></img>
        </Link>
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
