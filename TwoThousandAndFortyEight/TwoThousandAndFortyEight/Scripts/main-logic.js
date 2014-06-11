function MainLogic(fieldSizeX, fieldSizeY) {
    self = this;

    self._initScore = function () {
        var startingScore = 0;
        //createScoreTimer(); // Visual score holder.
        return startingScore;
    }

    self.score = self._initScore();

    self._addScore = function (value) {
        self.score += value;
    }

    self._givePoints = function (tileWeight, multiplier) {
        multiplier = typeof multiplier !== 'undefined' ? multiplier : 1;

        var result = (1 << (tileWeight + 1)) * multiplier;
        self._addScore(result);
    }

    self._createMatrix = function (sizeX, sizeY) {
        var resultMatrix = new Array(sizeY);
        for (var i = 0; i < resultMatrix.length; i++) {
            resultMatrix[i] = new Array(sizeX);
        }

        return resultMatrix;
    }

    self.hasGameEnded = function () {
        var gameHasEnded = true;
        for (var i = 0; i < self.matrix.length - 1; i++) {
            for (var j = 0; j < self.matrix[i].length - 1; j++) {
                if (self.matrix[i][j] === 0) {
                    gameHasEnded = false;
                    return gameHasEnded;
                } else if (self.matrix[i][j] === self.matrix[i + 1][j]
                        && self.matrix[i][j] === self.matrix[i][j + 1]) {
                    gameHasEnded = false;
                    return gameHasEnded;
                }             
            }
        }

        return gameHasEnded;
    }

    self.matrix = self._createMatrix(fieldSizeX, fieldSizeY);

    self.reset = function () {
        for (var i = 0; i < self.matrix.length; i++) {
            for (var j = 0; j < self.matrix[i].length; j++) {
                self.matrix[i][j] = 0;
            }
        }
    };

    self.getOccupationMatrix = function () {
        var occupationMatrix = new Array(self.matrix.length);
        for (var i = 0; i < self.matrix.length; i++) {
            occupationMatrix[i] = new Array(self.matrix[i].length)
            for (var j = 0; j < self.matrix[i].length; j++) {
                if (self.matrix[i][j] === 0) {
                    occupationMatrix[i][j] = false;
                } else {
                    occupationMatrix[i][j] = true;
                }
            }
        }
    };

    self.setElement = function (elementRow, elementCol, value) {
        value = typeof value !== 'undefined' ? value : 1;

        self.matrix[elementRow][elementCol] = value;
    }

    self._setResultElement = function (move, element, row, col) {
        move[element] = move[element] || {};
        move[element].row = row;
        move[element].col = col;
        move[element].value = self.matrix[row][col];
    }

    self.moveRight = function () {
        var result = [];
        for (var row = 0; row < self.matrix.length; row++) {
            for (var col = self.matrix[row].length - 1; col >= 0 ; col--) {
                if (self.matrix[row][col] === 0) {
                    continue;
                }

                var move = {};
                self._setResultElement(move, "first", row, col);

                var isMerge = false;
                if (col !== 0) {
                    var prevEqualElementCol = col - 1;
                    while (prevEqualElementCol >= 0) {
                        if (self.matrix[row][prevEqualElementCol] === 0) {
                            prevEqualElementCol--;
                            continue;
                        } else {
                            break;
                        }
                    }
                    // merge two adjacent elements if they are equal
                    if (self.matrix[row][col] === self.matrix[row][prevEqualElementCol]) {
                        self._setResultElement(move, "second", row, prevEqualElementCol);

                        self._givePoints(self.matrix[row][col]);
                        self.matrix[row][col]++;
                        self.matrix[row][prevEqualElementCol] = 0;
                        isMerge = true;

                        self._setResultElement(move, "result", row, col);
                    }
                }

                // move the current element if there are free positions
                var nextFreeCol = col + 1;
                while (nextFreeCol <= self.matrix[row].length - 1 && self.matrix[row][nextFreeCol] === 0) {
                    self.matrix[row][nextFreeCol] = self.matrix[row][nextFreeCol - 1];
                    self.matrix[row][nextFreeCol - 1] = 0;

                    self._setResultElement(move, "result", row, nextFreeCol);

                    nextFreeCol++;
                }
                // check if one last merge is possible
                if (nextFreeCol <= self.matrix[row].length - 1) {
                    if (self.matrix[row][nextFreeCol] === self.matrix[row][nextFreeCol - 1] && !isMerge) {
                        self.matrix[row][nextFreeCol]++;
                        self.matrix[row][nextFreeCol - 1] = 0;

                        self._setResultElement(move, "result", row, nextFreeCol);
                    }
                }

                if (move.result) {
                    result.push(move);
                }
            }
        }

        return result;
    };

    self.moveLeft = function () {
        var result = [];
        for (var row = 0; row < self.matrix.length; row++) {
            for (var col = 0; col <= self.matrix[row].length - 1; col++) {
                if (self.matrix[row][col] === 0) {
                    continue;
                }

                var move = {};
                self._setResultElement(move, "first", row, col);

                var isMerge = false;
                if (col !== self.matrix[row].length - 1) {
                    var prevEqualElementCol = col + 1;
                    while (prevEqualElementCol <= self.matrix[row].length - 1) {
                        if (self.matrix[row][prevEqualElementCol] === 0) {
                            prevEqualElementCol++;
                            continue;
                        } else {
                            break;
                        }
                    }
                    // merge two adjacent elements if they are equal
                    if (self.matrix[row][col] === self.matrix[row][prevEqualElementCol]) {
                        self._setResultElement(move, "second", row, prevEqualElementCol);

                        self._givePoints(self.matrix[row][col]);
                        self.matrix[row][col]++;
                        self.matrix[row][prevEqualElementCol] = 0;
                        isMerge = true;

                        self._setResultElement(move, "result", row, col);
                    }
                }

                // move the current element if there are free positions
                var nextFreeCol = col - 1;
                while (nextFreeCol >= 0 && self.matrix[row][nextFreeCol] === 0) {
                    self.matrix[row][nextFreeCol] = self.matrix[row][nextFreeCol + 1];
                    self.matrix[row][nextFreeCol + 1] = 0;

                    self._setResultElement(move, "result", row, nextFreeCol);

                    nextFreeCol--;
                }
                // check if one last merge is possible
                if (nextFreeCol >= 0) {
                    if (self.matrix[row][nextFreeCol] === self.matrix[row][nextFreeCol + 1] && !isMerge) {
                        self.matrix[row][nextFreeCol]++;
                        self.matrix[row][nextFreeCol + 1] = 0;

                        self._setResultElement(move, "result", row, nextFreeCol);
                    }
                }

                if (move.result) {
                    result.push(move);
                }
            }
        }

        return result;
    };

    self.moveUp = function () {
        var result = [];
        for (var col = 0; col < self.matrix[0].length; col++) {
            for (var row = 0; row <= self.matrix.length - 1; row++) {
                if (self.matrix[row][col] === 0) {
                    continue;
                }

                var move = {};
                self._setResultElement(move, "first", row, col);

                var isMerge = false;
                if (row !== self.matrix.length - 1) {
                    var prevEqualElementRow = row + 1;
                    while (prevEqualElementRow <= self.matrix.length - 1) {
                        if (self.matrix[prevEqualElementRow][col] === 0) {
                            if (prevEqualElementRow + 1 >= self.matrix.length) {
                                break;
                            }
                            prevEqualElementRow++;
                            continue;
                        } else {
                            break;
                        }
                    }
                    // merge two adjacent elements if they are equal
                    if (self.matrix[row][col] === self.matrix[prevEqualElementRow][col]) {
                        self._setResultElement(move, "second", prevEqualElementRow, col);

                        self._givePoints(self.matrix[row][col]);
                        self.matrix[row][col]++;
                        self.matrix[prevEqualElementRow][col] = 0;
                        isMerge = true;

                        self._setResultElement(move, "result", row, col);
                    }
                }

                // move the current element if there are free positions
                var nextFreeRow = row - 1;
                while (nextFreeRow >= 0 && self.matrix[nextFreeRow][col] === 0) {
                    self.matrix[nextFreeRow][col] = self.matrix[nextFreeRow + 1][col];
                    self.matrix[nextFreeRow + 1][col] = 0;

                    self._setResultElement(move, "result", nextFreeRow, col);

                    nextFreeRow--;
                }
                // check if one last merge is possible
                if (nextFreeRow >= 0) {
                    if (self.matrix[nextFreeRow][col] === self.matrix[nextFreeRow + 1][col] && !isMerge) {
                        self.matrix[nextFreeRow][col]++;
                        self.matrix[nextFreeRow + 1][col] = 0;

                        self._setResultElement(move, "result", nextFreeRow, col);
                    }
                }

                if (move.result) {
                    result.push(move);
                }
            }
        }

        return result;
    };

    self.moveDown = function () {
        var result = [];
        for (var col = 0; col < self.matrix[0].length; col++) {
            for (var row = self.matrix.length - 1; row >= 0 ; row--) {
                if (self.matrix[row][col] === 0) {
                    continue;
                }

                var move = {};
                self._setResultElement(move, "first", row, col);

                var isMerge = false;
                if (row !== 0) {
                    var prevEqualElementRow = row - 1;
                    while (prevEqualElementRow >= 0) {
                        if (self.matrix[prevEqualElementRow][col] === 0) {
                            prevEqualElementRow--;
                            continue;
                        } else {
                            break;
                        }
                    }
                    // merge two adjacent elements if they are equal
                    if (self.matrix[row][col] === self.matrix[prevEqualElementRow][col]) {
                        self._setResultElement(move, "second", prevEqualElementRow, col);

                        self._givePoints(self.matrix[row][col]);
                        self.matrix[row][col]++;
                        self.matrix[prevEqualElementRow][col] = 0;
                        isMerge = true;

                        self._setResultElement(move, "result", row, col);
                    }
                }

                // move the current element if there are free positions
                var nextFreeRow = row + 1;
                while (nextFreeRow <= self.matrix.length - 1 && self.matrix[nextFreeRow][col] === 0) {
                    self.matrix[nextFreeRow][col] = self.matrix[nextFreeRow - 1][col];
                    self.matrix[nextFreeRow - 1][col] = 0;

                    self._setResultElement(move, "result", nextFreeRow, col);

                    nextFreeRow++;
                }
                // check if one last merge is possible
                if (nextFreeRow <= self.matrix.length - 1) {
                    if (self.matrix[nextFreeRow][col] === self.matrix[nextFreeRow - 1][col] && !isMerge) {
                        self.matrix[nextFreeRow][col]++;
                        self.matrix[nextFreeRow - 1][col] = 0;

                        self._setResultElement(move, "result", nextFreeRow, col);
                    }
                }

                if (move.result) {
                    result.push(move);
                }
            }
        }

        return result;
    };
}

