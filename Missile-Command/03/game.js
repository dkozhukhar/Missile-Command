// Define game variables
var gameArea = document.getElementById('gameArea');
var scoreDisplay = document.getElementById('score');
var city = document.getElementsByClassName('city')[0];
var missiles = [];
var counterMissiles = [];
var score = 0;
var gameInterval;

// Create a missile
function createMissile() {
    var missile = document.createElement('div');
    missile.classList.add('missile');
    missile.style.left = Math.random() * (gameArea.offsetWidth - missile.offsetWidth) + 'px';
    gameArea.appendChild(missile);
    missiles.push(missile);
}

// Create a counter-missile
function createCounterMissile(e) {
    var counterMissile = document.createElement('div');
    counterMissile.classList.add('counterMissile');
    counterMissile.style.left = e.clientX - gameArea.offsetLeft - counterMissile.offsetWidth / 2 + 'px';
    counterMissile.style.top = gameArea.offsetHeight - counterMissile.offsetHeight + 'px';
    gameArea.appendChild(counterMissile);
    counterMissiles.push(counterMissile);
}

// Update positions of missiles and counter-missiles
function updatePositions() {
    for (var i = 0; i < missiles.length; i++) {
        var missile = missiles[i];
        missile.style.top = missile.offsetTop + 1 + 'px';

        // Check if missile has hit city
        if (missile.offsetTop + missile.offsetHeight >= city.offsetTop) {
            endGame();
            //alert('Game Over');
            return;
        }

        // Check if missile has been intercepted
        for (var j = 0; j < counterMissiles.length; j++) {
            var counterMissile = counterMissiles[j];
            if (counterMissile.offsetTop <= missile.offsetTop && counterMissile.offsetLeft <= missile.offsetLeft + missile.offsetWidth && counterMissile.offsetLeft + counterMissile.offsetWidth >= missile.offsetLeft) {
                // Increment score
                score++;
                scoreDisplay.textContent = 'Score: ' + score;

                // Remove missile and counter-missile
                missile.parentNode.removeChild(missile);
                missiles.splice(i, 1);
                counterMissile.parentNode.removeChild(counterMissile);
                counterMissiles.splice(j, 1);
                return;
            }
        }
    }

    for (var i = 0; i < counterMissiles.length; i++) {
        var counterMissile = counterMissiles[i];
        counterMissile.style.top = counterMissile.offsetTop - 3 + 'px';
    }
}

// Start the game
function startGame() {
    gameInterval = setInterval(function() {
        createMissile();
        updatePositions();
    }, 1000);
}

// End the game
function endGame() {
    clearInterval(gameInterval);
    missiles = [];
    counterMissiles = [];
    score = 0;
}

// Add click event to game area
gameArea.addEventListener('click', createCounterMissile);
