/**
 * Created by ajt on 4/16/2016.
 * description: This script handles servicing all objects within the stage.
 */

function PlayGame(stage, mouseData) {
    this.stage = stage;
    this.mouseData = mouseData;
    this.constructPlayGame();
}

PlayGame.prototype.constructPlayGame = function() {
    // create background image
    this.background = new Background(this.stage, this.mouseData);
    this.stage.addChild(this.background);
    // create score objects
    this.playerScore = new Score();
    this.stage.addChild(this.playerScore);
    // create ball objects
    this.ballArray = [];
    this.numOfBalls = 2;
    for (var i = 0; i < this.numOfBalls; i++)
    {
        this.ballArray[i] = new Ball();
        this.ballArray[i].position.x = 300;
        this.ballArray[i].position.y = 200;
        this.ballArray[i].setScale(.5,.5);
        // add ball to stage
        this.stage.addChild(this.ballArray[i]);
    }

};

PlayGame.prototype.update = function() {
    //var endGame = 0;
    // check if all the objects have fallen
    for (var i = 0; i < this.numOfBalls; i++)
    {
        this.ballArray[i].update(this.ballArray[i]);
        this.background.update(this.ballArray[i]);
        if (this.ballArray[i].gameOver) 
        {
            // decrement number of balls
            this.numOfBalls--;
            // swap the dead ball for the last one in the array
            var temp = this.ballArray[i];
            this.ballArray[i] = this.ballArray[this.numOfBalls];
            this.ballArray[this.numOfBalls] = temp;
            this.stage.removeChild(this.ballArray[this.numOfBalls]);
        }
        // update score if user hasn't lost
        this.playerScore.update(this.ballArray[i], this.numOfBalls);
    }
    //if (this.playerScore.count % 10000 < 100) this.addBall();
};

PlayGame.prototype.addBall = function() {
    this.ballArray[this.numOfBalls] = new Ball();
    this.ballArray[this.numOfBalls].position.x = 300;
    this.ballArray[this.numOfBalls].position.y = 200;
    this.ballArray[this.numOfBalls].setScale(.5,.5);
    // add ball to stage
    this.stage.addChild(this.ballArray[this.numOfBalls]);
    this.numOfBalls++;
}
