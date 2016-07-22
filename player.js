/* exported playerMaker */

var playerMaker = function (logic) {
    function create(name, val) {
        var gamesWon = 0;

        function getRandomIntInclusive(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function play(grid) {
            var emptySlots = logic.findEmptySlots(grid);

            if (emptySlots.length === 0) {
                return;
            }

            var slotIndex = getRandomIntInclusive(0, emptySlots.length - 1);

            var cell = emptySlots[slotIndex];

            cell.state = val;

            return cell;
        }

        function won() {
            gamesWon += 1;

            return gamesWon;
        }

        return {
            name: name,
            val: val,
            play: play,
            won: won
        };
    }

    return {
        create: create
    };
};
