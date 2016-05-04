/**
 * Created by Anthony on 4/16/2016.
 */
 
 function Trampoline() {
     this.texture = PIXI.Texture.fromFrame("black_line.svg");//black_line.svg isnt a frame, its the image name with extension. look in the .json file to see what the frame name is
     this.line = new PIXI.Sprite(this.texture);
 }
 
 Trampoline.constructor = Trampoline;
 
 Trampoline.prototype = Object.create(PIXI.Container.prototype);