import { Scene } from "phaser";
import { GAME_HEIGHT, GAME_WIDTH } from "./config";

var plane;
var background;
var star;

var threshold = 80;
var score;
var scoreText;
var starCount;
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
    this.load.image("sky", "../../assets/sky_loop.png");
    this.load.image("plane", "../../assets/plane.png");
    this.load.image("star", "../../assets/star.png");
    this.load.bitmapFont(
      "custom",
      "../../assets/font.png",
      "../../assets/font.fnt"
    );
  }

  create() {
    score = 0;
    starCount = 0;
    startTime = new Date();

    // create sky
    background = this.add.tileSprite(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      GAME_WIDTH,
      GAME_HEIGHT,
      "sky"
    );

    // create plane
    plane = this.physics.add
      .image(200, GAME_HEIGHT / 2, "plane")
      .setScale(0.1)
      .setOrigin(0.5, 0.5)
      .setSize(1000, 450)
      .setOffset(200, 250);
    plane.setCollideWorldBounds(true);

    // spawn the first star
    this.spawnStar();

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

    // move background & star
    background.tilePositionX += 2;
    star.x -= 3;

    // detect plane & star collision
    this.physics.collide(plane, star, this.hitSprite, null, this);

    // detect when the volume is above a threshold to make the plane ascend or descend
    if (volume > threshold) {
      plane.body.y -= 4;
      plane.angle = -10;
    } else {
      plane.body.y += 2;
      plane.angle = 10;
    }

    // if a star reaches the end of the screen, destroy it and spawn a new one
    if (star.x <= -70) {
      this.spawnStar();
    }
  }

  // handling a collision between plane and star
  hitSprite(plane, star) {
    star.destroy();
    score++;
    scoreText.text = score;
    this.spawnStar();
  }

  // handling star spawning
  spawnStar() {
    if (star) star.destroy();
    starCount++;
    if (starCount === parseInt(values.parameter, 10) + 1) this.endGame();
    star = this.physics.add
      .image(GAME_WIDTH, Math.random() * GAME_HEIGHT, "star")
      .setScale(0.08)
      .setOrigin(0, 0.5);
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
