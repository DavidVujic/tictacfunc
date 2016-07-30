/* exported gameMaker */

var gameMaker = function (config, logic, view) {
    var currentGrid;
    var currentPlayer;
    var isPlaying = false;

    function toggleCurrentPlayer() {
        currentPlayer = currentPlayer === config.players[0] ? config.players[1] : config.players[0];
    }

    function play(grid) {
        currentGrid = grid;
        isPlaying = true;

        toggleCurrentPlayer();

        currentPlayer.play(currentGrid);
    }

    function finish(cells) {
        if (!isPlaying) {
            return;
        }

        var winner;
        var i;

        if (cells) {
            for (i = 0; i < config.players.length; i += 1) {
                if (cells[0].state === config.players[i].val) {
                    config.players[i].winner();
                    winner = config.players[i];
                }
            }
        }

        view.renderResult(winner);
        isPlaying = false;
    }

    function makeMove(cell) {
        function isWinner(cells) {
            return cells.length === config.winner;
        }

        function renderWinnerRow(cells) {
            cells.forEach(function (c) {
                view.renderCell(c, true);
            });

            finish(cells);
        }

        function updateGrid() {
            currentGrid[cell.y][cell.x].state = cell.state;
        }

        if (!cell) {
            finish();
        } else {
            var inRow = logic.findEqualsInRow(currentGrid, cell, config);

            if (isWinner(inRow)) {
                renderWinnerRow(inRow);
                return;
            }

            var inColumn = logic.findEqualsInColumn(currentGrid, cell, config);

            if (isWinner(inColumn)) {
                renderWinnerRow(inColumn);
                return;
            }

            var inDiagonal = logic.findEqualsInDiagonals(currentGrid, cell, config);

            if (isWinner(inDiagonal)) {
                renderWinnerRow(inDiagonal);
                return;
            }

            updateGrid();

            view.renderCell(cell);

            return currentGrid;
        }
    }

    function isDone(grid) {
        var hasEmptyCells = false;
        var x;
        var y;

        if (grid) {
            for (x = 0; x < grid.length; x += 1) {
                for (y = 0; y < grid[x].length; y += 1) {
                    if (!grid[x][y].state) {
                        hasEmptyCells = true;
                        break;
                    }
                }
            }
        }

        return !hasEmptyCells;
    }

    return {
        play: play,
        finish: finish,
        makeMove: makeMove,
        isDone: isDone
    };
};
