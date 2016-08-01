/* exported viewRenderMaker */

var viewRenderMaker = function (config, typeWriter, toggler, scoreKeeper) {
    var playingIntervalId;
    var indicator;

    function renderMessage(winner) {
        var message = winner ? 'winner: ' + winner.name : ' no winner';
        document.querySelector('#game-message').innerHTML = message;
    }

    function renderCurrentScore() {
        var score = scoreKeeper.score();
        var selector;
        var elm;

        score.forEach(function (player) {
            selector = '[data-val-player-id="' + player.id + '"]';
            elm = document.querySelectorAll(selector)[0];
            elm.innerHTML = player.gamesWon;
        });
    }

    function renderResultBoard() {
        document.querySelector('#player-one-name').innerHTML = config.players[0].name;
        document.querySelector('#player-two-name').innerHTML = config.players[1].name;

        document.querySelector('#player-one-val').innerHTML = config.players[0].val;
        document.querySelector('#player-two-val').innerHTML = config.players[1].val;

        document.querySelector('#player-one-result').setAttribute('data-val-player-id', config.players[0].id);
        document.querySelector('#player-two-result').setAttribute('data-val-player-id', config.players[1].id);

        renderCurrentScore();
    }

    function renderResult() {
        renderCurrentScore();

        toggler.stopToggle(indicator, playingIntervalId);
        indicator.innerHTML = indicator.getAttribute('data-val-original-text');
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

    function init(indicatorElement) {
        indicator = indicatorElement;
        var greeting = document.querySelector('#greeting-area');
        var question = document.querySelector('#question-area');
        var details = document.querySelector('#player-details');

        setTimeout(function () {
            typeWriter.write(greeting, function () {

                setTimeout(function () {
                    typeWriter.write(question, function () {
                        setTimeout(function () {
                            toggler.toggleCss(document.querySelector('#players-board'), 'hidden');
                            toggler.toggleCss(document.querySelector('#user-actions'), 'hidden');
                            toggler.toggleCss(document.querySelector('#board-area'), 'hidden');

                            setTimeout(function () {
                                typeWriter.write(details);
                            }, 1200);

                        }, 500);
                    });
                }, 1000);

            });
        }, 1000);

        indicator.addEventListener('click', function () {
            indicator.setAttribute('data-val-original-text', indicator.innerHTML);
            indicator.innerHTML = indicator.getAttribute('data-val-disabled-text');

            playingIntervalId = toggler.toggleCssInfinite(indicator, 'hidden');
        });
    }

    return {
        init: init,
        render: render,
        renderCell: renderCell,
        renderResult: renderResult,
        renderMessage: renderMessage
    };
};
