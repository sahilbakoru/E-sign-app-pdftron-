import React, { useEffect, useState } from 'react'
import { navigate,Link } from '@reach/router';
import { auth,firestore,searchForDocumentToSign,searchForDocumentsSigned } from '../../firebase/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, setUser } from '../../firebase/firebaseSlice';
import { resetSignee } from '../Assign/AssignSlice';
import './navbar.css'
import  download  from '../../img/newlogo.png';



const Navbar = () => {
  const [docs, setDocs] = useState([]);
  const [docs2, setDocs2] = useState([]);

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
   let { displayName, photoURL, phone,ispaid } = user;

   useEffect(() => {
    async function getDocs() {
      const docsToSign = await searchForDocumentToSign(phone);
      const docsToView = await searchForDocumentsSigned(phone);
      setDocs(docsToSign);
      setDocs2(docsToView);
     
      
      // setShow(false);
    }

    setTimeout(getDocs, 1);
  }, [phone]);
// console.log(docs.length)
let res = {};
docs2.forEach(function(v) {
  res[v.isdelete==="true"] = (res[v.isdelete==="true"] || 0) + 1;
})

  return (
    <div>

       <nav>
       <Link to="/" className='profileLink'><img style={{width:"17rem"}} src={download}></img></Link> 
  <ul>
    {displayName===null?"":
<div>
{ispaid<2?"":
    <li  onClick={event => {
              navigate(`/assignUsers`);
            }}
    ><button class="btn "><a href="#" style={{color:"black"}}><i  aria-hidden="true" class="fa fa-plus-circle fa-lg"></i> Create</a></button></li>

          }
</div>
}

    <li onClick={event => {
              navigate(`/tosign`);
            }}
    ><a href="#" style={{color:"white"}}> <i class="fa fa-inbox"></i>  Inbox</a>
    &nbsp;
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
    {docs.length}
  </span>
    </li>



    <li  onClick={event => {
              navigate(`/toview`);
            }}
    ><a href="#" style={{color:"white"}}><i class="fa fa-edit"></i> Review</a>
        &nbsp;
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
    {res.false}
  </span>
    </li>



    <li   onClick={event => {
              navigate(`/trash`);
            }}
    ><a href="#" style={{color:"white"}}><i class="fa fa-trash"></i> Trash </a></li>
    
    <li onClick={() => {
                  auth.signOut();
                  dispatch(setUser(null));
                  dispatch(resetSignee())
                  navigate('/');
                }}
    ><a href="#" style={{color:"#fc5603"}}> <i class="fa fa-power-off"></i> Sign out</a></li>

  </ul>
</nav>

    </div>
  )
}

export default Navbar