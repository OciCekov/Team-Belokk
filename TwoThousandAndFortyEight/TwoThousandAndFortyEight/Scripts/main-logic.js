function MainLogic(fieldSizeX, fieldSizeY) {
    self = this;

    self._createMatrix = function (sizeX, sizeY) {
        var resultMatrix = new Array(sizeY);
        for (var i = 0; i < resultMatrix.length; i++) {
            resultMatrix[i] = new Array(sizeX);
        }

        return resultMatrix;
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

    self.setElement = function (elementRow, elementCol) {
        self.matrix[elementRow][elementCol] = 1;
    }

    self._setResultElement = function (move, element, row, col) {
        move[element] = move[element] || {};
        move[element].row = row;
        move[element].col = col;
        move[element].value = self.matrix[row][col];
    }

    // TODO: return array with objects representing the moves that are made
    self.moveRight = function () {
        var result = [];
        for (var row = 0; row < self.matrix.length; row++) {
            for (var col = self.matrix[row].length - 1; col >= 0 ; col--) {
                if (self.matrix[row][col] == 0) {
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
                    if (self.matrix[row][col] == self.matrix[row][prevEqualElementCol]) {
                        self._setResultElement(move, "second", row, prevEqualElementCol);

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

    // TODO: return array with objects representing the moves that are made
    self.moveLeft = function () {
        var result = [];
        for (var row = 0; row < self.matrix.length; row++) {
            for (var col = 0; col <= self.matrix[row].length - 1; col++) {
                if (self.matrix[row][col] == 0) {
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
                    if (self.matrix[row][col] == self.matrix[row][prevEqualElementCol]) {
                        self._setResultElement(move, "second", row, prevEqualElementCol);

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

    // TODO: return array with objects representing the moves that are made
    self.moveUp = function () {
        var result = [];
        for (var col = 0; col < self.matrix[0].length; col++) {
            for (var row = 0; row <= self.matrix.length - 1; row++) {
                if (self.matrix[row][col] == 0) {
                    continue;
                }

                var move = {};
                self._setResultElement(move, "first", row, col);

                var isMerge = false;
                if (row !== self.matrix.length - 1) {
                    var prevEqualElementRow = row + 1;
                    while (prevEqualElementRow <= self.matrix.length - 1) {
                        if (self.matrix[row][prevEqualElementRow] === 0) {
                            prevEqualElementRow++;
                            continue;
                        } else {
                            break;
                        }
                    }
                    // merge two adjacent elements if they are equal
                    if (self.matrix[row][col] == self.matrix[prevEqualElementRow][col]) {
                        self._setResultElement(move, "second", prevEqualElementRow, col);

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

    // TODO: return array with objects representing the moves that are made
    self.moveDown = function () {
        var result = [];
        for (var col = 0; col < self.matrix[0].length; col++) {
            for (var row = self.matrix.length - 1; row >= 0 ; row--) {
                if (self.matrix[row][col] == 0) {
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
                    if (self.matrix[row][col] == self.matrix[prevEqualElementRow][col]) {
                        self._setResultElement(move, "second", prevEqualElementRow, col);

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

var test = new MainLogic(4, 4);
test.reset();  //expected 0 at all elements 
test.setElement(0, 1);
test.setElement(0, 2);
test.setElement(0, 3); // 0 1 1 1 on first row
var res = test.moveLeft(); // 2 1 0 0 on first row after move
// elements with columns 1 and 2, merge to position with column 0 value 2
// element with column 3 moves to position with column 1
// res contains the 2 transitions that should be animated
