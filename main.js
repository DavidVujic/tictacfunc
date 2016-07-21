/* global gameLogicMaker, playerMaker, gridMaker, viewRenderMaker, gameMaker */

var logic = gameLogicMaker();

var config = {
    winner: 3,
    rows: 3,
    columns: 3,
    boardWidth: 800,
    playerOne: playerMaker(logic).create('Player X', 'X'),
    playerTwo: playerMaker(logic).create('Player O', 'O')
};

var grid = gridMaker(config).create();
var view = viewRenderMaker(config);
var game = gameMaker(config, grid, logic, view);

view.render(grid);

var tableCells = document.querySelectorAll('.cell');
var currentState = 'O';

for (var i = 0; i < tableCells.length; i += 1) {
    tableCells[i].addEventListener('touchend', function (ev) {
        var y = ev.target.id.substr(4, 1);
        var x = ev.target.id.substr(11, 1);
        currentState = currentState === 'O' ? 'X' : 'O';
        var slot = grid[y][x];
        slot.state = currentState;
        game.onSlot(slot);
    });
}

var startBtn = document.querySelector('#start-game');

startBtn.addEventListener('click', game.play);
