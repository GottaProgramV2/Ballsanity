/**
 * Created by ajt on 4/15/2016.
 */
function Main() {
    width = 800;
    height = 600;
    renderer = PIXI.autoDetectRenderer(width, height, {backgroundColor: 0x1099bb});
    document.body.appendChild(renderer.view);

// create the root of the scene graph
    stage = new PIXI.Container();

// create a texture from an image path
    texture = PIXI.Texture.fromImage("../res/bunny.png");

// score text
    score = new PIXI.Text("0");
    score.x = 10;
    score.y = height - 40;

// create a new Sprite using the texture
    bunny = new PIXI.Sprite(texture);

// mouse object
    mousePosition = renderer.plugins.interaction.mouse.global;

// center the sprite's anchor point
    bunny.anchor.x = .5;
    bunny.anchor.y = .5;

// move the sprite to the center of the screen
    bunny.position.x = width / 2;
    bunny.position.y = height / 6;

// make the bunny interaction
    bunny.interactive = true;
//  interactions
//   some not necessary, learning
    bunny
        .on('mousedown', onButtonDown)
        .on('mouseup', onButtonUp)
        .on('mouseupoutside', onButtonUp)
        .on('touchstart', onButtonDown)
        .on('touchend', onButtonUp)
        .on('touchendoutside', onButtonUp)
        .on('mousemove', onMouseDrag)
        .on('touchmove', onMouseDrag);

// add objects to stage
    stage.addChild(bunny);
    stage.addChild(score);

    leftOrRight = 1;
    gg = false;
    fallingSpeed = [Math.floor(Math.random() * 5 + 1), Math.floor(Math.random() * 10 + 20 * -1)];
    count = 0;
// start animating
    animate();
}
function animate() {
    requestAnimationFrame(animate);

    if (!gg)
    {
        boundsCheck();
        // just for fun, let's rotate mr rabbit a little
        bunny.rotation += 0.025;
        // score
        count++;
        score.text = count;
        if (!bunnyMove)
        {

            bunny.position.y += fallingSpeed[0];
            bunny.position.x += fallingSpeed[1];
        }

        // move bunny up when clicked
        if (bunnyMove)
        {
            // up
            if (movePosition[1] > 0)
            {
                bunny.position.y -= movePosition[2];
                movePosition[1] -= movePosition[2];
            }
            // WIP: left or right
            else bunnyMove = false;
        }
    }
    // render the container
    renderer.render(stage);
}

var bunnyMove = false;
var movePosition = [];
function onButtonDown() {
    count+= 50;
    // change movement to up
    bunnyMove = true;
    // set new falling speeds
    fallingSpeed[0] = Math.floor(Math.random() * 10 + 10);
    fallingSpeed[1] = Math.floor(Math.random() * 5 + 5 * leftOrRight);
    // choose left or right for falling speed
    if (Math.random() < .5) fallingSpeed[1] *= -1;
    // set goal position for bunny
    movePosition[0] = bunny.position.x - Math.floor(Math.random() * 50 + 3);
    movePosition[1] = bunny.position.y - Math.floor(Math.random() * 50 + 3);
    // set increment values for bunny position
    movePosition[2] = Math.floor(Math.random() * 5 + 20);
}

// learning
function onButtonUp() {

}
function onMouseDrag() {

}

// keeps the bunny in the canvas (reflects movement except down)
function boundsCheck() {
    // x-axis
    //  right
    if (bunny.position.x > width)
    {
        bunny.position.x = width - (bunny.position.x - width);
        fallingSpeed[1] *= -1;
    }
    //  left
    else if (bunny.position.x < 0)
    {
        bunny.position.x *= -1;
        fallingSpeed[1] *= -1;
    }
    // y-axis
    //  down
    if (bunny.position.y > height && !gg)
    {
        alert("nooo");
        gg = true;
    }
    //  up
    else if (bunny.position.y < 0) bunny.position.y *= -1;
}