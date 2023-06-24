let player;
let missiles = [];
let cities = [];
let enemyMissiles = [];

function setup() {
    createCanvas(800, 600);
    player = new Player();

    for (let i = 0; i < 5; i++) {
        cities[i] = new City(i * 160 + 80, height - 30);
    }
}

function draw() {
    background(51);
    player.show();

    if (random(1) < 0.01) {
        enemyMissiles.push(new EnemyMissile(random(width), 0));
    }

    for (let i = missiles.length - 1; i >= 0; i--) {
        missiles[i].update();
        missiles[i].show();
        if (missiles[i].offScreen()) {
            missiles.splice(i, 1);
        }
    }

    for (let i = enemyMissiles.length - 1; i >= 0; i--) {
        enemyMissiles[i].update();
        enemyMissiles[i].show();
        if (enemyMissiles[i].reachedTarget()) {
            enemyMissiles.splice(i, 1);
        }
    }

    for (let i = cities.length - 1; i >= 0; i--) {
        cities[i].show();
        for (let j = enemyMissiles.length - 1; j >= 0; j--) {
            if (cities[i].hit(enemyMissiles[j])) {
                cities.splice(i, 1);
                enemyMissiles.splice(j, 1);
                break;
            }
        }
    }
}

function mousePressed() {
    missiles.push(new Missile(player.x, height, mouseX, mouseY));
}

// Below this, you would define the classes for Player, Missile, EnemyMissile, City, etc.
// These classes should include the methods used above (e.g., "update", "show", "hit").
// Remember, this is a very simple implementation and there's plenty more you can add!
