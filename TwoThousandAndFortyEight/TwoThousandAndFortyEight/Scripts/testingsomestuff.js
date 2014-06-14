﻿// constants
var RIGHT_ARROW = 39;
var LEFT_ARROW = 37;
var UP_ARROW = 38;
var DOWN_ARROW = 40;

var STAGE_WIDTH = 500;
var STAGE_HEIGHT = 500;

var RECT_WIDTH = 105;
var RECT_HEIGHT = 105;

var ROWS = (STAGE_WIDTH / RECT_WIDTH) | 0;
var COLS = (STAGE_HEIGHT / RECT_HEIGHT) | 0;

var BG_COLOR = "#2D4559";
var BG_BOX_COLOR = "#576A7A";
var ACTIVE_BOX_COLOR = "#000000";
var ACTIVE_FONT_COLOR = "#FFFFFF";

var ANIMATION_STEP_IN_PIXELS = 40;

var SCORE_POSITION = { X: 150, Y: 10 }
var HIGH_SCORE_POSITION = { X: 400, Y: 10 }
var SCORE_WIDTH = 80;
var SCORE_HEIGHT = 30;

//functions

function valueToColor(val) {
    switch (val) {
        case 2: return "#9EBCD9";
        case 4: return "#6E9BC6";
        case 8: return "#3D79B3";
        case 16: return "#42AC92";
        case 32: return "#32816E";
        case 64: return "#215649";
        case 128: return "#F8A884";
        case 256: return "#FF9366";
        case 512: return "#E67373";
        case 1024: return "#FFC988";
        case 2048: return "#FFD685";
    }
}

//var shape = stage.find('#myRect')[0];


