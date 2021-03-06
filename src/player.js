/* exported playerMaker */

var playerMaker = function (name, val, id, jsonpCallbackName, url) {

    function removeElement(selector) {
        var element = document.querySelector(selector);

        if (!element) {
            return;
        }

        document.body.removeChild(element);
    }

    function createScriptTag(src) {
        var elementId = 'temporary-jsonp-script-block';

        removeElement('#' + elementId);

        var script = document.createElement('script');
        script.id = elementId;
        script.type = 'application/javascript';
        script.src = src;

        document.body.appendChild(script);
    }

    function play(grid) {
        var game = window.encodeURIComponent(JSON.stringify({
            grid: grid,
            val: val
        }));

        var timestamp = new Date().getTime();

        var src = url + '?game=' + game + '&callback=' + jsonpCallbackName + '&t=' + timestamp;
        createScriptTag(src);
    }

    return {
        name: name,
        id: id,
        val: val,
        play: play
    };
};
