// constants
var RIGHT_ARROW = 39;
var LEFT_ARROW = 37;
var UP_ARROW = 38;
var DOWN_ARROW = 40;

var STAGE_WIDTH = 500;
var STAGE_HEIGHT = 500;

var RECT_WIDTH = 105;
var RECT_HEIGHT = 105;

var BG_COLOR = "#2D4559";
var BG_BOX_COLOR = "576A7A";
var ACTIVE_BOX_COLOR = "#000000";
var ACTIVE_FONT_COLOR = "#FFFFFF";

var ANIMATION_STEP_IN_PIXELS = 40;

//functions

function valueToColor(val) {
    switch (val){
        case 2: return "#9EBCD9";
        case 4: return "#6E9BC6";
        case 8: return "#3D79B3";
        case 16: return "42AC92";
        case 32: return "32816E";
        case 64: return "215649";
        case 128: return "F8A884";
        case 256: return "FF9366";
        case 512: return "E67373";
        case 1024: return "FFC988";
        case 2048: return "FFD685";
    }
}

function createBox(bx, by, bwidth, bheight, fillc, bval) {

    var rectangle = new Kinetic.Rect({
        name: 'rect',
        value: bval,
        cornerRadius: 5,
        x: bx,
        y: by,
        width: bwidth,
        height: bheight,
        fill: fillc
    });

    if (bval === undefined) {
        return rectangle;
    }

    return {
        rect: rectangle,
        text: new Kinetic.Text({
            x: bx,
            y: by + 33,
            width: bwidth,
            height: bheight,
            align: "center",
            text: bval,
            fontSize: 48,
            fontFamily: "Clear Sans",
            fontStyle: "bold",
            fill: ACTIVE_FONT_COLOR
        })
    };

    return result;
}

function createGrid() {
    var cell;
    var grid = [];
    var columns = (STAGE_WIDTH / RECT_WIDTH) | 0;
    var rows = (STAGE_HEIGHT / RECT_HEIGHT) | 0;
    for (col = 0; col < columns; col++) {
        for (row = 0; row < rows; row++) {
            cell = { "col": col, "row": row, value: 0 };
            grid.push(cell);
        }
    }
    return grid;
}

function randomCell(grid) {

    var freeCells = [];

    for (i = 0; i < grid.length; i++) {
        if (grid[i].value === 0) {
            freeCells.push(i);
        }
    }

    var rand = Math.floor((Math.random() * (freeCells.length - 1)));

    return freeCells[rand];
}

//init game stage
var stage = new Kinetic.Stage({
    container: 'game-container',
    width: STAGE_WIDTH,
    height: STAGE_HEIGHT
});

//create game grid
var grid = createGrid();

//add background layer
var backgroundBox = createBox(0, 0, STAGE_WIDTH, STAGE_HEIGHT, BG_COLOR);
var backgroundLayer = new Kinetic.Layer();
backgroundLayer.add(backgroundBox);

var columns = (STAGE_WIDTH / RECT_WIDTH) | 0;
var rows = (STAGE_HEIGHT / RECT_HEIGHT) | 0;
for (col = 0; col < columns; col++) {
    for (row = 0; row < rows; row++) {
        var cx = 16 * (col + 1) + col * RECT_WIDTH;
        var cy = 16 * (row + 1) + row * RECT_HEIGHT;
        var backgroundSBox = createBox(cx, cy, RECT_WIDTH, RECT_HEIGHT, BG_BOX_COLOR);
        backgroundLayer.add(backgroundSBox);
    }
}

stage.add(backgroundLayer);

//init
var gameLayer = new Kinetic.Layer();

//init main logic
var logic = new MainLogic(4, 4);
logic.reset();

for (var j = 0; j < 2; j++) {

    var randCell = randomCell(grid);
    //alert(randCell);
    var gRow = grid[randCell].row;
    var gCol = grid[randCell].col;
    var value = 2;
    grid[randCell].value = value;
    var bx = 16 * (gCol + 1) + gCol * RECT_WIDTH;
    var by = 16 * (gRow + 1) + gRow * RECT_HEIGHT;
    var box = createBox(bx, by, RECT_WIDTH, RECT_HEIGHT, valueToColor(value), value);
    box.rect.id = randCell;
    box.text.id = randCell;

    gameLayer.add(box.rect);
    gameLayer.add(box.text);

    logic.setElement(gRow, gCol, 1);
}
stage.add(gameLayer);


//start game loop
var gameInterval = setInterval(function () { gameLoop() }, 1000);

var moves = logic.moveUp();

function gameLoop() {
    if (checkGameStatus()) {
        moveBoxesUpward(moves);
    }
    else {
        clearInterval(gameInterval);//Stop calling gameLoop()
        alert('Game Over!');
    }
}

function checkGameStatus() {
    return true;
}

function moveBoxesUpward(moves) {
    if (!moves) return;

    var anim = new Kinetic.Animation(function (frame) {
        for (var i = 0; i < moves.length; i++) {
            for (var j = 0; j < gameLayer.children.length - 1; j += 2) {

                // find element to move
                var boxObj = gameLayer.children[j];
                var textObj = gameLayer.children[j + 1];
                boxId = boxObj.id;
                if (moves[i].first.row == grid[boxId].row &&
                    moves[i].first.col == grid[boxId].col) {
                    boxObj.attrs.y = (16 * (moves[i].result.row + 1)) + (moves[i].result.row * RECT_HEIGHT)
                    textObj.attrs.y = boxObj.attrs.y + 33;
                }
                
                //var boxObj = gameLayer.children[i];
                //var textObj = gameLayer.children[i + 1];
                //if (boxObj.attrs.y > 16 + ANIMATION_STEP_IN_PIXELS) {
                //    boxObj.attrs.y -= ANIMATION_STEP_IN_PIXELS;
                //    textObj.attrs.y -= ANIMATION_STEP_IN_PIXELS;
                //}
                //else {
                //    boxObj.attrs.y = 16;
                //    textObj.attrs.y = 49;
                //}
            }
        }
        
    }, gameLayer);
	
    anim.start();
    anim.stop();
}

/*function move(where) {

}*/

//add layer
/*var layer = new Kinetic.Layer();
layer.add(rectangle);
stage.add(layer);*/

//var rectangle=stage.rect(

//key events
/*$(document).ready(function () {
    $(document).keydown(function (e) {

        switch (e.keyCode) {

            case UP_ARROW:
                //where = Up_Arrow;
                break;

            case DOWN_ARROW:
                where = Down_Arrow;
                break;

            case RIGHT_ARROW:
                where = Right_Arrow;
                break;

            case LEFT_ARROW:
                where = Left_Arrow;
                break;
        }
    });
});*/