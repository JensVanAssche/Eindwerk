import { Scene } from "phaser";
import { GAME_HEIGHT, GAME_WIDTH } from "./config";

var text;
var balloon1;

export default class Start extends Scene {
  constructor() {
    super("start");
  }

  preload() {
    this.load.image("forest", "../../assets/forest.png");
    this.load.image("balloon1", "../../assets/balloon1.png");
    this.load.image("balloon3", "../../assets/balloon3.png");
    this.load.image("balloon6", "../../assets/balloon6.png");
    this.load.bitmapFont(
      "playFont",
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

    balloon1 = this.add
      .image(GAME_WIDTH - 200, 300, "balloon1")
      .setScale(0.15)
      .setOrigin(0.5, 0.5);

    this.tweens.add({
      targets: balloon1,
      y: 100,
      ease: "Sine.easeInOut",
      duration: 3000,
      delay: 0,
      repeat: -1,
      repeatDelay: 200,
      yoyo: true,
      hold: 200
    });

    this.add
      .image(200, GAME_HEIGHT, "balloon3")
      .setScale(0.2)
      .setOrigin(0.5, 1);

    this.add
      .image(GAME_WIDTH - 300, GAME_HEIGHT, "balloon6")
      .setScale(0.15)
      .setOrigin(0.5, 1);

    // create title text
    this.add
      .bitmapText(
        GAME_WIDTH / 2,
        GAME_HEIGHT / 2 - 100,
        "playFont",
        "ballonnen blazen",
        64
      )
      .setOrigin(0.5, 0.5);

    // create the play button
    text = this.add
      .bitmapText(
        GAME_WIDTH / 2,
        GAME_HEIGHT / 2 + 50,
        "playFont",
        "speel",
        128
      )
      .setOrigin(0.5, 0.5);

    // make button interactive
    text.setInteractive({ useHandCursor: true });

    // on button click, start countdown scene
    text.on("pointerup", () => {
      this.scene.start("countdown");
    });

    // on button hover, scale it larger
    text.on("pointerover", () => {
      text.setScale(1.1);
    });

    // on button leave, scale it back to default
    text.on("pointerout", () => {
      text.setScale(1);
    });

    navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false
      },
      video: false
    });
  }
}
