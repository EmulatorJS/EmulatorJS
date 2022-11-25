var EJS = function(_0x574f5e) {
    window.EJS_MODULES = _0x574f5e;
    var _0x41a1e4 = {};
    var o = [];
    function _0x1d686b(_0x289550) {
        if (_0x41a1e4[_0x289550]) return _0x41a1e4[_0x289550].exports;
        o.push(_0x289550)
        var _0x4f6398 = _0x41a1e4[_0x289550] = {
            'i': _0x289550,
            'l': false,
            'exports': {}
        };
        return _0x574f5e[_0x289550].call(_0x4f6398.exports, _0x4f6398, _0x4f6398.exports, _0x1d686b), _0x4f6398.l = true, _0x4f6398.exports;
    }
    window.getUsedModules = function() {
        return o.sort(function(a, b) {
            return (a > b) ? 1 : -1;
        });
    }
    window.getUnusedModules = function() {
        var rv = [];
        var q = getUsedModules();
        for (var i=0; i<_0x574f5e.length; i++) {
            if (_0x574f5e[i] === null) continue;
            if (!q.includes(i)) rv.push(i);
        }
        return rv;
    }
    if (!typeof Array.isArray == 'function') {
        var _0x484695 = {}.toString;
        Array.isArray = function(_0xd04970) {
            return '[object Array]' == _0x484695.call(_0xd04970);
        };
    }
    _0x1d686b.m = _0x574f5e;
    _0x1d686b.c = _0x41a1e4;
    _0x1d686b.d = function(_0x3c0e40, _0x5aa193, _0x1a35d2) {
        _0x1d686b.o(_0x3c0e40, _0x5aa193) || Object.defineProperty(_0x3c0e40, _0x5aa193, {
            'enumerable': true,
            'get': _0x1a35d2
        });
    };
    _0x1d686b.r = function(_0x4668d1) {
        'undefined' != typeof Symbol && Symbol.toStringTag && Object.defineProperty(_0x4668d1, Symbol.toStringTag, {
            'value': 'Module'
        }), Object.defineProperty(_0x4668d1, '__esModule', {
            'value': true
        });
    };
    _0x1d686b.t = function(_0xb8bed8, _0x43e71a) {
        if (0x1 & _0x43e71a && (_0xb8bed8 = _0x1d686b(_0xb8bed8)), 0x8 & _0x43e71a) return _0xb8bed8;
        if (0x4 & _0x43e71a && 'object' == typeof _0xb8bed8 && _0xb8bed8 && _0xb8bed8.__esModule) return _0xb8bed8;
        var _0x300168 = Object.create(null);
        if (_0x1d686b.r(_0x300168), Object.defineProperty(_0x300168, 'default', {
                'enumerable': true,
                'value': _0xb8bed8
            }), 0x2 & _0x43e71a && 'string' != typeof _0xb8bed8)
            for (var _0xbd7857 in _0xb8bed8) _0x1d686b.d(_0x300168, _0xbd7857, function(_0x811a86) {
                return _0xb8bed8[_0x811a86];
            }.bind(null, _0xbd7857));
        return _0x300168;
    };
    _0x1d686b.n = function(_0x55b0d4) {
        var _0x4d7468 = _0x55b0d4 && _0x55b0d4.__esModule ? function() {
            return _0x55b0d4.default;
        } : function() {
            return _0x55b0d4;
        };
        return _0x1d686b.d(_0x4d7468, 'a', _0x4d7468), _0x4d7468;
    };
    _0x1d686b.o = function(_0x1ed01a, _0x4abf0b) {
        return Object.prototype.hasOwnProperty.call(_0x1ed01a, _0x4abf0b);
    };
    _0x1d686b.p = '';
    _0x1d686b.s = 162;
    return _0x1d686b(_0x1d686b.s);
}([function(module) {
    module.exports = function(error, element, _this) {
        console.warn(error)
        if (error && error.response && error.response.status === 0) {
            element.innerHTML = '<strong style="color:#f00;text-shadow: 0px 0px 3px;"><a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors">'+_this.localization('CORS Error')+'</a></strong>';
        } else {
            element.innerHTML = '<strong style="color:#f00;text-shadow: 0px 0px 3px;">'+_this.localization('Network Error')+'</strong>';
        }
    }
}, null, null, null, null, null, function(module) {
    // Project located at https://github.com/ethanaobrien/gamepad
    class Gamepad {
        gamepads;
        timeout;
        listeners;
        constructor() {
            if (!navigator.getGamepads && !navigator.webkitGetGamepads) {
                throw new Error("Get gamepads not found!");
            }
            if (!window.setTimeout) {
                throw new Error("setTimeout was not found!");
            }
            this.gamepads = [];
            this.listeners = {};
            this.timeout = null;
            this.loop();
        }
        terminate() {
            window.clearTimeout(this.timeout);
        }
        getGamepads() {
            return navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
        }
        loop() {
            this.updateGamepadState();
            this.timeout = setTimeout(this.loop.bind(this), 10);
        }
        updateGamepadState() {
            const gamepads = this.getGamepads();
            gamepads.forEach((gamepad, index) => {
                if (!gamepad) return;
                let hasGamepad = false;
                this.gamepads.forEach((oldGamepad, oldIndex) => {
                    if (oldGamepad.index !== gamepad.index) return;
                    hasGamepad = true;

                    oldGamepad.axes.forEach((axis, axisIndex) => {
                        if (gamepad.axes[axisIndex] !== axis) {
                            const axis = function(index) {
                                switch (index) {
                                    case 0:
                                        return 'LEFT_STICK_X';
                                    case 1:
                                        return 'LEFT_STICK_Y';
                                    case 2:
                                        return 'RIGHT_STICK_X';
                                    case 3:
                                        return 'RIGHT_STICK_Y';
                                    default:
                                        return null;
                                }
                            }(axisIndex);
                            if (!axis) return;
                            this.dispatchEvent('axischanged', {axis: axis, value: gamepad.axes[axisIndex], index: gamepad.index, gamepadIndex: gamepad.index});
                        }

                    })
                    gamepad.buttons.forEach((button, buttonIndex) => {
                        let pressed = oldGamepad.buttons[buttonIndex] === 1.0;
                        if (typeof oldGamepad.buttons[buttonIndex] === "object") {
                            pressed = oldGamepad.buttons[buttonIndex].pressed;
                        }
                        let pressed2 = button === 1.0;
                        if (typeof button === "object") {
                            pressed2 = button.pressed;
                        }
                        if (pressed !== pressed2) {
                            if (pressed2) {
                                this.dispatchEvent('buttondown', {index: buttonIndex, gamepadIndex: gamepad.index});
                            } else {
                                this.dispatchEvent('buttonup', {index: buttonIndex, gamepadIndex: gamepad.index});
                            }
                        }

                    })
                    this.gamepads[oldIndex] = gamepads[index];
                })
                if (!hasGamepad) {
                    this.gamepads.push(gamepads[index]);
                    this.dispatchEvent('connected', {gamepadIndex: gamepad.index});
                }
            });

            for (let j=0; j<this.gamepads.length; j++) {
                if (!this.gamepads[j]) continue;
                let has = false;
                for (let i=0; i<gamepads.length; i++) {
                    if (!gamepads[i]) continue;
                    if (this.gamepads[j].index === gamepads[i].index) {
                        has = true;
                        break;
                    }
                }
                if (!has) {
                    this.dispatchEvent('disconnected', {gamepadIndex: this.gamepads[j].index});
                    this.gamepads.splice(j, 1);
                    j--;
                }
            }
        }
        dispatchEvent(name, arg) {
            if (typeof this.listeners[name] !== 'function') return;
            if (!arg) arg={};
            arg.type = name;
            this.listeners[name](arg);
        }
        on(name, cb) {
            this.listeners[name.toLowerCase()] = cb;
        }
    }
    module.exports = Gamepad;
}, null, null, null, null, function(module, _0x4f5203, _0x5028a6) {
    const _0x33171 = function(inUrl, opts) {
        let url;
        try {url=new URL(inUrl)}catch(e){};
        if ((url && ['http:', 'https:'].includes(url.protocol)) || !url) {
            return new Promise(function(resolve, reject) {
                let xhr = new XMLHttpRequest();
                if (opts.onProgress) {
                    xhr.addEventListener('progress', opts.onProgress);
                }
                xhr.onload = function() {
                    if (xhr.readyState === xhr.DONE) {
                        let data = xhr.response;
                        try {data=JSON.parse(data)}catch(e){}
                        resolve({
                            data: data,
                            headers: {
                                "content-length": xhr.getResponseHeader('content-length'),
                                "content-type": xhr.getResponseHeader('content-type'),
                                "last-modified": xhr.getResponseHeader('last-modified')
                            }
                        });
                    }
                }
                xhr.responseType = opts.type;
                xhr.onerror = reject;
                xhr.open(opts.method, inUrl, true);
                xhr.send();
            })
        } else {
            return new Promise(async function(resolve, reject) {
                if (opts.method === 'HEAD') {
                    resolve({headers:{}});
                    return;
                }
                let res;
                try {
                    res = await fetch(inUrl);
                    if (opts.type && opts.type.toLowerCase() === 'arraybuffer') {
                        res = await res.arrayBuffer();
                    } else {
                        res = await res.text();
                        try {res = JSON.parse(res)} catch(e) {}
                    }
                } catch(e) {
                    reject(e);
                }
                if (inUrl.startsWith('blob:')) URL.revokeObjectURL(inUrl);
                resolve({
                    data: res,
                    headers: {}
                });
            });
        }
    };
    module.exports = {
        a: {
            get: async function(url, set) {
                const type = (set && set.responseType)?(set && set.responseType):'text';
                const progress = (set && set.onDownloadProgress);
                const res = _0x33171(url, {method:"GET", type:type, onProgress:progress});
                return res;
            },
            head: async function(url, set) {
                const type = (set && set.responseType)?(set && set.responseType):'text';
                const progress = (set && set.onDownloadProgress);
                const res = _0x33171(url, {method:"HEAD", type:type, onProgress:progress});
                return res;
            }
        }
    }
}, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, function(_0x25e628, _0x2f1ee1) {
    var _0x2fbe1c;
    _0x2fbe1c = function() {
        return this;
    }();
    try {
        _0x2fbe1c = _0x2fbe1c || new Function('return this')();
    } catch (_0x36c4d5) {
        'object' == typeof window && (_0x2fbe1c = window);
    }
    _0x25e628.exports = _0x2fbe1c;
}, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, function(_0x4f4230, _0x181c20) {
    var _0x4b3a38, _0x30dbdf, _0x40240d = _0x4f4230.exports = {};

    function _0x508793() {
        throw new Error('setTimeout has not been defined');
    }

    function _0x1e140b() {
        throw new Error('clearTimeout has not been defined');
    }

    function _0x58e592(_0x1e83f0) {
        if (_0x4b3a38 === setTimeout) return setTimeout(_0x1e83f0, 0x0);
        if ((_0x4b3a38 === _0x508793 || !_0x4b3a38) && setTimeout) return _0x4b3a38 = setTimeout, setTimeout(_0x1e83f0, 0x0);
        try {
            return _0x4b3a38(_0x1e83f0, 0x0);
        } catch (_0x4743cf) {
            try {
                return _0x4b3a38.call(null, _0x1e83f0, 0x0);
            } catch (_0x53620e) {
                return _0x4b3a38.call(this, _0x1e83f0, 0x0);
            }
        }
    }! function() {
        try {
            _0x4b3a38 = 'function' == typeof setTimeout ? setTimeout : _0x508793;
        } catch (_0x2ba20e) {
            _0x4b3a38 = _0x508793;
        }
        try {
            _0x30dbdf = 'function' == typeof clearTimeout ? clearTimeout : _0x1e140b;
        } catch (_0x5202a1) {
            _0x30dbdf = _0x1e140b;
        }
    }();
    var _0x493e74, _0x501f0f = [],
        _0x3ba731 = !0x1,
        _0x21c3e3 = -0x1;

    function _0x21e6b7() {
        _0x3ba731 && _0x493e74 && (_0x3ba731 = !0x1, _0x493e74.length ? _0x501f0f = _0x493e74.concat(_0x501f0f) : _0x21c3e3 = -0x1, _0x501f0f.length && _0x30d6c8());
    }

    function _0x30d6c8() {
        if (!_0x3ba731) {
            var _0x4f4230 = _0x58e592(_0x21e6b7);
            _0x3ba731 = true;
            for (var _0x181c20 = _0x501f0f.length; _0x181c20;) {
                for (_0x493e74 = _0x501f0f, _0x501f0f = []; ++_0x21c3e3 < _0x181c20;) _0x493e74 && _0x493e74[_0x21c3e3].run();
                _0x21c3e3 = -0x1, _0x181c20 = _0x501f0f.length;
            }
            _0x493e74 = null, _0x3ba731 = !0x1,
                function(_0x294b98) {
                    if (_0x30dbdf === clearTimeout) return clearTimeout(_0x294b98);
                    if ((_0x30dbdf === _0x1e140b || !_0x30dbdf) && clearTimeout) return _0x30dbdf = clearTimeout, clearTimeout(_0x294b98);
                    try {
                        _0x30dbdf(_0x294b98);
                    } catch (_0x353086) {
                        try {
                            return _0x30dbdf.call(null, _0x294b98);
                        } catch (_0x430227) {
                            return _0x30dbdf.call(this, _0x294b98);
                        }
                    }
                }(_0x4f4230);
        }
    }

    function _0x5b9c05(_0x1d5ae2, _0x5b9ff8) {
        this.fun = _0x1d5ae2, this.array = _0x5b9ff8;
    }

    function _0x11873d() {}
    _0x40240d.nextTick = function(_0x14ed62) {
        var _0x181c20 = new Array(arguments.length - 0x1);
        if (arguments.length > 0x1)
            for (var _0x1c0f88 = 0x1; _0x1c0f88 < arguments.length; _0x1c0f88++) _0x181c20[_0x1c0f88 - 0x1] = arguments[_0x1c0f88];
        _0x501f0f.push(new _0x5b9c05(_0x14ed62, _0x181c20)), 0x1 !== _0x501f0f.length || _0x3ba731 || _0x58e592(_0x30d6c8);
    }, _0x5b9c05.prototype.run = function() {
        this.fun.apply(null, this.array);
    }, _0x40240d.title = 'browser', _0x40240d.browser = true, _0x40240d.env = {}, _0x40240d.argv = [], _0x40240d.version = '', _0x40240d.versions = {}, _0x40240d.on = _0x11873d, _0x40240d.addListener = _0x11873d, _0x40240d.once = _0x11873d, _0x40240d.off = _0x11873d, _0x40240d.removeListener = _0x11873d, _0x40240d.removeAllListeners = _0x11873d, _0x40240d.emit = _0x11873d, _0x40240d.prependListener = _0x11873d, _0x40240d.prependOnceListener = _0x11873d, _0x40240d.listeners = function(_0x4a7ed5) {
        return [];
    }, _0x40240d.binding = function(_0x4fe55f) {
        throw new Error('process.binding is not supported');
    }, _0x40240d.cwd = function() {
        return '/';
    }, _0x40240d.chdir = function(_0x33049c) {
        throw new Error('process.chdir is not supported');
    }, _0x40240d.umask = function() {
        return 0x0;
    };
}, null, null, null, null, null, null, null, function(_0x2e240f, _0x5b82af, _0x39b24a) {
    var _0xafdfe, _0x133983;
    ! function(_0xcb4965, _0x3924c5, _0x2b6d6d) {
        'use strict';
        void 0x0 === (_0x133983 = 'function' == typeof(_0xafdfe = function() {
            var _0x2e240f = function(_0x207df4) {
                    throw _0x207df4;
                },
                _0x5b82af = function() {},
                _0x39b24a = {
                    'storeName': 'Store',
                    'storePrefix': 'IDBWrapper-',
                    'dbVersion': 0x1,
                    'keyPath': 'id',
                    'autoIncrement': true,
                    'onStoreReady': function() {},
                    'onError': _0x2e240f,
                    'indexes': [],
                    'implementationPreference': ['indexedDB', 'webkitIndexedDB', 'mozIndexedDB', 'shimIndexedDB']
                },
                _0x2b9783 = function(_0x1e2bea, _0x1aa4eb) {
                    for (var _0x19e5d1 in void 0x0 === _0x1aa4eb && 'function' == typeof _0x1e2bea && (_0x1aa4eb = _0x1e2bea), '[object Object]' != Object.prototype.toString.call(_0x1e2bea) && (_0x1e2bea = {}), _0x39b24a) this[_0x19e5d1] = void 0x0 !== _0x1e2bea[_0x19e5d1] ? _0x1e2bea[_0x19e5d1] : _0x39b24a[_0x19e5d1];
                    this.dbName = this.storePrefix + this.storeName, this.dbVersion = parseInt(this.dbVersion, 0xa) || 0x1, _0x1aa4eb && (this.onStoreReady = _0x1aa4eb);
                    var _0x346822 = 'object' == typeof window ? window : self,
                        _0xcb4965 = this.implementationPreference.filter(function(_0x1ee9de) {
                            return _0x1ee9de in _0x346822;
                        });
                    this.implementation = _0xcb4965[0x0], this.idb = _0x346822[this.implementation], this.keyRange = _0x346822.IDBKeyRange || _0x346822.webkitIDBKeyRange || _0x346822.mozIDBKeyRange, this.consts = {
                        'READ_ONLY': 'readonly',
                        'READ_WRITE': 'readwrite',
                        'VERSION_CHANGE': 'versionchange',
                        'NEXT': 'next',
                        'NEXT_NO_DUPLICATE': 'nextunique',
                        'PREV': 'prev',
                        'PREV_NO_DUPLICATE': 'prevunique'
                    }, this.openDB();
                },
                _0x28a590 = {
                    'constructor': _0x2b9783,
                    'version': '1.7.2',
                    'db': null,
                    'dbName': null,
                    'dbVersion': null,
                    'store': null,
                    'storeName': null,
                    'storePrefix': null,
                    'keyPath': null,
                    'autoIncrement': null,
                    'indexes': null,
                    'implementationPreference': null,
                    'implementation': '',
                    'onStoreReady': null,
                    'onError': null,
                    '_insertIdCount': 0x0,
                    'openDB': function() {
                        var _0x2e240f = this.idb.open(this.dbName, this.dbVersion),
                            _0x5b82af = !0x1;
                        _0x2e240f.onerror = function(_0x2923e1) {
                            if (function(_0x46ec43) {
                                    if ('error' in _0x46ec43.target) return 'VersionError' == _0x46ec43.target.error.name;
                                    if ('errorCode' in _0x46ec43.target) return 0xc == _0x46ec43.target.errorCode;
                                    return !0x1;
                                }(_0x2923e1)) this.onError(new Error('The version number provided is lower than the existing one.'));
                            else {
                                var _0x5b82af;
                                if (_0x2923e1.target.error) _0x5b82af = _0x2923e1.target.error;
                                else {
                                    var _0x39b24a = 'IndexedDB unknown error occurred when opening DB ' + this.dbName + ' version ' + this.dbVersion;
                                    'errorCode' in _0x2923e1.target && (_0x39b24a += ' with error code ' + _0x2923e1.target.errorCode), _0x5b82af = new Error(_0x39b24a);
                                }
                                this.onError(_0x5b82af);
                            }
                        }.bind(this), _0x2e240f.onsuccess = function(_0x3e2c2e) {
                            if (!_0x5b82af)
                                if (this.db) this.onStoreReady();
                                else if (this.db = _0x3e2c2e.target.result, 'string' != typeof this.db.version)
                                if (this.db.objectStoreNames.contains(this.storeName)) {
                                    var _0x39b24a = this.db.transaction([this.storeName], this.consts.READ_ONLY);
                                    this.store = _0x39b24a.objectStore(this.storeName);
                                    var _0x59b9b8 = Array.prototype.slice.call(this.getIndexList());
                                    this.indexes.forEach(function(_0x350dd3) {
                                        var _0x39b24a = _0x350dd3.name;
                                        if (!_0x39b24a) return _0x5b82af = true, void this.onError(new Error('Cannot create index: No index name given.'));
                                        if (this.normalizeIndexData(_0x350dd3), this.hasIndex(_0x39b24a)) {
                                            var _0xa01269 = this.store.index(_0x39b24a);
                                            this.indexComplies(_0xa01269, _0x350dd3) || (_0x5b82af = true, this.onError(new Error('Cannot modify index "' + _0x39b24a + '" for current version. Please bump version number to ' + (this.dbVersion + 0x1) + '.'))), _0x59b9b8.splice(_0x59b9b8.indexOf(_0x39b24a), 0x1);
                                        } else _0x5b82af = true, this.onError(new Error('Cannot create new index "' + _0x39b24a + '" for current version. Please bump version number to ' + (this.dbVersion + 0x1) + '.'));
                                    }, this), _0x59b9b8.length && (_0x5b82af = true, this.onError(new Error('Cannot delete index(es) "' + _0x59b9b8.toString() + '" for current version. Please bump version number to ' + (this.dbVersion + 0x1) + '.'))), _0x5b82af || this.onStoreReady();
                                } else this.onError(new Error('Object store couldn\'t be created.'));
                            else this.onError(new Error('The IndexedDB implementation in this browser is outdated. Please upgrade your browser.'));
                        }.bind(this), _0x2e240f.onupgradeneeded = function(_0x24bbe5) {
                            if (this.db = _0x24bbe5.target.result, this.db.objectStoreNames.contains(this.storeName)) this.store = _0x24bbe5.target.transaction.objectStore(this.storeName);
                            else {
                                var _0x39b24a = {
                                    'autoIncrement': this.autoIncrement
                                };
                                null !== this.keyPath && (_0x39b24a.keyPath = this.keyPath), this.store = this.db.createObjectStore(this.storeName, _0x39b24a);
                            }
                            var _0x29403f = Array.prototype.slice.call(this.getIndexList());
                            this.indexes.forEach(function(_0x33fe6f) {
                                var _0x39b24a = _0x33fe6f.name;
                                if (_0x39b24a || (_0x5b82af = true, this.onError(new Error('Cannot create index: No index name given.'))), this.normalizeIndexData(_0x33fe6f), this.hasIndex(_0x39b24a)) {
                                    var _0x34a15e = this.store.index(_0x39b24a);
                                    this.indexComplies(_0x34a15e, _0x33fe6f) || (this.store.deleteIndex(_0x39b24a), this.store.createIndex(_0x39b24a, _0x33fe6f.keyPath, {
                                        'unique': _0x33fe6f.unique,
                                        'multiEntry': _0x33fe6f.multiEntry
                                    })), _0x29403f.splice(_0x29403f.indexOf(_0x39b24a), 0x1);
                                } else this.store.createIndex(_0x39b24a, _0x33fe6f.keyPath, {
                                    'unique': _0x33fe6f.unique,
                                    'multiEntry': _0x33fe6f.multiEntry
                                });
                            }, this), _0x29403f.length && _0x29403f.forEach(function(_0x57fb9c) {
                                this.store.deleteIndex(_0x57fb9c);
                            }, this);
                        }.bind(this);
                    },
                    'deleteDatabase': function(_0x65ce5d, _0x56cb3e) {
                        if (this.idb.deleteDatabase) {
                            this.db.close();
                            var _0x39b24a = this.idb.deleteDatabase(this.dbName);
                            _0x39b24a.onsuccess = _0x65ce5d, _0x39b24a.onerror = _0x56cb3e;
                        } else _0x56cb3e(new Error('Browser does not support IndexedDB deleteDatabase!'));
                    },
                    'put': function(_0x35bd36, _0x54aa09, _0x251b8c, _0x409d32) {
                        null !== this.keyPath && (_0x409d32 = _0x251b8c, _0x251b8c = _0x54aa09, _0x54aa09 = _0x35bd36), _0x409d32 || (_0x409d32 = _0x2e240f), _0x251b8c || (_0x251b8c = _0x5b82af);
                        var _0x2ad006, _0x2b6d6d = !0x1,
                            _0x1a9aae = null,
                            _0x499fa5 = this.db.transaction([this.storeName], this.consts.READ_WRITE);
                        return _0x499fa5.oncomplete = function() {
                            (_0x2b6d6d ? _0x251b8c : _0x409d32)(_0x1a9aae);
                        }, _0x499fa5.onabort = _0x409d32, _0x499fa5.onerror = _0x409d32, null !== this.keyPath ? (this._addIdPropertyIfNeeded(_0x54aa09), _0x2ad006 = _0x499fa5.objectStore(this.storeName).put(_0x54aa09)) : _0x2ad006 = _0x499fa5.objectStore(this.storeName).put(_0x54aa09, _0x35bd36), _0x2ad006.onsuccess = function(_0xed2c3c) {
                            _0x2b6d6d = true, _0x1a9aae = _0xed2c3c.target.result;
                        }, _0x2ad006.onerror = _0x409d32, _0x499fa5;
                    },
                    'get': function(_0x3696ba, _0x4d8d90, _0x322eb3) {
                        _0x322eb3 || (_0x322eb3 = _0x2e240f), _0x4d8d90 || (_0x4d8d90 = _0x5b82af);
                        var _0xcb4965 = !0x1,
                            _0x2ad006 = null,
                            _0x2b6d6d = this.db.transaction([this.storeName], this.consts.READ_ONLY);
                        _0x2b6d6d.oncomplete = function() {
                            (_0xcb4965 ? _0x4d8d90 : _0x322eb3)(_0x2ad006);
                        }, _0x2b6d6d.onabort = _0x322eb3, _0x2b6d6d.onerror = _0x322eb3;
                        var _0x13d850 = _0x2b6d6d.objectStore(this.storeName).get(_0x3696ba);
                        return _0x13d850.onsuccess = function(_0x34b965) {
                            _0xcb4965 = true, _0x2ad006 = _0x34b965.target.result;
                        }, _0x13d850.onerror = _0x322eb3, _0x2b6d6d;
                    },
                    'remove': function(_0x22011d, _0x5b1f45, _0x459b00) {
                        _0x459b00 || (_0x459b00 = _0x2e240f), _0x5b1f45 || (_0x5b1f45 = _0x5b82af);
                        var _0xcb4965 = !0x1,
                            _0x2ad006 = null,
                            _0x2b6d6d = this.db.transaction([this.storeName], this.consts.READ_WRITE);
                        _0x2b6d6d.oncomplete = function() {
                            (_0xcb4965 ? _0x5b1f45 : _0x459b00)(_0x2ad006);
                        }, _0x2b6d6d.onabort = _0x459b00, _0x2b6d6d.onerror = _0x459b00;
                        var _0x2994f6 = _0x2b6d6d.objectStore(this.storeName).delete(_0x22011d);
                        return _0x2994f6.onsuccess = function(_0x25907f) {
                            _0xcb4965 = true, _0x2ad006 = _0x25907f.target.result;
                        }, _0x2994f6.onerror = _0x459b00, _0x2b6d6d;
                    },
                    'batch': function(_0x4d6e5e, _0x33f461, _0x3440ab) {
                        if (_0x3440ab || (_0x3440ab = _0x2e240f), _0x33f461 || (_0x33f461 = _0x5b82af), '[object Array]' != Object.prototype.toString.call(_0x4d6e5e)) _0x3440ab(new Error('dataArray argument must be of type Array.'));
                        else if (0x0 === _0x4d6e5e.length) return _0x33f461(true);
                        var _0xcb4965 = _0x4d6e5e.length,
                            _0x2ad006 = !0x1,
                            _0x2b6d6d = !0x1,
                            _0x244be0 = this.db.transaction([this.storeName], this.consts.READ_WRITE);
                        _0x244be0.oncomplete = function() {
                            (_0x2b6d6d ? _0x33f461 : _0x3440ab)(_0x2b6d6d);
                        }, _0x244be0.onabort = _0x3440ab, _0x244be0.onerror = _0x3440ab;
                        var _0x5a0c6a = function() {
                            0x0 !== --_0xcb4965 || _0x2ad006 || (_0x2ad006 = true, _0x2b6d6d = true);
                        };
                        return _0x4d6e5e.forEach(function(_0x2a2f2b) {
                            var _0x5b82af = _0x2a2f2b.type,
                                _0x4d6e5e = _0x2a2f2b.key,
                                _0x33f461 = _0x2a2f2b.value,
                                _0xcb4965 = function(_0x2b3ae7) {
                                    _0x244be0.abort(), _0x2ad006 || (_0x2ad006 = true, _0x3440ab(_0x2b3ae7, _0x5b82af, _0x4d6e5e));
                                };
                            if ('remove' == _0x5b82af) {
                                var _0x2b6d6d = _0x244be0.objectStore(this.storeName).delete(_0x4d6e5e);
                                _0x2b6d6d.onsuccess = _0x5a0c6a, _0x2b6d6d.onerror = _0xcb4965;
                            } else if ('put' == _0x5b82af) {
                                var _0x51ca22;
                                null !== this.keyPath ? (this._addIdPropertyIfNeeded(_0x33f461), _0x51ca22 = _0x244be0.objectStore(this.storeName).put(_0x33f461)) : _0x51ca22 = _0x244be0.objectStore(this.storeName).put(_0x33f461, _0x4d6e5e), _0x51ca22.onsuccess = _0x5a0c6a, _0x51ca22.onerror = _0xcb4965;
                            }
                        }, this), _0x244be0;
                    },
                    'putBatch': function(_0x51b697, _0x14766d, _0x512afb) {
                        var _0x4f224b = _0x51b697.map(function(_0x2e83b2) {
                            return {
                                'type': 'put',
                                'value': _0x2e83b2
                            };
                        });
                        return this.batch(_0x4f224b, _0x14766d, _0x512afb);
                    },
                    'upsertBatch': function(_0x13fd8a, _0x5c23ce, _0x1cec44, _0x539771) {
                        'function' == typeof _0x5c23ce && (_0x539771 = _0x1cec44 = _0x5c23ce, _0x5c23ce = {}), _0x539771 || (_0x539771 = _0x2e240f), _0x1cec44 || (_0x1cec44 = _0x5b82af), _0x5c23ce || (_0x5c23ce = {}), '[object Array]' != Object.prototype.toString.call(_0x13fd8a) && _0x539771(new Error('dataArray argument must be of type Array.'));
                        var _0x2ad006 = _0x5c23ce.keyField || this.keyPath,
                            _0x2b6d6d = _0x13fd8a.length,
                            _0x2232f4 = !0x1,
                            _0x307131 = !0x1,
                            _0x5914d3 = 0x0,
                            _0x10a4b5 = this.db.transaction([this.storeName], this.consts.READ_WRITE);
                        _0x10a4b5.oncomplete = function() {
                            _0x307131 ? _0x1cec44(_0x13fd8a) : _0x539771(!0x1);
                        }, _0x10a4b5.onabort = _0x539771, _0x10a4b5.onerror = _0x539771;
                        var _0x47ba06 = function(_0x15b9da) {
                            _0x13fd8a[_0x5914d3++][_0x2ad006] = _0x15b9da.target.result, 0x0 !== --_0x2b6d6d || _0x2232f4 || (_0x2232f4 = true, _0x307131 = true);
                        };
                        return _0x13fd8a.forEach(function(_0x32a8bd) {
                            var _0x5b82af, _0x13fd8a = _0x32a8bd.key;
                            null !== this.keyPath ? (this._addIdPropertyIfNeeded(_0x32a8bd), _0x5b82af = _0x10a4b5.objectStore(this.storeName).put(_0x32a8bd)) : _0x5b82af = _0x10a4b5.objectStore(this.storeName).put(_0x32a8bd, _0x13fd8a), _0x5b82af.onsuccess = _0x47ba06, _0x5b82af.onerror = function(_0x378bb4) {
                                _0x10a4b5.abort(), _0x2232f4 || (_0x2232f4 = true, _0x539771(_0x378bb4));
                            };
                        }, this), _0x10a4b5;
                    },
                    'removeBatch': function(_0x4a038d, _0x3ba0b8, _0x251e88) {
                        var _0x540626 = _0x4a038d.map(function(_0x330621) {
                            return {
                                'type': 'remove',
                                'key': _0x330621
                            };
                        });
                        return this.batch(_0x540626, _0x3ba0b8, _0x251e88);
                    },
                    'getBatch': function(_0x3a8a3a, _0x46ef82, _0x24a69f, _0x4d4052) {
                        if (_0x24a69f || (_0x24a69f = _0x2e240f), _0x46ef82 || (_0x46ef82 = _0x5b82af), _0x4d4052 || (_0x4d4052 = 'sparse'), '[object Array]' != Object.prototype.toString.call(_0x3a8a3a)) _0x24a69f(new Error('keyArray argument must be of type Array.'));
                        else if (0x0 === _0x3a8a3a.length) return _0x46ef82([]);
                        var _0x2ad006 = [],
                            _0x2b6d6d = _0x3a8a3a.length,
                            _0xeccdf0 = !0x1,
                            _0x27f627 = null,
                            _0x763dce = this.db.transaction([this.storeName], this.consts.READ_ONLY);
                        _0x763dce.oncomplete = function() {
                            (_0xeccdf0 ? _0x46ef82 : _0x24a69f)(_0x27f627);
                        }, _0x763dce.onabort = _0x24a69f, _0x763dce.onerror = _0x24a69f;
                        var _0x4f1954 = function(_0x5dcefc) {
                            _0x5dcefc.target.result || 'dense' == _0x4d4052 ? _0x2ad006.push(_0x5dcefc.target.result) : 'sparse' == _0x4d4052 && _0x2ad006.length++, 0x0 === --_0x2b6d6d && (true, _0xeccdf0 = true, _0x27f627 = _0x2ad006);
                        };
                        return _0x3a8a3a.forEach(function(_0x438c01) {
                            var _0x5b82af = _0x763dce.objectStore(this.storeName).get(_0x438c01);
                            _0x5b82af.onsuccess = _0x4f1954, _0x5b82af.onerror = function(_0x22fee1) {
                                true, _0x27f627 = _0x22fee1, _0x24a69f(_0x22fee1), _0x763dce.abort();
                            };
                        }, this), _0x763dce;
                    },
                    'getAll': function(_0x4f6d5c, _0x20de05) {
                        _0x20de05 || (_0x20de05 = _0x2e240f), _0x4f6d5c || (_0x4f6d5c = _0x5b82af);
                        var _0x354639 = this.db.transaction([this.storeName], this.consts.READ_ONLY),
                            _0xcb4965 = _0x354639.objectStore(this.storeName);
                        return _0xcb4965.getAll ? this._getAllNative(_0x354639, _0xcb4965, _0x4f6d5c, _0x20de05) : this._getAllCursor(_0x354639, _0xcb4965, _0x4f6d5c, _0x20de05), _0x354639;
                    },
                    '_getAllNative': function(_0x41a196, _0x29efcc, _0x29de64, _0x147f7b) {
                        var _0x6643e4 = !0x1,
                            _0xcb4965 = null;
                        _0x41a196.oncomplete = function() {
                            (_0x6643e4 ? _0x29de64 : _0x147f7b)(_0xcb4965);
                        }, _0x41a196.onabort = _0x147f7b, _0x41a196.onerror = _0x147f7b;
                        var _0x2ad006 = _0x29efcc.getAll();
                        _0x2ad006.onsuccess = function(_0x2fcfde) {
                            _0x6643e4 = true, _0xcb4965 = _0x2fcfde.target.result;
                        }, _0x2ad006.onerror = _0x147f7b;
                    },
                    '_getAllCursor': function(_0x57bef8, _0x4284f4, _0x1e015d, _0x27d344) {
                        var _0x34dcf5 = [],
                            _0xcb4965 = !0x1,
                            _0x2ad006 = null;
                        _0x57bef8.oncomplete = function() {
                            (_0xcb4965 ? _0x1e015d : _0x27d344)(_0x2ad006);
                        }, _0x57bef8.onabort = _0x27d344, _0x57bef8.onerror = _0x27d344;
                        var _0x2b6d6d = _0x4284f4.openCursor();
                        _0x2b6d6d.onsuccess = function(_0x4ea7bf) {
                            var _0x4284f4 = _0x4ea7bf.target.result;
                            _0x4284f4 ? (_0x34dcf5.push(_0x4284f4.value), _0x4284f4.continue()) : (_0xcb4965 = true, _0x2ad006 = _0x34dcf5);
                        }, _0x2b6d6d.onError = _0x27d344;
                    },
                    'clear': function(_0x18f252, _0x409346) {
                        _0x409346 || (_0x409346 = _0x2e240f), _0x18f252 || (_0x18f252 = _0x5b82af);
                        var _0x536ee6 = !0x1,
                            _0xcb4965 = null,
                            _0x2ad006 = this.db.transaction([this.storeName], this.consts.READ_WRITE);
                        _0x2ad006.oncomplete = function() {
                            (_0x536ee6 ? _0x18f252 : _0x409346)(_0xcb4965);
                        }, _0x2ad006.onabort = _0x409346, _0x2ad006.onerror = _0x409346;
                        var _0x2b6d6d = _0x2ad006.objectStore(this.storeName).clear();
                        return _0x2b6d6d.onsuccess = function(_0x4947d5) {
                            _0x536ee6 = true, _0xcb4965 = _0x4947d5.target.result;
                        }, _0x2b6d6d.onerror = _0x409346, _0x2ad006;
                    },
                    '_addIdPropertyIfNeeded': function(_0x41f848) {
                        void 0x0 === _0x41f848[this.keyPath] && (_0x41f848[this.keyPath] = this._insertIdCount++ + Date.now());
                    },
                    'getIndexList': function() {
                        return this.store.indexNames;
                    },
                    'hasIndex': function(_0x1c4ba1) {
                        return this.store.indexNames.contains(_0x1c4ba1);
                    },
                    'normalizeIndexData': function(_0xf965ee) {
                        _0xf965ee.keyPath = _0xf965ee.keyPath || _0xf965ee.name, _0xf965ee.unique = !!_0xf965ee.unique, _0xf965ee.multiEntry = !!_0xf965ee.multiEntry;
                    },
                    'indexComplies': function(_0x4b67b0, _0x24b195) {
                        return ['keyPath', 'unique', 'multiEntry'].every(function(_0xfc173c) {
                            if ('multiEntry' == _0xfc173c && void 0x0 === _0x4b67b0[_0xfc173c] && !0x1 === _0x24b195[_0xfc173c]) return true;
                            if ('keyPath' == _0xfc173c && '[object Array]' == Object.prototype.toString.call(_0x24b195[_0xfc173c])) {
                                var _0x22060c = _0x24b195.keyPath,
                                    _0x1a6e38 = _0x4b67b0.keyPath;
                                if ('string' == typeof _0x1a6e38) return _0x22060c.toString() == _0x1a6e38;
                                if ('function' != typeof _0x1a6e38.contains && 'function' != typeof _0x1a6e38.indexOf) return !0x1;
                                if (_0x1a6e38.length !== _0x22060c.length) return !0x1;
                                for (var _0xcb4965 = 0x0, _0x2ad006 = _0x22060c.length; _0xcb4965 < _0x2ad006; _0xcb4965++)
                                    if (!(_0x1a6e38.contains && _0x1a6e38.contains(_0x22060c[_0xcb4965]) || _0x1a6e38.indexOf(-0x1 !== _0x22060c[_0xcb4965]))) return !0x1;
                                return true;
                            }
                            return _0x24b195[_0xfc173c] == _0x4b67b0[_0xfc173c];
                        });
                    },
                    'iterate': function(_0x1cb264, _0x42cd9d) {
                        var _0x38e5c3 = 'desc' == (_0x42cd9d = _0x2ad006({
                            'index': null,
                            'order': 'ASC',
                            'autoContinue': true,
                            'filterDuplicates': !0x1,
                            'keyRange': null,
                            'writeAccess': !0x1,
                            'onEnd': null,
                            'onError': _0x2e240f,
                            'limit': 0x1 / 0x0,
                            'offset': 0x0,
                            'allowItemRejection': !0x1
                        }, _0x42cd9d || {})).order.toLowerCase() ? 'PREV' : 'NEXT';
                        _0x42cd9d.filterDuplicates && (_0x38e5c3 += '_NO_DUPLICATE');
                        var _0x5b5b48 = !0x1,
                            _0xcb4965 = this.db.transaction([this.storeName], this.consts[_0x42cd9d.writeAccess ? 'READ_WRITE' : 'READ_ONLY']),
                            _0x2b6d6d = _0xcb4965.objectStore(this.storeName);
                        _0x42cd9d.index && (_0x2b6d6d = _0x2b6d6d.index(_0x42cd9d.index));
                        var _0x523630 = 0x0;
                        _0xcb4965.oncomplete = function() {
                            _0x5b5b48 ? _0x42cd9d.onEnd ? _0x42cd9d.onEnd() : _0x1cb264(null) : _0x42cd9d.onError(null);
                        }, _0xcb4965.onabort = _0x42cd9d.onError, _0xcb4965.onerror = _0x42cd9d.onError;
                        var _0x3ac163 = _0x2b6d6d.openCursor(_0x42cd9d.keyRange, this.consts[_0x38e5c3]);
                        return _0x3ac163.onerror = _0x42cd9d.onError, _0x3ac163.onsuccess = function(_0x4f183f) {
                            var _0xe7af78 = _0x4f183f.target.result;
                            if (_0xe7af78)
                                if (_0x42cd9d.offset) _0xe7af78.advance(_0x42cd9d.offset), _0x42cd9d.offset = 0x0;
                                else {
                                    var _0x2ad006 = _0x1cb264(_0xe7af78.value, _0xe7af78, _0xcb4965);
                                    _0x42cd9d.allowItemRejection && !0x1 === _0x2ad006 || _0x523630++, _0x42cd9d.autoContinue && (_0x523630 + _0x42cd9d.offset < _0x42cd9d.limit ? _0xe7af78.continue() : _0x5b5b48 = true);
                                }
                            else _0x5b5b48 = true;
                        }, _0xcb4965;
                    },
                    'query': function(_0x2bc5fc, _0x39354f) {
                        var _0x39b24a = [],
                            _0x47cb91 = 0x0;
                        return (_0x39354f = _0x39354f || {}).autoContinue = true, _0x39354f.writeAccess = !0x1, _0x39354f.allowItemRejection = !!_0x39354f.filter, _0x39354f.onEnd = function() {
                            _0x2bc5fc(_0x39b24a, _0x47cb91);
                        }, this.iterate(function(_0x13e82f) {
                            _0x47cb91++;
                            var _0x4bb504 = !_0x39354f.filter || _0x39354f.filter(_0x13e82f);
                            return !0x1 !== _0x4bb504 && _0x39b24a.push(_0x13e82f), _0x4bb504;
                        }, _0x39354f);
                    },
                    'count': function(_0x26682d, _0x7fbfc6) {
                        var _0x26315e = (_0x7fbfc6 = _0x2ad006({
                                'index': null,
                                'keyRange': null
                            }, _0x7fbfc6 || {})).onError || _0x2e240f,
                            _0x18a616 = !0x1,
                            _0xcb4965 = null,
                            _0x2b6d6d = this.db.transaction([this.storeName], this.consts.READ_ONLY);
                        _0x2b6d6d.oncomplete = function() {
                            (_0x18a616 ? _0x26682d : _0x26315e)(_0xcb4965);
                        }, _0x2b6d6d.onabort = _0x26315e, _0x2b6d6d.onerror = _0x26315e;
                        var _0x2eb015 = _0x2b6d6d.objectStore(this.storeName);
                        _0x7fbfc6.index && (_0x2eb015 = _0x2eb015.index(_0x7fbfc6.index));
                        var _0xfff48 = _0x2eb015.count(_0x7fbfc6.keyRange);
                        return _0xfff48.onsuccess = function(_0x4a9790) {
                            _0x18a616 = true, _0xcb4965 = _0x4a9790.target.result;
                        }, _0xfff48.onError = _0x26315e, _0x2b6d6d;
                    },
                    'makeKeyRange': function(_0x18e1e0) {
                        var _0x5b82af, _0x39b24a = void 0x0 !== _0x18e1e0.lower,
                            _0x2d70fb = void 0x0 !== _0x18e1e0.upper;
                        switch (true) {
                            case void 0x0 !== _0x18e1e0.only:
                                _0x5b82af = this.keyRange.only(_0x18e1e0.only);
                                break;
                            case _0x39b24a && _0x2d70fb:
                                _0x5b82af = this.keyRange.bound(_0x18e1e0.lower, _0x18e1e0.upper, _0x18e1e0.excludeLower, _0x18e1e0.excludeUpper);
                                break;
                            case _0x39b24a:
                                _0x5b82af = this.keyRange.lowerBound(_0x18e1e0.lower, _0x18e1e0.excludeLower);
                                break;
                            case _0x2d70fb:
                                _0x5b82af = this.keyRange.upperBound(_0x18e1e0.upper, _0x18e1e0.excludeUpper);
                                break;
                            default:
                                throw new Error('Cannot create KeyRange. Provide one or both of "lower" or "upper" value, or an "only" value.');
                        }
                        return _0x5b82af;
                    }
                },
                _0xcb4965 = {};

            function _0x2ad006(_0x4910d7, _0x179cd8) {
                var _0x39b24a, _0x3e1f3f;
                for (_0x39b24a in _0x179cd8)(_0x3e1f3f = _0x179cd8[_0x39b24a]) !== _0xcb4965[_0x39b24a] && _0x3e1f3f !== _0x4910d7[_0x39b24a] && (_0x4910d7[_0x39b24a] = _0x3e1f3f);
                return _0x4910d7;
            }
            return _0x2b9783.prototype = _0x28a590, _0x2b9783.version = _0x28a590.version, _0x2b9783;
        }) ? _0xafdfe.call(_0x5b82af, _0x39b24a, _0x5b82af, _0x2e240f) : _0xafdfe) || (_0x2e240f.exports = _0x133983);
    }();
}, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, function(_0x5cc7da, _0xd81f9c, _0x5928dc) {
    /*!
     * The buffer module from node.js, for the browser.
     *
     * @author Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
     * @license MIT
     */
    !function(){return function t(r,e,n){function i(f,u){if(!e[f]){if(!r[f]){var s="function"==typeof require&&require;if(!u&&s)return s(f,!0);if(o)return o(f,!0);var h=new Error("Cannot find module '"+f+"'");throw h.code="MODULE_NOT_FOUND",h}var a=e[f]={exports:{}};r[f][0].call(a.exports,function(t){return i(r[f][1][t]||t)},a,a.exports,t,r,e,n)}return e[f].exports}for(var o="function"==typeof require&&require,f=0;f<n.length;f++)i(n[f]);return i}}()({1:[function(t,r,e){_0xd81f9c.Buffer=t("buffer").Buffer},{buffer:3}],2:[function(t,r,e){"use strict";e.byteLength=function(t){var r=h(t),e=r[0],n=r[1];return 3*(e+n)/4-n},e.toByteArray=function(t){var r,e,n=h(t),f=n[0],u=n[1],s=new o(function(t,r,e){return 3*(r+e)/4-e}(0,f,u)),a=0,c=u>0?f-4:f;for(e=0;e<c;e+=4)r=i[t.charCodeAt(e)]<<18|i[t.charCodeAt(e+1)]<<12|i[t.charCodeAt(e+2)]<<6|i[t.charCodeAt(e+3)],s[a++]=r>>16&255,s[a++]=r>>8&255,s[a++]=255&r;2===u&&(r=i[t.charCodeAt(e)]<<2|i[t.charCodeAt(e+1)]>>4,s[a++]=255&r);1===u&&(r=i[t.charCodeAt(e)]<<10|i[t.charCodeAt(e+1)]<<4|i[t.charCodeAt(e+2)]>>2,s[a++]=r>>8&255,s[a++]=255&r);return s},e.fromByteArray=function(t){for(var r,e=t.length,i=e%3,o=[],f=0,u=e-i;f<u;f+=16383)o.push(a(t,f,f+16383>u?u:f+16383));1===i?(r=t[e-1],o.push(n[r>>2]+n[r<<4&63]+"==")):2===i&&(r=(t[e-2]<<8)+t[e-1],o.push(n[r>>10]+n[r>>4&63]+n[r<<2&63]+"="));return o.join("")};for(var n=[],i=[],o="undefined"!=typeof Uint8Array?Uint8Array:Array,f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",u=0,s=f.length;u<s;++u)n[u]=f[u],i[f.charCodeAt(u)]=u;function h(t){var r=t.length;if(r%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var e=t.indexOf("=");return-1===e&&(e=r),[e,e===r?0:4-e%4]}function a(t,r,e){for(var i,o,f=[],u=r;u<e;u+=3)i=(t[u]<<16&16711680)+(t[u+1]<<8&65280)+(255&t[u+2]),f.push(n[(o=i)>>18&63]+n[o>>12&63]+n[o>>6&63]+n[63&o]);return f.join("")}i["-".charCodeAt(0)]=62,i["_".charCodeAt(0)]=63},{}],3:[function(t,r,e){(function(r){(function(){"use strict";var r=t("base64-js"),n=t("ieee754");e.Buffer=f,e.SlowBuffer=function(t){+t!=t&&(t=0);return f.alloc(+t)},e.INSPECT_MAX_BYTES=50;var i=2147483647;function o(t){if(t>i)throw new RangeError('The value "'+t+'" is invalid for option "size"');var r=new Uint8Array(t);return r.__proto__=f.prototype,r}function f(t,r,e){if("number"==typeof t){if("string"==typeof r)throw new TypeError('The "string" argument must be of type string. Received type number');return h(t)}return u(t,r,e)}function u(t,r,e){if("string"==typeof t)return function(t,r){"string"==typeof r&&""!==r||(r="utf8");if(!f.isEncoding(r))throw new TypeError("Unknown encoding: "+r);var e=0|p(t,r),n=o(e),i=n.write(t,r);i!==e&&(n=n.slice(0,i));return n}(t,r);if(ArrayBuffer.isView(t))return a(t);if(null==t)throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t);if(z(t,ArrayBuffer)||t&&z(t.buffer,ArrayBuffer))return function(t,r,e){if(r<0||t.byteLength<r)throw new RangeError('"offset" is outside of buffer bounds');if(t.byteLength<r+(e||0))throw new RangeError('"length" is outside of buffer bounds');var n;n=void 0===r&&void 0===e?new Uint8Array(t):void 0===e?new Uint8Array(t,r):new Uint8Array(t,r,e);return n.__proto__=f.prototype,n}(t,r,e);if("number"==typeof t)throw new TypeError('The "value" argument must not be of type number. Received type number');var n=t.valueOf&&t.valueOf();if(null!=n&&n!==t)return f.from(n,r,e);var i=function(t){if(f.isBuffer(t)){var r=0|c(t.length),e=o(r);return 0===e.length?e:(t.copy(e,0,0,r),e)}if(void 0!==t.length)return"number"!=typeof t.length||D(t.length)?o(0):a(t);if("Buffer"===t.type&&Array.isArray(t.data))return a(t.data)}(t);if(i)return i;if("undefined"!=typeof Symbol&&null!=Symbol.toPrimitive&&"function"==typeof t[Symbol.toPrimitive])return f.from(t[Symbol.toPrimitive]("string"),r,e);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t)}function s(t){if("number"!=typeof t)throw new TypeError('"size" argument must be of type number');if(t<0)throw new RangeError('The value "'+t+'" is invalid for option "size"')}function h(t){return s(t),o(t<0?0:0|c(t))}function a(t){for(var r=t.length<0?0:0|c(t.length),e=o(r),n=0;n<r;n+=1)e[n]=255&t[n];return e}function c(t){if(t>=i)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+i.toString(16)+" bytes");return 0|t}function p(t,r){if(f.isBuffer(t))return t.length;if(ArrayBuffer.isView(t)||z(t,ArrayBuffer))return t.byteLength;if("string"!=typeof t)throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof t);var e=t.length,n=arguments.length>2&&!0===arguments[2];if(!n&&0===e)return 0;for(var i=!1;;)switch(r){case"ascii":case"latin1":case"binary":return e;case"utf8":case"utf-8":return N(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*e;case"hex":return e>>>1;case"base64":return P(t).length;default:if(i)return n?-1:N(t).length;r=(""+r).toLowerCase(),i=!0}}function l(t,r,e){var n=t[r];t[r]=t[e],t[e]=n}function y(t,r,e,n,i){if(0===t.length)return-1;if("string"==typeof e?(n=e,e=0):e>2147483647?e=2147483647:e<-2147483648&&(e=-2147483648),D(e=+e)&&(e=i?0:t.length-1),e<0&&(e=t.length+e),e>=t.length){if(i)return-1;e=t.length-1}else if(e<0){if(!i)return-1;e=0}if("string"==typeof r&&(r=f.from(r,n)),f.isBuffer(r))return 0===r.length?-1:g(t,r,e,n,i);if("number"==typeof r)return r&=255,"function"==typeof Uint8Array.prototype.indexOf?i?Uint8Array.prototype.indexOf.call(t,r,e):Uint8Array.prototype.lastIndexOf.call(t,r,e):g(t,[r],e,n,i);throw new TypeError("val must be string, number or Buffer")}function g(t,r,e,n,i){var o,f=1,u=t.length,s=r.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(t.length<2||r.length<2)return-1;f=2,u/=2,s/=2,e/=2}function h(t,r){return 1===f?t[r]:t.readUInt16BE(r*f)}if(i){var a=-1;for(o=e;o<u;o++)if(h(t,o)===h(r,-1===a?0:o-a)){if(-1===a&&(a=o),o-a+1===s)return a*f}else-1!==a&&(o-=o-a),a=-1}else for(e+s>u&&(e=u-s),o=e;o>=0;o--){for(var c=!0,p=0;p<s;p++)if(h(t,o+p)!==h(r,p)){c=!1;break}if(c)return o}return-1}function w(t,r,e,n){e=Number(e)||0;var i=t.length-e;n?(n=Number(n))>i&&(n=i):n=i;var o=r.length;n>o/2&&(n=o/2);for(var f=0;f<n;++f){var u=parseInt(r.substr(2*f,2),16);if(D(u))return f;t[e+f]=u}return f}function d(t,r,e,n){return j(N(r,t.length-e),t,e,n)}function v(t,r,e,n){return j(function(t){for(var r=[],e=0;e<t.length;++e)r.push(255&t.charCodeAt(e));return r}(r),t,e,n)}function b(t,r,e,n){return v(t,r,e,n)}function m(t,r,e,n){return j(P(r),t,e,n)}function E(t,r,e,n){return j(function(t,r){for(var e,n,i,o=[],f=0;f<t.length&&!((r-=2)<0);++f)e=t.charCodeAt(f),n=e>>8,i=e%256,o.push(i),o.push(n);return o}(r,t.length-e),t,e,n)}function A(t,e,n){return 0===e&&n===t.length?r.fromByteArray(t):r.fromByteArray(t.slice(e,n))}function B(t,r,e){e=Math.min(t.length,e);for(var n=[],i=r;i<e;){var o,f,u,s,h=t[i],a=null,c=h>239?4:h>223?3:h>191?2:1;if(i+c<=e)switch(c){case 1:h<128&&(a=h);break;case 2:128==(192&(o=t[i+1]))&&(s=(31&h)<<6|63&o)>127&&(a=s);break;case 3:o=t[i+1],f=t[i+2],128==(192&o)&&128==(192&f)&&(s=(15&h)<<12|(63&o)<<6|63&f)>2047&&(s<55296||s>57343)&&(a=s);break;case 4:o=t[i+1],f=t[i+2],u=t[i+3],128==(192&o)&&128==(192&f)&&128==(192&u)&&(s=(15&h)<<18|(63&o)<<12|(63&f)<<6|63&u)>65535&&s<1114112&&(a=s)}null===a?(a=65533,c=1):a>65535&&(a-=65536,n.push(a>>>10&1023|55296),a=56320|1023&a),n.push(a),i+=c}return function(t){var r=t.length;if(r<=U)return String.fromCharCode.apply(String,t);var e="",n=0;for(;n<r;)e+=String.fromCharCode.apply(String,t.slice(n,n+=U));return e}(n)}e.kMaxLength=i,f.TYPED_ARRAY_SUPPORT=function(){try{var t=new Uint8Array(1);return t.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===t.foo()}catch(t){return!1}}(),f.TYPED_ARRAY_SUPPORT||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(f.prototype,"parent",{enumerable:!0,get:function(){if(f.isBuffer(this))return this.buffer}}),Object.defineProperty(f.prototype,"offset",{enumerable:!0,get:function(){if(f.isBuffer(this))return this.byteOffset}}),"undefined"!=typeof Symbol&&null!=Symbol.species&&f[Symbol.species]===f&&Object.defineProperty(f,Symbol.species,{value:null,configurable:!0,enumerable:!1,writable:!1}),f.poolSize=8192,f.from=function(t,r,e){return u(t,r,e)},f.prototype.__proto__=Uint8Array.prototype,f.__proto__=Uint8Array,f.alloc=function(t,r,e){return function(t,r,e){return s(t),t<=0?o(t):void 0!==r?"string"==typeof e?o(t).fill(r,e):o(t).fill(r):o(t)}(t,r,e)},f.allocUnsafe=function(t){return h(t)},f.allocUnsafeSlow=function(t){return h(t)},f.isBuffer=function(t){return null!=t&&!0===t._isBuffer&&t!==f.prototype},f.compare=function(t,r){if(z(t,Uint8Array)&&(t=f.from(t,t.offset,t.byteLength)),z(r,Uint8Array)&&(r=f.from(r,r.offset,r.byteLength)),!f.isBuffer(t)||!f.isBuffer(r))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(t===r)return 0;for(var e=t.length,n=r.length,i=0,o=Math.min(e,n);i<o;++i)if(t[i]!==r[i]){e=t[i],n=r[i];break}return e<n?-1:n<e?1:0},f.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},f.concat=function(t,r){if(!Array.isArray(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return f.alloc(0);var e;if(void 0===r)for(r=0,e=0;e<t.length;++e)r+=t[e].length;var n=f.allocUnsafe(r),i=0;for(e=0;e<t.length;++e){var o=t[e];if(z(o,Uint8Array)&&(o=f.from(o)),!f.isBuffer(o))throw new TypeError('"list" argument must be an Array of Buffers');o.copy(n,i),i+=o.length}return n},f.byteLength=p,f.prototype._isBuffer=!0,f.prototype.swap16=function(){var t=this.length;if(t%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var r=0;r<t;r+=2)l(this,r,r+1);return this},f.prototype.swap32=function(){var t=this.length;if(t%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var r=0;r<t;r+=4)l(this,r,r+3),l(this,r+1,r+2);return this},f.prototype.swap64=function(){var t=this.length;if(t%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var r=0;r<t;r+=8)l(this,r,r+7),l(this,r+1,r+6),l(this,r+2,r+5),l(this,r+3,r+4);return this},f.prototype.toString=function(){var t=this.length;return 0===t?"":0===arguments.length?B(this,0,t):function(t,r,e){var n=!1;if((void 0===r||r<0)&&(r=0),r>this.length)return"";if((void 0===e||e>this.length)&&(e=this.length),e<=0)return"";if((e>>>=0)<=(r>>>=0))return"";for(t||(t="utf8");;)switch(t){case"hex":return I(this,r,e);case"utf8":case"utf-8":return B(this,r,e);case"ascii":return _(this,r,e);case"latin1":case"binary":return T(this,r,e);case"base64":return A(this,r,e);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return S(this,r,e);default:if(n)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),n=!0}}.apply(this,arguments)},f.prototype.toLocaleString=f.prototype.toString,f.prototype.equals=function(t){if(!f.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===f.compare(this,t)},f.prototype.inspect=function(){var t="",r=e.INSPECT_MAX_BYTES;return t=this.toString("hex",0,r).replace(/(.{2})/g,"$1 ").trim(),this.length>r&&(t+=" ... "),"<Buffer "+t+">"},f.prototype.compare=function(t,r,e,n,i){if(z(t,Uint8Array)&&(t=f.from(t,t.offset,t.byteLength)),!f.isBuffer(t))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof t);if(void 0===r&&(r=0),void 0===e&&(e=t?t.length:0),void 0===n&&(n=0),void 0===i&&(i=this.length),r<0||e>t.length||n<0||i>this.length)throw new RangeError("out of range index");if(n>=i&&r>=e)return 0;if(n>=i)return-1;if(r>=e)return 1;if(this===t)return 0;for(var o=(i>>>=0)-(n>>>=0),u=(e>>>=0)-(r>>>=0),s=Math.min(o,u),h=this.slice(n,i),a=t.slice(r,e),c=0;c<s;++c)if(h[c]!==a[c]){o=h[c],u=a[c];break}return o<u?-1:u<o?1:0},f.prototype.includes=function(t,r,e){return-1!==this.indexOf(t,r,e)},f.prototype.indexOf=function(t,r,e){return y(this,t,r,e,!0)},f.prototype.lastIndexOf=function(t,r,e){return y(this,t,r,e,!1)},f.prototype.write=function(t,r,e,n){if(void 0===r)n="utf8",e=this.length,r=0;else if(void 0===e&&"string"==typeof r)n=r,e=this.length,r=0;else{if(!isFinite(r))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");r>>>=0,isFinite(e)?(e>>>=0,void 0===n&&(n="utf8")):(n=e,e=void 0)}var i=this.length-r;if((void 0===e||e>i)&&(e=i),t.length>0&&(e<0||r<0)||r>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");for(var o=!1;;)switch(n){case"hex":return w(this,t,r,e);case"utf8":case"utf-8":return d(this,t,r,e);case"ascii":return v(this,t,r,e);case"latin1":case"binary":return b(this,t,r,e);case"base64":return m(this,t,r,e);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return E(this,t,r,e);default:if(o)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),o=!0}},f.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var U=4096;function _(t,r,e){var n="";e=Math.min(t.length,e);for(var i=r;i<e;++i)n+=String.fromCharCode(127&t[i]);return n}function T(t,r,e){var n="";e=Math.min(t.length,e);for(var i=r;i<e;++i)n+=String.fromCharCode(t[i]);return n}function I(t,r,e){var n=t.length;(!r||r<0)&&(r=0),(!e||e<0||e>n)&&(e=n);for(var i="",o=r;o<e;++o)i+=k(t[o]);return i}function S(t,r,e){for(var n=t.slice(r,e),i="",o=0;o<n.length;o+=2)i+=String.fromCharCode(n[o]+256*n[o+1]);return i}function C(t,r,e){if(t%1!=0||t<0)throw new RangeError("offset is not uint");if(t+r>e)throw new RangeError("Trying to access beyond buffer length")}function L(t,r,e,n,i,o){if(!f.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(r>i||r<o)throw new RangeError('"value" argument is out of bounds');if(e+n>t.length)throw new RangeError("Index out of range")}function R(t,r,e,n,i,o){if(e+n>t.length)throw new RangeError("Index out of range");if(e<0)throw new RangeError("Index out of range")}function x(t,r,e,i,o){return r=+r,e>>>=0,o||R(t,0,e,4),n.write(t,r,e,i,23,4),e+4}function M(t,r,e,i,o){return r=+r,e>>>=0,o||R(t,0,e,8),n.write(t,r,e,i,52,8),e+8}f.prototype.slice=function(t,r){var e=this.length;(t=~~t)<0?(t+=e)<0&&(t=0):t>e&&(t=e),(r=void 0===r?e:~~r)<0?(r+=e)<0&&(r=0):r>e&&(r=e),r<t&&(r=t);var n=this.subarray(t,r);return n.__proto__=f.prototype,n},f.prototype.readUIntLE=function(t,r,e){t>>>=0,r>>>=0,e||C(t,r,this.length);for(var n=this[t],i=1,o=0;++o<r&&(i*=256);)n+=this[t+o]*i;return n},f.prototype.readUIntBE=function(t,r,e){t>>>=0,r>>>=0,e||C(t,r,this.length);for(var n=this[t+--r],i=1;r>0&&(i*=256);)n+=this[t+--r]*i;return n},f.prototype.readUInt8=function(t,r){return t>>>=0,r||C(t,1,this.length),this[t]},f.prototype.readUInt16LE=function(t,r){return t>>>=0,r||C(t,2,this.length),this[t]|this[t+1]<<8},f.prototype.readUInt16BE=function(t,r){return t>>>=0,r||C(t,2,this.length),this[t]<<8|this[t+1]},f.prototype.readUInt32LE=function(t,r){return t>>>=0,r||C(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},f.prototype.readUInt32BE=function(t,r){return t>>>=0,r||C(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},f.prototype.readIntLE=function(t,r,e){t>>>=0,r>>>=0,e||C(t,r,this.length);for(var n=this[t],i=1,o=0;++o<r&&(i*=256);)n+=this[t+o]*i;return n>=(i*=128)&&(n-=Math.pow(2,8*r)),n},f.prototype.readIntBE=function(t,r,e){t>>>=0,r>>>=0,e||C(t,r,this.length);for(var n=r,i=1,o=this[t+--n];n>0&&(i*=256);)o+=this[t+--n]*i;return o>=(i*=128)&&(o-=Math.pow(2,8*r)),o},f.prototype.readInt8=function(t,r){return t>>>=0,r||C(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},f.prototype.readInt16LE=function(t,r){t>>>=0,r||C(t,2,this.length);var e=this[t]|this[t+1]<<8;return 32768&e?4294901760|e:e},f.prototype.readInt16BE=function(t,r){t>>>=0,r||C(t,2,this.length);var e=this[t+1]|this[t]<<8;return 32768&e?4294901760|e:e},f.prototype.readInt32LE=function(t,r){return t>>>=0,r||C(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},f.prototype.readInt32BE=function(t,r){return t>>>=0,r||C(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},f.prototype.readFloatLE=function(t,r){return t>>>=0,r||C(t,4,this.length),n.read(this,t,!0,23,4)},f.prototype.readFloatBE=function(t,r){return t>>>=0,r||C(t,4,this.length),n.read(this,t,!1,23,4)},f.prototype.readDoubleLE=function(t,r){return t>>>=0,r||C(t,8,this.length),n.read(this,t,!0,52,8)},f.prototype.readDoubleBE=function(t,r){return t>>>=0,r||C(t,8,this.length),n.read(this,t,!1,52,8)},f.prototype.writeUIntLE=function(t,r,e,n){(t=+t,r>>>=0,e>>>=0,n)||L(this,t,r,e,Math.pow(2,8*e)-1,0);var i=1,o=0;for(this[r]=255&t;++o<e&&(i*=256);)this[r+o]=t/i&255;return r+e},f.prototype.writeUIntBE=function(t,r,e,n){(t=+t,r>>>=0,e>>>=0,n)||L(this,t,r,e,Math.pow(2,8*e)-1,0);var i=e-1,o=1;for(this[r+i]=255&t;--i>=0&&(o*=256);)this[r+i]=t/o&255;return r+e},f.prototype.writeUInt8=function(t,r,e){return t=+t,r>>>=0,e||L(this,t,r,1,255,0),this[r]=255&t,r+1},f.prototype.writeUInt16LE=function(t,r,e){return t=+t,r>>>=0,e||L(this,t,r,2,65535,0),this[r]=255&t,this[r+1]=t>>>8,r+2},f.prototype.writeUInt16BE=function(t,r,e){return t=+t,r>>>=0,e||L(this,t,r,2,65535,0),this[r]=t>>>8,this[r+1]=255&t,r+2},f.prototype.writeUInt32LE=function(t,r,e){return t=+t,r>>>=0,e||L(this,t,r,4,4294967295,0),this[r+3]=t>>>24,this[r+2]=t>>>16,this[r+1]=t>>>8,this[r]=255&t,r+4},f.prototype.writeUInt32BE=function(t,r,e){return t=+t,r>>>=0,e||L(this,t,r,4,4294967295,0),this[r]=t>>>24,this[r+1]=t>>>16,this[r+2]=t>>>8,this[r+3]=255&t,r+4},f.prototype.writeIntLE=function(t,r,e,n){if(t=+t,r>>>=0,!n){var i=Math.pow(2,8*e-1);L(this,t,r,e,i-1,-i)}var o=0,f=1,u=0;for(this[r]=255&t;++o<e&&(f*=256);)t<0&&0===u&&0!==this[r+o-1]&&(u=1),this[r+o]=(t/f>>0)-u&255;return r+e},f.prototype.writeIntBE=function(t,r,e,n){if(t=+t,r>>>=0,!n){var i=Math.pow(2,8*e-1);L(this,t,r,e,i-1,-i)}var o=e-1,f=1,u=0;for(this[r+o]=255&t;--o>=0&&(f*=256);)t<0&&0===u&&0!==this[r+o+1]&&(u=1),this[r+o]=(t/f>>0)-u&255;return r+e},f.prototype.writeInt8=function(t,r,e){return t=+t,r>>>=0,e||L(this,t,r,1,127,-128),t<0&&(t=255+t+1),this[r]=255&t,r+1},f.prototype.writeInt16LE=function(t,r,e){return t=+t,r>>>=0,e||L(this,t,r,2,32767,-32768),this[r]=255&t,this[r+1]=t>>>8,r+2},f.prototype.writeInt16BE=function(t,r,e){return t=+t,r>>>=0,e||L(this,t,r,2,32767,-32768),this[r]=t>>>8,this[r+1]=255&t,r+2},f.prototype.writeInt32LE=function(t,r,e){return t=+t,r>>>=0,e||L(this,t,r,4,2147483647,-2147483648),this[r]=255&t,this[r+1]=t>>>8,this[r+2]=t>>>16,this[r+3]=t>>>24,r+4},f.prototype.writeInt32BE=function(t,r,e){return t=+t,r>>>=0,e||L(this,t,r,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),this[r]=t>>>24,this[r+1]=t>>>16,this[r+2]=t>>>8,this[r+3]=255&t,r+4},f.prototype.writeFloatLE=function(t,r,e){return x(this,t,r,!0,e)},f.prototype.writeFloatBE=function(t,r,e){return x(this,t,r,!1,e)},f.prototype.writeDoubleLE=function(t,r,e){return M(this,t,r,!0,e)},f.prototype.writeDoubleBE=function(t,r,e){return M(this,t,r,!1,e)},f.prototype.copy=function(t,r,e,n){if(!f.isBuffer(t))throw new TypeError("argument should be a Buffer");if(e||(e=0),n||0===n||(n=this.length),r>=t.length&&(r=t.length),r||(r=0),n>0&&n<e&&(n=e),n===e)return 0;if(0===t.length||0===this.length)return 0;if(r<0)throw new RangeError("targetStart out of bounds");if(e<0||e>=this.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),t.length-r<n-e&&(n=t.length-r+e);var i=n-e;if(this===t&&"function"==typeof Uint8Array.prototype.copyWithin)this.copyWithin(r,e,n);else if(this===t&&e<r&&r<n)for(var o=i-1;o>=0;--o)t[o+r]=this[o+e];else Uint8Array.prototype.set.call(t,this.subarray(e,n),r);return i},f.prototype.fill=function(t,r,e,n){if("string"==typeof t){if("string"==typeof r?(n=r,r=0,e=this.length):"string"==typeof e&&(n=e,e=this.length),void 0!==n&&"string"!=typeof n)throw new TypeError("encoding must be a string");if("string"==typeof n&&!f.isEncoding(n))throw new TypeError("Unknown encoding: "+n);if(1===t.length){var i=t.charCodeAt(0);("utf8"===n&&i<128||"latin1"===n)&&(t=i)}}else"number"==typeof t&&(t&=255);if(r<0||this.length<r||this.length<e)throw new RangeError("Out of range index");if(e<=r)return this;var o;if(r>>>=0,e=void 0===e?this.length:e>>>0,t||(t=0),"number"==typeof t)for(o=r;o<e;++o)this[o]=t;else{var u=f.isBuffer(t)?t:f.from(t,n),s=u.length;if(0===s)throw new TypeError('The value "'+t+'" is invalid for argument "value"');for(o=0;o<e-r;++o)this[o+r]=u[o%s]}return this};var O=/[^+/0-9A-Za-z-_]/g;function k(t){return t<16?"0"+t.toString(16):t.toString(16)}function N(t,r){var e;r=r||1/0;for(var n=t.length,i=null,o=[],f=0;f<n;++f){if((e=t.charCodeAt(f))>55295&&e<57344){if(!i){if(e>56319){(r-=3)>-1&&o.push(239,191,189);continue}if(f+1===n){(r-=3)>-1&&o.push(239,191,189);continue}i=e;continue}if(e<56320){(r-=3)>-1&&o.push(239,191,189),i=e;continue}e=65536+(i-55296<<10|e-56320)}else i&&(r-=3)>-1&&o.push(239,191,189);if(i=null,e<128){if((r-=1)<0)break;o.push(e)}else if(e<2048){if((r-=2)<0)break;o.push(e>>6|192,63&e|128)}else if(e<65536){if((r-=3)<0)break;o.push(e>>12|224,e>>6&63|128,63&e|128)}else{if(!(e<1114112))throw new Error("Invalid code point");if((r-=4)<0)break;o.push(e>>18|240,e>>12&63|128,e>>6&63|128,63&e|128)}}return o}function P(t){return r.toByteArray(function(t){if((t=(t=t.split("=")[0]).trim().replace(O,"")).length<2)return"";for(;t.length%4!=0;)t+="=";return t}(t))}function j(t,r,e,n){for(var i=0;i<n&&!(i+e>=r.length||i>=t.length);++i)r[i+e]=t[i];return i}function z(t,r){return t instanceof r||null!=t&&null!=t.constructor&&null!=t.constructor.name&&t.constructor.name===r.name}function D(t){return t!=t}}).call(this)}).call(this,t("buffer").Buffer)},{"base64-js":2,buffer:3,ieee754:4}],4:[function(t,r,e){e.read=function(t,r,e,n,i){var o,f,u=8*i-n-1,s=(1<<u)-1,h=s>>1,a=-7,c=e?i-1:0,p=e?-1:1,l=t[r+c];for(c+=p,o=l&(1<<-a)-1,l>>=-a,a+=u;a>0;o=256*o+t[r+c],c+=p,a-=8);for(f=o&(1<<-a)-1,o>>=-a,a+=n;a>0;f=256*f+t[r+c],c+=p,a-=8);if(0===o)o=1-h;else{if(o===s)return f?NaN:1/0*(l?-1:1);f+=Math.pow(2,n),o-=h}return(l?-1:1)*f*Math.pow(2,o-n)},e.write=function(t,r,e,n,i,o){var f,u,s,h=8*o-i-1,a=(1<<h)-1,c=a>>1,p=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,l=n?0:o-1,y=n?1:-1,g=r<0||0===r&&1/r<0?1:0;for(r=Math.abs(r),isNaN(r)||r===1/0?(u=isNaN(r)?1:0,f=a):(f=Math.floor(Math.log(r)/Math.LN2),r*(s=Math.pow(2,-f))<1&&(f--,s*=2),(r+=f+c>=1?p/s:p*Math.pow(2,1-c))*s>=2&&(f++,s/=2),f+c>=a?(u=0,f=a):f+c>=1?(u=(r*s-1)*Math.pow(2,i),f+=c):(u=r*Math.pow(2,c-1)*Math.pow(2,i),f=0));i>=8;t[e+l]=255&u,l+=y,u/=256,i-=8);for(f=f<<i|u,h+=i;h>0;t[e+l]=255&f,l+=y,f/=256,h-=8);t[e+l-y]|=128*g}},{}]},{},[1]);
}, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, function(_0xc6a4b0, _0x7437ff, _0x459722) {
    var _0x4bddd8;
    ! function() {
        'use strict';
        var _0x459722 = {}.hasOwnProperty;

        function _0x428a46() {
            for (var _0xc6a4b0 = [], _0x7437ff = 0x0; _0x7437ff < arguments.length; _0x7437ff++) {
                var _0x26c9fe = arguments[_0x7437ff];
                if (_0x26c9fe) {
                    var _0x53e692 = typeof _0x26c9fe;
                    if ('string' === _0x53e692 || 'number' === _0x53e692) _0xc6a4b0.push(this && this[_0x26c9fe] || _0x26c9fe);
                    else if (Array.isArray(_0x26c9fe)) _0xc6a4b0.push(_0x428a46.apply(this, _0x26c9fe));
                    else if ('object' === _0x53e692)
                        for (var _0x12d444 in _0x26c9fe) _0x459722.call(_0x26c9fe, _0x12d444) && _0x26c9fe[_0x12d444] && _0xc6a4b0.push(this && this[_0x12d444] || _0x12d444);
                }
            }
            return _0xc6a4b0.join(' ');
        }
        _0xc6a4b0.exports ? (_0x428a46.default = _0x428a46, _0xc6a4b0.exports = _0x428a46) : void 0x0 === (_0x4bddd8 = function() {
            return _0x428a46;
        }.apply(_0x7437ff, [])) || (_0xc6a4b0.exports = _0x4bddd8);
    }();
}, function(module) {
    module.exports = {
        'ejs-wrapper': 'ejs--de6433374cb30211f10e148b320b2f',
        'ejs': 'ejs--7a5f920ceffb2913f6dbda780573cf',
        'ejs--full-ui': 'ejs--f3a002bba9836fe4ebfed357a45521',
        'controls-tabs': 'ejs--008adea3c1ef33a8fc94892a1e97e6',
        'overlay': 'ejs--85a95eb6bf74a40ab61b91a91e5bff',
        'key-setting-popup': 'ejs--d169a219343bc32dd4aecc3f6b7f25',
        'loading-info': 'ejs--782e3572812f983b3a150eec177391',
        'p1': 'ejs--c426dd1d179aa351e6cec47e1d9438',
        'p2': 'ejs--31e7e81db48819ee35ec6f50378a2e',
        'p3': 'ejs--20d4eb2646d396f558a645dc0574f1',
        'p4': 'ejs--4de05306c8b099bdeb4585571ac095',
        'ejs__contextmenu': 'ejs--c7957d8666bb6b8fc7c3e9c021aaf8',
        'ad': 'ejs--cbcfe0a1421cadac9a04c81d6431d6',
        'close-ad': 'ejs--f3a1903d935f6cf720d4a0498db62a',
        'start-game': 'ejs--73f9b4e94a7a1fe74e11107d5ab2ef',
        'pulse': 'ejs--9bd947b3e6427453595f083d740a7c',
        'ejs__control': 'ejs--8732295ca5c4902a060d34706a8146',
        'ejs__tab-focus': 'ejs--a83b6c705e103e81a7762d0ed5e64b',
        'ejs__control--pressed': 'ejs--b1238136ec472a92297159882cf4b8',
        'icon--pressed': 'ejs--ec731619062226d943da67f5d83009',
        'icon--not-pressed': 'ejs--dc7068585e3d84fe0e676864c1439e',
        'label--pressed': 'ejs--0c6561f9155750b0aeeed6da5da7bf',
        'label--not-pressed': 'ejs--13d64e30c1333cc99391af48ddabaa',
        'ejs--video': 'ejs--d5f430a99a1619b3434bf58e34a99c',
        'ejs__controls': 'ejs--1acedc5ed6816abe96dd27d910fd74',
        'ejs__progress': 'ejs--f1aa376719b564cae0e653157cde14',
        'ejs__time': 'ejs--90d2780f99bcc76fdb6b0378a7238e',
        'ejs__menu': 'ejs--c7bfb2d1b75a40fdaaf90624bea9e7',
        'ejs__volume': 'ejs--36ceeeec0df37a9cf4bbe05fa204ec',
        'ejs--hide-controls': 'ejs--1b8cb7f2294b1eb5de5238daea3513',
        'ejs--fullscreen-enabled': 'ejs--19409fe2057ab935a7e46abb5b4f49',
        'ejs__tooltip': 'ejs--74c6d4176d27e37a19d2e9e61de8f4',
        'ejs__menu__container': 'ejs--013213afedeeb6878089b1ca1b4e47',
        'ejs-popup': 'ejs--c2532bfe04554193cc42b3be753700',
        'ejs__control--forward': 'ejs--0b4cdb4057d1a4623e60836ccc6275',
        'ejs__control--back': 'ejs--a7ad9de0cb0ca672b6703c50de7db9',
        'ejs__menu__value': 'ejs--f91e90fe7cabc875aff9a431bf5389',
        'ejs__tooltip--visible': 'ejs--6ea27aa07e60d1d6e4c9782740028a',
        'ejs--menu-open': 'ejs--da54136ccf8c6b0b16d98e8b8e8b88',
        'ejs__video-wrapper': 'ejs--057800d021995e1347ec07cb748672',
        'portrait': 'ejs--64f1256f556fb94454b930cb3ea7f2',
        'game-started': 'ejs--7da7949f602347007818e6d192eb23',
        'ejs__progress__buffer': 'ejs--f8d706413436fd119cf01aaf5a9d9d',
        'ejs--audio': 'ejs--bd0222e58d71b0a304d6037dfcffd5',
        'ejs--loading': 'ejs--2521e1257996f264de36e77cc9c5ee',
        'ejs__dialogs': 'ejs--d31688f864f56d6426ebbf2217d6ee',
        'ejs__dialog': 'ejs--5e71fd80268afbb1d588e40b993508',
        'ejs__cache__container': 'ejs--1e0f0672f67d0e96592314c9ed78b0',
        'ejs__loading__container': 'ejs--d7e6a6a8f38bfaa256fe5d709a8258',
        'ejs__load-state__container': 'ejs--b183f581b5336c4908ad258d3e1cc7',
        'ejs__screenRecord__container': 'ejs--b183f581b5336cashrqd258d3e1cc7',
        'ejs__netplay__container': 'ejs--158ea9dd34e3e7af2d837f8b05babb',
        'ejs__gamepad__container': 'ejs--3f0897a8158ba363a0ee0afe4da7c5',
        'dialog-container': 'ejs--38cc09882a55e98c76168dbe838aa0',
        'dialog-title': 'ejs--b373c9d5029d49324fb8ac3ece96c1',
        'dialog-content': 'ejs--a5e2629abb9a5bcbc8b2c1307922d2',
        'dialog-buttons': 'ejs--580e3c22e63f8a1eb29694fd0b141b',
        'btn-cancel': 'ejs--ad20569e1449d7b8e99e6465960456',
        'btn-reset': 'ejs--ad20569e1449d7b8e99e6465963825',
        'btn-clear': 'ejs--ad20569e1449d7b8e99e6468571053',
        'btn-close': 'ejs--iehanqurh382hriwqoriuehqr83hq9',
        'tabs': 'ejs--8e7922427f460a31935084b7acfb1a',
        'active': 'ejs--68d337c212ec6a5bc43125440d422b',
        'tabs-content': 'ejs--31eb28817642bb1bfe0a2c422108bb',
        'tabs-panel': 'ejs--f932566a0af5314da834324c901978',
        'button-container': 'ejs--c233fb69cbef43078bc39e9d1efac8',
        'btn-submit': 'ejs--bdb54e9fc47f9805b506b746e897bf',
        'btn-create-room': 'ejs--67d03ee7480b871ad6507d6319a839',
        'btn-quit': 'ejs--c2d931157456c1d438d40a2f66af2c',
        'set': 'ejs--6604c83041a275a78837c452a71dd8',
        'btn-join-room': 'ejs--99150e15f962c63c689cadc81ef40d',
        'netplay-player-name': 'ejs--71527b6509aa48afce3ce1a11c02f0',
        'netplay-player-name-input': 'ejs--7ad35768e3f6b9faf97db01d5b60ae',
        'netplay-player-name-set': 'ejs--9c403e5e107a3e4374ba244b636400',
        'netplay-roomlist': 'ejs--d6a46533fa6e510a571af5c28b440a',
        'netplay-create-room': 'ejs--57ca9b3853cc7de731483cfcc95a59',
        'netplay-room-name-input': 'ejs--0885d5e25e19127b6b516014426a1b',
        'netplay-room-password-input': 'ejs--25023d28756fdb9dfbbfb6dccb8677',
        'netplay-create-room-set': 'ejs--75b3a8d35aacc6424ed7422fdeaaaa',
        'netplay-room': 'ejs--eefdf28d69ed2d20f197308981bb61',
        'cheats-add': 'ejs--9e670880bb57e824400fa00f09aaad',
        'cheats-list': 'ejs--2b4e3c245b7b25dfdac5e09155a68e',
        'cheat-code-input': 'ejs--572b0b3a0345a6b01b01a15a02842c',
        'cheat-name-input': 'ejs--a7d7f80c8999469c991ea452a85dd9',
        'ejs__widgets': 'ejs--952c974392296e7f643d51db380157',
        'ejs__widget': 'ejs--0d7e216cf12ae73705b5d5bb0452fc',
        'ejs__widget_controls_toggle': 'ejs--666d4296310579687cf3cf3d2cf951',
        'ejs__widget_netplay': 'ejs--c0a5e71f6613caab66d6ae15a5a00f',
        'virtual-gamepad': 'ejs--2440e3b831017ff8327c939e2a4413',
        'top': 'ejs--b8d8b771d0bbb94e2bbd03054f53fd',
        'left': 'ejs--c83d70cb63c933edc073c7fe92e32b',
        'buttons': 'ejs--6e7015634623fd6a82e6a7d3488c84',
        'center': 'ejs--49fa47c86a131e4ca8fb268bfdde89',
        'right': 'ejs--7d2b19f77fd0ccabf94dc1ca39ae18',
        'touch': 'ejs--d708d9d486f1eca73a593d5c09f8ad',
        'modal': 'ejs--eefec939452eb92fad035932d0f47c',
        'modal__overlay': 'ejs--f1f43b27384834c8c22c6f81d0c5ae',
        'modal__container': 'ejs--c4ee33766a01ed0356c3ec07898e96',
        'modal__header': 'ejs--a073f32023da1ced805c5f95a4e81c',
        'modal__footer': 'ejs--ed44f59bb8cd49177586b140658c6c',
        'modal__title': 'ejs--81470ba5e6a6d68014839ad4d9a977',
        'modal__close': 'ejs--c3c85789c2a7f56d8b26dba75b7e1f',
        'modal__content': 'ejs--db44f5520e6f4fd0dd34b478bb9ee8',
        'modal__btn': 'ejs--319bcec5dee9444e1a2a53d6503b7c',
        'modal__btn-primary': 'ejs--eaf3c1cba25d415d92ac48d7db34dd',
        'modal__errmsg': 'ejs--940087708c06b6129ce2bfa45f1d89',
        'micromodal-slide': 'ejs--bef295f3125e9ba83d4f3677264bae',
        'is-open': 'ejs--60c17e0d149099f207b06f27edae6a',
        'mmfadeIn': 'ejs--9d7aa2bd5ee276be085e5b2a0bbc2e',
        'mmslideIn': 'ejs--8b069266f76099cc6bc220f6ea56cc',
        'mmfadeOut': 'ejs--184b7558ffeb569c1790654537477b',
        'mmslideOut': 'ejs--379a464ad0e66ea5fc601e5f2fd73e',
        'ejs-switch': 'ejs--4c3e63d4005bd8a0468e9c74a35f62',
        'ejs-delete-cheat': 'ejs--90bcdd71cd0d2307e9ee0dffa916da',
        'icon--exit-fullscreen': 'ejs--2b3dd6e2e26c0f0dc4ac5779dedd5e',
        'ejs--fullscreen-fallback': 'ejs--412041671de21945d3e028b6ae84c9',
        'ejs--no-transition': 'ejs--33643265135cf89e6c0a0d9866d6f1',
        'ejs__sr-only': 'ejs--6f0e996cd15e5fb6be0256918531d7',
        'ejs-fade-in': 'ejs--7cadf43f3d9eb17c7e3c36de84973b',
        'dpad-container': 'ejs--914358605501b11476e86626b2ff16',
        'dpad-bg': 'ejs--be66239219d594001da38f91c9ad02',
        'dpad-front': 'ejs--9dbb9be3403878e912527181e2d41b',
        'dpad-1': 'ejs--f9c7797bdf05569bdc13b4f2074270',
        'dpad-2': 'ejs--2645f3bad105488a313c5e30dab74f',
        'dpad-1-bg': 'ejs--a57cf324c8ff108947112e35e589b5',
        'dpad-2-bg': 'ejs--4873d94c18140ab195da609b40b71a',
        'dpad-left': 'ejs--bd9311b0a4f654af6ab5ba28bcf358',
        'dpad-right': 'ejs--704d45ea060cc6809451a0d9d47ad7',
        'dpad-up': 'ejs--f0b89ca5b5621659af184c8e012ccb',
        'dpad-down': 'ejs--8de361d6b01eaa181f8db4ac3eb7af'
    };
}, function(_0xfb1bcc, _0x54234e, _0x2fab2f) {
    var _0x19304b, _0x101743, _0x30cf42;

    function _0x5b8580(_0x55a2a2) {
        return (_0x5b8580 = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function(_0x2b66f2) {
            return typeof _0x2b66f2;
        } : function(_0x4d77c3) {
            return _0x4d77c3 && 'function' == typeof Symbol && _0x4d77c3.constructor === Symbol && _0x4d77c3 !== Symbol.prototype ? 'symbol' : typeof _0x4d77c3;
        })(_0x55a2a2);
    }! function(_0x55acb1) {
        'object' == _0x5b8580(_0x54234e) && void 0x0 !== _0xfb1bcc ? _0xfb1bcc.exports = _0x55acb1() : (_0x101743 = [], void 0x0 === (_0x30cf42 = 'function' == typeof(_0x19304b = _0x55acb1) ? _0x19304b.apply(_0x54234e, _0x101743) : _0x19304b) || (_0xfb1bcc.exports = _0x30cf42));
    }(function() {
        function _0x3fa093() {}

        function _0x472eae(_0x245243, _0xb70880) {
            return this.identifier = _0xb70880.identifier, this.position = _0xb70880.position, this.frontPosition = _0xb70880.frontPosition, this.collection = _0x245243, this.defaults = {
                'size': 0x64,
                'threshold': 0.1,
                'color': 'white',
                'fadeTime': 0xfa,
                'dataOnly': !0x1,
                'restJoystick': true,
                'restOpacity': 0.5,
                'mode': 'dynamic',
                'zone': document.body,
                'lockX': !0x1,
                'lockY': !0x1
            }, this.config(_0xb70880), 'dynamic' === this.options.mode && (this.options.restOpacity = 0x0), this.id = _0x472eae.id, _0x472eae.id += 0x1, this.buildEl().stylize(), this.instance = {
                'el': this.ui.el,
                'on': this.on.bind(this),
                'off': this.off.bind(this),
                'show': this.show.bind(this),
                'hide': this.hide.bind(this),
                'add': this.addToDom.bind(this),
                'remove': this.removeFromDom.bind(this),
                'destroy': this.destroy.bind(this),
                'resetDirection': this.resetDirection.bind(this),
                'computeDirection': this.computeDirection.bind(this),
                'trigger': this.trigger.bind(this),
                'position': this.position,
                'frontPosition': this.frontPosition,
                'ui': this.ui,
                'identifier': this.identifier,
                'id': this.id,
                'options': this.options
            }, this.instance;
        }

        function _0x16647e(_0xa2b08, _0x5f1598) {
            var _0x3eabe7 = this;
            return _0x3eabe7.nipples = [], _0x3eabe7.idles = [], _0x3eabe7.actives = [], _0x3eabe7.ids = [], _0x3eabe7.pressureIntervals = {}, _0x3eabe7.manager = _0xa2b08, _0x3eabe7.id = _0x16647e.id, _0x16647e.id += 0x1, _0x3eabe7.defaults = {
                'zone': document.body,
                'multitouch': !0x1,
                'maxNumberOfNipples': 0xa,
                'mode': 'dynamic',
                'position': {
                    'top': 0x0,
                    'left': 0x0
                },
                'catchDistance': 0xc8,
                'size': 0x64,
                'threshold': 0.1,
                'color': 'white',
                'fadeTime': 0xfa,
                'dataOnly': !0x1,
                'restJoystick': true,
                'restOpacity': 0.5,
                'lockX': !0x1,
                'lockY': !0x1
            }, _0x3eabe7.config(_0x5f1598), 'static' !== _0x3eabe7.options.mode && 'semi' !== _0x3eabe7.options.mode || (_0x3eabe7.options.multitouch = !0x1), _0x3eabe7.options.multitouch || (_0x3eabe7.options.maxNumberOfNipples = 0x1), _0x3eabe7.updateBox(), _0x3eabe7.prepareNipples(), _0x3eabe7.bindings(), _0x3eabe7.begin(), _0x3eabe7.nipples;
        }

        function _0x239176(_0x314d03) {
            var _0x472eae, _0x16647e = this;
            return _0x16647e.ids = {}, _0x16647e.index = 0x0, _0x16647e.collections = [], _0x16647e.config(_0x314d03), _0x16647e.prepareCollections(), _0x58adb3.bindEvt(window, 'resize', function(_0x286619) {
                clearTimeout(_0x472eae), _0x472eae = setTimeout(function() {
                    var _0x286619, _0x472eae = _0x58adb3.getScroll();
                    _0x16647e.collections.forEach(function(_0x51b063) {
                        _0x51b063.forEach(function(_0xac9967) {
                            _0x286619 = _0xac9967.el.getBoundingClientRect(), _0xac9967.position = {
                                'x': _0x472eae.x + _0x286619.left,
                                'y': _0x472eae.y + _0x286619.top
                            };
                        });
                    });
                }, 0x64);
            }), _0x16647e.collections;
        }
        var _0x57280e, _0x127f2 = !!('ontouchstart' in window),
            _0xaf874f = !!window.PointerEvent,
            _0xfaede4 = !!window.MSPointerEvent,
            _0x436e84 = {
                'start': 'mousedown',
                'move': 'mousemove',
                'end': 'mouseup'
            },
            _0x3ab23c = {};
        _0xaf874f ? _0x57280e = {
            'start': 'pointerdown',
            'move': 'pointermove',
            'end': 'pointerup, pointercancel'
        } : _0xfaede4 ? _0x57280e = {
            'start': 'MSPointerDown',
            'move': 'MSPointerMove',
            'end': 'MSPointerUp'
        } : _0x127f2 ? (_0x57280e = {
            'start': 'touchstart',
            'move': 'touchmove',
            'end': 'touchend, touchcancel'
        }, _0x3ab23c = _0x436e84) : _0x57280e = _0x436e84;
        var _0x58adb3 = {
            'distance': function(_0xe2d137, _0x4a91b4) {
                var _0x16647e = _0x4a91b4.x - _0xe2d137.x,
                    _0x69f31c = _0x4a91b4.y - _0xe2d137.y;
                return Math.sqrt(_0x16647e * _0x16647e + _0x69f31c * _0x69f31c);
            },
            'angle': function(_0x33e493, _0x9d3464) {
                var _0x16647e = _0x9d3464.x - _0x33e493.x,
                    _0x41214c = _0x9d3464.y - _0x33e493.y;
                return _0x58adb3.degrees(Math.atan2(_0x41214c, _0x16647e));
            },
            'findCoord': function(_0x3b9179, _0x54b275, _0x5b7648) {
                var _0x3183ba = {
                    'x': 0x0,
                    'y': 0x0
                };
                return _0x5b7648 = _0x58adb3.radians(_0x5b7648), _0x3183ba.x = _0x3b9179.x - _0x54b275 * Math.cos(_0x5b7648), _0x3183ba.y = _0x3b9179.y - _0x54b275 * Math.sin(_0x5b7648), _0x3183ba;
            },
            'radians': function(_0x32b21c) {
                return _0x32b21c * (Math.PI / 0xb4);
            },
            'degrees': function(_0x5a7b5a) {
                return _0x5a7b5a * (0xb4 / Math.PI);
            },
            'bindEvt': function(_0x33d8ea, _0x4f8b23, _0x3e6d3a) {
                for (var _0x18d0a3, _0x276598 = _0x4f8b23.split(/[ ,]+/g), _0x2f2026 = 0x0; _0x2f2026 < _0x276598.length; _0x2f2026 += 0x1) _0x18d0a3 = _0x276598[_0x2f2026], _0x33d8ea.addEventListener ? _0x33d8ea.addEventListener(_0x18d0a3, _0x3e6d3a, !0x1) : _0x33d8ea.attachEvent && _0x33d8ea.attachEvent(_0x18d0a3, _0x3e6d3a);
            },
            'unbindEvt': function(_0x5e647a, _0x4dd2d9, _0x14fccc) {
                for (var _0x463f77, _0x22297b = _0x4dd2d9.split(/[ ,]+/g), _0x3a86ae = 0x0; _0x3a86ae < _0x22297b.length; _0x3a86ae += 0x1) _0x463f77 = _0x22297b[_0x3a86ae], _0x5e647a.removeEventListener ? _0x5e647a.removeEventListener(_0x463f77, _0x14fccc) : _0x5e647a.detachEvent && _0x5e647a.detachEvent(_0x463f77, _0x14fccc);
            },
            'trigger': function(_0x1c4995, _0x1374ef, _0x20bf72) {
                var _0x8fde6e = new CustomEvent(_0x1374ef, _0x20bf72);
                _0x1c4995.dispatchEvent(_0x8fde6e);
            },
            'prepareEvent': function(_0x3f48af) {
                return _0x3f48af.preventDefault(), _0x3f48af.type.match(/^touch/) ? _0x3f48af.changedTouches : _0x3f48af;
            },
            'getScroll': function() {
                return {
                    'x': void 0x0 !== window.pageXOffset ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft,
                    'y': void 0x0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
                };
            },
            'applyPosition': function(_0x466237, _0x7d975a) {
                _0x7d975a.top || _0x7d975a.right || _0x7d975a.bottom || _0x7d975a.left ? (_0x466237.style.top = _0x7d975a.top, _0x466237.style.right = _0x7d975a.right, _0x466237.style.bottom = _0x7d975a.bottom, _0x466237.style.left = _0x7d975a.left) : (_0x466237.style.left = _0x7d975a.x + 'px', _0x466237.style.top = _0x7d975a.y + 'px');
            },
            'getTransitionStyle': function(_0x1112bc, _0x4fa4c7, _0xfe6b69) {
                var _0x1356a5 = _0x58adb3.configStylePropertyObject(_0x1112bc);
                for (var _0x7f9207 in _0x1356a5)
                    if (_0x1356a5.hasOwnProperty(_0x7f9207))
                        if ('string' == typeof _0x4fa4c7) _0x1356a5[_0x7f9207] = _0x4fa4c7 + ' ' + _0xfe6b69;
                        else {
                            for (var _0x2df8ef = '', _0x14e123 = 0x0, _0x19b35e = _0x4fa4c7.length; _0x14e123 < _0x19b35e; _0x14e123 += 0x1) _0x2df8ef += _0x4fa4c7[_0x14e123] + ' ' + _0xfe6b69 + ', ';
                            _0x1356a5[_0x7f9207] = _0x2df8ef.slice(0x0, -0x2);
                        }
                return _0x1356a5;
            },
            'getVendorStyle': function(_0x54efd6, _0x3ce7bf) {
                var _0x16647e = _0x58adb3.configStylePropertyObject(_0x54efd6);
                for (var _0x3f54f3 in _0x16647e) _0x16647e.hasOwnProperty(_0x3f54f3) && (_0x16647e[_0x3f54f3] = _0x3ce7bf);
                return _0x16647e;
            },
            'configStylePropertyObject': function(_0x483453) {
                var _0x472eae = {};
                return _0x472eae[_0x483453] = '', ['webkit', 'Moz', 'o'].forEach(function(_0x5285f6) {
                    _0x472eae[_0x5285f6 + _0x483453.charAt(0x0).toUpperCase() + _0x483453.slice(0x1)] = '';
                }), _0x472eae;
            },
            'extend': function(_0x4a9a4d, _0x406e9b) {
                for (var _0x16647e in _0x406e9b) _0x406e9b.hasOwnProperty(_0x16647e) && (_0x4a9a4d[_0x16647e] = _0x406e9b[_0x16647e]);
                return _0x4a9a4d;
            },
            'safeExtend': function(_0x96b22, _0x393dc2) {
                var _0x16647e = {};
                for (var _0x5586ca in _0x96b22) _0x96b22.hasOwnProperty(_0x5586ca) && _0x393dc2.hasOwnProperty(_0x5586ca) ? _0x16647e[_0x5586ca] = _0x393dc2[_0x5586ca] : _0x96b22.hasOwnProperty(_0x5586ca) && (_0x16647e[_0x5586ca] = _0x96b22[_0x5586ca]);
                return _0x16647e;
            },
            'map': function(_0x3d3efe, _0x174497) {
                if (_0x3d3efe.length)
                    for (var _0x16647e = 0x0, _0x577b31 = _0x3d3efe.length; _0x16647e < _0x577b31; _0x16647e += 0x1) _0x174497(_0x3d3efe[_0x16647e]);
                else _0x174497(_0x3d3efe);
            }
        };
        _0x3fa093.prototype.on = function(_0x2bb1a4, _0x55f49f) {
            var _0x16647e, _0x584142 = this,
                _0x21f57b = _0x2bb1a4.split(/[ ,]+/g);
            _0x584142._handlers_ = _0x584142._handlers_ || {};
            for (var _0x271586 = 0x0; _0x271586 < _0x21f57b.length; _0x271586 += 0x1) _0x16647e = _0x21f57b[_0x271586], _0x584142._handlers_[_0x16647e] = _0x584142._handlers_[_0x16647e] || [], _0x584142._handlers_[_0x16647e].push(_0x55f49f);
            return _0x584142;
        }, _0x3fa093.prototype.off = function(_0x241550, _0xc2215a) {
            var _0x16647e = this;
            return _0x16647e._handlers_ = _0x16647e._handlers_ || {}, void 0x0 === _0x241550 ? _0x16647e._handlers_ = {} : void 0x0 === _0xc2215a ? _0x16647e._handlers_[_0x241550] = null : _0x16647e._handlers_[_0x241550] && _0x16647e._handlers_[_0x241550].indexOf(_0xc2215a) >= 0x0 && _0x16647e._handlers_[_0x241550].splice(_0x16647e._handlers_[_0x241550].indexOf(_0xc2215a), 0x1), _0x16647e;
        }, _0x3fa093.prototype.trigger = function(_0x38a190, _0x828e63) {
            var _0x16647e, _0xcf280d = this,
                _0xaa0dc6 = _0x38a190.split(/[ ,]+/g);
            _0xcf280d._handlers_ = _0xcf280d._handlers_ || {};
            for (var _0x5c0574 = 0x0; _0x5c0574 < _0xaa0dc6.length; _0x5c0574 += 0x1) _0x16647e = _0xaa0dc6[_0x5c0574], _0xcf280d._handlers_[_0x16647e] && _0xcf280d._handlers_[_0x16647e].length && _0xcf280d._handlers_[_0x16647e].forEach(function(_0xd6a234) {
                _0xd6a234.call(_0xcf280d, {
                    'type': _0x16647e,
                    'target': _0xcf280d
                }, _0x828e63);
            });
        }, _0x3fa093.prototype.config = function(_0x4c598e) {
            var _0x472eae = this;
            _0x472eae.options = _0x472eae.defaults || {}, _0x4c598e && (_0x472eae.options = _0x58adb3.safeExtend(_0x472eae.options, _0x4c598e));
        }, _0x3fa093.prototype.bindEvt = function(_0x1ada9c, _0x498cf5) {
            var _0x16647e = this;
            return _0x16647e._domHandlers_ = _0x16647e._domHandlers_ || {}, _0x16647e._domHandlers_[_0x498cf5] = function() {
                'function' == typeof _0x16647e['on' + _0x498cf5] ? _0x16647e['on' + _0x498cf5].apply(_0x16647e, arguments) : console.warn('[WARNING] : Missing "on' + _0x498cf5 + '" handler.');
            }, _0x58adb3.bindEvt(_0x1ada9c, _0x57280e[_0x498cf5], _0x16647e._domHandlers_[_0x498cf5]), _0x3ab23c[_0x498cf5] && _0x58adb3.bindEvt(_0x1ada9c, _0x3ab23c[_0x498cf5], _0x16647e._domHandlers_[_0x498cf5]), _0x16647e;
        }, _0x3fa093.prototype.unbindEvt = function(_0x5d5ea4, _0x581a68) {
            var _0x16647e = this;
            return _0x16647e._domHandlers_ = _0x16647e._domHandlers_ || {}, _0x58adb3.unbindEvt(_0x5d5ea4, _0x57280e[_0x581a68], _0x16647e._domHandlers_[_0x581a68]), _0x3ab23c[_0x581a68] && _0x58adb3.unbindEvt(_0x5d5ea4, _0x3ab23c[_0x581a68], _0x16647e._domHandlers_[_0x581a68]), delete _0x16647e._domHandlers_[_0x581a68], this;
        }, _0x472eae.prototype = new _0x3fa093(), _0x472eae.constructor = _0x472eae, _0x472eae.id = 0x0, _0x472eae.prototype.buildEl = function(_0x2b6936) {
            return this.ui = {}, this.options.dataOnly ? this : (this.ui.el = document.createElement('div'), this.ui.back = document.createElement('div'), this.ui.front = document.createElement('div'), this.ui.el.className = 'nipple collection_' + this.collection.id, this.ui.back.className = 'back', this.ui.front.className = 'front', this.ui.el.setAttribute('id', 'nipple_' + this.collection.id + '_' + this.id), this.ui.el.appendChild(this.ui.back), this.ui.el.appendChild(this.ui.front), this);
        }, _0x472eae.prototype.stylize = function() {
            if (this.options.dataOnly) return this;
            var _0x3fa093 = this.options.fadeTime + 'ms',
                _0x472eae = _0x58adb3.getVendorStyle('borderRadius', '50%'),
                _0x16647e = _0x58adb3.getTransitionStyle('transition', 'opacity', _0x3fa093),
                _0x344f45 = {};
            return _0x344f45.el = {
                'position': 'absolute',
                'opacity': this.options.restOpacity,
                'display': 'block',
                'zIndex': 0x3e7
            }, _0x344f45.back = {
                'position': 'absolute',
                'display': 'block',
                'width': this.options.size + 'px',
                'height': this.options.size + 'px',
                'marginLeft': -this.options.size / 0x2 + 'px',
                'marginTop': -this.options.size / 0x2 + 'px',
                'background': this.options.color,
                'opacity': '.5'
            }, _0x344f45.front = {
                'width': this.options.size / 0x2 + 'px',
                'height': this.options.size / 0x2 + 'px',
                'position': 'absolute',
                'display': 'block',
                'marginLeft': -this.options.size / 0x4 + 'px',
                'marginTop': -this.options.size / 0x4 + 'px',
                'background': this.options.color,
                'opacity': '.5'
            }, _0x58adb3.extend(_0x344f45.el, _0x16647e), _0x58adb3.extend(_0x344f45.back, _0x472eae), _0x58adb3.extend(_0x344f45.front, _0x472eae), this.applyStyles(_0x344f45), this;
        }, _0x472eae.prototype.applyStyles = function(_0x3381ee) {
            for (var _0x472eae in this.ui)
                if (this.ui.hasOwnProperty(_0x472eae))
                    for (var _0x16647e in _0x3381ee[_0x472eae]) this.ui[_0x472eae].style[_0x16647e] = _0x3381ee[_0x472eae][_0x16647e];
            return this;
        }, _0x472eae.prototype.addToDom = function() {
            return this.options.dataOnly || document.body.contains(this.ui.el) ? this : (this.options.zone.appendChild(this.ui.el), this);
        }, _0x472eae.prototype.removeFromDom = function() {
            return this.options.dataOnly || !document.body.contains(this.ui.el) ? this : (this.options.zone.removeChild(this.ui.el), this);
        }, _0x472eae.prototype.destroy = function() {
            clearTimeout(this.removeTimeout), clearTimeout(this.showTimeout), clearTimeout(this.restTimeout), this.trigger('destroyed', this.instance), this.removeFromDom(), this.off();
        }, _0x472eae.prototype.show = function(_0x6bda29) {
            var _0x472eae = this;
            return _0x472eae.options.dataOnly ? _0x472eae : (clearTimeout(_0x472eae.removeTimeout), clearTimeout(_0x472eae.showTimeout), clearTimeout(_0x472eae.restTimeout), _0x472eae.addToDom(), _0x472eae.restCallback(), setTimeout(function() {
                _0x472eae.ui.el.style.opacity = 0x1;
            }, 0x0), _0x472eae.showTimeout = setTimeout(function() {
                _0x472eae.trigger('shown', _0x472eae.instance), 'function' == typeof _0x6bda29 && _0x6bda29.call(this);
            }, _0x472eae.options.fadeTime), _0x472eae);
        }, _0x472eae.prototype.hide = function(_0x5d40e9) {
            var _0x472eae = this;
            return _0x472eae.options.dataOnly ? _0x472eae : (_0x472eae.ui.el.style.opacity = _0x472eae.options.restOpacity, clearTimeout(_0x472eae.removeTimeout), clearTimeout(_0x472eae.showTimeout), clearTimeout(_0x472eae.restTimeout), _0x472eae.removeTimeout = setTimeout(function() {
                var _0x16647e = 'dynamic' === _0x472eae.options.mode ? 'none' : 'block';
                _0x472eae.ui.el.style.display = _0x16647e, 'function' == typeof _0x5d40e9 && _0x5d40e9.call(_0x472eae), _0x472eae.trigger('hidden', _0x472eae.instance);
            }, _0x472eae.options.fadeTime), _0x472eae.options.restJoystick && _0x472eae.restPosition(), _0x472eae);
        }, _0x472eae.prototype.restPosition = function(_0x535ac8) {
            var _0x472eae = this;
            _0x472eae.frontPosition = {
                'x': 0x0,
                'y': 0x0
            };
            var _0x16647e = _0x472eae.options.fadeTime + 'ms',
                _0x274bb9 = {};
            _0x274bb9.front = _0x58adb3.getTransitionStyle('transition', ['top', 'left'], _0x16647e);
            var _0x4998bc = {
                'front': {}
            };
            _0x4998bc.front = {
                'left': _0x472eae.frontPosition.x + 'px',
                'top': _0x472eae.frontPosition.y + 'px'
            }, _0x472eae.applyStyles(_0x274bb9), _0x472eae.applyStyles(_0x4998bc), _0x472eae.restTimeout = setTimeout(function() {
                'function' == typeof _0x535ac8 && _0x535ac8.call(_0x472eae), _0x472eae.restCallback();
            }, _0x472eae.options.fadeTime);
        }, _0x472eae.prototype.restCallback = function() {
            var _0x3fa093 = this,
                _0x472eae = {};
            _0x472eae.front = _0x58adb3.getTransitionStyle('transition', 'none', ''), _0x3fa093.applyStyles(_0x472eae), _0x3fa093.trigger('rested', _0x3fa093.instance);
        }, _0x472eae.prototype.resetDirection = function() {
            this.direction = {
                'x': !0x1,
                'y': !0x1,
                'angle': !0x1
            };
        }, _0x472eae.prototype.computeDirection = function(_0x43e5d8) {
            var _0x472eae, _0x16647e, _0xfc023b, _0xee7b86 = _0x43e5d8.angle.radian,
                _0x22a09e = Math.PI / 0x4,
                _0xc76eb4 = Math.PI / 0x2;
            if (_0xee7b86 > _0x22a09e && _0xee7b86 < 0x3 * _0x22a09e && !_0x43e5d8.lockX ? _0x472eae = 'up' : _0xee7b86 > -_0x22a09e && _0xee7b86 <= _0x22a09e && !_0x43e5d8.lockY ? _0x472eae = 'left' : _0xee7b86 > 0x3 * -_0x22a09e && _0xee7b86 <= -_0x22a09e && !_0x43e5d8.lockX ? _0x472eae = 'down' : _0x43e5d8.lockY || (_0x472eae = 'right'), _0x43e5d8.lockY || (_0x16647e = _0xee7b86 > -_0xc76eb4 && _0xee7b86 < _0xc76eb4 ? 'left' : 'right'), _0x43e5d8.lockX || (_0xfc023b = _0xee7b86 > 0x0 ? 'up' : 'down'), _0x43e5d8.force > this.options.threshold) {
                var _0x3e5187 = {};
                for (var _0x28b8ad in this.direction) this.direction.hasOwnProperty(_0x28b8ad) && (_0x3e5187[_0x28b8ad] = this.direction[_0x28b8ad]);
                var _0x2939ab = {};
                for (var _0x28b8ad in this.direction = {
                        'x': _0x16647e,
                        'y': _0xfc023b,
                        'angle': _0x472eae
                    }, _0x43e5d8.direction = this.direction, _0x3e5187) _0x3e5187[_0x28b8ad] === this.direction[_0x28b8ad] && (_0x2939ab[_0x28b8ad] = true);
                if (_0x2939ab.x && _0x2939ab.y && _0x2939ab.angle) return _0x43e5d8;
                _0x2939ab.x && _0x2939ab.y || this.trigger('plain', _0x43e5d8), _0x2939ab.x || this.trigger('plain:' + _0x16647e, _0x43e5d8), _0x2939ab.y || this.trigger('plain:' + _0xfc023b, _0x43e5d8), _0x2939ab.angle || this.trigger('dir dir:' + _0x472eae, _0x43e5d8);
            }
            return _0x43e5d8;
        }, _0x16647e.prototype = new _0x3fa093(), _0x16647e.constructor = _0x16647e, _0x16647e.id = 0x0, _0x16647e.prototype.prepareNipples = function() {
            var _0x3fa093 = this,
                _0x472eae = _0x3fa093.nipples;
            _0x472eae.on = _0x3fa093.on.bind(_0x3fa093), _0x472eae.off = _0x3fa093.off.bind(_0x3fa093), _0x472eae.options = _0x3fa093.options, _0x472eae.destroy = _0x3fa093.destroy.bind(_0x3fa093), _0x472eae.ids = _0x3fa093.ids, _0x472eae.id = _0x3fa093.id, _0x472eae.processOnMove = _0x3fa093.processOnMove.bind(_0x3fa093), _0x472eae.processOnEnd = _0x3fa093.processOnEnd.bind(_0x3fa093), _0x472eae.get = function(_0x551448) {
                if (void 0x0 === _0x551448) return _0x472eae[0x0];
                for (var _0x16647e = 0x0, _0x189014 = _0x472eae.length; _0x16647e < _0x189014; _0x16647e += 0x1)
                    if (_0x472eae[_0x16647e].identifier === _0x551448) return _0x472eae[_0x16647e];
                return !0x1;
            };
        }, _0x16647e.prototype.bindings = function() {
            var _0x3fa093 = this;
            _0x3fa093.bindEvt(_0x3fa093.options.zone, 'start'), _0x3fa093.options.zone.style.touchAction = 'none', _0x3fa093.options.zone.style.msTouchAction = 'none';
        }, _0x16647e.prototype.begin = function() {
            var _0x3fa093 = this,
                _0x472eae = _0x3fa093.options;
            if ('static' === _0x472eae.mode) {
                var _0x16647e = _0x3fa093.createNipple(_0x472eae.position, _0x3fa093.manager.getIdentifier());
                _0x16647e.add(), _0x3fa093.idles.push(_0x16647e);
            }
        }, _0x16647e.prototype.createNipple = function(_0xc0ab75, _0x5ce020) {
            var _0x386a33 = this,
                _0x173c13 = _0x58adb3.getScroll(),
                _0x3c5320 = {},
                _0x500442 = _0x386a33.options;
            if (_0xc0ab75.x && _0xc0ab75.y) _0x3c5320 = {
                'x': _0xc0ab75.x - (_0x173c13.x + _0x386a33.box.left),
                'y': _0xc0ab75.y - (_0x173c13.y + _0x386a33.box.top)
            };
            else if (_0xc0ab75.top || _0xc0ab75.right || _0xc0ab75.bottom || _0xc0ab75.left) {
                var _0x549507 = document.createElement('DIV');
                _0x549507.style.display = 'hidden', _0x549507.style.top = _0xc0ab75.top, _0x549507.style.right = _0xc0ab75.right, _0x549507.style.bottom = _0xc0ab75.bottom, _0x549507.style.left = _0xc0ab75.left, _0x549507.style.position = 'absolute', _0x500442.zone.appendChild(_0x549507);
                var _0x399802 = _0x549507.getBoundingClientRect();
                _0x500442.zone.removeChild(_0x549507), _0x3c5320 = _0xc0ab75, _0xc0ab75 = {
                    'x': _0x399802.left + _0x173c13.x,
                    'y': _0x399802.top + _0x173c13.y
                };
            }
            var _0x1efaec = new _0x472eae(_0x386a33, {
                'color': _0x500442.color,
                'size': _0x500442.size,
                'threshold': _0x500442.threshold,
                'fadeTime': _0x500442.fadeTime,
                'dataOnly': _0x500442.dataOnly,
                'restJoystick': _0x500442.restJoystick,
                'restOpacity': _0x500442.restOpacity,
                'mode': _0x500442.mode,
                'identifier': _0x5ce020,
                'position': _0xc0ab75,
                'zone': _0x500442.zone,
                'frontPosition': {
                    'x': 0x0,
                    'y': 0x0
                }
            });
            return _0x500442.dataOnly || (_0x58adb3.applyPosition(_0x1efaec.ui.el, _0x3c5320), _0x58adb3.applyPosition(_0x1efaec.ui.front, _0x1efaec.frontPosition)), _0x386a33.nipples.push(_0x1efaec), _0x386a33.trigger('added ' + _0x1efaec.identifier + ':added', _0x1efaec), _0x386a33.manager.trigger('added ' + _0x1efaec.identifier + ':added', _0x1efaec), _0x386a33.bindNipple(_0x1efaec), _0x1efaec;
        }, _0x16647e.prototype.updateBox = function() {
            this.box = this.options.zone.getBoundingClientRect();
        }, _0x16647e.prototype.bindNipple = function(_0xf4e27d) {
            var _0x472eae, _0x16647e = this,
                _0x4afd5b = function(_0x15dccf, _0xc9235b) {
                    _0x472eae = _0x15dccf.type + ' ' + _0xc9235b.id + ':' + _0x15dccf.type, _0x16647e.trigger(_0x472eae, _0xc9235b);
                };
            _0xf4e27d.on('destroyed', _0x16647e.onDestroyed.bind(_0x16647e)), _0xf4e27d.on('shown hidden rested dir plain', _0x4afd5b), _0xf4e27d.on('dir:up dir:right dir:down dir:left', _0x4afd5b), _0xf4e27d.on('plain:up plain:right plain:down plain:left', _0x4afd5b);
        }, _0x16647e.prototype.pressureFn = function(_0x136ce1, _0xc3b871, _0x2644f5) {
            var _0x19ef4e = this,
                _0xa70739 = 0x0;
            clearInterval(_0x19ef4e.pressureIntervals[_0x2644f5]), _0x19ef4e.pressureIntervals[_0x2644f5] = setInterval(function() {
                var _0x2644f5 = _0x136ce1.force || _0x136ce1.pressure || _0x136ce1.webkitForce || 0x0;
                _0x2644f5 !== _0xa70739 && (_0xc3b871.trigger('pressure', _0x2644f5), _0x19ef4e.trigger('pressure ' + _0xc3b871.identifier + ':pressure', _0x2644f5), _0xa70739 = _0x2644f5);
            }.bind(_0x19ef4e), 0x64);
        }, _0x16647e.prototype.onstart = function(_0x5699c2) {
            var _0x472eae = this,
                _0x16647e = _0x472eae.options;
            _0x5699c2 = _0x58adb3.prepareEvent(_0x5699c2), _0x472eae.updateBox();
            return _0x58adb3.map(_0x5699c2, function(_0x17a155) {
                _0x472eae.actives.length < _0x16647e.maxNumberOfNipples && _0x472eae.processOnStart(_0x17a155);
            }), _0x472eae.manager.bindDocument(), !0x1;
        }, _0x16647e.prototype.processOnStart = function(_0x4d7333) {
            var _0x472eae, _0x16647e = this,
                _0x1c6bd6 = _0x16647e.options,
                _0x5a237d = _0x16647e.manager.getIdentifier(_0x4d7333),
                _0x4afe2c = _0x4d7333.force || _0x4d7333.pressure || _0x4d7333.webkitForce || 0x0,
                _0x47c07e = {
                    'x': _0x4d7333.pageX,
                    'y': _0x4d7333.pageY
                },
                _0xd40c11 = _0x16647e.getOrCreate(_0x5a237d, _0x47c07e);
            _0xd40c11.identifier !== _0x5a237d && _0x16647e.manager.removeIdentifier(_0xd40c11.identifier), _0xd40c11.identifier = _0x5a237d;
            var _0x5e158d = function(_0x3f02f1) {
                _0x3f02f1.trigger('start', _0x3f02f1), _0x16647e.trigger('start ' + _0x3f02f1.id + ':start', _0x3f02f1), _0x3f02f1.show(), _0x4afe2c > 0x0 && _0x16647e.pressureFn(_0x4d7333, _0x3f02f1, _0x3f02f1.identifier), _0x16647e.processOnMove(_0x4d7333);
            };
            if ((_0x472eae = _0x16647e.idles.indexOf(_0xd40c11)) >= 0x0 && _0x16647e.idles.splice(_0x472eae, 0x1), _0x16647e.actives.push(_0xd40c11), _0x16647e.ids.push(_0xd40c11.identifier), 'semi' !== _0x1c6bd6.mode) _0x5e158d(_0xd40c11);
            else {
                if (!(_0x58adb3.distance(_0x47c07e, _0xd40c11.position) <= _0x1c6bd6.catchDistance)) return _0xd40c11.destroy(), void _0x16647e.processOnStart(_0x4d7333);
                _0x5e158d(_0xd40c11);
            }
            return _0xd40c11;
        }, _0x16647e.prototype.getOrCreate = function(_0x265630, _0x4759b2) {
            var _0x16647e, _0x2f9720 = this,
                _0x11375b = _0x2f9720.options;
            return /(semi|static)/ .test(_0x11375b.mode) ? (_0x16647e = _0x2f9720.idles[0x0]) ? (_0x2f9720.idles.splice(0x0, 0x1), _0x16647e) : 'semi' === _0x11375b.mode ? _0x2f9720.createNipple(_0x4759b2, _0x265630) : (console.warn('Coudln\x27t find the needed nipple.'), !0x1) : _0x16647e = _0x2f9720.createNipple(_0x4759b2, _0x265630);
        }, _0x16647e.prototype.processOnMove = function(_0x15a60f) {
            var _0x472eae = this,
                _0x16647e = _0x472eae.options,
                _0x1a29a3 = _0x472eae.manager.getIdentifier(_0x15a60f),
                _0x117854 = _0x472eae.nipples.get(_0x1a29a3);
            if (!_0x117854) return console.error('Found zombie joystick with ID ' + _0x1a29a3), void _0x472eae.manager.removeIdentifier(_0x1a29a3);
            _0x117854.identifier = _0x1a29a3;
            var _0x2f202f = _0x117854.options.size / 0x2,
                _0x4cd3e8 = {
                    'x': _0x15a60f.pageX,
                    'y': _0x15a60f.pageY
                },
                _0xb2440c = _0x58adb3.distance(_0x4cd3e8, _0x117854.position),
                _0x2f6ab9 = _0x58adb3.angle(_0x4cd3e8, _0x117854.position),
                _0x266647 = _0x58adb3.radians(_0x2f6ab9),
                _0x55efdf = _0xb2440c / _0x2f202f;
            _0xb2440c > _0x2f202f && (_0xb2440c = _0x2f202f, _0x4cd3e8 = _0x58adb3.findCoord(_0x117854.position, _0xb2440c, _0x2f6ab9));
            var _0x2c7232 = _0x4cd3e8.x - _0x117854.position.x,
                _0x179519 = _0x4cd3e8.y - _0x117854.position.y;
            _0x16647e.lockX && (_0x179519 = 0x0), _0x16647e.lockY && (_0x2c7232 = 0x0), _0x117854.frontPosition = {
                'x': _0x2c7232,
                'y': _0x179519
            }, _0x16647e.dataOnly || _0x58adb3.applyPosition(_0x117854.ui.front, _0x117854.frontPosition);
            var _0x2d347e = {
                'identifier': _0x117854.identifier,
                'position': _0x4cd3e8,
                'force': _0x55efdf,
                'pressure': _0x15a60f.force || _0x15a60f.pressure || _0x15a60f.webkitForce || 0x0,
                'distance': _0xb2440c,
                'angle': {
                    'radian': _0x266647,
                    'degree': _0x2f6ab9
                },
                'instance': _0x117854,
                'lockX': _0x16647e.lockX,
                'lockY': _0x16647e.lockY
            };
            (_0x2d347e = _0x117854.computeDirection(_0x2d347e)).angle = {
                'radian': _0x58adb3.radians(0xb4 - _0x2f6ab9),
                'degree': 0xb4 - _0x2f6ab9
            }, _0x117854.trigger('move', _0x2d347e), _0x472eae.trigger('move ' + _0x117854.id + ':move', _0x2d347e);
        }, _0x16647e.prototype.processOnEnd = function(_0x17d221) {
            var _0x472eae = this,
                _0x16647e = _0x472eae.options,
                _0xfa275e = _0x472eae.manager.getIdentifier(_0x17d221),
                _0x184c33 = _0x472eae.nipples.get(_0xfa275e),
                _0x3c0d87 = _0x472eae.manager.removeIdentifier(_0x184c33.identifier);
            _0x184c33 && (_0x16647e.dataOnly || _0x184c33.hide(function() {
                'dynamic' === _0x16647e.mode && (_0x184c33.trigger('removed', _0x184c33), _0x472eae.trigger('removed ' + _0x184c33.id + ':removed', _0x184c33), _0x472eae.manager.trigger('removed ' + _0x184c33.id + ':removed', _0x184c33), _0x184c33.destroy());
            }), clearInterval(_0x472eae.pressureIntervals[_0x184c33.identifier]), _0x184c33.resetDirection(), _0x184c33.trigger('end', _0x184c33), _0x472eae.trigger('end ' + _0x184c33.id + ':end', _0x184c33), _0x472eae.ids.indexOf(_0x184c33.identifier) >= 0x0 && _0x472eae.ids.splice(_0x472eae.ids.indexOf(_0x184c33.identifier), 0x1), _0x472eae.actives.indexOf(_0x184c33) >= 0x0 && _0x472eae.actives.splice(_0x472eae.actives.indexOf(_0x184c33), 0x1), /(semi|static)/ .test(_0x16647e.mode) ? _0x472eae.idles.push(_0x184c33) : _0x472eae.nipples.indexOf(_0x184c33) >= 0x0 && _0x472eae.nipples.splice(_0x472eae.nipples.indexOf(_0x184c33), 0x1), _0x472eae.manager.unbindDocument(), /(semi|static)/ .test(_0x16647e.mode) && (_0x472eae.manager.ids[_0x3c0d87.id] = _0x3c0d87.identifier));
        }, _0x16647e.prototype.onDestroyed = function(_0x19ea83, _0x59a0c6) {
            var _0x16647e = this;
            _0x16647e.nipples.indexOf(_0x59a0c6) >= 0x0 && _0x16647e.nipples.splice(_0x16647e.nipples.indexOf(_0x59a0c6), 0x1), _0x16647e.actives.indexOf(_0x59a0c6) >= 0x0 && _0x16647e.actives.splice(_0x16647e.actives.indexOf(_0x59a0c6), 0x1), _0x16647e.idles.indexOf(_0x59a0c6) >= 0x0 && _0x16647e.idles.splice(_0x16647e.idles.indexOf(_0x59a0c6), 0x1), _0x16647e.ids.indexOf(_0x59a0c6.identifier) >= 0x0 && _0x16647e.ids.splice(_0x16647e.ids.indexOf(_0x59a0c6.identifier), 0x1), _0x16647e.manager.removeIdentifier(_0x59a0c6.identifier), _0x16647e.manager.unbindDocument();
        }, _0x16647e.prototype.destroy = function() {
            var _0x3fa093 = this;
            for (var _0x472eae in _0x3fa093.unbindEvt(_0x3fa093.options.zone, 'start'), _0x3fa093.nipples.forEach(function(_0x658e68) {
                    _0x658e68.destroy();
                }), _0x3fa093.pressureIntervals) _0x3fa093.pressureIntervals.hasOwnProperty(_0x472eae) && clearInterval(_0x3fa093.pressureIntervals[_0x472eae]);
            _0x3fa093.trigger('destroyed', _0x3fa093.nipples), _0x3fa093.manager.unbindDocument(), _0x3fa093.off();
        }, _0x239176.prototype = new _0x3fa093(), _0x239176.constructor = _0x239176, _0x239176.prototype.prepareCollections = function() {
            var _0x3fa093 = this;
            _0x3fa093.collections.create = _0x3fa093.create.bind(_0x3fa093), _0x3fa093.collections.on = _0x3fa093.on.bind(_0x3fa093), _0x3fa093.collections.off = _0x3fa093.off.bind(_0x3fa093), _0x3fa093.collections.destroy = _0x3fa093.destroy.bind(_0x3fa093), _0x3fa093.collections.get = function(_0x1ddafb) {
                var _0x16647e;
                return _0x3fa093.collections.every(function(_0x14c8e1) {
                    return !(_0x16647e = _0x14c8e1.get(_0x1ddafb));
                }), _0x16647e;
            };
        }, _0x239176.prototype.create = function(_0x46af65) {
            return this.createCollection(_0x46af65);
        }, _0x239176.prototype.createCollection = function(_0x252eb1) {
            var _0x472eae = this,
                _0x58e8ba = new _0x16647e(_0x472eae, _0x252eb1);
            return _0x472eae.bindCollection(_0x58e8ba), _0x472eae.collections.push(_0x58e8ba), _0x58e8ba;
        }, _0x239176.prototype.bindCollection = function(_0x56e9ba) {
            var _0x472eae, _0x16647e = this,
                _0x87b125 = function(_0x7e6251, _0x2c4076) {
                    _0x472eae = _0x7e6251.type + ' ' + _0x2c4076.id + ':' + _0x7e6251.type, _0x16647e.trigger(_0x472eae, _0x2c4076);
                };
            _0x56e9ba.on('destroyed', _0x16647e.onDestroyed.bind(_0x16647e)), _0x56e9ba.on('shown hidden rested dir plain', _0x87b125), _0x56e9ba.on('dir:up dir:right dir:down dir:left', _0x87b125), _0x56e9ba.on('plain:up plain:right plain:down plain:left', _0x87b125);
        }, _0x239176.prototype.bindDocument = function() {
            var _0x3fa093 = this;
            _0x3fa093.binded || (_0x3fa093.bindEvt(document, 'move').bindEvt(document, 'end'), _0x3fa093.binded = true);
        }, _0x239176.prototype.unbindDocument = function(_0x1b19b9) {
            var _0x472eae = this;
            Object.keys(_0x472eae.ids).length && true !== _0x1b19b9 || (_0x472eae.unbindEvt(document, 'move').unbindEvt(document, 'end'), _0x472eae.binded = !0x1);
        }, _0x239176.prototype.getIdentifier = function(_0x5b021b) {
            var _0x472eae;
            return _0x5b021b ? void 0x0 === (_0x472eae = void 0x0 === _0x5b021b.identifier ? _0x5b021b.pointerId : _0x5b021b.identifier) && (_0x472eae = this.latest || 0x0) : _0x472eae = this.index, void 0x0 === this.ids[_0x472eae] && (this.ids[_0x472eae] = this.index, this.index += 0x1), this.latest = _0x472eae, this.ids[_0x472eae];
        }, _0x239176.prototype.removeIdentifier = function(_0x371920) {
            var _0x472eae = {};
            for (var _0x16647e in this.ids)
                if (this.ids[_0x16647e] === _0x371920) {
                    _0x472eae.id = _0x16647e, _0x472eae.identifier = this.ids[_0x16647e], delete this.ids[_0x16647e];
                    break;
                }
            return _0x472eae;
        }, _0x239176.prototype.onmove = function(_0x591f10) {
            return this.onAny('move', _0x591f10), !0x1;
        }, _0x239176.prototype.onend = function(_0x383c4e) {
            return this.onAny('end', _0x383c4e), !0x1;
        }, _0x239176.prototype.oncancel = function(_0x4ff5ab) {
            return this.onAny('end', _0x4ff5ab), !0x1;
        }, _0x239176.prototype.onAny = function(_0x223496, _0x1bbc17) {
            var _0x16647e, _0x91a6ff = this,
                _0x348841 = 'processOn' + _0x223496.charAt(0x0).toUpperCase() + _0x223496.slice(0x1);
            _0x1bbc17 = _0x58adb3.prepareEvent(_0x1bbc17);
            var _0xcd5113 = function(_0x578516, _0x470568, _0x2652b6) {
                _0x2652b6.ids.indexOf(_0x470568) >= 0x0 && (_0x2652b6[_0x348841](_0x578516), _0x578516._found_ = true);
            };
            return _0x58adb3.map(_0x1bbc17, function(_0x22d50b) {
                _0x16647e = _0x91a6ff.getIdentifier(_0x22d50b), _0x58adb3.map(_0x91a6ff.collections, _0xcd5113.bind(null, _0x22d50b, _0x16647e)), _0x22d50b._found_ || _0x91a6ff.removeIdentifier(_0x16647e);
            }), !0x1;
        }, _0x239176.prototype.destroy = function() {
            var _0x3fa093 = this;
            _0x3fa093.unbindDocument(true), _0x3fa093.ids = {}, _0x3fa093.index = 0x0, _0x3fa093.collections.forEach(function(_0x2b7da3) {
                _0x2b7da3.destroy();
            }), _0x3fa093.off();
        }, _0x239176.prototype.onDestroyed = function(_0x31c290, _0x2339d4) {
            var _0x16647e = this;
            if (_0x16647e.collections.indexOf(_0x2339d4) < 0x0) return !0x1;
            _0x16647e.collections.splice(_0x16647e.collections.indexOf(_0x2339d4), 0x1);
        };
        var _0x5c2a4b = new _0x239176();
        return {
            'create': function(_0x19c0dc) {
                return _0x5c2a4b.create(_0x19c0dc);
            },
            'factory': _0x5c2a4b
        };
    });
}, null, function(module) {
    class EJS_NETPLAY {
        
        constructor() {
            console.log(this);
        }
        token() {
            const S4 = function() {
               return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            };
            return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
        }
        open(userID, callback) {
            this.password = this.password || '';
            this.userid = userID;
            this.connectedCB = callback;
            this.isInitiator = true;
            this.openSocket(() => {
                this.socket.send('OpenRoom\n'+this.extra.room_name+'\n'+this.extra.name+'\n'+this.extra.domain+'\n'+this.extra.game_id+'\n'+this.maxParticipantsAllowed+'\n'+this.password);
            })
        }
        join(room, callback) {
            this.extra.room_name = room;
            this.password = this.password || '';
            this.userid = this.token();
            this.connectedCB = callback;
            this.isInitiator = false;
            this.openSocket(() => {
                this.socket.send('JoinRoom\n'+this.extra.room_name+'\n'+this.extra.name+'\n'+this.extra.domain+'\n'+this.extra.game_id+'\n'+this.maxParticipantsAllowed+'\n'+this.password);
            })
        }
        openSocket(callback) {
            this.socket = new WebSocket(this.socketURL);
            this.socket.binaryType = "arraybuffer";
            this.socket.addEventListener('open', callback);
            this.socket.addEventListener('error', this.onError.bind(this));
            //this.socket.addEventListener('close', this.onClose.bind(this));
            this.socket.addEventListener('message', this.onMessage.bind(this));
        }
        onError(e) {
            console.log(e);
        }
        onMessage(e) {
            //console.log("message", e);
            let json;
            try {
                json = JSON.parse(e.data);
            } catch(e) {}
            if (json && !json.msg) {
                console.log(json);
            }
            if (this.connectedCB) {
                if (e.data === "Connected") {
                    this.peers = {};
                    this.peers[this.userid] = {extra: this.extra, userid: this.userid};
                    if (!this.isInitiator) {
                        this.socket.send(JSON.stringify({
                            type: "join",
                            userid: this.userid,
                            extra: this.extra
                        }));
                    }
                    this.onopen(this.userid);
                    this.connectedCB(true);
                } else {
                    this.connectedCB(false, null, "Error");
                    //error
                }
                this.connectedCB = null;
            } else if (json && json.msg) {
                if (this.userid === json.user) return;
                this.onmessage(json.data);
            } else if (json && json.type === 'join') {
                this.peers[json.userid] = {extra: json.extra, userid: json.userid};
                if (this.isInitiator) {
                    this.socket.send(JSON.stringify({
                        type: "peersSync",
                        peers: this.peers
                    }));
                }
                this.onopen(json.userid);
            } else if (json && json.type === "incoming-file") {
                this.incomingFile = {name:json.name};
                this.onFileStart({name:json.name});
            } else if (json && json.type === "file-data") {
                this.incomingFile.data = Uint8Array.from(json.data);
            } else if (json && json.type === "file-end") {
                this.onFileEnd({name:this.incomingFile.name, data: Uint8Array.from(this.incomingFile.data)});
                this.incomingFile = null;
            } else if (json && json.type === "peersSync") {
                this.peers = json.peers;
            }
        }
        send(data) {
            this.socket.send(JSON.stringify({
                data,
                user: this.userid,
                msg: true
            }));
        }
        shareFile(file) {
            this.socket.send(JSON.stringify({
                type: "incoming-file",
                name: file.name
            }));
            file.arrayBuffer().then(ab => {
                this.socket.send(JSON.stringify({
                    type: "file-data",
                    data: Array.from(new Uint8Array(ab))
                }));
                this.socket.send(JSON.stringify({
                    type: "file-end",
                    name: file.name
                }));
            })
        }
        updateExtraData() {
            console.log(arguments);
        }
    }
    module.exports = EJS_NETPLAY;
}, window.EJS_main]).default;
