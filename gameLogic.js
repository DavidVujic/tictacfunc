/* exported gameLogicMaker */

var gameLogicMaker = function () {
    function add(val) {
        return val + 1;
    }

    function subtract(val) {
        return val - 1;
    }

    function same(val) {
        return val;
    }

    function findEquals(grid, cell, moveCell, moveRow) {
        function isInRange() {
            var rowInRange = grid.length > rowIndex && rowIndex > -1;
            var cellInRange = grid[0].length > cellIndex && cellIndex > -1;

            return rowInRange && cellInRange;
        }

        var cells = [];

        var rowIndex = cell.y;
        var cellIndex = cell.x;
        var shouldMove = cell.state;

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

    function findEqualsInRow(grid, cell, config) {
        var result = [cell];
        var left;
        var right;

        left = findEquals(grid, cell, add, same);

        left.forEach(function (item) {
            result.push(item);
        });

        if (result.length < config.winner) {
            right = findEquals(grid, cell, subtract, same);

            right.forEach(function (item) {
                result.push(item);
            });
        }

        return result;
    }

    function findEqualsInColumn(grid, cell, config) {
        var result = [cell];
        var down;
        var up;

        down = findEquals(grid, cell, same, add);

        down.forEach(function (item) {
            result.push(item);
        });

        if (result.length < config.winner) {
            up = findEquals(grid, cell, same, subtract);

            up.forEach(function (item) {
                result.push(item);
            });
        }

        return result;
    }

    function findEqualsInDiagonals(grid, cell, config) {
        var result = [cell];
        var downLeft;
        var downRight;

        var upLeft;
        var upRight;

        downLeft = findEquals(grid, cell, add, add);

        downLeft.forEach(function (item) {
            result.push(item);
        });

        if (result.length < config.winner) {
            downRight = findEquals(grid, cell, add, subtract);

            downRight.forEach(function (item) {
                result.push(item);
            });
        }

        if (result.length < config.winner) {
            upLeft = findEquals(grid, cell, subtract, add);

            upLeft.forEach(function (item) {
                result.push(item);
            });
        }

        if (result.length < config.winner) {
            upRight = findEquals(grid, cell, subtract, subtract);

            upRight.forEach(function (item) {
                result.push(item);
            });
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
