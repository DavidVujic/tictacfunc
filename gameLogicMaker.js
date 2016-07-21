/* exported gameLogicMaker */

var gameLogicMaker = function () {
    function add(val) {
        return val + 1;
    }

    function subtract(val) {
        return val - 1;
    }

    function checkDiagonal(grid, cell, moveCell, moveRow) {
        function isInRange() {
            var rowInRange = grid.length > rowIndex && rowIndex > -1;
            var cellInRange = grid[0].length > cellIndex && cellIndex > -1;

            return rowInRange && cellInRange;
        }
        var cells = [];

        var rowIndex = cell.y;
        var cellIndex = cell.x;
        var shouldMove = false;

        if (cell.state) {
            cells.push(cell);
            shouldMove = true;
        }

        while (shouldMove) {
            rowIndex = moveRow(rowIndex);
            cellIndex = moveCell(cellIndex);

            if (isInRange()) {
                if (grid[rowIndex][cellIndex].state === cell.state) {
                    cells.push(grid[rowIndex][cellIndex]);
                } else {
                    shouldMove = false;
                }
            } else {
                shouldMove = false;
            }
        }

        return cells;
    }

    function findEmptySlots(grid) {
        var cells = [];
        grid.forEach(function (row) {
            row.forEach(function (cell) {
                if (!cell.state) {
                    cells.push(cell);
                }
            });
        });

        return cells;
    }

    function findEqualsInRow(grid, cell, max) {
        var cells = [];
        var row = grid[cell.y];
        var shouldMove = true;
        var cellIndex = 0;

        while (shouldMove) {
            if (row[cellIndex].state === cell.state) {
                cells.push(row[cellIndex]);
            } else {
                cells = [];
            }

            cellIndex = add(cellIndex);

            shouldMove = cellIndex < row.length && cells.length < max;
        }

        return cells;
    }

    function findEqualsInColumn(grid, cell, max) {
        var cells = [];
        var shouldMove = true;
        var rowIndex = 0;
        var row;

        while (shouldMove) {
            row = grid[rowIndex];
            if (row[cell.x].state === cell.state) {
                cells.push(row[cell.x]);
            } else {
                cells = [];
            }

            rowIndex = add(rowIndex);

            shouldMove = rowIndex < grid.length && cells.length < max;
        }

        return cells;
    }

    function findEqualsInDiagonals(grid, cell, config) {
        var result = checkDiagonal(grid, cell, add, add);

        if (result.length < config.winner) {
            result = checkDiagonal(grid, cell, add, subtract);
        }

        if (result.length < config.winner) {
            result = checkDiagonal(grid, cell, subtract, subtract);
        }

        if (result.length < config.winner) {
            result = checkDiagonal(grid, cell, subtract, add);
        }

        return result;
    }

    return {
        findEmptySlots: findEmptySlots,
        findEqualsInRow: findEqualsInRow,
        findEqualsInColumn: findEqualsInColumn,
        findEqualsInDiagonals: findEqualsInDiagonals
    };
};
