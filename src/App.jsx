import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import swal from "sweetalert";
import "./styles.css";
import styled from "styled-components";
import SignUp from "./Modals/SignUp.jsx";
import Login from "./Modals/Login.jsx";
import Game from "./Game.jsx";

function App() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [game, setGame] = useState(false);

  if (show || show1) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  useEffect(() => {
    const x = localStorage.getItem('gameIs')
    const y = JSON.parse(x)
    setGame(y)
  }, []);

  useEffect(() => {
    console.log("game = ", game)
  }, [game]);

  function handleChange(newValue) {
    setGame(newValue);
  }

  if (!game) {
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
          key={"LogIn"}
          game={game}
          setGame={setGame}
          show1={show1}
          onClose1={(e) => {
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
          key={"SignUp"}
          show={show}
          onClose={(e) => {
            //e.stopPropagation();
            setShow(false);
          }}
        />
      </div>
    );
  } else {
    return (
      <div className="game">
        <Game game={game} setGame={setGame}/>
      </div>
    );
  }
}

export default App;
