/* exported typeWriterMaker */

var typeWriterMaker = function () {
    var target;
    var message;
    var i;
    var callback;

    function writeCharacter() {
        target.innerHTML += message[i];
        i += 1;

        if (i < message.length) {
            setTimeout(writeCharacter, 50);
        } else {
            if (callback) {
                callback();
            }
        }
    }

    function write(elm, done) {
        target = elm;
        message = elm.getAttribute('data-val-text');
        i = 0;
        callback = done;

        writeCharacter();
    }

    return {
        write: write
    };
}
