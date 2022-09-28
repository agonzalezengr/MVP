import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import knight from "./Images/_Idle.png";
import "./styles.css";

const animation = keyframes`
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
  animation: ${animation} 1s steps(10) infinite;
`;

function Game() {
  return (
    <div className="screen">
      <Knight />
    </div>
  );
}
export default Game;
