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
}, null, function(_0x14da87, _0x57407e, _0x2fa590) {
    'use strict';
    (function(_0x227bc8, _0x21b268, _0x521a09) {
        function _0x4ffbab(_0x13a3d0) {
            return (_0x4ffbab = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function(_0x5f01ef) {
                return typeof _0x5f01ef;
            } : function(_0x1020c7) {
                return _0x1020c7 && 'function' == typeof Symbol && _0x1020c7.constructor === Symbol && _0x1020c7 !== Symbol.prototype ? 'symbol' : typeof _0x1020c7;
            })(_0x13a3d0);
        }

        function _0x375f8a() {
            var _0x227bc8 = this,
                _0x57407e = new _0x9828fc();
            _0x227bc8.chunks = {}, _0x227bc8.users = {}, _0x227bc8.readAsArrayBuffer = function(_0x58dfb2, _0x7626c2, _0x4af133) {
                var _0x12911b = {
                    'file': _0x58dfb2,
                    'earlyCallback': function(_0x12782b) {
                        _0x7626c2(_0x7086f7(_0x12782b, {
                            'currentPosition': -0x1
                        }));
                    },
                    'extra': _0x4af133 || {
                        'userid': 0x0
                    }
                };
                _0x58dfb2.extra && Object.keys(_0x58dfb2.extra).length && Object.keys(_0x58dfb2.extra).forEach(function(_0x558fd0) {
                    _0x12911b.extra[_0x558fd0] = _0x58dfb2.extra[_0x558fd0];
                }), _0x57407e.readAsArrayBuffer(_0x227bc8, _0x12911b);
            }, _0x227bc8.getNextChunk = function(_0x37ae5a, _0x7972ae, _0x4c7a43) {
                var _0x604a41;
                void 0x0 !== _0x37ae5a.currentPosition && (_0x604a41 = _0x37ae5a.currentPosition, _0x37ae5a = _0x37ae5a.uuid);
                var _0x476bde = _0x227bc8.chunks[_0x37ae5a];
                if (_0x476bde) {
                    void 0x0 !== _0x4c7a43 ? (_0x227bc8.users[_0x4c7a43 + ''] || (_0x227bc8.users[_0x4c7a43 + ''] = {
                        'fileUUID': _0x37ae5a,
                        'userid': _0x4c7a43,
                        'currentPosition': -0x1
                    }), void 0x0 !== _0x604a41 && (_0x227bc8.users[_0x4c7a43 + ''].currentPosition = _0x604a41), _0x227bc8.users[_0x4c7a43 + ''].currentPosition++, _0x604a41 = _0x227bc8.users[_0x4c7a43 + ''].currentPosition) : (void 0x0 !== _0x604a41 && (_0x227bc8.chunks[_0x37ae5a].currentPosition = _0x604a41), _0x227bc8.chunks[_0x37ae5a].currentPosition++, _0x604a41 = _0x227bc8.chunks[_0x37ae5a].currentPosition);
                    var _0x24854d = _0x476bde[_0x604a41];
                    if (!_0x24854d) return delete _0x227bc8.chunks[_0x37ae5a], void _0x227bc8.convertToArrayBuffer({
                        'chunkMissing': true,
                        'currentPosition': _0x604a41,
                        'uuid': _0x37ae5a
                    }, _0x7972ae);
                    _0x24854d = _0x7086f7(_0x24854d), void 0x0 !== _0x4c7a43 && (_0x24854d.remoteUserId = _0x4c7a43 + ''), _0x24854d.start && _0x227bc8.onBegin(_0x24854d), _0x24854d.end && _0x227bc8.onEnd(_0x24854d), _0x227bc8.onProgress(_0x24854d), _0x227bc8.convertToArrayBuffer(_0x24854d, function(_0x28aba8) {
                        _0x24854d.currentPosition != _0x24854d.maxChunks ? _0x7972ae(_0x28aba8, !0x1) : _0x7972ae(_0x28aba8, true);
                    });
                }
            };
            var _0x2fa590 = new _0x16cb0d(_0x227bc8);

            function _0x7086f7(_0x5ae569, _0x132129) {
                if (null == _0x5ae569 || 'object' != _0x4ffbab(_0x5ae569)) return _0x5ae569;
                if (_0x5ae569.constructor != Object && _0x5ae569.constructor != Array) return _0x5ae569;
                if (_0x5ae569.constructor == Date || _0x5ae569.constructor == RegExp || _0x5ae569.constructor == Function || _0x5ae569.constructor == String || _0x5ae569.constructor == Number || _0x5ae569.constructor == Boolean) return new _0x5ae569[('constructor')](_0x5ae569);
                for (var _0x2fa590 in _0x132129 = _0x132129 || new _0x5ae569[('constructor')](), _0x5ae569) _0x132129[_0x2fa590] = void 0x0 === _0x132129[_0x2fa590] ? _0x7086f7(_0x5ae569[_0x2fa590], null) : _0x132129[_0x2fa590];
                return _0x132129;
            }
            _0x227bc8.addChunk = function(_0x1d353d, _0x2f8a6d) {
                _0x1d353d && _0x2fa590.receive(_0x1d353d, function(_0x3b5f53) {
                    _0x227bc8.convertToArrayBuffer({
                        'readyForNextChunk': true,
                        'currentPosition': _0x3b5f53.currentPosition,
                        'uuid': _0x3b5f53.uuid
                    }, _0x2f8a6d);
                });
            }, _0x227bc8.chunkMissing = function(_0x335036) {
                delete _0x2fa590.chunks[_0x335036.uuid], delete _0x2fa590.chunksWaiters[_0x335036.uuid];
            }, _0x227bc8.onBegin = function() {}, _0x227bc8.onEnd = function() {}, _0x227bc8.onProgress = function() {}, _0x227bc8.convertToObject = _0x312465.ConvertToObject, _0x227bc8.convertToArrayBuffer = _0x312465.ConvertToArrayBuffer, _0x227bc8.setMultipleUsers = function() {};
        }

        function _0x9828fc() {
            this.readAsArrayBuffer = function(_0x4dd34e, _0x4dcd47) {
                var _0x2fa590 = _0x4dcd47.earlyCallback;
                delete _0x4dcd47.earlyCallback,
                    function(_0x10728e, _0x4af117) {
                        _0x4af117 = _0x4af117 || function(_0x1b86cb) {
                            postMessage(_0x1b86cb);
                        };
                        var _0x2fa590 = _0x10728e.file;
                        _0x2fa590.uuid || (_0x2fa590.uuid = (0x64 * Math.random()).toString().replace(/\./g, ''));
                        var _0x21b268 = _0x10728e.chunkSize || 0x3a98;
                        _0x10728e.extra && _0x10728e.extra.chunkSize && (_0x21b268 = _0x10728e.extra.chunkSize);
                        var _0x521a09, _0x501fda = 0x0,
                            _0x58b232 = _0x21b268,
                            _0x41e8e7 = Math.floor(Math.min(0x5f5e100, _0x58b232) / _0x21b268) * _0x21b268,
                            _0x24144f = Math.ceil(_0x2fa590.size / _0x21b268);
                        _0x2fa590.maxChunks = _0x24144f;
                        var _0x3a1fa3 = 0x0,
                            _0x36783 = [];
                        _0x4af117({
                            'currentPosition': _0x3a1fa3,
                            'uuid': _0x2fa590.uuid,
                            'maxChunks': _0x24144f,
                            'size': _0x2fa590.size,
                            'name': _0x2fa590.name,
                            'type': _0x2fa590.type,
                            'lastModifiedDate': (_0x2fa590.lastModifiedDate || new Date()).toString(),
                            'start': true
                        });
                        var _0x14ba6c, _0x11a93b = new FileReader();
                        _0x11a93b.onloadend = function(_0x5ab3c3) {
                            _0x5ab3c3.target.readyState == FileReader.DONE && function(_0x1a8ac9, _0x25d2e6, _0x3fea4f) {
                                _0x521a09 = Math.ceil(_0x25d2e6.byteLength / _0x21b268);
                                for (var _0x26fcc7 = 0x0; _0x26fcc7 < _0x521a09; _0x26fcc7++) {
                                    var _0x198455 = _0x26fcc7 * _0x21b268;
                                    _0x36783[_0x3a1fa3] = _0x25d2e6.slice(_0x198455, Math.min(_0x198455 + _0x21b268, _0x25d2e6.byteLength)), _0x4af117({
                                        'uuid': _0x2fa590.uuid,
                                        'buffer': _0x36783[_0x3a1fa3],
                                        'currentPosition': _0x3a1fa3,
                                        'maxChunks': _0x24144f,
                                        'size': _0x2fa590.size,
                                        'name': _0x2fa590.name,
                                        'lastModifiedDate': (_0x2fa590.lastModifiedDate || new Date()).toString(),
                                        'type': _0x2fa590.type
                                    }), _0x3a1fa3++;
                                }
                                _0x3a1fa3 == _0x24144f && true, _0x3fea4f();
                            }(_0x2fa590.name, _0x5ab3c3.target.result, function() {
                                (++_0x501fda + 0x1) * _0x41e8e7 < _0x2fa590.size ? (_0x14ba6c = _0x2fa590.slice(_0x501fda * _0x41e8e7, (_0x501fda + 0x1) * _0x41e8e7), _0x11a93b.readAsArrayBuffer(_0x14ba6c)) : _0x501fda * _0x41e8e7 < _0x2fa590.size ? (_0x14ba6c = _0x2fa590.slice(_0x501fda * _0x41e8e7, _0x2fa590.size), _0x11a93b.readAsArrayBuffer(_0x14ba6c)) : (_0x2fa590.url = URL.createObjectURL(_0x2fa590), _0x4af117({
                                    'currentPosition': _0x3a1fa3,
                                    'uuid': _0x2fa590.uuid,
                                    'maxChunks': _0x24144f,
                                    'size': _0x2fa590.size,
                                    'name': _0x2fa590.name,
                                    'lastModifiedDate': (_0x2fa590.lastModifiedDate || new Date()).toString(),
                                    'url': URL.createObjectURL(_0x2fa590),
                                    'type': _0x2fa590.type,
                                    'end': true
                                }));
                            });
                        }, _0x3a1fa3 += 0x1, _0x14ba6c = _0x2fa590.slice(_0x501fda * _0x41e8e7, (_0x501fda + 0x1) * _0x41e8e7), _0x11a93b.readAsArrayBuffer(_0x14ba6c);
                    }(_0x4dcd47, function(_0x4a4561) {
                        _0x4dd34e.chunks[_0x4a4561.uuid] || (_0x4dd34e.chunks[_0x4a4561.uuid] = {
                            'currentPosition': -0x1
                        }), _0x4dcd47.extra = _0x4dcd47.extra || {
                            'userid': 0x0
                        }, _0x4a4561.userid = _0x4dcd47.userid || _0x4dcd47.extra.userid || 0x0, _0x4a4561.extra = _0x4dcd47.extra, _0x4dd34e.chunks[_0x4a4561.uuid][_0x4a4561.currentPosition] = _0x4a4561, _0x4a4561.end && _0x2fa590 && (_0x2fa590(_0x4a4561.uuid), _0x2fa590 = null), _0x4a4561.maxChunks > 0xc8 && 0xc8 == _0x4a4561.currentPosition && _0x2fa590 && (_0x2fa590(_0x4a4561.uuid), _0x2fa590 = null);
                    });
            };
        }

        function _0x2e28ea() {
            var _0x227bc8 = this,
                _0x57407e = function() {};

            function _0x35adf9(_0x1e577f, _0x35d31a, _0x142c1a) {
                _0x1e577f = _0x1e577f || function() {};
                var _0x9eb682 = document.createElement('input');
                _0x9eb682.type = 'file', _0x35d31a && (_0x9eb682.multiple = true), _0x142c1a && (_0x9eb682.webkitdirectory = true), _0x9eb682.accept = _0x227bc8.accept, _0x9eb682.onclick = function() {
                        _0x9eb682.clickStarted = true;
                    }, document.body.onfocus = function() {
                        setTimeout(function() {
                            _0x9eb682.clickStarted && (_0x9eb682.clickStarted = !0x1, _0x9eb682.value || _0x57407e());
                        }, 0x1f4);
                    }, _0x9eb682.onchange = function() {
                        if (_0x35d31a) {
                            if (!_0x9eb682.files.length) return void console.error('No file selected.');
                            var _0x227bc8 = [];
                            return Array.from(_0x9eb682.files).forEach(function(_0x2af58c) {
                                _0x2af58c.url = _0x2af58c.webkitRelativePath, _0x227bc8.push(_0x2af58c);
                            }), void _0x1e577f(_0x227bc8);
                        }
                        _0x9eb682.files[0x0] ? (_0x1e577f(_0x9eb682.files[0x0]), _0x9eb682.parentNode.removeChild(_0x9eb682)) : console.error('No file selected.');
                    }, _0x9eb682.style.display = 'none', (document.body || document.documentElement).appendChild(_0x9eb682),
                    function(_0x19672d) {
                        if ('function' == typeof _0x19672d.click) return void _0x19672d.click();
                        if ('function' == typeof _0x19672d.change) return void _0x19672d.change();
                        if (void 0x0 !== document.createEvent('Event')) {
                            if ('function' == typeof(_0x57407e = document.createEvent('Event')).initEvent && 'function' == typeof _0x19672d.dispatchEvent) return _0x57407e.initEvent('click', true, true), void _0x19672d.dispatchEvent(_0x57407e);
                        }
                        var _0x57407e = new MouseEvent('click', {
                            'view': window,
                            'bubbles': true,
                            'cancelable': true
                        });
                        _0x19672d.dispatchEvent(_0x57407e);
                    }(_0x9eb682);
            }
            _0x227bc8.selectSingleFile = function(_0x4fa940, _0x591d34) {
                _0x591d34 && (_0x57407e = _0x591d34), _0x35adf9(_0x4fa940);
            }, _0x227bc8.selectMultipleFiles = function(_0x425e11, _0x2ac31d) {
                _0x2ac31d && (_0x57407e = _0x2ac31d), _0x35adf9(_0x425e11, true);
            }, _0x227bc8.selectDirectory = function(_0x37cf39, _0x415668) {
                _0x415668 && (_0x57407e = _0x415668), _0x35adf9(_0x37cf39, true, true);
            }, _0x227bc8.accept = '*.*';
        }

        function _0x16cb0d(_0x8e4e9f) {
            var _0x57407e = this;
            _0x57407e.chunks = {}, _0x57407e.chunksWaiters = {}, _0x57407e.receive = function _0x2fa590(_0x15cb17, _0x5d669f) {
                if (_0x15cb17.uuid) {
                    if (_0x15cb17.start && !_0x57407e.chunks[_0x15cb17.uuid] && (_0x57407e.chunks[_0x15cb17.uuid] = {}, _0x8e4e9f.onBegin && _0x8e4e9f.onBegin(_0x15cb17)), !_0x15cb17.end && _0x15cb17.buffer && (_0x57407e.chunks[_0x15cb17.uuid][_0x15cb17.currentPosition] = _0x15cb17.buffer), _0x15cb17.end) {
                        var _0x31fb82 = _0x57407e.chunks[_0x15cb17.uuid],
                            _0x32838f = [];
                        Object.keys(_0x31fb82).forEach(function(_0x5c3abb, _0x23c1e3) {
                            _0x32838f.push(_0x31fb82[_0x5c3abb]);
                        });
                        var _0x2545f2 = new Blob(_0x32838f, {
                            'type': _0x15cb17.type
                        });
                        (_0x2545f2 = _0x1e6a28(_0x2545f2, _0x15cb17)).url = URL.createObjectURL(_0x2545f2), _0x2545f2.uuid = _0x15cb17.uuid, _0x2545f2.size || console.error('Something went wrong. Blob Size is 0.'), _0x8e4e9f.onEnd && _0x8e4e9f.onEnd(_0x2545f2), delete _0x57407e.chunks[_0x15cb17.uuid], delete _0x57407e.chunksWaiters[_0x15cb17.uuid];
                    }
                    _0x15cb17.buffer && _0x8e4e9f.onProgress && _0x8e4e9f.onProgress(_0x15cb17), _0x15cb17.end || (_0x5d669f(_0x15cb17), _0x57407e.chunksWaiters[_0x15cb17.uuid] = function() {
                        setTimeout(function _0x8e4e9f() {
                            _0x15cb17.buffer && _0x57407e.chunks[_0x15cb17.uuid] && (_0x15cb17.currentPosition == _0x15cb17.maxChunks || _0x57407e.chunks[_0x15cb17.uuid][_0x15cb17.currentPosition] || (_0x5d669f(_0x15cb17), setTimeout(_0x8e4e9f, 0x1388)));
                        }, 0x1388);
                    }, _0x57407e.chunksWaiters[_0x15cb17.uuid]());
                } else _0x8e4e9f.convertToObject(_0x15cb17, function(_0x2fa56c) {
                    _0x2fa590(_0x2fa56c);
                });
            };
        }
        var _0x312465 = {
            'ConvertToArrayBuffer': function(_0x561864, _0x85e2e2) {
                _0x4928e6.pack(_0x561864, function(_0xc97573) {
                    _0x85e2e2(_0xc97573.buffer);
                });
            },
            'ConvertToObject': function(_0xbedec5, _0x48182e) {
                _0x4928e6.unpack(_0xbedec5, _0x48182e);
            }
        };

        function _0x1e6a28(_0x51381f, _0x26556f) {
            if (_0x51381f || (_0x51381f = {}), !_0x26556f) return _0x51381f;
            for (var _0x2fa590 in _0x26556f) try {
                _0x51381f[_0x2fa590] = _0x26556f[_0x2fa590];
            } catch (_0x1cadcb) {}
            return _0x51381f;
        }
        var _0x37e2da = Uint8Array.BYTES_PER_ELEMENT,
            _0x49bb1a = Uint16Array.BYTES_PER_ELEMENT,
            _0x4929a3 = Uint32Array.BYTES_PER_ELEMENT,
            _0x437498 = {
                'NULL': 0x0,
                'UNDEFINED': 0x1,
                'STRING': 0x2,
                'NUMBER': 0x3,
                'BOOLEAN': 0x4,
                'ARRAY': 0x5,
                'OBJECT': 0x6,
                'INT8ARRAY': 0x7,
                'INT16ARRAY': 0x8,
                'INT32ARRAY': 0x9,
                'UINT8ARRAY': 0xa,
                'UINT16ARRAY': 0xb,
                'UINT32ARRAY': 0xc,
                'FLOAT32ARRAY': 0xd,
                'FLOAT64ARRAY': 0xe,
                'ARRAYBUFFER': 0xf,
                'BLOB': 0x10,
                'FILE': 0x10,
                'BUFFER': 0x11
            },
            _0xb2a130 = [null, null, 'Uint16', 'Float64', 'Uint8', null, null, 'Int8', 'Int16', 'Int32', 'Uint8', 'Uint16', 'Uint32', 'Float32', 'Float64', 'Uint8', 'Uint8', 'Uint8'],
            _0x274b69 = function(_0x297fe0) {
                var _0x57407e = 0x0,
                    _0x2fa590 = 0x0,
                    _0x21b268 = 0x0,
                    _0x521a09 = new ArrayBuffer(_0x297fe0[0x0].byte_length + _0x297fe0[0x0].header_size),
                    _0x5e7442 = new DataView(_0x521a09);
                for (_0x2fa590 = 0x0; _0x2fa590 < _0x297fe0.length; _0x2fa590++) {
                    _0x297fe0[_0x2fa590].header_size;
                    var _0x2227f0 = _0x297fe0[_0x2fa590].type,
                        _0x37072f = _0x297fe0[_0x2fa590].length,
                        _0x4841f8 = _0x297fe0[_0x2fa590].value,
                        _0x4015d6 = _0x297fe0[_0x2fa590].byte_length,
                        _0x5da52f = _0xb2a130[_0x2227f0],
                        _0x1b9cc6 = null === _0x5da52f ? 0x0 : window[_0x5da52f + 'Array'].BYTES_PER_ELEMENT;
                    switch (_0x2227f0 === _0x437498.BUFFER ? _0x5e7442.setUint8(_0x57407e, _0x437498.BLOB, !0x1) : _0x5e7442.setUint8(_0x57407e, _0x2227f0, !0x1), _0x57407e += _0x37e2da, _0x2227f0 !== _0x437498.ARRAY && _0x2227f0 !== _0x437498.OBJECT || (_0x5e7442.setUint16(_0x57407e, _0x37072f, !0x1), _0x57407e += _0x49bb1a), _0x5e7442.setUint32(_0x57407e, _0x4015d6, !0x1), _0x57407e += _0x4929a3, _0x2227f0) {
                        case _0x437498.NULL:
                        case _0x437498.UNDEFINED:
                            break;
                        case _0x437498.STRING:
                            for (_0x21b268 = 0x0; _0x21b268 < _0x37072f; _0x21b268++, _0x57407e += _0x1b9cc6) _0x5e7442.setUint16(_0x57407e, _0x4841f8.charCodeAt(_0x21b268), !0x1);
                            break;
                        case _0x437498.NUMBER:
                        case _0x437498.BOOLEAN:
                            0x0, _0x5e7442['set' + _0x5da52f](_0x57407e, _0x4841f8, !0x1), _0x57407e += _0x1b9cc6;
                            break;
                        case _0x437498.INT8ARRAY:
                        case _0x437498.INT16ARRAY:
                        case _0x437498.INT32ARRAY:
                        case _0x437498.UINT8ARRAY:
                        case _0x437498.UINT16ARRAY:
                        case _0x437498.UINT32ARRAY:
                        case _0x437498.FLOAT32ARRAY:
                        case _0x437498.FLOAT64ARRAY:
                            new Uint8Array(_0x5e7442.buffer, _0x57407e, _0x4015d6).set(new Uint8Array(_0x4841f8.buffer)), _0x57407e += _0x4015d6;
                            break;
                        case _0x437498.ARRAYBUFFER:
                        case _0x437498.BUFFER:
                            new Uint8Array(_0x5e7442.buffer, _0x57407e, _0x4015d6).set(new Uint8Array(_0x4841f8)), _0x57407e += _0x4015d6;
                            break;
                        case _0x437498.BLOB:
                        case _0x437498.ARRAY:
                        case _0x437498.OBJECT:
                            break;
                        default:
                            throw 'TypeError: Unexpected type found.';
                    }
                    0x0;
                }
                return _0x5e7442;
            },
            _0x2e9e54 = function _0x57407e(_0x37452e, _0x38040a) {
                var _0x521a09, _0x26deb8, _0xfbd54a, _0x3f6107, _0x1535e7, _0x406eb5 = 0x0;
                _0x521a09 = _0x37452e.getUint8(_0x38040a, !0x1), _0x38040a += _0x37e2da, _0x521a09 !== _0x437498.ARRAY && _0x521a09 !== _0x437498.OBJECT || (_0x26deb8 = _0x37452e.getUint16(_0x38040a, !0x1), _0x38040a += _0x49bb1a), _0xfbd54a = _0x37452e.getUint32(_0x38040a, !0x1), _0x38040a += _0x4929a3;
                var _0x3b56e7 = _0xb2a130[_0x521a09],
                    _0x5b8ec5 = null === _0x3b56e7 ? 0x0 : window[_0x3b56e7 + 'Array'].BYTES_PER_ELEMENT;
                switch (_0x521a09) {
                    case _0x437498.NULL:
                    case _0x437498.UNDEFINED:
                        0x0, _0x3f6107 = null;
                        break;
                    case _0x437498.STRING:
                        _0x26deb8 = _0xfbd54a / _0x5b8ec5;
                        var _0x3316fc = [];
                        for (_0x406eb5 = 0x0; _0x406eb5 < _0x26deb8; _0x406eb5++) {
                            var _0x35da1f = _0x37452e.getUint16(_0x38040a, !0x1);
                            _0x38040a += _0x5b8ec5, _0x3316fc.push(String.fromCharCode(_0x35da1f));
                        }
                        _0x3f6107 = _0x3316fc.join('');
                        break;
                    case _0x437498.NUMBER:
                        _0x3f6107 = _0x37452e.getFloat64(_0x38040a, !0x1), _0x38040a += _0x5b8ec5;
                        break;
                    case _0x437498.BOOLEAN:
                        _0x3f6107 = 0x1 === _0x37452e.getUint8(_0x38040a, !0x1), _0x38040a += _0x5b8ec5;
                        break;
                    case _0x437498.INT8ARRAY:
                    case _0x437498.INT16ARRAY:
                    case _0x437498.INT32ARRAY:
                    case _0x437498.UINT8ARRAY:
                    case _0x437498.UINT16ARRAY:
                    case _0x437498.UINT32ARRAY:
                    case _0x437498.FLOAT32ARRAY:
                    case _0x437498.FLOAT64ARRAY:
                    case _0x437498.ARRAYBUFFER:
                        _0x1535e7 = _0x37452e.buffer.slice(_0x38040a, _0x38040a + _0xfbd54a), _0x38040a += _0xfbd54a, _0x3f6107 = _0x521a09 === _0x437498.ARRAYBUFFER ? _0x1535e7 : new window[_0x3b56e7 + ('Array')](_0x1535e7);
                        break;
                    case _0x437498.BLOB:
                        if (window.Blob) {
                            var _0x2161f5 = _0x57407e(_0x37452e, _0x38040a),
                                _0x5f11ba = _0x57407e(_0x37452e, _0x2161f5.cursor);
                            _0x38040a = _0x5f11ba.cursor, _0x3f6107 = new Blob([_0x5f11ba.value], {
                                'type': _0x2161f5.value
                            });
                        } else _0x1535e7 = _0x37452e.buffer.slice(_0x38040a, _0x38040a + _0xfbd54a), _0x38040a += _0xfbd54a, _0x3f6107 = new _0x227bc8(_0x1535e7);
                        break;
                    case _0x437498.ARRAY:
                        for (_0x3f6107 = [], _0x406eb5 = 0x0; _0x406eb5 < _0x26deb8; _0x406eb5++) _0x38040a = (_0x1535e7 = _0x57407e(_0x37452e, _0x38040a)).cursor, _0x3f6107.push(_0x1535e7.value);
                        break;
                    case _0x437498.OBJECT:
                        for (_0x3f6107 = {}, _0x406eb5 = 0x0; _0x406eb5 < _0x26deb8; _0x406eb5++) {
                            var _0x4fee35 = _0x57407e(_0x37452e, _0x38040a),
                                _0x118c66 = _0x57407e(_0x37452e, _0x4fee35.cursor);
                            _0x38040a = _0x118c66.cursor, _0x3f6107[_0x4fee35.value] = _0x118c66.value;
                        }
                        break;
                    default:
                        throw 'TypeError: Type not supported.';
                }
                return {
                    'value': _0x3f6107,
                    'cursor': _0x38040a
                };
            },
            _0x3cd888 = function(_0x7f4367, _0x498c64) {
                for (var _0x2fa590 = _0x7f4367.length, _0x21b268 = [], _0x521a09 = 0x0, _0x3fb688 = 0x0, _0x48740b = 0x0; _0x48740b < _0x7f4367.length; _0x48740b++) ! function(_0x48a8b8) {
                    _0x131344(_0x7f4367[_0x48a8b8], function(_0x118c9f) {
                        if (_0x21b268[_0x48a8b8] = _0x118c9f, _0x3fb688 += _0x118c9f[0x0].header_size + _0x118c9f[0x0].byte_length, ++_0x521a09 === _0x2fa590) {
                            for (var _0x341601 = [], _0x44bc9f = 0x0; _0x44bc9f < _0x21b268.length; _0x44bc9f++) _0x341601 = _0x341601.concat(_0x21b268[_0x44bc9f]);
                            _0x498c64(_0x341601, _0x3fb688);
                        }
                    });
                }(_0x48740b);
            },
            _0x131344 = function(_0x26bbec, _0x41d66e) {
                var _0x21b268, _0x521a09, _0xcfca39 = _0x37e2da + _0x4929a3,
                    _0x1c90b5 = 0x0,
                    _0x5a7868 = 0x0,
                    _0x23293e = _0x26bbec;
                switch (_0x521a09 = function(_0x54f8b4) {
                    var _0x41d66e = void 0x0;
                    if (void 0x0 === _0x54f8b4) _0x41d66e = _0x437498.UNDEFINED;
                    else if (null === _0x54f8b4) _0x41d66e = _0x437498.NULL;
                    else {
                        var _0x21b268 = _0x54f8b4.constructor.name,
                            _0x521a09 = _0x54f8b4.constructor.toString().match(/\w+/g)[0x1];
                        if (void 0x0 !== _0x21b268 && void 0x0 !== _0x437498[_0x21b268.toUpperCase()]) _0x41d66e = _0x437498[_0x21b268.toUpperCase()];
                        else if (void 0x0 !== _0x521a09 && void 0x0 !== _0x437498[_0x521a09.toUpperCase()]) _0x41d66e = _0x437498[_0x521a09.toUpperCase()];
                        else switch (_0x4ffbab(_0x54f8b4)) {
                            case 'string':
                                _0x41d66e = _0x437498.STRING;
                                break;
                            case 'number':
                                _0x41d66e = _0x437498.NUMBER;
                                break;
                            case 'boolean':
                                _0x41d66e = _0x437498.BOOLEAN;
                                break;
                            case 'object':
                                _0x54f8b4 instanceof Array ? _0x41d66e = _0x437498.ARRAY : _0x54f8b4 instanceof Int8Array ? _0x41d66e = _0x437498.INT8ARRAY : _0x54f8b4 instanceof Int16Array ? _0x41d66e = _0x437498.INT16ARRAY : _0x54f8b4 instanceof Int32Array ? _0x41d66e = _0x437498.INT32ARRAY : _0x54f8b4 instanceof Uint8Array ? _0x41d66e = _0x437498.UINT8ARRAY : _0x54f8b4 instanceof Uint16Array ? _0x41d66e = _0x437498.UINT16ARRAY : _0x54f8b4 instanceof Uint32Array ? _0x41d66e = _0x437498.UINT32ARRAY : _0x54f8b4 instanceof Float32Array ? _0x41d66e = _0x437498.FLOAT32ARRAY : _0x54f8b4 instanceof Float64Array ? _0x41d66e = _0x437498.FLOAT64ARRAY : _0x54f8b4 instanceof ArrayBuffer ? _0x41d66e = _0x437498.ARRAYBUFFER : _0x54f8b4 instanceof Blob ? _0x41d66e = _0x437498.BLOB : _0x54f8b4 instanceof _0x227bc8 ? _0x41d66e = _0x437498.BUFFER : _0x54f8b4 instanceof Object && (_0x41d66e = _0x437498.OBJECT);
                        }
                    }
                    return _0x41d66e;
                }(_0x26bbec), _0x21b268 = null == _0xb2a130[_0x521a09] ? 0x0 : window[_0xb2a130[_0x521a09] + 'Array'].BYTES_PER_ELEMENT, _0x521a09) {
                    case _0x437498.UNDEFINED:
                    case _0x437498.NULL:
                        break;
                    case _0x437498.NUMBER:
                    case _0x437498.BOOLEAN:
                        _0x1c90b5 = _0x21b268;
                        break;
                    case _0x437498.STRING:
                        _0x1c90b5 += (_0x5a7868 = _0x26bbec.length) * _0x21b268;
                        break;
                    case _0x437498.INT8ARRAY:
                    case _0x437498.INT16ARRAY:
                    case _0x437498.INT32ARRAY:
                    case _0x437498.UINT8ARRAY:
                    case _0x437498.UINT16ARRAY:
                    case _0x437498.UINT32ARRAY:
                    case _0x437498.FLOAT32ARRAY:
                    case _0x437498.FLOAT64ARRAY:
                        _0x1c90b5 += (_0x5a7868 = _0x26bbec.length) * _0x21b268;
                        break;
                    case _0x437498.ARRAY:
                        return void _0x3cd888(_0x26bbec, function(_0x4ce812, _0x3cc28c) {
                            _0x41d66e([{
                                'type': _0x521a09,
                                'length': _0x26bbec.length,
                                'header_size': _0xcfca39 + _0x49bb1a,
                                'byte_length': _0x3cc28c,
                                'value': null
                            }].concat(_0x4ce812));
                        });
                    case _0x437498.OBJECT:
                        var _0x1eb997 = [];
                        for (var _0x501244 in _0x26bbec) _0x26bbec.hasOwnProperty(_0x501244) && (_0x1eb997.push(_0x501244), _0x1eb997.push(_0x26bbec[_0x501244]), _0x5a7868++);
                        return void _0x3cd888(_0x1eb997, function(_0x57eeb8, _0x18e5d9) {
                            _0x41d66e([{
                                'type': _0x521a09,
                                'length': _0x5a7868,
                                'header_size': _0xcfca39 + _0x49bb1a,
                                'byte_length': _0x18e5d9,
                                'value': null
                            }].concat(_0x57eeb8));
                        });
                    case _0x437498.ARRAYBUFFER:
                        _0x1c90b5 += _0x26bbec.byteLength;
                        break;
                    case _0x437498.BLOB:
                        var _0x485cd2 = _0x26bbec.type,
                            _0x15ca13 = new FileReader();
                        return _0x15ca13.onload = function(_0x238bf7) {
                            _0x3cd888([_0x485cd2, _0x238bf7.target.result], function(_0x2faa2d, _0x5dc863) {
                                _0x41d66e([{
                                    'type': _0x521a09,
                                    'length': _0x5a7868,
                                    'header_size': _0xcfca39,
                                    'byte_length': _0x5dc863,
                                    'value': null
                                }].concat(_0x2faa2d));
                            });
                        }, _0x15ca13.onerror = function(_0x18343b) {
                            throw 'FileReader Error: ' + _0x18343b;
                        }, void _0x15ca13.readAsArrayBuffer(_0x26bbec);
                    case _0x437498.BUFFER:
                        _0x1c90b5 += _0x26bbec.length;
                        break;
                    default:
                        throw 'TypeError: Type "' + _0x26bbec.constructor.name + '" not supported.';
                }
                _0x41d66e([{
                    'type': _0x521a09,
                    'length': _0x5a7868,
                    'header_size': _0xcfca39,
                    'byte_length': _0x1c90b5,
                    'value': _0x23293e
                }].concat([]));
            },
            _0x1913f9 = function(_0xbd3651, _0x26d417) {
                var _0x2fa590 = _0xbd3651 instanceof DataView ? _0xbd3651 : new DataView(_0xbd3651);
                return _0x2e9e54(_0x2fa590, 0x0).value;
            };
        var _0x4928e6 = {
            'pack': function(_0x5aea7d, _0x22db9e) {
                try {
                    0x0,
                    _0x131344(_0x5aea7d, function(_0xf0091e) {
                        _0x22db9e(_0x274b69(_0xf0091e));
                    });
                }
                catch (_0x5adeaa) {
                    throw _0x5adeaa;
                }
            },
            'unpack': function(_0x458a5d, _0x3c312b) {
                try {
                    0x0;
                    var _0x2fa590 = _0x1913f9(_0x458a5d);
                    0x0, _0x3c312b(_0x2fa590);
                } catch (_0x11220e) {
                    throw _0x11220e;
                }
            }
        };
        _0x57407e.a = function(_0x1056a5, _0x326931) {
            var _0x3a9045;
            let io;
//socket.io library
!function(t,e){io=e()}(this,(function(){"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function r(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}function i(){return i=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},i.apply(this,arguments)}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&a(t,e)}function s(t){return s=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},s(t)}function a(t,e){return a=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},a(t,e)}function c(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}function u(t,e,n){return u=c()?Reflect.construct.bind():function(t,e,n){var r=[null];r.push.apply(r,e);var i=new(Function.bind.apply(t,r));return n&&a(i,n.prototype),i},u.apply(null,arguments)}function h(t){var e="function"==typeof Map?new Map:void 0;return h=function(t){if(null===t||(n=t,-1===Function.toString.call(n).indexOf("[native code]")))return t;var n;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,r)}function r(){return u(t,arguments,s(this).constructor)}return r.prototype=Object.create(t.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),a(r,t)},h(t)}function f(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function l(t,e){if(e&&("object"==typeof e||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return f(t)}function p(t){var e=c();return function(){var n,r=s(t);if(e){var i=s(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return l(this,n)}}function d(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=s(t)););return t}function y(){return y="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=d(t,e);if(r){var i=Object.getOwnPropertyDescriptor(r,e);return i.get?i.get.call(arguments.length<3?t:n):i.value}},y.apply(this,arguments)}function v(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function g(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(t){if("string"==typeof t)return v(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?v(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,i=function(){};return{s:i,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,s=!0,a=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return s=t.done,t},e:function(t){a=!0,o=t},f:function(){try{s||null==n.return||n.return()}finally{if(a)throw o}}}}var m=Object.create(null);m.open="0",m.close="1",m.ping="2",m.pong="3",m.message="4",m.upgrade="5",m.noop="6";var b=Object.create(null);Object.keys(m).forEach((function(t){b[m[t]]=t}));for(var k={type:"error",data:"parser error"},w="function"==typeof Blob||"undefined"!=typeof Blob&&"[object BlobConstructor]"===Object.prototype.toString.call(Blob),_="function"==typeof ArrayBuffer,O=function(t,e,n){var r,i=t.type,o=t.data;return w&&o instanceof Blob?e?n(o):A(o,n):_&&(o instanceof ArrayBuffer||(r=o,"function"==typeof ArrayBuffer.isView?ArrayBuffer.isView(r):r&&r.buffer instanceof ArrayBuffer))?e?n(o):A(new Blob([o]),n):n(m[i]+(o||""))},A=function(t,e){var n=new FileReader;return n.onload=function(){var t=n.result.split(",")[1];e("b"+t)},n.readAsDataURL(t)},E="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",R="undefined"==typeof Uint8Array?[]:new Uint8Array(256),T=0;T<E.length;T++)R[E.charCodeAt(T)]=T;var C="function"==typeof ArrayBuffer,B=function(t,e){if("string"!=typeof t)return{type:"message",data:N(t,e)};var n=t.charAt(0);return"b"===n?{type:"message",data:S(t.substring(1),e)}:b[n]?t.length>1?{type:b[n],data:t.substring(1)}:{type:b[n]}:k},S=function(t,e){if(C){var n=function(t){var e,n,r,i,o,s=.75*t.length,a=t.length,c=0;"="===t[t.length-1]&&(s--,"="===t[t.length-2]&&s--);var u=new ArrayBuffer(s),h=new Uint8Array(u);for(e=0;e<a;e+=4)n=R[t.charCodeAt(e)],r=R[t.charCodeAt(e+1)],i=R[t.charCodeAt(e+2)],o=R[t.charCodeAt(e+3)],h[c++]=n<<2|r>>4,h[c++]=(15&r)<<4|i>>2,h[c++]=(3&i)<<6|63&o;return u}(t);return N(n,e)}return{base64:!0,data:t}},N=function(t,e){return"blob"===e&&t instanceof ArrayBuffer?new Blob([t]):t},x=String.fromCharCode(30);function L(t){if(t)return function(t){for(var e in L.prototype)t[e]=L.prototype[e];return t}(t)}L.prototype.on=L.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+t]=this._callbacks["$"+t]||[]).push(e),this},L.prototype.once=function(t,e){function n(){this.off(t,n),e.apply(this,arguments)}return n.fn=e,this.on(t,n),this},L.prototype.off=L.prototype.removeListener=L.prototype.removeAllListeners=L.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var n,r=this._callbacks["$"+t];if(!r)return this;if(1==arguments.length)return delete this._callbacks["$"+t],this;for(var i=0;i<r.length;i++)if((n=r[i])===e||n.fn===e){r.splice(i,1);break}return 0===r.length&&delete this._callbacks["$"+t],this},L.prototype.emit=function(t){this._callbacks=this._callbacks||{};for(var e=new Array(arguments.length-1),n=this._callbacks["$"+t],r=1;r<arguments.length;r++)e[r-1]=arguments[r];if(n){r=0;for(var i=(n=n.slice(0)).length;r<i;++r)n[r].apply(this,e)}return this},L.prototype.emitReserved=L.prototype.emit,L.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks["$"+t]||[]},L.prototype.hasListeners=function(t){return!!this.listeners(t).length};var P="undefined"!=typeof self?self:"undefined"!=typeof window?window:Function("return this")();function j(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];return n.reduce((function(e,n){return t.hasOwnProperty(n)&&(e[n]=t[n]),e}),{})}var q=setTimeout,I=clearTimeout;function D(t,e){e.useNativeTimers?(t.setTimeoutFn=q.bind(P),t.clearTimeoutFn=I.bind(P)):(t.setTimeoutFn=setTimeout.bind(P),t.clearTimeoutFn=clearTimeout.bind(P))}var F,M=function(t){o(i,t);var n=p(i);function i(t,r,o){var s;return e(this,i),(s=n.call(this,t)).description=r,s.context=o,s.type="TransportError",s}return r(i)}(h(Error)),U=function(t){o(i,t);var n=p(i);function i(t){var r;return e(this,i),(r=n.call(this)).writable=!1,D(f(r),t),r.opts=t,r.query=t.query,r.readyState="",r.socket=t.socket,r}return r(i,[{key:"onError",value:function(t,e,n){return y(s(i.prototype),"emitReserved",this).call(this,"error",new M(t,e,n)),this}},{key:"open",value:function(){return"closed"!==this.readyState&&""!==this.readyState||(this.readyState="opening",this.doOpen()),this}},{key:"close",value:function(){return"opening"!==this.readyState&&"open"!==this.readyState||(this.doClose(),this.onClose()),this}},{key:"send",value:function(t){"open"===this.readyState&&this.write(t)}},{key:"onOpen",value:function(){this.readyState="open",this.writable=!0,y(s(i.prototype),"emitReserved",this).call(this,"open")}},{key:"onData",value:function(t){var e=B(t,this.socket.binaryType);this.onPacket(e)}},{key:"onPacket",value:function(t){y(s(i.prototype),"emitReserved",this).call(this,"packet",t)}},{key:"onClose",value:function(t){this.readyState="closed",y(s(i.prototype),"emitReserved",this).call(this,"close",t)}}]),i}(L),V="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),H={},K=0,Y=0;function z(t){var e="";do{e=V[t%64]+e,t=Math.floor(t/64)}while(t>0);return e}function W(){var t=z(+new Date);return t!==F?(K=0,F=t):t+"."+z(K++)}for(;Y<64;Y++)H[V[Y]]=Y;function $(t){var e="";for(var n in t)t.hasOwnProperty(n)&&(e.length&&(e+="&"),e+=encodeURIComponent(n)+"="+encodeURIComponent(t[n]));return e}function J(t){for(var e={},n=t.split("&"),r=0,i=n.length;r<i;r++){var o=n[r].split("=");e[decodeURIComponent(o[0])]=decodeURIComponent(o[1])}return e}var X=!1;try{X="undefined"!=typeof XMLHttpRequest&&"withCredentials"in new XMLHttpRequest}catch(t){}var G=X;function Q(t){var e=t.xdomain;try{if("undefined"!=typeof XMLHttpRequest&&(!e||G))return new XMLHttpRequest}catch(t){}if(!e)try{return new(P[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")}catch(t){}}function Z(){}var tt=null!=new Q({xdomain:!1}).responseType,et=function(t){o(s,t);var n=p(s);function s(t){var r;if(e(this,s),(r=n.call(this,t)).polling=!1,"undefined"!=typeof location){var i="https:"===location.protocol,o=location.port;o||(o=i?"443":"80"),r.xd="undefined"!=typeof location&&t.hostname!==location.hostname||o!==t.port,r.xs=t.secure!==i}var a=t&&t.forceBase64;return r.supportsBinary=tt&&!a,r}return r(s,[{key:"name",get:function(){return"polling"}},{key:"doOpen",value:function(){this.poll()}},{key:"pause",value:function(t){var e=this;this.readyState="pausing";var n=function(){e.readyState="paused",t()};if(this.polling||!this.writable){var r=0;this.polling&&(r++,this.once("pollComplete",(function(){--r||n()}))),this.writable||(r++,this.once("drain",(function(){--r||n()})))}else n()}},{key:"poll",value:function(){this.polling=!0,this.doPoll(),this.emitReserved("poll")}},{key:"onData",value:function(t){var e=this;(function(t,e){for(var n=t.split(x),r=[],i=0;i<n.length;i++){var o=B(n[i],e);if(r.push(o),"error"===o.type)break}return r})(t,this.socket.binaryType).forEach((function(t){if("opening"===e.readyState&&"open"===t.type&&e.onOpen(),"close"===t.type)return e.onClose({description:"transport closed by the server"}),!1;e.onPacket(t)})),"closed"!==this.readyState&&(this.polling=!1,this.emitReserved("pollComplete"),"open"===this.readyState&&this.poll())}},{key:"doClose",value:function(){var t=this,e=function(){t.write([{type:"close"}])};"open"===this.readyState?e():this.once("open",e)}},{key:"write",value:function(t){var e=this;this.writable=!1,function(t,e){var n=t.length,r=new Array(n),i=0;t.forEach((function(t,o){O(t,!1,(function(t){r[o]=t,++i===n&&e(r.join(x))}))}))}(t,(function(t){e.doWrite(t,(function(){e.writable=!0,e.emitReserved("drain")}))}))}},{key:"uri",value:function(){var t=this.query||{},e=this.opts.secure?"https":"http",n="";!1!==this.opts.timestampRequests&&(t[this.opts.timestampParam]=W()),this.supportsBinary||t.sid||(t.b64=1),this.opts.port&&("https"===e&&443!==Number(this.opts.port)||"http"===e&&80!==Number(this.opts.port))&&(n=":"+this.opts.port);var r=$(t);return e+"://"+(-1!==this.opts.hostname.indexOf(":")?"["+this.opts.hostname+"]":this.opts.hostname)+n+this.opts.path+(r.length?"?"+r:"")}},{key:"request",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return i(t,{xd:this.xd,xs:this.xs},this.opts),new nt(this.uri(),t)}},{key:"doWrite",value:function(t,e){var n=this,r=this.request({method:"POST",data:t});r.on("success",e),r.on("error",(function(t,e){n.onError("xhr post error",t,e)}))}},{key:"doPoll",value:function(){var t=this,e=this.request();e.on("data",this.onData.bind(this)),e.on("error",(function(e,n){t.onError("xhr poll error",e,n)})),this.pollXhr=e}}]),s}(U),nt=function(t){o(i,t);var n=p(i);function i(t,r){var o;return e(this,i),D(f(o=n.call(this)),r),o.opts=r,o.method=r.method||"GET",o.uri=t,o.async=!1!==r.async,o.data=void 0!==r.data?r.data:null,o.create(),o}return r(i,[{key:"create",value:function(){var t=this,e=j(this.opts,"agent","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");e.xdomain=!!this.opts.xd,e.xscheme=!!this.opts.xs;var n=this.xhr=new Q(e);try{n.open(this.method,this.uri,this.async);try{if(this.opts.extraHeaders)for(var r in n.setDisableHeaderCheck&&n.setDisableHeaderCheck(!0),this.opts.extraHeaders)this.opts.extraHeaders.hasOwnProperty(r)&&n.setRequestHeader(r,this.opts.extraHeaders[r])}catch(t){}if("POST"===this.method)try{n.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch(t){}try{n.setRequestHeader("Accept","*/*")}catch(t){}"withCredentials"in n&&(n.withCredentials=this.opts.withCredentials),this.opts.requestTimeout&&(n.timeout=this.opts.requestTimeout),n.onreadystatechange=function(){4===n.readyState&&(200===n.status||1223===n.status?t.onLoad():t.setTimeoutFn((function(){t.onError("number"==typeof n.status?n.status:0)}),0))},n.send(this.data)}catch(e){return void this.setTimeoutFn((function(){t.onError(e)}),0)}"undefined"!=typeof document&&(this.index=i.requestsCount++,i.requests[this.index]=this)}},{key:"onError",value:function(t){this.emitReserved("error",t,this.xhr),this.cleanup(!0)}},{key:"cleanup",value:function(t){if(void 0!==this.xhr&&null!==this.xhr){if(this.xhr.onreadystatechange=Z,t)try{this.xhr.abort()}catch(t){}"undefined"!=typeof document&&delete i.requests[this.index],this.xhr=null}}},{key:"onLoad",value:function(){var t=this.xhr.responseText;null!==t&&(this.emitReserved("data",t),this.emitReserved("success"),this.cleanup())}},{key:"abort",value:function(){this.cleanup()}}]),i}(L);if(nt.requestsCount=0,nt.requests={},"undefined"!=typeof document)if("function"==typeof attachEvent)attachEvent("onunload",rt);else if("function"==typeof addEventListener){addEventListener("onpagehide"in P?"pagehide":"unload",rt,!1)}function rt(){for(var t in nt.requests)nt.requests.hasOwnProperty(t)&&nt.requests[t].abort()}var it="function"==typeof Promise&&"function"==typeof Promise.resolve?function(t){return Promise.resolve().then(t)}:function(t,e){return e(t,0)},ot=P.WebSocket||P.MozWebSocket,st="undefined"!=typeof navigator&&"string"==typeof navigator.product&&"reactnative"===navigator.product.toLowerCase(),at=function(t){o(i,t);var n=p(i);function i(t){var r;return e(this,i),(r=n.call(this,t)).supportsBinary=!t.forceBase64,r}return r(i,[{key:"name",get:function(){return"websocket"}},{key:"doOpen",value:function(){if(this.check()){var t=this.uri(),e=this.opts.protocols,n=st?{}:j(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(n.headers=this.opts.extraHeaders);try{this.ws=st?new ot(t,e,n):e?new ot(t,e):new ot(t)}catch(t){return this.emitReserved("error",t)}this.ws.binaryType=this.socket.binaryType||"arraybuffer",this.addEventListeners()}}},{key:"addEventListeners",value:function(){var t=this;this.ws.onopen=function(){t.opts.autoUnref&&t.ws._socket.unref(),t.onOpen()},this.ws.onclose=function(e){return t.onClose({description:"websocket connection closed",context:e})},this.ws.onmessage=function(e){return t.onData(e.data)},this.ws.onerror=function(e){return t.onError("websocket error",e)}}},{key:"write",value:function(t){var e=this;this.writable=!1;for(var n=function(n){var r=t[n],i=n===t.length-1;O(r,e.supportsBinary,(function(t){try{e.ws.send(t)}catch(t){}i&&it((function(){e.writable=!0,e.emitReserved("drain")}),e.setTimeoutFn)}))},r=0;r<t.length;r++)n(r)}},{key:"doClose",value:function(){void 0!==this.ws&&(this.ws.close(),this.ws=null)}},{key:"uri",value:function(){var t=this.query||{},e=this.opts.secure?"wss":"ws",n="";this.opts.port&&("wss"===e&&443!==Number(this.opts.port)||"ws"===e&&80!==Number(this.opts.port))&&(n=":"+this.opts.port),this.opts.timestampRequests&&(t[this.opts.timestampParam]=W()),this.supportsBinary||(t.b64=1);var r=$(t);return e+"://"+(-1!==this.opts.hostname.indexOf(":")?"["+this.opts.hostname+"]":this.opts.hostname)+n+this.opts.path+(r.length?"?"+r:"")}},{key:"check",value:function(){return!!ot}}]),i}(U),ct={websocket:at,polling:et},ut=/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,ht=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];function ft(t){var e=t,n=t.indexOf("["),r=t.indexOf("]");-1!=n&&-1!=r&&(t=t.substring(0,n)+t.substring(n,r).replace(/:/g,";")+t.substring(r,t.length));for(var i,o,s=ut.exec(t||""),a={},c=14;c--;)a[ht[c]]=s[c]||"";return-1!=n&&-1!=r&&(a.source=e,a.host=a.host.substring(1,a.host.length-1).replace(/;/g,":"),a.authority=a.authority.replace("[","").replace("]","").replace(/;/g,":"),a.ipv6uri=!0),a.pathNames=function(t,e){var n=/\/{2,9}/g,r=e.replace(n,"/").split("/");"/"!=e.substr(0,1)&&0!==e.length||r.splice(0,1);"/"==e.substr(e.length-1,1)&&r.splice(r.length-1,1);return r}(0,a.path),a.queryKey=(i=a.query,o={},i.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,(function(t,e,n){e&&(o[e]=n)})),o),a}var lt=function(n){o(a,n);var s=p(a);function a(n){var r,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return e(this,a),r=s.call(this),n&&"object"===t(n)&&(o=n,n=null),n?(n=ft(n),o.hostname=n.host,o.secure="https"===n.protocol||"wss"===n.protocol,o.port=n.port,n.query&&(o.query=n.query)):o.host&&(o.hostname=ft(o.host).host),D(f(r),o),r.secure=null!=o.secure?o.secure:"undefined"!=typeof location&&"https:"===location.protocol,o.hostname&&!o.port&&(o.port=r.secure?"443":"80"),r.hostname=o.hostname||("undefined"!=typeof location?location.hostname:"localhost"),r.port=o.port||("undefined"!=typeof location&&location.port?location.port:r.secure?"443":"80"),r.transports=o.transports||["polling","websocket"],r.readyState="",r.writeBuffer=[],r.prevBufferLen=0,r.opts=i({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,timestampParam:"t",rememberUpgrade:!1,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!0},o),r.opts.path=r.opts.path.replace(/\/$/,"")+"/","string"==typeof r.opts.query&&(r.opts.query=J(r.opts.query)),r.id=null,r.upgrades=null,r.pingInterval=null,r.pingTimeout=null,r.pingTimeoutTimer=null,"function"==typeof addEventListener&&(r.opts.closeOnBeforeunload&&addEventListener("beforeunload",(function(){r.transport&&(r.transport.removeAllListeners(),r.transport.close())}),!1),"localhost"!==r.hostname&&(r.offlineEventListener=function(){r.onClose("transport close",{description:"network connection lost"})},addEventListener("offline",r.offlineEventListener,!1))),r.open(),r}return r(a,[{key:"createTransport",value:function(t){var e=i({},this.opts.query);e.EIO=4,e.transport=t,this.id&&(e.sid=this.id);var n=i({},this.opts.transportOptions[t],this.opts,{query:e,socket:this,hostname:this.hostname,secure:this.secure,port:this.port});return new ct[t](n)}},{key:"open",value:function(){var t,e=this;if(this.opts.rememberUpgrade&&a.priorWebsocketSuccess&&-1!==this.transports.indexOf("websocket"))t="websocket";else{if(0===this.transports.length)return void this.setTimeoutFn((function(){e.emitReserved("error","No transports available")}),0);t=this.transports[0]}this.readyState="opening";try{t=this.createTransport(t)}catch(t){return this.transports.shift(),void this.open()}t.open(),this.setTransport(t)}},{key:"setTransport",value:function(t){var e=this;this.transport&&this.transport.removeAllListeners(),this.transport=t,t.on("drain",this.onDrain.bind(this)).on("packet",this.onPacket.bind(this)).on("error",this.onError.bind(this)).on("close",(function(t){return e.onClose("transport close",t)}))}},{key:"probe",value:function(t){var e=this,n=this.createTransport(t),r=!1;a.priorWebsocketSuccess=!1;var i=function(){r||(n.send([{type:"ping",data:"probe"}]),n.once("packet",(function(t){if(!r)if("pong"===t.type&&"probe"===t.data){if(e.upgrading=!0,e.emitReserved("upgrading",n),!n)return;a.priorWebsocketSuccess="websocket"===n.name,e.transport.pause((function(){r||"closed"!==e.readyState&&(f(),e.setTransport(n),n.send([{type:"upgrade"}]),e.emitReserved("upgrade",n),n=null,e.upgrading=!1,e.flush())}))}else{var i=new Error("probe error");i.transport=n.name,e.emitReserved("upgradeError",i)}})))};function o(){r||(r=!0,f(),n.close(),n=null)}var s=function(t){var r=new Error("probe error: "+t);r.transport=n.name,o(),e.emitReserved("upgradeError",r)};function c(){s("transport closed")}function u(){s("socket closed")}function h(t){n&&t.name!==n.name&&o()}var f=function(){n.removeListener("open",i),n.removeListener("error",s),n.removeListener("close",c),e.off("close",u),e.off("upgrading",h)};n.once("open",i),n.once("error",s),n.once("close",c),this.once("close",u),this.once("upgrading",h),n.open()}},{key:"onOpen",value:function(){if(this.readyState="open",a.priorWebsocketSuccess="websocket"===this.transport.name,this.emitReserved("open"),this.flush(),"open"===this.readyState&&this.opts.upgrade&&this.transport.pause)for(var t=0,e=this.upgrades.length;t<e;t++)this.probe(this.upgrades[t])}},{key:"onPacket",value:function(t){if("opening"===this.readyState||"open"===this.readyState||"closing"===this.readyState)switch(this.emitReserved("packet",t),this.emitReserved("heartbeat"),t.type){case"open":this.onHandshake(JSON.parse(t.data));break;case"ping":this.resetPingTimeout(),this.sendPacket("pong"),this.emitReserved("ping"),this.emitReserved("pong");break;case"error":var e=new Error("server error");e.code=t.data,this.onError(e);break;case"message":this.emitReserved("data",t.data),this.emitReserved("message",t.data)}}},{key:"onHandshake",value:function(t){this.emitReserved("handshake",t),this.id=t.sid,this.transport.query.sid=t.sid,this.upgrades=this.filterUpgrades(t.upgrades),this.pingInterval=t.pingInterval,this.pingTimeout=t.pingTimeout,this.maxPayload=t.maxPayload,this.onOpen(),"closed"!==this.readyState&&this.resetPingTimeout()}},{key:"resetPingTimeout",value:function(){var t=this;this.clearTimeoutFn(this.pingTimeoutTimer),this.pingTimeoutTimer=this.setTimeoutFn((function(){t.onClose("ping timeout")}),this.pingInterval+this.pingTimeout),this.opts.autoUnref&&this.pingTimeoutTimer.unref()}},{key:"onDrain",value:function(){this.writeBuffer.splice(0,this.prevBufferLen),this.prevBufferLen=0,0===this.writeBuffer.length?this.emitReserved("drain"):this.flush()}},{key:"flush",value:function(){if("closed"!==this.readyState&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){var t=this.getWritablePackets();this.transport.send(t),this.prevBufferLen=t.length,this.emitReserved("flush")}}},{key:"getWritablePackets",value:function(){if(!(this.maxPayload&&"polling"===this.transport.name&&this.writeBuffer.length>1))return this.writeBuffer;for(var t,e=1,n=0;n<this.writeBuffer.length;n++){var r=this.writeBuffer[n].data;if(r&&(e+="string"==typeof(t=r)?function(t){for(var e=0,n=0,r=0,i=t.length;r<i;r++)(e=t.charCodeAt(r))<128?n+=1:e<2048?n+=2:e<55296||e>=57344?n+=3:(r++,n+=4);return n}(t):Math.ceil(1.33*(t.byteLength||t.size))),n>0&&e>this.maxPayload)return this.writeBuffer.slice(0,n);e+=2}return this.writeBuffer}},{key:"write",value:function(t,e,n){return this.sendPacket("message",t,e,n),this}},{key:"send",value:function(t,e,n){return this.sendPacket("message",t,e,n),this}},{key:"sendPacket",value:function(t,e,n,r){if("function"==typeof e&&(r=e,e=void 0),"function"==typeof n&&(r=n,n=null),"closing"!==this.readyState&&"closed"!==this.readyState){(n=n||{}).compress=!1!==n.compress;var i={type:t,data:e,options:n};this.emitReserved("packetCreate",i),this.writeBuffer.push(i),r&&this.once("flush",r),this.flush()}}},{key:"close",value:function(){var t=this,e=function(){t.onClose("forced close"),t.transport.close()},n=function n(){t.off("upgrade",n),t.off("upgradeError",n),e()},r=function(){t.once("upgrade",n),t.once("upgradeError",n)};return"opening"!==this.readyState&&"open"!==this.readyState||(this.readyState="closing",this.writeBuffer.length?this.once("drain",(function(){t.upgrading?r():e()})):this.upgrading?r():e()),this}},{key:"onError",value:function(t){a.priorWebsocketSuccess=!1,this.emitReserved("error",t),this.onClose("transport error",t)}},{key:"onClose",value:function(t,e){"opening"!==this.readyState&&"open"!==this.readyState&&"closing"!==this.readyState||(this.clearTimeoutFn(this.pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),"function"==typeof removeEventListener&&removeEventListener("offline",this.offlineEventListener,!1),this.readyState="closed",this.id=null,this.emitReserved("close",t,e),this.writeBuffer=[],this.prevBufferLen=0)}},{key:"filterUpgrades",value:function(t){for(var e=[],n=0,r=t.length;n<r;n++)~this.transports.indexOf(t[n])&&e.push(t[n]);return e}}]),a}(L);lt.protocol=4,lt.protocol;var pt="function"==typeof ArrayBuffer,dt=Object.prototype.toString,yt="function"==typeof Blob||"undefined"!=typeof Blob&&"[object BlobConstructor]"===dt.call(Blob),vt="function"==typeof File||"undefined"!=typeof File&&"[object FileConstructor]"===dt.call(File);function gt(t){return pt&&(t instanceof ArrayBuffer||function(t){return"function"==typeof ArrayBuffer.isView?ArrayBuffer.isView(t):t.buffer instanceof ArrayBuffer}(t))||yt&&t instanceof Blob||vt&&t instanceof File}function mt(e,n){if(!e||"object"!==t(e))return!1;if(Array.isArray(e)){for(var r=0,i=e.length;r<i;r++)if(mt(e[r]))return!0;return!1}if(gt(e))return!0;if(e.toJSON&&"function"==typeof e.toJSON&&1===arguments.length)return mt(e.toJSON(),!0);for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&mt(e[o]))return!0;return!1}function bt(t){var e=[],n=t.data,r=t;return r.data=kt(n,e),r.attachments=e.length,{packet:r,buffers:e}}function kt(e,n){if(!e)return e;if(gt(e)){var r={_placeholder:!0,num:n.length};return n.push(e),r}if(Array.isArray(e)){for(var i=new Array(e.length),o=0;o<e.length;o++)i[o]=kt(e[o],n);return i}if("object"===t(e)&&!(e instanceof Date)){var s={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(s[a]=kt(e[a],n));return s}return e}function wt(t,e){return t.data=_t(t.data,e),t.attachments=void 0,t}function _t(e,n){if(!e)return e;if(e&&e._placeholder)return n[e.num];if(Array.isArray(e))for(var r=0;r<e.length;r++)e[r]=_t(e[r],n);else if("object"===t(e))for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(e[i]=_t(e[i],n));return e}var Ot;!function(t){t[t.CONNECT=0]="CONNECT",t[t.DISCONNECT=1]="DISCONNECT",t[t.EVENT=2]="EVENT",t[t.ACK=3]="ACK",t[t.CONNECT_ERROR=4]="CONNECT_ERROR",t[t.BINARY_EVENT=5]="BINARY_EVENT",t[t.BINARY_ACK=6]="BINARY_ACK"}(Ot||(Ot={}));var At=function(){function t(n){e(this,t),this.replacer=n}return r(t,[{key:"encode",value:function(t){return t.type!==Ot.EVENT&&t.type!==Ot.ACK||!mt(t)?[this.encodeAsString(t)]:(t.type=t.type===Ot.EVENT?Ot.BINARY_EVENT:Ot.BINARY_ACK,this.encodeAsBinary(t))}},{key:"encodeAsString",value:function(t){var e=""+t.type;return t.type!==Ot.BINARY_EVENT&&t.type!==Ot.BINARY_ACK||(e+=t.attachments+"-"),t.nsp&&"/"!==t.nsp&&(e+=t.nsp+","),null!=t.id&&(e+=t.id),null!=t.data&&(e+=JSON.stringify(t.data,this.replacer)),e}},{key:"encodeAsBinary",value:function(t){var e=bt(t),n=this.encodeAsString(e.packet),r=e.buffers;return r.unshift(n),r}}]),t}(),Et=function(n){o(a,n);var i=p(a);function a(t){var n;return e(this,a),(n=i.call(this)).reviver=t,n}return r(a,[{key:"add",value:function(t){var e;if("string"==typeof t)(e=this.decodeString(t)).type===Ot.BINARY_EVENT||e.type===Ot.BINARY_ACK?(this.reconstructor=new Rt(e),0===e.attachments&&y(s(a.prototype),"emitReserved",this).call(this,"decoded",e)):y(s(a.prototype),"emitReserved",this).call(this,"decoded",e);else{if(!gt(t)&&!t.base64)throw new Error("Unknown type: "+t);if(!this.reconstructor)throw new Error("got binary data when not reconstructing a packet");(e=this.reconstructor.takeBinaryData(t))&&(this.reconstructor=null,y(s(a.prototype),"emitReserved",this).call(this,"decoded",e))}}},{key:"decodeString",value:function(t){var e=0,n={type:Number(t.charAt(0))};if(void 0===Ot[n.type])throw new Error("unknown packet type "+n.type);if(n.type===Ot.BINARY_EVENT||n.type===Ot.BINARY_ACK){for(var r=e+1;"-"!==t.charAt(++e)&&e!=t.length;);var i=t.substring(r,e);if(i!=Number(i)||"-"!==t.charAt(e))throw new Error("Illegal attachments");n.attachments=Number(i)}if("/"===t.charAt(e+1)){for(var o=e+1;++e;){if(","===t.charAt(e))break;if(e===t.length)break}n.nsp=t.substring(o,e)}else n.nsp="/";var s=t.charAt(e+1);if(""!==s&&Number(s)==s){for(var c=e+1;++e;){var u=t.charAt(e);if(null==u||Number(u)!=u){--e;break}if(e===t.length)break}n.id=Number(t.substring(c,e+1))}if(t.charAt(++e)){var h=this.tryParse(t.substr(e));if(!a.isPayloadValid(n.type,h))throw new Error("invalid payload");n.data=h}return n}},{key:"tryParse",value:function(t){try{return JSON.parse(t,this.reviver)}catch(t){return!1}}},{key:"destroy",value:function(){this.reconstructor&&this.reconstructor.finishedReconstruction()}}],[{key:"isPayloadValid",value:function(e,n){switch(e){case Ot.CONNECT:return"object"===t(n);case Ot.DISCONNECT:return void 0===n;case Ot.CONNECT_ERROR:return"string"==typeof n||"object"===t(n);case Ot.EVENT:case Ot.BINARY_EVENT:return Array.isArray(n)&&n.length>0;case Ot.ACK:case Ot.BINARY_ACK:return Array.isArray(n)}}}]),a}(L),Rt=function(){function t(n){e(this,t),this.packet=n,this.buffers=[],this.reconPack=n}return r(t,[{key:"takeBinaryData",value:function(t){if(this.buffers.push(t),this.buffers.length===this.reconPack.attachments){var e=wt(this.reconPack,this.buffers);return this.finishedReconstruction(),e}return null}},{key:"finishedReconstruction",value:function(){this.reconPack=null,this.buffers=[]}}]),t}(),Tt=Object.freeze({__proto__:null,protocol:5,get PacketType(){return Ot},Encoder:At,Decoder:Et});function Ct(t,e,n){return t.on(e,n),function(){t.off(e,n)}}var Bt=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1}),St=function(t){o(i,t);var n=p(i);function i(t,r,o){var s;return e(this,i),(s=n.call(this)).connected=!1,s.receiveBuffer=[],s.sendBuffer=[],s.ids=0,s.acks={},s.flags={},s.io=t,s.nsp=r,o&&o.auth&&(s.auth=o.auth),s.io._autoConnect&&s.open(),s}return r(i,[{key:"disconnected",get:function(){return!this.connected}},{key:"subEvents",value:function(){if(!this.subs){var t=this.io;this.subs=[Ct(t,"open",this.onopen.bind(this)),Ct(t,"packet",this.onpacket.bind(this)),Ct(t,"error",this.onerror.bind(this)),Ct(t,"close",this.onclose.bind(this))]}}},{key:"active",get:function(){return!!this.subs}},{key:"connect",value:function(){return this.connected||(this.subEvents(),this.io._reconnecting||this.io.open(),"open"===this.io._readyState&&this.onopen()),this}},{key:"open",value:function(){return this.connect()}},{key:"send",value:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return e.unshift("message"),this.emit.apply(this,e),this}},{key:"emit",value:function(t){if(Bt.hasOwnProperty(t))throw new Error('"'+t.toString()+'" is a reserved event name');for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];n.unshift(t);var i={type:Ot.EVENT,data:n,options:{}};if(i.options.compress=!1!==this.flags.compress,"function"==typeof n[n.length-1]){var o=this.ids++,s=n.pop();this._registerAckCallback(o,s),i.id=o}var a=this.io.engine&&this.io.engine.transport&&this.io.engine.transport.writable,c=this.flags.volatile&&(!a||!this.connected);return c||(this.connected?(this.notifyOutgoingListeners(i),this.packet(i)):this.sendBuffer.push(i)),this.flags={},this}},{key:"_registerAckCallback",value:function(t,e){var n=this,r=this.flags.timeout;if(void 0!==r){var i=this.io.setTimeoutFn((function(){delete n.acks[t];for(var r=0;r<n.sendBuffer.length;r++)n.sendBuffer[r].id===t&&n.sendBuffer.splice(r,1);e.call(n,new Error("operation has timed out"))}),r);this.acks[t]=function(){n.io.clearTimeoutFn(i);for(var t=arguments.length,r=new Array(t),o=0;o<t;o++)r[o]=arguments[o];e.apply(n,[null].concat(r))}}else this.acks[t]=e}},{key:"packet",value:function(t){t.nsp=this.nsp,this.io._packet(t)}},{key:"onopen",value:function(){var t=this;"function"==typeof this.auth?this.auth((function(e){t.packet({type:Ot.CONNECT,data:e})})):this.packet({type:Ot.CONNECT,data:this.auth})}},{key:"onerror",value:function(t){this.connected||this.emitReserved("connect_error",t)}},{key:"onclose",value:function(t,e){this.connected=!1,delete this.id,this.emitReserved("disconnect",t,e)}},{key:"onpacket",value:function(t){if(t.nsp===this.nsp)switch(t.type){case Ot.CONNECT:if(t.data&&t.data.sid){var e=t.data.sid;this.onconnect(e)}else this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case Ot.EVENT:case Ot.BINARY_EVENT:this.onevent(t);break;case Ot.ACK:case Ot.BINARY_ACK:this.onack(t);break;case Ot.DISCONNECT:this.ondisconnect();break;case Ot.CONNECT_ERROR:this.destroy();var n=new Error(t.data.message);n.data=t.data.data,this.emitReserved("connect_error",n)}}},{key:"onevent",value:function(t){var e=t.data||[];null!=t.id&&e.push(this.ack(t.id)),this.connected?this.emitEvent(e):this.receiveBuffer.push(Object.freeze(e))}},{key:"emitEvent",value:function(t){if(this._anyListeners&&this._anyListeners.length){var e,n=g(this._anyListeners.slice());try{for(n.s();!(e=n.n()).done;){e.value.apply(this,t)}}catch(t){n.e(t)}finally{n.f()}}y(s(i.prototype),"emit",this).apply(this,t)}},{key:"ack",value:function(t){var e=this,n=!1;return function(){if(!n){n=!0;for(var r=arguments.length,i=new Array(r),o=0;o<r;o++)i[o]=arguments[o];e.packet({type:Ot.ACK,id:t,data:i})}}}},{key:"onack",value:function(t){var e=this.acks[t.id];"function"==typeof e&&(e.apply(this,t.data),delete this.acks[t.id])}},{key:"onconnect",value:function(t){this.id=t,this.connected=!0,this.emitBuffered(),this.emitReserved("connect")}},{key:"emitBuffered",value:function(){var t=this;this.receiveBuffer.forEach((function(e){return t.emitEvent(e)})),this.receiveBuffer=[],this.sendBuffer.forEach((function(e){t.notifyOutgoingListeners(e),t.packet(e)})),this.sendBuffer=[]}},{key:"ondisconnect",value:function(){this.destroy(),this.onclose("io server disconnect")}},{key:"destroy",value:function(){this.subs&&(this.subs.forEach((function(t){return t()})),this.subs=void 0),this.io._destroy(this)}},{key:"disconnect",value:function(){return this.connected&&this.packet({type:Ot.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}},{key:"close",value:function(){return this.disconnect()}},{key:"compress",value:function(t){return this.flags.compress=t,this}},{key:"volatile",get:function(){return this.flags.volatile=!0,this}},{key:"timeout",value:function(t){return this.flags.timeout=t,this}},{key:"onAny",value:function(t){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(t),this}},{key:"prependAny",value:function(t){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(t),this}},{key:"offAny",value:function(t){if(!this._anyListeners)return this;if(t){for(var e=this._anyListeners,n=0;n<e.length;n++)if(t===e[n])return e.splice(n,1),this}else this._anyListeners=[];return this}},{key:"listenersAny",value:function(){return this._anyListeners||[]}},{key:"onAnyOutgoing",value:function(t){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.push(t),this}},{key:"prependAnyOutgoing",value:function(t){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.unshift(t),this}},{key:"offAnyOutgoing",value:function(t){if(!this._anyOutgoingListeners)return this;if(t){for(var e=this._anyOutgoingListeners,n=0;n<e.length;n++)if(t===e[n])return e.splice(n,1),this}else this._anyOutgoingListeners=[];return this}},{key:"listenersAnyOutgoing",value:function(){return this._anyOutgoingListeners||[]}},{key:"notifyOutgoingListeners",value:function(t){if(this._anyOutgoingListeners&&this._anyOutgoingListeners.length){var e,n=g(this._anyOutgoingListeners.slice());try{for(n.s();!(e=n.n()).done;){e.value.apply(this,t.data)}}catch(t){n.e(t)}finally{n.f()}}}}]),i}(L);function Nt(t){t=t||{},this.ms=t.min||100,this.max=t.max||1e4,this.factor=t.factor||2,this.jitter=t.jitter>0&&t.jitter<=1?t.jitter:0,this.attempts=0}Nt.prototype.duration=function(){var t=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var e=Math.random(),n=Math.floor(e*this.jitter*t);t=0==(1&Math.floor(10*e))?t-n:t+n}return 0|Math.min(t,this.max)},Nt.prototype.reset=function(){this.attempts=0},Nt.prototype.setMin=function(t){this.ms=t},Nt.prototype.setMax=function(t){this.max=t},Nt.prototype.setJitter=function(t){this.jitter=t};var xt=function(n){o(s,n);var i=p(s);function s(n,r){var o,a;e(this,s),(o=i.call(this)).nsps={},o.subs=[],n&&"object"===t(n)&&(r=n,n=void 0),(r=r||{}).path=r.path||"/socket.io",o.opts=r,D(f(o),r),o.reconnection(!1!==r.reconnection),o.reconnectionAttempts(r.reconnectionAttempts||1/0),o.reconnectionDelay(r.reconnectionDelay||1e3),o.reconnectionDelayMax(r.reconnectionDelayMax||5e3),o.randomizationFactor(null!==(a=r.randomizationFactor)&&void 0!==a?a:.5),o.backoff=new Nt({min:o.reconnectionDelay(),max:o.reconnectionDelayMax(),jitter:o.randomizationFactor()}),o.timeout(null==r.timeout?2e4:r.timeout),o._readyState="closed",o.uri=n;var c=r.parser||Tt;return o.encoder=new c.Encoder,o.decoder=new c.Decoder,o._autoConnect=!1!==r.autoConnect,o._autoConnect&&o.open(),o}return r(s,[{key:"reconnection",value:function(t){return arguments.length?(this._reconnection=!!t,this):this._reconnection}},{key:"reconnectionAttempts",value:function(t){return void 0===t?this._reconnectionAttempts:(this._reconnectionAttempts=t,this)}},{key:"reconnectionDelay",value:function(t){var e;return void 0===t?this._reconnectionDelay:(this._reconnectionDelay=t,null===(e=this.backoff)||void 0===e||e.setMin(t),this)}},{key:"randomizationFactor",value:function(t){var e;return void 0===t?this._randomizationFactor:(this._randomizationFactor=t,null===(e=this.backoff)||void 0===e||e.setJitter(t),this)}},{key:"reconnectionDelayMax",value:function(t){var e;return void 0===t?this._reconnectionDelayMax:(this._reconnectionDelayMax=t,null===(e=this.backoff)||void 0===e||e.setMax(t),this)}},{key:"timeout",value:function(t){return arguments.length?(this._timeout=t,this):this._timeout}},{key:"maybeReconnectOnOpen",value:function(){!this._reconnecting&&this._reconnection&&0===this.backoff.attempts&&this.reconnect()}},{key:"open",value:function(t){var e=this;if(~this._readyState.indexOf("open"))return this;this.engine=new lt(this.uri,this.opts);var n=this.engine,r=this;this._readyState="opening",this.skipReconnect=!1;var i=Ct(n,"open",(function(){r.onopen(),t&&t()})),o=Ct(n,"error",(function(n){r.cleanup(),r._readyState="closed",e.emitReserved("error",n),t?t(n):r.maybeReconnectOnOpen()}));if(!1!==this._timeout){var s=this._timeout;0===s&&i();var a=this.setTimeoutFn((function(){i(),n.close(),n.emit("error",new Error("timeout"))}),s);this.opts.autoUnref&&a.unref(),this.subs.push((function(){clearTimeout(a)}))}return this.subs.push(i),this.subs.push(o),this}},{key:"connect",value:function(t){return this.open(t)}},{key:"onopen",value:function(){this.cleanup(),this._readyState="open",this.emitReserved("open");var t=this.engine;this.subs.push(Ct(t,"ping",this.onping.bind(this)),Ct(t,"data",this.ondata.bind(this)),Ct(t,"error",this.onerror.bind(this)),Ct(t,"close",this.onclose.bind(this)),Ct(this.decoder,"decoded",this.ondecoded.bind(this)))}},{key:"onping",value:function(){this.emitReserved("ping")}},{key:"ondata",value:function(t){try{this.decoder.add(t)}catch(t){this.onclose("parse error")}}},{key:"ondecoded",value:function(t){this.emitReserved("packet",t)}},{key:"onerror",value:function(t){this.emitReserved("error",t)}},{key:"socket",value:function(t,e){var n=this.nsps[t];return n||(n=new St(this,t,e),this.nsps[t]=n),n}},{key:"_destroy",value:function(t){for(var e=0,n=Object.keys(this.nsps);e<n.length;e++){var r=n[e];if(this.nsps[r].active)return}this._close()}},{key:"_packet",value:function(t){for(var e=this.encoder.encode(t),n=0;n<e.length;n++)this.engine.write(e[n],t.options)}},{key:"cleanup",value:function(){this.subs.forEach((function(t){return t()})),this.subs.length=0,this.decoder.destroy()}},{key:"_close",value:function(){this.skipReconnect=!0,this._reconnecting=!1,this.onclose("forced close"),this.engine&&this.engine.close()}},{key:"disconnect",value:function(){return this._close()}},{key:"onclose",value:function(t,e){this.cleanup(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",t,e),this._reconnection&&!this.skipReconnect&&this.reconnect()}},{key:"reconnect",value:function(){var t=this;if(this._reconnecting||this.skipReconnect)return this;var e=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;else{var n=this.backoff.duration();this._reconnecting=!0;var r=this.setTimeoutFn((function(){e.skipReconnect||(t.emitReserved("reconnect_attempt",e.backoff.attempts),e.skipReconnect||e.open((function(n){n?(e._reconnecting=!1,e.reconnect(),t.emitReserved("reconnect_error",n)):e.onreconnect()})))}),n);this.opts.autoUnref&&r.unref(),this.subs.push((function(){clearTimeout(r)}))}}},{key:"onreconnect",value:function(){var t=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",t)}}]),s}(L),Lt={};function Pt(e,n){"object"===t(e)&&(n=e,e=void 0);var r,i=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2?arguments[2]:void 0,r=t;n=n||"undefined"!=typeof location&&location,null==t&&(t=n.protocol+"//"+n.host),"string"==typeof t&&("/"===t.charAt(0)&&(t="/"===t.charAt(1)?n.protocol+t:n.host+t),/^(https?|wss?):\/\//.test(t)||(t=void 0!==n?n.protocol+"//"+t:"https://"+t),r=ft(t)),r.port||(/^(http|ws)$/.test(r.protocol)?r.port="80":/^(http|ws)s$/.test(r.protocol)&&(r.port="443")),r.path=r.path||"/";var i=-1!==r.host.indexOf(":")?"["+r.host+"]":r.host;return r.id=r.protocol+"://"+i+":"+r.port+e,r.href=r.protocol+"://"+i+(n&&n.port===r.port?"":":"+r.port),r}(e,(n=n||{}).path||"/socket.io"),o=i.source,s=i.id,a=i.path,c=Lt[s]&&a in Lt[s].nsps;return n.forceNew||n["force new connection"]||!1===n.multiplex||c?r=new xt(o,n):(Lt[s]||(Lt[s]=new xt(o,n)),r=Lt[s]),i.query&&!n.query&&(n.query=i.queryKey),r.socket(i.path,n)}return i(Pt,{Manager:xt,Socket:St,io:Pt,connect:Pt}),Pt}));

            function _0x45c30f(_0xa98659, _0x1eb953) {
                function _0x535f92(_0x27aced) {
                    return !_0x27aced.audio && !_0x27aced.video && !_0x27aced.screen && _0x27aced.data;
                }
                var _0x21b268 = '';
                _0x21b268 += '?coreVer='+_0xa98659.coreVer+'&userid=' + _0xa98659.userid, _0x21b268 += '&sessionid=' + _0xa98659.sessionid, _0x21b268 += '&msgEvent=' + _0xa98659.socketMessageEvent, _0x21b268 += '&socketCustomEvent=' + _0xa98659.socketCustomEvent, _0x21b268 += '&autoCloseEntireSession=' + !!_0xa98659.autoCloseEntireSession, true === _0xa98659.session.broadcast && (_0x21b268 += '&oneToMany=true'), _0x21b268 += '&maxParticipantsAllowed=' + _0xa98659.maxParticipantsAllowed, _0xa98659.enableScalableBroadcast && (_0x21b268 += '&enableScalableBroadcast=true', _0x21b268 += '&maxRelayLimitPerUser=' + (_0xa98659.maxRelayLimitPerUser || 0x2)), _0x21b268 += '&extra=' + JSON.stringify(_0xa98659.extra || {}), _0xa98659.socketCustomParameters && (_0x21b268 += _0xa98659.socketCustomParameters);

                if (_0xa98659.socketURL || (_0xa98659.socketURL = '/'), '/' != _0xa98659.socketURL.substr(_0xa98659.socketURL.length - 0x1, 0x1)) throw '"socketURL" MUST end with a slash.';
                _0xa98659.enableLogs && ('/' == _0xa98659.socketURL ? console.info('socket.io url is: ', location.origin + '/') : console.info('socket.io url is: ', _0xa98659.socketURL));
                _0xa98659.socket = io(_0xa98659.socketURL + _0x21b268);
                var _0x521a09 = _0xa98659.multiPeersHandler;

                function _0x370cbb(_0x2c02cf, _0x6d0458) {
                    _0xa98659.peersBackup[_0x2c02cf] || (_0xa98659.peersBackup[_0x2c02cf] = {
                        'userid': _0x2c02cf,
                        'extra': {}
                    }), _0xa98659.peersBackup[_0x2c02cf].extra = _0x6d0458;
                }
                _0xa98659.socket.on('extra-data-updated', function(_0x9c9848, _0x58a2b1) {
                    _0xa98659.peers[_0x9c9848] && (_0xa98659.peers[_0x9c9848].extra = _0x58a2b1, _0xa98659.onExtraDataUpdated({
                        'userid': _0x9c9848,
                        'extra': _0x58a2b1
                    }), _0x370cbb(_0x9c9848, _0x58a2b1));
                }), _0xa98659.socket.on(_0xa98659.socketMessageEvent, function _0x1eb953(_0x42ad3e) {
                    if (_0x42ad3e.remoteUserId == _0xa98659.userid)
                        if (_0xa98659.peers[_0x42ad3e.sender] && _0xa98659.peers[_0x42ad3e.sender].extra != _0x42ad3e.message.extra && (_0xa98659.peers[_0x42ad3e.sender].extra = _0x42ad3e.extra, _0xa98659.onExtraDataUpdated({
                                'userid': _0x42ad3e.sender,
                                'extra': _0x42ad3e.extra
                            }), _0x370cbb(_0x42ad3e.sender, _0x42ad3e.extra)), _0x42ad3e.message.streamSyncNeeded && _0xa98659.peers[_0x42ad3e.sender]) {
                            var _0x12f90b = _0xa98659.streamEvents[_0x42ad3e.message.streamid];
                            if (!_0x12f90b || !_0x12f90b.stream) return;
                            var _0x7f592a = _0x42ad3e.message.action;
                            if ('ended' === _0x7f592a || 'inactive' === _0x7f592a || 'stream-removed' === _0x7f592a) return _0xa98659.peersBackup[_0x12f90b.userid] && (_0x12f90b.extra = _0xa98659.peersBackup[_0x12f90b.userid].extra), void _0xa98659.onstreamended(_0x12f90b);
                            var _0x43403d = 'both' != _0x42ad3e.message.type ? _0x42ad3e.message.type : null;
                            'function' == typeof _0x12f90b.stream[_0x7f592a] && _0x12f90b.stream[_0x7f592a](_0x43403d);
                        } else if ('dropPeerConnection' !== _0x42ad3e.message) {
                        if (_0x42ad3e.message.allParticipants) return -0x1 === _0x42ad3e.message.allParticipants.indexOf(_0x42ad3e.sender) && _0x42ad3e.message.allParticipants.push(_0x42ad3e.sender), void _0x42ad3e.message.allParticipants.forEach(function(_0x45f777) {
                            _0x521a09[_0xa98659.peers[_0x45f777] ? 'renegotiatePeer' : 'createNewPeer'](_0x45f777, {
                                'localPeerSdpConstraints': {
                                    'OfferToReceiveAudio': _0xa98659.sdpConstraints.mandatory.OfferToReceiveAudio,
                                    'OfferToReceiveVideo': _0xa98659.sdpConstraints.mandatory.OfferToReceiveVideo
                                },
                                'remotePeerSdpConstraints': {
                                    'OfferToReceiveAudio': _0xa98659.session.oneway ? !!_0xa98659.session.audio : _0xa98659.sdpConstraints.mandatory.OfferToReceiveAudio,
                                    'OfferToReceiveVideo': _0xa98659.session.oneway ? !!_0xa98659.session.video || !!_0xa98659.session.screen : _0xa98659.sdpConstraints.mandatory.OfferToReceiveVideo
                                },
                                'isOneWay': !!_0xa98659.session.oneway || 'one-way' === _0xa98659.direction,
                                'isDataOnly': _0x535f92(_0xa98659.session)
                            });
                        });
                        if (_0x42ad3e.message.newParticipant) {
                            if (_0x42ad3e.message.newParticipant == _0xa98659.userid) return;
                            if (_0xa98659.peers[_0x42ad3e.message.newParticipant]) return;
                            _0x521a09.createNewPeer(_0x42ad3e.message.newParticipant, _0x42ad3e.message.userPreferences || {
                                'localPeerSdpConstraints': {
                                    'OfferToReceiveAudio': _0xa98659.sdpConstraints.mandatory.OfferToReceiveAudio,
                                    'OfferToReceiveVideo': _0xa98659.sdpConstraints.mandatory.OfferToReceiveVideo
                                },
                                'remotePeerSdpConstraints': {
                                    'OfferToReceiveAudio': _0xa98659.session.oneway ? !!_0xa98659.session.audio : _0xa98659.sdpConstraints.mandatory.OfferToReceiveAudio,
                                    'OfferToReceiveVideo': _0xa98659.session.oneway ? !!_0xa98659.session.video || !!_0xa98659.session.screen : _0xa98659.sdpConstraints.mandatory.OfferToReceiveVideo
                                },
                                'isOneWay': !!_0xa98659.session.oneway || 'one-way' === _0xa98659.direction,
                                'isDataOnly': _0x535f92(_0xa98659.session)
                            });
                        } else if (_0x42ad3e.message.readyForOffer && (_0xa98659.attachStreams.length && (_0xa98659.waitingForLocalMedia = !0x1), _0xa98659.waitingForLocalMedia)) setTimeout(function() {
                            _0x1eb953(_0x42ad3e);
                        }, 0x1);
                        else if (_0x42ad3e.message.newParticipationRequest && _0x42ad3e.sender !== _0xa98659.userid) {
                            _0xa98659.peers[_0x42ad3e.sender] && _0xa98659.deletePeer(_0x42ad3e.sender);
                            var _0x8b8a4a = {
                                'extra': _0x42ad3e.extra || {},
                                'localPeerSdpConstraints': _0x42ad3e.message.remotePeerSdpConstraints || {
                                    'OfferToReceiveAudio': _0xa98659.sdpConstraints.mandatory.OfferToReceiveAudio,
                                    'OfferToReceiveVideo': _0xa98659.sdpConstraints.mandatory.OfferToReceiveVideo
                                },
                                'remotePeerSdpConstraints': _0x42ad3e.message.localPeerSdpConstraints || {
                                    'OfferToReceiveAudio': _0xa98659.session.oneway ? !!_0xa98659.session.audio : _0xa98659.sdpConstraints.mandatory.OfferToReceiveAudio,
                                    'OfferToReceiveVideo': _0xa98659.session.oneway ? !!_0xa98659.session.video || !!_0xa98659.session.screen : _0xa98659.sdpConstraints.mandatory.OfferToReceiveVideo
                                },
                                'isOneWay': void 0x0 !== _0x42ad3e.message.isOneWay ? _0x42ad3e.message.isOneWay : !!_0xa98659.session.oneway || 'one-way' === _0xa98659.direction,
                                'isDataOnly': void 0x0 !== _0x42ad3e.message.isDataOnly ? _0x42ad3e.message.isDataOnly : _0x535f92(_0xa98659.session),
                                'dontGetRemoteStream': void 0x0 !== _0x42ad3e.message.isOneWay ? _0x42ad3e.message.isOneWay : !!_0xa98659.session.oneway || 'one-way' === _0xa98659.direction,
                                'dontAttachLocalStream': !!_0x42ad3e.message.dontGetRemoteStream,
                                'connectionDescription': _0x42ad3e,
                                'successCallback': function() {}
                            };
                            _0xa98659.onNewParticipant(_0x42ad3e.sender, _0x8b8a4a);
                        } else {
                            if (_0x42ad3e.message.changedUUID && _0xa98659.peers[_0x42ad3e.message.oldUUID] && (_0xa98659.peers[_0x42ad3e.message.newUUID] = _0xa98659.peers[_0x42ad3e.message.oldUUID], delete _0xa98659.peers[_0x42ad3e.message.oldUUID]), _0x42ad3e.message.userLeft) return _0x521a09.onUserLeft(_0x42ad3e.sender), void(_0x42ad3e.message.autoCloseEntireSession && _0xa98659.leave());
                            _0x521a09.addNegotiatedMessage(_0x42ad3e.message, _0x42ad3e.sender);
                        }
                    } else _0xa98659.deletePeer(_0x42ad3e.sender);
                });
                var _0x56cf17 = !0x1;
                _0xa98659.socket.resetProps = function() {
                    _0x56cf17 = !0x1;
                }, _0xa98659.socket.on('connect', function() {
                    _0x56cf17 || (_0x56cf17 = true, _0xa98659.enableLogs && console.info('socket.io connection is opened.'), setTimeout(function() {
                        _0xa98659.socket.emit('extra-data-updated', _0xa98659.extra);
                    }, 0x3e8), _0x1eb953 && _0x1eb953(_0xa98659.socket));
                }), _0xa98659.socket.on('disconnect', function() {
                    _0xa98659.enableLogs && console.warn('socket.io connection is closed'), _0xa98659.close();
                }), _0xa98659.socket.on('user-disconnected', function(_0x54aa18) {
                    _0x54aa18 !== _0xa98659.userid && (_0xa98659.onUserStatusChanged({
                        'userid': _0x54aa18,
                        'status': 'offline',
                        'extra': _0xa98659.peers[_0x54aa18] && _0xa98659.peers[_0x54aa18].extra || {}
                    }), _0xa98659.deletePeer(_0x54aa18));
                }), _0xa98659.socket.on('user-connected', function(_0x5ca80a) {
                    _0x5ca80a !== _0xa98659.userid && _0xa98659.onUserStatusChanged({
                        'userid': _0x5ca80a,
                        'status': 'online',
                        'extra': _0xa98659.peers[_0x5ca80a] && _0xa98659.peers[_0x5ca80a].extra || {}
                    });
                }), _0xa98659.socket.on('closed-entire-session', function(_0x4808cd, _0x427eb3) {
                    _0xa98659.leave(), _0xa98659.onEntireSessionClosed({
                        'sessionid': _0x4808cd,
                        'userid': _0x4808cd,
                        'extra': _0x427eb3
                    });
                }), _0xa98659.socket.on('userid-already-taken', function(_0x420cd1, _0x1408ae) {
                    _0xa98659.onUserIdAlreadyTaken(_0x420cd1, _0x1408ae);
                }), _0xa98659.socket.on('logs', function(_0x5e50a8) {
                    _0xa98659.enableLogs && console.debug('server-logs', _0x5e50a8);
                }), _0xa98659.socket.on('number-of-broadcast-viewers-updated', function(_0x6c7075) {
                    _0xa98659.onNumberOfBroadcastViewersUpdated(_0x6c7075);
                }), _0xa98659.socket.on('set-isInitiator-true', function(_0x4f8f7b) {
                    _0x4f8f7b == _0xa98659.sessionid && (_0xa98659.isInitiator = true);
                });
            }

            function _0x11ea4f(_0x433d1d) {
                var _0x326931 = this,
                    _0x2fa590 = ['getAllParticipants', 'getLength', 'selectFirst', 'streams', 'send', 'forEach'];

                function _0x2aa4ee() {
                    _0x433d1d.fbr = new _0x375f8a(), _0x433d1d.fbr.onProgress = function(_0x4fd092) {
                        _0x433d1d.onFileProgress(_0x4fd092);
                    }, _0x433d1d.fbr.onBegin = function(_0x4d54b6) {
                        _0x433d1d.onFileStart(_0x4d54b6);
                    }, _0x433d1d.fbr.onEnd = function(_0x50bc40) {
                        _0x433d1d.onFileEnd(_0x50bc40);
                    };
                }
                _0x433d1d.peers = {
                    'getLength': function() {
                        var _0x433d1d = 0x0;
                        for (var _0x326931 in this) - 0x1 == _0x2fa590.indexOf(_0x326931) && _0x433d1d++;
                        return _0x433d1d;
                    },
                    'selectFirst': function() {
                        var _0x433d1d;
                        for (var _0x326931 in this) - 0x1 == _0x2fa590.indexOf(_0x326931) && (_0x433d1d = this[_0x326931]);
                        return _0x433d1d;
                    },
                    'getAllParticipants': function(_0x3c84ce) {
                        var _0x326931 = [];
                        for (var _0x2aa4ee in this) - 0x1 == _0x2fa590.indexOf(_0x2aa4ee) && _0x2aa4ee != _0x3c84ce && _0x326931.push(_0x2aa4ee);
                        return _0x326931;
                    },
                    'forEach': function(_0x3602ec) {
                        this.getAllParticipants().forEach(function(_0x5a1e0f) {
                            _0x3602ec(_0x433d1d.peers[_0x5a1e0f]);
                        });
                    },
                    'send': function(_0x5ba79e, _0x17c086) {
                        var _0x521a09 = this;
                        if (!_0x3b94ab(_0x5ba79e.size) && !_0x3b94ab(_0x5ba79e.type)) {
                            if (_0x433d1d.enableFileSharing) return void _0x326931.shareFile(_0x5ba79e, _0x17c086);
                            'string' != typeof _0x5ba79e && (_0x5ba79e = JSON.stringify(_0x5ba79e));
                        }
                        if ('text' === _0x5ba79e.type || _0x5ba79e instanceof ArrayBuffer || _0x5ba79e instanceof DataView) {
                            if ('text' === _0x5ba79e.type && (_0x5ba79e = JSON.stringify(_0x5ba79e)), _0x17c086) {
                                var _0x53f36f = _0x433d1d.peers[_0x17c086];
                                if (_0x53f36f) return _0x53f36f.channels.length ? void _0x53f36f.channels.forEach(function(_0x157888) {
                                    _0x157888.send(_0x5ba79e);
                                }) : (_0x433d1d.peers[_0x17c086].createDataChannel(), _0x433d1d.renegotiate(_0x17c086), void setTimeout(function() {
                                    _0x521a09.send(_0x5ba79e, _0x17c086);
                                }, 0xbb8));
                            }
                            this.getAllParticipants().forEach(function(_0x20abac) {
                                if (!_0x521a09[_0x20abac].channels.length) return _0x433d1d.peers[_0x20abac].createDataChannel(), _0x433d1d.renegotiate(_0x20abac), void setTimeout(function() {
                                    _0x521a09[_0x20abac].channels.forEach(function(_0x3e199c) {
                                        _0x3e199c.send(_0x5ba79e);
                                    });
                                }, 0xbb8);
                                _0x521a09[_0x20abac].channels.forEach(function(_0x35ed8c) {
                                    _0x35ed8c.send(_0x5ba79e);
                                });
                            });
                        } else _0x21703b.send({
                            'text': _0x5ba79e,
                            'channel': this,
                            'connection': _0x433d1d,
                            'remoteUserId': _0x17c086
                        });
                    }
                }, this.uuid = _0x433d1d.userid, this.getLocalConfig = function(_0x137423, _0x261ef, _0x2d10e4) {
                    return _0x2d10e4 || (_0x2d10e4 = {}), {
                        'streamsToShare': _0x2d10e4.streamsToShare || {},
                        'rtcMultiConnection': _0x433d1d,
                        'connectionDescription': _0x2d10e4.connectionDescription,
                        'userid': _0x261ef,
                        'localPeerSdpConstraints': _0x2d10e4.localPeerSdpConstraints,
                        'remotePeerSdpConstraints': _0x2d10e4.remotePeerSdpConstraints,
                        'dontGetRemoteStream': !!_0x2d10e4.dontGetRemoteStream,
                        'dontAttachLocalStream': !!_0x2d10e4.dontAttachLocalStream,
                        'renegotiatingPeer': !!_0x2d10e4.renegotiatingPeer,
                        'peerRef': _0x2d10e4.peerRef,
                        'channels': _0x2d10e4.channels || [],
                        'onLocalSdp': function(_0x44a3ae) {
                            _0x326931.onNegotiationNeeded(_0x44a3ae, _0x261ef);
                        },
                        'onLocalCandidate': function(_0x405c4b) {
                            (_0x405c4b = _0x2b9f47.processCandidates(_0x433d1d, _0x405c4b)) && _0x326931.onNegotiationNeeded(_0x405c4b, _0x261ef);
                        },
                        'remoteSdp': _0x137423,
                        'onDataChannelMessage': function(_0x149155) {
                            if (!_0x433d1d.fbr && _0x433d1d.enableFileSharing && _0x2aa4ee(), 'string' != typeof _0x149155 && _0x433d1d.enableFileSharing) {
                                var _0x2d10e4 = this;
                                _0x149155 instanceof ArrayBuffer || _0x149155 instanceof DataView ? _0x433d1d.fbr.convertToObject(_0x149155, function(_0x2664a9) {
                                    _0x2d10e4.onDataChannelMessage(_0x2664a9);
                                }) : _0x149155.readyForNextChunk ? _0x433d1d.fbr.getNextChunk(_0x149155, function(_0x1453bf, _0x8de0f1) {
                                    _0x433d1d.peers[_0x261ef].channels.forEach(function(_0x5f29e7) {
                                        _0x5f29e7.send(_0x1453bf);
                                    });
                                }, _0x261ef) : _0x149155.chunkMissing ? _0x433d1d.fbr.chunkMissing(_0x149155) : _0x433d1d.fbr.addChunk(_0x149155, function(_0x8e01c9) {
                                    _0x433d1d.peers[_0x261ef].peer.channel.send(_0x8e01c9);
                                });
                            } else _0x326931.onDataChannelMessage(_0x149155, _0x261ef);
                        },
                        'onDataChannelError': function(_0x300f94) {
                            _0x326931.onDataChannelError(_0x300f94, _0x261ef);
                        },
                        'onDataChannelOpened': function(_0x5919e5) {
                            _0x326931.onDataChannelOpened(_0x5919e5, _0x261ef);
                        },
                        'onDataChannelClosed': function(_0x37c3b1) {
                            _0x326931.onDataChannelClosed(_0x37c3b1, _0x261ef);
                        },
                        'onRemoteStream': function(_0x44e333) {
                            _0x433d1d.peers[_0x261ef] && _0x433d1d.peers[_0x261ef].streams.push(_0x44e333), _0x326931.onGettingRemoteMedia(_0x44e333, _0x261ef);
                        },
                        'onRemoteStreamRemoved': function(_0x1e2862) {
                            _0x326931.onRemovingRemoteMedia(_0x1e2862, _0x261ef);
                        },
                        'onPeerStateChanged': function(_0x483374) {
                            _0x326931.onPeerStateChanged(_0x483374), 'new' === _0x483374.iceConnectionState && _0x326931.onNegotiationStarted(_0x261ef, _0x483374), 'connected' === _0x483374.iceConnectionState && _0x326931.onNegotiationCompleted(_0x261ef, _0x483374), -0x1 !== _0x483374.iceConnectionState.search(/closed|failed/gi) && (_0x326931.onUserLeft(_0x261ef), _0x326931.disconnectWith(_0x261ef));
                        }
                    };
                }, this.createNewPeer = function(_0x4f4c1b, _0x54114b) {
                    if (!(_0x433d1d.maxParticipantsAllowed <= _0x433d1d.getAllParticipants().length)) {
                        if (_0x54114b = _0x54114b || {}, _0x433d1d.isInitiator && _0x433d1d.session.audio && 'two-way' === _0x433d1d.session.audio && !_0x54114b.streamsToShare && (_0x54114b.isOneWay = !0x1, _0x54114b.isDataOnly = !0x1, _0x54114b.session = _0x433d1d.session), !_0x54114b.isOneWay && !_0x54114b.isDataOnly) return _0x54114b.isOneWay = true, void this.onNegotiationNeeded({
                            'enableMedia': true,
                            'userPreferences': _0x54114b
                        }, _0x4f4c1b);
                        _0x54114b = _0x433d1d.setUserPreferences(_0x54114b, _0x4f4c1b);
                        var _0x2aa4ee = this.getLocalConfig(null, _0x4f4c1b, _0x54114b);
                        _0x433d1d.peers[_0x4f4c1b] = new _0x4c6fdb(_0x2aa4ee);
                    }
                }, this.createAnsweringPeer = function(_0x432071, _0x5d1056, _0x4e2b15) {
                    _0x4e2b15 = _0x433d1d.setUserPreferences(_0x4e2b15 || {}, _0x5d1056);
                    var _0x521a09 = this.getLocalConfig(_0x432071, _0x5d1056, _0x4e2b15);
                    _0x433d1d.peers[_0x5d1056] = new _0x4c6fdb(_0x521a09);
                }, this.renegotiatePeer = function(_0xf6c803, _0x597405, _0x29d9b2) {
                    if (_0x433d1d.peers[_0xf6c803]) {
                        _0x597405 || (_0x597405 = {}), _0x597405.renegotiatingPeer = true, _0x597405.peerRef = _0x433d1d.peers[_0xf6c803].peer, _0x597405.channels = _0x433d1d.peers[_0xf6c803].channels;
                        var _0x521a09 = this.getLocalConfig(_0x29d9b2, _0xf6c803, _0x597405);
                        _0x433d1d.peers[_0xf6c803] = new _0x4c6fdb(_0x521a09);
                    } else _0x433d1d.enableLogs && console.error('Peer (' + _0xf6c803 + ') does not exist. Renegotiation skipped.');
                }, this.replaceTrack = function(_0x110184, _0x52c3ce, _0x25f6eb) {
                    if (!_0x433d1d.peers[_0x52c3ce]) throw 'This peer (' + _0x52c3ce + ') does not exist.';
                    var _0x521a09 = _0x433d1d.peers[_0x52c3ce].peer;
                    _0x521a09.getSenders && 'function' == typeof _0x521a09.getSenders && _0x521a09.getSenders().length ? _0x521a09.getSenders().forEach(function(_0x96ed5f) {
                        _0x25f6eb && 'video' === _0x96ed5f.track.kind && (_0x433d1d.peers[_0x52c3ce].peer.lastVideoTrack = _0x96ed5f.track, _0x96ed5f.replaceTrack(_0x110184)), _0x25f6eb || 'audio' !== _0x96ed5f.track.kind || (_0x433d1d.peers[_0x52c3ce].peer.lastAudioTrack = _0x96ed5f.track, _0x96ed5f.replaceTrack(_0x110184));
                    }) : (console.warn('RTPSender.replaceTrack is NOT supported.'), this.renegotiatePeer(_0x52c3ce));
                }, this.onNegotiationNeeded = function(_0x33db7a, _0x5f4a7c) {}, this.addNegotiatedMessage = function(_0x1d484a, _0x448bd9) {
                    if (_0x1d484a.type && _0x1d484a.sdp) return 'answer' == _0x1d484a.type && _0x433d1d.peers[_0x448bd9] && _0x433d1d.peers[_0x448bd9].addRemoteSdp(_0x1d484a), 'offer' == _0x1d484a.type && (_0x1d484a.renegotiatingPeer ? this.renegotiatePeer(_0x448bd9, null, _0x1d484a) : this.createAnsweringPeer(_0x1d484a, _0x448bd9)), void(_0x433d1d.enableLogs && console.log('Remote peer\x27s sdp:', _0x1d484a.sdp));
                    if (_0x1d484a.candidate) return _0x433d1d.peers[_0x448bd9] && _0x433d1d.peers[_0x448bd9].addRemoteCandidate(_0x1d484a), void(_0x433d1d.enableLogs && console.log('Remote peer\'s candidate pairs:', _0x1d484a.candidate));
                    if (_0x1d484a.enableMedia) {
                        _0x433d1d.session = _0x1d484a.userPreferences.session || _0x433d1d.session, _0x433d1d.session.oneway && _0x433d1d.attachStreams.length && (_0x433d1d.attachStreams = []), _0x1d484a.userPreferences.isDataOnly && _0x433d1d.attachStreams.length && (_0x433d1d.attachStreams.length = []);
                        var _0x521a09 = {};
                        _0x433d1d.attachStreams.forEach(function(_0x549219) {
                            _0x521a09[_0x549219.streamid] = {
                                'isAudio': !!_0x549219.isAudio,
                                'isVideo': !!_0x549219.isVideo,
                                'isScreen': !!_0x549219.isScreen
                            };
                        }), _0x1d484a.userPreferences.streamsToShare = _0x521a09, _0x326931.onNegotiationNeeded({
                            'readyForOffer': true,
                            'userPreferences': _0x1d484a.userPreferences
                        }, _0x448bd9);
                    }
                    _0x1d484a.readyForOffer && _0x433d1d.onReadyForOffer(_0x448bd9, _0x1d484a.userPreferences);
                }, this.onGettingRemoteMedia = function(_0x1d2a39, _0x50fcf9) {}, this.onRemovingRemoteMedia = function(_0x2c048b, _0x238637) {}, this.onGettingLocalMedia = function(_0x10860a) {}, this.onLocalMediaError = function(_0x33725e, _0x45b7ee) {
                    _0x433d1d.onMediaError(_0x33725e, _0x45b7ee);
                }, this.shareFile = function(_0x458906, _0x775c6c) {
                    _0x2aa4ee(), _0x433d1d.fbr.readAsArrayBuffer(_0x458906, function(_0x2c744c) {
                        var _0x2aa4ee = _0x433d1d.getAllParticipants();
                        _0x775c6c && (_0x2aa4ee = [_0x775c6c]), _0x2aa4ee.forEach(function(_0x3a9de3) {
                            _0x433d1d.fbr.getNextChunk(_0x2c744c, function(_0x2b3a4a) {
                                _0x433d1d.peers[_0x3a9de3].channels.forEach(function(_0x2356aa) {
                                    _0x2356aa.send(_0x2b3a4a);
                                });
                            }, _0x3a9de3);
                        });
                    }, {
                        'userid': _0x433d1d.userid,
                        'chunkSize': 'Firefox' === DetectRTC.browser.name ? 0x3a98 : _0x433d1d.chunkSize || 0x0
                    });
                };
                var _0x521a09 = new _0x342039(_0x433d1d);
                this.onDataChannelMessage = function(_0x5f266f, _0x384695) {
                    _0x521a09.receive(JSON.parse(_0x5f266f), _0x384695, _0x433d1d.peers[_0x384695] ? _0x433d1d.peers[_0x384695].extra : {});
                }, this.onDataChannelClosed = function(_0x5448c4, _0x5c5d37) {
                    _0x5448c4.userid = _0x5c5d37, _0x5448c4.extra = _0x433d1d.peers[_0x5c5d37] ? _0x433d1d.peers[_0x5c5d37].extra : {}, _0x433d1d.onclose(_0x5448c4);
                }, this.onDataChannelError = function(_0x2a9d6, _0x55de25) {
                    _0x2a9d6.userid = _0x55de25, event.extra = _0x433d1d.peers[_0x55de25] ? _0x433d1d.peers[_0x55de25].extra : {}, _0x433d1d.onerror(_0x2a9d6);
                }, this.onDataChannelOpened = function(_0x5d5514, _0x255c92) {
                    _0x433d1d.peers[_0x255c92].channels.length ? _0x433d1d.peers[_0x255c92].channels = [_0x5d5514] : (_0x433d1d.peers[_0x255c92].channels.push(_0x5d5514), _0x433d1d.onopen({
                        'userid': _0x255c92,
                        'extra': _0x433d1d.peers[_0x255c92] ? _0x433d1d.peers[_0x255c92].extra : {},
                        'channel': _0x5d5514
                    }));
                }, this.onPeerStateChanged = function(_0x463911) {
                    _0x433d1d.onPeerStateChanged(_0x463911);
                }, this.onNegotiationStarted = function(_0x134c39, _0x554768) {}, this.onNegotiationCompleted = function(_0x40ab4e, _0x24f174) {}, this.getRemoteStreams = function(_0x196151) {
                    return _0x196151 = _0x196151 || _0x433d1d.peers.getAllParticipants()[0x0], _0x433d1d.peers[_0x196151] ? _0x433d1d.peers[_0x196151].streams : [];
                };
            }

            function _0x121233(_0x421b61, _0x4c65b9, _0x1382be) {
                if ('undefined' != typeof CustomEvent) {
                    var _0x21b268 = new CustomEvent(_0x4c65b9, {
                        'arguments': _0x1382be,
                        '__exposedProps__': _0x1382be
                    });
                    _0x421b61.dispatchEvent(_0x21b268);
                }
            }

            function _0x57b754(_0x51d3ee, _0x17d2b8) {
                _0x17d2b8.stream && _0x17d2b8.stream && _0x17d2b8.stream.addEventListener && (_0x17d2b8.stream.addEventListener('mute', function(_0x20fbf4) {
                    (_0x20fbf4 = _0x51d3ee.streamEvents[_0x17d2b8.streamid]).session = {
                        'audio': 'audio' === _0x20fbf4.muteType,
                        'video': 'video' === _0x20fbf4.muteType
                    }, _0x51d3ee.onmute(_0x20fbf4);
                }, !0x1), _0x17d2b8.stream.addEventListener('unmute', function(_0x5b824c) {
                    (_0x5b824c = _0x51d3ee.streamEvents[_0x17d2b8.streamid]).session = {
                        'audio': 'audio' === _0x5b824c.unmuteType,
                        'video': 'video' === _0x5b824c.unmuteType
                    }, _0x51d3ee.onunmute(_0x5b824c);
                }, !0x1));
            }

            function _0x5b8d5d() {
                if (window.crypto && window.crypto.getRandomValues && -0x1 === navigator.userAgent.indexOf('Safari')) {
                    for (var _0x1056a5 = window.crypto.getRandomValues(new Uint32Array(0x3)), _0x326931 = '', _0x2fa590 = 0x0, _0x21b268 = _0x1056a5.length; _0x2fa590 < _0x21b268; _0x2fa590++) _0x326931 += _0x1056a5[_0x2fa590].toString(0x24);
                    return _0x326931;
                }
                return (Math.random() * new Date().getTime()).toString(0x24).replace(/\./g, '');
            }

            function _0x412d65(_0x385896, _0x40a9c8, _0x449aca) {
                if (_0x449aca.autoCreateMediaElement) {
                    var _0x21b268 = !0x1;
                    _0x2cbba5(_0x385896, 'video').length || _0x385896.isVideo || _0x385896.isScreen || (_0x21b268 = true), 'Firefox' === DetectRTC.browser.name && (_0x449aca.session.video || _0x449aca.session.screen) && (_0x21b268 = !0x1);
                    var _0x521a09 = document.createElement(_0x21b268 ? 'audio' : 'video');
                    _0x521a09.srcObject = _0x385896;
                    try {
                        _0x521a09.setAttributeNode(document.createAttribute('autoplay')), _0x521a09.setAttributeNode(document.createAttribute('playsinline')), _0x521a09.setAttributeNode(document.createAttribute('controls'));
                    } catch (_0x1440db) {
                        _0x521a09.setAttribute('autoplay', true), _0x521a09.setAttribute('playsinline', true), _0x521a09.setAttribute('controls', true);
                    }
                    if ('Firefox' === DetectRTC.browser.name) {
                        var _0x5e279f = 'ended';
                        'oninactive' in _0x521a09 && (_0x5e279f = 'inactive'), _0x521a09.addEventListener(_0x5e279f, function() {
                            if (currentUserMediaRequest.remove(_0x385896.idInstance), 'local' === _0x385896.type) {
                                _0x5e279f = 'ended', 'oninactive' in _0x385896 && (_0x5e279f = 'inactive'), _0x25e82e.onSyncNeeded(_0x385896.streamid, _0x5e279f), _0x449aca.attachStreams.forEach(function(_0x30209b, _0x17c711) {
                                    _0x385896.streamid === _0x30209b.streamid && delete _0x449aca.attachStreams[_0x17c711];
                                });
                                var _0x40a9c8 = [];
                                _0x449aca.attachStreams.forEach(function(_0x2dbc3e) {
                                    _0x2dbc3e && _0x40a9c8.push(_0x2dbc3e);
                                }), _0x449aca.attachStreams = _0x40a9c8;
                                var _0x21b268 = _0x449aca.streamEvents[_0x385896.streamid];
                                if (_0x21b268) return void _0x449aca.onstreamended(_0x21b268);
                                this.parentNode && this.parentNode.removeChild(this);
                            }
                        }, !0x1);
                    }
                    var _0x2b737d = _0x521a09.play();
                    if (void 0x0 !== _0x2b737d) {
                        var _0x1e20a0 = !0x1;
                        setTimeout(function() {
                            _0x1e20a0 || (_0x1e20a0 = true, _0x40a9c8(_0x521a09));
                        }, 0x3e8), _0x2b737d.then(function() {
                            _0x1e20a0 || (_0x1e20a0 = true, _0x40a9c8(_0x521a09));
                        }).catch(function(_0x336a06) {
                            _0x1e20a0 || (_0x1e20a0 = true, _0x40a9c8(_0x521a09));
                        });
                    } else _0x40a9c8(_0x521a09);
                } else _0x40a9c8({});
            }

            function _0x1cbceb(_0x84132f, _0xd43fb8) {
                window.removeEventListener(_0x84132f, _0xd43fb8), window.addEventListener(_0x84132f, _0xd43fb8, !0x1);
            }

            function _0xf3acd(_0x3d2706) {
                var _0x326931 = [];
                return _0x3d2706.forEach(function(_0x1e0ee0) {
                    _0x1e0ee0 && _0x326931.push(_0x1e0ee0);
                }), _0x326931;
            }

            function _0x5deab2(_0x58c43e) {
                return !_0x58c43e.audio && !_0x58c43e.video && !_0x58c43e.screen && _0x58c43e.data;
            }

            function _0x3b94ab(_0x3fc589) {
                return void 0x0 === _0x3fc589;
            }(_0x3a9045 = void 0x0 !== _0x21b268 ? _0x21b268 : null) && 'undefined' == typeof window && void 0x0 !== _0x21b268 && (_0x21b268.navigator = {
                    'userAgent': 'Fake/5.0 (FakeOS) AppleWebKit/123 (KHTML, like Gecko) Fake/12.3.4567.89 Fake/123.45',
                    'getUserMedia': function() {}
                }, _0x21b268.console || (_0x21b268.console = {}), void 0x0 === _0x21b268.console.debug && (_0x21b268.console.debug = _0x21b268.console.info = _0x21b268.console.error = _0x21b268.console.log = _0x21b268.console.log || function() {
                    console.log(arguments);
                }), 'undefined' == typeof document && (_0x3a9045.document = {}, document.createElement = document.captureStream = document.mozCaptureStream = function() {
                    var _0x1056a5 = {
                        'getContext': function() {
                            return _0x1056a5;
                        },
                        'play': function() {},
                        'pause': function() {},
                        'drawImage': function() {},
                        'toDataURL': function() {
                            return '';
                        }
                    };
                    return _0x1056a5;
                }, document.addEventListener = document.removeEventListener = _0x3a9045.addEventListener = _0x3a9045.removeEventListener = function() {}, _0x3a9045.HTMLVideoElement = _0x3a9045.HTMLMediaElement = function() {}), void 0x0 === 'undefined' == typeof location && (_0x3a9045.location = {
                    'protocol': 'file:',
                    'href': '',
                    'hash': '',
                    'origin': 'self'
                }), 'undefined' == typeof screen && (_0x3a9045.screen = {
                    'width': 0x0,
                    'height': 0x0
                }), 'undefined' == typeof URL && (_0x3a9045.URL = {
                    'createObjectURL': function() {
                        return '';
                    },
                    'revokeObjectURL': function() {
                        return '';
                    }
                }), _0x3a9045.window = _0x21b268),
                function() {
                    var _0x1056a5 = 'Fake/5.0 (FakeOS) AppleWebKit/123 (KHTML, like Gecko) Fake/12.3.4567.89 Fake/123.45';
                    if (_0x3f6d71 = 'object' === (void 0x0 === _0x521a09 ? 'undefined' : _0x4ffbab(_0x521a09)) && 'object' === _0x4ffbab(_0x521a09.versions) && _0x521a09.versions.node && !_0x521a09.browser) {
                        var _0x326931 = _0x521a09.versions.node.toString().replace('v', '');
                        _0x1056a5 = 'Nodejs/' + _0x326931 + ' (NodeOS) AppleWebKit/' + _0x326931 + ' (KHTML, like Gecko) Nodejs/' + _0x326931 + ' Nodejs/' + _0x326931;
                    }! function(_0x3f410a) {
                        'undefined' == typeof window && ('undefined' == typeof window && void 0x0 !== _0x21b268 && (_0x21b268.navigator = {
                            'userAgent': _0x1056a5,
                            'getUserMedia': function() {}
                        }, _0x3f410a.window = _0x21b268), 'undefined' == typeof location && (_0x3f410a.location = {
                            'protocol': 'file:',
                            'href': '',
                            'hash': ''
                        }), 'undefined' == typeof screen && (_0x3f410a.screen = {
                            'width': 0x0,
                            'height': 0x0
                        }));
                    }(void 0x0 !== _0x21b268 ? _0x21b268 : window);
                    var _0xd38ed = window.navigator;
                    void 0x0 !== _0xd38ed ? (void 0x0 !== _0xd38ed.webkitGetUserMedia && (_0xd38ed.getUserMedia = _0xd38ed.webkitGetUserMedia), void 0x0 !== _0xd38ed.mozGetUserMedia && (_0xd38ed.getUserMedia = _0xd38ed.mozGetUserMedia)) : _0xd38ed = {
                        'getUserMedia': function() {},
                        'userAgent': _0x1056a5
                    };
                    var _0x4aed46 = !!/Android|webOS|iPhone|iPad|iPod|BB10|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i .test(_0xd38ed.userAgent || ''),
                        _0x4ba312 = !(-0x1 === _0xd38ed.userAgent.indexOf('Edge') || !_0xd38ed.msSaveOrOpenBlob && !_0xd38ed.msSaveBlob),
                        _0xa57f33 = !!window.opera || _0xd38ed.userAgent.indexOf(' OPR/') >= 0x0,
                        _0x111853 = void 0x0 !== window.InstallTrigger,
                        _0x2920ae = /^((?!chrome|android).)*safari/i .test(_0xd38ed.userAgent),
                        _0x5e24f4 = !!window.chrome && !_0xa57f33,
                        _0x566860 = 'undefined' != typeof document && !!document.documentMode && !_0x4ba312;

                    function _0x8a78df(_0x409296, _0x319fb9) {
                        var _0x2fa590 = 0x0,
                            _0x21b268 = !0x1,
                            _0x521a09 = window.setInterval(function() {
                                _0x409296() && (window.clearInterval(_0x521a09), _0x319fb9(_0x21b268)), _0x2fa590++ > 0x32 && (window.clearInterval(_0x521a09), _0x319fb9(_0x21b268 = true));
                            }, 0xa);
                    }
                    var _0x25725b = {
                        'Android': function() {
                            return _0xd38ed.userAgent.match(/Android/i);
                        },
                        'BlackBerry': function() {
                            return _0xd38ed.userAgent.match(/BlackBerry|BB10/i);
                        },
                        'iOS': function() {
                            return _0xd38ed.userAgent.match(/iPhone|iPad|iPod/i);
                        },
                        'Opera': function() {
                            return _0xd38ed.userAgent.match(/Opera Mini/i);
                        },
                        'Windows': function() {
                            return _0xd38ed.userAgent.match(/IEMobile/i);
                        },
                        'any': function() {
                            return _0x25725b.Android() || _0x25725b.BlackBerry() || _0x25725b.iOS() || _0x25725b.Opera() || _0x25725b.Windows();
                        },
                        'getOsName': function() {
                            var _0x1056a5 = 'Unknown OS';
                            return _0x25725b.Android() && (_0x1056a5 = 'Android'), _0x25725b.BlackBerry() && (_0x1056a5 = 'BlackBerry'), _0x25725b.iOS() && (_0x1056a5 = 'iOS'), _0x25725b.Opera() && (_0x1056a5 = 'Opera Mini'), _0x25725b.Windows() && (_0x1056a5 = 'Windows'), _0x1056a5;
                        }
                    };
                    var _0xfabbbb = 'Unknown OS',
                        _0x533b2e = 'Unknown OS Version';
                    var _0x373254, _0x3c966e, _0x47d25f = function() {
                        for (var _0x1056a5, _0x326931 = _0xd38ed.appVersion, _0x2fa590 = _0xd38ed.userAgent, _0x21b268 = '-', _0x521a09 = [{
                                's': 'Windows 10',
                                'r': /(Windows 10.0|Windows NT 10.0)/
                            }, {
                                's': 'Windows 8.1',
                                'r': /(Windows 8.1|Windows NT 6.3)/
                            }, {
                                's': 'Windows 8',
                                'r': /(Windows 8|Windows NT 6.2)/
                            }, {
                                's': 'Windows 7',
                                'r': /(Windows 7|Windows NT 6.1)/
                            }, {
                                's': 'Windows Vista',
                                'r': /Windows NT 6.0/
                            }, {
                                's': 'Windows Server 2003',
                                'r': /Windows NT 5.2/
                            }, {
                                's': 'Windows XP',
                                'r': /(Windows NT 5.1|Windows XP)/
                            }, {
                                's': 'Windows 2000',
                                'r': /(Windows NT 5.0|Windows 2000)/
                            }, {
                                's': 'Windows ME',
                                'r': /(Win 9x 4.90|Windows ME)/
                            }, {
                                's': 'Windows 98',
                                'r': /(Windows 98|Win98)/
                            }, {
                                's': 'Windows 95',
                                'r': /(Windows 95|Win95|Windows_95)/
                            }, {
                                's': 'Windows NT 4.0',
                                'r': /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/
                            }, {
                                's': 'Windows CE',
                                'r': /Windows CE/
                            }, {
                                's': 'Windows 3.11',
                                'r': /Win16/
                            }, {
                                's': 'Android',
                                'r': /Android/
                            }, {
                                's': 'Open BSD',
                                'r': /OpenBSD/
                            }, {
                                's': 'Sun OS',
                                'r': /SunOS/
                            }, {
                                's': 'Linux',
                                'r': /(Linux|X11)/
                            }, {
                                's': 'iOS',
                                'r': /(iPhone|iPad|iPod)/
                            }, {
                                's': 'Mac OS X',
                                'r': /Mac OS X/
                            }, {
                                's': 'Mac OS',
                                'r': /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/
                            }, {
                                's': 'QNX',
                                'r': /QNX/
                            }, {
                                's': 'UNIX',
                                'r': /UNIX/
                            }, {
                                's': 'BeOS',
                                'r': /BeOS/
                            }, {
                                's': 'OS/2',
                                'r': /OS\/2/
                            }, {
                                's': 'Search Bot',
                                'r': /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
                            }], _0x443861 = 0x0; _0x1056a5 = _0x521a09[_0x443861]; _0x443861++)
                            if (_0x1056a5.r.test(_0x2fa590)) {
                                _0x21b268 = _0x1056a5.s;
                                break;
                            }
                        var _0x434d96 = '-';
                        switch (/Windows/ .test(_0x21b268) && (/Windows (.*)/ .test(_0x21b268) && (_0x434d96 = /Windows (.*)/ .exec(_0x21b268)[0x1]), _0x21b268 = 'Windows'), _0x21b268) {
                            case 'Mac OS X':
                                /Mac OS X (10[\.\_\d]+)/ .test(_0x2fa590) && (_0x434d96 = /Mac OS X (10[\.\_\d]+)/ .exec(_0x2fa590)[0x1]);
                                break;
                            case 'Android':
                                /Android ([\.\_\d]+)/ .test(_0x2fa590) && (_0x434d96 = /Android ([\.\_\d]+)/ .exec(_0x2fa590)[0x1]);
                                break;
                            case 'iOS':
                                /OS (\d+)_(\d+)_?(\d+)?/ .test(_0x2fa590) && (_0x434d96 = (_0x434d96 = /OS (\d+)_(\d+)_?(\d+)?/ .exec(_0x326931))[0x1] + '.' + _0x434d96[0x2] + '.' + (0x0 | _0x434d96[0x3]));
                        }
                        return {
                            'osName': _0x21b268,
                            'osVersion': _0x434d96
                        };
                    }();
                    _0x47d25f && _0x47d25f.osName && '-' != _0x47d25f.osName ? (_0xfabbbb = _0x47d25f.osName, _0x533b2e = _0x47d25f.osVersion) : _0x25725b.any() && 'Android' == (_0xfabbbb = _0x25725b.getOsName()) && (_0x533b2e = !!(_0x3c966e = (_0x373254 = (_0x373254 || _0xd38ed.userAgent).toLowerCase()).match(/android\s([0-9\.]*)/)) && _0x3c966e[0x1]);
                    var _0x3f6d71 = 'object' === (void 0x0 === _0x521a09 ? 'undefined' : _0x4ffbab(_0x521a09)) && 'object' === _0x4ffbab(_0x521a09.versions) && _0x521a09.versions.node;
                    'Unknown OS' === _0xfabbbb && _0x3f6d71 && (_0xfabbbb = 'Nodejs', _0x533b2e = _0x521a09.versions.node.toString().replace('v', ''));
                    var _0x233149 = !0x1,
                        _0x467217 = !0x1;
                    ['captureStream', 'mozCaptureStream', 'webkitCaptureStream'].forEach(function(_0x2dba73) {
                        'undefined' != typeof document && 'function' == typeof document.createElement && (!_0x233149 && _0x2dba73 in document.createElement('canvas') && (_0x233149 = true), !_0x467217 && _0x2dba73 in document.createElement('video') && (_0x467217 = true));
                    });
                    var _0x327730 = /^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/,
                        _0x39bfae = /([0-9]{1,3}(\.[0-9]{1,3}){3})/,
                        _0xe1f7d = /[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7}/;
                    var _0x37c2dd = [],
                        _0x47e1c4 = [],
                        _0x1e709a = [],
                        _0x536d10 = [];
                    _0xd38ed.mediaDevices && _0xd38ed.mediaDevices.enumerateDevices && (_0xd38ed.enumerateDevices = function(_0x101328) {
                        var _0x326931 = _0xd38ed.mediaDevices.enumerateDevices();
                        _0x326931 && _0x326931.then ? _0xd38ed.mediaDevices.enumerateDevices().then(_0x101328).catch(function() {
                            _0x101328([]);
                        }) : _0x101328([]);
                    });
                    var _0x1ec78f = !0x1;
                    void 0x0 !== _0x1d01b4 && 'getSources' in _0x1d01b4 ? _0x1ec78f = true : _0xd38ed.mediaDevices && _0xd38ed.mediaDevices.enumerateDevices && (_0x1ec78f = true);
                    var _0x1e6405 = !0x1,
                        _0x20f7ce = !0x1,
                        _0x528a8d = !0x1,
                        _0x242003 = !0x1,
                        _0x1583d5 = !0x1;

                    function _0x5a290a(_0x5b8353) {
                        if (_0x1ec78f)
                            if (!_0xd38ed.enumerateDevices && window.MediaStreamTrack && window.MediaStreamTrack.getSources && (_0xd38ed.enumerateDevices = window.MediaStreamTrack.getSources.bind(window.MediaStreamTrack)), !_0xd38ed.enumerateDevices && _0xd38ed.enumerateDevices && (_0xd38ed.enumerateDevices = _0xd38ed.enumerateDevices.bind(_0xd38ed)), _0xd38ed.enumerateDevices) {
                                _0x37c2dd = [], _0x47e1c4 = [], _0x1e709a = [], _0x536d10 = [], _0x1e6405 = !0x1, _0x20f7ce = !0x1, _0x528a8d = !0x1, _0x242003 = !0x1, _0x1583d5 = !0x1;
                                var _0x326931 = {};
                                _0xd38ed.enumerateDevices(function(_0x11a0f9) {
                                    _0x11a0f9.forEach(function(_0x210fa4) {
                                        var _0x11a0f9 = {};
                                        for (var _0x21b268 in _0x210fa4) try {
                                            'function' != typeof _0x210fa4[_0x21b268] && (_0x11a0f9[_0x21b268] = _0x210fa4[_0x21b268]);
                                        } catch (_0x1914ff) {}
                                        _0x326931[_0x11a0f9.deviceId + _0x11a0f9.label + _0x11a0f9.kind] || ('audio' === _0x11a0f9.kind && (_0x11a0f9.kind = 'audioinput'), 'video' === _0x11a0f9.kind && (_0x11a0f9.kind = 'videoinput'), _0x11a0f9.deviceId || (_0x11a0f9.deviceId = _0x11a0f9.id), _0x11a0f9.id || (_0x11a0f9.id = _0x11a0f9.deviceId), _0x11a0f9.label ? ('videoinput' !== _0x11a0f9.kind || _0x1583d5 || (_0x1583d5 = true), 'audioinput' !== _0x11a0f9.kind || _0x242003 || (_0x242003 = true)) : (_0x11a0f9.isCustomLabel = true, 'videoinput' === _0x11a0f9.kind ? _0x11a0f9.label = 'Camera ' + (_0x536d10.length + 0x1) : 'audioinput' === _0x11a0f9.kind ? _0x11a0f9.label = 'Microphone ' + (_0x47e1c4.length + 0x1) : 'audiooutput' === _0x11a0f9.kind ? _0x11a0f9.label = 'Speaker ' + (_0x1e709a.length + 0x1) : _0x11a0f9.label = 'Please invoke getUserMedia once.', void 0x0 !== _0x444319 && _0x444319.browser.isChrome && _0x444319.browser.version >= 0x2e && !/^(https:|chrome-extension:)$/g .test(location.protocol || '') && 'undefined' != typeof document && 'string' == typeof document.domain && document.domain.search && -0x1 === document.domain.search(/localhost|127.0./g) && (_0x11a0f9.label = 'HTTPs is required to get label of this ' + _0x11a0f9.kind + ' device.')), 'audioinput' === _0x11a0f9.kind && (_0x1e6405 = true, -0x1 === _0x47e1c4.indexOf(_0x11a0f9) && _0x47e1c4.push(_0x11a0f9)), 'audiooutput' === _0x11a0f9.kind && (_0x20f7ce = true, -0x1 === _0x1e709a.indexOf(_0x11a0f9) && _0x1e709a.push(_0x11a0f9)), 'videoinput' === _0x11a0f9.kind && (_0x528a8d = true, -0x1 === _0x536d10.indexOf(_0x11a0f9) && _0x536d10.push(_0x11a0f9)), _0x37c2dd.push(_0x11a0f9), _0x326931[_0x11a0f9.deviceId + _0x11a0f9.label + _0x11a0f9.kind] = _0x11a0f9);
                                    }), void 0x0 !== _0x444319 && (_0x444319.MediaDevices = _0x37c2dd, _0x444319.hasMicrophone = _0x1e6405, _0x444319.hasSpeakers = _0x20f7ce, _0x444319.hasWebcam = _0x528a8d, _0x444319.isWebsiteHasWebcamPermissions = _0x1583d5, _0x444319.isWebsiteHasMicrophonePermissions = _0x242003, _0x444319.audioInputDevices = _0x47e1c4, _0x444319.audioOutputDevices = _0x1e709a, _0x444319.videoInputDevices = _0x536d10), _0x5b8353 && _0x5b8353();
                                });
                            } else _0x5b8353 && _0x5b8353();
                        else _0x5b8353 && _0x5b8353();
                    }
                    var _0x444319 = window.DetectRTC || {};
                    _0x444319.browser = function() {
                            _0xd38ed.appVersion;
                            var _0x1056a5, _0x326931, _0x2fa590, _0x21b268 = _0xd38ed.userAgent,
                                _0x521a09 = _0xd38ed.appName,
                                _0x441e45 = '' + parseFloat(_0xd38ed.appVersion),
                                _0x174a5c = parseInt(_0xd38ed.appVersion, 0xa);
                            if (_0x2920ae && !_0x5e24f4 && -0x1 !== _0x21b268.indexOf('CriOS') && (_0x2920ae = !0x1, _0x5e24f4 = true), _0xa57f33) {
                                _0x521a09 = 'Opera';
                                try {
                                    _0x174a5c = (_0x441e45 = _0xd38ed.userAgent.split('OPR/')[0x1].split(' ')[0x0]).split('.')[0x0];
                                } catch (_0xbb1615) {
                                    _0x441e45 = '0.0.0.0', _0x174a5c = 0x0;
                                }
                            } else _0x566860 ? ((_0x326931 = _0x21b268.indexOf('rv:')) > 0x0 ? _0x441e45 = _0x21b268.substring(_0x326931 + 0x3) : (_0x326931 = _0x21b268.indexOf('MSIE'), _0x441e45 = _0x21b268.substring(_0x326931 + 0x5)), _0x521a09 = 'IE') : _0x5e24f4 ? (_0x326931 = _0x21b268.indexOf('Chrome'), _0x521a09 = 'Chrome', _0x441e45 = _0x21b268.substring(_0x326931 + 0x7)) : _0x2920ae ? (_0x326931 = _0x21b268.indexOf('Safari'), _0x521a09 = 'Safari', _0x441e45 = _0x21b268.substring(_0x326931 + 0x7), -0x1 !== (_0x326931 = _0x21b268.indexOf('Version')) && (_0x441e45 = _0x21b268.substring(_0x326931 + 0x8)), -0x1 !== _0xd38ed.userAgent.indexOf('Version/') && (_0x441e45 = _0xd38ed.userAgent.split('Version/')[0x1].split(' ')[0x0])) : _0x111853 ? (_0x326931 = _0x21b268.indexOf('Firefox'), _0x521a09 = 'Firefox', _0x441e45 = _0x21b268.substring(_0x326931 + 0x8)) : (_0x1056a5 = _0x21b268.lastIndexOf(' ') + 0x1) < (_0x326931 = _0x21b268.lastIndexOf('/')) && (_0x521a09 = _0x21b268.substring(_0x1056a5, _0x326931), _0x441e45 = _0x21b268.substring(_0x326931 + 0x1), _0x521a09.toLowerCase() === _0x521a09.toUpperCase() && (_0x521a09 = _0xd38ed.appName));
                            return _0x4ba312 && (_0x521a09 = 'Edge', _0x441e45 = _0xd38ed.userAgent.split('Edge/')[0x1]), -0x1 !== (_0x2fa590 = _0x441e45.search(/[; \)]/)) && (_0x441e45 = _0x441e45.substring(0x0, _0x2fa590)), _0x174a5c = parseInt('' + _0x441e45, 0xa), isNaN(_0x174a5c) && (_0x441e45 = '' + parseFloat(_0xd38ed.appVersion), _0x174a5c = parseInt(_0xd38ed.appVersion, 0xa)), {
                                'fullVersion': _0x441e45,
                                'version': _0x174a5c,
                                'name': _0x521a09,
                                'isPrivateBrowsing': !0x1
                            };
                        }(),
                        function(_0xbf5986) {
                            var _0x326931;
                            try {
                                if (window.webkitRequestFileSystem) window.webkitRequestFileSystem(window.TEMPORARY, 0x1, function() {
                                    _0x326931 = !0x1;
                                }, function(_0x57feb9) {
                                    _0x326931 = true;
                                });
                                else if (window.indexedDB && /Firefox/ .test(window.navigator.userAgent)) {
                                    var _0x2fa590;
                                    try {
                                        (_0x2fa590 = window.indexedDB.open('test')).onerror = function() {
                                            return true;
                                        };
                                    } catch (_0xe0bac4) {
                                        _0x326931 = true;
                                    }
                                    void 0x0 === _0x326931 && _0x8a78df(function() {
                                        return 'done' === _0x2fa590.readyState;
                                    }, function(_0x236923) {
                                        _0x236923 || (_0x326931 = !_0x2fa590.result);
                                    });
                                } else if (function(_0x8e13f) {
                                        var _0x326931 = _0x8e13f.toLowerCase();
                                        if (0x0 === _0x326931.indexOf('msie') && 0x0 === _0x326931.indexOf('trident')) return !0x1;
                                        var _0x2fa590 = /(?:msie|rv:)\s?([\d\.]+)/ .exec(_0x326931);
                                        return !!(_0x2fa590 && parseInt(_0x2fa590[0x1], 0xa) >= 0xa);
                                    }(window.navigator.userAgent)) {
                                    _0x326931 = !0x1;
                                    try {
                                        window.indexedDB || (_0x326931 = true);
                                    } catch (_0x4d0f1c) {
                                        _0x326931 = true;
                                    }
                                } else if (window.localStorage && /Safari/ .test(window.navigator.userAgent)) {
                                    try {
                                        window.localStorage.setItem('test', 0x1);
                                    } catch (_0x217100) {
                                        _0x326931 = true;
                                    }
                                    void 0x0 === _0x326931 && (_0x326931 = !0x1, window.localStorage.removeItem('test'));
                                }
                            } catch (_0x54458d) {
                                _0x326931 = !0x1;
                            }
                            _0x8a78df(function() {
                                return void 0x0 !== _0x326931;
                            }, function(_0x139aa5) {
                                _0xbf5986(_0x326931);
                            });
                        }(function(_0x82ccf2) {
                            _0x444319.browser.isPrivateBrowsing = !!_0x82ccf2;
                        }), _0x444319.browser['is' + _0x444319.browser.name] = true, _0x444319.osName = _0xfabbbb, _0x444319.osVersion = _0x533b2e;
                    'object' === (void 0x0 === _0x521a09 ? 'undefined' : _0x4ffbab(_0x521a09)) && 'object' === _0x4ffbab(_0x521a09.versions) && _0x521a09.versions['node-webkit'];
                    var _0xb774b1 = !0x1;
                    ['RTCPeerConnection', 'webkitRTCPeerConnection', 'mozRTCPeerConnection', 'RTCIceGatherer'].forEach(function(_0x1a220e) {
                        _0xb774b1 || _0x1a220e in window && (_0xb774b1 = true);
                    }), _0x444319.isWebRTCSupported = _0xb774b1, _0x444319.isORTCSupported = 'undefined' != typeof RTCIceGatherer;
                    var _0x20eef3 = !0x1;
                    (_0x444319.browser.isChrome && _0x444319.browser.version >= 0x23 ? _0x20eef3 = true : _0x444319.browser.isFirefox && _0x444319.browser.version >= 0x22 ? _0x20eef3 = true : _0x444319.browser.isEdge && _0x444319.browser.version >= 0x11 ? _0x20eef3 = true : 'Android' === _0x444319.osName && _0x444319.browser.isChrome && (_0x20eef3 = true), /^(https:|chrome-extension:)$/g .test(location.protocol || '')) || ('undefined' != typeof document && 'string' == typeof document.domain && document.domain.search && -0x1 === document.domain.search(/localhost|127.0./g) && (_0x444319.browser.isChrome || _0x444319.browser.isEdge || _0x444319.browser.isOpera) ? _0x20eef3 = !0x1 : _0x444319.browser.isFirefox && (_0x20eef3 = !0x1));
                    _0x444319.isScreenCapturingSupported = _0x20eef3;
                    var _0x41f5bd = {
                        'isSupported': !0x1,
                        'isCreateMediaStreamSourceSupported': !0x1
                    };
                    ['AudioContext', 'webkitAudioContext', 'mozAudioContext', 'msAudioContext'].forEach(function(_0x6f8ee8) {
                        _0x41f5bd.isSupported || _0x6f8ee8 in window && (_0x41f5bd.isSupported = true, window[_0x6f8ee8] && 'createMediaStreamSource' in window[_0x6f8ee8].prototype && (_0x41f5bd.isCreateMediaStreamSourceSupported = true));
                    }), _0x444319.isAudioContextSupported = _0x41f5bd.isSupported, _0x444319.isCreateMediaStreamSourceSupported = _0x41f5bd.isCreateMediaStreamSourceSupported;
                    var _0x3c8f54 = !0x1;
                    _0x444319.browser.isChrome && _0x444319.browser.version > 0x1f && (_0x3c8f54 = true), _0x444319.isRtpDataChannelsSupported = _0x3c8f54;
                    var _0x4e0543 = !0x1;
                    _0x444319.browser.isFirefox && _0x444319.browser.version > 0x1c ? _0x4e0543 = true : _0x444319.browser.isChrome && _0x444319.browser.version > 0x19 ? _0x4e0543 = true : _0x444319.browser.isOpera && _0x444319.browser.version >= 0xb && (_0x4e0543 = true), _0x444319.isSctpDataChannelsSupported = _0x4e0543, _0x444319.isMobileDevice = _0x4aed46;
                    var _0x27c37d = !0x1;
                    _0xd38ed.getUserMedia ? _0x27c37d = true : _0xd38ed.mediaDevices && _0xd38ed.mediaDevices.getUserMedia && (_0x27c37d = true), _0x444319.browser.isChrome && _0x444319.browser.version >= 0x2e && !/^(https:|chrome-extension:)$/g .test(location.protocol || '') && 'undefined' != typeof document && 'string' == typeof document.domain && document.domain.search && -0x1 === document.domain.search(/localhost|127.0./g) && (_0x27c37d = 'Requires HTTPs'), 'Nodejs' === _0x444319.osName && (_0x27c37d = !0x1), _0x444319.isGetUserMediaSupported = _0x27c37d;
                    var _0x5d3017, _0x4c1193, _0x5997d1, _0x4bd937 = '';
                    screen.width && (_0x4bd937 += (screen.width ? screen.width : '') + ' x ' + (screen.height ? screen.height : ''));
                    _0x444319.displayResolution = _0x4bd937, _0x444319.displayAspectRatio = (_0x5d3017 = screen.width, _0x4c1193 = screen.height, _0x5997d1 = function _0x1056a5(_0x9f77a2, _0x157ff4) {
                        return 0x0 == _0x157ff4 ? _0x9f77a2 : _0x1056a5(_0x157ff4, _0x9f77a2 % _0x157ff4);
                    }(_0x5d3017, _0x4c1193), _0x5d3017 / _0x5997d1 / (_0x4c1193 / _0x5997d1)).toFixed(0x2), _0x444319.isCanvasSupportsStreamCapturing = _0x233149, _0x444319.isVideoSupportsStreamCapturing = _0x467217, 'Chrome' == _0x444319.browser.name && _0x444319.browser.version >= 0x35 && (_0x444319.isCanvasSupportsStreamCapturing || (_0x444319.isCanvasSupportsStreamCapturing = 'Requires chrome flag: enable-experimental-web-platform-features'), _0x444319.isVideoSupportsStreamCapturing || (_0x444319.isVideoSupportsStreamCapturing = 'Requires chrome flag: enable-experimental-web-platform-features')), _0x444319.DetectLocalIPAddress = function(_0x527d6a, _0x3e6338) {
                        if (_0x444319.isWebRTCSupported) {
                            var _0x2fa590 = true,
                                _0x21b268 = true;
                            ! function(_0x169ed4, _0x457465) {
                                if ('undefined' == typeof document || 'function' != typeof document.getElementById) return;
                                var _0x2fa590 = {},
                                    _0x21b268 = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
                                if (!_0x21b268) {
                                    var _0x521a09 = document.getElementById('iframe');
                                    if (!_0x521a09) return;
                                    var _0x57dce2 = _0x521a09.contentWindow;
                                    _0x21b268 = _0x57dce2.RTCPeerConnection || _0x57dce2.mozRTCPeerConnection || _0x57dce2.webkitRTCPeerConnection;
                                }
                                if (!_0x21b268) return;
                                var _0x1ebe24 = null;
                                'Chrome' === _0x444319.browser && _0x444319.browser.version < 0x3a && (_0x1ebe24 = {
                                    'optional': [{
                                        'RtpDataChannels': true
                                    }]
                                });
                                var _0x355289 = new _0x21b268({
                                    'iceServers': [{
                                        'urls': 'stun:stun.l.google.com:19302'
                                    }]
                                }, _0x1ebe24);
                                _0x457465 && (_0x355289.addStream ? _0x355289.addStream(_0x457465) : _0x355289.addTrack && _0x457465.getTracks()[0x0] && _0x355289.addTrack(_0x457465.getTracks()[0x0], _0x457465));

                                function _0x367cf9(_0x23abd1) {
                                    var _0x21b268 = _0x39bfae.exec(_0x23abd1);
                                    if (_0x21b268) {
                                        var _0x521a09 = _0x21b268[0x1],
                                            _0x2faf0b = _0x23abd1.match(_0x327730);
                                        void 0x0 === _0x2fa590[_0x521a09] && _0x169ed4(_0x521a09, _0x2faf0b, true), _0x2fa590[_0x521a09] = true;
                                    }
                                }
                                if (_0x355289.onicecandidate = function(_0xd7031e) {
                                        _0xd7031e.candidate && _0x367cf9(_0xd7031e.candidate.candidate);
                                    }, !_0x457465) try {
                                    _0x355289.createDataChannel('sctp', {});
                                } catch (_0x1edf47) {}
                                _0x444319.isPromisesSupported ? _0x355289.createOffer().then(function(_0xedec09) {
                                    _0x355289.setLocalDescription(_0xedec09).then(_0x45699b);
                                }) : _0x355289.createOffer(function(_0xf8592b) {
                                    _0x355289.setLocalDescription(_0xf8592b, _0x45699b, function() {});
                                }, function() {});

                                function _0x45699b() {
                                    _0x355289.localDescription.sdp.split('\n').forEach(function(_0x4e78ca) {
                                        0x0 === _0x4e78ca.indexOf('a=candidate:') && _0x367cf9(_0x4e78ca);
                                    });
                                }
                            }(function(_0x2a2630) {
                                _0x2a2630.match(_0x327730) ? _0x527d6a('Local: ' + _0x2a2630, _0x2fa590 = !0x1, _0x21b268) : _0x2a2630.match(_0xe1f7d) ? _0x527d6a('Public: ' + _0x2a2630, _0x2fa590, _0x21b268 = !0x1) : _0x527d6a('Public: ' + _0x2a2630, _0x2fa590, _0x21b268);
                            }, _0x3e6338);
                        }
                    }, _0x444319.isWebSocketsSupported = 'WebSocket' in window && 0x2 === window.WebSocket.CLOSING, _0x444319.isWebSocketsBlocked = !_0x444319.isWebSocketsSupported, 'Nodejs' === _0x444319.osName && (_0x444319.isWebSocketsSupported = true, _0x444319.isWebSocketsBlocked = !0x1), _0x444319.checkWebSocketsSupport = function(_0x1102a1) {
                        _0x1102a1 = _0x1102a1 || function() {};
                        try {
                            var _0x326931, _0x2fa590 = new WebSocket('wss://echo.websocket.org:443/');
                            _0x2fa590.onopen = function() {
                                _0x444319.isWebSocketsBlocked = !0x1, _0x326931 = new Date().getTime(), _0x2fa590.send('ping');
                            }, _0x2fa590.onmessage = function() {
                                _0x444319.WebsocketLatency = new Date().getTime() - _0x326931 + 'ms', _0x1102a1(), _0x2fa590.close(), _0x2fa590 = null;
                            }, _0x2fa590.onerror = function() {
                                _0x444319.isWebSocketsBlocked = true, _0x1102a1();
                            };
                        } catch (_0x11ac18) {
                            _0x444319.isWebSocketsBlocked = true, _0x1102a1();
                        }
                    }, _0x444319.load = function(_0x83e5e9) {
                        _0x5a290a(_0x83e5e9 = _0x83e5e9 || function() {});
                    }, _0x444319.MediaDevices = void 0x0 !== _0x37c2dd ? _0x37c2dd : [], _0x444319.hasMicrophone = _0x1e6405, _0x444319.hasSpeakers = _0x20f7ce, _0x444319.hasWebcam = _0x528a8d, _0x444319.isWebsiteHasWebcamPermissions = _0x1583d5, _0x444319.isWebsiteHasMicrophonePermissions = _0x242003, _0x444319.audioInputDevices = _0x47e1c4, _0x444319.audioOutputDevices = _0x1e709a, _0x444319.videoInputDevices = _0x536d10;
                    var _0x5da020 = !0x1;
                    'undefined' != typeof document && 'function' == typeof document.createElement && 'setSinkId' in document.createElement('video') && (_0x5da020 = true), _0x444319.isSetSinkIdSupported = _0x5da020;
                    var _0x1b0b81 = !0x1;
                    _0x444319.browser.isFirefox && 'undefined' != typeof mozRTCPeerConnection ? 'getSenders' in mozRTCPeerConnection.prototype && (_0x1b0b81 = true) : _0x444319.browser.isChrome && 'undefined' != typeof webkitRTCPeerConnection && 'getSenders' in webkitRTCPeerConnection.prototype && (_0x1b0b81 = true), _0x444319.isRTPSenderReplaceTracksSupported = _0x1b0b81;
                    var _0x83ded = !0x1;
                    _0x444319.browser.isFirefox && _0x444319.browser.version > 0x26 && (_0x83ded = true), _0x444319.isRemoteStreamProcessingSupported = _0x83ded;
                    var _0x51520c = !0x1;
                    void 0x0 !== _0x1d01b4 && 'applyConstraints' in _0x1d01b4.prototype && (_0x51520c = true), _0x444319.isApplyConstraintsSupported = _0x51520c;
                    var _0x298a09 = !0x1;
                    _0x444319.browser.isFirefox && _0x444319.browser.version >= 0x2b && (_0x298a09 = true), _0x444319.isMultiMonitorScreenCapturingSupported = _0x298a09, _0x444319.isPromisesSupported = !!('Promise' in window), _0x444319.version = '1.3.7', void 0x0 === _0x444319 && (window.DetectRTC = {});
                    var _0x187d8a = window.MediaStream;
                    void 0x0 === _0x187d8a && 'undefined' != typeof webkitMediaStream && (_0x187d8a = webkitMediaStream), _0x444319.MediaStream = void 0x0 !== _0x187d8a && 'function' == typeof _0x187d8a && Object.keys(_0x187d8a.prototype), _0x444319.MediaStreamTrack = void 0x0 !== _0x1d01b4 && Object.keys(_0x1d01b4.prototype);
                    var _0x5898a3 = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
                    _0x444319.RTCPeerConnection = void 0x0 !== _0x5898a3 && Object.keys(_0x5898a3.prototype), window.DetectRTC = _0x444319, 'function' == typeof define && _0x2fa590(0x90) && define('DetectRTC', [], function() {
                        return _0x444319;
                    });
                }(), 'undefined' != typeof cordova && (DetectRTC.isMobileDevice = true, DetectRTC.browser.name = 'Chrome'), navigator && navigator.userAgent && -0x1 !== navigator.userAgent.indexOf('Crosswalk') && (DetectRTC.isMobileDevice = true, DetectRTC.browser.name = 'Chrome'), window.addEventListener || (window.addEventListener = function(_0x1e341e, _0x410d8a, _0x164ba3) {
                    _0x1e341e.attachEvent && _0x1e341e.attachEvent('on' + _0x410d8a, _0x164ba3);
                }), window.attachEventListener = function(_0x28f783, _0xf32336, _0x5ddd69, _0x1e62b3) {
                    _0x28f783.addEventListener(_0xf32336, _0x5ddd69, _0x1e62b3);
                };
            var _0x1d809b = window.MediaStream;

            function _0x93df62(_0x128905, _0x2d6fa0) {
                return (!_0x128905.session.audio || 'two-way' !== _0x128905.session.audio) && ('Firefox' === DetectRTC.browser.name && !0x1 !== _0x2d6fa0 || !('Chrome' !== DetectRTC.browser.name || DetectRTC.browser.version < 0x32) && (true === typeof _0x2d6fa0 || !(void 0x0 !== _0x2d6fa0 || !_0x128905.session.audio || !_0x128905.session.screen || _0x128905.session.video) && (_0x2d6fa0 = true, true)));
            }

            function _0x405170(_0x53fd0a) {
                return 'Firefox' === DetectRTC.browser.name || 'Chrome' === DetectRTC.browser.name && {
                    'mandatory': {
                        'chromeMediaSource': _0x53fd0a.mandatory.chromeMediaSource,
                        'chromeMediaSourceId': _0x53fd0a.mandatory.chromeMediaSourceId
                    }
                };
            }

            function _0x2cbba5(_0x5f06c5, _0x3f8518) {
                return _0x5f06c5 && _0x5f06c5.getTracks ? _0x5f06c5.getTracks().filter(function(_0x12aae8) {
                    return _0x12aae8.kind === (_0x3f8518 || 'audio');
                }) : [];
            }

            function _0x5407aa() {
                var _0x1056a5 = !0x1;
                try {
                    if ('undefined' == typeof RTCRtpTransceiver) return !0x1;
                    if (!('currentDirection' in RTCRtpTransceiver.prototype)) return !0x1;
                    var _0x326931 = new _0x2a4be1();
                    try {
                        _0x326931.addTransceiver('audio'), _0x1056a5 = true;
                    } catch (_0x365290) {}
                    _0x326931.close();
                } catch (_0x4e12a1) {
                    _0x1056a5 = !0x1;
                }
                return _0x1056a5 && function() {
                    var _0x1056a5 = !0x1;
                    try {
                        var _0x326931 = new _0x2a4be1({
                            'sdpSemantics': 'unified-plan'
                        });
                        try {
                            var _0x2fa590 = _0x326931.getConfiguration();
                            _0x1056a5 = 'unified-plan' == _0x2fa590.sdpSemantics || (_0x2fa590.sdpSemantics, !0x1);
                        } catch (_0x1ddaa9) {
                            _0x1056a5 = !0x1;
                        }
                    } catch (_0x30213a) {
                        _0x1056a5 = !0x1;
                    }
                    return _0x1056a5;
                }();
            }

            function _0x2eda5b() {
                if ('undefined' != typeof cordova && void 0x0 !== cordova.plugins && void 0x0 !== cordova.plugins.iosrtc) {
                    var _0x1056a5 = cordova.plugins.iosrtc;
                    window.webkitRTCPeerConnection = _0x1056a5.RTCPeerConnection, window.RTCSessionDescription = _0x1056a5.RTCSessionDescription, window.RTCIceCandidate = _0x1056a5.RTCIceCandidate, window.MediaStream = _0x1056a5.MediaStream, window.MediaStreamTrack = _0x1056a5.MediaStreamTrack, navigator.getUserMedia = navigator.webkitGetUserMedia = _0x1056a5.getUserMedia, _0x1056a5.debug.enable('iosrtc*'), 'function' == typeof _0x1056a5.selectAudioOutput && _0x1056a5.selectAudioOutput(window.iOSDefaultAudioOutputDevice || 'speaker'), _0x1056a5.registerGlobals();
                }
            }
            void 0x0 === _0x1d809b && 'undefined' != typeof webkitMediaStream && (_0x1d809b = webkitMediaStream), void 0x0 !== _0x1d809b && ('stop' in _0x1d809b.prototype || (_0x1d809b.prototype.stop = function() {
                this.getTracks().forEach(function(_0x484c2d) {
                    _0x484c2d.stop();
                });
            })), window.iOSDefaultAudioOutputDevice = window.iOSDefaultAudioOutputDevice || 'speaker', document.addEventListener('deviceready', _0x2eda5b, !0x1), _0x2eda5b();
            var _0x2a4be1, _0x394dad = {};

            function _0xe7bfb2(_0x5b2014) {
                return {
                    'OfferToReceiveAudio': !!_0x5b2014.OfferToReceiveAudio,
                    'OfferToReceiveVideo': !!_0x5b2014.OfferToReceiveVideo
                };
            }
            void 0x0 !== window.RTCPeerConnection ? _0x2a4be1 = window.RTCPeerConnection : 'undefined' != typeof mozRTCPeerConnection ? _0x2a4be1 = mozRTCPeerConnection : 'undefined' != typeof webkitRTCPeerConnection && (_0x2a4be1 = webkitRTCPeerConnection);
            var _0x28d3c1 = window.RTCSessionDescription || window.mozRTCSessionDescription,
                _0x437c06 = window.RTCIceCandidate || window.mozRTCIceCandidate,
                _0x1d01b4 = window.MediaStreamTrack;

            function _0x4c6fdb(_0xeb3993) {
                if (void 0x0 !== window.RTCPeerConnection ? _0x2a4be1 = window.RTCPeerConnection : 'undefined' != typeof mozRTCPeerConnection ? _0x2a4be1 = mozRTCPeerConnection : 'undefined' != typeof webkitRTCPeerConnection && (_0x2a4be1 = webkitRTCPeerConnection), _0x28d3c1 = window.RTCSessionDescription || window.mozRTCSessionDescription, _0x437c06 = window.RTCIceCandidate || window.mozRTCIceCandidate, _0x1d01b4 = window.MediaStreamTrack, !_0x2a4be1) throw 'WebRTC 1.0 (RTCPeerConnection) API are NOT available in this browser.';
                var _0x326931 = _0xeb3993.rtcMultiConnection;
                this.extra = _0xeb3993.remoteSdp ? _0xeb3993.remoteSdp.extra : _0x326931.extra, this.userid = _0xeb3993.userid, this.streams = [], this.channels = _0xeb3993.channels || [], this.connectionDescription = _0xeb3993.connectionDescription, this.addStream = function(_0x500ec1) {
                    _0x326931.addStream(_0x500ec1, _0x2fa590.userid);
                }, this.removeStream = function(_0x1bebfb) {
                    _0x326931.removeStream(_0x1bebfb, _0x2fa590.userid);
                };
                var _0x2fa590 = this;
                _0xeb3993.remoteSdp && (this.connectionDescription = _0xeb3993.remoteSdp.connectionDescription);
                var _0x21b268, _0x521a09 = {};
                _0x394dad.sdpConstraints = _0xe7bfb2({
                    'OfferToReceiveAudio': true,
                    'OfferToReceiveVideo': true
                });
                var _0x53652f = !!_0xeb3993.renegotiatingPeer;
                _0xeb3993.remoteSdp && (_0x53652f = !!_0xeb3993.remoteSdp.renegotiatingPeer);
                var _0x5aa3f5 = [];
                if (_0x326931.attachStreams.forEach(function(_0x37ab43) {
                        _0x37ab43 && _0x5aa3f5.push(_0x37ab43);
                    }), _0x53652f) _0x21b268 = _0xeb3993.peerRef;
                else {
                    var _0x3802e4 = 'all';
                    (_0x326931.candidates.turn || _0x326931.candidates.relay) && (_0x326931.candidates.stun || _0x326931.candidates.reflexive || _0x326931.candidates.host || (_0x3802e4 = 'relay'));
                    try {
                        var _0xa206a4 = {
                            'iceServers': _0x326931.iceServers,
                            'iceTransportPolicy': _0x326931.iceTransportPolicy || _0x3802e4
                        };
                        void 0x0 !== _0x326931.iceCandidatePoolSize && (_0xa206a4.iceCandidatePoolSize = _0x326931.iceCandidatePoolSize), void 0x0 !== _0x326931.bundlePolicy && (_0xa206a4.bundlePolicy = _0x326931.bundlePolicy), void 0x0 !== _0x326931.rtcpMuxPolicy && (_0xa206a4.rtcpMuxPolicy = _0x326931.rtcpMuxPolicy), 'Chrome' === DetectRTC.browser.name && (_0xa206a4.sdpSemantics = _0x326931.sdpSemantics || 'unified-plan'), _0x326931.iceServers && _0x326931.iceServers.length || (_0xa206a4 = null, _0x326931.optionalArgument = null), _0x21b268 = new _0x2a4be1(_0xa206a4, _0x326931.optionalArgument);
                    } catch (_0x2cdc2c) {
                        try {
                            _0xa206a4 = {
                                'iceServers': _0x326931.iceServers
                            };
                            _0x21b268 = new _0x2a4be1(_0xa206a4);
                        } catch (_0x1cd6f4) {
                            _0x21b268 = new _0x2a4be1();
                        }
                    }
                }!_0x21b268.getRemoteStreams && _0x21b268.getReceivers && (_0x21b268.getRemoteStreams = function() {
                    var _0xeb3993 = new _0x1d809b();
                    return _0x21b268.getReceivers().forEach(function(_0x210865) {
                        _0xeb3993.addTrack(_0x210865.track);
                    }), [_0xeb3993];
                }), !_0x21b268.getLocalStreams && _0x21b268.getSenders && (_0x21b268.getLocalStreams = function() {
                    var _0xeb3993 = new _0x1d809b();
                    return _0x21b268.getSenders().forEach(function(_0x4bc1bd) {
                        _0xeb3993.addTrack(_0x4bc1bd.track);
                    }), [_0xeb3993];
                }), _0x21b268.onicecandidate = function(_0x345d0e) {
                    if (_0x345d0e.candidate) _0x326931.trickleIce && _0xeb3993.onLocalCandidate({
                        'candidate': _0x345d0e.candidate.candidate,
                        'sdpMid': _0x345d0e.candidate.sdpMid,
                        'sdpMLineIndex': _0x345d0e.candidate.sdpMLineIndex
                    });
                    else if (!_0x326931.trickleIce) {
                        var _0x5cad6b = _0x21b268.localDescription;
                        _0xeb3993.onLocalSdp({
                            'type': _0x5cad6b.type,
                            'sdp': _0x5cad6b.sdp,
                            'remotePeerSdpConstraints': _0xeb3993.remotePeerSdpConstraints || !0x1,
                            'renegotiatingPeer': !!_0xeb3993.renegotiatingPeer || !0x1,
                            'connectionDescription': _0x2fa590.connectionDescription,
                            'dontGetRemoteStream': !!_0xeb3993.dontGetRemoteStream,
                            'extra': _0x326931 ? _0x326931.extra : {},
                            'streamsToShare': _0x5ed0e1
                        });
                    }
                }, _0x5aa3f5.forEach(function(_0x20e839) {
                    _0xeb3993.remoteSdp && _0xeb3993.remoteSdp.remotePeerSdpConstraints && _0xeb3993.remoteSdp.remotePeerSdpConstraints.dontGetRemoteStream || _0xeb3993.dontAttachLocalStream || (_0x20e839 = _0x326931.beforeAddingStream(_0x20e839, _0x2fa590)) && (_0x21b268.getLocalStreams().forEach(function(_0x37c67d) {
                        _0x20e839 && _0x37c67d.id == _0x20e839.id && (_0x20e839 = null);
                    }), _0x20e839 && _0x20e839.getTracks && _0x20e839.getTracks().forEach(function(_0x891f5b) {
                        try {
                            _0x21b268.addTrack(_0x891f5b, _0x20e839);
                        } catch (_0x13e107) {}
                    }));
                }), _0x21b268.oniceconnectionstatechange = _0x21b268.onsignalingstatechange = function() {
                    var _0x521a09 = _0x2fa590.extra;
                    _0x326931.peers[_0x2fa590.userid] && (_0x521a09 = _0x326931.peers[_0x2fa590.userid].extra || _0x521a09), _0x21b268 && (_0xeb3993.onPeerStateChanged({
                        'iceConnectionState': _0x21b268.iceConnectionState,
                        'iceGatheringState': _0x21b268.iceGatheringState,
                        'signalingState': _0x21b268.signalingState,
                        'extra': _0x521a09,
                        'userid': _0x2fa590.userid
                    }), _0x21b268 && _0x21b268.iceConnectionState && -0x1 !== _0x21b268.iceConnectionState.search(/closed|failed/gi) && _0x2fa590.streams instanceof Array && _0x2fa590.streams.forEach(function(_0x5d55e7) {
                        var _0x2fa590 = _0x326931.streamEvents[_0x5d55e7.id] || {
                            'streamid': _0x5d55e7.id,
                            'stream': _0x5d55e7,
                            'type': 'remote'
                        };
                        _0x326931.onstreamended(_0x2fa590);
                    }));
                };
                var _0x57365f = {
                    'OfferToReceiveAudio': !!_0x5aa3f5.length,
                    'OfferToReceiveVideo': !!_0x5aa3f5.length
                };
                _0xeb3993.localPeerSdpConstraints && (_0x57365f = _0xeb3993.localPeerSdpConstraints), _0x394dad.sdpConstraints = _0xe7bfb2(_0x57365f);
                var _0x7e19c5 = {};
                _0x21b268.ontrack = function(_0x5f3745) {
                    if (_0x5f3745 && 'track' === _0x5f3745.type)
                        if (_0x5f3745.stream = _0x5f3745.streams[_0x5f3745.streams.length - 0x1], _0x5f3745.stream.id || (_0x5f3745.stream.id = _0x5f3745.track.id), _0x7e19c5[_0x5f3745.stream.id] && 'Safari' !== DetectRTC.browser.name) _0x5f3745.track && (_0x5f3745.track.onended = function() {
                            _0x21b268.onremovestream(_0x5f3745);
                        });
                        else {
                            _0x7e19c5[_0x5f3745.stream.id] = _0x5f3745.stream.id;
                            var _0x2fa590 = {};
                            _0xeb3993.remoteSdp && _0xeb3993.remoteSdp.streamsToShare ? _0x2fa590 = _0xeb3993.remoteSdp.streamsToShare : _0xeb3993.streamsToShare && (_0x2fa590 = _0xeb3993.streamsToShare);
                            var _0x3dbe04 = _0x2fa590[_0x5f3745.stream.id];
                            _0x3dbe04 ? (_0x5f3745.stream.isAudio = _0x3dbe04.isAudio, _0x5f3745.stream.isVideo = _0x3dbe04.isVideo, _0x5f3745.stream.isScreen = _0x3dbe04.isScreen) : (_0x5f3745.stream.isVideo = !!_0x2cbba5(_0x5f3745.stream, 'video').length, _0x5f3745.stream.isAudio = !_0x5f3745.stream.isVideo, _0x5f3745.stream.isScreen = !0x1), _0x5f3745.stream.streamid = _0x5f3745.stream.id, _0x521a09[_0x5f3745.stream.id] = _0x5f3745.stream, _0xeb3993.onRemoteStream(_0x5f3745.stream), _0x5f3745.stream.getTracks().forEach(function(_0x4eaf37) {
                                _0x4eaf37.onended = function() {
                                    _0x21b268.onremovestream(_0x5f3745);
                                };
                            }), _0x5f3745.stream.onremovetrack = function() {
                                _0x21b268.onremovestream(_0x5f3745);
                            };
                        }
                }, _0x21b268.onremovestream = function(_0x5131d7) {
                    _0x5131d7.stream.streamid = _0x5131d7.stream.id, _0x521a09[_0x5131d7.stream.id] && delete _0x521a09[_0x5131d7.stream.id], _0xeb3993.onRemoteStreamRemoved(_0x5131d7.stream);
                }, 'function' != typeof _0x21b268.removeStream && (_0x21b268.removeStream = function(_0x659c28) {
                    _0x659c28.getTracks().forEach(function(_0x592b51) {
                        _0x21b268.removeTrack(_0x592b51, _0x659c28);
                    });
                }), this.addRemoteCandidate = function(_0x3baf5e) {
                    _0x21b268.addIceCandidate(new _0x437c06(_0x3baf5e));
                }, this.addRemoteSdp = function(_0x5132c2, _0x2483a6) {
                    _0x2483a6 = _0x2483a6 || function() {}, 'Safari' !== DetectRTC.browser.name && (_0x5132c2.sdp = _0x326931.processSdp(_0x5132c2.sdp)), _0x21b268.setRemoteDescription(new _0x28d3c1(_0x5132c2)).then(_0x2483a6, function(_0xe5feda) {
                        _0x326931.enableLogs && console.error('setRemoteDescription failed', '\n', _0xe5feda, '\n', _0x5132c2.sdp), _0x2483a6();
                    }).catch(function(_0x3f508b) {
                        _0x326931.enableLogs && console.error('setRemoteDescription failed', '\n', _0x3f508b, '\n', _0x5132c2.sdp), _0x2483a6();
                    });
                };
                var _0x2c7e5e = true;

                function _0x2e887d(_0xfe9b95) {
                    _0xfe9b95.binaryType = 'arraybuffer', _0xfe9b95.onmessage = function(_0x4397bd) {
                        _0xeb3993.onDataChannelMessage(_0x4397bd.data);
                    }, _0xfe9b95.onopen = function() {
                        _0xeb3993.onDataChannelOpened(_0xfe9b95);
                    }, _0xfe9b95.onerror = function(_0xa12ba0) {
                        _0xeb3993.onDataChannelError(_0xa12ba0);
                    }, _0xfe9b95.onclose = function(_0x30e29d) {
                        _0xeb3993.onDataChannelClosed(_0x30e29d);
                    }, _0xfe9b95.internalSend = _0xfe9b95.send, _0xfe9b95.send = function(_0x2c62da) {
                        'open' === _0xfe9b95.readyState && _0xfe9b95.internalSend(_0x2c62da);
                    }, _0x21b268.channel = _0xfe9b95;
                }
                _0xeb3993.remoteSdp && (_0x2c7e5e = !0x1), this.createDataChannel = function() {
                    _0x2e887d(_0x21b268.createDataChannel('sctp', {}));
                }, true !== _0x326931.session.data || _0x53652f || (_0x2c7e5e ? this.createDataChannel() : _0x21b268.ondatachannel = function(_0x4c5e51) {
                    _0x2e887d(_0x4c5e51.channel);
                }), this.enableDisableVideoEncoding = function(_0x3d2379) {
                    var _0x326931;
                    if (_0x21b268.getSenders().forEach(function(_0x4212ea) {
                            _0x326931 || 'video' !== _0x4212ea.track.kind || (_0x326931 = _0x4212ea);
                        }), _0x326931 && _0x326931.getParameters) {
                        var _0x2fa590 = _0x326931.getParameters();
                        _0x2fa590.encodings[0x1] && (_0x2fa590.encodings[0x1].active = !!_0x3d2379), _0x2fa590.encodings[0x2] && (_0x2fa590.encodings[0x2].active = !!_0x3d2379), _0x326931.setParameters(_0x2fa590);
                    }
                }, _0xeb3993.remoteSdp && (_0xeb3993.remoteSdp.remotePeerSdpConstraints && (_0x57365f = _0xeb3993.remoteSdp.remotePeerSdpConstraints), _0x394dad.sdpConstraints = _0xe7bfb2(_0x57365f), this.addRemoteSdp(_0xeb3993.remoteSdp, function() {
                    _0x308f2d('createAnswer');
                })), 'two-way' != _0x326931.session.audio && 'two-way' != _0x326931.session.video && 'two-way' != _0x326931.session.screen || (_0x394dad.sdpConstraints = _0xe7bfb2({
                    'OfferToReceiveAudio': 'two-way' == _0x326931.session.audio || _0xeb3993.remoteSdp && _0xeb3993.remoteSdp.remotePeerSdpConstraints && _0xeb3993.remoteSdp.remotePeerSdpConstraints.OfferToReceiveAudio,
                    'OfferToReceiveVideo': 'two-way' == _0x326931.session.video || 'two-way' == _0x326931.session.screen || _0xeb3993.remoteSdp && _0xeb3993.remoteSdp.remotePeerSdpConstraints && _0xeb3993.remoteSdp.remotePeerSdpConstraints.OfferToReceiveAudio
                }));
                var _0x5ed0e1 = {};

                function _0x308f2d(_0x41a457) {
                    _0x21b268[_0x41a457](_0x394dad.sdpConstraints).then(function(_0x2f9b8b) {
                        'Safari' !== DetectRTC.browser.name && (_0x2f9b8b.sdp = _0x326931.processSdp(_0x2f9b8b.sdp)), _0x21b268.setLocalDescription(_0x2f9b8b).then(function() {
                            _0x326931.trickleIce && (_0xeb3993.onLocalSdp({
                                'type': _0x2f9b8b.type,
                                'sdp': _0x2f9b8b.sdp,
                                'remotePeerSdpConstraints': _0xeb3993.remotePeerSdpConstraints || !0x1,
                                'renegotiatingPeer': !!_0xeb3993.renegotiatingPeer || !0x1,
                                'connectionDescription': _0x2fa590.connectionDescription,
                                'dontGetRemoteStream': !!_0xeb3993.dontGetRemoteStream,
                                'extra': _0x326931 ? _0x326931.extra : {},
                                'streamsToShare': _0x5ed0e1
                            }), _0x326931.onSettingLocalDescription(_0x2fa590));
                        }, function(_0x41064c) {
                            _0x326931.enableLogs && console.error('setLocalDescription error', _0x41064c);
                        });
                    }, function(_0x31a9a8) {
                        _0x326931.enableLogs && console.error('sdp-error', _0x31a9a8);
                    });
                }
                _0x21b268.getLocalStreams().forEach(function(_0x4ee107) {
                    _0x5ed0e1[_0x4ee107.streamid] = {
                        'isAudio': !!_0x4ee107.isAudio,
                        'isVideo': !!_0x4ee107.isVideo,
                        'isScreen': !!_0x4ee107.isScreen
                    };
                }), _0x2c7e5e && _0x308f2d('createOffer'), _0x21b268.nativeClose = _0x21b268.close, _0x21b268.close = function() {
                    if (_0x21b268) {
                        try {
                            _0x21b268.nativeClose !== _0x21b268.close && _0x21b268.nativeClose();
                        } catch (_0x3c28da) {}
                        _0x21b268 = null, _0x2fa590.peer = null;
                    }
                }, this.peer = _0x21b268;
            }
            var _0x42fdaa = function() {
                function _0x572b26(_0x16547c, _0x12b3cb) {
                    var _0x3623e4 = _0x5c82c5(_0x16547c);
                    return _0x3623e4.videoCodecNumbers ? 'vp8' === _0x12b3cb && _0x3623e4.vp8LineNumber === _0x3623e4.videoCodecNumbers[0x0] ? _0x16547c : 'vp9' === _0x12b3cb && _0x3623e4.vp9LineNumber === _0x3623e4.videoCodecNumbers[0x0] ? _0x16547c : 'h264' === _0x12b3cb && _0x3623e4.h264LineNumber === _0x3623e4.videoCodecNumbers[0x0] ? _0x16547c : _0x16547c = _0x249ace(_0x16547c, _0x12b3cb, _0x3623e4) : _0x16547c;
                }

                function _0x249ace(_0x536ba9, _0x3e10ca, _0x141d2f, _0x1f707f) {
                    var _0x3623e4 = '';
                    if ('vp8' === _0x3e10ca) {
                        if (!_0x141d2f.vp8LineNumber) return _0x536ba9;
                        _0x3623e4 = _0x141d2f.vp8LineNumber;
                    }
                    if ('vp9' === _0x3e10ca) {
                        if (!_0x141d2f.vp9LineNumber) return _0x536ba9;
                        _0x3623e4 = _0x141d2f.vp9LineNumber;
                    }
                    if ('h264' === _0x3e10ca) {
                        if (!_0x141d2f.h264LineNumber) return _0x536ba9;
                        _0x3623e4 = _0x141d2f.h264LineNumber;
                    }
                    var _0x314bfa = _0x141d2f.videoCodecNumbersOriginal.split('SAVPF')[0x0] + 'SAVPF ',
                        _0x52ac96 = [_0x3623e4];
                    return _0x1f707f && (_0x52ac96 = []), _0x141d2f.videoCodecNumbers.forEach(function(_0x43af74) {
                        _0x43af74 !== _0x3623e4 && _0x52ac96.push(_0x43af74);
                    }), _0x314bfa += _0x52ac96.join(' '), _0x536ba9 = _0x536ba9.replace(_0x141d2f.videoCodecNumbersOriginal, _0x314bfa);
                }

                function _0x5c82c5(_0x370eaf) {
                    var _0x249ace = {};
                    return _0x370eaf.split('\n').forEach(function(_0x42cf6b) {
                        0x0 === _0x42cf6b.indexOf('m=video') && (_0x249ace.videoCodecNumbers = [], _0x42cf6b.split('SAVPF')[0x1].split(' ').forEach(function(_0x340dfa) {
                            (_0x340dfa = _0x340dfa.trim()) && _0x340dfa.length && (_0x249ace.videoCodecNumbers.push(_0x340dfa), _0x249ace.videoCodecNumbersOriginal = _0x42cf6b);
                        })), -0x1 === _0x42cf6b.indexOf('VP8/90000') || _0x249ace.vp8LineNumber || (_0x249ace.vp8LineNumber = _0x42cf6b.replace('a=rtpmap:', '').split(' ')[0x0]), -0x1 === _0x42cf6b.indexOf('VP9/90000') || _0x249ace.vp9LineNumber || (_0x249ace.vp9LineNumber = _0x42cf6b.replace('a=rtpmap:', '').split(' ')[0x0]), -0x1 === _0x42cf6b.indexOf('H264/90000') || _0x249ace.h264LineNumber || (_0x249ace.h264LineNumber = _0x42cf6b.replace('a=rtpmap:', '').split(' ')[0x0]);
                    }), _0x249ace;
                }

                function _0x4526d0(_0x39207b, _0x23a46a, _0x1ebb9d) {
                    return function(_0x20ed55, _0x5132ac, _0xcecfcd, _0x8459a8, _0x27ad22) {
                        for (var _0x2dbfb3 = -0x1 !== _0xcecfcd ? _0xcecfcd : _0x20ed55.length, _0x160b11 = _0x5132ac; _0x160b11 < _0x2dbfb3; ++_0x160b11)
                            if (0x0 === _0x20ed55[_0x160b11].indexOf(_0x8459a8) && (!_0x27ad22 || -0x1 !== _0x20ed55[_0x160b11].toLowerCase().indexOf(_0x27ad22.toLowerCase()))) return _0x160b11;
                        return null;
                    }(_0x39207b, 0x0, -0x1, _0x23a46a, _0x1ebb9d);
                }

                function _0x3623e4(_0x46fa44) {
                    var _0x249ace = new RegExp('a=rtpmap:(\d+) \w+\/\d+'),
                        _0x5c82c5 = _0x46fa44.match(_0x249ace);
                    return _0x5c82c5 && 0x2 === _0x5c82c5.length ? _0x5c82c5[0x1] : null;
                }
                return {
                    'removeVPX': function(_0x59de0e) {
                        var _0x4526d0 = _0x5c82c5(_0x59de0e);
                        return _0x59de0e = _0x249ace(_0x59de0e, 'vp9', _0x4526d0, true), _0x59de0e = _0x249ace(_0x59de0e, 'vp8', _0x4526d0, true);
                    },
                    'disableNACK': function(_0x376b0e) {
                        if (!_0x376b0e || 'string' != typeof _0x376b0e) throw 'Invalid arguments.';
                        return _0x376b0e = (_0x376b0e = (_0x376b0e = (_0x376b0e = _0x376b0e.replace('a=rtcp-fb:126 nack\r\n', '')).replace('a=rtcp-fb:126 nack pli\x0d\n', 'a=rtcp-fb:126 pli\x0d\n')).replace('a=rtcp-fb:97 nack\r\n', '')).replace('a=rtcp-fb:97 nack pli\r\n', 'a=rtcp-fb:97 pli\r\n');
                    },
                    'prioritize': function(_0x238652, _0x23ac58) {
                        if (_0x23ac58 && _0x23ac58.getSenders && _0x23ac58.getSenders().length) {
                            if (!_0x238652 || 'string' != typeof _0x238652) throw 'Invalid arguments.';
                            _0x23ac58.getSenders().forEach(function(_0x4c4f96) {
                                for (var _0x5c82c5 = _0x4c4f96.getParameters(), _0x4526d0 = 0x0; _0x4526d0 < _0x5c82c5.codecs.length; _0x4526d0++)
                                    if (_0x5c82c5.codecs[_0x4526d0].mimeType == _0x238652) {
                                        _0x5c82c5.codecs.unshift(_0x5c82c5.codecs.splice(_0x4526d0, 0x1));
                                        break;
                                    }
                                _0x4c4f96.setParameters(_0x5c82c5);
                            });
                        }
                    },
                    'removeNonG722': function(_0x49005b) {
                        return _0x49005b.replace(/m=audio ([0-9]+) RTP\/SAVPF ([0-9 ]*)/g, 'm=audio $1 RTP/SAVPF 9');
                    },
                    'setApplicationSpecificBandwidth': function(_0xa77e44, _0x517ea3, _0x4de140) {
                        return function(_0x58398a, _0x84509d, _0x378779) {
                            return _0x84509d ? void 0x0 !== _0x5c498f && _0x5c498f ? _0x58398a : (_0x378779 && (_0x84509d.screen ? _0x84509d.screen < 0x12c && console.warn('It seems that you are using wrong bandwidth value for screen. Screen sharing is expected to fail.') : console.warn('It seems that you are not using bandwidth for screen. Screen sharing is expected to fail.')), _0x84509d.screen && _0x378779 && (_0x58398a = (_0x58398a = _0x58398a.replace(/b=AS([^\r\n]+\r\n)/g, '')).replace(/a=mid:video\r\n/g, 'a=mid:video\r\nb=AS:' + _0x84509d.screen + '\x0d\n')), (_0x84509d.audio || _0x84509d.video) && (_0x58398a = _0x58398a.replace(/b=AS([^\r\n]+\r\n)/g, '')), _0x84509d.audio && (_0x58398a = _0x58398a.replace(/a=mid:audio\r\n/g, 'a=mid:audio\r\nb=AS:' + _0x84509d.audio + '\x0d\n')), _0x84509d.screen ? _0x58398a = _0x58398a.replace(/a=mid:video\r\n/g, 'a=mid:video\r\nb=AS:' + _0x84509d.screen + '\x0d\n') : _0x84509d.video && (_0x58398a = _0x58398a.replace(/a=mid:video\r\n/g, 'a=mid:video\r\nb=AS:' + _0x84509d.video + '\x0d\n')), _0x58398a) : _0x58398a;
                        }(_0xa77e44, _0x517ea3, _0x4de140);
                    },
                    'setVideoBitrates': function(_0x6898ff, _0xf38daa) {
                        return function(_0x4260bb, _0x46dc63) {
                            var _0x5c82c5, _0xcddf99 = (_0x46dc63 = _0x46dc63 || {}).min,
                                _0x4d9e07 = _0x46dc63.max,
                                _0x1e0ad5 = _0x4260bb.split('\x0d\n'),
                                _0x4e244d = _0x4526d0(_0x1e0ad5, 'a=rtpmap', 'VP8/90000');
                            if (_0x4e244d && (_0x5c82c5 = _0x3623e4(_0x1e0ad5[_0x4e244d])), !_0x5c82c5) return _0x4260bb;
                            var _0x4a75e7, _0x5d5b05 = _0x4526d0(_0x1e0ad5, 'a=rtpmap', 'rtx/90000');
                            if (_0x5d5b05 && (_0x4a75e7 = _0x3623e4(_0x1e0ad5[_0x5d5b05])), !_0x5d5b05) return _0x4260bb;
                            var _0x56e025 = _0x4526d0(_0x1e0ad5, 'a=fmtp:' + _0x4a75e7.toString());
                            if (null !== _0x56e025) {
                                var _0x30c498 = '\x0d\n';
                                _0x30c498 += 'a=fmtp:' + _0x5c82c5 + ' x-google-min-bitrate=' + (_0xcddf99 || '228') + '; x-google-max-bitrate=' + (_0x4d9e07 || '228'), _0x1e0ad5[_0x56e025] = _0x1e0ad5[_0x56e025].concat(_0x30c498), _0x4260bb = _0x1e0ad5.join('\x0d\n');
                            }
                            return _0x4260bb;
                        }(_0x6898ff, _0xf38daa);
                    },
                    'setOpusAttributes': function(_0x553630, _0x553bce) {
                        return function(_0x48ec07, _0x1e35c6) {
                            _0x1e35c6 = _0x1e35c6 || {};
                            var _0x5c82c5, _0x1be3e1 = _0x48ec07.split('\x0d\n'),
                                _0x456381 = _0x4526d0(_0x1be3e1, 'a=rtpmap', 'opus/48000');
                            if (_0x456381 && (_0x5c82c5 = _0x3623e4(_0x1be3e1[_0x456381])), !_0x5c82c5) return _0x48ec07;
                            var _0x2d8ac5 = _0x4526d0(_0x1be3e1, 'a=fmtp:' + _0x5c82c5.toString());
                            if (null === _0x2d8ac5) return _0x48ec07;
                            var _0x8350e7 = '';
                            return _0x8350e7 += '; stereo=' + (void 0x0 !== _0x1e35c6.stereo ? _0x1e35c6.stereo : '1'), _0x8350e7 += '; sprop-stereo=' + (void 0x0 !== _0x1e35c6['sprop-stereo'] ? _0x1e35c6['sprop-stereo'] : '1'), void 0x0 !== _0x1e35c6.maxaveragebitrate && (_0x8350e7 += '; maxaveragebitrate=' + (_0x1e35c6.maxaveragebitrate || 0x100000)), void 0x0 !== _0x1e35c6.maxplaybackrate && (_0x8350e7 += '; maxplaybackrate=' + (_0x1e35c6.maxplaybackrate || 0x100000)), void 0x0 !== _0x1e35c6.cbr && (_0x8350e7 += '; cbr=' + (void 0x0 !== _0x1e35c6.cbr ? _0x1e35c6.cbr : '1')), void 0x0 !== _0x1e35c6.useinbandfec && (_0x8350e7 += '; useinbandfec=' + _0x1e35c6.useinbandfec), void 0x0 !== _0x1e35c6.usedtx && (_0x8350e7 += '; usedtx=' + _0x1e35c6.usedtx), void 0x0 !== _0x1e35c6.maxptime && (_0x8350e7 += '\x0d\na=maxptime:' + _0x1e35c6.maxptime), _0x1be3e1[_0x2d8ac5] = _0x1be3e1[_0x2d8ac5].concat(_0x8350e7), _0x48ec07 = _0x1be3e1.join('\x0d\n');
                        }(_0x553630, _0x553bce);
                    },
                    'preferVP9': function(_0x18deb7) {
                        return _0x572b26(_0x18deb7, 'vp9');
                    },
                    'preferCodec': _0x572b26,
                    'forceStereoAudio': function(_0x14ddc9) {
                        for (var _0x249ace = _0x14ddc9.split('\x0d\n'), _0x5c82c5 = null, _0x4526d0 = 0x0; _0x4526d0 < _0x249ace.length; _0x4526d0++)
                            if (-0x1 !== _0x249ace[_0x4526d0].search('opus/48000')) {
                                var _0x3623e4 = extractSdp(_0x249ace[_0x4526d0], /:(\d+) opus\/48000/i);
                                break;
                            }
                        for (_0x4526d0 = 0x0; _0x4526d0 < _0x249ace.length; _0x4526d0++) {
                            if (-0x1 !== _0x249ace[_0x4526d0].search('a=fmtp'))
                                if (extractSdp(_0x249ace[_0x4526d0], /a=fmtp:(\d+)/) === _0x3623e4) {
                                    _0x5c82c5 = _0x4526d0;
                                    break;
                                }
                        }
                        return null === _0x5c82c5 ? _0x14ddc9 : (_0x249ace[_0x5c82c5] = _0x249ace[_0x5c82c5].concat('; stereo=1; sprop-stereo=1'), _0x14ddc9 = _0x249ace.join('\x0d\n'));
                    }
                };
            }();
            window.BandwidthHandler = _0x42fdaa;
            var _0x2b9f47 = {
                    'processCandidates': function(_0x3bf1a2, _0x390036) {
                        var _0x2fa590 = _0x390036.candidate,
                            _0x21b268 = _0x3bf1a2.candidates,
                            _0x521a09 = _0x21b268.stun,
                            _0x3e00fc = _0x21b268.turn;
                        if (_0x3b94ab(_0x21b268.reflexive) || (_0x521a09 = _0x21b268.reflexive), _0x3b94ab(_0x21b268.relay) || (_0x3e00fc = _0x21b268.relay), (_0x21b268.host || !_0x2fa590.match(/typ host/g)) && (_0x3e00fc || !_0x2fa590.match(/typ relay/g)) && (_0x521a09 || !_0x2fa590.match(/typ srflx/g))) {
                            var _0x2b6e29 = _0x3bf1a2.iceProtocols;
                            if ((_0x2b6e29.udp || !_0x2fa590.match(/ udp /g)) && (_0x2b6e29.tcp || !_0x2fa590.match(/ tcp /g))) return _0x3bf1a2.enableLogs && console.debug('Your candidate pairs:', _0x2fa590), {
                                'candidate': _0x2fa590,
                                'sdpMid': _0x390036.sdpMid,
                                'sdpMLineIndex': _0x390036.sdpMLineIndex
                            };
                        }
                    }
                },
                _0x3b9609 = {
                    'getIceServers': function(_0x488e7f) {
                        return window.EJS_TURN_URLS;
                    }
                };

            function _0x5adfda(_0x283137) {
                if (true !== currentUserMediaRequest.mutex) {
                    currentUserMediaRequest.mutex = true;
                    var _0x326931 = JSON.stringify(_0x283137.localMediaConstraints);
                    if (currentUserMediaRequest.streams[_0x326931]) _0x196d8c(currentUserMediaRequest.streams[_0x326931].stream, true);
                    else {
                        if (!!/BB10|BlackBerry/i .test(navigator.userAgent || '') || void 0x0 === navigator.mediaDevices || 'function' != typeof navigator.mediaDevices.getUserMedia) return navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia, void navigator.getUserMedia(_0x283137.localMediaConstraints, function(_0x470b2a) {
                            _0x470b2a.streamid = _0x470b2a.streamid || _0x470b2a.id || _0x5b8d5d(), _0x470b2a.idInstance = _0x326931, _0x196d8c(_0x470b2a);
                        }, function(_0x3fd14c) {
                            _0x283137.onLocalMediaError(_0x3fd14c, _0x283137.localMediaConstraints);
                        });
                        if (void 0x0 === navigator.mediaDevices) {
                            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                            var _0x2fa590, _0x21b268, _0x521a09 = function() {};
                            navigator.mediaDevices = {
                                'getUserMedia': function(_0x1ddd61) {
                                    return navigator.getUserMedia(_0x1ddd61, function(_0x4a0936) {
                                        _0x4a0936(stream), _0x2fa590 = stream;
                                    }, function(_0x15c59c) {
                                        _0x521a09(_0x15c59c), _0x21b268 = _0x15c59c;
                                    }), {
                                        'then': function(_0x3e20ef) {
                                            if (!_0x2fa590) return _0x3e20ef, {
                                                'then': function(_0x444f48) {
                                                    _0x21b268 ? _0x444f48(_0x21b268) : _0x521a09 = _0x444f48;
                                                }
                                            };
                                            _0x3e20ef(_0x2fa590);
                                        }
                                    };
                                }
                            };
                        }
                        navigator.mediaDevices.getUserMedia(_0x283137.localMediaConstraints).then(function(_0x5a25ab) {
                            _0x5a25ab.streamid = _0x5a25ab.streamid || _0x5a25ab.id || _0x5b8d5d(), _0x5a25ab.idInstance = _0x326931, _0x196d8c(_0x5a25ab);
                        }).catch(function(_0x5f1ad4) {
                            _0x283137.onLocalMediaError(_0x5f1ad4, _0x283137.localMediaConstraints);
                        });
                    }
                } else currentUserMediaRequest.queueRequests.push(_0x283137);

                function _0x196d8c(_0x1f527b, _0x58cd7c) {
                    ! function(_0x3b5a94, _0x299595) {
                        _0x3b5a94.mandatory && _0x3b5a94.mandatory.chromeMediaSource ? _0x299595.isScreen = true : _0x3b5a94.mozMediaSource || _0x3b5a94.mediaSource ? _0x299595.isScreen = true : _0x3b5a94.video ? _0x299595.isVideo = true : _0x3b5a94.audio && (_0x299595.isAudio = true);
                    }(_0x283137.localMediaConstraints, _0x1f527b);
                    var _0x521a09 = 'ended';
                    'oninactive' in _0x1f527b && (_0x521a09 = 'inactive'), _0x1f527b.addEventListener(_0x521a09, function() {
                        delete currentUserMediaRequest.streams[_0x326931], currentUserMediaRequest.mutex = !0x1, currentUserMediaRequest.queueRequests.indexOf(_0x283137) && (delete currentUserMediaRequest.queueRequests[currentUserMediaRequest.queueRequests.indexOf(_0x283137)], currentUserMediaRequest.queueRequests = _0xf3acd(currentUserMediaRequest.queueRequests));
                    }, !0x1), currentUserMediaRequest.streams[_0x326931] = {
                        'stream': _0x1f527b
                    }, currentUserMediaRequest.mutex = !0x1, currentUserMediaRequest.queueRequests.length && _0x5adfda(currentUserMediaRequest.queueRequests.shift()), _0x283137.onGettingLocalMedia(_0x1f527b, _0x58cd7c);
                }
            }
            window.currentUserMediaRequest = {
                'streams': [],
                'mutex': !0x1,
                'queueRequests': [],
                'remove': function(_0x1b91c8) {
                    this.mutex = !0x1;
                    var _0x326931 = this.streams[_0x1b91c8];
                    if (_0x326931) {
                        var _0x2fa590 = (_0x326931 = _0x326931.stream).currentUserMediaRequestOptions;
                        this.queueRequests.indexOf(_0x2fa590) && (delete this.queueRequests[this.queueRequests.indexOf(_0x2fa590)], this.queueRequests = _0xf3acd(this.queueRequests)), this.streams[_0x1b91c8].stream = null, delete this.streams[_0x1b91c8];
                    }
                }
            };
            var _0x25e82e = function() {
                function _0xc80ee1(_0x19f0b1) {
                    if (_0x19f0b1) return 'string' == typeof _0x19f0b1 || void 0x0 === _0x19f0b1 ? _0x19f0b1 : _0x19f0b1.audio && _0x19f0b1.video ? null : _0x19f0b1.audio ? 'audio' : _0x19f0b1.video ? 'video' : void 0x0;
                }
                return {
                    'setHandlers': function(_0x3d58a4, _0x57b7e9, _0x2faad3) {
                        if (_0x3d58a4 && _0x3d58a4.addEventListener) {
                            if (void 0x0 === _0x57b7e9 || 0x1 == _0x57b7e9) {
                                var _0x521a09 = 'ended';
                                'oninactive' in _0x3d58a4 && (_0x521a09 = 'inactive'), _0x3d58a4.addEventListener(_0x521a09, function() {
                                    _0x25e82e.onSyncNeeded(this.streamid, _0x521a09);
                                }, !0x1);
                            }
                            _0x3d58a4.mute = function(_0x393c28, _0xb2bd8c) {
                                _0x393c28 = _0xc80ee1(_0x393c28), void 0x0 !== _0xb2bd8c && (_0x57b7e9 = _0xb2bd8c), void 0x0 !== _0x393c28 && 'audio' != _0x393c28 || _0x2cbba5(_0x3d58a4, 'audio').forEach(function(_0x3bbe2d) {
                                    _0x3bbe2d.enabled = !0x1, _0x2faad3.streamEvents[_0x3d58a4.streamid].isAudioMuted = true;
                                }), void 0x0 !== _0x393c28 && 'video' != _0x393c28 || _0x2cbba5(_0x3d58a4, 'video').forEach(function(_0x2ba091) {
                                    _0x2ba091.enabled = !0x1;
                                }), void 0x0 !== _0x57b7e9 && 0x1 != _0x57b7e9 || _0x25e82e.onSyncNeeded(_0x3d58a4.streamid, 'mute', _0x393c28), _0x2faad3.streamEvents[_0x3d58a4.streamid].muteType = _0x393c28 || 'both', _0x121233(_0x3d58a4, 'mute', _0x393c28);
                            }, _0x3d58a4.unmute = function(_0x557e65, _0x2dc6b7) {
                                _0x557e65 = _0xc80ee1(_0x557e65), void 0x0 !== _0x2dc6b7 && (_0x57b7e9 = _0x2dc6b7),
                                    function() {
                                        if (!_0x2faad3.streamEvents[_0x3d58a4.streamid].mediaElement) return;
                                        var _0xc80ee1 = _0x2faad3.streamEvents[_0x3d58a4.streamid].mediaElement;
                                        _0xc80ee1.volume = 0x0,
                                            function _0xc80ee1(_0x537992, _0x12ab30, _0x212c93, _0x44a2b5) {
                                                _0x44a2b5 = (_0x44a2b5 || 0x0) + 0x1;
                                                if (_0x44a2b5 >= _0x12ab30) return;
                                                setTimeout(function() {
                                                    _0x212c93(), _0xc80ee1(_0x537992, _0x12ab30, _0x212c93, _0x44a2b5);
                                                }, _0x537992);
                                            }(0xc8, 0x5, function() {
                                                try {
                                                    _0xc80ee1.volume += 0.2;
                                                } catch (_0x111824) {
                                                    _0xc80ee1.volume = 0x1;
                                                }
                                            });
                                    }(), void 0x0 !== _0x557e65 && 'audio' != _0x557e65 || _0x2cbba5(_0x3d58a4, 'audio').forEach(function(_0x39cdcf) {
                                        _0x39cdcf.enabled = true, _0x2faad3.streamEvents[_0x3d58a4.streamid].isAudioMuted = !0x1;
                                    }), void 0x0 !== _0x557e65 && 'video' != _0x557e65 || (_0x2cbba5(_0x3d58a4, 'video').forEach(function(_0x1bc1ac) {
                                        _0x1bc1ac.enabled = true;
                                    }), void 0x0 !== _0x557e65 && 'video' == _0x557e65 && _0x2faad3.streamEvents[_0x3d58a4.streamid].isAudioMuted && function _0xc80ee1(_0x2a12fa) {
                                        _0x2a12fa || (_0x2a12fa = 0x0), ++_0x2a12fa < 0x64 && _0x2faad3.streamEvents[_0x3d58a4.streamid].isAudioMuted && (_0x3d58a4.mute('audio'), setTimeout(function() {
                                            _0xc80ee1(_0x2a12fa);
                                        }, 0x32));
                                    }()), void 0x0 !== _0x57b7e9 && 0x1 != _0x57b7e9 || _0x25e82e.onSyncNeeded(_0x3d58a4.streamid, 'unmute', _0x557e65), _0x2faad3.streamEvents[_0x3d58a4.streamid].unmuteType = _0x557e65 || 'both', _0x121233(_0x3d58a4, 'unmute', _0x557e65);
                            };
                        }
                    },
                    'onSyncNeeded': function(_0x1963f6, _0x4e7716, _0x3963b) {}
                };
            }();
            window.addEventListener('message', function(_0x48b05c) {
                _0x48b05c.origin == window.location.origin && function(_0x53ae17) {
                    if ('PermissionDeniedError' == _0x53ae17) {
                        if (_0x301abf = 'PermissionDeniedError', _0x467e9d) return _0x467e9d('PermissionDeniedError');
                        throw new Error('PermissionDeniedError');
                    }
                    'rtcmulticonnection-extension-loaded' == _0x53ae17 && (_0x301abf = 'desktop');
                    _0x53ae17.sourceId && _0x467e9d && _0x467e9d(_0x427b66 = _0x53ae17.sourceId, true === _0x53ae17.canRequestAudioTrack);
                }(_0x48b05c.data);
            });
            var _0x427b66, _0x467e9d, _0x301abf = 'screen';

            function _0x53da88(_0x14f9e0) {
                if (_0x14f9e0) {
                    if ('desktop' == _0x301abf) return _0x14f9e0(true);
                    window.postMessage('are-you-there', '*'), setTimeout(function() {
                        _0x14f9e0('screen' != _0x301abf);
                    }, 0x7d0);
                }
            }
            var _0x5c498f = void 0x0 !== window.InstallTrigger,
                _0x1ea249 = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0x0;
            window.chrome;

            function _0x1f670d(_0x4bd5c8, _0x3b2cbe) {
                if (_0x5c498f) return _0x3b2cbe('not-chrome');
                0x2 != arguments.length && (_0x3b2cbe = _0x4bd5c8, _0x4bd5c8 = 'ajhifddimkapgcifgcodmmfdlknahffk');
                var _0x2fa590 = document.createElement('img');
                _0x2fa590.src = 'chrome-extension://' + _0x4bd5c8 + '/icon.png', _0x2fa590.onload = function() {
                    _0x301abf = 'screen', window.postMessage('are-you-there', '*'), setTimeout(function() {
                        _0x3b2cbe('screen' == _0x301abf ? 'installed-disabled' : 'installed-enabled');
                    }, 0x7d0);
                }, _0x2fa590.onerror = function() {
                    _0x3b2cbe('not-installed');
                };
            }

            function _0x1c050b(_0xe24308, _0x3ebcd4) {
                if (_0x5c498f) return _0xe24308(null, {
                    'mozMediaSource': 'window',
                    'mediaSource': 'window'
                });
                var _0x2fa590 = {
                    'mandatory': {
                        'chromeMediaSource': _0x301abf,
                        'maxWidth': screen.width > 0x780 ? screen.width : 0x780,
                        'maxHeight': screen.height > 0x438 ? screen.height : 0x438
                    },
                    'optional': []
                };
                'desktop' != _0x301abf || _0x427b66 ? ('desktop' == _0x301abf && (_0x2fa590.mandatory.chromeMediaSourceId = _0x427b66), _0xe24308(null, _0x2fa590)) : _0x3ebcd4 ? function(_0x16e1da) {
                    if (!_0x16e1da) throw '"callback" parameter is mandatory.';
                    if (_0x427b66) return _0x16e1da(_0x427b66);
                    _0x467e9d = _0x16e1da, window.postMessage('audio-plus-tab', '*');
                }(function(_0x240030, _0x41af1b) {
                    _0x2fa590.mandatory.chromeMediaSourceId = _0x240030, _0x41af1b && (_0x2fa590.canRequestAudioTrack = true), _0xe24308('PermissionDeniedError' == _0x240030 ? _0x240030 : null, _0x2fa590);
                }) : function(_0x465509) {
                    if (!_0x465509) throw '"callback" parameter is mandatory.';
                    if (_0x427b66) return _0x465509(_0x427b66);
                    _0x467e9d = _0x465509, window.postMessage('get-sourceId', '*');
                }(function(_0x13bb7e) {
                    _0x2fa590.mandatory.chromeMediaSourceId = _0x13bb7e, _0xe24308('PermissionDeniedError' == _0x13bb7e ? _0x13bb7e : null, _0x2fa590);
                });
            }

            function _0x342039(_0x4dbb06) {
                var _0x326931 = {};
                return {
                    'receive': function(_0x5d1473, _0x43133d, _0x584294) {
                        var _0x547cf6 = _0x5d1473.uuid;
                        if (_0x326931[_0x547cf6] || (_0x326931[_0x547cf6] = []), _0x326931[_0x547cf6].push(_0x5d1473.message), _0x5d1473.last) {
                            var _0x967e71 = _0x326931[_0x547cf6].join('');
                            _0x5d1473.isobject && (_0x967e71 = JSON.parse(_0x967e71));
                            var _0x33399d = {
                                'data': _0x967e71,
                                'userid': _0x43133d,
                                'extra': _0x584294,
                                'latency': new Date().getTime() - _0x5d1473.sendingTime
                            };
                            _0x4dbb06.autoTranslateText ? (_0x33399d.original = _0x33399d.data, _0x4dbb06.Translator.TranslateText(_0x33399d.data, function(_0x420bda) {
                                _0x33399d.data = _0x420bda, _0x4dbb06.onmessage(_0x33399d);
                            })) : _0x4dbb06.onmessage(_0x33399d), delete _0x326931[_0x547cf6];
                        }
                    }
                };
            }
            var _0x21703b = {
                    'send': function(_0x3eb04b) {
                        var _0x326931 = _0x3eb04b.connection,
                            _0x2fa590 = _0x3eb04b.channel,
                            _0x21b268 = _0x3eb04b.remoteUserId,
                            _0x521a09 = _0x3eb04b.text,
                            _0x477fc1 = _0x326931.chunkSize || 0x3e8,
                            _0x2406ca = '',
                            _0x2b3340 = !0x1;
                        'string' != typeof _0x521a09 && (_0x2b3340 = true, _0x521a09 = JSON.stringify(_0x521a09));
                        var _0x5093c5 = _0x5b8d5d(),
                            _0x53bd37 = new Date().getTime();
                        ! function _0x3eb04b(_0x452fc6, _0x2486ef) {
                            var _0x4068b1 = {
                                'type': 'text',
                                'uuid': _0x5093c5,
                                'sendingTime': _0x53bd37
                            };
                            _0x452fc6 && (_0x2486ef = _0x452fc6, _0x4068b1.packets = parseInt(_0x2486ef.length / _0x477fc1));
                            _0x2486ef.length > _0x477fc1 ? _0x4068b1.message = _0x2486ef.slice(0x0, _0x477fc1) : (_0x4068b1.message = _0x2486ef, _0x4068b1.last = true, _0x4068b1.isobject = _0x2b3340);
                            _0x2fa590.send(_0x4068b1, _0x21b268);
                            _0x2406ca = _0x2486ef.slice(_0x4068b1.message.length);
                            _0x2406ca.length && setTimeout(function() {
                                _0x3eb04b(null, _0x2406ca);
                            }, _0x326931.chunkInterval || 0x64);
                        }(_0x521a09);
                    }
                },
                _0x2cf1f3 = {
                    'handle': function(_0x519a30) {
                        var _0x326931 = {};
                        _0x519a30.onFileStart = function(_0x2a3aa7) {
                            var _0x21b268 = document.createElement('div');
                            if (_0x21b268.title = _0x2a3aa7.name, _0x21b268.innerHTML = '<label>0%</label> <progress></progress>', _0x2a3aa7.remoteUserId && (_0x21b268.innerHTML += ' (Sharing with:' + _0x2a3aa7.remoteUserId + ')'), _0x519a30.filesContainer || (_0x519a30.filesContainer = document.body || document.documentElement), _0x519a30.filesContainer.insertBefore(_0x21b268, _0x519a30.filesContainer.firstChild), !_0x2a3aa7.remoteUserId) return _0x326931[_0x2a3aa7.uuid] = {
                                'div': _0x21b268,
                                'progress': _0x21b268.querySelector('progress'),
                                'label': _0x21b268.querySelector('label')
                            }, void(_0x326931[_0x2a3aa7.uuid].progress.max = _0x2a3aa7.maxChunks);
                            _0x326931[_0x2a3aa7.uuid] || (_0x326931[_0x2a3aa7.uuid] = {}), _0x326931[_0x2a3aa7.uuid][_0x2a3aa7.remoteUserId] = {
                                'div': _0x21b268,
                                'progress': _0x21b268.querySelector('progress'),
                                'label': _0x21b268.querySelector('label')
                            }, _0x326931[_0x2a3aa7.uuid][_0x2a3aa7.remoteUserId].progress.max = _0x2a3aa7.maxChunks;
                        }, _0x519a30.onFileProgress = function(_0x4330ac) {
                            var _0x2fa590 = _0x326931[_0x4330ac.uuid];
                            _0x2fa590 && (_0x4330ac.remoteUserId && !(_0x2fa590 = _0x326931[_0x4330ac.uuid][_0x4330ac.remoteUserId]) || (_0x2fa590.progress.value = _0x4330ac.currentPosition || _0x4330ac.maxChunks || _0x2fa590.progress.max, function(_0x5df338, _0x284eff) {
                                if (-0x1 !== _0x5df338.position) {
                                    var _0x2fa590 = +_0x5df338.position.toFixed(0x2).split('.')[0x1] || 0x64;
                                    _0x284eff.innerHTML = _0x2fa590 + '%';
                                }
                            }(_0x2fa590.progress, _0x2fa590.label)));
                        }, _0x519a30.onFileEnd = function(_0x60ee3b) {
                            var _0x2fa590 = _0x326931[_0x60ee3b.uuid];
                            if (_0x2fa590) {
                                if (!_0x60ee3b.remoteUserId || (_0x2fa590 = _0x326931[_0x60ee3b.uuid][_0x60ee3b.remoteUserId])) {
                                    var _0x21b268 = _0x2fa590.div; - 0x1 != _0x60ee3b.type.indexOf('image') ? _0x21b268.innerHTML = '<a href="' + _0x60ee3b.url + '" download="' + _0x60ee3b.name + '">Download <strong style="color:red;">' + _0x60ee3b.name + '</strong> </a><br /><img src="' + _0x60ee3b.url + '" title="' + _0x60ee3b.name + '" style="max-width: 80%;">' : _0x21b268.innerHTML = '<a href="' + _0x60ee3b.url + '" download="' + _0x60ee3b.name + '">Download <strong style="color:red;">' + _0x60ee3b.name + '</strong> </a><br /><iframe src="' + _0x60ee3b.url + '" title="' + _0x60ee3b.name + '" style="width: 80%;border: 0;height: inherit;margin-top:1em;"></iframe>';
                                }
                            } else console.error('No such progress-helper element exist.', _0x60ee3b);
                        };
                    }
                },
                _0x400337 = {
                    'handle': function(_0x386b1a) {
                        _0x386b1a.autoTranslateText = !0x1, _0x386b1a.language = 'en', _0x386b1a.googKey = 'AIzaSyCgB5hmFY74WYB-EoWkhr9cAGr6TiTHrEE', _0x386b1a.Translator = {
                            'TranslateText': function(_0x211215, _0x254987) {
                                var _0x21b268 = document.createElement('script');
                                _0x21b268.type = 'text/javascript';
                                var _0x521a09 = encodeURIComponent(_0x211215),
                                    _0x4a4191 = 'method' + _0x386b1a.token();
                                window[_0x4a4191] = function(_0x9cc9a) {
                                    _0x9cc9a.data && _0x9cc9a.data.translations[0x0] && _0x254987 ? _0x254987(_0x9cc9a.data.translations[0x0].translatedText) : _0x9cc9a.error && 'Daily Limit Exceeded' === _0x9cc9a.error.message ? console.error('Text translation failed. Error message: "Daily Limit Exceeded."') : _0x9cc9a.error ? console.error(_0x9cc9a.error.message) : console.error(_0x9cc9a);
                                };
                                var _0xfca442 = 'https://www.googleapis.com/language/translate/v2?key=' + _0x386b1a.googKey + '&target=' + (_0x386b1a.language || 'en-US') + '&callback=window.' + _0x4a4191 + '&q=' + _0x521a09;
                                _0x21b268.src = _0xfca442, document.getElementsByTagName('head')[0x0].appendChild(_0x21b268);
                            },
                            'getListOfLanguages': function(_0x36cf7f) {
                                var _0x2fa590 = new XMLHttpRequest();
                                _0x2fa590.onreadystatechange = function() {
                                    if (_0x2fa590.readyState == XMLHttpRequest.DONE) {
                                        var _0x386b1a = JSON.parse(_0x2fa590.responseText);
                                        if (_0x386b1a && _0x386b1a.data && _0x386b1a.data.languages) return void _0x36cf7f(_0x386b1a.data.languages);
                                        if (_0x386b1a.error && 'Daily Limit Exceeded' === _0x386b1a.error.message) return void console.error('Text translation failed. Error message: "Daily Limit Exceeded."');
                                        if (_0x386b1a.error) return void console.error(_0x386b1a.error.message);
                                        console.error(_0x386b1a);
                                    }
                                };
                                var _0x21b268 = 'https://www.googleapis.com/language/translate/v2/languages?key=' + _0x386b1a.googKey + '&target=en';
                                _0x2fa590.open('GET', _0x21b268, true), _0x2fa590.send(null);
                            }
                        };
                    }
                };
            ! function(_0x51c1c9) {
                _0x326931 = _0x326931 || {
                    'useDefaultDevices': true
                }, _0x51c1c9.channel = _0x51c1c9.sessionid = (_0x1056a5 || location.href.replace(/\/|:|#|\?|\$|\^|%|\.|`|~|!|\+|@|\[|\||]|\|*. /g, '').split('\n').join('').split('\x0d').join('')) + '';
                var _0x21b268 = new _0x11ea4f(_0x51c1c9),
                    _0x521a09 = {};

                function _0x2db9d8(_0x3112a3) {
                    if (_0x51c1c9.socketAutoReConnect = true, _0x51c1c9.socket) _0x3112a3 && _0x3112a3(_0x51c1c9.socket);
                    else {
                        if (void 0x0 === _0x45c30f)
                            if ('undefined' != typeof FirebaseConnection) window.SocketConnection = FirebaseConnection;
                            else {
                                if ('undefined' == typeof PubNubConnection) throw 'SocketConnection.js seems missed.';
                                window.SocketConnection = PubNubConnection;
                            }
                        new _0x45c30f(_0x51c1c9, function(_0xbc287b) {
                            _0x3112a3 && _0x3112a3(_0x51c1c9.socket);
                        });
                    }
                }

                function _0x6a70ac(_0x2eb7ca, _0x54a40d) {
                    _0x51c1c9.socket.emit('join-room', {
                        'sessionid': _0x51c1c9.sessionid,
                        'session': _0x51c1c9.session,
                        'mediaConstraints': _0x51c1c9.mediaConstraints,
                        'sdpConstraints': _0x51c1c9.sdpConstraints,
                        'streams': _0x3121c9(),
                        'extra': _0x51c1c9.extra,
                        'password': void 0x0 !== _0x51c1c9.password && 'object' !== _0x4ffbab(_0x51c1c9.password) ? _0x51c1c9.password : ''
                    }, function(_0x35f814, _0x1c1c0b) {
                        if (true === _0x35f814) {
                            if (_0x51c1c9.enableLogs && console.log('isRoomJoined: ', _0x35f814, ' roomid: ', _0x51c1c9.sessionid), _0x51c1c9.peers[_0x51c1c9.sessionid]) return;
                            _0x21b268.onNegotiationNeeded(_0x2eb7ca);
                        }!0x1 === _0x35f814 && _0x51c1c9.enableLogs && console.warn('isRoomJoined: ', _0x1c1c0b, ' roomid: ', _0x51c1c9.sessionid), _0x54a40d(_0x35f814, _0x51c1c9.sessionid, _0x1c1c0b);
                    });
                }

                function _0x484896(_0xaeb629) {
                    _0x51c1c9.enableLogs && console.log('Sending open-room signal to socket.io'), _0x51c1c9.waitingForLocalMedia = !0x1, _0x51c1c9.socket.emit('open-room', {
                        'sessionid': _0x51c1c9.sessionid,
                        'session': _0x51c1c9.session,
                        'mediaConstraints': _0x51c1c9.mediaConstraints,
                        'sdpConstraints': _0x51c1c9.sdpConstraints,
                        'streams': _0x3121c9(),
                        'extra': _0x51c1c9.extra,
                        'identifier': _0x51c1c9.publicRoomIdentifier,
                        'password': void 0x0 !== _0x51c1c9.password && 'object' !== _0x4ffbab(_0x51c1c9.password) ? _0x51c1c9.password : ''
                    }, function(_0x5de645, _0x24b2b1) {
                        true === _0x5de645 && (_0x51c1c9.enableLogs && console.log('isRoomOpened: ', _0x5de645, ' roomid: ', _0x51c1c9.sessionid), _0xaeb629(_0x5de645, _0x51c1c9.sessionid)), !0x1 === _0x5de645 && (_0x51c1c9.enableLogs && console.warn('isRoomOpened: ', _0x24b2b1, ' roomid: ', _0x51c1c9.sessionid), _0xaeb629(_0x5de645, _0x51c1c9.sessionid, _0x24b2b1));
                    });
                }

                function _0x3121c9() {
                    try {
                        return _0x51c1c9.streamEvents.selectAll('local').map(function(_0x4301e9) {
                            return {
                                'streamid': _0x4301e9.streamid,
                                'tracks': _0x4301e9.stream.getTracks().length
                            };
                        });
                    } catch (_0x64ac4b) {
                        return [];
                    }
                }

                function _0x373dce(_0x510ce7, _0xd10b33) {
                    if (_0x51c1c9.dontCaptureUserMedia || _0x510ce7.isDataOnly) _0xd10b33();
                    else {
                        var _0x521a09 = {};
                        _0x510ce7.localPeerSdpConstraints.OfferToReceiveAudio && (_0x521a09.audio = _0x51c1c9.mediaConstraints.audio), _0x510ce7.localPeerSdpConstraints.OfferToReceiveVideo && (_0x521a09.video = _0x51c1c9.mediaConstraints.video);
                        var _0x27fd08 = _0x510ce7.session || _0x51c1c9.session;
                        _0x27fd08.oneway && 'two-way' !== _0x27fd08.audio && 'two-way' !== _0x27fd08.video && 'two-way' !== _0x27fd08.screen ? _0xd10b33() : (_0x27fd08.oneway && _0x27fd08.audio && 'two-way' === _0x27fd08.audio && (_0x27fd08 = {
                            'audio': true
                        }), (_0x27fd08.audio || _0x27fd08.video || _0x27fd08.screen) && (_0x27fd08.screen ? 'Edge' === DetectRTC.browser.name ? navigator.getDisplayMedia({
                            'video': true,
                            'audio': _0x93df62(_0x51c1c9)
                        }).then(function(_0xceda9e) {
                            _0xceda9e.isScreen = true, _0x21b268.onGettingLocalMedia(_0xceda9e), !_0x27fd08.audio && !_0x27fd08.video || _0x93df62(_0x51c1c9) ? _0xd10b33(_0xceda9e) : _0x51c1c9.invokeGetUserMedia(null, _0xd10b33);
                        }, function(_0x15d180) {
                            console.error('Unable to capture screen on Edge. HTTPs and version 17+ is required.');
                        }) : _0x51c1c9.getScreenConstraints(function(_0x81d091, _0x38bce3) {
                            _0x51c1c9.invokeGetUserMedia({
                                'audio': !!_0x93df62(_0x51c1c9) && _0x405170(_0x38bce3),
                                'video': _0x38bce3,
                                'isScreen': true
                            }, !_0x27fd08.audio && !_0x27fd08.video || _0x93df62(_0x51c1c9) ? _0xd10b33 : _0x51c1c9.invokeGetUserMedia(null, _0xd10b33));
                        }) : (_0x27fd08.audio || _0x27fd08.video) && _0x51c1c9.invokeGetUserMedia(null, _0xd10b33, _0x27fd08)));
                    }
                }

                function _0x2559f7(_0x54aa63, _0x15ef31) {
                    _0x54aa63 ? (_0x15ef31.audio && _0x2cbba5(_0x54aa63, 'audio').forEach(function(_0x3eb0f7) {
                        _0x3eb0f7.applyConstraints(_0x15ef31.audio);
                    }), _0x15ef31.video && _0x2cbba5(_0x54aa63, 'video').forEach(function(_0x404e22) {
                        _0x404e22.applyConstraints(_0x15ef31.video);
                    })) : _0x51c1c9.enableLogs && console.error('No stream to applyConstraints.');
                }

                function _0x44cd42(_0xa4ae78, _0xd64125, _0x3b5c67) {
                    _0xd64125 ? _0x21b268.replaceTrack(_0xa4ae78, _0xd64125, _0x3b5c67) : _0x51c1c9.peers.getAllParticipants().forEach(function(_0x67f7c1) {
                        _0x21b268.replaceTrack(_0xa4ae78, _0x67f7c1, _0x3b5c67);
                    });
                }
                _0x21b268.onGettingLocalMedia = function(_0x399d43, _0x84fca0) {
                    if (_0x84fca0 = _0x84fca0 || function() {}, _0x521a09[_0x399d43.streamid]) _0x84fca0();
                    else {
                        _0x521a09[_0x399d43.streamid] = true;
                        try {
                            _0x399d43.type = 'local';
                        } catch (_0x17f6f2) {}
                        _0x51c1c9.setStreamEndHandler(_0x399d43), _0x412d65(_0x399d43, function(_0x2ad0da) {
                            _0x2ad0da.id = _0x399d43.streamid, _0x2ad0da.muted = true, _0x2ad0da.volume = 0x0, -0x1 === _0x51c1c9.attachStreams.indexOf(_0x399d43) && _0x51c1c9.attachStreams.push(_0x399d43), void 0x0 !== _0x25e82e && _0x25e82e.setHandlers(_0x399d43, true, _0x51c1c9), _0x51c1c9.streamEvents[_0x399d43.streamid] = {
                                'stream': _0x399d43,
                                'type': 'local',
                                'mediaElement': _0x2ad0da,
                                'userid': _0x51c1c9.userid,
                                'extra': _0x51c1c9.extra,
                                'streamid': _0x399d43.streamid,
                                'isAudioMuted': true
                            };
                            try {
                                ! function(_0x535d1c, _0x240dfe) {
                                    if (_0x240dfe.stream && _0x2cbba5(_0x240dfe.stream, 'audio').length) {
                                        if (!_0x535d1c || !_0x240dfe) throw 'Both arguments are required.';
                                        if (_0x535d1c.onspeaking && _0x535d1c.onsilence) {
                                            if ('undefined' == typeof hark) throw 'hark.js not found.';
                                            hark(_0x240dfe.stream, {
                                                'onspeaking': function() {
                                                    _0x535d1c.onspeaking(_0x240dfe);
                                                },
                                                'onsilence': function() {
                                                    _0x535d1c.onsilence(_0x240dfe);
                                                },
                                                'onvolumechange': function(_0x114490, _0x4f35b0) {
                                                    _0x535d1c.onvolumechange && _0x535d1c.onvolumechange(_0x1e6a28({
                                                        'volume': _0x114490,
                                                        'threshold': _0x4f35b0
                                                    }, _0x240dfe));
                                                }
                                            });
                                        }
                                    }
                                }(_0x51c1c9, _0x51c1c9.streamEvents[_0x399d43.streamid]), _0x57b754(_0x51c1c9, _0x51c1c9.streamEvents[_0x399d43.streamid]), _0x51c1c9.onstream(_0x51c1c9.streamEvents[_0x399d43.streamid]);
                            } catch (_0x459936) {}
                            _0x84fca0();
                        }, _0x51c1c9);
                    }
                }, _0x21b268.onGettingRemoteMedia = function(_0x54dff5, _0x2bab67) {
                    try {
                        _0x54dff5.type = 'remote';
                    } catch (_0x2b68f0) {}
                    _0x51c1c9.setStreamEndHandler(_0x54dff5, 'remote-stream'), _0x412d65(_0x54dff5, function(_0x291e4f) {
                        _0x291e4f.id = _0x54dff5.streamid, void 0x0 !== _0x25e82e && _0x25e82e.setHandlers(_0x54dff5, !0x1, _0x51c1c9), _0x51c1c9.streamEvents[_0x54dff5.streamid] = {
                            'stream': _0x54dff5,
                            'type': 'remote',
                            'userid': _0x2bab67,
                            'extra': _0x51c1c9.peers[_0x2bab67] ? _0x51c1c9.peers[_0x2bab67].extra : {},
                            'mediaElement': _0x291e4f,
                            'streamid': _0x54dff5.streamid
                        }, _0x57b754(_0x51c1c9, _0x51c1c9.streamEvents[_0x54dff5.streamid]), _0x51c1c9.onstream(_0x51c1c9.streamEvents[_0x54dff5.streamid]);
                    }, _0x51c1c9);
                }, _0x21b268.onRemovingRemoteMedia = function(_0x5e7396, _0x1a735c) {
                    var _0x21b268 = _0x51c1c9.streamEvents[_0x5e7396.streamid];
                    _0x21b268 || (_0x21b268 = {
                        'stream': _0x5e7396,
                        'type': 'remote',
                        'userid': _0x1a735c,
                        'extra': _0x51c1c9.peers[_0x1a735c] ? _0x51c1c9.peers[_0x1a735c].extra : {},
                        'streamid': _0x5e7396.streamid,
                        'mediaElement': _0x51c1c9.streamEvents[_0x5e7396.streamid] ? _0x51c1c9.streamEvents[_0x5e7396.streamid].mediaElement : null
                    }), _0x51c1c9.peersBackup[_0x21b268.userid] && (_0x21b268.extra = _0x51c1c9.peersBackup[_0x21b268.userid].extra), _0x51c1c9.onstreamended(_0x21b268), delete _0x51c1c9.streamEvents[_0x5e7396.streamid];
                }, _0x21b268.onNegotiationNeeded = function(_0x2d936f, _0x4e2d94, _0x5d7bb5) {
                    _0x5d7bb5 = _0x5d7bb5 || function() {};
                    var _0x521a09 = {
                        'remoteUserId': _0x4e2d94 = _0x4e2d94 || _0x2d936f.remoteUserId,
                        'message': _0x2d936f = _0x2d936f || '',
                        'sender': _0x51c1c9.userid
                    };
                    _0x2d936f.remoteUserId && _0x2d936f.message && _0x2d936f.sender && (_0x521a09 = _0x2d936f), _0x2db9d8(function() {
                        _0x51c1c9.socket.emit(_0x51c1c9.socketMessageEvent, _0x521a09, _0x5d7bb5);
                    });
                }, _0x21b268.onUserLeft = function(_0x76e281) {
                    _0x51c1c9.deletePeer(_0x76e281);
                }, _0x21b268.disconnectWith = function(_0x88879c, _0x323747) {
                    _0x51c1c9.socket && _0x51c1c9.socket.emit('disconnect-with', _0x88879c, _0x323747 || function() {}), _0x51c1c9.deletePeer(_0x88879c);
                }, _0x51c1c9.socketOptions = {
                    'transport': 'polling'
                }, _0x51c1c9.openOrJoin = function(_0x66fc69, _0xba3fb1) {
                    _0xba3fb1 = _0xba3fb1 || function() {}, _0x51c1c9.checkPresence(_0x66fc69, function(_0x1c5cec, _0x207cb3) {
                        if (_0x1c5cec) {
                            _0x51c1c9.sessionid = _0x207cb3;
                            var _0x521a09, _0x429662, _0x22a5af = !!_0x51c1c9.session.oneway,
                                _0x5851c5 = _0x5deab2(_0x51c1c9.session);
                            _0x429662 = {
                                'OfferToReceiveAudio': _0x51c1c9.sdpConstraints.mandatory.OfferToReceiveAudio,
                                'OfferToReceiveVideo': _0x51c1c9.sdpConstraints.mandatory.OfferToReceiveVideo
                            }, _0x521a09 = {
                                'OfferToReceiveAudio': _0x22a5af ? !!_0x51c1c9.session.audio : _0x51c1c9.sdpConstraints.mandatory.OfferToReceiveAudio,
                                'OfferToReceiveVideo': _0x22a5af ? !!_0x51c1c9.session.video || !!_0x51c1c9.session.screen : _0x51c1c9.sdpConstraints.mandatory.OfferToReceiveVideo
                            };
                            var _0x3fb79d = {
                                'remoteUserId': _0x51c1c9.sessionid,
                                'message': {
                                    'newParticipationRequest': true,
                                    'isOneWay': _0x22a5af,
                                    'isDataOnly': _0x5851c5,
                                    'localPeerSdpConstraints': _0x521a09,
                                    'remotePeerSdpConstraints': _0x429662
                                },
                                'sender': _0x51c1c9.userid
                            };
                            _0x373dce(_0x3fb79d.message, function() {
                                _0x6a70ac(_0x3fb79d, _0xba3fb1);
                            });
                        } else _0x51c1c9.waitingForLocalMedia = true, _0x51c1c9.isInitiator = true, _0x51c1c9.sessionid = _0x207cb3 || _0x51c1c9.sessionid, _0x5deab2(_0x51c1c9.session) ? _0x484896(_0xba3fb1) : _0x51c1c9.captureUserMedia(function() {
                            _0x484896(_0xba3fb1);
                        });
                    });
                }, _0x51c1c9.waitingForLocalMedia = !0x1, _0x51c1c9.open = function(_0x572e80, _0x37b154) {
                    _0x37b154 = _0x37b154 || function() {}, _0x51c1c9.waitingForLocalMedia = true, _0x51c1c9.isInitiator = true, _0x51c1c9.sessionid = _0x572e80 || _0x51c1c9.sessionid, _0x2db9d8(function() {
                        _0x5deab2(_0x51c1c9.session) ? _0x484896(_0x37b154) : _0x51c1c9.captureUserMedia(function() {
                            _0x484896(_0x37b154);
                        });
                    });
                }, _0x51c1c9.peersBackup = {}, _0x51c1c9.deletePeer = function(_0x31e4e4) {
                    if (_0x31e4e4 && _0x51c1c9.peers[_0x31e4e4]) {
                        var _0x326931 = {
                            'userid': _0x31e4e4,
                            'extra': _0x51c1c9.peers[_0x31e4e4] ? _0x51c1c9.peers[_0x31e4e4].extra : {}
                        };
                        if (_0x51c1c9.peersBackup[_0x326931.userid] && (_0x326931.extra = _0x51c1c9.peersBackup[_0x326931.userid].extra), _0x51c1c9.onleave(_0x326931), _0x51c1c9.peers[_0x31e4e4]) {
                            _0x51c1c9.peers[_0x31e4e4].streams.forEach(function(_0x424150) {
                                _0x424150.stop();
                            });
                            var _0x21b268 = _0x51c1c9.peers[_0x31e4e4].peer;
                            if (_0x21b268 && 'closed' !== _0x21b268.iceConnectionState) try {
                                _0x21b268.close();
                            } catch (_0x24b95f) {}
                            _0x51c1c9.peers[_0x31e4e4] && (_0x51c1c9.peers[_0x31e4e4].peer = null, delete _0x51c1c9.peers[_0x31e4e4]);
                        }
                    }
                }, _0x51c1c9.rejoin = function(_0x22fd47) {
                    if (!_0x51c1c9.isInitiator && _0x22fd47 && Object.keys(_0x22fd47).length) {
                        var _0x326931 = {};
                        _0x51c1c9.peers[_0x22fd47.remoteUserId] && (_0x326931 = _0x51c1c9.peers[_0x22fd47.remoteUserId].extra, _0x51c1c9.deletePeer(_0x22fd47.remoteUserId)), _0x22fd47 && _0x22fd47.remoteUserId && (_0x51c1c9.join(_0x22fd47.remoteUserId), _0x51c1c9.onReConnecting({
                            'userid': _0x22fd47.remoteUserId,
                            'extra': _0x326931
                        }));
                    }
                }, _0x51c1c9.join = function(_0x4b656a, _0x35b82f) {
                    _0x51c1c9.sessionid = !!_0x4b656a && (_0x4b656a.sessionid || _0x4b656a.remoteUserId || _0x4b656a) || _0x51c1c9.sessionid, _0x51c1c9.sessionid += '';
                    var _0x21b268 = !0x1,
                        _0x521a09 = !0x1,
                        _0x20e7ef = !0x1,
                        _0x4b614d = !0x1;
                    if (_0x4b656a && _0x4b656a.session || !_0x4b656a || 'string' == typeof _0x4b656a) {
                        var _0x447147 = _0x4b656a && _0x4b656a.session || _0x51c1c9.session;
                        _0x20e7ef = !!_0x447147.oneway, _0x4b614d = _0x5deab2(_0x447147), _0x521a09 = {
                            'OfferToReceiveAudio': _0x51c1c9.sdpConstraints.mandatory.OfferToReceiveAudio,
                            'OfferToReceiveVideo': _0x51c1c9.sdpConstraints.mandatory.OfferToReceiveVideo
                        }, _0x21b268 = {
                            'OfferToReceiveAudio': _0x20e7ef ? !!_0x51c1c9.session.audio : _0x51c1c9.sdpConstraints.mandatory.OfferToReceiveAudio,
                            'OfferToReceiveVideo': _0x20e7ef ? !!_0x51c1c9.session.video || !!_0x51c1c9.session.screen : _0x51c1c9.sdpConstraints.mandatory.OfferToReceiveVideo
                        };
                    }
                    var _0x13518b = function() {};
                    'function' == typeof(_0x35b82f = _0x35b82f || {}) && (_0x13518b = _0x35b82f, _0x35b82f = {}), void 0x0 !== _0x35b82f.localPeerSdpConstraints && (_0x21b268 = _0x35b82f.localPeerSdpConstraints), void 0x0 !== _0x35b82f.remotePeerSdpConstraints && (_0x521a09 = _0x35b82f.remotePeerSdpConstraints), void 0x0 !== _0x35b82f.isOneWay && (_0x20e7ef = _0x35b82f.isOneWay), void 0x0 !== _0x35b82f.isDataOnly && (_0x4b614d = _0x35b82f.isDataOnly);
                    var _0xcceebc = {
                        'remoteUserId': _0x51c1c9.sessionid,
                        'message': {
                            'newParticipationRequest': true,
                            'isOneWay': _0x20e7ef,
                            'isDataOnly': _0x4b614d,
                            'localPeerSdpConstraints': _0x21b268,
                            'remotePeerSdpConstraints': _0x521a09
                        },
                        'sender': _0x51c1c9.userid
                    };
                    return _0x373dce(_0xcceebc.message, function() {
                        _0x2db9d8(function() {
                            _0x6a70ac(_0xcceebc, _0x13518b);
                        });
                    }), _0xcceebc;
                }, _0x51c1c9.publicRoomIdentifier = '', _0x51c1c9.getUserMedia = _0x51c1c9.captureUserMedia = function(_0x3ae868, _0x4adbb1) {
                    _0x3ae868 = _0x3ae868 || function() {};
                    var _0x521a09 = _0x4adbb1 || _0x51c1c9.session;
                    _0x51c1c9.dontCaptureUserMedia || _0x5deab2(_0x521a09) ? _0x3ae868() : (_0x521a09.audio || _0x521a09.video || _0x521a09.screen) && (_0x521a09.screen ? 'Edge' === DetectRTC.browser.name ? navigator.getDisplayMedia({
                        'video': true,
                        'audio': _0x93df62(_0x51c1c9)
                    }).then(function(_0x31597a) {
                        if (_0x31597a.isScreen = true, _0x21b268.onGettingLocalMedia(_0x31597a), !_0x521a09.audio && !_0x521a09.video || _0x93df62(_0x51c1c9)) _0x3ae868(_0x31597a);
                        else {
                            var _0x76c694 = {};
                            for (var _0x1bab2d in _0x521a09) 'screen' !== _0x1bab2d && (_0x76c694[_0x1bab2d] = _0x521a09[_0x1bab2d]);
                            _0x51c1c9.invokeGetUserMedia(_0x4adbb1, _0x3ae868, _0x76c694);
                        }
                    }, function(_0x286f92) {
                        console.error('Unable to capture screen on Edge. HTTPs and version 17+ is required.');
                    }) : _0x51c1c9.getScreenConstraints(function(_0x33fd74, _0x4af197) {
                        if (_0x33fd74) throw _0x33fd74;
                        _0x51c1c9.invokeGetUserMedia({
                            'audio': !!_0x93df62(_0x51c1c9) && _0x405170(_0x4af197),
                            'video': _0x4af197,
                            'isScreen': true
                        }, function(_0x295451) {
                            if (!_0x521a09.audio && !_0x521a09.video || _0x93df62(_0x51c1c9)) _0x3ae868(_0x295451);
                            else {
                                var _0x4af197 = {};
                                for (var _0x3fbf75 in _0x521a09) 'screen' !== _0x3fbf75 && (_0x4af197[_0x3fbf75] = _0x521a09[_0x3fbf75]);
                                _0x51c1c9.invokeGetUserMedia(_0x4adbb1, _0x3ae868, _0x4af197);
                            }
                        });
                    }) : (_0x521a09.audio || _0x521a09.video) && _0x51c1c9.invokeGetUserMedia(_0x4adbb1, _0x3ae868, _0x521a09));
                }, _0x51c1c9.onbeforeunload = function(_0x403853, _0xcfe5cf) {
                    _0x51c1c9.closeBeforeUnload && (_0x51c1c9.peers.getAllParticipants().forEach(function(_0x135225) {
                        _0x21b268.onNegotiationNeeded({
                            'userLeft': true
                        }, _0x135225), _0x51c1c9.peers[_0x135225] && _0x51c1c9.peers[_0x135225].peer && _0x51c1c9.peers[_0x135225].peer.close(), delete _0x51c1c9.peers[_0x135225];
                    }), _0xcfe5cf || _0x51c1c9.closeSocket(), _0x51c1c9.isInitiator = !0x1);
                }, window.ignoreBeforeUnload ? _0x51c1c9.closeBeforeUnload = !0x1 : (_0x51c1c9.closeBeforeUnload = true, window.addEventListener('beforeunload', _0x51c1c9.onbeforeunload, !0x1)), _0x51c1c9.userid = _0x5b8d5d(), _0x51c1c9.changeUserId = function(_0x305ce9, _0x4c71e8) {
                    _0x4c71e8 = _0x4c71e8 || function() {}, _0x51c1c9.userid = _0x305ce9 || _0x5b8d5d(), _0x51c1c9.socket.emit('changed-uuid', _0x51c1c9.userid, _0x4c71e8);
                }, _0x51c1c9.extra = {}, _0x51c1c9.attachStreams = [], _0x51c1c9.session = {
                    'audio': true,
                    'video': true
                }, _0x51c1c9.enableFileSharing = !0x1, _0x51c1c9.bandwidth = {
                    'screen': !0x1,
                    'audio': !0x1,
                    'video': !0x1
                }, _0x51c1c9.codecs = {
                    'audio': 'opus',
                    'video': 'VP9'
                }, _0x51c1c9.processSdp = function(_0xec5090) {
                    return _0x5407aa() ? _0xec5090 : 'Safari' === DetectRTC.browser.name ? _0xec5090 : ('VP8' === _0x51c1c9.codecs.video.toUpperCase() && (_0xec5090 = _0x42fdaa.preferCodec(_0xec5090, 'vp8')), 'VP9' === _0x51c1c9.codecs.video.toUpperCase() && (_0xec5090 = _0x42fdaa.preferCodec(_0xec5090, 'vp9')), 'H264' === _0x51c1c9.codecs.video.toUpperCase() && (_0xec5090 = _0x42fdaa.preferCodec(_0xec5090, 'h264')), 'G722' === _0x51c1c9.codecs.audio && (_0xec5090 = _0x42fdaa.removeNonG722(_0xec5090)), 'Firefox' === DetectRTC.browser.name ? _0xec5090 : ((_0x51c1c9.bandwidth.video || _0x51c1c9.bandwidth.screen) && (_0xec5090 = _0x42fdaa.setApplicationSpecificBandwidth(_0xec5090, _0x51c1c9.bandwidth, !!_0x51c1c9.session.screen)), _0x51c1c9.bandwidth.video && (_0xec5090 = _0x42fdaa.setVideoBitrates(_0xec5090, {
                        'min': 0x8 * _0x51c1c9.bandwidth.video * 0x400,
                        'max': 0x8 * _0x51c1c9.bandwidth.video * 0x400
                    })), _0x51c1c9.bandwidth.audio && (_0xec5090 = _0x42fdaa.setOpusAttributes(_0xec5090, {
                        'maxaveragebitrate': 0x8 * _0x51c1c9.bandwidth.audio * 0x400,
                        'maxplaybackrate': 0x8 * _0x51c1c9.bandwidth.audio * 0x400,
                        'stereo': 0x1,
                        'maxptime': 0x3
                    })), _0xec5090));
                }, void 0x0 !== _0x42fdaa && (_0x51c1c9.BandwidthHandler = _0x51c1c9.CodecsHandler = _0x42fdaa), _0x51c1c9.mediaConstraints = {
                    'audio': {
                        'mandatory': {},
                        'optional': _0x51c1c9.bandwidth.audio ? [{
                            'bandwidth': 0x8 * _0x51c1c9.bandwidth.audio * 0x400 || 0x100000
                        }] : []
                    },
                    'video': {
                        'mandatory': {},
                        'optional': _0x51c1c9.bandwidth.video ? [{
                            'bandwidth': 0x8 * _0x51c1c9.bandwidth.video * 0x400 || 0x100000
                        }, {
                            'facingMode': 'user'
                        }] : [{
                            'facingMode': 'user'
                        }]
                    }
                }, 'Firefox' === DetectRTC.browser.name && (_0x51c1c9.mediaConstraints = {
                    'audio': true,
                    'video': true
                }), _0x326931.useDefaultDevices || DetectRTC.isMobileDevice || DetectRTC.load(function() {
                    var _0x1056a5, _0x326931;
                    if (DetectRTC.MediaDevices.forEach(function(_0x1e1549) {
                            'audioinput' === _0x1e1549.kind && !0x1 !== _0x51c1c9.mediaConstraints.audio && (_0x1056a5 = _0x1e1549), 'videoinput' === _0x1e1549.kind && !0x1 !== _0x51c1c9.mediaConstraints.video && (_0x326931 = _0x1e1549);
                        }), _0x1056a5) {
                        if ('Firefox' === DetectRTC.browser.name) return void(true !== _0x51c1c9.mediaConstraints.audio ? _0x51c1c9.mediaConstraints.audio.deviceId = _0x1056a5.id : _0x51c1c9.mediaConstraints.audio = {
                            'deviceId': _0x1056a5.id
                        });
                        0x1 == _0x51c1c9.mediaConstraints.audio && (_0x51c1c9.mediaConstraints.audio = {
                            'mandatory': {},
                            'optional': []
                        }), _0x51c1c9.mediaConstraints.audio.optional || (_0x51c1c9.mediaConstraints.audio.optional = []);
                        var _0x21b268 = [{
                            'sourceId': _0x1056a5.id
                        }];
                        _0x51c1c9.mediaConstraints.audio.optional = _0x21b268.concat(_0x51c1c9.mediaConstraints.audio.optional);
                    }
                    if (_0x326931) {
                        if ('Firefox' === DetectRTC.browser.name) return void(true !== _0x51c1c9.mediaConstraints.video ? _0x51c1c9.mediaConstraints.video.deviceId = _0x326931.id : _0x51c1c9.mediaConstraints.video = {
                            'deviceId': _0x326931.id
                        });
                        0x1 == _0x51c1c9.mediaConstraints.video && (_0x51c1c9.mediaConstraints.video = {
                            'mandatory': {},
                            'optional': []
                        }), _0x51c1c9.mediaConstraints.video.optional || (_0x51c1c9.mediaConstraints.video.optional = []);
                        _0x21b268 = [{
                            'sourceId': _0x326931.id
                        }];
                        _0x51c1c9.mediaConstraints.video.optional = _0x21b268.concat(_0x51c1c9.mediaConstraints.video.optional);
                    }
                }), _0x51c1c9.sdpConstraints = {
                    'mandatory': {
                        'OfferToReceiveAudio': true,
                        'OfferToReceiveVideo': true
                    },
                    'optional': [{
                        'VoiceActivityDetection': !0x1
                    }]
                }, _0x51c1c9.sdpSemantics = null, _0x51c1c9.iceCandidatePoolSize = null, _0x51c1c9.bundlePolicy = null, _0x51c1c9.rtcpMuxPolicy = null, _0x51c1c9.iceTransportPolicy = null, _0x51c1c9.optionalArgument = {
                    'optional': [{
                        'DtlsSrtpKeyAgreement': true
                    }, {
                        'googImprovedWifiBwe': true
                    }, {
                        'googScreencastMinBitrate': 0x12c
                    }, {
                        'googIPv6': true
                    }, {
                        'googDscp': true
                    }, {
                        'googCpuUnderuseThreshold': 0x37
                    }, {
                        'googCpuOveruseThreshold': 0x55
                    }, {
                        'googSuspendBelowMinBitrate': true
                    }, {
                        'googCpuOveruseDetection': true
                    }],
                    'mandatory': {}
                }, _0x51c1c9.iceServers = _0x3b9609.getIceServers(_0x51c1c9), _0x51c1c9.candidates = {
                    'host': true,
                    'stun': true,
                    'turn': true
                }, _0x51c1c9.iceProtocols = {
                    'tcp': true,
                    'udp': true
                }, _0x51c1c9.onopen = function(_0x44d923) {
                    _0x51c1c9.enableLogs && console.info('Data connection has been opened between you & ', _0x44d923.userid);
                }, _0x51c1c9.onclose = function(_0x4bc33b) {
                    _0x51c1c9.enableLogs && console.warn('Data connection has been closed between you & ', _0x4bc33b.userid);
                }, _0x51c1c9.onerror = function(_0x119131) {
                    _0x51c1c9.enableLogs && console.error(_0x119131.userid, 'data-error', _0x119131);
                }, _0x51c1c9.onmessage = function(_0x377929) {
                    _0x51c1c9.enableLogs && console.debug('data-message', _0x377929.userid, _0x377929.data);
                }, _0x51c1c9.send = function(_0x21e29b, _0x2e0c9a) {
                    _0x51c1c9.peers.send(_0x21e29b, _0x2e0c9a);
                }, _0x51c1c9.close = _0x51c1c9.disconnect = _0x51c1c9.leave = function() {
                    _0x51c1c9.onbeforeunload(!0x1, true);
                }, _0x51c1c9.closeEntireSession = function(_0x5971f7) {
                    _0x5971f7 = _0x5971f7 || function() {}, _0x51c1c9.socket.emit('close-entire-session', function _0x326931() {
                        _0x51c1c9.getAllParticipants().length ? setTimeout(_0x326931, 0x64) : (_0x51c1c9.onEntireSessionClosed({
                            'sessionid': _0x51c1c9.sessionid,
                            'userid': _0x51c1c9.userid,
                            'extra': _0x51c1c9.extra
                        }), _0x51c1c9.changeUserId(null, function() {
                            _0x51c1c9.close(), _0x5971f7();
                        }));
                    });
                }, _0x51c1c9.onEntireSessionClosed = function(_0x308fc8) {
                    _0x51c1c9.enableLogs && console.info('Entire session is closed: ', _0x308fc8.sessionid, _0x308fc8.extra);
                }, _0x51c1c9.onstream = function(_0x2795c9) {
                    var _0x326931 = _0x51c1c9.videosContainer;
                    _0x326931.insertBefore(_0x2795c9.mediaElement, _0x326931.firstChild);
                    var _0x21b268 = _0x2795c9.mediaElement.play();
                    void 0x0 === _0x21b268 ? setTimeout(function() {
                        _0x2795c9.mediaElement.play();
                    }, 0x7d0) : _0x21b268.catch(function() {}).then(function() {
                        setTimeout(function() {
                            _0x2795c9.mediaElement.play();
                        }, 0x7d0);
                    });
                }, _0x51c1c9.onstreamended = function(_0x22b684) {
                    _0x22b684.mediaElement || (_0x22b684.mediaElement = document.getElementById(_0x22b684.streamid)), _0x22b684.mediaElement && _0x22b684.mediaElement.parentNode && _0x22b684.mediaElement.parentNode.removeChild(_0x22b684.mediaElement);
                }, _0x51c1c9.direction = 'many-to-many', _0x51c1c9.removeStream = function(_0x5af7be, _0x17537a) {
                    var _0x21b268;
                    _0x51c1c9.attachStreams.forEach(function(_0xc4fbb0) {
                        _0xc4fbb0.id === _0x5af7be && (_0x21b268 = _0xc4fbb0);
                    }), _0x21b268 ? (_0x51c1c9.peers.getAllParticipants().forEach(function(_0x2bd479) {
                        if (!_0x17537a || _0x2bd479 === _0x17537a) {
                            var _0x521a09 = _0x51c1c9.peers[_0x2bd479];
                            try {
                                _0x521a09.peer.removeStream(_0x21b268);
                            } catch (_0x159ea4) {}
                        }
                    }), _0x51c1c9.renegotiate()) : console.warn('No such stream exist.', _0x5af7be);
                }, _0x51c1c9.addStream = function(_0x44d589, _0x5d1f28) {
                    if (_0x44d589.getTracks) return -0x1 === _0x51c1c9.attachStreams.indexOf(_0x44d589) && (_0x44d589.streamid || (_0x44d589.streamid = _0x44d589.id), _0x51c1c9.attachStreams.push(_0x44d589)), void _0x51c1c9.renegotiate(_0x5d1f28);

                    function _0x5a47df(_0x4cd18b) {
                        _0x44d589.streamCallback && _0x44d589.streamCallback(_0x4cd18b), _0x51c1c9.renegotiate(_0x5d1f28);
                    }
                    _0x5deab2(_0x44d589) ? _0x51c1c9.renegotiate(_0x5d1f28) : (_0x44d589.audio || _0x44d589.video || _0x44d589.screen) && (_0x44d589.screen ? 'Edge' === DetectRTC.browser.name ? navigator.getDisplayMedia({
                        'video': true,
                        'audio': _0x93df62(_0x51c1c9)
                    }).then(function(_0x3bef4d) {
                        _0x3bef4d.isScreen = true, _0x21b268.onGettingLocalMedia(_0x3bef4d), !_0x44d589.audio && !_0x44d589.video || _0x93df62(_0x51c1c9) ? _0x5a47df(_0x3bef4d) : _0x51c1c9.invokeGetUserMedia(null, function(_0x108d5e) {
                            _0x5a47df(_0x108d5e);
                        });
                    }, function(_0x107d05) {
                        console.error('Unable to capture screen on Edge. HTTPs and version 17+ is required.');
                    }) : _0x51c1c9.getScreenConstraints(function(_0x247e33, _0x20dba5) {
                        if (_0x247e33) return 'PermissionDeniedError' === _0x247e33 ? (_0x44d589.streamCallback && _0x44d589.streamCallback(null), void(_0x51c1c9.enableLogs && console.error('User rejected to share his screen.'))) : alert(_0x247e33);
                        _0x51c1c9.invokeGetUserMedia({
                            'audio': !!_0x93df62(_0x51c1c9) && _0x405170(_0x20dba5),
                            'video': _0x20dba5,
                            'isScreen': true
                        }, function(_0x3558fb) {
                            !_0x44d589.audio && !_0x44d589.video || _0x93df62(_0x51c1c9) ? _0x5a47df(_0x3558fb) : _0x51c1c9.invokeGetUserMedia(null, function(_0x301cff) {
                                _0x5a47df(_0x301cff);
                            });
                        });
                    }) : (_0x44d589.audio || _0x44d589.video) && _0x51c1c9.invokeGetUserMedia(null, _0x5a47df));
                }, _0x51c1c9.invokeGetUserMedia = function(_0x39db84, _0x4c2007, _0x587a84) {
                    _0x587a84 || (_0x587a84 = _0x51c1c9.session), _0x39db84 || (_0x39db84 = _0x51c1c9.mediaConstraints), _0x5adfda({
                        'onGettingLocalMedia': function(_0x4608af) {
                            var _0x587a84 = _0x39db84.video;
                            _0x587a84 && (_0x587a84.mediaSource || _0x587a84.mozMediaSource ? _0x4608af.isScreen = true : _0x587a84.mandatory && _0x587a84.mandatory.chromeMediaSource && (_0x4608af.isScreen = true)), _0x4608af.isScreen || (_0x4608af.isVideo = !!_0x2cbba5(_0x4608af, 'video').length, _0x4608af.isAudio = !_0x4608af.isVideo && _0x2cbba5(_0x4608af, 'audio').length), _0x21b268.onGettingLocalMedia(_0x4608af, function() {
                                'function' == typeof _0x4c2007 && _0x4c2007(_0x4608af);
                            });
                        },
                        'onLocalMediaError': function(_0x290ef1, _0x3a75f5) {
                            _0x21b268.onLocalMediaError(_0x290ef1, _0x3a75f5);
                        },
                        'localMediaConstraints': _0x39db84 || {
                            'audio': !!_0x587a84.audio && _0x39db84.audio,
                            'video': !!_0x587a84.video && _0x39db84.video
                        }
                    });
                }, _0x51c1c9.applyConstraints = function(_0x314dfa, _0x295b4a) {
                    if (_0x1d01b4 && _0x1d01b4.prototype.applyConstraints) {
                        var _0x21b268;
                        if (_0x295b4a) return _0x51c1c9.streamEvents[_0x295b4a] && (_0x21b268 = _0x51c1c9.streamEvents[_0x295b4a].stream), void _0x2559f7(_0x21b268, _0x314dfa);
                        _0x51c1c9.attachStreams.forEach(function(_0x4e7a56) {
                            _0x2559f7(_0x4e7a56, _0x314dfa);
                        });
                    } else alert('track.applyConstraints is NOT supported in your browser.');
                }, _0x51c1c9.replaceTrack = function(_0x3642cb, _0xd04c26, _0x485038) {
                    if (_0x3642cb = _0x3642cb || {}, _0x2a4be1.prototype.getSenders)
                        if (_0x3642cb instanceof _0x1d01b4) _0x44cd42(_0x3642cb, _0xd04c26, _0x485038);
                        else {
                            if (_0x3642cb instanceof _0x1d809b) return _0x2cbba5(_0x3642cb, 'video').length && _0x44cd42(_0x2cbba5(_0x3642cb, 'video')[0x0], _0xd04c26, true), void(_0x2cbba5(_0x3642cb, 'audio').length && _0x44cd42(_0x2cbba5(_0x3642cb, 'audio')[0x0], _0xd04c26, !0x1));
                            if (_0x5deab2(_0x3642cb)) throw 'connection.replaceTrack requires audio and/or video and/or screen.';
                            (_0x3642cb.audio || _0x3642cb.video || _0x3642cb.screen) && (_0x3642cb.screen ? 'Edge' === DetectRTC.browser.name ? navigator.getDisplayMedia({
                                'video': true,
                                'audio': _0x93df62(_0x51c1c9)
                            }).then(function(_0x675faf) {
                                _0x675faf.isScreen = true, _0x21b268.onGettingLocalMedia(_0x675faf), !_0x3642cb.audio && !_0x3642cb.video || _0x93df62(_0x51c1c9) ? _0x564a08(_0x675faf) : _0x51c1c9.invokeGetUserMedia(null, _0x564a08);
                            }, function(_0x4219c9) {
                                console.error('Unable to capture screen on Edge. HTTPs and version 17+ is required.');
                            }) : _0x51c1c9.getScreenConstraints(function(_0x38cb24, _0x2fa66e) {
                                if (_0x38cb24) return alert(_0x38cb24);
                                _0x51c1c9.invokeGetUserMedia({
                                    'audio': !!_0x93df62(_0x51c1c9) && _0x405170(_0x2fa66e),
                                    'video': _0x2fa66e,
                                    'isScreen': true
                                }, !_0x3642cb.audio && !_0x3642cb.video || _0x93df62(_0x51c1c9) ? _0x564a08 : _0x51c1c9.invokeGetUserMedia(null, _0x564a08));
                            }) : (_0x3642cb.audio || _0x3642cb.video) && _0x51c1c9.invokeGetUserMedia(null, _0x564a08));
                        }
                    else _0x51c1c9.addStream(_0x3642cb);

                    function _0x564a08(_0x547ff0) {
                        _0x51c1c9.replaceTrack(_0x547ff0, _0xd04c26, _0x485038 || _0x3642cb.video || _0x3642cb.screen);
                    }
                }, _0x51c1c9.resetTrack = function(_0x1215de, _0x3d0c09) {
                    _0x1215de || (_0x1215de = _0x51c1c9.getAllParticipants()), 'string' == typeof _0x1215de && (_0x1215de = [_0x1215de]), _0x1215de.forEach(function(_0x17e765) {
                        var _0x21b268 = _0x51c1c9.peers[_0x17e765].peer;
                        void 0x0 !== _0x3d0c09 && true !== _0x3d0c09 || !_0x21b268.lastVideoTrack || _0x51c1c9.replaceTrack(_0x21b268.lastVideoTrack, _0x17e765, true), void 0x0 !== _0x3d0c09 && !0x1 !== _0x3d0c09 || !_0x21b268.lastAudioTrack || _0x51c1c9.replaceTrack(_0x21b268.lastAudioTrack, _0x17e765, !0x1);
                    });
                }, _0x51c1c9.renegotiate = function(_0x2ea770) {
                    _0x2ea770 ? _0x21b268.renegotiatePeer(_0x2ea770) : _0x51c1c9.peers.getAllParticipants().forEach(function(_0x428915) {
                        _0x21b268.renegotiatePeer(_0x428915);
                    });
                }, _0x51c1c9.setStreamEndHandler = function(_0x46fab4, _0x3cea1b) {
                    if (_0x46fab4 && _0x46fab4.addEventListener && (_0x3cea1b = !!_0x3cea1b, !_0x46fab4.alreadySetEndHandler)) {
                        _0x46fab4.alreadySetEndHandler = true;
                        var _0x21b268 = 'ended';
                        'oninactive' in _0x46fab4 && (_0x21b268 = 'inactive'), _0x46fab4.addEventListener(_0x21b268, function() {
                            if (_0x46fab4.idInstance && currentUserMediaRequest.remove(_0x46fab4.idInstance), !_0x3cea1b) {
                                var _0x21b268 = [];
                                _0x51c1c9.attachStreams.forEach(function(_0x35d5da) {
                                    _0x35d5da.id != _0x46fab4.id && _0x21b268.push(_0x35d5da);
                                }), _0x51c1c9.attachStreams = _0x21b268;
                            }
                            var _0x521a09 = _0x51c1c9.streamEvents[_0x46fab4.streamid];
                            if (_0x521a09 || (_0x521a09 = {
                                    'stream': _0x46fab4,
                                    'streamid': _0x46fab4.streamid,
                                    'type': _0x3cea1b ? 'remote' : 'local',
                                    'userid': _0x51c1c9.userid,
                                    'extra': _0x51c1c9.extra,
                                    'mediaElement': _0x51c1c9.streamEvents[_0x46fab4.streamid] ? _0x51c1c9.streamEvents[_0x46fab4.streamid].mediaElement : null
                                }), _0x3cea1b && _0x51c1c9.peers[_0x521a09.userid]) {
                                var _0x38a800 = _0x51c1c9.peers[_0x521a09.userid].peer;
                                _0x21b268 = [];
                                _0x38a800.getRemoteStreams().forEach(function(_0x59d565) {
                                    _0x59d565.id != _0x46fab4.id && _0x21b268.push(_0x59d565);
                                }), _0x51c1c9.peers[_0x521a09.userid].streams = _0x21b268;
                            }
                            _0x521a09.userid === _0x51c1c9.userid && 'remote' === _0x521a09.type || (_0x51c1c9.peersBackup[_0x521a09.userid] && (_0x521a09.extra = _0x51c1c9.peersBackup[_0x521a09.userid].extra), _0x51c1c9.onstreamended(_0x521a09), delete _0x51c1c9.streamEvents[_0x46fab4.streamid]);
                        }, !0x1);
                    }
                }, _0x51c1c9.onMediaError = function(_0x77c67c, _0x3533b2) {
                    _0x51c1c9.enableLogs && console.error(_0x77c67c, _0x3533b2);
                }, _0x51c1c9.autoCloseEntireSession = !0x1, _0x51c1c9.filesContainer = _0x51c1c9.videosContainer = document.body || document.documentElement, _0x51c1c9.isInitiator = !0x1, _0x51c1c9.shareFile = _0x21b268.shareFile, void 0x0 !== _0x2cf1f3 && _0x2cf1f3.handle(_0x51c1c9), void 0x0 !== _0x400337 && _0x400337.handle(_0x51c1c9), _0x51c1c9.token = _0x5b8d5d, _0x51c1c9.onNewParticipant = function(_0xeb9f65, _0xbff370) {
                    _0x51c1c9.acceptParticipationRequest(_0xeb9f65, _0xbff370);
                }, _0x51c1c9.acceptParticipationRequest = function(_0xdc5fa8, _0x444726) {
                    _0x444726.successCallback && (_0x444726.successCallback(), delete _0x444726.successCallback), _0x21b268.createNewPeer(_0xdc5fa8, _0x444726);
                }, void 0x0 !== _0x25e82e && (_0x51c1c9.StreamsHandler = _0x25e82e), _0x51c1c9.onleave = function(_0x256c0a) {}, _0x51c1c9.invokeSelectFileDialog = function(_0x54e1d5) {
                    var _0x326931 = new _0x2e28ea();
                    _0x326931.accept = '*.*', _0x326931.selectSingleFile(_0x54e1d5);
                }, _0x51c1c9.onmute = function(_0x4cea9f) {
                    if (_0x4cea9f && _0x4cea9f.mediaElement)
                        if ('both' === _0x4cea9f.muteType || 'video' === _0x4cea9f.muteType) {
                            _0x4cea9f.mediaElement.src = null;
                            var _0x326931 = _0x4cea9f.mediaElement.pause();
                            void 0x0 !== _0x326931 ? _0x326931.then(function() {
                                _0x4cea9f.mediaElement.poster = _0x4cea9f.snapshot || 'https://cdn.webrtc-experiment.com/images/muted.png';
                            }) : _0x4cea9f.mediaElement.poster = _0x4cea9f.snapshot || 'https://cdn.webrtc-experiment.com/images/muted.png';
                        } else 'audio' === _0x4cea9f.muteType && (_0x4cea9f.mediaElement.muted = true);
                }, _0x51c1c9.onunmute = function(_0x59c1a4) {
                    _0x59c1a4 && _0x59c1a4.mediaElement && _0x59c1a4.stream && ('both' === _0x59c1a4.unmuteType || 'video' === _0x59c1a4.unmuteType ? (_0x59c1a4.mediaElement.poster = null, _0x59c1a4.mediaElement.srcObject = _0x59c1a4.stream, _0x59c1a4.mediaElement.play()) : 'audio' === _0x59c1a4.unmuteType && (_0x59c1a4.mediaElement.muted = !0x1));
                }, _0x51c1c9.onExtraDataUpdated = function(_0x429b15) {
                    _0x429b15.status = 'online', _0x51c1c9.onUserStatusChanged(_0x429b15, true);
                }, _0x51c1c9.getAllParticipants = function(_0x57626c) {
                    return _0x51c1c9.peers.getAllParticipants(_0x57626c);
                }, void 0x0 !== _0x25e82e && (_0x25e82e.onSyncNeeded = function(_0x45be06, _0x6b0c44, _0xe6bdb1) {
                    _0x51c1c9.peers.getAllParticipants().forEach(function(_0x26b256) {
                        _0x21b268.onNegotiationNeeded({
                            'streamid': _0x45be06,
                            'action': _0x6b0c44,
                            'streamSyncNeeded': true,
                            'type': _0xe6bdb1 || 'both'
                        }, _0x26b256);
                    });
                }), _0x51c1c9.connectSocket = function(_0x5d44b4) {
                    _0x2db9d8(_0x5d44b4);
                }, _0x51c1c9.closeSocket = function() {
                    try {
                        _0x31267b.a.sockets = {};
                    } catch (_0x3aa9a3) {}
                    _0x51c1c9.socket && ('function' == typeof _0x51c1c9.socket.disconnect && _0x51c1c9.socket.disconnect(), 'function' == typeof _0x51c1c9.socket.resetProps && _0x51c1c9.socket.resetProps(), _0x51c1c9.socket = null);
                }, _0x51c1c9.getSocket = function(_0x456c98) {
                    return !_0x456c98 && _0x51c1c9.enableLogs && console.warn('getSocket.callback paramter is required.'), _0x456c98 = _0x456c98 || function() {}, _0x51c1c9.socket ? _0x456c98(_0x51c1c9.socket) : _0x2db9d8(function() {
                        _0x456c98(_0x51c1c9.socket);
                    }), _0x51c1c9.socket;
                }, _0x51c1c9.getRemoteStreams = _0x21b268.getRemoteStreams;
                var _0x521c36 = ['selectFirst', 'selectAll', 'forEach'];
                if (_0x51c1c9.streamEvents = {
                        'selectFirst': function(_0x38ce07) {
                            return _0x51c1c9.streamEvents.selectAll(_0x38ce07)[0x0];
                        },
                        'selectAll': function(_0x4b13fa) {
                            _0x4b13fa || (_0x4b13fa = {
                                'local': true,
                                'remote': true,
                                'isScreen': true,
                                'isAudio': true,
                                'isVideo': true
                            }), 'local' == _0x4b13fa && (_0x4b13fa = {
                                'local': true
                            }), 'remote' == _0x4b13fa && (_0x4b13fa = {
                                'remote': true
                            }), 'screen' == _0x4b13fa && (_0x4b13fa = {
                                'isScreen': true
                            }), 'audio' == _0x4b13fa && (_0x4b13fa = {
                                'isAudio': true
                            }), 'video' == _0x4b13fa && (_0x4b13fa = {
                                'isVideo': true
                            });
                            var _0x326931 = [];
                            return Object.keys(_0x51c1c9.streamEvents).forEach(function(_0x59aced) {
                                var _0x521a09 = _0x51c1c9.streamEvents[_0x59aced];
                                if (-0x1 === _0x521c36.indexOf(_0x59aced)) {
                                    var _0x293b8c = true;
                                    _0x4b13fa.local && 'local' === _0x521a09.type && (_0x293b8c = !0x1), _0x4b13fa.remote && 'remote' === _0x521a09.type && (_0x293b8c = !0x1), _0x4b13fa.isScreen && _0x521a09.stream.isScreen && (_0x293b8c = !0x1), _0x4b13fa.isVideo && _0x521a09.stream.isVideo && (_0x293b8c = !0x1), _0x4b13fa.isAudio && _0x521a09.stream.isAudio && (_0x293b8c = !0x1), _0x4b13fa.userid && _0x521a09.userid === _0x4b13fa.userid && (_0x293b8c = !0x1), !0x1 === _0x293b8c && _0x326931.push(_0x521a09);
                                }
                            }), _0x326931;
                        }
                    }, _0x51c1c9.socketURL = '/', _0x51c1c9.socketMessageEvent = 'RTCMultiConnection-Message', _0x51c1c9.socketCustomEvent = 'RTCMultiConnection-Custom-Message', _0x51c1c9.DetectRTC = DetectRTC, _0x51c1c9.setCustomSocketEvent = function(_0x1a650b) {
                        _0x1a650b && (_0x51c1c9.socketCustomEvent = _0x1a650b), _0x51c1c9.socket && _0x51c1c9.socket.emit('set-custom-socket-event-listener', _0x51c1c9.socketCustomEvent);
                    }, _0x51c1c9.getNumberOfBroadcastViewers = function(_0x2acdba, _0x377d0c) {
                        _0x51c1c9.socket && _0x2acdba && _0x377d0c && _0x51c1c9.socket.emit('get-number-of-users-in-specific-broadcast', _0x2acdba, _0x377d0c);
                    }, _0x51c1c9.onNumberOfBroadcastViewersUpdated = function(_0x617e81) {
                        _0x51c1c9.enableLogs && _0x51c1c9.isInitiator && console.info('Number of broadcast (', _0x617e81.broadcastId, ') viewers', _0x617e81.numberOfBroadcastViewers);
                    }, _0x51c1c9.onUserStatusChanged = function(_0x49e25f, _0x405028) {
                        _0x51c1c9.enableLogs && !_0x405028 && console.info(_0x49e25f.userid, _0x49e25f.status);
                    }, _0x51c1c9.getUserMediaHandler = _0x5adfda, _0x51c1c9.multiPeersHandler = _0x21b268, _0x51c1c9.enableLogs = true, _0x51c1c9.setCustomSocketHandler = function(_0x5840b1) {
                        void 0x0 !== _0x45c30f && (_0x45c30f = _0x5840b1);
                    }, _0x51c1c9.chunkSize = 0x9c40, _0x51c1c9.maxParticipantsAllowed = 0x3e8, _0x51c1c9.disconnectWith = _0x21b268.disconnectWith, _0x51c1c9.checkPresence = function(_0x2c66c1, _0xdf4545) {
                        _0x2c66c1 = _0x2c66c1 || _0x51c1c9.sessionid, 'SSEConnection' !== _0x45c30f.name ? _0x51c1c9.socket ? _0x51c1c9.socket.emit('check-presence', _0x2c66c1 + '', function(_0x4d585b, _0xfb6315, _0x414b29) {
                            _0x51c1c9.enableLogs && console.log('checkPresence.isRoomExist: ', _0x4d585b, ' roomid: ', _0xfb6315), _0xdf4545(_0x4d585b, _0xfb6315, _0x414b29);
                        }) : _0x51c1c9.connectSocket(function() {
                            _0x51c1c9.checkPresence(_0x2c66c1, _0xdf4545);
                        }) : SSEConnection.checkPresence(_0x2c66c1, function(_0x2d2553, _0x169410, _0x48e686) {
                            if (!_0x51c1c9.socket) return _0x2d2553 || (_0x51c1c9.userid = _0x169410), void _0x51c1c9.connectSocket(function() {
                                _0xdf4545(_0x2d2553, _0x169410, _0x48e686);
                            });
                            _0xdf4545(_0x2d2553, _0x169410);
                        });
                    }, _0x51c1c9.onReadyForOffer = function(_0x3f207b, _0x32ccc2) {
                        _0x51c1c9.multiPeersHandler.createNewPeer(_0x3f207b, _0x32ccc2);
                    }, _0x51c1c9.setUserPreferences = function(_0x371937) {
                        return _0x51c1c9.dontAttachStream && (_0x371937.dontAttachLocalStream = true), _0x51c1c9.dontGetRemoteStream && (_0x371937.dontGetRemoteStream = true), _0x371937;
                    }, _0x51c1c9.updateExtraData = function() {
                        _0x51c1c9.socket.emit('extra-data-updated', _0x51c1c9.extra);
                    }, _0x51c1c9.enableScalableBroadcast = !0x1, _0x51c1c9.maxRelayLimitPerUser = 0x3, _0x51c1c9.dontCaptureUserMedia = !0x1, _0x51c1c9.dontAttachStream = !0x1, _0x51c1c9.dontGetRemoteStream = !0x1, _0x51c1c9.onReConnecting = function(_0x4ffc93) {
                        _0x51c1c9.enableLogs && console.info('ReConnecting with', _0x4ffc93.userid, '...');
                    }, _0x51c1c9.beforeAddingStream = function(_0xdd57a4) {
                        return _0xdd57a4;
                    }, _0x51c1c9.beforeRemovingStream = function(_0x191d70) {
                        return _0x191d70;
                    }, _0x51c1c9.checkIfChromeExtensionAvailable = _0x53da88, 'undefined' != typeof isFirefoxExtensionAvailable && (_0x51c1c9.checkIfChromeExtensionAvailable = isFirefoxExtensionAvailable), _0x51c1c9.getChromeExtensionStatus = _0x1f670d, _0x51c1c9.getScreenConstraints = function(_0x3b0f5e, _0x32535a) {
                        _0x93df62(_0x51c1c9, _0x32535a) && (_0x32535a = true), _0x1c050b(function(_0x19ad7c, _0x5c7f16) {
                            _0x19ad7c || (_0x5c7f16 = _0x51c1c9.modifyScreenConstraints(_0x5c7f16), _0x3b0f5e(_0x19ad7c, _0x5c7f16));
                        }, _0x32535a);
                    }, _0x51c1c9.modifyScreenConstraints = function(_0x13a10e) {
                        return _0x13a10e;
                    }, _0x51c1c9.onPeerStateChanged = function(_0x5d030a) {
                        _0x51c1c9.enableLogs && -0x1 !== _0x5d030a.iceConnectionState.search(/closed|failed/gi) && console.error('Peer connection is closed between you & ', _0x5d030a.userid, _0x5d030a.extra, 'state:', _0x5d030a.iceConnectionState);
                    }, _0x51c1c9.isOnline = true, _0x1cbceb('online', function() {
                        _0x51c1c9.isOnline = true;
                    }), _0x1cbceb('offline', function() {
                        _0x51c1c9.isOnline = !0x1;
                    }), _0x51c1c9.isLowBandwidth = !0x1, navigator && navigator.connection && navigator.connection.type && (_0x51c1c9.isLowBandwidth = -0x1 !== navigator.connection.type.toString().toLowerCase().search(/wifi|cell/g), _0x51c1c9.isLowBandwidth)) {
                    if (_0x51c1c9.bandwidth = {
                            'audio': !0x1,
                            'video': !0x1,
                            'screen': !0x1
                        }, _0x51c1c9.mediaConstraints.audio && _0x51c1c9.mediaConstraints.audio.optional && _0x51c1c9.mediaConstraints.audio.optional.length) {
                        var _0x4c7586 = [];
                        _0x51c1c9.mediaConstraints.audio.optional.forEach(function(_0x330c5b) {
                            void 0x0 === _0x330c5b.bandwidth && _0x4c7586.push(_0x330c5b);
                        }), _0x51c1c9.mediaConstraints.audio.optional = _0x4c7586;
                    }
                    if (_0x51c1c9.mediaConstraints.video && _0x51c1c9.mediaConstraints.video.optional && _0x51c1c9.mediaConstraints.video.optional.length) {
                        _0x4c7586 = [];
                        _0x51c1c9.mediaConstraints.video.optional.forEach(function(_0x427f57) {
                            void 0x0 === _0x427f57.bandwidth && _0x4c7586.push(_0x427f57);
                        }), _0x51c1c9.mediaConstraints.video.optional = _0x4c7586;
                    }
                }
                _0x51c1c9.getExtraData = function(_0xeb7d85, _0x11bbdf) {
                    if (!_0xeb7d85) throw 'remoteUserId is required.';
                    if (!_0x11bbdf) return _0x51c1c9.peers[_0xeb7d85] ? _0x51c1c9.peers[_0xeb7d85].extra : _0x51c1c9.peersBackup[_0xeb7d85] ? _0x51c1c9.peersBackup[_0xeb7d85].extra : {};
                    _0x51c1c9.socket.emit('get-remote-user-extra-data', _0xeb7d85, function(_0x2b3ef8, _0x272a14, _0x50b4c5) {
                        _0x11bbdf(_0x2b3ef8, _0x272a14, _0x50b4c5);
                    });
                }, _0x326931.autoOpenOrJoin && _0x51c1c9.openOrJoin(_0x51c1c9.sessionid), _0x51c1c9.onUserIdAlreadyTaken = function(_0x375333, _0x594a1c) {
                    _0x51c1c9.close(), _0x51c1c9.closeSocket(), _0x51c1c9.isInitiator = !0x1, _0x51c1c9.userid = _0x51c1c9.token(), _0x51c1c9.join(_0x51c1c9.sessionid), _0x51c1c9.enableLogs && console.warn('Userid already taken.', _0x375333, 'Your new userid:', _0x51c1c9.userid);
                }, _0x51c1c9.trickleIce = true, _0x51c1c9.version = '3.6.5', _0x51c1c9.onSettingLocalDescription = function(_0x5cd808) {
                    _0x51c1c9.enableLogs && console.info('Set local description for remote user', _0x5cd808.userid);
                }, _0x51c1c9.resetScreen = function() {
                    _0x427b66 = null, DetectRTC && DetectRTC.screen && delete DetectRTC.screen.sourceId, currentUserMediaRequest = {
                        'streams': [],
                        'mutex': !0x1,
                        'queueRequests': []
                    };
                }, _0x51c1c9.autoCreateMediaElement = true, _0x51c1c9.password = null, _0x51c1c9.setPassword = function(_0x3fec38, _0x196913) {
                    _0x196913 = _0x196913 || function() {}, _0x51c1c9.socket ? _0x51c1c9.socket.emit('set-password', _0x3fec38, _0x196913) : (_0x51c1c9.password = _0x3fec38, _0x196913(true, _0x51c1c9.sessionid, null));
                }, _0x51c1c9.errors = {
                    'ROOM_NOT_AVAILABLE': 'Room not available',
                    'INVALID_PASSWORD': 'Invalid password',
                    'USERID_NOT_AVAILABLE': 'User ID does not exist',
                    'ROOM_PERMISSION_DENIED': 'Room permission denied',
                    'ROOM_FULL': 'Room full',
                    'DID_NOT_JOIN_ANY_ROOM': 'Did not join any room yet',
                    'INVALID_SOCKET': 'Invalid socket',
                    'PUBLIC_IDENTIFIER_MISSING': 'publicRoomIdentifier is required',
                    'INVALID_ADMIN_CREDENTIAL': 'Invalid username or password attempted'
                };
            }(this);
        };
    }.call(this, _0x2fa590(0x49).Buffer, _0x2fa590(0x1f), _0x2fa590(0x31)));
}, window.EJS_main]).default;
