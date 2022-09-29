import React, { useState, useEffect, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import bandit from "./Images/bandit_idle.png";
import test from "./Images/Gifs/__Idle.gif";
import testLeft from "./Images/Gifs/IdleLeft.gif";
import testRun from "./Images/Gifs/__Run.gif";
import testRunLeft from "./Images/Gifs/RunLeft.gif";
import testAttack from "./Images/Gifs/__Attack.gif";
import testAttackLeft from "./Images/Gifs/attackLeft.gif";
import "./styles.css";

const Box = styled.div`
  background: url(${test});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  border: 2px solid white;
`;

const banditAnim = keyframes`
  100% { background-position: -1612px; }
`;

const Bandit = styled.div`
  height: 200px;
  width: 200px;
  position: absolute;
  bottom: 50px;
  right: 250px;
  transform: translate(-50%, -50%);
  background: url(${bandit}) left center;
  animation: ${banditAnim} 1s steps(6) infinite;
`;

function Game() {
  const [walk, setWalk] = useState(`${test}`);
  const [move, setMove] = useState(200);

  const [idle, setIdle] = useState(false);

  // KEY DOWN ============================
  const onKeyDown = useCallback((e) => {
    switch (e.code) {
      case "KeyD":
        //setAnim(`url(${knightRR})`);
        setWalk(`${testRun}`);
        setMove(move + 20);
        //setLeft(left + 20);
        break;
      case "KeyA":
        // setAnim(`url(${knightRL})`);
        // setLeft(left - 20);
        setWalk(`${testRunLeft}`);
        setMove(move - 20);
        break;
      case "KeyJ":
        if (walk === `${test}` || walk === `${testRun}`) {
          setWalk(`${testAttack}`);
        } else if (walk === `${testLeft}` || walk === `${testRunLeft}`) {
          setWalk(`${testAttackLeft}`);
        } else if (walk === `${testAttack}`) {
          setWalk(`${test}`);
        } else if (walk === `${testAttackLeft}`) {
          setWalk(`${testLeft}`);
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
      setWalk(`${test}`);
    } else if (key === "a") {
      setWalk(`${testLeft}`);
    } else if (key === "j") {
      if (
        walk === `${test}` ||
        walk === `${testRun}` ||
        walk == `${testAttack}`
      ) {
        setWalk(`${test}`);
      } else {
        setWalk(`${testLeft}`);
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
        src={walk}
        style={{
          border: "2px solid white",
          height: "250px",
          width: "300px",
          position: "absolute",
          bottom: "170px",
          left: `${move}px`,
        }}
      />
      <Bandit />
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
