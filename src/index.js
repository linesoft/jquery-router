// 使得es5环境支持es6以下方法
import 'core-js/modules/es6.array.is-array';
import 'core-js/modules/es6.array.filter';
import {dloc,dlocHashEmpty,listener} from './history/hash';
import {_every,_flatten,_asyncEverySeries,paramifyString,regifyString,terminator} from './util/base';


var Router = function (routes) {
    if (!(this instanceof Router)) return new Router(routes);

    this.params   = {};
    this.routes   = {};
    this.methods  = ['on', 'once', 'after', 'before'];
    this.scope    = [];
    this._methods = {};

    this._insert = this.insert;
    this.insert = this.insertEx;

    this.historySupport = (window.history != null ? window.history.pushState : null) != null

    this.config();
    this.mount(routes || {});
};

Router.prototype.init = function (r) {
    var self = this
        , routeTo;
    this.handler = function(onChangeEvent) {
        var newURL = onChangeEvent && onChangeEvent.newURL || window.location.hash;
        var url = self.history === true ? self.getPath() : newURL.replace(/.*#/, '');
        self.dispatch('on', url.charAt(0) === '/' ? url : '/' + url);
    };

    listener.init(this.handler, this.history);

    if (this.history === false) {
        if (dlocHashEmpty() && r) {
            dloc.hash = r;
        } else if (!dlocHashEmpty()) {
            self.dispatch('on', '/' + dloc.hash.replace(/^(#\/|#|\/)/, ''));
        }
    }
    else {
        if (this.convert_hash_in_init) {
            // Use hash as route
            routeTo = dlocHashEmpty() && r ? r : !dlocHashEmpty() ? dloc.hash.replace(/^#/, '') : null;
            if (routeTo) {
                window.history.replaceState({}, document.title, routeTo);
            }
        }
        else {
            // Use canonical url
            routeTo = this.getPath();
        }

        // Router has been initialized, but due to the chrome bug it will not
        // yet actually route HTML5 history state changes. Thus, decide if should route.
        if (routeTo || this.run_in_init === true) {
            this.handler();
        }
    }

    return this;
};

Router.prototype.explode = function () {
    var v = this.history === true ? this.getPath() : dloc.hash;
    if (v.charAt(1) === '/') { v=v.slice(1) }
    return v.slice(1, v.length).split("/");
};

Router.prototype.setRoute = function (i, v, val) {
    var url = this.explode();

    if (typeof i === 'number' && typeof v === 'string') {
        url[i] = v;
    }
    else if (typeof val === 'string') {
        url.splice(i, v, s);
    }
    else {
        url = [i];
    }

    listener.setHash(url.join('/'));
    return url;
};

Router.prototype.insertEx = function(method, path, route, parent) {
    if (method === "once") {
        method = "on";
        route = function(route) {
            var once = false;
            return function() {
                if (once) return;
                once = true;
                return route.apply(this, arguments);
            };
        }(route);
    }
    return this._insert(method, path, route, parent);
};

Router.prototype.getRoute = function (v) {
    var ret = v;

    if (typeof v === "number") {
        ret = this.explode()[v];
    }
    else if (typeof v === "string"){
        var h = this.explode();
        ret = h.indexOf(v);
    }
    else {
        ret = this.explode();
    }

    return ret;
};

Router.prototype.destroy = function () {
    listener.destroy(this.handler);
    return this;
};

Router.prototype.getPath = function () {
    var path = window.location.pathname;
    if (path.substr(0, 1) !== '/') {
        path = '/' + path;
    }
    return path;
};


Router.prototype.config = function(options) {
    options = options || {};
    for (var i = 0; i < this.methods.length; i++) {
        this._methods[this.methods[i]] = true;
    }
    this.recurse = options.recurse || this.recurse || false;
    this.async = options.async || false;
    this.delimiter = options.delimiter || "/";
    this.strict = typeof options.strict === "undefined" ? true : options.strict;
    this.notfound = options.notfound;
    this.resource = options.resource;
    this.history = options.html5history && this.historySupport || false;
    this.run_in_init = this.history === true && options.run_handler_in_init !== false;
    this.convert_hash_in_init = this.history === true && options.convert_hash_in_init !== false;
    this.every = {
        after: options.after || null,
        before: options.before || null,
        on: options.on || null
    };
    return this;
};

Router.prototype.param = function(token, matcher) {
    if (token[0] !== ":") {
        token = ":" + token;
    }
    var compiled = new RegExp(token, "g");
    this.params[token] = function(str) {
        return str.replace(compiled, matcher.source || matcher);
    };
    return this;
};

Router.prototype.on = Router.prototype.route = function(method, path, route) {
    var self = this;
    if (!route && typeof path == "function") {
        route = path;
        path = method;
        method = "on";
    }
    if (Array.isArray(path)) {
        return path.forEach(function(p) {
            self.on(method, p, route);
        });
    }
    if (path.source) {
        path = path.source.replace(/\\\//ig, "/");
    }
    if (Array.isArray(method)) {
        return method.forEach(function(m) {
            self.on(m.toLowerCase(), path, route);
        });
    }
    path = path.split(new RegExp(this.delimiter));
    path = terminator(path, this.delimiter);
    this.insert(method, this.scope.concat(path), route);
};

Router.prototype.path = function(path, routesFn) {
    var self = this, length = this.scope.length;
    if (path.source) {
        path = path.source.replace(/\\\//ig, "/");
    }
    path = path.split(new RegExp(this.delimiter));
    path = terminator(path, this.delimiter);
    this.scope = this.scope.concat(path);
    routesFn.call(this, this);
    this.scope.splice(length, path.length);
};

Router.prototype.dispatch = function(method, path, callback) {
    var self = this, fns = this.traverse(method, path.replace(/\?.*/, ""), this.routes, ""), invoked = this._invoked, after;
    this._invoked = true;
    if (!fns || fns.length === 0) {
        this.last = [];
        if (typeof this.notfound === "function") {
            this.invoke([ this.notfound ], {
                method: method,
                path: path
            }, callback);
        }
        return false;
    }
    if (this.recurse === "forward") {
        fns = fns.reverse();
    }
    function updateAndInvoke() {
        self.last = fns.after;
        self.invoke(self.runlist(fns), self, callback);
    }
    after = this.every && this.every.after ? [ this.every.after ].concat(this.last) : [ this.last ];
    if (after && after.length > 0 && invoked) {
        if (this.async) {
            this.invoke(after, this, updateAndInvoke);
        } else {
            this.invoke(after, this);
            updateAndInvoke();
        }
        return true;
    }
    updateAndInvoke();
    return true;
};

Router.prototype.invoke = function(fns, thisArg, callback) {
    var self = this;
    var apply;
    if (this.async) {
        apply = function(fn, next) {
            if (Array.isArray(fn)) {
                return _asyncEverySeries(fn, apply, next);
            } else if (typeof fn == "function") {
                fn.apply(thisArg, (fns.captures || []).concat(next));
            }
        };
        _asyncEverySeries(fns, apply, function() {
            if (callback) {
                callback.apply(thisArg, arguments);
            }
        });
    } else {
        apply = function(fn) {
            if (Array.isArray(fn)) {
                return _every(fn, apply);
            } else if (typeof fn === "function") {
                return fn.apply(thisArg, fns.captures || []);
            } else if (typeof fn === "string" && self.resource) {
                self.resource[fn].apply(thisArg, fns.captures || []);
            }
        };
        _every(fns, apply);
    }
};

Router.prototype.traverse = function(method, path, routes, regexp, filter) {
    var fns = [], current, exact, match, next, that;
    function filterRoutes(routes) {
        if (!filter) {
            return routes;
        }
        function deepCopy(source) {
            var result = [];
            for (var i = 0; i < source.length; i++) {
                result[i] = Array.isArray(source[i]) ? deepCopy(source[i]) : source[i];
            }
            return result;
        }
        function applyFilter(fns) {
            for (var i = fns.length - 1; i >= 0; i--) {
                if (Array.isArray(fns[i])) {
                    applyFilter(fns[i]);
                    if (fns[i].length === 0) {
                        fns.splice(i, 1);
                    }
                } else {
                    if (!filter(fns[i])) {
                        fns.splice(i, 1);
                    }
                }
            }
        }
        var newRoutes = deepCopy(routes);
        newRoutes.matched = routes.matched;
        newRoutes.captures = routes.captures;
        newRoutes.after = routes.after.filter(filter);
        applyFilter(newRoutes);
        return newRoutes;
    }
    if (path === this.delimiter && routes[method]) {
        next = [ [ routes.before, routes[method] ].filter(Boolean) ];
        next.after = [ routes.after ].filter(Boolean);
        next.matched = true;
        next.captures = [];
        return filterRoutes(next);
    }
    for (var r in routes) {
        if (routes.hasOwnProperty(r) && (!this._methods[r] || this._methods[r] && typeof routes[r] === "object" && !Array.isArray(routes[r]))) {
            current = exact = regexp + this.delimiter + r;
            if (!this.strict) {
                exact += "[" + this.delimiter + "]?";
            }
            match = path.match(new RegExp("^" + exact));
            if (!match) {
                continue;
            }
            if (match[0] && match[0] == path && routes[r][method]) {
                next = [ [ routes[r].before, routes[r][method] ].filter(Boolean) ];
                next.after = [ routes[r].after ].filter(Boolean);
                next.matched = true;
                next.captures = match.slice(1);
                if (this.recurse && routes === this.routes) {
                    next.push([ routes.before, routes.on ].filter(Boolean));
                    next.after = next.after.concat([ routes.after ].filter(Boolean));
                }
                return filterRoutes(next);
            }
            next = this.traverse(method, path, routes[r], current);
            if (next.matched) {
                if (next.length > 0) {
                    fns = fns.concat(next);
                }
                if (this.recurse) {
                    fns.push([ routes[r].before, routes[r].on ].filter(Boolean));
                    next.after = next.after.concat([ routes[r].after ].filter(Boolean));
                    if (routes === this.routes) {
                        fns.push([ routes["before"], routes["on"] ].filter(Boolean));
                        next.after = next.after.concat([ routes["after"] ].filter(Boolean));
                    }
                }
                fns.matched = true;
                fns.captures = next.captures;
                fns.after = next.after;
                return filterRoutes(fns);
            }
        }
    }
    return false;
};

Router.prototype.insert = function(method, path, route, parent) {
    var methodType, parentType, isArray, nested, part;
    path = path.filter(function(p) {
        return p && p.length > 0;
    });
    parent = parent || this.routes;
    part = path.shift();
    if (/\:|\*/.test(part) && !/\\d|\\w/.test(part)) {
        part = regifyString(part, this.params);
    }
    if (path.length > 0) {
        parent[part] = parent[part] || {};
        return this.insert(method, path, route, parent[part]);
    }
    if (!part && !path.length && parent === this.routes) {
        methodType = typeof parent[method];
        switch (methodType) {
            case "function":
                parent[method] = [ parent[method], route ];
                return;
            case "object":
                parent[method].push(route);
                return;
            case "undefined":
                parent[method] = route;
                return;
        }
        return;
    }
    parentType = typeof parent[part];
    isArray = Array.isArray(parent[part]);
    if (parent[part] && !isArray && parentType == "object") {
        methodType = typeof parent[part][method];
        switch (methodType) {
            case "function":
                parent[part][method] = [ parent[part][method], route ];
                return;
            case "object":
                parent[part][method].push(route);
                return;
            case "undefined":
                parent[part][method] = route;
                return;
        }
    } else if (parentType == "undefined") {
        nested = {};
        nested[method] = route;
        parent[part] = nested;
        return;
    }
    throw new Error("Invalid route context: " + parentType);
};



Router.prototype.extend = function(methods) {
    var self = this, len = methods.length, i;
    function extend(method) {
        self._methods[method] = true;
        self[method] = function() {
            var extra = arguments.length === 1 ? [ method, "" ] : [ method ];
            self.on.apply(self, extra.concat(Array.prototype.slice.call(arguments)));
        };
    }
    for (i = 0; i < len; i++) {
        extend(methods[i]);
    }
};

Router.prototype.runlist = function(fns) {
    var runlist = this.every && this.every.before ? [ this.every.before ].concat(_flatten(fns)) : _flatten(fns);
    if (this.every && this.every.on) {
        runlist.push(this.every.on);
    }
    runlist.captures = fns.captures;
    runlist.source = fns.source;
    return runlist;
};

Router.prototype.mount = function(routes, path) {
    if (!routes || typeof routes !== "object" || Array.isArray(routes)) {
        return;
    }
    var self = this;
    path = path || [];
    if (!Array.isArray(path)) {
        path = path.split(self.delimiter);
    }
    function insertOrMount(route, local) {
        var rename = route, parts = route.split(self.delimiter), routeType = typeof routes[route], isRoute = parts[0] === "" || !self._methods[parts[0]], event = isRoute ? "on" : rename;
        if (isRoute) {
            rename = rename.slice((rename.match(new RegExp("^" + self.delimiter)) || [ "" ])[0].length);
            parts.shift();
        }
        if (isRoute && routeType === "object" && !Array.isArray(routes[route])) {
            local = local.concat(parts);
            self.mount(routes[route], local);
            return;
        }
        if (isRoute) {
            local = local.concat(rename.split(self.delimiter));
            local = terminator(local, self.delimiter);
        }
        self.insert(event, local, routes[route]);
    }
    for (var route in routes) {
        if (routes.hasOwnProperty(route)) {
            insertOrMount(route, path.slice(0));
        }
    }
};

module.exports = Router;

