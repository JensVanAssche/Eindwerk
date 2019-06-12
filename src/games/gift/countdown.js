import { Scene } from "phaser";
import { GAME_HEIGHT, GAME_WIDTH } from "./config";

var count;
var countdown;

export default class Countdown extends Scene {
  constructor() {
    super("countdown");
  }

  preload() {
    this.load.image("forest", "../../assets/forest.png");
    this.load.bitmapFont(
      "custom",
      "../../assets/font.png",
      "../../assets/font.fnt"
    );
  }

  create() {
    // create sky
    this.add.tileSprite(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      GAME_WIDTH,
      GAME_HEIGHT,
      "forest"
    );

    count = 3;

    // create countdown
    countdown = this.add
      .bitmapText(GAME_WIDTH / 2, GAME_HEIGHT / 2, "custom", count, 200)
      .setOrigin(0.5, 0.5);

    // create timer, function is fired every 900ms
    this.time.addEvent({
      delay: 900,
      callback: this.updateCountdown,
      callbackScope: this,
      loop: true
    });
  }

  // update the countdown
  updateCountdown() {
    if (count === 0) {
      this.scene.start("main");
    } else if (count === 1) {
      count--;
      countdown.text = "go!";
    } else {
      count--;
      countdown.text = count;
    }
  }
}