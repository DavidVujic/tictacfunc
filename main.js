/* global analysisMaker, gameLogicMaker, playerMaker, gridMaker, viewRenderMaker, gameMaker */
/* exported playerMove */
var game;

function playerMove(cell) {
    var currentGrid = game.makeMove(cell);

    if (!game.isDone(currentGrid)) {
        game.play(currentGrid);
    } else {
        game.finish();
    }
}

var playerOne = playerMaker('AWS Lambda', 'X', 'awslambda', 'playerMove');
var playerTwo = playerMaker('Azure Functions', 'O', 'azurefunction', 'playerMove');

var config = {
    winner: 3,
    rows: 3,
    columns: 3,
    boardWidth: 800,
    players: [playerOne, playerTwo]
};

var view = viewRenderMaker(config, analysisMaker());
var logic = gameLogicMaker();

game = gameMaker(config, logic, view);

var grid = gridMaker(config).create();
view.render(grid);

document.querySelector('#start-game').addEventListener('click', function () {
    grid = gridMaker(config).create();
    view.render(grid);

    game.play(grid);
});

document.querySelector('#stop-game').addEventListener('click', function () {
    game.finish();
});
