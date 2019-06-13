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

var parameter;

class IGame extends React.Component {
  async componentDidMount() {
    const { childLoggedIn, user, game } = this.props;
    if (childLoggedIn) {
      parameter = await api.getParameter(user.id, game);
    } else {
      parameter = { parameterValue: "0" };
    }

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

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div id="phaser-game" />;
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
    this.scene.start("start", { parameter });
  }
}
