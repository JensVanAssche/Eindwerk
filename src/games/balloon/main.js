import { Scene } from "phaser";
import { GAME_HEIGHT, GAME_WIDTH } from "./config";

var balloon;
var threshold = 80;
var score;
var minballoonSize = 2;
var balloonSize = minballoonSize;
var maxBalloonSize = 4;
var scoreText;
var volumeText;
var volume;
var values;
var startTime;

export default class Main extends Scene {
  constructor() {
    super("main");
  }

  init(data) {
    values = data.values;
  }

  preload() {
    this.load.image("forest", "../../assets/forest.png");
    this.load.image("balloon1", "../../assets/balloon1.png");
    this.load.image("balloon2", "../../assets/balloon2.png");
    this.load.image("balloon3", "../../assets/balloon3.png");
    this.load.image("balloon4", "../../assets/balloon4.png");
    this.load.image("balloon5", "../../assets/balloon5.png");
    this.load.image("balloon6", "../../assets/balloon6.png");
    this.load.image("balloon7", "../../assets/balloon7.png");
    this.load.bitmapFont(
      "custom",
      "../../assets/font.png",
      "../../assets/font.fnt"
    );
  }

  create() {
    score = 0;
    startTime = new Date();

    // create sky
    this.add.tileSprite(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      GAME_WIDTH,
      GAME_HEIGHT,
      "forest"
    );

    // create balloon
    this.spawnBalloon();

    // create the score counter & volume debug
    volumeText = this.add.text(0, 0, "0");
    scoreText = this.add.bitmapText(GAME_WIDTH - 120, 20, "custom", score, 80);

    // microphone API, updates the volume variable
    var micThreshold = 155;

    navigator.mediaDevices
      .getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        },
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
          var absolute = 0;

          for (let i = 0; i < array.length; i++) {
            if (array[i] > absolute) {
              absolute = array[i];
            }
          }

          if (absolute - micThreshold < 0) {
            volume = 0;
          } else {
            volume = absolute - micThreshold;
          }
        };
      })
      .catch(function(err) {
        console.log("error");
      });
  }

  update() {
    // update the debug volume counter
    volumeText.text = Math.round(volume);

    // detect when the volume is above a threshold the balloon bigger or smaller
    if (balloonSize <= maxBalloonSize) {
      if (volume > threshold) {
        balloonSize += 0.015;
      } else {
        if (balloonSize > minballoonSize) {
          balloonSize -= 0.005;
        }
      }
      // update the balloon size
      balloon.setScale(balloonSize / 10);
    } else {
      // when the balloon reaches the maxBalloonSize
      balloon.body.y -= 5;

      // if the balloon goes offscreen, destroy & spawn a new one
      if (balloon.body.y <= 0 - balloon.displayHeight) {
        balloon.destroy();
        score++;
        scoreText.text = score;
        if (score === parseInt(values.parameter, 10)) this.endGame();
        this.spawnBalloon();
      }
    }
  }

  // handling balloon spawning
  spawnBalloon() {
    balloonSize = minballoonSize;
    var rnd = Math.round(Math.random() * 6) + 1;
    balloon = this.physics.add
      .image(GAME_WIDTH / 2, GAME_HEIGHT, "balloon" + rnd)
      .setScale(0.1)
      .setOrigin(0.5, 1);
  }

  // quit the game
  endGame() {
    const endTime = new Date();
    const elapsed = Math.abs((endTime.getTime() - startTime.getTime()) / 1000);
    this.scene.start("end", {
      score: score,
      time: elapsed,
      values
    });
  }
}
