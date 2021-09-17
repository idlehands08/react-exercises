import React, { useState } from "react";
import "./App.css";

// test test test

function App() {
  const [number, setNumber] = useState(0);
  const add = () => {
    setNumber((prevNumber) => prevNumber + 1);
  };
  const subtract = () => {
    setNumber((prevNumber) => prevNumber - 1);
  };
  const multiply = () => {
    setNumber((prevNumber) => prevNumber * 2);
  };
  const divide = () => {
    setNumber((prevNumber) => prevNumber / 2);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>{number}</h1>
        <button onClick={add}>Add!</button>
        <button onClick={subtract}>Subtract!</button>
        <button onClick={multiply}>Multiply!</button>
        <button onClick={divide}>Divide!</button>
      </header>
    </div>
  );
}

export default App;
