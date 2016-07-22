/* global gameLogicMaker, playerMaker, gridMaker, viewRenderMaker, gameMaker */

var config = {
    winner: 3,
    rows: 3,
    columns: 3,
    boardWidth: 800,
    players: [playerMaker().create('Player X', 'X'), playerMaker().create('Player O', 'O')]
};

var view = viewRenderMaker(config);
var logic = gameLogicMaker();
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
