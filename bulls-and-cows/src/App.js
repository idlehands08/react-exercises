import React, { useState } from "react";
// import randomcolor from "randomcolor";
import "./App.css";

function App() {
  const [number, setNumber] = useState(0);
  const [color, setColor] = useState("red");
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

  // useEffect(() => {
  //   setColor(randomcolor());
  // }, [number]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ color: color }}>{number}</h1>
        <button onClick={add}>Add!</button>
        <button onClick={subtract}>Subtract!</button>
        <button onClick={multiply}>Multiply!</button>
        <button onClick={divide}>Divide!</button>
      </header>
    </div>
  );
}

export default App;
