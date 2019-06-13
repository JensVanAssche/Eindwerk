import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import "./gameContainer.scss";

class GameContainer extends React.Component {
  _isMounted = false;

  state = {
    game: null
  };

  async componentDidMount() {
    this._isMounted = true;
    const { match } = this.props;
    const { default: game } = await import(
      `../games/${match.params.game}/Game`
    );
    if (this._isMounted) this.setState({ game });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { game } = this.state;

    if (!game) return <div>Loading game...</div>;

    return (
      <div className="game-container">
        <Link to="/games" className="back">
          <FontAwesomeIcon icon={faArrowLeft} />
          <span> TERUG NAAR SPELLETJES</span>
        </Link>
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            flexDirection: "row"
          }}
        >
          {React.createElement(game, { game: this.props.match.params.game })}
        </div>
      </div>
    );
  }
}

export default GameContainer;
