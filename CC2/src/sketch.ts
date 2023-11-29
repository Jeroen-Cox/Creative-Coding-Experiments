import p5 from "p5";
import "./p5.sound.js";
import "./style.css";
let osc: p5.Oscillator, playing: boolean, freq, amp;

const _app = new p5((p5Instance) => {
  const p = p5Instance as unknown as p5;

  p.setup = function setup() {
    p.createCanvas(100, 100);
    p.mousePressed(playOscillator);
    osc = new p.Oscillator(400, "sine");
  };

  p.draw = function draw() {
    background(220);
    freq = constrain(map(mouseX, 0, width, 100, 500), 100, 500);
    amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);

    text("tap to play", 20, 20);
    text("freq: " + freq, 20, 40);
    text("amp: " + amp, 20, 60);

    if (playing) {
      // smooth the transitions by 0.1 seconds
      osc.freq(freq, 0.1);
      osc.amp(amp, 0.1);
    }
  };

  const playOscillator = function () {
    // starting an oscillator on a user gesture will enable audio
    // in browsers that have a strict autoplay policy.
    // See also: userStartAudio();
    osc.start();
    playing = true;
  };

  p.mousePressed = function mousePressed() {};

  p.mouseReleased = function mouseReleased() {
    // ramp amplitude to 0 over 0.5 seconds
    osc.amp(0, 0.5);
    playing = false;
  };
}, document.getElementById("app")!);

export default _app;
