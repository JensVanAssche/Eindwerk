import React from "react";
import Game from "./Game";

function App() {
  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          flexDirection: "row",
          height: "100vh"
        }}
      >
        <Game />
      </div>
    </div>
  );
}

export default App;
