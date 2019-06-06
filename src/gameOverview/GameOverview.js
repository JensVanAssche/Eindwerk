import React from "react";
import GameThumbnail from "../gameThumbnail/GameThumbnail";

import "./gameOverview.scss";

function GameOverview({ match }) {
  return (
    <div className="gameoverview">
      <h1>Kies een spel</h1>

      <div className="gameoverview-content">
        <GameThumbnail
          url={match.path}
          gameId={"balloon"}
          image={"sky.png"}
          gameTitle={"Ballon"}
        />
        <GameThumbnail
          url={match.path}
          gameId={"plane"}
          image={"sky.png"}
          gameTitle={"Vliegtuig"}
        />
      </div>
    </div>
  );
}

export default GameOverview;
