import { Scene } from "phaser";
import { GAME_HEIGHT, GAME_WIDTH } from "../config";

var plane;
var background;
var star;

var threshold = 20;
var score = 0;
var scoreText;
var volumeText;
var volume;

export default class Game extends Scene {
  preload() {
    this.load.image("sky", "assets/sky_loop.png");
    this.load.image("plane", "assets/plane.png");
    this.load.image("star", "assets/star.png");
    this.load.bitmapFont("custom", "assets/font.png", "assets/font.fnt");
  }

  create() {
    background = this.add.tileSprite(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      GAME_WIDTH,
      GAME_HEIGHT,
      "sky"
    );

    plane = this.physics.add
      .image(200, GAME_HEIGHT / 2, "plane")
      .setScale(0.1)
      .setOrigin(0.5, 0);
    plane.setCollideWorldBounds(true);

    this.spawnStar();

    volumeText = this.add.text(0, 0, "0");
    scoreText = this.add.bitmapText(GAME_WIDTH - 120, 20, "custom", score, 80);

    var threshold = 0;
    var absolute = 0;

    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: false
      })
      .then(function(stream) {
        var audioContext = new AudioContext();
        var analyser = audioContext.createAnalyser();
        var microphone = audioContext.createMediaStreamSource(stream);
        var javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 1024;

        microphone.connect(analyser);
        analyser.connect(javascriptNode);
        javascriptNode.connect(audioContext.destination);
        javascriptNode.onaudioprocess = function() {
          var array = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(array);
          var values = 0;

          var length = array.length;
          for (var i = 0; i < length; i++) {
            values += array[i];
          }

          absolute = values / length;

          if (absolute - threshold < 0) {
            volume = 0;
          } else {
            volume = absolute - threshold;
          }
        };
      })
      .catch(function(err) {
        console.log("error");
      });
  }

  update() {
    volumeText.text = Math.round(volume);
    background.tilePositionX += 2;
    star.x -= 3;

    this.physics.collide(plane, star, this.hitSprite, null, this);

    if (volume > threshold) {
      plane.body.y -= 4;
    } else {
      plane.body.y += 2;
    }

    if (star.x <= -70) {
      star.destroy();
      this.spawnStar();
    }
  }

  hitSprite(plane, star) {
    star.destroy();
    score++;
    scoreText.text = score;
    this.spawnStar();
  }

  spawnStar() {
    star = this.physics.add
      .image(GAME_WIDTH, Math.random() * GAME_HEIGHT, "star")
      .setScale(0.08)
      .setOrigin(0, 0.5);
  }
}
