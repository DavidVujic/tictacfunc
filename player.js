/* exported playerMaker */

var playerMaker = function () {
    function create(name, val, jsonpCallbackName) {
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

        function makeJSONPcall(grid) {
            var url = 'https://tictacfunc-backend-1383.appspot.com/play';
            var game = window.encodeURIComponent(JSON.stringify({
                grid: grid,
                val: val
            }));

            var src = url + '?game=' + game + '&callback=' + jsonpCallbackName;
            console.log(src);
            createScriptTag(src);
        }

        function play(grid) {
            makeJSONPcall(grid);
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
