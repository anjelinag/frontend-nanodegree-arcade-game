'use strict';
// Enemies our player must avoid
//Enemy class using ES6
class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    constructor (speed, x, y) {
        this.sprite = 'images/enemy-bug.png';
        this.speed = speed;
        this.x = x;
        this.y = y;
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x = this.x + this.speed * dt;

        // Keep the enemy within the canvas and have it come back to its original starting x-axis position
        if(this.x >= 505) {
            this.x = 0;
        }

        contactWithEnemy(this);
    };
};
//Player class using the ES6  
class Player {

    constructor(speed, x, y) {
        this.sprite = 'images/char-princess-girl.png';
        this.speed = speed;
        this.x = x;
        this.y = y;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        checkIfGameIsWon();
    } 

     update() {
        // To fill-in
        //Player to stay in the canvas
        if(this.y <= -100) {
            this.y = -50;
        }
        if(this.x >= 505) {
            this.x = 450;
        }
        if(this.x <= -50) {
            this.x = -50;
        }
        if(this.y >= 500) {
            this.y = 390;
        }
    };

    handleInput(keyPress) {
        if (keyPress == 'left') {
            this.x = this.x - (this.speed + 60);
        }
        if (keyPress == 'up') {
            this.y = this.y - (this.speed - 20);
        }
        if (keyPress == 'right') {
            this.x = this.x + this.speed + 60;
        }
        if (keyPress == 'down') {
            this.y = this.y + this.speed - 20;
        }
    };
};

//To check collision with enemy and if collision 
//happens it will return the player to the initial position
var contactWithEnemy = function(myEnemy){
    if (
        player.x < myEnemy.x + 60 &&
        player.x + 37 > myEnemy.x &&
        player.y < myEnemy.y + 25 &&
        30 + player.y > myEnemy.y
        ) {

        player.x = 200;
        player.y = 400;
        announceGameStatus('Game Over. You lose!');
        addReplayFunctionality();
        endGame(allEnemies);
    }
};

var endGame = function(enemies) {
     for ( var k=0; k < enemies.length; k++) {
            enemies[k].speed = 0;
    }
};


//Announce if the game is won or lost.
var announceGameStatus = function(message) {
    var canvas = document.getElementsByTagName('canvas')[0];
    var replayButton = '<div class="restart"><i class="fa fa-repeat"></i></div>' 
    scoreLevelElement.innerHTML =  message + replayButton;
    document.body.appendChild(scoreLevelElement, canvas);
};


var addReplayFunctionality = function() {
    var replayElement = document.getElementsByClassName('fa-repeat');
    replayElement[0].addEventListener('click', function() {
        location.reload();
    });
};

//Check if the game is won. 
var checkIfGameIsWon = function() {
    if(player.y <= 0 ) {
        player.x = 200;
        player.y = 400;
        announceGameStatus('Congratulation. You won!');
        addReplayFunctionality();
        endGame(allEnemies);
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = []; //there will be multiple enemies depending on the level of the game.

// var myEnemy = new Enemy(200, 0, 140);
var player = new Player(50, 200, 400);
var scoreLevelElement = document.createElement('div');

//This will add multiple enemies to the game
for (var i=0; i<5; i++) {
    var myEnemy = new Enemy(Math.random()*250, 0, Math.random()*170 + 55);
    allEnemies.push(myEnemy);
}



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
