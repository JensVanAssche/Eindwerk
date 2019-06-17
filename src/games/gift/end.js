import { Scene } from "phaser";
import { GAME_HEIGHT, GAME_WIDTH } from "./config";
import api from "games/api";

var text;
var score;

export default class End extends Scene {
  constructor() {
    super("end");
  }

  init(data) {
    score = data.score;
    if (data.values.childId !== "0") {
      api.createStat(data.values.childId, data.values.game, score, data.time);
    }
  }

  preload() {
    this.load.image("burst", "../../assets/burst.png");
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
      "burst"
    );

    // create the play button
    text = this.add
      .bitmapText(
        GAME_WIDTH / 2,
        GAME_HEIGHT / 2 + 150,
        "playFont",
        "opnieuw",
        128
      )
      .setOrigin(0.5, 0.5);

    this.add
      .bitmapText(
        GAME_WIDTH / 2,
        GAME_HEIGHT / 2 - 100,
        "playFont",
        "spel gedaan!",
        64
      )
      .setOrigin(0.5, 0.5);

    this.add
      .bitmapText(
        GAME_WIDTH / 2,
        GAME_HEIGHT / 2,
        "playFont",
        "je score: " + score,
        64
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
  }
}
