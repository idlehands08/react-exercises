import React from "react";
import "./SecretNumberDisplay.css";

function SecretNumberDisplay({ secretKey, win }) {
  return win ? (
    <h1 className="secret-number"> {secretKey} </h1>
  ) : (
    <h1 className="secret-number">?</h1>
  );
}

export default SecretNumberDisplay;
