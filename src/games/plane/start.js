import { Scene } from "phaser";
import { GAME_HEIGHT, GAME_WIDTH } from "./config";

var text;
var plane;
var parameter;

export default class Start extends Scene {
  constructor() {
    super("start");
  }

  init(data) {
    parameter = data.parameter;
  }

  preload() {
    this.load.image("sky", "../../assets/sky_loop.png");
    this.load.image("plane", "../../assets/plane.png");
    this.load.image("star", "../../assets/star.png");
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
      "sky"
    );

    plane = this.physics.add
      .image(0, 100, "plane")
      .setScale(0.1)
      .setOrigin(1, 0.5);

    this.add
      .image(GAME_WIDTH - 150, GAME_HEIGHT - 200, "star")
      .setScale(0.1)
      .setOrigin(0.5, 0.5);

    this.add
      .image(200, GAME_HEIGHT - 100, "star")
      .setScale(0.1)
      .setOrigin(0.5, 0.5);

    // create title text
    this.add
      .bitmapText(
        GAME_WIDTH / 2,
        GAME_HEIGHT / 2 - 100,
        "playFont",
        "vliegtuigje vliegen",
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
      this.scene.start("countdown", { parameter });
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

  update() {
    if (plane.x < GAME_WIDTH + 1000) {
      plane.x += 5;
    } else {
      plane.x = 0;
    }
  }
}
