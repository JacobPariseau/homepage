/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "docs/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

__webpack_require__(2);

var _navigo = __webpack_require__(3);

var _navigo2 = _interopRequireDefault(_navigo);

var _home = __webpack_require__(4);

var _home2 = _interopRequireDefault(_home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = void 0;

document.addEventListener('DOMContentLoaded', initRouter);

function initRouter() {
    if (router) {
        document.removeEventListener('DOMContentLoaded', initRouter);
        return;
    }

    var root = "http://localhost:8000/";
    console.log(root);
    router = new _navigo2.default(root);
    router.on({
        /*'foo/:id': params => {
            loadScene(new FooScene(), params)
        },*/
        '': function _() {
            return loadScene(new _home2.default(router));
        },
        '*': function _() {
            return router.navigate('');
        }
    }).resolve();
}

// We use the load and render methods instead of the constructor
// Because this way we can hijack the render to execute after the load
function loadScene(scene, params) {
    if (scene.ABORT) return router.navigate('/');
    scene.onRender = function () {
        var entry = document.getElementById("yield");
        entry.innerHTML = "";
        entry.appendChild(scene.render());
        scene.postRender();
    };
    scene.load(params);
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function isPushStateAvailable() {
    return !!(typeof window !== 'undefined' && window.history && window.history.pushState);
}

function Navigo(r, useHash, hash) {
    this.root = null;
    this._routes = [];
    this._useHash = useHash;
    this._hash = typeof hash === 'undefined' ? '#' : hash;
    this._paused = false;
    this._destroyed = false;
    this._lastRouteResolved = null;
    this._notFoundHandler = null;
    this._defaultHandler = null;
    this._usePushState = !useHash && isPushStateAvailable();
    this._onLocationChange = this._onLocationChange.bind(this);
    this._genericHooks = null;
    this._historyAPIUpdateMethod = 'pushState';

    if (r) {
        this.root = useHash ? r.replace(/\/$/, '/' + this._hash) : r.replace(/\/$/, '');
    } else if (useHash) {
        this.root = this._cLoc().split(this._hash)[0].replace(/\/$/, '/' + this._hash);
    }

    this._listen();
    this.updatePageLinks();
}

function clean(s) {
    if (s instanceof RegExp) return s;
    return s.replace(/\/+$/, '').replace(/^\/+/, '^/');
}

function regExpResultToParams(match, names) {
    if (names.length === 0) return null;
    if (!match) return null;
    return match.slice(1, match.length).reduce(function (params, value, index) {
        if (params === null) params = {};
        params[names[index]] = decodeURIComponent(value);
        return params;
    }, null);
}

function replaceDynamicURLParts(route) {
    var paramNames = [],
        regexp;

    if (route instanceof RegExp) {
        regexp = route;
    } else {
        regexp = new RegExp(route.replace(Navigo.PARAMETER_REGEXP, function (full, dots, name) {
            paramNames.push(name);
            return Navigo.REPLACE_VARIABLE_REGEXP;
        }).replace(Navigo.WILDCARD_REGEXP, Navigo.REPLACE_WILDCARD) + Navigo.FOLLOWED_BY_SLASH_REGEXP, Navigo.MATCH_REGEXP_FLAGS);
    }
    return { regexp: regexp, paramNames: paramNames };
}

function getUrlDepth(url) {
    return url.replace(/\/$/, '').split('/').length;
}

function compareUrlDepth(urlA, urlB) {
    return getUrlDepth(urlB) - getUrlDepth(urlA);
}

function findMatchedRoutes(url) {
    var routes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    return routes.map(function (route) {
        var _replaceDynamicURLPar = replaceDynamicURLParts(clean(route.route)),
            regexp = _replaceDynamicURLPar.regexp,
            paramNames = _replaceDynamicURLPar.paramNames;

        var match = url.replace(/^\/+/, '/').match(regexp);
        var params = regExpResultToParams(match, paramNames);

        return match ? { match: match, route: route, params: params } : false;
    }).filter(function (m) {
        return m;
    });
}

function match(url, routes) {
    return findMatchedRoutes(url, routes)[0] || false;
}

function root(url, routes) {
    var matched = routes.map(function (route) {
        return route.route === '' || route.route === '*' ? url : url.split(new RegExp(route.route + '($|\/)'))[0];
    });
    var fallbackURL = clean(url);

    if (matched.length > 1) {
        return matched.reduce(function (result, url) {
            if (result.length > url.length) result = url;
            return result;
        }, matched[0]);
    } else if (matched.length === 1) {
        return matched[0];
    }
    return fallbackURL;
}

function isHashChangeAPIAvailable() {
    return !!(typeof window !== 'undefined' && 'onhashchange' in window);
}

function extractGETParameters(url) {
    return url.split(/\?(.*)?$/).slice(1).join('');
}

function getOnlyURL(url, useHash, hash) {
    var onlyURL = url,
        split;
    var cleanGETParam = function cleanGETParam(str) {
        return str.split(/\?(.*)?$/)[0];
    };

    if (typeof hash === 'undefined') {
        // To preserve BC
        hash = '#';
    }

    if (isPushStateAvailable() && !useHash) {
        onlyURL = cleanGETParam(url).split(hash)[0];
    } else {
        split = url.split(hash);
        onlyURL = split.length > 1 ? cleanGETParam(split[1]) : cleanGETParam(split[0]);
    }

    return onlyURL;
}

function manageHooks(handler, hooks, params) {
    if (hooks && (typeof hooks === 'undefined' ? 'undefined' : _typeof(hooks)) === 'object') {
        if (hooks.before) {
            hooks.before(function () {
                var shouldRoute = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

                if (!shouldRoute) return;
                handler();
                hooks.after && hooks.after(params);
            }, params);
        } else if (hooks.after) {
            handler();
            hooks.after && hooks.after(params);
        }
        return;
    }
    handler();
};

function isHashedRoot(url, useHash, hash) {
    if (isPushStateAvailable() && !useHash) {
        return false;
    }

    if (!url.match(hash)) {
        return false;
    }

    var split = url.split(hash);

    if (split.length < 2 || split[1] === '') {
        return true;
    }

    return false;
};

Navigo.prototype = {
    helpers: {
        match: match,
        root: root,
        clean: clean,
        getOnlyURL: getOnlyURL
    },
    navigate: function navigate(path, absolute) {
        var to;

        path = path || '';
        if (this._usePushState) {
            to = (!absolute ? this._getRoot() + '/' : '') + path.replace(/^\/+/, '/');
            to = to.replace(/([^:])(\/{2,})/g, '$1/');
            history[this._historyAPIUpdateMethod]({}, '', to);
            this.resolve();
        } else if (typeof window !== 'undefined') {
            path = path.replace(new RegExp('^' + this._hash), '');
            window.location.href = window.location.href.replace(/#$/, '').replace(new RegExp(this._hash + '.*$'), '') + this._hash + path;
        }
        return this;
    },
    on: function on() {
        var _this = this;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        if (typeof args[0] === 'function') {
            this._defaultHandler = { handler: args[0], hooks: args[1] };
        } else if (args.length >= 2) {
            if (args[0] === '/') {
                var func = args[1];

                if (_typeof(args[1]) === 'object') {
                    func = args[1].uses;
                }

                this._defaultHandler = { handler: func, hooks: args[2] };
            } else {
                this._add(args[0], args[1], args[2]);
            }
        } else if (_typeof(args[0]) === 'object') {
            var orderedRoutes = Object.keys(args[0]).sort(compareUrlDepth);

            orderedRoutes.forEach(function (route) {
                _this.on(route, args[0][route]);
            });
        }
        return this;
    },
    off: function off(handler) {
        if (this._defaultHandler !== null && handler === this._defaultHandler.handler) {
            this._defaultHandler = null;
        } else if (this._notFoundHandler !== null && handler === this._notFoundHandler.handler) {
            this._notFoundHandler = null;
        }
        this._routes = this._routes.reduce(function (result, r) {
            if (r.handler !== handler) result.push(r);
            return result;
        }, []);
        return this;
    },
    notFound: function notFound(handler, hooks) {
        this._notFoundHandler = { handler: handler, hooks: hooks };
        return this;
    },
    resolve: function resolve(current) {
        var _this2 = this;

        var handler, m;
        var url = (current || this._cLoc()).replace(this._getRoot(), '');

        if (this._useHash) {
            url = url.replace(new RegExp('^\/' + this._hash), '/');
        }

        var GETParameters = extractGETParameters(current || this._cLoc());
        var onlyURL = getOnlyURL(url, this._useHash, this._hash);

        if (this._paused) return false;

        if (this._lastRouteResolved && onlyURL === this._lastRouteResolved.url && GETParameters === this._lastRouteResolved.query) {
            if (this._lastRouteResolved.hooks && this._lastRouteResolved.hooks.already) {
                this._lastRouteResolved.hooks.already(this._lastRouteResolved.params);
            }
            return false;
        }

        m = match(onlyURL, this._routes);

        if (m) {
            this._callLeave();
            this._lastRouteResolved = {
                url: onlyURL,
                query: GETParameters,
                hooks: m.route.hooks,
                params: m.params,
                name: m.route.name
            };
            handler = m.route.handler;
            manageHooks(function () {
                manageHooks(function () {
                    m.route.route instanceof RegExp ? handler.apply(undefined, _toConsumableArray(m.match.slice(1, m.match.length))) : handler(m.params, GETParameters);
                }, m.route.hooks, m.params, _this2._genericHooks);
            }, this._genericHooks, m.params);
            return m;
        } else if (this._defaultHandler && (onlyURL === '' || onlyURL === '/' || onlyURL === this._hash || isHashedRoot(onlyURL, this._useHash, this._hash))) {
            manageHooks(function () {
                manageHooks(function () {
                    _this2._callLeave();
                    _this2._lastRouteResolved = { url: onlyURL, query: GETParameters, hooks: _this2._defaultHandler.hooks };
                    _this2._defaultHandler.handler(GETParameters);
                }, _this2._defaultHandler.hooks);
            }, this._genericHooks);
            return true;
        } else if (this._notFoundHandler) {
            manageHooks(function () {
                manageHooks(function () {
                    _this2._callLeave();
                    _this2._lastRouteResolved = { url: onlyURL, query: GETParameters, hooks: _this2._notFoundHandler.hooks };
                    _this2._notFoundHandler.handler(GETParameters);
                }, _this2._notFoundHandler.hooks);
            }, this._genericHooks);
        }
        return false;
    },
    destroy: function destroy() {
        this._routes = [];
        this._destroyed = true;
        clearTimeout(this._listeningInterval);
        if (typeof window !== 'undefined') {
            window.removeEventListener('popstate', this._onLocationChange);
            window.removeEventListener('hashchange', this._onLocationChange);
        }
    },
    updatePageLinks: function updatePageLinks() {
        var self = this;

        if (typeof document === 'undefined') return;

        this._findLinks().forEach(function (link) {
            if (!link.hasListenerAttached) {
                link.addEventListener('click', function (e) {
                    var location = self.getLinkPath(link);

                    if (!self._destroyed) {
                        e.preventDefault();
                        self.navigate(location.replace(/\/+$/, '').replace(/^\/+/, '/'));
                    }
                });
                link.hasListenerAttached = true;
            }
        });
    },
    generate: function generate(name) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var result = this._routes.reduce(function (result, route) {
            var key;

            if (route.name === name) {
                result = route.route;
                for (key in data) {
                    result = result.toString().replace(':' + key, data[key]);
                }
            }
            return result;
        }, '');

        return this._useHash ? this._hash + result : result;
    },
    link: function link(path) {
        return this._getRoot() + path;
    },
    pause: function pause() {
        var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        this._paused = status;
        if (status) {
            this._historyAPIUpdateMethod = 'replaceState';
        } else {
            this._historyAPIUpdateMethod = 'pushState';
        }
    },
    resume: function resume() {
        this.pause(false);
    },
    historyAPIUpdateMethod: function historyAPIUpdateMethod(value) {
        if (typeof value === 'undefined') return this._historyAPIUpdateMethod;
        this._historyAPIUpdateMethod = value;
        return value;
    },
    disableIfAPINotAvailable: function disableIfAPINotAvailable() {
        if (!isPushStateAvailable()) {
            this.destroy();
        }
    },
    lastRouteResolved: function lastRouteResolved() {
        return this._lastRouteResolved;
    },
    getLinkPath: function getLinkPath(link) {
        return link.getAttribute('href');
    },
    hooks: function hooks(_hooks) {
        this._genericHooks = _hooks;
    },

    _add: function _add(route) {
        var handler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var hooks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

        if (typeof route === 'string') {
            route = encodeURI(route);
        }
        if ((typeof handler === 'undefined' ? 'undefined' : _typeof(handler)) === 'object') {
            this._routes.push({
                route: route,
                handler: handler.uses,
                name: handler.as,
                hooks: hooks || handler.hooks
            });
        } else {
            this._routes.push({ route: route, handler: handler, hooks: hooks });
        }
        return this._add;
    },
    _getRoot: function _getRoot() {
        if (this.root !== null) return this.root;
        this.root = root(this._cLoc().split('?')[0], this._routes);
        return this.root;
    },
    _listen: function _listen() {
        var _this3 = this;

        if (this._usePushState) {
            window.addEventListener('popstate', this._onLocationChange);
        } else if (isHashChangeAPIAvailable()) {
            window.addEventListener('hashchange', this._onLocationChange);
        } else {
            var cached = this._cLoc(),
                current = void 0,
                _check = void 0;

            _check = function check() {
                current = _this3._cLoc();
                if (cached !== current) {
                    cached = current;
                    _this3.resolve();
                }
                _this3._listeningInterval = setTimeout(_check, 200);
            };
            _check();
        }
    },
    _cLoc: function _cLoc() {
        if (typeof window !== 'undefined') {
            if (typeof window.__NAVIGO_WINDOW_LOCATION_MOCK__ !== 'undefined') {
                return window.__NAVIGO_WINDOW_LOCATION_MOCK__;
            }
            return clean(window.location.href);
        }
        return '';
    },
    _findLinks: function _findLinks() {
        return [].slice.call(document.querySelectorAll('[data-navigo]'));
    },
    _onLocationChange: function _onLocationChange() {
        this.resolve();
    },
    _callLeave: function _callLeave() {
        if (this._lastRouteResolved && this._lastRouteResolved.hooks && this._lastRouteResolved.hooks.leave) {
            this._lastRouteResolved.hooks.leave();
        }
    }
};

Navigo.PARAMETER_REGEXP = /([:*])(\w+)/g;
Navigo.WILDCARD_REGEXP = /\*/g;
Navigo.REPLACE_VARIABLE_REGEXP = '([^\/]+)';
Navigo.REPLACE_WILDCARD = '(?:.*)';
Navigo.FOLLOWED_BY_SLASH_REGEXP = '(?:\/$|$)';
Navigo.MATCH_REGEXP_FLAGS = '';

exports.default = Navigo;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _apiservice = __webpack_require__(5);

var _apiservice2 = _interopRequireDefault(_apiservice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function __setAttributes(element, attributes) {
    var isPlainObject = Object.prototype.toString.call(attributes) === '[object Object]' && typeof attributes.constructor === 'function' && Object.prototype.toString.call(attributes.constructor.prototype) === '[object Object]' && attributes.constructor.prototype.hasOwnProperty('isPrototypeOf');
    if (isPlainObject) {
        for (var key in attributes) {
            element.setAttribute(key, attributes[key]);
        }
    } else {
        throw new DOMException('Failed to execute \'setAttributes\' on \'Element\': ' + Object.prototype.toString.call(attributes) + ' is not a plain object.');
    }
}
function __setStyles(element, styles) {
    for (var style in styles) {
        element.style[style] = styles[style];
    }
}
function __appendChildren(element, children) {
    children = Array.isArray(children) ? children : [children];
    children.forEach(function (child) {
        if (child instanceof HTMLElement) {
            element.appendChild(child);
        } else if (child || typeof child === 'string') {
            element.appendChild(document.createTextNode(child.toString()));
        }
    });
}

var api = new _apiservice2.default();

var HomeScene = function () {
    function HomeScene(router) {
        _classCallCheck(this, HomeScene);

        this.router = router;
    }

    _createClass(HomeScene, [{
        key: 'load',
        value: function load() {
            this.onReady();
        }
    }, {
        key: 'onReady',
        value: function onReady() {
            this.onRender();
        }
    }, {
        key: 'render',
        value: function render() {
            return function () {
                var $$a = document.createElement('main');
                $$a.setAttribute('class', 'scene-home');
                var $$b = document.createElement('section');
                $$b.setAttribute('class', 'modern-section darken img-hero');
                $$a.appendChild($$b);
                var $$c = document.createElement('h1');
                $$c.setAttribute('class', 'text-center');
                $$b.appendChild($$c);
                var $$d = document.createTextNode('Hi, I\'m Jacob');
                $$c.appendChild($$d);
                var $$e = document.createElement('p');
                $$e.setAttribute('class', 'text-center');
                $$b.appendChild($$e);
                var $$f = document.createTextNode(' I\'m a full stack systems engineer from Alberta ');
                $$e.appendChild($$f);
                var $$g = document.createElement('section');
                $$g.setAttribute('class', 'modern-card');
                $$a.appendChild($$g);
                var $$h = document.createElement('h2');
                $$g.appendChild($$h);
                var $$i = document.createTextNode(' Hexagon Game Platform ');
                $$h.appendChild($$i);
                var $$j = document.createElement('p');
                $$g.appendChild($$j);
                var $$k = document.createTextNode(' Hexagon is a mobile game platform for card based games. The engine allows players to connect from their own devices -- or even share devices if they want to pass them around -- and play round after round of minigames. These minigames are coded as Hexagon Modules and once uploaded to the platform can be loaded as easily as drawing from a deck of cards.');
                $$j.appendChild($$k);
                var $$l = document.createElement('section');
                $$l.setAttribute('class', 'modern-card');
                $$a.appendChild($$l);
                var $$m = document.createElement('h2');
                $$l.appendChild($$m);
                var $$n = document.createTextNode(' Assets Inventory Management System ');
                $$m.appendChild($$n);
                var $$o = document.createElement('p');
                $$l.appendChild($$o);
                var $$p = document.createTextNode(' Assets is an enterprise grade inventory management system. Import libraries of items, sign them out to employees or customers, and print detailed reports tracking transactions and billables.');
                $$o.appendChild($$p);
                var $$q = document.createElement('section');
                $$q.setAttribute('class', 'modern-card');
                $$a.appendChild($$q);
                var $$r = document.createElement('div');
                $$r.setAttribute('class', 'modern-card-image-container img-firecup');
                $$q.appendChild($$r);
                var $$s = document.createElement('h2');
                $$q.appendChild($$s);
                var $$t = document.createTextNode(' Firecup Party Game ');
                $$s.appendChild($$t);
                var $$u = document.createElement('p');
                $$q.appendChild($$u);
                var $$v = document.createTextNode(' Firecup is an online party game in the style of King\'s Cup with thousands of cards, challenges, traps, and actions. I am currently converting it to a Hexagon Module.');
                $$u.appendChild($$v);
                var $$w = document.createElement('section');
                $$w.setAttribute('class', 'modern-card');
                $$a.appendChild($$w);
                var $$x = document.createElement('div');
                $$x.setAttribute('class', 'modern-card-image-container img-magicfireball');
                $$w.appendChild($$x);
                var $$y = document.createElement('h2');
                $$w.appendChild($$y);
                var $$z = document.createTextNode(' Magic Fireball ');
                $$y.appendChild($$z);
                var $$aa = document.createElement('p');
                $$w.appendChild($$aa);
                var $$bb = document.createTextNode(' The Magic Fireball is like a Magic 8-Ball for drinking game rules and challenges. Shake the ball, get a rule.');
                $$aa.appendChild($$bb);
                var $$cc = document.createElement('footer');
                $$w.appendChild($$cc);
                var $$dd = document.createElement('a');
                $$dd.setAttribute('class', 'cyan-text');
                $$dd.setAttribute('href', 'https://www.magicfireball.com/');
                $$cc.appendChild($$dd);
                var $$ee = document.createTextNode('VISIT');
                $$dd.appendChild($$ee);
                var $$ff = document.createElement('section');
                $$ff.setAttribute('class', 'modern-card');
                $$a.appendChild($$ff);
                var $$gg = document.createElement('div');
                $$gg.setAttribute('class', 'modern-card-image-container img-masquerade');
                $$ff.appendChild($$gg);
                var $$hh = document.createElement('h2');
                $$ff.appendChild($$hh);
                var $$ii = document.createTextNode(' Masquerade ');
                $$hh.appendChild($$ii);
                var $$jj = document.createElement('p');
                $$ff.appendChild($$jj);
                var $$kk = document.createTextNode(' Masquerade was an anonymous social network much like a combination of Yik Yak and Reddit. While initially popular, the community grew toxic and the site had to be shut down after only a few months. ');
                $$jj.appendChild($$kk);
                var $$ll = document.createElement('section');
                $$ll.setAttribute('class', 'modern-section');
                $$a.appendChild($$ll);
                var $$mm = document.createElement('h1');
                $$mm.setAttribute('class', 'text-center');
                $$ll.appendChild($$mm);
                var $$nn = document.createTextNode('I\'m available for hire; get in touch');
                $$mm.appendChild($$nn);
                var $$oo = document.createElement('ul');
                $$oo.setAttribute('class', 'social-links');
                $$ll.appendChild($$oo);
                var $$pp = document.createElement('li');
                $$pp.setAttribute('class', 'social-link');
                $$oo.appendChild($$pp);
                var $$qq = document.createElement('a');
                $$qq.setAttribute('href', 'mailto://web@jacobpariseau.com');
                $$qq.setAttribute('class', 'img-email');
                $$pp.appendChild($$qq);
                var $$rr = document.createElement('li');
                $$rr.setAttribute('class', 'social-link');
                $$oo.appendChild($$rr);
                var $$ss = document.createElement('a');
                $$ss.setAttribute('href', 'https://twitter.com/jacobpariseau');
                $$ss.setAttribute('class', 'img-twitter');
                $$rr.appendChild($$ss);
                var $$tt = document.createElement('li');
                $$tt.setAttribute('class', 'social-link');
                $$oo.appendChild($$tt);
                var $$uu = document.createElement('a');
                $$uu.setAttribute('href', 'https://snapchat.com/add/jacobpariseau');
                $$uu.setAttribute('class', 'img-snapchat');
                $$tt.appendChild($$uu);
                var $$vv = document.createElement('li');
                $$vv.setAttribute('class', 'social-link');
                $$oo.appendChild($$vv);
                var $$ww = document.createElement('a');
                $$ww.setAttribute('href', 'https://github.com/jacobpariseau');
                $$ww.setAttribute('class', 'img-github');
                $$vv.appendChild($$ww);
                return $$a;
            }.call(this);
        }
    }, {
        key: 'onRender',
        value: function onRender() {
            console.log('Scene Improperly Loaded');
        }
    }, {
        key: 'postRender',
        value: function postRender() {
            console.log('Render completed');
        }
    }]);

    return HomeScene;
}();

exports.default = HomeScene;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var host = "http://localhost:8000/";

var APIService = function () {
    function APIService() {
        _classCallCheck(this, APIService);
    }

    _createClass(APIService, [{
        key: "get",
        value: function get(endpoint) {
            return makeRequest({ method: "GET", url: host + endpoint });
        }
    }, {
        key: "post",
        value: function post(endpoint, body) {
            return makeRequest({ method: "POST", url: host + endpoint, params: body });
        }
    }, {
        key: "put",
        value: function put(endpoint, body) {
            return makeRequest({ method: "PUT", url: host + endpoint, params: body });
        }
    }, {
        key: "delete",
        value: function _delete(endpoint, body) {
            return makeRequest({ method: "DELETE", url: host + endpoint, params: body });
        }
    }]);

    return APIService;
}();

exports.default = APIService;


function makeRequest(options) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();

        xhr.open(options.method, options.url);

        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };

        xhr.onerror = reject;

        if (options.headers) {
            Object.keys(options.headers).forEach(function (key) {
                xhr.setRequestHeader(key, options.headers[key]);
            });
        }

        var params = options.params;

        if (options.method == "GET") {
            // We'll need to stringify if we've been given an object
            // If we have a string, this is skipped.
            if (params && (typeof params === "undefined" ? "undefined" : _typeof(params)) === 'object') {
                params = Object.keys(params).map(function (key) {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
                }).join('&');
            }
        }

        if (options.method == "POST" || options.method == "PUT" || options.method == "DELETE") {
            xhr.setRequestHeader("Content-Type", "application/json");
            if (params && (typeof params === "undefined" ? "undefined" : _typeof(params)) === 'object') {
                params = JSON.stringify(params);
            }
        }

        console.log(params);
        xhr.send(params);
    });
}

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map