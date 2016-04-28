/**
 * Created by Anthony on 4/27/2016.
 * description: This script will handle the events made on clicking the background 
 *              and creation of "trampolines"
 */

// WIP
function Background() {
    PIXI.Container.call(this);
    this.texture = PIXI.Texture.fromFrame("simple_background");
    this.background_image = new PIXI.Sprite(this.texture);
    this.background_image.interactive = true;

    this.addChild(this.background_image);
}

Background.constructor = Background;
Background.prototype = Object.create(PIXI.Container.prototype);
Background.prototype.update = function(backgroundToHandle, mouseData, stage) {
    backgroundToHandle
        // start drag
        .on('mousedown', onButtonDown)
        .on('touchstart', onButtonDown)
        // end drag
        .on('mouseup', onButtonUp)
        .on('mouseupoutside', onButtonUp)
        .on('touchend', onButtonUp)
        .on('touchendoutside', onButtonUp)
        // drag 
        .on('mousemove', onMouseDrag)
        .on('touchmove', onMouseDrag);
    
    var startPos = [];
    var endPos = [];
    var dragging = true;
    var helloText = new PIXI.Text("hello world");
    function onButtonDown() {
        helloText.x = mouseData.x;
        helloText.y = mouseData.y;
        stage.addChild(helloText);
        dragging = true;
    };
    
    function onButtonUp() {
        dragging = false;
        stage.removeChild(helloText);
    };
    
    function onMouseDrag() {
        if (dragging)
        {
            helloText.x = mouseData.x;
            helloText.y = mouseData.y;
        }
    };
};

// attempt at trying to create a sprite when clicking
/*Background.prototype.update = function(backgroundToHandle, mouseData, stage) {
    backgroundToHandle
        // start drag
        .on('mousedown', onButtonDown)
        .on('touchstart', onButtonDown)
        // end drag
        .on('mouseup', onButtonUp)
        .on('mouseupoutside', onButtonUp)
        .on('touchend', onButtonUp)
        .on('touchendoutside', onButtonUp)
        // drag 
        .on('mousemove', onMouseDrag)
        .on('touchmove', onMouseDrag);
    
    var startPos = [];
    var endPos = [];
    var dragging = true;
    var helloText = new PIXI.Sprite(PIXI.Texture.fromFrame("black_line"));
    stage.addChild(helloText);
    function onButtonDown() {
        helloText.position.x = mouseData.x;
        helloText.position.y = mouseData.y;
        //stage.addChild(helloText);
        dragging = true;
    };
    
    function onButtonUp() {
        dragging = false;
        stage.removeChild(helloText);
    };
    
    function onMouseDrag() {
        if (dragging)
        {
            helloText.position.x = mouseData.x;
            helloText.position.y = mouseData.y;
        }
    };
};*/
