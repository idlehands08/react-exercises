function PlayerHistory({ playerInput, type }) {
  if (type === "input") {
    return <span>{playerInput.input}</span>;
  } else if (type === "tryCounter") {
    return <span>{playerInput.tryNumber}</span>;
  } else if (type === "bulls") {
    return <span>{playerInput.bulls}</span>;
  } else if (type === "cows") {
    return <span>{playerInput.cows}</span>;
  }
}

export default PlayerHistory;
