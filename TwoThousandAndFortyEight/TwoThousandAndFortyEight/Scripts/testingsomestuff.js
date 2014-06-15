// constants
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

var ANIMATION_STEP_IN_PIXELS = 60;

var SCORE_POSITION = { X: 100, Y: 10 }
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

var birthId = 0;

function createBox(bx, by, bwidth, bheight, fillc, bval, birthid) {

    var bid = '_' + birthId;
    if (birthid !== undefined) {
        bid = birthid;
    }
    else {
        birthId++;
    }

    var rectidPostfix = bx + '-' + by;
    var rectangle = new Kinetic.Rect({
        id: 's-' + rectidPostfix,
        birthid: bid,
        value: bval,
        cornerRadius: 5,
        x: bx,
        y: by,
        width: bwidth,
        height: bheight,
        fill: fillc,
        opacity: 100
    });

    if (bval === undefined) {
        return rectangle;
    }

    rectangle.attrs.id = 'a-' + rectidPostfix;

    return {
        rect: rectangle,
        text: new Kinetic.Text({
            x: bx,
            y: by + 33,
            birthid: bid,
            width: bwidth,
            height: bheight,
            id: 'st-' + rectidPostfix,
            align: "center",
            text: bval,
            fontSize: 48,
            fontFamily: 'clear_sansbold',
            fill: ACTIVE_FONT_COLOR,
            opacity: 100
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
            cell = { "col": col, "row": row, obj: null };
            grid.push(cell);
        }
    }
    return grid;
}

//generate random empty cell index
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

updateGameLayer();

var score = 0;
var highScore = 0;

var paper = Raphael('paper', 500, 50);

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


//gets a row from the grid
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
    //var ready = false;

    //while (ready == false) {

    //ready = true;

    for (var j = 0; j < row.length - 1; j++) {

        var elInd = (dir == 'right' || dir == 'down') ? (row.length - 1) - j : j;
        var sign = (dir == 'right' || dir == 'down') ? -1 : 1;

        var cEl = row[elInd].obj;
        var nEl = row[elInd + sign].obj;

        if (cEl !== null && nEl !== null) {
            if ((cEl.rect.attrs.value | 0) === (nEl.rect.attrs.value | 0)) {

                var newValue=(row[elInd].obj.rect.attrs.value | 0) * 2;
                row[elInd].obj.rect.attrs.value = newValue;
                moveScore += newValue;
                birthId++;
                row[elInd].obj.rect.attrs.birthid = '_' + birthId;
                row[elInd + sign].obj = null;
                row = sortRow(row, dir);
                //elInd += sign;
                //ready = false;
                //break;
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

            row[i].obj = createBox(bx, by, RECT_WIDTH, RECT_HEIGHT, valueToColor(row[i].obj.rect.attrs.value), row[i].obj.rect.attrs.value, row[i].obj.rect.attrs.birthid);
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
    birthId++;
    var box = createBox(bx, by, RECT_WIDTH, RECT_HEIGHT, valueToColor(value), value,'_'+birthId);

    grid[randCell].obj = box;

    gameLayer.add(box.rect);
    gameLayer.add(box.text);
}

function updateGameLayer(animations) {
    //if something better comes up, we will add it here
    stage.add(gameLayer);
    playTestingAnimation(animations);
}

function getGridObjectByBirthId(oldgrid, objBirthId) {
    var obj = oldgrid.filter(function (a) {
        if (a.obj !== null) {
            var objA = JSON.parse(a.obj.rect);
            return objA.attrs.birthid === objBirthId;
        }
        return false;
    });

    return obj;
}

//animation functions

/*function fadeOutObjFrame(obj) {
    if (obj.attrs.width <= 0 && obj.attrs.height <= 0) {
        obj.hide();
        return true;
    }
    else {
        obj.attrs.x += 5;
        obj.attrs.y += 5;
        obj.attrs.width -= 10;
        obj.attrs.height -= 10;
        obj.attrs.fontSize = 0;
        return false;
    }
}*/

function fadeInObjFrame(obj) {
    if (obj.attrs.width === RECT_WIDTH) {
        return true;
    }
    else {
        obj.attrs.x -= RECT_WIDTH / 10;
        obj.attrs.y -= RECT_WIDTH / 10;
        obj.attrs.width += RECT_WIDTH / 5;
        obj.attrs.height += RECT_WIDTH / 5;
        return false;
    }
}

/*function hideObj(obj) {
    obj.attrs.opacity = 0;
}*/

function minimizeObj(obj) {
    obj.attrs.x += RECT_WIDTH / 2;
    obj.attrs.y += RECT_HEIGHT / 2;
    obj.attrs.width = 0;
    obj.attrs.height = 0;
}

function positionObj(obj, row, col) {
    obj.attrs.x = 16 * (col + 1) + col * RECT_WIDTH;
    obj.attrs.y = 16 * (row + 1) + row * RECT_HEIGHT + ((obj.attrs.text !== undefined) ? 33 : 0);
}

function moveObjFrame(obj, fromRow, fromCol, toRow, toCol) {

    var add = ((obj.attrs.text !== undefined) ? 33 : 0);

    var from = { x: 16 * (fromCol + 1) + fromCol * RECT_WIDTH, y: (16 * (fromRow + 1) + fromRow * RECT_HEIGHT) + add };
    var to = { x: 16 * (toCol + 1) + toCol * RECT_WIDTH, y: (16 * (toRow + 1) + toRow * RECT_HEIGHT) + add };

    if (Math.abs(obj.attrs.x - to.x) < ANIMATION_STEP_IN_PIXELS) { //&& (Math.abs(obj.attrs.y - to.y) < ANIMATION_STEP_IN_PIXELS)) {
        obj.attrs.x = to.x;
    }
    else if (to.x > from.x) {
        obj.attrs.x += ANIMATION_STEP_IN_PIXELS;
        return false;
    }
    else if (from.x > to.x) {
        obj.attrs.x -= ANIMATION_STEP_IN_PIXELS;
        return false;
    }

    if ((Math.abs(obj.attrs.y - to.y) < ANIMATION_STEP_IN_PIXELS)) { //&& (Math.abs(obj.attrs.y - to.y) < ANIMATION_STEP_IN_PIXELS)) {
        obj.attrs.y = to.y;
    }
    else if (to.y > from.y) {
        obj.attrs.y += ANIMATION_STEP_IN_PIXELS;
        return false;
    }
    else if (from.y > to.y) {
        obj.attrs.y -= ANIMATION_STEP_IN_PIXELS;
        return false;
    }

    if ((Math.abs(obj.attrs.x - to.x) < ANIMATION_STEP_IN_PIXELS) && (Math.abs(obj.attrs.y - to.y) < ANIMATION_STEP_IN_PIXELS))
    {
        return true;
    }
}


var interupt=false;

function playTestingAnimation(animations) {
	
	interupt=true;
	console.log(interupt);
	console.log(animations);
	
    for (var ci = 0; ci < gameLayer.children.length; ci++) {

        var element = gameLayer.children[ci];
        var elementBId = element.attrs.birthid;
        //move objects that are present in the current and the earlier grids     
        if (animations !== undefined) {
            if (animations[elementBId] !== undefined) {
                var assocAnimation = animations[elementBId];
                if (assocAnimation.type === "move") {
                    positionObj(element, assocAnimation.oldrow, assocAnimation.oldcol);
                }
                else {
                    minimizeObj(element);
                }
            }
            else {
                minimizeObj(element);
            }
        }
        else {
            minimizeObj(element);
        }
    }

    var anim = new Kinetic.Animation(function (frame) {
        var animationHasEnded = true;
        //updateGameLayer();       
        for (var ci = 0; ci < gameLayer.children.length; ci++) {

            var element = gameLayer.children[ci];
            var elementBId = element.attrs.birthid;
            //move objects that are present in the current and the earlier grids     
            if (animations !== undefined) {
                if (animations[elementBId] !== undefined) {
                    var assocAnimation = animations[elementBId];
                    if (assocAnimation.type === "move") {

                            var moved = moveObjFrame(element, assocAnimation.oldrow, assocAnimation.oldcol, assocAnimation.newrow, assocAnimation.newcol);
                            if (!moved) {
                                animationHasEnded = false;
                            }
                    }
                    else {
                        
                            //fade in new elements
                            var fadedIn = fadeInObjFrame(element);

                            if (!fadedIn) {
                                animationHasEnded = false;
                            }                        
                    }
                }
                else {

                    //fade in new elements
                    var fadedIn = fadeInObjFrame(element);

                    if (!fadedIn) {
                        animationHasEnded = false;
                    }
                }
            }
            else {
                    //fade in new elements
                    var fadedIn = fadeInObjFrame(element);

                    if (!fadedIn) {
                        animationHasEnded = false;
                    }                
            }
        }

        if (animationHasEnded) {
			interupt=false;
            anim.stop();
        }
    }, gameLayer);

    anim.start();
}

function createAnimationsListFromGridDiffs(oldGrid, newGrid) {

    var animations = {};
    for (var h = 0; h < newGrid.length; h++) {

        var currentElement = newGrid[h];
        if (currentElement.obj !== null) {
            var objBirthId = currentElement.obj.rect.attrs.birthid;
            var persistingObjInOldGrid = getGridObjectByBirthId(oldGrid, objBirthId)[0];

            if (persistingObjInOldGrid !== undefined) {
                //console.log(persistingObjInOldGrid);
                animations['' + objBirthId] = { type: 'move', newrow: currentElement.row, newcol: currentElement.col, oldrow: persistingObjInOldGrid.row, oldcol: persistingObjInOldGrid.col };
            }
            else {
                animations['' + objBirthId] = { type: 'fade' };
            }
        }
    }

    return animations;
}

var moveScore = 0;


function moveBoxesInDir(dir) {

    moveScore = 0;
    var orientation = (dir === 'down' || dir === 'up') ? 'v' : 'h';
    //var corientation=(dir=='down' || dir=='up')?'h':'v';

    var rows = getAllRows(orientation);
    var newGrid = [];
    var oldGrid = JSON.parse(JSON.stringify(grid));//.slice(0);    

    for (var rowi = 0; rowi < rows.length; rowi++) {

        var sortedRow = sortRow(rows[rowi], dir);
        var calcedRow = fixRowElementsIndex(calculateRowSums(sortedRow, dir), orientation, rowi);

        for (var h = 0; h < calcedRow.length; h++) {
            newGrid.push(calcedRow[h]);
        }
    }

    var calcedGrid = sortGridByCols(sortGridByRows(newGrid));
    //console.log(oldGrid);
    //console.log(calcedGrid);
    //console.log(animations);
    grid = calcedGrid;

    var animations = createAnimationsListFromGridDiffs(oldGrid, grid);

    gameLayer.removeChildren();

    for (var i = 0; i < grid.length; i++) {

        if (grid[i].obj !== null) {
            gameLayer.add(grid[i].obj.rect);
            gameLayer.add(grid[i].obj.text);
        }
    }
    
	/*if(animations.length>0)
	{
		addRandomCellToGameLayer();
	}*/
    
	addRandomCellToGameLayer();
	
	//stage.add(gameLayer);
	updateGameLayer(animations);
    //update score
	//console.log();
	scoreBoard.scoreAddition(moveScore);
	scoreBoard.visualize();
}
var scoreBoard = new ScoreBoard();

//input handling
$(document).ready(function () {
    $(document).keyup(function (e) {
		
		if(interupt==true)
		{
			return;
		}
		
        switch (e.keyCode) {

            case UP_ARROW:

                //playTestingAnimation();
                moveBoxesInDir('up');
                break;

            case DOWN_ARROW:

                moveBoxesInDir('down');
                break;

            case RIGHT_ARROW:

                moveBoxesInDir('right');
                break;

            case LEFT_ARROW:

                moveBoxesInDir('left');
                break;
        }
    });


    scoreBoard.initScore();
    scoreBoard.reset();
});

function ScoreBoard() {
    self = this;

    function addScore(scoreAddition) {
        score += scoreAddition;
        if (highScore < score) {
            highScore = score;
        }
    }

    self.scoreAddition = addScore;

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
                bottomLine(x + 1, y + 24, strokeColor);
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
        paper.text(SCORE_POSITION.X - 50, SCORE_POSITION.Y + 15, 'Score').attr({ 'font-size': 25, 'font-family': 'clear_sansregular' });
        paper.text(HIGH_SCORE_POSITION.X - 75, HIGH_SCORE_POSITION.Y + 15, 'High score').attr({ 'font-size': 25, 'font-family': 'clear_sansregular' });
        for (var i = 0; i < 5; i++) {
            visualizeDigits(8, SCORE_POSITION.X + 65 - (i * 15), SCORE_POSITION.Y + 4, '#DDD');
            visualizeDigits(8, HIGH_SCORE_POSITION.X + 65 - (i * 15), HIGH_SCORE_POSITION.Y + 4, '#DDD');
        }
    }

    self.initScore = initScoreBoard;

    function resetScore() {
        for (var i = 0; i < 5; i++) {
            visualizeDigits(8, SCORE_POSITION.X + 65 - (i * 15), SCORE_POSITION.Y + 4, '#DDD');
            visualizeDigits(8, HIGH_SCORE_POSITION.X + 65 - (i * 15), HIGH_SCORE_POSITION.Y + 4, '#DDD');
        }

        visualizeDigits(0, SCORE_POSITION.X + 65, SCORE_POSITION.Y + 4, '#000');
        visualizeDigits(0, HIGH_SCORE_POSITION.X + 65, HIGH_SCORE_POSITION.Y + 4, '#000');
    }

    self.reset = resetScore;

    function visualizeScore() {
        var currentScore = score;
        var i = 0;

        while (currentScore > 0) {
            visualizeDigits(8, SCORE_POSITION.X + 65 - (i * 15), SCORE_POSITION.Y + 4, '#DDD');
            var digit = currentScore % 10;
            visualizeDigits(digit, SCORE_POSITION.X + 65 - (i * 15), SCORE_POSITION.Y + 4, '#000');
            currentScore = parseInt(currentScore / 10);
            i++;
        }

        if (score > highScore) {
            var currentHighScore = score;
            var i = 0;
            while (currentHighScore > 0) {
                visualizeDigits(8, HIGH_SCORE_POSITION.X + 65 - (i * 15), HIGH_SCORE_POSITION.Y + 4, '#DDD');
                var digit = currentHighScore % 10;
                visualizeDigits(digit, HIGH_SCORE_POSITION.X + 65 - (i * 15), HIGH_SCORE_POSITION.Y + 4, '#000');
                currentHighScore = parseInt(currentHighScore / 10);
                i++;
            }
        }
    }

    self.visualize = visualizeScore;
}