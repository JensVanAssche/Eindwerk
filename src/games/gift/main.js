import { Scene } from "phaser";
import { GAME_HEIGHT, GAME_WIDTH } from "./config";

var gift;
var price;
var explosion;
var threshold = 50;
var score;
var scoreText;
var volumeText;
var volume;
var giftRespawnDelay = 5000;
var enableVoice = true;
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
    this.load.image("burst", "../../assets/burst.png");
    this.load.image("gift1", "../../assets/gift1.png");
    this.load.image("gift2", "../../assets/gift2.png");
    this.load.image("gift3", "../../assets/gift3.png");
    this.load.image("gift4", "../../assets/gift4.png");
    this.load.image("gift5", "../../assets/gift5.png");
    this.load.image("gift6", "../../assets/gift6.png");
    this.load.image("gift7", "../../assets/gift7.png");
    this.load.image("price1", "../../assets/price1.png");
    this.load.image("price2", "../../assets/price2.png");
    this.load.image("price3", "../../assets/price3.png");
    this.load.image("price4", "../../assets/price4.png");
    this.load.image("price5", "../../assets/price5.png");
    this.load.image("price6", "../../assets/price6.png");
    this.load.image("price7", "../../assets/price7.png");
    this.load.image("price8", "../../assets/price8.png");
    this.load.image("price9", "../../assets/price9.png");
    this.load.image("price10", "../../assets/price10.png");
    this.load.image("explosion", "../../assets/explosion.png");
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
      "burst"
    );

    this.spawnGift();

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

    if (enableVoice && volume > threshold) {
      this.tweens.add({
        targets: gift,
        scaleX: 0,
        scaleY: 0,
        duration: 1000
      });
      this.spawnPrice();
    }

    if (explosion) {
      explosion.angle += 3;
    }
  }

  spawnGift() {
    if (score === parseInt(values.parameter, 10)) this.endGame();
    if (price) price.destroy();
    if (explosion) explosion.destroy();
    enableVoice = true;
    var rnd = Math.round(Math.random() * 6) + 1;
    gift = this.physics.add
      .image(GAME_WIDTH / 2, GAME_HEIGHT / 2, "gift" + rnd)
      .setScale(0.5)
      .setOrigin(0.5, 0.5);
  }

  spawnPrice() {
    enableVoice = false;
    score++;
    scoreText.text = score;

    explosion = this.physics.add
      .image(GAME_WIDTH / 2, GAME_HEIGHT / 2, "explosion")
      .setScale(0)
      .setOrigin(0.5, 0.5);

    var rnd = Math.round(Math.random() * 9) + 1;

    price = this.physics.add
      .image(GAME_WIDTH / 2, GAME_HEIGHT / 2, "price" + rnd)
      .setScale(0)
      .setOrigin(0.5, 0.5);

    this.tweens.add({
      targets: explosion,
      scaleX: 1.5,
      scaleY: 1.5,
      yoyo: true,
      duration: 600
    });

    this.tweens.add({
      targets: price,
      scaleX: 0.5,
      scaleY: 0.5,
      duration: 1000
    });

    this.time.addEvent({
      delay: giftRespawnDelay,
      callback: this.spawnGift,
      callbackScope: this,
      loop: false
    });
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
