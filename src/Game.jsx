import React, { useState, useEffect, useCallback } from "react";
import styled, { keyframes } from "styled-components";
// player gifs ----------------------------------
import playerIdle from "./Images/playerGifs/playerIdle.gif";
import playerIdleLeft from "./Images/playerGifs/playerIdleLeft.gif";
import playerRun from "./Images/playerGifs/playerRun.gif";
import playerRunLeft from "./Images/playerGifs/playerRunLeft.gif";
import playerAttack from "./Images/playerGifs/playerAttack.gif";
import playerAttackLeft from "./Images/playerGifs/playerAttackLeft.gif";
// other gifs ----------------------------------
import enemyIdle from "./Images/enemyGifs/enemyIdle.gif";
import enemyIdleLeft from "./Images/enemyGifs/enemyIdleLeft.gif";
import enemyWalk from "./Images/enemyGifs/enemyWalk.gif";
import enemyWalkLeft from "./Images/enemyGifs/enemyWalkLeft.gif";
import death from "./Images/death.gif";
// Health Bar ----------
import redBar from "./Images/RedBar.png";
import greenBar from "./Images/GreenBar.png";
import blueBar from "./Images/BlueBar.png";

import "./styles.css";

const Player = styled.div`
  background: url(${playerIdle});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  border: 2px solid white;
`;

const banditAnim = keyframes`
  100% { background-position: -1612px; }
`;

// const Bandit = styled.div`
//   height: 200px;
//   width: 200px;
//   position: absolute;
//   bottom: 50px;
//   right: 250px;
//   transform: translate(-50%, -50%);
//   background: url() left center;
//   animation: ${banditAnim} 1s steps(6) infinite;
// `;

function Game() {
  // Player
  const [gif, setGif] = useState(`${playerIdle}`);
  const [left, setLeft] = useState(50);
  const [hp, setHp] = useState(0);
  const [died, setDied] = useState(`died`);
  // Enemy
  const [eGif, setEGIF] = useState(`${enemyIdleLeft}`);
  const [eRight, setERight] = useState(250);

  // Enemy Movement =====================
  useEffect(() => {
    const interval = setInterval(() => {
      const x = Math.floor(Math.random() * 4) + 1;
      const i = Math.floor(Math.random() * 2) + 1;
      if (x === 1) {
        const newRight = eRight - 20;
        setERight(newRight);
        setEGIF(`${enemyWalk}`);
      } else if (x === 2) {
        const newRight = eRight + 20;
        setERight(newRight);
        setEGIF(`${enemyWalkLeft}`);
      } else {
        if (i == 1) {
          setEGIF(`${enemyIdle}`);
        } else {
          setEGIF(`${enemyIdleLeft}`);
        }
      }
    }, 500);
    return () => clearInterval(interval);
  }, [eRight]);

  useEffect(() => {
    // game start default
    setEGIF(`${enemyIdleLeft}`);
  }, []);

  // KEY DOWN ============================
  const onKeyDown = useCallback((e) => {
    switch (e.code) {
      case "KeyD":
        setGif(`${playerRun}`);
        if (left >= 1110) {
          setLeft(left + 0);
        } else {
          setLeft(left + 20);
        }
        break;
      case "KeyA":
        setGif(`${playerRunLeft}`);
        if (-100 >= left) {
          setLeft(left + 0);
        } else {
          setLeft(left - 20);
        }
        break;
      case "KeyJ":
        // conditions for animation direction
        if (gif === `${playerIdle}` || gif === `${playerRun}`) {
          setGif(`${playerAttack}`);
        } else if (gif === `${playerIdleLeft}` || gif === `${playerRunLeft}`) {
          setGif(`${playerAttackLeft}`);
        } else if (gif === `${playerAttack}`) {
          setGif(`${playerAttack}`);
        } else if (gif === `${playerAttackLeft}`) {
          setGif(`${playerAttackLeft}`);
        } else {
          // nothing atm
        }
        break;
      case "KeyK":
        if (hp === 280) {
          setHp(hp + 0)
          setDied(`${death}`);
        } else {
          setHp(hp + 10)
        }
        break;
      default:
        break;
    }
  });

  function upHandler({ key }) {
    if (key === "d") {
      setGif(`${playerIdle}`);
    } else if (key === "a") {
      setGif(`${playerIdleLeft}`);
    } else if (key === "j") {
      if (
        gif === `${playerIdle}` ||
        gif === `${playerRun}` ||
        gif == `${playerAttack}`
      ) {
        setGif(`${playerIdle}`);
      } else {
        setGif(`${playerIdleLeft}`);
      }
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", upHandler);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", upHandler);
    };
  }, [onKeyDown]);

  return (
    <div className="screen">
      <div style={{
      backgroundImage: `url(${died})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "100% 100%",
      position: "relative",
      minWidth: "1300px",
      maxWidth: "1300px",
      minHeight: "700px",
      maxHeight: "700px",
      zIndex: "6"

    }}>
      </div>
      <img
      src={`${redBar}`}
      style={{
        height: "20px",
        width: "300px",
        position: "absolute",
        top: "20px",
        left: "100px"
      }}
      ></img>
      <div
      style={{
        background: "black",
        borderRadius: "25px",
        height: "8px",
        width: `${hp}px`,
        position: "absolute",
        top: "23px",
        right: "910px"
      }}
      >
      </div>
      <img
      src={`${greenBar}`}
      style={{
        height: "20px",
        width: "300px",
        position: "absolute",
        top: "40px",
        left: "100px"
      }}
      ></img>
      <img
      src={`${blueBar}`}
      style={{
        height: "20px",
        width: "300px",
        position: "absolute",
        top: "60px",
        left: "100px"
      }}
      ></img>
      <img
        src={gif}
        style={{
          // border: "2px solid white",
          height: "300px",
          width: "300px",
          position: "absolute",
          bottom: "50px",
          left: `${left}px`,
          zIndex: '5'
        }}
      />
      <img
        src={eGif}
        style={{
          // border: "2px solid white",
          height: "300px",
          width: "300px",
          position: "absolute",
          bottom: "-10px",
          right: `${eRight}px`,
          zIndex: '4'

        }}
      />
    </div>
  );
}
export default Game;

/*

 */

/*
function downHandler({ key }) {
    if (key === "d") {
      setAnim(`url(${knightRR})`);
    }
  }

  function upHandler({ key }) {
    if (key === "d") {
      setAnim(`url(${knight})`);
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", downHandler);
    document.addEventListener("keyup", upHandler);
    return () => {
      document.removeEventListener("keydown", downHandler);
      document.removeEventListener("keyup", upHandler);
    };
  }, []);
*/

/*
<Knight
        style={{
          left: `${left}px`,
          background: `${anim} left center`,
        }}
      />
*/
