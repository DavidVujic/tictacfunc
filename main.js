/* global gameLogicMaker, playerMaker, gridMaker, viewRenderMaker, gameMaker */
/* exported playerMove */
function playerMove(cell) {
    console.log('move!');
    //game.update(cell);
}

var awsLambda = playerMaker().create('AWS Lambda', 'X', 'playerMove');
var azureFunctions = playerMaker().create('Unnamed robot', 'O', 'playerMove');

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

    game.start(grid);
});
