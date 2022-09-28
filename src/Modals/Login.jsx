import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SignUp.css";

export default function Login({ game, setGame, show1, onClose1 }) {
  if (!show1) {
    return null;
  }

  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");

  let data = {
    email: email,
    password: body,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http:/localhost:3000/login", data)
      .then((result) => {
        swal(
          `🎗 Welcome, ${result.data.rows[0].name} 🎗`,
          `Enjoy the game!`,
          "success"
        );
        onClose1();
        console.log("game(post) = ", game);
        return setGame(true);
      })
      .catch(() => {
        swal(
          "Error",
          "That email/password is incorrect. Please try again later.",
          "error"
        );
      });
  };

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
    <div className={`modal ${show1 ? "show1" : ""}`}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-header">
            <h3 className="modal-title">Login</h3>
            {/* <h4 className="modal-subtitle">-------</h4> */}
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {Email}
              {Password}
              <br />
              <br />
              <input className="submit-button" type="submit" value="Submit" />
              <button className="close-button" onClick={onClose1}>
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
