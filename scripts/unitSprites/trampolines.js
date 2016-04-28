/**
 * Created by ajt on 4/16/2016.
 */
 
 function Trampoline() {
     this.texture = PIXI.Texture.fromFrame("black_line.svg");
     this.line = new PIXI.Sprite(this.texture);
 }
 
 Trampoline.constructor = Trampoline;
 
 Trampoline.prototype = Object.create(PIXI.Container.prototype);