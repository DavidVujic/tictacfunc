/* exported scoreKeeperMaker */

var scoreKeeperMaker = function (config, tracker) {
    var numberOfGames = 0;

    var players = [];

    config.players.forEach(function (player) {
        players.push({
            id: player.id,
            gamesWon: 0
        });
    });

    function result(winner) {
        var i;
        numberOfGames += 1;

        tracker.send(winner);

        if (!winner) {
            return;
        }

        for (i = 0; i < players.length; i += 1) {
            if (players[i].id === winner.id) {
                players[i].gamesWon += 1;
                break;
            }
        }
    }

    function score() {
        return players;
    }

    function games() {
        return numberOfGames;
    }

    return {
        result: result,
        score: score,
        games: games
    }
}
