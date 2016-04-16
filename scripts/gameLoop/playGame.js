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
    this.ball.scale.x = .8;
    this.ball.scale.y = .8;

    this.ball2 = new Ball();
    this.ball2.position.x = 200;
    this.ball2.position.y = 100;
    this.ball2.scale.x = 1.2;
    this.ball2.scale.y = 1.2;
    stage.addChild(this.ball);
    stage.addChild(this.ball2);
};

PlayGame.prototype.update = function() {
    this.ball.update(this.ball);
    this.ball2.update(this.ball2);
};