//var test = new MainLogic(4, 4); 
//test.reset();
//console.log(test.matrix);
//test.setElement(1, 1); 
//test.setElement(3, 1); 
//test.moveUp(); 
//console.log(test.matrix);

//var test = new MainLogic(4, 4);
//test.reset();  //expected 0 at all elements 
//test.setElement(0, 0); //expected 1 at (0,0) 
//test.setElement(0, 1); //expected 1 at (0,1) 
//test.setElement(0, 2); //expected 1 at (0,2) 
//test.setElement(0, 3); //expected 1 at (0,2)
//test._givePoints(3); // test this must be private.

//test.setElement(0, 3); //expected 1 at (0,3) 
//console.log(test.matrix);
//test.moveLeft(); //expected 2 at (0,0) and (0,1)
//test.moveLeft(); //expected 3 at (0,0)
//test.moveRight(); //expected 3 at (0,3)
//test.moveDown(); //expected 3 at (3,3)
//test.moveLeft(); //expected 3 at (3,0)
//test.moveUp(); //expected 3 at (0,0)


//var test = new MainLogic(4, 4);
//test.reset();  //expected 0 at all elements 
//test.setElement(0, 0); //expected 1 at (0,0) 
//test.setElement(0, 1); //expected 1 at (0,1) 
//test.setElement(0, 2); //expected 1 at (0,2) 
//test.setElement(0, 3); //expected 1 at (0,2)
//console.log(test.score); //
//test.moveLeft(); // Test merg 2 cells in the same time 
//console.log(test.score); // 2 + 2 | 2 + 2 = score 4 + 4 = 8
//test.moveLeft(); // Test merg 4 cells in the same time 
//console.log(test.score); // expected 8 + 8 = 16
//test.moveLeft(); // 
//console.log(test.hasGameEnded());

/*
// No empty fields and can't move.
var test = new MainLogic(4, 4);
test.reset();
var number = 1;
for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
        test.setElement(i, j, number);
        number++;
    }
}
console.log(test.matrix);
console.log(test.hasGameEnded()); */

/*
// Test only 1 empty field.
var test = new MainLogic(4, 4);
test.reset();
var number = 0;
for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
        test.setElement(i, j, number);
        number++;
    }
}
console.log(test.matrix);
console.log(test.hasGameEnded());*/
