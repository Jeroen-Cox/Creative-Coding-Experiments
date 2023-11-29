import p5 from "p5";
import "./style.css";

const _app = new p5((p5Instance) => {
  const p = p5Instance as unknown as p5;

  p.setup = function setup() {
    p.createCanvas(500, 500);
    p.background(0, 0, 0);
  };

  p.draw = function draw() {};
}, document.getElementById("app")!);

export default _app;
