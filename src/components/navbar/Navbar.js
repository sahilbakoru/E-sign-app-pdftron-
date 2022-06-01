import React, { useEffect, useState } from "react";
import { navigate, Link } from "@reach/router";
import {
  auth,
  firestore,
  searchForDocumentToSign,
  searchForDocumentsSigned,
} from "../../firebase/firebase";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "../../firebase/firebaseSlice";
import { resetSignee } from "../Assign/AssignSlice";
import "./navbar.css";
import download from "../../img/newlogo.png";
import Helmet from "react-helmet";

const Navbar = () => {
  const [docs, setDocs] = useState([]);
  const [docs2, setDocs2] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  let { displayName, photoURL, phone, ispaid } = user;

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
  docs2.forEach(function (v) {
    res[v.isdelete === "true"] = (res[v.isdelete === "true"] || 0) + 1;
  });

  return (
    <div>
      <nav>
        <Link to="/" >
          <img style={{ width: "17rem" }} src={download}></img>
        </Link>

        <Helmet>
          <script type="text/javascript">
            {`
    function googleTranslateElementInit() {
      new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element')
    }
    `}
          </script>

          <script
            type="text/javascript"
            src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          ></script>
        </Helmet>

        <ul>
          {displayName === null ? (
            ""
          ) : (
            <div>
              {ispaid < 2 ? (
                ""
              ) : (
                <>
                  <li
                    onClick={(event) => {
                      navigate(`/assignUsers`);
                    }}
                  >
                    <button class="btn ">
                      <a href="#" style={{ color: "black" }}>
                        <i aria-hidden="true" class="fa fa-plus-circle fa-lg"></i>{" "}
                        Create
                      </a>
                    </button>
                  </li>
                </>
              )}
            </div>
          )}

          <li
            onClick={(event) => {
              navigate(`/tosign`);
            }}
          >
            <a href="#" style={{ color: "white" }}>
              {" "}
              <i class="fa fa-inbox"></i> Inbox
            </a>
            &nbsp;
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
              {docs.length}
            </span>
          </li>

          <li
            onClick={(event) => {
              navigate(`/toview`);
            }}
          >
            <a href="#" style={{ color: "white" }}>
              <i class="fa fa-edit"></i> Review
            </a>
            &nbsp;
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
              {res.false}
            </span>
          </li>

          <li
            onClick={(event) => {
              navigate(`/trash`);
            }}
          >
            <a href="#" style={{ color: "white" }}>
              <i class="fa fa-trash"></i> Trash{" "}
            </a>
          </li>
          <li> 
          <div class="dropdown">
  <span style={{color:"white"}}>
  <i class="fa fa-language" ></i> 
  &nbsp;  Language</span>
  <div class="dropdown-content">
  <div id="google_translate_element"></div>
  </div>
</div>                
             </li>
          <li
            onClick={() => {
              auth.signOut();
              dispatch(setUser(null));
              dispatch(resetSignee());
              navigate("/");
            }}
          >
            <a href="#" style={{ color: "#fc5603" }}>
              {" "}
              <i class="fa fa-power-off"></i> Sign out
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
