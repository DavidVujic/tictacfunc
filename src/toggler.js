/* exported togglerMaker */

var togglerMaker = function () {
    function toggleCss(elm, val) {
        var css = elm.className.split(' ');
        var index = css.indexOf(val);

        if (index === -1) {
            css.push(val);
        } else {
            css.splice(index, 1);
        }

        elm.className = css.join(' ');
    }

    function toggleCssInfinite(elm, val) {
        elm.setAttribute('data-val-original-css', elm.className);

        return setInterval(function () {
            toggleCss(elm, val);
        }, 500);
    }

    function stopToggle(elm, id) {
        if (!id) {
            return;
        }
        clearInterval(id);
        elm.className = elm.getAttribute('data-val-original-css');
    }

    return {
        toggleCss: toggleCss,
        toggleCssInfinite: toggleCssInfinite,
        stopToggle: stopToggle
    }
}
