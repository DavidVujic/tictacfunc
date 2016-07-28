/* global gameLogicMaker, playerMaker, gridMaker, viewRenderMaker, gameMaker */
/* exported playerMove */
function playerMove(cell) {
    var currentGrid = game.update(cell);

    setTimeout(function () {
        if (currentGrid && game.status() === 'running') {
            game.play(currentGrid);
        }
    }, 500);
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
    if (game.status() === 'finished') {
        grid = gridMaker(config).create();
        view.render(grid);
    }

    game.play(grid);
});

document.querySelector('#stop-game').addEventListener('click', function () {
    game.finish();
});
