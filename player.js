/* exported playerMaker */

var playerMaker = function () {
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

    function getRandomIntInclusive(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function create(name, val) {
        function play(grid) {
            var emptySlots = findEmptySlots(grid);

            if (emptySlots.length === 0) {
                return;
            }

            var slotIndex = getRandomIntInclusive(0, emptySlots.length - 1);

            var cell = emptySlots[slotIndex];

            cell.state = val;

            return cell;
        }

        return {
            name: name,
            val: val,
            play: play
        };
    }

    return {
        create: create
    };
};
