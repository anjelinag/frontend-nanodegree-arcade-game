'use strict';

// Define a superclass for game participants/actors or moving objects in the game.
class GameActors {
    // Variables applied to each of our instances
    constructor(sprite, speed, x, y)  {
        this.sprite = sprite;
        this.speed = speed;
        this.x = x;
        this.y = y;
    }

    // Draw the game actors, enemies and player, on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

class Enemy extends GameActors {
    
    constructor(sprite, speed, x, y) {
        super(sprite, speed, x, y);
    }

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
class Player extends GameActors { 

    constructor(sprite, speed, x, y) {
        super(sprite, speed, x, y);
    }

    update() {
        checkIfGameIsWon();    
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


        // The following series of if blocks is mean to  move the player back to the initial 
        // starting location when it advances outside of the canvas
        if(this.y <= -100) {
            this.y = -50;
        }

        if(this.x >= 404) {
            this.x = 404;
        }
        if(this.x <= 0) {
            this.x = 0;
        }
        if(this.y >= 390) {
            this.y = 390;
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

var player = new Player('images/char-princess-girl.png', 50, 200, 400);
var scoreLevelElement = document.createElement('div');

var allEnemies = []; //there will be multiple enemies 

//This will add multiple enemies to the game
for (var i=0; i<5; i++) {
    var myEnemy = new Enemy('images/enemy-bug.png', Math.random()*250, 0, Math.random()*170 + 55);
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
