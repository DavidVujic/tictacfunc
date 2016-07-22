/* exported gridMaker */

var gridMaker = function (config) {
    function makeCell(x, y, state) {
        return {
            x: x,
            y: y,
            state: state
        };
    }

    function makeRow(rowNumber, columns) {
        var cells = [];
        var i;

        for (i = 0; i < columns; i += 1) {
            cells.push(makeCell(i, rowNumber));
        }

        return cells;
    }

    function makeGrid() {
        var grid = [];
        var i;

        for (i = 0; i < config.rows; i += 1) {
            grid.push(makeRow(i, config.columns));
        }

        return grid;
    }

    return {
        create: makeGrid
    };
};
