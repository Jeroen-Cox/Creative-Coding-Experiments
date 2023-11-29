import p5 from "p5";
import "./style.css";

let t = 0;
let showBlackhole = false;

const _app = new p5((p5Instance) => {
  const p = p5Instance as unknown as p5;

  p.setup = function setup() {
    t = 0;
    p.createCanvas(500, 500);
    p.background(0, 0, 0);
  };

  p.draw = function draw() {
    let fps = p.frameRate();
    t = t + 0.01;
    drawRandomEllipses(p, 20, 40);
    drawMouseFollowEllipse(p, 120);
    p.filter(p.BLUR, 8);
    p.text(fps, 43, 54);
    showBlackhole = false;
  };

  p.mouseClicked = function mouseClicked() {
    showBlackhole = true;
  };
}, document.getElementById("app")!);

const drawMouseFollowEllipse = (p: p5, ellipseDiameter: number) => {
  p.noStroke();
  p.fill(0, 0, 0);
  p.ellipse(
    p.mouseX,
    p.mouseY,
    showBlackhole ? ellipseDiameter : 0,
    showBlackhole ? ellipseDiameter : 0
  );
};

const drawRandomEllipses = (
  p: p5,
  ellipseCount: number,
  ellipseDiameter: number
) => {
  for (let i = 0; i < ellipseCount; i++) {
    var r = 255;
    var g = 128 + 127 * p.noise(t + 15 * i);
    var b = 255 * p.noise(t + 20 * i);
    p.noStroke();
    p.fill(r, g, b);
    p.ellipse(
      p.width * p.noise(t + i),
      p.height * p.noise(t - i),
      ellipseDiameter,
      ellipseDiameter
    );
  }
};

export default _app;
