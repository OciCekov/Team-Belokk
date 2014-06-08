// constants
var RIGHT_ARROW = 39;
var LEFT_ARROW = 37;
var UP_ARROW = 38;
var DOWN_ARROW = 40;

var STAGE_WIDTH = 500;
var STAGE_HEIGHT = 500;

var RECT_WIDTH = 105;
var RECT_HEIGHT = 105;

//functions

function valueToColor(val)
{
    return "#000000";
}

function createBox(bx, by, bwidth, bheight, fillc, bval) {

    var result = {};
    if (bval === undefined)
    {
        bval = "";
    }
    return {
        "rect":new Kinetic.Rect({
            name: 'rect',
            value: bval,
            cornerRadius: 5,
            x: bx,
            y: by,
            width: bwidth,
            height: bheight,
            fill: fillc
        }),"text":new Kinetic.Text({
            x: bx,
            y: by+33,
            width: bwidth,
            height: bheight,
            align: "center",            
            text: bval,
            fontSize:45,
            fill: valueToColor(bval)
        })
    };
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
var backgroundBox = createBox(0, 0, STAGE_WIDTH, STAGE_HEIGHT, "#BBBBBB");
var backgroundLayer = new Kinetic.Layer();
backgroundLayer.add(backgroundBox.rect);

var columns = (STAGE_WIDTH / RECT_WIDTH) | 0;
var rows = (STAGE_HEIGHT / RECT_HEIGHT) | 0;
for (col = 0; col < columns; col++) {
    for (row = 0; row < rows; row++) {
        var cx = 16 * (col + 1) + col * RECT_WIDTH;
        var cy = 16 * (row + 1) + row * RECT_HEIGHT;
        var grayedBox = createBox(cx, cy, RECT_WIDTH, RECT_HEIGHT, "#999999");
        backgroundLayer.add(grayedBox.rect);
    }
}

stage.add(backgroundLayer);

//init
var gameLayer = new Kinetic.Layer();

for (var j = 0; j < 2; j++) {

    var randCell = randomCell(grid);
    //alert(randCell);
    var gRow = grid[randCell].row;
    var gCol = grid[randCell].col;
    var value=2;
    grid[randCell]=value;
    var bx = 16 * (gCol + 1) + gCol * RECT_WIDTH;
    var by = 16 * (gRow + 1) + gRow * RECT_HEIGHT;
    var box = createBox(bx, by, RECT_WIDTH, RECT_HEIGHT, "#DDDDDD", value);

    gameLayer.add(box.rect);
    gameLayer.add(box.text);
}
stage.add(gameLayer);

//start game loop
var gameInterval = self.setInterval(function () { gameLoop() }, 70);

function gameLoop() {
    if (checkGameStatus()) {
        //move(where);
    }
    else {
        clearInterval(gameInterval);//Stop calling gameLoop()
        alert('Game Over!');
    }
}



function checkGameStatus() {
    return true;
}

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