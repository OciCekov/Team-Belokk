function ScoreBoard() {
    self = this;

    function leftLine(x, y, strokeColor) {
        var pathArray = ['M', x, y, 'L', x, y + 10, x + 0.5, y + 9.5, x + 0.5, y + 0.5, 'Z'];
        return paper.path(pathArray.join(' ')).attr({ stroke: strokeColor });
    }

    function rightLine(x, y, strokeColor) {
        var pathArray = ['M', x, y, 'L', x, y + 10, x - 0.5, y + 9.5, x - 0.5, y + 0.5, 'Z'];
        return paper.path(pathArray.join(' ')).attr({ stroke: strokeColor });
    }

    function topLine(x, y, strokeColor) {
        var pathArray = ['M', x, y, 'L', x + 10, y, x + 9.5, y + 0.5, x + 0.5, y + 0.5, 'Z'];
        return paper.path(pathArray.join(' ')).attr({ stroke: strokeColor });
    }

    function middleLine(x, y, strokeColor) {
        var pathArray = ['M', x, y, 'L', x + 0.25, y - 0.25, x + 9.75, y - 0.25, x + 10, y, x + 9.75, y + 0.25, x + 0.25, y + 0.25, 'Z'];
        return paper.path(pathArray.join(' ')).attr({ stroke: strokeColor });
    }

    function bottomLine(x, y, strokeColor) {
        var pathArray = ['M', x, y, 'L', x + 10, y, x + 9.5, y - 0.5, x + 0.5, y - 0.5, 'Z'];
        return paper.path(pathArray.join(' ')).attr({ stroke: strokeColor });
    }

    function visualizeDigits(digit, x, y, strokeColor) {
        var set = paper.set();

        switch (digit) {
            case 0:
                set.push(
                    topLine(x + 1, y - 1, strokeColor),
                    rightLine(x + 12, y, strokeColor),
                    rightLine(x + 12, y + 13, strokeColor),
                    bottomLine(x + 1, y + 24, strokeColor),
                    leftLine(x, y + 13, strokeColor),
                    leftLine(x, y, strokeColor)
                );
                break;
            case 1:
                set.push(
                    rightLine(x + 12, y, strokeColor),
                    rightLine(x + 12, y + 13, strokeColor)
                );
                break;
            case 2:
                set.push(
                    topLine(x + 1, y - 1, strokeColor),
                    rightLine(x + 12, y, strokeColor),
                    middleLine(x + 1, y + 11.5, strokeColor),
                    leftLine(x, y + 13, strokeColor),
                    bottomLine(x + 1, y + 24, strokeColor)
                );
                break;
            case 3:
                set.push(
                    topLine(x + 1, y - 1, strokeColor),
                    rightLine(x + 12, y, strokeColor),
                    middleLine(x + 1, y + 11.5, strokeColor),
                    rightLine(x + 12, y + 13, strokeColor),
                    bottomLine(x + 1, y + 24, strokeColor)
                );
                break;
            case 4:
                set.push(
                    leftLine(x, y, strokeColor),
                    middleLine(x + 1, y + 11.5, strokeColor),
                    rightLine(x + 12, y, strokeColor),
                    rightLine(x + 12, y + 13, strokeColor)
                );
                break;
            case 5:
                set.push(
                    topLine(x + 1, y - 1, strokeColor),
                    leftLine(x, y, strokeColor),
                    middleLine(x + 1, y + 11.5, strokeColor),
                    rightLine(x + 12, y + 13, strokeColor),
                    bottomLine(x + 1, y + 24, strokeColor)
                );
                break;
            case 6:
                set.push(
                    topLine(x + 1, y - 1, strokeColor),
                    leftLine(x, y, strokeColor),
                    leftLine(x, y + 13, strokeColor),
                    bottomLine(x + 1, y + 24, strokeColor),
                    rightLine(x + 12, y + 13, strokeColor),
                    middleLine(x + 1, y + 11.5, strokeColor)
                );
                break;
            case 7:
                set.push(
                    topLine(x + 1, y - 1, strokeColor),
                    rightLine(x + 12, y, strokeColor),
                    rightLine(x + 12, y + 13, strokeColor)
                );
                break;
            case 8:
                set.push(
                    topLine(x + 1, y - 1, strokeColor),
                    rightLine(x + 12, y, strokeColor),
                    middleLine(x + 1, y + 11.5, strokeColor),
                    leftLine(x, y, strokeColor),
                    rightLine(x + 12, y + 13, strokeColor),
                    bottomLine(x + 1, y + 24, strokeColor),
                    leftLine(x, y + 13, strokeColor)
                );
                break;
            case 9:
                set.push(
                    topLine(x + 1, y - 1, strokeColor),
                    leftLine(x, y, strokeColor),
                    middleLine(x + 1, y + 11.5, strokeColor),
                    rightLine(x + 12, y, strokeColor),
                    rightLine(x + 12, y + 13, strokeColor),
                    bottomLine(x + 1, y + 24, strokeColor)
                );
                break;
        }

        return set;
    }

    function initScoreBoard() {
        var scoreRect = paper.rect(SCORE_POSITION.X, SCORE_POSITION.Y, SCORE_WIDTH, SCORE_HEIGHT);
        scoreRect.attr({
            stroke: 'none',
            fill: '#EEE'
        });

        var highScoreRect = paper.rect(HIGH_SCORE_POSITION.X, HIGH_SCORE_POSITION.Y, SCORE_WIDTH, SCORE_HEIGHT);
        highScoreRect.attr({
            stroke: 'none',
            fill: '#EEE'
        });

        paper.text(SCORE_POSITION.X - 50, SCORE_POSITION.Y + 15, 'Score').attr({ 'font-size': 25, 'font-family': 'clear_sansregular' });
        paper.text(HIGH_SCORE_POSITION.X - 75, HIGH_SCORE_POSITION.Y + 15, 'High score').attr({ 'font-size': 25, 'font-family': 'clear_sansregular' });
        for (var i = 0; i < 5; i++) {
            visualizeDigits(8, SCORE_POSITION.X + 65 - (i * 15), SCORE_POSITION.Y + 4, '#DDD');
            visualizeDigits(8, HIGH_SCORE_POSITION.X + 65 - (i * 15), HIGH_SCORE_POSITION.Y + 4, '#DDD');
        }
    }

    self.initScore = initScoreBoard;

    function resetScore() {
        paper.clear();
        initScoreBoard();
        visualizeDigits(0, SCORE_POSITION.X + 65, SCORE_POSITION.Y + 4, '#000');

        if (highScore === 0) {
            visualizeDigits(0, HIGH_SCORE_POSITION.X + 65, HIGH_SCORE_POSITION.Y + 4, '#000');
        }

        var currentHighScore = score;
        var i = 0;

        while (currentHighScore > 0) {
            digit = currentHighScore % 10;
            visualizeDigits(digit, HIGH_SCORE_POSITION.X + 65 - (i * 15), HIGH_SCORE_POSITION.Y + 4, '#000');
            currentHighScore = parseInt(currentHighScore / 10);
            i++;
        }
    }

    self.reset = resetScore;

    function visualizeScore() {
        var currentScore = score;
        var currentHighScore = score;
        var i = 0;
        var digit;

        paper.clear();
        initScoreBoard();

        if (currentScore === 0) {
            visualizeDigits(0, SCORE_POSITION.X + 65, SCORE_POSITION.Y + 4, '#000');
        }

        if (currentHighScore === 0) {
            visualizeDigits(0, HIGH_SCORE_POSITION.X + 65, HIGH_SCORE_POSITION.Y + 4, '#000');
        }

        while (currentScore > 0) {
            digit = currentScore % 10;
            visualizeDigits(digit, SCORE_POSITION.X + 65 - (i * 15), SCORE_POSITION.Y + 4, '#000');
            currentScore = parseInt(currentScore / 10);
            i++;
        }

        i = 0;
        if (score >= highScore) {
            highScore = score;

            while (currentHighScore > 0) {
                digit = currentHighScore % 10;
                visualizeDigits(digit, HIGH_SCORE_POSITION.X + 65 - (i * 15), HIGH_SCORE_POSITION.Y + 4, '#000');
                currentHighScore = parseInt(currentHighScore / 10);
                i++;
            }
        }
    }

    self.visualize = visualizeScore;
}