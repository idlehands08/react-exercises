import "./WinningMessage.css";

function WinningMessage(tryCounter) {
  return (
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
  );
}

export default WinningMessage;
