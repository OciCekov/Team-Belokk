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

    // TODO: return array with objects representing the moves that are made
    self.moveRight = function () {
        for (var row = 0; row < self.matrix.length; row++) {
            for (var col = self.matrix[row].length - 1; col >= 0 ; col--) {
                if (self.matrix[row][col] == 0) {
                    continue;
                }

                if (col !== 0) {
                    // merge two adjacent elements if they are equal
                    if (self.matrix[row][col] == self.matrix[row][col - 1]) {
                        self.matrix[row][col]++;
                        self.matrix[row][col - 1] = 0;

                    }
                }

                // move the current element if there are free positions
                var nextFreeCol = col + 1;
                while (nextFreeCol <= self.matrix[row].length - 1 && self.matrix[row][nextFreeCol] === 0) {
                    self.matrix[row][nextFreeCol] = self.matrix[row][nextFreeCol - 1];
                    self.matrix[row][nextFreeCol - 1] = 0;
                    nextFreeCol++;
                }
            }
        }
    };

    // TODO: return array with objects representing the moves that are made
    self.moveLeft = function () {
        for (var row = 0; row < self.matrix.length; row++) {
            for (var col = 0; col <= self.matrix[row].length - 1; col++) {
                if (self.matrix[row][col] == 0) {
                    continue;
                }

                if (col !== self.matrix[row].length - 1) {
                    // merge two adjacent elements if they are equal
                    if (self.matrix[row][col] == self.matrix[row][col + 1]) {
                        self.matrix[row][col]++;
                        self.matrix[row][col + 1] = 0;
                    }
                }

                // move the current element if there are free positions
                var nextFreeCol = col - 1;
                while (nextFreeCol >= 0 && self.matrix[row][nextFreeCol] === 0) {
                    self.matrix[row][nextFreeCol] = self.matrix[row][nextFreeCol + 1];
                    self.matrix[row][nextFreeCol + 1] = 0;
                    nextFreeCol--;
                }
            }
        }
    };

    // TODO: return array with objects representing the moves that are made
    self.moveUp = function () {
        for (var col = 0; col < self.matrix[0].length; col++) {
            for (var row = 0; row <= self.matrix.length - 1; row++) {
                if (self.matrix[row][col] == 0) {
                    continue;
                }

                if (row !== self.matrix.length - 1) {
                    // merge two adjacent elements if they are equal
                    if (self.matrix[row][col] == self.matrix[row + 1][col]) {
                        self.matrix[row][col]++;
                        self.matrix[row + 1][col] = 0;
                    }
                }

                // move the current element if there are free positions
                var nextFreeRow = row - 1;
                while (nextFreeRow >= 0 && self.matrix[nextFreeRow][col] === 0) {
                    self.matrix[nextFreeRow][col] = self.matrix[nextFreeRow + 1][col];
                    self.matrix[nextFreeRow + 1][col] = 0;
                    nextFreeRow--;
                }
            }
        }
    };

    // TODO: return array with objects representing the moves that are made
    self.moveDown = function () {
        for (var col = 0; col < self.matrix[0].length; col++) {
            for (var row = self.matrix.length - 1; row >= 0 ; row--) {
                if (self.matrix[row][col] == 0) {
                    continue;
                }

                if (row !== 0) {
                    // merge two adjacent elements if they are equal
                    if (self.matrix[row][col] == self.matrix[row - 1][col]) {
                        self.matrix[row][col]++;
                        self.matrix[row - 1][col] = 0;
                    }
                }

                // move the current element if there are free positions
                var nextFreeRow = row + 1;
                while (nextFreeRow <= self.matrix.length - 1 && self.matrix[nextFreeRow][col] === 0) {
                    self.matrix[nextFreeRow][col] = self.matrix[nextFreeRow - 1][col];
                    self.matrix[nextFreeRow - 1][col] = 0;
                    nextFreeRow++;
                }
            }
        }
    };
}

var test = new MainLogic(4, 4);
test.reset();  //expected 0 at all elements 
test.setElement(0, 0); //expected 1 at (0,0) 
test.setElement(0, 1); //expected 1 at (0,1) 
test.setElement(0, 2); //expected 1 at (0,2) 
test.setElement(0, 3); //expected 1 at (0,3) 
test.moveLeft(); //expected 2 at (0,0) and (0,1)
test.moveLeft(); //expected 3 at (0,0)
test.moveRight(); //expected 3 at (0,3)
test.moveDown(); //expected 3 at (3,3)
test.moveLeft(); //expected 3 at (3,0)
test.moveUp(); //expected 3 at (0,0)