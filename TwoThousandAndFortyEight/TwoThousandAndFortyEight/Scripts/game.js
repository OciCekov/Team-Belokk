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
var BG_BOX_COLOR = "#576A7A";
var ACTIVE_BOX_COLOR = "#000000";
var ACTIVE_FONT_COLOR = "#FFFFFF";
var TEXT_OFFSET = 33;

var ANIMATION_STEP_IN_PIXELS = 40;

var SCORE_POSITION = { X: 100, Y: 10 }
var HIGH_SCORE_POSITION = { X: 400, Y: 10 }
var SCORE_WIDTH = 80;
var SCORE_HEIGHT = 30;

//functions
var commandCallHeap = [];

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
        default: return "#FFE6B6";
    }
}

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

    rectangle.attrs.id = 'a-' + rectidPostfix;

    return {
        rect: rectangle,
        text: new Kinetic.Text({
            x: bx,
            y: by + 33,
            id: 'at-' + rectidPostfix,
            width: bwidth,
            height: bheight,
            align: "center",
            text: bval,
            fontSize: 48,
            fontFamily: "clear_sansbold",
            fontStyle: "bold",
            fill: ACTIVE_FONT_COLOR
        })
    };

    return result;
}

function randomCell(occupationMatrix) {

    var freeCells = [];

    for (var i = 0; i < occupationMatrix.length; i++) {
        for (var j = 0; j < occupationMatrix[i].length; j++) {
            if (!occupationMatrix[i][j]) {
                var newFreeCell = {};
                newFreeCell.row = i;
                newFreeCell.col = j;
                freeCells.push(newFreeCell);
            }
        }
    }

    var rand = Math.floor((Math.random() * (freeCells.length - 1)));

    return freeCells[rand];
}

function generateNewElement(occupationMatrix) {
    var randCell = randomCell(occupationMatrix);
    var value = 2;
    gRow = randCell.row;
    gCol = randCell.col;
    var bx = 16 * (gCol + 1) + gCol * RECT_WIDTH;
    var by = 16 * (gRow + 1) + gRow * RECT_HEIGHT;
    var box = createBox(bx, by, RECT_WIDTH, RECT_HEIGHT, valueToColor(value), value);

    gameLayer.add(box.rect);
    gameLayer.add(box.text);

    logic.setElement(gRow, gCol, 1);
}

//init score board
var scoreBoard = new ScoreBoard();
var paper = Raphael('score-container', 500, 50);

//init game stage
var stage = new Kinetic.Stage({
    container: 'game-container',
    width: STAGE_WIDTH,
    height: STAGE_HEIGHT
});

//draw background layer
function drawBackgroundLayer()
{
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
}

//draw background
drawBackgroundLayer();

//init game layer
var gameLayer = new Kinetic.Layer();

//init main logic
var logic = new MainLogic(4, 4, 11);
var score = logic.score;
var highScore = 0;

//init game function
function initGame()
{
    logic.reset();	
    gameLayer.removeChildren();
    for (var j = 0; j < 2; j++) {
        generateNewElement(logic.getOccupationMatrix());
    }
    stage.add(gameLayer);
}

//init game
initGame();

//init score board
scoreBoard.initScore();
scoreBoard.reset();

//start game loop
var gameInterval = setInterval(function () { gameLoop() }, 1000);

function gameLoop() {
    while (commandCallHeap.length !== 0) {
        executeCommand(commandCallHeap[0]);
        commandCallHeap.splice(0, 1);
        //console.log(commandCallHeap);
    }
}

//animation functions

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

var interupt = false;

