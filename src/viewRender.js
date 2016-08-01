/* exported viewRenderMaker */

var viewRenderMaker = function (config, tracker) {
    var playingIntervalId;
    var startGameElement;

    function renderMessage(winner) {
        var message = '';
        document.querySelector('#game-message').innerHTML = message;
    }

    function renderScore(player) {
        var selector = '[data-val-player-id="' + player.id + '"]';
        var elm = document.querySelectorAll(selector)[0];
        elm.innerHTML = player.getGamesWon();
    }

    function renderResultBoard() {
        document.querySelector('#player-one-name').innerHTML = config.players[0].name;
        document.querySelector('#player-two-name').innerHTML = config.players[1].name;

        document.querySelector('#player-one-val').innerHTML = config.players[0].val;
        document.querySelector('#player-two-val').innerHTML = config.players[1].val;

        document.querySelector('#player-one-result').setAttribute('data-val-player-id', config.players[0].id);
        document.querySelector('#player-two-result').setAttribute('data-val-player-id', config.players[1].id);

        renderScore(config.players[0]);
        renderScore(config.players[1]);
    }

    function renderResult(winner) {
        if (winner) {
            renderScore(winner);
        }

        stopToggle(startGameElement, playingIntervalId);
        startGameElement.innerHTML = startGameElement.getAttribute('data-val-original-text');
        tracker.send(winner);
    }

    function renderCell(cell, highlight) {
        var selector = '#row-' + cell.y + '-cell-' + cell.x;

        var elm = document.querySelector(selector);
        elm.innerHTML = cell.state || '';

        if (highlight) {
            elm.className = 'highlight';
        } else {
            elm.className = '';
        }
    }

    function removeChildren(parent) {
        while (parent.hasChildNodes()) {
            parent.lastChild.style.visibility = 'hidden';
            parent.removeChild(parent.lastChild);
        }
    }

    function render(grid) {
        var container = document.querySelector('#board-area');
        removeChildren(container);

        var tbl = document.createElement('table');
        tbl.id = 'grid-view';
        var tr;
        var td;

        grid.forEach(function (row) {
            tr = document.createElement('tr');

            row.forEach(function (cell) {
                td = document.createElement('td');
                td.id = 'row-' + cell.y + '-cell-' + cell.x;
                td.innerHTML = '&nbsp;';
                tr.appendChild(td);
            });

            tbl.appendChild(tr);
        });

        container.appendChild(tbl);

        renderResultBoard();
    }

    function init(startElement) {
        startGameElement = startElement;
        var greeting = "Greetings Dr Function.";
        var question = 'How about a nice game of Tic-Tac-Func?';
        var details = 'Human players: zero.';
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
                i = 0;
                setTimeout(function () {
                    document.querySelector('#players-board').setAttribute('class', '');
                    document.querySelector('#user-actions').setAttribute('class', '');

                    setTimeout(function () {
                        document.querySelector('#board-area').setAttribute('class', '');
                        setTimeout(writeDetails, 500);
                    }, 500);
                }, 500);
            }
        }

        function writeDetails() {
            document.querySelector('#player-details').innerHTML += details[i];
            i += 1;

            if (i < details.length) {
                setTimeout(writeDetails, 50);
            }
        }

        setTimeout(writeGreeting, 1000);

        startGameElement.addEventListener('click', function () {
            startGameElement.setAttribute('data-val-original-text', startGameElement.innerHTML);
            startGameElement.innerHTML = startGameElement.getAttribute('data-val-disabled-text');

            playingIntervalId = toggleInfinite(startGameElement, 'hidden');
        });
    }

    function toggleCss(elm, val) {
        var css = elm.className.split(' ');
        var index = css.indexOf(val);

        if (index === -1) {
            css.push(val);
        } else {
            css.splice(index, 1);
        }

        elm.className = css.join(' ');
    }

    function toggleInfinite(elm, val) {
        elm.setAttribute('data-val-original-css', elm.className);

        return setInterval(function () {
            toggleCss(elm, val);
        }, 500);
    }

    function stopToggle(elm, id) {
        if (!id) {
            return;
        }
        clearInterval(id);
        elm.className = elm.getAttribute('data-val-original-css');
    }


    return {
        init: init,
        render: render,
        renderCell: renderCell,
        renderResult: renderResult,
        renderMessage: renderMessage
    };
};
