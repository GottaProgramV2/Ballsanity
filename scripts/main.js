/**
 * Created by ajt on 4/16/2016.
 * description: This script will be handling the creation of the canvas for the game and loading of objects. 
 */
function Main() {
    var width = 600,
        height = 800;
    this.renderer = PIXI.autoDetectRenderer(width, height, {backgroundColor: 0x1099bb});
    document.body.appendChild(this.renderer.view);
    this.stage = new PIXI.Container(0x66FF99);
    //load the spriteSheets and stuff...
    this.loadSpriteSheet();
}
Main.prototype.loadSpriteSheet = function() {
    //no assets right now...
    var assetsToLoad = ["../res/ball.png","../res/ball.json"],
        loader = new PIXI.loaders.Loader();
    //this will load the assets to load, then call the spriteSheetLoaded function once finished...
    loader.add(assetsToLoad).load(this.spriteSheetLoaded.bind(this))
};
//make an instance of our PlayGame class
//request Animation frame will call the update function
Main.prototype.spriteSheetLoaded = function() {
    this.playGame = new PlayGame(this.stage);
    requestAnimationFrame(this.update.bind(this));
};
//update will now update the game and render it, then request another update frame.
Main.prototype.update = function() {
    this.playGame.update();
    this.renderer.render(this.stage);
    requestAnimationFrame(this.update.bind(this));
};

// TODO: separate this into it's own script
Main.prototype.newGame = function() {
    for (var i = this.stage.children.length - 1; i >= 0; i--) {	this.stage.removeChild(this.stage.children[i]); };
    this.playGame = new PlayGame(this.stage);
}