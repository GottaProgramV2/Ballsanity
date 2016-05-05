/**
 * Created by Anthony on 4/27/2016.
 * description: This script will handle the events made on clicking the background 
 *              and creation of "trampolines"
 */

function Background(stage, mouseData) {
    PIXI.Container.call(this);
    this.background_image = new PIXI.Sprite(PIXI.Texture.fromFrame("simple_background"));
    this.background_image.interactive = true;
    this.trampoline = new PIXI.Sprite(PIXI.Texture.fromFrame("black_line"));
    this.trampoline.position.y = 9999;
    this.trampoline.anchor = { x: .5, y: .5 };
    this.dragging = false;
    
    this.handleClickEvents(stage, mouseData);
    this.addChild(this.background_image);
    this.addChild(this.trampoline);
}

Background.constructor = Background;
Background.prototype = Object.create(PIXI.Container.prototype);
Background.prototype.update = function(ballObj) {
    this.collisionDetection(ballObj);
};

Background.prototype.collisionDetection = function(ballObj) {
    // collision detection
    // TODO: change static height and width to variables to match scaling
    //  left side of line
    var x_difference_L = Math.abs((ballObj.position.x + ballObj.radius) - (this.trampoline.x - 50));
    //  right side of line
    var x_difference_R = Math.abs((ballObj.position.x + ballObj.radius) - (this.trampoline.x + 50));
    //  top of line
    var y_difference = Math.abs((ballObj.position.y + ballObj.radius) - (this.trampoline.y - 10));
    var collisionThreshold = 10;
    if ((x_difference_L < collisionThreshold || x_difference_R < collisionThreshold) && 
        y_difference < collisionThreshold)
    {
        // move the trampoline out of sight
        this.trampoline.position.y = 9999;
        // have the ball go up
        ballObj.ballClicked = true;
    }
}

Background.prototype.handleClickEvents = function(stage, mouseData) {
    // listeners
    this.background_image
        .on('mousedown', onButtonDown)
        .on('touchstart', onButtonDown);
    
    var that = this;
    function onButtonDown() {
        that.trampoline.position.x = mouseData.x;
        that.trampoline.position.y = mouseData.y;
    };
}

