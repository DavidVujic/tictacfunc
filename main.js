/* global gameLogicMaker, playerMaker, gridMaker, viewRenderMaker, gameMaker */
/* exported playerMove */
function playerMove(cell) {
    var currentGrid = game.makeMove(cell);

    if (game.isDone(currentGrid)) {
        game.finish();
    } else {
        game.play(currentGrid);
    }
}

var awsLambda = playerMaker('AWS Lambda', 'X', 'awslambda', 'playerMove');
var azureFunctions = playerMaker('Azure Functions', 'O', 'azurefunction', 'playerMove');

var config = {
    winner: 3,
    rows: 3,
    columns: 3,
    boardWidth: 800,
    players: [awsLambda, azureFunctions]
};

var view = viewRenderMaker(config);
var logic = gameLogicMaker();
var game = gameMaker(config, logic, view);
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
