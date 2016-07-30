/* global _tics */
/* exported trackerMaker */
var trackerMaker = function (config) {

    _tics.gaProvider.init({
        account: 'UA-81483165-1',
        domain: 'davidvujic.github.io'
    });

    _tics.init(_tics.gaProvider);
    _tics.page();
    _tics.events();

    function send(winner) {
        var url = _tics.helper.getCurrentUrl();
        var players = _tics.helper.appendToUrl(url, config.players[0].id + '-vs-' + config.players[1].id);
        var destination = _tics.helper.appendToUrl(players, (winner ? winner.id : 'nowinner'));

        window.ga('send', 'pageview', destination);
    }

    return {
        send: send
    };
};
