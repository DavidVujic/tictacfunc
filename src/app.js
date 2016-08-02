/* global trackerMaker,
gameLogicMaker,
playerMaker,
gridMaker,
viewRenderMaker,
gameMaker,
typeWriterMaker,
togglerMaker,
scoreKeeperMaker */
/* exported playerMove, playGame */

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

function playGame() {
    grid = gridMaker(config).create();
    view.reset();

    game.play(grid);
}

var config = {
    winner: 3,
    rows: 3,
    columns: 3,
    players: [
        playerMaker('AWS Lambda', 'X', 'awslambda', 'playerMove'),
        playerMaker('Azure Functions', 'O', 'azurefunction', 'playerMove')
    ],
    numberOfGamesToPlay: 4
};

var scoreKeeper = scoreKeeperMaker(config, trackerMaker(config));
var view = viewRenderMaker(config, typeWriterMaker(), togglerMaker(), scoreKeeper);
var logic = gameLogicMaker();

game = gameMaker(config, logic, view, scoreKeeper);

game.onFinish(playGame);

var grid = gridMaker(config).create();

view.init(startButton);
view.render(grid);

startButton.addEventListener('click', playGame);
