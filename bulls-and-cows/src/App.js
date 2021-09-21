import React, { useState, useEffect, Component } from "react";
import "./App.css";
import cowImage from "./images/Cow.png";
import bullImage from "./images/Bull.png";
import Title from "./components/Title";
import Avatar from "./components/Avatar";
import SecretNumberDisplay from "./components/SecretNumberDisplay";
import InputForm from "./components/InputForm";
import WinningMessage from "./components/WinningMessage";
import PlayerHistory from "./components/PlayerHistory";

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

const isInteger = (value) => {
  return /^\d+$/.test(value);
};

function App() {
  const [secretNumber, setSecretNumber] = useState(""); // the randomly generated number to be guessed by the player
  const [playerInputs, setPlayerInputs] = useState([]); // player input
  const [tryCounter, setTryCounter] = useState(0); //the nth input/try of the player
  const [value, setValue] = useState("");
  const [alertMessage, setAlertMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [win, setWin] = useState(false);

  //generates a secretNumber on webpage load.
  useEffect(() => {
    setSecretNumber(generateRandomNumber);
  }, []);

  //checks and returns the number of bulls and cows in the value entered by the player on the input text box.
  //also checks if the player wins and sets Win use State to true.
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
    setTryCounter(tryCounter + 1);
    if (bulls === 4) {
      setWin(true);
    }
    addHistory(value, bulls, cows);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value.trim()) {
      setMessage("Invalid Input! You did not enter anything");
      setAlertMessage(true);
    } else if (!isInteger(value)) {
      setMessage("Invalid Input! Only numbers are allowed");
      setAlertMessage(true);
    } else if (!isUnique(value)) {
      setMessage("Invalid Input! Each digit must be unique");
      setAlertMessage(true);
    } else {
      checkInput(value);
      setAlertMessage(false);
    }

    setValue("");
  };

  //enteres a new input onto our history array called playerInputs.
  const addHistory = (value, bulls, cows) => {
    const newPlayerInput = {
      input: value,
      tryNumber: tryCounter + 1,
      bulls: bulls,
      cows: cows,
    };
    setPlayerInputs([...playerInputs, newPlayerInput]);
  };

  function returnSecretDisplay() {
    let testVar = [];
    for (let i = 0; i < secretNumber.length; i++) {
      testVar.push(<SecretNumberDisplay secretKey={secretNumber.charAt(i)} />);
    }
    return testVar;
  }

  return (
    <div className="App">
      <Avatar imgFile={bullImage} className="bull-image-div" />
      <Avatar imgFile={cowImage} className="cow-image-div" />
      <div className="game-title">
        <Title titleText="bulls" />
        <Title titleText="&" />
        <Title titleText="cows" />
      </div>
      <div className="flex-row-item">{returnSecretDisplay()}</div>
      <div className="container-inputForm">
        <InputForm
          value={value}
          setValue={setValue}
          handleSubmit={handleSubmit}
        />
        {alertMessage ? <h4 id="alert-message">{message}</h4> : <></>}
      </div>
      {win ? <WinningMessage tryCounter={tryCounter} /> : <></>}
      {playerInputs.length > 0 ? (
        <div className="history-list">
          <div className="flex-column-item">
            <span className="label">Input</span>
            {playerInputs.map((playerInput, index) => (
              <PlayerHistory playerInput={playerInput} type="input" />
            ))}
          </div>
          <div className="flex-column-item">
            <span className="label">Tries</span>
            {playerInputs.map((playerInput, index) => (
              <PlayerHistory playerInput={playerInput} type="tryCounter" />
            ))}
          </div>
          <div className="flex-column-item">
            <span className="label">Bulls</span>
            {playerInputs.map((playerInput, index) => (
              <PlayerHistory playerInput={playerInput} type="bulls" />
            ))}
          </div>
          <div className="flex-column-item">
            <span className="label">Cows</span>
            {playerInputs.map((playerInput, index) => (
              <PlayerHistory playerInput={playerInput} type="cows" />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
export { generateRandomNumber, isUnique, isInteger };
