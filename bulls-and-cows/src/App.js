import React, { useState, useEffect } from "react";
import "./App.css";
import cowImage from "./images/Cow.png";
import bullImage from "./images/Bull.png";

const InputForm = ({ checkInput, isUnique }) => {
  const [value, setValue] = useState("");
  const [alertMessage, setAlertMessage] = useState(false);
  const [message, setMessage] = useState("");

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

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <input
        id="input-field"
        type="text"
        className="player-input"
        maxLength="4"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {alertMessage ? <h4 id="alert-message">{message}</h4> : <></>}

      <input id="submitButton" type="submit" value="Enter" className="btn" />
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

const isInteger = (value) => {
  return /^\d+$/.test(value);
};

function App() {
  const [secretNumber, setSecretNumber] = useState(""); // the randomly generated number to be guessed by the player
  const [playerInputs, setPlayerInputs] = useState([]); // player input
  const [tryCounter, setTryCounter] = useState(0); //the nth input/try of the player
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

  return (
    <div className="App">
      <div className="bull-image-div">
        <img src={bullImage} alt="" />
      </div>
      <div className="cow-image-div">
        <img src={cowImage} alt="" />
      </div>
      <div className="game-title">
        <span id="title-bulls">BULLS</span>
        <span id="title-and">&</span>
        <span id="title-cows">COWS</span>
      </div>
      <div className="container-main">
        {win ? (
          <div className="winning-message">
            <h1>You have won in {tryCounter + " tries"}</h1>
            <button
              onClick={() => {
                window.location.reload();
              }}
            >
              Reset
            </button>
          </div>
        ) : (
          <></>
        )}
        <div className="flex-row-item">
          <h1 id="fourth-digit" className="secret-number">
            {win ? secretNumber.charAt(0) : "?"}
          </h1>
          <h1 id="third-digit" className="secret-number">
            {win ? secretNumber.charAt(1) : "?"}
          </h1>
          <h1 id="second-digit" className="secret-number">
            {win ? secretNumber.charAt(2) : "?"}
          </h1>
          <h1 id="first-digit" className="secret-number">
            {win ? secretNumber.charAt(3) : "?"}
          </h1>
        </div>
        <div className="container-inputForm">
          <InputForm
            checkInput={checkInput}
            isUnique={isUnique}
            tryCounter={tryCounter}
          />
          {playerInputs.length > 0 ? (
            <div className="history-list">
              <div className="flex-column-item">
                <span className="label">Input</span>
                {playerInputs.map((playerInput, index) => (
                  <span className="history-playerInput">
                    {playerInput.input}
                  </span>
                ))}
              </div>
              <div className="flex-column-item">
                <span className="label">Tries</span>
                {playerInputs.map((playerInput, index) => (
                  <span className="history-playerInput">
                    {playerInput.tryNumber}
                  </span>
                ))}
              </div>
              <div className="flex-column-item">
                <span className="label">Bulls</span>
                {playerInputs.map((playerInput, index) => (
                  <span className="history-playerInput">
                    {playerInput.bulls}
                  </span>
                ))}
              </div>
              <div className="flex-column-item">
                <span className="label">Cows</span>
                {playerInputs.map((playerInput, index) => (
                  <span className="history-playerInput">
                    {playerInput.cows}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
export { generateRandomNumber, isUnique, isInteger };
