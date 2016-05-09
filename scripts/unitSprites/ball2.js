/**
 * Created by Anthony on 5/04/2016.
 */
 
function Ball() {
    PIXI.Container.call(this);
    // create a ball sprite
    this.ball = new PIXI.Sprite(PIXI.Texture.fromFrame("Gumballs"));
    // set position
    this.ball.position.x = 300;
    this.ball.position.y = 200;
    // set anchor
    this.ball.anchor.x = 0.5;
    this.ball.anchor.y = 0.5;
    // allow for event listeners
    this.ball.interactive = true;
    // bool for game ending
    this.gameOver = false;
    // bool for when ball is clicked
    this.ballClicked = false;
    // counter of how many clicks have been made
    this.difficulty = 0;
    
    // some physics compoenents
    this.velocity = { x: -2, y: -5 };
    this.mass = 5;
    this.radius = 57;
    //  bounce value
    this.restitution = -0.7;
    //  drag constant
    this.Cd = 0.47;
    //  air density
    this.rho = 1.22;
    this.gravity = 9.81;
    this.area = Math.PI * this.radius * this.radius / (10000);
    
    this.handleClickEvents();
    this.addChild(this.ball);
}

Ball.constructor = Ball;
Ball.prototype = Object.create(PIXI.Container.prototype);
Ball.prototype.update = function(ballObj) {
    if (!this.gameOver)
    {
        this.collisionDetection(ballObj);
        ballObj.rotation += 0.025;
        if (!this.ballClicked)
        {   
            //console.log(ballObj.position);
            // calculate drag force
            // drag equation: Fd = -1/2 * Cd * A * rho * v^2
            var Fx = -0.5 * this.Cd * this.area * this.rho * Math.pow(this.velocity.x,2) / Math.abs(this.velocity.x);
            var Fy = -0.5 * this.Cd * this.area * this.rho * Math.pow(this.velocity.y,2) / Math.abs(this.velocity.y);
            
            Fx = (isNaN(Fx)) ? 0 : Fx;
            Fy = (isNaN(Fy)) ? 0 : Fy;
            //console.log(Fx + ", " + Fy);
                        
            // calculate acceleration
            var ax = Fx / this.mass;
            var ay = this.gravity + (Fy / this.mass);
            //console.log(ax + ", " + ay);
            
            this.velocity.x += ax *(1/60);
            this.velocity.y += ay *(1/60);
            //console.log(this.velocity);
            
            ballObj.position.x += this.velocity.x*(1/60);
            ballObj.position.y += this.velocity.y*(1/60);
            console.log(ballObj.position);
        }
        else
        {
            this.velocity.x = -5;
            this.velocity.y = -2 * this.getOne();
            this.ballClicked = false;
        }
    }
};

Ball.prototype.collisionDetection = function(ballObj) {
    // x-axis
    //  right
    if (ballObj.position.x > 600 - this.radius)
    {
        ballObj.position.x = 600 - this.radius;
        //ballObj.position.x *= -1;
        this.velocity.x *= this.restitution;
    }
    //  left
    else if (ballObj.position.x < this.radius)
    {
        ballObj.position.x = this.radius;
        //ballObj.position.x *= -1;
    }
    // y-axis
    //  down
    if (ballObj.position.y > 800 - this.radius && !this.gameOver)
    {
        this.gameOver = true;
    }
    //  up
    else if (ballObj.position.y < this.radius)
    {
        this.velocity.y *= this.restitution;
        ballObj.position.y = this.radius;
        //ballObj.position.y *= -1;
    }
};

Ball.prototype.handleClickEvents = function() {
    this.ball
       .on('mousedown', onButtonDown)
       .on('touchstart', onButtonDown);
       
   var that = this;
   function onButtonDown() {
       that.ballClicked = true;
   }
};

/**
 * Generates a number between 0-1 and returns -1 or 1
 * @returns {number}
 */
Ball.prototype.getOne = function() {
    return (Math.random() < .5) ? -1 : 1;
}
