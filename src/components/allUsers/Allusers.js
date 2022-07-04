import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { navigate } from "@reach/router";
import { selectUser } from "../../firebase/firebaseSlice";
import { firestore } from "../../firebase/firebase";

const Allusers = () => {
  const user = useSelector(selectUser);
  const [users, setUsers] = useState([]);
  let { phone } = user;

  useEffect((e) => {
    firestore.collection("users").onSnapshot((snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => ({
          phone: doc.data().phone,
          displayName: doc.data().displayName,
          ispaid: doc.data().ispaid,
        }))
      );
    });
  }, []);
  // console.log("all users",users) 

  if (phone == !+353838804056) {
    navigate("/");
  }

  return (
    <div style={{ padding: "4rem", color: "black" }}>
      <button
        onClick={(event) => {
          navigate(`/`);
        }}
      >
        Home
      </button>

      <h1>Total: {users.length}</h1>

      <table class="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">NAME</th>
            <th scope="col">PHONE</th>
            <th scope="col">BALANCE</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr>
              <th scope="row"></th>
              <td>{user.displayName}</td>
              <td>{user.phone}</td>
              <td>{user.ispaid - 1}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Allusers;
