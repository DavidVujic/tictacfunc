/* exported viewRenderMaker */

var viewRenderMaker = function (config, analytics) {
    function log(message) {
        document.querySelector('#logger-container').innerHTML = message;
    }

    function createTableCell(cell, width, height, fontSize) {
        var size = 'width:' + width + '%;height:' + height + '%;font-size:' + fontSize + 'px';
        var elm = document.createElement('td');

        elm.id = 'row-' + cell.y + '-cell-' + cell.x;
        elm.className = 'cell';
        elm.setAttribute('style', size);

        return elm;
    }

    function renderResult(winner) {
        if (winner) {
            log('winner: ' + winner.name);
        } else {
            log('no winner.');
        }

        analytics.send(winner);
    }

    function renderCell(cell, highlight) {
        var selector = '#row-' + cell.y + '-cell-' + cell.x;

        var elm = document.querySelector(selector);
        elm.innerHTML = cell.state || '';

        if (highlight) {
            elm.className = 'cell highlight';
        } else {
            elm.className = 'cell';
        }
    }

    function removeChildren(parent) {
        while (parent.hasChildNodes()) {
            parent.removeChild(parent.lastChild);
        }
    }

    function render(grid) {
        var container = document.querySelector('#grid-container');
        removeChildren(container);
        log('');

        var tbl = document.createElement('table');
        var tr;
        var td;
        var tdWidth = Math.round((1 / grid[0].length) * 100);
        var tdHeight = Math.round((1 / grid.length) * 100);

        var fontSize = Math.round(config.boardWidth / grid[0].length) * 0.8;

        grid.forEach(function (row) {
            tr = document.createElement('tr');

            row.forEach(function (cell) {
                td = createTableCell(cell, tdWidth, tdHeight, fontSize);
                tr.appendChild(td);
            });

            tbl.appendChild(tr);
        });

        container.appendChild(tbl);
    }

    return {
        render: render,
        renderCell: renderCell,
        renderResult: renderResult
    };
};
