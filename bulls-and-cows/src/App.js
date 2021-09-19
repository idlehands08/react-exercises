import React, { useState, useEffect } from "react";
import "./App.css";

function PlayerInput({ playerInput, index }) {
  const { entry, tryNumber, bulls, cows } = playerInput;
  return (
    <div className="playerInput">
      Player entered {entry} - Tries: {tryNumber} - Bulls: {bulls}, Cows:
      {cows}
    </div>
  );
}

const InputForm = ({ checkInput, isUnique }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value.trim()) {
      alert("You did not enter anything");
    } else if (value.length > 4) {
      alert("You can only input a 4 digit number");
    } else if (!isUnique(value)) {
      alert(
        "The value you entered is invalid. Input 4 digit number where each digit is a unique number"
      );
    } else {
      checkInput(value);
    }
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        className="player-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <input id="submitButton" type="submit" value="Try" className="btn" />
    </form>
  );
};

//recursion function to generate a random number with unique digits.
const generateRandomNumber = () => {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return isUnique(randomDigits)
    ? randomDigits.toString()
    : generateRandomNumber();
};

//function used that makes use of a Regex expression to check if each digit of the parameter is unique.
const isUnique = (randomDigits) => {
  return !/(.).*?\1/.test(randomDigits);
};

// const isPositiveInteger = (value) => {
//   return ^[1-9]+[0-9]*$.test(value)
// }

function App() {
  const [secretNumber, setSecretNumber] = useState(""); // the randomly generated number to be guessed by the player
  const [playerInputs, setPlayerInputs] = useState([]); // player input
  const [tryCounter, setTryCounter] = useState(0); //the nth input/try of the player

  //generates a secretNumber on webpage load.
  useEffect(() => {
    setSecretNumber(generateRandomNumber);
  }, []);

  //checks and returns the number of bulls and cows in the value entered by the player on the input text box.
  //also checks if the player wins and calls on the handleWin function.
  const checkInput = (value) => {
    var bulls = 0;
    var cows = 0;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (value.charAt(j) === secretNumber.charAt(i) && j === i) {
          bulls++;
        } else {
          if (value.charAt(i) === secretNumber.charAt(j)) {
            cows++;
          }
        }
      }
    }
    if (bulls === 4) {
      handleWin();
    }
    addHistory(value, bulls, cows);
    setTryCounter(tryCounter + 1);
  };

  //enteres a new entry onto our history array called playerInputs.
  const addHistory = (value, bulls, cows) => {
    const newPlayerInput = {
      entry: value,
      tryNumber: tryCounter,
      bulls: bulls,
      cows: cows,
    };
    setPlayerInputs([...playerInputs, newPlayerInput]);
  };

  const handleWin = () => {
    alert(`You won in ${tryCounter} tries`);
  };

  return (
    <div className="App">
      <div className="container-main">
        <h1>{secretNumber}</h1>
        <InputForm
          checkInput={checkInput}
          isUnique={isUnique}
          tryCounter={tryCounter}
        />
        <div className="history-list">
          {playerInputs.map((playerInput, index) => (
            <PlayerInput key={index} index={index} playerInput={playerInput} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
