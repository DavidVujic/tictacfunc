/* exported viewRenderMaker */

var viewRenderMaker = function (config) {
    function log(message) {
        document.querySelector('#logger-container').innerHTML += message + '<br/>';
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

    function render(grid) {
        var tbl = document.createElement('table');
        var tr;
        var td;
        var tdWidth = Math.round((1 / grid[0].length) * 100);
        var tdHeight = Math.round((1 / grid.length) * 100);

        var fontSize = Math.round(config.boardWidth / grid[0].length);

        grid.forEach(function (row) {
            tr = document.createElement('tr');

            row.forEach(function (cell) {
                td = createTableCell(cell, tdWidth, tdHeight, fontSize);
                tr.appendChild(td);
            });

            tbl.appendChild(tr);
        });

        document.querySelector('#grid-container').appendChild(tbl);
    }

    return {
        render: render,
        renderCell: renderCell,
        renderResult: renderResult
    };
};
