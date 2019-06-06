import React from "react";
import { Link } from "react-router-dom";
import Plane from "../games/plane/Game";
import Balloon from "../games/balloon/Game";

import "./gameContainer.scss";

function GameContainer({ match }) {
  return (
    <div className="game-container">
      <Link to="/games" className="back">
        Terug naar spelletjes
      </Link>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          flexDirection: "row"
        }}
      >
        {match.params.game === "plane" && <Plane />}
        {match.params.game === "balloon" && <Balloon />}
      </div>
    </div>
  );
}

export default GameContainer;
