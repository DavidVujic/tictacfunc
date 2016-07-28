/* global _tics */
/* exported analysisMaker */
var analysisMaker = function () {

    _tics.gaProvider.init({
        account: 'UA-81483165-1',
        domain: 'davidvujic.github.io'
    });

    _tics.init(_tics.gaProvider);
    _tics.page();
    _tics.events();

    function send(winner) {
        var url = _tics.helper.getCurrentUrl();
        var destination = _tics.helper.appendToUrl(url, (winner ? winner.id : 'nowinner'));

        window.ga('send', 'pageview', destination);
    }

    return {
        send: send
    };
};
