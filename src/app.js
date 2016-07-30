/* global trackerMaker, gameLogicMaker, playerMaker, gridMaker, viewRenderMaker, gameMaker */
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

var config = {
    winner: 3,
    rows: 3,
    columns: 3,
    players: [
        playerMaker('AWS Lambda', 'X', 'awslambda', 'playerMove'),
        playerMaker('Azure Functions', 'O', 'azurefunction', 'playerMove')
    ]
};

var view = viewRenderMaker(config, trackerMaker(config));
var logic = gameLogicMaker();

game = gameMaker(config, logic, view);

var grid = gridMaker(config).create();

view.init();
view.render(grid);

document.querySelector('#start-game').addEventListener('click', function () {
    grid = gridMaker(config).create();
    view.render(grid);

    game.play(grid);
});
