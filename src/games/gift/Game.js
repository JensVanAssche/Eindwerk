import React from "react";
import { connect } from "react-redux";
import Phaser from "phaser";
import Start from "./start";
import Countdown from "./countdown";
import Main from "./main";
import End from "./end";
import api from "../api";

import { selectChildLoggedIn, selectUser } from "auth/selectors";

import { GAME_HEIGHT, GAME_WIDTH } from "./config";

var values;

class IGame extends React.Component {
  state = {
    parameter: "",
    startGame: false
  };

  componentDidMount() {
    const { childLoggedIn, user, game } = this.props;
    if (childLoggedIn) {
      api.getParameter(user.id, game).then(res => {
        this.setState({ parameter: res.parameterValue });
        this.loadConfig(this.state.parameter);
      });
    }
  }

  loadConfig(newParameter) {
    const { childLoggedIn, user, game } = this.props;

    if (childLoggedIn) {
      values = {
        parameter: newParameter,
        childId: user.id,
        game
      };
    } else {
      values = {
        parameter: newParameter,
        childId: "0",
        game
      };
    }

    this.setState({ startGame: true });

    const config = {
      type: Phaser.AUTO,
      width: GAME_WIDTH,
      height: GAME_HEIGHT,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      },
      parent: "phaser-game",
      scene: [Boot, Start, Countdown, Main, End],
      rectangle: Phaser.Rectangle
    };

    new Phaser.Game(config);
  }

  handleParameterChange = event => {
    this.setState({ parameter: event.target.value });
  };

  // shouldComponentUpdate() {
  //   return false;
  // }

  render() {
    return (
      <div id="phaser-game">
        {!this.state.startGame && (
          <div>
            <h1>Pakjes opendoen</h1>
            <p>Aantal pakjes:</p>
            <input
              type="text"
              name="parameter"
              value={this.state.parameter}
              onChange={this.handleParameterChange}
            />
            <button onClick={() => this.loadConfig(this.state.parameter)}>
              Speel
            </button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  childLoggedIn: selectChildLoggedIn(state),
  user: selectUser(state)
});

export default connect(
  mapStateToProps,
  null
)(IGame);

class Boot extends Phaser.Scene {
  create() {
    this.scene.start("start", { values });
  }
}