function animateBoxesMovement(command, moves) {

    var stopAnim = false;
	
    //console.log(moves);
    var movementAnim = new Kinetic.Animation(function (frame) {
        var animationHasToEnd = true;		
        interupt = true;
		
        for (var i = 0; i < moves.length; i++) {

            var move = moves[i];

			if (move.first === null && move.second === null)
			{
				continue;
			}

            //construct id for search
			if (move.first) {
				var scol = move.first.col;
				var srow = move.first.row;

				var newcol = move.result.col;
				var newrow = move.result.row;

				var sx = 16 * (scol + 1) + scol * RECT_WIDTH;
				var sy = 16 * (srow + 1) + srow * RECT_HEIGHT;

				var newx = 16 * (newcol + 1) + newcol * RECT_WIDTH;
				var newy = 16 * (newrow + 1) + newrow * RECT_HEIGHT;

				var rectid = 'a-' + sx + '-' + sy;
				var textid = 'at-' + sx + '-' + sy;

				var rectGraphic = gameLayer.children.filter(function (obj) {
					return obj.attrs.id === rectid;
				})[0];

				var textGraphic = gameLayer.children.filter(function (obj) {
					return obj.attrs.id === textid;
				})[0];
				
				if (!rectGraphic) {
					alert("WTF");
				}

				var movedRect=moveObjFrame(rectGraphic, srow, scol, newrow, newcol);
				var movedText=moveObjFrame(textGraphic,  srow, scol, newrow, newcol);
				
				if(movedRect && movedText)
				{
					rectGraphic.attrs.id = 'a-' + newx + '-' + newy;
					textGraphic.attrs.id = 'at-' + newx + '-' + newy;
					move.first = null;
					if (!move.second) {
					    //finshedElements--;
					}
				}
				else
				{
					animationHasToEnd=false;
				}
			}
			
			// second
			if (move.second) {
				var scol = move.second.col;
				var srow = move.second.row;

				var newcol = move.result.col;
				var newrow = move.result.row;

				var sx = 16 * (scol + 1) + scol * RECT_WIDTH;
				var sy = 16 * (srow + 1) + srow * RECT_HEIGHT;

				var newx = 16 * (newcol + 1) + newcol * RECT_WIDTH;
				var newy = 16 * (newrow + 1) + newrow * RECT_HEIGHT;

				var rectid = 'a-' + sx + '-' + sy;
				var textid = 'at-' + sx + '-' + sy;

				var rectGraphic = gameLayer.children.filter(function (obj) {
					return obj.attrs.id === rectid;
				})[0];

				var textGraphic = gameLayer.children.filter(function (obj) {
					return obj.attrs.id === textid;
				})[0];
				
				if (!rectGraphic) {
					alert("WTF");
				}

				var movedRect=moveObjFrame(rectGraphic, srow, scol, newrow, newcol);
				var movedText=moveObjFrame(textGraphic,  srow, scol, newrow, newcol);
				
				if (movedRect && movedText)
				{
					rectGraphic.attrs.id = 'a-' + newx + '-' + newy;
					textGraphic.attrs.id = 'at-' + newx + '-' + newy;
					move.second = null;
					//finshedElements--;

				    //merge
					mergeElements(newrow, newcol, Math.pow(2, move.result.value));
				}
				else
				{
					animationHasToEnd=false;
				}
			}
        }

        if (animationHasToEnd) {

            //output some stuff for debuging
            //console.log('- - -');            
            //alert("DFVD");
            interupt = false;
            movementAnim.stop();

            if (logic.isGameWon()) {
                gameWon();
            }

            if (logic.hasGameEnded()) {
                gameOver();
            } else {
                if (moves.length != 0) generateNewElement(logic.getOccupationMatrix());

                if (logic.hasGameEnded()) {
                    gameOver();
                }
            }
        }

    }, gameLayer);

    movementAnim.start();
}


function mergeElements(row, col, value) {
    var scol = col;
    var srow = row;

    var sx = 16 * (scol + 1) + scol * RECT_WIDTH;
    var sy = 16 * (srow + 1) + srow * RECT_HEIGHT;

    var rectid = 'a-' + sx + '-' + sy;
    var textid = 'at-' + sx + '-' + sy;

    var rectGraphic = gameLayer.children.filter(function (obj) {
        return obj.attrs.id === rectid;
    });

    for (var i = 0; i < rectGraphic.length; i++) {
        rectGraphic[i].remove();
    }

    var textGraphic = gameLayer.children.filter(function (obj) {
        return obj.attrs.id === textid;
    });

    for (var i = 0; i < textGraphic.length; i++) {
        textGraphic[i].remove();
    }

    var box = createBox(sx, sy, RECT_WIDTH, RECT_HEIGHT, valueToColor(value), value);

    gameLayer.add(box.rect);
    gameLayer.add(box.text);

    stage.add(gameLayer);
}

//input control function
function executeCommand(command) {
    var moves;

    if (interupt == true)
    {
        //console.log('interupted...');
        return;
    }

    switch (command) {
        case 'UP':
            moves = logic.moveUp();
            break;

        case 'DOWN':
            moves = logic.moveDown();
            break;

        case 'RIGHT':
            moves = logic.moveRight();
            break;

        case 'LEFT':
            moves = logic.moveLeft();
            break;

        default:
            //TODO make exception;
            break;
    }

    animateBoxesMovement(command, moves);

    score = logic.score;
    scoreBoard.visualize();
}


//game state functions

function gameOver() {
    clearInterval(gameInterval);
    alert("gameOVER");
}

function gameWon() {
    clearInterval(gameInterval);
    alert("YESSSS!!!!");
}

//key events
window.onload = function () {
    document.addEventListener('keydown', function (event) {
        switch (event.keyCode) {
            case UP_ARROW:
                commandCallHeap.push('UP');
                break;

            case DOWN_ARROW:
                commandCallHeap.push('DOWN');
                break;

            case RIGHT_ARROW:
                commandCallHeap.push('RIGHT');
                break;

            case LEFT_ARROW:
                commandCallHeap.push('LEFT');
                break;
        }
    });	

    $('#new-game').on('click', function () {
        scoreBoard.reset();
		initGame();
    });
}