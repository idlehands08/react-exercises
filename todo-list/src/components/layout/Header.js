import React from "react";

function Header() {
  return (
    <header style={headerStyle}>
      <h1>TodoList</h1>
    </header>
  );
}

const headerStyle = {
  color: "#fff",
  backgroundColor: "#0B1842",
  textAlign: "center",
  padding: "10px",
  width: "100%",
};

export default Header;
