(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Router"] = factory();
	else
		root["Router"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(3)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(0)
  , core      = __webpack_require__(5)
  , hide      = __webpack_require__(6)
  , redefine  = __webpack_require__(19)
  , ctx       = __webpack_require__(8)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target)redefine(target, key, out, type & $export.U);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(13)
  , createDesc = __webpack_require__(18);
module.exports = __webpack_require__(2) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(21);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(10);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

__webpack_require__(12);

__webpack_require__(22);

var _hash = __webpack_require__(34);

var _base = __webpack_require__(35);

var Router = function Router(routes) {
    if (!(this instanceof Router)) return new Router(routes);

    this.params = {};
    this.routes = {};
    this.methods = ['on', 'once', 'after', 'before'];
    this.scope = [];
    this._methods = {};

    this._insert = this.insert;
    this.insert = this.insertEx;

    this.historySupport = (window.history != null ? window.history.pushState : null) != null;

    this.config();
    this.mount(routes || {});
};

Router.prototype.init = function (r) {
    var self = this,
        routeTo;
    this.handler = function (onChangeEvent) {
        var newURL = onChangeEvent && onChangeEvent.newURL || window.location.hash;
        var url = self.history === true ? self.getPath() : newURL.replace(/.*#/, '');
        self.dispatch('on', url.charAt(0) === '/' ? url : '/' + url);
    };

    _hash.listener.init(this.handler, this.history);

    if (this.history === false) {
        if ((0, _hash.dlocHashEmpty)() && r) {
            _hash.dloc.hash = r;
        } else if (!(0, _hash.dlocHashEmpty)()) {
            self.dispatch('on', '/' + _hash.dloc.hash.replace(/^(#\/|#|\/)/, ''));
        }
    } else {
        if (this.convert_hash_in_init) {
            routeTo = (0, _hash.dlocHashEmpty)() && r ? r : !(0, _hash.dlocHashEmpty)() ? _hash.dloc.hash.replace(/^#/, '') : null;
            if (routeTo) {
                window.history.replaceState({}, document.title, routeTo);
            }
        } else {
            routeTo = this.getPath();
        }

        if (routeTo || this.run_in_init === true) {
            this.handler();
        }
    }

    return this;
};

Router.prototype.explode = function () {
    var v = this.history === true ? this.getPath() : _hash.dloc.hash;
    if (v.charAt(1) === '/') {
        v = v.slice(1);
    }
    return v.slice(1, v.length).split("/");
};

Router.prototype.setRoute = function (i, v, val) {
    var url = this.explode();

    if (typeof i === 'number' && typeof v === 'string') {
        url[i] = v;
    } else if (typeof val === 'string') {
        url.splice(i, v, s);
    } else {
        url = [i];
    }

    _hash.listener.setHash(url.join('/'));
    return url;
};

Router.prototype.insertEx = function (method, path, route, parent) {
    if (method === "once") {
        method = "on";
        route = function (route) {
            var once = false;
            return function () {
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
    } else if (typeof v === "string") {
        var h = this.explode();
        ret = h.indexOf(v);
    } else {
        ret = this.explode();
    }

    return ret;
};

Router.prototype.destroy = function () {
    _hash.listener.destroy(this.handler);
    return this;
};

Router.prototype.getPath = function () {
    var path = window.location.pathname;
    if (path.substr(0, 1) !== '/') {
        path = '/' + path;
    }
    return path;
};

Router.prototype.config = function (options) {
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

Router.prototype.param = function (token, matcher) {
    if (token[0] !== ":") {
        token = ":" + token;
    }
    var compiled = new RegExp(token, "g");
    this.params[token] = function (str) {
        return str.replace(compiled, matcher.source || matcher);
    };
    return this;
};

Router.prototype.on = Router.prototype.route = function (method, path, route) {
    var self = this;
    if (!route && typeof path == "function") {
        route = path;
        path = method;
        method = "on";
    }
    if (Array.isArray(path)) {
        return path.forEach(function (p) {
            self.on(method, p, route);
        });
    }
    if (path.source) {
        path = path.source.replace(/\\\//ig, "/");
    }
    if (Array.isArray(method)) {
        return method.forEach(function (m) {
            self.on(m.toLowerCase(), path, route);
        });
    }
    path = path.split(new RegExp(this.delimiter));
    path = (0, _base.terminator)(path, this.delimiter);
    this.insert(method, this.scope.concat(path), route);
};

Router.prototype.path = function (path, routesFn) {
    var self = this,
        length = this.scope.length;
    if (path.source) {
        path = path.source.replace(/\\\//ig, "/");
    }
    path = path.split(new RegExp(this.delimiter));
    path = (0, _base.terminator)(path, this.delimiter);
    this.scope = this.scope.concat(path);
    routesFn.call(this, this);
    this.scope.splice(length, path.length);
};

Router.prototype.dispatch = function (method, path, callback) {
    var self = this,
        fns = this.traverse(method, path.replace(/\?.*/, ""), this.routes, ""),
        invoked = this._invoked,
        after;
    this._invoked = true;
    if (!fns || fns.length === 0) {
        this.last = [];
        if (typeof this.notfound === "function") {
            this.invoke([this.notfound], {
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
    after = this.every && this.every.after ? [this.every.after].concat(this.last) : [this.last];
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

Router.prototype.invoke = function (fns, thisArg, callback) {
    var self = this;
    var _apply2;
    if (this.async) {
        _apply2 = function apply(fn, next) {
            if (Array.isArray(fn)) {
                return (0, _base._asyncEverySeries)(fn, _apply2, next);
            } else if (typeof fn == "function") {
                fn.apply(thisArg, (fns.captures || []).concat(next));
            }
        };
        (0, _base._asyncEverySeries)(fns, _apply2, function () {
            if (callback) {
                callback.apply(thisArg, arguments);
            }
        });
    } else {
        _apply2 = function _apply(fn) {
            if (Array.isArray(fn)) {
                return (0, _base._every)(fn, _apply2);
            } else if (typeof fn === "function") {
                return fn.apply(thisArg, fns.captures || []);
            } else if (typeof fn === "string" && self.resource) {
                self.resource[fn].apply(thisArg, fns.captures || []);
            }
        };
        (0, _base._every)(fns, _apply2);
    }
};

Router.prototype.traverse = function (method, path, routes, regexp, filter) {
    var fns = [],
        current,
        exact,
        match,
        next,
        that;
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
        next = [[routes.before, routes[method]].filter(Boolean)];
        next.after = [routes.after].filter(Boolean);
        next.matched = true;
        next.captures = [];
        return filterRoutes(next);
    }
    for (var r in routes) {
        if (routes.hasOwnProperty(r) && (!this._methods[r] || this._methods[r] && _typeof(routes[r]) === "object" && !Array.isArray(routes[r]))) {
            current = exact = regexp + this.delimiter + r;
            if (!this.strict) {
                exact += "[" + this.delimiter + "]?";
            }
            match = path.match(new RegExp("^" + exact));
            if (!match) {
                continue;
            }
            if (match[0] && match[0] == path && routes[r][method]) {
                next = [[routes[r].before, routes[r][method]].filter(Boolean)];
                next.after = [routes[r].after].filter(Boolean);
                next.matched = true;
                next.captures = match.slice(1);
                if (this.recurse && routes === this.routes) {
                    next.push([routes.before, routes.on].filter(Boolean));
                    next.after = next.after.concat([routes.after].filter(Boolean));
                }
                return filterRoutes(next);
            }
            next = this.traverse(method, path, routes[r], current);
            if (next.matched) {
                if (next.length > 0) {
                    fns = fns.concat(next);
                }
                if (this.recurse) {
                    fns.push([routes[r].before, routes[r].on].filter(Boolean));
                    next.after = next.after.concat([routes[r].after].filter(Boolean));
                    if (routes === this.routes) {
                        fns.push([routes["before"], routes["on"]].filter(Boolean));
                        next.after = next.after.concat([routes["after"]].filter(Boolean));
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

Router.prototype.insert = function (method, path, route, parent) {
    var methodType, parentType, isArray, nested, part;
    path = path.filter(function (p) {
        return p && p.length > 0;
    });
    parent = parent || this.routes;
    part = path.shift();
    if (/\:|\*/.test(part) && !/\\d|\\w/.test(part)) {
        part = (0, _base.regifyString)(part, this.params);
    }
    if (path.length > 0) {
        parent[part] = parent[part] || {};
        return this.insert(method, path, route, parent[part]);
    }
    if (!part && !path.length && parent === this.routes) {
        methodType = _typeof(parent[method]);
        switch (methodType) {
            case "function":
                parent[method] = [parent[method], route];
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
    parentType = _typeof(parent[part]);
    isArray = Array.isArray(parent[part]);
    if (parent[part] && !isArray && parentType == "object") {
        methodType = _typeof(parent[part][method]);
        switch (methodType) {
            case "function":
                parent[part][method] = [parent[part][method], route];
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

Router.prototype.extend = function (methods) {
    var self = this,
        len = methods.length,
        i;
    function extend(method) {
        self._methods[method] = true;
        self[method] = function () {
            var extra = arguments.length === 1 ? [method, ""] : [method];
            self.on.apply(self, extra.concat(Array.prototype.slice.call(arguments)));
        };
    }
    for (i = 0; i < len; i++) {
        extend(methods[i]);
    }
};

Router.prototype.runlist = function (fns) {
    var runlist = this.every && this.every.before ? [this.every.before].concat((0, _base._flatten)(fns)) : (0, _base._flatten)(fns);
    if (this.every && this.every.on) {
        runlist.push(this.every.on);
    }
    runlist.captures = fns.captures;
    runlist.source = fns.source;
    return runlist;
};

Router.prototype.mount = function (routes, path) {
    if (!routes || (typeof routes === 'undefined' ? 'undefined' : _typeof(routes)) !== "object" || Array.isArray(routes)) {
        return;
    }
    var self = this;
    path = path || [];
    if (!Array.isArray(path)) {
        path = path.split(self.delimiter);
    }
    function insertOrMount(route, local) {
        var rename = route,
            parts = route.split(self.delimiter),
            routeType = _typeof(routes[route]),
            isRoute = parts[0] === "" || !self._methods[parts[0]],
            event = isRoute ? "on" : rename;
        if (isRoute) {
            rename = rename.slice((rename.match(new RegExp("^" + self.delimiter)) || [""])[0].length);
            parts.shift();
        }
        if (isRoute && routeType === "object" && !Array.isArray(routes[route])) {
            local = local.concat(parts);
            self.mount(routes[route], local);
            return;
        }
        if (isRoute) {
            local = local.concat(rename.split(self.delimiter));
            local = (0, _base.terminator)(local, self.delimiter);
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

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(4);

$export($export.S, 'Array', {isArray: __webpack_require__(9)});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(14)
  , IE8_DOM_DEFINE = __webpack_require__(15)
  , toPrimitive    = __webpack_require__(17)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(2) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(2) && !__webpack_require__(3)(function(){
  return Object.defineProperty(__webpack_require__(16)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1)
  , document = __webpack_require__(0).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(1);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(0)
  , hide      = __webpack_require__(6)
  , has       = __webpack_require__(20)
  , SRC       = __webpack_require__(7)('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

__webpack_require__(5).inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  var isFunction = typeof val == 'function';
  if(isFunction)has(val, 'name') || hide(val, 'name', key);
  if(O[key] === val)return;
  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if(O === global){
    O[key] = val;
  } else {
    if(!safe){
      delete O[key];
      hide(O, key, val);
    } else {
      if(O[key])O[key] = val;
      else hide(O, key, val);
    }
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

/***/ }),
/* 20 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(4)
  , $filter = __webpack_require__(23)(2);

$export($export.P + $export.F * !__webpack_require__(33)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */){
    return $filter(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = __webpack_require__(8)
  , IObject  = __webpack_require__(24)
  , toObject = __webpack_require__(25)
  , toLength = __webpack_require__(27)
  , asc      = __webpack_require__(29);
module.exports = function(TYPE, $create){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
    , create        = $create || asc;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(10);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(26);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(28)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 28 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(30);

module.exports = function(original, length){
  return new (speciesConstructor(original))(length);
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1)
  , isArray  = __webpack_require__(9)
  , SPECIES  = __webpack_require__(31)('species');

module.exports = function(original){
  var C;
  if(isArray(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return C === undefined ? Array : C;
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(32)('wks')
  , uid        = __webpack_require__(7)
  , Symbol     = __webpack_require__(0).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(3);

module.exports = function(method, arg){
  return !!method && fails(function(){
    arg ? method.call(null, function(){}, 1) : method.call(null);
  });
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var dloc = document.location;

function dlocHashEmpty() {
    return dloc.hash === '' || dloc.hash === '#';
}

var listener = {
    mode: 'modern',
    hash: dloc.hash,
    history: false,

    check: function check() {
        var h = dloc.hash;
        if (h != this.hash) {
            this.hash = h;
            this.onHashChanged();
        }
    },

    fire: function fire() {
        if (this.mode === 'modern') {
            this.history === true ? window.onpopstate() : window.onhashchange();
        } else {
            this.onHashChanged();
        }
    },

    init: function init(fn, history) {
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

        if ('onhashchange' in window && (document.documentMode === undefined || document.documentMode > 7)) {
            if (this.history === true) {
                setTimeout(function () {
                    window.onpopstate = onchange;
                }, 500);
            } else {
                window.onhashchange = onchange;
            }
            this.mode = 'modern';
        } else {
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

    destroy: function destroy(fn) {
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

    setHash: function setHash(s) {
        if (this.mode === 'legacy') {
            this.writeFrame(s);
        }

        if (this.history === true) {
            window.history.pushState({}, document.title, s);

            this.fire();
        } else {
            dloc.hash = s[0] === '/' ? s : '/' + s;
        }
        return this;
    },

    writeFrame: function writeFrame(s) {
        var f = document.getElementById('state-frame');
        var d = f.contentDocument || f.contentWindow.document;
        d.open();
        d.write("<script>_hash = '" + s + "'; onload = parent.listener.syncHash;<script>");
        d.close();
    },

    syncHash: function syncHash() {
        var s = this._hash;
        if (s != dloc.hash) {
            dloc.hash = s;
        }
        return this;
    },

    onHashChanged: function onHashChanged() {}
};

module.exports = { dloc: dloc, dlocHashEmpty: dlocHashEmpty, listener: listener };

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
                callback = function callback() {};
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
    var matches,
        last = 0,
        out = "";
    while (matches = str.substr(last).match(/[^\w\d\- %@&]*\*[^\w\d\- %@&]*/)) {
        last = matches.index + matches[0].length;
        matches[0] = matches[0].replace(/^\*/, "([_.()!\\ %@&a-zA-Z0-9-]+)");
        out += str.substr(0, matches.index) + matches[0];
    }
    str = out += str.substr(last);
    var captures = str.match(/:([^\/]+)/ig),
        capture,
        length;
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
    var last = 0,
        left = 0,
        right = 0,
        start = (start || "(").toString(),
        stop = (stop || ")").toString(),
        i;
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

module.exports = { _every: _every, _flatten: _flatten, _asyncEverySeries: _asyncEverySeries, paramifyString: paramifyString, regifyString: regifyString, terminator: terminator };

/***/ })
/******/ ]);
});