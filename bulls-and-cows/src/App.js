import React, { useState } from "react";
import "./App.css";


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
