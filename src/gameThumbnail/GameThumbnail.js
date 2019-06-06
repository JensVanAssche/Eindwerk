import React from "react";
import { Link } from "react-router-dom";

import "./gameThumbnail.scss";

function GameThumbnail(props) {
  return (
    <Link to={`${props.url}/${props.gameId}`}>
      <img src={`../assets/${props.image}`} alt="" />
      <div>
        <span>{props.gameTitle}</span>
      </div>
    </Link>
  );
}

export default GameThumbnail;
