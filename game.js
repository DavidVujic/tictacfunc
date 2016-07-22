/* exported gameMaker */

var gameMaker = function (config, logic, view) {
    var timerInterval;
    var status = 'stopped';
    var currentGrid;
    var currentPlayer;

    function play(grid) {
        function getRandom() {
            return Math.round(Math.random());
        }

        currentPlayer = config.players[getRandom()];
        currentGrid = grid;
        status = 'running'
        timerInterval = setInterval(randomPlay, 1000);
    }

    function stop() {
        status = 'finished';
        window.clearInterval(timerInterval);
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

        stop();

        view.renderResult(winner);
    }

    function randomPlay() {
        function toggleCurrentPlayer() {
            currentPlayer = currentPlayer === config.players[0] ? config.players[1] : config.players[0];
        }

        toggleCurrentPlayer();

        var cell = currentPlayer.play(currentGrid);

        if (!cell) {
            finish();
        } else {
            onMove(cell);
        }
    }

    function onMove(cell) {
        function isWinner(cells) {
            return cells.length === config.winner;
        }

        function renderWinnerRow(cells) {
            cells.forEach(function (c) {
                view.renderCell(c, true);
            });

            finish(cells);
        }

        view.renderCell(cell);

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
    }

    function currentStatus() {
        return status;
    }

    return {
        play: play,
        finish: finish,
        randomPlay: randomPlay,
        status: currentStatus
    };
};
