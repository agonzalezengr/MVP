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
  const [left, setLeft] = useState(200);
  // Enemy
  const [eGif, setEGIF] = useState(`${enemyIdleLeft}`);
  const [eRight, setERight] = useState(250);

  // Enemy Movement =====================
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("eRight = ", eRight);
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
        setLeft(left + 20);
        break;
      case "KeyA":
        setGif(`${playerRunLeft}`);
        setLeft(left - 20);
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
      <img
        src={gif}
        style={{
          // border: "2px solid white",
          height: "200px",
          width: "200px",
          position: "absolute",
          bottom: "170px",
          left: `${left}px`,
        }}
      />
      <img
        src={eGif}
        style={{
          // border: "2px solid white",
          height: "200px",
          width: "200px",
          position: "absolute",
          bottom: "130px",
          right: `${eRight}px`,
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
