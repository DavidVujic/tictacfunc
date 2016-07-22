/* global gameLogicMaker, playerMaker, gridMaker, viewRenderMaker, gameMaker */

var logic = gameLogicMaker();

var config = {
    winner: 3,
    rows: 6,
    columns: 6,
    boardWidth: 800,
    players: [playerMaker(logic).create('Player X', 'X'), playerMaker(logic).create('Player O', 'O')]
};

var view = viewRenderMaker(config);
var game = gameMaker(config, logic, view);
var grid = gridMaker(config).create();

view.render(grid);

document.querySelector('#start-game').addEventListener('click', function () {
    if (game.status() === 'finished') {
        grid = gridMaker(config).create();
        view.render(grid);
    }

    game.play(grid);
});
