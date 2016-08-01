/* global trackerMaker,
gameLogicMaker,
playerMaker,
gridMaker,
viewRenderMaker,
gameMaker,
typeWriterMaker,
togglerMaker,
scoreKeeperMaker */
/* exported playerMove */

var game;
var startButton = document.querySelector('#start-game');

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
var scoreKeeper = scoreKeeperMaker(config, trackerMaker(config));

var view = viewRenderMaker(config, typeWriterMaker(), togglerMaker(), scoreKeeper);
var logic = gameLogicMaker();

game = gameMaker(config, logic, view, scoreKeeper);

var grid = gridMaker(config).create();

view.init(startButton);
view.render(grid);

startButton.addEventListener('click', function () {
    grid = gridMaker(config).create();
    view.render(grid);

    game.play(grid);
});
