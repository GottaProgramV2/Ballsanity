/**
 * Created by Anthony on 4/20/2016.
 * description: The script that will handle the deletion and recreation of the game.
 */

function Restart(stage) {
    PIXI.Container.call(this);
}

Restart.constructor = Restart;
Restart.prototype = Object.create(PIXI.Container.prototype);
Restart.prototype.newGame = function() {
    // TODO:
}