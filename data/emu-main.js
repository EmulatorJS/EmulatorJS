window.EJS_main = function(_0xa88a13, _0x17edbf, _0x2c1832) {
    'use strict';
    window.EJS_RESET_VARS = [];
    for (var k in window) {
        window.EJS_RESET_VARS.push(k);
    }
    _0x2c1832.r(_0x17edbf);
    _0x2c1832(0xa2), _0x2c1832(0x16c), _0x2c1832(0x16d);
    var _0x39ca5e = {
            'volume': 0.5,
            'muted': false,
            'i18n': {
                'restart': 'Restart',
                'play': 'Play',
                'pause': 'Pause',
                'played': 'Played',
                'volume': 'Volume',
                'mute': 'Mute (F9)',
                'unmute': 'Unmute (F9)',
                'enterFullscreen': 'Enter fullscreen',
                'exitFullscreen': 'Exit fullscreen',
                'settings': 'Settings',
                'saveState': 'Save State (Shift + F2)',
                'loadState': 'Load State (Shift + F4)',
                'screenRecord': 'Start Screen Recording',
                'netplay': 'Netplay',
                'gamepad': 'Control Settings',
                'cheat': 'Cheats',
                'menuBack': 'Go back to previous menu',
                'normal': 'Normal',
                'all': 'All',
                'reset': 'Reset',
                'disabled': 'Disabled',
                'enabled': 'Enabled',
                'playNow': 'Play Now'
            },
            'listeners': {
                'play': null,
                'pause': null,
                'restart': null,
                'rewind': null,
                'mute': null,
                'volume': null,
                'fullscreen': null
            },
            'events': ['ready'],
            'selectors': {
                'editable': 'input, textarea, select, [contenteditable]',
                'container': '.ejs',
                'controls': {
                    'container': null,
                    'wrapper': '.jes__controls'
                },
                'buttons': {
                    'play': '[data-btn="play"]',
                    'pause': '[data-btn="pause"]',
                    'mute': '[data-btn="mute"]',
                    'fullscreen': '[data-btn="fullscreen"]',
                    'settings': '[data-btn="settings"]',
                    'saveState': '[data-btn="save-state"]',
                    'loadState': '[data-btn="load-state"]',
                    'screenRecord': '[data-btn="screen-record"]',
                    'gamepad': '[data-btn="gamepad"]',
                    'netplay': '[data-btn="netplay"]',
                    'cheat': '[data-btn="cheat"]'
                },
                'inputs': {
                    'volume': '[data-range="volume"]'
                }
            },
            'classNames': {
                'type': 'ejs--video',
                'video': 'ejs__video-wrapper',
                'poster': 'ejs__poster',
                'posterEnabled': 'ejs__poster-enabled',
                'control': 'ejs__control',
                'controlPressed': 'ejs__control--pressed',
                'playing': 'ejs--playing',
                'paused': 'ejs--paused',
                'stopped': 'ejs--stopped',
                'loading': 'ejs--loading',
                'hover': 'ejs--hover',
                'tooltip': 'ejs__tooltip',
                'hidden': 'ejs__sr-only',
                'hideControls': 'ejs--hide-controls',
                'isIos': 'ejs--is-ios',
                'isTouch': 'ejs--is-touch',
                'uiSupported': 'ejs--full-ui',
                'noTransition': 'ejs--no-transition',
                'menu': {
                    'value': 'ejs__menu__value',
                    'badge': 'ejs__badge',
                    'open': 'ejs--menu-open'
                },
                'fullscreen': {
                    'enabled': 'ejs--fullscreen-enabled',
                    'fallback': 'ejs--fullscreen-fallback'
                },
                'tabFocus': 'ejs__tab-focus'
            }
        },
        _0x3d61f9 = _0x2c1832(0x38),
        _0x5127f4 = _0x2c1832(0x9d),
        _0x48e5ff = _0x2c1832.n(_0x5127f4),
        _0x406e79 = function(_0x2aa74f) {
            return null != _0x2aa74f ? _0x2aa74f.constructor : null;
        },
        _0x1b0c2c = function(_0x8ec039, _0x1cb5ff) {
            return Boolean(_0x8ec039 && _0x1cb5ff && _0x8ec039 instanceof _0x1cb5ff);
        },
        _0x19f739 = function(_0x3e8e1f) {
            return null == _0x3e8e1f;
        },
        _0x4fc5a1 = function(_0x37a418) {
            return _0x406e79(_0x37a418) === Object;
        },
        _0x34f3e8 = function(_0x2d2e5c) {
            return _0x406e79(_0x2d2e5c) === String;
        },
        _0x1ca546 = function(_0x4d698f) {
            return Array.isArray(_0x4d698f);
        },
        _0x37cc52 = function(_0x3a8b14) {
            return _0x1b0c2c(_0x3a8b14, NodeList);
        },
        _0x555ee8 = function(_0x1fde53) {
            return _0x19f739(_0x1fde53) || (_0x34f3e8(_0x1fde53) || _0x1ca546(_0x1fde53) || _0x37cc52(_0x1fde53)) && !_0x1fde53.length || _0x4fc5a1(_0x1fde53) && !Object.keys(_0x1fde53).length;
        },
        _0x1e2c68 = {
            'nullOrUndefined': _0x19f739,
            'object': _0x4fc5a1,
            'number': function(_0x1d08d4) {
                return _0x406e79(_0x1d08d4) === Number && !Number.isNaN(_0x1d08d4);
            },
            'string': _0x34f3e8,
            'boolean': function(_0x340d71) {
                return _0x406e79(_0x340d71) === Boolean;
            },
            'function': function(_0x10f562) {
                return _0x406e79(_0x10f562) === Function;
            },
            'array': _0x1ca546,
            'weakMap': function(_0x70b79f) {
                return _0x1b0c2c(_0x70b79f, WeakMap);
            },
            'nodeList': _0x37cc52,
            'element': function(_0xc21062) {
                return _0x1b0c2c(_0xc21062, Element);
            },
            'textNode': function(_0x3e6b67) {
                return _0x406e79(_0x3e6b67) === Text;
            },
            'event': function(_0x247601) {
                return _0x1b0c2c(_0x247601, Event);
            },
            'keyboardEvent': function(_0x2b3224) {
                return _0x1b0c2c(_0x2b3224, KeyboardEvent);
            },
            'cue': function(_0x57ee67) {
                return _0x1b0c2c(_0x57ee67, window.TextTrackCue) || _0x1b0c2c(_0x57ee67, window.VTTCue);
            },
            'track': function(_0x23318b) {
                return _0x1b0c2c(_0x23318b, TextTrack) || !_0x19f739(_0x23318b) && _0x34f3e8(_0x23318b.kind);
            },
            'url': function(_0xd61cf4) {
                if (_0x1b0c2c(_0xd61cf4, window.URL)) return true;
                var _0x17edbf = _0xd61cf4;
                _0xd61cf4.startsWith('http://') && _0xd61cf4.startsWith('https://') || (_0x17edbf = 'http://' .concat(_0xd61cf4));
                try {
                    return !_0x555ee8(new URL(_0x17edbf).hostname);
                } catch (_0x5e6cd2) {
                    return !0x1;
                }
            },
            'empty': _0x555ee8
        },
        _0x168698 = function() {
            var _0xa88a13 = !0x1;
            try {
                var _0x17edbf = Object.defineProperty({}, 'passive', {
                    'get': function() {
                        return _0xa88a13 = true, null;
                    }
                });
                window.addEventListener('test', null, _0x17edbf), window.removeEventListener('test', null, _0x17edbf);
            } catch (_0x1db3b5) {}
            return _0xa88a13;
        }();

    function _0x1ef215(_0xa482e6, _0x474854, _0xc30d6e) {
        var _0x57056f = this,
            _0x3f468e = arguments.length > 0x3 && void 0x0 !== arguments[0x3] && arguments[0x3],
            _0x79ce58 = !(arguments.length > 0x4 && void 0x0 !== arguments[0x4]) || arguments[0x4],
            _0x23848b = arguments.length > 0x5 && void 0x0 !== arguments[0x5] && arguments[0x5];
        if (_0xa482e6 && 'addEventListener' in _0xa482e6 && !_0x1e2c68.empty(_0x474854) && _0x1e2c68.function(_0xc30d6e)) {
            var _0x4a2da0 = _0x474854.split(' '),
                _0x40de8d = _0x23848b;
            _0x168698 && (_0x40de8d = {
                'passive': _0x79ce58,
                'capture': _0x23848b
            }), _0x4a2da0.forEach(function(_0x487d3c) {
                _0x57056f && _0x57056f.eventListeners && _0x3f468e && _0x57056f.eventListeners.push({
                    'element': _0xa482e6,
                    'type': _0x487d3c,
                    'callback': _0xc30d6e,
                    'options': _0x40de8d
                }), _0xa482e6[_0x3f468e ? 'addEventListener' : 'removeEventListener'](_0x487d3c, _0xc30d6e, _0x40de8d);
            });
        }
    }

    function _0x1093f4(_0x4d8d94) {
        var _0x17edbf = arguments.length > 0x1 && void 0x0 !== arguments[0x1] ? arguments[0x1] : '',
            _0x2c1832 = arguments.length > 0x2 ? arguments[0x2] : void 0x0,
            _0x4adcdf = !(arguments.length > 0x3 && void 0x0 !== arguments[0x3]) || arguments[0x3],
            _0x2f85bc = arguments.length > 0x4 && void 0x0 !== arguments[0x4] && arguments[0x4];
        _0x1ef215.call(this, _0x4d8d94, _0x17edbf, _0x2c1832, true, _0x4adcdf, _0x2f85bc);
    }

    function _0x20109b(_0x550b1a) {
        var _0x17edbf = arguments.length > 0x1 && void 0x0 !== arguments[0x1] ? arguments[0x1] : '',
            _0x2c1832 = arguments.length > 0x2 ? arguments[0x2] : void 0x0,
            _0x5e10a2 = !(arguments.length > 0x3 && void 0x0 !== arguments[0x3]) || arguments[0x3],
            _0x5c9512 = arguments.length > 0x4 && void 0x0 !== arguments[0x4] && arguments[0x4];
        _0x1ef215.call(this, _0x550b1a, _0x17edbf, _0x2c1832, !0x1, _0x5e10a2, _0x5c9512);
    }

    function _0x455c85(_0x4e4b15) {
        var _0x17edbf = arguments.length > 0x1 && void 0x0 !== arguments[0x1] ? arguments[0x1] : '',
            _0x2c1832 = arguments.length > 0x2 ? arguments[0x2] : void 0x0,
            _0x2b8c91 = !(arguments.length > 0x3 && void 0x0 !== arguments[0x3]) || arguments[0x3],
            _0x23e991 = arguments.length > 0x4 && void 0x0 !== arguments[0x4] && arguments[0x4];
        _0x1ef215.call(this, _0x4e4b15, _0x17edbf, function _0x5127f4() {
            _0x20109b(_0x4e4b15, _0x17edbf, _0x5127f4, _0x2b8c91, _0x23e991);
            for (var _0x1fe440 = arguments.length, _0x1d3219 = new Array(_0x1fe440), _0x54457c = 0x0; _0x54457c < _0x1fe440; _0x54457c++) _0x1d3219[_0x54457c] = arguments[_0x54457c];
            _0x2c1832.apply(this, _0x1d3219);
        }, true, _0x2b8c91, _0x23e991);
    }

    function _0xbae705(_0x975ccc) {
        var _0x17edbf = arguments.length > 0x1 && void 0x0 !== arguments[0x1] ? arguments[0x1] : '',
            _0x2c1832 = arguments.length > 0x2 && void 0x0 !== arguments[0x2] && arguments[0x2],
            _0x57297b = arguments.length > 0x3 && void 0x0 !== arguments[0x3] ? arguments[0x3] : {};
        if (_0x1e2c68.element(_0x975ccc) && !_0x1e2c68.empty(_0x17edbf)) {
            var _0x4f631e = new CustomEvent(_0x17edbf, {
                'bubbles': _0x2c1832,
                'detail': Object.assign({}, _0x57297b, {
                    'emulator': this
                })
            });
            _0x975ccc.dispatchEvent(_0x4f631e);
        }
    }
    var _0x55349e = _0x2c1832(0x9e),
        _0x42870c = _0x2c1832.n(_0x55349e);

    function _0x30f85e(_0x3ed035, _0xd96db3) {
        return function(_0x18bbf3) {
            if (Array.isArray(_0x18bbf3)) return _0x18bbf3;
        }(_0x3ed035) || function(_0x2bb2ab, _0x4993ee) {
            var _0x2c1832 = [],
                _0x629f39 = true,
                _0xde5653 = !0x1,
                _0x346a0d = void 0x0;
            try {
                for (var _0x57d79d, _0x557ef0 = _0x2bb2ab[Symbol.iterator](); !(_0x629f39 = (_0x57d79d = _0x557ef0.next()).done) && (_0x2c1832.push(_0x57d79d.value), !_0x4993ee || _0x2c1832.length !== _0x4993ee); _0x629f39 = true);
            } catch (_0x54a546) {
                _0xde5653 = true, _0x346a0d = _0x54a546;
            } finally {
                try {
                    _0x629f39 || null == _0x557ef0.return || _0x557ef0.return();
                } finally {
                    if (_0xde5653) throw _0x346a0d;
                }
            }
            return _0x2c1832;
        }(_0x3ed035, _0xd96db3) || function() {
            throw new TypeError('Invalid attempt to destructure non-iterable instance');
        }();
    }

    function _0x580edd(_0x39eb34, _0x86c3db) {
        var _0x2c1832 = _0x39eb34.length ? _0x39eb34 : [_0x39eb34];
        Array.from(_0x2c1832).reverse().forEach(function(_0x35fc48, _0x79e6bf) {
            var _0x1510e4 = _0x79e6bf > 0x0 ? _0x86c3db.cloneNode(true) : _0x86c3db,
                _0x247f26 = _0x35fc48.parentNode,
                _0x3a5422 = _0x35fc48.nextSibling;
            _0x1510e4.appendChild(_0x35fc48), _0x3a5422 ? _0x247f26.insertBefore(_0x1510e4, _0x3a5422) : _0x247f26.appendChild(_0x1510e4);
        });
    }

    function _0x154f99(_0x5e4eb3, _0x1acdad) {
        _0x1e2c68.element(_0x5e4eb3) && !_0x1e2c68.empty(_0x1acdad) && Object.entries(_0x1acdad).filter(function(_0x37e04b) {
            var _0x1acdad = _0x30f85e(_0x37e04b, 0x2)[0x1];
            return !_0x1e2c68.nullOrUndefined(_0x1acdad);
        }).forEach(function(_0x4993dd) {
            var _0x2c1832 = _0x30f85e(_0x4993dd, 0x2),
                _0x24704f = _0x2c1832[0x0],
                _0x52ac21 = _0x2c1832[0x1];
            return _0x5e4eb3.setAttribute(_0x24704f, _0x52ac21);
        });
    }

    function _0x428003(_0x1397c4, _0x1ec8c9, _0x1a02af) {
        var _0xca6ad9 = document.createElement(_0x1397c4);
        return _0x1e2c68.object(_0x1ec8c9) && _0x154f99(_0xca6ad9, _0x1ec8c9), _0x1e2c68.string(_0x1a02af) && (_0xca6ad9.innerText = _0x1a02af), _0xca6ad9;
    }

    function _0x12a55d(_0x27d9d8) {
        _0x1e2c68.nodeList(_0x27d9d8) || _0x1e2c68.array(_0x27d9d8) ? Array.from(_0x27d9d8).forEach(_0x12a55d) : _0x1e2c68.element(_0x27d9d8) && _0x1e2c68.element(_0x27d9d8.parentNode) && _0x27d9d8.parentNode.removeChild(_0x27d9d8);
    }

    function _0xa949a8(_0x3bc809, _0x215e7f) {
        if (!_0x1e2c68.string(_0x3bc809) || _0x1e2c68.empty(_0x3bc809)) return {};
        var _0x2c1832 = {},
            _0x3ab896 = _0x215e7f;
        return _0x3bc809.split(',').forEach(function(_0x2b6c5b) {
            var _0x215e7f = _0x2b6c5b.trim(),
                _0x2b2f76 = _0x215e7f.replace('.', ''),
                _0x499377 = _0x215e7f.replace(/[[\]]/g, '').split('='),
                _0x1db3b8 = _0x499377[0x0],
                _0x520bcf = _0x499377.length > 0x1 ? _0x499377[0x1].replace(/["']/g, '') : '';
            switch (_0x215e7f.charAt(0x0)) {
                case '.':
                    _0x1e2c68.object(_0x3ab896) && _0x1e2c68.string(_0x3ab896.class) && (_0x3ab896.class += ' ' .concat(_0x2b2f76)), _0x2c1832.class = _0x2b2f76;
                    break;
                case '#':
                    _0x2c1832.id = _0x215e7f.replace('#', '');
                    break;
                case '[':
                    _0x2c1832[_0x1db3b8] = _0x520bcf;
            }
        }), _0x2c1832;
    }

    function _0x132da7(_0x275729, _0x511d6f) {
        if (_0x1e2c68.element(_0x275729)) {
            var _0x2c1832 = _0x511d6f;
            _0x1e2c68.boolean(_0x2c1832) || (_0x2c1832 = !_0x275729.hidden), _0x2c1832 ? _0x275729.setAttribute('hidden', '') : _0x275729.removeAttribute('hidden');
        }
    }

    function _0x3a8e2f(_0x2bf197, _0x46e2bb, _0x3b6b0b) {
        if (_0x1e2c68.nodeList(_0x2bf197)) return Array.from(_0x2bf197).map(function(_0x543362) {
            return _0x3a8e2f(_0x543362, _0x46e2bb, _0x3b6b0b);
        });
        if (_0x1e2c68.element(_0x2bf197)) {
            var _0x34f25e = 'toggle';
            return void 0x0 !== _0x3b6b0b && (_0x34f25e = _0x3b6b0b ? 'add' : 'remove'), _0x2bf197.classList[_0x34f25e](_0x46e2bb), _0x2bf197.classList.contains(_0x46e2bb);
        }
        return !0x1;
    }

    function _0x350d73(_0x273517, _0x36ffc8) {
        return _0x1e2c68.element(_0x273517) && _0x273517.classList.contains(_0x36ffc8);
    }

    function _0x13f491(_0x11bf98, _0x674fa2) {
        var _0x2c1832 = {
            'Element': Element
        };
        return (_0x2c1832.matches || _0x2c1832.webkitMatchesSelector || _0x2c1832.mozMatchesSelector || _0x2c1832.msMatchesSelector || function() {
            return Array.from(document.querySelectorAll(_0x674fa2)).includes(this);
        }).call(_0x11bf98, _0x674fa2);
    }

    function _0x23ffa1(_0x16eec8) {
        return this.elements.container.querySelectorAll(_0x16eec8);
    }

    function _0x530042(_0xbc0da2) {
        return this.elements.container.querySelector(_0xbc0da2);
    }

    function _0x5e0c7d() {
        var _0xa88a13 = arguments.length > 0x0 && void 0x0 !== arguments[0x0] ? arguments[0x0] : null,
            _0x17edbf = arguments.length > 0x1 && void 0x0 !== arguments[0x1] && arguments[0x1];
        if (_0x1e2c68.element(_0xa88a13)) {
            var _0x2c1832 = _0x23ffa1.call(this, 'button:not(:disabled), input:not(:disabled), [tabindex]'),
                _0x1c6631 = _0x2c1832[0x0],
                _0x52c9df = _0x2c1832[_0x2c1832.length - 0x1];
            _0x1ef215.call(this, this.elements.container, 'keydown', function(_0x1bba02) {
                if ('Tab' === _0x1bba02.key && 0x9 === _0x1bba02.keyCode) {
                    var _0x17edbf = document.activeElement;
                    _0x17edbf !== _0x52c9df || _0x1bba02.shiftKey ? _0x17edbf === _0x1c6631 && _0x1bba02.shiftKey && (_0x52c9df.focus(), _0x1bba02.preventDefault()) : (_0x1c6631.focus(), _0x1bba02.preventDefault());
                }
            }, _0x17edbf, !0x1);
        }
    }

    function _0x31cc23() {
        var _0xa88a13 = arguments.length > 0x0 && void 0x0 !== arguments[0x0] ? arguments[0x0] : null,
            _0x17edbf = arguments.length > 0x1 && void 0x0 !== arguments[0x1] && arguments[0x1];
        _0x1e2c68.element(_0xa88a13) && (_0xa88a13.focus(), _0x17edbf && _0x3a8e2f(_0xa88a13, this.config.classNames.tabFocus));
    }

    function _0x449eac(_0x589e98) {
        return _0x48e5ff.a.bind(_0x42870c.a)(_0x589e98);
    }
    var _0x32d193, _0x5f365a, _0x820caf, _0x5a2767 = (_0x32d193 = document.createElement('span'), _0x5f365a = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd otransitionend',
        'transition': 'transitionend'
    }, _0x820caf = Object.keys(_0x5f365a).find(function(_0x5bdb45) {
        return void 0x0 !== _0x32d193.style[_0x5bdb45];
    }), !!_0x1e2c68.string(_0x820caf) && _0x5f365a[_0x820caf]);

    function _0x2b30e0(_0x1fb76b) {
        setTimeout(function() {
            try {
                _0x132da7(_0x1fb76b, true), _0x1fb76b.offsetHeight, _0x132da7(_0x1fb76b, !0x1);
            } catch (_0x517747) {}
        }, 0x0);
    }
    var _0x296fa9, _0x59aa33 = {
            'isEdge': 'Netscape' === navigator.appName && navigator.appVersion.indexOf('Edge') > -0x1,
            'isIE': !!document.documentMode,
            'isWebkit': 'WebkitAppearance' in document.documentElement.style && !/Edge/ .test(navigator.userAgent),
            'isIPhone': /(iPhone|iPod)/gi .test(navigator.platform),
            'isIos': /(iPad|iPhone|iPod)/gi .test(navigator.platform),
            'info': function() {
                var _0xa88a13 = /(MSIE|(?!Gecko.+)Firefox|(?!AppleWebKit.+Chrome.+)Safari|(?!AppleWebKit.+)Chrome|AppleWebKit(?!.+Chrome|.+Safari)|Gecko(?!.+Firefox))(?: |\/)([\d\.apre]+)/ .exec(navigator.userAgent);
                return {
                    'name': _0xa88a13[0x1].toLowerCase(),
                    'version': _0xa88a13[0x2]
                };
            }
        },
        _0x2d904a = {
            'rangeInput': (_0x296fa9 = document.createElement('input'), _0x296fa9.type = 'range', 'range' === _0x296fa9.type),
            'touch': 'ontouchstart' in document.documentElement,
            'transitions': !0x1 !== _0x5a2767,
            'reducedMotion': 'matchMedia' in window && window.matchMedia('(prefers-reduced-motion)').matches,
            'webgl': function() {
                var _0xa88a13 = {
                    'DETECTED': !0x1
                };
                if (!_0xa88a13.DETECTED) {
                    var _0x17edbf = document.createElement('canvas');
                    if (_0x17edbf && _0x17edbf.getContext)
                        for (var _0x2c1832 = ['webgl2', 'experimental-webgl2', 'webgl', 'experimental-webgl'], _0x44cd27 = 0x0, _0x12b7b8 = _0x2c1832.length; _0x44cd27 < _0x12b7b8; ++_0x44cd27) {
                            var _0x11cb40 = _0x2c1832[_0x44cd27],
                                _0x26b3b2 = _0x17edbf.getContext(_0x11cb40);
                            if (_0x26b3b2) {
                                _0xa88a13.WEBGL_CONTEXT = _0x11cb40, _0xa88a13.WEBGL_VERSION = _0x26b3b2.getParameter(_0x26b3b2.VERSION), _0xa88a13.WEBGL_VENDOR = _0x26b3b2.getParameter(_0x26b3b2.VENDOR), _0xa88a13.WEBGL_SL_VERSION = _0x26b3b2.getParameter(_0x26b3b2.SHADING_LANGUAGE_VERSION), _0xa88a13.MAX_TEXTURE_SIZE = _0x26b3b2.getParameter(_0x26b3b2.MAX_TEXTURE_SIZE);
                                var _0x40c8fc = _0x26b3b2.getExtension('WEBGL_debug_renderer_info');
                                _0x40c8fc && (_0xa88a13.WEBGL_VENDOR = _0x26b3b2.getParameter(_0x40c8fc.UNMASKED_VENDOR_WEBGL), _0xa88a13.WEBGL_RENDERER = _0x26b3b2.getParameter(_0x40c8fc.UNMASKED_RENDERER_WEBGL)), _0xa88a13.DETECTED = true;
                                break;
                            }
                        }
                }
                return _0xa88a13;
            }(),
            'wasm': 'undefined' != typeof WebAssembly && _0x1e2c68.object(WebAssembly),
            'audioContext': 'undefined' != typeof AudioContext
        };
    
    function _0x55cbbe(_0x43ca9d, _0x1fbf80, _0x332d13) {
        return _0x1fbf80 in _0x43ca9d ? Object.defineProperty(_0x43ca9d, _0x1fbf80, {
            'value': _0x332d13,
            'enumerable': true,
            'configurable': true,
            'writable': true
        }) : _0x43ca9d[_0x1fbf80] = _0x332d13, _0x43ca9d;
    }

    function _0x344e81(_0xa095b0, _0x3d8795) {
        return _0x3d8795.split('.').reduce(function(_0x1a1fcd, _0x5112cd) {
            return _0x1a1fcd && _0x1a1fcd[_0x5112cd];
        }, _0xa095b0);
    }

    function _0x5dc0c0() {
        for (var _0xa88a13 = arguments.length > 0x0 && void 0x0 !== arguments[0x0] ? arguments[0x0] : {}, _0x17edbf = arguments.length, _0x2c1832 = new Array(_0x17edbf > 0x1 ? _0x17edbf - 0x1 : 0x0), _0x189546 = 0x1; _0x189546 < _0x17edbf; _0x189546++) _0x2c1832[_0x189546 - 0x1] = arguments[_0x189546];
        if (!_0x2c1832.length) return _0xa88a13;
        var _0x279e54 = _0x2c1832.shift();
        return _0x1e2c68.object(_0x279e54) ? (Object.keys(_0x279e54).forEach(function(_0x53b45a) {
            _0x1e2c68.object(_0x279e54[_0x53b45a]) ? (Object.keys(_0xa88a13).includes(_0x53b45a) || Object.assign(_0xa88a13, _0x55cbbe({}, _0x53b45a, {})), _0x5dc0c0(_0xa88a13[_0x53b45a], _0x279e54[_0x53b45a])) : Object.assign(_0xa88a13, _0x55cbbe({}, _0x53b45a, _0x279e54[_0x53b45a]));
        }), _0x5dc0c0.apply(void 0x0, [_0xa88a13].concat(_0x2c1832))) : _0xa88a13;
    }

    function _0x1a0e98() {
        var _0xa88a13 = arguments.length > 0x0 && void 0x0 !== arguments[0x0] ? arguments[0x0] : '',
            _0x17edbf = arguments.length > 0x1 && void 0x0 !== arguments[0x1] ? arguments[0x1] : '',
            _0x2c1832 = arguments.length > 0x2 && void 0x0 !== arguments[0x2] ? arguments[0x2] : '';
        return _0xa88a13.replace(new RegExp(_0x17edbf.toString().replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\x5c$1'), 'g'), _0x2c1832.toString());
    }

    function _0x9fdcea() {
        var _0xa88a13 = (arguments.length > 0x0 && void 0x0 !== arguments[0x0] ? arguments[0x0] : '').toString();
        return (_0xa88a13 = function() {
            var _0xa88a13 = (arguments.length > 0x0 && void 0x0 !== arguments[0x0] ? arguments[0x0] : '').toString();
            return _0xa88a13 = _0x1a0e98(_0xa88a13, '-', ' '), _0xa88a13 = _0x1a0e98(_0xa88a13, '_', ' '), _0x1a0e98(_0xa88a13 = function() {
                return (arguments.length > 0x0 && void 0x0 !== arguments[0x0] ? arguments[0x0] : '').toString().replace(/\w\S*/g, function(_0x5b5cba) {
                    return _0x5b5cba.charAt(0x0).toUpperCase() + _0x5b5cba.substr(0x1).toLowerCase();
                });
            }(_0xa88a13), ' ', '');
        }(_0xa88a13)).charAt(0x0).toLowerCase() + _0xa88a13.slice(0x1);
    }

    function _0x419e30(_0x3614ce, _0x5196ee) {
        return function(_0x38f65b) {
            if (Array.isArray(_0x38f65b)) return _0x38f65b;
        }(_0x3614ce) || function(_0x20a132, _0x481bd0) {
            var _0x2c1832 = [],
                _0x930e75 = true,
                _0x40863e = !0x1,
                _0xf7a5cf = void 0x0;
            try {
                for (var _0x9d4c5a, _0x2f59ed = _0x20a132[Symbol.iterator](); !(_0x930e75 = (_0x9d4c5a = _0x2f59ed.next()).done) && (_0x2c1832.push(_0x9d4c5a.value), !_0x481bd0 || _0x2c1832.length !== _0x481bd0); _0x930e75 = true);
            } catch (_0x383181) {
                _0x40863e = true, _0xf7a5cf = _0x383181;
            } finally {
                try {
                    _0x930e75 || null == _0x2f59ed.return || _0x2f59ed.return();
                } finally {
                    if (_0x40863e) throw _0xf7a5cf;
                }
            }
            return _0x2c1832;
        }(_0x3614ce, _0x5196ee) || function() {
            throw new TypeError('Invalid attempt to destructure non-iterable instance');
        }();
    }
    var _0xb9b2ff = {
        'get': function() {
            var _0xa88a13 = arguments.length > 0x0 && void 0x0 !== arguments[0x0] ? arguments[0x0] : '',
                _0x17edbf = arguments.length > 0x1 && void 0x0 !== arguments[0x1] ? arguments[0x1] : {};
            if (_0x1e2c68.empty(_0xa88a13) || _0x1e2c68.empty(_0x17edbf)) return '';
            var _0x2c1832 = _0x344e81(_0x17edbf.i18n, _0xa88a13);
            if (_0x1e2c68.empty(_0x2c1832)) return '';
            var _0x54bf45 = {
                '{seektime}': _0x17edbf.seekTime,
                '{title}': _0x17edbf.title
            };
            return Object.entries(_0x54bf45).forEach(function(_0x34ee43) {
                var _0x17edbf = _0x419e30(_0x34ee43, 0x2),
                    _0x473ebb = _0x17edbf[0x0],
                    _0x56ec0 = _0x17edbf[0x1];
                _0x2c1832 = _0x1a0e98(_0x2c1832, _0x473ebb, _0x56ec0);
            }), _0x2c1832;
        }
    };

    function _0x4c97b0(_0xb3d5fd, _0x2cda5d) {
        for (var _0x2c1832 = 0x0; _0x2c1832 < _0x2cda5d.length; _0x2c1832++) {
            var _0x3f3944 = _0x2cda5d[_0x2c1832];
            _0x3f3944.enumerable = _0x3f3944.enumerable || !0x1, _0x3f3944.configurable = true, 'value' in _0x3f3944 && (_0x3f3944.writable = true), Object.defineProperty(_0xb3d5fd, _0x3f3944.key, _0x3f3944);
        }
    }
    var _0x2f61ba = function() {
        function _0x566dbe(_0x3a7165, _0x3d2e3a) {
            ! function(_0x48c5c0, _0x2b027d) {
                if (!(_0x48c5c0 instanceof _0x2b027d)) throw new TypeError('Cannot call a class as a function');
            }(this, _0x566dbe), this.enabled = true, this.key = _0x3d2e3a;
        }
        var _0x17edbf, _0x2c1832, _0x4496fc;
        return _0x17edbf = _0x566dbe, _0x4496fc = [{
            'key': 'supported',
            'get': function() {
                try {
                    return 'localStorage' in window && (window.localStorage.getItem('___test') || window.localStorage.setItem('___test', '___test'), true);
                } catch (_0x42cafd) {
                    return !0x1;
                }
            }
        }], (_0x2c1832 = [{
            'key': 'get',
            'value': function(_0x4ed865) {
                if (!_0x566dbe.supported || !this.enabled) return null;
                var _0x2c1832 = window.localStorage.getItem(this.key);
                if (_0x1e2c68.empty(_0x2c1832)) return null;
                var _0x57ebf7 = JSON.parse(_0x2c1832);
                return _0x1e2c68.string(_0x4ed865) && _0x4ed865.length ? _0x57ebf7[_0x4ed865] : _0x57ebf7;
            }
        }, {
            'key': 'set',
            'value': function(_0x443e7a) {
                if (_0x566dbe.supported && this.enabled && _0x1e2c68.object(_0x443e7a)) {
                    var _0x2c1832 = this.get();
                    _0x1e2c68.empty(_0x2c1832) && (_0x2c1832 = {}), _0x5dc0c0(_0x2c1832, _0x443e7a), window.localStorage.setItem(this.key, JSON.stringify(_0x2c1832));
                }
            }
        }]) && _0x4c97b0(_0x17edbf.prototype, _0x2c1832), _0x4496fc && _0x4c97b0(_0x17edbf, _0x4496fc), _0x566dbe;
    }();
    var _0x13fb79, _0x569918 = _0x2c1832(0x6c),
        _0x4e4ca6 = _0x2c1832.n(_0x569918),
        _0x4ad1c6 = _0x2c1832(0x6),
        _0x4704b1 = _0x2c1832(0x9f),
        _0x3a58c8 = _0x2c1832.n(_0x4704b1),
        _0x5032e6 = {
            '2xScaleHQ.glslp': 'shaders = 1\n\nshader0 = "2xScaleHQ.glsl"\nfilter_linear0 = false\nscale_type_0 = source\n',
            '4xScaleHQ.glslp': 'shaders = 1\n\nshader0 = "4xScaleHQ.glsl"\nfilter_linear0 = false\nscale_type_0 = source\n',
            'crt-easymode.glslp': 'shaders = 1\n\nshader0 = crt-easymode.glsl\nfilter_linear0 = false\nscale_type_0 = source\n',
            'crt-aperture.glslp': 'shaders = 1\n\nshader0 = crt-aperture.glsl\nfilter_linear0 = false\n',
            'crt-geom.glslp': 'shaders = 1\n\nshader0 = crt-geom.glsl\nfilter_linear0 = false\nscale_type_0 = source\n',
            '2xScaleHQ.glsl': '/*\n2xGLSLHqFilter shader\n\nCopyright (C) 2005 guest(r) - guest.r@gmail.com\n\nThis program is free software; you can redistribute it and/or\nmodify it under the terms of the GNU General Public License\nas published by the Free Software Foundation; either version 2\nof the License, or (at your option) any later version.\n\nThis program is distributed in the hope that it will be useful,\nbut WITHOUT ANY WARRANTY; without even the implied warranty of\nMERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\nGNU General Public License for more details.\n\nYou should have received a copy of the GNU General Public License\nalong with this program; if not, write to the Free Software\nFoundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.\n*/\n\n#if defined(VERTEX)\n\n#if __VERSION__ >= 130\n#define COMPAT_VARYING out\n#define COMPAT_ATTRIBUTE in\n#define COMPAT_TEXTURE texture\n#else\n#define COMPAT_VARYING varying \n#define COMPAT_ATTRIBUTE attribute \n#define COMPAT_TEXTURE texture2D\n#endif\n\n#ifdef GL_ES\n#define COMPAT_PRECISION mediump\n#else\n#define COMPAT_PRECISION\n#endif\n\nCOMPAT_ATTRIBUTE vec4 VertexCoord;\nCOMPAT_ATTRIBUTE vec4 COLOR;\nCOMPAT_ATTRIBUTE vec4 TexCoord;\nCOMPAT_VARYING vec4 COL0;\nCOMPAT_VARYING vec4 TEX0;\nCOMPAT_VARYING vec4 t1;\nCOMPAT_VARYING vec4 t2;\nCOMPAT_VARYING vec4 t3;\nCOMPAT_VARYING vec4 t4;\n\nvec4 _oPosition1; \nuniform mat4 MVPMatrix;\nuniform COMPAT_PRECISION int FrameDirection;\nuniform COMPAT_PRECISION int FrameCount;\nuniform COMPAT_PRECISION vec2 OutputSize;\nuniform COMPAT_PRECISION vec2 TextureSize;\nuniform COMPAT_PRECISION vec2 InputSize;\n\n// compatibility #defines\n#define vTexCoord TEX0.xy\n#define SourceSize vec4(TextureSize, 1.0 / TextureSize) //either TextureSize or InputSize\n#define OutSize vec4(OutputSize, 1.0 / OutputSize)\n\nvoid main()\n{\ngl_Position = MVPMatrix * VertexCoord;\nTEX0.xy = TexCoord.xy;\nfloat x = 0.5 * SourceSize.z;\nfloat y = 0.5 * SourceSize.w;\nvec2 dg1 = vec2( x, y);\nvec2 dg2 = vec2(-x, y);\nvec2 dx = vec2(x, 0.0);\nvec2 dy = vec2(0.0, y);\nt1 = vec4(vTexCoord - dg1, vTexCoord - dy);\nt2 = vec4(vTexCoord - dg2, vTexCoord + dx);\nt3 = vec4(vTexCoord + dg1, vTexCoord + dy);\nt4 = vec4(vTexCoord + dg2, vTexCoord - dx);\n}\n\n#elif defined(FRAGMENT)\n\n#if __VERSION__ >= 130\n#define COMPAT_VARYING in\n#define COMPAT_TEXTURE texture\nout vec4 FragColor;\n#else\n#define COMPAT_VARYING varying\n#define FragColor gl_FragColor\n#define COMPAT_TEXTURE texture2D\n#endif\n\n#ifdef GL_ES\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n#define COMPAT_PRECISION mediump\n#else\n#define COMPAT_PRECISION\n#endif\n\nuniform COMPAT_PRECISION int FrameDirection;\nuniform COMPAT_PRECISION int FrameCount;\nuniform COMPAT_PRECISION vec2 OutputSize;\nuniform COMPAT_PRECISION vec2 TextureSize;\nuniform COMPAT_PRECISION vec2 InputSize;\nuniform sampler2D Texture;\nCOMPAT_VARYING vec4 TEX0;\nCOMPAT_VARYING vec4 t1;\nCOMPAT_VARYING vec4 t2;\nCOMPAT_VARYING vec4 t3;\nCOMPAT_VARYING vec4 t4;\n\n// compatibility #defines\n#define Source Texture\n#define vTexCoord TEX0.xy\n\n#define SourceSize vec4(TextureSize, 1.0 / TextureSize) //either TextureSize or InputSize\n#define OutSize vec4(OutputSize, 1.0 / OutputSize)\n\nfloat mx = 0.325;      // start smoothing wt.\nfloat k = -0.250;      // wt. decrease factor\nfloat max_w = 0.25;    // max filter weight\nfloat min_w =-0.05;    // min filter weight\nfloat lum_add = 0.25;  // affects smoothing\nvec3 dt = vec3(1.0);\n\nvoid main()\n{\nvec3 c00 = COMPAT_TEXTURE(Source, t1.xy).xyz; \nvec3 c10 = COMPAT_TEXTURE(Source, t1.zw).xyz; \nvec3 c20 = COMPAT_TEXTURE(Source, t2.xy).xyz; \nvec3 c01 = COMPAT_TEXTURE(Source, t4.zw).xyz; \nvec3 c11 = COMPAT_TEXTURE(Source, vTexCoord).xyz; \nvec3 c21 = COMPAT_TEXTURE(Source, t2.zw).xyz; \nvec3 c02 = COMPAT_TEXTURE(Source, t4.xy).xyz; \nvec3 c12 = COMPAT_TEXTURE(Source, t3.zw).xyz; \nvec3 c22 = COMPAT_TEXTURE(Source, t3.xy).xyz; \n\nfloat md1 = dot(abs(c00 - c22), dt);\nfloat md2 = dot(abs(c02 - c20), dt);\n\nfloat w1 = dot(abs(c22 - c11), dt) * md2;\nfloat w2 = dot(abs(c02 - c11), dt) * md1;\nfloat w3 = dot(abs(c00 - c11), dt) * md2;\nfloat w4 = dot(abs(c20 - c11), dt) * md1;\n\nfloat t1 = w1 + w3;\nfloat t2 = w2 + w4;\nfloat ww = max(t1, t2) + 0.0001;\n\nc11 = (w1 * c00 + w2 * c20 + w3 * c22 + w4 * c02 + ww * c11) / (t1 + t2 + ww);\n\nfloat lc1 = k / (0.12 * dot(c10 + c12 + c11, dt) + lum_add);\nfloat lc2 = k / (0.12 * dot(c01 + c21 + c11, dt) + lum_add);\n\nw1 = clamp(lc1 * dot(abs(c11 - c10), dt) + mx, min_w, max_w);\nw2 = clamp(lc2 * dot(abs(c11 - c21), dt) + mx, min_w, max_w);\nw3 = clamp(lc1 * dot(abs(c11 - c12), dt) + mx, min_w, max_w);\nw4 = clamp(lc2 * dot(abs(c11 - c01), dt) + mx, min_w, max_w);\nFragColor = vec4(w1 * c10 + w2 * c21 + w3 * c12 + w4 * c01 + (1.0 - w1 - w2 - w3 - w4) * c11, 1.0);\n} \n#endif\n',
            '4xScaleHQ.glsl': '/*\n4xGLSLHqFilter shader\n\nCopyright (C) 2005 guest(r) - guest.r@gmail.com\n\nThis program is free software; you can redistribute it and/or\nmodify it under the terms of the GNU General Public License\nas published by the Free Software Foundation; either version 2\nof the License, or (at your option) any later version.\n\nThis program is distributed in the hope that it will be useful,\nbut WITHOUT ANY WARRANTY; without even the implied warranty of\nMERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\nGNU General Public License for more details.\n\nYou should have received a copy of the GNU General Public License\nalong with this program; if not, write to the Free Software\nFoundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.\n*/\n\n#if defined(VERTEX)\n\n#if __VERSION__ >= 130\n#define COMPAT_VARYING out\n#define COMPAT_ATTRIBUTE in\n#define COMPAT_TEXTURE texture\n#else\n#define COMPAT_VARYING varying \n#define COMPAT_ATTRIBUTE attribute \n#define COMPAT_TEXTURE texture2D\n#endif\n\n#ifdef GL_ES\n#define COMPAT_PRECISION mediump\n#else\n#define COMPAT_PRECISION\n#endif\n\nCOMPAT_ATTRIBUTE vec4 VertexCoord;\nCOMPAT_ATTRIBUTE vec4 COLOR;\nCOMPAT_ATTRIBUTE vec4 TexCoord;\nCOMPAT_VARYING vec4 COL0;\nCOMPAT_VARYING vec4 TEX0;\nCOMPAT_VARYING vec4 t1;\nCOMPAT_VARYING vec4 t2;\nCOMPAT_VARYING vec4 t3;\nCOMPAT_VARYING vec4 t4;\nCOMPAT_VARYING vec4 t5;\nCOMPAT_VARYING vec4 t6;\n\nvec4 _oPosition1; \nuniform mat4 MVPMatrix;\nuniform COMPAT_PRECISION int FrameDirection;\nuniform COMPAT_PRECISION int FrameCount;\nuniform COMPAT_PRECISION vec2 OutputSize;\nuniform COMPAT_PRECISION vec2 TextureSize;\nuniform COMPAT_PRECISION vec2 InputSize;\n\n// compatibility #defines\n#define vTexCoord TEX0.xy\n#define SourceSize vec4(TextureSize, 1.0 / TextureSize) //either TextureSize or InputSize\n#define OutSize vec4(OutputSize, 1.0 / OutputSize)\n\nvoid main()\n{\ngl_Position = MVPMatrix * VertexCoord;\nTEX0.xy = TexCoord.xy;\nfloat x = 0.5 * SourceSize.z;\nfloat y = 0.5 * SourceSize.w;\nvec2 dg1 = vec2( x, y);\nvec2 dg2 = vec2(-x, y);\nvec2 sd1 = dg1 * 0.5;\nvec2 sd2 = dg2 * 0.5;\nvec2 ddx = vec2(x, 0.0);\nvec2 ddy = vec2(0.0, y);\nt1 = vec4(vTexCoord - sd1, vTexCoord - ddy);\nt2 = vec4(vTexCoord - sd2, vTexCoord + ddx);\nt3 = vec4(vTexCoord + sd1, vTexCoord + ddy);\nt4 = vec4(vTexCoord + sd2, vTexCoord - ddx);\nt5 = vec4(vTexCoord - dg1, vTexCoord - dg2);\nt6 = vec4(vTexCoord + dg1, vTexCoord + dg2);\n}\n\n#elif defined(FRAGMENT)\n\n#if __VERSION__ >= 130\n#define COMPAT_VARYING in\n#define COMPAT_TEXTURE texture\nout vec4 FragColor;\n#else\n#define COMPAT_VARYING varying\n#define FragColor gl_FragColor\n#define COMPAT_TEXTURE texture2D\n#endif\n\n#ifdef GL_ES\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n#define COMPAT_PRECISION mediump\n#else\n#define COMPAT_PRECISION\n#endif\n\nuniform COMPAT_PRECISION int FrameDirection;\nuniform COMPAT_PRECISION int FrameCount;\nuniform COMPAT_PRECISION vec2 OutputSize;\nuniform COMPAT_PRECISION vec2 TextureSize;\nuniform COMPAT_PRECISION vec2 InputSize;\nuniform sampler2D Texture;\nCOMPAT_VARYING vec4 TEX0;\nCOMPAT_VARYING vec4 t1;\nCOMPAT_VARYING vec4 t2;\nCOMPAT_VARYING vec4 t3;\nCOMPAT_VARYING vec4 t4;\nCOMPAT_VARYING vec4 t5;\nCOMPAT_VARYING vec4 t6;\n\n// compatibility #defines\n#define Source Texture\n#define vTexCoord TEX0.xy\n\n#define SourceSize vec4(TextureSize, 1.0 / TextureSize) //either TextureSize or InputSize\n#define OutSize vec4(OutputSize, 1.0 / OutputSize)\n\nfloat mx = 1.0;      // start smoothing wt.\nfloat k = -1.10;      // wt. decrease factor\nfloat max_w = 0.75;    // max filter weight\nfloat min_w = 0.03;    // min filter weight\nfloat lum_add = 0.33;  // affects smoothing\nvec3 dt = vec3(1.0);\n\nvoid main()\n{\nvec3 c  = COMPAT_TEXTURE(Source, vTexCoord).xyz;\nvec3 i1 = COMPAT_TEXTURE(Source, t1.xy).xyz; \nvec3 i2 = COMPAT_TEXTURE(Source, t2.xy).xyz; \nvec3 i3 = COMPAT_TEXTURE(Source, t3.xy).xyz; \nvec3 i4 = COMPAT_TEXTURE(Source, t4.xy).xyz; \nvec3 o1 = COMPAT_TEXTURE(Source, t5.xy).xyz; \nvec3 o3 = COMPAT_TEXTURE(Source, t6.xy).xyz; \nvec3 o2 = COMPAT_TEXTURE(Source, t5.zw).xyz;\nvec3 o4 = COMPAT_TEXTURE(Source, t6.zw).xyz;\nvec3 s1 = COMPAT_TEXTURE(Source, t1.zw).xyz; \nvec3 s2 = COMPAT_TEXTURE(Source, t2.zw).xyz; \nvec3 s3 = COMPAT_TEXTURE(Source, t3.zw).xyz; \nvec3 s4 = COMPAT_TEXTURE(Source, t4.zw).xyz; \n\nfloat ko1=dot(abs(o1-c),dt);\nfloat ko2=dot(abs(o2-c),dt);\nfloat ko3=dot(abs(o3-c),dt);\nfloat ko4=dot(abs(o4-c),dt);\n\nfloat k1=min(dot(abs(i1-i3),dt),max(ko1,ko3));\nfloat k2=min(dot(abs(i2-i4),dt),max(ko2,ko4));\n\nfloat w1 = k2; if(ko3<ko1) w1*=ko3/ko1;\nfloat w2 = k1; if(ko4<ko2) w2*=ko4/ko2;\nfloat w3 = k2; if(ko1<ko3) w3*=ko1/ko3;\nfloat w4 = k1; if(ko2<ko4) w4*=ko2/ko4;\n\nc=(w1*o1+w2*o2+w3*o3+w4*o4+0.001*c)/(w1+w2+w3+w4+0.001);\nw1 = k*dot(abs(i1-c)+abs(i3-c),dt)/(0.125*dot(i1+i3,dt)+lum_add);\nw2 = k*dot(abs(i2-c)+abs(i4-c),dt)/(0.125*dot(i2+i4,dt)+lum_add);\nw3 = k*dot(abs(s1-c)+abs(s3-c),dt)/(0.125*dot(s1+s3,dt)+lum_add);\nw4 = k*dot(abs(s2-c)+abs(s4-c),dt)/(0.125*dot(s2+s4,dt)+lum_add);\n\nw1 = clamp(w1+mx,min_w,max_w); \nw2 = clamp(w2+mx,min_w,max_w);\nw3 = clamp(w3+mx,min_w,max_w); \nw4 = clamp(w4+mx,min_w,max_w);\n\nFragColor = vec4((w1*(i1+i3)+w2*(i2+i4)+w3*(s1+s3)+w4*(s2+s4)+c)/(2.0*(w1+w2+w3+w4)+1.0), 1.0);\n} \n#endif\n',
            'crt-easymode.glsl': '#if defined(VERTEX)\n\n    #if __VERSION__ >= 130\n    #define COMPAT_VARYING out\n    #define COMPAT_ATTRIBUTE in\n    #define COMPAT_TEXTURE texture\n    #else\n    #define COMPAT_VARYING varying\n    #define COMPAT_ATTRIBUTE attribute\n    #define COMPAT_TEXTURE texture2D\n    #endif\n    \n    #ifdef GL_ES\n    #define COMPAT_PRECISION mediump\n    #else\n    #define COMPAT_PRECISION\n    #endif\n    COMPAT_VARYING     float _frame_rotation;\n    struct input_dummy {\n    vec2 _video_size;\n    vec2 _texture_size;\n    vec2 _output_dummy_size;\n    float _frame_count;\n    float _frame_direction;\n    float _frame_rotation;\n    };\n    vec4 _oPosition1;\n    vec4 _r0005;\n    COMPAT_ATTRIBUTE vec4 VertexCoord;\n    COMPAT_ATTRIBUTE vec4 TexCoord;\n    COMPAT_VARYING vec4 TEX0;\n    \n    uniform mat4 MVPMatrix;\n    uniform int FrameDirection;\n    uniform int FrameCount;\n    uniform COMPAT_PRECISION vec2 OutputSize;\n    uniform COMPAT_PRECISION vec2 TextureSize;\n    uniform COMPAT_PRECISION vec2 InputSize;\n    void main()\n    {\n    vec2 _oTex;\n    _r0005 = VertexCoord.x*MVPMatrix[0];\n    _r0005 = _r0005 + VertexCoord.y*MVPMatrix[1];\n    _r0005 = _r0005 + VertexCoord.z*MVPMatrix[2];\n    _r0005 = _r0005 + VertexCoord.w*MVPMatrix[3];\n    _oPosition1 = _r0005;\n    _oTex = TexCoord.xy;\n    gl_Position = _r0005;\n    TEX0.xy = TexCoord.xy;\n    }\n    #elif defined(FRAGMENT)\n    \n    #if __VERSION__ >= 130\n    #define COMPAT_VARYING in\n    #define COMPAT_TEXTURE texture\n    out vec4 FragColor;\n    #else\n    #define COMPAT_VARYING varying\n    #define FragColor gl_FragColor\n    #define COMPAT_TEXTURE texture2D\n    #endif\n    \n    #ifdef GL_ES\n    #ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    #else\n    precision mediump float;\n    #endif\n    #define COMPAT_PRECISION mediump\n    #else\n    #define COMPAT_PRECISION\n    #endif\n    COMPAT_VARYING     float _frame_rotation;\n    struct input_dummy {\n    vec2 _video_size;\n    vec2 _texture_size;\n    vec2 _output_dummy_size;\n    float _frame_count;\n    float _frame_direction;\n    float _frame_rotation;\n    };\n    vec4 _ret_0;\n    float _TMP30;\n    float _TMP29;\n    float _TMP28;\n    float _TMP13;\n    float _TMP32;\n    float _TMP11;\n    float _TMP10;\n    float _TMP31;\n    float _TMP9;\n    float _TMP8;\n    float _TMP15;\n    float _TMP14;\n    float _TMP33;\n    vec4 _TMP34;\n    vec4 _TMP27;\n    vec4 _TMP25;\n    vec4 _TMP23;\n    vec4 _TMP21;\n    vec4 _TMP26;\n    vec4 _TMP24;\n    vec4 _TMP22;\n    vec4 _TMP20;\n    float _TMP4;\n    vec4 _TMP3;\n    vec4 _TMP2;\n    float _TMP19;\n    float _TMP18;\n    float _TMP17;\n    float _TMP16;\n    vec4 _TMP1;\n    vec2 _TMP0;\n    uniform sampler2D Texture;\n    input_dummy _IN1;\n    float _TMP43;\n    float _x_step0044;\n    float _curve0044;\n    float _a0048;\n    float _val0052;\n    float _a0052;\n    vec4 _TMP57;\n    vec4 _x0072;\n    vec2 _c0086;\n    vec4 _x0088;\n    vec4 _x0094;\n    vec2 _c0098;\n    vec4 _x0100;\n    vec2 _c0104;\n    vec4 _x0106;\n    vec4 _sample_min0110;\n    vec4 _sample_max0110;\n    vec4 _r0112;\n    vec4 _TMP117;\n    vec2 _co0124;\n    vec2 _c0126;\n    vec4 _x0128;\n    vec4 _x0134;\n    vec2 _c0138;\n    vec4 _x0140;\n    vec2 _c0144;\n    vec4 _x0146;\n    vec4 _sample_min0150;\n    vec4 _sample_max0150;\n    vec4 _r0152;\n    vec4 _TMP157;\n    float _TMP163;\n    float _x_step0164;\n    float _curve0164;\n    float _a0168;\n    float _val0172;\n    float _a0172;\n    float _TMP183;\n    float _TMP189;\n    float _x0190;\n    float _a0196;\n    float _x0198;\n    vec2 _x0200;\n    float _x0208;\n    COMPAT_VARYING vec4 TEX0;\n    \n    uniform COMPAT_PRECISION vec2 OutputSize;\n    uniform COMPAT_PRECISION vec2 TextureSize;\n    uniform COMPAT_PRECISION vec2 InputSize;\n    void main()\n    {\n    vec2 _dx1;\n    vec2 _dy;\n    vec2 _pix_co;\n    vec2 _tex_co;\n    vec2 _dist;\n    vec3 _col2;\n    vec3 _col21;\n    vec4 _coeffs1;\n    float _luma;\n    float _bright;\n    float _scan_weight;\n    vec2 _mod_fac;\n    int _dot_no;\n    vec3 _mask_weight;\n    vec3 _TMP37;\n    _dx1 = vec2(1.00000000E+00/TextureSize.x, 0.00000000E+00);\n    _dy = vec2(0.00000000E+00, 1.00000000E+00/TextureSize.y);\n    _pix_co = TEX0.xy*TextureSize - vec2( 5.00000000E-01, 5.00000000E-01);\n    _TMP0 = floor(_pix_co);\n    _tex_co = (_TMP0 + vec2( 5.00000000E-01, 5.00000000E-01))/TextureSize;\n    _dist = fract(_pix_co);\n    _x_step0044 = float((_dist.x >= 5.00000000E-01));\n    _a0048 = 2.50000000E-01 - (_dist.x - _x_step0044)*(_dist.x - _x_step0044);\n    _TMP33 = inversesqrt(_a0048);\n    _TMP14 = 1.00000000E+00/_TMP33;\n    _a0052 = 5.00000000E-01 - _dist.x;\n    _val0052 = float((_a0052 > 0.00000000E+00));\n    _TMP15 = _val0052 - float((_a0052 < 0.00000000E+00));\n    _curve0044 = 5.00000000E-01 - _TMP14*_TMP15;\n    _TMP43 = _dist.x + 2.50000000E-01*(_curve0044 - _dist.x);\n    _coeffs1 = 3.14159274E+00*vec4(1.00000000E+00 + _TMP43, _TMP43, 1.00000000E+00 - _TMP43, 2.00000000E+00 - _TMP43);\n    _TMP1 = abs(_coeffs1);\n    _TMP57 = max(_TMP1, vec4( 9.99999975E-06, 9.99999975E-06, 9.99999975E-06, 9.99999975E-06));\n    _TMP16 = sin(_TMP57.x);\n    _TMP17 = sin(_TMP57.y);\n    _TMP18 = sin(_TMP57.z);\n    _TMP19 = sin(_TMP57.w);\n    _TMP2 = vec4(_TMP16, _TMP17, _TMP18, _TMP19);\n    _x0072 = _TMP57/2.00000000E+00;\n    _TMP16 = sin(_x0072.x);\n    _TMP17 = sin(_x0072.y);\n    _TMP18 = sin(_x0072.z);\n    _TMP19 = sin(_x0072.w);\n    _TMP3 = vec4(_TMP16, _TMP17, _TMP18, _TMP19);\n    _coeffs1 = ((2.00000000E+00*_TMP2)*_TMP3)/(_TMP57*_TMP57);\n    _TMP4 = dot(_coeffs1, vec4( 1.00000000E+00, 1.00000000E+00, 1.00000000E+00, 1.00000000E+00));\n    _coeffs1 = _coeffs1/_TMP4;\n    _c0086 = _tex_co - _dx1;\n    _TMP20 = COMPAT_TEXTURE(Texture, _c0086);\n    _x0088 = vec4( 1.00000000E+00, 1.00000000E+00, 1.00000000E+00, 1.00000000E+00) + (_TMP20 - vec4( 1.00000000E+00, 1.00000000E+00, 1.00000000E+00, 1.00000000E+00));\n    _TMP21 = _TMP20*_x0088;\n    _TMP22 = COMPAT_TEXTURE(Texture, _tex_co);\n    _x0094 = vec4( 1.00000000E+00, 1.00000000E+00, 1.00000000E+00, 1.00000000E+00) + (_TMP22 - vec4( 1.00000000E+00, 1.00000000E+00, 1.00000000E+00, 1.00000000E+00));\n    _TMP23 = _TMP22*_x0094;\n    _c0098 = _tex_co + _dx1;\n    _TMP24 = COMPAT_TEXTURE(Texture, _c0098);\n    _x0100 = vec4( 1.00000000E+00, 1.00000000E+00, 1.00000000E+00, 1.00000000E+00) + (_TMP24 - vec4( 1.00000000E+00, 1.00000000E+00, 1.00000000E+00, 1.00000000E+00));\n    _TMP25 = _TMP24*_x0100;\n    _c0104 = _tex_co + 2.00000000E+00*_dx1;\n    _TMP26 = COMPAT_TEXTURE(Texture, _c0104);\n    _x0106 = vec4( 1.00000000E+00, 1.00000000E+00, 1.00000000E+00, 1.00000000E+00) + (_TMP26 - vec4( 1.00000000E+00, 1.00000000E+00, 1.00000000E+00, 1.00000000E+00));\n    _TMP27 = _TMP26*_x0106;\n    _r0112 = _coeffs1.x*_TMP21;\n    _r0112 = _r0112 + _coeffs1.y*_TMP23;\n    _r0112 = _r0112 + _coeffs1.z*_TMP25;\n    _r0112 = _r0112 + _coeffs1.w*_TMP27;\n    _sample_min0110 = min(_TMP23, _TMP25);\n    _sample_max0110 = max(_TMP23, _TMP25);\n    _TMP34 = min(_sample_max0110, _r0112);\n    _TMP117 = max(_sample_min0110, _TMP34);\n    _co0124 = _tex_co + _dy;\n    _c0126 = _co0124 - _dx1;\n    _TMP20 = COMPAT_TEXTURE(Texture, _c0126);\n    _x0128 = vec4( 1.00000000E+00, 1.00000000E+00, 1.00000000E+00, 1.00000000E+00) + (_TMP20 - vec4( 1.00000000E+00, 1.00000000E+00, 1.00000000E+00, 1.00000000E+00));\n    _TMP21 = _TMP20*_x0128;\n    _TMP22 = COMPAT_TEXTURE(Texture, _co0124);\n    _x0134 = vec4( 1.00000000E+00, 1.00000000E+00, 1.00000000E+00, 1.00000000E+00) + (_TMP22 - vec4( 1.00000000E+00, 1.00000000E+00, 1.00000000E+00, 1.00000000E+00));\n    _TMP23 = _TMP22*_x0134;\n    _c0138 = _co0124 + _dx1;\n    _TMP24 = COMPAT_TEXTURE(Texture, _c0138);\n    _x0140 = vec4( 1.00000000E+00, 1.00000000E+00, 1.00000000E+00, 1.00000000E+00) + (_TMP24 - vec4( 1.00000000E+00, 1.00000000E+00, 1.00000000E+00, 1.00000000E+00));\n    _TMP25 = _TMP24*_x0140;\n    _c0144 = _co0124 + 2.00000000E+00*_dx1;\n    _TMP26 = COMPAT_TEXTURE(Texture, _c0144);\n    _x0146 = vec4( 1.00000000E+00, 1.00000000E+00, 1.00000000E+00, 1.00000000E+00) + (_TMP26 - vec4( 1.00000000E+00, 1.00000000E+00, 1.00000000E+00, 1.00000000E+00));\n    _TMP27 = _TMP26*_x0146;\n    _r0152 = _coeffs1.x*_TMP21;\n    _r0152 = _r0152 + _coeffs1.y*_TMP23;\n    _r0152 = _r0152 + _coeffs1.z*_TMP25;\n    _r0152 = _r0152 + _coeffs1.w*_TMP27;\n    _sample_min0150 = min(_TMP23, _TMP25);\n    _sample_max0150 = max(_TMP23, _TMP25);\n    _TMP34 = min(_sample_max0150, _r0152);\n    _TMP157 = max(_sample_min0150, _TMP34);\n    _x_step0164 = float((_dist.y >= 5.00000000E-01));\n    _a0168 = 2.50000000E-01 - (_dist.y - _x_step0164)*(_dist.y - _x_step0164);\n    _TMP33 = inversesqrt(_a0168);\n    _TMP14 = 1.00000000E+00/_TMP33;\n    _a0172 = 5.00000000E-01 - _dist.y;\n    _val0172 = float((_a0172 > 0.00000000E+00));\n    _TMP15 = _val0172 - float((_a0172 < 0.00000000E+00));\n    _curve0164 = 5.00000000E-01 - _TMP14*_TMP15;\n    _TMP163 = _dist.y + (_curve0164 - _dist.y);\n    _col2 = _TMP117.xyz + _TMP163*(_TMP157.xyz - _TMP117.xyz);\n    _luma = dot(vec3( 2.12599993E-01, 7.15200007E-01, 7.22000003E-02), _col2);\n    _TMP8 = max(_col2.y, _col2.z);\n    _TMP9 = max(_col2.x, _TMP8);\n    _bright = (_TMP9 + _luma)/2.00000000E+00;\n    _TMP31 = min(6.49999976E-01, _bright);\n    _TMP183 = max(3.49999994E-01, _TMP31);\n    _x0190 = _bright*1.50000000E+00;\n    _TMP31 = min(1.50000000E+00, _x0190);\n    _TMP189 = max(1.50000000E+00, _TMP31);\n    _a0196 = TEX0.y*2.00000000E+00*3.14159274E+00*TextureSize.y;\n    _TMP10 = cos(_a0196);\n    _x0198 = _TMP10*5.00000000E-01 + 5.00000000E-01;\n    _TMP11 = pow(_x0198, _TMP189);\n    _scan_weight = 1.00000000E+00 - _TMP11;\n    _x0200 = (TEX0.xy*OutputSize*TextureSize)/InputSize;\n    _mod_fac = floor(_x0200);\n    _x0208 = _mod_fac.x/3.00000000E+00;\n    _TMP32 = floor(_x0208);\n    _TMP13 = _mod_fac.x - 3.00000000E+00*_TMP32;\n    _dot_no = int(_TMP13);\n    if (_dot_no == 0) {\n    _mask_weight = vec3( 1.00000000E+00, 6.99999988E-01, 6.99999988E-01);\n    } else {\n    if (_dot_no == 1) {\n    _mask_weight = vec3( 6.99999988E-01, 1.00000000E+00, 6.99999988E-01);\n    } else {\n    _mask_weight = vec3( 6.99999988E-01, 6.99999988E-01, 1.00000000E+00);\n    }\n    }\n    if (InputSize.y >= 4.00000000E+02) {\n    _scan_weight = 1.00000000E+00;\n    }\n    _col21 = _col2.xyz;\n    _col2 = _col2*vec3(_scan_weight, _scan_weight, _scan_weight);\n    _col2 = _col2 + _TMP183*(_col21 - _col2);\n    _col2 = _col2*_mask_weight;\n    _TMP28 = pow(_col2.x, 5.55555582E-01);\n    _TMP29 = pow(_col2.y, 5.55555582E-01);\n    _TMP30 = pow(_col2.z, 5.55555582E-01);\n    _col2 = vec3(_TMP28, _TMP29, _TMP30);\n    _TMP37 = _col2*1.20000005E+00;\n    _ret_0 = vec4(_TMP37.x, _TMP37.y, _TMP37.z, 1.00000000E+00);\n    FragColor = _ret_0;\n    return;\n    }\n    #endif\n',
            'crt-aperture.glsl': '\n/*\nCRT Shader by EasyMode\nLicense: GPL\n*/\n/*\n#pragma parameter SHARPNESS_IMAGE "Sharpness Image" 1.0 1.0 5.0 1.0\n#pragma parameter SHARPNESS_EDGES "Sharpness Edges" 3.0 1.0 5.0 1.0\n#pragma parameter GLOW_WIDTH "Glow Width" 0.5 0.05 0.65 0.05\n#pragma parameter GLOW_HEIGHT "Glow Height" 0.5 0.05 0.65 0.05\n#pragma parameter GLOW_HALATION "Glow Halation" 0.1 0.0 1.0 0.01\n#pragma parameter GLOW_DIFFUSION "Glow Diffusion" 0.05 0.0 1.0 0.01\n#pragma parameter MASK_COLORS "Mask Colors" 2.0 2.0 3.0 1.0\n#pragma parameter MASK_STRENGTH "Mask Strength" 0.3 0.0 1.0 0.05\n#pragma parameter MASK_SIZE "Mask Size" 1.0 1.0 9.0 1.0\n#pragma parameter SCANLINE_SIZE_MIN "Scanline Size Min." 0.5 0.5 1.5 0.05\n#pragma parameter SCANLINE_SIZE_MAX "Scanline Size Max." 1.5 0.5 1.5 0.05\n#pragma parameter GAMMA_INPUT "Gamma Input" 2.4 1.0 5.0 0.1\n#pragma parameter GAMMA_OUTPUT "Gamma Output" 2.4 1.0 5.0 0.1\n#pragma parameter BRIGHTNESS "Brightness" 1.5 0.0 2.0 0.05\n* */\n\n#define Coord TEX0\n\n#if defined(VERTEX)\n\n#if __VERSION__ >= 130\n#define OUT out\n#define IN  in\n#define tex2D texture\n#else\n#define OUT varying \n#define IN attribute \n#define tex2D texture2D\n#endif\n\n#ifdef GL_ES\n#define PRECISION mediump\n#else\n#define PRECISION\n#endif\n\nIN  vec4 VertexCoord;\nIN  vec4 Color;\nIN  vec2 TexCoord;\nOUT vec4 color;\nOUT vec2 Coord;\n\nuniform mat4 MVPMatrix;\nuniform PRECISION int FrameDirection;\nuniform PRECISION int FrameCount;\nuniform PRECISION vec2 OutputSize;\nuniform PRECISION vec2 TextureSize;\nuniform PRECISION vec2 InputSize;\n\nvoid main()\n{\ngl_Position = MVPMatrix * VertexCoord;\ncolor = Color;\nCoord = TexCoord;\n}\n\n#elif defined(FRAGMENT)\n\n#if __VERSION__ >= 130\n#define IN in\n#define tex2D texture\nout vec4 FragColor;\n#else\n#define IN varying\n#define FragColor gl_FragColor\n#define tex2D texture2D\n#endif\n\n#ifdef GL_ES\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n#define PRECISION mediump\n#else\n#define PRECISION\n#endif\n\nuniform PRECISION int FrameDirection;\nuniform PRECISION int FrameCount;\nuniform PRECISION vec2 OutputSize;\nuniform PRECISION vec2 TextureSize;\nuniform PRECISION vec2 InputSize;\nuniform sampler2D Texture;\nIN vec2 Coord;\n\n#ifdef PARAMETER_UNIFORM\nuniform PRECISION float SHARPNESS_IMAGE;\nuniform PRECISION float SHARPNESS_EDGES;\nuniform PRECISION float GLOW_WIDTH;\nuniform PRECISION float GLOW_HEIGHT;\nuniform PRECISION float GLOW_HALATION;\nuniform PRECISION float GLOW_DIFFUSION;\nuniform PRECISION float MASK_COLORS;\nuniform PRECISION float MASK_STRENGTH;\nuniform PRECISION float MASK_SIZE;\nuniform PRECISION float SCANLINE_SIZE_MIN;\nuniform PRECISION float SCANLINE_SIZE_MAX;\nuniform PRECISION float GAMMA_INPUT;\nuniform PRECISION float GAMMA_OUTPUT;\nuniform PRECISION float BRIGHTNESS;\n#else\n#define SHARPNESS_IMAGE 1.0\n#define SHARPNESS_EDGES 3.0\n#define GLOW_WIDTH 0.5\n#define GLOW_HEIGHT 0.5\n#define GLOW_HALATION 0.1\n#define GLOW_DIFFUSION 0.05\n#define MASK_COLORS 2.0\n#define MASK_STRENGTH 0.3\n#define MASK_SIZE 1.0\n#define SCANLINE_SIZE_MIN 0.5\n#define SCANLINE_SIZE_MAX 1.5\n#define GAMMA_INPUT 2.4\n#define GAMMA_OUTPUT 2.4\n#define BRIGHTNESS 1.5\n#endif\n\n#define FIX(c) max(abs(c), 1e-5)\n#define PI 3.141592653589\n#define saturate(c) clamp(c, 0.0, 1.0)\n#define TEX2D(c) pow(tex2D(tex, c).rgb, vec3(GAMMA_INPUT))\n\nmat3 get_color_matrix(sampler2D tex, vec2 co, vec2 dx)\n{\nreturn mat3(TEX2D(co - dx), TEX2D(co), TEX2D(co + dx));\n}\n\nvec3 blur(mat3 m, float dist, float rad)\n{\nvec3 x = vec3(dist - 1.0, dist, dist + 1.0) / rad;\nvec3 w = exp2(x * x * -1.0);\n\nreturn (m[0] * w.x + m[1] * w.y + m[2] * w.z) / (w.x + w.y + w.z);\n}\n\nvec3 filter_gaussian(sampler2D tex, vec2 co, vec2 tex_size)\n{\nvec2 dx = vec2(1.0 / tex_size.x, 0.0);\nvec2 dy = vec2(0.0, 1.0 / tex_size.y);\nvec2 pix_co = co * tex_size;\nvec2 tex_co = (floor(pix_co) + 0.5) / tex_size;\nvec2 dist = (fract(pix_co) - 0.5) * -1.0;\n\nmat3 line0 = get_color_matrix(tex, tex_co - dy, dx);\nmat3 line1 = get_color_matrix(tex, tex_co, dx);\nmat3 line2 = get_color_matrix(tex, tex_co + dy, dx);\nmat3 column = mat3(blur(line0, dist.x, GLOW_WIDTH),\n                       blur(line1, dist.x, GLOW_WIDTH),\n                       blur(line2, dist.x, GLOW_WIDTH));\n\nreturn blur(column, dist.y, GLOW_HEIGHT);\n}\n\nvec3 filter_lanczos(sampler2D tex, vec2 co, vec2 tex_size, float sharp)\n{\ntex_size.x *= sharp;\n\nvec2 dx = vec2(1.0 / tex_size.x, 0.0);\nvec2 pix_co = co * tex_size - vec2(0.5, 0.0);\nvec2 tex_co = (floor(pix_co) + vec2(0.5, 0.0)) / tex_size;\nvec2 dist = fract(pix_co);\nvec4 coef = PI * vec4(dist.x + 1.0, dist.x, dist.x - 1.0, dist.x - 2.0);\n\ncoef = FIX(coef);\ncoef = 2.0 * sin(coef) * sin(coef / 2.0) / (coef * coef);\ncoef /= dot(coef, vec4(1.0));\n\nvec4 col1 = vec4(TEX2D(tex_co), 1.0);\nvec4 col2 = vec4(TEX2D(tex_co + dx), 1.0);\n\nreturn (mat4(col1, col1, col2, col2) * coef).rgb;\n}\n\nvec3 get_scanline_weight(float x, vec3 col)\n{\nvec3 beam = mix(vec3(SCANLINE_SIZE_MIN), vec3(SCANLINE_SIZE_MAX), col);\nvec3 x_mul = 2.0 / beam;\nvec3 x_offset = x_mul * 0.5;\n\nreturn smoothstep(0.0, 1.0, 1.0 - abs(x * x_mul - x_offset)) * x_offset;\n}\n\nvec3 get_mask_weight(float x)\n{\nfloat i = mod(floor(x * OutputSize.x * TextureSize.x / (InputSize.x * MASK_SIZE)), MASK_COLORS);\n\nif (i == 0.0) return mix(vec3(1.0, 0.0, 1.0), vec3(1.0, 0.0, 0.0), MASK_COLORS - 2.0);\nelse if (i == 1.0) return vec3(0.0, 1.0, 0.0);\nelse return vec3(0.0, 0.0, 1.0);\n}\n\nvoid main()\n{\nvec3 col_glow = filter_gaussian(Texture, Coord, TextureSize);\nvec3 col_soft = filter_lanczos(Texture, Coord, TextureSize, SHARPNESS_IMAGE);\nvec3 col_sharp = filter_lanczos(Texture, Coord, TextureSize, SHARPNESS_EDGES);\nvec3 col = sqrt(col_sharp * col_soft);\n\ncol *= get_scanline_weight(fract(Coord.y * TextureSize.y), col_soft);\ncol_glow = saturate(col_glow - col);\ncol += col_glow * col_glow * GLOW_HALATION;\ncol = mix(col, col * get_mask_weight(Coord.x) * MASK_COLORS, MASK_STRENGTH);\ncol += col_glow * GLOW_DIFFUSION;\ncol = pow(col * BRIGHTNESS, vec3(1.0 / GAMMA_OUTPUT));\n\nFragColor = vec4(col, 1.0);\n}\n\n#endif\n',
            'crt-geom.glsl': '\n/*\nCRT-interlaced\n\nCopyright (C) 2010-2012 cgwg, Themaister and DOLLS\n\nThis program is free software; you can redistribute it and/or modify it\nunder the terms of the GNU General Public License as published by the Free\nSoftware Foundation; either version 2 of the License, or (at your option)\nany later version.\n\n(cgwg gave their consent to have the original version of this shader\ndistributed under the GPL in this message:\n\nhttp://board.byuu.org/viewtopic.php?p=26075#p26075\n\n"Feel free to distribute my shaders under the GPL. After all, the\nbarrel distortion code was taken from the Curvature shader, which is\nunder the GPL."\n)\nThis shader variant is pre-configured with screen curvature\n*/\n/*\n#pragma parameter CRTgamma "CRTGeom Target Gamma" 2.4 0.1 5.0 0.1\n#pragma parameter monitorgamma "CRTGeom Monitor Gamma" 2.2 0.1 5.0 0.1\n#pragma parameter d "CRTGeom Distance" 1.6 0.1 3.0 0.1\n#pragma parameter CURVATURE "CRTGeom Curvature Toggle" 1.0 0.0 1.0 1.0\n#pragma parameter R "CRTGeom Curvature Radius" 2.0 0.1 10.0 0.1\n#pragma parameter cornersize "CRTGeom Corner Size" 0.03 0.001 1.0 0.005\n#pragma parameter cornersmooth "CRTGeom Corner Smoothness" 1000.0 80.0 2000.0 100.0\n#pragma parameter x_tilt "CRTGeom Horizontal Tilt" 0.0 -0.5 0.5 0.05\n#pragma parameter y_tilt "CRTGeom Vertical Tilt" 0.0 -0.5 0.5 0.05\n#pragma parameter overscan_x "CRTGeom Horiz. Overscan %" 100.0 -125.0 125.0 1.0\n#pragma parameter overscan_y "CRTGeom Vert. Overscan %" 100.0 -125.0 125.0 1.0\n#pragma parameter DOTMASK "CRTGeom Dot Mask Toggle" 0.3 0.0 0.3 0.3\n#pragma parameter SHARPER "CRTGeom Sharpness" 1.0 1.0 3.0 1.0\n#pragma parameter scanline_weight "CRTGeom Scanline Weight" 0.3 0.1 0.5 0.05\n*/\n\n#ifndef PARAMETER_UNIFORM\n#define CRTgamma 2.4\n#define monitorgamma 2.2\n#define d 1.6\n#define CURVATURE 1.0\n#define R 2.0\n#define cornersize 0.03\n#define cornersmooth 1000.0\n#define x_tilt 0.0\n#define y_tilt 0.0\n#define overscan_x 100.0\n#define overscan_y 100.0\n#define DOTMASK 0.3\n#define SHARPER 1.0\n#define scanline_weight 0.3\n#endif\n\n#if defined(VERTEX)\n\n#if __VERSION__ >= 130\n#define COMPAT_VARYING out\n#define COMPAT_ATTRIBUTE in\n#define COMPAT_TEXTURE texture\n#else\n#define COMPAT_VARYING varying \n#define COMPAT_ATTRIBUTE attribute \n#define COMPAT_TEXTURE texture2D\n#endif\n\n#ifdef GL_ES\n#define COMPAT_PRECISION mediump\n#else\n#define COMPAT_PRECISION\n#endif\n\nCOMPAT_ATTRIBUTE vec4 VertexCoord;\nCOMPAT_ATTRIBUTE vec4 COLOR;\nCOMPAT_ATTRIBUTE vec4 TexCoord;\nCOMPAT_VARYING vec4 COL0;\nCOMPAT_VARYING vec4 TEX0;\n\nvec4 _oPosition1; \nuniform mat4 MVPMatrix;\nuniform COMPAT_PRECISION int FrameDirection;\nuniform COMPAT_PRECISION int FrameCount;\nuniform COMPAT_PRECISION vec2 OutputSize;\nuniform COMPAT_PRECISION vec2 TextureSize;\nuniform COMPAT_PRECISION vec2 InputSize;\n\nCOMPAT_VARYING vec2 overscan;\nCOMPAT_VARYING vec2 aspect;\nCOMPAT_VARYING vec3 stretch;\nCOMPAT_VARYING vec2 sinangle;\nCOMPAT_VARYING vec2 cosangle;\nCOMPAT_VARYING vec2 one;\nCOMPAT_VARYING float mod_factor;\nCOMPAT_VARYING vec2 ilfac;\n\n#ifdef PARAMETER_UNIFORM\nuniform COMPAT_PRECISION float CRTgamma;\nuniform COMPAT_PRECISION float monitorgamma;\nuniform COMPAT_PRECISION float d;\nuniform COMPAT_PRECISION float CURVATURE;\nuniform COMPAT_PRECISION float R;\nuniform COMPAT_PRECISION float cornersize;\nuniform COMPAT_PRECISION float cornersmooth;\nuniform COMPAT_PRECISION float x_tilt;\nuniform COMPAT_PRECISION float y_tilt;\nuniform COMPAT_PRECISION float overscan_x;\nuniform COMPAT_PRECISION float overscan_y;\nuniform COMPAT_PRECISION float DOTMASK;\nuniform COMPAT_PRECISION float SHARPER;\nuniform COMPAT_PRECISION float scanline_weight;\n#endif\n\n#define FIX(c) max(abs(c), 1e-5);\n\nfloat intersect(vec2 xy)\n{\nfloat A = dot(xy,xy)+d*d;\nfloat B = 2.0*(R*(dot(xy,sinangle)-d*cosangle.x*cosangle.y)-d*d);\nfloat C = d*d + 2.0*R*d*cosangle.x*cosangle.y;\nreturn (-B-sqrt(B*B-4.0*A*C))/(2.0*A);\n}\n\nvec2 bkwtrans(vec2 xy)\n{\nfloat c = intersect(xy);\nvec2 point = vec2(c)*xy;\npoint -= vec2(-R)*sinangle;\npoint /= vec2(R);\nvec2 tang = sinangle/cosangle;\nvec2 poc = point/cosangle;\nfloat A = dot(tang,tang)+1.0;\nfloat B = -2.0*dot(poc,tang);\nfloat C = dot(poc,poc)-1.0;\nfloat a = (-B+sqrt(B*B-4.0*A*C))/(2.0*A);\nvec2 uv = (point-a*sinangle)/cosangle;\nfloat r = R*acos(a);\nreturn uv*r/sin(r/R);\n}\n\nvec2 fwtrans(vec2 uv)\n{\nfloat r = FIX(sqrt(dot(uv,uv)));\nuv *= sin(r/R)/r;\nfloat x = 1.0-cos(r/R);\nfloat D = d/R + x*cosangle.x*cosangle.y+dot(uv,sinangle);\nreturn d*(uv*cosangle-x*sinangle)/D;\n}\n\nvec3 maxscale()\n{\nvec2 c = bkwtrans(-R * sinangle / (1.0 + R/d*cosangle.x*cosangle.y));\nvec2 a = vec2(0.5,0.5)*aspect;\nvec2 lo = vec2(fwtrans(vec2(-a.x,c.y)).x, fwtrans(vec2(c.x,-a.y)).y)/aspect;\nvec2 hi = vec2(fwtrans(vec2(+a.x,c.y)).x, fwtrans(vec2(c.x,+a.y)).y)/aspect;\nreturn vec3((hi+lo)*aspect*0.5,max(hi.x-lo.x,hi.y-lo.y));\n}\n\nvoid main()\n{\n// START of parameters\n\n// gamma of simulated CRT\n//	CRTgamma = 1.8;\n// gamma of display monitor (typically 2.2 is correct)\n//	monitorgamma = 2.2;\n// overscan (e.g. 1.02 for 2% overscan)\noverscan = vec2(1.00,1.00);\n// aspect ratio\naspect = vec2(1.0, 0.75);\n// lengths are measured in units of (approximately) the width\n// of the monitor simulated distance from viewer to monitor\n//	d = 2.0;\n// radius of curvature\n//	R = 1.5;\n// tilt angle in radians\n// (behavior might be a bit wrong if both components are\n// nonzero)\nconst vec2 angle = vec2(0.0,0.0);\n// size of curved corners\n//	cornersize = 0.03;\n// border smoothness parameter\n// decrease if borders are too aliased\n//	cornersmooth = 1000.0;\n\n// END of parameters\n\nvec4 _oColor;\nvec2 _otexCoord;\ngl_Position = VertexCoord.x * MVPMatrix[0] + VertexCoord.y * MVPMatrix[1] + VertexCoord.z * MVPMatrix[2] + VertexCoord.w * MVPMatrix[3];\n_oPosition1 = gl_Position;\n_oColor = COLOR;\n_otexCoord = TexCoord.xy;\nCOL0 = COLOR;\nTEX0.xy = TexCoord.xy;\n\n// Precalculate a bunch of useful values we\'ll need in the fragment\n// shader.\nsinangle = sin(vec2(x_tilt, y_tilt)) + vec2(0.001);//sin(vec2(max(abs(x_tilt), 1e-3), max(abs(y_tilt), 1e-3)));\ncosangle = cos(vec2(x_tilt, y_tilt)) + vec2(0.001);//cos(vec2(max(abs(x_tilt), 1e-3), max(abs(y_tilt), 1e-3)));\nstretch = maxscale();\n\nilfac = vec2(1.0,clamp(floor(InputSize.y/200.0), 1.0, 2.0));\n\n// The size of one texel, in texture-coordinates.\nvec2 sharpTextureSize = vec2(SHARPER * TextureSize.x, TextureSize.y);\none = ilfac / sharpTextureSize;\n\n// Resulting X pixel-coordinate of the pixel we\'re drawing.\nmod_factor = TexCoord.x * TextureSize.x * OutputSize.x / InputSize.x;\n\n}\n\n#elif defined(FRAGMENT)\n\n#if __VERSION__ >= 130\n#define COMPAT_VARYING in\n#define COMPAT_TEXTURE texture\nout vec4 FragColor;\n#else\n#define COMPAT_VARYING varying\n#define FragColor gl_FragColor\n#define COMPAT_TEXTURE texture2D\n#endif\n\n#ifdef GL_ES\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n#define COMPAT_PRECISION mediump\n#else\n#define COMPAT_PRECISION\n#endif\n\nstruct output_dummy {\nvec4 _color;\n};\n\nuniform COMPAT_PRECISION int FrameDirection;\nuniform COMPAT_PRECISION int FrameCount;\nuniform COMPAT_PRECISION vec2 OutputSize;\nuniform COMPAT_PRECISION vec2 TextureSize;\nuniform COMPAT_PRECISION vec2 InputSize;\nuniform sampler2D Texture;\nCOMPAT_VARYING vec4 TEX0;\n\n// Comment the next line to disable interpolation in linear gamma (and\n// gain speed).\n#define LINEAR_PROCESSING\n\n// Enable screen curvature.\n//        #define CURVATURE\n\n// Enable 3x oversampling of the beam profile\n#define OVERSAMPLE\n\n// Use the older, purely gaussian beam profile\n//#define USEGAUSSIAN\n\n// Macros.\n#define FIX(c) max(abs(c), 1e-5);\n#define PI 3.141592653589\n\n#ifdef LINEAR_PROCESSING\n#       define TEX2D(c) pow(COMPAT_TEXTURE(Texture, (c)), vec4(CRTgamma))\n#else\n#       define TEX2D(c) COMPAT_TEXTURE(Texture, (c))\n#endif\n\nCOMPAT_VARYING vec2 one;\nCOMPAT_VARYING float mod_factor;\nCOMPAT_VARYING vec2 ilfac;\nCOMPAT_VARYING vec2 overscan;\nCOMPAT_VARYING vec2 aspect;\nCOMPAT_VARYING vec3 stretch;\nCOMPAT_VARYING vec2 sinangle;\nCOMPAT_VARYING vec2 cosangle;\n\n#ifdef PARAMETER_UNIFORM\nuniform COMPAT_PRECISION float CRTgamma;\nuniform COMPAT_PRECISION float monitorgamma;\nuniform COMPAT_PRECISION float d;\nuniform COMPAT_PRECISION float CURVATURE;\nuniform COMPAT_PRECISION float R;\nuniform COMPAT_PRECISION float cornersize;\nuniform COMPAT_PRECISION float cornersmooth;\nuniform COMPAT_PRECISION float x_tilt;\nuniform COMPAT_PRECISION float y_tilt;\nuniform COMPAT_PRECISION float overscan_x;\nuniform COMPAT_PRECISION float overscan_y;\nuniform COMPAT_PRECISION float DOTMASK;\nuniform COMPAT_PRECISION float SHARPER;\nuniform COMPAT_PRECISION float scanline_weight;\n#endif\n\nfloat intersect(vec2 xy)\n{\nfloat A = dot(xy,xy)+d*d;\nfloat B = 2.0*(R*(dot(xy,sinangle)-d*cosangle.x*cosangle.y)-d*d);\nfloat C = d*d + 2.0*R*d*cosangle.x*cosangle.y;\nreturn (-B-sqrt(B*B-4.0*A*C))/(2.0*A);\n}\n\nvec2 bkwtrans(vec2 xy)\n{\nfloat c = intersect(xy);\nvec2 point = vec2(c)*xy;\npoint -= vec2(-R)*sinangle;\npoint /= vec2(R);\nvec2 tang = sinangle/cosangle;\nvec2 poc = point/cosangle;\nfloat A = dot(tang,tang)+1.0;\nfloat B = -2.0*dot(poc,tang);\nfloat C = dot(poc,poc)-1.0;\nfloat a = (-B+sqrt(B*B-4.0*A*C))/(2.0*A);\nvec2 uv = (point-a*sinangle)/cosangle;\nfloat r = FIX(R*acos(a));\nreturn uv*r/sin(r/R);\n}\n\nvec2 transform(vec2 coord)\n{\ncoord *= TextureSize / InputSize;\ncoord = (coord-vec2(0.5))*aspect*stretch.z+stretch.xy;\nreturn (bkwtrans(coord)/vec2(overscan_x / 100.0, overscan_y / 100.0)/aspect+vec2(0.5)) * InputSize / TextureSize;\n}\n\nfloat corner(vec2 coord)\n{\ncoord *= TextureSize / InputSize;\ncoord = (coord - vec2(0.5)) * vec2(overscan_x / 100.0, overscan_y / 100.0) + vec2(0.5);\ncoord = min(coord, vec2(1.0)-coord) * aspect;\nvec2 cdist = vec2(cornersize);\ncoord = (cdist - min(coord,cdist));\nfloat dist = sqrt(dot(coord,coord));\nreturn clamp((cdist.x-dist)*cornersmooth,0.0, 1.0);\n}\n\n// Calculate the influence of a scanline on the current pixel.\n//\n// \'distance\' is the distance in texture coordinates from the current\n// pixel to the scanline in question.\n// \'color\' is the colour of the scanline at the horizontal location of\n// the current pixel.\nvec4 scanlineWeights(float distance, vec4 color)\n{\n// "wid" controls the width of the scanline beam, for each RGB\n// channel The "weights" lines basically specify the formula\n// that gives you the profile of the beam, i.e. the intensity as\n// a function of distance from the vertical center of the\n// scanline. In this case, it is gaussian if width=2, and\n// becomes nongaussian for larger widths. Ideally this should\n// be normalized so that the integral across the beam is\n// independent of its width. That is, for a narrower beam\n// "weights" should have a higher peak at the center of the\n// scanline than for a wider beam.\n#ifdef USEGAUSSIAN\nvec4 wid = 0.3 + 0.1 * pow(color, vec4(3.0));\nvec4 weights = vec4(distance / wid);\nreturn 0.4 * exp(-weights * weights) / wid;\n#else\nvec4 wid = 2.0 + 2.0 * pow(color, vec4(4.0));\nvec4 weights = vec4(distance / scanline_weight);\nreturn 1.4 * exp(-pow(weights * inversesqrt(0.5 * wid), wid)) / (0.6 + 0.2 * wid);\n#endif\n}\n\nvoid main()\n{\n// Here\'s a helpful diagram to keep in mind while trying to\n// understand the code:\n//\n//  |      |      |      |      |\n// -------------------------------\n//  |      |      |      |      |\n//  |  01  |  11  |  21  |  31  | <-- current scanline\n//  |      | @    |      |      |\n// -------------------------------\n//  |      |      |      |      |\n//  |  02  |  12  |  22  |  32  | <-- next scanline\n//  |      |      |      |      |\n// -------------------------------\n//  |      |      |      |      |\n//\n// Each character-cell represents a pixel on the output\n// surface, "@" represents the current pixel (always somewhere\n// in the bottom half of the current scan-line, or the top-half\n// of the next scanline). The grid of lines represents the\n// edges of the texels of the underlying texture.\n\n// Texture coordinates of the texel containing the active pixel.\nvec2 xy = (CURVATURE > 0.5) ? transform(TEX0.xy) : TEX0.xy;\n\nfloat cval = corner(xy);\n\n// Of all the pixels that are mapped onto the texel we are\n// currently rendering, which pixel are we currently rendering?\nvec2 ilvec = vec2(0.0,ilfac.y > 1.5 ? mod(float(FrameCount),2.0) : 0.0);\nvec2 ratio_scale = (xy * TextureSize - vec2(0.5) + ilvec)/ilfac;\n#ifdef OVERSAMPLE\nfloat filter_ = InputSize.y/OutputSize.y;//fwidth(ratio_scale.y);\n#endif\nvec2 uv_ratio = fract(ratio_scale);\n\n// Snap to the center of the underlying texel.\nxy = (floor(ratio_scale)*ilfac + vec2(0.5) - ilvec) / TextureSize;\n\n// Calculate Lanczos scaling coefficients describing the effect\n// of various neighbour texels in a scanline on the current\n// pixel.\nvec4 coeffs = PI * vec4(1.0 + uv_ratio.x, uv_ratio.x, 1.0 - uv_ratio.x, 2.0 - uv_ratio.x);\n\n// Prevent division by zero.\ncoeffs = FIX(coeffs);\n\n// Lanczos2 kernel.\ncoeffs = 2.0 * sin(coeffs) * sin(coeffs / 2.0) / (coeffs * coeffs);\n\n// Normalize.\ncoeffs /= dot(coeffs, vec4(1.0));\n\n// Calculate the effective colour of the current and next\n// scanlines at the horizontal location of the current pixel,\n// using the Lanczos coefficients above.\nvec4 col  = clamp(mat4(\n                TEX2D(xy + vec2(-one.x, 0.0)),\n                TEX2D(xy),\n                TEX2D(xy + vec2(one.x, 0.0)),\n                TEX2D(xy + vec2(2.0 * one.x, 0.0))) * coeffs,\n                0.0, 1.0);\nvec4 col2 = clamp(mat4(\n                TEX2D(xy + vec2(-one.x, one.y)),\n                TEX2D(xy + vec2(0.0, one.y)),\n                TEX2D(xy + one),\n                TEX2D(xy + vec2(2.0 * one.x, one.y))) * coeffs,\n                0.0, 1.0);\n\n#ifndef LINEAR_PROCESSING\ncol  = pow(col , vec4(CRTgamma));\ncol2 = pow(col2, vec4(CRTgamma));\n#endif\n\n// Calculate the influence of the current and next scanlines on\n// the current pixel.\nvec4 weights  = scanlineWeights(uv_ratio.y, col);\nvec4 weights2 = scanlineWeights(1.0 - uv_ratio.y, col2);\n#ifdef OVERSAMPLE\nuv_ratio.y =uv_ratio.y+1.0/3.0*filter_;\nweights = (weights+scanlineWeights(uv_ratio.y, col))/3.0;\nweights2=(weights2+scanlineWeights(abs(1.0-uv_ratio.y), col2))/3.0;\nuv_ratio.y =uv_ratio.y-2.0/3.0*filter_;\nweights=weights+scanlineWeights(abs(uv_ratio.y), col)/3.0;\nweights2=weights2+scanlineWeights(abs(1.0-uv_ratio.y), col2)/3.0;\n#endif\n\nvec3 mul_res  = (col * weights + col2 * weights2).rgb * vec3(cval);\n\n// dot-mask emulation:\n// Output pixels are alternately tinted green and magenta.\nvec3 dotMaskWeights = mix(\nvec3(1.0, 1.0 - DOTMASK, 1.0),\nvec3(1.0 - DOTMASK, 1.0, 1.0 - DOTMASK),\nfloor(mod(mod_factor, 2.0))\n);\n\nmul_res *= dotMaskWeights;\n\n// Convert the image gamma for display on our output device.\nmul_res = pow(mul_res, vec3(1.0 / monitorgamma));\n\n// Color the texel.\noutput_dummy _OUT;\n_OUT._color = vec4(mul_res, 1.0);\nFragColor = _OUT._color;\nreturn;\n} \n#endif\n\n'
        },
        _0x5bb4c9 = _0x2c1832(0x39),
        _0x50f370 = _0x2c1832.n(_0x5bb4c9),
        _0x246d02 = _0x2c1832(0xb),
        _0x550f17 = _0x2c1832.n(_0x246d02),
        _0x5ab74d = {
            'addStyleHook': function() {
                _0x3a8e2f(this.elements.container, this.config.selectors.container.replace('.', ''), true), _0x3a8e2f(this.elements.container, this.config.classNames.uiSupported, true), _0x3a8e2f(this.elements.container, this.config.classNames.hideControls, true);
            },
            'build': function() {
                this.listeners.media(), _0x1e2c68.element(this.elements.controls) || (_0x2593da.inject.call(this), this.listeners.controls()), this.volume = null, this.muted = null, _0x2593da.updateVolume.call(this), _0x3a8e2f(this.elements.container, this.config.classNames.isTouch, this.touch), this.ready = true;
            },
            'toggleControls': function(_0x4dbb7a) {
                var _0x17edbf = this.elements.controls;
                if (_0x17edbf) {
                    var _0x2c1832 = 0x0,
                        _0x4b4cd5 = _0x23ffa1.call(this, '.' .concat(_0x449eac({
                            'ejs__dialogs': true
                        }), ' > .').concat(_0x449eac({
                            'ejs__dialog': true
                        })));
                    Array.from(_0x4b4cd5).forEach(function(_0x208a40, _0xd7fcf0) {
                        true !== _0x208a40.hidden && (_0x2c1832 += 0x1);
                    }), _0x2c1832 > 0x0 ? this.toggleControls(!0x1) : this.toggleControls(Boolean(_0x4dbb7a || this.paused || _0x17edbf.pressed || _0x17edbf.hover));
                }
            }
        };

    function _0x5272a8(_0x4d422a) {
        return (_0x5272a8 = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function(_0x241239) {
            return typeof _0x241239;
        } : function(_0x39f252) {
            return _0x39f252 && 'function' == typeof Symbol && _0x39f252.constructor === Symbol && _0x39f252 !== Symbol.prototype ? 'symbol' : typeof _0x39f252;
        })(_0x4d422a);
    }

    function _0x3189ba(_0x4380c5, _0x3c0d58) {
        if ('object' === _0x5272a8(_0x4380c5) && _0x4380c5.files && (_0x4380c5 = _0x4380c5.files[0x0]), this.littleEndian = !0x1, this.offset = 0x0, this._lastRead = null, 'object' === _0x5272a8(_0x4380c5) && _0x4380c5.name && _0x4380c5.size) {
            if ('function' != typeof window.FileReader) throw new Error('Incompatible Browser');
            this.fileName = _0x4380c5.name, this.fileType = _0x4380c5.type, this.fileSize = _0x4380c5.size, this._fileReader = new FileReader(), this._fileReader.marcFile = this, this._fileReader.addEventListener('load', function() {
                this.marcFile._u8array = new Uint8Array(this.result), this.marcFile._dataView = new DataView(this.result), _0x3c0d58 && _0x3c0d58.call();
            }, !0x1), this._fileReader.readAsArrayBuffer(_0x4380c5);
        } else if ('object' === _0x5272a8(_0x4380c5) && 'string' == typeof _0x4380c5.fileName && 'boolean' == typeof _0x4380c5.littleEndian) {
            this.fileName = _0x4380c5.fileName, this.fileType = _0x4380c5.fileType, this.fileSize = _0x4380c5.fileSize;
            var _0x2c1832 = new ArrayBuffer(_0x4380c5);
            this._u8array = new Uint8Array(this.fileType), this._dataView = new DataView(this.fileType), _0x4380c5.copyToFile(this, 0x0), _0x3c0d58 && _0x3c0d58.call();
        } else if ('object' === _0x5272a8(_0x4380c5) && 'number' == typeof _0x4380c5.byteLength) this.fileName = 'file.bin', this.fileType = 'application/octet-stream', this.fileSize = _0x4380c5.byteLength, void 0x0 !== _0x4380c5.buffer && (_0x4380c5 = _0x4380c5.buffer), this._u8array = new Uint8Array(_0x4380c5), this._dataView = new DataView(_0x4380c5), _0x3c0d58 && _0x3c0d58.call();
        else {
            if ('number' != typeof _0x4380c5) throw new Error('Invalid source');
            this.fileName = 'file.bin', this.fileType = 'application/octet-stream', this.fileSize = _0x4380c5;
            _0x2c1832 = new ArrayBuffer(_0x4380c5);
            this._u8array = new Uint8Array(_0x2c1832), this._dataView = new DataView(_0x2c1832), _0x3c0d58 && _0x3c0d58.call();
        }
    }
    _0x3189ba.IS_MACHINE_LITTLE_ENDIAN = (_0x13fb79 = new ArrayBuffer(0x2), new DataView(_0x13fb79).setInt16(0x0, 0x100, true), 0x100 === new Int16Array(_0x13fb79)[0x0]), _0x3189ba.prototype.seek = function(_0x13e235) {
        this.offset = _0x13e235;
    }, _0x3189ba.prototype.skip = function(_0xfa033c) {
        this.offset += _0xfa033c;
    }, _0x3189ba.prototype.isEOF = function() {
        return !(this.offset < this.fileSize);
    }, _0x3189ba.prototype.slice = function(_0x2bfcbb, _0x8026e) {
        var _0x2c1832;
        return _0x8026e = _0x8026e || this.fileSize - _0x2bfcbb, void 0x0 !== this._u8array.buffer.slice ? ((_0x2c1832 = new _0x3189ba(0x0)).fileSize = _0x8026e, _0x2c1832._u8array = new Uint8Array(this._u8array.buffer.slice(_0x2bfcbb, _0x2bfcbb + _0x8026e))) : (_0x2c1832 = new _0x3189ba(_0x8026e), this.copyToFile(_0x2c1832, _0x2bfcbb, _0x8026e, 0x0)), _0x2c1832.fileName = this.fileName, _0x2c1832.fileType = this.fileType, _0x2c1832.littleEndian = this.littleEndian, _0x2c1832;
    }, _0x3189ba.prototype.copyToFile = function(_0x51f9b5, _0x1ada3e, _0x3997cd, _0x38ae1a) {
        void 0x0 === _0x38ae1a && (_0x38ae1a = _0x1ada3e), _0x3997cd = _0x3997cd || this.fileSize - _0x1ada3e;
        for (var _0x3bc3d8 = 0x0; _0x3bc3d8 < _0x3997cd; _0x3bc3d8++) _0x51f9b5._u8array[_0x38ae1a + _0x3bc3d8] = this._u8array[_0x1ada3e + _0x3bc3d8];
    }, _0x3189ba.prototype.save = function() {
        var _0xa88a13;
        try {
            _0xa88a13 = new Blob([this._u8array], {
                'type': this.fileType
            });
        } catch (_0x1dfb06) {
            if (window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder, 'InvalidStateError' !== _0x1dfb06.name || !window.BlobBuilder) throw new Error('Incompatible Browser');
            var _0x17edbf = new BlobBuilder();
            _0x17edbf.append(this._u8array.buffer), _0xa88a13 = _0x17edbf.getBlob(this.fileType);
        }
        saveAs(_0xa88a13, this.fileName);
    }, _0x3189ba.prototype.readU8 = function() {
        return this._lastRead = this._u8array[this.offset], this.offset++, this._lastRead;
    }, _0x3189ba.prototype.readU16 = function() {
        return this.littleEndian ? this._lastRead = this._u8array[this.offset] + (this._u8array[this.offset + 0x1] << 0x8) : this._lastRead = (this._u8array[this.offset] << 0x8) + this._u8array[this.offset + 0x1], this.offset += 0x2, this._lastRead >>> 0x0;
    }, _0x3189ba.prototype.readU24 = function() {
        return this.littleEndian ? this._lastRead = this._u8array[this.offset] + (this._u8array[this.offset + 0x1] << 0x8) + (this._u8array[this.offset + 0x2] << 0x10) : this._lastRead = (this._u8array[this.offset] << 0x10) + (this._u8array[this.offset + 0x1] << 0x8) + this._u8array[this.offset + 0x2], this.offset += 0x3, this._lastRead >>> 0x0;
    }, _0x3189ba.prototype.readU32 = function() {
        return this.littleEndian ? this._lastRead = this._u8array[this.offset] + (this._u8array[this.offset + 0x1] << 0x8) + (this._u8array[this.offset + 0x2] << 0x10) + (this._u8array[this.offset + 0x3] << 0x18) : this._lastRead = (this._u8array[this.offset] << 0x18) + (this._u8array[this.offset + 0x1] << 0x10) + (this._u8array[this.offset + 0x2] << 0x8) + this._u8array[this.offset + 0x3], this.offset += 0x4, this._lastRead >>> 0x0;
    }, _0x3189ba.prototype.readBytes = function(_0x455cfd) {
        this._lastRead = new Array(_0x455cfd);
        for (var _0x17edbf = 0x0; _0x17edbf < _0x455cfd; _0x17edbf++) this._lastRead[_0x17edbf] = this._u8array[this.offset + _0x17edbf];
        return this.offset += _0x455cfd, this._lastRead;
    }, _0x3189ba.prototype.readString = function(_0x4fe914) {
        this._lastRead = '';
        for (var _0x17edbf = 0x0; _0x17edbf < _0x4fe914 && this.offset + _0x17edbf < this.fileSize && this._u8array[this.offset + _0x17edbf] > 0x0; _0x17edbf++) this._lastRead = this._lastRead + String.fromCharCode(this._u8array[this.offset + _0x17edbf]);
        return this.offset += _0x4fe914, this._lastRead;
    }, _0x3189ba.prototype.writeU8 = function(_0x276206) {
        this._u8array[this.offset] = _0x276206, this.offset++;
    }, _0x3189ba.prototype.writeU16 = function(_0x1bfd8f) {
        this.littleEndian ? (this._u8array[this.offset] = 0xff & _0x1bfd8f, this._u8array[this.offset + 0x1] = _0x1bfd8f >> 0x8) : (this._u8array[this.offset] = _0x1bfd8f >> 0x8, this._u8array[this.offset + 0x1] = 0xff & _0x1bfd8f), this.offset += 0x2;
    }, _0x3189ba.prototype.writeU24 = function(_0x3d6067) {
        this.littleEndian ? (this._u8array[this.offset] = 0xff & _0x3d6067, this._u8array[this.offset + 0x1] = (0xff00 & _0x3d6067) >> 0x8, this._u8array[this.offset + 0x2] = (0xff0000 & _0x3d6067) >> 0x10) : (this._u8array[this.offset] = (0xff0000 & _0x3d6067) >> 0x10, this._u8array[this.offset + 0x1] = (0xff00 & _0x3d6067) >> 0x8, this._u8array[this.offset + 0x2] = 0xff & _0x3d6067), this.offset += 0x3;
    }, _0x3189ba.prototype.writeU32 = function(_0xa4dd26) {
        this.littleEndian ? (this._u8array[this.offset] = 0xff & _0xa4dd26, this._u8array[this.offset + 0x1] = (0xff00 & _0xa4dd26) >> 0x8, this._u8array[this.offset + 0x2] = (0xff0000 & _0xa4dd26) >> 0x10, this._u8array[this.offset + 0x3] = (0xff000000 & _0xa4dd26) >> 0x18) : (this._u8array[this.offset] = (0xff000000 & _0xa4dd26) >> 0x18, this._u8array[this.offset + 0x1] = (0xff0000 & _0xa4dd26) >> 0x10, this._u8array[this.offset + 0x2] = (0xff00 & _0xa4dd26) >> 0x8, this._u8array[this.offset + 0x3] = 0xff & _0xa4dd26), this.offset += 0x4;
    }, _0x3189ba.prototype.writeBytes = function(_0x5ad6b9) {
        for (var _0x17edbf = 0x0; _0x17edbf < _0x5ad6b9.length; _0x17edbf++) this._u8array[this.offset + _0x17edbf] = _0x5ad6b9[_0x17edbf];
        this.offset += _0x5ad6b9.length;
    }, _0x3189ba.prototype.writeString = function(_0x58c146, _0x23e582) {
        _0x23e582 = _0x23e582 || _0x58c146.length;
        for (var _0x2c1832 = 0x0; _0x2c1832 < _0x58c146.length && _0x2c1832 < _0x23e582; _0x2c1832++) this._u8array[this.offset + _0x2c1832] = _0x58c146.charCodeAt(_0x2c1832);
        for (; _0x2c1832 < _0x23e582; _0x2c1832++) this._u8array[this.offset + _0x2c1832] = 0x0;
        this.offset += _0x23e582;
    };
    var _0x863031 = _0x3189ba,
        _0x34e7cf = 0x0;

    function _0x454881() {
        this.records = [], this.truncate = !0x1;
    }

    function _0x288092(_0x1ab789) {
        var _0x17edbf = new _0x454881();
        _0x1ab789.seek(0x5);
        for (var _0x2c1832 = 0x0, _0x195f00 = 0x0; !_0x1ab789.isEOF();) {
            if (0x454f46 === (_0x2c1832 = _0x1ab789.readU24())) {
                if (_0x1ab789.isEOF()) break;
                if (_0x1ab789.offset + 0x3 === _0x1ab789.fileSize) {
                    _0x17edbf.truncate = _0x1ab789.readU24();
                    break;
                }
            }(_0x195f00 = _0x1ab789.readU16()) === _0x34e7cf ? _0x17edbf.addRLERecord(_0x2c1832, _0x1ab789.readU16(), _0x1ab789.readU8()) : _0x17edbf.addSimpleRecord(_0x2c1832, _0x1ab789.readBytes(_0x195f00));
        }
        return _0x17edbf;
    }
    _0x454881.prototype.addSimpleRecord = function(_0x37166f, _0x2e61e0) {
        this.records.push({
            'offset': _0x37166f,
            'type': 0x1,
            'length': _0x2e61e0.length,
            'data': _0x2e61e0
        });
    }, _0x454881.prototype.addRLERecord = function(_0x4ae2fb, _0x507845, _0x92bb02) {
        this.records.push({
            'offset': _0x4ae2fb,
            'type': _0x34e7cf,
            'length': _0x507845,
            'byte': _0x92bb02
        });
    }, _0x454881.prototype.toString = function() {
        nSimpleRecords = 0x0, nRLERecords = 0x0;
        for (var _0xa88a13 = 0x0; _0xa88a13 < this.records.length; _0xa88a13++) this.records[_0xa88a13].type === _0x34e7cf ? nRLERecords++ : nSimpleRecords++;
        var _0x17edbf = 'Simple records: ' + nSimpleRecords;
        return _0x17edbf += '\nRLE records: ' + nRLERecords, _0x17edbf += '\nTotal records: ' + this.records.length, this.truncate && (_0x17edbf += '\nTruncate at: 0x' + this.truncate.toString(0x10)), _0x17edbf;
    }, _0x454881.prototype.export = function(_0x4d18dc) {
        for (var _0x17edbf = 0x5, _0x2c1832 = 0x0; _0x2c1832 < this.records.length; _0x2c1832++) this.records[_0x2c1832].type === _0x34e7cf ? _0x17edbf += 0x8 : _0x17edbf += 0x5 + this.records[_0x2c1832].data.length;
        _0x17edbf += 0x3, this.truncate && (_0x17edbf += 0x3), tempFile = new _0x863031(_0x17edbf), tempFile.fileName = _0x4d18dc + '.ips', tempFile.writeString('PATCH');
        for (_0x2c1832 = 0x0; _0x2c1832 < this.records.length; _0x2c1832++) {
            var _0x512785 = this.records[_0x2c1832];
            tempFile.writeU24(_0x512785.offset), _0x512785.type === _0x34e7cf ? (tempFile.writeU16(0x0), tempFile.writeU16(_0x512785.length), tempFile.writeU8(_0x512785.byte)) : (tempFile.writeU16(_0x512785.data.length), tempFile.writeBytes(_0x512785.data));
        }
        return tempFile.writeString('EOF'), _0x512785.truncate && tempFile.writeU24(_0x512785.truncate), tempFile;
    }, _0x454881.prototype.apply = function(_0xefa71d) {
        var _0x17edbf;
        if (this.truncate) _0x17edbf = _0xefa71d.slice(0x0, this.truncate);
        else {
            for (var _0x2c1832 = _0xefa71d.fileSize, _0x5a0a71 = 0x0; _0x5a0a71 < this.records.length; _0x5a0a71++) {
                var _0x105576 = this.records[_0x5a0a71];
                _0x105576.type === _0x34e7cf ? _0x105576.offset + _0x105576.length > _0x2c1832 && (_0x2c1832 = _0x105576.offset + _0x105576.length) : _0x105576.offset + _0x105576.data.length > _0x2c1832 && (_0x2c1832 = _0x105576.offset + _0x105576.data.length);
            }
            _0x2c1832 === _0xefa71d.fileSize ? _0x17edbf = _0xefa71d.slice(0x0, _0xefa71d.fileSize) : (_0x17edbf = new _0x863031(_0x2c1832), _0xefa71d.copyToFile(_0x17edbf, 0x0));
        }
        _0xefa71d.seek(0x0);
        for (_0x5a0a71 = 0x0; _0x5a0a71 < this.records.length; _0x5a0a71++)
            if (_0x17edbf.seek(this.records[_0x5a0a71].offset), this.records[_0x5a0a71].type === _0x34e7cf)
                for (var _0x729105 = 0x0; _0x729105 < this.records[_0x5a0a71].length; _0x729105++) _0x17edbf.writeU8(this.records[_0x5a0a71].byte);
            else _0x17edbf.writeBytes(this.records[_0x5a0a71].data);
        return _0x17edbf;
    };
    '0123456789abcdef' .split('');
    var _0x1aa7ba = function() {
        for (var _0xa88a13, _0x17edbf = [], _0x2c1832 = 0x0; _0x2c1832 < 0x100; _0x2c1832++) {
            _0xa88a13 = _0x2c1832;
            for (var _0x32bcf1 = 0x0; _0x32bcf1 < 0x8; _0x32bcf1++) _0xa88a13 = 0x1 & _0xa88a13 ? 0xedb88320 ^ _0xa88a13 >>> 0x1 : _0xa88a13 >>> 0x1;
            _0x17edbf[_0x2c1832] = _0xa88a13;
        }
        return _0x17edbf;
    }();

    function _0x2d78e9(_0x509ecf, _0x4219e1, _0xd66d2b) {
        for (var _0x185f93 = _0x4219e1 ? new Uint8Array(_0x509ecf._u8array.buffer, _0x4219e1) : _0x509ecf._u8array, _0x20e2c1 = -0x1, _0x3d100a = _0xd66d2b ? _0x185f93.length - 0x4 : _0x185f93.length, _0x56a6e6 = 0x0; _0x56a6e6 < _0x3d100a; _0x56a6e6++) _0x20e2c1 = _0x20e2c1 >>> 0x8 ^ _0x1aa7ba[0xff & (_0x20e2c1 ^ _0x185f93[_0x56a6e6])];
        return (-0x1 ^ _0x20e2c1) >>> 0x0;
    }
    var _0x37eff4 = 0x0,
        _0x34d681 = 0x1,
        _0x4c50e7 = 0x2,
        _0xf9eeea = 0x3;

    function _0x5b02d3() {
        this.sourceSize = 0x0, this.targetSize = 0x0, this.metaData = '', this.actions = [], this.sourceChecksum = 0x0, this.targetChecksum = 0x0, this.patchChecksum = 0x0;
    }

    function _0x356089(_0x1bf770) {
        _0x1bf770.readVLV = _0x45da2c, _0x1bf770.littleEndian = true;
        var _0x17edbf = new _0x5b02d3();
        _0x1bf770.seek(0x4), _0x17edbf.sourceSize = _0x1bf770.readVLV(), _0x17edbf.targetSize = _0x1bf770.readVLV();
        var _0x2c1832 = _0x1bf770.readVLV();
        _0x2c1832 && (_0x17edbf.metaData = _0x1bf770.readString(_0x2c1832));
        for (var _0x157bba = _0x1bf770.fileSize - 0xc; _0x1bf770.offset < _0x157bba;) {
            var _0x31dcc2 = _0x1bf770.readVLV(),
                _0x21bafe = {
                    'type': 0x3 & _0x31dcc2,
                    'length': 0x1 + (_0x31dcc2 >> 0x2)
                };
            if (_0x21bafe.type === _0x34d681) _0x21bafe.bytes = _0x1bf770.readBytes(_0x21bafe.length);
            else if (_0x21bafe.type === _0x4c50e7 || _0x21bafe.type === _0xf9eeea) {
                var _0x4c6327 = _0x1bf770.readVLV();
                _0x21bafe.relativeOffset = (0x1 & _0x4c6327 ? -0x1 : 0x1) * (_0x4c6327 >> 0x1);
            }
            _0x17edbf.actions.push(_0x21bafe);
        }
        if (_0x17edbf.sourceChecksum = _0x1bf770.readU32(), _0x17edbf.targetChecksum = _0x1bf770.readU32(), _0x17edbf.patchChecksum = _0x1bf770.readU32(), _0x17edbf.patchChecksum !== _0x2d78e9(_0x1bf770, 0x0, true)) throw new Error('error_crc_patch');
        return _0x17edbf;
    }

    function _0x45da2c() {
        for (var _0xa88a13 = 0x0, _0x17edbf = 0x1;;) {
            var _0x2c1832 = this.readU8();
            if (_0xa88a13 += (0x7f & _0x2c1832) * _0x17edbf, 0x80 & _0x2c1832) break;
            _0xa88a13 += _0x17edbf <<= 0x7;
        }
        return this._lastRead = _0xa88a13, _0xa88a13;
    }

    function _0x152a53(_0x33f58d) {
        for (;;) {
            var _0x17edbf = 0x7f & _0x33f58d;
            if (0x0 === (_0x33f58d >>= 0x7)) {
                this.writeU8(0x80 | _0x17edbf);
                break;
            }
            this.writeU8(_0x17edbf), _0x33f58d--;
        }
    }

    function _0x5a4975(_0x221175) {
        for (var _0x17edbf = 0x0;;) {
            if (0x0 === (_0x221175 >>= 0x7)) {
                _0x17edbf++;
                break;
            }
            _0x17edbf++, _0x221175--;
        }
        return _0x17edbf;
    }

    function _0x562e68() {
        this.offset = 0x0, this.next = null;
    }
    _0x5b02d3.prototype.toString = function() {
        var _0xa88a13 = 'Source size: ' + this.sourceSize;
        return _0xa88a13 += '\nTarget size: ' + this.targetSize, _0xa88a13 += '\nMetadata: ' + this.metaData, _0xa88a13 += '\n#Actions: ' + this.actions.length;
    }, _0x5b02d3.prototype.validateSource = function(_0x48d2df, _0x3c15dd) {
        return this.sourceChecksum === _0x2d78e9(_0x48d2df, _0x3c15dd);
    }, _0x5b02d3.prototype.apply = function(_0x393f39, _0x76e509) {
        if (_0x76e509 && !this.validateSource(_0x393f39)) throw new Error('error_crc_input');
        for (var _0x2c1832 = new _0x863031(this.targetSize), _0x4df6ae = 0x0, _0xad0fa9 = 0x0, _0x38240a = 0x0; _0x38240a < this.actions.length; _0x38240a++) {
            var _0x4b1026 = this.actions[_0x38240a];
            if (_0x4b1026.type === _0x37eff4) _0x393f39.copyToFile(_0x2c1832, _0x2c1832.offset, _0x4b1026.length), _0x2c1832.skip(_0x4b1026.length);
            else if (_0x4b1026.type === _0x34d681) _0x2c1832.writeBytes(_0x4b1026.bytes);
            else if (_0x4b1026.type === _0x4c50e7) {
                _0x4df6ae += _0x4b1026.relativeOffset;
                for (var _0x5c2263 = _0x4b1026.length; _0x5c2263--;) _0x2c1832.writeU8(_0x393f39._u8array[_0x4df6ae]), _0x4df6ae++;
            } else if (_0x4b1026.type === _0xf9eeea) {
                _0xad0fa9 += _0x4b1026.relativeOffset;
                for (_0x5c2263 = _0x4b1026.length; _0x5c2263--;) _0x2c1832.writeU8(_0x2c1832._u8array[_0xad0fa9]), _0xad0fa9++;
            }
        }
        if (_0x76e509 && this.targetChecksum !== _0x2d78e9(_0x2c1832)) throw new Error('error_crc_output');
        return _0x2c1832;
    }, _0x5b02d3.prototype.export = function(_0x3e1e58) {
        var _0x17edbf = 'BPS1' .length;
        _0x17edbf += _0x5a4975(this.sourceSize), _0x17edbf += _0x5a4975(this.targetSize), _0x17edbf += _0x5a4975(this.metaData.length), _0x17edbf += this.metaData.length;
        for (var _0x2c1832 = 0x0; _0x2c1832 < this.actions.length; _0x2c1832++) {
            _0x17edbf += _0x5a4975(((_0x38dad6 = this.actions[_0x2c1832]).length - 0x1 << 0x2) + _0x38dad6.type), _0x38dad6.type === _0x34d681 ? _0x17edbf += _0x38dad6.length : _0x38dad6.type !== _0x4c50e7 && _0x38dad6.type !== _0xf9eeea || (_0x17edbf += _0x5a4975((Math.abs(_0x38dad6.relativeOffset) << 0x1) + (_0x38dad6.relativeOffset < 0x0 ? 0x1 : 0x0)));
        }
        var _0x2d1555 = new _0x863031(_0x17edbf += 0xc);
        _0x2d1555.fileName = _0x3e1e58 + '.bps', _0x2d1555.littleEndian = true, _0x2d1555.writeVLV = _0x152a53, _0x2d1555.writeString('BPS1'), _0x2d1555.writeVLV(this.sourceSize), _0x2d1555.writeVLV(this.targetSize), _0x2d1555.writeVLV(this.metaData.length), _0x2d1555.writeString(this.metaData, this.metaData.length);
        for (_0x2c1832 = 0x0; _0x2c1832 < this.actions.length; _0x2c1832++) {
            var _0x38dad6 = this.actions[_0x2c1832];
            _0x2d1555.writeVLV((_0x38dad6.length - 0x1 << 0x2) + _0x38dad6.type), _0x38dad6.type === _0x34d681 ? _0x2d1555.writeBytes(_0x38dad6.bytes) : _0x38dad6.type !== _0x4c50e7 && _0x38dad6.type !== _0xf9eeea || _0x2d1555.writeVLV((Math.abs(_0x38dad6.relativeOffset) << 0x1) + (_0x38dad6.relativeOffset < 0x0 ? 0x1 : 0x0));
        }
        return _0x2d1555.writeU32(this.sourceChecksum), _0x2d1555.writeU32(this.targetChecksum), _0x2d1555.writeU32(this.patchChecksum), _0x2d1555;
    }, _0x562e68.prototype.delete = function() {
        this.next && delete this.next;
    };
    var _0x7a6485 = 'UPS1';

    function _0x42cd9e() {
        this.records = [], this.sizeInput = 0x0, this.sizeOutput = 0x0, this.checksumInput = 0x0, this.checksumOutput = 0x0;
    }

    function _0x10dc1d(_0x5d0c48) {
        for (;;) {
            var _0x17edbf = 0x7f & _0x5d0c48;
            if (0x0 === (_0x5d0c48 >>= 0x7)) {
                this.writeU8(0x80 | _0x17edbf);
                break;
            }
            this.writeU8(_0x17edbf), _0x5d0c48 -= 0x1;
        }
    }

    function _0x454043() {
        for (var _0xa88a13 = 0x0, _0x17edbf = 0x1;;) {
            var _0x2c1832 = this.readU8();
            if (-0x1 == _0x2c1832) throw new Error('Can\'t read UPS VLV at 0x' + (this.offset - 0x1).toString(0x10));
            if (_0xa88a13 += (0x7f & _0x2c1832) * _0x17edbf, 0x0 != (0x80 & _0x2c1832)) break;
            _0xa88a13 += _0x17edbf <<= 0x7;
        }
        return _0xa88a13;
    }

    function _0xca245c(_0x459173) {
        for (var _0x17edbf = 0x0;;) {
            if (_0x17edbf++, 0x0 === (_0x459173 >>= 0x7)) break;
            _0x459173 -= 0x1;
        }
        return _0x17edbf;
    }

    function _0xd2202f(_0x5abb5e) {
        var _0x17edbf = new _0x42cd9e();
        _0x5abb5e.readVLV = _0x454043, _0x5abb5e.seek(_0x7a6485.length), _0x17edbf.sizeInput = _0x5abb5e.readVLV(), _0x17edbf.sizeOutput = _0x5abb5e.readVLV();
        for (; _0x5abb5e.offset < _0x5abb5e.fileSize - 0xc;) {
            for (var _0x2c1832 = _0x5abb5e.readVLV(), _0x3bca86 = []; _0x5abb5e.readU8();) _0x3bca86.push(_0x5abb5e._lastRead);
            _0x17edbf.addRecord(_0x2c1832, _0x3bca86);
        }
        return _0x5abb5e.littleEndian = true, _0x17edbf.checksumInput = _0x5abb5e.readU32(), _0x17edbf.checksumOutput = _0x5abb5e.readU32(), _0x5abb5e.littleEndian = !0x1, _0x17edbf;
    }
    _0x42cd9e.prototype.addRecord = function(_0x162ca5, _0x39594d) {
        this.records.push({
            'offset': _0x162ca5,
            'XORdata': _0x39594d
        });
    }, _0x42cd9e.prototype.toString = function() {
        var _0xa88a13 = 'Records: ' + (void 0x0).records.length;
        return _0xa88a13 += '\nInput file size: ' + (void 0x0).sizeInput, _0xa88a13 += '\nOutput file size: ' + (void 0x0).sizeOutput, _0xa88a13 += '\nInput file checksum: ' + padZeroes((void 0x0).checksumInput, 0x4), _0xa88a13 += '\nOutput file checksum: ' + padZeroes((void 0x0).checksumOutput, 0x4);
    }, _0x42cd9e.prototype.export = function(_0x1a3e8b) {
        var _0x17edbf = _0x7a6485.length;
        _0x17edbf += _0xca245c(this.sizeInput), _0x17edbf += _0xca245c(this.sizeOutput);
        for (var _0x2c1832 = 0x0; _0x2c1832 < this.records.length; _0x2c1832++) _0x17edbf += _0xca245c(this.records[_0x2c1832].offset), _0x17edbf += this.records[_0x2c1832].XORdata.length + 0x1;
        _0x17edbf += 0xc, tempFile = new _0x863031(_0x17edbf), tempFile.writeVLV = _0x10dc1d, tempFile.fileName = _0x1a3e8b + '.ups', tempFile.writeString(_0x7a6485), tempFile.writeVLV(this.sizeInput), tempFile.writeVLV(this.sizeOutput);
        for (_0x2c1832 = 0x0; _0x2c1832 < this.records.length; _0x2c1832++) tempFile.writeVLV(this.records[_0x2c1832].offset), tempFile.writeBytes(this.records[_0x2c1832].XORdata), tempFile.writeU8(0x0);
        return tempFile.littleEndian = true, tempFile.writeU32(this.checksumInput), tempFile.writeU32(this.checksumOutput), tempFile.writeU32(_0x2d78e9(tempFile, 0x0, true)), tempFile;
    }, _0x42cd9e.prototype.validateSource = function(_0x25cb26, _0xd0163c) {
        return _0x2d78e9(_0x25cb26, _0xd0163c) === this.checksumInput;
    }, _0x42cd9e.prototype.apply = function(_0x21d682, _0x41bbac) {
        _0x41bbac && this.validateSource(_0x21d682), tempFile = new _0x863031(this.sizeOutput), _0x21d682.copyToFile(tempFile, 0x0, this.sizeInput), _0x21d682.seek(0x0);
        for (var _0x2c1832 = 0x0; _0x2c1832 < this.records.length; _0x2c1832++) {
            var _0x5ed6c9 = this.records[_0x2c1832];
            tempFile.skip(_0x5ed6c9.offset), _0x21d682.skip(_0x5ed6c9.offset);
            for (var _0x3faf05 = 0x0; _0x3faf05 < _0x5ed6c9.XORdata.length; _0x3faf05++) tempFile.writeU8((_0x21d682.isEOF() ? 0x0 : _0x21d682.readU8()) ^ _0x5ed6c9.XORdata[_0x3faf05]);
            tempFile.skip(0x1), _0x21d682.skip(0x1);
        }
        return _0x41bbac && (_0x2d78e9(tempFile), this.checksumOutput), tempFile;
    };
    var _0xc778fa = _0x2c1832(0xa0),
        _0x5a641d = _0x2c1832.n(_0xc778fa),
        _0x4d7024 = {
            '_FS': {
                'createPath': function(parent, path, canRead, canWrite) {
                    if (! _0x4d7024.FS) return;
                    if (typeof _0x4d7024.FS.createPath != 'function') {
                        _0x4d7024.FS.mkdir(path);
                    } else {
                        _0x4d7024.FS.createPath(parent, path, canRead, canWrite);
                    }
                },
                'createDataFile': function(parent, name, data, canRead, canWrite, canOwn) {
                    if (! _0x4d7024.FS) return;
                    if (typeof _0x4d7024.FS.createDataFile != 'function') {
                        var path = function(parent, name) {
                            if (parent.endsWith('/') || name.startsWith('/')) {
                                return parent + name;
                            } else {
                                return parent + '/' + name;
                            }
                        }(parent, name);
                        _0x4d7024.FS.writeFile(path, data);
                    } else {
                        _0x4d7024.FS.createDataFile(parent, name, data, canRead, canWrite, canOwn);
                    }
                },
                'createFolder': function(parent, name, a, b) {
                    if (! _0x4d7024.FS) return;
                    if (typeof _0x4d7024.FS.createFolder != 'function') {
                        var path = function(parent, name) {
                            if (parent.endsWith('/') || name.startsWith('/')) {
                                return parent + name;
                            } else {
                                return parent + '/' + name;
                            }
                        }(parent, name);
                        _0x4d7024.FS.mkdir(path);
                    } else {
                        _0x4d7024.FS.createFolder(parent, name, a, b);
                    }
                }
            },
            'romdb': null,
            'supportBatterySave': !0x1,
            'hash': '2b35cacf70ae',
            'hash2': 'f5cbb3f38c0bb20e4',
            'hash3': '88cc8ad0c350400499a0',
            'loading': null,
            'gamePatch': null,
            'saveFilenames': [],
            'FS': null,
            'Module': null,
            'aspectRatio': 0x4 / 0x3,
            'memData': null,
            'wasmData': null,
            'coreFileData': {},
            'coreFileName': '',
            'coreFileVersion': '',
            'isMobileDevice': !!/Android|webOS|iPhone|iPad|iPod|BB10|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i .test(navigator.userAgent || ''),
            'create': function() {
                var _0xa88a13 = this;
                window.URL = window.URL || window.webkitURL;
                var _0x17edbf, _0x2c1832, _0x4ce206, _0x528f2b = !0x1,
                    _0x547484 = !0x1,
                    _0x5e24fa = !0x1,
                    _0x468801 = 0x0,
                    _0x31a5b3 = !0x1,
                    _0x1e0766 = {
                        'psx': ['bin', 'iso', 'cue', 'img', 'mdf', 'pbp', 'toc', 'cbn', 'm3u'],
                        'nds': ['nds', 'bin'],
                        'nes': ['fds', 'nes', 'unif', 'unf'],
                        'snes': ['smc', 'fig', 'sfc', 'gd3', 'gd7', 'dx2', 'bsx', 'swc'],
                        'snes2002': ['smc', 'fig', 'sfc', 'gd3', 'gd7', 'dx2', 'bsx', 'swc'],
                        'snes2005': ['smc', 'fig', 'sfc', 'gd3', 'gd7', 'dx2', 'bsx', 'swc'],
                        'snes2010': ['smc', 'fig', 'sfc', 'gd3', 'gd7', 'dx2', 'bsx', 'swc'],
                        'gb': ['gb', 'gbc', 'dmg'],
                        'gba': ['gb', 'gbc', 'gba'],
                        'vbanext': ['gba'],
                        'vb': ['vb', 'vboy', 'bin'],
                        '3do': ['iso', 'bin', 'cue'],
                        'lynx': ['lnx'],
                        'jaguar': ['j64', 'jag', 'rom', 'abs', 'cof', 'bin', 'prg'],
                        'a7800': ['a78', 'bin'],
                        'a2600': ['a26', 'bin'],
                        'ngp': ['ngp', 'ngc'],
                        'n64': ['n64', 'v64', 'z64', 'bin', 'u1', 'ndd'],
                        'pce': ['pce', 'bin', 'iso', 'cue', 'ccd', 'img', 'chd'],
                        'sega': ['mdx', 'md', 'smd', 'gen', 'bin', 'iso', 'cue', 'sms', 'gg', 'sg', '68k', 'chd'],
                        'segacd': ['mdx', 'md', 'smd', 'gen', 'bin', 'iso', 'cue', 'sms', 'gg', 'sg', '68k', 'chd'],
                        '32x': ['32x', 'bin', 'gen', 'smd', 'md', 'cue', 'iso', 'sms'],
                        'saturn': ['bin', 'cue', 'iso'],
                        'msx': ['rom', 'mx1', 'mx2', 'dsk', 'cas'],
                        'bluemsx': ['rom', 'ri', 'mx1', 'mx2', 'col', 'dsk', 'cas', 'sg', 'sc', 'm3u'],
                        'ws': ['ws', 'wsc'],
                        'arcade': ['zip'],
                        'fba0.2.97.29': ['zip'],
                        'mame2003': ['zip'],
                        'mame': ['zip'],
                        'dos': ['zip']
                    },
                    _0x29078e = {
                        'psx': 'psx',
                        'nds': 'nds',
                        'nes': 'nes',
                        'snes': 'snes',
                        'snes2002': 'snes2002',
                        'snes2005': 'snes2005',
                        'snes2010': 'snes2010',
                        'gb': 'gb',
                        'gbc': 'gb',
                        'gba': 'gba',
                        'vbanext': 'vbanext',
                        'vb': 'vb',
                        'n64': 'n64',
                        '3do': '3do',
                        'segaMS': 'sega',
                        'segaGG': 'sega',
                        'segaMD': 'sega',
                        'segaCD': 'segacd',
                        'sega32x': '32x',
                        'segaSaturn': 'saturn',
                        'ngp': 'ngp',
                        'pce': 'pce',
                        'msx': 'bluemsx',
                        'atari2600': 'a2600',
                        'atari7800': 'a7800',
                        'lynx': 'lynx',
                        'ws': 'ws',
                        'arcade': 'arcade',
                        'fba0.2.97.29': 'fba0.2.97.29',
                        'jaguar': 'jaguar',
                        'mame2003': 'mame2003',
                        'dos': 'dos'
                    },
                    _0xc6823 = this,
                    _0x1143c5 = _0xc6823.system;
                _0x17edbf = (_0xc6823.customPaths && typeof _0xc6823.customPaths['extract7z.js'] == 'string') ? _0xc6823.customPaths['extract7z.js'] : (_0xc6823.dataPath + 'extract7z.js');;
                _0x2c1832 = (_0xc6823.customPaths && typeof _0xc6823.customPaths['extractzip.js'] == 'string') ? _0xc6823.customPaths['extractzip.js'] : (_0xc6823.dataPath + 'extractzip.js?v=1');
                _0x4ce206 = (_0xc6823.customPaths && typeof _0xc6823.customPaths['libunrar.js'] == 'string') ? _0xc6823.customPaths['libunrar.js'] : (_0xc6823.dataPath + 'libunrar.js');
                var _0xb2be2a = _0x428003('canvas', {});
                this.game.appendChild(_0xb2be2a), _0x4d7024.loading = _0x428003('div', {
                    'class': this.config.classNames.loading
                }), this.elements.container.appendChild(_0x4d7024.loading);
                var _0x4fce24 = {
                        'loading-info': _0x449eac({
                            'loading-info': true
                        }),
                        'ad': _0x449eac({
                            'ad': true
                        }),
                        'close-ad': _0x449eac({
                            'close-ad': true
                        }),
                        'start-game': _0x449eac({
                            'start-game': true
                        }),
                        'on': _0x449eac({
                            'on': true
                        }),
                        'p1': _0x449eac({
                            'p1': true
                        }),
                        'p2': _0x449eac({
                            'p2': true
                        }),
                        'p3': _0x449eac({
                            'p3': true
                        }),
                        'p4': _0x449eac({
                            'p4': true
                        })
                    },
                    _0x4e198f = '';
                if (typeof _0xc6823.adUrl === 'string') {
                    _0x4d7024.loading.innerHTML = '\n        <div>\n        <div class="'+_0x4fce24.ad+'" style="display:block !important;width:300px !important">\n        <div class="'+_0x4fce24['close-ad']+'" hidden><a href="#" onclick="return false"></a></div>\n        <iframe scrolling="no" frameborder="no" style="width:300px !important;height:250px !important;display: block !important;" src="'+_0xc6823.adUrl+'"></iframe>\n        </div>\n        <div class="'+_0x4fce24['loading-info']+'" style="position: absolute;bottom: 20px;left: 50%;transform: translateX(-50%);">\n        <div class="'+_0x4fce24.p1+'"></div>\n        <div class="'+_0x4fce24.p2+'"></div>\n        <div class="'+_0x4fce24.p3+'"></div>\n        </div>\n        <div style="position: absolute;bottom: 20px;left: 50%;transform: translateX(-50%);">\n        <a href="#" onclick="return false" class="'+_0x4fce24['start-game']+'">'+(_0xb9b2ff.get('playNow', _0xc6823.config))+'</a>\n        </div>\n        </div>';
                var _0x2e2264 = _0x428003('iframe', {
                    'src': _0xc6823.adUrl,
                    'scrolling': 'no',
                    'frameborder': 'no',
                    'style': 'width:300px !important;height:250px !important;display: block !important;'
                });
                (_0x4d7024.loading.querySelector('.' .concat(_0x4fce24.ad)).removeChild(_0x4d7024.loading.querySelector('.' .concat(_0x4fce24.ad, ' iframe'))), _0x4d7024.loading.querySelector('.' .concat(_0x4fce24.ad)).appendChild(_0x2e2264), _0x2d904a.webgl.DETECTED) || (_0x132da7(_0x4d7024.loading.querySelector('.' .concat(_0x4fce24['start-game'])), true), _0x4d7024.loading.querySelector('.' .concat(_0x4fce24.p3)).innerHTML = '<strong style="color:#f00;text-shadow: 0px 0px 3px;">Failed to initialize WebGL.</strong>');
                    _0x4d7024.loading.querySelector('.' .concat(_0x4fce24.ad, ' iframe')).style.setProperty('display', 'block', 'important'), _0x4d7024.loading.querySelector('.' .concat(_0x4fce24.ad, ' iframe')).style.setProperty('visibility', 'visible', 'important'), _0x4d7024.loading.querySelector('.' .concat(_0x4fce24.ad)).style.setProperty('display', 'block', 'important'), _0x4d7024.loading.querySelector('.' .concat(_0x4fce24.ad)).style.setProperty('visibility', 'visible', 'important')
                } else {
                    _0x4d7024.loading.innerHTML = '\n        <div>\n        <div class="'.concat(_0x4fce24['loading-info'], '" style="position: absolute;bottom: 20px;left: 50%;transform: translateX(-50%);">\n        <div class="').concat(_0x4fce24.p1, '"></div>\n        <div class="').concat(_0x4fce24.p2, '"></div>\n        <div class="').concat(_0x4fce24.p3, '"></div>\n        </div>\n        <div style="position: absolute;bottom: 20px;left: 50%;transform: translateX(-50%);">\n        <a href="#" onclick="return false" class="').concat(_0x4fce24['start-game'], '">').concat(_0xb9b2ff.get('playNow', _0xc6823.config), '</a>\n        </div>\n        </div>');
                    if (! _0x2d904a.webgl.DETECTED) {
                        _0x132da7(_0x4d7024.loading.querySelector('.' .concat(_0x4fce24['start-game'])), true), _0x4d7024.loading.querySelector('.' .concat(_0x4fce24.p3)).innerHTML = '<strong style="color:#f00;text-shadow: 0px 0px 3px;">Failed to initialize WebGL.</strong>';
                    }
                }
                var _0x18a437 = window.URL || window.webkitURL;
                _0x550f17.a.interceptors.request.use(function(_0x1cd992) {
                    return _0x1cd992.headers['Content-Type'] = 'application/x-www-form-urlencoded', 'options' === _0x1cd992.method.toLowerCase() && (_0x1cd992.method = 'get'), _0x1cd992;
                }, function(_0x5150c8) {
                    return Promise.reject(_0x5150c8);
                });
                var _0x394c59 = function(_0x571737) {
                        var _0x17edbf;
                        return 0x50 === _0x571737[0x0] && 0x4b === _0x571737[0x1] && 0x3 === _0x571737[0x2] && 0x4 === _0x571737[0x3] ? _0x17edbf = 'zip' : 0x50 === _0x571737[0x0] && 0x4b === _0x571737[0x1] && 0x5 === _0x571737[0x2] && 0x6 === _0x571737[0x3] ? _0x17edbf = 'zip' : 0x50 === _0x571737[0x0] && 0x4b === _0x571737[0x1] && 0x7 === _0x571737[0x2] && 0x8 === _0x571737[0x3] ? _0x17edbf = 'zip' : 0x37 === _0x571737[0x0] && 0x7a === _0x571737[0x1] && 0xbc === _0x571737[0x2] && 0xaf === _0x571737[0x3] && 0x27 === _0x571737[0x4] && 0x1c === _0x571737[0x5] ? _0x17edbf = '7z' : 0x52 === _0x571737[0x0] && 0x61 === _0x571737[0x1] && 0x72 === _0x571737[0x2] && 0x21 === _0x571737[0x3] && 0x1a === _0x571737[0x4] && 0x7 === _0x571737[0x5] && 0x0 == _0x571737[0x6] && (_0x17edbf = 'rar'), _0x17edbf;
                    },
                    _0xa24f60 = function(_0xbf2b8b) {
                        var _0x17edbf = 'importScripts("'+_0xbf2b8b+'");',
                            _0x2c1832 = new Blob([_0x17edbf], {
                                'type': 'application/javascript'
                            }),
                            _0x501a8e = window.URL.createObjectURL(_0x2c1832);
                        return new Promise(function(_0x2d8147, _0x1b03b2) {
                            _0x2d8147(new Worker(_0x501a8e));
                        });
                    },
                    _0x41d0bd = function(_0x3a41ff, _0x2b541e) {
                            var _0x2c1832 = '';
                            if ('rar' == _0x2b541e) _0x2c1832 = '\nvar dataToPass = [];\nModule = {\n    monitorRunDependencies: function(left)  {\n        if (left == 0) {\n            setTimeout(function() {\n                unrar(dataToPass, null);\n            }, 100);\n        }\n    },\n    onRuntimeInitialized: function() {\n    },\n    locateFile: function(file) {\n        return \'' .concat(_0x3a41ff+'.mem', '\';\n    }\n};\nimportScripts("').concat(_0x3a41ff, '");\nvar unrar = function(data, password) {\n    var cb = function(fileName, fileSize, progress) {\n        postMessage({"t":4,"current":progress,"total":fileSize, "name": fileName});\n    };\n\n    var rarContent = readRARContent(data.map(function(d) {\n        return {\n            name: d.name,\n            content: new Uint8Array(d.content)\n        }\n    }), password, cb)\n    var rec = function(entry) {\n        if (entry.type === \'file\') {\n            postMessage({"t":2,"file":entry.fullFileName,"size":entry.fileSize,"data":entry.fileContent});\n        } else if (entry.type === \'dir\') {\n            Object.keys(entry.ls).forEach(function(k) {\n                rec(entry.ls[k]);\n            })\n        } else {\n            throw "Unknown type";\n        }\n    }\n    rec(rarContent);\n    postMessage({"t":1});\n    return rarContent;\n};\nonmessage = function(data) {\n    dataToPass.push({name:  \'test.rar\', content: data.data});\n};\n                ');
                            var _0x22326b = new Blob([_0x2c1832], {
                                    'type': 'application/javascript'
                                }),
                                _0x3635b1 = window.URL.createObjectURL(_0x22326b);
                            return new Promise(function(_0x2d169f, _0x341b0d) {
                                _0x2d169f(new Worker(_0x3635b1));
                            });
                    },
                    _0x24de8d = null,
                    _0x4e171c = null,
                    _0xa884ea = null,
                    _0x1ffb98 = null;
                try {
                    _0x24de8d = new _0x50f370.a({
                        'dbVersion': 0x1,
                        'storePrefix': 'ejs-',
                        'storeName': 'system',
                        'keyPath': null,
                        'autoIncrement': !0x1,
                        'onStoreReady': function() {
                            _0x528f2b = true;
                        },
                        'onError': function() {
                            _0x528f2b = true;
                        }
                    }), _0x4e171c = new _0x50f370.a({
                        'dbVersion': 0x1,
                        'storePrefix': 'ejs-',
                        'storeName': 'roms',
                        'keyPath': null,
                        'autoIncrement': !0x1,
                        'onStoreReady': function() {
                            _0x547484 = true;
                        },
                        'onError': function() {
                            _0x547484 = true;
                        }
                    }), _0xa884ea = new _0x50f370.a({
                        'dbVersion': 0x1,
                        'storePrefix': 'ejs-',
                        'storeName': 'bios',
                        'keyPath': null,
                        'autoIncrement': !0x1,
                        'onStoreReady': function() {
                            _0x5e24fa = true;
                        },
                        'onError': function() {
                            _0x5e24fa = true;
                        }
                    }), _0x1ffb98 = new _0x50f370.a({
                        'dbVersion': 0x1,
                        'storePrefix': 'ejs-',
                        'storeName': 'romsdata',
                        'keyPath': null,
                        'autoIncrement': !0x1,
                        'onStoreReady': function() {},
                        'onError': function() {}
                    });
                } catch (_0x4fc9b6) {
                    _0x528f2b = true, _0x547484 = true, _0x5e24fa = true, console.log(_0x4fc9b6);
                }
                _0x1093f4.call(_0xc6823, _0xc6823.elements.container, 'start-game', function(_0x3d9f57) {
                    _0xc6823.started = true, _0xc6823.playing = true, _0x132da7(_0x4d7024.loading.querySelector('.' .concat(_0x4fce24['loading-info'])), true);
                    if (_0xdcec2a && (_0xdcec2a.virtualGamepadContainer == 'undefined' || _0xdcec2a.virtualGamepadContainer === null)) {
                        _0x5ab74d.toggleControls.call(_0xc6823, true);
                    }
                    var _0x2c1832 = _0x449eac({
                            'ejs__tooltip--visible': true
                        }),
                        _0x10efa5 = _0xc6823.elements.buttons.gamepad.querySelector('.' .concat(_0x449eac({
                            'ejs__tooltip': true
                        })));
                    _0x3a8e2f(_0x10efa5, _0x2c1832, true), setTimeout(function() {
                        _0x3a8e2f(_0x10efa5, _0x2c1832, !0x1);
                    }, 0x1388)
                    if (typeof _0xc6823.adUrl === 'string') {
                        _0x132da7(_0x4d7024.loading.querySelector('.' .concat(_0x4fce24['close-ad'])), !0x1), setTimeout(function() {
                            _0xc6823.started && _0x4d7024.loading.querySelector('.' .concat(_0x4fce24.ad)) && _0x4d7024.loading.querySelector('.' .concat(_0x4fce24.ad)).parentNode.removeChild(_0x4d7024.loading.querySelector('.' .concat(_0x4fce24.ad)));
                        }, 0x2710)
                    }
                    _0x132da7(_0x4d7024.loading.querySelector('.' .concat(_0x4fce24['start-game'])), true);
                    var _0x30fd44 = _0x5dc0c0(_0x2593da.defaultCoreOptionsValues.call(_0xa88a13), _0x2593da.storage.get('core-options') || {});
                    'n64' === _0xc6823.system && _0x30fd44 && Object.keys(_0x30fd44).forEach(function(_0x3015d2) {
                            'glupen64-aspect' === _0x3015d2 && '16:9' === _0x30fd44[_0x3015d2] && (_0xb2be2a.height = _0xb2be2a.width / 0x10 * 0x9, _0x4d7024.aspectRatio = 0x10 / 0x9);
                        }), 'arcade' !== _0xa88a13.system && 'fba0.2.97.29' !== _0xa88a13.system || _0x30fd44 && Object.keys(_0x30fd44).forEach(function(_0x490c06) {
                            'fba-aspect' === _0x490c06 && 'PAR' === _0x30fd44[_0x490c06] && (_0xb2be2a.height = _0xb2be2a.width / 0x10 * 0x9, _0x4d7024.aspectRatio = 0x10 / 0x9);
                        }), 'gba' === _0xc6823.system && (_0xb2be2a.height = _0xb2be2a.width / 1.5, _0x4d7024.aspectRatio = 1.5), window.setTimeout(function() {}, 0x96),
                        function() {
                            var _0x3d9f57 = _0xa88a13;
                            if ('undefined' != typeof RI) {
                                document.removeEventListener('mousemove', RI.eventHandler, !0x1), _0xb2be2a.removeEventListener('mousedown', RI.canvasEventHandler, !0x1), _0xb2be2a.removeEventListener('mouseup', RI.canvasEventHandler, !0x1);
                                _0x3d9f57.elements.container.addEventListener('mousemove', function(_0x44f409) {
                                    var _0x3d9f57 = 0x0,
                                        _0x2c1832 = 0x0,
                                        _0x2cc8a1 = _0x44f409.offsetX - _0x4d7024.Module.canvas.offsetLeft,
                                        _0x5744ed = _0x44f409.offsetY - _0x4d7024.Module.canvas.offsetTop;
                                    switch (_0x44f409.type) {
                                        case 'mousemove':
                                            _0x2cc8a1 < 0x0 ? (_0x2cc8a1 = 0x0, _0x3d9f57 = -_0x4d7024.Module.canvas.offsetWidth) : _0x2cc8a1 > _0x4d7024.Module.canvas.offsetWidth ? (_0x2cc8a1 = _0x4d7024.Module.canvas.offsetWidth, _0x3d9f57 = _0x4d7024.Module.canvas.offsetWidth) : _0x3d9f57 = _0x2cc8a1 - RI.currentX, _0x5744ed < 0x0 ? (_0x5744ed = 0x0, _0x2c1832 = -_0x4d7024.Module.canvas.offsetHeight) : _0x5744ed > _0x4d7024.Module.canvas.offsetHeight ? (_0x5744ed = _0x4d7024.Module.canvas.offsetHeight, _0x2c1832 = _0x4d7024.Module.canvas.offsetHeight) : _0x2c1832 = _0x5744ed - RI.currentY, RI.currentX = _0x2cc8a1, RI.currentY = _0x5744ed;
                                            for (var _0x3e03cb = 0x0; _0x3e03cb < RI.contexts.length; _0x3e03cb += 0x1) HEAP32[RI.contexts[_0x3e03cb].state + 0x20 >> 0x2] = _0x3d9f57, HEAP32[RI.contexts[_0x3e03cb].state + 0x24 >> 0x2] = _0x2c1832;
                                    }
                                }, !0x1), _0x3d9f57.elements.container.addEventListener('mousedown', RI.canvasEventHandler, !0x1), _0x3d9f57.elements.container.addEventListener('mouseup', RI.canvasEventHandler, !0x1);
                                var _0x2c1832 = function(_0x5d0cbb) {
                                    if (_0x5d0cbb.targetTouches[0x0]) {
                                        var _0x3d9f57, _0x2c1832, _0x19a4e0 = 0x0,
                                            _0x2b7b61 = 0x0,
                                            _0x1e0f64 = _0x5d0cbb.target.getBoundingClientRect(),
                                            _0x2c55b8 = _0x5d0cbb.targetTouches[0x0].clientX - _0x1e0f64.left,
                                            _0x3a7025 = _0x5d0cbb.targetTouches[0x0].clientY - _0x1e0f64.top;
                                        _0x2c55b8 < 0x0 ? (_0x2c55b8 = 0x0, _0x19a4e0 = -_0x4d7024.Module.canvas.offsetWidth) : _0x2c55b8 > _0x4d7024.Module.canvas.offsetWidth ? (_0x2c55b8 = _0x4d7024.Module.canvas.offsetWidth, _0x19a4e0 = _0x4d7024.Module.canvas.offsetWidth) : _0x19a4e0 = _0x2c55b8 - RI.currentX, _0x3a7025 < 0x0 ? (_0x3a7025 = 0x0, _0x2b7b61 = -_0x4d7024.Module.canvas.offsetHeight) : _0x3a7025 > _0x4d7024.Module.canvas.offsetHeight ? (_0x3a7025 = _0x4d7024.Module.canvas.offsetHeight, _0x2b7b61 = _0x4d7024.Module.canvas.offsetHeight) : _0x2b7b61 = _0x3a7025 - RI.currentY, RI.currentX = _0x2c55b8, RI.currentY = _0x3a7025;
                                        for (var _0x43b670 = 0x0; _0x43b670 < RI.contexts.length; _0x43b670 += 0x1) HEAP32[RI.contexts[_0x43b670].state + 0x20 >> 0x2] = _0x19a4e0, HEAP32[RI.contexts[_0x43b670].state + 0x24 >> 0x2] = _0x2b7b61;
                                        switch (_0x5d0cbb.type) {
                                            case 'touchend':
                                            case 'touchstart':
                                                if (0x0 === _0x5d0cbb.button) _0x2c1832 = 0x28;
                                                else {
                                                    if (0x2 !== _0x5d0cbb.button) break;
                                                    _0x2c1832 = 0x29;
                                                }
                                                _0x3d9f57 = 'touchend' === _0x5d0cbb.type ? 0x0 : 0x1;
                                                for (var _0x443e8b = 0x0; _0x443e8b < RI.contexts.length; _0x443e8b += 0x1) HEAP8[RI.contexts[_0x443e8b].state + _0x2c1832 >> 0x0] = _0x3d9f57;
                                        }
                                    }
                                };
                                _0x3d9f57.elements.container.addEventListener('touchstart', _0x2c1832, !0x1), _0x3d9f57.elements.container.addEventListener('touchend', _0x2c1832, !0x1);
                            } else {
                                var _0x518e5a = function(_0x45d640) {
                                    var _0x3d9f57 = new MouseEvent(_0x45d640.type, _0x45d640);
                                    _0x4d7024.Module.canvas.dispatchEvent(_0x3d9f57);
                                };
                                _0x530042.call(_0xa88a13, '.' .concat(_0x449eac({
                                    'ejs__dialogs': true
                                }))).addEventListener('mousemove', _0x518e5a, !0x1), _0x530042.call(_0xa88a13, '.' .concat(_0x449eac({
                                    'ejs__dialogs': true
                                }))).addEventListener('mousedown', _0x518e5a, !0x1), _0x530042.call(_0xa88a13, '.' .concat(_0x449eac({
                                    'ejs__dialogs': true
                                }))).addEventListener('mouseup', _0x518e5a, !0x1);
                            }
                        }(), 'msx' === _0xc6823.system && function(_0x3c016a) {
                            if ('undefined' != typeof RI) {
                                document.removeEventListener('keydown', RI.eventHandler, !0x1), document.removeEventListener('keyup', RI.eventHandler, !0x1);
                                var _0x3d9f57 = function(_0x97e67b) {
                                    var _0x3d9f57 = _0x97e67b.keyCode,
                                        _0x2c1832 = _0x3d9f57 >> 0x3,
                                        _0x3340c0 = 0x1 << (0x7 & _0x3d9f57);
                                    switch (_0x97e67b.type) {
                                        case 'keyup':
                                        case 'keydown':
                                            if (_0x2c1832 >= 0x20) throw 'key code error! bad code: ' + _0x3d9f57;
                                            for (var _0x126f58 = 0x0; _0x126f58 < RI.contexts.length; _0x126f58++) {
                                                var _0x4ca77a = HEAP8[RI.contexts[_0x126f58].state + _0x2c1832 >> 0x0];
                                                'keyup' === _0x97e67b.type ? _0x4ca77a &= ~_0x3340c0 : _0x4ca77a |= _0x3340c0, HEAP8[RI.contexts[_0x126f58].state + _0x2c1832 >> 0x0] = _0x4ca77a;
                                            }
                                    }
                                };
                                document.addEventListener('keydown', _0x3d9f57, !0x1), document.addEventListener('keyup', _0x3d9f57, !0x1);
                            }
                        }(), setTimeout(function() {
                            var _0xa88a13;
                            _0xa88a13 = _0x59aa33.info(), null === _0xdcec2a.setVolume && 'undefined' != typeof RA ? (RA.queueAudio = function() {
                                var _0x3d9f57, _0x2c1832 = _0xc6823.volume,
                                    _0x2cbc4 = RA.bufIndex;
                                _0x3d9f57 = RA.bufIndex ? RA.buffers[RA.bufIndex - 0x1].endTime : RA.context.currentTime, RA.buffers[_0x2cbc4].endTime = _0x3d9f57 + RA.buffers[_0x2cbc4].duration;
                                var _0x4e7320 = RA.context.createBufferSource();
                                if (_0x4e7320.buffer = RA.buffers[_0x2cbc4], _0xc6823.muted && (_0x2c1832 = 0x0), 0x1 === _0x2c1832) _0x4e7320.connect(RA.context.destination);
                                else {
                                    var _0x3da8fc = RA.context.createGain();
                                    _0x4e7320.connect(_0x3da8fc), _0x3da8fc.connect(RA.context.destination), _0x59aa33.isEdge || 'chrome' === _0xa88a13.name && parseInt(_0xa88a13.version, 0xa) <= 0x3c || 'firefox' === _0xa88a13.name && parseInt(_0xa88a13.version, 0xa) <= 0x38 || 'opera' === _0xa88a13.name && parseInt(_0xa88a13.version, 0xa) <= 0x2c ? _0x3da8fc.gain.value = _0x2c1832 : 'firefox' === _0xa88a13.name ? _0x3da8fc.gain.setValueAtTime(_0x2c1832, RA.context.currentTime) : _0x3da8fc.gain.setValueAtTime(_0x2c1832, RA.context.currentTime, 0x0);
                                }
                                _0x4e7320.start(_0x3d9f57), RA.bufIndex += 0x1, RA.bufOffset = 0x0;
                            }, _0x59aa33.isIos && window.addEventListener('touchstart', function() {
                                if (RA.context) {
                                    RA.context.resume();
                                    var _0xa88a13 = RA.context.createBufferSource();
                                    _0xa88a13.connect(RA.context.destination), _0xa88a13.start();
                                }
                            }, !0x1)) : _0xdcec2a.setVolume();
                        }, 0x1f4), setTimeout(function() {
                            _0xc6823.elements.container.focus();
                        }, 0x1e), void 0x0 === window.addRunDependency && (window.Module = void 0x0);
                    var _0x36b9cc = _0x4d7024.FS.readFile(_0xc6823.startName);
                    if (_0x36b9cc.length <= 0x2000000 && '.cue' != _0xc6823.startName.substr(-0x4)) {
                        var _0x4fa964;
                        if ('snes' === _0xc6823.system || ['snes2002', 'snes2005', 'snes2010'].includes(_0xc6823.system)) {
                            var _0x4b2f70 = _0x36b9cc.length % 0x400;
                            _0x4fa964 = new _0x863031(_0x4b2f70 ? _0x36b9cc.slice ? _0x36b9cc.slice(_0x4b2f70) : _0x36b9cc.subarray(_0x4b2f70) : _0x36b9cc);
                        } else _0x4fa964 = new _0x863031(_0x36b9cc);
                        var _0x21e040 = _0x5a641d.a.create(),
                            _0x2b8478 = new FileReader(),
                            _0x15068c = 0x0,
                            _0x1646ca = _0x4fa964._u8array.length,
                            _0x4c84da = function() {
                                if (_0x15068c < _0x1646ca) {
                                    var _0xa88a13 = Math.min(_0x15068c + 0x200000, _0x1646ca);
                                    _0x2b8478.readAsArrayBuffer(new Blob([_0x4fa964._u8array.slice(_0x15068c, _0xa88a13)])), _0x15068c = _0xa88a13;
                                } else console.log(_0x21e040.hex()), _0xc6823.hash = _0x21e040.hex(), 'function' == typeof window.ejsromshash && window.ejsromshash(_0xc6823.hash);
                            };
                        _0x2b8478.onload = function(_0x26a751) {
                            try {
                                _0x21e040.update(_0x26a751.target.result), _0x4c84da();
                            } catch (_0x5c9e53) {
                                console.log(_0x5c9e53);
                            }
                        }, _0x4c84da();
                    }
                })
                if (typeof _0xc6823.adUrl === 'string') {
                    _0x1093f4.call(_0xc6823, _0x4d7024.loading.querySelector('.' .concat(_0x4fce24['close-ad'])), 'click', function(_0x96b13f) {
                        _0x96b13f instanceof MouseEvent && _0xc6823.started && _0x4d7024.loading.querySelector('.' .concat(_0x4fce24.ad)) && _0x4d7024.loading.querySelector('.' .concat(_0x4fce24.ad)).parentNode.removeChild(_0x4d7024.loading.querySelector('.' .concat(_0x4fce24.ad))), _0xc6823.elements.container.focus();
                    });
                }
                var _0x16cf3e = function() {
                        _0x4e171c.db && _0x4e171c.getAll(function(_0x1a4eaf) {
                            Array.isArray(_0x1a4eaf) && _0x1a4eaf.length > 0xa && _0x1a4eaf.sort(function(_0x155e15, _0x4a9e7f) {
                                return (_0x4a9e7f.lastaccess ? _0x4a9e7f.lastaccess : 0x0) - (_0x155e15.lastaccess ? _0x155e15.lastaccess : 0x0);
                            }).forEach(function(_0x43d1af, _0x2db4e2) {
                                _0x2db4e2 > 0xa && !_0x4d7024.saveFilenames.includes(_0x43d1af.key) ? (_0x4e171c.remove(_0x43d1af.key), _0x1ffb98.db && _0x1ffb98.remove(_0x43d1af.key)) : (delete _0x43d1af.data, _0x4e171c.put(_0x43d1af.key, _0x43d1af));
                            });
                        }, function() {
                            _0x4e171c.clear(), _0x1ffb98.db && _0x1ffb98.clear();
                        });
                    },
                    _0x5f3757 = function(_0x2bd107) {
                        if (_0x4d7024.gamePatch) {
                            var _0x17edbf = _0x2bd107.startName.split('/'),
                                _0x2c1832 = _0x17edbf.pop().split('.').pop(),
                                _0x11dc72 = (_0x4d7024.gamePatch.split('.').pop(), _0x4d7024.gamePatch.split('/').pop().split('.').shift()),
                                _0x453ec0 = '' .concat(_0x17edbf.join('/'), '/').concat(_0x11dc72, '.').concat(_0x2c1832);
                            _0x453ec0 = _0x453ec0.replace(/\#/g, '');
                            var _0x5438db = _0x4d7024.gamePatch;
                            if (_0x4d7024.FS.rename(_0x2bd107.startName, _0x453ec0), _0x2bd107.startName = _0x453ec0, 'snes' === _0x2bd107.system || ['snes2002', 'snes2005', 'snes2010'].includes(_0x2bd107.system)) {
                                var _0x4758bc, _0x4b4000, _0x4aa31e, _0x2d9175 = new _0x863031(_0x4d7024.FS.readFile(_0x2bd107.startName)),
                                    _0x567355 = _0x2d78e9(_0x2d9175),
                                    _0x3d2ad0 = new _0x863031(_0x4d7024.FS.readFile(_0x5438db)),
                                    _0x4a229b = _0x3d2ad0.readString(0x6),
                                    _0x20786d = _0x2d9175._u8array.length % 0x400;
                                _0x4a229b.startsWith('PATCH') ? (_0x4758bc = _0x288092(_0x3d2ad0), 0x0 === _0x20786d && 'B19ED489' === _0x567355.toString(0x10).toUpperCase() && ((_0x4b4000 = new Uint8Array(_0x2d9175._u8array.length + 0x200)).set(new Uint8Array(0x200), 0x0), _0x4b4000.set(_0x2d9175._u8array, 0x200), _0x2d9175 = new _0x863031(_0x4b4000))) : _0x4a229b.startsWith(_0x7a6485) ? _0x4758bc = _0xd2202f(_0x3d2ad0) : _0x4a229b.startsWith('BPS1') && (_0x4758bc = _0x356089(_0x3d2ad0), _0x20786d > 0x0 && 'A31BEAD4' === _0x567355.toString(0x10).toUpperCase() && (_0x4b4000 = _0x2d9175._u8array.slice ? _0x2d9175._u8array.slice(_0x20786d) : _0x2d9175._u8array.subarray(_0x20786d), _0x2d9175 = new _0x863031(_0x4b4000)));
                                try {
                                    if (_0x4aa31e = _0x4758bc.apply(_0x2d9175, !0x1)) {
                                        var _0x1ffde3 = _0x4aa31e._u8array.length % 0x400;
                                        _0x1ffde3 > 0x0 && (_0x4b4000 = _0x4aa31e._u8array.slice ? _0x4aa31e._u8array.slice(_0x1ffde3) : _0x4aa31e._u8array.subarray(_0x1ffde3), _0x4aa31e = new _0x863031(_0x4b4000)), _0x4d7024.FS.unlink(_0x5438db), _0x4d7024.FS.unlink(_0x2bd107.startName), _0x4d7024.FS.writeFile(_0x2bd107.startName, _0x4aa31e._u8array);
                                    }
                                } catch (_0x2ef20f) {}
                            } else {
                                var _0x4108d8, _0x5e086b, _0x454a20 = new _0x863031(_0x4d7024.FS.readFile(_0x2bd107.startName)),
                                    _0x4991ea = new _0x863031(_0x4d7024.FS.readFile(_0x5438db)),
                                    _0x130f1f = _0x4991ea.readString(0x6);
                                _0x130f1f.startsWith('PATCH') ? _0x4108d8 = _0x288092(_0x4991ea) : _0x130f1f.startsWith(_0x7a6485) ? _0x4108d8 = _0xd2202f(_0x4991ea) : _0x130f1f.startsWith('BPS1') && (_0x4108d8 = _0x356089(_0x4991ea));
                                try {
                                    (_0x5e086b = _0x4108d8.apply(_0x454a20, !0x1)) && (_0x4d7024.FS.unlink(_0x5438db), _0x4d7024.FS.unlink(_0x2bd107.startName), _0x4d7024.FS.writeFile(_0x2bd107.startName, _0x5e086b._u8array));
                                } catch (_0x3ed519) {}
                            }
                        }
                    },
                    _0x4bd781 = function() {
                        _0x31a5b3 ? (window.Module.TOTAL_MEMORY = 0x10000000, ['jaguar'].includes(_0xa88a13.system) && (window.Module.TOTAL_MEMORY = 0x10000000), ['nds', 'nes', 'snes', 'arcade', 'mame'].includes(_0xa88a13.system) && (window.Module.TOTAL_MEMORY = 0x0), ['snes2002', 'snes2005', 'snes2010'].includes(_0xa88a13.system) && (window.Module.TOTAL_MEMORY = 0x0), 'gba' == _0xa88a13.system && (window.Module.TOTAL_MEMORY = 0x0), '3do' == _0xa88a13.system && (window.Module.TOTAL_MEMORY = 0x0), 'n64' == _0xa88a13.system && (window.Module.TOTAL_MEMORY = 0x0)) : ('nes' === _0xa88a13.system && (window.Module.TOTAL_MEMORY = 0x8000000), window.Module.TOTAL_MEMORY = _0x468801 + 0x4000000, ['arcade', 'mame', 'mame2003', 'fba0.2.97.29'].includes(_0xa88a13.system) && (window.Module.TOTAL_MEMORY = _0x468801 + 0x10000000, _0x4d7024.isMobileDevice && (window.Module.TOTAL_MEMORY = 0x12c00000)), ['n64', 'nds', 'jaguar'].includes(_0xa88a13.system) && (window.Module.TOTAL_MEMORY = _0x468801 + 0x10000000, _0x4d7024.isMobileDevice && (window.Module.TOTAL_MEMORY = 0x12c00000)), 'gba' == _0xa88a13.system && (window.Module.TOTAL_MEMORY = 0x10000000)), 'undefined' != typeof EJS_MEMORY && (window.Module.TOTAL_MEMORY = EJS_MEMORY);
                    },
                    _0x3512e9 = function(_0x1bc287, _0x1844e3) {
                        var _0x55627a = _0xa88a13,
                            _0x1cfda7 = _0x4d7024.loading.querySelector('.' .concat(_0x4fce24.p3)),
                            _0x429d6b = (_0x1bc287.split('.').pop(), _0x29078e[_0x1143c5]),
                            _0xb0c5d8 = -0x1,
                            _0x567713 = '',
                            _0x567717 = function() {
                                if (typeof _0x55627a.loadStateOnStart == 'string') {
                                    fetch(_0x55627a.loadStateOnStart).then(function(response) {
                                        response.arrayBuffer().then(function(ab) {
                                            var a = new Uint8Array(ab)
                                            EJS_loadState(a)
                                        })
                                    })
                                }
                            };
                        window.EJS_terminate = function() {
                            _0x4d7024.Module.pauseMainLoop();
                            if (_0x55627a && _0x55627a.eventListeners) {
                                for (var k in _0x55627a) {
                                    for (var i=0; i<_0x55627a.eventListeners.length; i++) {
                                        var a = _0x55627a.eventListeners[i];
                                        a.element.removeEventListener(a.type, a.callback, a.capture);
                                    }
                                }
                            }
                            if (window.EJS_RESET_VARS) {
                                var a = [];
                                var b = [];
                                for (var k in window) {
                                    a.push(k);
                                }
                                for (var i=0; i<a.length; i++) {
                                    if (! window.EJS_RESET_VARS.includes(a[i])) {
                                        b.push(a[i]);
                                    }
                                }
                                for (var i=0; i<b.length; i++) {
                                    if (window[b[i]]) {
                                        delete window[b[i]];
                                    }
                                }
                            }
                        }
                        var _0x99321 = function(_0x52e6f3) {
                                if (_0x52e6f3.data) {
                                    if (0x1 === _0x52e6f3.data.t) {
                                        _0x1cfda7.innerHTML = 'Game Data ready', _0x52e6f3.target.terminate();
                                        try {
                                            _0x4bd781(), _0x5f3757(_0x55627a), _0x16cf3e();
                                            !_0x55627a.startName && _0x567713 && (_0x55627a.startName = _0x567713);
                                            var _0x2c1832 = [_0x55627a.startName,
                                                [_0x4d7024.hash, _0x4d7024.hash2, _0x4d7024.hash3].join('')
                                            ];
                                            'undefined' != typeof EJS_DEBUG_XX && true === EJS_DEBUG_XX && _0x2c1832.unshift('-v');
                                            _0x4d7024.Module.callMain(_0x2c1832);
                                            if (_0xc6823.coreVer === 2) {
                                                _0x4d7024.Module.resumeMainLoop();
                                                _0x4d7024.Module.setCanvasSize(800, 600);
                                            }
                                            _0xbae705.call(_0x55627a, _0x55627a.elements.container, 'start-game');
                                        } catch (_0x4a1471) {
                                            console.log(_0x4a1471), _0x1cfda7.innerHTML = '<strong style="color:#f00;text-shadow: 0px 0px 3px;">Failed to start game</strong>';
                                        }
                                        try{_0x567717();}catch(e){}
                                    }
                                    if (0x2 === _0x52e6f3.data.t) {
                                        var _0x25aae3 = _0x52e6f3.data.file.split('/'),
                                            _0x1bc287 = _0x25aae3.pop(),
                                            _0x1844e3 = _0x1bc287.split('.').pop();
                                        _0x1bc287 = _0x1bc287.replace(/\#/g, ''), _0x4d7024._FS.createPath('/', _0x25aae3.join('/'), true, true);
                                        for (var _0x36bace = _0x1e0766[_0x429d6b].length - 0x1; _0x36bace >= 0x0; _0x36bace -= 0x1) _0x1e0766[_0x429d6b][_0x36bace] === _0x1844e3.toLowerCase() && _0x36bace > _0xb0c5d8 && (_0xb0c5d8 = _0x36bace, _0x55627a.startName = ['', _0x25aae3.join('/'), _0x1bc287].join('/'), _0x55627a.startName = _0x55627a.startName.replace(/\/+/, '/'));
                                        _0x1bc287 && (_0x4d7024._FS.createDataFile('/' .concat(_0x25aae3.join('/')), _0x1bc287, _0x52e6f3.data.data, true, !0x1), _0x468801 += _0x52e6f3.data.data.length), _0x567713 = '/' .concat(_0x25aae3.join('/'), '/').concat(_0x1bc287);
                                    }
                                    if (0x4 === _0x52e6f3.data.t && _0x52e6f3.data.total > 0x0) {
                                        var _0x163fc4 = Math.floor(_0x52e6f3.data.current / _0x52e6f3.data.total * 0x64),
                                            _0x5448a3 = _0x52e6f3.data.name || '';
                                        _0x163fc4 <= 0x64 && _0x163fc4 > 0x0 && (_0x1cfda7.innerHTML = _0xa88a13.localization('Decompress Game Data')+' ' .concat(_0x5448a3, ' ').concat(_0x163fc4, '%'));
                                    }
                                }
                            },
                            _0x1e67c4 = !0x1;
                        if (!['arcade', 'mame', 'mame2003', 'fba0.2.97.29'].includes(_0x55627a.system)) {
                            var _0x20a78c = _0x1844e3.slice ? _0x1844e3.slice(0x0, 0xa) : _0x1844e3.subarray(0x0, 0xa),
                                _0x1761cf = _0x394c59(_0x20a78c);
                            '7z' === _0x1761cf ? (_0xa24f60(_0x17edbf).then(function(_0xea623e) {
                                _0xea623e.onmessage = _0x99321, _0xea623e.postMessage(_0x1844e3);
                            }), _0x1e67c4 = true) : 'zip' === _0x1761cf ? (_0xa24f60(_0x2c1832).then(function(_0x5a81e4) {
                                _0x5a81e4.onmessage = _0x99321, _0x5a81e4.postMessage(_0x1844e3);
                            }), _0x1e67c4 = true) : 'rar' == _0x1761cf && (_0x41d0bd(_0x4ce206, 'rar').then(function(_0x5f204f) {
                                _0x5f204f.onmessage = _0x99321, _0x5f204f.postMessage(_0x1844e3);
                            }), _0x1e67c4 = true);
                        }
                        if (!_0x1e67c4) {
                            var _0x1c661d = _0x1bc287.replace(/\#/g, '');
                            try {
                                _0x468801 += _0x1844e3.length, _0x4d7024._FS.createDataFile('/', _0x1c661d, _0x1844e3, true, !0x1);
                            } catch (_0x210043) {
                                console.log(_0x210043);
                            }
                            _0x4bd781(), _0x55627a.startName = _0x1c661d, _0x5f3757(_0x55627a), _0x16cf3e();
                            try {
                                var _0x4dd87f = [_0x55627a.startName,
                                        [_0x4d7024.hash, _0x4d7024.hash2, _0x4d7024.hash3].join('')
                                    ];	
                                'undefined' != typeof EJS_DEBUG_XX && true === EJS_DEBUG_XX && _0x4dd87f.unshift('-v');	
                                _0x4d7024.Module.callMain(_0x4dd87f);
                                if (_0xc6823.coreVer === 2) {
                                    _0x4d7024.Module.resumeMainLoop();
                                    _0x4d7024.Module.setCanvasSize(800, 600);
                                }
                                _0xbae705.call(_0x55627a, _0x55627a.elements.container, 'start-game');
                            } catch (_0x42970c) {
                                console.log(_0x42970c), _0x1cfda7.innerHTML = '<strong style="color:#f00;text-shadow: 0px 0px 3px;">Failed to start game</strong>';
                            }
                            try{_0x567717();}catch(e){}
                        }
                    },
                    _0x5048db = function() {
                        var _0x17edbf = _0xa88a13,
                            _0x2c1832 = _0x4d7024.loading.querySelector('.' .concat(_0x4fce24.p3)),
                            _0x50eb85 = _0xa88a13.config,
                            _0x3cf3cf = (_0x50eb85.gameId, _0x50eb85.gameUrl),
                            _0x594488 = _0x50eb85.system;
                        'vbanext' == _0x594488 && (_0x594488 = 'gba');
                        var _0x154dc5 = _0x3cf3cf.split('/'),
                            _0x139f1c = _0x154dc5[_0x154dc5.length - 0x1];
                        _0x139f1c.indexOf('?') > -0x1 && (_0x139f1c = _0x139f1c.substr(0x0, _0x139f1c.indexOf('?')));
                        _0x139f1c.split('.').pop();
                        _0x2c1832.innerHTML = _0xa88a13.localization('Download Game Data'), ['arcade', 'mame', 'mame2003', 'fba0.2.97.29'].includes(_0x17edbf.system) && _0x17edbf.config.gameParentUrl && (_0x2c1832.innerHTML += ' (2/2)'), _0x17edbf.config.gamePatchUrl && (_0x2c1832.innerHTML += ' (2/2)');
                        new Promise(async function(resolve, reject) {
                            if (! _0x3cf3cf.startsWith('blob:')) {
                                resolve(await _0x550f17.a.head(_0x3cf3cf, {}))
                            } else {
                                var a = await fetch(_0x3cf3cf)
                                var a = await a.blob()
                                resolve({headers:{'content-length': a.size, 'content-type': 'text/plain'}})
                            }
                        }).then(function(_0x3d703e) {
                            var _0x21b526 = _0x3d703e.headers['content-length'],
                                _0x7e8d4c = _0x3d703e.headers['content-type'],
                                _0x107e8a = (_0x3d703e.headers['last-modified'], '' .concat(_0x594488, '-').concat(_0x139f1c)),
                                _0x43a689 = function() {
                                    _0x550f17.a.get(_0x3cf3cf, {
                                        'onDownloadProgress': function(_0x4e7133) {
                                            var _0x13b999 = _0x4e7133.total ? '' .concat(Math.floor(_0x4e7133.loaded / _0x4e7133.total * 0x64), '%') : '';
                                            ['arcade', 'mame', 'mame2003', 'fba0.2.97.29'].includes(_0x17edbf.system) && _0x17edbf.config.gameParentUrl ? _0x2c1832.innerHTML = _0xa88a13.localization('Download Game Data')+' (2/2) ' .concat(_0x13b999) : _0x17edbf.config.gamePatchUrl ? _0x2c1832.innerHTML = _0xa88a13.localization('Download Game Data')+' (2/2) ' .concat(_0x13b999) : _0x2c1832.innerHTML = _0xa88a13.localization('Download Game Data')+' ' .concat(_0x13b999);
                                        },
                                        'responseType': 'arraybuffer'
                                    }).then(function(_0x22a1f4) {
                                        var _0x17edbf = new Uint8Array(_0x22a1f4.data);
                                        if (_0xa88a13.config.gameUrl.startsWith('blob:') || _0xa88a13.config.gameUrl.startsWith('file:') || _0xa88a13.config.gameUrl.startsWith('chrome-extension:') || ((window.location.protocol == 'file:' || window.location.protocol == 'chrome-extension:') && _0xa88a13.config.gameUrl.split(':').length == 1)) {_0x3512e9(_0x139f1c, _0x17edbf);return;};
                                        if (_0x107e8a && _0x4e171c.db)
                                            if (_0x17edbf.length > 0x6400000)
                                                for (var _0x2c1832 = Math.ceil(_0x17edbf.length / 0x6400000), _0x257c4d = 0x0; _0x257c4d < _0x2c1832; _0x257c4d += 0x1) {
                                                    var _0x47d2ae = _0x17edbf.slice ? _0x17edbf.slice(0x6400000 * _0x257c4d, 0x6400000 * (_0x257c4d + 0x1)) : _0x17edbf.subarray(0x6400000 * _0x257c4d, 0x6400000 * (_0x257c4d + 0x1)),
                                                        _0x6ce9f3 = '' .concat(_0x107e8a);
                                                    _0x257c4d > 0x0 && (_0x6ce9f3 = '' .concat(_0x107e8a, '-part-').concat(_0x257c4d)), _0x4d7024.saveFilenames.push(_0x6ce9f3), _0x4e171c.put(_0x6ce9f3, {
                                                        'filename': _0x139f1c,
                                                        'filesize': _0x17edbf.length,
                                                        'filetype': _0x7e8d4c,
                                                        'key': _0x6ce9f3,
                                                        'lastaccess': new Date().valueOf(),
                                                        'next': '' .concat(_0x107e8a, '-part-').concat(_0x257c4d + 0x1)
                                                    }), _0x1ffb98.db && _0x1ffb98.put(_0x6ce9f3, {
                                                        'filename': _0x139f1c,
                                                        'filesize': _0x17edbf.length,
                                                        'filetype': _0x7e8d4c,
                                                        'key': _0x6ce9f3,
                                                        'data': _0x47d2ae
                                                    });
                                                } else _0x4d7024.saveFilenames.push(_0x107e8a), _0x4e171c.put(_0x107e8a, {
                                                    'filename': _0x139f1c,
                                                    'filesize': _0x17edbf.length,
                                                    'filetype': _0x7e8d4c,
                                                    'key': _0x107e8a,
                                                    'lastaccess': new Date().valueOf()
                                                }), _0x1ffb98.db && _0x1ffb98.put(_0x107e8a, {
                                                    'filename': _0x139f1c,
                                                    'filesize': _0x17edbf.length,
                                                    'filetype': _0x7e8d4c,
                                                    'key': _0x107e8a,
                                                    'data': _0x17edbf
                                                });
                                        _0x3512e9(_0x139f1c, _0x17edbf);
                                    }).catch(function(_0x2e4d62) {
                                        console.log(_0x2e4d62), _0x2c1832.innerHTML = '<strong style="color:#f00;text-shadow: 0px 0px 3px;">'+_0xa88a13.localization('Network Error')+'</strong>';
                                    });
                                };
                            _0x1ffb98.db ? _0x1ffb98.get(_0x107e8a, function(_0x5afc4a) {
                                if (_0x5afc4a && _0x5afc4a.filename === _0x139f1c && _0x5afc4a.filesize - _0x21b526 == 0x0 && _0x5afc4a.filetype === _0x7e8d4c && _0x5afc4a.key)
                                    if (_0x4e171c.get(_0x107e8a, function(_0x2585bd) {
                                            _0x2585bd.lastaccess = new Date().valueOf(), _0x4e171c.put(_0x2585bd.key, _0x2585bd);
                                        }), _0x5afc4a.filesize > 0x6400000) {
                                        var _0x17edbf = new Uint8Array(_0x5afc4a.filesize);
                                        _0x17edbf.set(_0x5afc4a.data);
                                        for (var _0x2c1832 = Math.ceil(_0x5afc4a.filesize / 0x6400000), _0x36180f = [], _0x3c1e3a = 0x1; _0x3c1e3a < _0x2c1832; _0x3c1e3a += 0x1) _0x36180f.push('' .concat(_0x107e8a, '-part-').concat(_0x3c1e3a)), _0x4e171c.get('' .concat(_0x107e8a, '-part-').concat(_0x3c1e3a), function(_0x4f1393) {
                                            _0x4f1393.lastaccess = new Date().valueOf(), _0x4e171c.put(_0x4f1393.key, _0x4f1393);
                                        });
                                        _0x1ffb98.getBatch(_0x36180f, function(_0x47ffae) {
                                            _0x47ffae.filter(function(_0x3d76ae) {
                                                return _0x3d76ae;
                                            }).length !== _0x36180f.length ? _0x43a689() : (_0x47ffae.forEach(function(_0x15960c, _0x92d423) {
                                                _0x17edbf.set(_0x15960c.data, 0x6400000 * (_0x92d423 + 0x1));
                                            }), _0x3512e9(_0x5afc4a.filename, _0x17edbf));
                                        }, function() {}, 'sparse');
                                    } else _0x3512e9(_0x5afc4a.filename, _0x5afc4a.data);
                                else _0x43a689();
                            }) : _0x43a689();
                        }).catch(function(_0x5ec6be) {
                            _0x2c1832.innerHTML = '<strong style="color:#f00;text-shadow: 0px 0px 3px;">'+_0xa88a13.localization('Network Error')+'</strong>';
                        });
                    },
                    _0x139f68 = function() {
                        var _0x2591d9 = _0x4d7024.loading.querySelector('.' .concat(_0x4fce24.p3)),
                            _0x5c896f = _0xa88a13.config.gamePatchUrl;
                        if (_0x5c896f) {
                            var _0x227b23 = _0x5c896f.split('/'),
                                _0x179b43 = _0x227b23[_0x227b23.length - 0x1];
                            _0x179b43.indexOf('?') > -0x1 && (_0x179b43 = _0x179b43.substr(0x0, _0x179b43.indexOf('?')));
                            _0x179b43.split('.').pop();
                            _0x2591d9.innerHTML = _0xa88a13.localization('Download Game Data')+' (1/2)', _0x550f17.a.get(_0x5c896f, {
                                'onDownloadProgress': function(_0x3da9ab) {
                                    _0x2591d9.innerHTML = _0xa88a13.localization('Download Game Data')+' (1/2) ';
                                    var _0x17edbf = _0x3da9ab.total ? '' .concat(Math.floor(_0x3da9ab.loaded / _0x3da9ab.total * 0x64), '%') : '';
                                    _0x2591d9.innerHTML += _0x17edbf;
                                },
                                'responseType': 'arraybuffer'
                            }).then(function(_0x159ae9) {
                                var _0x39a81f = new Uint8Array(_0x159ae9.data);
                                ! function(_0xe531f0, _0x1097ca) {
                                    var _0xf6806b = _0x4d7024.loading.querySelector('.' .concat(_0x4fce24.p3)),
                                        _0x59c7c1 = (_0xe531f0.split('.').pop(), function(_0x36004e) {
                                            if (_0x36004e.data) {
                                                if (0x1 === _0x36004e.data.t && (_0x36004e.target.terminate(), _0x5048db()), 0x2 === _0x36004e.data.t) {
                                                    var _0x17edbf = _0x36004e.data.file.split('/'),
                                                        _0x2c1832 = _0x17edbf.pop(),
                                                        _0x2b320e = _0x2c1832.split('.').pop();
                                                    _0x4d7024._FS.createPath('/', _0x17edbf.join('/'), true, true), _0x4d7024._FS.createDataFile('/' + _0x17edbf.join('/'), _0x2c1832, _0x36004e.data.data, true, !0x1), _0x468801 += _0x36004e.data.data.length, ['ips', 'bps', 'ups'].includes(_0x2b320e) && !_0x4d7024.gamePatch && (_0x4d7024.gamePatch = '/' + _0x17edbf.join('/') + '/' + _0x2c1832);
                                                }
                                                if (0x4 === _0x36004e.data.t && _0x36004e.data.total > 0x0) {
                                                    var _0x1097ca = Math.floor(_0x36004e.data.current / _0x36004e.data.total * 0x64),
                                                        _0x95ac83 = _0x36004e.data.name || '';
                                                    _0x1097ca <= 0x64 && _0x1097ca > 0x0 && (_0xf6806b.innerHTML = _0xa88a13.localization('Decompress Game Patch')+' ' .concat(_0x95ac83, ' ').concat(_0x1097ca, '%'));
                                                }
                                            }
                                        }),
                                        _0x4c332a = !0x1,
                                        _0x3de3e4 = _0x1097ca.slice ? _0x1097ca.slice(0x0, 0xa) : _0x1097ca.subarray(0x0, 0xa),
                                        _0x17f736 = _0x394c59(_0x3de3e4);
                                    '7z' === _0x17f736 ? (_0xa24f60(_0x17edbf).then(function(_0x20601d) {
                                        _0x20601d.onmessage = _0x59c7c1, _0x20601d.postMessage(_0x1097ca);
                                    }), _0x4c332a = true) : 'zip' === _0x17f736 ? (_0xa24f60(_0x2c1832).then(function(_0x46622d) {
                                        _0x46622d.onmessage = _0x59c7c1, _0x46622d.postMessage(_0x1097ca);
                                    }), _0x4c332a = true) : 'rar' == _0x17f736 && (_0x41d0bd(_0x4ce206, 'rar').then(function(_0x2ecd24) {
                                        _0x2ecd24.onmessage = messageCallBack, _0x2ecd24.postMessage(_0x1097ca);
                                    }), _0x4c332a = true), _0x4c332a || (_0x468801 += _0x1097ca.length, _0x4d7024.gamePatch = '/' .concat(_0xe531f0), _0x4d7024._FS.createDataFile('/', _0xe531f0, _0x1097ca, true, !0x1), _0x5048db());
                                }(_0x179b43, _0x39a81f);
                            }).catch(function(_0x314293) {
                                console.log(_0x314293), _0x2591d9.innerHTML = '<strong style="color:#f00;text-shadow: 0px 0px 3px;">'+_0xa88a13.localization('Network Error')+'</strong>';
                            });
                        } else _0x5048db();
                    },
                    _0x452592 = function() {
                        var _0x17edbf = _0xa88a13,
                            _0x2c1832 = _0x4d7024.loading.querySelector('.' .concat(_0x4fce24.p3)),
                            _0x5a21f7 = _0xa88a13.config.gameParentUrl;
                        if (_0x5a21f7 && ['arcade', 'mame', 'mame2003', 'fba0.2.97.29'].includes(_0x17edbf.system)) {
                            var _0x71bb4d = _0x5a21f7.split('/'),
                                _0xa1889f = _0x71bb4d[_0x71bb4d.length - 0x1];
                            _0xa1889f.indexOf('?') > -0x1 && (_0xa1889f = _0xa1889f.substr(0x0, _0xa1889f.indexOf('?')));
                            _0xa1889f.split('.').pop();
                            _0x2c1832.innerHTML = _0xa88a13.localization('Download Game Data')+' (1/2)', _0x17edbf.config.gamePatchUrl && (_0x2c1832.innerHTML = _0xa88a13.localization('Download Game Data')+' (1/3)'), _0x550f17.a.head(_0x5a21f7, {}).then(function(_0x35c23a) {
                                var _0x17edbf = _0x35c23a.headers['content-length'],
                                    _0x500ba1 = _0x35c23a.headers['content-type'],
                                    _0x316472 = (_0x35c23a.headers['last-modified'], '' .concat(_0x1143c5, '-').concat(_0xa1889f)),
                                    _0x31f098 = function() {
                                        _0x550f17.a.get(_0x5a21f7, {
                                            'onDownloadProgress': function(_0x5e449f) {
                                                var _0x17edbf = _0x5e449f.total ? '' .concat(Math.floor(_0x5e449f.loaded / _0x5e449f.total * 0x64), '%') : '';
                                                _0x2c1832.innerHTML = _0xa88a13.localization('Download Game Data')+' (1/2) ' .concat(_0x17edbf);
                                            },
                                            'responseType': 'arraybuffer'
                                        }).then(function(_0x191007) {
                                            var _0x17edbf = new Uint8Array(_0x191007.data);
                                            if (_0x316472 && _0x4e171c.db)
                                                if (_0x17edbf.length > 0x6400000)
                                                    for (var _0x2c1832 = Math.ceil(_0x17edbf.length / 0x6400000), _0x3f44d7 = 0x0; _0x3f44d7 < _0x2c1832; _0x3f44d7 += 0x1) {
                                                        var _0x15a529 = _0x17edbf.slice ? _0x17edbf.slice(0x6400000 * _0x3f44d7, 0x6400000 * (_0x3f44d7 + 0x1)) : _0x17edbf.subarray(0x6400000 * _0x3f44d7, 0x6400000 * (_0x3f44d7 + 0x1)),
                                                            _0x4a61f1 = '' .concat(_0x316472);
                                                        _0x3f44d7 > 0x0 && (_0x4a61f1 = '' .concat(_0x316472, '-part-').concat(_0x3f44d7)), _0x4d7024.saveFilenames.push(_0x4a61f1), _0x4e171c.put(_0x4a61f1, {
                                                            'filename': _0xa1889f,
                                                            'filesize': _0x17edbf.length,
                                                            'filetype': _0x500ba1,
                                                            'key': _0x4a61f1,
                                                            'lastaccess': new Date().valueOf(),
                                                            'next': '' .concat(_0x316472, '-part-').concat(_0x3f44d7 + 0x1)
                                                        }), _0x1ffb98.db && _0x1ffb98.put(_0x4a61f1, {
                                                            'filename': _0xa1889f,
                                                            'filesize': _0x17edbf.length,
                                                            'filetype': _0x500ba1,
                                                            'key': _0x4a61f1,
                                                            'data': _0x15a529
                                                        });
                                                    } else _0x4d7024.saveFilenames.push(_0x316472), _0x4e171c.put(_0x316472, {
                                                        'filename': _0xa1889f,
                                                        'filesize': _0x17edbf.length,
                                                        'filetype': _0x500ba1,
                                                        'key': _0x316472,
                                                        'lastaccess': new Date().valueOf()
                                                    }), _0x1ffb98.db && _0x1ffb98.put(_0x316472, {
                                                        'filename': _0xa1889f,
                                                        'filesize': _0x17edbf.length,
                                                        'filetype': _0x500ba1,
                                                        'key': _0x316472,
                                                        'data': _0x17edbf
                                                    });
                                            var _0x54d79 = _0xa1889f.replace(/\#/g, '');
                                            try {
                                                _0x468801 += _0x17edbf.length, _0x4d7024._FS.createDataFile('/', _0x54d79, _0x17edbf, true, !0x1), _0x139f68();
                                            } catch (_0x125736) {
                                                console.log(_0x125736);
                                            }
                                        }).catch(function(_0x516cc3) {
                                            console.log(_0x516cc3), _0x2c1832.innerHTML = '<strong style="color:#f00;text-shadow: 0px 0px 3px;">'+_0xa88a13.localization('Network Error')+'</strong>';
                                        });
                                    };
                                _0x1ffb98.db ? _0x1ffb98.get(_0x316472, function(_0x3e612b) {
                                    if (_0x3e612b && _0x3e612b.filename === _0xa1889f && _0x3e612b.filesize - _0x17edbf == 0x0 && _0x3e612b.filetype === _0x500ba1 && _0x3e612b.key)
                                        if (_0x3e612b.filesize > 0x6400000) {
                                            var _0x2c1832 = new Uint8Array(_0x3e612b.filesize);
                                            _0x2c1832.set(_0x3e612b.data);
                                            for (var _0xa2197 = Math.ceil(_0x3e612b.filesize / 0x6400000), _0x6f30ae = [], _0x32aa3c = 0x1; _0x32aa3c < _0xa2197; _0x32aa3c += 0x1) _0x6f30ae.push('' .concat(_0x316472, '-part-').concat(_0x32aa3c));
                                            _0x1ffb98.getBatch(_0x6f30ae, function(_0x198a02) {
                                                _0x198a02.filter(function(_0x1c8a88) {
                                                    return _0x1c8a88;
                                                }).length !== _0x6f30ae ? _0x31f098() : (_0x198a02.forEach(function(_0x22b824, _0x16eecf) {
                                                    _0x2c1832.set(_0x22b824.data, 0x6400000 * (_0x16eecf + 0x1));
                                                }), _0x4d7024._FS.createDataFile('/', _0x3e612b.filename, _0x2c1832, true, !0x1), _0x139f68());
                                            }, function() {}, 'sparse');
                                        } else _0x4d7024._FS.createDataFile('/', _0x3e612b.filename, _0x3e612b.data, true, !0x1), _0x139f68();
                                    else _0x31f098();
                                }) : _0x31f098();
                            }).catch(function(_0x20f2e3) {
                                _0x2c1832.innerHTML = '<strong style="color:#f00;text-shadow: 0px 0px 3px;">'+_0xa88a13.localization('Network Error')+'</strong>';
                            });
                        } else _0x139f68();
                    },
                    _0x57d85d = function(_0x5e7c8b, _0x3cff36) {
                        var _0x3ea97 = _0xa88a13,
                            _0x50119 = _0x4d7024.loading.querySelector('.' .concat(_0x4fce24.p2)),
                            _0x19a43e = (_0x5e7c8b.split('.').pop(), function(_0x1e8643) {
                                if (_0x1e8643.data) {
                                    if (0x1 === _0x1e8643.data.t && (_0x50119.innerHTML = 'BIOS ready', _0x1e8643.target.terminate(), _0x452592()), 0x2 === _0x1e8643.data.t) {
                                        var _0x17edbf = _0x1e8643.data.file.split('/'),
                                            _0x2c1832 = _0x17edbf.pop();
                                        _0x2c1832.split('.').pop();
                                        _0x4d7024._FS.createPath('/', _0x17edbf.join('/'), true, true), _0x4d7024._FS.createDataFile('/' + _0x17edbf.join('/'), _0x2c1832, _0x1e8643.data.data, true, !0x1), _0x468801 += _0x1e8643.data.data.length;
                                    }
                                    if (0x4 === _0x1e8643.data.t && _0x1e8643.data.total > 0x0) {
                                        var _0x149f09 = Math.floor(_0x1e8643.data.current / _0x1e8643.data.total * 0x64),
                                            _0x5e7c8b = _0x1e8643.data.name || '';
                                        _0x149f09 <= 0x64 && _0x149f09 > 0x0 && (_0x50119.innerHTML = 'Decompress BIOS ' .concat(_0x5e7c8b, ' ').concat(_0x149f09, '%'));
                                    }
                                }
                            }),
                            _0x3a6560 = !0x1,
                            _0x12e229 = _0x3cff36.slice ? _0x3cff36.slice(0x0, 0xa) : _0x3cff36.subarray(0x0, 0xa),
                            _0x80852b = _0x394c59(_0x12e229);
                        '7z' === _0x80852b ? (_0xa24f60(_0x17edbf).then(function(_0x1b6a80) {
                            _0x1b6a80.onmessage = _0x19a43e, _0x1b6a80.postMessage(_0x3cff36);
                        }), _0x3a6560 = true) : 'zip' !== _0x80852b || ['arcade', 'mame', 'mame2003', 'fba0.2.97.29'].includes(_0x3ea97.system) ? 'rar' === _0x80852b && (_0x41d0bd(_0x4ce206, 'rar').then(function(_0x259be0) {
                            _0x259be0.onmessage = messageCallBack, _0x259be0.postMessage(_0x3cff36);
                        }), _0x3a6560 = true) : (_0xa24f60(_0x2c1832).then(function(_0x31c70d) {
                            _0x31c70d.onmessage = _0x19a43e, _0x31c70d.postMessage(_0x3cff36);
                        }), _0x3a6560 = true), _0x3a6560 || (_0x468801 += _0x3cff36.length, _0x50119.innerHTML = 'BIOS ready', _0x4d7024._FS.createDataFile('/', _0x5e7c8b, _0x3cff36, true, !0x1), _0x452592());
                    },
                    _0x10b71a = function() {
                        _0x4d7024.loading.querySelector('.' .concat(_0x4fce24.p1)).innerHTML = 'Game Core ready';
                        var _0x17edbf = _0xa88a13.config.biosUrl,
                            _0x2c1832 = _0xa88a13;
                        _0xdcec2a.bindFunction.call(_0xa88a13);
                        _0xdcec2a.setGamepadDialog.call(_0xa88a13);
                        _0xdcec2a.setCacheDialog.call(_0xa88a13);
                        _0xdcec2a.setLoadingDialog.call(_0xa88a13);
                        _0xdcec2a.setNetplayDialog.call(_0xa88a13);
                        _0xdcec2a.setCheatDialog.call(_0xa88a13);
                        _0xdcec2a.initGamepad.call(_0xa88a13);
                        _0xdcec2a.initKeyboard.call(_0xa88a13);
                        _0xdcec2a.listeners.call(_0xa88a13);
                        _0x4d7024._FS.createFolder('/', 'etc', true, true);
                        _0x4d7024.FS.mkdir('/data');
                        _0x4d7024.FS.mkdir('/data/saves');
                        'undefined' != typeof IDBFS ? _0x4d7024.FS.mount(IDBFS, {}, '/data/saves') : _0x4d7024.FS.mount(_0x4d7024.FS.filesystems.IDBFS, {}, '/data/saves');
                        _0x4d7024.FS.mkdir('/shader');
                        _0x4d7024.FS.syncfs(true, function(_0x1a8f12) {});
                        _0xdcec2a.initShaders();
                        var _0x14d39f = '';
                        _0x14d39f += 'savefile_directory = /data/saves\n';
                        _0x14d39f += 'video_vsync = true\n';
                        _0x14d39f += 'screenshot_directory = /\n';
                        _0x14d39f += 'video_shader = /shader/shader.glslp\n';
                        _0x14d39f += 'video_shader_enable = true\n';
                        _0x14d39f += 'video_font_enable = false\n';
                        _0x14d39f += 'video_scale = 1.0\n';
                        _0x14d39f += 'video_gpu_screenshot = false\n';
                        _0x14d39f += 'audio_latency = 96\n';
                        var _0x36edb7 = _0x2593da.defaultCoreOptionsValues.call(_0xa88a13);
                        _0x2c1832.lightgun && ('nes' === _0xa88a13.system && (_0x14d39f += 'input_libretro_device_p2 = "258"\n'), 'segaMS' !== _0xa88a13.system && 'segaMD' !== _0xa88a13.system && 'segaCD' !== _0xa88a13.system || (_0x36edb7.genesis_plus_gx_gun_cursor = 'yes', _0x36edb7.genesis_plus_gx_invert_mouse = 'yes', _0x36edb7.genesis_plus_gx_bram = 'per game', _0x14d39f += 'input_libretro_device_p2 = "260"\n'), 'snes' === _0xa88a13.system && (_0x14d39f += 'input_libretro_device_p2 = "260"\n'), ['snes2002', 'snes2005', 'snes2010', 'snesnext'].includes(_0xa88a13.system) && (_0x14d39f += 'input_libretro_device_p2 = "260"\n')), _0x2c1832.mouse && ('snes' === _0xa88a13.system && (_0x14d39f += 'input_libretro_device_p1 = 2\n'), ['snes2002', 'snes2005', 'snes2010', 'snesnext'].includes(_0xa88a13.system) && (_0x14d39f += 'input_libretro_device_p1 = 2\n')), _0x2c1832.multitap && ('snes' === _0xa88a13.system && (_0x14d39f += 'input_libretro_device_p2 = 257\n'), ['snes2002', 'snes2005', 'snes2010', 'snesnext'].includes(_0xa88a13.system) && (_0x14d39f += 'input_libretro_device_p2 = 257\n')), 'n64' === _0xa88a13.system && (_0x14d39f += 'input_libretro_device_p1 = 5\n'), _0x2c1832.system, _0x14d39f += 'fastforward_ratio = 1.0\n', _0x14d39f += 'video_smooth = false\n';
                        var _0x55117c = _0x5dc0c0(_0x36edb7, _0x2593da.storage.get('core-options') || {}),
                            _0x32dd27 = '';
                        if (_0x2c1832.coreVer === 2) {	
                            _0x4d7024._FS.createDataFile('/etc', 'retroarch.cfg', _0x14d39f, true, true);	
                            _0x4d7024._FS.createFolder('/home/web_user', 'retroarch', true, true);	
                            _0x4d7024._FS.createFolder('/home/web_user/retroarch', 'userdata', true, true);	
                            _0x4d7024._FS.createDataFile('/home/web_user/retroarch/userdata', 'retroarch.cfg', _0x32dd27, true, true);	
                        } else {
                            _0x4d7024._FS.createDataFile('/etc', 'retroarch.cfg', _0x14d39f, true, true);	
                            _0x4d7024._FS.createFolder('/home/web_user', '.config', true, true);	
                            _0x4d7024._FS.createFolder('/home/web_user/.config', 'retroarch', true, true);	
                            _0x4d7024._FS.createDataFile('/home/web_user/.config/retroarch', 'retroarch-core-options.cfg', _0x32dd27, true, true);	
                        }
                        if (_0x55117c && Object.keys(_0x55117c).forEach(function(_0x2950d3) {
                                if (_0x2c1832.lightgun && 'nes' === _0x2c1832.system && 'system_type' === _0x2950d3) return !0x1;
                                _0x32dd27 += '' .concat(_0x2950d3, ' = "').concat(_0x55117c[_0x2950d3], '"\n'), _0x1093f4.call(_0x2c1832, _0x2c1832.elements.container, 'start-game', function(_0x362c5c) {
                                    _0xdcec2a.setVariable(_0x2950d3, _0x55117c[_0x2950d3]);
                                });
                            }), _0x17edbf) {
                            var _0x12e137 = _0x17edbf.split('/'),
                                _0x103241 = _0x12e137[_0x12e137.length - 0x1];
                            _0x103241.indexOf('?') > -0x1 && (_0x103241 = _0x103241.substr(0x0, _0x103241.indexOf('?')));
                            _0x103241.split('.').pop();
                            var _0x1f8424 = _0x4d7024.loading.querySelector('.' .concat(_0x4fce24.p2));
                            _0x550f17.a.head(_0x17edbf, {}).then(function(_0x4bd3bd) {
                                var _0x8e30bf = _0x4bd3bd.headers['content-length'],
                                    _0x14309b = _0x4bd3bd.headers['content-type'],
                                    _0x51bfef = (_0x4bd3bd.headers['last-modified'], _0x2c1832.system),
                                    _0x574747 = function() {
                                        _0x550f17.a.get(_0x17edbf, {
                                            'onDownloadProgress': function(_0x107517) {
                                                var _0x17edbf = _0x107517.total ? '' .concat(Math.floor(_0x107517.loaded / _0x107517.total * 0x64), '%') : '';
                                                _0x1f8424.innerHTML = 'Download BIOS ' .concat(_0x17edbf);
                                            },
                                            'responseType': 'arraybuffer'
                                        }).then(function(_0x4b0c1d) {
                                            var _0x17edbf = new Uint8Array(_0x4b0c1d.data);
                                            _0xa884ea.db && _0xa884ea.put(_0x1143c5, {
                                                'filename': _0x103241,
                                                'filesize': _0x17edbf.length,
                                                'filetype': _0x14309b,
                                                'data': _0x17edbf
                                            }), _0x57d85d(_0x103241, _0x17edbf);
                                        }).catch(function(_0x58e374) {
                                            _0x1f8424.innerHTML = '<strong style="color:#f00;text-shadow: 0px 0px 3px;">'+_0xa88a13.localization('Network Error')+'</strong>';
                                        });
                                    };
                                _0xa884ea.db ? _0xa884ea.get(_0x51bfef, function(_0x5cac21) {
                                    _0x5cac21 && _0x5cac21.filename === _0x103241 && _0x5cac21.filesize - _0x8e30bf == 0x0 && _0x5cac21.filetype === _0x14309b ? _0x57d85d(_0x5cac21.filename, _0x5cac21.data) : _0x574747();
                                }) : _0x574747();
                            }).catch(function(_0x4f39c1) {
                                _0x1f8424.innerHTML = '<strong style="color:#f00;text-shadow: 0px 0px 3px;">'+_0xa88a13.localization('Network Error')+'</strong>';
                            });
                        } else _0x452592();
                    },
                    _0x29b999 = function(_0x172278) {
                        var _0x17edbf;
                        _0x17edbf = _0x172278.byteLength ? new Uint8Array(_0x172278) : _0x172278, 'undefined' != typeof GLOBAL_BASE ? _0x4d7024.Module.HEAPU8.set(_0x17edbf, GLOBAL_BASE) : 'undefined' != typeof Runtime && Runtime.GLOBAL_BASE ? _0x4d7024.Module.HEAPU8.set(_0x17edbf, Runtime.GLOBAL_BASE) : _0x4d7024.Module.HEAPU8.set(_0x17edbf, 0x8);
                    },
                    _0x4f0fcc = function(_0x18cb26) {
                        var _0x2c1832 = _0x4d7024.loading.querySelector('.' .concat(_0x4fce24.p1)),
                            _0x247459 = '',
                            _0x54d695 = function() {
                                null !== _0x4d7024.wasmData ? (window.Module.wasmBinary = _0x4d7024.wasmData, _0x4bd781(), window.Module.monitorRunDependencies = function(_0x59580a) {
                                    0x0 === _0x59580a && _0x10b71a();
                                }, window.Module.onRuntimeInitialized = function() {}) : (_0x4bd781(), window.Module.monitorRunDependencies = function(_0x55a24a) {
                                    console.log('monitorRunDependencies, ', _0x55a24a);
                                }, window.Module.onRuntimeInitialized = function() {
                                    _0x4d7024.Module || (_0x4d7024.Module = window.Module), _0x4d7024.Module && _0x4d7024.Module.FS ? _0x4d7024.FS = _0x4d7024.Module.FS : _0x4d7024.FS = window.FS, console.log('onRuntimeInitialized'), _0x10b71a();
                                });
                                var _0x18cb26 = window.Module;
                                if (null !== _0x4d7024.wasmData && (_0x18cb26.wasmBinary = _0x4d7024.wasmData), _0x59aa33.isIos && null !== _0x4d7024.wasmData) {
                                    var _0x17edbf = new Blob([_0x247459], {
                                            'type': 'text/javascript'
                                        }),
                                        _0x2c1832 = _0x428003('script', {
                                            'src': _0x18a437.createObjectURL(_0x17edbf)
                                        });
                                    document.body.appendChild(_0x2c1832), _0x2c1832.onload = function() {
                                        void 0x0 === window.addRunDependency && 'undefined' != typeof EmulatorJS && (_0x4d7024.Module = EmulatorJS(_0x18cb26), EmulatorJS = void 0x0), null !== _0x4d7024.memData && _0x29b999(_0x4d7024.memData), _0x4d7024.Module || (_0x4d7024.Module = window.Module), _0x4d7024.Module && _0x4d7024.Module.FS ? _0x4d7024.FS = _0x4d7024.Module.FS : _0x4d7024.FS = window.FS;
                                    };
                                } else _0x247459 = function(_0x3df03e) {
                                    for (var _0x17edbf = [], _0x2c1832 = 0x0; _0x2c1832 < _0x3df03e.length; _0x2c1832 += 0x1) {
                                        var _0xcf0289 = _0x3df03e[_0x2c1832];
                                        _0xcf0289 > 0xff && (_0xcf0289 &= 0xff), _0x17edbf.push(String.fromCharCode(_0xcf0289));
                                    }
                                    return _0x17edbf.join('');
                                }(_0x247459), window.eval(_0x247459), void 0x0 === window.addRunDependency && 'undefined' != typeof EmulatorJS && (_0x4d7024.Module = EmulatorJS(_0x18cb26), EmulatorJS = void 0x0), null !== _0x4d7024.memData && _0x29b999(_0x4d7024.memData), _0x4d7024.Module || (_0x4d7024.Module = window.Module), _0x4d7024.Module && _0x4d7024.Module.FS ? _0x4d7024.FS = _0x4d7024.Module.FS : _0x4d7024.FS = window.FS, window.EJS_MODULE = _0x4d7024.Module, window.ejs_loader = _0x4d7024, window.ejs_media = _0xdcec2a;
                                _0x247459 = null;
                            };
                        _0x1093f4.call(_0xc6823, _0xc6823.elements.container, 'script-loaded', function(_0x467eee) {
                            _0x54d695();
                        });
                        var _0x21d6a1 = function(_0x3f49ec) {
                            if (_0x3f49ec.data) {
                                if (0x1 === _0x3f49ec.data.t && (_0xbae705.call(_0xc6823, _0xc6823.elements.container, 'script-loaded'), _0x3f49ec.target.terminate()), 0x2 === _0x3f49ec.data.t) {
                                    var _0x17edbf = _0x3f49ec.data.file.split('/').pop(),
                                        _0x58b5a7 = _0x17edbf.split('.').pop();
                                    _0x4d7024.coreFileData[_0x17edbf] = _0x3f49ec.data.data, 'js' !== _0x58b5a7 || _0x17edbf.includes('.worker.js') || (_0x247459 = _0x3f49ec.data.data), 'mem' === _0x58b5a7 && (_0x4d7024.memData = _0x3f49ec.data.data), 'wasm' === _0x58b5a7 && (_0x4d7024.wasmData = _0x3f49ec.data.data);
                                }
                                0x4 === _0x3f49ec.data.t && _0x3f49ec.data.total > 0x0 && (_0x2c1832.innerHTML = _0xa88a13.localization('Decompress Game Core')+' ' .concat(Math.floor(_0x3f49ec.data.current / _0x3f49ec.data.total * 0x64), '%'));
                            }
                        };
                        _0xa24f60(_0x17edbf).then(function(_0x48c633) {
                            _0x48c633.onmessage = _0x21d6a1, _0x48c633.postMessage(_0x18cb26);
                        });
                    },
                    _0x26d6a1 = function(_0x3787ba) {
                        return _0x132da7(_0x4d7024.loading.querySelector('.' .concat(_0x4fce24['start-game'])), true),
                        function() {
                            var _0x3787ba = _0x4d7024.loading.querySelector('.' .concat(_0x4fce24.p1)),
                                _0x2c1832 = _0xa88a13;
                            _0x3787ba.innerHTML = _0x2c1832.localization('Loading')+'...';
                            var _0x1c9c57 = setInterval(function() {
                                if (true === _0x528f2b && true === _0x547484 && true === _0x5e24fa) {
                                    window.Module = {
                                        'TOTAL_MEMORY': 0x10000000,
                                        'noInitialRun': true,
                                        'arguments': [],
                                        'preRun': [],
                                        'postRun': [],
                                        'canvas': _0xb2be2a,
                                        'print': function(_0x4a8983) {
                                            if (window.EJS_DEBUG_XX === true) {
                                                console.log(_0x4a8983);
                                            }
                                        },
                                        'printErr': function(_0x367bee) {
                                            if (window.EJS_DEBUG_XX === true) {
                                                console.log(_0x367bee);
                                            }
                                        },
                                        'totalDependencies': 0x0,
                                        'monitorRunDependencies': function(_0x5d4b07) {},
                                        'locateFile': function(_0x3fe7ca) {
                                            var _0x3787ba = null;
                                            if (_0x3fe7ca.includes('.worker.js')) {
                                                Object.keys(_0x4d7024.coreFileData).includes(_0x3fe7ca) && (_0x3787ba = _0x4d7024.coreFileData[_0x3fe7ca]);
                                                var _0x2c1832 = new Blob([''], {
                                                    'type': 'application/javascript'
                                                });
                                                return window.URL.createObjectURL(_0x2c1832);
                                            }
                                            return _0x3fe7ca.includes('.js.mem') && (Object.keys(_0x4d7024.coreFileData).includes(_0x3fe7ca) && (_0x3787ba = _0x4d7024.coreFileData[_0x3fe7ca]), _0x3787ba) ? (_0x4d7024.memData = null, _0x3787ba.buffer) : _0x3fe7ca;
                                        },
                                        'readAsync': function(_0x20d016, _0x9d2de4, _0x1425ee) {
                                            if (_0x20d016 instanceof ArrayBuffer) setTimeout(function() {
                                                _0x9d2de4(_0x20d016);
                                            }, 0x1f4);
                                            else {
                                                var _0x164012 = new XMLHttpRequest();
                                                _0x164012.open('GET', _0x20d016, true), _0x164012.responseType = 'arraybuffer', _0x164012.onload = function() {
                                                    0xc8 == _0x164012.status || 0x0 == _0x164012.status && _0x164012.response ? _0x9d2de4(_0x164012.response) : _0x1425ee();
                                                }, _0x164012.onerror = _0x1425ee, _0x164012.send(null);
                                            }
                                        }
                                    };
                                    var _0xa88a13, _0x1dedcd = Math.ceil(new Date().valueOf() / 0x3e8);
                                    var _0xa88a13 = (_0xc6823.customPaths && typeof _0xc6823.customPaths['v.json'] == 'string') ? _0xc6823.customPaths['v.json'] : (_0xc6823.dataPath + 'v.json?t='+_0x1dedcd);
                                    var _0x3641d6 = function(_0x16049b, _0x55a075) {
                                        var path = (_0xc6823.customPaths && typeof _0xc6823.customPaths[_0x16049b] == 'string') ? _0xc6823.customPaths[_0x16049b] : ((_0xc6823.coreVer === 2) ? (_0xc6823.dataPath+_0x16049b+'?v='+_0x55a075) : (_0xc6823.dataPath+'old/'+_0x16049b+'?v='+_0x55a075));
                                        _0x550f17.a.get(path, {
                                            'onDownloadProgress': function(_0x117e6b) {
                                                var _0x55a075 = _0x117e6b.total ? '' .concat(Math.floor(_0x117e6b.loaded / _0x117e6b.total * 0x64), '%') : '';
                                                _0x3787ba.innerHTML = _0x2c1832.localization('Download Game Core')+' ' .concat(_0x55a075);
                                            },
                                            'responseType': 'arraybuffer'
                                        }).then(function(_0x5eb80b) {
                                            var _0x519406 = new Uint8Array(_0x5eb80b.data);
                                            _0x24de8d.db && _0x24de8d.put(_0x16049b, {
                                                'version': _0x55a075,
                                                'data': _0x519406
                                            });
                                            if (_0xc6823.coreVer === 2) {
                                                _0x4f0fcc(_0x519406);
                                            } else {
                                                var _0xea4c63 = _0x519406.slice ? _0x519406.slice(0xc) : _0x519406.subarray(0xc);
                                                _0xea4c63.set([0x37, 0x7a, 0xbc, 0xaf, 0x27, 0x1c, 0x0, 0x3], 0x0);
                                                _0x519406 = null;
                                                _0x4f0fcc(_0xea4c63);
                                            }
                                            
                                        }).catch(function(_0x2e06c8) {
                                            _0x3787ba.innerHTML = '<strong style="color:#f00;text-shadow: 0px 0px 3px;">'+_0x2c1832.localization('Network Error')+'</strong>';
                                        });
                                    };
                                    _0x550f17.a.get(_0xa88a13, {}).then(function(_0x578a2b) {
                                        var _0x2458d5, _0x5d075f = _0x29078e[_0x2c1832.system],
                                            _0x28ee7f = _0x578a2b.data[_0x2c1832.system],
                                            _0x124167 = _0x28ee7f.version ? _0x28ee7f.version : 0x1,
                                            _0x254bc2 = Boolean(_0x28ee7f.netplay),
                                            _0x5b1dcd = Boolean(_0x28ee7f.state),
                                            _0x9a1f1 = Boolean(_0x28ee7f.asmjs),
                                            _0x3e4345 = Boolean(_0x28ee7f.wasm);
                                        if (_0xc6823.coreVer !== 2 && _0x28ee7f.old) {
                                            _0x9a1f1 = Boolean(_0x28ee7f.old.asmjs);
                                            _0x3e4345 = Boolean(_0x28ee7f.old.wasm);
                                        }
                                        if ('nds' == _0x2c1832.system && ! _0x2d904a.wasm) {
                                            _0x5b1dcd = !0x1;
                                        };
                                        //alert(_0x5b1dcd) // is save/load state supported
                                        if (_0xc6823.statesSupported === false) {
                                            _0x5b1dcd = false;
                                        };
                                        _0x4d7024.coreFileVersion = _0x124167;
                                        _0x4d7024.coreFileName = _0x5d075f;
                                        var _0x2eb141 = !0x1;
                                        ['webgl2', 'experimental-webgl2'].includes(_0x2d904a.webgl.WEBGL_CONTEXT) && (_0x2eb141 = true);
                                        'undefined' != typeof EJS_N64_LEGACY && 0x1 == EJS_N64_LEGACY && (_0x2eb141 = !0x1);
                                        if ('mame' == _0x2c1832.system) {
                                            var data = _0x2c1832.mameCore;
                                            if (! data || data === null || data.split('|').length !== 2) {
                                                _0x3787ba.innerHTML = '<strong style="color:#f00;text-shadow: 0px 0px 3px;">'+_0x2c1832.localization('Missing mame config')+'</strong>';
                                                return;
                                            }
                                            var _0x3787ba = data.split('|');
                                            _0x4d7024.coreFileName = ''.concat(_0x2c1832.system, '-').concat(_0x3787ba[0x0]);
                                            _0x5b1dcd = '1' === _0x3787ba[0x1];
                                            _0x1e2c68.element(_0x2c1832.elements.buttons.saveState) && _0x132da7(_0x2c1832.elements.buttons.saveState, !_0x5b1dcd);
                                            _0x1e2c68.element(_0x2c1832.elements.buttons.loadState) && _0x132da7(_0x2c1832.elements.buttons.loadState, !_0x5b1dcd);
                                            _0x132da7(_0x2593da.contextMenu.querySelectorAll('ul li').item(0x2), !_0x5b1dcd);
                                            _0x132da7(_0x2593da.contextMenu.querySelectorAll('ul li').item(0x3), !_0x5b1dcd);
                                            if (_0x2c1832.coreVer === 2) {
                                                _0x2458d5 = '';
                                            } else {
                                                _0x2458d5 = _0x2c1832.system.concat('-old-').concat(_0x3787ba[0], '-wasm.data');
                                            }
                                            _0x3787ba[0x0] ? (_0x2d904a.wasm && _0x3e4345 ? (_0x31a5b3 = true) : (_0x3787ba.innerHTML = '<strong style="color:#f00;text-shadow: 0px 0px 3px;">'+_0x2c1832.localization('Webassembly support is not detected in this browser')+'</strong>', _0x2458d5 = ''), _0x2458d5 && (_0x24de8d.db ? _0x24de8d.get(_0x2458d5, function(_0x655c87) {
                                                if (_0x655c87 && _0x655c87.version === _0x124167) {
                                                    if (_0xc6823.coreVer === 2) {
                                                        _0x4f0fcc(_0x655c87.data);
                                                    } else {
                                                        var _0x3787ba = _0x655c87.data.slice ? _0x655c87.data.slice(0xc) : _0x655c87.data.subarray(0xc);
                                                        _0x3787ba.set([0x37, 0x7a, 0xbc, 0xaf, 0x27, 0x1c, 0x0, 0x3], 0x0);
                                                        _0x4f0fcc(_0x3787ba);
                                                    }
                                                } else _0x3641d6(_0x2458d5, _0x124167);
                                            }) : _0x3641d6(_0x2458d5, _0x124167))) : _0x3787ba.innerHTML = '<strong style="color:#f00;text-shadow: 0px 0px 3px;">'+_0x2c1832.localization('Unsupported Game')+'</strong>';
                                        } else {
                                            _0x2458d5 = false;
                                            var type;
                                            if (_0x2d904a.wasm && _0x3e4345) {
                                                type = 'wasm';
                                                _0x2458d5 = true;
                                                if ('n64' === _0x2c1832.system && !_0x2eb141) {
                                                    type = 'legacy-wasm';
                                                }
                                                _0x31a5b3 = true;
                                            } else if (_0x9a1f1) {
                                                _0x2458d5 = true;
                                                type = 'asmjs';
                                                if ('n64' === _0x2c1832.system && !_0x2eb141) {
                                                    type = 'legacy-asmjs';
                                                }
                                            }
                                            'undefined' != typeof EJS_CUSTOM_COREFILE && (_0x2458d5 = EJS_CUSTOM_COREFILE);
                                            if (_0x2458d5 !== true) {
                                                _0x3787ba.innerHTML = '<strong style="color:#f00;text-shadow: 0px 0px 3px;">'+_0x2c1832.localization('Please upgrade your browser to the latest version')+'</strong>';
                                                return;
                                            }
                                            if (_0x2c1832.coreVer === 2) {
                                                _0x2458d5 = _0x5d075f + '-' + type + '.data';
                                            } else {
                                                _0x2458d5 = _0x5d075f + '-old-' + type + '.data';
                                            }
                                            'undefined' != typeof EJS_CUSTOM_COREFILE && (_0x2458d5 = EJS_CUSTOM_COREFILE);
                                            _0x24de8d.db ? _0x24de8d.get(_0x2458d5, function(_0x47a6fd) {
                                                if (_0x47a6fd && _0x47a6fd.version === _0x124167 && !('undefined' != typeof EJS_DEBUG_XX && true === EJS_DEBUG_XX)) {
                                                    if (_0xc6823.coreVer === 2) {
                                                        _0x4f0fcc(_0x47a6fd.data);
                                                    } else {
                                                        var _0x3787ba = _0x47a6fd.data.slice ? _0x47a6fd.data.slice(0xc) : _0x47a6fd.data.subarray(0xc);
                                                        _0x3787ba.set([0x37, 0x7a, 0xbc, 0xaf, 0x27, 0x1c, 0x0, 0x3], 0x0);
                                                        _0x4f0fcc(_0x3787ba);
                                                    }
                                                } else _0x3641d6(_0x2458d5, _0x124167);
                                            }) : _0x3641d6(_0x2458d5, _0x124167);
                                        }
                                        if (_0x2c1832.coreVer === 2) {
                                            _0x1e2c68.element(_0x2c1832.elements.buttons.gamepad) && _0x132da7(_0x2c1832.elements.buttons.gamepad, true);
                                            if (Array.isArray(_0x2c1832.elements.buttons.play)) {
                                                for (var i=0; i<_0x2c1832.elements.buttons.play.length; i++) {
                                                    _0x1e2c68.element(_0x2c1832.elements.buttons.play[i]) && _0x132da7(_0x2c1832.elements.buttons.play[i], true);
                                                }
                                            } else {
                                                _0x1e2c68.element(_0x2c1832.elements.buttons.play) && _0x132da7(_0x2c1832.elements.buttons.play, true);
                                            }
                                        }
                                        _0x254bc2 || _0x1e2c68.element(_0x2c1832.elements.buttons.netplay) && _0x132da7(_0x2c1832.elements.buttons.netplay, true), _0x1e2c68.element(_0x2c1832.elements.buttons.saveState) && _0x132da7(_0x2c1832.elements.buttons.saveState, !_0x5b1dcd), _0x1e2c68.element(_0x2c1832.elements.buttons.loadState) && _0x132da7(_0x2c1832.elements.buttons.loadState, !_0x5b1dcd), _0x132da7(_0x2593da.contextMenu.querySelectorAll('ul li').item(0x2), !_0x5b1dcd), _0x132da7(_0x2593da.contextMenu.querySelectorAll('ul li').item(0x3), !_0x5b1dcd);
                                        _0xc6823.setStatesSupported(_0x5b1dcd);
                                    }).catch(function(_0x2d06a9) {
                                        _0x3787ba.innerHTML = '<strong style="color:#f00;text-shadow: 0px 0px 3px;">'+_0x2c1832.localization('Network Error')+'</strong>';
                                    }), clearInterval(_0x1c9c57), _0x4d7024.romdb = _0x4e171c;
                                }
                            }, 0x1f4);
                        }(), !0x1;
                    };
                _0x455c85(_0x4d7024.loading.querySelector('.' .concat(_0x4fce24['start-game'])), 'click touchstart', _0x26d6a1);
                if (_0xc6823.startOnLoad === true) {
                    _0x26d6a1()
                }
            }
        },
        _0x27f4c4 = _0x4d7024,
        _0x4a2390 = _0x2c1832(0xa1);

    function _0x3c0613(_0x3eef01) {
        return function(_0x3d9b1e) {
            if (Array.isArray(_0x3d9b1e)) {
                for (var _0x17edbf = 0x0, _0x2c1832 = new Array(_0x3d9b1e.length); _0x17edbf < _0x3d9b1e.length; _0x17edbf++) _0x2c1832[_0x17edbf] = _0x3d9b1e[_0x17edbf];
                return _0x2c1832;
            }
        }(_0x3eef01) || function(_0x425c1a) {
            if (Symbol.iterator in Object(_0x425c1a) || '[object Arguments]' === Object.prototype.toString.call(_0x425c1a)) return Array.from(_0x425c1a);
        }(_0x3eef01) || function() {
            throw new TypeError('Invalid attempt to spread non-iterable instance');
        }();
    }

    function _0xa08ac0(_0x514af5, _0x4089be) {
        for (var _0x2c1832 = 0x0; _0x2c1832 < _0x4089be.length; _0x2c1832++) {
            var _0x3347c8 = _0x4089be[_0x2c1832];
            _0x3347c8.enumerable = _0x3347c8.enumerable || !0x1, _0x3347c8.configurable = true, 'value' in _0x3347c8 && (_0x3347c8.writable = true), Object.defineProperty(_0x514af5, _0x3347c8.key, _0x3347c8);
        }
    }
    var _0x1eda08, _0x4fc27f, _0xf43a92, _0x214f42, _0x3a9bfc, _0x4d8495 = (_0x1eda08 = ['a[href]', 'area[href]', 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', 'select:not([disabled]):not([aria-hidden])', 'textarea:not([disabled]):not([aria-hidden])', 'button:not([disabled]):not([aria-hidden])', 'iframe', 'object', 'embed', '[contenteditable]', '[tabindex]:not([tabindex^="-"])'], _0x4fc27f = function() {
            function _0x5566a2(_0x1fcb21) {
                var _0x2c1832 = _0x1fcb21.targetModal,
                    _0x29e6ab = _0x1fcb21.triggers,
                    _0x114128 = void 0x0 === _0x29e6ab ? [] : _0x29e6ab,
                    _0x5211ae = _0x1fcb21.onShow,
                    _0x402faa = void 0x0 === _0x5211ae ? function() {} : _0x5211ae,
                    _0x120cc3 = _0x1fcb21.onClose,
                    _0x48ad1c = void 0x0 === _0x120cc3 ? function() {} : _0x120cc3,
                    _0x6a1522 = _0x1fcb21.openTrigger,
                    _0x306932 = void 0x0 === _0x6a1522 ? 'data-micromodal-trigger' : _0x6a1522,
                    _0x446302 = _0x1fcb21.closeTrigger,
                    _0x2f0676 = void 0x0 === _0x446302 ? 'data-micromodal-close' : _0x446302,
                    _0x2a4c0e = _0x1fcb21.disableScroll,
                    _0x2297fa = void 0x0 !== _0x2a4c0e && _0x2a4c0e,
                    _0x5a3f47 = _0x1fcb21.disableFocus,
                    _0x4a8131 = void 0x0 !== _0x5a3f47 && _0x5a3f47,
                    _0x42179f = _0x1fcb21.awaitCloseAnimation,
                    _0x27da4d = void 0x0 !== _0x42179f && _0x42179f,
                    _0x1b535e = _0x1fcb21.debugMode,
                    _0x33d8ca = void 0x0 !== _0x1b535e && _0x1b535e,
                    _0xee6cb0 = _0x1fcb21.closeByEsckey,
                    _0x54de6a = void 0x0 === _0xee6cb0 || _0xee6cb0;
                ! function(_0x27e736, _0x56010c) {
                    if (!(_0x27e736 instanceof _0x56010c)) throw new TypeError('Cannot call a class as a function');
                }(this, _0x5566a2), this.modal = document.getElementById(_0x2c1832), this.config = {
                    'debugMode': _0x33d8ca,
                    'disableScroll': _0x2297fa,
                    'openTrigger': _0x306932,
                    'closeTrigger': _0x2f0676,
                    'onShow': _0x402faa,
                    'onClose': _0x48ad1c,
                    'awaitCloseAnimation': _0x27da4d,
                    'disableFocus': _0x4a8131,
                    'closeByEsckey': _0x54de6a
                }, _0x114128.length > 0x0 && this.registerTriggers.apply(this, _0x3c0613(_0x114128)), this.onClick = this.onClick.bind(this), this.onKeydown = this.onKeydown.bind(this);
            }
            var _0x17edbf, _0x2c1832, _0x5021cc;
            return _0x17edbf = _0x5566a2, (_0x2c1832 = [{
                'key': 'registerTriggers',
                'value': function() {
                    for (var _0x5566a2 = this, _0x17edbf = arguments.length, _0x2c1832 = new Array(_0x17edbf), _0x4e24fa = 0x0; _0x4e24fa < _0x17edbf; _0x4e24fa++) _0x2c1832[_0x4e24fa] = arguments[_0x4e24fa];
                    _0x2c1832.forEach(function(_0x511ded) {
                        _0x511ded.addEventListener('click', function() {
                            return _0x5566a2.showModal();
                        });
                    });
                }
            }, {
                'key': 'showModal',
                'value': function() {
                    this.activeElement = document.activeElement, this.modal.setAttribute('aria-hidden', 'false'), this.modal.classList.add(_0x449eac({
                        'is-open': true
                    })), this.setFocusToFirstNode(), this.addEventListeners(), this.config.onShow(this.modal);
                }
            }, {
                'key': 'closeModal',
                'value': function() {
                    var _0x5566a2 = this.modal;
                    this.modal.setAttribute('aria-hidden', 'true'), this.removeEventListeners(), this.config.onClose(this.modal), this.config.awaitCloseAnimation ? this.modal.addEventListener('animationend', function _0x17edbf() {
                        _0x5566a2.classList.remove(_0x449eac({
                            'is-open': true
                        })), _0x5566a2.removeEventListener('animationend', _0x17edbf, !0x1);
                    }, !0x1) : _0x5566a2.classList.remove(_0x449eac({
                        'is-open': true
                    }));
                }
            }, {
                'key': 'addEventListeners',
                'value': function() {
                    this.modal.addEventListener('touchstart', this.onClick), this.modal.addEventListener('click', this.onClick), document.addEventListener('keydown', this.onKeydown);
                }
            }, {
                'key': 'removeEventListeners',
                'value': function() {
                    this.modal.removeEventListener('touchstart', this.onClick), this.modal.removeEventListener('click', this.onClick), document.removeEventListener('keydown', this.onKeydown);
                }
            }, {
                'key': 'onClick',
                'value': function(_0x6c9df3) {
                    _0x6c9df3.target.hasAttribute(this.config.closeTrigger) && (this.closeModal(), _0x6c9df3.preventDefault());
                }
            }, {
                'key': 'onKeydown',
                'value': function(_0xe2d057) {
                    this.config.closeByEsckey && 0x1b === _0xe2d057.keyCode && this.closeModal(_0xe2d057), 0x9 === _0xe2d057.keyCode && this.maintainFocus(_0xe2d057);
                }
            }, {
                'key': 'getFocusableNodes',
                'value': function() {
                    var _0x5566a2 = this.modal.querySelectorAll(_0x1eda08);
                    return Object.keys(_0x5566a2).map(function(_0x1bd160) {
                        return _0x5566a2[_0x1bd160];
                    });
                }
            }, {
                'key': 'setFocusToFirstNode',
                'value': function() {
                    if (!this.config.disableFocus) {
                        var _0x5566a2 = this.getFocusableNodes();
                        _0x5566a2.length && _0x5566a2[0x0].focus();
                    }
                }
            }, {
                'key': 'maintainFocus',
                'value': function(_0x15092b) {
                    var _0x17edbf = this.getFocusableNodes();
                    if (this.modal.contains(document.activeElement)) {
                        var _0x2c1832 = _0x17edbf.indexOf(document.activeElement);
                        _0x15092b.shiftKey && 0x0 === _0x2c1832 && (_0x17edbf[_0x17edbf.length - 0x1].focus(), _0x15092b.preventDefault()), _0x15092b.shiftKey || _0x2c1832 !== _0x17edbf.length - 0x1 || (_0x17edbf[0x0].focus(), _0x15092b.preventDefault());
                    } else _0x17edbf[0x0].focus();
                }
            }]) && _0xa08ac0(_0x17edbf.prototype, _0x2c1832), _0x5021cc && _0xa08ac0(_0x17edbf, _0x5021cc), _0x5566a2;
        }(), _0xf43a92 = null, _0x214f42 = function(_0x31caa5) {
            if (!document.getElementById(_0x31caa5)) return !0x1;
        }, _0x3a9bfc = function(_0x48c135, _0x61240d) {
            if (function(_0x28b4fb) {
                    _0x28b4fb.length <= 0x0 && (console.warn('MicroModal v' .concat(version, ': ❗Please specify at least one %c\'micromodal-trigger\''), 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', 'data attribute.'), console.warn('%cExample:', 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', '<a href="#" data-micromodal-trigger="my-modal"></a>'));
                }(_0x48c135), !_0x61240d) return true;
            for (var _0x2c1832 in _0x61240d) _0x214f42(_0x2c1832);
            return true;
        }, {
            'init': function(_0x3f1b32) {
                var _0x17edbf = Object.assign({}, {
                        'openTrigger': 'data-micromodal-trigger'
                    }, _0x3f1b32),
                    _0x2c1832 = _0x3c0613(document.querySelectorAll('[' .concat(_0x17edbf.openTrigger, ']'))),
                    _0x537e55 = function(_0x5e363a, _0x9390ce) {
                        var _0x2c1832 = [];
                        return _0x5e363a.forEach(function(_0x305145) {
                            var _0x13d441 = _0x305145.attributes[_0x9390ce].value;
                            void 0x0 === _0x2c1832[_0x13d441] && (_0x2c1832[_0x13d441] = []), _0x2c1832[_0x13d441].push(_0x305145);
                        }), _0x2c1832;
                    }(_0x2c1832, _0x17edbf.openTrigger);
                if (true !== _0x17edbf.debugMode || !0x1 !== _0x3a9bfc(_0x2c1832, _0x537e55))
                    for (var _0x383dff in _0x537e55) {
                        var _0x34a8e0 = _0x537e55[_0x383dff];
                        _0x17edbf.targetModal = _0x383dff, _0x17edbf.triggers = _0x3c0613(_0x34a8e0), new _0x4fc27f(_0x17edbf);
                    }
            },
            'show': function(_0x2a3fcf, _0x472cd6) {
                var _0x2c1832 = _0x472cd6 || {};
                return _0x2c1832.targetModal = _0x2a3fcf, true === _0x2c1832.debugMode && !0x1 === _0x214f42(_0x2a3fcf) ? _0xf43a92 = null : (_0xf43a92 = new _0x4fc27f(_0x2c1832)).showModal(), _0xf43a92;
            },
            'close': function() {
                _0xf43a92.closeModal();
            }
        }),
        _0x378b5c = {
            'defaultControllers': {
                0: {
                    0: {
                        'value': '88',
                        'value2': '1'
                    },
                    1: {
                        'value': '83',
                        'value2': '3'
                    },
                    2: {
                        'value': '16',
                        'value2': '8'
                    },
                    3: {
                        'value': '13',
                        'value2': '9'
                    },
                    4: {
                        'value': '38',
                        'value2': '12'
                    },
                    5: {
                        'value': '40',
                        'value2': '13'
                    },
                    6: {
                        'value': '37',
                        'value2': '14'
                    },
                    7: {
                        'value': '39',
                        'value2': '15'
                    },
                    8: {
                        'value': '90',
                        'value2': '0'
                    },
                    9: {
                        'value': '65',
                        'value2': '2'
                    },
                    10: {
                        'value': '81',
                        'value2': '4'
                    },
                    11: {
                        'value': '69',
                        'value2': '5'
                    },
                    12: {
                        'value': '82',
                        'value2': '6'
                    },
                    13: {
                        'value': '87',
                        'value2': '7'
                    },
                    14: {},
                    15: {},
                    16: {
                        'value': '72'
                    },
                    17: {
                        'value': '70'
                    },
                    18: {
                        'value': '71'
                    },
                    19: {
                        'value': '84'
                    },
                    20: {'value': '76'},
                    21: {'value': '74'},
                    22: {'value': '75'},
                    23: {'value': '73'},
                    24: {},
                    25: {},
                    26: {}
                },
                1: {},
                2: {},
                3: {}
            },
            'controllers': {},
            'virtualGamepadContainer': null,
            'keyMap': {
                8: 'backspace',
                9: 'tab',
                13: 'enter',
                16: 'shift',
                17: 'ctrl',
                18: 'alt',
                19: 'pause/break',
                20: 'caps lock',
                27: 'escape',
                32: 'space',
                33: 'page up',
                34: 'page down',
                35: 'end',
                36: 'home',
                37: 'left arrow',
                38: 'up arrow',
                39: 'right arrow',
                40: 'down arrow',
                45: 'insert',
                46: 'delete',
                48: '0',
                49: '1',
                50: '2',
                51: '3',
                52: '4',
                53: '5',
                54: '6',
                55: '7',
                56: '8',
                57: '9',
                65: 'a',
                66: 'b',
                67: 'c',
                68: 'd',
                69: 'e',
                70: 'f',
                71: 'g',
                72: 'h',
                73: 'i',
                74: 'j',
                75: 'k',
                76: 'l',
                77: 'm',
                78: 'n',
                79: 'o',
                80: 'p',
                81: 'q',
                82: 'r',
                83: 's',
                84: 't',
                85: 'u',
                86: 'v',
                87: 'w',
                88: 'x',
                89: 'y',
                90: 'z',
                91: 'left window key',
                92: 'right window key',
                93: 'select key',
                96: 'numpad 0',
                97: 'numpad 1',
                98: 'numpad 2',
                99: 'numpad 3',
                100: 'numpad 4',
                101: 'numpad 5',
                102: 'numpad 6',
                103: 'numpad 7',
                104: 'numpad 8',
                105: 'numpad 9',
                106: 'multiply',
                107: 'add',
                109: 'subtract',
                110: 'decimal point',
                111: 'divide',
                112: 'f1',
                113: 'f2',
                114: 'f3',
                115: 'f4',
                116: 'f5',
                117: 'f6',
                118: 'f7',
                119: 'f8',
                120: 'f9',
                121: 'f10',
                122: 'f11',
                123: 'f12',
                144: 'num lock',
                145: 'scroll lock',
                186: 'semi-colon',
                187: 'equal sign',
                188: 'comma',
                189: 'dash',
                190: 'period',
                191: 'forward slash',
                192: 'grave accent',
                219: 'open bracket',
                220: 'back slash',
                221: 'close braket',
                222: 'single quote'
            },
            'saveLoaddbDB': {
                put: function(key, data) {
                    var openRequest = indexedDB.open("ejs-states", 1);
                    openRequest.onerror = function() {};
                    openRequest.onsuccess = function() {
                        var db = openRequest.result;
                        var transaction = db.transaction(["states"], "readwrite");
                        var objectStore = transaction.objectStore("states");
                        var request = objectStore.put(data, key);
                        request.onerror = function() {};
                        request.onsuccess = function() {};
                    };
                    openRequest.onupgradeneeded = function() {
                        var db = openRequest.result;
                        if (! db.objectStoreNames.contains('states')) {
                            db.createObjectStore('states');
                        };
                    };
                },
                get: function(key) {
                    return new Promise(function(resolve, reject) {
                        var openRequest = indexedDB.open("ejs-states", 1);
                        openRequest.onerror = function() {};
                        openRequest.onsuccess = function() {
                            var db = openRequest.result;
                            var transaction = db.transaction(["states"], "readwrite");
                            var objectStore = transaction.objectStore("states");
                            var request = objectStore.get(key);
                            request.onsuccess = async function(e) {
                                var file = e.target.result;
                                if (file) {
                                    resolve(file)
                                };
                            };
                            request.onerror = function() {};
                        };
                        openRequest.onupgradeneeded = function() {
                            var db = openRequest.result;
                            if (! db.objectStoreNames.contains('states')) {
                                db.createObjectStore('states');
                            };
                        };
                    });
                },
            },
            'saveLoadDB': function(type) {
                try {
                    if (_0x2593da && typeof _0x2593da.getCoreOptionsValues == 'function') {
                        var location = _0x2593da.getCoreOptionsValues()['save-state-location'];
                        var slot = _0x2593da.getCoreOptionsValues()['save-state-slot'];
                        var game = this.config.gameUrl.split('/').pop();
                        if (this.gameName) {
                            game = this.gameName;
                        };
                        if ((!this.gameName && this.config.gameUrl.startsWith('blob:')) || !window.indexedDB) {
                            return false;
                        }
                        var key = game + '-' + slot;
                        if (!location || location === 'download') {
                            return false;
                        }
                        if (type === 'save') {
                            try {
                                var data = _0x378b5c.saveState();
                                _0x378b5c.saveLoaddbDB.put(key, data);
                            } catch(e) {return false;};
                        } else {
                            _0x378b5c.saveLoaddbDB.get(key).then(function(data) {
                                EJS_loadState(data);
                            });
                        }
                        return true;
                    } else {
                        return false;
                    }
                } catch(e) {
                    return false;
                }
            },
            'gamepad': null,
            'allowCheat': true,
            'connection': null,
            'connected': !0x1,
            'playerName': '',
            'players': [],
            'waitingList': {},
            'roomMaster': null,
            'inputsData': {},
            'coreOptionData': {},
            'currentFrame': 0x0,
            'wait': !0x1,
            'progressHelper': {},
            'icons': {
                'lock': '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="lock" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-lock fa-w-14 fa-3x"><path fill="currentColor" d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z" class=""></path></svg>'
            },
            'disableInput': !0x1,
            'disableControl': function(_0x5459be) {
                if (_0x5459be) {
                    for (var _0x17edbf = 0x0; _0x17edbf < 0x18; _0x17edbf += 0x1) _0x378b5c.simulateInputFn(0x0, _0x17edbf, 0x0), _0x378b5c.simulateInputFn(0x1, _0x17edbf, 0x0), _0x378b5c.simulateInputFn(0x2, _0x17edbf, 0x0), _0x378b5c.simulateInputFn(0x3, _0x17edbf, 0x0);
                    _0x378b5c.disableInput = true;
                } else _0x378b5c.disableInput = !0x1;
            },
            'loadRoomsListTimer': null,
            'loadRoomsList': function() {},
            'stopLoadRooms': function() {
                _0x378b5c.loadRoomsListTimer && clearTimeout(_0x378b5c.loadRoomsListTimer);
            },
            'openRoom': function() {},
            'isPaused': null,
            'setVolume': null,
            'setVariable': null,
            'simulateInput': null,
            'simulateInputFn': null,
            'toggleShader': null,
            'saveState': null,
            'screenRecord': null,
            'loadState': null,
            'quickSaveState': null,
            'quickLoadState': null,
            'changeStateSlot': null,
            'getScreenData': null,
            'getStateInfo': null,
            'setCheat': null,
            'resetCheat': null,
            'getGameCoreOptions': null,
            'classNames': {
                'dialog-container': _0x449eac({
                    'dialog-container': true
                }),
                'tabs': _0x449eac({
                    'tabs': true
                }),
                'dialog-title': _0x449eac({
                    'dialog-title': true
                }),
                'dialog-content': _0x449eac({
                    'dialog-content': true
                }),
                'dialog-buttons': _0x449eac({
                    'dialog-buttons': true
                }),
                'overlay': _0x449eac({
                    'overlay': true
                }),
                'key-setting-popup': _0x449eac({
                    'key-setting-popup': true
                }),
                'tabs-panel': _0x449eac({
                    'tabs-panel': true
                }),
                'tabs-content': _0x449eac({
                    'tabs-content': true
                }),
                'button-container': _0x449eac({
                    'button-container': true
                }),
                'set': _0x449eac({
                    'set': true
                }),
                'active': _0x449eac({
                    'active': true
                }),
                'btn-cancel': _0x449eac({
                    'btn-cancel': true
                }),
                'btn-reset': _0x449eac({
                    'btn-reset': true
                }),
                'btn-clear': _0x449eac({
                    'btn-clear': true
                }),
                'btn-create': _0x449eac({
                    'btn-create': true
                }),
                'btn-submit': _0x449eac({
                    'btn-submit': true
                }),
                'btn-join-room': _0x449eac({
                    'btn-join-room': true
                }),
                'btn-quit': _0x449eac({
                    'btn-quit': true
                }),
                'btn-create-room': _0x449eac({
                    'btn-create-room': true
                }),
                'netplay-player-name': _0x449eac({
                    'netplay-player-name': true
                }),
                'netplay-roomlist': _0x449eac({
                    'netplay-roomlist': true
                }),
                'netplay-room-name-input': _0x449eac({
                    'netplay-room-name-input': true
                }),
                'netplay-room-password-input': _0x449eac({
                    'netplay-room-password-input': true
                }),
                'netplay-create-room-set': _0x449eac({
                    'netplay-create-room-set': true
                }),
                'netplay-room': _0x449eac({
                    'netplay-room': true
                }),
                'modal': _0x449eac({
                    'modal': true
                }),
                'modal__overlay': _0x449eac({
                    'modal__overlay': true
                }),
                'modal__container': _0x449eac({
                    'modal__container': true
                }),
                'modal__header': _0x449eac({
                    'modal__header': true
                }),
                'modal__title': _0x449eac({
                    'modal__title': true
                }),
                'modal__close': _0x449eac({
                    'modal__close': true
                }),
                'modal__content': _0x449eac({
                    'modal__content': true
                }),
                'modal__btn': _0x449eac({
                    'modal__btn': true
                }),
                'modal__btn-primary': _0x449eac({
                    'modal__btn-primary': true
                }),
                'micromodal-slide': _0x449eac({
                    'micromodal-slide': true
                }),
                'modal__errmsg': _0x449eac({
                    'modal__errmsg': true
                }),
                'modal__footer': _0x449eac({
                    'modal__footer': true
                }),
                'cheats-add': _0x449eac({
                    'cheats-add': true
                }),
                'cheats-list': _0x449eac({
                    'cheats-list': true
                }),
                'cheat-code-input': _0x449eac({
                    'cheat-code-input': true
                }),
                'cheat-name-input': _0x449eac({
                    'cheat-name-input': true
                }),
                'ejs-switch': _0x449eac({
                    'ejs-switch': true
                }),
                'ejs-delete-cheat': _0x449eac({
                    'ejs-delete-cheat': true
                })
            },
            'initShaders': function() {
                for (var _0xa88a13 = _0x5032e6, _0x17edbf = Object.keys(_0xa88a13), _0x2c1832 = '', _0x26fb6a = 0x0; _0x26fb6a < _0x17edbf.length; _0x26fb6a += 0x1) _0x2c1832 = _0xa88a13[_0x17edbf[_0x26fb6a]], _0x27f4c4.FS.writeFile('/shader/' .concat(_0x17edbf[_0x26fb6a]), _0x2c1832), _0x2593da.storage.get('shader') === _0x17edbf[_0x26fb6a] && _0x27f4c4.FS.writeFile('/shader/shader.glslp', _0x2c1832);
            },
            'setGamepadDialog': function() {
                var _0xa88a13 = this;
                _0xa88a13.elements.dialogs.gamepad.innerHTML = '\n        <div class="' + _0x378b5c.classNames['dialog-container'] + '">\n            <div class="' + _0x378b5c.classNames['dialog-title'] + '">\n                <h4>'+_0xa88a13.localization('Control Settings')+'</h4>\n            </div>\n            \n            <ul class="' + _0x378b5c.classNames.tabs + '" id="controls-tabs">\n                <li class="tabs-title" role="presentation"><a href="#" onclick="return false" role="tab" aria-controls="controls-0" aria-selected="false" id="controls-0-label">'+_0xa88a13.localization('Player 1')+'</a></li>\n                <li class="tabs-title" role="presentation"><a href="#" onclick="return false" role="tab" aria-controls="controls-1" aria-selected="false" id="controls-1-label">'+_0xa88a13.localization('Player 2')+'</a></li>\n                <li class="tabs-title" role="presentation"><a href="#" onclick="return false" role="tab" aria-controls="controls-2" aria-selected="false" id="controls-2-label">'+_0xa88a13.localization('Player 3')+'</a></li>\n                <li class="tabs-title" role="presentation"><a href="#" onclick="return false" role="tab" aria-controls="controls-3" aria-selected="false" id="controls-3-label">'+_0xa88a13.localization('Player 4')+'</a></li>\n            </ul>\n            <div class="' + _0x378b5c.classNames['dialog-content'] + '">\n            <div class="' + _0x378b5c.classNames['tabs-content'] + ' controls">\n                \n            </div>\n            </div>\n            <div class="' + _0x378b5c.classNames['dialog-buttons'] + '">\n                <a href="#" onclick="return false" class="' + _0x378b5c.classNames['btn-submit'] + '">'+_0xa88a13.localization('Update')+'</a>\n                <a href="#" onclick="return false" class="' + _0x378b5c.classNames['btn-reset'] + '">'+_0xa88a13.localization('Reset')+'</a>\n                <a href="#" onclick="return false" class="' + _0x378b5c.classNames['btn-clear'] + '">'+_0xa88a13.localization('Clear')+'</a>\n                <a href="#" onclick="return false" class="' + _0x378b5c.classNames['btn-cancel'] + '">'+_0xa88a13.localization('Cancel')+'</a>\n            </div>\n            <div class="' + _0x378b5c.classNames.overlay + '" hidden>\n                <div class="' + _0x378b5c.classNames['key-setting-popup'] + '">\n                    <span>[Select]</span><br />\n                    <div style="color:#fff !important">'+_0xa88a13.localization('Press keyboard or gamepad')+'</div>\n                </div>\n            </div>\n        </div>\n        '
                
                var _0x17edbf = '\n        <div class="' .concat(_0x378b5c.classNames['tabs-panel'], '" id="controls-{index}" hidden>\n            <div>\n                <div style="">\n                    <div class="gamepad" style="font-size:12px">Connected gamepad: <span class="gamepad-name">n/a</span></div>\n                </div>\n                <div style="width:25%;float:left">&nbsp;</div>\n                <div style="font-size:12px;width:50%;float:left">\n                    <div class="row">\n                        <div style="text-align:center;width:50%;float:left">'+_0xa88a13.localization('Gamepad')+'</div>\n                        <div style="text-align:center;width:50%;float:left">'+_0xa88a13.localization('Keyboard')+'</div>\n                    </div>\n                </div>\n                <div style="clear:both"></div>\n            </div>\n        </div>'),
                    _0x2c1832 = '\n        <div class="' .concat(_0x378b5c.classNames['button-container'], '" data-id="{id}" data-index="{index}" data-label="{label}" style="margin-bottom:10px">\n            <div style="width:25%;float:left;font-size:12px">\n                <label>{label}:</label>\n            </div>\n            <div style="width:50%;float:left">\n                <div>\n                    <div style="width:50%;float:left;padding: 0 5px;">\n                        <input style="text-align:center;height:25px;width: 100%;" type="text" data-id="{id}" data-value="" data-type="2" data-index="{index}" readonly="" placeholder="">\n                    </div>\n                    <div style="width:50%;float:left;padding: 0 5px;">\n                        <input style="text-align:center;height:25px;width: 100%;" type="text" data-id="{id}" data-value="" data-type="1" data-index="{index}" readonly="" placeholder="">\n                    </div>\n                    <div style="clear:both"></div>\n                </div>\n            </div>\n            <div style="width:25%;float:left">\n                <a class="').concat(_0x378b5c.classNames.set, '" href="#" onclick="return false">'+_0xa88a13.localization('Set')+'</a>\n            </div>\n            <div style="clear:both"></div>\n        </div>')
                if ('nes' === _0xa88a13.system) {
                    var _0x48ee51 = {
                        0: 'B',
                        2: 'SELECT',
                        3: 'START',
                        4: 'UP',
                        5: 'DOWN',
                        6: 'LEFT',
                        7: 'RIGHT',
                        8: 'A',
                        24: _0xa88a13.localization('QUICK SAVE STATE'),
                        25: _0xa88a13.localization('QUICK LOAD STATE'),
                        26: _0xa88a13.localization('CHANGE STATE SLOT')
                    }
                } else if ('snes' === _0xa88a13.system) {
                    var _0x48ee51 = {
                        0: 'B',
                        1: 'Y',
                        2: 'SELECT',
                        3: 'START',
                        4: 'UP',
                        5: 'DOWN',
                        6: 'LEFT',
                        7: 'RIGHT',
                        8: 'A',
                        9: 'X',
                        10: 'L',
                        11: 'R',
                        24: _0xa88a13.localization('QUICK SAVE STATE'),
                        25: _0xa88a13.localization('QUICK LOAD STATE'),
                        26: _0xa88a13.localization('CHANGE STATE SLOT')
                    };
                } else if ('n64' === _0xa88a13.system) {
                    var _0x48ee51 = {
                        0: 'B',
                        3: 'START',
                        4: 'UP',
                        5: 'DOWN',
                        6: 'LEFT',
                        7: 'RIGHT',
                        8: 'A',
                        10: 'L',
                        11: 'R',
                        12: 'Z',
                        19: 'L STICK UP',
                        18: 'L STICK DOWN',
                        17: 'L STICK LEFT',
                        16: 'L STICK RIGHT',
                        23: 'R STICK UP',
                        22: 'R STICK DOWN',
                        21: 'R STICK LEFT',
                        20: 'R STICK RIGHT',
                        24: _0xa88a13.localization('QUICK SAVE STATE'),
                        25: _0xa88a13.localization('QUICK LOAD STATE'),
                        26: _0xa88a13.localization('CHANGE STATE SLOT')
                    };
                } else if ('nds' === _0xa88a13.system) {
                    var _0x48ee51 = {
                        0: 'B',
                        1: 'Y',
                        2: 'SELECT',
                        3: 'START',
                        4: 'UP',
                        5: 'DOWN',
                        6: 'LEFT',
                        7: 'RIGHT',
                        8: 'A',
                        9: 'X',
                        10: 'L',
                        11: 'R',
                        14: 'Microphone',
                        24: _0xa88a13.localization('QUICK SAVE STATE'),
                        25: _0xa88a13.localization('QUICK LOAD STATE'),
                        26: _0xa88a13.localization('CHANGE STATE SLOT')
                    };
                } else {
                    var _0x48ee51 = {
                        0: 'B',
                        1: 'Y',
                        2: 'SELECT',
                        3: 'START',
                        4: 'UP',
                        5: 'DOWN',
                        6: 'LEFT',
                        7: 'RIGHT',
                        8: 'A',
                        9: 'X',
                        10: 'L',
                        11: 'R',
                        12: 'L2',
                        13: 'R2',
                        14: 'L3',
                        15: 'R3',
                        19: 'L STICK UP',
                        18: 'L STICK DOWN',
                        17: 'L STICK LEFT',
                        16: 'L STICK RIGHT',
                        23: 'R STICK UP',
                        22: 'R STICK DOWN',
                        21: 'R STICK LEFT',
                        20: 'R STICK RIGHT',
                        24: _0xa88a13.localization('QUICK SAVE STATE'),
                        25: _0xa88a13.localization('QUICK LOAD STATE'),
                        26: _0xa88a13.localization('CHANGE STATE SLOT')
                    };
                }
                if (['arcade', 'mame'].includes(_0xa88a13.system)) {
                    _0x48ee51[2] = _0xa88a13.localization('INSERT COIN');
                }
                if (_0xa88a13.statesSupported === false) {
                    delete _0x48ee51[24];
                    delete _0x48ee51[25];
                    delete _0x48ee51[26];
                }
                
                for (var _0x501790 = [0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8, 0x0, 0x9, 0x1, 0xa, 0xb, 0xc, 0xd, 0xe, 0xf, 0x13, 0x12, 0x11, 0x10, 0x17, 0x16, 0x15, 0x14, 0x18, 0x19, 26], _0x50fd12 = function(_0x88827f) {
                        _0xa88a13.elements.dialogs.gamepad.querySelector('.' .concat(_0x378b5c.classNames['tabs-content'])).innerHTML += _0x17edbf.replace(/{index}/g, _0x88827f), _0x501790.forEach(function(_0x1bf162) {
                            _0x48ee51[_0x1bf162] && (_0xa88a13.elements.dialogs.gamepad.querySelector('#controls-' .concat(_0x88827f)).innerHTML += _0x2c1832.replace(/{index}/g, _0x88827f).replace(/{id}/g, _0x1bf162).replace(/{label}/g, _0x48ee51[_0x1bf162]));
                        }), _0xa88a13.elements.dialogs.gamepad.querySelector('[data-id="16"][data-index="' .concat(_0x88827f, '"][data-type="2"]')) && (_0xa88a13.elements.dialogs.gamepad.querySelector('[data-id="16"][data-index="' .concat(_0x88827f, '"][data-type="2"]')).style.backgroundColor = '#ccc'), _0xa88a13.elements.dialogs.gamepad.querySelector('[data-id="17"][data-index="' .concat(_0x88827f, '"][data-type="2"]')) && (_0xa88a13.elements.dialogs.gamepad.querySelector('[data-id="17"][data-index="' .concat(_0x88827f, '"][data-type="2"]')).style.backgroundColor = '#ccc'), _0xa88a13.elements.dialogs.gamepad.querySelector('[data-id="18"][data-index="' .concat(_0x88827f, '"][data-type="2"]')) && (_0xa88a13.elements.dialogs.gamepad.querySelector('[data-id="18"][data-index="' .concat(_0x88827f, '"][data-type="2"]')).style.backgroundColor = '#ccc'), _0xa88a13.elements.dialogs.gamepad.querySelector('[data-id="19"][data-index="' .concat(_0x88827f, '"][data-type="2"]')) && (_0xa88a13.elements.dialogs.gamepad.querySelector('[data-id="19"][data-index="' .concat(_0x88827f, '"][data-type="2"]')).style.backgroundColor = '#ccc'), _0xa88a13.elements.dialogs.gamepad.querySelector('[data-id="20"][data-index="' .concat(_0x88827f, '"][data-type="2"]')) && (_0xa88a13.elements.dialogs.gamepad.querySelector('[data-id="20"][data-index="' .concat(_0x88827f, '"][data-type="2"]')).style.backgroundColor = '#ccc'), _0xa88a13.elements.dialogs.gamepad.querySelector('[data-id="21"][data-index="' .concat(_0x88827f, '"][data-type="2"]')) && (_0xa88a13.elements.dialogs.gamepad.querySelector('[data-id="21"][data-index="' .concat(_0x88827f, '"][data-type="2"]')).style.backgroundColor = '#ccc'), _0xa88a13.elements.dialogs.gamepad.querySelector('[data-id="22"][data-index="' .concat(_0x88827f, '"][data-type="2"]')) && (_0xa88a13.elements.dialogs.gamepad.querySelector('[data-id="22"][data-index="' .concat(_0x88827f, '"][data-type="2"]')).style.backgroundColor = '#ccc'), _0xa88a13.elements.dialogs.gamepad.querySelector('[data-id="23"][data-index="' .concat(_0x88827f, '"][data-type="2"]')) && (_0xa88a13.elements.dialogs.gamepad.querySelector('[data-id="23"][data-index="' .concat(_0x88827f, '"][data-type="2"]')).style.backgroundColor = '#ccc');
                    }, _0x3f0824 = 0x0; _0x3f0824 <= 0x3; _0x3f0824 += 0x1) _0x50fd12(_0x3f0824);
                Object.keys(_0x378b5c.controllers).forEach(function(_0x23d419) {
                    _0x378b5c.controllers[_0x23d419] && Object.keys(_0x378b5c.controllers[_0x23d419]).forEach(function(_0x21e62d) {
                        var _0x294e35 = _0xa88a13.elements.dialogs.gamepad.querySelector('[data-id="' .concat(_0x21e62d, '"][data-index="').concat(_0x23d419, '"][data-type="1"]')),
                            _0x1849bc = _0xa88a13.elements.dialogs.gamepad.querySelector('[data-id="' .concat(_0x21e62d, '"][data-index="').concat(_0x23d419, '"][data-type="2"]'));
                        if (!_0x294e35 || !_0x1849bc) return !0x1;
                        var _0x19d43b = _0x378b5c.controllers[_0x23d419][_0x21e62d];
                        _0x19d43b && (_0x19d43b.type && 0x1 !== parseInt(_0x19d43b.type, 0xa) ? _0x1849bc.value = '' : _0x19d43b.value && (_0x294e35.value = _0x378b5c.keyMap[_0x19d43b.value] || '', _0x294e35.setAttribute('data-value', _0x19d43b.value)), _0x19d43b.value2 && (_0x1849bc.value = isNaN(_0x19d43b.value2) ? (_0x19d43b.value2) : ('button ' .concat(parseInt(_0x19d43b.value2, 0xa) + 0x1)), _0x1849bc.setAttribute('data-value', _0x19d43b.value2)));
                    });
                }), _0x1093f4.call(this, _0xa88a13.elements.dialogs.gamepad.querySelector('.' .concat(_0x378b5c.classNames['btn-submit'])), 'click', function(_0x5f19bd) {
                    var _0x2c1832 = _0xa88a13.elements.dialogs.gamepad.querySelectorAll('input'),
                        _0x2844f7 = {};
                    return Array.from(_0x2c1832).forEach(function(_0x33c024) {
                        var _0x5f19bd, _0x2c1832 = _0x33c024.getAttribute('data-index'),
                            _0x124d0a = _0x33c024.getAttribute('data-value');
                        0x2 === parseInt(_0x33c024.getAttribute('data-type'), 0xa) && (_0x5f19bd = _0x33c024.getAttribute('data-value'));
                        var _0x54b9af = _0x33c024.getAttribute('data-id');
                        _0x2844f7[_0x2c1832] || (_0x2844f7[_0x2c1832] = {}), _0x2844f7[_0x2c1832][_0x54b9af] || (_0x2844f7[_0x2c1832][_0x54b9af] = {}), _0x124d0a && (_0x2844f7[_0x2c1832][_0x54b9af].value = _0x124d0a), _0x5f19bd && (_0x2844f7[_0x2c1832][_0x54b9af].value2 = _0x5f19bd);
                    }), _0x2593da.storage.set({
                        'controllers': _0x2844f7
                    }), _0x378b5c.controllers = _0x2844f7, _0x132da7(_0xa88a13.elements.dialogs.gamepad, true), _0xa88a13.elements.container.focus(), _0x5f19bd.stopPropagation(), !0x1;
                }), _0x1093f4.call(this, _0xa88a13.elements.dialogs.gamepad.querySelector('.' .concat(_0x378b5c.classNames['btn-reset'])), 'click', function(_0x5f19bd) {
                    _0x378b5c.controllers = JSON.parse(JSON.stringify(_0x378b5c.defaultControllers))
                    localStorage.removeItem(_0x2593da.storage.key)
                    var _0x2c1832 = _0xa88a13.elements.dialogs.gamepad.querySelectorAll('input')
                    for (var i=0; i<_0x2c1832.length; i++) {
                        var player = _0x2c1832[i].getAttribute('data-index')
                        var controlOrGamepad = _0x2c1832[i].getAttribute('data-type')
                        var buttonId = _0x2c1832[i].getAttribute('data-id')
                        var a = (controlOrGamepad == 1) ? 'value' : 'value2'
                        if (_0x378b5c.defaultControllers[player] && _0x378b5c.defaultControllers[player][buttonId] && _0x378b5c.defaultControllers[player][buttonId][a]) {
                            if (controlOrGamepad == 1) {
                                _0x2c1832[i].value = _0x378b5c.keyMap[_0x378b5c.defaultControllers[player][buttonId][a]]
                            } else {
                                _0x2c1832[i].value = 'button ' + (parseInt(_0x378b5c.defaultControllers[player][buttonId][a])+1)
                            }
                            _0x2c1832[i].setAttribute('data-value', _0x378b5c.defaultControllers[player][buttonId][a])
                        } else {
                            _0x2c1832[i].value = ''
                            _0x2c1832[i].setAttribute('data-value', '')
                        }
                    }
                }), _0x1093f4.call(this, _0xa88a13.elements.dialogs.gamepad.querySelector('.' .concat(_0x378b5c.classNames['btn-clear'])), 'click', function(_0x5f19bd) {
                    var c = {0:{}, 1:{}, 2:{}, 3:{}};
                    for (var k in _0x48ee51) {
                        c[0][k] = {};
                        c[1][k] = {};
                        c[2][k] = {};
                        c[3][k] = {};
                    }
                    _0x378b5c.controllers = c
                    localStorage.setItem(_0x2593da.storage.key, JSON.stringify({controllers: _0x378b5c.controllers}))
                    var _0x2c1832 = _0xa88a13.elements.dialogs.gamepad.querySelectorAll('input')
                    for (var i=0; i<_0x2c1832.length; i++) {
                        _0x2c1832[i].value = '';
                        _0x2c1832[i].setAttribute('data-value', '');
                    }
                }), _0x1093f4.call(this, _0xa88a13.elements.dialogs.gamepad.querySelector('.' .concat(_0x378b5c.classNames['btn-cancel'])), 'click', function(_0x16d598) {
                    return _0x132da7(_0xa88a13.elements.dialogs.gamepad, true), _0xa88a13.elements.container.focus(), _0x16d598.stopPropagation(), !0x1;
                }), Array.from(_0xa88a13.elements.dialogs.gamepad.querySelectorAll('.' .concat(_0x378b5c.classNames.tabs, ' li'))).forEach(function(_0x523f7b) {
                    _0x1093f4.call(_0xa88a13, _0x523f7b, 'mousedown', function(_0xa99a78) {
                        _0x3a8e2f(_0xa88a13.elements.dialogs.gamepad.querySelectorAll('.' .concat(_0x378b5c.classNames.tabs, ' li')), _0x378b5c.classNames.active, !0x1), _0x3a8e2f(_0x523f7b, _0x378b5c.classNames.active, true);
                        var _0xb8a227 = _0x523f7b.querySelector('a').getAttribute('aria-controls');
                        return Array.from(_0xa88a13.elements.dialogs.gamepad.querySelectorAll('.' .concat(_0x378b5c.classNames['tabs-content'], ' .').concat(_0x378b5c.classNames['tabs-panel']))).forEach(function(_0x1c29a4) {
                            _0x132da7(_0x1c29a4, true);
                        }), _0x132da7(_0xa88a13.elements.dialogs.gamepad.querySelector('.' .concat(_0x378b5c.classNames['tabs-content'], ' #').concat(_0xb8a227)), !0x1), _0xa99a78.stopPropagation(), !0x1;
                    });
                }), _0xbae705.call(_0xa88a13, _0xa88a13.elements.dialogs.gamepad.querySelector('[aria-controls="controls-0"]').parentNode, 'mousedown');
                var _0x11b11a = _0xa88a13.elements.dialogs.gamepad.querySelector('.' .concat(_0x378b5c.classNames.overlay));
                _0x1093f4.call(_0xa88a13, _0x11b11a, 'mousedown', function(_0x15c7de) {
                    _0x132da7(_0x11b11a, true), _0x15c7de.stopPropagation();
                }), Array.from(_0xa88a13.elements.dialogs.gamepad.querySelectorAll('.' .concat(_0x378b5c.classNames['button-container']))).forEach(function(_0x16f092) {
                    _0x1093f4.call(_0xa88a13, _0x16f092, 'mousedown', function(_0xdb1c93) {
                        _0xbae705.call(_0xa88a13, _0x16f092.querySelector('a.' .concat(_0x378b5c.classNames.set)), _0xdb1c93.type, true, {});
                    });
                }), Array.from(_0xa88a13.elements.dialogs.gamepad.querySelectorAll('.' .concat(_0x378b5c.classNames['tabs-panel'], ' a.').concat(_0x378b5c.classNames.set))).forEach(function(_0x397818) {
                    _0x1093f4.call(_0xa88a13, _0x397818, 'mousedown', function(_0x1e1d79) {
                        var _0x2c1832 = _0x397818.parentNode.parentNode,
                            _0x4e649c = _0x2c1832.getAttribute('data-id'),
                            _0x431719 = _0x2c1832.getAttribute('data-index'),
                            _0x4a6f6f = _0x2c1832.getAttribute('data-label');
                        _0x132da7(_0x11b11a, !0x1), _0x11b11a.setAttribute('data-id', _0x4e649c), _0x11b11a.setAttribute('data-index', _0x431719);
                        var _0x179623 = '[ ' .concat(_0x4a6f6f, ' ]');
                        _0x378b5c.gamepad.gamepads[_0x431719] && _0x4e649c < 0x10 ? _0x179623 += '<br /><span style="font-size:12px">Gamepad:' .concat(_0x378b5c.gamepad.gamepads[_0x431719].id, '</span><br />'+_0xa88a13.localization('Press keyboard or gamepad')+'<br/>'+_0xa88a13.localization('Press escape (esc) to clear')) : _0x179623 += '<br />Press keyboard<br/>'+_0xa88a13.localization('Press escape (esc) to clear'), _0x11b11a.querySelector('.' .concat(_0x378b5c.classNames['key-setting-popup'])).innerHTML = _0x179623, _0x1e1d79.stopPropagation();
                    });
                });
            },
            'setCacheDialog': function() {
                var _0xa88a13 = this;
                _0xa88a13.elements.dialogs.cache.innerHTML = '\n        <div class="' .concat(_0x378b5c.classNames['dialog-container'], '">\n            <div class="').concat(_0x378b5c.classNames['dialog-title'], '">\n                <h4>'+_0xa88a13.localization('Cache Manager')+'</h4>\n            </div>\n            <div class="').concat(_0x378b5c.classNames['dialog-content'], '">\n\n            </div>\n            <div class="').concat(_0x378b5c.classNames['dialog-buttons'], '">\n                <a href="#" onclick="return false" class="').concat(_0x378b5c.classNames['btn-cancel'], '">'+_0xa88a13.localization('Close')+'</a>\n            </div>\n        </div>\n        '), _0x1093f4.call(this, _0xa88a13.elements.dialogs.cache.querySelector('.' .concat(_0x378b5c.classNames['btn-cancel'])), 'click', function(_0x5d6721) {
                    return _0x132da7(_0xa88a13.elements.dialogs.cache, true), _0xa88a13.elements.container.focus(), _0x5d6721.stopPropagation(), !0x1;
                }), _0x1093f4.call(this, _0xa88a13.elements.dialogs.cache.querySelector('.' .concat(_0x378b5c.classNames['dialog-title'], ' a')), 'click', function(_0x46992d) {
                    return _0x27f4c4.romdb && (_0x27f4c4.romdb.clear(), _0xa88a13.elements.dialogs.cache.querySelector('.' .concat(_0x378b5c.classNames['dialog-content'])).innerHTML = '<div style="text-align:center">'+_0xa88a13.localization('Empty')+'</div>'), _0x46992d.stopPropagation(), !0x1;
                });
            },
            'showLoading': function(_0x108b55) {
                _0x4d8495.show('modal-6ed698f3d04061f5', {
                    'closeByEsckey': !0x1
                }), _0x108b55 && console.log(''), _0x132da7(this.elements.dialogs.loading, !0x1);
            },
            'hideLoading': function() {
                _0x4d8495.close(), _0x132da7(this.elements.dialogs.loading, true);
            },
            'setLoadingDialog': function() {
                this.elements.dialogs.loading && (this.elements.dialogs.loading.innerHTML = '\n            <div class="' .concat(_0x378b5c.classNames.modal, ' ').concat(_0x378b5c.classNames['micromodal-slide'], '" id="modal-6ed698f3d04061f5" aria-hidden="true">\n                <div class="').concat(_0x378b5c.classNames.modal__overlay, '" tabindex="-1">\n                <div class="').concat(_0x378b5c.classNames.modal__container, '" role="dialog" aria-modal="true" aria-labelledby="modal-6ed698f3d04061f5-title">\n                '+this.localization('Loading')+'...\n                </div>\n                </div>\n            </div>'));
            },
            'setCheatDialog': function() {
                var _0xa88a13 = this;
                if (_0xa88a13.elements.dialogs.cheat) {
                    _0xa88a13.elements.dialogs.cheat.innerHTML = '\n            <div class="' .concat(_0x378b5c.classNames['dialog-container'], '">\n                <div class="').concat(_0x378b5c.classNames['dialog-title'], '">\n                    <h4>Cheats</h4>\n                </div>\n                <div class="').concat(_0x378b5c.classNames['dialog-content'], '">\n                    <div class="').concat(_0x378b5c.classNames['cheats-list'], '">\n                        \n                    </div>\n                </div>\n                <div class="').concat(_0x378b5c.classNames['dialog-buttons'], '">\n                    <a href="#" onclick="return false" class="').concat(_0x378b5c.classNames['cheats-add'], '">'+_0xa88a13.localization('Add Cheat')+'</a>\n                    <a href="#" onclick="return false" class="').concat(_0x378b5c.classNames['btn-submit'], '">'+_0xa88a13.localization('OK')+'</a>\n                    <a href="#" onclick="return false" class="').concat(_0x378b5c.classNames['btn-cancel'], '">Close</a>\n                </div>\n            </div>\n\n            \n\n            <div class="').concat(_0x378b5c.classNames.modal, ' ').concat(_0x378b5c.classNames['micromodal-slide'], '" id="modal-85cd7a1c543a484b" aria-hidden="true">\n                <div class="').concat(_0x378b5c.classNames.modal__overlay, '" tabindex="-1" data-modal-close>\n                <div class="').concat(_0x378b5c.classNames.modal__container, '" style="width:100%" role="dialog" aria-modal="true" aria-labelledby="modal-85cd7a1c543a484b-title">\n                    <div class="').concat(_0x378b5c.classNames.modal__header, '">\n                    <h2 class="').concat(_0x378b5c.classNames.modal__title, '" id="modal-85cd7a1c543a484b-title">\n                    '+_0xa88a13.localization('Add Cheat Code')+'\n                    </h2>\n                    <button class="').concat(_0x378b5c.classNames.modal__close, '" aria-label="Close modal" data-modal-close></button>\n                    </div>\n                    <main class="').concat(_0x378b5c.classNames.modal__content, '" id="modal-85cd7a1c543a484b-content">\n\n                        <div class="').concat(_0x378b5c.classNames.modal__errmsg, '"></div>\n                        <strong>'+_0xa88a13.localization('Code')+'</strong><br />\n                        <textarea style="width:100%;height:80px;" class="').concat(_0x378b5c.classNames['cheat-code-input'], '"></textarea><br />\n                        <strong>'+_0xa88a13.localization('Description')+'</strong><br />\n                        <input type="text" class="').concat(_0x378b5c.classNames['cheat-name-input'], '" /><br />\n\n                    </main>\n                    <footer class="').concat(_0x378b5c.classNames.modal__footer, '">\n                    <button class="').concat(_0x378b5c.classNames.modal__btn, ' ').concat(_0x378b5c.classNames['modal__btn-primary'], '">'+_0xa88a13.localization('Submit')+'</button>\n                    <button class="').concat(_0x378b5c.classNames.modal__btn, '" data-modal-close aria-label="Close">'+_0xa88a13.localization('Close')+'</button>\n                    </footer>\n                </div>\n                </div>\n            </div>\n            ');
                    var _0x17edbf = _0xa88a13.elements.dialogs.cheat.querySelector('#modal-85cd7a1c543a484b');
                    _0x1093f4.call(this, _0xa88a13.elements.dialogs.cheat.querySelector('.' .concat(_0x378b5c.classNames['cheats-add'])), 'click', function(_0x2a74b5) {
                        return _0x4d8495.show('modal-85cd7a1c543a484b', {
                            'closeTrigger': 'data-modal-close'
                        }), !0x1;
                    });
                    var _0x2c1832 = _0xa88a13.elements.dialogs.cheat.querySelector('.' .concat(_0x378b5c.classNames['cheats-list']));
                    _0x1093f4.call(this, _0x17edbf.querySelector('.' .concat(_0x378b5c.classNames['modal__btn-primary'])), 'click', function(_0x1c01ce) {
                        var _0x184e2c = _0x17edbf.querySelector('.' .concat(_0x378b5c.classNames['cheat-name-input'])).value,
                            _0x15ccbb = _0x17edbf.querySelector('.' .concat(_0x378b5c.classNames['cheat-code-input'])).value;
                        if (_0x184e2c && _0x15ccbb) {
                            var _0x2c3108 = _0x2c1832.querySelectorAll('input:checked');
                            _0x17edbf.querySelector('.' .concat(_0x378b5c.classNames['cheat-name-input'])).value = '', _0x17edbf.querySelector('.' .concat(_0x378b5c.classNames['cheat-code-input'])).value = '', _0x4d8495.close();
                            var _0x5b2cff = _0xa88a13.cheats.length;
                            _0xa88a13.cheats.push([_0x184e2c, _0x15ccbb]), _0x2c1832.innerHTML += '<div class="' .concat(_0x378b5c.classNames['ejs-switch'], '">\n                            <input type="checkbox" value="').concat(_0x5b2cff, '" id="ejs-cheat-switch-').concat(_0x5b2cff, '">\n                            <label for="ejs-cheat-switch-').concat(_0x5b2cff, '">').concat(_0x184e2c, '</label>\n                            <a href="#" data-idx="').concat(_0x5b2cff, '" onclick="return false" class="').concat(_0x378b5c.classNames['ejs-delete-cheat'], '">&times;</a>\n                        </div>'), _0x2c3108.forEach(function(_0x1fb248, _0x7bb84b) {
                                _0x2c1832.querySelector('#ejs-cheat-switch-' .concat(_0x7bb84b)).setAttribute('checked', 'checked');
                            });
                        }
                        return 'localStorage' in window && localStorage.setItem('' .concat(_0xa88a13.system, '-').concat(_0xa88a13.startName, '-cheats'), JSON.stringify(_0xa88a13.cheats)), _0x1c01ce.stopPropagation(), !0x1;
                    });
                    var _0x257001 = function() {
                        if ('localStorage' in window) {
                            var _0x17edbf = localStorage.getItem('' .concat(_0xa88a13.system, '-').concat(_0xa88a13.startName, '-cheats'));
                            try {
                                _0x17edbf = JSON.parse(_0x17edbf);
                            } catch (_0x101b3e) {}
                            _0x17edbf && (_0xa88a13.cheats = _0x17edbf);
                        }
                        _0x2c1832.innerHTML = '', _0xa88a13.cheats && Array.isArray(_0xa88a13.cheats) && _0xa88a13.cheats.forEach(function(_0x245035, _0x116996) {
                            var _0x4ac35a = _0x245035[0x0];
                            _0x245035[0x1];
                            _0x2c1832.innerHTML += '<div class="' .concat(_0x378b5c.classNames['ejs-switch'], '">\n                                <input type="checkbox" value="').concat(_0x116996, '" id="ejs-cheat-switch-').concat(_0x116996, '">\n                                <label for="ejs-cheat-switch-').concat(_0x116996, '">').concat(_0x4ac35a, '</label>\n                                <a href="#" data-idx="').concat(_0x116996, '" onclick="return false" class="').concat(_0x378b5c.classNames['ejs-delete-cheat'], '">&times;</a>\n                            </div>');
                        });
                    };
                    _0x1093f4.call(_0xa88a13, _0x2c1832, 'click', function(_0x576733) {
                        if (_0x576733.target && _0x576733.target.classList.contains(_0x378b5c.classNames['ejs-delete-cheat']) && _0x576733.target.getAttribute('data-idx')) {
                            var _0x5b10b7 = _0x576733.target.getAttribute('data-idx');
                            _0xa88a13.cheats.splice(_0x5b10b7, 0x1), 'localStorage' in window && localStorage.setItem('' .concat(_0xa88a13.system, '-').concat(_0xa88a13.startName, '-cheats'), JSON.stringify(_0xa88a13.cheats));
                            var _0x557895 = [];
                            _0x2c1832.querySelectorAll('input').forEach(function(_0xab0ba8, _0x1f3597) {
                                _0x557895[_0x1f3597] = !!_0x2c1832.querySelector('#ejs-cheat-switch-' .concat(_0x1f3597, ':checked'));
                            }), _0x557895.splice(_0x5b10b7, 0x1), _0x257001(), _0x557895.forEach(function(_0x2e22be, _0x2247c4) {
                                _0x2e22be && _0x2c1832.querySelector('#ejs-cheat-switch-' .concat(_0x2247c4)).setAttribute('checked', 'checked');
                            });
                        }
                        return _0x576733.stopPropagation(), !0x1;
                    }), _0x1093f4.call(_0xa88a13, _0xa88a13.elements.container, 'start-game', function(_0x4c266e) {
                        _0x257001();
                    }), _0x1093f4.call(this, _0xa88a13.elements.dialogs.cheat.querySelector('.' .concat(_0x378b5c.classNames['btn-cancel'])), 'click', function(_0x4adb2c) {
                        return _0x132da7(_0xa88a13.elements.dialogs.cheat, true), _0x4adb2c.stopPropagation(), _0xa88a13.elements.container.focus(), !0x1;
                    }), _0x1093f4.call(this, _0xa88a13.elements.dialogs.cheat.querySelector('.' .concat(_0x378b5c.classNames['btn-submit'])), 'click', function(_0x5785f6) {
                        return _0x378b5c.resetCheat(), _0x2c1832.querySelectorAll('input:checked').forEach(function(_0xeb7426, _0x45b02d) {
                            var _0x27e2c1 = _0xa88a13.cheats[_0xeb7426.value];
                            _0x27e2c1 && _0x378b5c.setCheat(_0x45b02d, 0x1, _0x27e2c1[0x1]);
                        }), _0x132da7(_0xa88a13.elements.dialogs.cheat, true), _0xa88a13.elements.container.focus(), !0x1;
                    }), 'arcade' !== _0xa88a13.system && 'mame' !== _0xa88a13.system && 'mame2003' !== _0xa88a13.system && 'mame2010' !== _0xa88a13.system || (_0x1e2c68.element(_0xa88a13.elements.buttons.cheat) && _0x132da7(_0xa88a13.elements.buttons.cheat, true), _0x378b5c.allowCheat = !0x1), _0x378b5c.setCheat || (_0x132da7(_0xa88a13.elements.buttons.cheat, true), _0x378b5c.allowCheat = !0x1);
                }
            },
            'setNetplayDialog': function() {
                var _0xa88a13 = this,
                    _0x17edbf = this;
                if (_0x17edbf.elements.dialogs.netplay) {
                    _0x17edbf.elements.dialogs.netplay.innerHTML = '\n            <div class="' .concat(_0x378b5c.classNames['dialog-container'], '">\n                <div class="').concat(_0x378b5c.classNames['dialog-title'], '">\n                    <h4>'+_0x17edbf.localization('Netplay')+'</h4>\n                </div>\n                <div class="').concat(_0x378b5c.classNames['dialog-content'], '">\n                    <div class="').concat(_0x378b5c.classNames['netplay-roomlist'], '" hidden>\n                        <strong>'+_0x17edbf.localization('Rooms')+'</strong>\n                        <table style="width:100%" cellspacing=0>\n                            <thead>\n                                <tr>\n                                    <td>'+_0x17edbf.localization('Room Name')+'</td>\n                                    <td>'+_0x17edbf.localization('Players')+'</td>\n                                    <td></td>\n                                </tr>\n                            </thead>\n                            <tbody>\n                                <tr>\n                                    <td></td>\n                                    <td></td>\n                                    <td></td>\n                                </tr>\n                            </tbody>\n                        </table>\n                    </div>\n\n                    <div class="').concat(_0x378b5c.classNames['netplay-room'], '" hidden>\n                        <strong>'+_0x17edbf.localization('Room Name')+'</strong>\n                        <div data-room-password>'+_0x17edbf.localization('Password')+': <span></span></div>\n                        <table style="width:100%" cellspacing="0">\n                            <thead>\n                            <tr>\n                                <td>'+_0x17edbf.localization('Player')+'</td>\n                                <td>'+_0x17edbf.localization('Name')+'</td>\n                                <td></td>\n                            </tr>\n                            </thead>\n                            <tbody>\n                            <tr>\n                                <td>1</td>\n                                <td>'+_0x17edbf.localization('Name')+' 1</td>\n                                <td></td>\n                            </tr>\n                            <tr>\n                                <td>2</td>\n                                <td>'+_0x17edbf.localization('Name')+' 2</td>\n                                <td></td>\n                            </tr>\n                            <tr>\n                                <td>3</td>\n                                <td>'+_0x17edbf.localization('Name')+' 3</td>\n                                <td></td>\n                            </tr>\n                            <tr>\n                                <td>4</td>\n                                <td>'+_0x17edbf.localization('Name')+' 4</td>\n                                <td></td>\n                            </tr>\n                            </tbody>\n                        </table>\n                    </div>\n                </div>\n                <div class="').concat(_0x378b5c.classNames['dialog-buttons'], '">\n                    <a href="#" onclick="return false" class="').concat(_0x378b5c.classNames['btn-quit'], '">'+_0x17edbf.localization('Quit Room')+'</a>\n                    <a href="#" onclick="return false" class="').concat(_0x378b5c.classNames['btn-create-room'], '">'+_0x17edbf.localization('Create a Room')+'</a>\n                    <a href="#" onclick="return false" class="').concat(_0x378b5c.classNames['btn-cancel'], '">'+_0x17edbf.localization('Close')+'</a>\n                </div>\n            </div>\n\n            \n            <div class="').concat(_0x378b5c.classNames.modal, ' ').concat(_0x378b5c.classNames['micromodal-slide'], '" id="modal-9de6c4e9ce2b9361" aria-hidden="true">\n                <div class="').concat(_0x378b5c.classNames.modal__overlay, '" tabindex="-1">\n                <div class="').concat(_0x378b5c.classNames.modal__container, '" role="dialog" aria-modal="true" aria-labelledby="modal-9de6c4e9ce2b9361-title">\n                    <div class="').concat(_0x378b5c.classNames.modal__header, '">\n                    <h2 class="').concat(_0x378b5c.classNames.modal__title, '" id="modal-9de6c4e9ce2b9361-title">\n                        '+_0x17edbf.localization('Set Player Name')+'\n                    </h2>\n                    </div>\n                    <main class="').concat(_0x378b5c.classNames.modal__content, '" id="modal-9de6c4e9ce2b9361-content">\n\n                        <div class="').concat(_0x378b5c.classNames.modal__errmsg, '"></div>\n                        <strong>'+_0x17edbf.localization('Player Name')+'</strong><br />\n                        <input type="text" maxlength="10" class="').concat(_0x378b5c.classNames['netplay-player-name'], '" /><br />\n\n                    </main>\n                    <footer class="').concat(_0x378b5c.classNames.modal__footer, '">\n                    <button class="').concat(_0x378b5c.classNames.modal__btn, ' ').concat(_0x378b5c.classNames['modal__btn-primary'], '">'+_0x17edbf.localization('Submit')+'</button>\n                    </footer>\n                </div>\n                </div>\n            </div>\n            \n            <div class="').concat(_0x378b5c.classNames.modal, ' ').concat(_0x378b5c.classNames['micromodal-slide'], '" id="modal-85cd7a1c543a484a" aria-hidden="true">\n                <div class="').concat(_0x378b5c.classNames.modal__overlay, '" tabindex="-1" data-modal-close>\n                <div class="').concat(_0x378b5c.classNames.modal__container, '" role="dialog" aria-modal="true" aria-labelledby="modal-85cd7a1c543a484a-title">\n                    <div class="').concat(_0x378b5c.classNames.modal__header, '">\n                    <h2 class="').concat(_0x378b5c.classNames.modal__title, '" id="modal-85cd7a1c543a484a-title">\n                    '+_0x17edbf.localization('Create a Room')+'\n                    </h2>\n                    <button class="').concat(_0x378b5c.classNames.modal__close, '" aria-label="Close modal" data-modal-close></button>\n                    </div>\n                    <main class="').concat(_0x378b5c.classNames.modal__content, '" id="modal-85cd7a1c543a484a-content">\n\n                        <div class="').concat(_0x378b5c.classNames.modal__errmsg, '"></div>\n                        <strong>'+_0x17edbf.localization('Room Name')+'</strong><br />\n                        <input type="text" maxlength="10" class="').concat(_0x378b5c.classNames['netplay-room-name-input'], '" /><br />\n                        <strong>Max Players</strong><br />\n                        <select data-max-players>\n                            <option value="2">2</option>\n                            <option value="3">3</option>\n                            <option value="4">4</option>\n                        </select>\n                        <br />\n                        <strong>'+_0x17edbf.localization('Password (optional)')+'</strong><br />\n                        <input type="text" maxlength="10" class="').concat(_0x378b5c.classNames['netplay-room-password-input'], '" /><br />\n\n                    </main>\n                    <footer class="').concat(_0x378b5c.classNames.modal__footer, '">\n                    <button class="').concat(_0x378b5c.classNames.modal__btn, ' ').concat(_0x378b5c.classNames['modal__btn-primary'], '">'+_0x17edbf.localization('Submit')+'</button>\n                    <button class="').concat(_0x378b5c.classNames.modal__btn, '" data-modal-close aria-label="Close">'+_0x17edbf.localization('Close')+'</button>\n                    </footer>\n                </div>\n                </div>\n            </div>\n            \n            <div class="').concat(_0x378b5c.classNames.modal, ' ').concat(_0x378b5c.classNames['micromodal-slide'], '" id="modal-5aa765d61d8327de" aria-hidden="true">\n                <div class="').concat(_0x378b5c.classNames.modal__overlay, '" tabindex="-1" data-modal-close>\n                <div class="').concat(_0x378b5c.classNames.modal__container, '" role="dialog" aria-modal="true" aria-labelledby="modal-5aa765d61d8327de-title">\n                    <div class="').concat(_0x378b5c.classNames.modal__header, '">\n                    <h2 class="').concat(_0x378b5c.classNames.modal__title, '" id="modal-5aa765d61d8327de-title">\n                        '+_0x17edbf.localization('Password')+'\n                    </h2>\n                    <button class="').concat(_0x378b5c.classNames.modal__close, '" aria-label="Close modal" data-modal-close></button>\n                    </div>\n                    <main class="').concat(_0x378b5c.classNames.modal__content, '" id="modal-5aa765d61d8327de-content">\n\n                        <div class="').concat(_0x378b5c.classNames.modal__errmsg, '"></div>\n                        <input type="text" maxlength="10" class="').concat(_0x378b5c.classNames['netplay-room-password-input'], '" /><br />\n\n                    </main>\n                    <footer class="').concat(_0x378b5c.classNames.modal__footer, '">\n                    <button class="').concat(_0x378b5c.classNames.modal__btn, ' ').concat(_0x378b5c.classNames['modal__btn-primary'], '">'+_0x17edbf.localization('Submit')+'</button>\n                    <button class="').concat(_0x378b5c.classNames.modal__btn, '" data-modal-close aria-label="Close">'+_0x17edbf.localization('Close')+'</button>\n                    </footer>\n                </div>\n                </div>\n            </div>\n            \n            \n            <div class="').concat(_0x378b5c.classNames.modal, ' ').concat(_0x378b5c.classNames['micromodal-slide'], '" id="modal-7d8fd50ed642340b" aria-hidden="true">\n                <div class="').concat(_0x378b5c.classNames.modal__overlay, '" tabindex="-1" data-modal-close>\n                <div class="').concat(_0x378b5c.classNames.modal__container, '" role="dialog" aria-modal="true" aria-labelledby="modal-7d8fd50ed642340b-title">\n                    <div class="').concat(_0x378b5c.classNames.modal__header, '">\n                    <h2 class="').concat(_0x378b5c.classNames.modal__title, '" id="modal-7d8fd50ed642340b-title"></h2>\n                    <button class="').concat(_0x378b5c.classNames.modal__close, '" aria-label="Close modal" data-modal-close></button>\n                    </div>\n                    <main class="').concat(_0x378b5c.classNames.modal__content, '" id="modal-7d8fd50ed642340b-content">\n                        \n                    </main>\n                    <footer class="').concat(_0x378b5c.classNames.modal__footer, '">\n                    <button class="').concat(_0x378b5c.classNames.modal__btn, ' ').concat(_0x378b5c.classNames['modal__btn-primary'], '" data-modal-close>OK</button>\n                    </footer>\n                </div>\n                </div>\n            </div>\n            \n            '), _0x1093f4.call(this, _0x17edbf.elements.dialogs.netplay.querySelector('.' .concat(_0x378b5c.classNames['btn-cancel'])), 'click', function(_0x3d4554) {
                        return _0x132da7(_0x17edbf.elements.dialogs.netplay, true), _0x378b5c.disableControl(!0x1), _0x378b5c.stopLoadRooms(), _0x3d4554.stopPropagation(), _0x17edbf.elements.container.focus(), !0x1;
                    }), window.setInterval(function() {
                        var _0xa88a13 = '<ul>';
                        _0x378b5c.players.forEach(function(_0x20c45e, _0x14d0b2) {
                            var _0x57ec9c = null;
                            _0x20c45e ? (_0x378b5c.connection.peers[_0x20c45e] ? _0x57ec9c = _0x378b5c.connection.peers[_0x20c45e].extra : _0x378b5c.connection.userid === _0x20c45e && (_0x57ec9c = _0x378b5c.connection.extra), _0xa88a13 += '<li>' .concat(_0x14d0b2 + 0x1, '. ').concat(_0x57ec9c.name, '</li>')) : _0xa88a13 += '<li>' .concat(_0x14d0b2 + 0x1, '. </li>');
                        }), _0xa88a13 += '</ul>', _0x17edbf.elements.widgets.netplay.innerHTML = _0xa88a13;
                    }, 0x1f4);
                    var _0x2c1832 = _0x17edbf.elements.dialogs.netplay.querySelector('#modal-9de6c4e9ce2b9361'),
                        _0x36bde0 = _0x17edbf.elements.dialogs.netplay.querySelector('#modal-85cd7a1c543a484a'),
                        _0x5289c1 = _0x17edbf.elements.dialogs.netplay.querySelector('#modal-7d8fd50ed642340b'),
                        _0x325651 = _0x17edbf.elements.dialogs.netplay.querySelector('#modal-5aa765d61d8327de'),
                        _0x3d0d28 = {};
                    _0x378b5c.connection = new _0x4a2390.a();
                    var _0x10d51e = _0xa88a13.socketUrl;
                    if (! _0x10d51e.endsWith('/')) {
                        _0x10d51e += '/';
                    };
                    _0x378b5c.connection.socketURL = '/', _0x378b5c.connection.socketURL = _0x10d51e, _0x378b5c.connection.socketMessageEvent = 'emulatorjs-message', _0x378b5c.connection.socketCustomEvent = 'emulatorjs-custom-message';
                    var _0xda20e9 = _0x59aa33.info();
                    _0x378b5c.connection.extra = {
                        'name': _0x378b5c.playerName,
                        'game_id': _0x17edbf.config.gameId,
                        'browser_name': _0xda20e9.name,
                        'room_name': ' ',
                        'domain': document.domain
                    }, _0x378b5c.connection.socketMessageEvent = 'netplay', _0x378b5c.connection.enableFileSharing = true, _0x378b5c.connection.enableLogs = !0x1, _0x378b5c.connection.session = {
                        'data': true
                    }, _0x378b5c.connection.sdpConstraints.mandatory = {
                        'OfferToReceiveAudio': !0x1,
                        'OfferToReceiveVideo': !0x1
                    }, _0x378b5c.connection.onclose = function(_0x4fec07) {}, _0x378b5c.connection.iceServers = [{
                        'urls': 'turn:turn.emulatorjs.com:3478',
                        'credential': 'dSnmrtehverella',
                        'username': 'ejs'
                    }, {
                        'urls': ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302', 'stun:stun.l.google.com:19302?transport=udp']
                    }], _0x378b5c.connection.maxParticipantsAllowed = 0x4, _0x378b5c.netPlayInitFrame = 0x0;
                    var _0x1eb137 = 0x0,
                        _0x52eb7d = !0x1;
                    Module.postMainLoop = function() {
                        var _0xa88a13;
                        if (_0x378b5c.currentFrame = parseInt(_0x378b5c.currentFrameNum(), 0xa), _0x378b5c.connected)
                            if (_0x1eb137 += 0x1, _0x378b5c.connection.isInitiator) _0x1eb137 >= 0x1 && function() {
                                for (var _0xa88a13 = [], _0x17edbf = _0x378b5c.currentFrame - 0x1; _0x17edbf < _0x378b5c.currentFrame; _0x17edbf += 0x1) _0x378b5c.inputsData[_0x17edbf] ? _0x378b5c.inputsData[_0x17edbf].forEach(function(_0x2a02da, _0x1b2066) {
                                    _0xa88a13.push('' .concat(_0x2a02da.index, '|').concat(_0x2a02da.key, '|').concat(_0x2a02da.status, '|').concat(_0x2a02da.frame));
                                }) : _0xa88a13.push('-1|||' .concat(_0x17edbf));
                                _0x378b5c.connection.send(JSON.stringify({
                                    'act': 'sync-control',
                                    'value': _0xa88a13
                                })), _0x1eb137 = 0x0, _0x378b5c.currentFrame % 0x64 == 0x0 && Object.keys(_0x378b5c.inputsData).forEach(function(_0x3125e4, _0x31ea67) {
                                    _0x3125e4 < _0x378b5c.currentFrame - 0x32 && (_0x378b5c.inputsData[_0x3125e4] = null, delete _0x378b5c.inputsData[_0x3125e4]);
                                });
                            }();
                            else {
                                if (_0x378b5c.coreOptionData[_0x378b5c.currentFrame]) {
                                    var _0x2c1832 = _0x378b5c.coreOptionData[_0x378b5c.currentFrame].key,
                                        _0x4fd0cc = _0x378b5c.coreOptionData[_0x378b5c.currentFrame].value;
                                    _0x2593da.updateCoreOptions.call(_0x17edbf, _0x2c1832, _0x4fd0cc), delete _0x378b5c.coreOptionData[_0x378b5c.currentFrame];
                                }
                                if (_0x378b5c.currentFrame <= 0x0 || _0x378b5c.inputsData[_0x378b5c.currentFrame]) _0x378b5c.wait = !0x1, _0x378b5c.systemPause(0x0), _0x27f4c4.Module.resumeMainLoop(), _0xa88a13 = _0x378b5c.inputsData[_0x378b5c.currentFrame], _0x378b5c.inputsData[_0x378b5c.currentFrame] = null, delete _0x378b5c.inputsData[_0x378b5c.currentFrame], _0xa88a13 || (_0xa88a13 = []), _0xa88a13.forEach(function(_0x4bb42f, _0x28928a) {
                                    _0x4bb42f.index >= 0x0 && _0x378b5c.simulateInputFn(_0x4bb42f.index, _0x4bb42f.key, _0x4bb42f.status);
                                });
                                else {
                                    _0x378b5c.wait = true, _0x378b5c.systemPause(0x1), _0x27f4c4.Module.pauseMainLoop();
                                    var _0x3a10d1 = !0x1,
                                        _0x42763c = Object.keys(_0x378b5c.inputsData);
                                    0x0 == _0x42763c.length && (_0x3a10d1 = true);
                                    for (var _0x58af15 = 0x0; _0x58af15 < _0x42763c.length; _0x58af15 += 0x1) {
                                        if (_0x42763c[_0x58af15] > _0x378b5c.currentFrame) {
                                            console.log('lost', _0x378b5c.currentFrame), _0x3a10d1 = true;
                                            break;
                                        }
                                    }
                                    _0x3a10d1 ? _0x378b5c.wait || (!_0x52eb7d || _0x52eb7d < new Date().valueOf() - 0xbb8) && (_0x378b5c.inputsData = {}, _0x52eb7d = new Date().valueOf(), _0x378b5c.connection.send(JSON.stringify({
                                        'act': 'sync-mem',
                                        'value': _0x378b5c.connection.userid
                                    }), _0x378b5c.roomMaster)) : (_0x378b5c.wait = true, _0x378b5c.systemPause(0x1), _0x27f4c4.Module.pauseMainLoop());
                                }
                                _0x378b5c.currentFrame % 0x64 == 0x0 && Object.keys(_0x378b5c.inputsData).forEach(function(_0x3aa393, _0x3a7829) {
                                    _0x3aa393 < _0x378b5c.currentFrame - 0x32 && (_0x378b5c.inputsData[_0x3aa393] = null, delete _0x378b5c.inputsData[_0x3aa393]);
                                });
                            }
                    }, _0x378b5c.connection.onopen = function(_0x4b10d6) {
                        _0x378b5c.connected = true, _0x378b5c.connection.isInitiator && (-0x1 === _0x378b5c.players.indexOf(_0x4b10d6.userid) && (_0x378b5c.players.filter(function(_0x3eafb3, _0xabd7b7) {
                            return null == _0x3eafb3;
                        }).length > 0x0 ? _0x378b5c.players.forEach(function(_0xbf0f19, _0xa9d540) {
                            null != _0xbf0f19 || _0x378b5c.players.includes(_0x4b10d6.userid) || (_0x378b5c.players[_0xa9d540] = _0x4b10d6.userid);
                        }) : _0x378b5c.players.push(_0x4b10d6.userid)), _0x378b5c.connection.send(JSON.stringify({
                            'act': 'get-players-result',
                            'value': _0x378b5c.players,
                            'coreOptions': _0x2593da.coreOptionsValues,
                            'newuser': _0x4b10d6.userid,
                            'master': _0x378b5c.connection.userid
                        }))), _0x2593da.updateCoreOptionMenuItems.call(_0x17edbf);
                    }, _0x378b5c.connection.onFileStart = function(_0x50eb3a) {
                        var _0x2c1832 = _0x50eb3a.name.split('-');
                        'reset' !== _0x2c1832[0x0] && 0x0 != _0x2c1832[0x0] || (_0x378b5c.inputsData = {}, _0x378b5c.disableControl(true)), _0x378b5c.progressHelper[_0x50eb3a.remoteUserId] = {}, _0x378b5c.progressHelper[_0x50eb3a.remoteUserId].max = _0x50eb3a.maxChunks, _0x378b5c.showLoading.call(_0x17edbf), _0x378b5c.connection.isInitiator ? (_0x378b5c.wait = true, _0x378b5c.systemPause(0x1), _0x27f4c4.Module.pauseMainLoop()) : _0x378b5c.inputsData = {};
                    }, _0x378b5c.connection.onFileProgress = function(_0x44a04b) {
                        var _0x17edbf = _0x378b5c.progressHelper[_0x44a04b.remoteUserId];
                        _0x17edbf.current = _0x44a04b.currentPosition || _0x44a04b.maxChunks || _0x17edbf.max;
                    }, _0x378b5c.connection.onFileEnd = function(_0x45d454) {
                        _0x378b5c.hideLoading.call(_0x17edbf);
                        var _0x2c1832 = _0x45d454.name.split('-'),
                            _0x3795d9 = _0x2c1832[0x0] >> 0x0;
                        'reset' === _0x2c1832[0x0] ? (_0x3795d9 = 0x0, _0x378b5c.connection.isInitiator ? (_0x378b5c.systemPause(0x0), _0x378b5c.disableControl(!0x1), _0x17edbf.playing = true, _0x27f4c4.Module.resumeMainLoop()) : _0x550f17.a.get(_0x45d454.url, {
                            'responseType': 'arraybuffer'
                        }).then(function(_0x37db4c) {
                            _0x378b5c.inputsData = {};
                            var _0x2c1832 = new Uint8Array(_0x37db4c.data);
                            _0x378b5c.loadState(_0x2c1832, _0x3795d9), _0x378b5c.wait = !0x1, _0x378b5c.systemPause(0x0), _0x378b5c.disableInput = !0x1, _0x17edbf.playing = true, _0x27f4c4.Module.resumeMainLoop();
                        })) : 'game.state' === _0x2c1832[0x1] && (_0x378b5c.connection.isInitiator ? (_0x378b5c.openRoom(_0x17edbf), _0x378b5c.wait = !0x1, _0x378b5c.systemPause(0x0), _0x27f4c4.Module.resumeMainLoop()) : (_0x378b5c.netPlayInitFrame = _0x3795d9, _0x550f17.a.get(_0x45d454.url, {
                            'responseType': 'arraybuffer'
                        }).then(function(_0x4d241b) {
                            var _0x2c1832 = new Uint8Array(_0x4d241b.data);
                            _0x378b5c.loadState(_0x2c1832, _0x3795d9), _0x378b5c.wait = !0x1, _0x378b5c.disableInput = !0x1, _0x378b5c.connection.send(JSON.stringify({
                                'act': 'wait-end',
                                'value': _0x378b5c.connection.userid
                            })), _0x378b5c.hideLoading.call(_0x17edbf), _0x17edbf.playing = true, _0x27f4c4.Module.resumeMainLoop();
                        }))), _0x378b5c.connection.isInitiator || console.log('recv mem end', _0x378b5c.currentFrame, _0x45d454.name);
                    };
                    var _0x3bdb35 = !0x1;
                    _0x378b5c.connection.onmessage = function(_0x32e81a) {
                        var _0x2c1832, _0x2dca58 = _0x32e81a.data || _0x32e81a;
                        try {
                            _0x2c1832 = JSON.parse(_0x2dca58);
                        } catch (_0x3fb9cc) {
                            _0x2c1832 = null;
                        }
                        if (_0x2c1832) {
                            if ('room-master' === _0x2c1832.act && (_0x378b5c.roomMaster = _0x2c1832.value), _0x2c1832.act, 'short-pause' === _0x2c1832.act && (_0x3bdb35 || (_0x378b5c.systemPause(0x1), _0x27f4c4.Module.pauseMainLoop(), _0x3bdb35 = true, _0x378b5c.wait = true, setTimeout(function() {
                                    _0x378b5c.systemPause(0x0), _0x27f4c4.Module.resumeMainLoop(), _0x378b5c.wait = !0x1, _0x3bdb35 = !0x1;
                                }, 0x30))), 'sync-control' === _0x2c1832.act) {
                                var _0xb051c1 = _0x2c1832.value;
                                _0x17edbf.playing || _0x378b5c.wait;
                                var _0x2ef644 = _0x378b5c.connection.userid;
                                _0x378b5c.players.indexOf(_0x2ef644);
                                _0x378b5c.connection.isInitiator, _0xb051c1.forEach(function(_0x308105, _0x383237) {
                                    var _0x2c1832 = _0x308105.split('|'),
                                        _0x25a5c4 = _0x2c1832[0x0] >> 0x0,
                                        _0x2b3afd = _0x2c1832[0x1] >> 0x0,
                                        _0x4f5761 = _0x2c1832[0x2] >> 0x0,
                                        _0x249303 = _0x2c1832[0x3] >> 0x0,
                                        _0x54e0fd = _0x378b5c.currentFrame;
                                    _0x378b5c.inputsData[_0x249303] || (_0x378b5c.inputsData[_0x249303] = []), -0x1 !== _0x25a5c4 && _0x249303 === _0x54e0fd && _0x378b5c.simulateInputFn(_0x25a5c4, _0x2b3afd, _0x4f5761), _0x378b5c.connection.isInitiator ? _0x25a5c4 >= 0x0 && (_0x378b5c.inputsData[_0x54e0fd] || (_0x378b5c.inputsData[_0x54e0fd] = []), -0x2 != _0x2b3afd && (_0x378b5c.inputsData[_0x54e0fd].push({
                                        'index': _0x25a5c4,
                                        'key': _0x2b3afd,
                                        'status': _0x4f5761,
                                        'frame': _0x54e0fd
                                    }), _0x378b5c.simulateInputFn(_0x25a5c4, _0x2b3afd, _0x4f5761)), _0x3bdb35 || _0x54e0fd - 0xa >= _0x249303 && (_0x378b5c.systemPause(0x1), _0x27f4c4.Module.pauseMainLoop(), _0x3bdb35 = true, _0x378b5c.wait = true, setTimeout(function() {
                                        _0x378b5c.systemPause(0x0), _0x27f4c4.Module.resumeMainLoop(), _0x378b5c.wait = !0x1, _0x3bdb35 = !0x1;
                                    }, 0x30))) : ('' !== _0x25a5c4 && _0x378b5c.inputsData[_0x249303].push({
                                        'index': _0x25a5c4,
                                        'key': _0x2b3afd,
                                        'status': _0x4f5761,
                                        'frame': _0x249303
                                    }), _0x378b5c.inputsData[_0x378b5c.currentFrame] && _0x27f4c4.Module.resumeMainLoop(), _0x54e0fd + 0xa <= _0x249303 && _0x249303 > _0x378b5c.netPlayInitFrame + 0x64 && _0x378b5c.connection.send(JSON.stringify({
                                        'act': 'short-pause',
                                        'value': _0x2ef644
                                    }), _0x378b5c.roomMaster));
                                });
                            }
                            if (_0x2c1832.act, _0x2c1832.act, 'update-core-option' === _0x2c1832.act && (_0x378b5c.connection.isInitiator || (_0x378b5c.coreOptionData[_0x2c1832.frame] = {
                                    'key': _0x2c1832.key,
                                    'value': _0x2c1832.value
                                })), 'restart-game' === _0x2c1832.act && (_0x378b5c.inputsData = {}, _0x378b5c.connection.send(JSON.stringify({
                                    'act': 'sync-mem',
                                    'value': _0x378b5c.connection.userid
                                }), _0x378b5c.roomMaster)), 'pause' === _0x2c1832.act && _0x27f4c4.Module.pauseMainLoop(), 'resume' === _0x2c1832.act && _0x27f4c4.Module.resumeMainLoop(), 'wait' === _0x2c1832.act && (_0x378b5c.wait = true, _0x378b5c.systemPause(0x1), _0x2c1832.value !== _0x378b5c.connection.userid && (_0x378b5c.waitingList[_0x2c1832.value] = 0x1), _0x378b5c.disableControl(true)), 'wait-end' === _0x2c1832.act && (_0x378b5c.waitingList[_0x2c1832.value] && delete _0x378b5c.waitingList[_0x2c1832.value], 0x0 === Object.keys(_0x378b5c.waitingList).length && (_0x378b5c.wait = !0x1, _0x378b5c.systemPause(0x0), _0x378b5c.disableInput = !0x1)), 'sync-mem' === _0x2c1832.act) {
                                _0x378b5c.wait = true, _0x378b5c.systemPause(0x1);
                                var _0x2a5bce = _0x2c1832.value;
                                _0x378b5c.disableControl(true), _0x378b5c.connection.send(JSON.stringify({
                                    'act': 'wait',
                                    'value': _0x2a5bce
                                }));
                                for (var _0x8624ae = _0x378b5c.getStateInfo().split('|'), _0x99810a = _0x8624ae[0x0] >> 0x0, _0x96975a = new Uint8Array(_0x99810a), _0x4aea80 = _0x8624ae[0x1] >> 0x0, _0x2d2ba0 = 0x0; _0x2d2ba0 < _0x99810a; _0x2d2ba0 += 0x1) _0x96975a[_0x2d2ba0] = _0x27f4c4.Module.getValue(_0x4aea80 + _0x2d2ba0);
                                _0x27f4c4._FS.createDataFile('/', 'game.state', _0x96975a, true, true), _0x27f4c4.Module.cwrap('load_state', 'number', ['string', 'number'])('game.state', 0x0), _0x27f4c4.FS.unlink('game.state'), _0x378b5c.inputsData = {};
                                var _0x49054f = new File([_0x96975a], '' .concat(0x0, '-game.state'), {
                                    'type': '',
                                    'lastModified': new Date()
                                });
                                _0x378b5c.connection.shareFile(_0x49054f, _0x2a5bce);
                            }
                            if (_0x2c1832.act, 'get-players-result' === _0x2c1832.act && (_0x378b5c.players = _0x2c1832.value, _0x378b5c.roomMaster = _0x2c1832.master, _0x2c1832.newuser === _0x378b5c.connection.userid)) {
                                var _0x418ccb = _0x2593da.coreOptionsValues;
                                _0x2c1832.coreOptions && Object.keys(_0x2c1832.coreOptions).forEach(function(_0x3f4c8f) {
                                    _0x418ccb[_0x3f4c8f] !== _0x2c1832.coreOptions[_0x3f4c8f] && _0x2593da.updateCoreOptions.call(_0x17edbf, _0x3f4c8f, _0x2c1832.coreOptions[_0x3f4c8f]);
                                }), _0x378b5c.showLoading.call(_0x17edbf), _0x378b5c.disableControl(true), setTimeout(function() {
                                    _0x378b5c.connection.send(JSON.stringify({
                                        'act': 'sync-mem',
                                        'value': _0x378b5c.connection.userid
                                    }), _0x378b5c.roomMaster);
                                }, 0x1), _0x378b5c.roomMaster && _0x378b5c.connection.peers[_0x378b5c.roomMaster] && (_0x378b5c.connection.extra.room_name = _0x378b5c.connection.peers[_0x378b5c.roomMaster].extra.room_name, _0x378b5c.connection.updateExtraData()), _0x378b5c.connection.peers[_0x378b5c.roomMaster] && (_0x3d0d28 = _0x378b5c.connection.peers[_0x378b5c.roomMaster].extra), _0x378b5c.openRoom(_0x17edbf);
                            }
                        }
                    }, _0x378b5c.connection.onUserStatusChanged = function(_0x4188ba) {
                        if ('offline' === _0x4188ba.status) {
                            var _0x17edbf = _0x378b5c.players.indexOf(_0x4188ba.userid);
                            _0x17edbf >= 0x0 && (_0x378b5c.players[_0x17edbf] = null);
                        }
                        _0x4188ba.status;
                    }, _0x378b5c.connection.onExtraDataUpdated = function(_0x20ce61) {
                        _0x20ce61.userid === _0x378b5c.connection.userid && (_0x378b5c.connection.extra = _0x20ce61.extra);
                    }, _0x378b5c.connection.onleave = function(_0x30ebc6) {
                        if (_0x30ebc6.userid) {
                            var _0x2c1832 = _0x378b5c.players.indexOf(_0x30ebc6.userid);
                            _0x2c1832 >= 0x0 && (_0x378b5c.players[_0x2c1832] = null);
                        }
                        _0x378b5c.waitingList[_0x30ebc6.userid] && delete _0x378b5c.waitingList[_0x30ebc6.userid], _0x378b5c.connection.isInitiator && 0x0 === Object.keys(_0x378b5c.waitingList).length && _0x378b5c.wait && (_0x378b5c.wait = !0x1, _0x378b5c.systemPause(0x0), _0x378b5c.disableInput = !0x1, _0x378b5c.connection.send(JSON.stringify({
                            'act': 'wait-end',
                            'value': _0x378b5c.connection.userid
                        }))), _0x378b5c.openRoom(_0x17edbf), _0x378b5c.inputsData = {}, _0x378b5c.hideLoading.call(_0x17edbf);
                    };
                    var _0x2fba43 = function() {
                        try {
                            _0x378b5c.connection.onbeforeunload();
                        } catch (_0xac619d) {}
                        _0x378b5c.connected = !0x1, _0x378b5c.connection.password = null, _0x378b5c.players = [], _0x378b5c.connection.peersBackup = [], _0x378b5c.waitingList = {}, _0x378b5c.inputsData = {}, _0x378b5c.hideLoading.call(_0x17edbf), _0x132da7(_0x17edbf.elements.buttons.restart, !0x1), _0x132da7(_0x17edbf.elements.buttons.loadState, !0x1), _0x132da7(_0x17edbf.elements.buttons.saveState, !0x1), _0x378b5c.allowCheat && _0x132da7(_0x17edbf.elements.buttons.cheat, !0x1), _0x132da7(_0x2593da.contextMenu.querySelectorAll('ul li').item(0x2), !0x1), _0x132da7(_0x2593da.contextMenu.querySelectorAll('ul li').item(0x3), !0x1), Array.from(_0x17edbf.elements.buttons.play).forEach(function(_0x3d296d) {
                            _0x132da7(_0x3d296d, !0x1);
                        }), _0x2593da.updateCoreOptionMenuItems.call(_0x17edbf);
                    };
                    _0x378b5c.connection.close = _0x2fba43, _0x378b5c.connection.disconnect = _0x2fba43, _0x378b5c.connection.leave = _0x2fba43;
                    var _0x3f9c57, _0x10c0ad = function(_0x42ff74, _0x306f0b, _0x345d4d) {
                            _0x378b5c.hideLoading.call(_0x17edbf), _0x42ff74 ? (_0x378b5c.stopLoadRooms(), _0x132da7(_0x17edbf.elements.buttons.restart, true), _0x132da7(_0x17edbf.elements.buttons.loadState, true), _0x132da7(_0x17edbf.elements.buttons.saveState, true), _0x378b5c.resetCheat(), _0x132da7(_0x17edbf.elements.buttons.cheat, true), _0x132da7(_0x2593da.contextMenu.querySelectorAll('ul li').item(0x2), true), _0x132da7(_0x2593da.contextMenu.querySelectorAll('ul li').item(0x3), true), Array.from(_0x17edbf.elements.buttons.play).forEach(function(_0x2911fb) {
                                _0x132da7(_0x2911fb, true);
                            }), _0x378b5c.connection.socket && _0x378b5c.connection.socket.on('set-isInitiator-true', function(_0x31da46) {
                                _0x31da46 === _0x378b5c.connection.sessionid && (_0x378b5c.connection.socket.emit('extra-data-updated', _0x378b5c.connection.extra), _0x378b5c.connection.send(JSON.stringify({
                                    'act': 'room-master',
                                    'value': _0x378b5c.connection.userid
                                })), _0x378b5c.roomMaster = _0x378b5c.connection.userid, _0x378b5c.systemPause(0x0), _0x27f4c4.Module.resumeMainLoop(), _0x2593da.updateCoreOptionMenuItems.call(_0x17edbf), _0x132da7(_0x17edbf.elements.buttons.restart, !0x1), _0x132da7(_0x17edbf.elements.buttons.loadState, !0x1), _0x132da7(_0x17edbf.elements.buttons.saveState, !0x1), Array.from(_0x17edbf.elements.buttons.play).forEach(function(_0x132034) {
                                    _0x132da7(_0x132034, !0x1);
                                }));
                            })) : (_0x4d8495.close(), _0x5289c1.querySelector('#modal-7d8fd50ed642340b-content').innerHTML = _0x345d4d, _0x4d8495.show('modal-7d8fd50ed642340b', {
                                'closeTrigger': 'data-modal-close'
                            }));
                        },
                        _0x1e0cdb = function(_0x5b3f13) {
                            var _0x2c1832 = _0x5b3f13.target.getAttribute('data-id');
                            if ('Y' === _0x5b3f13.target.getAttribute('data-password')) _0x4d8495.show('modal-5aa765d61d8327de', {
                                'closeTrigger': 'data-modal-close'
                            }), _0x325651.setAttribute('data-id', _0x2c1832);
                            else {
                                _0x378b5c.showLoading.call(_0x17edbf), _0x378b5c.connection.userid = _0x378b5c.connection.token();
                                try {
                                    _0x378b5c.connection.join(_0x2c1832, _0x10c0ad);
                                } catch (_0x2767b9) {
                                    _0x378b5c.hideLoading.call(_0x17edbf), _0x5289c1.querySelector('#modal-7d8fd50ed642340b-content').innerHTML = 'Error', _0x4d8495.show('modal-7d8fd50ed642340b', {
                                        'closeTrigger': 'data-modal-close'
                                    });
                                }
                            }
                            return _0x5b3f13.stopPropagation(), !0x1;
                        };
                    _0x378b5c.loadRoomsList = function() {
                        _0x132da7(_0x17edbf.elements.dialogs.netplay.querySelector('.' .concat(_0x378b5c.classNames['netplay-roomlist'])), !0x1), _0x132da7(_0x17edbf.elements.dialogs.netplay.querySelector('.' .concat(_0x378b5c.classNames['netplay-room'])), true), _0x132da7(_0x17edbf.elements.dialogs.netplay.querySelector('.' .concat(_0x378b5c.classNames['btn-create-room'])), !0x1), _0x132da7(_0x17edbf.elements.dialogs.netplay.querySelector('.' .concat(_0x378b5c.classNames['btn-quit'])), true);
                        var listUrl = _0x17edbf.listUrl
                        if (! listUrl.endsWith('/')) {
                            listUrl += '/';
                        };
                        var _0x2c1832 = _0x17edbf.elements.dialogs.netplay.querySelector('.' .concat(_0x378b5c.classNames['netplay-roomlist'])).querySelector('tbody'),
                            _0x5cf2be = [listUrl, 'list?game_id=', _0x17edbf.config.gameId, '&domain=', document.domain].join('');
                        _0x550f17.a.get(_0x5cf2be, {}).then(function(_0x37c60b) {
                            if (_0x37c60b.data) {
                                var _0x4782da = [],
                                    _0x28e87d = [];
                                _0x2c1832.querySelectorAll('tr').forEach(function(_0x1e5a22) {
                                    _0x28e87d.push(_0x1e5a22.getAttribute('id'));
                                }), Object.keys(_0x37c60b.data).forEach(function(_0x47ae0e) {
                                    var _0x4a8f4c = _0x37c60b.data[_0x47ae0e];
                                    if (_0x4782da.push(_0x47ae0e), _0x28e87d.includes(_0x47ae0e)) {
                                        var _0x2d672f = _0x2c1832.querySelector('tr[id="' .concat(_0x47ae0e, '"]'));
                                        _0x2c1832.removeChild(_0x2d672f);
                                    }
                                    var _0x295f41 = document.createElement('tr');
                                    _0x295f41.setAttribute('id', _0x47ae0e);
                                    var _0xa2ea61 = _0x4a8f4c.password ? _0x378b5c.icons.lock : '',
                                        _0x5452b6 = _0x4a8f4c.password ? 'Y' : 'N',
                                        _0xb3121d = _0x4a8f4c.current < _0x4a8f4c.max ? '<span data-id="' .concat(_0x47ae0e, '" data-password="').concat(_0x5452b6, '" class="').concat(_0x378b5c.classNames['btn-join-room'], '">Join</span>') : '',
                                        _0x5c8146 = _0x4a8f4c.country ? _0x4a8f4c.country : '?';
                                    _0x295f41.innerHTML = '<td>[' .concat(_0x5c8146, '] ').concat(_0xa2ea61, ' ').concat(_0x4a8f4c.room_name, '</td><td>').concat(_0x4a8f4c.current, '/').concat(_0x4a8f4c.max, '</td><td>').concat(_0xb3121d, '</td>'), _0x1093f4.call(_0xa88a13, _0x295f41.querySelector('.' .concat(_0x378b5c.classNames['btn-join-room'])), 'click', _0x1e0cdb), _0x2c1832.appendChild(_0x295f41);
                                }), _0x2c1832.querySelectorAll('tr').forEach(function(_0x24dcf7) {
                                    _0x4782da.includes(_0x24dcf7.id) || _0x2c1832.removeChild(_0x24dcf7);
                                });
                            }
                            _0x378b5c.loadRoomsListTimer = setTimeout(_0x378b5c.loadRoomsList, 0x7d0);
                        }).catch(function(_0x227055) {
                            console.log('Network Error', _0x227055), _0x378b5c.loadRoomsListTimer = setTimeout(_0x378b5c.loadRoomsList, 0x7d0);
                        });
                    }, _0x378b5c.openRoom = function(_0x10625f) {
                        _0x378b5c.stopLoadRooms(), _0x132da7(_0x10625f.elements.dialogs.netplay.querySelector('.' .concat(_0x378b5c.classNames['netplay-roomlist'])), true), _0x132da7(_0x10625f.elements.dialogs.netplay.querySelector('.' .concat(_0x378b5c.classNames['netplay-room'])), !0x1), _0x132da7(_0x10625f.elements.dialogs.netplay.querySelector('.' .concat(_0x378b5c.classNames['btn-create-room'])), true), _0x132da7(_0x10625f.elements.dialogs.netplay.querySelector('.' .concat(_0x378b5c.classNames['btn-quit'])), !0x1), _0x378b5c.resetCheat(), _0x132da7(_0x10625f.elements.buttons.cheat, true);
                        var _0x17edbf = _0x10625f.elements.dialogs.netplay.querySelector('.' .concat(_0x378b5c.classNames['netplay-room'])),
                            _0x2c1832 = _0x17edbf.querySelector('[data-room-password]');
                        null === _0x378b5c.connection.password ? _0x132da7(_0x2c1832, true) : (_0x132da7(_0x2c1832, !0x1), _0x2c1832.querySelector('span').innerText = _0x378b5c.connection.password);
                        var _0x18c1cb = _0x17edbf.querySelector('tbody');
                        _0x18c1cb.innerHTML = '', _0x17edbf.querySelector('strong').innerText = _0x3d0d28.room_name, _0x378b5c.players.forEach(function(_0x938d55, _0xf3d39a) {
                            var _0x2c1832 = null;
                            if (_0x938d55 && (_0x378b5c.connection.peers[_0x938d55] ? _0x2c1832 = _0x378b5c.connection.peers[_0x938d55].extra : _0x378b5c.connection.userid === _0x938d55 && (_0x2c1832 = _0x378b5c.connection.extra), _0x2c1832 && _0x2c1832.name)) {
                                var _0x564064 = document.createElement('tr');
                                _0x564064.innerHTML = '<td>' .concat(_0xf3d39a + 0x1, '</td><td>').concat(_0x2c1832.name, '</td><td></td>'), _0x18c1cb.appendChild(_0x564064);
                            }
                        });
                    }, _0x1093f4.call(this, _0x325651.querySelector('.' .concat(_0x378b5c.classNames['modal__btn-primary'])), 'click', function(_0x9ac969) {
                        var _0x2c1832 = _0x325651.querySelector('.' .concat(_0x378b5c.classNames['netplay-room-password-input'])).value;
                        _0x378b5c.showLoading.call(_0x17edbf), _0x378b5c.connection.password = _0x2c1832;
                        var _0xcf7207 = _0x325651.getAttribute('data-id');
                        _0x378b5c.connection.join(_0xcf7207, function(_0x1a0deb, _0x1ef6c8, _0x1ad18e) {
                            _0x10c0ad(_0x1a0deb, 0x0, _0x1ad18e), _0x1a0deb && _0x325651.classList.remove(_0x449eac({
                                'is-open': true
                            }));
                        }), _0x9ac969.stopPropagation();
                    }), _0x1093f4.call(this, _0x2c1832.querySelector('.' .concat(_0x378b5c.classNames['modal__btn-primary'])), 'click', function(_0x43f795) {
                        var _0x17edbf = _0x2c1832.querySelector('.' .concat(_0x378b5c.classNames['netplay-player-name'])).value;
                        _0x17edbf = _0x17edbf.replace(/<|>/g, ''), _0x2c1832.querySelector('.' .concat(_0x378b5c.classNames.modal__errmsg)).innerHTML = '', _0x17edbf.trim() && (_0x378b5c.playerName = _0x17edbf.trim(), _0x378b5c.connection.extra.name = _0x17edbf.trim(), _0x4d8495.close()), _0x43f795.stopPropagation();
                    }), _0x1093f4.call(this, _0x36bde0.querySelector('.' .concat(_0x378b5c.classNames['modal__btn-primary'])), 'click', function(_0x202cf6) {
                        var _0x2c1832 = _0x36bde0.querySelector('.' .concat(_0x378b5c.classNames['netplay-room-name-input'])).value;
                        _0x2c1832 = _0x2c1832.replace(/<|>/g, '');
                        var _0x3510ed = _0x36bde0.querySelector('select[data-max-players] option:checked').value;
                        _0x3510ed < 0x2 && (_0x3510ed = 0x2), _0x3510ed > 0x4 && (_0x3510ed = 0x4);
                        for (var _0x1264b2 = 0x0; _0x1264b2 < _0x3510ed; _0x1264b2++) _0x378b5c.players[_0x1264b2] = null;
                        _0x378b5c.connection.maxParticipantsAllowed = _0x3510ed;
                        var _0x140bcf = _0x36bde0.querySelector('.' .concat(_0x378b5c.classNames['netplay-room-password-input'])).value;
                        _0x36bde0.querySelector('.' .concat(_0x378b5c.classNames.modal__errmsg)).innerHTML = '', _0x2c1832.trim() ? (_0x378b5c.connection.extra.room_name = _0x2c1832.trim(), '' !== _0x140bcf.trim() && (_0x378b5c.connection.password = _0x140bcf.trim()), _0x378b5c.showLoading.call(_0x17edbf), _0x378b5c.connection.open(_0x378b5c.connection.token(), function(_0x3c6c26, _0x203288, _0x210547) {
                            _0x378b5c.hideLoading.call(_0x17edbf), _0x3c6c26 ? (_0x378b5c.players[0x0] = _0x378b5c.connection.userid, _0x378b5c.roomMaster = _0x378b5c.connection.userid, _0x3f9c57.closeModal(), _0x378b5c.stopLoadRooms(), _0x3d0d28 = _0x378b5c.connection.extra, _0x378b5c.openRoom(_0x17edbf), _0x132da7(_0x2593da.contextMenu.querySelectorAll('ul li').item(0x2), true), _0x132da7(_0x2593da.contextMenu.querySelectorAll('ul li').item(0x3), true)) : _0x36bde0.querySelector('.' .concat(_0x378b5c.classNames.modal__errmsg)).innerHTML = _0x210547;
                        })) : _0x3f9c57.closeModal(), _0x202cf6.stopPropagation();
                    }), _0x1093f4.call(this, _0x17edbf.elements.dialogs.netplay.querySelector('.' .concat(_0x378b5c.classNames['btn-create-room'])), 'click', function(_0x48cb26) {
                        return _0x3f9c57 = _0x4d8495.show('modal-85cd7a1c543a484a', {
                            'closeTrigger': 'data-modal-close',
                            'onClose': function() {
                                _0x17edbf.elements.container.focus();
                            }
                        }), _0x48cb26.stopPropagation(), !0x1;
                    }), _0x1093f4.call(this, _0x17edbf.elements.dialogs.netplay.querySelector('.' .concat(_0x378b5c.classNames['btn-quit'])), 'click', function(_0x68459d) {
                        return _0x378b5c.connection.close(), _0x378b5c.stopLoadRooms(), _0x378b5c.loadRoomsList(), _0x378b5c.inputsData = {}, _0x68459d.stopPropagation(), !0x1;
                    });
                }
            window._0x378b5c = _0x378b5c
            },
            'initKeyboard': function() {
                var _0xa88a13 = this,
                    _0x17edbf = this,
                    _0x2c1832 = this.elements.dialogs.gamepad.querySelector('.' .concat(_0x378b5c.classNames.overlay));
                _0x1093f4.call(this, document.body, 'keydown keyup', function(_0x459b32) {
                    if (_0x459b32.which >= 0x70 && _0x459b32.which <= 0x7b);
                    else {
                        var _0x335c01 = !_0xa88a13.elements.dialogs.gamepad.hidden && !_0x2c1832.hidden,
                            _0x2eb03e = 'keydown' === _0x459b32.type;
                        if (_0x2eb03e && _0x335c01) {
                            var _0x1a3a47 = _0x2c1832.getAttribute('data-index'),
                                _0x1394cb = _0x2c1832.getAttribute('data-id'),
                                _0x2c8fd1 = null;
                            if (_0x459b32.key && _0x378b5c.keyMap[_0x459b32.keyCode] === 'escape') {
                                (_0x2c8fd1 = _0x17edbf.elements.dialogs.gamepad.querySelector('[data-id="' .concat(_0x1394cb, '"][data-index="').concat(_0x1a3a47, '"][data-type="1"]'))).setAttribute('data-value', '')
                                _0x2c8fd1.value = ''
                                (_0x2c8fd1 = _0x17edbf.elements.dialogs.gamepad.querySelector('[data-id="' .concat(_0x1394cb, '"][data-index="').concat(_0x1a3a47, '"][data-type="2"]'))).setAttribute('data-value', '')
                                _0x2c8fd1.value = ''
                                _0x132da7(_0x2c1832, true);
                                return;
                            };
                            var _0x1a3a47 = _0x2c1832.getAttribute('data-index'),
                                _0x1394cb = _0x2c1832.getAttribute('data-id'),
                                _0x2c8fd1 = null;
                            _0x459b32.key && ((_0x2c8fd1 = _0x17edbf.elements.dialogs.gamepad.querySelector('[data-id="' .concat(_0x1394cb, '"][data-index="').concat(_0x1a3a47, '"][data-type="1"]'))).setAttribute('data-value', _0x459b32.keyCode), _0x2c8fd1.value = _0x378b5c.keyMap[_0x459b32.keyCode]), _0x132da7(_0x2c1832, true);
                        } else Object.keys(_0x378b5c.controllers).forEach(function(_0x3863d2) {
                            Object.keys(_0x378b5c.controllers[_0x3863d2]).forEach(function(_0x509939) {
                                if (parseInt(_0x378b5c.controllers[_0x3863d2][_0x509939].value, 0xa) === _0x459b32.keyCode && ['24', '25', '26'].includes(_0x509939) && _0x459b32.type == 'keydown' && ! _0x459b32.repeat) {
                                    if (_0x509939 == '24') {//save
                                        _0x378b5c.quickSaveState()
                                    } else if (_0x509939 == '25') {//load
                                        _0x378b5c.quickLoadState()
                                    } else if (_0x509939 == '26') {//load
                                        _0x378b5c.changeStateSlot()
                                    }
                                    // quick save/load button
                                }
                                parseInt(_0x378b5c.controllers[_0x3863d2][_0x509939].value, 0xa) === _0x459b32.keyCode && (_0x2eb03e ? _0x509939 >= 0x10 && _0x509939 <= 0x17 ? _0x378b5c.simulateInput(_0x3863d2, _0x509939, 0x7fff) : _0x378b5c.simulateInput(_0x3863d2, _0x509939, 0x1) : _0x378b5c.simulateInput(_0x3863d2, _0x509939, 0x0));
                            });
                        });
                    }
                }), document.body.addEventListener('keydown', function(_0x14d612) {
                    var _0x2c1832 = _0x14d612.keyCode ? _0x14d612.keyCode : _0x14d612.which;
                    [0x20, 0x25, 0x26, 0x27, 0x28, 0x70, 0x71, 0x72, 0x73, 0x74, 0x75, 0x76, 0x77, 0x78, 0x79, 0x7a, 0x7b].includes(_0x2c1832) && _0x14d612.srcElement === _0x17edbf.elements.container && _0x14d612.preventDefault(), _0x14d612.srcElement.className.split(/ +/).includes(_0x378b5c.classNames.set) && _0x14d612.preventDefault();
                });
            },
            'initGamepad': function() {
                var _0xa88a13 = this,
                    _0x17edbf = this,
                    _0x2c1832 = this.elements.dialogs.gamepad.querySelector('.' .concat(_0x378b5c.classNames.overlay)),
                    _0x181250 = new _0x4ad1c6[('Gamepad')]();
                _0x378b5c.gamepad = _0x181250, _0x181250.init() && (_0x181250.bind(_0x4ad1c6.Gamepad.Event.TICK, function(_0x2fe35d) {
                    _0x2fe35d.forEach(function(_0x2b21f8) {
                        var _0x17edbf;
                        _0x2b21f8 && _0x2b21f8.axes && _0x2b21f8.axes[0x9] && ((_0x17edbf = _0x2b21f8.axes[0x9]) < 3.28571 ? 0x1 == _0x17edbf ? (_0x2b21f8.extra_buttons[0xc].pressed || (_0x2b21f8.extra_buttons[0xc] = {
                            'pressed': true,
                            'value': 0x1
                        }, _0x181250._fire(_0x4ad1c6.Gamepad.Event.BUTTON_DOWN, {
                            'index': 0xc,
                            'gamepad': _0x2b21f8,
                            'gamepadIndex': _0x2b21f8.index
                        })), _0x2b21f8.extra_buttons[0xe].pressed || (_0x2b21f8.extra_buttons[0xe] = {
                            'pressed': true,
                            'value': 0x1
                        }, _0x181250._fire(_0x4ad1c6.Gamepad.Event.BUTTON_DOWN, {
                            'index': 0xe,
                            'gamepad': _0x2b21f8,
                            'gamepadIndex': _0x2b21f8.index
                        }))) : _0x17edbf <= -0.7142857 && _0x17edbf >= -0.714291 ? (_0x2b21f8.extra_buttons[0xc].pressed || (_0x2b21f8.extra_buttons[0xc] = {
                            'pressed': true,
                            'value': 0x1
                        }, _0x181250._fire(_0x4ad1c6.Gamepad.Event.BUTTON_DOWN, {
                            'index': 0xc,
                            'gamepad': _0x2b21f8,
                            'gamepadIndex': _0x2b21f8.index
                        })), _0x2b21f8.extra_buttons[0xf].pressed || (_0x2b21f8.extra_buttons[0xf] = {
                            'pressed': true,
                            'value': 0x1
                        }, _0x181250._fire(_0x4ad1c6.Gamepad.Event.BUTTON_DOWN, {
                            'index': 0xf,
                            'gamepad': _0x2b21f8,
                            'gamepadIndex': _0x2b21f8.index
                        }))) : _0x17edbf >= 0.42856 && _0x17edbf <= 0.42858 ? (_0x2b21f8.extra_buttons[0xd].pressed || (_0x2b21f8.extra_buttons[0xd] = {
                            'pressed': true,
                            'value': 0x1
                        }, _0x181250._fire(_0x4ad1c6.Gamepad.Event.BUTTON_DOWN, {
                            'index': 0xd,
                            'gamepad': _0x2b21f8,
                            'gamepadIndex': _0x2b21f8.index
                        })), _0x2b21f8.extra_buttons[0xe].pressed || (_0x2b21f8.extra_buttons[0xe] = {
                            'pressed': true,
                            'value': 0x1
                        }, _0x181250._fire(_0x4ad1c6.Gamepad.Event.BUTTON_DOWN, {
                            'index': 0xe,
                            'gamepad': _0x2b21f8,
                            'gamepadIndex': _0x2b21f8.index
                        }))) : _0x17edbf >= -0.14287 && _0x17edbf <= -0.14285 ? (_0x2b21f8.extra_buttons[0xd].pressed || (_0x2b21f8.extra_buttons[0xd] = {
                            'pressed': true,
                            'value': 0x1
                        }, _0x181250._fire(_0x4ad1c6.Gamepad.Event.BUTTON_DOWN, {
                            'index': 0xd,
                            'gamepad': _0x2b21f8,
                            'gamepadIndex': _0x2b21f8.index
                        })), _0x2b21f8.extra_buttons[0xf].pressed || (_0x2b21f8.extra_buttons[0xf] = {
                            'pressed': true,
                            'value': 0x1
                        }, _0x181250._fire(_0x4ad1c6.Gamepad.Event.BUTTON_DOWN, {
                            'index': 0xf,
                            'gamepad': _0x2b21f8,
                            'gamepadIndex': _0x2b21f8.index
                        }))) : _0x17edbf <= -0x1 && _0x17edbf >= -1.01 ? _0x2b21f8.extra_buttons[0xc].pressed || (_0x2b21f8.extra_buttons[0xc] = {
                            'pressed': true,
                            'value': 0x1
                        }, _0x181250._fire(_0x4ad1c6.Gamepad.Event.BUTTON_DOWN, {
                            'index': 0xc,
                            'gamepad': _0x2b21f8,
                            'gamepadIndex': _0x2b21f8.index
                        })) : _0x17edbf >= 0.142857 && _0x17edbf <= 0.142858 ? _0x2b21f8.extra_buttons[0xd].pressed || (_0x2b21f8.extra_buttons[0xd] = {
                            'pressed': true,
                            'value': 0x1
                        }, _0x181250._fire(_0x4ad1c6.Gamepad.Event.BUTTON_DOWN, {
                            'index': 0xd,
                            'gamepad': _0x2b21f8,
                            'gamepadIndex': _0x2b21f8.index
                        })) : _0x17edbf >= 0.7142857 && _0x17edbf <= 0.7142858 ? _0x2b21f8.extra_buttons[0xe].pressed || (_0x2b21f8.extra_buttons[0xe] = {
                            'pressed': true,
                            'value': 0x1
                        }, _0x181250._fire(_0x4ad1c6.Gamepad.Event.BUTTON_DOWN, {
                            'index': 0xe,
                            'gamepad': _0x2b21f8,
                            'gamepadIndex': _0x2b21f8.index
                        })) : _0x17edbf <= -0.42857 && _0x17edbf >= -0.42858 && (_0x2b21f8.extra_buttons[0xf].pressed || (_0x2b21f8.extra_buttons[0xf] = {
                            'pressed': true,
                            'value': 0x1
                        }, _0x181250._fire(_0x4ad1c6.Gamepad.Event.BUTTON_DOWN, {
                            'index': 0xf,
                            'gamepad': _0x2b21f8,
                            'gamepadIndex': _0x2b21f8.index
                        }))) : (_0x2b21f8.extra_buttons[0xc].pressed && (_0x2b21f8.extra_buttons[0xc] = {
                            'pressed': !0x1,
                            'value': 0x0
                        }, _0x181250._fire(_0x4ad1c6.Gamepad.Event.BUTTON_UP, {
                            'index': 0xc,
                            'gamepad': _0x2b21f8,
                            'gamepadIndex': _0x2b21f8.index
                        })), _0x2b21f8.extra_buttons[0xd].pressed && (_0x2b21f8.extra_buttons[0xd] = {
                            'pressed': !0x1,
                            'value': 0x0
                        }, _0x181250._fire(_0x4ad1c6.Gamepad.Event.BUTTON_UP, {
                            'index': 0xd,
                            'gamepad': _0x2b21f8,
                            'gamepadIndex': _0x2b21f8.index
                        })), _0x2b21f8.extra_buttons[0xe].pressed && (_0x2b21f8.extra_buttons[0xe] = {
                            'pressed': !0x1,
                            'value': 0x0
                        }, _0x181250._fire(_0x4ad1c6.Gamepad.Event.BUTTON_UP, {
                            'index': 0xe,
                            'gamepad': _0x2b21f8,
                            'gamepadIndex': _0x2b21f8.index
                        })), _0x2b21f8.extra_buttons[0xf].pressed && (_0x2b21f8.extra_buttons[0xf] = {
                            'pressed': !0x1,
                            'value': 0x0
                        }, _0x181250._fire(_0x4ad1c6.Gamepad.Event.BUTTON_UP, {
                            'index': 0xf,
                            'gamepad': _0x2b21f8,
                            'gamepadIndex': _0x2b21f8.index
                        }))));
                    });
                }), _0x181250.bind(_0x4ad1c6.Gamepad.Event.BUTTON_DOWN, function(_0x15761a) {
                    if (!_0xa88a13.elements.dialogs.gamepad.hidden && !_0x2c1832.hidden) {
                        var _0x387018, _0xdd4205 = parseInt(_0x2c1832.getAttribute('data-index'), 0xa),
                            _0x1f4ee2 = _0x2c1832.getAttribute('data-id');
                        if (_0x15761a.gamepad.index === parseInt(_0xdd4205, 0xa)) {
                            for (var _0x211087 = 0x0; _0x211087 < 0x20 && ((_0x387018 = _0x15761a.gamepad.buttons[_0x211087]) || (_0x387018 = _0x15761a.gamepad.extra_buttons[_0x211087]), !_0x387018 || !('number' == typeof _0x387018 && 0x1 === _0x387018 || 'number' == typeof _0x387018.value && 0x1 === _0x387018.value)); _0x211087 += 0x1);
                            var _0x126d2d = null;
                            (_0x126d2d = _0x17edbf.elements.dialogs.gamepad.querySelector('[data-id="' .concat(_0x1f4ee2, '"][data-index="').concat(_0xdd4205, '"][data-type="2"]'))).setAttribute('data-value', _0x15761a.index), _0x126d2d.value = 'button ' .concat(_0x15761a.index + 0x1), _0x132da7(_0x2c1832, true);
                        }
                    } else Object.keys(_0x378b5c.controllers[_0x15761a.gamepad.index.toString()]).forEach(function(_0x3cf4d3) {
                        var _0x5cf388 = _0x15761a.gamepad.index.toString();
                        if (parseInt(_0x378b5c.controllers[_0x5cf388][_0x3cf4d3].value2, 0xa) === parseInt(_0x15761a.index, 0xa) && ['24', '25', '26'].includes(_0x3cf4d3)) {
                            if (_0x3cf4d3 == '24') {//save
                                _0x378b5c.quickSaveState()
                            } else if (_0x3cf4d3 == '25') {//load
                                _0x378b5c.quickLoadState()
                            } else if (_0x3cf4d3 == '26') {//load
                                _0x378b5c.changeStateSlot()
                            }
                        }
                        parseInt(_0x378b5c.controllers[_0x5cf388][_0x3cf4d3].value2, 0xa) === parseInt(_0x15761a.index, 0xa) && parseInt(_0x5cf388, 0xa) === parseInt(_0x15761a.gamepad.index, 0xa) && _0x378b5c.simulateInput(_0x5cf388, _0x3cf4d3, 0x1);
                    });
                }), _0x181250.bind(_0x4ad1c6.Gamepad.Event.BUTTON_UP, function(_0x3220b3) {
                    Object.keys(_0x378b5c.controllers).forEach(function(_0x302c3e) {
                        Object.keys(_0x378b5c.controllers[_0x302c3e]).forEach(function(_0x14eb8a) {
                            parseInt(_0x378b5c.controllers[_0x302c3e][_0x14eb8a].value2, 0xa) === parseInt(_0x3220b3.index, 0xa) && parseInt(_0x302c3e, 0xa) === parseInt(_0x3220b3.gamepad.index, 0xa) && _0x378b5c.simulateInput(_0x302c3e, _0x14eb8a, 0x0);
                        });
                    });
                }), _0x181250.bind(_0x4ad1c6.Gamepad.Event.AXIS_CHANGED, function(_0x31f017) {
                    var value = function(value) {
                        if (value > 0.5 || value < 0.5) {
                            return (value > 0) ? 1 : -1;
                        } else {
                            return 0;
                        }
                    }(parseFloat(_0x31f017.value));
                    if (!_0xa88a13.elements.dialogs.gamepad.hidden && !_0x2c1832.hidden) {
                        if (value !== 0) {
                            var _0x1f4ee2 = _0x2c1832.getAttribute('data-id'),
                                _0xdd4205 = parseInt(_0x2c1832.getAttribute('data-index'), 0xa);
                            var _0x126d2d = _0xa88a13.elements.dialogs.gamepad.querySelector('[data-id="' .concat(_0x1f4ee2, '"][data-index="').concat(_0xdd4205, '"][data-type="2"]'))
                            _0x126d2d.setAttribute('data-value', _0x31f017.axis + ':' + value)
                            _0x126d2d.value = _0x31f017.axis + ':' + value
                            _0x132da7(_0x2c1832, true)
                        }
                    } else {
                        if (! _0x378b5c.prevButtons) {
                            _0x378b5c.prevButtons = {}
                        }
                        var quit = false
                        var _0x5cf388 = _0x31f017.gamepad.index.toString();
                        if (! _0x378b5c.prevButtons[_0x5cf388]) {
                            _0x378b5c.prevButtons[_0x5cf388] = {}
                        }
                        if (! _0x378b5c.prevButtons[_0x5cf388][_0x31f017.axis]) {
                            _0x378b5c.prevButtons[_0x5cf388][_0x31f017.axis] = 0
                        }
                        if (! _0x378b5c.prevButtons[_0x5cf388].buttonID) {
                            _0x378b5c.prevButtons[_0x5cf388].buttonID = 0
                        }
                        for (var w=0; w<Object.keys(_0x378b5c.controllers[_0x5cf388]).length; w++) {
                            var _0x3cf4d3 = Object.keys(_0x378b5c.controllers[_0x5cf388])[w]
                            if (! _0x378b5c.controllers[_0x5cf388][_0x3cf4d3].value2) {
                                continue
                            }
                            if (_0x378b5c.controllers[_0x5cf388][_0x3cf4d3].value2.split(':')[0] === _0x31f017.axis && parseInt(_0x378b5c.controllers[_0x5cf388][_0x3cf4d3].value2.split(':')[1]) === value && ['24', '25', '26'].includes(_0x3cf4d3)) {
                                if (_0x3cf4d3 == '24') {//save
                                    quit = true
                                    _0x378b5c.quickSaveState()
                                } else if (_0x3cf4d3 == '25') {//load
                                    quit = true
                                    _0x378b5c.quickLoadState()
                                } else if (_0x3cf4d3 == '26') {//load
                                    _0x378b5c.changeStateSlot()
                                }
                            }
                            if (value === 0) {
                                // button up
                                if (_0x378b5c.controllers[_0x5cf388][_0x3cf4d3].value2.split(':')[0] === _0x31f017.axis) {
                                    _0x378b5c.prevButtons[_0x5cf388][_0x31f017.axis] = value
                                    _0x378b5c.prevButtons[_0x5cf388].buttonID = _0x3cf4d3
                                    _0x378b5c.simulateInput(_0x5cf388, _0x3cf4d3, 0x0)
                                }
                            } else {
                                //button down
                                if ((1 === _0x378b5c.prevButtons[_0x5cf388][_0x31f017.axis] && value === -1) ||
                                    (-1 === _0x378b5c.prevButtons[_0x5cf388][_0x31f017.axis] && value === 1)) {
                                    _0x378b5c.simulateInput(_0x5cf388, _0x378b5c.prevButtons[_0x5cf388].buttonID, 0x0)
                                }
                                if (_0x378b5c.controllers[_0x5cf388][_0x3cf4d3].value2.split(':')[0] === _0x31f017.axis && parseInt(_0x378b5c.controllers[_0x5cf388][_0x3cf4d3].value2.split(':')[1]) === value) {
                                    _0x378b5c.prevButtons[_0x5cf388][_0x31f017.axis] = value
                                    _0x378b5c.prevButtons[_0x5cf388].buttonID = _0x3cf4d3
                                    quit = true
                                    _0x378b5c.simulateInput(_0x5cf388, _0x3cf4d3, 0x1)
                                }
                            }
                        };
                        if (quit) {
                            return
                        }
                        if (! _0xa88a13.elements.dialogs.gamepad.hidden && !_0x2c1832.hidden) {
                            return
                        }
                    }
                    
                    Math.abs(_0x31f017.value) <= 0.1 && (_0x31f017.value = 0x0);
                    var _0x17edbf = _0x31f017.gamepad.index;
                    'LEFT_STICK_X' === _0x31f017.axis && (_0x31f017.value > 0x0 ? (_0x378b5c.simulateInput(_0x17edbf, 0x10, 0x7fff * _0x31f017.value), _0x378b5c.simulateInput(_0x17edbf, 0x11, 0x0)) : (_0x378b5c.simulateInput(_0x17edbf, 0x11, 0x7fff * _0x31f017.value), _0x378b5c.simulateInput(_0x17edbf, 0x10, 0x0))), 'LEFT_STICK_Y' === _0x31f017.axis && (_0x31f017.value > 0x0 ? (_0x378b5c.simulateInput(_0x17edbf, 0x12, 0x7fff * _0x31f017.value), _0x378b5c.simulateInput(_0x17edbf, 0x13, 0x0)) : (_0x378b5c.simulateInput(_0x17edbf, 0x13, 0x7fff * _0x31f017.value), _0x378b5c.simulateInput(_0x17edbf, 0x12, 0x0))), 'RIGHT_STICK_X' === _0x31f017.axis && (_0x31f017.value > 0x0 ? (_0x378b5c.simulateInput(_0x17edbf, 0x14, 0x7fff * _0x31f017.value), _0x378b5c.simulateInput(_0x17edbf, 0x15, 0x0)) : (_0x378b5c.simulateInput(_0x17edbf, 0x15, 0x7fff * _0x31f017.value), _0x378b5c.simulateInput(_0x17edbf, 0x14, 0x0))), 'RIGHT_STICK_Y' === _0x31f017.axis && (_0x31f017.value > 0x0 ? (_0x378b5c.simulateInput(_0x17edbf, 0x16, 0x7fff * _0x31f017.value), _0x378b5c.simulateInput(_0x17edbf, 0x17, 0x0)) : (_0x378b5c.simulateInput(_0x17edbf, 0x17, 0x7fff * _0x31f017.value), _0x378b5c.simulateInput(_0x17edbf, 0x16, 0x0)));
                }), _0x181250.bind(_0x4ad1c6.Gamepad.Event.DISCONNECTED, function(_0x1c996a) {
                    [0x0, 0x1, 0x2, 0x3].forEach(function(_0x429f30) {
                        var _0x2c1832 = _0x181250.gamepads[_0x429f30];
                        _0x17edbf.elements.dialogs.gamepad.querySelector('#controls-' .concat(_0x429f30, ' .gamepad-name')).innerHTML = _0x2c1832 ? _0x2c1832.id : 'n/a';
                    });
                }), _0x181250.bind(_0x4ad1c6.Gamepad.Event.CONNECTED, function(_0x748f24) {
                    Object.keys(_0x181250.gamepads).forEach(function(_0x327c74) {
                        var _0x2c1832 = _0x181250.gamepads[_0x327c74];
                        _0x17edbf.elements.dialogs.gamepad.querySelector('#controls-' .concat(_0x327c74, ' .gamepad-name')).innerHTML = _0x2c1832 ? _0x2c1832.id : 'n/a';
                    });
                }));
            },
            'setShader': function(_0x4cbec3) {
                if ('disabled' === _0x4cbec3) _0x27f4c4.FS.unlink('/shader/shader.glslp', ''), _0x378b5c.toggleShader && _0x378b5c.toggleShader(0x0);
                else {
                    _0x378b5c.toggleShader && _0x378b5c.toggleShader(0x0);
                    var _0x17edbf = '/shader/' .concat(_0x4cbec3);
                    _0x27f4c4.FS.writeFile('/shader/shader.glslp', function(_0x52407e) {
                        if (!(_0x52407e instanceof Int32Array)) throw new Error('uintArrayToString: Only accepts Int32Array parameter');
                        for (var _0x17edbf = '', _0x2c1832 = 0x0, _0x4d451e = _0x52407e.length; _0x2c1832 < _0x4d451e; _0x2c1832 += 0x1) {
                            var _0x37c7b6 = _0x52407e[_0x2c1832];
                            if (_0x37c7b6 > 0xffff) throw new Error('Invalid value attempted to be serialised');
                            _0x17edbf += String.fromCharCode(_0x37c7b6);
                        }
                        return _0x17edbf;
                    }(new Int32Array(_0x27f4c4.FS.readFile(_0x17edbf)))), _0x378b5c.toggleShader && _0x378b5c.toggleShader(0x1);
                }
            },
            'toggleVirtualGamepad': function(_0x1ed80b) {
                var _0xa88a13 = this;
                if (null === _0x378b5c.virtualGamepadContainer) {
                    _0x378b5c.virtualGamepadContainer = _0x428003('div', {
                        'class': _0x449eac({
                            'ejs-virtual-gamepad': true
                        }),
                        'hidden': ''
                    });
                    this.elements.container.appendChild(_0x378b5c.virtualGamepadContainer);
                    var blockCSS = 'height:31px;text-align:center;border:1px solid #ccc;border-radius:5px;line-height:31px;';
                    var html = '';
                    if (['snes', 'nds'].includes(_0xa88a13.system)) {
                        var elements = {
                            order: ['X','Y','A','B'],
                            orderCSS: ['left:40px;', 'top:40px;', 'left:81px;top:40px;', 'left:40px;top:80px;'],
                            LandR: true
                        }
                    } else if (['gba', 'gb', 'vb', 'nes'].includes(_0xa88a13.system)) {
                        var elements = {
                            order: ['B','A'],
                            orderCSS: ['left:-10px;top:70px;', 'left:60px;top:70px;'],
                            LandR: (_0xa88a13.system === 'gba')
                        }
                    } else if (['n64'].includes(_0xa88a13.system)) {
                        var elements = {
                            order: ['B','A'],
                            orderCSS: ['left:-10px;top:95px;', 'left:40px;top:150px;'],
                            LandR: true
                        }
                    } else {
                        var elements = {
                            order: ['Y','X','B','A'],
                            orderCSS: ['left:40px;', 'top:40px;', 'left:81px;top:40px;', 'left:40px;top:80px;'],
                            LandR: true
                        }
                    }
                    html += '<div class="'+_0x449eac({'virtual-gamepad': true})+'" style="display: block;">';
                    
                    html += '<div class="'+_0x449eac({'top': true})+'">';
                    if (elements.LandR === true) {
                        if (_0xa88a13.system === 'n64') {
                            html += '<div class="'+_0x449eac({'buttons': true,'b_l': true})+'" style="left:10px;top:-40px;'+blockCSS+'">L</div>';
                            html += '<div class="'+_0x449eac({'buttons': true,'b_z': true})+'" style="left:10px;'+blockCSS+'">Z</div>';
                            html += '<div class="'+_0x449eac({'buttons': true,'b_r': true})+'" style="right:10px;top:-40px;'+blockCSS+'">R</div>';
                        } else {
                            html += '<div class="'+_0x449eac({'buttons': true,'b_l': true})+'" style="left:10px;'+blockCSS+'">L</div>';
                            html += '<div class="'+_0x449eac({'buttons': true,'b_r': true})+'" style="right:10px;'+blockCSS+'">R</div>';
                        }
                    }
                    html += '</div>';
                    
                    html += '<div class="'+_0x449eac({'left': true})+'"></div>';
                    
                    html += '<div class="'+_0x449eac({'center': true})+'">';
                    if (_0xa88a13.system === 'n64') {
                        html += '<div class="'+_0x449eac({'buttons': true,'b_c': true})+'" style="left:65px;">'+_0xa88a13.localization('Menu')+'</div>';
                        html += '<div class="'+_0x449eac({'buttons': true,'b_start': true})+'" style="left:0px;">'+_0xa88a13.localization('Start')+'</div>';
                    } else {
                        html += '<div class="'+_0x449eac({'buttons': true,'b_start': true})+'" style="left:30px;">'+_0xa88a13.localization('Start')+'</div>';
                        html += '<div class="'+_0x449eac({'buttons': true,'b_c': true})+'" style="left:95px;">'+_0xa88a13.localization('Menu')+'</div>';
                        html += '<div class="'+_0x449eac({'buttons': true,'b_select': true})+'" style="left:-35px;">'+_0xa88a13.localization('Select')+'</div>';
                    }
                    html += '</div>';
                    
                    html += '<div class="'+_0x449eac({'right': true})+'">';
                    
                    if (_0xa88a13.system === 'n64') {
                        html += '<div class="'+_0x449eac({'buttons': true, 'b_cu': true})+'" style="left:25px;top:-65px;"></div>';
                        html += '<div class="'+_0x449eac({'buttons': true, 'b_cd': true})+'" style="left:25px;top:15px;"></div>';
                        html += '<div class="'+_0x449eac({'buttons': true, 'b_cl': true})+'" style="left:-15px;top:-25px;"></div>';
                        html += '<div class="'+_0x449eac({'buttons': true, 'b_cr': true})+'" style="left:65px;top:-25px;"></div>';
                    }
                    
                    for (var i=0; i<elements.order.length; i++) {
                        var opts = {'buttons': true};
                        opts['b_'+elements.order[i].toLowerCase()] = true;
                        html += '<div class="'+_0x449eac(opts)+'" style="'+elements.orderCSS[i]+'">'+elements.order[i]+'</div>';
                    }
                    
                    html += '</div></div>';
                    
                    _0x378b5c.virtualGamepadContainer.innerHTML = html;
                    _0x132da7(_0x378b5c.virtualGamepadContainer, !_0x1ed80b);
                    var _0x17edbf = _0x3a58c8.a.create({
                        'zone': _0x530042.call(this, '.' .concat(_0x449eac({
                            'ejs-virtual-gamepad': true
                        }), ' .').concat(_0x449eac({
                            'left': true
                        }))),
                        'mode': 'static',
                        'position': {
                            'left': '50%',
                            'top': '50%'
                        },
                        'color': 'red'
                    });
                    function inputs() {
                        if (_0xa88a13.system === 'n64') {
                            var inputLocation;
                            if (_0x2593da && typeof _0x2593da.getCoreOptionsValues == 'function') {
                                inputLocation = _0x2593da.getCoreOptionsValues()['joystick-input'];
                            }
                            if (inputLocation === 'd-pad') {
                                return {
                                    downVal: 1,
                                    4: 4,
                                    5: 5,
                                    6: 6,
                                    7: 7
                                }
                            } else {
                                return {
                                    downVal: 0x7fff,
                                    4: 19,
                                    5: 18,
                                    6: 17,
                                    7: 16
                                }
                            }
                        } else {
                            return {
                                downVal: 1,
                                4: 4,
                                5: 5,
                                6: 6,
                                7: 7
                            }
                        }
                    }
                    _0x17edbf.on('end', function(_0x27f006, _0x1fb527) {
                        _0x378b5c.syncInput(0, inputs()[4], 0);
                        _0x378b5c.syncInput(0, inputs()[5], 0);
                        _0x378b5c.syncInput(0, inputs()[6], 0);
                        _0x378b5c.syncInput(0, inputs()[7], 0);
                    });
                    _0x17edbf.on('move', function(_0x1b060e, _0x4ae7d6) {
                        var _0x2c1832 = _0x4ae7d6.angle.degree;
                        _0x2c1832 >= 0x1e && _0x2c1832 < 0x96 ? _0x378b5c.syncInput(0, inputs()[4], inputs().downVal) : window.setTimeout(function() {
                            _0x378b5c.syncInput(0, inputs()[4], 0);
                        }, 0x1e);
                        _0x2c1832 >= 0xd2 && _0x2c1832 < 0x14a ? _0x378b5c.syncInput(0, inputs()[5], inputs().downVal) : window.setTimeout(function() {
                            _0x378b5c.syncInput(0, inputs()[5], 0);
                        }, 0x1e);
                        _0x2c1832 >= 0x78 && _0x2c1832 < 0xf0 ? _0x378b5c.syncInput(0, inputs()[6], inputs().downVal) : window.setTimeout(function() {
                            _0x378b5c.syncInput(0, inputs()[6], 0);
                        }, 0x1e);
                        _0x2c1832 >= 0x12c || _0x2c1832 >= 0x0 && _0x2c1832 < 0x3c ? _0x378b5c.syncInput(0, inputs()[7], inputs().downVal) : window.setTimeout(function() {
                            _0x378b5c.syncInput(0, inputs()[7], 0);
                        }, 0x1e);
                    });
                    var _0x2c1832 = _0x449eac({
                            'virtual-gamepad': true
                        }),
                        _0x2ec721 = _0x449eac({
                            'touch': true
                        });
                    if (! _0x59aa33.isIos) {
                        _0x1093f4.call(this, _0x530042.call(this, '.' .concat(_0x2c1832)), 'touchmove', function(_0x2ae626) {
                            _0x2ae626.stopPropagation();
                        });
                    }
                    _0x1093f4.call(this, _0x530042.call(this, '.' .concat(_0x2c1832, ' .').concat(_0x449eac({
                        'b_a': true
                    }))), 'touchstart touchend mousedown mouseup mouseout', function(_0x185083) {
                        ['touchend', 'mouseup', 'mouseout'].includes(_0x185083.type) ? (_0x3a8e2f(_0x185083.target, _0x2ec721, !0x1), window.setTimeout(function() {
                            _0x378b5c.syncInput(0x0, 0x8, 0x0);
                        }, 0x1e)) : (_0x3a8e2f(_0x185083.target, _0x2ec721, true), _0x378b5c.syncInput(0x0, 0x8, 0x1)), _0x185083.stopPropagation();
                    });
                    _0x1093f4.call(this, _0x530042.call(this, '.' .concat(_0x2c1832, ' .').concat(_0x449eac({
                        'b_b': true
                    }))), 'touchstart touchend mousedown mouseup mouseout', function(_0x213c3d) {
                        ['touchend', 'mouseup', 'mouseout'].includes(_0x213c3d.type) ? (_0x3a8e2f(_0x213c3d.target, _0x2ec721, !0x1), window.setTimeout(function() {
                            _0x378b5c.syncInput(0x0, 0x0, 0x0);
                        }, 0x1e)) : (_0x3a8e2f(_0x213c3d.target, _0x2ec721, true), _0x378b5c.syncInput(0x0, 0x0, 0x1)), _0x213c3d.stopPropagation();
                    });
                    _0x1093f4.call(this, _0x530042.call(this, '.' .concat(_0x2c1832, ' .').concat(_0x449eac({
                        'b_x': true
                    }))), 'touchstart touchend mousedown mouseup mouseout', function(_0x5ce708) {
                        ['touchend', 'mouseup', 'mouseout'].includes(_0x5ce708.type) ? (_0x3a8e2f(_0x5ce708.target, _0x2ec721, !0x1), window.setTimeout(function() {
                            _0x378b5c.syncInput(0x0, 0x9, 0x0);
                        }, 0x1e)) : (_0x3a8e2f(_0x5ce708.target, _0x2ec721, true), _0x378b5c.syncInput(0x0, 0x9, 0x1)), _0x5ce708.stopPropagation();
                    });
                    _0x1093f4.call(this, _0x530042.call(this, '.' .concat(_0x2c1832, ' .').concat(_0x449eac({
                        'b_y': true
                    }))), 'touchstart touchend mousedown mouseup mouseout', function(_0x1cfae6) {
                        ['touchend', 'mouseup', 'mouseout'].includes(_0x1cfae6.type) ? (_0x3a8e2f(_0x1cfae6.target, _0x2ec721, !0x1), window.setTimeout(function() {
                            _0x378b5c.syncInput(0x0, 0x1, 0x0);
                        }, 0x1e)) : (_0x3a8e2f(_0x1cfae6.target, _0x2ec721, true), _0x378b5c.syncInput(0x0, 0x1, 0x1)), _0x1cfae6.stopPropagation();
                    });
                    _0x1093f4.call(this, _0x530042.call(this, '.' .concat(_0x2c1832, ' .').concat(_0x449eac({
                        'b_l': true
                    }))), 'touchstart touchend mousedown mouseup mouseout', function(_0x1a50ab) {
                        ['touchend', 'mouseup', 'mouseout'].includes(_0x1a50ab.type) ? (_0x3a8e2f(_0x1a50ab.target, _0x2ec721, !0x1), window.setTimeout(function() {
                            _0x378b5c.syncInput(0x0, 0xa, 0x0);
                        }, 0x1e)) : (_0x3a8e2f(_0x1a50ab.target, _0x2ec721, true), _0x378b5c.syncInput(0x0, 0xa, 0x1)), _0x1a50ab.stopPropagation();
                    });
                    _0x1093f4.call(this, _0x530042.call(this, '.' .concat(_0x2c1832, ' .').concat(_0x449eac({
                        'b_z': true
                    }))), 'touchstart touchend mousedown mouseup mouseout', function(_0x1a50ab) {
                        ['touchend', 'mouseup', 'mouseout'].includes(_0x1a50ab.type) ? (_0x3a8e2f(_0x1a50ab.target, _0x2ec721, !0x1), window.setTimeout(function() {
                            _0x378b5c.syncInput(0x0, 12, 0x0);
                        }, 0x1e)) : (_0x3a8e2f(_0x1a50ab.target, _0x2ec721, true), _0x378b5c.syncInput(0x0, 12, 0x1)), _0x1a50ab.stopPropagation();
                    });
                    _0x1093f4.call(this, _0x530042.call(this, '.' .concat(_0x2c1832, ' .').concat(_0x449eac({
                        'b_r': true
                    }))), 'touchstart touchend mousedown mouseup mouseout', function(_0x3b8139) {
                        ['touchend', 'mouseup', 'mouseout'].includes(_0x3b8139.type) ? (_0x3a8e2f(_0x3b8139.target, _0x2ec721, !0x1), window.setTimeout(function() {
                            _0x378b5c.syncInput(0x0, 0xb, 0x0);
                        }, 0x1e)) : (_0x3a8e2f(_0x3b8139.target, _0x2ec721, true), _0x378b5c.syncInput(0x0, 0xb, 0x1)), _0x3b8139.stopPropagation();
                    });
                    _0x1093f4.call(this, _0x530042.call(this, '.' .concat(_0x2c1832, ' .').concat(_0x449eac({
                        'b_start': true
                    }))), 'touchstart touchend mousedown mouseup mouseout', function(_0x47af91) {
                        ['touchend', 'mouseup', 'mouseout'].includes(_0x47af91.type) ? (_0x3a8e2f(_0x47af91.target, _0x2ec721, !0x1), window.setTimeout(function() {
                            _0x378b5c.syncInput(0x0, 0x3, 0x0);
                        }, 0x1e)) : (_0x3a8e2f(_0x47af91.target, _0x2ec721, true), _0x378b5c.syncInput(0x0, 0x3, 0x1)), _0x47af91.stopPropagation();
                    });
                    
                    _0x1093f4.call(this, _0x530042.call(this, '.' .concat(_0x2c1832, ' .').concat(_0x449eac({
                        'b_cu': true
                    }))), 'touchstart touchend mousedown mouseup mouseout', function(_0x47af91) {
                        ['touchend', 'mouseup', 'mouseout'].includes(_0x47af91.type) ? (_0x3a8e2f(_0x47af91.target, _0x2ec721, !0x1), window.setTimeout(function() {
                            _0x378b5c.syncInput(0, 23, 0);
                        }, 0x1e)) : (_0x3a8e2f(_0x47af91.target, _0x2ec721, true), _0x378b5c.syncInput(0, 23, 0x7fff)), _0x47af91.stopPropagation();
                    });
                    _0x1093f4.call(this, _0x530042.call(this, '.' .concat(_0x2c1832, ' .').concat(_0x449eac({
                        'b_cd': true
                    }))), 'touchstart touchend mousedown mouseup mouseout', function(_0x47af91) {
                        ['touchend', 'mouseup', 'mouseout'].includes(_0x47af91.type) ? (_0x3a8e2f(_0x47af91.target, _0x2ec721, !0x1), window.setTimeout(function() {
                            _0x378b5c.syncInput(0, 22, 0);
                        }, 0x1e)) : (_0x3a8e2f(_0x47af91.target, _0x2ec721, true), _0x378b5c.syncInput(0, 22, 0x7fff)), _0x47af91.stopPropagation();
                    });
                    _0x1093f4.call(this, _0x530042.call(this, '.' .concat(_0x2c1832, ' .').concat(_0x449eac({
                        'b_cl': true
                    }))), 'touchstart touchend mousedown mouseup mouseout', function(_0x47af91) {
                        ['touchend', 'mouseup', 'mouseout'].includes(_0x47af91.type) ? (_0x3a8e2f(_0x47af91.target, _0x2ec721, !0x1), window.setTimeout(function() {
                            _0x378b5c.syncInput(0, 21, 0);
                        }, 0x1e)) : (_0x3a8e2f(_0x47af91.target, _0x2ec721, true), _0x378b5c.syncInput(0, 21, 0x7fff)), _0x47af91.stopPropagation();
                    });
                    _0x1093f4.call(this, _0x530042.call(this, '.' .concat(_0x2c1832, ' .').concat(_0x449eac({
                        'b_cr': true
                    }))), 'touchstart touchend mousedown mouseup mouseout', function(_0x47af91) {
                        ['touchend', 'mouseup', 'mouseout'].includes(_0x47af91.type) ? (_0x3a8e2f(_0x47af91.target, _0x2ec721, !0x1), window.setTimeout(function() {
                            _0x378b5c.syncInput(0, 20, 0);
                        }, 0x1e)) : (_0x3a8e2f(_0x47af91.target, _0x2ec721, true), _0x378b5c.syncInput(0, 20, 0x7fff)), _0x47af91.stopPropagation();
                    });
                    
                    var hideTimeout;
                    _0x1093f4.call(this, _0x530042.call(this, '.' .concat(_0x2c1832, ' .').concat(_0x449eac({
                        'b_c': true
                    }))), 'touchstart touchend mousedown mouseup mouseout', function(_0x47af91) {
                        if (['touchend', 'mouseup', 'mouseout'].includes(_0x47af91.type)) {
                            _0x3a8e2f(_0x47af91.target, _0x2ec721, false);
                        } else {
                            _0x3a8e2f(_0x47af91.target, _0x2ec721, true);
                            clearTimeout(hideTimeout);
                            _0x5ab74d.toggleControls.call(_0xa88a13, true);
                            hideTimeout = setTimeout(function() {
                                _0x5ab74d.toggleControls.call(_0xa88a13, false);
                            }, 5000)
                        }
                    });
                    _0x1093f4.call(this, _0x530042.call(this, '.' .concat(_0x2c1832, ' .').concat(_0x449eac({
                        'b_select': true
                    }))), 'touchstart touchend mousedown mouseup mouseout', function(_0x37f594) {
                        ['touchend', 'mouseup', 'mouseout'].includes(_0x37f594.type) ? (_0x3a8e2f(_0x37f594.target, _0x2ec721, !0x1), window.setTimeout(function() {
                            _0x378b5c.syncInput(0x0, 0x2, 0x0);
                        }, 0x1e)) : (_0x3a8e2f(_0x37f594.target, _0x2ec721, true), _0x378b5c.syncInput(0x0, 0x2, 0x1)), _0x37f594.stopPropagation();
                    });
                } else _0x132da7(_0x378b5c.virtualGamepadContainer, !_0x1ed80b);
            },
            'setup': function() {
                var _0xa88a13 = this;
                if (this.game) {
                    if (_0x378b5c.playerName = _0xa88a13.config.playerName, _0x3a8e2f(this.elements.container, this.config.classNames.type, true), this.elements.container.setAttribute('tabindex', '0'), this.color) {
                        var _0x17edbf = function(_0x175d8e) {
                            var _0x17edbf = _0x175d8e.toLowerCase();
                            if (_0x17edbf && /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/ .test(_0x17edbf)) {
                                if (0x4 === _0x17edbf.length) {
                                    for (var _0x2c1832 = '#', _0x4c881f = 0x1; _0x4c881f < 0x4; _0x4c881f += 0x1) _0x2c1832 += _0x17edbf.slice(_0x4c881f, _0x4c881f + 0x1).concat(_0x17edbf.slice(_0x4c881f, _0x4c881f + 0x1));
                                    _0x17edbf = _0x2c1832;
                                }
                                for (var _0x5ac4ff = [], _0x324169 = 0x1; _0x324169 < 0x7; _0x324169 += 0x2) _0x5ac4ff.push(parseInt('0x' .concat(_0x17edbf.slice(_0x324169, _0x324169 + 0x2)), 0x10));
                                return _0x5ac4ff;
                            }
                            return null;
                        }(this.color);
                        _0x17edbf && this.elements.container.setAttribute('style', '--ejs-primary-color: ' .concat(_0x17edbf[0x0], ', ').concat(_0x17edbf[0x1], ', ').concat(_0x17edbf[0x2]));
                    }
                    if (this.elements.wrapper = _0x428003('div', {
                            'class': this.config.classNames.video
                        }), _0x580edd(this.game, this.elements.wrapper), 'video' !== _0xa88a13.game.tagName.toLocaleLowerCase()) {
                        var _0x2c1832 = this.config.volume;
                        Object.defineProperty(_0xa88a13.game, 'volume', {
                            'get': function() {
                                return _0x2c1832;
                            },
                            'set': function(_0x4cca18) {
                                _0x2c1832 = _0x4cca18, _0xbae705.call(_0xa88a13, _0xa88a13.game, 'volumechange');
                            }
                        });
                        var _0x541fe1 = _0xa88a13.storage.get('muted');
                        Object.defineProperty(_0xa88a13.game, 'muted', {
                            'get': function() {
                                return _0x541fe1;
                            },
                            'set': function(_0x54b6e0) {
                                var _0x2c1832 = !!_0x1e2c68.boolean(_0x54b6e0) && _0x54b6e0;
                                _0x541fe1 = _0x2c1832, _0xbae705.call(_0xa88a13, _0xa88a13.game, 'volumechange');
                            }
                        });
                    }
                    window.addEventListener('beforeunload', function(_0x34b11a) {
                        if (_0xa88a13.started) {
                            var _0x2c1832 = _0xa88a13.startName.split('/').pop().split('.'),
                                _0x478412 = _0x2c1832.slice(0x0, _0x2c1832.length - 0x1).join('.');
                            _0x27f4c4.FS.syncfs(function(_0x1026f5) {});
                            try {
                                var _0x40d46a = 'srm';
                                'nds' === _0xa88a13.system && (_0x40d46a = 'dsv'), _0x27f4c4.FS.unlink('/data/saves/' .concat(_0x478412, '.').concat(_0x40d46a));
                            } catch (_0x2c3bc8) {
                                console.log('fail to save');
                            }
                            _0x378b5c.saveSavFiles(), _0x27f4c4.FS.syncfs(function(_0x2c4b20) {});
                        }
                    }, true);
                } else console.warn('No game element found!');
            },
            'listeners': function() {
                var _0xa88a13 = this;
                _0xa88a13.elements.buttons.restart && _0x1093f4.call(_0xa88a13, _0xa88a13.elements.buttons.restart, 'click', function(_0x5cfc51) {
                    if (_0x378b5c.restartGame(), _0x378b5c.inputsData = {}, _0x378b5c.connected && _0x378b5c.connection.isInitiator) {
                        for (var _0x17edbf = _0x378b5c.getStateInfo().split('|'), _0x2c1832 = _0x17edbf[0x0] >> 0x0, _0x1036de = (_0x17edbf[0x2], new Uint8Array(_0x2c1832)), _0x532138 = _0x17edbf[0x1] >> 0x0, _0x5a4c27 = 0x0; _0x5a4c27 < _0x2c1832; _0x5a4c27 += 0x1) _0x1036de[_0x5a4c27] = _0x27f4c4.Module.getValue(_0x532138 + _0x5a4c27);
                        var _0x5a3d1a = new File([_0x1036de], '0-game.state', {
                            'type': '',
                            'lastModified': new Date()
                        });
                        _0x378b5c.connection.shareFile(_0x5a3d1a), _0x378b5c.inputsData = {}, _0x378b5c.wait = true, _0x378b5c.systemPause(0x1), _0x27f4c4.Module.pauseMainLoop(), _0x378b5c.disableControl(true);
                    }
                }), _0xa88a13.elements.buttons.screenRecord && _0x1093f4.call(_0xa88a13, _0xa88a13.elements.buttons.screenRecord, 'click', function(_0x5cfc51) {
                    
                    if (! _0xa88a13.recordData) {
                        _0xa88a13.recordData = {started:false, data:[], stopped: false}
                    }
                    if (! _0xa88a13.recordData.started) { //start recording
                        _0xa88a13.elements.buttons.screenRecord.getElementsByClassName('ejs--74c6d4176d27e37a19d2e9e61de8f4')[0].innerHTML = _0xa88a13.localization('Stop Screen Recording');
                        if (MediaRecorder.isTypeSupported('video/webm; codecs=h264')) {
                            var options = {mimeType: 'video/webm; codecs=h264'}; // video/webm; codecs=h264,opus
                        } else if (MediaRecorder.isTypeSupported('video/webm; codecs=H264')) {
                            var options = {mimeType: 'video/webm; codecs=H264'};
                        } else if (MediaRecorder.isTypeSupported('video/webm; codecs=vp9')) {
                            var options = {mimeType: 'video/webm; codecs=vp9'};
                        } else if (MediaRecorder.isTypeSupported('video/webm; codecs=vp8')) {
                            var options = {mimeType: 'video/webm; codecs=vp8'};
                        } else if (MediaRecorder.isTypeSupported('video/webm; codecs=avc1')) {
                            var options = {mimeType: 'video/webm; codecs=avc1'};
                        } else if (MediaRecorder.isTypeSupported('video/webm; codecs=vp9.0')) {
                            var options = {mimeType: 'video/webm; codecs=vp9.0'};
                        } else if (MediaRecorder.isTypeSupported('video/webm; codecs=vp8.0')) {
                            var options = {mimeType: 'video/webm; codecs=vp8.0'};
                        } else {
                            var options = {};
                        }
                        _0xa88a13.recordData.stream = _0x27f4c4.Module.canvas.captureStream(30);
                        //_0xa88a13.recordData.stream.addTrack(); // TODO - find audio element
                        _0xa88a13.recordData.recorder = new MediaRecorder(_0xa88a13.recordData.stream, options);
                        _0xa88a13.recordData.recorder.ondataavailable = function(e) {
                            if (e.data.size > 0) {
                                _0xa88a13.recordData.data.push(e.data)
                            }
                            if (_0xa88a13.recordData.stopped) {
                                var a = document.createElement("a")
                                a.href = window.URL.createObjectURL(new Blob(_0xa88a13.recordData.data, {type: "video/webm"}))
                                if (typeof _0xa88a13.gameName == 'string') {
                                    var aname = _0xa88a13.gameName
                                }
                                a.download = aname ? '' .concat(aname, '-recording.webm') : 'record.webm';
                                a.click()
                                window.URL.revokeObjectURL(a.href)
                                delete _0xa88a13.recordData
                                _0xa88a13.elements.buttons.screenRecord.getElementsByClassName('ejs--74c6d4176d27e37a19d2e9e61de8f4')[0].innerHTML = _0xa88a13.localization('Start Screen Recording');
                            }
                        }
                        _0xa88a13.recordData.recorder.start()
                        _0xa88a13.recordData.started = true
                    } else if (_0xa88a13.recordData.started) { //stop recording
                        _0xa88a13.recordData.recorder.stop()
                        _0xa88a13.recordData.stopped = true
                    }
                    
                }), _0xa88a13.elements.buttons.play && Array.from(_0xa88a13.elements.buttons.play).forEach(function(_0x24495b) {
                    _0x1093f4.call(_0xa88a13, _0x24495b, 'click', function(_0x966382) {
                        _0xa88a13.playing ? (_0xa88a13.playing = !0x1, _0x27f4c4.Module.pauseMainLoop(), _0x378b5c.connected && _0x378b5c.connection.isInitiator && _0x378b5c.connection.send(JSON.stringify({
                            'act': 'pause'
                        })), _0xbae705.call(_0xa88a13, _0xa88a13.elements.container, 'pause', !0x1, {
                            'pause': true
                        })) : (_0xa88a13.playing = true, _0x27f4c4.Module.resumeMainLoop(), _0x378b5c.connected && _0x378b5c.connection.isInitiator && _0x378b5c.connection.send(JSON.stringify({
                            'act': 'resume'
                        })), _0xbae705.call(_0xa88a13, _0xa88a13.elements.container, 'pause', !0x1, {
                            'pause': !0x1
                        }));
                    });
                }), _0xa88a13.elements.buttons.netplay && _0x1093f4.call(_0xa88a13, _0xa88a13.elements.buttons.netplay, 'click', function(_0x2317b9) {
                    _0x378b5c.disableControl(true), _0x132da7(_0xa88a13.elements.dialogs.netplay, !0x1), _0x378b5c.players.length > 0x0 ? _0x378b5c.openRoom(_0xa88a13) : (_0x378b5c.stopLoadRooms(), _0x378b5c.loadRoomsList()), _0x378b5c.playerName || _0x4d8495.show('modal-9de6c4e9ce2b9361', {
                        'closeByEsckey': !0x1
                    });
                }), _0xa88a13.elements.buttons.cheat && _0x1093f4.call(_0xa88a13, _0xa88a13.elements.buttons.cheat, 'click', function(_0x44b01a) {
                    _0x132da7(_0xa88a13.elements.dialogs.cheat, !0x1);
                });
                _0x1093f4.call(_0xa88a13, _0xa88a13.elements.container, 'savestate', function(_0x25b541) {
                    if (_0x378b5c.saveLoadDB.call(_0xa88a13, 'save')) {
                        return
                    }
                    var _0x2c1832 = _0x25b541.detail.state;
                    if (_0x1e2c68.function(_0xa88a13.config.onsavestate)) _0xa88a13.config.onsavestate.call(null, {
                        'screenshot': _0x25b541.detail.screenshot,
                        'state': _0x2c1832
                    });
                    else {
                        var _0x2b5fc8 = new Blob([_0x2c1832]),
                            _0x152605 = _0xa88a13.startName.split('/').pop().split('.'),
                            _0x51d471 = _0x152605.slice(0x0, _0x152605.length - 0x1).join('.')
                        if (typeof _0xa88a13.gameName == 'string') {
                            var _0x51d471 = _0xa88a13.gameName
                        }
                        var _0x49f6b6 = _0x51d471 ? '' .concat(_0x51d471, '.state') : 'game.state';
                        _0x4e4ca6()(_0x2b5fc8, _0x49f6b6);
                    }
                    _0xa88a13.elements.container.focus();
                });
                _0xa88a13.game.stateloadField = _0x428003('input'), _0xa88a13.game.stateloadField.type = 'file', _0xa88a13.game.stateloadField.onchange = function _0x17edbf(_0xcd4599) {
                    var _0xfd246e, _0x3fdd71 = _0xcd4599.target.files;
                    _0x3fdd71.length > 0x0 && ((_0xfd246e = new FileReader()).file_name = _0x3fdd71[0x0].name, _0xfd246e.onload = function() {
                        var _0xa88a13 = new Uint8Array(_0xfd246e.result);
                        EJS_loadState(_0xa88a13);
                    }, _0xfd246e.readAsArrayBuffer(_0x3fdd71[0x0])), _0xa88a13.game.stateloadField = _0x428003('input'), _0xa88a13.game.stateloadField.type = 'file', _0xa88a13.game.stateloadField.onchange = _0x17edbf;
                }, _0x1093f4.call(_0xa88a13, _0xa88a13.elements.container, 'loadstate', function(_0x13504c) {
                    if (_0x378b5c.saveLoadDB.call(_0xa88a13, 'load')) {
                        return
                    }
                    _0x1e2c68.function(_0xa88a13.config.onloadstate) ? _0xa88a13.config.onloadstate.call(null, _0xa88a13.loadState) : _0xa88a13.game.stateloadField.click(), _0xa88a13.elements.container.focus();
                }), document.addEventListener('visibilitychange', function() {
                    'hidden' === document.visibilityState ? console.log('hidden') : console.log('active');
                });
            },
            'bindFunction': function() {
                var _0xa88a13 = this,
                    _0x17edbf = _0xa88a13.system;
                if (_0x27f4c4.Module && _0x27f4c4.Module._set_volume) {
                    var _0x2c1832 = _0x27f4c4.Module.cwrap('set_volume', 'null', ['number']);
                    _0x378b5c.setVolume = function() {
                        var _0x17edbf = 0x0;
                        _0xa88a13.volume < 0x1 && (_0x17edbf = 0x0 === _0xa88a13.volume ? -0x50 : 0x1e * _0xa88a13.volume - 0x1e, _0x2c1832(_0x17edbf)), _0xa88a13.muted && (_0x17edbf = -0x50), _0x2c1832(_0x17edbf);
                    };
                }
                _0x378b5c.setVariable = _0x27f4c4.Module.cwrap('set_variable', 'null', ['string', 'string']), _0x378b5c.simulateInputFn = _0x27f4c4.Module.cwrap('simulate_input', 'null', ['number', 'number', 'number']);
                var _0x2c63cc = {
                    0: null,
                    1: null,
                    2: null,
                    3: null,
                    4: null,
                    5: null,
                    6: null,
                    7: null,
                    8: null,
                    9: null,
                    10: null,
                    11: null,
                    12: null,
                    13: null,
                    14: null,
                    15: null,
                    16: null,
                    17: null,
                    18: null,
                    19: null,
                    20: null,
                    21: null,
                    22: null,
                    23: null,
                    24: null,
                    25: null,
                    26: null,
                    27: null,
                    28: null,
                    29: null,
                    30: null,
                    31: null
                };
                _0x378b5c.simulateInput = function(_0x249751, _0x480d05, _0x50f784) {
                    if (_0x378b5c.connected) {
                        if (_0xa88a13.playing && !_0x378b5c.disableInput) {
                            var _0x35b9c1 = _0x378b5c.connection.userid,
                                _0x4d96ad = _0x378b5c.roomMaster === _0x35b9c1,
                                _0xf1bb97 = _0x378b5c.players.indexOf(_0x35b9c1),
                                _0x52e1f4 = _0x378b5c.currentFrameNum();
                            _0x249751 >> 0x0 == 0x0 && (_0x2c63cc[_0x480d05] !== _0x50f784 && (_0x4d96ad ? (_0x378b5c.inputsData[_0x52e1f4] || (_0x378b5c.inputsData[_0x52e1f4] = []), _0x378b5c.inputsData[_0x52e1f4].push({
                                'index': _0xf1bb97,
                                'key': _0x480d05,
                                'status': _0x50f784,
                                'frame': _0x52e1f4
                            }),_0x378b5c.simulateInputFn(_0xf1bb97, _0x480d05, _0x50f784)) : _0x378b5c.connection.send(JSON.stringify({
                                'act': 'sync-control',
                                'value': ['' .concat(_0xf1bb97, '|').concat(_0x480d05, '|').concat(_0x50f784, '|').concat(_0x52e1f4)]
                            }), _0x378b5c.roomMaster)), _0x2c63cc[_0x480d05] = _0x50f784);
                        }
                    } else _0x378b5c.disableInput || _0x378b5c.simulateInputFn(_0x249751, _0x480d05, _0x50f784);
                }, _0x378b5c.syncInput = _0x378b5c.simulateInput;
                window.simulateInput = _0x378b5c.simulateInput;
                var _0x762355 = _0x27f4c4.Module.cwrap('shader_enable', 'null', ['number']);
                _0x378b5c.toggleShader = function(_0x433182) {
                    return _0x762355(_0x433182);
                }
                _0x378b5c.getStateInfo = _0x27f4c4.Module.cwrap('get_state_info', 'string', []);
                _0x378b5c.saveState = function() {
                    var _0xa88a14, _0x17edbf = _0x378b5c.getStateInfo().split('|'),
                        _0x2c1832 = _0x17edbf[0x0] >> 0x0;
                    if (_0x2c1832 > 0x0) {
                        _0xa88a14 = new Uint8Array(_0x2c1832);
                        for (var _0x2ef6be = _0x17edbf[0x1] >> 0x0, _0x3cc34b = 0x0; _0x3cc34b < _0x2c1832; _0x3cc34b++) _0xa88a14[_0x3cc34b] = _0x27f4c4.Module.getValue(_0x2ef6be + _0x3cc34b);
                    }
                    return _0xa88a14;
                };
                var _0x25a7a2 = _0x27f4c4.Module.cwrap('load_state', 'number', ['string', 'number']);
                _0x378b5c.loadState = function(_0x4389ae, _0x1d4918) {
                    var _0x91cd69;
                    _0x91cd69 = _0x4389ae;
                    try {
                        _0x27f4c4.FS.unlink('game.state');
                    } catch(e){}
                    _0x27f4c4._FS.createDataFile('/', 'game.state', _0x91cd69, true, true);
                    null === _0x1d4918 && (_0x1d4918 = 0);
                    if ('arcade' === _0x17edbf) {
                        setTimeout(function() {
                            _0x378b5c.getStateInfo();
                            _0x25a7a2('game.state', _0x1d4918);
                            _0x27f4c4.FS.unlink('game.state');
                        }, 0xa)
                    } else {
                        _0x25a7a2('game.state', _0x1d4918);
                        setTimeout(function() {
                            _0x27f4c4.FS.unlink('game.state');
                        }, 100)
                    }
                    if (_0x378b5c.connected && _0x378b5c.connection.isInitiator) {
                        for (var _0x54607c = _0x378b5c.getStateInfo().split('|'), _0x1ab9c9 = _0x54607c[0x0] >> 0x0, _0xce58ec = (_0x54607c[0x2], new Uint8Array(_0x1ab9c9)), _0x4aff4f = _0x54607c[0x1] >> 0x0, _0x3bfae0 = 0x0; _0x3bfae0 < _0x1ab9c9; _0x3bfae0 += 0x1) _0xce58ec[_0x3bfae0] = _0x27f4c4.Module.getValue(_0x4aff4f + _0x3bfae0);
                        var _0x227419 = new File([_0xce58ec], '0-game.state', {
                            'type': '',
                            'lastModified': new Date()
                        });
                        _0x378b5c.connection.shareFile(_0x227419);
                        _0x378b5c.inputsData = {};
                        _0x378b5c.wait = true;
                        _0x378b5c.systemPause(0x1);
                        _0x27f4c4.Module.pauseMainLoop();
                        _0x378b5c.disableControl(true);
                    }
                    _0xa88a13.elements.container.focus();
                };
                _0x27f4c4.Module._set_cheat && (_0x378b5c.setCheat = _0x27f4c4.Module.cwrap('set_cheat', 'number', ['number', 'number', 'string']));
                _0x27f4c4.Module._reset_cheat && (_0x378b5c.resetCheat = _0x27f4c4.Module._reset_cheat);
                _0x378b5c.quickSaveState = function() {
                    if (_0xa88a13.started && !_0x378b5c.connected) {
                        if (_0xa88a13.statesSupported === false) {
                            _0xa88a13.elements.widgets.stateInfoDiv.innerHTML = 'CANNOT CURRENTLY SAVE STATE';
                            clearTimeout(_0x378b5c.saveMsgTransitions);
                            _0x378b5c.saveMsgTransitions = setTimeout(function() {
                                _0xa88a13.elements.widgets.stateInfoDiv.innerHTML = '';
                            }, 1500)
                            return;
                        }
                        if (_0x2593da && typeof _0x2593da.getCoreOptionsValues == 'function') {
                            var slot = _0x2593da.getCoreOptionsValues()['save-state-slot'];
                            if (! slot) {
                                slot = 1;
                            }
                        } else {
                            var slot = 1;
                        }
                        var name = slot + '-quick.state';
                        try {
                            _0x27f4c4.FS.unlink(name);
                        } catch (_0x4b4d4c) {}
                        try {
                            var _0x17edbf = _0x378b5c.saveState();
                            _0x27f4c4._FS.createDataFile('/', name, _0x17edbf, true, true);
                            _0xa88a13.elements.widgets.stateInfoDiv.innerHTML = 'STATE SAVED TO SLOT ' + slot;
                            clearTimeout(_0x378b5c.saveMsgTransitions);
                            _0x378b5c.saveMsgTransitions = setTimeout(function() {
                                _0xa88a13.elements.widgets.stateInfoDiv.innerHTML = '';
                            }, 1500)
                        } catch(e) {
                            _0xa88a13.elements.widgets.stateInfoDiv.innerHTML = 'FAILED TO SAVE STATE TO SLOT ' + slot;
                            clearTimeout(_0x378b5c.saveMsgTransitions);
                            _0x378b5c.saveMsgTransitions = setTimeout(function() {
                                _0xa88a13.elements.widgets.stateInfoDiv.innerHTML = '';
                            }, 1500)
                        }
                    }
                };
                _0x378b5c.saveMsgTransitions = null;
                _0x378b5c.quickLoadState = function() {
                    if (_0xa88a13.started && !_0x378b5c.connected) {
                        if (_0xa88a13.statesSupported === false) {
                            _0xa88a13.elements.widgets.stateInfoDiv.innerHTML = 'CANNOT CURRENTLY LOAD STATE';
                            clearTimeout(_0x378b5c.saveMsgTransitions);
                            _0x378b5c.saveMsgTransitions = setTimeout(function() {
                                _0xa88a13.elements.widgets.stateInfoDiv.innerHTML = '';
                            }, 1500)
                            return;
                        }
                        if (_0x2593da && typeof _0x2593da.getCoreOptionsValues == 'function') {
                            var slot = _0x2593da.getCoreOptionsValues()['save-state-slot'];
                            if (! slot) {
                                slot = 1;
                            }
                        } else {
                            var slot = 1;
                        }
                        var name = slot + '-quick.state';
                        var success = true;
                        try {
                            _0x25a7a2(name, 0);
                            if ('arcade' === _0x17edbf) {
                                setTimeout(function() {
                                    _0x378b5c.getStateInfo();
                                    _0x25a7a2(name, 0x0);
                                }, 0xa);
                            }
                        } catch (_0x4ee386) {
                            success = false;
                        }
                        if (! success) {
                            _0xa88a13.elements.widgets.stateInfoDiv.innerHTML = 'FAILED TO LOAD STATE FROM SLOT ' + slot;
                        } else {
                            _0xa88a13.elements.widgets.stateInfoDiv.innerHTML = 'LOADED STATE FROM SLOT ' + slot;
                        }
                        clearTimeout(_0x378b5c.saveMsgTransitions);
                        _0x378b5c.saveMsgTransitions = setTimeout(function() {
                            _0xa88a13.elements.widgets.stateInfoDiv.innerHTML = '';
                        }, 1500)
                    }
                }, _0x378b5c.changeStateSlot = function(e) {
                    if (_0x2593da && typeof _0x2593da.getCoreOptionsValues == 'function') {
                        var slot = _0x2593da.getCoreOptionsValues()['save-state-slot'];
                        if (! slot) {
                            slot = 1;
                        }
                    } else {
                        var slot = 1;
                    }
                    var newSlot;
                    if (typeof e != 'number') {
                        newSlot = slot + 1;
                    } else {
                        newSlot = e;
                    }
                    if (newSlot > 9) {
                        newSlot = 1;
                    }
                    _0x7f9f36.updateCoreOptions.call(_0xa88a13, 'save-state-slot', newSlot)
                    _0xa88a13.elements.widgets.stateInfoDiv.innerHTML = 'SET SAVE STATE SLOT TO ' + newSlot;
                    clearTimeout(_0x378b5c.saveMsgTransitions);
                    _0x378b5c.saveMsgTransitions = setTimeout(function() {
                        _0xa88a13.elements.widgets.stateInfoDiv.innerHTML = '';
                    }, 1500)
                }, window.EJS_loadState = function(_0x4dd6a5) {
                    _0x378b5c.loadState(_0x4dd6a5, 0x0);
                    setTimeout(function() {
                        if (_0x378b5c.connected) {
                            var _0x17edbf = new File([_0x4dd6a5], '0-game.state', {
                                'type': '',
                                'lastModified': new Date()
                            });
                            _0x378b5c.connection.shareFile(_0x17edbf), _0x378b5c.inputsData = {}, _0x378b5c.wait = true, _0x378b5c.systemPause(0x1), _0x27f4c4.Module.pauseMainLoop(), _0x378b5c.disableControl(true);
                        }
                    }, 0x1e);
                };
                var _0x840cf4 = _0x27f4c4.Module.cwrap('cmd_take_screenshot', '', []);
                _0x378b5c.getScreenData = function() {
                    return _0x378b5c.toggleShader(0x0), _0x840cf4(), _0x378b5c.toggleShader(0x1), _0x27f4c4.FS.readFile('screenshot.png');
                };
                _0x378b5c.restartGame = _0x27f4c4.Module.cwrap('system_restart', '', []);
                _0x378b5c.currentFrameNum = _0x27f4c4.Module.cwrap('get_current_frame_count', '', []);
                _0x378b5c.saveSavFiles = _0x27f4c4.Module.cwrap('cmd_savefiles', '', []);
                _0x27f4c4.Module._get_core_options && (_0x378b5c.getGameCoreOptions = _0x27f4c4.Module.cwrap('get_core_options', 'string', []));
                _0x378b5c.systemPause = function(_0x29d94a) {
                    return !0x1;
                };
                _0x378b5c.controllers = _0x2593da.storage.get('controllers');
                _0x378b5c.controllers || (_0x378b5c.controllers = JSON.parse(JSON.stringify(_0x378b5c.defaultControllers)));
            }
        },
        _0xdcec2a = _0x378b5c;

    function _0x5005e6(_0x7f3270, _0x477158) {
        return function(_0x20890f) {
            if (Array.isArray(_0x20890f)) return _0x20890f;
        }(_0x7f3270) || function(_0x557107, _0x409476) {
            var _0x2c1832 = [],
                _0x488a47 = true,
                _0x34f76e = !0x1,
                _0x19606f = void 0x0;
            try {
                for (var _0x328f4d, _0x4d9086 = _0x557107[Symbol.iterator](); !(_0x488a47 = (_0x328f4d = _0x4d9086.next()).done) && (_0x2c1832.push(_0x328f4d.value), !_0x409476 || _0x2c1832.length !== _0x409476); _0x488a47 = true);
            } catch (_0x13c09a) {
                _0x34f76e = true, _0x19606f = _0x13c09a;
            } finally {
                try {
                    _0x488a47 || null == _0x4d9086.return || _0x4d9086.return();
                } finally {
                    if (_0x34f76e) throw _0x19606f;
                }
            }
            return _0x2c1832;
        }(_0x7f3270, _0x477158) || function() {
            throw new TypeError('Invalid attempt to destructure non-iterable instance');
        }();
    }
    var _0x7f9f36 = {
            'storage': null,
            'coreOptionsValues': {},
            'contextMenu': null,
            'normalOptions': {
                'shader': {
                    'label': 'Shader',
                    'options': {
                        'disabled': 'Disabled',
                        '2xScaleHQ.glslp': '2xScaleHQ',
                        '4xScaleHQ.glslp': '4xScaleHQ',
                        'crt-easymode.glslp': 'CRT easymode',
                        'crt-aperture.glslp': 'CRT aperture',
                        'crt-geom.glslp': 'CRT geom'
                    },
                    'default': 'disabled'
                },
                'virtual-gamepad': {
                    'label': 'Virtual Gamepad',
                    'options': {
                        'disabled': 'Disabled',
                        'enabled': 'Enabled'
                    },
                    'default': 'enabled'
                }
            },
            'defaultCoreOptionsValues': function() {
                var _0xa88a13 = {};
                switch (this.system) {
                    case 'pce':
                        _0xa88a13 = {
                            'pce_nospritelimit': 'enabled'
                        };
                        break;
                    case 'jaguar':
                        _0xa88a13 = {
                            'virtualjaguar_doom_res_hack': 'enabled'
                        };
                        break;
                    case 'psx':
                        _0xa88a13 = {
                            'pcsx_rearmed_memcard2': 'enabled'
                        };
                        break;
                    case 'nds':
                        _0xa88a13 = {};
                }
                return _0xa88a13;
            },
            'getCoreOptionsValues': function() {
                var _0xa88a13 = _0x7f9f36.storage.get('core-options');
                return _0x1e2c68.empty(_0xa88a13) && (_0xa88a13 = {}), _0xa88a13;
            },
            'getCoreOptions': function() {
                var _0xa88a13 = {};
                switch (this.system) {
                    case 'nes':
                        _0xa88a13.fceumm_palette = {
                            'label': this.localization('Color Palette'),
                            'options': {
                                'default': this.localization('Default'),
                                'asqrealc': 'asqrealc',
                                'nintendo-vc': 'nintendo-vc',
                                'rgb': 'rgb',
                                'yuv-v3': 'yuv-v3',
                                'unsaturated-final': 'unsaturated-final',
                                'sony-cxa2025as-us': 'sony-cxa2025as-us',
                                'pal': 'pal',
                                'bmf-final2': 'bmf-final2',
                                'bmf-final3': 'bmf-final3',
                                'smooth-fbx': 'smooth-fbx',
                                'composite-direct-fbx': 'composite-direct-fbx',
                                'pvm-style-d93-fbx': 'pvm-style-d93-fbx',
                                'nescap': 'nescap',
                                'ntsc-hardware-fbx': 'ntsc-hardware-fbx',
                                'nes-classic-fbx-fs': 'nes-classic-fbx-fs',
                                'wavebeam': 'wavebeam'
                            },
                            'default': 'default'
                        }, _0xa88a13.fceumm_nospritelimit = {
                            'label': this.localization('No Sprite Limit'),
                            'options': {
                                'enabled': this.localization('Enabled'),
                                'disabled': this.localization('Disabled')
                            },
                            'default': 'disabled'
                        }, _0xa88a13.fceumm_sndquality = {
                            'label': this.localization('Sound Quality'),
                            'options': {
                                'Low': this.localization('Low'),
                                'High': this.localization('High'),
                                'Very High': this.localization('Very High')
                            },
                            'default': 'Low'
                        }, this.lightgun || (_0xa88a13.system_type = {
                            'label': this.localization('4 Players Support'),
                            'options': {
                                'nes': 'NES',
                                'famicom': 'Famicom'
                            },
                            'default': 'nes',
                            'netplay': true
                        }), _0xa88a13.fceumm_turbo_enable = {
                            'label': this.localization('Turbo Enable'),
                            'options': {
                                'None': this.localization('None'),
                                'Player 1': this.localization('Player 1'),
                                'Player 2': this.localization('Player 2'),
                                'Both': this.localization('Both')
                            },
                            'default': 'None',
                            'netplay': true
                        }, _0xa88a13.fceumm_region = {
                            'label': this.localization('Region'),
                            'options': {
                                'Auto': this.localization('Auto'),
                                'NTSC': 'NTSC',
                                'PAL': 'PAL',
                                'Dendy': 'Dendy'},
                            'default': 'Auto',
                            'netplay': true
                        };
                        break;
                    case 'snes':
                        _0xa88a13 = {
                            'snes9x_next_overclock': {
                                'label': this.localization('SuperFX Overclock'),
                                'options': {
                                    'disabled': this.localization('Disabled')+'(10MHz)',
                                    '40MHz': '40MHz',
                                    '60MHz': '60MHz',
                                    '80MHz': '80MHz',
                                    '100MHz': '100MHz'
                                },
                                'default': 'disabled',
                                'netplay': true
                            }
                        };
                        break;
                    case 'snes2002':
                    case 'snes2005':
                    case 'snes2010':
                        _0xa88a13 = {};
                        break;
                    case 'gb':
                        _0xa88a13 = {
                            'gambatte_gb_colorization': {
                                'label': this.localization('GB Colorization'),
                                'options': {
                                    'disabled': this.localization('Disabled'),
                                    'auto': this.localization('auto'),
                                    'internal': this.localization('internal')
                                },
                                'default': 'disabled'
                            },
                            'gambatte_gb_internal_palette': {
                                'label': this.localization('Internal Palette'),
                                'options': {
                                    'GBC - Blue': this.localization('GBC - Blue'),
                                    'GBC - Brown': this.localization('GBC - Brown'),
                                    'GBC - Dark Blue': this.localization('GBC - Dark Blue'),
                                    'GBC - Dark Brown': this.localization('GBC - Dark Brown'),
                                    'GBC - Dark Green': this.localization('GBC - Dark Green'),
                                    'GBC - Grayscale': this.localization('GBC - Grayscale'),
                                    'GBC - Green': this.localization('GBC - Green'),
                                    'GBC - Inverted': this.localization('GBC - Inverted'),
                                    'GBC - Orange': this.localization('GBC - Orange'),
                                    'GBC - Pastel Mix': this.localization('GBC - Pastel Mix'),
                                    'GBC - Red': this.localization('GBC - Red'),
                                    'GBC - Yellow': this.localization('GBC - Yellow')
                                },
                                'default': 'GBC - Blue'
                            }
                        };
                        break;
                    case 'gba':
                        _0xa88a13 = {
                            'mgba_solar_sensor_level': {
                                'label': this.localization('Solar sensor level'),
                                'options': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                                'default': '0'
                            },
                            'mgba_frameskip': {
                                'label': this.localization('Frameskip'),
                                'options': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                                'default': '0'
                            }
                        };
                        break;
                    case 'vbanext':
                        _0xa88a13 = {
                            'vbanext_turboenable': {
                                'label': this.localization('Enable Turbo Buttons'),
                                'options': {
                                    'disabled': this.localization('disabled'),
                                    'enabled': this.localization('enabled')
                                },
                                'default': 'disabled'
                            },
                            'vbanext_turbodelay': {
                                'label': this.localization('Turbo Delay in frames'),
                                'options': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
                                'default': '2'
                            }
                        };
                        break;
                    case 'n64':
                        _0xa88a13 = {
                            'glupen64-aspect': {
                                'label': this.localization('Aspect Ratio (Need to refresh page)'),
                                'options': ['4:3', '16:9'],
                                'default': '4:3'
                            },
                            'glupen64-43screensize': {
                                'label': this.localization('4:3 Resolution'),
                                'options': ['320x240', '640x480', '960x720', '1280x960'],
                                'default': '320x240'
                            },
                            'glupen64-169screensize': {
                                'label': this.localization('16:9 Resolution'),
                                'options': ['640x360', '960x540', '1280x720'],
                                'default': '640x360'
                            },
                            'glupen64-pak1': {
                                'label': this.localization('Player 1 Pak'),
                                'options': {
                                    'none': this.localization('none'),
                                    'memory': this.localization('memory'),
                                    'rumble': this.localization('rumble')
                                },
                                'default': 'none',
                                'netplay': true
                            },
                            'glupen64-pak2': {
                                'label': this.localization('Player 2 Pak'),
                                'options': {
                                    'none': this.localization('none'),
                                    'memory': this.localization('memory'),
                                    'rumble': this.localization('rumble')
                                },
                                'default': 'none',
                                'netplay': true
                            },
                            'glupen64-pak3': {
                                'label': this.localization('Player 3 Pak'),
                                'options': {
                                    'none': this.localization('none'),
                                    'memory': this.localization('memory'),
                                    'rumble': this.localization('rumble')
                                },
                                'default': 'none',
                                'netplay': true
                            },
                            'glupen64-pak4': {
                                'label': this.localization('Player 4 Pak'),
                                'options': {
                                    'none': this.localization('none'),
                                    'memory': this.localization('memory'),
                                    'rumble': this.localization('rumble')
                                },
                                'default': 'none',
                                'netplay': true
                            },
                        };
                        if (_0xdcec2a && (_0xdcec2a.virtualGamepadContainer != 'undefined' || _0xdcec2a.virtualGamepadContainer !== null)) {

                            _0xa88a13['joystick-input'] = {
                                'label': this.localization('Joystick input keys'),
                                'options': {
                                    'd-pad': this.localization('d-pad'),
                                    'analog-stick': this.localization('Analog Stick')
                                },
                                'default': 'analog-stick',
                                'netplay': true
                            }
                        }
                        break;
                    case 'nds':
                        _0xa88a13 = {
                            'desmume_screens_layout': {
                                'label': this.localization('Screen layout'),
                                'options': {
                                    'top/bottom': this.localization('top/bottom'),
                                    'bottom/top': this.localization('bottom/top'),
                                    'left/right': this.localization('left/right'),
                                    'right/left': this.localization('right/left'),
                                    'top only': this.localization('top only'),
                                    'bottom only': this.localization('bottom only'),
                                    'quick switch': this.localization('quick switch'),
                                    'hybrid/top': this.localization('hybrid/top'),
                                    'hybrid/bottom': this.localization('hybrid/bottom')
                                },
                                'default': 'top/bottom'
                            },
                            'screen_rotation': {
                                'label': this.localization('Screen Rotation'),
                                'options': {
                                    0: '0°',
                                    90: '90°',
                                    180: '180°',
                                    270: '270°'
                                },
                                'default': 0
                            },
                            'desmume_frameskip': {
                                'label': this.localization('Frameskip'),
                                'options': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
                                'default': '0'
                            }
                        }, _0x2d904a.wasm || delete _0xa88a13.screen_rotation;
                        break;
                    case 'vb':
                    case 'pce':
                        _0xa88a13 = {};
                        break;
                    case 'segaMS':
                    case 'segaGG':
                    case 'segaMD':
                    case 'segaCD':
                        _0xa88a13 = {
                            'genesis_plus_gx_no_sprite_limit': {
                                'label': this.localization('No Sprite Limit'),
                                'options': {
                                    'disabled': this.localization('disabled'),
                                    'enabled': this.localization('enabled')
                                },
                                'default': 'disabled'
                            },
                            'genesis_plus_gx_overclock': {
                                'label': this.localization('CPU speed'),
                                'options': ['100%', '125%', '150%', '175%', '200%'],
                                'default': '100%',
                                'netplay': true
                            },
                            'genesis_plus_gx_sound_output': {
                                'label': this.localization('Sound output'),
                                'options': {
                                    'stereo': this.localization('stereo'),
                                    'mono': this.localization('mono')
                                },
                                'default': 'stereo'
                            }
                        };
                        break;
                    case 'sega32x':
                        _0xa88a13 = {
                            'picodrive_sprlim': {
                                'label': this.localization('No sprite limit'),
                                'options': {
                                    'disabled': this.localization('disabled'),
                                    'enabled': this.localization('enabled')
                                },
                                'default': 'disabled'
                            }
                        };
                        break;
                    case 'segaSaturn':
                        _0xa88a13 = {
                            'yabause_frameskip': {
                                'label': this.localization('Frameskip'),
                                'options': {
                                    'disabled': this.localization('disabled'),
                                    'enabled': this.localization('enabled')
                                },
                                'default': 'disabled'
                            }
                        };
                        break;
                    case 'msx':
                        _0xa88a13 = {
                            'bluemsx_nospritelimits': {
                                'label': this.localization('No Sprite Limit'),
                                'options': {
                                    'OFF': this.localization('OFF'),
                                    'ON': this.localization('ON')
                                },
                                'default': 'OFF'
                            }
                        };
                        break;
                    case 'ws':
                    case 'ngp':
                        _0xa88a13 = {};
                        break;
                    case 'jaguar':
                        _0xa88a13 = {
                            'virtualjaguar_usefastblitter': {
                                'label': this.localization('Fast Blitter'),
                                'options': {
                                    'disabled': this.localization('disabled'),
                                    'enabled': this.localization('enabled')
                                },
                                'default': 'disabled'
                            },
                            'virtualjaguar_bios': {
                                'label': this.localization('Bios'),
                                'options': {
                                    'disabled': this.localization('disabled'),
                                    'enabled': this.localization('enabled')
                                },
                                'default': 'disabled'
                            }
                        };
                        break;
                    case 'psx':
                        _0xa88a13 = {
                            'pcsx_rearmed_frameskip': {
                                'label': this.localization('Frameskip'),
                                'options': [0, 1, 2, 3],
                                'default': 0,
                                'netplay': true
                            },
                            'pcsx_rearmed_memcard2': {
                                'label': this.localization('Enable second memory card'),
                                'options': {
                                    'disabled': this.localization('disabled'),
                                    'enabled': this.localization('enabled')
                                },
                                'default': 'enabled',
                                'netplay': true
                            },
                            'pcsx_rearmed_pad1type': {
                                'label': this.localization('Pad 1 Type'),
                                'options': {
                                    'default': this.localization('default'),
                                    'none': this.localization('none'),
                                    'standard': this.localization('standard'),
                                    'analog': this.localization('analog'),
                                    'negcon': this.localization('negcon')
                                },
                                'default': 'default',
                                'netplay': true
                            },
                            'pcsx_rearmed_pad2type': {
                                'label': this.localization('Pad 2 Type'),
                                'options': {
                                    'default': this.localization('default'),
                                    'none': this.localization('none'),
                                    'standard': this.localization('standard'),
                                    'analog': this.localization('analog'),
                                    'negcon': this.localization('negcon')
                                },
                                'default': 'default',
                                'netplay': true
                            },
                            'pcsx_rearmed_pad3type': {
                                'label': this.localization('Pad 3 Type'),
                                'options': {
                                    'default': this.localization('default'),
                                    'none': this.localization('none'),
                                    'standard': this.localization('standard'),
                                    'analog': this.localization('analog'),
                                    'negcon': this.localization('negcon')
                                },
                                'default': 'default',
                                'netplay': true
                            },
                            'pcsx_rearmed_pad4type': {
                                'label': this.localization('Pad 4 Type'),
                                'options': {
                                    'default': this.localization('default'),
                                    'none': this.localization('none'),
                                    'standard': this.localization('standard'),
                                    'analog': this.localization('analog'),
                                    'negcon': this.localization('negcon')
                                },
                                'default': 'default',
                                'netplay': true
                            },
                            'pcsx_rearmed_vibration': {
                                'label': this.localization('Enable Vibration'),
                                'options': {
                                    'disabled': this.localization('disabled'),
                                    'enabled': this.localization('enabled')
                                },
                                'default': 'enabled',
                                'netplay': true
                            },
                            'pcsx_rearmed_neon_interlace_enable': {
                                'label': this.localization('Enable interlacing mode(s)'),
                                'options': {
                                    'disabled': this.localization('disabled'),
                                    'enabled': this.localization('enabled')
                                },
                                'default': 'disabled',
                                'netplay': true
                            },
                            'pcsx_rearmed_neon_enhancement_enable': {
                                'label': this.localization('Enhanced resolution (slow)'),
                                'options': {
                                    'disabled': this.localization('disabled'),
                                    'enabled': this.localization('enabled')
                                },
                                'default': 'disabled',
                                'netplay': true
                            },
                            'pcsx_rearmed_neon_enhancement_no_main': {
                                'label': this.localization('Enhanced resolution speed hack'),
                                'options': {
                                    'disabled': this.localization('disabled'),
                                    'enabled': this.localization('enabled')
                                },
                                'default': 'disabled',
                                'netplay': true
                            }
                        };
                        break;
                    case 'arcade':
                    case 'fba0.2.97.29':
                        _0xa88a13 = {
                            'fba-aspect': {
                                'label': this.localization('Aspect ratio'),
                                'options': ['DAR', 'PAR'],
                                'default': 'DAR'
                            },
                            'fba-frameskip': {
                                'label': this.localization('Frameskip'),
                                'options': ['0', '1', '2', '3', '4', '5'],
                                'default': '0',
                                'netplay': true
                            },
                            'fba-cpu-speed-adjust': {
                                'label': this.localization('CPU overclock'),
                                'options': ['100', '110', '120', '130', '140', '150', '160', '170', '180', '190', '200'],
                                'default': '100',
                                'netplay': true
                            },
                            'fba-diagnostic-input': {
                                'label': this.localization('Diagnostic Input'),
                                'options': ['None', 'Hold Start', 'Start + A + B', 'Hold Start + A + B', 'Start + L + R', 'Hold Start + L + R', 'Hold Select', 'Select + A + B', 'Hold Select + A + B', 'Select + L + R', 'Hold Select + L + R'],
                                'default': 'None',
                                'netplay': true
                            },
                            'fba-neogeo-mode': {
                                'label': this.localization('Force Neo Geo mode'),
                                'options': ['MVS', 'AES', 'UNIBIOS', 'DIPSWITCH'],
                                'default': 'MVS',
                                'netplay': true
                            }
                        };
                        break;
                    case 'mame2003':
                    case 'mame2010':
                    case 'mame':
                        _0xa88a13 = {};
                        break;
                    case 'dos':
                        _0xa88a13 = {};
                        break;
                    default:
                        _0xa88a13 = {}, console.warn('Unsupported emulator');
                }
                if (this.coreVer === 2) {
                    _0xa88a13 = {};
                }
                if (this.statesSupported === true) {
                    _0xa88a13['save-state-slot'] = {
                        'label': this.localization('Save State Slot'),
                        'options': [1, 2, 3, 4, 5, 6, 7, 8, 9],
                        'default': 1
                    }
                }
                if (this.statesSupported === true && window.indexedDB &&
                    (typeof this.gameName == 'string' || !this.config.gameUrl.startsWith('blob:'))) {
                    _0xa88a13['save-state-location'] = {
                        'label': this.localization('Save State Location'),
                        'options': {
                            'download': this.localization('download'),
                            'keep in browser': this.localization('keep in browser')
                        },
                        'default': 'download'
                    }
                }
                _0xdcec2a.getGameCoreOptions && _0xdcec2a.getGameCoreOptions().split('\n').forEach(function(_0x2bef5a, _0x49b64b) {
                    var _0x5995db = _0x2bef5a.split('; '),
                        _0x16274c = _0x5995db[0x0];
                    if (0x0 === _0x16274c.indexOf('fba-dipswitch-')) {
                        var _0x757776 = _0x5995db[0x1].split('|'),
                            _0x1f895e = _0x16274c.replace(/_/g, ' ').replace(/.+\-(.+)/, '$1');
                        _0xa88a13[_0x16274c] = {
                            'label': _0x1f895e,
                            'options': _0x757776.slice(0x1, -0x1),
                            'default': _0x757776[0x0].replace('(Default) ', ''),
                            'netplay': true
                        };
                    }
                });
                return _0xa88a13;
            },
            'supportNetPlay': function() {
                if (this.lightgun || this.mouse) return !0x1;
                var _0xa88a13 = window.RTCPeerConnection || window.webkitPeerConnection00 || window.webkitRTCPeerConnection || window.mozRTCPeerConnection,
                    _0x17edbf = window.mozRTCIceCandidate || window.RTCIceCandidate,
                    _0x2c1832 = window.mozRTCSessionDescription || window.RTCSessionDescription;
                return !!(_0xa88a13 && _0x17edbf && _0x2c1832) && !!(_0xa88a13 && 'createDataChannel' in _0xa88a13.prototype);
            },
            'isNetPlay': function() {},
            'findElements': function() {
                try {
                    return this.elements.controls = _0x530042.call(this, this.config.selectors.controls.wrapper), this.elements.buttons = {
                        'play': _0x23ffa1.call(this, this.config.selectors.buttons.play),
                        'pause': _0x530042.call(this, this.config.selectors.buttons.pause),
                        'restart': _0x530042.call(this, this.config.selectors.buttons.restart),
                        'mute': _0x530042.call(this, this.config.selectors.buttons.mute),
                        'settings': _0x530042.call(this, this.config.selectors.buttons.settings),
                        'fullscreen': _0x530042.call(this, this.config.selectors.buttons.fullscreen),
                        'saveState': _0x530042.call(this, this.config.selectors.buttons.saveState),
                        'screenRecord': _0x530042.call(this, this.config.selectors.buttons.screenRecord),
                        'loadState': _0x530042.call(this, this.config.selectors.buttons.loadState),
                        'gamepad': _0x530042.call(this, this.config.selectors.buttons.gamepad),
                        'netplay': _0x530042.call(this, this.config.selectors.buttons.netplay),
                        'cheat': _0x530042.call(this, this.config.selectors.buttons.cheat)
                    }, this.elements.inputs = {
                        'volume': _0x530042.call(this, this.config.selectors.inputs.volume)
                    }, true;
                } catch (_0x527381) {
                    return this.debug.warn('It looks like there is a problem with your custom controls HTML', _0x527381), !0x1;
                }
            },
            'createIcon': function(_0x43d42f, _0x42a597) {
                var _0x2c1832 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                _0x154f99(_0x2c1832, _0x5dc0c0(_0x42a597, {
                    'role': 'presentation',
                    'focusable': 'false'
                }));
                var _0x50b7a7 = document.createElement('div');
                _0x50b7a7.innerHTML = '<svg>' .concat(this.icons[_0x43d42f], '</svg>');
                for (var _0x373099 = _0x50b7a7.childNodes[0x0].childNodes, _0x804f4d = 0x0; _0x804f4d < _0x373099.length; _0x804f4d += 0x1) _0x2c1832.appendChild(_0x373099[_0x804f4d]);
                return _0x2c1832;
            },
            'createLabel': function(_0x185043) {
                var _0x17edbf = arguments.length > 0x1 && void 0x0 !== arguments[0x1] ? arguments[0x1] : {},
                    _0x2c1832 = _0xb9b2ff.get(_0x185043, this.config),
                    _0x3d681f = {};
                _0x3d681f[_0x17edbf.class] = true, _0x3d681f[this.config.classNames.hidden] = true;
                var _0x58a1d4 = Object.assign({}, _0x17edbf, {
                    'class': [_0x17edbf.class, this.config.classNames.tooltip].filter(Boolean).join(' ')
                });
                return _0x428003('span', _0x58a1d4, _0x2c1832);
            },
            'createBadge': function(_0x415aef) {
                if (_0x1e2c68.empty(_0x415aef)) return null;
                var _0x17edbf = _0x428003('span', {
                    'class': this.config.classNames.menu.value
                });
                return _0x17edbf.appendChild(_0x428003('span', {
                    'class': this.config.classNames.menu.badge
                }, _0x415aef)), _0x17edbf;
            },
            'createButton': function(_0x427a85, _0x493eb2) {
                var _0x2c1832, _0x325832, _0xcb618b, _0x25c678, _0x58309d = _0x428003('button'),
                    _0x183584 = Object.assign({}, _0x493eb2),
                    _0x2345d2 = _0x9fdcea(_0x427a85),
                    _0x2ca20d = !0x1;
                'type' in _0x183584 || (_0x183584.type = 'button');
                var _0x34225b = _0x449eac({
                    'ejs__control': true
                });
                switch ('class' in _0x183584 ? _0x183584.class.includes(_0x34225b) || (_0x183584.class += ' ' .concat(_0x34225b)) : _0x183584.class = _0x34225b, _0x427a85) {
                    case 'play':
                        _0x2ca20d = true, _0x2c1832 = 'play', _0xcb618b = 'pause', _0x325832 = 'play', _0x25c678 = 'pause';
                        break;
                    case 'mute':
                        _0x2ca20d = true, _0x2c1832 = 'mute', _0xcb618b = 'unmute', _0x325832 = 'volume', _0x25c678 = 'muted';
                        break;
                    case 'fullscreen':
                        _0x2ca20d = true, _0x2c1832 = 'enterFullscreen', _0xcb618b = 'exitFullscreen', _0x325832 = 'enter-fullscreen', _0x25c678 = 'exit-fullscreen';
                        break;
                    default:
                        _0x2c1832 = _0x2345d2, _0x325832 = _0x427a85;
                }
                return _0x2ca20d ? (_0x58309d.appendChild(_0x7f9f36.createIcon.call(this, _0x25c678, {
                    'class': _0x449eac({
                        'icon--pressed': true
                    })
                })), _0x58309d.appendChild(_0x7f9f36.createIcon.call(this, _0x325832, {
                    'class': _0x449eac({
                        'icon--not-pressed': true
                    })
                })), _0x58309d.appendChild(_0x7f9f36.createLabel.call(this, _0xcb618b, {
                    'class': _0x449eac({
                        'icon--pressed': true
                    })
                })), _0x58309d.appendChild(_0x7f9f36.createLabel.call(this, _0x2c1832, {
                    'class': _0x449eac({
                        'icon--not-pressed': true
                    })
                }))) : (_0x58309d.appendChild(_0x7f9f36.createIcon.call(this, _0x325832)), _0x58309d.appendChild(_0x7f9f36.createLabel.call(this, _0x2c1832))), _0x5dc0c0(_0x183584, _0xa949a8(this.config.selectors.buttons[_0x2345d2], _0x183584)), _0x154f99(_0x58309d, _0x183584), 'play' === _0x2345d2 ? (_0x1e2c68.array(this.elements.buttons[_0x2345d2]) || (this.elements.buttons[_0x2345d2] = []), this.elements.buttons[_0x2345d2].push(_0x58309d)) : this.elements.buttons[_0x2345d2] = _0x58309d, _0x58309d;
            },
            'createRange': function(_0x491b4a, _0x5f154a) {
                var _0x2c1832 = _0x428003('input', _0x5dc0c0(_0xa949a8(this.config.selectors.inputs[_0x491b4a]), {
                    'type': 'range',
                    'min': 0x0,
                    'max': 0x64,
                    'step': 0.1,
                    'value': 0x0,
                    'autocomplete': 'off',
                    'role': 'slider',
                    'aria-label': _0xb9b2ff.get(_0x491b4a, this.config),
                    'aria-valuemin': 0x0,
                    'aria-valuemax': 0x64,
                    'aria-valuenow': 0x0
                }, _0x5f154a));
                return this.elements.inputs[_0x491b4a] = _0x2c1832, _0x7f9f36.updateRangeFill.call(this, _0x2c1832), _0x2c1832;
            },
            'bindMenuItemShortcuts': function(_0x1830d1, _0x2770c2) {
                var _0x2c1832 = this;
                _0x1093f4(_0x1830d1, 'keydown keyup', function(_0x4bb9d6) {
                    if ([0x20, 0x26, 0x27, 0x28].includes(_0x4bb9d6.which) && (_0x4bb9d6.preventDefault(), _0x4bb9d6.stopPropagation(), 'keydown' !== _0x4bb9d6.type)) {
                        var _0x20ac7b, _0x51717d = _0x13f491(_0x1830d1, '[role="menuitemradio"]');
                        if (!_0x51717d && [0x20, 0x27].includes(_0x4bb9d6.which)) _0x7f9f36.showMenuPanel.call(_0x2c1832, _0x2770c2, true);
                        else 0x20 !== _0x4bb9d6.which && (0x28 === _0x4bb9d6.which || _0x51717d && 0x27 === _0x4bb9d6.which ? (_0x20ac7b = _0x1830d1.nextElementSibling, _0x1e2c68.element(_0x20ac7b) || (_0x20ac7b = _0x1830d1.parentNode.firstElementChild)) : (_0x20ac7b = _0x1830d1.previousElementSibling, _0x1e2c68.element(_0x20ac7b) || (_0x20ac7b = _0x1830d1.parentNode.lastElementChild)), _0x31cc23.call(_0x2c1832, _0x20ac7b, true));
                    }
                }, !0x1), _0x1093f4(_0x1830d1, 'keyup', function(_0x3844f5) {
                    0xd === _0x3844f5.which && _0x7f9f36.focusFirstMenuItem.call(_0x2c1832, null, true);
                });
            },
            'createMenuItem': function(_0x52a95b) {
                var _0x17edbf = this,
                    _0x2c1832 = _0x52a95b.value,
                    _0x231912 = _0x52a95b.list,
                    _0x57313b = _0x52a95b.type,
                    _0x19be70 = _0x52a95b.title,
                    _0x4ae558 = _0x52a95b.badge,
                    _0x34a012 = void 0x0 === _0x4ae558 ? null : _0x4ae558,
                    _0x7dbb2e = _0x52a95b.checked,
                    _0x200580 = void 0x0 !== _0x7dbb2e && _0x7dbb2e,
                    _0x4bb1a2 = _0xa949a8(this.config.selectors.inputs[_0x57313b]),
                    _0xb8fbbd = _0x428003('button', _0x5dc0c0(_0x4bb1a2, {
                        'type': 'button',
                        'role': 'menuitemradio',
                        'class': '' .concat(this.config.classNames.control, ' ').concat(_0x4bb1a2.class ? _0x4bb1a2.class : '').trim(),
                        'aria-checked': _0x200580,
                        'value': _0x2c1832
                    })),
                    _0x560073 = _0x428003('span');
                _0x560073.innerHTML = _0x19be70, _0x1e2c68.element(_0x34a012) && _0x560073.appendChild(_0x34a012), _0xb8fbbd.appendChild(_0x560073), Object.defineProperty(_0xb8fbbd, 'checked', {
                    'enumerable': true,
                    'get': function() {
                        return 'true' === _0xb8fbbd.getAttribute('aria-checked');
                    },
                    'set': function(_0x2da7f0) {
                        _0x2da7f0 && Array.from(_0xb8fbbd.parentNode.children).filter(function(_0x480c16) {
                            return _0x13f491(_0x480c16, '[role="menuitemradio"]');
                        }).forEach(function(_0x363b12) {
                            return _0x363b12.setAttribute('aria-checked', 'false');
                        }), _0xb8fbbd.setAttribute('aria-checked', _0x2da7f0 ? 'true' : 'false');
                    }
                });
                var _0x449ec7 = _0x7f9f36.getCoreOptions.call(this);
                this.listeners.bind(_0xb8fbbd, 'click keyup', function(_0x270d0d) {
                    _0x1e2c68.keyboardEvent(_0x270d0d) && 0x20 !== _0x270d0d.which || (_0x270d0d.preventDefault(), _0x270d0d.stopPropagation(), _0xb8fbbd.checked = true, Object.keys(_0x7f9f36.normalOptions).includes(_0x57313b) && _0x7f9f36.updateNormalOptions.call(_0x17edbf, _0x57313b, _0x2c1832), Object.keys(_0x449ec7).includes(_0x57313b) && (_0x449ec7[_0x57313b].netplay && _0xdcec2a.connected ? _0xdcec2a.connection.isInitiator && (_0x7f9f36.updateCoreOptions.call(_0x17edbf, _0x57313b, _0x2c1832), _0xdcec2a.connection.send(JSON.stringify({
                        'act': 'update-core-option',
                        'key': _0x57313b,
                        'value': _0x2c1832,
                        'frame': _0xdcec2a.currentFrame
                    }))) : _0x7f9f36.updateCoreOptions.call(_0x17edbf, _0x57313b, _0x2c1832)), _0x7f9f36.showMenuPanel.call(_0x17edbf, 'home', _0x1e2c68.keyboardEvent(_0x270d0d)));
                }, _0x57313b, !0x1), _0x7f9f36.bindMenuItemShortcuts.call(this, _0xb8fbbd, _0x57313b), _0x231912.appendChild(_0xb8fbbd);
            },
            'updateVolume': function() {
                _0x1e2c68.element(this.elements.inputs.volume) && _0x7f9f36.setRange.call(this, this.elements.inputs.volume, this.muted ? 0x0 : this.volume), _0x1e2c68.element(this.elements.buttons.mute) && (this.elements.buttons.mute.pressed = this.muted || 0x0 === this.volume);
            },
            'setRange': function(_0x1c075b) {
                var _0x17edbf = arguments.length > 0x1 && void 0x0 !== arguments[0x1] ? arguments[0x1] : 0x0;
                _0x1e2c68.element(_0x1c075b) && (_0x1c075b.value = _0x17edbf, _0x7f9f36.updateRangeFill.call(this, _0x1c075b));
            },
            'updateRangeFill': function(_0x2dbde1) {
                var _0x17edbf = _0x1e2c68.event(_0x2dbde1) ? _0x2dbde1.target : _0x2dbde1;
                if (_0x1e2c68.element(_0x17edbf) && 'range' === _0x17edbf.getAttribute('type')) {
                    if (_0x13f491(_0x17edbf, this.config.selectors.inputs.volume)) {
                        var _0x2c1832 = 0x64 * _0x17edbf.value;
                        _0x17edbf.setAttribute('aria-valuenow', _0x2c1832), _0x17edbf.setAttribute('aria-valuetext', '' .concat(_0x2c1832.toFixed(0x1), '%'));
                    } else _0x17edbf.setAttribute('aria-valuenow', _0x17edbf.value);
                    _0x59aa33.isWebkit && _0x17edbf.style.setProperty('--value', '' .concat(_0x17edbf.value / _0x17edbf.max * 0x64, '%'));
                }
            },
            'toggleMenuButton': function(_0x249814, _0x2948e9) {
                _0x132da7(this.elements.settings.buttons[_0x249814], !_0x2948e9);
            },
            'updateNormalOptions': function(_0x255b79, _0x505484) {
                this.elements.settings.buttons[_0x255b79].querySelector('.' .concat(this.config.classNames.menu.value)).innerHTML = _0x7f9f36.normalOptions[_0x255b79].options[_0x505484];
                var _0x2c1832 = {};
                _0x2c1832[_0x255b79] = _0x505484, _0x7f9f36.storage.set(_0x2c1832), 'shader' === _0x255b79 && _0xdcec2a.setShader(_0x505484), 'virtual-gamepad' === _0x255b79 && _0xdcec2a.toggleVirtualGamepad.call(this, 'enabled' === _0x505484);
            },
            'updateCoreOptions': function(_0x41c4ad, _0x15823e) {
                if ('nds' == this.system && !_0x2d904a.wasm) return true;
                if (_0x7f9f36.coreOptionsValues[_0x41c4ad] = _0x15823e, 'psx' === this.system && _0x27f4c4.Module.pauseMainLoop(), _0xdcec2a.setVariable(_0x41c4ad, _0x15823e), 'psx' === this.system && (setTimeout(function() {
                        _0x27f4c4.Module.resumeMainLoop();
                    }, 0x64), setTimeout(function() {
                        _0x27f4c4.Module.resumeMainLoop();
                    }, 0xc8)), 'nds' === this.system && _0x2d904a.wasm) {
                    var _0x2c1832 = this.elements.wrapper.querySelector('canvas');
                    if ('screen_rotation' === _0x41c4ad) switch (_0x2c1832.style.transform = 'rotate(' + _0x15823e + 'deg)', _0x15823e) {
                        case '0':
                            _0xdcec2a.setVariable('desmume_input_rotation', '0');
                            break;
                        case '90':
                            _0xdcec2a.setVariable('desmume_input_rotation', '270');
                            break;
                        case '180':
                            _0xdcec2a.setVariable('desmume_input_rotation', '180');
                            break;
                        case '270':
                            _0xdcec2a.setVariable('desmume_input_rotation', '90');
                    }
                }
                if ('arcade' === this.system || 'fba0.2.97.29' === this.system) {
                    var _0x567ccc = this.elements.wrapper.querySelector('canvas');
                    _0x567ccc.height = 'fba-aspect' === _0x41c4ad && 'PAR' === _0x15823e ? _0x567ccc.width / 0x10 * 0x9 : _0x567ccc.width / 0x4 * 0x3;
                }
                var _0x31bdec = _0x7f9f36.getCoreOptions.call(this),
                    _0x3efd0b = _0x7f9f36.storage.get('core-options');
                if (_0x1e2c68.empty(_0x3efd0b) && (_0x3efd0b = {}), _0x3efd0b[_0x41c4ad] = _0x15823e, _0x7f9f36.storage.set({
                        'core-options': _0x3efd0b
                    }), this.elements.settings.buttons[_0x41c4ad]) {
                    var _0xe95e6a = this.elements.settings.buttons[_0x41c4ad].querySelector('.' .concat(this.config.classNames.menu.value));
                    _0x1e2c68.object(_0x31bdec[_0x41c4ad].options) ? _0xe95e6a.innerHTML = _0x31bdec[_0x41c4ad].options[_0x15823e] : _0xe95e6a.innerHTML = _0x15823e;
                }
            },
            'setOptionMenuItem': function(_0x2f0e6a, _0x85969e) {
                var _0x2c1832 = this,
                    _0x549dac = this.elements.settings.panels.home.querySelector('[role="menu"]'),
                    _0x43777f = this.elements.settings.popup.children[0x0];
                Object.keys(_0x2f0e6a).forEach(function(_0x4fcbcf) {
                    var _0x177975 = _0x4fcbcf,
                        _0x5f3e0f = _0x428003('button', _0x5dc0c0(_0xa949a8(_0x2c1832.config.selectors.buttons.settings), {
                            'type': 'button',
                            'class': _0x449eac({
                                'ejs__control': true,
                                'ejs__control--forward': true
                            }),
                            'role': 'menuitem',
                            'item': _0x4fcbcf,
                            'aria-haspopup': true
                        }));
                    _0x1093f4(_0x5f3e0f, 'click', function() {
                        _0x7f9f36.showMenuPanel.call(_0x2c1832, _0x177975, !0x1);
                    });
                    var _0x1d5857, _0x1838f9 = _0x428003('span', null, _0x2f0e6a[_0x4fcbcf].label),
                        _0x455b20 = _0x428003('span', {
                            'class': _0x2c1832.config.classNames.menu.value
                        });
                    _0x1e2c68.object(_0x85969e) && (_0x1d5857 = _0x85969e[_0x177975]), _0x1e2c68.empty(_0x1d5857) && (_0x1d5857 = _0x2f0e6a[_0x177975].default), _0x1e2c68.object(_0x2f0e6a[_0x177975].options) ? _0x455b20.innerHTML = _0x2f0e6a[_0x177975].options[_0x1d5857] : _0x455b20.innerHTML = _0x1d5857, _0x1838f9.appendChild(_0x455b20), _0x5f3e0f.appendChild(_0x1838f9), _0x549dac.appendChild(_0x5f3e0f);
                    var _0x3f3775 = _0x428003('div', {
                            'data-pane': escape(_0x177975),
                            'hidden': ''
                        }),
                        _0x288440 = _0x428003('button', {
                            'type': 'button',
                            'class': _0x449eac({
                                'ejs__control': true,
                                'ejs__control--back': true
                            })
                        });
                    _0x288440.appendChild(_0x428003('span', {
                        'aria-hidden': true
                    }, _0x2f0e6a[_0x4fcbcf].label)), _0x288440.appendChild(_0x428003('span', {
                        'class': _0x449eac({
                            'ejs__sr-only': true
                        })
                    }, _0xb9b2ff.get('menuBack', _0x2c1832.config))), _0x1093f4(_0x3f3775, 'keydown', function(_0x462a4d) {
                        0x25 === _0x462a4d.which && (_0x462a4d.preventDefault(), _0x462a4d.stopPropagation(), _0x7f9f36.showMenuPanel.call(_0x2c1832, 'home', true));
                    }, !0x1), _0x1093f4(_0x288440, 'click', function() {
                        _0x7f9f36.showMenuPanel.call(_0x2c1832, 'home', !0x1);
                    }), _0x3f3775.appendChild(_0x288440), _0x3f3775.appendChild(_0x428003('div', {
                        'role': 'menu'
                    })), _0x43777f.appendChild(_0x3f3775), _0x2c1832.elements.settings.buttons[_0x177975] = _0x5f3e0f, _0x2c1832.elements.settings.panels[_0x177975] = _0x3f3775;
                    var _0x2c172f = _0x3f3775.querySelector('[role="menu"]');
                    ! function(_0x301c01) {
                        if (_0x1e2c68.element(_0x301c01))
                            for (var _0x85969e = _0x301c01.childNodes.length; _0x85969e > 0x0;) _0x301c01.removeChild(_0x301c01.lastChild), _0x85969e -= 0x1;
                    }(_0x2c172f), _0x1e2c68.object(_0x2f0e6a[_0x4fcbcf].options) ? Object.keys(_0x2f0e6a[_0x4fcbcf].options).forEach(function(_0x281296) {
                        _0x7f9f36.createMenuItem.call(_0x2c1832, {
                            'value': _0x281296,
                            'list': _0x2c172f,
                            'type': _0x177975,
                            'title': _0x2f0e6a[_0x4fcbcf].options[_0x281296],
                            'badge': null,
                            'checked': Boolean(_0x1d5857 === _0x281296)
                        });
                    }) : _0x1e2c68.array(_0x2f0e6a[_0x4fcbcf].options) && _0x2f0e6a[_0x4fcbcf].options.forEach(function(_0x28a341) {
                        _0x7f9f36.createMenuItem.call(_0x2c1832, {
                            'value': _0x28a341,
                            'list': _0x2c172f,
                            'type': _0x177975,
                            'title': _0x28a341,
                            'badge': null,
                            'checked': Boolean(_0x1d5857 === _0x28a341)
                        });
                    });
                });
            },
            'setNormalOptionsMenu': function() {
                var _0xa88a13 = this,
                    _0x17edbf = this,
                    _0x2c1832 = {};
                _0x2c1832.orientation = _0x7f9f36.storage.get('orientation'), _0x2c1832.shader = _0x7f9f36.storage.get('shader'), _0x17edbf.touch ? (_0x2c1832['virtual-gamepad'] = _0x7f9f36.storage.get('virtual-gamepad'), _0x1093f4.call(_0x17edbf, _0x17edbf.elements.container, 'start-game', function() {
                    ('enabled' === _0x2c1832['virtual-gamepad'] || _0x1e2c68.empty(_0x2c1832['virtual-gamepad'])) && _0xdcec2a.toggleVirtualGamepad.call(_0x17edbf, true);
                })) : delete _0x7f9f36.normalOptions['virtual-gamepad'], _0x7f9f36.setOptionMenuItem.call(this, _0x7f9f36.normalOptions, _0x2c1832), _0x1093f4.call(_0x17edbf, _0x17edbf.elements.container, 'start-game', function() {
                    var _0x2c1832 = _0xa88a13,
                        _0x42a7b1 = {};
                    _0xdcec2a.getGameCoreOptions && _0xdcec2a.getGameCoreOptions().split('\n').forEach(function(_0x4a987e, _0x10bd7a) {
                        var _0x2c1832 = _0x4a987e.split('; '),
                            _0x1ddc5f = _0x2c1832[0x0];
                        if (0x0 === _0x1ddc5f.indexOf('fba-dipswitch-')) {
                            var _0xbd808 = _0x2c1832[0x1].split('|'),
                                _0x3c4b1a = _0x1ddc5f.replace(/_/g, ' ').replace(/.+\-(.+)/, '$1');
                            _0x42a7b1[_0x1ddc5f] = {
                                'label': _0x3c4b1a,
                                'options': _0xbd808.slice(0x1, -0x1),
                                'default': _0xbd808[0x0].replace('(Default) ', ''),
                                'netplay': true
                            };
                        }
                    });
                    var _0x27d859 = _0x7f9f36.storage.get('core-options');
                    _0x7f9f36.coreOptionsValues = _0x27d859 || {}, _0x7f9f36.setOptionMenuItem.call(_0x17edbf, _0x42a7b1, _0x7f9f36.coreOptionsValues), Object.keys(_0x7f9f36.coreOptionsValues).forEach(function(_0x51fc4e, _0x4b3613) {
                        _0x7f9f36.updateCoreOptions.call(_0x2c1832, _0x51fc4e, _0x7f9f36.coreOptionsValues[_0x51fc4e]);
                    }), 'nds' == _0x17edbf.system && (_0x27f4c4.Module._fast_forward_2 ? _0x27f4c4.Module._fast_forward_2(0x1) : _0x27f4c4.Module._fast_forward && _0x27f4c4.Module._fast_forward(0x1));
                });
            },
            'updateCoreOptionMenuItems': function() {
                var _0xa88a13 = this.elements.settings.panels.home.querySelector('[role="menu"]'),
                    _0x17edbf = _0x7f9f36.getCoreOptions.call(this);
                _0xdcec2a.connected && !_0xdcec2a.connection.isInitiator ? Object.keys(_0x17edbf).forEach(function(_0x480587) {
                    _0x17edbf[_0x480587].netplay && _0xa88a13.querySelector('[item="' .concat(_0x480587, '"]')).setAttribute('disabled', '');
                }) : Object.keys(_0x17edbf).forEach(function(_0x20e093) {
                    _0xa88a13.querySelector('[item="' .concat(_0x20e093, '"]')).removeAttribute('disabled');
                });
            },
            'setCoreOptionsMenu': function() {
                this.elements.settings.panels.home.querySelector('[role="menu"]'), this.elements.settings.popup.children[0x0];
                var _0xa88a13 = _0x7f9f36.getCoreOptions.call(this),
                    _0x17edbf = _0x7f9f36.storage.get('core-options');
                _0x7f9f36.coreOptionsValues = _0x17edbf || {}, _0x7f9f36.setOptionMenuItem.call(this, _0xa88a13, _0x17edbf);
            },
            'checkMenu': function() {
                var _0xa88a13 = this.elements.settings.buttons;
                !_0x1e2c68.empty(_0xa88a13) && Object.values(_0xa88a13).some(function(_0x200331) {
                    return !_0x200331.hidden;
                });
                _0x132da7(this.elements.settings.menu, !0x1);
            },
            'focusFirstMenuItem': function(_0x303d68) {
                var _0x17edbf = arguments.length > 0x1 && void 0x0 !== arguments[0x1] && arguments[0x1];
                if (!this.elements.settings.popup.hidden) {
                    var _0x2c1832 = _0x303d68;
                    _0x1e2c68.element(_0x2c1832) || (_0x2c1832 = Object.values(this.elements.settings.panels).find(function(_0xe94c5e) {
                        return !_0xe94c5e.hidden;
                    }));
                    var _0x2f3a13 = _0x2c1832.querySelector('[role^="menuitem"]');
                    _0x31cc23.call(this, _0x2f3a13, _0x17edbf);
                }
            },
            'toggleMenu': function(_0x28d6c6) {
                var _0x17edbf = this.elements.settings.popup,
                    _0x2c1832 = this.elements.buttons.settings;
                if (_0x1e2c68.element(_0x17edbf) && _0x1e2c68.element(_0x2c1832)) {
                    var _0x614270 = _0x17edbf.hidden,
                        _0x14f1b5 = _0x614270;
                    if (_0x1e2c68.boolean(_0x28d6c6)) _0x14f1b5 = _0x28d6c6;
                    else if (_0x1e2c68.keyboardEvent(_0x28d6c6) && 0x1b === _0x28d6c6.which) _0x14f1b5 = !0x1;
                    else if (_0x1e2c68.event(_0x28d6c6)) {
                        var _0xcf75ac = _0x17edbf.contains(_0x28d6c6.target);
                        if (_0xcf75ac || !_0xcf75ac && _0x28d6c6.target !== _0x2c1832 && _0x14f1b5) return;
                    }
                    _0x2c1832.setAttribute('aria-expanded', _0x14f1b5);
                    _0x132da7(_0x17edbf, !_0x14f1b5);
                    _0x3a8e2f(this.elements.container, this.config.classNames.menu.open, _0x14f1b5);
                    _0x14f1b5 && _0x1e2c68.keyboardEvent(_0x28d6c6) ? _0x7f9f36.focusFirstMenuItem.call(this, null, true) : _0x14f1b5 || _0x614270 || _0x31cc23.call(this, _0x2c1832, _0x1e2c68.keyboardEvent(_0x28d6c6));
                }
            },
            'getMenuSize': function(_0x55fe13) {
                var _0x17edbf = _0x55fe13.cloneNode(true);
                _0x17edbf.style.position = 'absolute';
                _0x17edbf.style.opacity = 0;
                _0x17edbf.removeAttribute('hidden');
                _0x55fe13.parentNode.appendChild(_0x17edbf);
                var _0x2c1832 = _0x17edbf.scrollWidth,
                    _0x5edd1b = _0x17edbf.scrollHeight;
                return _0x12a55d(_0x17edbf), {
                    'width': _0x2c1832,
                    'height': _0x5edd1b
                };
            },
            'showLoadStatePanel': function() {},
            'showMenuPanel': function() {
                var _0xa88a13 = this,
                    _0x17edbf = arguments.length > 0x0 && void 0x0 !== arguments[0x0] ? arguments[0x0] : '',
                    _0x2c1832 = arguments.length > 0x1 && void 0x0 !== arguments[0x1] && arguments[0x1],
                    _0x7f4281 = _0x530042.call(this, '[data-pane="' .concat(escape(_0x17edbf), '"]'));
                if (_0x1e2c68.element(_0x7f4281)) {
                    var _0x3d6729 = _0x7f4281.parentNode,
                        _0x381f57 = Array.from(_0x3d6729.children).find(function(_0x57c652) {
                            return !_0x57c652.hidden;
                        });
                    if (_0x2d904a.transitions && !_0x2d904a.reducedMotion) {
                        _0x3d6729.style.width = '' .concat(_0x381f57.scrollWidth, 'px');
                        _0x3d6729.style.height = '' .concat(_0x381f57.scrollHeight, 'px');
                        var _0x29dd37 = _0x7f9f36.getMenuSize.call(this, _0x7f4281),
                            _0x37447f = function _0x17edbf(_0x40854f) {
                                _0x40854f.target === _0x3d6729 && ['width', 'height'].includes(_0x40854f.propertyName) && (_0x3d6729.style.width = '', _0x3d6729.style.height = '', _0x20109b.call(_0xa88a13, _0x3d6729, _0x5a2767, _0x17edbf));
                            };
                        _0x1093f4.call(this, _0x3d6729, _0x5a2767, _0x37447f), _0x3d6729.style.width = '' .concat(_0x29dd37.width, 'px'), _0x3d6729.style.height = '' .concat(_0x29dd37.height, 'px');
                    }
                    _0x132da7(_0x381f57, true);
                    _0x132da7(_0x7f4281, false);
                    _0x7f9f36.focusFirstMenuItem.call(this, _0x7f4281, _0x2c1832);
                }
            },
            'setLoadState': function(_0x526828, _0x2ce330) {
                _0x526828.appendChild(_0x7f9f36.createButton.call(this, 'load-state', {
                    'aria-haspopup': true,
                    'aria-expanded': !0x1
                }));
                var _0x2c1832 = _0x428003('div', {
                        'class': _0x449eac({
                            'ejs__dialog': true,
                            'ejs__load-state__container': true
                        }),
                        'hidden': ''
                    }),
                    _0x2e5e96 = _0x428003('div');
                _0x2c1832.appendChild(_0x2e5e96);
                _0x530042.call(this, '.' .concat(_0x449eac({
                    'ejs__dialogs': true
                }))).appendChild(_0x2c1832);
                this.elements.dialogs.loadState = _0x2c1832;
            },
            'setScreenRecord': function(_0x4c3fdd, _0x289259) {
                if (! window.MediaRecorder) {
                    return;
                };
                var _0x2c1832 = _0x7f9f36.createButton.call(this, 'screen-record', {
                    'aria-haspopup': true,
                    'aria-expanded': !0x1,
                    'style': 'margin-right:auto;'
                });
                _0x4c3fdd.appendChild(_0x2c1832);
                var _0x13c0e4 = _0x428003('div', {
                        'class': _0x449eac({
                            'ejs__dialog': true,
                            'ejs__screenRecord__container': true
                        }),
                        'hidden': ''
                    }),
                    _0xe2c02a = _0x428003('div');
                _0x13c0e4.appendChild(_0xe2c02a);
                _0x530042.call(this, '.' .concat(_0x449eac({
                    'ejs__dialogs': true
                }))).appendChild(_0x13c0e4);
                this.elements.dialogs.screenRecord = _0x13c0e4;
            },
            'setGamepad': function(_0x4c3fdd, _0x289259) {
                var _0x2c1832 = _0x7f9f36.createButton.call(this, 'gamepad', {
                    'aria-haspopup': true,
                    'aria-expanded': !0x1,
                    'style': 'margin-right:auto;'
                });
                _0x4c3fdd.appendChild(_0x2c1832);
                var _0x13c0e4 = _0x428003('div', {
                        'class': _0x449eac({
                            'ejs__dialog': true,
                            'ejs__gamepad__container': true
                        }),
                        'hidden': ''
                    }),
                    _0xe2c02a = _0x428003('div');
                _0x13c0e4.appendChild(_0xe2c02a);
                _0x530042.call(this, '.' .concat(_0x449eac({
                    'ejs__dialogs': true
                }))).appendChild(_0x13c0e4);
                this.elements.dialogs.gamepad = _0x13c0e4;
            },
            'setCheat': function(_0x328075, _0x21ca37) {
                var _0x2c1832 = _0x7f9f36.createButton.call(this, 'cheat', {
                    'aria-haspopup': true,
                    'aria-expanded': !0x1,
                    'style': 'margin-right:auto;'
                });
                _0x328075.appendChild(_0x2c1832);
                var _0x173db3 = _0x428003('div', {
                        'class': _0x449eac({
                            'ejs__dialog': true,
                            'ejs__cheat__container': true
                        }),
                        'hidden': ''
                    }),
                    _0x460961 = _0x428003('div');
                _0x173db3.appendChild(_0x460961);
                _0x530042.call(this, '.' .concat(_0x449eac({
                    'ejs__dialogs': true
                }))).appendChild(_0x173db3);
                this.elements.dialogs.cheat = _0x173db3;
            },
            'setStateInfoBarWidget': function() {
                var _0xa88a13 = _0x428003('div', {
                        'class': _0x449eac({
                            'ejs__widget': true
                        })
                    }),
                    _0x17edbf = _0x428003('div');
                _0x17edbf.style = 'color: red;font-size: 17px;padding:10px;text-align:left;text-shadow:1px 1px 1px #000'
                _0xa88a13.appendChild(_0x17edbf);
                _0x530042.call(this, '.' .concat(_0x449eac({
                    'ejs__widgets': true
                }))).appendChild(_0xa88a13);
                this.elements.widgets.stateInfo = _0xa88a13;
                this.elements.widgets.stateInfoDiv = _0x17edbf;
            },
            'setNetplayWidgets': function() {
                var _0xa88a13 = _0x428003('div', {
                        'class': _0x449eac({
                            'ejs__widget': true,
                            'ejs__widget_netplay': true
                        })
                    }),
                    _0x17edbf = _0x428003('div');
                _0xa88a13.appendChild(_0x17edbf);
                _0x530042.call(this, '.' .concat(_0x449eac({
                    'ejs__widgets': true
                }))).appendChild(_0xa88a13);
                this.elements.widgets.netplay = _0xa88a13;
            },
            'setNetplay': function(_0x1859f4, _0x50544d) {
                _0x1859f4.appendChild(_0x7f9f36.createButton.call(this, 'netplay', {
                    'aria-haspopup': true,
                    'aria-expanded': !0x1
                }));
                var _0x2c1832 = _0x428003('div', {
                        'class': _0x449eac({
                            'ejs__dialog': true,
                            'ejs__netplay__container': true
                        }),
                        'hidden': ''
                    }),
                    _0x4f63e0 = _0x428003('div');
                _0x2c1832.appendChild(_0x4f63e0);
                _0x530042.call(this, '.' .concat(_0x449eac({
                    'ejs__dialogs': true
                }))).appendChild(_0x2c1832);
                this.elements.dialogs.netplay = _0x2c1832;
                _0x7f9f36.setNetplayWidgets.call(this);
            },
            'toggleContextMenu': function(_0x24b1f3, _0x4b9d55) {
                if (_0x350d73(_0x24b1f3.target, _0x449eac({
                        'ejs__dialogs': true
                    }))) {
                    var _0x2c1832 = _0x7f9f36.contextMenu.timer;
                    if (this.started) {
                        var _0x2a1dda = _0x530042.call(this, '.' .concat(_0x449eac({
                            'ejs__contextmenu': true
                        }), ' ul'));
                        if (_0x4b9d55) {
                            _0x7f9f36.contextMenu.style.display = 'block', _0x7f9f36.contextMenu.style.left = '' .concat(_0x24b1f3.layerX, 'px'), _0x7f9f36.contextMenu.style.top = '' .concat(_0x24b1f3.layerY, 'px');
                            var _0x1b48e7 = _0x23ffa1.call(this, '.' .concat(_0x449eac({
                                'ejs__contextmenu': true
                            }), ' ul li'));
                            if (Array.from(_0x1b48e7).forEach(function(_0x228a1f, _0x123a07) {}), null === _0x2a1dda.getAttribute('menu')) {
                                var _0x14264d = _0x428003('li', {});
                                _0x14264d.appendChild(_0x428003('a', {
                                    'target': '_blank',
                                    'href': 'https://github.com/ethanaobrien/emulatorjs'
                                }, 'EmulatorJS v' .concat(this.version))), _0x2a1dda.appendChild(_0x14264d), _0x2a1dda.setAttribute('menu', '');
                            }
                            _0x2c1832 && clearTimeout(_0x2c1832), _0x2c1832 = setTimeout(function() {}, 0xfa0), _0x7f9f36.contextMenu.timer = _0x2c1832;
                        } else _0x7f9f36.contextMenu.style.display = 'none';
                    }
                }
            },
            'create': function(_0x42e40d) {
                var _0xa88a13 = this;
                _0x7f9f36.storage = new _0x2f61ba(this, 'ejs_' .concat(this.system, '_settings'));
                var _0x17edbf = _0x428003('div', _0xa949a8(this.config.selectors.controls.wrapper));
                _0x7f9f36.contextMenu = _0x428003('div', {
                    'class': _0x449eac({
                        'ejs__contextmenu': true
                    }),
                    'style': 'position: absolute; display:none;z-index:9'
                })
                var contextHtml = ['<ul>', '</ul>']
                var contextFunctions = []
                function addContextHtml(title, hidden, functi0n) {
                    if (typeof functi0n == 'function') {
                        contextFunctions.push(functi0n)
                    } else {
                        contextFunctions.push(function(){})
                    }
                    var i = contextHtml.length - 1
                    if (hidden) {
                        contextHtml.splice(i, 0, '<li hidden><a href="#" onclick="return false">'+title+'</a></li>')
                    } else {
                        contextHtml.splice(i, 0, '<li><a href="#" onclick="return false">'+title+'</a></li>')
                    }
                }
                addContextHtml(_0xa88a13.localization('Take Screenshot'), false, function(_0x20faaa) {
                    var _0x4e898a = _0x378b5c.getScreenData();
                    if (typeof _0xa88a13.gameName == 'string') {
                       var gamep = _0xa88a13.gameName
                    }
                    var gamepng = gamep ? '' .concat(gamep, '-screenshot.png') : 'game.png';
                    _0x4e4ca6()(new Blob([_0x4e898a]), gamepng);
                    return false;
                })
                addContextHtml(_0xa88a13.localization('Cache Manage'), true, function(_0x275730) {
                    if (_0x27f4c4.romdb) {
                        _0x132da7(_0xa88a13.elements.dialogs.cache, !0x1);
                        var _0x3360eb = _0xa88a13.elements.dialogs.cache.querySelector('.' .concat(_0x378b5c.classNames['dialog-content']));
                        _0x3360eb.innerHTML = '<div>'+_0xa88a13.localization('Loading')+'</div>', _0x27f4c4.romdb.getAll(function(_0x43586d) {
                            if (_0x43586d) {
                                var _0x275730 = _0x428003('table', {
                                    'style': 'width:100%;padding-left:10px;text-align:left'
                                }),
                                    _0x1ab9e9 = _0x428003('tbody');
                                _0x43586d.length > 0x0 ? (_0x3360eb.innerHTML = '', _0x43586d.forEach(function(_0x32b0b7, _0x2d0e11) {
                                    if (_0x32b0b7.key && !/-part-\d+$/ .test(_0x32b0b7.key)) {
                                        for (var _0x3360eb = Math.ceil(_0x32b0b7.filesize / 0x6400000), _0x277c67 = [_0x32b0b7.key], _0x3edb35 = 0x1; _0x3edb35 < _0x3360eb; _0x3edb35 += 0x1) _0x277c67.push('' .concat(_0x32b0b7.key, '-part-').concat(_0x3edb35));
                                        var _0x3e31f6 = _0x428003('tr'),
                                            _0x5b75bd = _0x428003('td'),
                                            _0x227405 = _0x428003('td'),
                                            _0xac150b = _0x428003('td');
                                        _0x5b75bd.innerHTML = _0x32b0b7.filename, _0x227405.innerHTML = function(_0x1858c1) {
                                            var _0x2d0e11 = -0x1;
                                            do {
                                                _0x1858c1 /= 0x400, _0x2d0e11++;
                                            } while (_0x1858c1 > 0x400);
                                            return Math.max(_0x1858c1, 0.1).toFixed(0x1) + [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'][_0x2d0e11];
                                        }(_0x32b0b7.filesize), _0xac150b.innerHTML = '<a href="#" onclick="return false">Remove</a>', _0x3e31f6.appendChild(_0x5b75bd), _0x3e31f6.appendChild(_0x227405), _0x3e31f6.appendChild(_0xac150b), _0x1ab9e9.appendChild(_0x3e31f6), _0xac150b.querySelector('a').onclick = function(_0x16f22a) {
                                            _0x27f4c4.romdb.removeBatch(_0x277c67);
                                            try {
                                                _0x1ab9e9.removeChild(_0x3e31f6);
                                            } catch (_0x353628) {}
                                            return _0x16f22a.stopPropagation(), !0x1;
                                        };
                                    }
                                }), _0x275730.appendChild(_0x1ab9e9), _0x3360eb.appendChild(_0x275730)) : _0x3360eb.innerHTML = '<div style="text-align:center">'+_0xa88a13.localization('Empty')+'</div>';
                            } else _0x3360eb.innerHTML = '<div style="text-align:center">'+_0xa88a13.localization('Empty')+'</div>';
                        }, function() {});
                    }
                    return false;
                })
                addContextHtml(_0xa88a13.localization('Quick Save')+' (F2)', false, function(_0x395c73) {
                    _0x378b5c.quickSaveState();
                    _0x2593da.contextMenu.style.display = 'none';
                })
                addContextHtml(_0xa88a13.localization('Quick Load')+' (F4)', false, function(_0x124f69) {
                    _0x378b5c.quickLoadState();
                    _0x2593da.contextMenu.style.display = 'none';
                })
                
                
                _0x7f9f36.contextMenu.innerHTML = contextHtml.join('')
                var a = _0x7f9f36.contextMenu.getElementsByTagName('li')
                for (var i=0; i<a.length; i++) {
                    _0x1093f4.call(_0xa88a13, a[i], 'click', contextFunctions[i])
                }
                this.elements.container.appendChild(_0x7f9f36.contextMenu);
                
                
                var _0x2c1832 = _0x428003('div', {
                    'class': _0x449eac({
                        'ejs__dialog': true,
                        'ejs__cache__container': true
                    }),
                    'hidden': ''
                });
                _0x530042.call(this, '.' .concat(_0x449eac({
                    'ejs__dialogs': true
                }))).appendChild(_0x2c1832), this.elements.dialogs.cache = _0x2c1832;
                var _0x3c66db = _0x428003('div', {
                    'class': _0x449eac({
                        'ejs__dialog': true,
                        'ejs__loading__container': true
                    }),
                    'hidden': ''
                });
                _0x530042.call(this, '.' .concat(_0x449eac({
                    'ejs__dialogs': true
                }))).appendChild(_0x3c66db);
                this.elements.dialogs.loading = _0x3c66db;
                _0x17edbf.appendChild(_0x7f9f36.createButton.call(this, 'restart'));
                _0x17edbf.appendChild(_0x7f9f36.createButton.call(this, 'play'));
                _0x17edbf.appendChild(_0x7f9f36.createButton.call(this, 'save-state', {
                    'aria-expanded': !0x1
                }));
                _0x7f9f36.setLoadState.call(this, _0x17edbf, _0x42e40d);
                _0x7f9f36.setScreenRecord.call(this, _0x17edbf, _0x42e40d);
                _0x7f9f36.supportNetPlay.call(this, _0x17edbf) && parseInt(this.config.gameId, 0xa) > 0x0 && _0x7f9f36.setNetplay.call(this, _0x17edbf, _0x42e40d);
                _0x7f9f36.setGamepad.call(this, _0x17edbf, _0x42e40d);
                _0x7f9f36.setStateInfoBarWidget.call(this, _0x17edbf, _0x42e40d);
                _0x7f9f36.setCheat.call(this, _0x17edbf, _0x42e40d);
                _0x17edbf.appendChild(_0x428003('span', {
                    'style': 'flex:1'
                }));
                var _0xd299b = _0x428003('div', {
                    'class': _0x449eac({
                        'ejs__volume': true
                    })
                });
                _0xd299b.appendChild(_0x7f9f36.createButton.call(this, 'mute'));
                var _0x4bbcd0 = {
                    'max': 0x1,
                    'step': 0.01,
                    'value': this.config.volume
                };
                _0xd299b.appendChild(_0x7f9f36.createRange.call(this, 'volume', _0x5dc0c0(_0x4bbcd0, {}))), this.elements.volume = _0xd299b, _0x17edbf.appendChild(_0xd299b);
                var _0x2746ab = _0x428003('div', {
                    'class': _0x449eac({
                        'ejs__menu': true
                    })
                });
                _0x2746ab.appendChild(_0x7f9f36.createButton.call(this, 'settings', {
                    'aria-haspopup': true,
                    'aria-expanded': !0x1
                }));
                var _0x262fb8 = _0x428003('div', {
                        'class': _0x449eac({
                            'ejs__menu__container': true
                        }),
                        'hidden': ''
                    }),
                    _0x3f3385 = _0x428003('div'),
                    _0x174c46 = _0x428003('div', {
                        'data-pane': 'home'
                    }),
                    _0x17f3cb = _0x428003('div', {
                        'role': 'menu'
                    });
                _0x174c46.appendChild(_0x17f3cb)
                _0x3f3385.appendChild(_0x174c46)
                this.elements.settings.panels.home = _0x174c46
                _0x262fb8.appendChild(_0x3f3385)
                _0x2746ab.appendChild(_0x262fb8)
                _0x17edbf.appendChild(_0x2746ab)
                this.elements.settings.popup = _0x262fb8
                this.elements.settings.menu = _0x2746ab
                _0x17edbf.appendChild(_0x7f9f36.createButton.call(this, 'fullscreen'))
                var _0x19edbf = this;
                _0x17edbf.addEventListener('mousedown', function() {
                    _0x19edbf.onButtonDiv = true;
                })
                this.elements.controls = _0x17edbf
                _0x7f9f36.setNormalOptionsMenu.call(this)
                _0x7f9f36.setCoreOptionsMenu.call(this)
                return _0x17edbf;
            },
            'inject': function() {
                var _0xa88a13 = this;
                this.icons = {
                    'enter-fullscreen': '<path d="M10 3h3.6l-4 4L11 8.4l4-4V8h2V1h-7zM7 9.6l-4 4V10H1v7h7v-2H4.4l4-4z"/>',
                    'exit-fullscreen': '<path d="M1 12h3.6l-4 4L2 17.4l4-4V17h2v-7H1zM16 .6l-4 4V1h-2v7h7V6h-3.6l4-4z"/>',
                    'gamepad': '<svg viewBox="0 0 640 512"><path fill="currentColor" d="M480 96H160C71.6 96 0 167.6 0 256s71.6 160 160 160c44.8 0 85.2-18.4 114.2-48h91.5c29 29.6 69.5 48 114.2 48 88.4 0 160-71.6 160-160S568.4 96 480 96zM256 276c0 6.6-5.4 12-12 12h-52v52c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-52H76c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h52v-52c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h52c6.6 0 12 5.4 12 12v40zm184 68c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-80c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"/></svg>',
                    'load-state': '<svg viewBox="0 0 576 512"><path fill="currentColor" d="M572.694 292.093L500.27 416.248A63.997 63.997 0 0 1 444.989 448H45.025c-18.523 0-30.064-20.093-20.731-36.093l72.424-124.155A64 64 0 0 1 152 256h399.964c18.523 0 30.064 20.093 20.73 36.093zM152 224h328v-48c0-26.51-21.49-48-48-48H272l-64-64H48C21.49 64 0 85.49 0 112v278.046l69.077-118.418C86.214 242.25 117.989 224 152 224z"/></svg>',
                    'muted': '<path d="M12.4 12.5l2.1-2.1 2.1 2.1 1.4-1.4L15.9 9 18 6.9l-1.4-1.4-2.1 2.1-2.1-2.1L11 6.9 13.1 9 11 11.1zM3.786 6.008H.714C.286 6.008 0 6.31 0 6.76v4.512c0 .452.286.752.714.752h3.072l4.071 3.858c.5.3 1.143 0 1.143-.602V2.752c0-.601-.643-.977-1.143-.601L3.786 6.008z"/>',
                    'netplay': '<svg viewBox="0 0 512 512"><path fill="currentColor" d="M364.215 192h131.43c5.439 20.419 8.354 41.868 8.354 64s-2.915 43.581-8.354 64h-131.43c5.154-43.049 4.939-86.746 0-128zM185.214 352c10.678 53.68 33.173 112.514 70.125 151.992.221.001.44.008.661.008s.44-.008.661-.008c37.012-39.543 59.467-98.414 70.125-151.992H185.214zm174.13-192h125.385C452.802 84.024 384.128 27.305 300.95 12.075c30.238 43.12 48.821 96.332 58.394 147.925zm-27.35 32H180.006c-5.339 41.914-5.345 86.037 0 128h151.989c5.339-41.915 5.345-86.037-.001-128zM152.656 352H27.271c31.926 75.976 100.6 132.695 183.778 147.925-30.246-43.136-48.823-96.35-58.393-147.925zm206.688 0c-9.575 51.605-28.163 104.814-58.394 147.925 83.178-15.23 151.852-71.949 183.778-147.925H359.344zm-32.558-192c-10.678-53.68-33.174-112.514-70.125-151.992-.221 0-.44-.008-.661-.008s-.44.008-.661.008C218.327 47.551 195.872 106.422 185.214 160h141.572zM16.355 192C10.915 212.419 8 233.868 8 256s2.915 43.581 8.355 64h131.43c-4.939-41.254-5.154-84.951 0-128H16.355zm136.301-32c9.575-51.602 28.161-104.81 58.394-147.925C127.872 27.305 59.198 84.024 27.271 160h125.385z"/></svg>',
                    'pause': '<path d="M6 1H3c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h3c.6 0 1-.4 1-1V2c0-.6-.4-1-1-1zM12 1c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h3c.6 0 1-.4 1-1V2c0-.6-.4-1-1-1h-3z"/>',
                    'play': '<path d="M15.562 8.1L3.87.225C3.052-.337 2 .225 2 1.125v15.75c0 .9 1.052 1.462 1.87.9L15.563 9.9c.584-.45.584-1.35 0-1.8z"/>',
                    'restart': '<path d="M9.7 1.2l.7 6.4 2.1-2.1c1.9 1.9 1.9 5.1 0 7-.9 1-2.2 1.5-3.5 1.5-1.3 0-2.6-.5-3.5-1.5-1.9-1.9-1.9-5.1 0-7 .6-.6 1.4-1.1 2.3-1.3l-.6-1.9C6 2.6 4.9 3.2 4 4.1 1.3 6.8 1.3 11.2 4 14c1.3 1.3 3.1 2 4.9 2 1.9 0 3.6-.7 4.9-2 2.7-2.7 2.7-7.1 0-9.9L16 1.9l-6.3-.7z"/>',
                    'save-state': '<svg viewBox="0 0 448 512"><path fill="currentColor" d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z"/></svg>',
                    'screen-record': '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px",viewBox="0 0 39.989 39.989" style="enable-background:new 0 0 39.989 39.989;" xml:space="preserve"><path id="XMLID_155_" d="M19.994,0C8.952,0,0,8.952,0,19.995c0,11.043,8.952,19.994,19.994,19.994s19.995-8.952,19.995-19.994,C39.989,8.952,31.037,0,19.994,0z M19.994,27.745c-4.28,0-7.75-3.47-7.75-7.75s3.47-7.75,7.75-7.75s7.75,3.47,7.75,7.75,S24.275,27.745,19.994,27.745z"/></svg>',
                    'settings': '<path d="M16.135 7.784a2 2 0 0 1-1.23-2.969c.322-.536.225-.998-.094-1.316l-.31-.31c-.318-.318-.78-.415-1.316-.094a2 2 0 0 1-2.969-1.23C10.065 1.258 9.669 1 9.219 1h-.438c-.45 0-.845.258-.997.865a2 2 0 0 1-2.969 1.23c-.536-.322-.999-.225-1.317.093l-.31.31c-.318.318-.415.781-.093 1.317a2 2 0 0 1-1.23 2.969C1.26 7.935 1 8.33 1 8.781v.438c0 .45.258.845.865.997a2 2 0 0 1 1.23 2.969c-.322.536-.225.998.094 1.316l.31.31c.319.319.782.415 1.316.094a2 2 0 0 1 2.969 1.23c.151.607.547.865.997.865h.438c.45 0 .845-.258.997-.865a2 2 0 0 1 2.969-1.23c.535.321.997.225 1.316-.094l.31-.31c.318-.318.415-.781.094-1.316a2 2 0 0 1 1.23-2.969c.607-.151.865-.547.865-.997v-.438c0-.451-.26-.846-.865-.997zM9 12a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>',
                    'volume': '<path d="M15.5999996,3.3 C15.1999996,2.9 14.5999996,2.9 14.1999996,3.3 C13.7999996,3.7 13.7999996,4.3 14.1999996,4.7 C15.3999996,5.9 15.9999996,7.4 15.9999996,9 C15.9999996,10.6 15.3999996,12.1 14.1999996,13.3 C13.7999996,13.7 13.7999996,14.3 14.1999996,14.7 C14.3999996,14.9 14.6999996,15 14.8999996,15 C15.1999996,15 15.3999996,14.9 15.5999996,14.7 C17.0999996,13.2 17.9999996,11.2 17.9999996,9 C17.9999996,6.8 17.0999996,4.8 15.5999996,3.3 L15.5999996,3.3 Z"></path>\n            <path d="M11.2819745,5.28197449 C10.9060085,5.65794047 10.9060085,6.22188944 11.2819745,6.59785542 C12.0171538,7.33303477 12.2772954,8.05605449 12.2772954,9.00000021 C12.2772954,9.93588462 11.851678,10.9172014 11.2819745,11.4869049 C10.9060085,11.8628709 10.9060085,12.4268199 11.2819745,12.8027859 C11.4271642,12.9479755 11.9176724,13.0649528 12.2998149,12.9592565 C12.4124479,12.9281035 12.5156669,12.8776063 12.5978555,12.8027859 C13.773371,11.732654 14.1311161,10.1597914 14.1312523,9.00000021 C14.1312723,8.8299555 14.1286311,8.66015647 14.119665,8.4897429 C14.0674781,7.49784946 13.8010171,6.48513613 12.5978554,5.28197449 C12.2218894,4.9060085 11.6579405,4.9060085 11.2819745,5.28197449 Z"></path>\n            <path d="M3.78571429,6.00820648 L0.714285714,6.00820648 C0.285714286,6.00820648 0,6.30901277 0,6.76022222 L0,11.2723167 C0,11.7235261 0.285714286,12.0243324 0.714285714,12.0243324 L3.78571429,12.0243324 L7.85714286,15.8819922 C8.35714286,16.1827985 9,15.8819922 9,15.2803796 L9,2.75215925 C9,2.15054666 8.35714286,1.77453879 7.85714286,2.15054666 L3.78571429,6.00820648 Z"></path>',
                    'cheat': '<svg viewBox="0 0 496 512"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm4 72.6c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.7-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.1-8.4-25.3-7.1-33.8 3.1z" class=""></path></svg>'
                }, this.id = Math.floor(0x2710 * Math.random());
                var _0x17edbf = null;
                this.elements.controls = null;
                var _0x2c1832 = {
                        'id': this.id
                    },
                    _0x270a9e = true;
                _0x1e2c68.function(this.config.controls) && (this.config.controls = this.config.controls.call(this.props)), this.config.controls || (this.config.controls = []), _0x1e2c68.element(this.config.controls) || _0x1e2c68.string(this.config.controls) ? _0x17edbf = this.config.controls : (_0x17edbf = _0x7f9f36.create.call(this, {
                    'id': this.id,
                    'seektime': this.config.seekTime,
                    'speed': this.speed,
                    'quality': this.quality
                }), _0x270a9e = !0x1);
                var _0x1e6644, _0x3ec218 = function(_0x406126) {
                    var _0x17edbf = _0x406126;
                    return Object.entries(_0x2c1832).forEach(function(_0x3e992c) {
                        var _0x2c1832 = _0x5005e6(_0x3e992c, 0x2),
                            _0x47c2ec = _0x2c1832[0x0],
                            _0x547588 = _0x2c1832[0x1];
                        _0x17edbf = _0x1a0e98(_0x17edbf, '{' .concat(_0x47c2ec, '}'), _0x547588);
                    }), _0x17edbf;
                };
                if (_0x270a9e && (_0x1e2c68.string(this.config.controls) ? _0x17edbf = _0x3ec218(_0x17edbf) : _0x1e2c68.element(_0x17edbf) && (_0x17edbf.innerHTML = _0x3ec218(_0x17edbf.innerHTML))), _0x1e2c68.string(this.config.selectors.controls.container) && (_0x1e6644 = document.querySelector(this.config.selectors.controls.container)), _0x1e2c68.element(_0x1e6644) || (_0x1e6644 = this.elements.container), _0x1e6644[_0x1e2c68.element(_0x17edbf) ? 'insertAdjacentElement' : 'insertAdjacentHTML']('afterbegin', _0x17edbf), _0x1e2c68.element(this.elements.controls) || _0x7f9f36.findElements.call(this), !_0x1e2c68.empty(this.elements.buttons)) {
                    var _0xe8272c = function(_0x176a3e) {
                        var _0x2c1832 = _0xa88a13.config.classNames.controlPressed;
                        Object.defineProperty(_0x176a3e, 'pressed', {
                            'enumerable': true,
                            'get': function() {
                                return _0x350d73(_0x176a3e, _0x2c1832);
                            },
                            'set': function() {
                                var _0xa88a13 = arguments.length > 0x0 && void 0x0 !== arguments[0x0] && arguments[0x0];
                                _0x3a8e2f(_0x176a3e, _0x2c1832, _0xa88a13);
                            }
                        });
                    };
                    Object.values(this.elements.buttons).filter(Boolean).forEach(function(_0x577b9b) {
                        _0x1e2c68.array(_0x577b9b) || _0x1e2c68.nodeList(_0x577b9b) ? Array.from(_0x577b9b).filter(Boolean).forEach(_0xe8272c) : _0xe8272c(_0x577b9b);
                    });
                }
                window.navigator.userAgent.includes('Edge') && _0x2b30e0(_0x1e6644);
            }
        },
        _0x2593da = _0x7f9f36;

    function _0x28bdca(_0x5c50c3, _0x217698) {
        for (var _0x2c1832 = 0x0; _0x2c1832 < _0x217698.length; _0x2c1832++) {
            var _0x172cdb = _0x217698[_0x2c1832];
            _0x172cdb.enumerable = _0x172cdb.enumerable || !0x1, _0x172cdb.configurable = true, 'value' in _0x172cdb && (_0x172cdb.writable = true), Object.defineProperty(_0x5c50c3, _0x172cdb.key, _0x172cdb);
        }
    }

    function _0x238270() {
        if (this.enabled) {
            var _0xa88a13 = this.player.elements.buttons.fullscreen;
            _0x1e2c68.element(_0xa88a13) && (_0xa88a13.pressed = this.active), _0xbae705.call(this.player, this.target, this.active ? 'enterfullscreen' : 'exitfullscreen', true), _0x59aa33.isIos || _0x5e0c7d.call(this.player, this.target, this.active);
        }
    }

    function _0x3c983f() {
        var _0xa88a13 = arguments.length > 0x0 && void 0x0 !== arguments[0x0] && arguments[0x0];
        _0xa88a13 ? this.scrollPosition = {
            'x': window.scrollX || 0x0,
            'y': window.scrollY || 0x0
        } : window.scrollTo(this.scrollPosition.x, this.scrollPosition.y), document.body.style.overflow = _0xa88a13 ? 'hidden' : '', _0x3a8e2f(this.target, this.player.config.classNames.fullscreen.fallback, _0xa88a13), _0x238270.call(this);
    }
    var _0x335854 = function() {
        function _0x1339df(_0x5f19c6) {
            var _0x2c1832 = this;
            ! function(_0x143a8a, _0x32a0a1) {
                if (!(_0x143a8a instanceof _0x32a0a1)) throw new TypeError('Cannot call a class as a function');
            }(this, _0x1339df), this.player = _0x5f19c6, this.prefix = _0x1339df.prefix, this.property = _0x1339df.property, this.scrollPosition = {
                'x': 0x0,
                'y': 0x0
            }, _0x1093f4.call(this.player, document, 'ms' === this.prefix ? 'MSFullscreenChange' : '' .concat(this.prefix, 'fullscreenchange'), function() {
                _0x238270.call(_0x2c1832);
            }), this.update();
        }
        
        var _0x17edbf, _0x2c1832, _0x50d347;
        
        _0x17edbf = _0x1339df
        
        _0x50d347 = [{
            'key': 'native',
            'get': function() {
                return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled);
            }
        }, {
            'key': 'prefix',
            'get': function() {
                if (_0x1e2c68.function(document.exitFullscreen)) return '';
                var _0x1339df = '';
                return ['webkit', 'moz', 'ms'].some(function(_0xc1e0c3) {
                    return !(!_0x1e2c68.function(document['' .concat(_0xc1e0c3, 'ExitFullscreen')]) && !_0x1e2c68.function(document['' .concat(_0xc1e0c3, 'CancelFullScreen')]) || (_0x1339df = _0xc1e0c3, 0x0));
                }), _0x1339df;
            }
        }, {
            'key': 'property',
            'get': function() {
                return 'moz' === this.prefix ? 'FullScreen' : 'Fullscreen';
            }
        }]
        
        _0x2c1832 = [{
            'key': 'update',
            'value': function() {
                this.enabled, _0x3a8e2f(this.player.elements.container, this.player.config.classNames.fullscreen.enabled, this.enabled);
            }
        }, {
            'key': 'enter',
            'value': function() {
                this.enabled && (_0x1339df.native ? this.prefix ? _0x1e2c68.empty(this.prefix) || this.target['' .concat(this.prefix, 'Request').concat(this.property)]() : this.target.requestFullscreen() : _0x3c983f.call(this, true));
            }
        }, {
            'key': 'exit',
            'value': function() {
                if (this.enabled)
                    if (_0x1339df.native)
                        if (this.prefix) {
                            if (!_0x1e2c68.empty(this.prefix)) {
                                var _0x17edbf = 'moz' === this.prefix ? 'Cancel' : 'Exit';
                                document['' .concat(this.prefix).concat(_0x17edbf).concat(this.property)]();
                            }
                        } else(document.cancelFullScreen || document.exitFullscreen).call(document);
                else _0x3c983f.call(this, !0x1);
            }
        }, {
            'key': 'toggle',
            'value': function() {
                this.active ? this.exit() : this.enter();
            }
        }, {
            'key': 'enabled',
            'get': function() {
                return _0x1339df.native;
            }
        }, {
            'key': 'active',
            'get': function() {
                return !!this.enabled && (_0x1339df.native ? (this.prefix ? document['' .concat(this.prefix).concat(this.property, 'Element')] : document.fullscreenElement) === this.target : _0x350d73(this.target, this.player.config.classNames.fullscreen.fallback));
            }
        }, {
            'key': 'target',
            'get': function() {
                return _0x59aa33.isEdge ? this.player.game : this.player.elements.container;
            }
        }]
        
        _0x28bdca(_0x17edbf.prototype, _0x2c1832)
        _0x50d347 && _0x28bdca(_0x17edbf, _0x50d347)
        return _0x1339df;
        
    }();

    function _0x42b437(_0x458e02, _0x5729e1) {
        if (Array.isArray(_0x458e02)) return _0x458e02;
        var _0x2c1832 = [],
            _0x2e7aa7 = true,
            _0x393a5f = false,
            _0x3b4eca = void 0x0;
        try {
            for (var _0x1aca09, _0x1bb8de = _0x458e02[Symbol.iterator](); !(_0x2e7aa7 = (_0x1aca09 = _0x1bb8de.next()).done) && (_0x2c1832.push(_0x1aca09.value), !_0x5729e1 || _0x2c1832.length !== _0x5729e1); _0x2e7aa7 = true);
        } catch (_0x190997) {
            _0x393a5f = true, _0x3b4eca = _0x190997;
        } finally {
            try {
                _0x2e7aa7 || null == _0x1bb8de.return || _0x1bb8de.return();
            } finally {
                if (_0x393a5f) throw _0x3b4eca;
            }
        }
        return _0x2c1832;
        throw new TypeError('Invalid attempt to destructure non-iterable instance');
    }
    var _0x37093c = function() {
        function _0x31e271(_0x948a97) {
            ! function(_0x3adedc, _0x5952e9) {
                if (!(_0x3adedc instanceof _0x5952e9)) throw new TypeError('Cannot call a class as a function');
            }(this, _0x31e271), this.emulator = _0x948a97, this.lastKey = null, this.focusTimer = null, this.lastKeyDown = null, this.toggleMenu = this.toggleMenu.bind(this), this.setTabFocus = this.setTabFocus.bind(this), this.firstTouch = this.firstTouch.bind(this);
        }
        _0x31e271.prototype = {
            toggleMenu: function(_0x3156ad) {
                _0x2593da.toggleMenu.call(this.emulator, _0x3156ad);
            },
            firstTouch: function() {
                var _0x31e271 = this.emulator,
                    _0x17edbf = _0x31e271.elements;
                _0x31e271.touch = true, _0x3a8e2f(_0x17edbf.container, _0x31e271.config.classNames.isTouch, true);
            },
            setTabFocus: function(_0x20bf1f) {
                var _0x17edbf = this.emulator,
                    _0x2c1832 = _0x17edbf.elements,
                    _0x48d087 = _0x17edbf;
                if (clearTimeout(this.focusTimer), 'keydown' !== _0x20bf1f.type || 0x9 === _0x20bf1f.which) {
                    'keydown' === _0x20bf1f.type && (this.lastKeyDown = _0x20bf1f.timeStamp);
                    var _0x27d4ad, _0x967a30 = _0x20bf1f.timeStamp - this.lastKeyDown <= 0x14;
                    ('focus' !== _0x20bf1f.type || _0x967a30) && (_0x27d4ad = _0x48d087.config.classNames.tabFocus, _0x3a8e2f(_0x23ffa1.call(_0x48d087, '.' .concat(_0x27d4ad)), _0x27d4ad, !0x1), this.focusTimer = setTimeout(function() {
                        var _0x20bf1f = document.activeElement;
                        _0x2c1832.container.contains(_0x20bf1f) && _0x3a8e2f(document.activeElement, _0x48d087.config.classNames.tabFocus, true);
                    }, 0xa));
                }
            },
            global: function() {
                var _0x31e271 = !(arguments.length > 0x0 && void 0x0 !== arguments[0x0]) || arguments[0x0],
                    _0x17edbf = this.emulator,
                    _0x2c1832 = _0x17edbf;
                _0x1ef215.call(_0x2c1832, document.body, 'click', this.toggleMenu, _0x31e271), _0x455c85.call(_0x2c1832, document.body, 'touchstart', this.firstTouch), _0x1ef215.call(_0x2c1832, document.body, 'keydown focus blur', this.setTabFocus, _0x31e271, !0x1, true), _0x1093f4.call(_0x2c1832, document.body, 'keyup', function(_0x4e289a) {
                    _0x2c1832.started && (0x71 === _0x4e289a.which && (_0x4e289a.shiftKey ? null === _0x2c1832.elements.buttons.saveState.getAttribute('hidden') && _0xbae705.call(_0x2c1832, _0x2c1832.elements.buttons.saveState, 'click') : _0xdcec2a.quickSaveState()), 0x73 === _0x4e289a.which && (_0x4e289a.shiftKey ? null === _0x2c1832.elements.buttons.loadState.getAttribute('hidden') && _0xbae705.call(_0x2c1832, _0x2c1832.elements.buttons.loadState, 'click') : _0xdcec2a.quickLoadState()), 0x78 === _0x4e289a.which && _0xbae705.call(_0x2c1832, _0x2c1832.elements.buttons.mute, 'click'));
                });
            },
            container: function() {
                var _0x31e271, _0x17edbf = this.emulator,
                    _0x2c1832 = _0x17edbf.elements,
                    _0x45d275 = _0x17edbf,
                    setFullscreenInterval = null;
                _0x1093f4.call(_0x45d275, _0x2c1832.container, 'mousemove mouseleave touchstart touchmove enterfullscreen exitfullscreen start-game', function(_0x1ac81c) {
                    var _0x3953b5 = _0x2c1832.controls;
                    _0x3953b5 && 'enterfullscreen' === _0x1ac81c.type && (_0x3953b5.pressed = !0x1, _0x3953b5.hover = !0x1);
                    var _0x2c3de3 = 0x0;
                    if (['touchstart', 'touchmove', 'mousemove', 'start-game'].includes(_0x1ac81c.type)) {
                        if (_0x17edbf.system == 'nds' && _0x1ac81c.type == 'mousemove' && _0x27f4c4 && _0x27f4c4.Module && _0x27f4c4.Module.canvas && (document.pointerLockElement === _0x27f4c4.Module.canvas || document.mozPointerLockElement === _0x27f4c4.Module.canvas)) {
                            _0x5ab74d.toggleControls.call(_0x45d275, false);
                            return;
                        }
                        if (_0xdcec2a && (_0xdcec2a.virtualGamepadContainer == 'undefined' || _0xdcec2a.virtualGamepadContainer === null)) {
                            _0x5ab74d.toggleControls.call(_0x45d275, true);
                            _0x2c3de3 = _0x45d275.touch ? 0xbb8 : 0x7d0;
                            clearTimeout(_0x31e271);
                            _0x31e271 = setTimeout(function() {
                                return _0x5ab74d.toggleControls.call(_0x45d275, !0x1);
                            }, _0x2c3de3);
                            _0x2c1832.controls.setAttribute('data-timer', _0x31e271);
                        }
                    };
                }), _0x1093f4.call(_0x45d275, window, 'resize', function(_0x3e2cc5) {
                    var _0x17edbf = _0x45d275.elements.container.clientHeight,
                        _0x2c1832 = _0x23ffa1.call(_0x45d275, '.' .concat(_0x449eac({
                            'ejs__menu__container': true
                        }), ' [role="menu"]'));
                    Array.from(_0x2c1832).forEach(function(_0x43a16d) {
                        _0x43a16d.style.maxHeight = '' .concat(_0x17edbf - 0x5f, 'px'), _0x43a16d.style.overflow = 'auto';
                    }), _0x27f4c4.Module && _0x27f4c4.Module.canvas, _0x45d275.elements.container.clientWidth / _0x45d275.elements.container.clientHeight < 1.3 ? _0x3a8e2f(_0x45d275.elements.container, _0x449eac({
                        'portrait': true
                    }), true) : _0x3a8e2f(_0x45d275.elements.container, _0x449eac({
                        'portrait': true
                    }), !0x1);
                }), _0xbae705.call(_0x45d275, window, 'resize'), _0x1093f4.call(_0x45d275, _0x45d275.elements.container, 'enterfullscreen', function(_0x586586) {
                    if (_0x45d275.coreVer === 2 && _0x27f4c4.Module) {
                        var repeat = 50;
                        clearInterval(setFullscreenInterval);
                        setFullscreenInterval = setInterval(function() {
                            _0x27f4c4.Module.setCanvasSize(window.innerWidth, window.innerHeight);
                            if (repeat < 0) {
                                clearInterval(setFullscreenInterval);
                            }
                            repeat--;
                        }, 100)
                    }
                    setTimeout(function() {
                        _0xbae705.call(_0x45d275, window, 'resize');
                    }, 0x12c);
                }), _0x1093f4.call(_0x45d275, _0x45d275.elements.container, 'exitfullscreen', function(_0x4de2f3) {
                    if (_0x45d275.coreVer === 2 && _0x27f4c4.Module) {
                        clearInterval(setFullscreenInterval);
                        _0x27f4c4.Module.setCanvasSize(800, 600);
                    }
                    setTimeout(function() {
                        _0xbae705.call(_0x45d275, window, 'resize');
                    }, 0x12c);
                }), _0x1093f4.call(_0x45d275, _0x45d275.elements.container, 'start-game', function(_0x5b0a00) {
                    var _0x17edbf = window.document.createEvent('UIEvents');
                    _0x17edbf.initUIEvent('resize', true, !0x1, window, 0x0), window.dispatchEvent(_0x17edbf), _0x3a8e2f(_0x45d275.elements.container, _0x449eac({
                        'game-started': true
                    }), true);
                }), _0x1093f4.call(_0x45d275, _0x45d275.elements.container, 'blur', function(_0x893c7a) {
                    var _0x17edbf = _0x893c7a.currentTarget;
                    setTimeout(function() {
                        _0x17edbf.contains(document.activeElement) || _0xbae705.call(_0x45d275, _0x45d275.elements, 'blurgame');
                    }, 0x0);
                }), _0x1093f4.call(_0x45d275, _0x45d275.elements.container, 'focus', function(_0xe0dee3) {
                    var _0x17edbf = _0xe0dee3.currentTarget;
                    setTimeout(function() {
                        _0x17edbf.contains(document.activeElement) && _0xbae705.call(_0x45d275, _0x45d275.elements, 'focusgame');
                    }, 0x0);
                });
            },
            media: function() {
                var _0x31e271 = this.emulator,
                    _0x17edbf = _0x31e271.elements,
                    _0x2c1832 = _0x31e271;
                _0x1093f4.call(_0x2c1832, _0x2c1832.game, 'volumechange', function(_0x3099fe) {
                    return _0x2593da.updateVolume.call(_0x2c1832, _0x3099fe);
                }), _0x1093f4.call(_0x2c1832, _0x17edbf.container, 'contextmenu', function(_0x5c22bc) {
                    _0x2c1832.touch || _0x2c1832.lightgun || _0x2593da.toggleContextMenu.call(_0x2c1832, _0x5c22bc, true), _0x5c22bc.preventDefault();
                }, !0x1), _0x1093f4.call(_0x2c1832, _0x17edbf.container, 'mousewheel', function(_0x49c974) {
                    _0x49c974.stopPropagation();
                }, !0x1), _0x1093f4.call(_0x2c1832, _0x17edbf.container, 'mousedown', function(_0x53ee35) {
                    if (_0x31e271.system == 'nds' && _0x27f4c4 && _0x27f4c4.Module && _0x27f4c4.Module.canvas && ! _0x27f4c4.isMobileDevice && !(document.pointerLockElement === _0x27f4c4.Module.canvas || document.mozPointerLockElement === _0x27f4c4.Module.canvas) && _0x31e271.started && !_0x31e271.connected) {
                        setTimeout(function() {
                            if (_0x31e271.onButtonDiv !== true) {
                                _0x27f4c4.Module.canvas.requestPointerLock = _0x27f4c4.Module.canvas.requestPointerLock || _0x27f4c4.Module.canvas.mozRequestPointerLock;
                                _0x27f4c4.Module.canvas.requestPointerLock()
                            }
                            _0x31e271.onButtonDiv = false
                        }, 100)
                    }
                    _0x2c1832.touch || _0x2593da.toggleContextMenu.call(_0x2c1832, _0x53ee35, !0x1);
                }, !0x1), _0x1093f4.call(_0x2c1832, _0x2c1832.game, 'volumechange', function() {
                    _0x2c1832.storage.set({
                        'volume': _0x2c1832.volume,
                        'muted': _0x2c1832.muted
                    }), _0xdcec2a.setVolume && _0xdcec2a.setVolume();
                });
                var _0x38e17f = _0x2c1832.config.events.concat(['keyup', 'keydown']).join(' ');
                _0x1093f4.call(_0x2c1832, _0x2c1832.game, _0x38e17f, function(_0x38e438) {
                    var _0x2b4804 = _0x38e438.detail,
                        _0x1bfeb2 = void 0x0 === _0x2b4804 ? {} : _0x2b4804;
                    'error' === _0x38e438.type && (_0x1bfeb2 = _0x2c1832.game.error), _0xbae705.call(_0x2c1832, _0x17edbf.container, _0x38e438.type, true, _0x1bfeb2);
                });
            },
            proxy: function(_0x52d0c2, _0x500f90, _0x175ce5) {
                var _0x4bb44e = this.emulator,
                    _0x584a64 = _0x4bb44e.config.listeners[_0x175ce5],
                    _0x5269fd = true;
                _0x1e2c68.function(_0x584a64) && (_0x5269fd = _0x584a64.call(_0x4bb44e, _0x52d0c2)), _0x5269fd && _0x1e2c68.function(_0x500f90) && _0x500f90.call(_0x4bb44e, _0x52d0c2);
            },
            bind: function(_0x4a8d46, _0x8f91ad, _0x2affda, _0x41dfb1) {
                var _0x1363b1 = this,
                    _0x53b9a1 = !(arguments.length > 0x4 && void 0x0 !== arguments[0x4]) || arguments[0x4],
                    _0x5209a5 = this.emulator,
                    _0x27b738 = _0x5209a5,
                    _0x5d89ff = _0x27b738.config.listeners[_0x41dfb1],
                    _0x100c9f = _0x1e2c68.function(_0x5d89ff);
                _0x1093f4.call(_0x27b738, _0x4a8d46, _0x8f91ad, function(_0x5a03ac) {
                    return _0x1363b1.proxy(_0x5a03ac, _0x2affda, _0x41dfb1);
                }, _0x53b9a1 && !_0x100c9f);
            },
            controls: function() {
                var _0x31e271 = this,
                    _0x17edbf = this.emulator,
                    _0x2c1832 = _0x17edbf.elements,
                    _0x127f22 = _0x59aa33.isIE ? 'change' : 'input';
                if (this.bind(_0x2c1832.buttons.mute, 'click', function() {
                        _0x17edbf.muted = !_0x17edbf.muted;
                    }, 'mute'), this.bind(_0x2c1832.buttons.fullscreen, 'click', function() {
                        _0x17edbf.fullscreen.toggle();
                    }, 'fullscreen'), this.bind(_0x2c1832.buttons.gamepad, 'click', function() {
                        _0x5ab74d.toggleControls.call(_0x17edbf, !0x1), _0x132da7(_0x2c1832.dialogs.gamepad, !0x1);
                    }, 'mute'), this.bind(_0x2c1832.buttons.saveState, 'click', function() {
                        _0xbae705.call(_0x17edbf, _0x17edbf.elements.container, 'savestate-start', !0x1, {});
                        var _0x31e271 = _0xdcec2a.saveState(),
                            _0x2c1832 = _0xdcec2a.getScreenData();
                        _0xbae705.call(_0x17edbf, _0x17edbf.elements.container, 'savestate', !0x1, {
                            'state': _0x31e271,
                            'screenshot': _0x2c1832
                        });
                    }, 'mute'), this.bind(_0x2c1832.buttons.loadState, 'click', function() {
                        _0xbae705.call(_0x17edbf, _0x17edbf.elements.container, 'loadstate', !0x1, {});
                    }, 'mute'), this.bind(_0x2c1832.buttons.settings, 'click', function(_0x1396ee) {
                        _0x1396ee.stopPropagation(), _0x2593da.toggleMenu.call(_0x17edbf, _0x1396ee);
                    }), this.bind(_0x2c1832.buttons.settings, 'keyup', function(_0x454936) {
                        var _0x2c1832 = _0x454936.which;
                        [0xd, 0x20].includes(_0x2c1832) && (0xd !== _0x2c1832 ? (_0x454936.preventDefault(), _0x454936.stopPropagation(), _0x2593da.toggleMenu.call(_0x17edbf, _0x454936)) : _0x2593da.focusFirstMenuItem.call(_0x17edbf, null, true));
                    }, null, !0x1), this.bind(_0x2c1832.settings.menu, 'keydown', function(_0x40072c) {
                        0x1b === _0x40072c.which && _0x2593da.toggleMenu.call(_0x17edbf, _0x40072c);
                    }), _0x59aa33.isIos) {
                    var _0x4bd188 = _0x23ffa1.call(_0x17edbf, 'input[type="range"]');
                    Array.from(_0x4bd188).forEach(function(_0x345e4c) {
                        return _0x31e271.bind(_0x345e4c, _0x127f22, function(_0x58e6a9) {
                            return _0x2b30e0(_0x58e6a9.target);
                        });
                    });
                }
                _0x59aa33.isWebkit && Array.from(_0x23ffa1.call(_0x17edbf, 'input[type="range"]')).forEach(function(_0x45c503) {
                    _0x31e271.bind(_0x45c503, 'input', function(_0x436691) {
                        return _0x2593da.updateRangeFill.call(_0x17edbf, _0x436691.target);
                    });
                }), this.bind(_0x2c1832.inputs.volume, _0x127f22, function(_0x42307e) {
                    _0x17edbf.volume = _0x42307e.target.value;
                }, 'volume'), this.bind(_0x2c1832.controls, 'mouseenter mouseleave', function(_0x10170b) {
                    'mouseleave' === _0x10170b.type && null === _0x10170b.toElement ? _0x2c1832.controls.hover = true : _0x2c1832.controls.hover = !_0x17edbf.touch && 'mouseenter' === _0x10170b.type;
                }), this.bind(_0x2c1832.controls, 'mousedown mouseup touchstart touchend touchcancel', function(_0x4bfb22) {
                    if (['mousedown', 'touchstart'].includes(_0x4bfb22.type)) {
                        _0x2c1832.controls.pressed = true;
                        var _0x17edbf = _0x2c1832.controls.getAttribute('data-timer2');
                        clearTimeout(_0x17edbf);
                    } else {
                        var _0x29ba04 = setTimeout(function() {
                            _0x2c1832.controls.pressed = !0x1;
                        }, 0xfa0);
                        _0x2c1832.controls.setAttribute('data-timer2', _0x29ba04);
                    }
                }), this.bind(_0x2c1832.controls, 'focusin focusout', function(_0x54e607) {
                    var _0x466a37 = _0x17edbf.config,
                        _0x2ab6f3 = _0x17edbf.elements,
                        _0x5f0669 = 'focusin' === _0x54e607.type,
                        _0x11de96 = _0x2ab6f3.controls.getAttribute('data-timer');
                    if (_0x3a8e2f(_0x2ab6f3.controls, _0x466a37.classNames.noTransition, _0x5f0669), _0x5ab74d.toggleControls.call(_0x17edbf, _0x5f0669), _0x5f0669) {
                        setTimeout(function() {
                            _0x3a8e2f(_0x2ab6f3.controls, _0x466a37.classNames.noTransition, !0x1);
                        }, 0x0);
                        var _0x314d11 = _0x31e271.touch ? 0xbb8 : 0xfa0;
                        clearTimeout(_0x11de96), _0x11de96 = setTimeout(function() {
                            return _0x5ab74d.toggleControls.call(_0x17edbf, !0x1);
                        }, _0x314d11), _0x2ab6f3.controls.setAttribute('data-timer', _0x11de96);
                    }
                }), this.bind(_0x2c1832.inputs.volume, 'wheel', function(_0x28b2d2) {
                    var _0x2c1832 = _0x28b2d2.webkitDirectionInvertedFromDevice,
                        _0x12883c = _0x42b437([_0x28b2d2.deltaX, -_0x28b2d2.deltaY].map(function(_0x1ce956) {
                            return _0x2c1832 ? -_0x1ce956 : _0x1ce956;
                        }), 0x2),
                        _0x247794 = _0x12883c[0x0],
                        _0x5dcee2 = _0x12883c[0x1],
                        _0x5691ae = Math.sign(Math.abs(_0x247794) > Math.abs(_0x5dcee2) ? _0x247794 : _0x5dcee2);
                    _0x17edbf.increaseVolume(_0x5691ae / 0x32);
                    var _0x47df17 = _0x17edbf.game.volume;
                    (0x1 === _0x5691ae && _0x47df17 < 0x1 || -0x1 === _0x5691ae && _0x47df17 > 0x0) && _0x28b2d2.preventDefault();
                }, 'volume', !0x1), this.bind(_0x2c1832.controls, 'contextmenu', function(_0x1db0c5) {
                    _0x1db0c5.stopPropagation();
                }), this.bind(_0x2c1832.contextMenu, 'contextmenu', function(_0x37851d) {
                    _0x37851d.stopPropagation();
                });
            }
            
        }
        return _0x31e271;
    }();

    function _0x1a3a6c(_0x5a5a15, _0x4e2d69) {
        for (var _0x2c1832 = 0x0; _0x2c1832 < _0x4e2d69.length; _0x2c1832++) {
            var _0x2e1c57 = _0x4e2d69[_0x2c1832];
            _0x2e1c57.enumerable = _0x2e1c57.enumerable || false, _0x2e1c57.configurable = true, 'value' in _0x2e1c57 && (_0x2e1c57.writable = true), Object.defineProperty(_0x5a5a15, _0x2e1c57.key, _0x2e1c57);
        }
    }
    var _0x3dbc76 = function() {
        function _0x6954aa(_0x28cce1, _0x2ba0e6) {
            var _0x5938bc = this;
            var _0x2136bc = function(path, isDirectory) {
                var finpath = window.location.pathname.split('/').pop();
                var finalpath = window.location.pathname.substring(0, window.location.pathname.length - finpath.length);
                var split3 = finalpath.split('/')
                var split2 = path.split('/')
                var split1 = [ ]
                for (var i=0; i<split3.length; i++) {
                    if (split3[i] != '') {
                        split1.push(split3[i])
                    }
                }
                if (! path.startsWith('/') && path.split('://').length == 1 && path.split('http:').length == 1 && path.split('https:').length == 1 && path.split('file:').length == 1 && path.split('blob:').length == 1) {
                    for (var w=0; w<split2.length; w++) {
                        if (split2[w] == '' || split2[w] == '.') {
                        } else if (split2[w] == '..') {
                            if (split1.length > 0) {
                                var split1 = function(origpath) {
                                    var fullrequestpath = origpath
                                    var finpath = fullrequestpath.split('/').pop()
                                    var finalpath = fullrequestpath.substring(0, fullrequestpath.length - finpath.length)
                                    if (origpath == '/') {
                                        return '/'
                                    } else {
                                        return finalpath
                                    }
                                }(split1.join('/')).split('/');
                            }
                        } else {
                            split1.push(split2[w]);
                        }
                    }
                    var path = split1.join('/')
                    if (! path.startsWith('/')) {
                        var path = '/' + path;
                    }
                    path = window.location.protocol + '//' + window.location.host + path;
                }
                if (path.startsWith('/')) {
                    path = window.location.protocol + '//' + window.location.host + path;
                }
                if (! path.endsWith('/') && isDirectory) {
                    path = path + '/';
                }
                return path
            }
            var a = function(_0x154660, _0x15626f) {
                if (!(_0x154660 instanceof _0x15626f)) throw new TypeError('Cannot call a class as a function');
            }(this, _0x6954aa);
            this.version = '1.1.2';
            this.system = '';
            this.adUrl = null;
            this.gameName = null;
            this.loadStateOnStart = false;
            this.statesSupported = true;
            this.mameCore = null;
            this.startOnLoad = false;
            this.dataPath = '';
            this.customPaths = null;
            this.hash = '';
            this.lightgun = false;
            this.mouse = false;
            this.multitap = false;
            this.ready = false;
            this.paused = true;
            this.started = false;
            this.touch = _0x2d904a.touch;
            this.game = _0x28cce1;
            _0x1e2c68.string(this.game) && (this.game = document.querySelectorAll(this.game));
            (window.jQuery && this.game instanceof jQuery || _0x1e2c68.nodeList(this.game) || _0x1e2c68.array(this.game)) && (this.game = this.game[0x0]);
            this.game = this.game;
            this.game.innerHTML = '';
            this.config = _0x5dc0c0({}, _0x39ca5e, _0x6954aa.defaults, _0x2ba0e6 || {});
            this.coreVer = function(core, useBeta) {
                /*if (['dos'].includes(core)) {
                    return 2;
                }*/
                if (useBeta === true) {
                    if (window.WebAssembly) {
                        var supportedCores = ['nes', 'snes', 'gb', 'nds'];
                        return supportedCores.includes(core) ? 2 : 1;
                    }
                }
                return 1;
            }(this.config.system, this.config.useBeta); // 2 = beta cores, 1 = old cores
            this.lightgun = this.config.lightgun;
            this.loadStateOnStart = this.config.loadStateOnStart || false;
            this.adUrl = this.config.adUrl || null;
            this.gameName = this.config.gameName || null;
            this.mouse = this.config.mouse;
            this.multitap = this.config.multitap;
            this.cheats = this.config.cheats;
            this.cheats || (this.cheats = []);
            var u = function(a, b) {
                if (typeof b === 'string') {
                    return b;
                } else if (a === true) {
                    return 'https://ws.emulatorjs.com/'
                } else {
                    return 'https://emuserver.emulatorjs.ga/';
                }
            }(this.config.oldNetplayServer, this.config.netplayUrl);
            this.listUrl = u;
            this.socketUrl = u;
            this.mameCore = this.config.mameCore || null;
            this.color = this.config.color;
            this.startOnLoad = this.config.startOnLoad || false;
            this.statesSupported = this.config.statesSupported || true;
            this.customPaths = function(paths) {
                if (! paths) return {};
                var newPaths = {};
                for (var k in paths) {
                    if (typeof paths[k] == 'string') {
                        newPaths[k] = _0x2136bc(paths[k]);
                    }
                }
                return newPaths;
            }(this.config.paths);
            this.dataPath = function(path) {
                if (typeof path != 'string') {
                    return function(origpath) {
                        var fullrequestpath = origpath
                        var finpath = fullrequestpath.split('/').pop()
                        var finalpath = fullrequestpath.substring(0, fullrequestpath.length - finpath.length)
                        if (origpath == '/') {
                            return window.location.protocol + '//' + window.location.host + '/';
                        } else {
                            if (finalpath.startsWith('/')) {
                                finalpath = window.location.protocol + '//' + window.location.host + finalpath;
                            }
                            if (! finalpath.endsWith('/')) {
                                finalpath = finalpath + '/';
                            }
                            return finalpath
                        }
                    }(window.location.href);
                }
                return _0x2136bc(path, true);
            }(this.config.dataPath);
            (async function(dataPath, customPath, lang) {
                var localJson = {};
                if (lang && typeof lang == 'string' && lang !== 'en-US') {
                    var url = (customPath && typeof customPath[lang+'.json'] == 'string') ? customPath[lang+'.json'] : dataPath+'localization/'+lang+'.json';
                    try {
                        var res = await fetch(url);
                        var text = await res.text();
                        var localJson = JSON.parse(text);
                        _0x39ca5e.i18n = localJson.i18n;
                        _0x7f9f36.normalOptions = localJson.normalOptions;
                    } catch(e) {
                        console.warn('error setting localization', e);
                    }
                }
                return function(engText) {
                    return (typeof localJson[engText] == 'string') ? localJson[engText] : engText;
                }
            }(this.dataPath, this.customPaths, this.config.lang)).then(function(a) {
                this.localization = a;
                this.config = _0x5dc0c0({}, _0x39ca5e, _0x6954aa.defaults, _0x2ba0e6 || {});
                Object.keys(this.config.classNames).forEach(function(_0x1d6b41) {
                    var _0x28cce1 = _0x5938bc;
                    if (_0x1e2c68.object(_0x28cce1.config.classNames[_0x1d6b41])) Object.keys(_0x28cce1.config.classNames[_0x1d6b41]).forEach(function(_0x42f7f2) {
                        var _0x2ba0e6 = {};
                        _0x2ba0e6[_0x5938bc.config.classNames[_0x1d6b41][_0x42f7f2]] = true, _0x5938bc.config.classNames[_0x1d6b41][_0x42f7f2] = _0x449eac(_0x2ba0e6);
                    });
                    else {
                        var _0x2ba0e6 = {};
                        _0x2ba0e6[_0x5938bc.config.classNames[_0x1d6b41]] = true, _0x5938bc.config.classNames[_0x1d6b41] = _0x449eac(_0x2ba0e6);
                    }
                });
                this.config.selectors.controls.wrapper = '.' .concat(_0x449eac({
                    'ejs__controls': true
                }));
                this.config.selectors.container = '.' .concat(_0x449eac({
                    'ejs': true
                }));
                this.system = this.config.system;
                this.elements = {
                    'container': null,
                    'buttons': {},
                    'display': {},
                    'inputs': {},
                    'settings': {
                        'popup': null,
                        'menu': null,
                        'panels': {},
                        'buttons': {}
                    },
                    'dialogs': {
                        'gamepad': null,
                        'loading': null,
                        'netplay': null
                    },
                    'widgets': {}
                };
                this.fullscreen = {
                    'active': false
                }
                if (this.game.emulator) console.warn('Target already setup');
                else {
                    this.config.mute = true;
                    this.eventListeners = [];
                    this.listeners = new _0x37093c(this);
                    this.storage = new _0x2f61ba(this, 'ejs_settings');
                    this.game.emulator = this;
                    _0x1e2c68.element(this.elements.container) || (this.elements.container = _0x428003('div'), _0x580edd(this.game, this.elements.container));
                    var _0x5e63f0 = _0x428003('div', {
                        'class': _0x449eac({
                            'ejs__widgets': true
                        })
                    });
                    this.elements.container.appendChild(_0x5e63f0);
                    var _0x32c8af = _0x428003('div', {
                        'class': _0x449eac({
                            'ejs__dialogs': true
                        })
                    });
                    this.elements.container.appendChild(_0x32c8af);
                    _0x5ab74d.addStyleHook.call(this);
                    _0xdcec2a.setup.call(this);
                    _0x5ab74d.build.call(this);
                    this.listeners.container();
                    this.listeners.global();
                    this.fullscreen = new _0x335854(this);
                    _0x27f4c4.create.call(this);
                    var _0x446e06 = document.createElement('script');
                    _0x446e06.src = (this.customPaths && typeof this.customPaths['webrtc-adapter.js'] == 'string') ? this.customPaths['webrtc-adapter.js'] : (this.dataPath + 'webrtc-adapter.js');
                    document.body.appendChild(_0x446e06);
                }
            }.bind(this))
        }
        var _0x17edbf, _0x2c1832, _0x423c42;
        _0x17edbf = _0x6954aa, _0x423c42 = [{
            'key': 'setup',
            'value': function(_0x3bb461) {
                var _0x2c1832 = arguments.length > 0x1 && void 0x0 !== arguments[0x1] ? arguments[0x1] : {},
                    _0x3eda14 = null;
                return _0x1e2c68.string(_0x3bb461) ? _0x3eda14 = Array.from(document.querySelectorAll(_0x3bb461)) : _0x1e2c68.nodeList(_0x3bb461) ? _0x3eda14 = Array.from(_0x3bb461) : _0x1e2c68.array(_0x3bb461) && (_0x3eda14 = _0x3bb461.filter(_0x1e2c68.element)), _0x1e2c68.empty(_0x3eda14) ? null : _0x3eda14.map(function(_0x176f95) {
                    return new _0x6954aa(_0x176f95, _0x2c1832);
                });
            }
        }], (_0x2c1832 = [{
            'key': 'restart',
            'value': function() {
                this.currentTime = 0x0;
            }
        }, {
            'key': 'increaseVolume',
            'value': function(_0x2881c7) {
                var _0x17edbf = this.game.muted ? 0x0 : this.volume;
                this.volume = _0x17edbf + (_0x1e2c68.number(_0x2881c7) ? _0x2881c7 : 0x0);
            }
        }, {
            'key': 'decreaseVolume',
            'value': function(_0x492b2e) {
                this.increaseVolume(-_0x492b2e);
            }
        }, {
            'key': 'toggleControls',
            'value': function(_0x1c82b4) {
                if (this.started) {
                    var _0x17edbf = void 0x0 === _0x1c82b4 ? void 0x0 : !_0x1c82b4,
                        _0x2c1832 = _0x3a8e2f(this.elements.container, this.config.classNames.hideControls, _0x17edbf);
                    return _0x2c1832 && _0x2593da.toggleMenu.call(this, !0x1), !_0x2c1832;
                }
                return !0x1;
            }
        }, {
            'key': 'setStatesSupported',
            'value': function(newValue) {
                this.statesSupported = newValue;
            }
        }, {
            'key': 'loadState',
            'value': function(_0x3c6414) {
                _0xdcec2a.loadState(_0x3c6414, 0x0);
            }
        }, {
            'key': 'on',
            'value': function(_0x44ca1b, _0x2e6552) {
                _0x1093f4.call(this, this.elements.container, _0x44ca1b, _0x2e6552);
            }
        }, {
            'key': 'once',
            'value': function(_0x9f0e03, _0x44b98a) {
                _0x455c85.call(this, this.elements.container, _0x9f0e03, _0x44b98a);
            }
        }, {
            'key': 'off',
            'value': function(_0x343615, _0x2023ff) {
                _0x20109b(this.elements.container, _0x343615, _0x2023ff);
            }
        }, {
            'key': 'playing',
            'set': function() {
                var _0x6954aa = !(arguments.length > 0x0 && void 0x0 !== arguments[0x0]) || arguments[0x0];
                Array.from(this.elements.buttons.play || []).forEach(function(_0x4a27d3) {
                    _0x4a27d3.pressed = _0x6954aa;
                }), this.paused = !_0x6954aa;
            },
            'get': function() {
                return Boolean(this.ready && !this.paused);
            }
        }, {
            'key': 'volume',
            'set': function(_0x52441c) {
                var _0x17edbf = _0x52441c;
                _0x1e2c68.string(_0x17edbf) && (_0x17edbf = Number(_0x17edbf)), _0x1e2c68.number(_0x17edbf) || (_0x17edbf = this.storage.get('volume')), _0x1e2c68.number(_0x17edbf) || (_0x17edbf = this.config.volume), _0x17edbf > 0x1 && (_0x17edbf = 0x1), _0x17edbf < 0x0 && (_0x17edbf = 0x0), this.config.volume = _0x17edbf, this.game.volume = _0x17edbf, !_0x1e2c68.empty(_0x52441c) && this.muted && _0x17edbf > 0x0 && (this.muted = !0x1);
            },
            'get': function() {
                return Number(this.game.volume);
            }
        }, {
            'key': 'muted',
            'set': function(_0x218306) {
                var _0x17edbf = _0x218306;
                _0x1e2c68.boolean(_0x17edbf) || (_0x17edbf = this.storage.get('muted')), _0x1e2c68.boolean(_0x17edbf) || (_0x17edbf = this.config.muted), this.config.muted = _0x17edbf, this.game.muted = _0x17edbf;
            },
            'get': function() {
                return Boolean(this.game.muted);
            }
        }])
        _0x1a3a6c(_0x17edbf.prototype, _0x2c1832)
        _0x423c42 && _0x1a3a6c(_0x17edbf, _0x423c42)
        return _0x6954aa;
    }();
    _0x3dbc76.defaults = {};
    _0x17edbf.default = _0x3dbc76;
}

