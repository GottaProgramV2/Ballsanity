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
};

Background.constructor = Background;
Background.prototype = Object.create(PIXI.Container.prototype);
Background.prototype.update = function(ballObj) {
    this.collisionDetection(ballObj);
};

Background.prototype.collisionDetection = function(ballObj) {
    // collision detection
    var x_difference = Math.abs(ballObj.position.x - this.trampoline.x);
    var y_difference = Math.abs(ballObj.position.y - this.trampoline.y);
    // x^2 + y^2
    var cornerDistance = Math.pow(x_difference - this.trampoline.width/2,2) + Math.pow(y_difference - this.trampoline.height/2,2);
    
    if (x_difference <= this.trampoline.width/2 && y_difference <= this.trampoline.height/2 ||
        cornerDistance <= Math.pow(ballObj.radius,2))
    {
        // move the trampoline out of sight
        if (!this.dragging) this.trampoline.position.y = 9999;
        // have the ball go upe
        ballObj.ballGoesUp = true;
    }
};

Background.prototype.handleClickEvents = function(stage, mouseData) {
    // listeners
    this.background_image
        // start drag		
        .on('mousedown', onButtonDown)		
        .on('touchstart', onButtonDown)		
        // end drag		
        .on('mouseup', onButtonUp)		
        .on('mouseupoutside', onButtonUp)		
        .on('touchend', onButtonUp)		
        .on('touchendoutside', onButtonUp)		
        // drag 		
        .on('mousemove', onButtonDrag)		
        .on('touchmove', onButtonDrag);
    
    var that = this;
    function onButtonDown() {
        that.trampoline.position.x = mouseData.x;
        that.trampoline.position.y = mouseData.y;
        that.dragging = true;
    }
    function onButtonUp() {
        that.dragging = false;
    }
    function onButtonDrag() {
        if (that.dragging)
        {
            that.trampoline.position.x = mouseData.x;
            that.trampoline.position.y = mouseData.y;
        }
    }
};

