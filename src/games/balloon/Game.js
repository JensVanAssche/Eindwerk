import Phaser from "phaser";
import Start from "./start";
import Countdown from "./countdown";
import Main from "./main";
import End from "./end";

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
      scene: [Start, Countdown, Main, End],
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
