/**
 * Created by Anthony on 4/20/2016.
 * @description: this script will keep track of the points earned per session played
 */

// probably want to pass in ball array object
function Score() {
    // create container for Score object
    PIXI.Container.call(this);
    // score to be incremented
    this.count = 0;
    this.addedPoints = true;
    // score to be displayed
    this.score = new PIXI.Text("0");
    this.score.x = 10;
    this.score.y = 800 - 35;
    this.addChild(this.score);
}

Score.constructor = Score;
Score.prototype = Object.create(PIXI.Container.prototype);
Score.prototype.update = function(ballObj, numOfBalls) {
    // simple algorithm
    this.count += numOfBalls;
    this.score.text = this.count;
};