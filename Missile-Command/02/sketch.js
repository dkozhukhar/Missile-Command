let city;
let missiles = [];
let missileSpeed = 2;

function setup() {
    createCanvas(windowWidth, windowHeight);
    city = new City(windowWidth / 2, windowHeight - 50);
    for (let i = 0; i < 10; i++) {
        missiles[i] = new Missile(random(windowWidth), 0, random(-1, 1), missileSpeed);
    }
}

function draw() {
    background(0);
    city.show();

    for (let i = 0; i < missiles.length; i++) {
        missiles[i].move();
        missiles[i].show();

        if (missiles[i].hits(city)) {
            missiles[i].boom();
            console.log("BOOM!");
        }
    }
}

function mousePressed() {
    for (let i = 0; i < missiles.length; i++) {
        if (missiles[i].contains(mouseX, mouseY)) {
            missiles.splice(i, 1);
        }
    }
}

class City {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    show() {
        fill(255);
        rect(this.x, this.y, 200, 50);
    }
}

class Missile {
    constructor(x, y, xspeed, yspeed) {
        this.x = x;
        this.y = y;
        this.xspeed = xspeed;
        this.yspeed = yspeed;
        this.r = 50;
        this.exploded = false;
    }

    move() {
        this.x += this.xspeed;
        this.y += this.yspeed;
    }

    show() {
        fill(255, 0, 0);
        ellipse(this.x, this.y, this.r, this.r);
    }

    contains(px, py) {
        let d = dist(px, py, this.x, this.y);
        if (d < this.r) {
            return true;
        } else {
            return false;
        }
    }

    hits(city) {
        if (this.y + this.r > city.y && this.x > city.x && this.x < city.x + 200) {
            return true;
        } else {
            return false;
        }
    }

    boom() {
        this.exploded = true;
    }
}
