/* exported gameMaker */

var gameMaker = function (config, grid, logic, view) {
    var timerInterval;
    var currentPlayer;

    function playGame() {
        timerInterval = setInterval(randomPlay, 1000);
    }

    function stopGame() {
        window.clearInterval(timerInterval);
    }

    function finishGame(slots) {
        var winner;

        if (slots) {
            winner = slots[0].state === config.playerOne.val ? config.playerOne : config.playerTwo;
        }

        stopGame();

        view.renderResult(winner);
    }

    function randomPlay() {
        currentPlayer = currentPlayer === config.playerOne ? config.playerTwo : config.playerOne;

        var slot = currentPlayer.play(grid);

        if (!slot) {
            finishGame();
        } else {
            onSlot(slot);
        }
    }

    function onSlot(slot) {
        function isWinner(cells) {
            return cells.length === config.winner;
        }

        function renderWinnerRow(cells) {
            cells.forEach(function (c) {
                view.renderCell(c, true);
            });

            finishGame(cells);
        }

        view.renderCell(slot);

        var inRow = logic.findEqualsInRow(grid, slot, config.winner);

        if (isWinner(inRow)) {
            renderWinnerRow(inRow);
            return;
        }

        var inColumn = logic.findEqualsInColumn(grid, slot, config.winner);

        if (isWinner(inColumn)) {
            renderWinnerRow(inColumn);
            return;
        }

        var i;
        var j;
        var isFinished = false;

        for (i = 0; i < grid.length; i += 1) {

            if (isFinished) {
                break;
            }
            var row = grid[i];

            for (j = 0; j < row.length; j += 1) {
                var cell = row[j];
                var inDiagonal = logic.findEqualsInDiagonals(grid, cell, config);
                if (isWinner(inDiagonal)) {
                    renderWinnerRow(inDiagonal);
                    isFinished = true;
                    break;
                }
            }
        }
    }

    return {
        play: playGame,
        finish: finishGame,
        randomPlay: randomPlay,
        onSlot: onSlot
    };
};
