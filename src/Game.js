import Phaser from "phaser";
import Countdown from "./scenes/countdown";
import Game from "./scenes/game";

import React from "react";

import { GAME_HEIGHT, GAME_WIDTH } from "./config";

export default class IGame extends React.Component {
  componentDidMount() {
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
      scene: [Countdown],
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
