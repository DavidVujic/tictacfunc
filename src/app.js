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
view.render(grid);

document.querySelector('#start-game').addEventListener('click', function () {
    grid = gridMaker(config).create();
    view.render(grid);

    game.play(grid);
});

(function () {
    var greeting = "Greetings Dr Function.";
    var question = 'How about a nice game of Tic-Tac-Func?';
    var i = 0;

    function writeGreeting() {
        document.querySelector('#greeting-area').innerHTML += greeting[i];
        i += 1;

        if (i < greeting.length) {
            setTimeout(writeGreeting, 50);
        } else {
            i = 0;
            setTimeout(writeQuestion, 1000);

        }
    }

    function writeQuestion() {
        document.querySelector('#question-area').innerHTML += question[i];
        i += 1;

        if (i < question.length) {
            setTimeout(writeQuestion, 50);
        } else {
            setTimeout(function () {
                document.querySelector('#players-board').setAttribute('class', '');
                document.querySelector('#user-actions').setAttribute('class', '');

                setTimeout(function () {
                    document.querySelector('#board-area').setAttribute('class', '');
                }, 500);
            }, 500);
        }
    }
    setTimeout(writeGreeting, 1000);
}());
