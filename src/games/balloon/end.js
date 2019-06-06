import { Scene } from "phaser";
import { GAME_HEIGHT, GAME_WIDTH } from "./config";

var text;

export default class End extends Scene {
  constructor() {
    super("end");
  }

  preload() {
    this.load.image("sky", "../../assets/sky_loop.png");
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
      .bitmapText(GAME_WIDTH / 2, GAME_HEIGHT / 2, "playFont", "je score:", 64)
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
