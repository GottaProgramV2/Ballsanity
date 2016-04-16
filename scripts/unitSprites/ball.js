/**
 * Created by ajt on 4/16/2016.
 */
function Ball() {
    //it makes a new container with this
    PIXI.Container.call(this);
    //construct the ball in this function.
    this.count = 0;
    this.texture = PIXI.Texture.fromFrame("Gumballs");
    this.ball = new PIXI.Sprite(this.texture);
    this.ball.interactive = true;
    this.ballMove = false;
    this.gg = false;
    this.score = new PIXI.Text("0");
    this.score.x = 200;
    this.score.y = 40;
    this.movePosition = [];
    this.leftOrRight = 1;
    this.fallingSpeed = [Math.floor(Math.random() * 5 + 1), Math.floor(Math.random() * 10 + 20 * -1)];
    this.handleClickEvents(this.ball);
    this.addChild(this.ball);
    //this.addChild(this.score);
}

Ball.constructor = Ball;

Ball.prototype = Object.create(PIXI.Container.prototype);

Ball.prototype.update = function(ballObj) {
    if (!this.gg)
    {
        this.boundsCheck(ballObj);
        // just for fun, let's rotate mr rabbit a little
        ballObj.rotation += 0.025;
        // score
        this.count++;
        this.score.text = this.count;
        if (!this.ballMove)
        {
            console.log("asdfff");
            ballObj.position.y += this.fallingSpeed[0];
            ballObj.position.x += this.fallingSpeed[1];
        }

        // move ball up when clicked
        if (this.ballMove)
        {
            console.log("ffffff");
            // up
            if (this.movePosition[1] > 0)
            {
                ballObj.position.y -= this.movePosition[2];
                this.movePosition[1] -= this.movePosition[2];
            }
            // WIP: left or right
            else this.ballMove = false;
        }
    }
};
Ball.prototype.boundsCheck = function(ballObj) {
    // x-axis
    //  right
    if (ballObj.position.x > 600)
    {
        ballObj.position.x = 600 - (ballObj.position.x - 600);
        this.fallingSpeed[1] *= -1;
    }
    //  left
    else if (ballObj.position.x < 0)
    {
        ballObj.position.x *= -1;
        this.fallingSpeed[1] *= -1;
    }
    // y-axis
    //  down
    if (ballObj.position.y > 800 && !this.gg)
    {
        alert("nooo");
        this.gg = true;
    }
    //  up
    else if (ballObj.position.y < 0) ballObj.position.y *= -1;
};

Ball.prototype.handleClickEvents = function(spriteToHandle) {
    spriteToHandle
        .on('mousedown', onButtonDown)
        .on('touchstart', onButtonDown);

    var that = this;
    function onButtonDown() {
        that.count += 50;
        console.log("asdf");
        // change movement to up
        that.ballMove = true;
        // set new falling speeds
        that.fallingSpeed[0] = Math.floor(Math.random() * 10 + 10);
        that.fallingSpeed[1] = Math.floor(Math.random() * 5 + 5 * that.leftOrRight);
        // choose left or right for falling speed
        if (Math.random() < .5) that.fallingSpeed[1] *= -1;
        // set goal position for that.ball
        that.movePosition[0] = that.ball.position.x - Math.floor(Math.random() * 50 + 3);
        that.movePosition[1] = that.ball.position.y - Math.floor(Math.random() * 50 + 3);
        // set increment values for that.ball position
        that.movePosition[2] = Math.floor(Math.random() * 20 + 50);
    }
};