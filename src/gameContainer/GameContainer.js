import React from "react";
import { Link } from "react-router-dom";

import "./gameContainer.scss";

class GameContainer extends React.Component {
  state = {
    game: null
  };

  async componentDidMount() {
    const { match } = this.props;
    const { default: game } = await import(
      `../games/${match.params.game}/Game`
    );
    this.setState({ game });
  }

  render() {
    const { game } = this.state;

    if (!game) return <div>Loading game...</div>;

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
          {React.createElement(game)}
        </div>
      </div>
    );
  }
}

export default GameContainer;
