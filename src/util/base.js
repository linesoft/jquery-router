
function _every(arr, iterator) {
    for (var i = 0; i < arr.length; i += 1) {
        if (iterator(arr[i], i, arr) === false) {
            return;
        }
    }
}

function _flatten(arr) {
    var flat = [];
    for (var i = 0, n = arr.length; i < n; i++) {
        flat = flat.concat(arr[i]);
    }
    return flat;
}

function _asyncEverySeries(arr, iterator, callback) {
    if (!arr.length) {
        return callback();
    }
    var completed = 0;
    (function iterate() {
        iterator(arr[completed], function (err) {
            if (err || err === false) {
                callback(err);
                callback = function () {
                };
            } else {
                completed += 1;
                if (completed === arr.length) {
                    callback();
                } else {
                    iterate();
                }
            }
        });
    })();
}

function paramifyString(str, params, mod) {
    mod = str;
    for (var param in params) {
        if (params.hasOwnProperty(param)) {
            mod = params[param](str);
            if (mod !== str) {
                break;
            }
        }
    }
    return mod === str ? "([._a-zA-Z0-9-%()]+)" : mod;
}

function regifyString(str, params) {
    var matches, last = 0, out = "";
    while (matches = str.substr(last).match(/[^\w\d\- %@&]*\*[^\w\d\- %@&]*/)) {
        last = matches.index + matches[0].length;
        matches[0] = matches[0].replace(/^\*/, "([_.()!\\ %@&a-zA-Z0-9-]+)");
        out += str.substr(0, matches.index) + matches[0];
    }
    str = out += str.substr(last);
    var captures = str.match(/:([^\/]+)/ig), capture, length;
    if (captures) {
        length = captures.length;
        for (var i = 0; i < length; i++) {
            capture = captures[i];
            if (capture.slice(0, 2) === "::") {
                str = capture.slice(1);
            } else {
                str = str.replace(capture, paramifyString(capture, params));
            }
        }
    }
    return str;
}

function terminator(routes, delimiter, start, stop) {
    var last = 0, left = 0, right = 0, start = (start || "(").toString(), stop = (stop || ")").toString(), i;
    for (i = 0; i < routes.length; i++) {
        var chunk = routes[i];
        if (chunk.indexOf(start, last) > chunk.indexOf(stop, last) || ~chunk.indexOf(start, last) && !~chunk.indexOf(stop, last) || !~chunk.indexOf(start, last) && ~chunk.indexOf(stop, last)) {
            left = chunk.indexOf(start, last);
            right = chunk.indexOf(stop, last);
            if (~left && !~right || !~left && ~right) {
                var tmp = routes.slice(0, (i || 1) + 1).join(delimiter);
                routes = [tmp].concat(routes.slice((i || 1) + 1));
            }
            last = (right > left ? right : left) + 1;
            i = 0;
        } else {
            last = 0;
        }
    }
    return routes;
}

module.exports = {_every,_flatten,_asyncEverySeries,paramifyString,regifyString,terminator}
