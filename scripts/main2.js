/**
 * Created by ajt on 4/16/2016.
 */
function Main2() {
    var width = 600,
        height = 800;
    this.renderer = PIXI.autoDetectRenderer(width, height, {backgroundColor: 0x1099bb});
    document.body.appendChild(this.renderer.view);
    this.stage = new PIXI.Container();
    
    this.mousePos = this.renderer.plugins.interaction.mouse.global;
    
    //load the spriteSheets and stuff...
    this.loadSpriteSheet();
}
Main2.prototype.loadSpriteSheet = function() {
    //no assets right now...
    var assetsToLoad = ["../res/ball.png","../res/ball.json", 
    "../res/simple_background.png", "../res/simple_background.json", 
    "../res/black_line.png", "../res/black_line.json"],
        loader = new PIXI.loaders.Loader();
    //this will load the assets to load, then call the spriteSheetLoaded function once finished...
    loader.add(assetsToLoad).load(this.spriteSheetLoaded.bind(this))
};
//make an instance of our PlayGame class
//request Animation frame will call the update function
Main2.prototype.spriteSheetLoaded = function() {
    this.playGame = new PlayGame(this.stage);
    requestAnimationFrame(this.update.bind(this));
};
//update will now update the game and render it, then request another update frame.
Main2.prototype.update = function() {
    this.playGame.update(this.mousePos);
    this.renderer.render(this.stage);
    requestAnimationFrame(this.update.bind(this));
};

// TODO: separate this
Main2.prototype.newGame = function() {
    for (var i = this.stage.children.length - 1; i >= 0; i--) {	this.stage.removeChild(this.stage.children[i]); };
    this.playGame = new PlayGame(this.stage);
}