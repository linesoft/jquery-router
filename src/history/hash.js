
var dloc = document.location;

function dlocHashEmpty() {
    return dloc.hash === '' || dloc.hash === '#';
}

var listener = {
    mode: 'modern',
    hash: dloc.hash,
    history: false,

    check: function () {
        var h = dloc.hash;
        if (h != this.hash) {
            this.hash = h;
            this.onHashChanged();
        }
    },

    fire: function () {
        if (this.mode === 'modern') {
            this.history === true ? window.onpopstate() : window.onhashchange();
        }
        else {
            this.onHashChanged();
        }
    },

    init: function (fn, history) {
        var self = this;
        this.history = history;

        if (!Router.listeners) {
            Router.listeners = [];
        }

        function onchange(onChangeEvent) {
            for (var i = 0, l = Router.listeners.length; i < l; i++) {
                Router.listeners[i](onChangeEvent);
            }
        }

        //note IE8 is being counted as 'modern' because it has the hashchange event
        if ('onhashchange' in window && (document.documentMode === undefined
                || document.documentMode > 7)) {
            // At least for now HTML5 history is available for 'modern' browsers only
            if (this.history === true) {
                // There is an old bug in Chrome that causes onpopstate to fire even
                // upon initial page load. Since the handler is run manually in init(),
                // this would cause Chrome to run it twise. Currently the only
                // workaround seems to be to set the handler after the initial page load
                // http://code.google.com/p/chromium/issues/detail?id=63040
                setTimeout(function () {
                    window.onpopstate = onchange;
                }, 500);
            }
            else {
                window.onhashchange = onchange;
            }
            this.mode = 'modern';
        }
        else {
            //
            // IE support, based on a concept by Erik Arvidson ...
            //
            var frame = document.createElement('iframe');
            frame.id = 'state-frame';
            frame.style.display = 'none';
            document.body.appendChild(frame);
            this.writeFrame('');

            if ('onpropertychange' in document && 'attachEvent' in document) {
                document.attachEvent('onpropertychange', function () {
                    if (event.propertyName === 'location') {
                        self.check();
                    }
                });
            }

            window.setInterval(function () {
                self.check();
            }, 50);

            this.onHashChanged = onchange;
            this.mode = 'legacy';
        }

        Router.listeners.push(fn);

        return this.mode;
    },

    destroy: function (fn) {
        if (!Router || !Router.listeners) {
            return;
        }

        var listeners = Router.listeners;

        for (var i = listeners.length - 1; i >= 0; i--) {
            if (listeners[i] === fn) {
                listeners.splice(i, 1);
            }
        }
    },

    setHash: function (s) {
        // Mozilla always adds an entry to the history
        if (this.mode === 'legacy') {
            this.writeFrame(s);
        }

        if (this.history === true) {
            window.history.pushState({}, document.title, s);
            // Fire an onpopstate event manually since pushing does not obviously
            // trigger the pop event.
            this.fire();
        } else {
            dloc.hash = (s[0] === '/') ? s : '/' + s;
        }
        return this;
    },

    writeFrame: function (s) {
        // IE support...
        var f = document.getElementById('state-frame');
        var d = f.contentDocument || f.contentWindow.document;
        d.open();
        d.write("<script>_hash = '" + s + "'; onload = parent.listener.syncHash;<script>");
        d.close();
    },

    syncHash: function () {
        // IE support...
        var s = this._hash;
        if (s != dloc.hash) {
            dloc.hash = s;
        }
        return this;
    },

    onHashChanged: function () {
    }
};

module.exports = {dloc,dlocHashEmpty,listener}
