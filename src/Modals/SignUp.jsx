import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SignUp.css";

export default function SignUp({ show, onClose }) {
  if (!show) {
    return null;
  }

  if (show) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");

  let data = {
    name: name,
    email: email,
    password: body,
  };

  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("data = ", data);
    axios
      .post("/user", data)
      .then(() => {
        swal(
          "🎊 Welcome! 🎊",
          `Your account information has been added!`,
          "success"
        );
        onClose();
      })
      .catch((err) => {
        console.log('err = ', err);
        swal(
          "Error",
          "That email is already used. Please try again later.",
          "error"
        );
      });
  };

  const Name = (
    <label>
      <div className="inputs">Name:</div>
      <input
        className="user-input"
        type="text"
        name="name"
        maxLength={60}
        size={40}
        placeholder="Example: john doe"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <p className="static"></p>
    </label>
  );

  const Email = (
    <label>
      <div className="inputs">Email:</div>
      <input
        className="user-input"
        type="email"
        name="email"
        maxLength={60}
        size={40}
        placeholder="Example: john@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <p className="static"></p>
    </label>
  );

  const Password = (
    <label>
      <div className="inputs">Password:</div>
      <input
        className="user-input"
        type="password"
        name="password"
        maxLength={50}
        size={36}
        placeholder="Enter password here..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />
    </label>
  );

  return (
    <div className={`modal ${show ? "show" : ""}`}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-header">
            <h3 className="modal-title">Sign Up</h3>
            {/* <h4 className="modal-subtitle">-------</h4> */}
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {Name}
              {Email}
              {Password}
              <br />
              <br />
              <input className="submit-button" type="submit" value="Submit" />
              <button className="close-button" onClick={onClose}>
                Cancel
              </button>
            </form>
          </div>
          <div className="modal-footer"></div>
        </div>
      </div>
    </div>
  );
}
