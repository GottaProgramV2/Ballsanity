/**
 * Created by Anthony on 4/27/2016.
 * description: This script will handle the events made on clicking the background 
 *              and creation of "trampolines"
 */

function Background(stage, mouseData) {
    PIXI.Container.call(this);
    this.background_image = new PIXI.Sprite(PIXI.Texture.fromFrame("simple_background"));
    this.background_image.interactive = true;
    this.trampoline = new PIXI.Sprite(PIXI.Texture.fromFrame("Gumballs"));
    this.trampoline.position.y = 9999;
    this.radius = 57;
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
    if (ballObj.position.y + ballObj.radius > this.trampoline.y - this.radius &&
        ballObj.position.x + ballObj.radius > this.trampoline.x - this.radius)
    {
        // move the trampoline out of site
        this.trampoline.position.y = 9999;
        // have the ball go up
        ballObj.ballClicked = true;
    }
}

Background.prototype.handleClickEvents = function(stage, mouseData) {
    this.background_image
        .on('mousedown', onButtonDown)
        .on('touchstart', onButtonDown);
        // end drag
        /*.on('mouseup', onButtonUp)
        .on('mouseupoutside', onButtonUp)
        .on('touchend', onButtonUp)
        .on('touchendoutside', onButtonUp)*/
        // drag 
        /*.on('mousemove', onMouseDrag)
        .on('touchmove', onMouseDrag);*/
    
    var that = this;
    function onButtonDown() {
        that.trampoline.position.x = mouseData.x;
        that.trampoline.position.y = mouseData.y;
    };
}

