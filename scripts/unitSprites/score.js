/**
 * Created by Anthony on 4/20/2016.
 */

// probably want to pass in ball array object
function Score() {
    // create container for Score object
    PIXI.Container.call(this);
    // score to be incremented
    this.count = 0;
    // score to be displayed
    this.score = new PIXI.Text("0");
    this.score.x = 10;
    this.score.y = 800 - 35;
    this.addChild(this.score);
}

Score.constructor = Score;

Score.prototype = Object.create(PIXI.Container.prototype);

Score.prototype.update = function() {
    // simple algorithm
    this.count++;
    this.score.text = this.count;
}