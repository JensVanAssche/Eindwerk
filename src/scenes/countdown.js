import { Scene } from "phaser";
import Phaser from "phaser";
import { GAME_HEIGHT, GAME_WIDTH } from "../config";

var countdown;

export default class Game extends Scene {
  preload() {
    this.load.image("sky", "assets/sky_loop.png");
    this.load.bitmapFont("custom", "assets/font.png", "assets/font.fnt");
  }

  create() {
    this.add.tileSprite(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      GAME_WIDTH,
      GAME_HEIGHT,
      "sky"
    );

    countdown = this.add
      .bitmapText(GAME_WIDTH / 2, GAME_HEIGHT / 2, "custom", "3", 128)
      .setOrigin(0.5, 0.5);

    // this.time.events.start(60, this.updateCountdown, this);
    console.log(this.time);
  }

  updateCountdown() {
    console.log("count");
  }
}
