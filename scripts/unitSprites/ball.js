/**
 * Created by ajt on 4/16/2016.
 */
 
function Ball() {
    //it makes a new container with this
    PIXI.Container.call(this);
    //construct the ball in this function.
    this.ball = new PIXI.Sprite(PIXI.Texture.fromFrame("Gumballs"));
    // set anchor
    this.ball.anchor = { x: .5, y: .5 };
    // give the ball a radius
    this.radius = this.ball.width / 2;
    // allow for event listeners
    this.ball.interactive = true;
    this.ballGoesUp = false;
    this.gameOver = false;
    // constants for falling
    this.fallingSpeed = { x: (Math.random() * 10 + 3) * this.getOne(), y: 5 };
    // constants for flying up
    this.upSpeed = { x: 0, y: 15 };
    this.difficulty = 0;
    
    this.handleClickEvents();
    this.addChild(this.ball);
}

Ball.constructor = Ball;
Ball.prototype = Object.create(PIXI.Container.prototype);
Ball.prototype.update = function(ballObj) {
    //this.position = ballObj.position;
    if (!this.gameOver)
    {
        this.boundsCheck(ballObj);
        // rotate ball
        ballObj.rotation += 0.025;
        if (!this.ballGoesUp)
        {
            ballObj.position.x += this.fallingSpeed.x;
            ballObj.position.y += this.fallingSpeed.y;
        }

        // move ball up when clicked
        else
        {
            // up
            if (this.ballGoesUp)
            {
                ballObj.position.x += this.upSpeed.x;
                ballObj.position.y -= this.upSpeed.y;
            }
            // once the ball has reached it's required height, make it fall again
            else this.ballGoesUp = false;
        }
        
    }
};

Ball.prototype.boundsCheck = function(ballObj) {
    // x-axis
    //  right
    if (ballObj.position.x > 600)
    {
        ballObj.position.x = 600;
        this.fallingSpeed.x *= -1;
        this.upSpeed.x *= -1;
    }
    //  left
    else if (ballObj.position.x < 0)
    {
        ballObj.position.x = 0;
        this.fallingSpeed.x *= -1;
        this.upSpeed.x *= -1;
    }
    // y-axis
    //  down
    if (ballObj.position.y > 800 && !this.gameOver)
    {
        this.gameOver = true;
    }
    //  up
    else if (ballObj.position.y < 0) 
    {
        ballObj.position.y = 0;
        this.ballGoesUp = false;
    }
};

Ball.prototype.handleClickEvents = function() {
    this.ball
        .on('mousedown', onButtonDown)
        .on('touchstart', onButtonDown);

    var that = this;
    function onButtonDown() {
        // change movement to up
        that.ballGoesUp = true;
        that.fallingSpeed.x = (Math.random() * 10 + 10) * that.getOne();
        that.fallingSpeed.y = Math.random() * 10 + 10;
        //that.upSpeed.x = Math.random() * 10 + 20;
    }
};

/**
 * Generates a number between 0-1 and returns -1 or 1
 * @returns {number}
 */
Ball.prototype.getOne = function() {
    return (Math.random() < .5) ? -1 : 1;
};

Ball.prototype.setScale = function(x,y) {
    this.ball.scale.x = x;
    this.ball.scale.y = y;
    this.radius = this.ball.width / 2;
}