function InputForm({ value, setValue, handleSubmit }) {
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

      <input id="submitButton" type="submit" value="Enter" className="btn" />
    </form>
  );
}

export default InputForm;
