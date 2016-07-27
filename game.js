/* exported gameMaker */

var gameMaker = function (config, logic, view) {
    var status = 'stopped';
    var currentGrid;
    var currentPlayer;

    function toggleCurrentPlayer() {
        currentPlayer = currentPlayer === config.players[0] ? config.players[1] : config.players[0];
    }

    function play(grid) {
        currentGrid = grid;
        status = 'running';

        toggleCurrentPlayer();

        currentPlayer.play(currentGrid);
    }

    function finish(slots) {
        var winner;
        var i;

        if (slots) {
            for (i = 0; i < config.players.length; i += 1) {
                if (slots[0].state === config.players[i].val) {
                    winner = config.players[i];
                }
            }
        }

        status = 'finished';

        view.renderResult(winner);
    }

    function update(cell) {
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

    function currentStatus() {
        return status;
    }

    return {
        play: play,
        finish: finish,
        update: update,
        status: currentStatus
    };
};
