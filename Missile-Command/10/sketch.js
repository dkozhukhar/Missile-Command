let missiles = [];
let explosions = [];
let score = 0;

function setup() {
  createCanvas(800, 600);
  for (let i = 0; i < 10; i++) {
    missiles.push(new Missile(random(width), 0));
  }
}

function draw() {
  background(0);

  for (let i = missiles.length - 1; i >= 0; i--) {
    let m = missiles[i];
    m.update();
    m.show();
    if (m.offScreen()) {
      missiles.splice(i, 1);
      score--;
    }
  }

  for (let i = explosions.length - 1; i >= 0; i--) {
    let e = explosions[i];
    e.update();
    e.show();
    if (e.finished()) {
      explosions.splice(i, 1);
    } else {
      for (let j = missiles.length - 1; j >= 0; j--) {
        let m = missiles[j];
        let d = dist(e.x, e.y, m.x, m.y);
        if (d < e.r) {
          missiles.splice(j, 1);
          score++;
        }
      }
    }
  }

  textSize(32);
  fill(255);
  text('Score: ' + score, 10, 30);
}

function mousePressed() {
  explosions.push(new Explosion(mouseX, mouseY));
}

class Missile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 2;
  }

  update() {
    this.y += this.speed;
  }

  show() {
    stroke(255);
    line(this.x, this.y, this.x, this.y+10);
  }

  offScreen() {
    return (this.y > height);
  }
}

class Explosion {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 0;
    this.maxR = 50;
  }

  update() {
    if (this.r < this.maxR) {
      this.r++;
    }
  }

  show() {
    noFill();
    stroke(255);
    strokeWeight(4);
    ellipse(this.x, this.y, this.r*2);
  }

  finished() {
    return (this.r >= this.maxR);
  }
}
