import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import swal from "sweetalert";
import "./styles.css";
import SignUp from "./Modals/SignUp.jsx";
import Login from "./Modals/Login.jsx";

function App() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const key = "unique";

  if (show) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <div>
      <div className="cool">
        <div className="sign">
          <span className="fast-flicker">D</span>ark
          <span className="flicker"> Sprite</span>s
        </div>
      </div>
      <button
        className="login"
        onClick={(e) => {
          //e.stopPropagation();
          setShow1(true);
        }}
      >
        Login
      </button>
      <Login
        key={key}
        show={show1}
        onClose={(e) => {
          //e.stopPropagation();
          setShow1(false);
        }}
      />
      <button
        className="signup"
        onClick={(e) => {
          //e.stopPropagation();
          setShow(true);
        }}
      >
        Sign Up
      </button>
      <SignUp
        key={user.email}
        show={show}
        onClose={(e) => {
          //e.stopPropagation();
          setShow(false);
        }}
      />
    </div>
  );
}

export default App;

/*
<button
        className="signup"
        onClick={(e) => {
          showModal();
        }}
      >
        Sign Up
      </button>
      <SignUp show={show} setShow={setShow} />

*/
