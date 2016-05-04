/**
 * Created by ajt on 4/16/2016.
 * description: This script handles servicing all objects within the stage
 */

function PlayGame(stage, mouseData) {
    this.constructPlayGame(stage, mouseData);
}

PlayGame.prototype.constructPlayGame = function(stage, mouseData) {
    this.stage = stage;
    // create background image
    this.background = new Background(stage, mouseData);
    this.background.trampoline.position = {x:300,y:200};
    stage.addChild(this.background);
    // create score objects
    this.playerScore = new Score();
    stage.addChild(this.playerScore);
    // create ball objects
    this.ballArray = [];
    this.numOfBalls = 2;
    for (var i = 0; i < this.numOfBalls; i++)
    {
        this.ballArray[i] = new Ball();
        this.ballArray[i].position.x = 300;
        this.ballArray[i].position.y = 200;
        //this.ballArray[i].scale.x = .8;
        //this.ballArray[i].scale.y = .8;
        // add ball to stage
        stage.addChild(this.ballArray[i]);
    }

};

PlayGame.prototype.update = function() {
    var endGame = 0;
    // check if all the objects have fallen
    for (var i = 0; i < this.numOfBalls; i++)
    {
        this.ballArray[i].update(this.ballArray[i]);
        this.background.update(this.ballArray[i]);
        if (this.ballArray[i].gameOver) endGame++;
    }
    // update score if user hasn't lost
    if (endGame != this.numOfBalls) this.playerScore.update();
    
};