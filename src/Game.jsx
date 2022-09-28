import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import knight from "./Images/_Idle.png";
import bandit from "./Images/bandit_idle.png";
import "./styles.css";

const knightAnim = keyframes`
  100% { background-position: -3000px; }
`;

const Knight = styled.div`
  height: 200px;
  width: 200px;
  position: absolute;
  bottom: 70px;
  left: 100px;
  transform: translate(-50%, -50%);
  background: url(${knight}) left center;
  animation: ${knightAnim} 1s steps(10) infinite;
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
  return (
    <div className="screen">
      <Knight />
      <Bandit />
    </div>
  );
}
export default Game;
