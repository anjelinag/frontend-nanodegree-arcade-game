// Enemies our player must avoid
var Enemy = function(speed, x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
    this.x = x;
    this.y = y;
};

var Player = function(speed, x, y) {
    this.sprite = 'images/char-princess-girl.png';
    this.speed = speed;
    this.x = x;
    this.y = y;
};

Player.prototype.update = function() {
    // To fill-in
    //Player to stay in the canvas
    if(this.y <= -90){
        this.y = 400;
        this.x = 200;
    }
    if(this.y >= 450){
        this.y = 400;
        this.x = 200;
    }
    if(this.x >= 505){
        this.x = 450;
    }
    if(this.x <= 0){
        this.x = 0;
    }
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
    }
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(pressedKey) {
    if(pressedKey == 'down') {
        player.y = player.y + player.speed + 40;
    }
    if(pressedKey == 'up') {
        player.y = player.y - (player.speed + 40);
    }
    if(pressedKey == 'left') {
        player.x = player.x - (player.speed + 60);
    }
    if(pressedKey == 'right') {
        player.x = player.x + player.speed + 60;
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    //Keep the enemy within the canvas
    if(this.x >= 505){
        this.x = 0;
    }
    contactWithEnemy(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

allEnemies = []; //there will be multiple enemies depending on the level of the game.

var myEnemy = new Enemy(200, 0, 140);
var player = new Player(90, 200, 400);

allEnemies.push(myEnemy);



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
