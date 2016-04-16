/**
 * Created by ajt on 4/16/2016.
 */
function PlayGame(stage) {
    this.constructPlayGame(stage);
}

PlayGame.prototype.constructPlayGame = function(stage) {
    //Add to stage the units
    this.ball = new Ball();
    this.ball.position.x = 300;
    this.ball.position.y = 400;
    stage.addChild(this.ball);
};

PlayGame.prototype.update = function() {
    this.ball.update(this.ball);
};