function createBox(bx, by, bwidth, bheight, fillc, bval) {

    var rectidPostfix = bx + '-' + by;
    var rectangle = new Kinetic.Rect({
        id: 's-' + rectidPostfix,
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

    rectangle.id = 'a-' + rectidPostfix;

    return {
        rect: rectangle,
        text: new Kinetic.Text({
            x: bx,
            y: by + 33,
            id: 'st-' + rectidPostfix,
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
            cell = { "col": col, "row": row, obj: null };
            grid.push(cell);
        }
    }
    return grid;
}



function randomCell(grid) {

    var freeCells = [];

    for (i = 0; i < grid.length; i++) {
        if (grid[i].obj === null) {
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
//var logic = new MainLogic(4, 4);
//logic.reset();

for (var j = 0; j < 2; j++) {
    addRandomCellToGameLayer();
}

stage.add(gameLayer);

var score = 0;
var highScore = 0;

var paper = Raphael(0, 0, 500, 40);

var scoreRect = paper.rect(SCORE_POSITION.X, SCORE_POSITION.Y, SCORE_WIDTH, SCORE_HEIGHT);
scoreRect.attr({
    stroke: 'none',
    fill: '#EEE'
});

var highScoreRect = paper.rect(HIGH_SCORE_POSITION.X, HIGH_SCORE_POSITION.Y, SCORE_WIDTH, SCORE_HEIGHT);
highScoreRect.attr({
    stroke: 'none',
    fill: '#EEE'
})

//start game loop
//var gameInterval = setInterval(function () { gameLoop() }, 1000);

//var moves = logic.moveUp();

/*function gameLoop() {
    if (checkGameStatus()) {
        //moveBoxesUpward(moves);
    }
    else {
        clearInterval(gameInterval);//Stop calling gameLoop()
        alert('Game Over!');
    }
}*/

/*function checkGameStatus() {
    return true;
}
*/
/*
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
}*/

/*function move(where) {

}*/

//add layer
/*var layer = new Kinetic.Layer();
layer.add(rectangle);
stage.add(layer);*/

//var rectangle=stage.rect(

//gets a row from the grid matrix
function getRowFromGrid(dir, rowi) {
    var rRow = [];
    var rowWidth = COLS;
    var shift = 1;
    var start = rowWidth * rowi;
    var end = start + rowWidth;

    if (dir === "h") {
        shift = rowWidth;
        start = rowi;
        end = grid.length;
    }

    for (var j = start; j < end; j += shift) {
        var el = grid[j];
        rRow.push(el);
    }

    return rRow;
}


function getAllRows(dir) {

    var res = [];
    var limit = COLS;
    if (dir === "v") {
        limit = ROWS;
    }

    //console.log(dir);
    for (var rowi = 0; rowi < limit; rowi++) {
        var row = getRowFromGrid(dir, rowi);
        res.push(row);
    }
    return res;
}

function sortGridByRows(gridObj) {
    return gridObj.sort(function (a, b) {

        if (a.row < b.row) {
            return -1;
        }
        else if (a.row == b.row) {
            return 0;
        }
        return 1;
    });
}

function sortGridByCols(gridObj) {
    return gridObj.sort(function (a, b) {

        if (a.col < b.col) {
            return -1;
        }
        else if (a.col == b.col) {
            return 0;
        }
        return 1;
    });
}

function sortRow(row, dir) {
    var sign = 1;
    if (dir === 'left' || dir === 'up') {
        sign = -1;
    }

    var newRow = row.sort(function (a, b) {
        if (a.obj === null) {
            if (b.obj === null) {
                return 0;
            }
            return -sign;
        }
        else if (a.obj !== null && b.obj !== null) {
            return 0;
        }
        return sign;
    });
    return newRow;
}


function calculateRowSums(row, dir) {
    var ready = false;

    //while (ready == false) {

    //ready = true;

    for (var j = 0; j < row.length - 1; j++) {

        var elInd = (dir == 'right' || dir == 'down') ? (row.length - 1) - j : j;
        var sign = (dir == 'right' || dir == 'down') ? -1 : 1;

        var cEl = row[elInd].obj;
        var nEl = row[elInd + sign].obj;

        if (cEl !== null && nEl !== null) {
            if ((cEl.rect.attrs.value | 0) === (nEl.rect.attrs.value | 0)) {

                row[elInd].obj.rect.attrs.value = (row[elInd].obj.rect.attrs.value | 0) * 2;

                row[elInd + sign].obj = null;
                row = sortRow(row, dir);
                //ready = false;
                break;
            }
        }
    }
    //}

    return row;
}

function fixRowElementsIndex(row, dir, coli, nameprefix) {
    for (var i = 0; i < row.length; i++) {

        var gRow = (dir === 'h') ? coli : i;
        var gCol = (dir === 'h') ? i : coli;

        row[i].row = gRow;
        row[i].col = gCol;

        if (row[i].obj !== null) {

            var bx = 16 * (gCol + 1) + gCol * RECT_WIDTH;
            var by = 16 * (gRow + 1) + gRow * RECT_HEIGHT;

            row[i].obj = createBox(bx, by, RECT_WIDTH, RECT_HEIGHT, valueToColor(row[i].obj.rect.attrs.value), row[i].obj.rect.attrs.value);
        }

    }
    return row;
}


function addRandomCellToGameLayer() {
    var randCell = randomCell(grid);

    var gRow = grid[randCell].row;
    var gCol = grid[randCell].col;
    var value = 2;
    var bx = 16 * (gCol + 1) + gCol * RECT_WIDTH;
    var by = 16 * (gRow + 1) + gRow * RECT_HEIGHT;
    var box = createBox(bx, by, RECT_WIDTH, RECT_HEIGHT, valueToColor(value), value);

    grid[randCell].obj = box;

    gameLayer.add(box.rect);
    gameLayer.add(box.text);
}

function createAnimationsList(oldRow, newRow, dir) {

}

function moveAllBoxesInDir(dir) {

    var orientation = (dir === 'down' || dir === 'up') ? 'v' : 'h';
    //var corientation=(dir=='down' || dir=='up')?'h':'v';

    var rows = getAllRows(orientation);
    var newGrid = [];

    for (var rowi = 0; rowi < rows.length; rowi++) {

        var sortedRow = sortRow(rows[rowi], dir);
        var calcedRow = fixRowElementsIndex(calculateRowSums(sortedRow, dir), orientation, rowi);

        for (var h = 0; h < calcedRow.length; h++) {
            newGrid.push(calcedRow[h]);
        }
    }

    grid = sortGridByCols(sortGridByRows(newGrid));

    gameLayer.removeChildren();

    for (var i = 0; i < grid.length; i++) {

        if (grid[i].obj !== null) {
            gameLayer.add(grid[i].obj.rect);
            gameLayer.add(grid[i].obj.text);
        }
    }

    addRandomCellToGameLayer();

    stage.add(gameLayer);
}

//input handling
$(document).ready(function () {
    $(document).keyup(function (e) {

        switch (e.keyCode) {

            case UP_ARROW:

                moveAllBoxesInDir('up');
                break;

            case DOWN_ARROW:

                moveAllBoxesInDir('down');
                break;

            case RIGHT_ARROW:

                moveAllBoxesInDir('right');
                break;

            case LEFT_ARROW:

                moveAllBoxesInDir('left');
                break;
        }
    });
});

function addScore(scoreAddition) {
    score += scoreAddition;
    if (highScore < score) {
        highScore = score;
    }
}

visualizeScore();

function visualizeScore() {
    function leftLine(x, y, strokeColor) {
        var pathArray = ['M', x, y, 'L', x, y + 10, x + 0.5, y + 9.5, x + 0.5, y + 0.5, 'Z'];
        var line = paper.path(pathArray.join(' '));
        line.attr({
            stroke: strokeColor
        });
    }

    function rightLine(x, y, strokeColor) {
        var pathArray = ['M', x, y, 'L', x, y + 10, x - 0.5, y + 9.5, x - 0.5, y + 0.5, 'Z'];
        var line = paper.path(pathArray.join(' '));
        line.attr({
            stroke: strokeColor
        });
    }

    function topLine(x, y, strokeColor) {
        var pathArray = ['M', x, y, 'L', x + 10, y, x + 9.5, y + 0.5, x + 0.5, y + 0.5, 'Z'];
        var line = paper.path(pathArray.join(' '));
        line.attr({
            stroke: strokeColor
        });
    }

    function middleLine(x, y, strokeColor) {
        var pathArray = ['M', x, y, 'L', x + 0.25, y - 0.25, x + 9.75, y - 0.25, x + 10, y, x + 9.75, y + 0.25, x + 0.25, y + 0.25, 'Z'];
        var line = paper.path(pathArray.join(' '));
        line.attr({
            stroke: strokeColor
        });
    }

    function bottomLine(x, y, strokeColor) {
        var pathArray = ['M', x, y, 'L', x + 10, y, x + 9.5, y - 0.5, x + 0.5, y - 0.5, 'Z'];
        var line = paper.path(pathArray.join(' '));
        line.attr({
            stroke: strokeColor
        });
    }

    function visualizeDigits(digit, x, y, strokeColor) {
        switch (digit) {
            case 0:
                topLine(x + 1, y - 1, strokeColor);
                rightLine(x + 12, y, strokeColor);
                rightLine(x + 12, y + 13, strokeColor);
                bottomLine(x + 1, 24, strokeColor);
                leftLine(x, y + 13, strokeColor);
                leftLine(x, y, strokeColor);
                break;
            case 1:
                rightLine(x + 12, y, strokeColor);
                rightLine(x + 12, y + 13, strokeColor);
                break;
            case 2:
                topLine(x + 1, y - 1, strokeColor);
                rightLine(x + 12, y, strokeColor);
                middleLine(x + 1, y + 11.5, strokeColor);
                leftLine(x, y + 13, strokeColor);
                bottomLine(x + 1, y + 24, strokeColor);
                break;
            case 3:
                topLine(x + 1, y - 1, strokeColor);
                rightLine(x + 12, y, strokeColor);
                middleLine(x + 1, y + 11.5, strokeColor);
                rightLine(x + 12, y + 13, strokeColor);
                bottomLine(x + 1, y + 24, strokeColor);
                break;
            case 4:
                leftLine(x, y, strokeColor);
                middleLine(x + 1, y + 11.5, strokeColor);
                rightLine(x + 12, y, strokeColor);
                rightLine(x + 12, y + 13, strokeColor);
                break;
            case 5:
                topLine(x + 1, y - 1, strokeColor);
                leftLine(x, y, strokeColor);
                middleLine(x + 1, y + 11.5, strokeColor);
                rightLine(x + 12, y + 13, strokeColor);
                bottomLine(x + 1, y + 24, strokeColor);
                break;
            case 6:
                topLine(x + 1, y - 1, strokeColor);
                leftLine(x, y, strokeColor);
                leftLine(x, y + 13, strokeColor);
                bottomLine(x + 1, y + 24, strokeColor);
                rightLine(x + 12, y + 13, strokeColor);
                middleLine(x + 1, y + 11.5, strokeColor);
                break;
            case 7:
                topLine(x + 1, y - 1, strokeColor);
                rightLine(x + 12, y, strokeColor);
                rightLine(x + 12, y + 13, strokeColor);
                break;
            case 8:
                topLine(x + 1, y - 1, strokeColor);
                rightLine(x + 12, y, strokeColor);
                middleLine(x + 1, y + 11.5, strokeColor);
                leftLine(x, y, strokeColor);
                rightLine(x + 12, y + 13, strokeColor);
                bottomLine(x + 1, y + 24, strokeColor);
                leftLine(x, y + 13, strokeColor);
                break;
            case 9:
                topLine(x + 1, y - 1, strokeColor);
                leftLine(x, y, strokeColor);
                middleLine(x + 1, y + 11.5, strokeColor);
                rightLine(x + 12, y, strokeColor);
                rightLine(x + 12, y + 13, strokeColor);
                bottomLine(x + 1, y + 24, strokeColor);
                break;
        }
    }

    function initScoreBoard() {
        paper.text(SCORE_POSITION.X - 50, SCORE_POSITION.Y + 15, 'Score').attr({ 'font-size': 25 });
        paper.text(HIGH_SCORE_POSITION.X - 75, HIGH_SCORE_POSITION.Y + 15, 'High score').attr({ 'font-size': 25 });
        for (var i = 0; i < 5; i++) {
            visualizeDigits(8, SCORE_POSITION.X + 5 + (i * 15), SCORE_POSITION.Y + 4, '#DDD');
            visualizeDigits(8, HIGH_SCORE_POSITION.X + 5 + (i * 15), HIGH_SCORE_POSITION.Y + 4, '#DDD');
        }
    }

    initScoreBoard();
}