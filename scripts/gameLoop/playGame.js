/**
 * Created by ajt on 4/16/2016.
 * description: This script handles servicing all objects within the stage
 */
function PlayGame(stage) {
    this.constructPlayGame(stage);
}

PlayGame.prototype.constructPlayGame = function(stage) {
    // create score objects
    this.playerScore = new Score();
    stage.addChild(this.playerScore);
    // create ball objects
    this.ballArray = []
    this.numOfBalls = 2;
    for (var i = 0; i < this.numOfBalls; i++)
    {
        this.ballArray[i] = new Ball();
        // change integer/float constants to random values
        this.ballArray[i].position.x = 300;
        this.ballArray[i].position.y = 200;
        this.ballArray[i].scale.x = .8;
        this.ballArray[i].scale.y = .8;
        // add ball to stage
        stage.addChild(this.ballArray[i]);
    }
};

PlayGame.prototype.update = function() {
    var endGame = 0;
    for (var i = 0; i < this.numOfBalls; i++)
    {
        this.ballArray[i].update(this.ballArray[i]);
        if (this.ballArray[i].gg) endGame++;
    }
    if (endGame != this.numOfBalls) this.playerScore.update();
};