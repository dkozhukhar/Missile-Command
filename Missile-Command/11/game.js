var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var missiles;
var cursors;

function preload ()
{
    this.load.image('missile', 'assets/missile.png');
    this.load.image('bomb', 'assets/bomb.png');
}

function create ()
{
    // Player's missile group
    missiles = this.physics.add.group({
        defaultKey: 'missile',
        maxSize: 10
    });

    // Enemy's bomb group
    bombs = this.physics.add.group({
        defaultKey: 'bomb',
        maxSize: 20
    });

    cursors = this.input.keyboard.createCursorKeys();

    // Function to spawn bombs from top randomly
    this.time.addEvent({
        delay: 1000,
        callback: () => {
            var x = Phaser.Math.Between(0, 800);
            var bomb = bombs.get(x, 0);

            if (!bomb) return;

            bomb.setActive(true);
            bomb.setVisible(true);
            bomb.body.gravity.y = 100;
        },
        loop: true
    });
}

function update ()
{
    // If space key is pressed, fire a missile
    if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
        var missile = missiles.get(400, 600);

        if (!missile) return;

        missile.setActive(true);
        missile.setVisible(true);
        missile.body.velocity.y = -200;
    }

    // Check for collisions between missiles and bombs
    this.physics.world.overlap(missiles, bombs, (missile, bomb) => {
        missile.setActive(false);
        missile.setVisible(false);
        bomb.setActive(false);
        bomb.setVisible(false);
    });
}
