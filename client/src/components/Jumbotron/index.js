import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: 350, clear: "both", marginBottom: 200, textAlign: "center" }}
      className={"jumbotron"}
    >
      {children}
    </div>
  );
}

export default Jumbotron;
