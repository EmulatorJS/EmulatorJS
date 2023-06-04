window.EJS_main = function(_0xa88a13, _0x17edbf, _0x2c1832) {
    'use strict';
    window.EJS_RESET_VARS = [];
    for (let k in window) {
        window.EJS_RESET_VARS.push(k);
    }
    _0x2c1832.r(_0x17edbf);
    let _0x39ca5e = {
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
                'cacheManager': 'Cache Manager',
                'netplay': 'Netplay',
                'gamepad': 'Control Settings',
                'cheat': 'Cheats',
                'menuBack': 'Go back to previous menu',
                'normal': 'Normal',
                'all': 'All',
                'reset': 'Reset',
                'disabled': 'Disabled',
                'enabled': 'Enabled',
                'playNow': 'Start Game'
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
                    'cacheManager': '[data-btn="cache-manager"]',
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
        renderErrorPage = _0x2c1832(0),
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
                let _0x17edbf = _0xd61cf4;
                _0xd61cf4.startsWith('http://') && _0xd61cf4.startsWith('https://') || (_0x17edbf = 'http://' .concat(_0xd61cf4));
                try {
                    return !_0x555ee8(new URL(_0x17edbf).hostname);
                } catch (_0x5e6cd2) {
                    return false;
                }
            },
            'empty': _0x555ee8
        },
        _0x168698 = function() {
            let _0xa88a13 = false;
            try {
                let _0x17edbf = Object.defineProperty({}, 'passive', {
                    'get': function() {
                        return _0xa88a13 = true, null;
                    }
                });
                window.addEventListener('test', null, _0x17edbf), window.removeEventListener('test', null, _0x17edbf);
            } catch (_0x1db3b5) {}
            return _0xa88a13;
        }();

    function _0x1ef215(_0xa482e6, _0x474854, _0xc30d6e) {
        let _0x57056f = this,
            _0x3f468e = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
            _0x79ce58 = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4],
            _0x23848b = arguments.length > 5 && void 0 !== arguments[5] && arguments[5];
        if (_0xa482e6 && 'addEventListener' in _0xa482e6 && !_0x1e2c68.empty(_0x474854) && _0x1e2c68.function(_0xc30d6e)) {
            let _0x4a2da0 = _0x474854.split(' '),
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
                }), _0xa482e6[_0x3f468e ? 'addEventListener' : 'removeEventListener'](_0x487d3c, _0xc30d6e);
            });
        }
    }

    function _0x1093f4(_0x4d8d94) {
        let _0x17edbf = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : '',
            _0x2c1832 = arguments.length > 2 ? arguments[2] : undefined,
            _0x4adcdf = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
            _0x2f85bc = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
        _0x1ef215.call(this, _0x4d8d94, _0x17edbf, _0x2c1832, true, _0x4adcdf, _0x2f85bc);
    }

    function _0x20109b(_0x550b1a) {
        let _0x17edbf = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : '',
            _0x2c1832 = arguments.length > 2 ? arguments[2] : undefined,
            _0x5e10a2 = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
            _0x5c9512 = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
        _0x1ef215.call(this, _0x550b1a, _0x17edbf, _0x2c1832, false, _0x5e10a2, _0x5c9512);
    }

    function _0x455c85(_0x4e4b15) {
        let _0x17edbf = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : '',
            _0x2c1832 = arguments.length > 2 ? arguments[2] : void 0,
            _0x2b8c91 = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
            _0x23e991 = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
        
        _0x1ef215.call(this, _0x4e4b15, _0x17edbf, function _0x5127f4() {
            _0x20109b(_0x4e4b15, _0x17edbf, _0x5127f4, _0x2b8c91, _0x23e991);
            let _0x1fe440 = arguments.length,
            _0x1d3219 = new Array(_0x1fe440);
            for (let  _0x54457c = 0; _0x54457c < _0x1fe440; _0x54457c++) _0x1d3219[_0x54457c] = arguments[_0x54457c];
            _0x2c1832.apply(this, _0x1d3219);
        }, true, _0x2b8c91, _0x23e991);
    }

    function _0xbae705(_0x975ccc) {
        let _0x17edbf = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : '',
            _0x2c1832 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            _0x57297b = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
        if (_0x1e2c68.element(_0x975ccc) && !_0x1e2c68.empty(_0x17edbf)) {
            let _0x4f631e = new CustomEvent(_0x17edbf, {
                'bubbles': _0x2c1832,
                'detail': Object.assign({}, _0x57297b, {
                    'emulator': this
                })
            });
            _0x975ccc.dispatchEvent(_0x4f631e);
        }
    }
    let _0x55349e = _0x2c1832(0x9e),
        _0x42870c = _0x2c1832.n(_0x55349e);

    function _0x30f85e(_0x3ed035, _0xd96db3) {
        return function(_0x18bbf3) {
            if (Array.isArray(_0x18bbf3)) return _0x18bbf3;
        }(_0x3ed035) || function(_0x2bb2ab, _0x4993ee) {
            let _0x2c1832 = [],
                _0x629f39 = true,
                _0xde5653 = false,
                _0x346a0d = undefined;
            try {
                for (let _0x57d79d, _0x557ef0 = _0x2bb2ab[Symbol.iterator](); !(_0x629f39 = (_0x57d79d = _0x557ef0.next()).done) && (_0x2c1832.push(_0x57d79d.value), !_0x4993ee || _0x2c1832.length !== _0x4993ee); _0x629f39 = true);
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
        let _0x2c1832 = _0x39eb34.length ? _0x39eb34 : [_0x39eb34];
        Array.from(_0x2c1832).reverse().forEach(function(_0x35fc48, _0x79e6bf) {
            let _0x1510e4 = _0x79e6bf > 0 ? _0x86c3db.cloneNode(true) : _0x86c3db,
                _0x247f26 = _0x35fc48.parentNode,
                _0x3a5422 = _0x35fc48.nextSibling;
            _0x1510e4.appendChild(_0x35fc48), _0x3a5422 ? _0x247f26.insertBefore(_0x1510e4, _0x3a5422) : _0x247f26.appendChild(_0x1510e4);
        });
    }

    function _0x154f99(_0x5e4eb3, _0x1acdad) {
        _0x1e2c68.element(_0x5e4eb3) && !_0x1e2c68.empty(_0x1acdad) && Object.entries(_0x1acdad).filter(function(_0x37e04b) {
            let _0x1acdad = _0x30f85e(_0x37e04b, 2)[1];
            return !_0x1e2c68.nullOrUndefined(_0x1acdad);
        }).forEach(function(_0x4993dd) {
            let _0x2c1832 = _0x30f85e(_0x4993dd, 2),
                _0x24704f = _0x2c1832[0],
                _0x52ac21 = _0x2c1832[1];
            return _0x5e4eb3.setAttribute(_0x24704f, _0x52ac21);
        });
    }

    function _0x428003(_0x1397c4, _0x1ec8c9, _0x1a02af) {
        let _0xca6ad9 = document.createElement(_0x1397c4);
        return _0x1e2c68.object(_0x1ec8c9) && _0x154f99(_0xca6ad9, _0x1ec8c9), _0x1e2c68.string(_0x1a02af) && (_0xca6ad9.innerText = _0x1a02af), _0xca6ad9;
    }

    function _0x12a55d(_0x27d9d8) {
        _0x1e2c68.nodeList(_0x27d9d8) || _0x1e2c68.array(_0x27d9d8) ? Array.from(_0x27d9d8).forEach(_0x12a55d) : _0x1e2c68.element(_0x27d9d8) && _0x1e2c68.element(_0x27d9d8.parentNode) && _0x27d9d8.parentNode.removeChild(_0x27d9d8);
    }

    function _0xa949a8(_0x3bc809, _0x215e7f) {
        if (!_0x1e2c68.string(_0x3bc809) || _0x1e2c68.empty(_0x3bc809)) return {};
        let _0x2c1832 = {},
            _0x3ab896 = _0x215e7f;
        return _0x3bc809.split(',').forEach(function(_0x2b6c5b) {
            let _0x215e7f = _0x2b6c5b.trim(),
                _0x2b2f76 = _0x215e7f.replace('.', ''),
                _0x499377 = _0x215e7f.replace(/[[\]]/g, '').split('='),
                _0x1db3b8 = _0x499377[0],
                _0x520bcf = _0x499377.length > 1 ? _0x499377[1].replace(/["']/g, '') : '';
            switch (_0x215e7f.charAt(0)) {
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
            let _0x2c1832 = _0x511d6f;
            _0x1e2c68.boolean(_0x2c1832) || (_0x2c1832 = !_0x275729.hidden), _0x2c1832 ? _0x275729.setAttribute('hidden', '') : _0x275729.removeAttribute('hidden');
        }
    }

    function _0x3a8e2f(_0x2bf197, _0x46e2bb, _0x3b6b0b) {
        if (_0x1e2c68.nodeList(_0x2bf197)) return Array.from(_0x2bf197).map(function(_0x543362) {
            return _0x3a8e2f(_0x543362, _0x46e2bb, _0x3b6b0b);
        });
        if (_0x1e2c68.element(_0x2bf197)) {
            let _0x34f25e = 'toggle';
            return void 0 !== _0x3b6b0b && (_0x34f25e = _0x3b6b0b ? 'add' : 'remove'), _0x2bf197.classList[_0x34f25e](_0x46e2bb), _0x2bf197.classList.contains(_0x46e2bb);
        }
        return false;
    }

    function _0x350d73(_0x273517, _0x36ffc8) {
        return _0x1e2c68.element(_0x273517) && _0x273517.classList.contains(_0x36ffc8);
    }

    function _0x13f491(_0x11bf98, _0x674fa2) {
        let _0x2c1832 = {
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
        let _0xa88a13 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
            _0x17edbf = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        if (_0x1e2c68.element(_0xa88a13)) {
            let _0x2c1832 = _0x23ffa1.call(this, 'button:not(:disabled), input:not(:disabled), [tabindex]'),
                _0x1c6631 = _0x2c1832[0],
                _0x52c9df = _0x2c1832[_0x2c1832.length - 1];
            _0x1ef215.call(this, this.elements.container, 'keydown', function(_0x1bba02) {
                if ('Tab' === _0x1bba02.key && 0x9 === _0x1bba02.keyCode) {
                    let _0x17edbf = document.activeElement;
                    _0x17edbf !== _0x52c9df || _0x1bba02.shiftKey ? _0x17edbf === _0x1c6631 && _0x1bba02.shiftKey && (_0x52c9df.focus(), _0x1bba02.preventDefault()) : (_0x1c6631.focus(), _0x1bba02.preventDefault());
                }
            }, _0x17edbf, false);
        }
    }

    function _0x31cc23() {
        let _0xa88a13 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
            _0x17edbf = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        _0x1e2c68.element(_0xa88a13) && (_0xa88a13.focus(), _0x17edbf && _0x3a8e2f(_0xa88a13, this.config.classNames.tabFocus));
    }

    function getClass(_0x589e98) {
        return _0x48e5ff.a.bind(_0x42870c.a)(_0x589e98);
    }
    let _0x32d193, _0x5f365a, _0x820caf, _0x5a2767 = (_0x32d193 = document.createElement('span'), _0x5f365a = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd otransitionend',
        'transition': 'transitionend'
    }, _0x820caf = Object.keys(_0x5f365a).find(function(_0x5bdb45) {
        return void 0 !== _0x32d193.style[_0x5bdb45];
    }), !!_0x1e2c68.string(_0x820caf) && _0x5f365a[_0x820caf]);

    function _0x2b30e0(_0x1fb76b) {
        setTimeout(function() {
            try {
                _0x132da7(_0x1fb76b, true), _0x1fb76b.offsetHeight, _0x132da7(_0x1fb76b, false);
            } catch (_0x517747) {}
        }, 0);
    }
    let _0x296fa9, _0x59aa33 = {
            'isEdge': 'Netscape' === navigator.appName && navigator.appVersion.indexOf('Edge') > -1,
            'isIE': !!document.documentMode,
            'isWebkit': 'WebkitAppearance' in document.documentElement.style && !/Edge/ .test(navigator.userAgent),
            'isIPhone': /(iPhone|iPod)/gi .test(navigator.platform),
            'isIos': (/(iPad|iPhone|iPod)/gi .test(navigator.userAgent) || (/Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints && navigator.maxTouchPoints > 1)),
            'info': function() {
                let _0xa88a13 = /(MSIE|(?!Gecko.+)Firefox|(?!AppleWebKit.+Chrome.+)Safari|(?!AppleWebKit.+)Chrome|AppleWebKit(?!.+Chrome|.+Safari)|Gecko(?!.+Firefox))(?: |\/)([\d\.apre]+)/ .exec(navigator.userAgent);
                return {
                    'name': _0xa88a13[1].toLowerCase(),
                    'version': _0xa88a13[2]
                };
            }
        },
        _0x2d904a = {
            'rangeInput': (_0x296fa9 = document.createElement('input'), _0x296fa9.type = 'range', 'range' === _0x296fa9.type),
            'touch': 'ontouchstart' in document.documentElement,
            'transitions': false !== _0x5a2767,
            'reducedMotion': 'matchMedia' in window && window.matchMedia('(prefers-reduced-motion)').matches,
            'webgl': function() {
                let _0xa88a13 = {
                    'DETECTED': false
                };
                if (!_0xa88a13.DETECTED) {
                    let _0x17edbf = document.createElement('canvas');
                    if (_0x17edbf && _0x17edbf.getContext)
                        for (let _0x2c1832 = ['webgl2', 'experimental-webgl2', 'webgl', 'experimental-webgl'], _0x44cd27 = 0, _0x12b7b8 = _0x2c1832.length; _0x44cd27 < _0x12b7b8; ++_0x44cd27) {
                            let _0x11cb40 = _0x2c1832[_0x44cd27],
                                _0x26b3b2 = _0x17edbf.getContext(_0x11cb40);
                            if (_0x26b3b2) {
                                _0xa88a13.WEBGL_CONTEXT = _0x11cb40, _0xa88a13.WEBGL_VERSION = _0x26b3b2.getParameter(_0x26b3b2.VERSION), _0xa88a13.WEBGL_VENDOR = _0x26b3b2.getParameter(_0x26b3b2.VENDOR), _0xa88a13.WEBGL_SL_VERSION = _0x26b3b2.getParameter(_0x26b3b2.SHADING_LANGUAGE_VERSION), _0xa88a13.MAX_TEXTURE_SIZE = _0x26b3b2.getParameter(_0x26b3b2.MAX_TEXTURE_SIZE);
                                let _0x40c8fc = _0x26b3b2.getExtension('WEBGL_debug_renderer_info');
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
        let _0xa88a13 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              _0x2c1832 = new Array(_0x17edbf > 1 ? _0x17edbf - 1 : 0);
        for (let  _0x17edbf = arguments.length, _0x189546 = 1; _0x189546 < _0x17edbf; _0x189546++) _0x2c1832[_0x189546 - 1] = arguments[_0x189546];
        if (!_0x2c1832.length) return _0xa88a13;
        let _0x279e54 = _0x2c1832.shift();
        return _0x1e2c68.object(_0x279e54) ? (Object.keys(_0x279e54).forEach(function(_0x53b45a) {
            _0x1e2c68.object(_0x279e54[_0x53b45a]) ? (Object.keys(_0xa88a13).includes(_0x53b45a) || Object.assign(_0xa88a13, _0x55cbbe({}, _0x53b45a, {})), _0x5dc0c0(_0xa88a13[_0x53b45a], _0x279e54[_0x53b45a])) : Object.assign(_0xa88a13, _0x55cbbe({}, _0x53b45a, _0x279e54[_0x53b45a]));
        }), _0x5dc0c0.apply(undefined, [_0xa88a13].concat(_0x2c1832))) : _0xa88a13;
    }

    function _0x1a0e98() {
        let _0xa88a13 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '',
            _0x17edbf = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : '',
            _0x2c1832 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : '';
        return _0xa88a13.replace(new RegExp(_0x17edbf.toString().replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\x5c$1'), 'g'), _0x2c1832.toString());
    }

    function _0x9fdcea() {
        let _0xa88a13 = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '').toString();
        return (_0xa88a13 = function() {
            let _0xa88a13 = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '').toString();
            return _0xa88a13 = _0x1a0e98(_0xa88a13, '-', ' '), _0xa88a13 = _0x1a0e98(_0xa88a13, '_', ' '), _0x1a0e98(_0xa88a13 = function() {
                return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '').toString().replace(/\w\S*/g, function(_0x5b5cba) {
                    return _0x5b5cba.charAt(0).toUpperCase() + _0x5b5cba.substr(1).toLowerCase();
                });
            }(_0xa88a13), ' ', '');
        }(_0xa88a13)).charAt(0).toLowerCase() + _0xa88a13.slice(1);
    }

    function _0x419e30(_0x3614ce, _0x5196ee) {
        return function(_0x38f65b) {
            if (Array.isArray(_0x38f65b)) return _0x38f65b;
        }(_0x3614ce) || function(_0x20a132, _0x481bd0) {
            let _0x2c1832 = [],
                _0x930e75 = true,
                _0x40863e = false,
                _0xf7a5cf = undefined;
            try {
                for (let _0x9d4c5a, _0x2f59ed = _0x20a132[Symbol.iterator](); !(_0x930e75 = (_0x9d4c5a = _0x2f59ed.next()).done) && (_0x2c1832.push(_0x9d4c5a.value), !_0x481bd0 || _0x2c1832.length !== _0x481bd0); _0x930e75 = true);
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
    let _0xb9b2ff = {
        'get': function() {
            let _0xa88a13 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '',
                _0x17edbf = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (_0x1e2c68.empty(_0xa88a13) || _0x1e2c68.empty(_0x17edbf)) return '';
            let _0x2c1832 = _0x344e81(_0x17edbf.i18n, _0xa88a13);
            if (_0x1e2c68.empty(_0x2c1832)) return '';
            let _0x54bf45 = {
                '{seektime}': _0x17edbf.seekTime,
                '{title}': _0x17edbf.title
            };
            return Object.entries(_0x54bf45).forEach(function(_0x34ee43) {
                let _0x17edbf = _0x419e30(_0x34ee43, 2),
                    _0x473ebb = _0x17edbf[0],
                    _0x56ec0 = _0x17edbf[1];
                _0x2c1832 = _0x1a0e98(_0x2c1832, _0x473ebb, _0x56ec0);
            }), _0x2c1832;
        }
    };

    function _0x4c97b0(_0xb3d5fd, _0x2cda5d) {
        for (let _0x2c1832 = 0; _0x2c1832 < _0x2cda5d.length; _0x2c1832++) {
            let _0x3f3944 = _0x2cda5d[_0x2c1832];
            _0x3f3944.enumerable = _0x3f3944.enumerable || false, _0x3f3944.configurable = true, 'value' in _0x3f3944 && (_0x3f3944.writable = true), Object.defineProperty(_0xb3d5fd, _0x3f3944.key, _0x3f3944);
        }
    }
    let _0x2f61ba = function() {
        function _0x566dbe(_0x3a7165, _0x3d2e3a) {
            ! function(_0x48c5c0, _0x2b027d) {
                if (!(_0x48c5c0 instanceof _0x2b027d)) throw new TypeError('Cannot call a class as a function');
            }(this, _0x566dbe), this.enabled = true, this.key = _0x3d2e3a;
        }
        let _0x17edbf, _0x2c1832, _0x4496fc;
        return _0x17edbf = _0x566dbe, _0x4496fc = [{
            'key': 'supported',
            'get': function() {
                try {
                    return 'localStorage' in window && (window.localStorage.getItem('___test') || window.localStorage.setItem('___test', '___test'), true);
                } catch (_0x42cafd) {
                    return false;
                }
            }
        }], (_0x2c1832 = [{
            'key': 'get',
            'value': function(_0x4ed865) {
                if (!_0x566dbe.supported || !this.enabled) return null;
                let _0x2c1832 = window.localStorage.getItem(this.key);
                if (_0x1e2c68.empty(_0x2c1832)) return null;
                let _0x57ebf7 = JSON.parse(_0x2c1832);
                return _0x1e2c68.string(_0x4ed865) && _0x4ed865.length ? _0x57ebf7[_0x4ed865] : _0x57ebf7;
            }
        }, {
            'key': 'set',
            'value': function(_0x443e7a) {
                if (_0x566dbe.supported && this.enabled && _0x1e2c68.object(_0x443e7a)) {
                    let _0x2c1832 = this.get();
                    _0x1e2c68.empty(_0x2c1832) && (_0x2c1832 = {}), _0x5dc0c0(_0x2c1832, _0x443e7a), window.localStorage.setItem(this.key, JSON.stringify(_0x2c1832));
                }
            }
        }]) && _0x4c97b0(_0x17edbf.prototype, _0x2c1832), _0x4496fc && _0x4c97b0(_0x17edbf, _0x4496fc), _0x566dbe;
    }();
    let _0x13fb79, 
        _0x4ad1c6 = _0x2c1832(6),
        _0x4704b1 = _0x2c1832(159),
        _0x3a58c8 = _0x2c1832.n(_0x4704b1),
        shaders = {
            "2xScaleHQ.glslp": "shaders = 1\n\nshader0 = \"2xScaleHQ.glsl\"\nfilter_linear0 = false\nscale_type_0 = source\n",
            "4xScaleHQ.glslp": "shaders = 1\n\nshader0 = \"4xScaleHQ.glsl\"\nfilter_linear0 = false\nscale_type_0 = source\n",
            "crt-easymode.glslp": "shaders = 1\n\nshader0 = crt-easymode.glsl\nfilter_linear0 = false\nscale_type_0 = source\n",
            "crt-aperture.glslp": "shaders = 1\n\nshader0 = crt-aperture.glsl\nfilter_linear0 = false\n",
            "crt-geom.glslp": "shaders = 1\n\nshader0 = crt-geom.glsl\nfilter_linear0 = false\nscale_type_0 = source\n",
            "crt-mattias.glslp": "\nshaders = 1\nshader0 = crt-mattias.glsl\nfilter_linear0 = false\n",
            "2xScaleHQ.glsl": "/*\n2xGLSLHqFilter shader\n\nCopyright (C) 2005 guest(r) - guest.r@gmail.com\n\nThis program is free software; you can redistribute it and/or\nmodify it under the terms of the GNU General Public License\nas published by the Free Software Foundation; either version 2\nof the License, or (at your option) any later version.\n\nThis program is distributed in the hope that it will be useful,\nbut WITHOUT ANY WARRANTY; without even the implied warranty of\nMERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\nGNU General Public License for more details.\n\nYou should have received a copy of the GNU General Public License\nalong with this program; if not, write to the Free Software\nFoundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.\n*/\n\n#if defined(VERTEX)\n\n#if __VERSION__ >= 130\n#define COMPAT_VARYING out\n#define COMPAT_ATTRIBUTE in\n#define COMPAT_TEXTURE texture\n#else\n#define COMPAT_VARYING varying \n#define COMPAT_ATTRIBUTE attribute \n#define COMPAT_TEXTURE texture2D\n#endif\n\n#ifdef GL_ES\n#define COMPAT_PRECISION mediump\n#else\n#define COMPAT_PRECISION\n#endif\n\nCOMPAT_ATTRIBUTE vec4 VertexCoord;\nCOMPAT_ATTRIBUTE vec4 COLOR;\nCOMPAT_ATTRIBUTE vec4 TexCoord;\nCOMPAT_VARYING vec4 COL0;\nCOMPAT_VARYING vec4 TEX0;\nCOMPAT_VARYING vec4 t1;\nCOMPAT_VARYING vec4 t2;\nCOMPAT_VARYING vec4 t3;\nCOMPAT_VARYING vec4 t4;\n\nvec4 _oPosition1; \nuniform mat4 MVPMatrix;\nuniform COMPAT_PRECISION int FrameDirection;\nuniform COMPAT_PRECISION int FrameCount;\nuniform COMPAT_PRECISION vec2 OutputSize;\nuniform COMPAT_PRECISION vec2 TextureSize;\nuniform COMPAT_PRECISION vec2 InputSize;\n\n// compatibility #defines\n#define vTexCoord TEX0.xy\n#define SourceSize vec4(TextureSize, 1.0 / TextureSize) //either TextureSize or InputSize\n#define OutSize vec4(OutputSize, 1.0 / OutputSize)\n\nvoid main()\n{\ngl_Position = MVPMatrix * VertexCoord;\nTEX0.xy = TexCoord.xy;\nfloat x = 0.5 * SourceSize.z;\nfloat y = 0.5 * SourceSize.w;\nvec2 dg1 = vec2( x, y);\nvec2 dg2 = vec2(-x, y);\nvec2 dx = vec2(x, 0.0);\nvec2 dy = vec2(0.0, y);\nt1 = vec4(vTexCoord - dg1, vTexCoord - dy);\nt2 = vec4(vTexCoord - dg2, vTexCoord + dx);\nt3 = vec4(vTexCoord + dg1, vTexCoord + dy);\nt4 = vec4(vTexCoord + dg2, vTexCoord - dx);\n}\n\n#elif defined(FRAGMENT)\n\n#if __VERSION__ >= 130\n#define COMPAT_VARYING in\n#define COMPAT_TEXTURE texture\nout vec4 FragColor;\n#else\n#define COMPAT_VARYING varying\n#define FragColor gl_FragColor\n#define COMPAT_TEXTURE texture2D\n#endif\n\n#ifdef GL_ES\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n#define COMPAT_PRECISION mediump\n#else\n#define COMPAT_PRECISION\n#endif\n\nuniform COMPAT_PRECISION int FrameDirection;\nuniform COMPAT_PRECISION int FrameCount;\nuniform COMPAT_PRECISION vec2 OutputSize;\nuniform COMPAT_PRECISION vec2 TextureSize;\nuniform COMPAT_PRECISION vec2 InputSize;\nuniform sampler2D Texture;\nCOMPAT_VARYING vec4 TEX0;\nCOMPAT_VARYING vec4 t1;\nCOMPAT_VARYING vec4 t2;\nCOMPAT_VARYING vec4 t3;\nCOMPAT_VARYING vec4 t4;\n\n// compatibility #defines\n#define Source Texture\n#define vTexCoord TEX0.xy\n\n#define SourceSize vec4(TextureSize, 1.0 / TextureSize) //either TextureSize or InputSize\n#define OutSize vec4(OutputSize, 1.0 / OutputSize)\n\nfloat mx = 0.325;      // start smoothing wt.\nfloat k = -0.250;      // wt. decrease factor\nfloat max_w = 0.25;    // max filter weight\nfloat min_w =-0.05;    // min filter weight\nfloat lum_add = 0.25;  // affects smoothing\nvec3 dt = vec3(1.0);\n\nvoid main()\n{\nvec3 c00 = COMPAT_TEXTURE(Source, t1.xy).xyz; \nvec3 c10 = COMPAT_TEXTURE(Source, t1.zw).xyz; \nvec3 c20 = COMPAT_TEXTURE(Source, t2.xy).xyz; \nvec3 c01 = COMPAT_TEXTURE(Source, t4.zw).xyz; \nvec3 c11 = COMPAT_TEXTURE(Source, vTexCoord).xyz; \nvec3 c21 = COMPAT_TEXTURE(Source, t2.zw).xyz; \nvec3 c02 = COMPAT_TEXTURE(Source, t4.xy).xyz; \nvec3 c12 = COMPAT_TEXTURE(Source, t3.zw).xyz; \nvec3 c22 = COMPAT_TEXTURE(Source, t3.xy).xyz; \n\nfloat md1 = dot(abs(c00 - c22), dt);\nfloat md2 = dot(abs(c02 - c20), dt);\n\nfloat w1 = dot(abs(c22 - c11), dt) * md2;\nfloat w2 = dot(abs(c02 - c11), dt) * md1;\nfloat w3 = dot(abs(c00 - c11), dt) * md2;\nfloat w4 = dot(abs(c20 - c11), dt) * md1;\n\nfloat t1 = w1 + w3;\nfloat t2 = w2 + w4;\nfloat ww = max(t1, t2) + 0.0001;\n\nc11 = (w1 * c00 + w2 * c20 + w3 * c22 + w4 * c02 + ww * c11) / (t1 + t2 + ww);\n\nfloat lc1 = k / (0.12 * dot(c10 + c12 + c11, dt) + lum_add);\nfloat lc2 = k / (0.12 * dot(c01 + c21 + c11, dt) + lum_add);\n\nw1 = clamp(lc1 * dot(abs(c11 - c10), dt) + mx, min_w, max_w);\nw2 = clamp(lc2 * dot(abs(c11 - c21), dt) + mx, min_w, max_w);\nw3 = clamp(lc1 * dot(abs(c11 - c12), dt) + mx, min_w, max_w);\nw4 = clamp(lc2 * dot(abs(c11 - c01), dt) + mx, min_w, max_w);\nFragColor = vec4(w1 * c10 + w2 * c21 + w3 * c12 + w4 * c01 + (1.0 - w1 - w2 - w3 - w4) * c11, 1.0);\n} \n#endif\n",
            "4xScaleHQ.glsl": "/*\n4xGLSLHqFilter shader\n\nCopyright (C) 2005 guest(r) - guest.r@gmail.com\n\nThis program is free software; you can redistribute it and/or\nmodify it under the terms of the GNU General Public License\nas published by the Free Software Foundation; either version 2\nof the License, or (at your option) any later version.\n\nThis program is distributed in the hope that it will be useful,\nbut WITHOUT ANY WARRANTY; without even the implied warranty of\nMERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\nGNU General Public License for more details.\n\nYou should have received a copy of the GNU General Public License\nalong with this program; if not, write to the Free Software\nFoundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.\n*/\n\n#if defined(VERTEX)\n\n#if __VERSION__ >= 130\n#define COMPAT_VARYING out\n#define COMPAT_ATTRIBUTE in\n#define COMPAT_TEXTURE texture\n#else\n#define COMPAT_VARYING varying \n#define COMPAT_ATTRIBUTE attribute \n#define COMPAT_TEXTURE texture2D\n#endif\n\n#ifdef GL_ES\n#define COMPAT_PRECISION mediump\n#else\n#define COMPAT_PRECISION\n#endif\n\nCOMPAT_ATTRIBUTE vec4 VertexCoord;\nCOMPAT_ATTRIBUTE vec4 COLOR;\nCOMPAT_ATTRIBUTE vec4 TexCoord;\nCOMPAT_VARYING vec4 COL0;\nCOMPAT_VARYING vec4 TEX0;\nCOMPAT_VARYING vec4 t1;\nCOMPAT_VARYING vec4 t2;\nCOMPAT_VARYING vec4 t3;\nCOMPAT_VARYING vec4 t4;\nCOMPAT_VARYING vec4 t5;\nCOMPAT_VARYING vec4 t6;\n\nvec4 _oPosition1; \nuniform mat4 MVPMatrix;\nuniform COMPAT_PRECISION int FrameDirection;\nuniform COMPAT_PRECISION int FrameCount;\nuniform COMPAT_PRECISION vec2 OutputSize;\nuniform COMPAT_PRECISION vec2 TextureSize;\nuniform COMPAT_PRECISION vec2 InputSize;\n\n// compatibility #defines\n#define vTexCoord TEX0.xy\n#define SourceSize vec4(TextureSize, 1.0 / TextureSize) //either TextureSize or InputSize\n#define OutSize vec4(OutputSize, 1.0 / OutputSize)\n\nvoid main()\n{\ngl_Position = MVPMatrix * VertexCoord;\nTEX0.xy = TexCoord.xy;\nfloat x = 0.5 * SourceSize.z;\nfloat y = 0.5 * SourceSize.w;\nvec2 dg1 = vec2( x, y);\nvec2 dg2 = vec2(-x, y);\nvec2 sd1 = dg1 * 0.5;\nvec2 sd2 = dg2 * 0.5;\nvec2 ddx = vec2(x, 0.0);\nvec2 ddy = vec2(0.0, y);\nt1 = vec4(vTexCoord - sd1, vTexCoord - ddy);\nt2 = vec4(vTexCoord - sd2, vTexCoord + ddx);\nt3 = vec4(vTexCoord + sd1, vTexCoord + ddy);\nt4 = vec4(vTexCoord + sd2, vTexCoord - ddx);\nt5 = vec4(vTexCoord - dg1, vTexCoord - dg2);\nt6 = vec4(vTexCoord + dg1, vTexCoord + dg2);\n}\n\n#elif defined(FRAGMENT)\n\n#if __VERSION__ >= 130\n#define COMPAT_VARYING in\n#define COMPAT_TEXTURE texture\nout vec4 FragColor;\n#else\n#define COMPAT_VARYING varying\n#define FragColor gl_FragColor\n#define COMPAT_TEXTURE texture2D\n#endif\n\n#ifdef GL_ES\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n#define COMPAT_PRECISION mediump\n#else\n#define COMPAT_PRECISION\n#endif\n\nuniform COMPAT_PRECISION int FrameDirection;\nuniform COMPAT_PRECISION int FrameCount;\nuniform COMPAT_PRECISION vec2 OutputSize;\nuniform COMPAT_PRECISION vec2 TextureSize;\nuniform COMPAT_PRECISION vec2 InputSize;\nuniform sampler2D Texture;\nCOMPAT_VARYING vec4 TEX0;\nCOMPAT_VARYING vec4 t1;\nCOMPAT_VARYING vec4 t2;\nCOMPAT_VARYING vec4 t3;\nCOMPAT_VARYING vec4 t4;\nCOMPAT_VARYING vec4 t5;\nCOMPAT_VARYING vec4 t6;\n\n// compatibility #defines\n#define Source Texture\n#define vTexCoord TEX0.xy\n\n#define SourceSize vec4(TextureSize, 1.0 / TextureSize) //either TextureSize or InputSize\n#define OutSize vec4(OutputSize, 1.0 / OutputSize)\n\nfloat mx = 1.0;      // start smoothing wt.\nfloat k = -1.10;      // wt. decrease factor\nfloat max_w = 0.75;    // max filter weight\nfloat min_w = 0.03;    // min filter weight\nfloat lum_add = 0.33;  // affects smoothing\nvec3 dt = vec3(1.0);\n\nvoid main()\n{\nvec3 c  = COMPAT_TEXTURE(Source, vTexCoord).xyz;\nvec3 i1 = COMPAT_TEXTURE(Source, t1.xy).xyz; \nvec3 i2 = COMPAT_TEXTURE(Source, t2.xy).xyz; \nvec3 i3 = COMPAT_TEXTURE(Source, t3.xy).xyz; \nvec3 i4 = COMPAT_TEXTURE(Source, t4.xy).xyz; \nvec3 o1 = COMPAT_TEXTURE(Source, t5.xy).xyz; \nvec3 o3 = COMPAT_TEXTURE(Source, t6.xy).xyz; \nvec3 o2 = COMPAT_TEXTURE(Source, t5.zw).xyz;\nvec3 o4 = COMPAT_TEXTURE(Source, t6.zw).xyz;\nvec3 s1 = COMPAT_TEXTURE(Source, t1.zw).xyz; \nvec3 s2 = COMPAT_TEXTURE(Source, t2.zw).xyz; \nvec3 s3 = COMPAT_TEXTURE(Source, t3.zw).xyz; \nvec3 s4 = COMPAT_TEXTURE(Source, t4.zw).xyz; \n\nfloat ko1=dot(abs(o1-c),dt);\nfloat ko2=dot(abs(o2-c),dt);\nfloat ko3=dot(abs(o3-c),dt);\nfloat ko4=dot(abs(o4-c),dt);\n\nfloat k1=min(dot(abs(i1-i3),dt),max(ko1,ko3));\nfloat k2=min(dot(abs(i2-i4),dt),max(ko2,ko4));\n\nfloat w1 = k2; if(ko3<ko1) w1*=ko3/ko1;\nfloat w2 = k1; if(ko4<ko2) w2*=ko4/ko2;\nfloat w3 = k2; if(ko1<ko3) w3*=ko1/ko3;\nfloat w4 = k1; if(ko2<ko4) w4*=ko2/ko4;\n\nc=(w1*o1+w2*o2+w3*o3+w4*o4+0.001*c)/(w1+w2+w3+w4+0.001);\nw1 = k*dot(abs(i1-c)+abs(i3-c),dt)/(0.125*dot(i1+i3,dt)+lum_add);\nw2 = k*dot(abs(i2-c)+abs(i4-c),dt)/(0.125*dot(i2+i4,dt)+lum_add);\nw3 = k*dot(abs(s1-c)+abs(s3-c),dt)/(0.125*dot(s1+s3,dt)+lum_add);\nw4 = k*dot(abs(s2-c)+abs(s4-c),dt)/(0.125*dot(s2+s4,dt)+lum_add);\n\nw1 = clamp(w1+mx,min_w,max_w); \nw2 = clamp(w2+mx,min_w,max_w);\nw3 = clamp(w3+mx,min_w,max_w); \nw4 = clamp(w4+mx,min_w,max_w);\n\nFragColor = vec4((w1*(i1+i3)+w2*(i2+i4)+w3*(s1+s3)+w4*(s2+s4)+c)/(2.0*(w1+w2+w3+w4)+1.0), 1.0);\n} \n#endif\n",
            "crt-easymode.glsl": "#if defined(VERTEX)\n\n    #if __VERSION__ >= 130\n    #define COMPAT_VARYING out\n    #define COMPAT_ATTRIBUTE in\n    #define COMPAT_TEXTURE texture\n    #else\n    #define COMPAT_VARYING varying\n    #define COMPAT_ATTRIBUTE attribute\n    #define COMPAT_TEXTURE texture2D\n    #endif\n    \n    #ifdef GL_ES\n    #define COMPAT_PRECISION mediump\n    #else\n    #define COMPAT_PRECISION\n    #endif\n    COMPAT_VARYING     float _frame_rotation;\n    struct input_dummy {\n    vec2 _video_size;\n    vec2 _texture_size;\n    vec2 _output_dummy_size;\n    float _frame_count;\n    float _frame_direction;\n    float _frame_rotation;\n    };\n    vec4 _oPosition1;\n    vec4 _r0005;\n    COMPAT_ATTRIBUTE vec4 VertexCoord;\n    COMPAT_ATTRIBUTE vec4 TexCoord;\n    COMPAT_VARYING vec4 TEX0;\n    \n    uniform mat4 MVPMatrix;\n    uniform int FrameDirection;\n    uniform int FrameCount;\n    uniform COMPAT_PRECISION vec2 OutputSize;\n    uniform COMPAT_PRECISION vec2 TextureSize;\n    uniform COMPAT_PRECISION vec2 InputSize;\n    void main()\n    {\n    vec2 _oTex;\n    _r0005 = VertexCoord.x*MVPMatrix[0];\n    _r0005 = _r0005 + VertexCoord.y*MVPMatrix[1];\n    _r0005 = _r0005 + VertexCoord.z*MVPMatrix[2];\n    _r0005 = _r0005 + VertexCoord.w*MVPMatrix[3];\n    _oPosition1 = _r0005;\n    _oTex = TexCoord.xy;\n    gl_Position = _r0005;\n    TEX0.xy = TexCoord.xy;\n    }\n    #elif defined(FRAGMENT)\n    \n    #if __VERSION__ >= 130\n    #define COMPAT_VARYING in\n    #define COMPAT_TEXTURE texture\n    out vec4 FragColor;\n    #else\n    #define COMPAT_VARYING varying\n    #define FragColor gl_FragColor\n    #define COMPAT_TEXTURE texture2D\n    #endif\n    \n    #ifdef GL_ES\n    #ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    #else\n    precision mediump float;\n    #endif\n    #define COMPAT_PRECISION mediump\n    #else\n    #define COMPAT_PRECISION\n    #endif\n    COMPAT_VARYING     float _frame_rotation;\n    struct input_dummy {\n    vec2 _video_size;\n    vec2 _texture_size;\n    vec2 _output_dummy_size;\n    float _frame_count;\n    float _frame_direction;\n    float _frame_rotation;\n    };\n    vec4 _ret_0;\n    float _TMP30;\n    float _TMP29;\n    float _TMP28;\n    float _TMP13;\n    float _TMP32;\n    float _TMP11;\n    float _TMP10;\n    float _TMP31;\n    float _TMP9;\n    float _TMP8;\n    float _TMP15;\n    float _TMP14;\n    float _TMP33;\n    vec4 _TMP34;\n    vec4 _TMP27;\n    vec4 _TMP25;\n    vec4 _TMP23;\n    vec4 _TMP21;\n    vec4 _TMP26;\n    vec4 _TMP24;\n    vec4 _TMP22;\n    vec4 _TMP20;\n    float _TMP4;\n    vec4 _TMP3;\n    vec4 _TMP2;\n    float _TMP19;\n    float _TMP18;\n    float _TMP17;\n    float _TMP16;\n    vec4 _TMP1;\n    vec2 _TMP0;\n    uniform sampler2D Texture;\n    input_dummy _IN1;\n    float _TMP43;\n    float _x_step0044;\n    float _curve0044;\n    float _a0048;\n    float _val0052;\n    float _a0052;\n    vec4 _TMP57;\n    vec4 _x0072;\n    vec2 _c0086;\n    vec4 _x0088;\n    vec4 _x0094;\n    vec2 _c0098;\n    vec4 _x0100;\n    vec2 _c0104;\n    vec4 _x0106;\n    vec4 _sample_min0110;\n    vec4 _sample_max0110;\n    vec4 _r0112;\n    vec4 _TMP117;\n    vec2 _co0124;\n    vec2 _c0126;\n    vec4 _x0128;\n    vec4 _x0134;\n    vec2 _c0138;\n    vec4 _x0140;\n    vec2 _c0144;\n    vec4 _x0146;\n    vec4 _sample_min0150;\n    vec4 _sample_max0150;\n    vec4 _r0152;\n    vec4 _TMP157;\n    float _TMP163;\n    float _x_step0164;\n    float _curve0164;\n    float _a0168;\n    float _val0172;\n    float _a0172;\n    float _TMP183;\n    float _TMP189;\n    float _x0190;\n    float _a0196;\n    float _x0198;\n    vec2 _x0200;\n    float _x0208;\n    COMPAT_VARYING vec4 TEX0;\n    \n    uniform COMPAT_PRECISION vec2 OutputSize;\n    uniform COMPAT_PRECISION vec2 TextureSize;\n    uniform COMPAT_PRECISION vec2 InputSize;\n    void main()\n    {\n    vec2 _dx1;\n    vec2 _dy;\n    vec2 _pix_co;\n    vec2 _tex_co;\n    vec2 _dist;\n    vec3 _col2;\n    vec3 _col21;\n    vec4 _coeffs1;\n    float _luma;\n    float _bright;\n    float _scan_weight;\n    vec2 _mod_fac;\n    int _dot_no;\n    vec3 _mask_weight;\n    vec3 _TMP37;\n    _dx1 = vec2(1.00000000E+00/TextureSize.x, 0.00000000E+00);\n    _dy = vec2(0.00000000E+00, 1.00000000E+00/TextureSize.y);\n    _pix_co = TEX0.xy*TextureSize - vec2( 5.00000000E-01, 5.00000000E-01);\n    _TMP0 = floor(_pix_co);\n    _tex_co = (_TMP0 + vec2( 5.00000000E-01, 5.00000000E-01))/TextureSize;\n    _dist = fract(_pix_co);\n    _x_step0044 = float((_dist.x >= 5.00000000E-01));\n    _a0048 = 2.50000000E-01 - (_dist.x - _x_step0044)*(_dist.x - _x_step0044);\n    _TMP33 = inversesqrt(_a0048);\n    _TMP14 = 1.00000000E+00/_TMP33;\n    _a0052 = 5.00000000E-01 - _dist.x;\n    _val0052 = float((_a0052 > 0.00000000E+00));\n    _TMP15 = _val0052 - float((_a0052 < 0.00000000E+00));\n    _curve0044 = 5.00000000E-01 - _TMP14*_TMP15;\n    _TMP43 = _dist.x + 2.50000000E-01*(_curve0044 - _dist.x);\n    _coeffs1 = 3.14159274E+00*vec4(1.00000000E+00 + _TMP43, _TMP43, 1.00000000E+00 - _TMP43, 2.00000000E+00 - _TMP43);\n    _TMP1 = abs(_coeffs1);\n    _TMP57 = max(_TMP1, vec4( 9.99999975E-06, 9.99999975E-06, 9.99999975E-06, 9.99999975E-06));\n    _TMP16 = sin(_TMP57.x);\n    _TMP17 = sin(_TMP57.y);\n    _TMP18 = sin(_TMP57.z);\n    _TMP19 = sin(_TMP57.w);\n    _TMP2 = vec4(_TMP16, _TMP17, _TMP18, _TMP19);\n    _x0072 = _TMP57/2.00000000E+00;\n    _TMP16 = sin(_x0072.x);\n    _TMP17 = sin(_x0072.y);\n    _TMP18 = sin(_x0072.z);\n    _TMP19 = sin(_x0072.w);\n    _TMP3 = vec4(_TMP16, _TMP17, _TMP18, _TMP19);\n    _coeffs1 = ((2.00000000E+00*_TMP2)*_TMP3)/(_TMP57*_TMP57);\n    _TMP4 = dot(_coeffs1, vec4( 1.00000000E+00, 1.00000000E+00, 1.00000000E+00, 1.00000000E+00));\n    _coeffs1 = _coeffs1/_TMP4;\n    _c0086 = _tex_co - _dx1;\n    _TMP20 = COMPAT_TEXTURE(Texture, _c0086);\n    _x0088 = vec4( 1.00000000E+00, 1.00000000E+00, 1.00000000E+00, 1.00000000E+00) + (_TMP20 - vec4( 1.00000000E+00, 1.00000000E+00, 1.00000000E+00, 1.00000000E+00));\n    _TMP21 = _TMP20*_x0088;\n    _TMP22 = COMPAT_TEXTURE(Texture, _tex_co);\n    _x0094 = vec4( 1.00000000E+00, 1.00000000E+00, 1.00000000E+00, 1.00000000E+00) + (_TMP22 - vec4( 1.00000000E+00, 1.00000000E+00, 1.00000000E+00, 1.00000000E+00));\n    _TMP23 = _TMP22*_x0094;\n    _c0098 = _tex_co + _dx1;\n    _TMP24 = COMPAT_TEXTURE(Texture, _c0098);\n    _x0100 = vec4( 1.00000000E+00, 1.00000000E+00, 1.00000000E+00, 1.00000000E+00) + (_TMP24 - vec4( 1.00000000E+00, 1.00000000E+00, 1.00000000E+00, 1.00000000E+00));\n    _TMP25 = _TMP24*_x0100;\n    _c0104 = _tex_co + 2.00000000E+00*_dx1;\n    _TMP26 = COMPAT_TEXTURE(Texture, _c0104);\n    _x0106 = vec4( 1.00000000E+00, 1.00000000E+00, 1.00000000E+00, 1.00000000E+00) + (_TMP26 - vec4( 1.00000000E+00, 1.00000000E+00, 1.00000000E+00, 1.00000000E+00));\n    _TMP27 = _TMP26*_x0106;\n    _r0112 = _coeffs1.x*_TMP21;\n    _r0112 = _r0112 + _coeffs1.y*_TMP23;\n    _r0112 = _r0112 + _coeffs1.z*_TMP25;\n    _r0112 = _r0112 + _coeffs1.w*_TMP27;\n    _sample_min0110 = min(_TMP23, _TMP25);\n    _sample_max0110 = max(_TMP23, _TMP25);\n    _TMP34 = min(_sample_max0110, _r0112);\n    _TMP117 = max(_sample_min0110, _TMP34);\n    _co0124 = _tex_co + _dy;\n    _c0126 = _co0124 - _dx1;\n    _TMP20 = COMPAT_TEXTURE(Texture, _c0126);\n    _x0128 = vec4( 1.00000000E+00, 1.00000000E+00, 1.00000000E+00, 1.00000000E+00) + (_TMP20 - vec4( 1.00000000E+00, 1.00000000E+00, 1.00000000E+00, 1.00000000E+00));\n    _TMP21 = _TMP20*_x0128;\n    _TMP22 = COMPAT_TEXTURE(Texture, _co0124);\n    _x0134 = vec4( 1.00000000E+00, 1.00000000E+00, 1.00000000E+00, 1.00000000E+00) + (_TMP22 - vec4( 1.00000000E+00, 1.00000000E+00, 1.00000000E+00, 1.00000000E+00));\n    _TMP23 = _TMP22*_x0134;\n    _c0138 = _co0124 + _dx1;\n    _TMP24 = COMPAT_TEXTURE(Texture, _c0138);\n    _x0140 = vec4( 1.00000000E+00, 1.00000000E+00, 1.00000000E+00, 1.00000000E+00) + (_TMP24 - vec4( 1.00000000E+00, 1.00000000E+00, 1.00000000E+00, 1.00000000E+00));\n    _TMP25 = _TMP24*_x0140;\n    _c0144 = _co0124 + 2.00000000E+00*_dx1;\n    _TMP26 = COMPAT_TEXTURE(Texture, _c0144);\n    _x0146 = vec4( 1.00000000E+00, 1.00000000E+00, 1.00000000E+00, 1.00000000E+00) + (_TMP26 - vec4( 1.00000000E+00, 1.00000000E+00, 1.00000000E+00, 1.00000000E+00));\n    _TMP27 = _TMP26*_x0146;\n    _r0152 = _coeffs1.x*_TMP21;\n    _r0152 = _r0152 + _coeffs1.y*_TMP23;\n    _r0152 = _r0152 + _coeffs1.z*_TMP25;\n    _r0152 = _r0152 + _coeffs1.w*_TMP27;\n    _sample_min0150 = min(_TMP23, _TMP25);\n    _sample_max0150 = max(_TMP23, _TMP25);\n    _TMP34 = min(_sample_max0150, _r0152);\n    _TMP157 = max(_sample_min0150, _TMP34);\n    _x_step0164 = float((_dist.y >= 5.00000000E-01));\n    _a0168 = 2.50000000E-01 - (_dist.y - _x_step0164)*(_dist.y - _x_step0164);\n    _TMP33 = inversesqrt(_a0168);\n    _TMP14 = 1.00000000E+00/_TMP33;\n    _a0172 = 5.00000000E-01 - _dist.y;\n    _val0172 = float((_a0172 > 0.00000000E+00));\n    _TMP15 = _val0172 - float((_a0172 < 0.00000000E+00));\n    _curve0164 = 5.00000000E-01 - _TMP14*_TMP15;\n    _TMP163 = _dist.y + (_curve0164 - _dist.y);\n    _col2 = _TMP117.xyz + _TMP163*(_TMP157.xyz - _TMP117.xyz);\n    _luma = dot(vec3( 2.12599993E-01, 7.15200007E-01, 7.22000003E-02), _col2);\n    _TMP8 = max(_col2.y, _col2.z);\n    _TMP9 = max(_col2.x, _TMP8);\n    _bright = (_TMP9 + _luma)/2.00000000E+00;\n    _TMP31 = min(6.49999976E-01, _bright);\n    _TMP183 = max(3.49999994E-01, _TMP31);\n    _x0190 = _bright*1.50000000E+00;\n    _TMP31 = min(1.50000000E+00, _x0190);\n    _TMP189 = max(1.50000000E+00, _TMP31);\n    _a0196 = TEX0.y*2.00000000E+00*3.14159274E+00*TextureSize.y;\n    _TMP10 = cos(_a0196);\n    _x0198 = _TMP10*5.00000000E-01 + 5.00000000E-01;\n    _TMP11 = pow(_x0198, _TMP189);\n    _scan_weight = 1.00000000E+00 - _TMP11;\n    _x0200 = (TEX0.xy*OutputSize*TextureSize)/InputSize;\n    _mod_fac = floor(_x0200);\n    _x0208 = _mod_fac.x/3.00000000E+00;\n    _TMP32 = floor(_x0208);\n    _TMP13 = _mod_fac.x - 3.00000000E+00*_TMP32;\n    _dot_no = int(_TMP13);\n    if (_dot_no == 0) {\n    _mask_weight = vec3( 1.00000000E+00, 6.99999988E-01, 6.99999988E-01);\n    } else {\n    if (_dot_no == 1) {\n    _mask_weight = vec3( 6.99999988E-01, 1.00000000E+00, 6.99999988E-01);\n    } else {\n    _mask_weight = vec3( 6.99999988E-01, 6.99999988E-01, 1.00000000E+00);\n    }\n    }\n    if (InputSize.y >= 4.00000000E+02) {\n    _scan_weight = 1.00000000E+00;\n    }\n    _col21 = _col2.xyz;\n    _col2 = _col2*vec3(_scan_weight, _scan_weight, _scan_weight);\n    _col2 = _col2 + _TMP183*(_col21 - _col2);\n    _col2 = _col2*_mask_weight;\n    _TMP28 = pow(_col2.x, 5.55555582E-01);\n    _TMP29 = pow(_col2.y, 5.55555582E-01);\n    _TMP30 = pow(_col2.z, 5.55555582E-01);\n    _col2 = vec3(_TMP28, _TMP29, _TMP30);\n    _TMP37 = _col2*1.20000005E+00;\n    _ret_0 = vec4(_TMP37.x, _TMP37.y, _TMP37.z, 1.00000000E+00);\n    FragColor = _ret_0;\n    return;\n    }\n    #endif\n",
            "crt-aperture.glsl": "\n/*\nCRT Shader by EasyMode\nLicense: GPL\n*/\n/*\n#pragma parameter SHARPNESS_IMAGE \"Sharpness Image\" 1.0 1.0 5.0 1.0\n#pragma parameter SHARPNESS_EDGES \"Sharpness Edges\" 3.0 1.0 5.0 1.0\n#pragma parameter GLOW_WIDTH \"Glow Width\" 0.5 0.05 0.65 0.05\n#pragma parameter GLOW_HEIGHT \"Glow Height\" 0.5 0.05 0.65 0.05\n#pragma parameter GLOW_HALATION \"Glow Halation\" 0.1 0.0 1.0 0.01\n#pragma parameter GLOW_DIFFUSION \"Glow Diffusion\" 0.05 0.0 1.0 0.01\n#pragma parameter MASK_COLORS \"Mask Colors\" 2.0 2.0 3.0 1.0\n#pragma parameter MASK_STRENGTH \"Mask Strength\" 0.3 0.0 1.0 0.05\n#pragma parameter MASK_SIZE \"Mask Size\" 1.0 1.0 9.0 1.0\n#pragma parameter SCANLINE_SIZE_MIN \"Scanline Size Min.\" 0.5 0.5 1.5 0.05\n#pragma parameter SCANLINE_SIZE_MAX \"Scanline Size Max.\" 1.5 0.5 1.5 0.05\n#pragma parameter GAMMA_INPUT \"Gamma Input\" 2.4 1.0 5.0 0.1\n#pragma parameter GAMMA_OUTPUT \"Gamma Output\" 2.4 1.0 5.0 0.1\n#pragma parameter BRIGHTNESS \"Brightness\" 1.5 0.0 2.0 0.05\n* */\n\n#define Coord TEX0\n\n#if defined(VERTEX)\n\n#if __VERSION__ >= 130\n#define OUT out\n#define IN  in\n#define tex2D texture\n#else\n#define OUT varying \n#define IN attribute \n#define tex2D texture2D\n#endif\n\n#ifdef GL_ES\n#define PRECISION mediump\n#else\n#define PRECISION\n#endif\n\nIN  vec4 VertexCoord;\nIN  vec4 Color;\nIN  vec2 TexCoord;\nOUT vec4 color;\nOUT vec2 Coord;\n\nuniform mat4 MVPMatrix;\nuniform PRECISION int FrameDirection;\nuniform PRECISION int FrameCount;\nuniform PRECISION vec2 OutputSize;\nuniform PRECISION vec2 TextureSize;\nuniform PRECISION vec2 InputSize;\n\nvoid main()\n{\ngl_Position = MVPMatrix * VertexCoord;\ncolor = Color;\nCoord = TexCoord;\n}\n\n#elif defined(FRAGMENT)\n\n#if __VERSION__ >= 130\n#define IN in\n#define tex2D texture\nout vec4 FragColor;\n#else\n#define IN varying\n#define FragColor gl_FragColor\n#define tex2D texture2D\n#endif\n\n#ifdef GL_ES\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n#define PRECISION mediump\n#else\n#define PRECISION\n#endif\n\nuniform PRECISION int FrameDirection;\nuniform PRECISION int FrameCount;\nuniform PRECISION vec2 OutputSize;\nuniform PRECISION vec2 TextureSize;\nuniform PRECISION vec2 InputSize;\nuniform sampler2D Texture;\nIN vec2 Coord;\n\n#ifdef PARAMETER_UNIFORM\nuniform PRECISION float SHARPNESS_IMAGE;\nuniform PRECISION float SHARPNESS_EDGES;\nuniform PRECISION float GLOW_WIDTH;\nuniform PRECISION float GLOW_HEIGHT;\nuniform PRECISION float GLOW_HALATION;\nuniform PRECISION float GLOW_DIFFUSION;\nuniform PRECISION float MASK_COLORS;\nuniform PRECISION float MASK_STRENGTH;\nuniform PRECISION float MASK_SIZE;\nuniform PRECISION float SCANLINE_SIZE_MIN;\nuniform PRECISION float SCANLINE_SIZE_MAX;\nuniform PRECISION float GAMMA_INPUT;\nuniform PRECISION float GAMMA_OUTPUT;\nuniform PRECISION float BRIGHTNESS;\n#else\n#define SHARPNESS_IMAGE 1.0\n#define SHARPNESS_EDGES 3.0\n#define GLOW_WIDTH 0.5\n#define GLOW_HEIGHT 0.5\n#define GLOW_HALATION 0.1\n#define GLOW_DIFFUSION 0.05\n#define MASK_COLORS 2.0\n#define MASK_STRENGTH 0.3\n#define MASK_SIZE 1.0\n#define SCANLINE_SIZE_MIN 0.5\n#define SCANLINE_SIZE_MAX 1.5\n#define GAMMA_INPUT 2.4\n#define GAMMA_OUTPUT 2.4\n#define BRIGHTNESS 1.5\n#endif\n\n#define FIX(c) max(abs(c), 1e-5)\n#define PI 3.141592653589\n#define saturate(c) clamp(c, 0.0, 1.0)\n#define TEX2D(c) pow(tex2D(tex, c).rgb, vec3(GAMMA_INPUT))\n\nmat3 get_color_matrix(sampler2D tex, vec2 co, vec2 dx)\n{\nreturn mat3(TEX2D(co - dx), TEX2D(co), TEX2D(co + dx));\n}\n\nvec3 blur(mat3 m, float dist, float rad)\n{\nvec3 x = vec3(dist - 1.0, dist, dist + 1.0) / rad;\nvec3 w = exp2(x * x * -1.0);\n\nreturn (m[0] * w.x + m[1] * w.y + m[2] * w.z) / (w.x + w.y + w.z);\n}\n\nvec3 filter_gaussian(sampler2D tex, vec2 co, vec2 tex_size)\n{\nvec2 dx = vec2(1.0 / tex_size.x, 0.0);\nvec2 dy = vec2(0.0, 1.0 / tex_size.y);\nvec2 pix_co = co * tex_size;\nvec2 tex_co = (floor(pix_co) + 0.5) / tex_size;\nvec2 dist = (fract(pix_co) - 0.5) * -1.0;\n\nmat3 line0 = get_color_matrix(tex, tex_co - dy, dx);\nmat3 line1 = get_color_matrix(tex, tex_co, dx);\nmat3 line2 = get_color_matrix(tex, tex_co + dy, dx);\nmat3 column = mat3(blur(line0, dist.x, GLOW_WIDTH),\n                       blur(line1, dist.x, GLOW_WIDTH),\n                       blur(line2, dist.x, GLOW_WIDTH));\n\nreturn blur(column, dist.y, GLOW_HEIGHT);\n}\n\nvec3 filter_lanczos(sampler2D tex, vec2 co, vec2 tex_size, float sharp)\n{\ntex_size.x *= sharp;\n\nvec2 dx = vec2(1.0 / tex_size.x, 0.0);\nvec2 pix_co = co * tex_size - vec2(0.5, 0.0);\nvec2 tex_co = (floor(pix_co) + vec2(0.5, 0.0)) / tex_size;\nvec2 dist = fract(pix_co);\nvec4 coef = PI * vec4(dist.x + 1.0, dist.x, dist.x - 1.0, dist.x - 2.0);\n\ncoef = FIX(coef);\ncoef = 2.0 * sin(coef) * sin(coef / 2.0) / (coef * coef);\ncoef /= dot(coef, vec4(1.0));\n\nvec4 col1 = vec4(TEX2D(tex_co), 1.0);\nvec4 col2 = vec4(TEX2D(tex_co + dx), 1.0);\n\nreturn (mat4(col1, col1, col2, col2) * coef).rgb;\n}\n\nvec3 get_scanline_weight(float x, vec3 col)\n{\nvec3 beam = mix(vec3(SCANLINE_SIZE_MIN), vec3(SCANLINE_SIZE_MAX), col);\nvec3 x_mul = 2.0 / beam;\nvec3 x_offset = x_mul * 0.5;\n\nreturn smoothstep(0.0, 1.0, 1.0 - abs(x * x_mul - x_offset)) * x_offset;\n}\n\nvec3 get_mask_weight(float x)\n{\nfloat i = mod(floor(x * OutputSize.x * TextureSize.x / (InputSize.x * MASK_SIZE)), MASK_COLORS);\n\nif (i == 0.0) return mix(vec3(1.0, 0.0, 1.0), vec3(1.0, 0.0, 0.0), MASK_COLORS - 2.0);\nelse if (i == 1.0) return vec3(0.0, 1.0, 0.0);\nelse return vec3(0.0, 0.0, 1.0);\n}\n\nvoid main()\n{\nvec3 col_glow = filter_gaussian(Texture, Coord, TextureSize);\nvec3 col_soft = filter_lanczos(Texture, Coord, TextureSize, SHARPNESS_IMAGE);\nvec3 col_sharp = filter_lanczos(Texture, Coord, TextureSize, SHARPNESS_EDGES);\nvec3 col = sqrt(col_sharp * col_soft);\n\ncol *= get_scanline_weight(fract(Coord.y * TextureSize.y), col_soft);\ncol_glow = saturate(col_glow - col);\ncol += col_glow * col_glow * GLOW_HALATION;\ncol = mix(col, col * get_mask_weight(Coord.x) * MASK_COLORS, MASK_STRENGTH);\ncol += col_glow * GLOW_DIFFUSION;\ncol = pow(col * BRIGHTNESS, vec3(1.0 / GAMMA_OUTPUT));\n\nFragColor = vec4(col, 1.0);\n}\n\n#endif\n",
            "crt-geom.glsl": "\n/*\nCRT-interlaced\n\nCopyright (C) 2010-2012 cgwg, Themaister and DOLLS\n\nThis program is free software; you can redistribute it and/or modify it\nunder the terms of the GNU General Public License as published by the Free\nSoftware Foundation; either version 2 of the License, or (at your option)\nany later version.\n\n(cgwg gave their consent to have the original version of this shader\ndistributed under the GPL in this message:\n\nhttp://board.byuu.org/viewtopic.php?p=26075#p26075\n\n\"Feel free to distribute my shaders under the GPL. After all, the\nbarrel distortion code was taken from the Curvature shader, which is\nunder the GPL.\"\n)\nThis shader variant is pre-configured with screen curvature\n*/\n/*\n#pragma parameter CRTgamma \"CRTGeom Target Gamma\" 2.4 0.1 5.0 0.1\n#pragma parameter monitorgamma \"CRTGeom Monitor Gamma\" 2.2 0.1 5.0 0.1\n#pragma parameter d \"CRTGeom Distance\" 1.6 0.1 3.0 0.1\n#pragma parameter CURVATURE \"CRTGeom Curvature Toggle\" 1.0 0.0 1.0 1.0\n#pragma parameter R \"CRTGeom Curvature Radius\" 2.0 0.1 10.0 0.1\n#pragma parameter cornersize \"CRTGeom Corner Size\" 0.03 0.001 1.0 0.005\n#pragma parameter cornersmooth \"CRTGeom Corner Smoothness\" 1000.0 80.0 2000.0 100.0\n#pragma parameter x_tilt \"CRTGeom Horizontal Tilt\" 0.0 -0.5 0.5 0.05\n#pragma parameter y_tilt \"CRTGeom Vertical Tilt\" 0.0 -0.5 0.5 0.05\n#pragma parameter overscan_x \"CRTGeom Horiz. Overscan %\" 100.0 -125.0 125.0 1.0\n#pragma parameter overscan_y \"CRTGeom Vert. Overscan %\" 100.0 -125.0 125.0 1.0\n#pragma parameter DOTMASK \"CRTGeom Dot Mask Toggle\" 0.3 0.0 0.3 0.3\n#pragma parameter SHARPER \"CRTGeom Sharpness\" 1.0 1.0 3.0 1.0\n#pragma parameter scanline_weight \"CRTGeom Scanline Weight\" 0.3 0.1 0.5 0.05\n*/\n\n#ifndef PARAMETER_UNIFORM\n#define CRTgamma 2.4\n#define monitorgamma 2.2\n#define d 1.6\n#define CURVATURE 1.0\n#define R 2.0\n#define cornersize 0.03\n#define cornersmooth 1000.0\n#define x_tilt 0.0\n#define y_tilt 0.0\n#define overscan_x 100.0\n#define overscan_y 100.0\n#define DOTMASK 0.3\n#define SHARPER 1.0\n#define scanline_weight 0.3\n#endif\n\n#if defined(VERTEX)\n\n#if __VERSION__ >= 130\n#define COMPAT_VARYING out\n#define COMPAT_ATTRIBUTE in\n#define COMPAT_TEXTURE texture\n#else\n#define COMPAT_VARYING varying \n#define COMPAT_ATTRIBUTE attribute \n#define COMPAT_TEXTURE texture2D\n#endif\n\n#ifdef GL_ES\n#define COMPAT_PRECISION mediump\n#else\n#define COMPAT_PRECISION\n#endif\n\nCOMPAT_ATTRIBUTE vec4 VertexCoord;\nCOMPAT_ATTRIBUTE vec4 COLOR;\nCOMPAT_ATTRIBUTE vec4 TexCoord;\nCOMPAT_VARYING vec4 COL0;\nCOMPAT_VARYING vec4 TEX0;\n\nvec4 _oPosition1; \nuniform mat4 MVPMatrix;\nuniform COMPAT_PRECISION int FrameDirection;\nuniform COMPAT_PRECISION int FrameCount;\nuniform COMPAT_PRECISION vec2 OutputSize;\nuniform COMPAT_PRECISION vec2 TextureSize;\nuniform COMPAT_PRECISION vec2 InputSize;\n\nCOMPAT_VARYING vec2 overscan;\nCOMPAT_VARYING vec2 aspect;\nCOMPAT_VARYING vec3 stretch;\nCOMPAT_VARYING vec2 sinangle;\nCOMPAT_VARYING vec2 cosangle;\nCOMPAT_VARYING vec2 one;\nCOMPAT_VARYING float mod_factor;\nCOMPAT_VARYING vec2 ilfac;\n\n#ifdef PARAMETER_UNIFORM\nuniform COMPAT_PRECISION float CRTgamma;\nuniform COMPAT_PRECISION float monitorgamma;\nuniform COMPAT_PRECISION float d;\nuniform COMPAT_PRECISION float CURVATURE;\nuniform COMPAT_PRECISION float R;\nuniform COMPAT_PRECISION float cornersize;\nuniform COMPAT_PRECISION float cornersmooth;\nuniform COMPAT_PRECISION float x_tilt;\nuniform COMPAT_PRECISION float y_tilt;\nuniform COMPAT_PRECISION float overscan_x;\nuniform COMPAT_PRECISION float overscan_y;\nuniform COMPAT_PRECISION float DOTMASK;\nuniform COMPAT_PRECISION float SHARPER;\nuniform COMPAT_PRECISION float scanline_weight;\n#endif\n\n#define FIX(c) max(abs(c), 1e-5);\n\nfloat intersect(vec2 xy)\n{\nfloat A = dot(xy,xy)+d*d;\nfloat B = 2.0*(R*(dot(xy,sinangle)-d*cosangle.x*cosangle.y)-d*d);\nfloat C = d*d + 2.0*R*d*cosangle.x*cosangle.y;\nreturn (-B-sqrt(B*B-4.0*A*C))/(2.0*A);\n}\n\nvec2 bkwtrans(vec2 xy)\n{\nfloat c = intersect(xy);\nvec2 point = vec2(c)*xy;\npoint -= vec2(-R)*sinangle;\npoint /= vec2(R);\nvec2 tang = sinangle/cosangle;\nvec2 poc = point/cosangle;\nfloat A = dot(tang,tang)+1.0;\nfloat B = -2.0*dot(poc,tang);\nfloat C = dot(poc,poc)-1.0;\nfloat a = (-B+sqrt(B*B-4.0*A*C))/(2.0*A);\nvec2 uv = (point-a*sinangle)/cosangle;\nfloat r = R*acos(a);\nreturn uv*r/sin(r/R);\n}\n\nvec2 fwtrans(vec2 uv)\n{\nfloat r = FIX(sqrt(dot(uv,uv)));\nuv *= sin(r/R)/r;\nfloat x = 1.0-cos(r/R);\nfloat D = d/R + x*cosangle.x*cosangle.y+dot(uv,sinangle);\nreturn d*(uv*cosangle-x*sinangle)/D;\n}\n\nvec3 maxscale()\n{\nvec2 c = bkwtrans(-R * sinangle / (1.0 + R/d*cosangle.x*cosangle.y));\nvec2 a = vec2(0.5,0.5)*aspect;\nvec2 lo = vec2(fwtrans(vec2(-a.x,c.y)).x, fwtrans(vec2(c.x,-a.y)).y)/aspect;\nvec2 hi = vec2(fwtrans(vec2(+a.x,c.y)).x, fwtrans(vec2(c.x,+a.y)).y)/aspect;\nreturn vec3((hi+lo)*aspect*0.5,max(hi.x-lo.x,hi.y-lo.y));\n}\n\nvoid main()\n{\n// START of parameters\n\n// gamma of simulated CRT\n//\tCRTgamma = 1.8;\n// gamma of display monitor (typically 2.2 is correct)\n//\tmonitorgamma = 2.2;\n// overscan (e.g. 1.02 for 2% overscan)\noverscan = vec2(1.00,1.00);\n// aspect ratio\naspect = vec2(1.0, 0.75);\n// lengths are measured in units of (approximately) the width\n// of the monitor simulated distance from viewer to monitor\n//\td = 2.0;\n// radius of curvature\n//\tR = 1.5;\n// tilt angle in radians\n// (behavior might be a bit wrong if both components are\n// nonzero)\nconst vec2 angle = vec2(0.0,0.0);\n// size of curved corners\n//\tcornersize = 0.03;\n// border smoothness parameter\n// decrease if borders are too aliased\n//\tcornersmooth = 1000.0;\n\n// END of parameters\n\nvec4 _oColor;\nvec2 _otexCoord;\ngl_Position = VertexCoord.x * MVPMatrix[0] + VertexCoord.y * MVPMatrix[1] + VertexCoord.z * MVPMatrix[2] + VertexCoord.w * MVPMatrix[3];\n_oPosition1 = gl_Position;\n_oColor = COLOR;\n_otexCoord = TexCoord.xy;\nCOL0 = COLOR;\nTEX0.xy = TexCoord.xy;\n\n// Precalculate a bunch of useful values we'll need in the fragment\n// shader.\nsinangle = sin(vec2(x_tilt, y_tilt)) + vec2(0.001);//sin(vec2(max(abs(x_tilt), 1e-3), max(abs(y_tilt), 1e-3)));\ncosangle = cos(vec2(x_tilt, y_tilt)) + vec2(0.001);//cos(vec2(max(abs(x_tilt), 1e-3), max(abs(y_tilt), 1e-3)));\nstretch = maxscale();\n\nilfac = vec2(1.0,clamp(floor(InputSize.y/200.0), 1.0, 2.0));\n\n// The size of one texel, in texture-coordinates.\nvec2 sharpTextureSize = vec2(SHARPER * TextureSize.x, TextureSize.y);\none = ilfac / sharpTextureSize;\n\n// Resulting X pixel-coordinate of the pixel we're drawing.\nmod_factor = TexCoord.x * TextureSize.x * OutputSize.x / InputSize.x;\n\n}\n\n#elif defined(FRAGMENT)\n\n#if __VERSION__ >= 130\n#define COMPAT_VARYING in\n#define COMPAT_TEXTURE texture\nout vec4 FragColor;\n#else\n#define COMPAT_VARYING varying\n#define FragColor gl_FragColor\n#define COMPAT_TEXTURE texture2D\n#endif\n\n#ifdef GL_ES\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n#define COMPAT_PRECISION mediump\n#else\n#define COMPAT_PRECISION\n#endif\n\nstruct output_dummy {\nvec4 _color;\n};\n\nuniform COMPAT_PRECISION int FrameDirection;\nuniform COMPAT_PRECISION int FrameCount;\nuniform COMPAT_PRECISION vec2 OutputSize;\nuniform COMPAT_PRECISION vec2 TextureSize;\nuniform COMPAT_PRECISION vec2 InputSize;\nuniform sampler2D Texture;\nCOMPAT_VARYING vec4 TEX0;\n\n// Comment the next line to disable interpolation in linear gamma (and\n// gain speed).\n#define LINEAR_PROCESSING\n\n// Enable screen curvature.\n//        #define CURVATURE\n\n// Enable 3x oversampling of the beam profile\n#define OVERSAMPLE\n\n// Use the older, purely gaussian beam profile\n//#define USEGAUSSIAN\n\n// Macros.\n#define FIX(c) max(abs(c), 1e-5);\n#define PI 3.141592653589\n\n#ifdef LINEAR_PROCESSING\n#       define TEX2D(c) pow(COMPAT_TEXTURE(Texture, (c)), vec4(CRTgamma))\n#else\n#       define TEX2D(c) COMPAT_TEXTURE(Texture, (c))\n#endif\n\nCOMPAT_VARYING vec2 one;\nCOMPAT_VARYING float mod_factor;\nCOMPAT_VARYING vec2 ilfac;\nCOMPAT_VARYING vec2 overscan;\nCOMPAT_VARYING vec2 aspect;\nCOMPAT_VARYING vec3 stretch;\nCOMPAT_VARYING vec2 sinangle;\nCOMPAT_VARYING vec2 cosangle;\n\n#ifdef PARAMETER_UNIFORM\nuniform COMPAT_PRECISION float CRTgamma;\nuniform COMPAT_PRECISION float monitorgamma;\nuniform COMPAT_PRECISION float d;\nuniform COMPAT_PRECISION float CURVATURE;\nuniform COMPAT_PRECISION float R;\nuniform COMPAT_PRECISION float cornersize;\nuniform COMPAT_PRECISION float cornersmooth;\nuniform COMPAT_PRECISION float x_tilt;\nuniform COMPAT_PRECISION float y_tilt;\nuniform COMPAT_PRECISION float overscan_x;\nuniform COMPAT_PRECISION float overscan_y;\nuniform COMPAT_PRECISION float DOTMASK;\nuniform COMPAT_PRECISION float SHARPER;\nuniform COMPAT_PRECISION float scanline_weight;\n#endif\n\nfloat intersect(vec2 xy)\n{\nfloat A = dot(xy,xy)+d*d;\nfloat B = 2.0*(R*(dot(xy,sinangle)-d*cosangle.x*cosangle.y)-d*d);\nfloat C = d*d + 2.0*R*d*cosangle.x*cosangle.y;\nreturn (-B-sqrt(B*B-4.0*A*C))/(2.0*A);\n}\n\nvec2 bkwtrans(vec2 xy)\n{\nfloat c = intersect(xy);\nvec2 point = vec2(c)*xy;\npoint -= vec2(-R)*sinangle;\npoint /= vec2(R);\nvec2 tang = sinangle/cosangle;\nvec2 poc = point/cosangle;\nfloat A = dot(tang,tang)+1.0;\nfloat B = -2.0*dot(poc,tang);\nfloat C = dot(poc,poc)-1.0;\nfloat a = (-B+sqrt(B*B-4.0*A*C))/(2.0*A);\nvec2 uv = (point-a*sinangle)/cosangle;\nfloat r = FIX(R*acos(a));\nreturn uv*r/sin(r/R);\n}\n\nvec2 transform(vec2 coord)\n{\ncoord *= TextureSize / InputSize;\ncoord = (coord-vec2(0.5))*aspect*stretch.z+stretch.xy;\nreturn (bkwtrans(coord)/vec2(overscan_x / 100.0, overscan_y / 100.0)/aspect+vec2(0.5)) * InputSize / TextureSize;\n}\n\nfloat corner(vec2 coord)\n{\ncoord *= TextureSize / InputSize;\ncoord = (coord - vec2(0.5)) * vec2(overscan_x / 100.0, overscan_y / 100.0) + vec2(0.5);\ncoord = min(coord, vec2(1.0)-coord) * aspect;\nvec2 cdist = vec2(cornersize);\ncoord = (cdist - min(coord,cdist));\nfloat dist = sqrt(dot(coord,coord));\nreturn clamp((cdist.x-dist)*cornersmooth,0.0, 1.0);\n}\n\n// Calculate the influence of a scanline on the current pixel.\n//\n// 'distance' is the distance in texture coordinates from the current\n// pixel to the scanline in question.\n// 'color' is the colour of the scanline at the horizontal location of\n// the current pixel.\nvec4 scanlineWeights(float distance, vec4 color)\n{\n// \"wid\" controls the width of the scanline beam, for each RGB\n// channel The \"weights\" lines basically specify the formula\n// that gives you the profile of the beam, i.e. the intensity as\n// a function of distance from the vertical center of the\n// scanline. In this case, it is gaussian if width=2, and\n// becomes nongaussian for larger widths. Ideally this should\n// be normalized so that the integral across the beam is\n// independent of its width. That is, for a narrower beam\n// \"weights\" should have a higher peak at the center of the\n// scanline than for a wider beam.\n#ifdef USEGAUSSIAN\nvec4 wid = 0.3 + 0.1 * pow(color, vec4(3.0));\nvec4 weights = vec4(distance / wid);\nreturn 0.4 * exp(-weights * weights) / wid;\n#else\nvec4 wid = 2.0 + 2.0 * pow(color, vec4(4.0));\nvec4 weights = vec4(distance / scanline_weight);\nreturn 1.4 * exp(-pow(weights * inversesqrt(0.5 * wid), wid)) / (0.6 + 0.2 * wid);\n#endif\n}\n\nvoid main()\n{\n// Here's a helpful diagram to keep in mind while trying to\n// understand the code:\n//\n//  |      |      |      |      |\n// -------------------------------\n//  |      |      |      |      |\n//  |  01  |  11  |  21  |  31  | <-- current scanline\n//  |      | @    |      |      |\n// -------------------------------\n//  |      |      |      |      |\n//  |  02  |  12  |  22  |  32  | <-- next scanline\n//  |      |      |      |      |\n// -------------------------------\n//  |      |      |      |      |\n//\n// Each character-cell represents a pixel on the output\n// surface, \"@\" represents the current pixel (always somewhere\n// in the bottom half of the current scan-line, or the top-half\n// of the next scanline). The grid of lines represents the\n// edges of the texels of the underlying texture.\n\n// Texture coordinates of the texel containing the active pixel.\nvec2 xy = (CURVATURE > 0.5) ? transform(TEX0.xy) : TEX0.xy;\n\nfloat cval = corner(xy);\n\n// Of all the pixels that are mapped onto the texel we are\n// currently rendering, which pixel are we currently rendering?\nvec2 ilvec = vec2(0.0,ilfac.y > 1.5 ? mod(float(FrameCount),2.0) : 0.0);\nvec2 ratio_scale = (xy * TextureSize - vec2(0.5) + ilvec)/ilfac;\n#ifdef OVERSAMPLE\nfloat filter_ = InputSize.y/OutputSize.y;//fwidth(ratio_scale.y);\n#endif\nvec2 uv_ratio = fract(ratio_scale);\n\n// Snap to the center of the underlying texel.\nxy = (floor(ratio_scale)*ilfac + vec2(0.5) - ilvec) / TextureSize;\n\n// Calculate Lanczos scaling coefficients describing the effect\n// of various neighbour texels in a scanline on the current\n// pixel.\nvec4 coeffs = PI * vec4(1.0 + uv_ratio.x, uv_ratio.x, 1.0 - uv_ratio.x, 2.0 - uv_ratio.x);\n\n// Prevent division by zero.\ncoeffs = FIX(coeffs);\n\n// Lanczos2 kernel.\ncoeffs = 2.0 * sin(coeffs) * sin(coeffs / 2.0) / (coeffs * coeffs);\n\n// Normalize.\ncoeffs /= dot(coeffs, vec4(1.0));\n\n// Calculate the effective colour of the current and next\n// scanlines at the horizontal location of the current pixel,\n// using the Lanczos coefficients above.\nvec4 col  = clamp(mat4(\n                TEX2D(xy + vec2(-one.x, 0.0)),\n                TEX2D(xy),\n                TEX2D(xy + vec2(one.x, 0.0)),\n                TEX2D(xy + vec2(2.0 * one.x, 0.0))) * coeffs,\n                0.0, 1.0);\nvec4 col2 = clamp(mat4(\n                TEX2D(xy + vec2(-one.x, one.y)),\n                TEX2D(xy + vec2(0.0, one.y)),\n                TEX2D(xy + one),\n                TEX2D(xy + vec2(2.0 * one.x, one.y))) * coeffs,\n                0.0, 1.0);\n\n#ifndef LINEAR_PROCESSING\ncol  = pow(col , vec4(CRTgamma));\ncol2 = pow(col2, vec4(CRTgamma));\n#endif\n\n// Calculate the influence of the current and next scanlines on\n// the current pixel.\nvec4 weights  = scanlineWeights(uv_ratio.y, col);\nvec4 weights2 = scanlineWeights(1.0 - uv_ratio.y, col2);\n#ifdef OVERSAMPLE\nuv_ratio.y =uv_ratio.y+1.0/3.0*filter_;\nweights = (weights+scanlineWeights(uv_ratio.y, col))/3.0;\nweights2=(weights2+scanlineWeights(abs(1.0-uv_ratio.y), col2))/3.0;\nuv_ratio.y =uv_ratio.y-2.0/3.0*filter_;\nweights=weights+scanlineWeights(abs(uv_ratio.y), col)/3.0;\nweights2=weights2+scanlineWeights(abs(1.0-uv_ratio.y), col2)/3.0;\n#endif\n\nvec3 mul_res  = (col * weights + col2 * weights2).rgb * vec3(cval);\n\n// dot-mask emulation:\n// Output pixels are alternately tinted green and magenta.\nvec3 dotMaskWeights = mix(\nvec3(1.0, 1.0 - DOTMASK, 1.0),\nvec3(1.0 - DOTMASK, 1.0, 1.0 - DOTMASK),\nfloor(mod(mod_factor, 2.0))\n);\n\nmul_res *= dotMaskWeights;\n\n// Convert the image gamma for display on our output device.\nmul_res = pow(mul_res, vec3(1.0 / monitorgamma));\n\n// Color the texel.\noutput_dummy _OUT;\n_OUT._color = vec4(mul_res, 1.0);\nFragColor = _OUT._color;\nreturn;\n} \n#endif\n\n",
            "crt-mattias.glsl": "\n#pragma parameter CURVATURE \"Curvature\" 0.5 0.0 1.0 0.05\n#pragma parameter SCANSPEED \"Scanline Crawl Speed\" 1.0 0.0 10.0 0.5\n#if defined(VERTEX)\n#if __VERSION__ >= 130\n#define COMPAT_VARYING out\n#define COMPAT_ATTRIBUTE in\n#define COMPAT_TEXTURE texture\n#else\n#define COMPAT_VARYING varying \n#define COMPAT_ATTRIBUTE attribute \n#define COMPAT_TEXTURE texture2D\n#endif\n\n#ifdef GL_ES\n#define COMPAT_PRECISION mediump\n#else\n#define COMPAT_PRECISION\n#endif\n\nCOMPAT_ATTRIBUTE vec4 VertexCoord;\nCOMPAT_ATTRIBUTE vec4 COLOR;\nCOMPAT_ATTRIBUTE vec4 TexCoord;\nCOMPAT_VARYING vec4 COL0;\nCOMPAT_VARYING vec4 TEX0;\n\nvec4 _oPosition1; \nuniform mat4 MVPMatrix;\nuniform COMPAT_PRECISION int FrameDirection;\nuniform COMPAT_PRECISION int FrameCount;\nuniform COMPAT_PRECISION vec2 OutputSize;\nuniform COMPAT_PRECISION vec2 TextureSize;\nuniform COMPAT_PRECISION vec2 InputSize;\n\n#define vTexCoord TEX0.xy\n#define SourceSize vec4(TextureSize, 1.0 / TextureSize) //either TextureSize or InputSize\n#define OutSize vec4(OutputSize, 1.0 / OutputSize)\n\nvoid main()\n{\n    gl_Position = MVPMatrix * VertexCoord;\n    TEX0.xy = TexCoord.xy;\n}\n\n#elif defined(FRAGMENT)\n\n#ifdef GL_ES\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n#define COMPAT_PRECISION mediump\n#else\n#define COMPAT_PRECISION\n#endif\n\n#if __VERSION__ >= 130\n#define COMPAT_VARYING in\n#define COMPAT_TEXTURE texture\nout COMPAT_PRECISION vec4 FragColor;\n#else\n#define COMPAT_VARYING varying\n#define FragColor gl_FragColor\n#define COMPAT_TEXTURE texture2D\n#endif\n\nuniform COMPAT_PRECISION int FrameDirection;\nuniform COMPAT_PRECISION int FrameCount;\nuniform COMPAT_PRECISION vec2 OutputSize;\nuniform COMPAT_PRECISION vec2 TextureSize;\nuniform COMPAT_PRECISION vec2 InputSize;\nuniform sampler2D Texture;\nCOMPAT_VARYING vec4 TEX0;\n\n// compatibility #defines\n#define Source Texture\n#define vTexCoord TEX0.xy\n\n#define SourceSize vec4(TextureSize, 1.0 / TextureSize) //either TextureSize or InputSize\n#define OutSize vec4(OutputSize, 1.0 / OutputSize)\n\n#ifdef PARAMETER_UNIFORM\nuniform COMPAT_PRECISION float CURVATURE, SCANSPEED;\n#else\n#define CURVATURE 0.5\n#define SCANSPEED 1.0\n#endif\n\n#define iChannel0 Texture\n#define iTime (float(FrameCount) / 60.0)\n#define iResolution OutputSize.xy\n#define fragCoord gl_FragCoord.xy\n\nvec3 sample_( sampler2D tex, vec2 tc )\n{\n    vec3 s = pow(COMPAT_TEXTURE(tex,tc).rgb, vec3(2.2));\n    return s;\n}\n\nvec3 blur(sampler2D tex, vec2 tc, float offs)\n{\n    vec4 xoffs = offs * vec4(-2.0, -1.0, 1.0, 2.0) / (iResolution.x * TextureSize.x / InputSize.x);\n    vec4 yoffs = offs * vec4(-2.0, -1.0, 1.0, 2.0) / (iResolution.y * TextureSize.y / InputSize.y);\n    tc = tc * InputSize / TextureSize;\n    \n    vec3 color = vec3(0.0, 0.0, 0.0);\n    color += sample_(tex,tc + vec2(xoffs.x, yoffs.x)) * 0.00366;\n    color += sample_(tex,tc + vec2(xoffs.y, yoffs.x)) * 0.01465;\n    color += sample_(tex,tc + vec2(    0.0, yoffs.x)) * 0.02564;\n    color += sample_(tex,tc + vec2(xoffs.z, yoffs.x)) * 0.01465;\n    color += sample_(tex,tc + vec2(xoffs.w, yoffs.x)) * 0.00366;\n    \n    color += sample_(tex,tc + vec2(xoffs.x, yoffs.y)) * 0.01465;\n    color += sample_(tex,tc + vec2(xoffs.y, yoffs.y)) * 0.05861;\n    color += sample_(tex,tc + vec2(    0.0, yoffs.y)) * 0.09524;\n    color += sample_(tex,tc + vec2(xoffs.z, yoffs.y)) * 0.05861;\n    color += sample_(tex,tc + vec2(xoffs.w, yoffs.y)) * 0.01465;\n    \n    color += sample_(tex,tc + vec2(xoffs.x, 0.0)) * 0.02564;\n    color += sample_(tex,tc + vec2(xoffs.y, 0.0)) * 0.09524;\n    color += sample_(tex,tc + vec2(    0.0, 0.0)) * 0.15018;\n    color += sample_(tex,tc + vec2(xoffs.z, 0.0)) * 0.09524;\n    color += sample_(tex,tc + vec2(xoffs.w, 0.0)) * 0.02564;\n    \n    color += sample_(tex,tc + vec2(xoffs.x, yoffs.z)) * 0.01465;\n    color += sample_(tex,tc + vec2(xoffs.y, yoffs.z)) * 0.05861;\n    color += sample_(tex,tc + vec2(    0.0, yoffs.z)) * 0.09524;\n    color += sample_(tex,tc + vec2(xoffs.z, yoffs.z)) * 0.05861;\n    color += sample_(tex,tc + vec2(xoffs.w, yoffs.z)) * 0.01465;\n    \n    color += sample_(tex,tc + vec2(xoffs.x, yoffs.w)) * 0.00366;\n    color += sample_(tex,tc + vec2(xoffs.y, yoffs.w)) * 0.01465;\n    color += sample_(tex,tc + vec2(    0.0, yoffs.w)) * 0.02564;\n    color += sample_(tex,tc + vec2(xoffs.z, yoffs.w)) * 0.01465;\n    color += sample_(tex,tc + vec2(xoffs.w, yoffs.w)) * 0.00366;\n\n    return color;\n}\n\nfloat rand(vec2 co)\n{\n    float a = 12.9898;\n    float b = 78.233;\n    float c = 43758.5453;\n    float dt= dot(co.xy ,vec2(a,b));\n    float sn= mod(dt,3.14);\n    return fract(sin(sn) * c);\n}\n\nvec2 curve(vec2 uv)\n{\n    uv = (uv - 0.5) * 2.0;\n    uv *= 1.1;\t\n    uv.x *= 1.0 + pow((abs(uv.y) / 5.0), 2.0);\n    uv.y *= 1.0 + pow((abs(uv.x) / 4.0), 2.0);\n    uv  = (uv / 2.0) + 0.5;\n    uv =  uv *0.92 + 0.04;\n    return uv;\n}\n\nvoid main()\n{\n    vec2 q = (vTexCoord.xy * TextureSize.xy / InputSize.xy);//fragCoord.xy / iResolution.xy;\n    vec2 uv = q;\n    uv = mix( uv, curve( uv ), CURVATURE ) * InputSize.xy / TextureSize.xy;\n    vec3 col;\n    float x =  sin(0.1*iTime+uv.y*21.0)*sin(0.23*iTime+uv.y*29.0)*sin(0.3+0.11*iTime+uv.y*31.0)*0.0017;\n    float o =2.0*mod(fragCoord.y,2.0)/iResolution.x;\n    x+=o;\n    uv = uv * TextureSize / InputSize;\n    col.r = 1.0*blur(iChannel0,vec2(uv.x+0.0009,uv.y+0.0009),1.2).x+0.005;\n    col.g = 1.0*blur(iChannel0,vec2(uv.x+0.000,uv.y-0.0015),1.2).y+0.005;\n    col.b = 1.0*blur(iChannel0,vec2(uv.x-0.0015,uv.y+0.000),1.2).z+0.005;\n    col.r += 0.2*blur(iChannel0,vec2(uv.x+0.0009,uv.y+0.0009),2.25).x-0.005;\n    col.g += 0.2*blur(iChannel0,vec2(uv.x+0.000,uv.y-0.0015),1.75).y-0.005;\n    col.b += 0.2*blur(iChannel0,vec2(uv.x-0.0015,uv.y+0.000),1.25).z-0.005;\n    float ghs = 0.05;\n    col.r += ghs*(1.0-0.299)*blur(iChannel0,0.75*vec2(0.01, -0.027)+vec2(uv.x+0.001,uv.y+0.001),7.0).x;\n    col.g += ghs*(1.0-0.587)*blur(iChannel0,0.75*vec2(-0.022, -0.02)+vec2(uv.x+0.000,uv.y-0.002),5.0).y;\n    col.b += ghs*(1.0-0.114)*blur(iChannel0,0.75*vec2(-0.02, -0.0)+vec2(uv.x-0.002,uv.y+0.000),3.0).z;\n    \n    \n\n    col = clamp(col*0.4+0.6*col*col*1.0,0.0,1.0);\n    float vig = (0.0 + 1.0*16.0*uv.x*uv.y*(1.0-uv.x)*(1.0-uv.y));\n    vig = pow(vig,0.3);\n    col *= vec3(vig);\n\n    col *= vec3(0.95,1.05,0.95);\n    col = mix( col, col * col, 0.3) * 3.8;\n\n    float scans = clamp( 0.35+0.15*sin(3.5*(iTime * SCANSPEED)+uv.y*iResolution.y*1.5), 0.0, 1.0);\n    \n    float s = pow(scans,0.9);\n    col = col*vec3( s) ;\n\n    col *= 1.0+0.0015*sin(300.0*iTime);\n    \n    col*=1.0-0.15*vec3(clamp((mod(fragCoord.x+o, 2.0)-1.0)*2.0,0.0,1.0));\n    col *= vec3( 1.0 ) - 0.25*vec3( rand( uv+0.0001*iTime),  rand( uv+0.0001*iTime + 0.3 ),  rand( uv+0.0001*iTime+ 0.5 )  );\n    col = pow(col, vec3(0.45));\n\n    if (uv.x < 0.0 || uv.x > 1.0)\n        col *= 0.0;\n    if (uv.y < 0.0 || uv.y > 1.0)\n        col *= 0.0;\n    \n\n    float comp = smoothstep( 0.1, 0.9, sin(iTime) );\n\n    FragColor = vec4(col,1.0);\n} \n#endif\n"
        },
        IDBStore = _0x2c1832(0x39),
        _0x550f17 = _0x2c1832(0xb),
        _0x5ab74d = {
            'addStyleHook': function() {
                _0x3a8e2f(this.elements.container, this.config.selectors.container.replace('.', ''), true), _0x3a8e2f(this.elements.container, this.config.classNames.uiSupported, true), _0x3a8e2f(this.elements.container, this.config.classNames.hideControls, true);
            },
            'build': function() {
                this.listeners.media(), _0x1e2c68.element(this.elements.controls) || (_0x2593da.inject.call(this), this.listeners.controls()), this.volume = null, this.muted = null, _0x2593da.updateVolume.call(this), _0x3a8e2f(this.elements.container, this.config.classNames.isTouch, this.touch), this.ready = true;
            },
            'toggleControls': function(_0x4dbb7a) {
                let _0x17edbf = this.elements.controls;
                if (_0x17edbf) {
                    let _0x2c1832 = 0,
                        _0x4b4cd5 = _0x23ffa1.call(this, '.' .concat(getClass({
                            'ejs__dialogs': true
                        }), ' > .').concat(getClass({
                            'ejs__dialog': true
                        })));
                    Array.from(_0x4b4cd5).forEach(function(_0x208a40, _0xd7fcf0) {
                        true !== _0x208a40.hidden && (_0x2c1832 += 1);
                    }), _0x2c1832 > 0 ? this.toggleControls(false) : this.toggleControls(Boolean(_0x4dbb7a || this.paused || _0x17edbf.pressed || _0x17edbf.hover));
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
        if ('object' === _0x5272a8(_0x4380c5) && _0x4380c5.files && (_0x4380c5 = _0x4380c5.files[0]), this.littleEndian = false, this.offset = 0, this._lastRead = null, 'object' === _0x5272a8(_0x4380c5) && _0x4380c5.name && _0x4380c5.size) {
            if ('function' != typeof window.FileReader) throw new Error('Incompatible Browser');
            this.fileName = _0x4380c5.name, this.fileType = _0x4380c5.type, this.fileSize = _0x4380c5.size, this._fileReader = new FileReader(), this._fileReader.marcFile = this, this._fileReader.addEventListener('load', function() {
                this.marcFile._u8array = new Uint8Array(this.result), this.marcFile._dataView = new DataView(this.result), _0x3c0d58 && _0x3c0d58.call();
            }, false), this._fileReader.readAsArrayBuffer(_0x4380c5);
        } else if ('object' === _0x5272a8(_0x4380c5) && 'string' == typeof _0x4380c5.fileName && 'boolean' == typeof _0x4380c5.littleEndian) {
            this.fileName = _0x4380c5.fileName, this.fileType = _0x4380c5.fileType, this.fileSize = _0x4380c5.fileSize;
            let _0x2c1832 = new ArrayBuffer(_0x4380c5);
            this._u8array = new Uint8Array(this.fileType), this._dataView = new DataView(this.fileType), _0x4380c5.copyToFile(this, 0), _0x3c0d58 && _0x3c0d58.call();
        } else if ('object' === _0x5272a8(_0x4380c5) && 'number' == typeof _0x4380c5.byteLength) this.fileName = 'file.bin', this.fileType = 'application/octet-stream', this.fileSize = _0x4380c5.byteLength, void 0 !== _0x4380c5.buffer && (_0x4380c5 = _0x4380c5.buffer), this._u8array = new Uint8Array(_0x4380c5), this._dataView = new DataView(_0x4380c5), _0x3c0d58 && _0x3c0d58.call();
        else {
            if ('number' != typeof _0x4380c5) throw new Error('Invalid source');
            this.fileName = 'file.bin', this.fileType = 'application/octet-stream', this.fileSize = _0x4380c5;
            _0x2c1832 = new ArrayBuffer(_0x4380c5);
            this._u8array = new Uint8Array(_0x2c1832), this._dataView = new DataView(_0x2c1832), _0x3c0d58 && _0x3c0d58.call();
        }
    }
    _0x3189ba.IS_MACHINE_LITTLE_ENDIAN = (_0x13fb79 = new ArrayBuffer(2), new DataView(_0x13fb79).setInt16(0, 0x100, true), 0x100 === new Int16Array(_0x13fb79)[0]), _0x3189ba.prototype.seek = function(_0x13e235) {
        this.offset = _0x13e235;
    }, _0x3189ba.prototype.skip = function(_0xfa033c) {
        this.offset += _0xfa033c;
    }, _0x3189ba.prototype.isEOF = function() {
        return !(this.offset < this.fileSize);
    }, _0x3189ba.prototype.slice = function(_0x2bfcbb, _0x8026e) {
        let _0x2c1832;
        return _0x8026e = _0x8026e || this.fileSize - _0x2bfcbb, void 0 !== this._u8array.buffer.slice ? ((_0x2c1832 = new _0x3189ba(0)).fileSize = _0x8026e, _0x2c1832._u8array = new Uint8Array(this._u8array.buffer.slice(_0x2bfcbb, _0x2bfcbb + _0x8026e))) : (_0x2c1832 = new _0x3189ba(_0x8026e), this.copyToFile(_0x2c1832, _0x2bfcbb, _0x8026e, 0)), _0x2c1832.fileName = this.fileName, _0x2c1832.fileType = this.fileType, _0x2c1832.littleEndian = this.littleEndian, _0x2c1832;
    }, _0x3189ba.prototype.copyToFile = function(_0x51f9b5, _0x1ada3e, _0x3997cd, _0x38ae1a) {
        void 0 === _0x38ae1a && (_0x38ae1a = _0x1ada3e), _0x3997cd = _0x3997cd || this.fileSize - _0x1ada3e;
        for (let _0x3bc3d8 = 0; _0x3bc3d8 < _0x3997cd; _0x3bc3d8++) _0x51f9b5._u8array[_0x38ae1a + _0x3bc3d8] = this._u8array[_0x1ada3e + _0x3bc3d8];
    }, _0x3189ba.prototype.save = function() {
        let _0xa88a13;
        try {
            _0xa88a13 = new Blob([this._u8array], {
                'type': this.fileType
            });
        } catch (_0x1dfb06) {
            if (window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder, 'InvalidStateError' !== _0x1dfb06.name || !window.BlobBuilder) throw new Error('Incompatible Browser');
            let _0x17edbf = new BlobBuilder();
            _0x17edbf.append(this._u8array.buffer), _0xa88a13 = _0x17edbf.getBlob(this.fileType);
        }
        saveAs(_0xa88a13, this.fileName);
    }, _0x3189ba.prototype.readU8 = function() {
        return this._lastRead = this._u8array[this.offset], this.offset++, this._lastRead;
    }, _0x3189ba.prototype.readU16 = function() {
        return this.littleEndian ? this._lastRead = this._u8array[this.offset] + (this._u8array[this.offset + 1] << 0x8) : this._lastRead = (this._u8array[this.offset] << 0x8) + this._u8array[this.offset + 1], this.offset += 2, this._lastRead >>> 0;
    }, _0x3189ba.prototype.readU24 = function() {
        return this.littleEndian ? this._lastRead = this._u8array[this.offset] + (this._u8array[this.offset + 1] << 0x8) + (this._u8array[this.offset + 2] << 0x10) : this._lastRead = (this._u8array[this.offset] << 0x10) + (this._u8array[this.offset + 1] << 0x8) + this._u8array[this.offset + 2], this.offset += 3, this._lastRead >>> 0;
    }, _0x3189ba.prototype.readU32 = function() {
        return this.littleEndian ? this._lastRead = this._u8array[this.offset] + (this._u8array[this.offset + 1] << 0x8) + (this._u8array[this.offset + 2] << 0x10) + (this._u8array[this.offset + 3] << 0x18) : this._lastRead = (this._u8array[this.offset] << 0x18) + (this._u8array[this.offset + 1] << 0x10) + (this._u8array[this.offset + 2] << 0x8) + this._u8array[this.offset + 3], this.offset += 4, this._lastRead >>> 0;
    }, _0x3189ba.prototype.readBytes = function(_0x455cfd) {
        this._lastRead = new Array(_0x455cfd);
        for (let _0x17edbf = 0; _0x17edbf < _0x455cfd; _0x17edbf++) this._lastRead[_0x17edbf] = this._u8array[this.offset + _0x17edbf];
        return this.offset += _0x455cfd, this._lastRead;
    }, _0x3189ba.prototype.readString = function(_0x4fe914) {
        this._lastRead = '';
        for (let _0x17edbf = 0; _0x17edbf < _0x4fe914 && this.offset + _0x17edbf < this.fileSize && this._u8array[this.offset + _0x17edbf] > 0; _0x17edbf++) this._lastRead = this._lastRead + String.fromCharCode(this._u8array[this.offset + _0x17edbf]);
        return this.offset += _0x4fe914, this._lastRead;
    }, _0x3189ba.prototype.writeU8 = function(_0x276206) {
        this._u8array[this.offset] = _0x276206, this.offset++;
    }, _0x3189ba.prototype.writeU16 = function(_0x1bfd8f) {
        this.littleEndian ? (this._u8array[this.offset] = 0xff & _0x1bfd8f, this._u8array[this.offset + 1] = _0x1bfd8f >> 0x8) : (this._u8array[this.offset] = _0x1bfd8f >> 0x8, this._u8array[this.offset + 1] = 0xff & _0x1bfd8f), this.offset += 2;
    }, _0x3189ba.prototype.writeU24 = function(_0x3d6067) {
        this.littleEndian ? (this._u8array[this.offset] = 0xff & _0x3d6067, this._u8array[this.offset + 1] = (0xff00 & _0x3d6067) >> 0x8, this._u8array[this.offset + 2] = (0xff0000 & _0x3d6067) >> 0x10) : (this._u8array[this.offset] = (0xff0000 & _0x3d6067) >> 0x10, this._u8array[this.offset + 1] = (0xff00 & _0x3d6067) >> 0x8, this._u8array[this.offset + 2] = 0xff & _0x3d6067), this.offset += 3;
    }, _0x3189ba.prototype.writeU32 = function(_0xa4dd26) {
        this.littleEndian ? (this._u8array[this.offset] = 0xff & _0xa4dd26, this._u8array[this.offset + 1] = (0xff00 & _0xa4dd26) >> 0x8, this._u8array[this.offset + 2] = (0xff0000 & _0xa4dd26) >> 0x10, this._u8array[this.offset + 3] = (0xff000000 & _0xa4dd26) >> 0x18) : (this._u8array[this.offset] = (0xff000000 & _0xa4dd26) >> 0x18, this._u8array[this.offset + 1] = (0xff0000 & _0xa4dd26) >> 0x10, this._u8array[this.offset + 2] = (0xff00 & _0xa4dd26) >> 0x8, this._u8array[this.offset + 3] = 0xff & _0xa4dd26), this.offset += 0x4;
    }, _0x3189ba.prototype.writeBytes = function(_0x5ad6b9) {
        for (let _0x17edbf = 0; _0x17edbf < _0x5ad6b9.length; _0x17edbf++) this._u8array[this.offset + _0x17edbf] = _0x5ad6b9[_0x17edbf];
        this.offset += _0x5ad6b9.length;
    }, _0x3189ba.prototype.writeString = function(_0x58c146, _0x23e582) {
        _0x23e582 = _0x23e582 || _0x58c146.length;
        for (let _0x2c1832 = 0; _0x2c1832 < _0x58c146.length && _0x2c1832 < _0x23e582; _0x2c1832++) this._u8array[this.offset + _0x2c1832] = _0x58c146.charCodeAt(_0x2c1832);
        for (; _0x2c1832 < _0x23e582; _0x2c1832++) this._u8array[this.offset + _0x2c1832] = 0;
        this.offset += _0x23e582;
    };
    let _0x863031 = _0x3189ba,
        _0x34e7cf = 0;

    function _0x454881() {
        this.records = [], this.truncate = false;
    }

    function _0x288092(_0x1ab789) {
        let _0x17edbf = new _0x454881();
        _0x1ab789.seek(0x5);
        for (let _0x2c1832 = 0, _0x195f00 = 0; !_0x1ab789.isEOF();) {
            if (0x454f46 === (_0x2c1832 = _0x1ab789.readU24())) {
                if (_0x1ab789.isEOF()) break;
                if (_0x1ab789.offset + 3 === _0x1ab789.fileSize) {
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
            'type': 1,
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
        nSimpleRecords = 0, nRLERecords = 0;
        for (let _0xa88a13 = 0; _0xa88a13 < this.records.length; _0xa88a13++) this.records[_0xa88a13].type === _0x34e7cf ? nRLERecords++ : nSimpleRecords++;
        let _0x17edbf = 'Simple records: ' + nSimpleRecords;
        return _0x17edbf += '\nRLE records: ' + nRLERecords, _0x17edbf += '\nTotal records: ' + this.records.length, this.truncate && (_0x17edbf += '\nTruncate at: 0x' + this.truncate.toString(0x10)), _0x17edbf;
    }, _0x454881.prototype.export = function(_0x4d18dc) {
        for (let _0x17edbf = 5, _0x2c1832 = 0; _0x2c1832 < this.records.length; _0x2c1832++) this.records[_0x2c1832].type === _0x34e7cf ? _0x17edbf += 0x8 : _0x17edbf += 5 + this.records[_0x2c1832].data.length;
        _0x17edbf += 3, this.truncate && (_0x17edbf += 3), tempFile = new _0x863031(_0x17edbf), tempFile.fileName = _0x4d18dc + '.ips', tempFile.writeString('PATCH');
        for (_0x2c1832 = 0; _0x2c1832 < this.records.length; _0x2c1832++) {
            let _0x512785 = this.records[_0x2c1832];
            tempFile.writeU24(_0x512785.offset), _0x512785.type === _0x34e7cf ? (tempFile.writeU16(0), tempFile.writeU16(_0x512785.length), tempFile.writeU8(_0x512785.byte)) : (tempFile.writeU16(_0x512785.data.length), tempFile.writeBytes(_0x512785.data));
        }
        return tempFile.writeString('EOF'), _0x512785.truncate && tempFile.writeU24(_0x512785.truncate), tempFile;
    }, _0x454881.prototype.apply = function(_0xefa71d) {
        let _0x17edbf;
        if (this.truncate) _0x17edbf = _0xefa71d.slice(0, this.truncate);
        else {
            for (let _0x2c1832 = _0xefa71d.fileSize, _0x5a0a71 = 0; _0x5a0a71 < this.records.length; _0x5a0a71++) {
                let _0x105576 = this.records[_0x5a0a71];
                _0x105576.type === _0x34e7cf ? _0x105576.offset + _0x105576.length > _0x2c1832 && (_0x2c1832 = _0x105576.offset + _0x105576.length) : _0x105576.offset + _0x105576.data.length > _0x2c1832 && (_0x2c1832 = _0x105576.offset + _0x105576.data.length);
            }
            _0x2c1832 === _0xefa71d.fileSize ? _0x17edbf = _0xefa71d.slice(0, _0xefa71d.fileSize) : (_0x17edbf = new _0x863031(_0x2c1832), _0xefa71d.copyToFile(_0x17edbf, 0));
        }
        _0xefa71d.seek(0);
        for (_0x5a0a71 = 0; _0x5a0a71 < this.records.length; _0x5a0a71++)
            if (_0x17edbf.seek(this.records[_0x5a0a71].offset), this.records[_0x5a0a71].type === _0x34e7cf)
                for (let _0x729105 = 0; _0x729105 < this.records[_0x5a0a71].length; _0x729105++) _0x17edbf.writeU8(this.records[_0x5a0a71].byte);
            else _0x17edbf.writeBytes(this.records[_0x5a0a71].data);
        return _0x17edbf;
    };
    '0123456789abcdef' .split('');
    let _0x1aa7ba = function() {
        for (let _0xa88a13, _0x17edbf = [], _0x2c1832 = 0; _0x2c1832 < 0x100; _0x2c1832++) {
            _0xa88a13 = _0x2c1832;
            for (let _0x32bcf1 = 0; _0x32bcf1 < 0x8; _0x32bcf1++) _0xa88a13 = 1 & _0xa88a13 ? 0xedb88320 ^ _0xa88a13 >>> 1 : _0xa88a13 >>> 1;
            _0x17edbf[_0x2c1832] = _0xa88a13;
        }
        return _0x17edbf;
    }();

    function _0x2d78e9(_0x509ecf, _0x4219e1, _0xd66d2b) {
        for (let _0x185f93 = _0x4219e1 ? new Uint8Array(_0x509ecf._u8array.buffer, _0x4219e1) : _0x509ecf._u8array, _0x20e2c1 = -1, _0x3d100a = _0xd66d2b ? _0x185f93.length - 4 : _0x185f93.length, _0x56a6e6 = 0; _0x56a6e6 < _0x3d100a; _0x56a6e6++) _0x20e2c1 = _0x20e2c1 >>> 0x8 ^ _0x1aa7ba[0xff & (_0x20e2c1 ^ _0x185f93[_0x56a6e6])];
        return (-0x1 ^ _0x20e2c1) >>> 0;
    }
    let _0x37eff4 = 0,
        _0x34d681 = 1,
        _0x4c50e7 = 2,
        _0xf9eeea = 3;

    function _0x5b02d3() {
        this.sourceSize = 0, this.targetSize = 0, this.metaData = '', this.actions = [], this.sourceChecksum = 0, this.targetChecksum = 0, this.patchChecksum = 0;
    }

    function _0x356089(_0x1bf770) {
        _0x1bf770.readVLV = _0x45da2c, _0x1bf770.littleEndian = true;
        let _0x17edbf = new _0x5b02d3();
        _0x1bf770.seek(0x4), _0x17edbf.sourceSize = _0x1bf770.readVLV(), _0x17edbf.targetSize = _0x1bf770.readVLV();
        let _0x2c1832 = _0x1bf770.readVLV();
        _0x2c1832 && (_0x17edbf.metaData = _0x1bf770.readString(_0x2c1832));
        for (let _0x157bba = _0x1bf770.fileSize - 0xc; _0x1bf770.offset < _0x157bba;) {
            let _0x31dcc2 = _0x1bf770.readVLV(),
                _0x21bafe = {
                    'type': 3 & _0x31dcc2,
                    'length': 1 + (_0x31dcc2 >> 2)
                };
            if (_0x21bafe.type === _0x34d681) _0x21bafe.bytes = _0x1bf770.readBytes(_0x21bafe.length);
            else if (_0x21bafe.type === _0x4c50e7 || _0x21bafe.type === _0xf9eeea) {
                let _0x4c6327 = _0x1bf770.readVLV();
                _0x21bafe.relativeOffset = (0x1 & _0x4c6327 ? -0x1 : 1) * (_0x4c6327 >> 1);
            }
            _0x17edbf.actions.push(_0x21bafe);
        }
        if (_0x17edbf.sourceChecksum = _0x1bf770.readU32(), _0x17edbf.targetChecksum = _0x1bf770.readU32(), _0x17edbf.patchChecksum = _0x1bf770.readU32(), _0x17edbf.patchChecksum !== _0x2d78e9(_0x1bf770, 0, true)) throw new Error('error_crc_patch');
        return _0x17edbf;
    }

    function _0x45da2c() {
        for (let _0xa88a13 = 0, _0x17edbf = 1;;) {
            let _0x2c1832 = this.readU8();
            if (_0xa88a13 += (0x7f & _0x2c1832) * _0x17edbf, 0x80 & _0x2c1832) break;
            _0xa88a13 += _0x17edbf <<= 0x7;
        }
        return this._lastRead = _0xa88a13, _0xa88a13;
    }

    function _0x152a53(_0x33f58d) {
        for (;;) {
            let _0x17edbf = 0x7f & _0x33f58d;
            if (0x0 === (_0x33f58d >>= 0x7)) {
                this.writeU8(0x80 | _0x17edbf);
                break;
            }
            this.writeU8(_0x17edbf), _0x33f58d--;
        }
    }

    function _0x5a4975(_0x221175) {
        for (let _0x17edbf = 0;;) {
            if (0x0 === (_0x221175 >>= 0x7)) {
                _0x17edbf++;
                break;
            }
            _0x17edbf++, _0x221175--;
        }
        return _0x17edbf;
    }

    function _0x562e68() {
        this.offset = 0, this.next = null;
    }
    _0x5b02d3.prototype.toString = function() {
        let _0xa88a13 = 'Source size: ' + this.sourceSize;
        return _0xa88a13 += '\nTarget size: ' + this.targetSize, _0xa88a13 += '\nMetadata: ' + this.metaData, _0xa88a13 += '\n#Actions: ' + this.actions.length;
    }, _0x5b02d3.prototype.validateSource = function(_0x48d2df, _0x3c15dd) {
        return this.sourceChecksum === _0x2d78e9(_0x48d2df, _0x3c15dd);
    }, _0x5b02d3.prototype.apply = function(_0x393f39, _0x76e509) {
        if (_0x76e509 && !this.validateSource(_0x393f39)) throw new Error('error_crc_input');
        for (let _0x2c1832 = new _0x863031(this.targetSize), _0x4df6ae = 0, _0xad0fa9 = 0, _0x38240a = 0; _0x38240a < this.actions.length; _0x38240a++) {
            let _0x4b1026 = this.actions[_0x38240a];
            if (_0x4b1026.type === _0x37eff4) _0x393f39.copyToFile(_0x2c1832, _0x2c1832.offset, _0x4b1026.length), _0x2c1832.skip(_0x4b1026.length);
            else if (_0x4b1026.type === _0x34d681) _0x2c1832.writeBytes(_0x4b1026.bytes);
            else if (_0x4b1026.type === _0x4c50e7) {
                _0x4df6ae += _0x4b1026.relativeOffset;
                for (let _0x5c2263 = _0x4b1026.length; _0x5c2263--;) _0x2c1832.writeU8(_0x393f39._u8array[_0x4df6ae]), _0x4df6ae++;
            } else if (_0x4b1026.type === _0xf9eeea) {
                _0xad0fa9 += _0x4b1026.relativeOffset;
                for (_0x5c2263 = _0x4b1026.length; _0x5c2263--;) _0x2c1832.writeU8(_0x2c1832._u8array[_0xad0fa9]), _0xad0fa9++;
            }
        }
        if (_0x76e509 && this.targetChecksum !== _0x2d78e9(_0x2c1832)) throw new Error('error_crc_output');
        return _0x2c1832;
    }, _0x5b02d3.prototype.export = function(_0x3e1e58) {
        let _0x17edbf = 'BPS1' .length;
        _0x17edbf += _0x5a4975(this.sourceSize), _0x17edbf += _0x5a4975(this.targetSize), _0x17edbf += _0x5a4975(this.metaData.length), _0x17edbf += this.metaData.length;
        for (let _0x2c1832 = 0; _0x2c1832 < this.actions.length; _0x2c1832++) {
            _0x17edbf += _0x5a4975(((_0x38dad6 = this.actions[_0x2c1832]).length - 1 << 2) + _0x38dad6.type), _0x38dad6.type === _0x34d681 ? _0x17edbf += _0x38dad6.length : _0x38dad6.type !== _0x4c50e7 && _0x38dad6.type !== _0xf9eeea || (_0x17edbf += _0x5a4975((Math.abs(_0x38dad6.relativeOffset) << 1) + (_0x38dad6.relativeOffset < 0 ? 1 : 0)));
        }
        let _0x2d1555 = new _0x863031(_0x17edbf += 0xc);
        _0x2d1555.fileName = _0x3e1e58 + '.bps', _0x2d1555.littleEndian = true, _0x2d1555.writeVLV = _0x152a53, _0x2d1555.writeString('BPS1'), _0x2d1555.writeVLV(this.sourceSize), _0x2d1555.writeVLV(this.targetSize), _0x2d1555.writeVLV(this.metaData.length), _0x2d1555.writeString(this.metaData, this.metaData.length);
        for (_0x2c1832 = 0; _0x2c1832 < this.actions.length; _0x2c1832++) {
            let _0x38dad6 = this.actions[_0x2c1832];
            _0x2d1555.writeVLV((_0x38dad6.length - 1 << 2) + _0x38dad6.type), _0x38dad6.type === _0x34d681 ? _0x2d1555.writeBytes(_0x38dad6.bytes) : _0x38dad6.type !== _0x4c50e7 && _0x38dad6.type !== _0xf9eeea || _0x2d1555.writeVLV((Math.abs(_0x38dad6.relativeOffset) << 1) + (_0x38dad6.relativeOffset < 0 ? 1 : 0));
        }
        return _0x2d1555.writeU32(this.sourceChecksum), _0x2d1555.writeU32(this.targetChecksum), _0x2d1555.writeU32(this.patchChecksum), _0x2d1555;
    }, _0x562e68.prototype.delete = function() {
        this.next && delete this.next;
    };
    let _0x7a6485 = 'UPS1';

    function _0x42cd9e() {
        this.records = [], this.sizeInput = 0, this.sizeOutput = 0, this.checksumInput = 0, this.checksumOutput = 0;
    }

    function _0x10dc1d(_0x5d0c48) {
        for (;;) {
            let _0x17edbf = 0x7f & _0x5d0c48;
            if (0x0 === (_0x5d0c48 >>= 0x7)) {
                this.writeU8(0x80 | _0x17edbf);
                break;
            }
            this.writeU8(_0x17edbf), _0x5d0c48 -= 1;
        }
    }

    function _0x454043() {
        for (let _0xa88a13 = 0, _0x17edbf = 1;;) {
            let _0x2c1832 = this.readU8();
            if (-0x1 == _0x2c1832) throw new Error('Can\'t read UPS VLV at 0x' + (this.offset - 1).toString(0x10));
            if (_0xa88a13 += (0x7f & _0x2c1832) * _0x17edbf, 0 != (0x80 & _0x2c1832)) break;
            _0xa88a13 += _0x17edbf <<= 0x7;
        }
        return _0xa88a13;
    }

    function _0xca245c(_0x459173) {
        for (let _0x17edbf = 0;;) {
            if (_0x17edbf++, 0 === (_0x459173 >>= 0x7)) break;
            _0x459173 -= 1;
        }
        return _0x17edbf;
    }

    function _0xd2202f(_0x5abb5e) {
        let _0x17edbf = new _0x42cd9e();
        _0x5abb5e.readVLV = _0x454043, _0x5abb5e.seek(_0x7a6485.length), _0x17edbf.sizeInput = _0x5abb5e.readVLV(), _0x17edbf.sizeOutput = _0x5abb5e.readVLV();
        for (; _0x5abb5e.offset < _0x5abb5e.fileSize - 0xc;) {
            for (let _0x2c1832 = _0x5abb5e.readVLV(), _0x3bca86 = []; _0x5abb5e.readU8();) _0x3bca86.push(_0x5abb5e._lastRead);
            _0x17edbf.addRecord(_0x2c1832, _0x3bca86);
        }
        return _0x5abb5e.littleEndian = true, _0x17edbf.checksumInput = _0x5abb5e.readU32(), _0x17edbf.checksumOutput = _0x5abb5e.readU32(), _0x5abb5e.littleEndian = false, _0x17edbf;
    }
    _0x42cd9e.prototype.addRecord = function(_0x162ca5, _0x39594d) {
        this.records.push({
            'offset': _0x162ca5,
            'XORdata': _0x39594d
        });
    }, _0x42cd9e.prototype.toString = function() {
        let _0xa88a13 = 'Records: ' + (undefined).records.length;
        return _0xa88a13 += '\nInput file size: ' + (undefined).sizeInput, _0xa88a13 += '\nOutput file size: ' + (undefined).sizeOutput, _0xa88a13 += '\nInput file checksum: ' + padZeroes((undefined).checksumInput, 4), _0xa88a13 += '\nOutput file checksum: ' + padZeroes((undefined).checksumOutput, 4);
    }, _0x42cd9e.prototype.export = function(_0x1a3e8b) {
        let _0x17edbf = _0x7a6485.length;
        _0x17edbf += _0xca245c(this.sizeInput), _0x17edbf += _0xca245c(this.sizeOutput);
        for (let _0x2c1832 = 0; _0x2c1832 < this.records.length; _0x2c1832++) _0x17edbf += _0xca245c(this.records[_0x2c1832].offset), _0x17edbf += this.records[_0x2c1832].XORdata.length + 1;
        _0x17edbf += 0xc, tempFile = new _0x863031(_0x17edbf), tempFile.writeVLV = _0x10dc1d, tempFile.fileName = _0x1a3e8b + '.ups', tempFile.writeString(_0x7a6485), tempFile.writeVLV(this.sizeInput), tempFile.writeVLV(this.sizeOutput);
        for (_0x2c1832 = 0; _0x2c1832 < this.records.length; _0x2c1832++) tempFile.writeVLV(this.records[_0x2c1832].offset), tempFile.writeBytes(this.records[_0x2c1832].XORdata), tempFile.writeU8(0);
        return tempFile.littleEndian = true, tempFile.writeU32(this.checksumInput), tempFile.writeU32(this.checksumOutput), tempFile.writeU32(_0x2d78e9(tempFile, 0, true)), tempFile;
    }, _0x42cd9e.prototype.validateSource = function(_0x25cb26, _0xd0163c) {
        return _0x2d78e9(_0x25cb26, _0xd0163c) === this.checksumInput;
    }, _0x42cd9e.prototype.apply = function(_0x21d682, _0x41bbac) {
        _0x41bbac && this.validateSource(_0x21d682), tempFile = new _0x863031(this.sizeOutput), _0x21d682.copyToFile(tempFile, 0, this.sizeInput), _0x21d682.seek(0);
        for (let _0x2c1832 = 0; _0x2c1832 < this.records.length; _0x2c1832++) {
            let _0x5ed6c9 = this.records[_0x2c1832];
            tempFile.skip(_0x5ed6c9.offset), _0x21d682.skip(_0x5ed6c9.offset);
            for (let _0x3faf05 = 0; _0x3faf05 < _0x5ed6c9.XORdata.length; _0x3faf05++) tempFile.writeU8((_0x21d682.isEOF() ? 0 : _0x21d682.readU8()) ^ _0x5ed6c9.XORdata[_0x3faf05]);
            tempFile.skip(1), _0x21d682.skip(1);
        }
        return _0x41bbac && (_0x2d78e9(tempFile), this.checksumOutput), tempFile;
    };
     var _0x4d7024 = {
            '_FS': {
                'createFolder': function(parent, name, canRead, canWrite) {
                    if (! _0x4d7024.FS) return;
                    if (typeof _0x4d7024.FS.mkdir == 'function' && window.PATH) {
                        let path = PATH.join2(typeof parent === 'string' ? parent : _0x4d7024.FS.getPath(parent), name);
                        //let mode = _0x4d7024.FS.getMode(canRead, canWrite);
                        _0x4d7024.FS.mkdir(path); //, mode);
                    } else {
                        _0x4d7024.FS.createFolder(parent, name, canRead, canWrite);
                    }
                }
            },
            'romdb': null,
            'supportBatterySave': false,
            'hash': '2b35cacf70ae',
            'hash2': 'f5cbb3f38c0bb20e4',
            'hash3': '88cc8ad0c350400499a0',
            'loading': null,
            'gamePatch': null,
            'saveFilenames': [],
            'FS': null,
            'Module': null,
            'aspectRatio': 4 / 3,
            'memData': null,
            'wasmData': null,
            'coreFileData': {},
            'coreFileName': '',
            'coreFileVersion': '',
            'isMobileDevice': !!/Android|webOS|iPhone|iPad|iPod|BB10|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i .test(navigator.userAgent || ''),
            'create': function() {
                let _this = this;
                window.URL = window.URL || window.webkitURL;
                let _0x17edbf,
                    _0x2c1832,
                    _0x4ce206,
                    _0x528f2b = false,
                    _0x547484 = false,
                    _0x5e24fa = false,
                    _0x468801 = 0,
                    _0x31a5b3 = false,
                    _0x1e0766 = {
                        oldCores: {
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
                            'mame': ['zip']
                        },
                        newCores: {
                            'fceumm': ['fds', 'nes', 'unif', 'unf'],
                            'snes9x': ['smc', 'sfc', 'swc', 'fig', 'bs', 'st'],
                            'a5200': ['a52', 'bin'],
                            'gambatte': ['gb', 'gbc', 'dmg'],
                            'mgba': ['gb', 'gbc', 'gba'],
                            'beetle_vb': ['vb', 'vboy', 'bin'],
                            'mupen64plus_next': ['n64', 'v64', 'z64', 'bin', 'u1', 'ndd', 'gb'],
                            'fbalpha2012_cps1': ['zip'],
                            'fbalpha2012_cps2': ['zip'],
                            'mame2003': ['zip'],
                            'desmume2015': ['nds', 'bin'],
                            'melonds': ['nds'],
                            'mednafen_psx': ['cue', 'toc', 'm3u', 'ccd', 'exe', 'pbp', 'chd'],
                            'mednafen_psx_hw': ['cue', 'toc', 'm3u', 'ccd', 'exe', 'pbp', 'chd'],
                            'nestopia': ['fds', 'nes', 'unif', 'unf'],
                            'opera': ['iso', 'bin', 'chd', 'cue']
                        }
                    },
                    _0x29078e = {
                        oldCores: {
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
                            'atari5200': 'a5200',
                            'lynx': 'lynx',
                            'ws': 'ws',
                            'arcade': 'arcade',
                            'fba0.2.97.29': 'fba0.2.97.29',
                            'jaguar': 'jaguar',
                            'mame2003': 'mame2003'
                        },
                        newCores: {
                            // The default core to use for each system
                            'nes': 'fceumm',
                            'snes': 'snes9x',
                            'atari5200': 'a5200',
                            'gb': 'gambatte',
                            'gba': 'mgba',
                            'vb': 'beetle_vb',
                            'n64': 'mupen64plus_next',
                            'nds': 'desmume2015',
                            'mame2003': 'mame2003',
                            'arcade': 'fbalpha2012_cps1', // I need to find a more  compatible arcade core
                            'psx': 'mednafen_psx_hw',
                            '3do': 'opera'
                        }
                    },
                    newCoreTypes = {
                        'fceumm': 'nes',
                        'snes9x': 'snes',
                        'a5200': 'atari5200',
                        'gambatte': 'gb',
                        'mgba': 'gba',
                        'beetle_vb': 'vb',
                        'mupen64plus_next': 'n64',
                        'desmume2015': 'nds',
                        'mame2003': 'mame2003',
                        'fbalpha2012_cps1': 'arcade',
                        'fbalpha2012_cps2': 'arcade',
                        'mednafen_psx': 'psx',
                        'mednafen_psx_hw': 'psx',
                        'melonds': 'nds',
                        'nestopia': 'nes',
                        'opera': '3do'
                    },
                    getSystem = function(core, notRetroarch) {
                        if (notRetroarch === true) {
                            return newCoreTypes[core] || core;
                        } else if (notRetroarch === 1) {
                            return _0x29078e.oldCores[core]; // For when core is set to version 1.
                        }
                        return _0x29078e.newCores[core] || core;
                    },
                    _0xc6823 = this,
                    _0x1143c5 = _0xc6823.system;
                    window.getSystem = getSystem;
                    window._0x29078e = _0x29078e;
                    window._0x1e0766 = _0x1e0766;
                _0x17edbf = (_0xc6823.customPaths && typeof _0xc6823.customPaths['extract7z.js'] == 'string') ? _0xc6823.customPaths['extract7z.js'] : (_0xc6823.dataPath + 'extract7z.js');
                _0x2c1832 = (_0xc6823.customPaths && typeof _0xc6823.customPaths['extractzip.js'] == 'string') ? _0xc6823.customPaths['extractzip.js'] : (_0xc6823.dataPath + 'extractzip.js?v=1');
                _0x4ce206 = (_0xc6823.customPaths && typeof _0xc6823.customPaths['libunrar.js'] == 'string') ? _0xc6823.customPaths['libunrar.js'] : (_0xc6823.dataPath + 'libunrar.js');
                let _0xb2be2a = _0x428003('canvas', {});
                this.game.appendChild(_0xb2be2a), _0x4d7024.loading = _0x428003('div', {
                    'class': this.config.classNames.loading
                }), this.elements.container.appendChild(_0x4d7024.loading);
                let _0x4fce24 = {
                        'loading-info': getClass({
                            'loading-info': true
                        }),
                        'ad': getClass({
                            'ad': true
                        }),
                        'close-ad': getClass({
                            'close-ad': true
                        }),
                        'start-game': getClass({
                            'start-game': true
                        }),
                        'on': getClass({
                            'on': true
                        }),
                        'p1': getClass({
                            'p1': true
                        }),
                        'p2': getClass({
                            'p2': true
                        }),
                        'p3': getClass({
                            'p3': true
                        }),
                        'p4': getClass({
                            'p4': true
                        })
                    },
                    _0x4e198f = '';
                if (typeof _0xc6823.adUrl === 'string') {
                    _0x4d7024.loading.innerHTML = '\n        <div>\n        <div class="'+_0x4fce24.ad+'" style="display:block !important;width:300px !important">\n        <div class="'+_0x4fce24['close-ad']+'" hidden><a href="#" onclick="return false"></a></div>\n        <iframe scrolling="no" frameborder="no" style="width:300px !important;height:250px !important;display: block !important;" src="'+_0xc6823.adUrl+'"></iframe>\n        </div>\n        <div class="'+_0x4fce24['loading-info']+'" style="position: absolute;bottom: 20px;left: 50%;transform: translateX(-50%);">\n        <div class="'+_0x4fce24.p1+'"></div>\n        <div class="'+_0x4fce24.p2+'"></div>\n        <div class="'+_0x4fce24.p3+'"></div>\n        </div>\n        <div style="position: absolute;bottom: 20px;left: 50%;transform: translateX(-50%);">\n        <a href="#" onclick="return false" class="'+_0x4fce24['start-game']+'">'+(_0xb9b2ff.get('playNow', _0xc6823.config))+'</a>\n        </div>\n        </div>';
                let _0x2e2264 = _0x428003('iframe', {
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
                let _0x18a437 = window.URL || window.webkitURL;
                let isCompressed = function(data) { //https://www.garykessler.net/library/file_sigs.html
                        if ((data[0] === 80 && data[1] === 75) && ((data[2] === 3 && data[3] === 4) || (data[2] === 5 && data[3] === 6) || (data[2] === 7 && data[3] === 8))) {
                            return 'zip';
                        } else if (data[0] === 55 && data[1] === 122 && data[2] === 188 && data[3] === 175 && data[4] === 39 && data[5] === 28) {
                            return '7z';
                        } else if ((data[0] === 82 && data[1] === 97 && data[2] === 114 && data[3] === 33 && data[4] === 26 && data[5] === 7) && ((data[6] === 0) || (data[6] === 1 && data[7] == 0))) {
                            return 'rar';
                        }
                    },
                    extractFile = async function(url) {
                        let fileData = await (await fetch(url)).text(),
                            _0x2c1832 = new Blob([fileData], {
                                'type': 'application/javascript'
                            }),
                            _0x501a8e = window.URL.createObjectURL(_0x2c1832);
                        return new Worker(_0x501a8e);
                    },
                    extractRar = async function(url) {
                        let fileData = await (await fetch(url)).text();
                        let _0x2c1832 = '\nlet dataToPass = [];\nModule = {\n    monitorRunDependencies: function(left)  {\n        if (left == 0) {\n            setTimeout(function() {\n                unrar(dataToPass, null);\n            }, 100);\n        }\n    },\n    onRuntimeInitialized: function() {\n    },\n    locateFile: function(file) {\n        return \''+url+'.mem\';\n    }\n};\n'+fileData+'\nlet unrar = function(data, password) {\n    let cb = function(fileName, fileSize, progress) {\n        postMessage({"t":4,"current":progress,"total":fileSize, "name": fileName});\n    };\n\n    let rarContent = readRARContent(data.map(function(d) {\n        return {\n            name: d.name,\n            content: new Uint8Array(d.content)\n        }\n    }), password, cb)\n    let rec = function(entry) {\n        if (entry.type === \'file\') {\n            postMessage({"t":2,"file":entry.fullFileName,"size":entry.fileSize,"data":entry.fileContent});\n        } else if (entry.type === \'dir\') {\n            Object.keys(entry.ls).forEach(function(k) {\n                rec(entry.ls[k]);\n            })\n        } else {\n            throw "Unknown type";\n        }\n    }\n    rec(rarContent);\n    postMessage({"t":1});\n    return rarContent;\n};\nonmessage = function(data) {\n    dataToPass.push({name:  \'test.rar\', content: data.data});\n};\n                ';
                        let _0x22326b = new Blob([_0x2c1832], {
                                'type': 'application/javascript'
                            }),
                            _0x3635b1 = window.URL.createObjectURL(_0x22326b);
                        return new Worker(_0x3635b1);
                    },
                    _0x24de8d = null,
                    _0x4e171c = null,
                    _0xa884ea = null;
                try {
                    _0x24de8d = new IDBStore({
                        'dbVersion': 1,
                        'storePrefix': 'ejs-',
                        'storeName': 'system',
                        'keyPath': null,
                        'autoIncrement': false,
                        'onStoreReady': function() {
                            _0x528f2b = true;
                        },
                        'onError': function() {
                            _0x528f2b = true;
                        }
                    });
                    _0x4e171c = new IDBStore({
                        'dbVersion': 1,
                        'storePrefix': 'ejs-',
                        'storeName': 'roms',
                        'keyPath': null,
                        'autoIncrement': false,
                        'onStoreReady': function() {
                            _0x547484 = true;
                        },
                        'onError': function() {
                            _0x547484 = true;
                        }
                    });
                    _0xa884ea = new IDBStore({
                        'dbVersion': 1,
                        'storePrefix': 'ejs-',
                        'storeName': 'bios',
                        'keyPath': null,
                        'autoIncrement': false,
                        'onStoreReady': function() {
                            _0x5e24fa = true;
                        },
                        'onError': function() {
                            _0x5e24fa = true;
                        }
                    });
                } catch (_0x4fc9b6) {
                    _0x528f2b = true;
                    _0x547484 = true;
                    _0x5e24fa = true;
                    console.log(_0x4fc9b6);
                }
                _0x1093f4.call(_0xc6823, _0xc6823.elements.container, 'start-game', function(_0x3d9f57) {
                    _0xc6823.started = true, _0xc6823.playing = true, _0x132da7(_0x4d7024.loading.querySelector('.' .concat(_0x4fce24['loading-info'])), true);
                    if (_0xdcec2a && (_0xdcec2a.virtualGamepadContainer == 'undefined' || _0xdcec2a.virtualGamepadContainer === null)) {
                        _0x5ab74d.toggleControls.call(_0xc6823, true);
                    }
                    let _0x2c1832 = getClass({
                            'ejs__tooltip--visible': true
                        }),
                        _0x10efa5 = _0xc6823.elements.buttons.gamepad.querySelector('.' .concat(getClass({
                            'ejs__tooltip': true
                        })));
                    _0x3a8e2f(_0x10efa5, _0x2c1832, true), setTimeout(function() {
                        _0x3a8e2f(_0x10efa5, _0x2c1832, false);
                    }, 0x1388)
                    if (typeof _0xc6823.adUrl === 'string') {
                        _0x132da7(_0x4d7024.loading.querySelector('.' .concat(_0x4fce24['close-ad'])), false);
                        if (_0xc6823.config.noAutoAdClose !== true) {
                            setTimeout(function() {
                                _0xc6823.started && _0x4d7024.loading.querySelector('.' .concat(_0x4fce24.ad)) && _0x4d7024.loading.querySelector('.' .concat(_0x4fce24.ad)).parentNode.removeChild(_0x4d7024.loading.querySelector('.' .concat(_0x4fce24.ad)));
                            }, 0x2710)
                        }
                    }
                    _0x132da7(_0x4d7024.loading.querySelector('.' .concat(_0x4fce24['start-game'])), true);
                    let _0x30fd44 = _0x5dc0c0(_0x2593da.defaultCoreOptionsValues.call(_this), _0x2593da.storage.get('core-options') || {});
                    'n64' === getSystem(_0xc6823.system, true) && _0x30fd44 && Object.keys(_0x30fd44).forEach(function(_0x3015d2) {
                        'glupen64-aspect' === _0x3015d2 && '16:9' === _0x30fd44[_0x3015d2] && (_0xb2be2a.height = _0xb2be2a.width / 0x10 * 0x9, _0x4d7024.aspectRatio = 0x10 / 0x9);
                    });
                    'arcade' !== getSystem(_this.system, true) && 'fba0.2.97.29' !== getSystem(_this.system, true) || _0x30fd44 && Object.keys(_0x30fd44).forEach(function(_0x490c06) {
                        'fba-aspect' === _0x490c06 && 'PAR' === _0x30fd44[_0x490c06] && (_0xb2be2a.height = _0xb2be2a.width / 0x10 * 0x9, _0x4d7024.aspectRatio = 0x10 / 0x9);
                    });
                    'gba' === getSystem(_0xc6823.system, true) && (_0xb2be2a.height = _0xb2be2a.width / 1.5, _0x4d7024.aspectRatio = 1.5);
                    (function() {
                        let _0x3d9f57 = _this;
                        if ('undefined' != typeof RI) {
                            document.removeEventListener('mousemove', RI.eventHandler, false), _0xb2be2a.removeEventListener('mousedown', RI.canvasEventHandler, false), _0xb2be2a.removeEventListener('mouseup', RI.canvasEventHandler, false);
                            _0x3d9f57.elements.container.addEventListener('mousemove', function(_0x44f409) {
                                let _0x3d9f57 = 0,
                                    _0x2c1832 = 0,
                                    _0x2cc8a1 = _0x44f409.offsetX - _0x4d7024.Module.canvas.offsetLeft,
                                    _0x5744ed = _0x44f409.offsetY - _0x4d7024.Module.canvas.offsetTop;
                                switch (_0x44f409.type) {
                                    case 'mousemove':
                                        _0x2cc8a1 < 0 ? (_0x2cc8a1 = 0, _0x3d9f57 = -_0x4d7024.Module.canvas.offsetWidth) : _0x2cc8a1 > _0x4d7024.Module.canvas.offsetWidth ? (_0x2cc8a1 = _0x4d7024.Module.canvas.offsetWidth, _0x3d9f57 = _0x4d7024.Module.canvas.offsetWidth) : _0x3d9f57 = _0x2cc8a1 - RI.currentX, _0x5744ed < 0 ? (_0x5744ed = 0, _0x2c1832 = -_0x4d7024.Module.canvas.offsetHeight) : _0x5744ed > _0x4d7024.Module.canvas.offsetHeight ? (_0x5744ed = _0x4d7024.Module.canvas.offsetHeight, _0x2c1832 = _0x4d7024.Module.canvas.offsetHeight) : _0x2c1832 = _0x5744ed - RI.currentY, RI.currentX = _0x2cc8a1, RI.currentY = _0x5744ed;
                                        for (let _0x3e03cb = 0; _0x3e03cb < RI.contexts.length; _0x3e03cb += 1) HEAP32[RI.contexts[_0x3e03cb].state + 0x20 >> 2] = _0x3d9f57, HEAP32[RI.contexts[_0x3e03cb].state + 0x24 >> 2] = _0x2c1832;
                                }
                            }, false), _0x3d9f57.elements.container.addEventListener('mousedown', RI.canvasEventHandler, false), _0x3d9f57.elements.container.addEventListener('mouseup', RI.canvasEventHandler, false);
                            let _0x2c1832 = function(_0x5d0cbb) {
                                if (_0x5d0cbb.targetTouches[0]) {
                                    let _0x3d9f57, _0x2c1832, _0x19a4e0 = 0,
                                        _0x2b7b61 = 0,
                                        _0x1e0f64 = _0x5d0cbb.target.getBoundingClientRect(),
                                        _0x2c55b8 = _0x5d0cbb.targetTouches[0].clientX - _0x1e0f64.left,
                                        _0x3a7025 = _0x5d0cbb.targetTouches[0].clientY - _0x1e0f64.top;
                                    _0x2c55b8 < 0 ? (_0x2c55b8 = 0, _0x19a4e0 = -_0x4d7024.Module.canvas.offsetWidth) : _0x2c55b8 > _0x4d7024.Module.canvas.offsetWidth ? (_0x2c55b8 = _0x4d7024.Module.canvas.offsetWidth, _0x19a4e0 = _0x4d7024.Module.canvas.offsetWidth) : _0x19a4e0 = _0x2c55b8 - RI.currentX, _0x3a7025 < 0 ? (_0x3a7025 = 0, _0x2b7b61 = -_0x4d7024.Module.canvas.offsetHeight) : _0x3a7025 > _0x4d7024.Module.canvas.offsetHeight ? (_0x3a7025 = _0x4d7024.Module.canvas.offsetHeight, _0x2b7b61 = _0x4d7024.Module.canvas.offsetHeight) : _0x2b7b61 = _0x3a7025 - RI.currentY, RI.currentX = _0x2c55b8, RI.currentY = _0x3a7025;
                                    for (let _0x43b670 = 0; _0x43b670 < RI.contexts.length; _0x43b670 += 1) HEAP32[RI.contexts[_0x43b670].state + 0x20 >> 2] = _0x19a4e0, HEAP32[RI.contexts[_0x43b670].state + 0x24 >> 2] = _0x2b7b61;
                                    switch (_0x5d0cbb.type) {
                                        case 'touchend':
                                        case 'touchstart':
                                            if (0x0 === _0x5d0cbb.button) _0x2c1832 = 0x28;
                                            else {
                                                if (0x2 !== _0x5d0cbb.button) break;
                                                _0x2c1832 = 0x29;
                                            }
                                            _0x3d9f57 = 'touchend' === _0x5d0cbb.type ? 0 : 1;
                                            for (let _0x443e8b = 0; _0x443e8b < RI.contexts.length; _0x443e8b += 1) HEAP8[RI.contexts[_0x443e8b].state + _0x2c1832 >> 0x0] = _0x3d9f57;
                                    }
                                }
                            };
                            _0x3d9f57.elements.container.addEventListener('touchstart', _0x2c1832, false), _0x3d9f57.elements.container.addEventListener('touchend', _0x2c1832, false);
                        } else {
                            let _0x518e5a = function(_0x45d640) {
                                let _0x3d9f57 = new MouseEvent(_0x45d640.type, _0x45d640);
                                _0x4d7024.Module.canvas.dispatchEvent(_0x3d9f57);
                            };
                            _0x530042.call(_this, '.' .concat(getClass({
                                'ejs__dialogs': true
                            }))).addEventListener('mousemove', _0x518e5a, false), _0x530042.call(_this, '.' .concat(getClass({
                                'ejs__dialogs': true
                            }))).addEventListener('mousedown', _0x518e5a, false), _0x530042.call(_this, '.' .concat(getClass({
                                'ejs__dialogs': true
                            }))).addEventListener('mouseup', _0x518e5a, false);
                        }
                    })();
                    'msx' === getSystem(_0xc6823.system, true) && function(_0x3c016a) {
                        if ('undefined' != typeof RI) {
                            document.removeEventListener('keydown', RI.eventHandler, false), document.removeEventListener('keyup', RI.eventHandler, false);
                            let _0x3d9f57 = function(_0x97e67b) {
                                let _0x3d9f57 = _0x97e67b.keyCode,
                                    _0x2c1832 = _0x3d9f57 >> 3,
                                    _0x3340c0 = 1 << (0x7 & _0x3d9f57);
                                switch (_0x97e67b.type) {
                                    case 'keyup':
                                    case 'keydown':
                                        if (_0x2c1832 >= 0x20) throw 'key code error! bad code: ' + _0x3d9f57;
                                        for (let _0x126f58 = 0; _0x126f58 < RI.contexts.length; _0x126f58++) {
                                            let _0x4ca77a = HEAP8[RI.contexts[_0x126f58].state + _0x2c1832 >> 0x0];
                                            'keyup' === _0x97e67b.type ? _0x4ca77a &= ~_0x3340c0 : _0x4ca77a |= _0x3340c0, HEAP8[RI.contexts[_0x126f58].state + _0x2c1832 >> 0x0] = _0x4ca77a;
                                        }
                                }
                            };
                            document.addEventListener('keydown', _0x3d9f57, false), document.addEventListener('keyup', _0x3d9f57, false);
                        }
                    }();
                    setTimeout(function() {
                        let _0xa88a13;
                        _0xa88a13 = _0x59aa33.info(), null === _0xdcec2a.setVolume && 'undefined' != typeof RA ? (RA.queueAudio = function() {
                            let _0x3d9f57, _0x2c1832 = _0xc6823.volume,
                                _0x2cbc4 = RA.bufIndex;
                            _0x3d9f57 = RA.bufIndex ? RA.buffers[RA.bufIndex - 1].endTime : RA.context.currentTime, RA.buffers[_0x2cbc4].endTime = _0x3d9f57 + RA.buffers[_0x2cbc4].duration;
                            let _0x4e7320 = RA.context.createBufferSource();
                            if (_0x4e7320.buffer = RA.buffers[_0x2cbc4], _0xc6823.muted && (_0x2c1832 = 0), 1 === _0x2c1832) _0x4e7320.connect(RA.context.destination);
                            else {
                                let _0x3da8fc = RA.context.createGain();
                                _0x4e7320.connect(_0x3da8fc), _0x3da8fc.connect(RA.context.destination), _0x59aa33.isEdge || 'chrome' === _0xa88a13.name && parseInt(_0xa88a13.version, 0xa) <= 0x3c || 'firefox' === _0xa88a13.name && parseInt(_0xa88a13.version, 0xa) <= 0x38 || 'opera' === _0xa88a13.name && parseInt(_0xa88a13.version, 0xa) <= 0x2c ? _0x3da8fc.gain.value = _0x2c1832 : 'firefox' === _0xa88a13.name ? _0x3da8fc.gain.setValueAtTime(_0x2c1832, RA.context.currentTime) : _0x3da8fc.gain.setValueAtTime(_0x2c1832, RA.context.currentTime, 0);
                            }
                            _0x4e7320.start(_0x3d9f57), RA.bufIndex += 1, RA.bufOffset = 0;
                        }, _0x59aa33.isIos && window.addEventListener('touchstart', function() {
                            if (RA.context) {
                                RA.context.resume();
                                let _0xa88a13 = RA.context.createBufferSource();
                                _0xa88a13.connect(RA.context.destination), _0xa88a13.start();
                            }
                        }, false)) : _0xdcec2a.setVolume();
                    }, 0x1f4);
                    setTimeout(function() {
                        _0xc6823.elements.container.focus();
                    }, 0x1e);
                    void 0 === window.addRunDependency && (window.Module = undefined);
                })
                if (typeof _0xc6823.adUrl === 'string') {
                    _0x1093f4.call(_0xc6823, _0x4d7024.loading.querySelector('.' .concat(_0x4fce24['close-ad'])), 'click', function(_0x96b13f) {
                        _0x96b13f instanceof MouseEvent && _0xc6823.started && _0x4d7024.loading.querySelector('.' .concat(_0x4fce24.ad)) && _0x4d7024.loading.querySelector('.' .concat(_0x4fce24.ad)).parentNode.removeChild(_0x4d7024.loading.querySelector('.' .concat(_0x4fce24.ad))), _0xc6823.elements.container.focus();
                    });
                }
                let _0x5f3757 = function(_0x2bd107) {
                    if (_0x4d7024.gamePatch) {
                        let startName = _0x4d7024.getStartName(true);
                        let _0x17edbf = startName.split('/'),
                            _0x2c1832 = _0x17edbf.pop().split('.').pop(),
                            _0x11dc72 = (_0x4d7024.gamePatch.split('.').pop(), _0x4d7024.gamePatch.split('/').pop().split('.').shift()),
                            _0x453ec0 = '' .concat(_0x17edbf.join('/'), '/').concat(_0x11dc72, '.').concat(_0x2c1832);
                        _0x453ec0 = _0x453ec0.replace(/\#/g, '');
                        if (_0x4d7024.gamePatch.startsWith('blob:')) {
                            _0x453ec0 = startName;
                        }
                        let _0x5438db = _0x4d7024.gamePatch;
                        _0x4d7024.FS.rename(startName, _0x453ec0);
                        _0x2bd107.startName = _0x453ec0;
                        startName = _0x4d7024.getStartName(true);
                        if ('snes' === getSystem(_0x2bd107.system, true) || ['snes2002', 'snes2005', 'snes2010'].includes(getSystem(_0x2bd107.system, true))) {
                            let _0x4758bc, _0x4b4000, _0x4aa31e, _0x2d9175 = new _0x863031(_0x4d7024.FS.readFile(startName)),
                                _0x567355 = _0x2d78e9(_0x2d9175),
                                _0x3d2ad0 = new _0x863031(_0x4d7024.FS.readFile(_0x5438db)),
                                _0x4a229b = _0x3d2ad0.readString(0x6),
                                _0x20786d = _0x2d9175._u8array.length % 0x400;
                            _0x4a229b.startsWith('PATCH') ? (_0x4758bc = _0x288092(_0x3d2ad0), 0 === _0x20786d && 'B19ED489' === _0x567355.toString(0x10).toUpperCase() && ((_0x4b4000 = new Uint8Array(_0x2d9175._u8array.length + 0x200)).set(new Uint8Array(0x200), 0), _0x4b4000.set(_0x2d9175._u8array, 0x200), _0x2d9175 = new _0x863031(_0x4b4000))) : _0x4a229b.startsWith(_0x7a6485) ? _0x4758bc = _0xd2202f(_0x3d2ad0) : _0x4a229b.startsWith('BPS1') && (_0x4758bc = _0x356089(_0x3d2ad0), _0x20786d > 0 && 'A31BEAD4' === _0x567355.toString(0x10).toUpperCase() && (_0x4b4000 = _0x2d9175._u8array.slice ? _0x2d9175._u8array.slice(_0x20786d) : _0x2d9175._u8array.subarray(_0x20786d), _0x2d9175 = new _0x863031(_0x4b4000)));
                            try {
                                if (_0x4aa31e = _0x4758bc.apply(_0x2d9175, false)) {
                                    let _0x1ffde3 = _0x4aa31e._u8array.length % 0x400;
                                    _0x1ffde3 > 0 && (_0x4b4000 = _0x4aa31e._u8array.slice ? _0x4aa31e._u8array.slice(_0x1ffde3) : _0x4aa31e._u8array.subarray(_0x1ffde3), _0x4aa31e = new _0x863031(_0x4b4000)), _0x4d7024.FS.unlink(_0x5438db), _0x4d7024.FS.unlink(startName), _0x4d7024.FS.writeFile(startName, _0x4aa31e._u8array);
                                }
                            } catch (_0x2ef20f) {}
                        } else {
                            let _0x4108d8, _0x5e086b, _0x454a20 = new _0x863031(_0x4d7024.FS.readFile(startName)),
                                _0x4991ea = new _0x863031(_0x4d7024.FS.readFile(_0x5438db)),
                                _0x130f1f = _0x4991ea.readString(0x6);
                            _0x130f1f.startsWith('PATCH') ? _0x4108d8 = _0x288092(_0x4991ea) : _0x130f1f.startsWith(_0x7a6485) ? _0x4108d8 = _0xd2202f(_0x4991ea) : _0x130f1f.startsWith('BPS1') && (_0x4108d8 = _0x356089(_0x4991ea));
                            try {
                                (_0x5e086b = _0x4108d8.apply(_0x454a20, false)) && (_0x4d7024.FS.unlink(_0x5438db), _0x4d7024.FS.unlink(startName), _0x4d7024.FS.writeFile(startName, _0x5e086b._u8array));
                            } catch (_0x3ed519) {}
                        }
                    }
                },
                    _0x4bd781 = function() {
                        let key = (_this.coreVer===2)?"INITIAL_MEMORY":"TOTAL_MEMORY"
                        const system = getSystem(_this.system, true);
                        _0x31a5b3 ? (window.Module[key] = 0x10000000, ['jaguar'].includes(system) && (window.Module[key] = 0x10000000), ['nds', 'nes', 'snes', 'arcade', 'mame'].includes(system) && (window.Module[key] = 0), ['snes2002', 'snes2005', 'snes2010'].includes(system) && (window.Module[key] = 0), 'gba' == system && (window.Module[key] = 0), '3do' == system && (window.Module[key] = 0), 'n64' == system && (window.Module[key] = 0)) : ('nes' === system && (window.Module[key] = 0x8000000), window.Module[key] = _0x468801 + 0x4000000, ['arcade', 'mame', 'mame2003', 'fba0.2.97.29'].includes(system) && (window.Module[key] = _0x468801 + 0x10000000, _0x4d7024.isMobileDevice && (window.Module[key] = 0x12c00000)), ['n64', 'nds', 'jaguar'].includes(system) && (window.Module[key] = _0x468801 + 0x10000000, _0x4d7024.isMobileDevice && (window.Module[key] = 0x12c00000)), 'gba' == system && (window.Module[key] = 0x10000000)), 'undefined' != typeof EJS_MEMORY && (window.Module[key] = EJS_MEMORY);
                    },
                    _0x3512e9 = function(_0x1bc287, _0x1844e3) {
                        let _0x55627a = _this,
                            _0x1cfda7 = _0x4d7024.loading.querySelector('.' .concat(_0x4fce24.p3)),
                            _0xb0c5d8 = -1,
                            _0x429d6b = getSystem(_0x1143c5, _this.coreVer),
                            _0x567717 = function() {
                                if (_0x55627a.coreVer === 2) {
                                    _0x55627a.elements.settings.panels.home.querySelector('[role="menu"]').innerHTML = "";
                                    _0x7f9f36.setNormalOptionsMenu.call(_0x55627a);
                                    _0x7f9f36.setCoreOptionsMenu.call(_0x55627a);
                                    let mainLoop = _0x4d7024.Module.cwrap('toggleMainLoop', 'null', ['number']);
                                    _0x4d7024.Module.resumeMainLoop = function() {
                                        mainLoop(1);
                                    }
                                    _0x4d7024.Module.pauseMainLoop = function() {
                                        mainLoop(0);
                                    }
                                }
                                
                                if (typeof _0x55627a.loadStateOnStart == 'string') {
                                    fetch(_0x55627a.loadStateOnStart).then(function(response) {
                                        response.arrayBuffer().then(function(ab) {
                                            let a = new Uint8Array(ab);
                                            EJS_loadState(a);
                                        })
                                    })
                                }
                            };
                        window.EJS_terminate = function() {
                            _0x4d7024.Module.pauseMainLoop();
                            if (_0x55627a && _0x55627a.eventListeners) {
                                for (let k in _0x55627a) {
                                    for (let i=0; i<_0x55627a.eventListeners.length; i++) {
                                        let a = _0x55627a.eventListeners[i];
                                        a.element.removeEventListener(a.type, a.callback, a.capture);
                                    }
                                }
                            }
                            if (window.EJS_RESET_VARS) {
                                let a = [];
                                let b = [];
                                for (let k in window) {
                                    a.push(k);
                                }
                                for (let i=0; i<a.length; i++) {
                                    if (! window.EJS_RESET_VARS.includes(a[i])) {
                                        b.push(a[i]);
                                    }
                                }
                                for (let i=0; i<b.length; i++) {
                                    if (window[b[i]]) {
                                        delete window[b[i]];
                                    }
                                }
                            }
                        }
                        let start = function(startName) {
                            _0x1cfda7.innerHTML = 'Game Data ready';
                            if (!startName) {
                                _0x1cfda7.innerHTML = '<strong style="color:#f00;text-shadow: 0px 0px 3px;">Invalid Rom</strong>';
                                return;
                            }
                            try {
                                _0x4bd781();
                                _0x5f3757(_0x55627a);
                                let _0x2c1832 = [startName,
                                    [_0x4d7024.hash, _0x4d7024.hash2, _0x4d7024.hash3].join('')
                                ];
                                'undefined' != typeof EJS_DEBUG_XX && true === EJS_DEBUG_XX && _0x2c1832.unshift('-v');
                                _0x4d7024.Module.callMain(_0x2c1832);
                                if (_0xc6823.coreVer === 2) {
                                    _0x4d7024.Module.resumeMainLoop();
                                    _0x4d7024.Module.setCanvasSize(800, 600);
                                    let i=0;
                                    let j = setInterval(function() { // some cores have a messed up screen size on load (for example - gba)
                                        if (i>20) clearInterval(j);
                                        i++;
                                        _0x4d7024.Module.setCanvasSize(800, 600);
                                    }, 100)
                                }
                                _0xbae705.call(_0x55627a, _0x55627a.elements.container, 'start-game');
                                try{_0x567717();}catch(e){}
                            } catch (e) {
                                console.log(e);
                                _0x1cfda7.innerHTML = '<strong style="color:#f00;text-shadow: 0px 0px 3px;">Failed to start game</strong>';
                            }
                        }
                        let _0x567713 = '';
                        let _0x99321 = function(_0x52e6f3) {
                            if (_0x52e6f3.data) {
                                if (1 === _0x52e6f3.data.t) {
                                    !_0x55627a.startName && _0x567713 && (_0x55627a.startName = _0x567713);
                                    _0x52e6f3.target.terminate();
                                    start(_0x55627a.startName);
                                }
                                if (2 === _0x52e6f3.data.t) {
                                    const extensions = (_0x55627a.coreVer === 2) ? _0x1e0766.newCores[_0x429d6b.toLowerCase()] : _0x1e0766.oldCores[_0x429d6b.toLowerCase()];
                                    let _0x25aae3 = _0x52e6f3.data.file.split('/'),
                                        _0x1bc287 = _0x25aae3.pop(),
                                        _0x1844e3 = _0x1bc287.split('.').pop();
                                    _0x1bc287 = _0x1bc287.replace(/\#/g, ''), _0x4d7024.FS.createPath('/', _0x25aae3.join('/'), true, true);
                                    for (let _0x36bace = extensions.length - 1; _0x36bace >= 0; _0x36bace -= 1) extensions[_0x36bace] === _0x1844e3.toLowerCase() && _0x36bace > _0xb0c5d8 && (_0xb0c5d8 = _0x36bace, _0x55627a.startName = ['', _0x25aae3.join('/'), _0x1bc287].join('/'), _0x55627a.startName = _0x55627a.startName.replace(/\/+/, '/'));
                                    _0x1bc287 && (_0x4d7024.FS.createDataFile('/' .concat(_0x25aae3.join('/')), _0x1bc287, _0x52e6f3.data.data, true, false), _0x468801 += _0x52e6f3.data.data.length), _0x567713 = '/' .concat(_0x25aae3.join('/'), '/').concat(_0x1bc287);
                                }
                                if (4 === _0x52e6f3.data.t && _0x52e6f3.data.total > 0) {
                                    let _0x163fc4 = Math.floor(_0x52e6f3.data.current / _0x52e6f3.data.total * 100),
                                        _0x5448a3 = _0x52e6f3.data.name || '';
                                    if (_0x163fc4 <= 100 && _0x163fc4 > 0) {
                                        _0x1cfda7.innerHTML = _this.localization('Decompress Game Data')+_0x5448a3+' '+_0x163fc4+'%';
                                    }
                                }
                            }
                        },
                            _0x1e67c4 = false;
                        if (!['arcade', 'mame', 'mame2003', 'fba0.2.97.29'].includes(getSystem(_0x55627a.system, true))) {
                            let _0x20a78c = _0x1844e3.slice ? _0x1844e3.slice(0, 10) : _0x1844e3.subarray(0, 10),
                                _0x1761cf = isCompressed(_0x20a78c);
                            if (_0x1761cf === "7z") {
                                extractFile(_0x17edbf).then(function(_0xea623e) {
                                    _0xea623e.onmessage = _0x99321;
                                    _0xea623e.postMessage(_0x1844e3);
                                })
                            _0x1e67c4 = true;
                            } else if (_0x1761cf === 'zip') {
                                extractFile(_0x2c1832).then(function(_0x5a81e4) {
                                    _0x5a81e4.onmessage = _0x99321;
                                    _0x5a81e4.postMessage(_0x1844e3);
                                })
                                _0x1e67c4 = true;
                            } else if (_0x1761cf === 'rar') {
                                extractRar(_0x4ce206).then(function(_0x5f204f) {
                                    _0x5f204f.onmessage = _0x99321;
                                    _0x5f204f.postMessage(_0x1844e3);
                                })
                                _0x1e67c4 = true;
                            }
                        }
                        if (!_0x1e67c4) {
                            _0x55627a.startName = _0x55627a.getStartName();
                            if (!_0x55627a.startName) {
                                _0x55627a.startName = 'rom';
                            }
                            try {
                                _0x468801 += _0x1844e3.length;
                                _0x4d7024.FS.createDataFile('/', _0x55627a.startName, _0x1844e3, true, false);
                            } catch (_0x210043) {
                                console.log(_0x210043);
                            }
                            start(_0x55627a.startName);
                        }
                    },
                    _0x5048db = function() {
                        let _0x17edbf = _this,
                            _0x2c1832 = _0x4d7024.loading.querySelector('.' .concat(_0x4fce24.p3)),
                            _0x50eb85 = _this.config,
                            _0x3cf3cf = _0x50eb85.gameUrl,
                            _0x594488 = _0x50eb85.system;
                        'vbanext' == _0x594488 && (_0x594488 = 'gba');
                        let _0x154dc5 = (typeof _0x3cf3cf == 'string') ? _0x3cf3cf.split('/') : "ga.me",
                            _0x139f1c = _0x154dc5[_0x154dc5.length - 1];
                        _0x139f1c.indexOf('?') > -0x1 && (_0x139f1c = _0x139f1c.substr(0, _0x139f1c.indexOf('?')));
                        _0x139f1c.split('.').pop();
                        _0x2c1832.innerHTML = _this.localization('Download Game Data');
                        if (['arcade', 'mame', 'mame2003', 'fba0.2.97.29'].includes(getSystem(_0x17edbf.system, true)) && _0x17edbf.config.gameParentUrl) {
                            _0x2c1832.innerHTML += ' (2/2)';
                        }
                        if (_0x17edbf.config.gamePatchUrl) {
                            _0x2c1832.innerHTML += ' (2/2)';
                        }
                        if (typeof _0x3cf3cf != 'string') {
                            if (_0x3cf3cf.toString() === "[object Blob]") {
                                _0x3cf3cf.arrayBuffer().then(function(data) {
                                    _0x3512e9(_0x139f1c, new Uint8Array(data));
                                })
                            } else if (_0x3cf3cf.toString() === "[object ArrayBuffer]") {
                                _0x3512e9(_0x139f1c, new Uint8Array(_0x3cf3cf));
                            } else {
                                _0x3512e9(_0x139f1c, Uint8Array.from(_0x3cf3cf));
                            }
                            return;
                        }
                        _0x550f17.a.head(_0x3cf3cf, {}).then(function(_0x3d703e) {
                            let _0x21b526 = _0x3d703e.headers['content-length'],
                                _0x7e8d4c = _0x3d703e.headers['content-type'],
                                _0x107e8a = ('' .concat(_0x594488, '-').concat(_0x139f1c)),
                                _0x43a689 = function() {
                                    _0x550f17.a.get(_0x3cf3cf, {
                                        'onDownloadProgress': function(e) {
                                            const progress = e.total ? ' '+Math.floor(e.loaded / e.total * 100).toString()+'%' : ' '+(e.loaded/1048576).toFixed(2)+'MB';
                                            if (['arcade', 'mame', 'mame2003', 'fba0.2.97.29'].includes(getSystem(_0x17edbf.system, true)) && _0x17edbf.config.gameParentUrl) {
                                                _0x2c1832.innerHTML = _this.localization('Download Game Data')+' (2/2)'+progress;
                                            } else if (_0x17edbf.config.gamePatchUrl) {
                                                _0x2c1832.innerHTML = _this.localization('Download Game Data')+' (2/2)'+progress;
                                            } else {
                                                _0x2c1832.innerHTML = _this.localization('Download Game Data')+progress;
                                            }
                                        },
                                        'responseType': 'arraybuffer'
                                    }).then(function(_0x22a1f4) {
                                        let _0x17edbf = new Uint8Array(_0x22a1f4.data);
                                        if (typeof _this.config.gameUrl != 'string' || (typeof _this.config.gameUrl == 'string' && (_this.config.gameUrl.startsWith('blob:') || _this.config.gameUrl.startsWith('file:') || _this.config.gameUrl.startsWith('chrome-extension:') || window.location.protocol === 'file:' || window.location.protocol === 'chrome-extension:'))) {
                                            _0x3512e9(_0x139f1c, _0x17edbf);
                                            return;
                                        };
                                        if ((_this.cacheLimit && _this.cacheLimit < _0x17edbf.byteLength) ||
                                            (!_this.cacheLimit && 1073741824 < _0x17edbf.byteLength)) {
                                            _0x3512e9(_0x139f1c, _0x17edbf);
                                            return;
                                        }
                                        if (_0x107e8a && _0x4e171c.db)
                                            _0x4d7024.saveFilenames.push(_0x107e8a), _0x4e171c.put(_0x107e8a, {
                                                'filename': _0x139f1c,
                                                'filesize': _0x17edbf.length,
                                                'filetype': _0x7e8d4c,
                                                'key': _0x107e8a,
                                                'lastaccess': new Date().valueOf()
                                            });
                                        _0x4e171c.db && _0x4e171c.put(_0x107e8a, {
                                            'filename': _0x139f1c,
                                            'filesize': _0x17edbf.length,
                                            'filetype': _0x7e8d4c,
                                            'key': _0x107e8a,
                                            'data': _0x17edbf
                                        });
                                        _0x3512e9(_0x139f1c, _0x17edbf);
                                    }).catch(function(_0x2e4d62) {
                                        renderErrorPage(_0x2e4d62, _0x2c1832, _this);
                                    });
                                };
                            _0x4e171c.db ? _0x4e171c.get(_0x107e8a, function(_0x5afc4a) {
                                if (_0x5afc4a && _0x5afc4a.filename === _0x139f1c && _0x5afc4a.filesize - _0x21b526 == 0 && _0x5afc4a.filetype === _0x7e8d4c && _0x5afc4a.key)
                                    _0x3512e9(_0x5afc4a.filename, _0x5afc4a.data);
                                else _0x43a689();
                            }) : _0x43a689();
                        }).catch(function(_0x5ec6be) {
                            renderErrorPage(_0x5ec6be, _0x2c1832, _this);
                        });
                    },
                    _0x139f68 = function() {
                        let _0x2591d9 = _0x4d7024.loading.querySelector('.' .concat(_0x4fce24.p3)),
                            _0x5c896f = _this.config.gamePatchUrl;
                        if (_0x5c896f) {
                            let _0x227b23 = _0x5c896f.split('/'),
                                _0x179b43 = _0x227b23[_0x227b23.length - 1];
                            _0x179b43.indexOf('?') > -0x1 && (_0x179b43 = _0x179b43.substr(0, _0x179b43.indexOf('?')));
                            _0x179b43.split('.').pop();
                            _0x2591d9.innerHTML = _this.localization('Download Game Data')+' (1/2)';
                            _0x550f17.a.get(_0x5c896f, {
                                'onDownloadProgress': function(e) {
                                    let progress = e.total ? ' '+Math.floor(e.loaded / e.total * 100).toString()+'%' : ' '+(e.loaded/1048576).toFixed(2)+'MB';
                                    _0x2591d9.innerHTML = _this.localization('Download Game Data')+' (1/2)'+progress;
                                },
                                'responseType': 'arraybuffer'
                            }).then(function(_0x159ae9) {
                                let _0x1097ca = new Uint8Array(_0x159ae9.data),
                                    _0xe531f0 = _0x179b43.split('.').pop(),
                                    _0xf6806b = _0x4d7024.loading.querySelector('.' .concat(_0x4fce24.p3)),
                                    _0x59c7c1 = function(_0x36004e) {
                                        if (_0x36004e.data) {
                                            if (0x1 === _0x36004e.data.t && (_0x36004e.target.terminate(), _0x5048db()), 2 === _0x36004e.data.t) {
                                                let _0x17edbf = _0x36004e.data.file.split('/'),
                                                    _0x2c1832 = _0x17edbf.pop(),
                                                    _0x2b320e = _0x2c1832.split('.').pop();
                                                _0x4d7024.FS.createPath('/', _0x17edbf.join('/'), true, true), _0x4d7024.FS.createDataFile('/' + _0x17edbf.join('/'), _0x2c1832, _0x36004e.data.data, true, false), _0x468801 += _0x36004e.data.data.length, ['ips', 'bps', 'ups'].includes(_0x2b320e) && !_0x4d7024.gamePatch && (_0x4d7024.gamePatch = '/' + _0x17edbf.join('/') + '/' + _0x2c1832);
                                            }
                                            if (0x4 === _0x36004e.data.t && _0x36004e.data.total > 0) {
                                                let _0x1097ca = Math.floor(_0x36004e.data.current / _0x36004e.data.total * 0x64),
                                                    _0x95ac83 = _0x36004e.data.name || '';
                                                _0x1097ca <= 0x64 && _0x1097ca > 0 && (_0xf6806b.innerHTML = _this.localization('Decompress Game Patch')+' ' .concat(_0x95ac83, ' ').concat(_0x1097ca, '%'));
                                            }
                                        }
                                    },
                                    _0x3de3e4 = _0x1097ca.slice ? _0x1097ca.slice(0, 10) : _0x1097ca.subarray(0, 10),
                                    _0x17f736 = isCompressed(_0x3de3e4);
                                if (_0x17f736 === '7z') {
                                    extractFile(_0x17edbf).then(function(_0x20601d) {
                                        _0x20601d.onmessage = _0x59c7c1;
                                        _0x20601d.postMessage(_0x1097ca);
                                    })
                                } else if (_0x17f736 === 'zip') {
                                    extractFile(_0x2c1832).then(function(_0x46622d) {
                                        _0x46622d.onmessage = _0x59c7c1;
                                        _0x46622d.postMessage(_0x1097ca);
                                    })
                                } else if (_0x17f736 === 'rar') {
                                    extractRar(_0x4ce206).then(function(_0x2ecd24) {
                                        _0x2ecd24.onmessage = _0x59c7c1;
                                        _0x2ecd24.postMessage(_0x1097ca);
                                    })
                                } else {
                                    _0x468801 += _0x1097ca.length;
                                    _0x4d7024.gamePatch = '/'+_0xe531f0;
                                    _0x4d7024.FS.createDataFile('/', _0xe531f0, _0x1097ca, true, false);
                                    _0x5048db();
                                }
                            }).catch(function(_0x314293) {
                                renderErrorPage(_0x314293, _0x2c1832, _this);
                            });
                        } else _0x5048db();
                    },
                    _0x452592 = function() {
                        let _0x17edbf = _this,
                            _0x2c1832 = _0x4d7024.loading.querySelector('.' .concat(_0x4fce24.p3)),
                            _0x5a21f7 = _this.config.gameParentUrl;
                        if (_0x5a21f7 && ['arcade', 'mame', 'mame2003', 'fba0.2.97.29'].includes(getSystem(_0x17edbf.system, true))) {
                            let _0x71bb4d = _0x5a21f7.split('/'),
                                _0xa1889f = _0x71bb4d[_0x71bb4d.length - 1];
                            _0xa1889f.indexOf('?') > -0x1 && (_0xa1889f = _0xa1889f.substr(0, _0xa1889f.indexOf('?')));
                            _0xa1889f.split('.').pop();
                            _0x2c1832.innerHTML = _this.localization('Download Game Data')+' (1/2)', _0x17edbf.config.gamePatchUrl && (_0x2c1832.innerHTML = _this.localization('Download Game Data')+' (1/3)'), _0x550f17.a.head(_0x5a21f7, {}).then(function(_0x35c23a) {
                                let _0x17edbf = _0x35c23a.headers['content-length'],
                                    _0x500ba1 = _0x35c23a.headers['content-type'],
                                    _0x316472 = (_0x35c23a.headers['last-modified'], '' .concat(_0x1143c5, '-').concat(_0xa1889f)),
                                    _0x31f098 = function() {
                                        _0x550f17.a.get(_0x5a21f7, {
                                            'onDownloadProgress': function(e) {
                                                let progress = e.total ? ' '+Math.floor(e.loaded / e.total * 100).toString()+'%' : ' '+(e.loaded/1048576).toFixed(2)+'MB';
                                                _0x2c1832.innerHTML = _this.localization('Download Game Data')+' (1/2)'+progress;
                                            },
                                            'responseType': 'arraybuffer'
                                        }).then(function(_0x191007) {
                                            let _0x17edbf = new Uint8Array(_0x191007.data);
                                            if (_0x316472 && _0x4e171c.db) {
                                                _0x4d7024.saveFilenames.push(_0x316472);
                                                _0x4e171c.put(_0x316472, {
                                                    'filename': _0xa1889f,
                                                    'filesize': _0x17edbf.length,
                                                    'filetype': _0x500ba1,
                                                    'key': _0x316472,
                                                    'lastaccess': new Date().valueOf()
                                                }), _0x4e171c.db && _0x4e171c.put(_0x316472, {
                                                    'filename': _0xa1889f,
                                                    'filesize': _0x17edbf.length,
                                                    'filetype': _0x500ba1,
                                                    'key': _0x316472,
                                                    'data': _0x17edbf
                                                });
                                            }
                                            let _0x54d79 = _0xa1889f.replace(/\#/g, '');
                                            try {
                                                _0x468801 += _0x17edbf.length, _0x4d7024.FS.createDataFile('/', _0x54d79, _0x17edbf, true, false);
                                                _0x139f68();
                                            } catch (_0x125736) {
                                                console.log(_0x125736);
                                            }
                                        }).catch(function(_0x516cc3) {
                                            renderErrorPage(_0x516cc3, _0x2c1832, _this);
                                        });
                                    };
                                _0x4e171c.db ? _0x4e171c.get(_0x316472, function(_0x3e612b) {
                                    if (_0x3e612b && _0x3e612b.filename === _0xa1889f && _0x3e612b.filesize - _0x17edbf == 0 && _0x3e612b.filetype === _0x500ba1 && _0x3e612b.key) {
                                        _0x4d7024.FS.createDataFile('/', _0x3e612b.filename, _0x3e612b.data, true, false);
                                        _0x139f68();
                                    } else _0x31f098();
                                }) : _0x31f098();
                            }).catch(function(_0x20f2e3) {
                                renderErrorPage(_0x20f2e3, _0x2c1832, _this);
                            });
                        } else _0x139f68();
                    },
                    _0x57d85d = function(_0x5e7c8b, _0x3cff36) {
                        let _0x3ea97 = _this,
                            _0x50119 = _0x4d7024.loading.querySelector('.' .concat(_0x4fce24.p2)),
                            _0x19a43e = (_0x5e7c8b.split('.').pop(), function(_0x1e8643) {
                                if (_0x1e8643.data) {
                                    if (1 === _0x1e8643.data.t) {
                                        _0x50119.innerHTML = 'BIOS ready';
                                        _0x1e8643.target.terminate();
                                        _0x452592();
                                    }
                                    if (2 === _0x1e8643.data.t) {
                                        let _0x17edbf = _0x1e8643.data.file.split('/'),
                                            _0x2c1832 = _0x17edbf.pop();
                                        _0x2c1832.split('.').pop();
                                        _0x4d7024.FS.createPath('/', _0x17edbf.join('/'), true, true);
                                        _0x4d7024.FS.createDataFile('/' + _0x17edbf.join('/'), _0x2c1832, _0x1e8643.data.data, true, false);
                                        _0x468801 += _0x1e8643.data.data.length;
                                    }
                                    if (4 === _0x1e8643.data.t && _0x1e8643.data.total > 0) {
                                        let _0x149f09 = Math.floor(_0x1e8643.data.current / _0x1e8643.data.total * 0x64),
                                            _0x5e7c8b = _0x1e8643.data.name || '';
                                        _0x149f09 <= 0x64 && _0x149f09 > 0 && (_0x50119.innerHTML = 'Decompress BIOS ' .concat(_0x5e7c8b, ' ').concat(_0x149f09, '%'));
                                    }
                                }
                            }),
                            _0x12e229 = _0x3cff36.slice ? _0x3cff36.slice(0, 0xa) : _0x3cff36.subarray(0, 0xa),
                            _0x80852b = isCompressed(_0x12e229);
                        if (_0x80852b === '7z') {
                            extractFile(_0x17edbf).then(function(_0x1b6a80) {
                                _0x1b6a80.onmessage = _0x19a43e;
                                _0x1b6a80.postMessage(_0x3cff36);
                            });
                        } else if (_0x80852b === 'rar') {
                            extractRar(_0x4ce206).then(function(_0x259be0) {
                                _0x259be0.onmessage = _0x19a43e;
                                _0x259be0.postMessage(_0x3cff36);
                            });
                        } else if (_0x80852b === 'zip' && !['arcade', 'mame', 'mame2003', 'fba0.2.97.29'].includes(getSystem(_0x3ea97.system, true))) {
                            extractFile(_0x2c1832).then(function(_0x31c70d) {
                                _0x31c70d.onmessage = _0x19a43e;
                                _0x31c70d.postMessage(_0x3cff36);
                            });
                        } else {
                            _0x468801 += _0x3cff36.length;
                            _0x50119.innerHTML = 'BIOS ready';
                            _0x4d7024.FS.createDataFile('/', _0x5e7c8b, _0x3cff36, true, false);
                            _0x452592();
                        }
                    },
                    _0x10b71a = function() {
                        _0x4d7024.loading.querySelector('.' .concat(_0x4fce24.p1)).innerHTML = 'Game Core ready';
                        _0x4d7024.Module._supports_states && (_0x378b5c.statesSupported = _0x4d7024.Module.cwrap('supports_states', 'number', []));
                        if (_0x378b5c.statesSupported) {
                            try {
                                _this.statesSupported = !!_0x378b5c.statesSupported();
                                _0x1e2c68.element(_this.elements.buttons.netplay) && _0x132da7(_this.elements.buttons.netplay, !_0x7f9f36.supportNetPlay.call(_this));
                                _0x1e2c68.element(_this.elements.buttons.saveState) && _0x132da7(_this.elements.buttons.saveState, !_this.statesSupported);
                                _0x1e2c68.element(_this.elements.buttons.loadState) && _0x132da7(_this.elements.buttons.loadState, !_this.statesSupported);
                                _0x132da7(_0x2593da.contextMenu.querySelectorAll('ul li').item(2), !_this.statesSupported);
                                _0x132da7(_0x2593da.contextMenu.querySelectorAll('ul li').item(3), !_this.statesSupported);
                            }catch(e){}
                        }
                        let _0x17edbf = _this.config.biosUrl;
                        _0xdcec2a.bindFunction.call(_this);
                        _0xdcec2a.setGamepadDialog.call(_this);
                        _0xdcec2a.setMessageDialog.call(_this);
                        _0xdcec2a.setCacheDialog.call(_this);
                        _0xdcec2a.setLoadingDialog.call(_this);
                        _0xdcec2a.setNetplayDialog.call(_this);
                        _0xdcec2a.setCheatDialog.call(_this);
                        _0xdcec2a.initGamepad.call(_this);
                        _0xdcec2a.initKeyboard.call(_this);
                        _0xdcec2a.listeners.call(_this);
                        _0x4d7024._FS.createFolder('/', 'etc', true, true);
                        _0x4d7024.FS.mkdir('/data');
                        _0x4d7024.FS.mkdir('/data/saves');
                        'undefined' != typeof IDBFS ? _0x4d7024.FS.mount(IDBFS, {}, '/data/saves') : _0x4d7024.FS.mount(_0x4d7024.FS.filesystems.IDBFS, {}, '/data/saves');
                        _0x4d7024.FS.mkdir('/shader');
                        _0x4d7024.FS.syncfs(true, function(_0x1a8f12) {});
                        _0xdcec2a.initShaders();
                        let _0x14d39f = '';
                        _0x14d39f += 'savefile_directory = /data/saves\n';
                        _0x14d39f += 'video_vsync = true\n';
                        _0x14d39f += 'screenshot_directory = /\n';
                        _0x14d39f += 'video_shader = /shader/shader.glslp\n';
                        _0x14d39f += 'video_shader_enable = true\n';
                        _0x14d39f += 'video_font_enable = false\n';
                        _0x14d39f += 'video_scale = 1.0\n';
                        _0x14d39f += 'video_gpu_screenshot = false\n';
                        _0x14d39f += 'audio_latency = 96\n';
                        const system = getSystem(_this.system, true);
                        let _0x36edb7 = _0x2593da.defaultCoreOptionsValues.call(_this);
                        _this.lightgun && ('nes' === system && (_0x14d39f += 'input_libretro_device_p2 = "258"\n'), 'segaMS' !== system && 'segaMD' !== system && 'segaCD' !== system || (_0x36edb7.genesis_plus_gx_gun_cursor = 'yes', _0x36edb7.genesis_plus_gx_invert_mouse = 'yes', _0x36edb7.genesis_plus_gx_bram = 'per game', _0x14d39f += 'input_libretro_device_p2 = "260"\n'), 'snes' === system && (_0x14d39f += 'input_libretro_device_p2 = "260"\n'), ['snes2002', 'snes2005', 'snes2010', 'snesnext'].includes(system) && (_0x14d39f += 'input_libretro_device_p2 = "260"\n'));
                        _this.mouse && ('snes' === system && (_0x14d39f += 'input_libretro_device_p1 = 2\n'), ['snes2002', 'snes2005', 'snes2010', 'snesnext'].includes(system) && (_0x14d39f += 'input_libretro_device_p1 = 2\n'));
                        _this.multitap && (['snes2002', 'snes2005', 'snes2010', 'snesnext', 'snes'].includes(system) && (_0x14d39f += 'input_libretro_device_p2 = 257\n'));
                        'n64' === system && (_0x14d39f += 'input_libretro_device_p1 = 5\n');
                        _0x14d39f += 'fastforward_ratio = 1.0\n';
                        _0x14d39f += 'video_smooth = false\n';
                        let _0x55117c = _0x5dc0c0(_0x36edb7, _0x2593da.storage.get('core-options') || {}),
                            _0x32dd27 = '';
                        if (_this.coreVer === 2) {
                            _0x4d7024.FS.createDataFile('/etc', 'retroarch.cfg', _0x14d39f, true, true);
                            _0x4d7024._FS.createFolder('/home/web_user', 'retroarch', true, true);
                            _0x4d7024._FS.createFolder('/home/web_user/retroarch', 'userdata', true, true);
                            _0x4d7024.FS.createDataFile('/home/web_user/retroarch/userdata', 'retroarch.cfg', _0x32dd27, true, true);
                        } else {
                            _0x4d7024.FS.createDataFile('/etc', 'retroarch.cfg', _0x14d39f, true, true);
                            _0x4d7024._FS.createFolder('/home/web_user', '.config', true, true);
                            _0x4d7024._FS.createFolder('/home/web_user/.config', 'retroarch', true, true);
                            _0x4d7024.FS.createDataFile('/home/web_user/.config/retroarch', 'retroarch-core-options.cfg', _0x32dd27, true, true);
                        }
                        if (_0x55117c && Object.keys(_0x55117c).forEach(function(_0x2950d3) {
                                if (_this.lightgun && 'nes' === getSystem(_this.system, true) && 'system_type' === _0x2950d3) return false;
                                _0x32dd27 += '' .concat(_0x2950d3, ' = "').concat(_0x55117c[_0x2950d3], '"\n'), _0x1093f4.call(_this, _this.elements.container, 'start-game', function(_0x362c5c) {
                                    _0xdcec2a.setVariable(_0x2950d3, _0x55117c[_0x2950d3]);
                                });
                            }), _0x17edbf) {
                            let _0x12e137 = _0x17edbf.split('/'),
                                _0x103241 = _0x12e137[_0x12e137.length - 1];
                            _0x103241.indexOf('?') > -0x1 && (_0x103241 = _0x103241.substr(0, _0x103241.indexOf('?')));
                            _0x103241.split('.').pop();
                            let _0x1f8424 = _0x4d7024.loading.querySelector('.' .concat(_0x4fce24.p2));
                            _0x550f17.a.head(_0x17edbf, {}).then(function(_0x4bd3bd) {
                                let _0x8e30bf = _0x4bd3bd.headers['content-length'],
                                    _0x14309b = _0x4bd3bd.headers['content-type'],
                                    _0x51bfef = (_0x4bd3bd.headers['last-modified'], _this.system),
                                    _0x574747 = function() {
                                        _0x550f17.a.get(_0x17edbf, {
                                            'onDownloadProgress': function(e) {
                                                let progress = e.total ? ' '+Math.floor(e.loaded / e.total * 100).toString()+'%' : ' '+(e.loaded/1048576).toFixed(2)+'MB';
                                                _0x1f8424.innerHTML = _this.localization('Download BIOS')+progress;
                                            },
                                            'responseType': 'arraybuffer'
                                        }).then(function(_0x4b0c1d) {
                                            let _0x17edbf = new Uint8Array(_0x4b0c1d.data);
                                            _0xa884ea.db && _0xa884ea.put(_0x1143c5, {
                                                'filename': _0x103241,
                                                'filesize': _0x17edbf.length,
                                                'filetype': _0x14309b,
                                                'data': _0x17edbf
                                            }), _0x57d85d(_0x103241, _0x17edbf);
                                        }).catch(function(_0x58e374) {
                                            renderErrorPage(_0x58e374, _0x1f8424, _this);
                                        });
                                    };
                                _0xa884ea.db ? _0xa884ea.get(_0x51bfef, function(_0x5cac21) {
                                    _0x5cac21 && _0x5cac21.filename === _0x103241 && _0x5cac21.filesize - _0x8e30bf == 0 && _0x5cac21.filetype === _0x14309b ? _0x57d85d(_0x5cac21.filename, _0x5cac21.data) : _0x574747();
                                }) : _0x574747();
                            }).catch(function(_0x4f39c1) {
                                renderErrorPage(_0x4f39c1, _0x1f8424, _this);
                            });
                        } else _0x452592();
                    },
                    _0x29b999 = function(_0x172278) {
                        let _0x17edbf;
                        _0x17edbf = _0x172278.byteLength ? new Uint8Array(_0x172278) : _0x172278, 'undefined' != typeof GLOBAL_BASE ? _0x4d7024.Module.HEAPU8.set(_0x17edbf, GLOBAL_BASE) : 'undefined' != typeof Runtime && Runtime.GLOBAL_BASE ? _0x4d7024.Module.HEAPU8.set(_0x17edbf, Runtime.GLOBAL_BASE) : _0x4d7024.Module.HEAPU8.set(_0x17edbf, 0x8);
                    },
                    _0x4f0fcc = function(_0x18cb26) {
                        let _0x2c1832 = _0x4d7024.loading.querySelector('.' .concat(_0x4fce24.p1)),
                            _0x247459 = '',
                            _0x54d695 = function() {
                                null !== _0x4d7024.wasmData ? (window.Module.wasmBinary = _0x4d7024.wasmData, _0x4bd781(), window.Module.monitorRunDependencies = function(_0x59580a) {
                                    0 === _0x59580a && _0x10b71a();
                                }, window.Module.onRuntimeInitialized = function() {}) : (_0x4bd781(), window.Module.monitorRunDependencies = function(_0x55a24a) {
                                    console.log('monitorRunDependencies, ', _0x55a24a);
                                }, window.Module.onRuntimeInitialized = function() {
                                    _0x4d7024.Module || (_0x4d7024.Module = window.Module), _0x4d7024.Module && _0x4d7024.Module.FS ? _0x4d7024.FS = _0x4d7024.Module.FS : _0x4d7024.FS = window.FS, console.log('onRuntimeInitialized'), _0x10b71a();
                                });
                                let _0x18cb26 = window.Module;
                                if (null !== _0x4d7024.wasmData && (_0x18cb26.wasmBinary = _0x4d7024.wasmData), _0x59aa33.isIos && null !== _0x4d7024.wasmData) {
                                    let _0x17edbf = new Blob([_0x247459], {
                                            'type': 'text/javascript'
                                        }),
                                        _0x2c1832 = _0x428003('script', {
                                            'src': _0x18a437.createObjectURL(_0x17edbf)
                                        });
                                    document.body.appendChild(_0x2c1832), _0x2c1832.onload = function() {
                                        void 0 === window.addRunDependency && 'undefined' != typeof EmulatorJS && (_0x4d7024.Module = EmulatorJS(_0x18cb26), EmulatorJS = undefined);
                                        null !== _0x4d7024.memData && (_0xc6823.coreVer !== 2) && _0x29b999(_0x4d7024.memData);
                                        _0x4d7024.Module || (_0x4d7024.Module = window.Module);
                                        _0x4d7024.Module && _0x4d7024.Module.FS ? _0x4d7024.FS = _0x4d7024.Module.FS : _0x4d7024.FS = window.FS;
                                    };
                                } else {
                                    _0x247459 = function(_0x3df03e) {
                                        let _0x17edbf = [];
                                        for (let _0x2c1832 = 0; _0x2c1832 < _0x3df03e.length; _0x2c1832 += 1) {
                                            let _0xcf0289 = _0x3df03e[_0x2c1832];
                                            _0xcf0289 > 0xff && (_0xcf0289 &= 0xff), _0x17edbf.push(String.fromCharCode(_0xcf0289));
                                        }
                                        return _0x17edbf.join('');
                                    }(_0x247459);
                                    window.eval(_0x247459);
                                    void 0 === window.addRunDependency && 'undefined' != typeof EmulatorJS && (_0x4d7024.Module = EmulatorJS(_0x18cb26), EmulatorJS = undefined);
                                    null !== _0x4d7024.memData && (_0xc6823.coreVer !== 2) && _0x29b999(_0x4d7024.memData);
                                    _0x4d7024.Module || (_0x4d7024.Module = window.Module);
                                    _0x4d7024.Module && _0x4d7024.Module.FS ? _0x4d7024.FS = _0x4d7024.Module.FS : _0x4d7024.FS = window.FS;
                                    window.EJS_MODULE = _0x4d7024.Module;
                                    window.ejs_loader = _0x4d7024;
                                    window.ejs_media = _0xdcec2a;
                                }
                                _0x247459 = null;
                            };
                        _0x1093f4.call(_0xc6823, _0xc6823.elements.container, 'script-loaded', function(_0x467eee) {
                            _0x54d695();
                        });
                        let _0x21d6a1 = function(_0x3f49ec) {
                            if (_0x3f49ec.data) {
                                if (0x1 === _0x3f49ec.data.t && (_0xbae705.call(_0xc6823, _0xc6823.elements.container, 'script-loaded'), _0x3f49ec.target.terminate()), 2 === _0x3f49ec.data.t) {
                                    let _0x17edbf = _0x3f49ec.data.file.split('/').pop(),
                                        _0x58b5a7 = _0x17edbf.split('.').pop();
                                    _0x4d7024.coreFileData[_0x17edbf] = _0x3f49ec.data.data, 'js' !== _0x58b5a7 || _0x17edbf.includes('.worker.js') || (_0x247459 = _0x3f49ec.data.data), 'mem' === _0x58b5a7 && (_0x4d7024.memData = _0x3f49ec.data.data), 'wasm' === _0x58b5a7 && (_0x4d7024.wasmData = _0x3f49ec.data.data);
                                }
                                4 === _0x3f49ec.data.t && _0x3f49ec.data.total > 0 && (_0x2c1832.innerHTML = _this.localization('Decompress Game Core')+' ' .concat(Math.floor(_0x3f49ec.data.current / _0x3f49ec.data.total * 0x64), '%'));
                            }
                        };
                        extractFile(_0x17edbf).then(function(_0x48c633) {
                            _0x48c633.onmessage = _0x21d6a1;
                            _0x48c633.postMessage(_0x18cb26);
                        });
                    },
                    _0x26d6a1 = function(_0x3787ba) {
                        _0x132da7(_0x4d7024.loading.querySelector('.' .concat(_0x4fce24['start-game'])), true);
                        let status = _0x4d7024.loading.querySelector('.' .concat(_0x4fce24.p1));
                        status.innerHTML = _this.localization('Loading')+'...';
                        
                        if (!(true === _0x528f2b && true === _0x547484 && true === _0x5e24fa)) {
                            setTimeout(_0x26d6a1, 50);
                            return;
                        }
                        window.Module = {
                            'TOTAL_MEMORY': 0x10000000,
                            'noInitialRun': true,
                            'arguments': [],
                            'preRun': [],
                            'postRun': [],
                            'canvas': _0xb2be2a,
                            'print': function(msg) {
                                if (window.EJS_DEBUG_XX === true) {
                                    console.log(msg);
                                }
                            },
                            'printErr': function(msg) {
                                if (window.EJS_DEBUG_XX === true) {
                                    console.log(msg);
                                }
                            },
                            'totalDependencies': 0,
                            'monitorRunDependencies': function(_0x5d4b07) {},
                            'locateFile': function(_0x3fe7ca) {
                                let _0x3787ba = null;
                                if (_0x3fe7ca.includes('.worker.js')) {
                                    Object.keys(_0x4d7024.coreFileData).includes(_0x3fe7ca) && (_0x3787ba = _0x4d7024.coreFileData[_0x3fe7ca]);
                                    let _0x2c1832 = new Blob([''], {
                                        'type': 'application/javascript'
                                    });
                                    return window.URL.createObjectURL(_0x2c1832);
                                }
                                if (_0x3fe7ca.includes('.js.mem') && Object.keys(_0x4d7024.coreFileData).includes(_0x3fe7ca)) {
                                    _0x3787ba = _0x4d7024.coreFileData[_0x3fe7ca];
                                    return URL.createObjectURL(new Blob([_0x3787ba.buffer]));
                                }
                                return null;
                            },
                            'readAsync': function(_0x20d016, _0x9d2de4, _0x1425ee) {
                                if (_0x20d016 instanceof ArrayBuffer) setTimeout(function() {
                                    _0x9d2de4(_0x20d016);
                                }, 500);
                                else {
                                    let _0x164012 = new XMLHttpRequest();
                                    _0x164012.open('GET', _0x20d016, true);
                                    _0x164012.responseType = 'arraybuffer';
                                    _0x164012.onload = function() {
                                        if (200 == _0x164012.status || 0 == _0x164012.status && _0x164012.response) {
                                            _0x9d2de4(_0x164012.response);
                                        } else {
                                            _0x1425ee();
                                        }
                                    };
                                    _0x164012.onerror = _0x1425ee;
                                    _0x164012.send();
                                }
                            }
                        };
                        let _0x3641d6 = function(_0x16049b, _0x55a075) {
                            let path = (_this.customPaths && typeof _this.customPaths[_0x16049b] == 'string') ? _this.customPaths[_0x16049b] : ((_this.coreVer === 2) ? (_this.dataPath+'cores/'+_0x16049b+'?v='+_0x55a075) : (_this.dataPath+'old/'+_0x16049b+'?v='+_0x55a075));
                            _0x550f17.a.get(path, {
                                'onDownloadProgress': function(e) {
                                    let progress = e.total ? ' '+Math.floor(e.loaded / e.total * 100).toString()+'%' : ' '+(e.loaded/1048576).toFixed(2)+'MB';
                                    status.innerHTML = _this.localization('Download Game Core')+progress;
                                },
                                'responseType': 'arraybuffer'
                            }).then(function(e) {
                                let data = new Uint8Array(e.data);
                                _0x24de8d.db && _0x24de8d.put(_0x16049b, {
                                    'version': _0x55a075,
                                    'data': data
                                });
                                if (_this.coreVer === 2) {
                                    _0x4f0fcc(data);
                                } else {
                                    let data1 = data.slice ? data.slice(12) : data.subarray(12);
                                    data1.set([55, 122, 188, 175, 39, 28, 0, 3], 0);
                                    data = null;
                                    _0x4f0fcc(data1);
                                }
                                
                            }).catch(function(e) {
                                renderErrorPage(e, status, _this);
                            });
                        };
                        let vJson = (_this.customPaths && typeof _this.customPaths['v.json'] == 'string') ? _this.customPaths['v.json'] : (_this.dataPath + 'v.json');
                        _0x550f17.a.get(vJson, {}).then(function(e) {
                            let _0x2458d5,
                                _0x5d075f = _0x29078e,
                                _0x28ee7f = e.data;

                            let status = _0x4d7024.loading.querySelector('.' .concat(_0x4fce24.p1));
                            if (!(_this.config.oldCores === true && _0x28ee7f.oldCores[_this.system]) && _0x28ee7f.newCores[getSystem(_this.system)] && (_0x2d904a.wasm || Boolean(_0x28ee7f.newCores[getSystem(_this.system)].asmjs)) && !_0x59aa33.isIos) {
                                _this.coreVer = 2;
                                delete Module.readAsync;
                                Module.INITIAL_MEMORY = Module.TOTAL_MEMORY;
                                delete Module.TOTAL_MEMORY;
                                _this.elements.settings.panels.home.querySelector('[role="menu"]').innerHTML = "";
                                _0x7f9f36.setNormalOptionsMenu.call(_this);
                                _0x7f9f36.setCoreOptionsMenu.call(_this);
                                _0x28ee7f = _0x28ee7f.newCores[getSystem(_this.system)];
                                _0x5d075f = getSystem(_this.system);
                            } else {
                                _0x28ee7f = _0x28ee7f.oldCores[_this.system];
                                _0x5d075f = _0x5d075f.oldCores[_this.system];
                            }
                            if (!_0x28ee7f) {
                                status.innerHTML = '<strong style="color:#f00;text-shadow: 0px 0px 3px;">'+_this.localization('Invalid System')+'</strong>';
                                return;
                            }

                            let _0x124167 = _0x28ee7f.version ? _0x28ee7f.version : 1,
                                _0x254bc2 = Boolean(_0x28ee7f.netplay),
                                _0x5b1dcd = Boolean(_0x28ee7f.state),
                                _0x9a1f1 = Boolean(_0x28ee7f.asmjs),
                                _0x3e4345 = Boolean(_0x28ee7f.wasm);

                            if ('nds' === _this.system && !_0x2d904a.wasm && _this.coreVer !== 2) {
                                _0x5b1dcd = false;
                            };
                            if (_this.statesSupported === false) {
                                _0x5b1dcd = false;
                            };
                            _0x4d7024.coreFileVersion = _0x124167;
                            _0x4d7024.coreFileName = _0x5d075f;
                            let _0x2eb141 = false;
                            ['webgl2', 'experimental-webgl2'].includes(_0x2d904a.webgl.WEBGL_CONTEXT) && (_0x2eb141 = true);
                            'undefined' != typeof EJS_N64_LEGACY && 1 == EJS_N64_LEGACY && (_0x2eb141 = false);
                            if ('mame' == _this.system) {
                                let data = _this.mameCore;
                                if (! data || data === null || data.split('|').length !== 2) {
                                    status.innerHTML = '<strong style="color:#f00;text-shadow: 0px 0px 3px;">'+_this.localization('Missing mame config')+'</strong>';
                                    return;
                                }
                                let _0x3787ba = data.split('|');
                                _0x4d7024.coreFileName = ''.concat(_this.system, '-').concat(_0x3787ba[0]);
                                _0x5b1dcd = '1' === _0x3787ba[1];
                                _0x1e2c68.element(_this.elements.buttons.saveState) && _0x132da7(_this.elements.buttons.saveState, !_0x5b1dcd);
                                _0x1e2c68.element(_this.elements.buttons.loadState) && _0x132da7(_this.elements.buttons.loadState, !_0x5b1dcd);
                                _0x132da7(_0x2593da.contextMenu.querySelectorAll('ul li').item(2), !_0x5b1dcd);
                                _0x132da7(_0x2593da.contextMenu.querySelectorAll('ul li').item(3), !_0x5b1dcd);
                                if (_this.coreVer === 2) {
                                    _0x2458d5 = '';
                                } else {
                                    _0x2458d5 = _this.system.concat('-old-').concat(_0x3787ba[0], '-wasm.data');
                                }
                                _0x3787ba[0] ? (_0x2d904a.wasm && _0x3e4345 ? (_0x31a5b3 = true) : (status.innerHTML = '<strong style="color:#f00;text-shadow: 0px 0px 3px;">'+_this.localization('Webassembly support is not detected in this browser')+'</strong>', _0x2458d5 = ''), _0x2458d5 && (_0x24de8d.db ? _0x24de8d.get(_0x2458d5, function(_0x655c87) {
                                    if (_0x655c87 && _0x655c87.version === _0x124167) {
                                        if (_0xc6823.coreVer === 2) {
                                            _0x4f0fcc(_0x655c87.data);
                                        } else {
                                            let _0x3787ba = _0x655c87.data.slice ? _0x655c87.data.slice(0xc) : _0x655c87.data.subarray(0xc);
                                            _0x3787ba.set([55, 122, 188, 175, 39, 28, 0, 3], 0);
                                            _0x4f0fcc(_0x3787ba);
                                        }
                                    } else _0x3641d6(_0x2458d5, _0x124167);
                                }) : _0x3641d6(_0x2458d5, _0x124167))) : status.innerHTML = '<strong style="color:#f00;text-shadow: 0px 0px 3px;">'+_this.localization('Unsupported Game')+'</strong>';
                            } else {
                                _0x2458d5 = false;
                                let type;
                                if (_0x2d904a.wasm && _0x3e4345) {
                                    type = 'wasm';
                                    _0x2458d5 = true;
                                    if ('n64' === _this.system && !_0x2eb141 && _this.coreVer !== 2) {
                                        type = 'legacy-wasm';
                                    }
                                    _0x31a5b3 = true;
                                } else if (_0x9a1f1) {
                                    _0x2458d5 = true;
                                    type = 'asmjs';
                                    if ('n64' === _this.system && !_0x2eb141 && _this.coreVer !== 2) {
                                        type = 'legacy-asmjs';
                                    }
                                }
                                if (_0x2458d5 !== true) {
                                    status.innerHTML = '<strong style="color:#f00;text-shadow: 0px 0px 3px;">'+_this.localization('Please upgrade your browser to the latest version')+'</strong>';
                                    return;
                                }
                                if (_this.coreVer === 2) {
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
                                            let _0x3787ba = _0x47a6fd.data.slice ? _0x47a6fd.data.slice(12) : _0x47a6fd.data.subarray(12);
                                            _0x3787ba.set([55, 122, 188, 175, 39, 28, 0, 3], 0);
                                            _0x4f0fcc(_0x3787ba);
                                        }
                                    } else _0x3641d6(_0x2458d5, _0x124167);
                                }) : _0x3641d6(_0x2458d5, _0x124167);
                            }
                            _0x254bc2 || _0x1e2c68.element(_this.elements.buttons.netplay) && _0x132da7(_this.elements.buttons.netplay, true);
                            _0x1e2c68.element(_this.elements.buttons.saveState) && _0x132da7(_this.elements.buttons.saveState, !_0x5b1dcd);
                            _0x1e2c68.element(_this.elements.buttons.loadState) && _0x132da7(_this.elements.buttons.loadState, !_0x5b1dcd);
                            _0x132da7(_0x2593da.contextMenu.querySelectorAll('ul li').item(2), !_0x5b1dcd);
                            _0x132da7(_0x2593da.contextMenu.querySelectorAll('ul li').item(3), !_0x5b1dcd);
                            _this.statesSupported = _0x5b1dcd;
                            if (window.innerWidth < 400) {
                                _0x1e2c68.element(_this.elements.inputs.volume) && _0x132da7(_this.elements.inputs.volume, true);
                                _0x1e2c68.element(_this.elements.buttons.mute) && _0x132da7(_this.elements.buttons.mute, true);
                                _0x1e2c68.element(_this.elements.buttons.cheat) && _0x132da7(_this.elements.buttons.cheat, true);
                            }
                            
                            if (_this.config.buttons) {
                                if (_this.config.buttons.playPause === false) {
                                    _0x1e2c68.element(_this.elements.buttons.play[0]) && _0x132da7(_this.elements.buttons.play[0], true);
                                }
                                if (_this.config.buttons.restart === false) {
                                    _0x1e2c68.element(_this.elements.buttons.restart) && _0x132da7(_this.elements.buttons.restart, true);
                                }
                                if (_this.config.buttons.mute === false) {
                                    _0x1e2c68.element(_this.elements.buttons.mute) && _0x132da7(_this.elements.buttons.mute, true);
                                }
                                if (_this.config.buttons.settings === false) {
                                    _0x1e2c68.element(_this.elements.buttons.settings) && _0x132da7(_this.elements.buttons.settings, true);
                                }
                                if (_this.config.buttons.fullscreen === false) {
                                    _0x1e2c68.element(_this.elements.buttons.fullscreen) && _0x132da7(_this.elements.buttons.fullscreen, true);
                                }
                                if (_this.config.buttons.saveState === false) {
                                    _0x1e2c68.element(_this.elements.buttons.saveState) && _0x132da7(_this.elements.buttons.saveState, true);
                                }
                                if (_this.config.buttons.loadState === false) {
                                    _0x1e2c68.element(_this.elements.buttons.loadState) && _0x132da7(_this.elements.buttons.loadState, true);
                                }
                                if (_this.config.buttons.screenRecord === false) {
                                    _0x1e2c68.element(_this.elements.buttons.screenRecord) && _0x132da7(_this.elements.buttons.screenRecord, true);
                                }
                                if (_this.config.buttons.cacheManager === false) {
                                    _0x1e2c68.element(_this.elements.buttons.cacheManager) && _0x132da7(_this.elements.buttons.cacheManager, true);
                                }
                                if (_this.config.buttons.gamepad === false) {
                                    _0x1e2c68.element(_this.elements.buttons.gamepad) && _0x132da7(_this.elements.buttons.gamepad, true);
                                }
                                if (_this.config.buttons.cheat === false) {
                                    _0x1e2c68.element(_this.elements.buttons.cheat) && _0x132da7(_this.elements.buttons.cheat, true);
                                }
                                if (_this.config.buttons.volume === false) {
                                    _0x1e2c68.element(_this.elements.inputs.volume) && _0x132da7(_this.elements.inputs.volume, true);
                                }
                                if (_this.config.buttons.screenshot === false) {
                                    _0x132da7(_0x2593da.contextMenu.querySelectorAll('ul li').item(0), true);
                                }
                                if (_this.config.buttons.quickSave === false) {
                                    _0x132da7(_0x2593da.contextMenu.querySelectorAll('ul li').item(2), true);
                                }
                                if (_this.config.buttons.quickLoad === false) {
                                    _0x132da7(_0x2593da.contextMenu.querySelectorAll('ul li').item(3), true);
                                }
                            }
                        }).catch(function(e) {
                            renderErrorPage(e, _0x3787ba, _0xc6823);
                        });
                        _0x4d7024.romdb = _0x4e171c;
                        return false;
                    };
                _0x455c85(_0x4d7024.loading.querySelector('.' .concat(_0x4fce24['start-game'])), 'click touchstart', _0x26d6a1);
                if (_0xc6823.startOnLoad === true) {
                    _0x4d7024.loading.querySelector('.' .concat(_0x4fce24['start-game'])).click();
                }
            }
        }
    let _0x27f4c4 = _0x4d7024;
    const _0x4a2390 = _0x2c1832(0xa1);

    function _0x3c0613(_0x3eef01) {
        return function(_0x3d9b1e) {
            if (Array.isArray(_0x3d9b1e)) {
                for (let _0x17edbf = 0, _0x2c1832 = new Array(_0x3d9b1e.length); _0x17edbf < _0x3d9b1e.length; _0x17edbf++) _0x2c1832[_0x17edbf] = _0x3d9b1e[_0x17edbf];
                return _0x2c1832;
            }
        }(_0x3eef01) || function(_0x425c1a) {
            if (Symbol.iterator in Object(_0x425c1a) || '[object Arguments]' === Object.prototype.toString.call(_0x425c1a)) return Array.from(_0x425c1a);
        }(_0x3eef01) || function() {
            throw new TypeError('Invalid attempt to spread non-iterable instance');
        }();
    }

    function _0xa08ac0(_0x514af5, _0x4089be) {
        for (let _0x2c1832 = 0; _0x2c1832 < _0x4089be.length; _0x2c1832++) {
            let _0x3347c8 = _0x4089be[_0x2c1832];
            _0x3347c8.enumerable = _0x3347c8.enumerable || false, _0x3347c8.configurable = true, 'value' in _0x3347c8 && (_0x3347c8.writable = true), Object.defineProperty(_0x514af5, _0x3347c8.key, _0x3347c8);
        }
    }
    let _0x1eda08, _0x4fc27f, _0xf43a92, _0x214f42, _0x3a9bfc, _0x4d8495 = (_0x1eda08 = ['a[href]', 'area[href]', 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', 'select:not([disabled]):not([aria-hidden])', 'textarea:not([disabled]):not([aria-hidden])', 'button:not([disabled]):not([aria-hidden])', 'iframe', 'object', 'embed', '[contenteditable]', '[tabindex]:not([tabindex^="-"])'], _0x4fc27f = function() {
            function _0x5566a2(_0x1fcb21) {
                let _0x2c1832 = _0x1fcb21.targetModal,
                    _0x29e6ab = _0x1fcb21.triggers,
                    _0x114128 = void 0 === _0x29e6ab ? [] : _0x29e6ab,
                    _0x5211ae = _0x1fcb21.onShow,
                    _0x402faa = void 0 === _0x5211ae ? function() {} : _0x5211ae,
                    _0x120cc3 = _0x1fcb21.onClose,
                    _0x48ad1c = void 0 === _0x120cc3 ? function() {} : _0x120cc3,
                    _0x6a1522 = _0x1fcb21.openTrigger,
                    _0x306932 = void 0 === _0x6a1522 ? 'data-micromodal-trigger' : _0x6a1522,
                    _0x446302 = _0x1fcb21.closeTrigger,
                    _0x2f0676 = void 0 === _0x446302 ? 'data-micromodal-close' : _0x446302,
                    _0x2a4c0e = _0x1fcb21.disableScroll,
                    _0x2297fa = void 0 !== _0x2a4c0e && _0x2a4c0e,
                    _0x5a3f47 = _0x1fcb21.disableFocus,
                    _0x4a8131 = void 0 !== _0x5a3f47 && _0x5a3f47,
                    _0x42179f = _0x1fcb21.awaitCloseAnimation,
                    _0x27da4d = void 0 !== _0x42179f && _0x42179f,
                    _0x1b535e = _0x1fcb21.debugMode,
                    _0x33d8ca = void 0 !== _0x1b535e && _0x1b535e,
                    _0xee6cb0 = _0x1fcb21.closeByEsckey,
                    _0x54de6a = void 0 === _0xee6cb0 || _0xee6cb0;
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
                }, _0x114128.length > 0 && this.registerTriggers.apply(this, _0x3c0613(_0x114128)), this.onClick = this.onClick.bind(this), this.onKeydown = this.onKeydown.bind(this);
            }
            let _0x17edbf, _0x2c1832, _0x5021cc;
            return _0x17edbf = _0x5566a2, (_0x2c1832 = [{
                'key': 'registerTriggers',
                'value': function() {
                    for (let _0x5566a2 = this, _0x17edbf = arguments.length, _0x2c1832 = new Array(_0x17edbf), _0x4e24fa = 0; _0x4e24fa < _0x17edbf; _0x4e24fa++) _0x2c1832[_0x4e24fa] = arguments[_0x4e24fa];
                    _0x2c1832.forEach(function(_0x511ded) {
                        _0x511ded.addEventListener('click', function() {
                            return _0x5566a2.showModal();
                        });
                    });
                }
            }, {
                'key': 'showModal',
                'value': function() {
                    this.activeElement = document.activeElement, this.modal.setAttribute('aria-hidden', 'false'), this.modal.classList.add(getClass({
                        'is-open': true
                    })), this.setFocusToFirstNode(), this.addEventListeners(), this.config.onShow(this.modal);
                }
            }, {
                'key': 'closeModal',
                'value': function() {
                    let _0x5566a2 = this.modal;
                    this.modal.setAttribute('aria-hidden', 'true'), this.removeEventListeners(), this.config.onClose(this.modal), this.config.awaitCloseAnimation ? this.modal.addEventListener('animationend', function _0x17edbf() {
                        _0x5566a2.classList.remove(getClass({
                            'is-open': true
                        })), _0x5566a2.removeEventListener('animationend', _0x17edbf, false);
                    }, false) : _0x5566a2.classList.remove(getClass({
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
                    let _0x5566a2 = this.modal.querySelectorAll(_0x1eda08);
                    return Object.keys(_0x5566a2).map(function(_0x1bd160) {
                        return _0x5566a2[_0x1bd160];
                    });
                }
            }, {
                'key': 'setFocusToFirstNode',
                'value': function() {
                    if (!this.config.disableFocus) {
                        let _0x5566a2 = this.getFocusableNodes();
                        _0x5566a2.length && _0x5566a2[0].focus();
                    }
                }
            }, {
                'key': 'maintainFocus',
                'value': function(_0x15092b) {
                    let _0x17edbf = this.getFocusableNodes();
                    if (this.modal.contains(document.activeElement)) {
                        let _0x2c1832 = _0x17edbf.indexOf(document.activeElement);
                        _0x15092b.shiftKey && 0 === _0x2c1832 && (_0x17edbf[_0x17edbf.length - 1].focus(), _0x15092b.preventDefault()), _0x15092b.shiftKey || _0x2c1832 !== _0x17edbf.length - 1 || (_0x17edbf[0].focus(), _0x15092b.preventDefault());
                    } else _0x17edbf[0].focus();
                }
            }]) && _0xa08ac0(_0x17edbf.prototype, _0x2c1832), _0x5021cc && _0xa08ac0(_0x17edbf, _0x5021cc), _0x5566a2;
        }(), _0xf43a92 = null, _0x214f42 = function(_0x31caa5) {
            if (!document.getElementById(_0x31caa5)) return false;
        }, _0x3a9bfc = function(_0x48c135, _0x61240d) {
            if (function(_0x28b4fb) {
                    _0x28b4fb.length <= 0 && (console.warn('MicroModal v' .concat(version, ': ❗Please specify at least one %c\'micromodal-trigger\''), 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', 'data attribute.'), console.warn('%cExample:', 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', '<a href="#" data-micromodal-trigger="my-modal"></a>'));
                }(_0x48c135), !_0x61240d) return true;
            for (let _0x2c1832 in _0x61240d) _0x214f42(_0x2c1832);
            return true;
        }, {
            'init': function(_0x3f1b32) {
                let _0x17edbf = Object.assign({}, {
                        'openTrigger': 'data-micromodal-trigger'
                    }, _0x3f1b32),
                    _0x2c1832 = _0x3c0613(document.querySelectorAll('[' .concat(_0x17edbf.openTrigger, ']'))),
                    _0x537e55 = function(_0x5e363a, _0x9390ce) {
                        let _0x2c1832 = [];
                        return _0x5e363a.forEach(function(_0x305145) {
                            let _0x13d441 = _0x305145.attributes[_0x9390ce].value;
                            void 0 === _0x2c1832[_0x13d441] && (_0x2c1832[_0x13d441] = []), _0x2c1832[_0x13d441].push(_0x305145);
                        }), _0x2c1832;
                    }(_0x2c1832, _0x17edbf.openTrigger);
                if (true !== _0x17edbf.debugMode || false !== _0x3a9bfc(_0x2c1832, _0x537e55))
                    for (let _0x383dff in _0x537e55) {
                        let _0x34a8e0 = _0x537e55[_0x383dff];
                        _0x17edbf.targetModal = _0x383dff, _0x17edbf.triggers = _0x3c0613(_0x34a8e0), new _0x4fc27f(_0x17edbf);
                    }
            },
            'show': function(_0x2a3fcf, _0x472cd6) {
                let _0x2c1832 = _0x472cd6 || {};
                return _0x2c1832.targetModal = _0x2a3fcf, true === _0x2c1832.debugMode && false === _0x214f42(_0x2a3fcf) ? _0xf43a92 = null : (_0xf43a92 = new _0x4fc27f(_0x2c1832)).showModal(), _0xf43a92;
            },
            'close': function() {
                _0xf43a92.closeModal();
            }
        });
        const _0x378b5c = {
            'defaultControllers': {
                0: {
                    0: {
                        'value': '88'
                    },
                    1: {
                        'value': '83'
                    },
                    2: {
                        'value': '16'
                    },
                    3: {
                        'value': '13'
                    },
                    4: {
                        'value': '38'
                    },
                    5: {
                        'value': '40'
                    },
                    6: {
                        'value': '37'
                    },
                    7: {
                        'value': '39'
                    },
                    8: {
                        'value': '90'
                    },
                    9: {
                        'value': '65'
                    },
                    10: {
                        'value': '81'
                    },
                    11: {
                        'value': '69'
                    },
                    12: {
                        'value': '82'
                    },
                    13: {
                        'value': '87'
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
            'saveLoaddbDB': function() {
                try {
                    return new IDBStore({
                        'dbVersion': 1,
                        'storePrefix': 'ejs-',
                        'storeName': 'states',
                        'keyPath': null,
                        'autoIncrement': false,
                        'onStoreReady': function() {},
                        'onError': function() {}
                    });
                } catch(e) {
                    console.log(e);
                }
            }(),
            'saveLoadDB': function(type) {
                try {
                    if (!_0x378b5c.saveLoaddbDB.db) return false;
                    if (_0x2593da && typeof _0x2593da.getCoreOptionsValue === 'function') {
                        let location = _0x2593da.getCoreOptionsValue('save-state-location');
                        if (!location || location === 'download') {
                            return false;
                        }
                        if (!this.getStartName()) return false;
                        let slot = _0x2593da.getCoreOptionsValue('save-state-slot');
                        if (!slot) return false;
                        let game = this.getStartName();
                        let key = game + '-' + slot;
                        (async function() {
                            if (type === 'save') {
                                try {
                                    let data = await _0x378b5c.saveState();
                                    _0x378b5c.saveLoaddbDB.put(key, data);
                                } catch(e) {return false;};
                            } else {
                                _0x378b5c.saveLoaddbDB.get(key, function(data) {
                                    EJS_loadState(data);
                                });
                            }
                        })();
                        return true;
                    } else {
                        return false;
                    }
                } catch(e) {
                    return false;
                }
            },
            'disableInput': false,
            'disableControl': function(control) {
                if (control) {
                    for (var _0x17edbf = 0x0; _0x17edbf < 0x18; _0x17edbf += 0x1) _0x378b5c.simulateInputFn(0x0, _0x17edbf, 0x0), _0x378b5c.simulateInputFn(0x1, _0x17edbf, 0x0), _0x378b5c.simulateInputFn(0x2, _0x17edbf, 0x0), _0x378b5c.simulateInputFn(0x3, _0x17edbf, 0x0);
                    _0x378b5c.disableInput = true;
                } else _0x378b5c.disableInput = false;
            },
            'loadRoomsListTimer': null,
            'loadRoomsList': function() {},
            'stopLoadRooms': function() {
                _0x378b5c.loadRoomsListTimer && clearTimeout(_0x378b5c.loadRoomsListTimer);
            },
            'openRoom': function() {},
            'gamepad': null,
            'allowCheat': true,
            'connection': null,
            'connected': false,
            'playerName': '',
            'players': [],
            'waitingList': {},
            'roomMaster': null,
            'inputsData': {},
            'coreOptionData': {},
            'currentFrame': 0,
            'wait': false,
            'progressHelper': {},
            'icons': {
                'lock': '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="lock" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-lock fa-w-14 fa-3x"><path fill="currentColor" d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z" class=""></path></svg>'
            },
            'isPaused': null,
            'setVolume': null,
            'setVariable': null,
            'simulateInput': null,
            'simulateInputFn': null,
            'toggleShader': null,
            'saveState': null,
            'screenRecord': null,
            'cacheManager': null,
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
                'dialog-container': getClass({
                    'dialog-container': true
                }),
                'tabs': getClass({
                    'tabs': true
                }),
                'dialog-title': getClass({
                    'dialog-title': true
                }),
                'dialog-content': getClass({
                    'dialog-content': true
                }),
                'dialog-buttons': getClass({
                    'dialog-buttons': true
                }),
                'overlay': getClass({
                    'overlay': true
                }),
                'key-setting-popup': getClass({
                    'key-setting-popup': true
                }),
                'tabs-panel': getClass({
                    'tabs-panel': true
                }),
                'tabs-content': getClass({
                    'tabs-content': true
                }),
                'button-container': getClass({
                    'button-container': true
                }),
                'set': getClass({
                    'set': true
                }),
                'active': getClass({
                    'active': true
                }),
                'btn-cancel': getClass({
                    'btn-cancel': true
                }),
                'btn-reset': getClass({
                    'btn-reset': true
                }),
                'btn-clear': getClass({
                    'btn-clear': true
                }),
                'btn-create': getClass({
                    'btn-create': true
                }),
                'btn-submit': getClass({
                    'btn-submit': true
                }),
                'btn-join-room': getClass({
                    'btn-join-room': true
                }),
                'btn-quit': getClass({
                    'btn-quit': true
                }),
                'btn-create-room': getClass({
                    'btn-create-room': true
                }),
                'netplay-player-name': getClass({
                    'netplay-player-name': true
                }),
                'netplay-roomlist': getClass({
                    'netplay-roomlist': true
                }),
                'netplay-room-name-input': getClass({
                    'netplay-room-name-input': true
                }),
                'netplay-room-password-input': getClass({
                    'netplay-room-password-input': true
                }),
                'netplay-create-room-set': getClass({
                    'netplay-create-room-set': true
                }),
                'netplay-room': getClass({
                    'netplay-room': true
                }),
                'modal': getClass({
                    'modal': true
                }),
                'modal__overlay': getClass({
                    'modal__overlay': true
                }),
                'modal__container': getClass({
                    'modal__container': true
                }),
                'modal__header': getClass({
                    'modal__header': true
                }),
                'modal__title': getClass({
                    'modal__title': true
                }),
                'modal__close': getClass({
                    'modal__close': true
                }),
                'modal__content': getClass({
                    'modal__content': true
                }),
                'modal__btn': getClass({
                    'modal__btn': true
                }),
                'modal__btn-primary': getClass({
                    'modal__btn-primary': true
                }),
                'micromodal-slide': getClass({
                    'micromodal-slide': true
                }),
                'modal__errmsg': getClass({
                    'modal__errmsg': true
                }),
                'modal__footer': getClass({
                    'modal__footer': true
                }),
                'cheats-add': getClass({
                    'cheats-add': true
                }),
                'cheats-list': getClass({
                    'cheats-list': true
                }),
                'cheat-code-input': getClass({
                    'cheat-code-input': true
                }),
                'cheat-name-input': getClass({
                    'cheat-name-input': true
                }),
                'ejs-switch': getClass({
                    'ejs-switch': true
                }),
                'ejs-delete-cheat': getClass({
                    'ejs-delete-cheat': true
                })
            },
            'initShaders': function() {
                const _0xa88a13 = shaders;
                for (let _0x17edbf = Object.keys(_0xa88a13), _0x2c1832 = '', _0x26fb6a = 0; _0x26fb6a < _0x17edbf.length; _0x26fb6a += 1) _0x2c1832 = _0xa88a13[_0x17edbf[_0x26fb6a]], _0x27f4c4.FS.writeFile('/shader/' .concat(_0x17edbf[_0x26fb6a]), _0x2c1832), _0x2593da.storage.get('shader') === _0x17edbf[_0x26fb6a] && _0x27f4c4.FS.writeFile('/shader/shader.glslp', _0x2c1832);
            },
            'setMessageDialog': function() {
                this.elements.dialogs.message.innerHTML = '<div class="' + _0x378b5c.classNames['dialog-container'] + '"><div class="' + _0x378b5c.classNames['dialog-title'] + '"><h2>'+this.localization('Drop to load save state')+'</h2></div></div>';
            },
            'setGamepadDialog': function() {
                let _this = this;
                _this.elements.dialogs.gamepad.innerHTML = '\n        <div class="' + _0x378b5c.classNames['dialog-container'] + '">\n            <div class="' + _0x378b5c.classNames['dialog-title'] + '">\n                <h4>'+_this.localization('Control Settings')+'</h4>\n            </div>\n            \n            <ul class="' + _0x378b5c.classNames.tabs + '" id="controls-tabs">\n                <li class="tabs-title" role="presentation"><a href="#" onclick="return false" role="tab" aria-controls="controls-0" aria-selected="false" id="controls-0-label">'+_this.localization('Player 1')+'</a></li>\n                <li class="tabs-title" role="presentation"><a href="#" onclick="return false" role="tab" aria-controls="controls-1" aria-selected="false" id="controls-1-label">'+_this.localization('Player 2')+'</a></li>\n                <li class="tabs-title" role="presentation"><a href="#" onclick="return false" role="tab" aria-controls="controls-2" aria-selected="false" id="controls-2-label">'+_this.localization('Player 3')+'</a></li>\n                <li class="tabs-title" role="presentation"><a href="#" onclick="return false" role="tab" aria-controls="controls-3" aria-selected="false" id="controls-3-label">'+_this.localization('Player 4')+'</a></li>\n            </ul>\n            <div class="' + _0x378b5c.classNames['dialog-content'] + '">\n            <div class="' + _0x378b5c.classNames['tabs-content'] + ' controls">\n                \n            </div>\n            </div>\n            <div class="' + _0x378b5c.classNames['dialog-buttons'] + '">\n                <a href="#" onclick="return false" class="' + _0x378b5c.classNames['btn-reset'] + '">'+_this.localization('Reset')+'</a>\n                <a href="#" onclick="return false" class="' + _0x378b5c.classNames['btn-clear'] + '">'+_this.localization('Clear')+'</a>\n                <a href="#" onclick="return false" style="background-color:#929292;" class="' + _0x378b5c.classNames['btn-close'] + '">'+_this.localization('Close')+'</a>\n            </div>\n            <div class="' + _0x378b5c.classNames.overlay + '" hidden>\n                <div class="' + _0x378b5c.classNames['key-setting-popup'] + '">\n                    <span>[Select]</span><br />\n                    <div style="color:#fff !important">'+_this.localization('Press keyboard or gamepad')+'</div>\n                </div>\n            </div>\n        </div>\n        ';
                
                let _0x17edbf = '\n        <div class="' .concat(_0x378b5c.classNames['tabs-panel'], '" id="controls-{index}" hidden>\n            <div>\n                <div style="">\n                    <div class="gamepad" style="font-size:12px">Connected gamepad: <span class="gamepad-name">n/a</span></div>\n                </div>\n                <div style="width:25%;float:left">&nbsp;</div>\n                <div style="font-size:12px;width:50%;float:left">\n                    <div class="row">\n                        <div style="text-align:center;width:50%;float:left">'+_this.localization('Gamepad')+'</div>\n                        <div style="text-align:center;width:50%;float:left">'+_this.localization('Keyboard')+'</div>\n                    </div>\n                </div>\n                <div style="clear:both"></div>\n            </div>\n        </div>'),
                    _0x2c1832 = '\n        <div class="' .concat(_0x378b5c.classNames['button-container'], '" data-id="{id}" data-index="{index}" data-label="{label}" style="margin-bottom:10px">\n            <div style="width:25%;float:left;font-size:12px">\n                <label>{label}:</label>\n            </div>\n            <div style="width:50%;float:left">\n                <div>\n                    <div style="width:50%;float:left;padding: 0 5px;">\n                        <input style="text-align:center;height:25px;width: 100%;" type="text" data-id="{id}" data-value="" data-type="2" data-index="{index}" readonly="" placeholder="">\n                    </div>\n                    <div style="width:50%;float:left;padding: 0 5px;">\n                        <input style="text-align:center;height:25px;width: 100%;" type="text" data-id="{id}" data-value="" data-type="1" data-index="{index}" readonly="" placeholder="">\n                    </div>\n                    <div style="clear:both"></div>\n                </div>\n            </div>\n            <div style="width:25%;float:left">\n                <a class="').concat(_0x378b5c.classNames.set, '" href="#" onclick="return false">'+_this.localization('Set')+'</a>\n            </div>\n            <div style="clear:both"></div>\n        </div>')
                let _0x48ee51;
                if ('nes' === getSystem(_this.system, true)) {
                    _0x48ee51 = {
                        0: 'B',
                        2: 'SELECT',
                        3: 'START',
                        4: 'UP',
                        5: 'DOWN',
                        6: 'LEFT',
                        7: 'RIGHT',
                        8: 'A',
                        24: _this.localization('QUICK SAVE STATE'),
                        25: _this.localization('QUICK LOAD STATE'),
                        26: _this.localization('CHANGE STATE SLOT')
                    }
                } else if ('snes' === getSystem(_this.system, true)) {
                    _0x48ee51 = {
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
                        24: _this.localization('QUICK SAVE STATE'),
                        25: _this.localization('QUICK LOAD STATE'),
                        26: _this.localization('CHANGE STATE SLOT')
                    };
                } else if ('n64' === getSystem(_this.system, true)) {
                    _0x48ee51 = {
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
                        24: _this.localization('QUICK SAVE STATE'),
                        25: _this.localization('QUICK LOAD STATE'),
                        26: _this.localization('CHANGE STATE SLOT')
                    };
                    // The new nintendo 64 core has new default buttons
                    if (_this.coreVer === 2) {
                        _0x48ee51[0] = 'A';
                        _0x48ee51[1] = 'B';
                        delete _0x48ee51[8];
                    }
                } else if ('nds' === getSystem(_this.system, true)) {
                    _0x48ee51 = {
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
                        24: _this.localization('QUICK SAVE STATE'),
                        25: _this.localization('QUICK LOAD STATE'),
                        26: _this.localization('CHANGE STATE SLOT')
                    };
                } else {
                    _0x48ee51 = {
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
                        24: _this.localization('QUICK SAVE STATE'),
                        25: _this.localization('QUICK LOAD STATE'),
                        26: _this.localization('CHANGE STATE SLOT')
                    };
                }
                if (['arcade', 'mame'].includes(getSystem(_this.system, true))) {
                    _0x48ee51[2] = _this.localization('INSERT COIN');
                }
                if (_this.statesSupported === false) {
                    delete _0x48ee51[24];
                    delete _0x48ee51[25];
                    delete _0x48ee51[26];
                }
                
                for (let _0x501790 = [2, 3, 4, 5, 6, 7, 8, 0, 9, 1, 10, 11, 12, 13, 14, 15, 19, 18, 17, 16, 23, 22, 21, 20, 24, 25, 26], _0x88827f = 0; _0x88827f <= 3; _0x88827f++) {
                    _this.elements.dialogs.gamepad.querySelector('.' .concat(_0x378b5c.classNames['tabs-content'])).innerHTML += _0x17edbf.replace(/{index}/g, _0x88827f);
                    _0x501790.forEach(function(_0x1bf162) {
                        _0x48ee51[_0x1bf162] && (_this.elements.dialogs.gamepad.querySelector('#controls-' .concat(_0x88827f)).innerHTML += _0x2c1832.replace(/{index}/g, _0x88827f).replace(/{id}/g, _0x1bf162).replace(/{label}/g, _0x48ee51[_0x1bf162]));
                    })
                    const setSpecial = function(elem) {
                        elem.style.backgroundColor = '#ccc';
                        elem.setAttribute("title", "This setting is automatically set to your controllers axis.");
                    }
                    const special = [16, 17, 18, 19, 20, 21, 22, 23];
                    for (let i=0; i<special.length; i++) {
                        _this.elements.dialogs.gamepad.querySelector('[data-id="'+special[i]+'"][data-index="' .concat(_0x88827f, '"][data-type="2"]')) && setSpecial(_this.elements.dialogs.gamepad.querySelector('[data-id="'+special[i]+'"][data-index="' .concat(_0x88827f, '"][data-type="2"]')));
                    }
                }
                Object.keys(_0x378b5c.controllers).forEach(function(_0x23d419) {
                    _0x378b5c.controllers[_0x23d419] && Object.keys(_0x378b5c.controllers[_0x23d419]).forEach(function(_0x21e62d) {
                        let _0x294e35 = _this.elements.dialogs.gamepad.querySelector('[data-id="' .concat(_0x21e62d, '"][data-index="').concat(_0x23d419, '"][data-type="1"]')),
                            _0x1849bc = _this.elements.dialogs.gamepad.querySelector('[data-id="' .concat(_0x21e62d, '"][data-index="').concat(_0x23d419, '"][data-type="2"]'));
                        if (!_0x294e35 || !_0x1849bc) return false;
                        let _0x19d43b = _0x378b5c.controllers[_0x23d419][_0x21e62d];
                        _0x19d43b && (_0x19d43b.type && 1 !== parseInt(_0x19d43b.type, 0xa) ? _0x1849bc.value = '' : _0x19d43b.value && (_0x294e35.value = _0x378b5c.keyMap[_0x19d43b.value] || '', _0x294e35.setAttribute('data-value', _0x19d43b.value)), _0x19d43b.value2 && (_0x1849bc.value = isNaN(_0x19d43b.value2) ? (_0x19d43b.value2) : ('button ' .concat(parseInt(_0x19d43b.value2, 0xa) + 1)), _0x1849bc.setAttribute('data-value', _0x19d43b.value2)));
                    });
                }), _0x1093f4.call(this, _this.elements.dialogs.gamepad.querySelector('.' .concat(_0x378b5c.classNames['btn-close'])), 'click', function(_0x5f19bd) {
                    let _0x2c1832 = _this.elements.dialogs.gamepad.querySelectorAll('input'),
                        _0x2844f7 = {};
                    return Array.from(_0x2c1832).forEach(function(_0x33c024) {
                        let _0x5f19bd, _0x2c1832 = _0x33c024.getAttribute('data-index'),
                            _0x124d0a = _0x33c024.getAttribute('data-value');
                        2 === parseInt(_0x33c024.getAttribute('data-type'), 0xa) && (_0x5f19bd = _0x33c024.getAttribute('data-value'));
                        let _0x54b9af = _0x33c024.getAttribute('data-id');
                        _0x2844f7[_0x2c1832] || (_0x2844f7[_0x2c1832] = {}), _0x2844f7[_0x2c1832][_0x54b9af] || (_0x2844f7[_0x2c1832][_0x54b9af] = {}), _0x124d0a && (_0x2844f7[_0x2c1832][_0x54b9af].value = _0x124d0a), _0x5f19bd && (_0x2844f7[_0x2c1832][_0x54b9af].value2 = _0x5f19bd);
                    }), _0x2593da.storage.set({
                        'controllers': _0x2844f7
                    }), _0x378b5c.controllers = _0x2844f7, _0x132da7(_this.elements.dialogs.gamepad, true), _this.elements.container.focus(), _0x5f19bd.stopPropagation(), false;
                }), _0x1093f4.call(this, _this.elements.dialogs.gamepad.querySelector('.' .concat(_0x378b5c.classNames['btn-reset'])), 'click', function(_0x5f19bd) {
                    _0x378b5c.controllers = JSON.parse(JSON.stringify(_0x378b5c.defaultControllers))
                    localStorage.removeItem(_0x2593da.storage.key)
                    let _0x2c1832 = _this.elements.dialogs.gamepad.querySelectorAll('input')
                    for (let i=0; i<_0x2c1832.length; i++) {
                        let player = _0x2c1832[i].getAttribute('data-index')
                        let controlOrGamepad = _0x2c1832[i].getAttribute('data-type')
                        let buttonId = _0x2c1832[i].getAttribute('data-id')
                        let a = (controlOrGamepad == 1) ? 'value' : 'value2'
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
                }), _0x1093f4.call(this, _this.elements.dialogs.gamepad.querySelector('.' .concat(_0x378b5c.classNames['btn-clear'])), 'click', function(_0x5f19bd) {
                    let c = {0:{}, 1:{}, 2:{}, 3:{}};
                    for (let k in _0x48ee51) {
                        c[0][k] = {};
                        c[1][k] = {};
                        c[2][k] = {};
                        c[3][k] = {};
                    }
                    _0x378b5c.controllers = c
                    localStorage.setItem(_0x2593da.storage.key, JSON.stringify({controllers: _0x378b5c.controllers}))
                    let _0x2c1832 = _this.elements.dialogs.gamepad.querySelectorAll('input')
                    for (let i=0; i<_0x2c1832.length; i++) {
                        _0x2c1832[i].value = '';
                        _0x2c1832[i].setAttribute('data-value', '');
                    }
                }), Array.from(_this.elements.dialogs.gamepad.querySelectorAll('.' .concat(_0x378b5c.classNames.tabs, ' li'))).forEach(function(_0x523f7b) {
                    _0x1093f4.call(_this, _0x523f7b, 'mousedown', function(_0xa99a78) {
                        _0x3a8e2f(_this.elements.dialogs.gamepad.querySelectorAll('.' .concat(_0x378b5c.classNames.tabs, ' li')), _0x378b5c.classNames.active, false);
                        _0x3a8e2f(_0x523f7b, _0x378b5c.classNames.active, true);
                        let _0xb8a227 = _0x523f7b.querySelector('a').getAttribute('aria-controls');
                        Array.from(_this.elements.dialogs.gamepad.querySelectorAll('.' .concat(_0x378b5c.classNames['tabs-content'], ' .').concat(_0x378b5c.classNames['tabs-panel']))).forEach(function(_0x1c29a4) {
                            _0x132da7(_0x1c29a4, true);
                        });
                        _0x132da7(_this.elements.dialogs.gamepad.querySelector('.' .concat(_0x378b5c.classNames['tabs-content'], ' #').concat(_0xb8a227)), false);
                        _0xa99a78.stopPropagation();
                        return false;
                    });
                }), _0xbae705.call(_this, _this.elements.dialogs.gamepad.querySelector('[aria-controls="controls-0"]').parentNode, 'mousedown');
                let _0x11b11a = _this.elements.dialogs.gamepad.querySelector('.' .concat(_0x378b5c.classNames.overlay));
                _0x1093f4.call(_this, _0x11b11a, 'mousedown', function(_0x15c7de) {
                    _0x132da7(_0x11b11a, true), _0x15c7de.stopPropagation();
                }), Array.from(_this.elements.dialogs.gamepad.querySelectorAll('.' .concat(_0x378b5c.classNames['button-container']))).forEach(function(_0x16f092) {
                    _0x1093f4.call(_this, _0x16f092, 'mousedown', function(_0xdb1c93) {
                        _0xbae705.call(_this, _0x16f092.querySelector('a.' .concat(_0x378b5c.classNames.set)), _0xdb1c93.type, true, {});
                    });
                }), Array.from(_this.elements.dialogs.gamepad.querySelectorAll('.' .concat(_0x378b5c.classNames['tabs-panel'], ' a.').concat(_0x378b5c.classNames.set))).forEach(function(_0x397818) {
                    _0x1093f4.call(_this, _0x397818, 'mousedown', function(_0x1e1d79) {
                        let _0x2c1832 = _0x397818.parentNode.parentNode,
                            _0x4e649c = _0x2c1832.getAttribute('data-id'),
                            _0x431719 = _0x2c1832.getAttribute('data-index'),
                            _0x4a6f6f = _0x2c1832.getAttribute('data-label');
                        _0x132da7(_0x11b11a, false), _0x11b11a.setAttribute('data-id', _0x4e649c);
                        _0x11b11a.setAttribute('data-index', _0x431719);
                        let _0x179623 = '[ ' .concat(_0x4a6f6f, ' ]');
                        _0x378b5c.gamepad.gamepads[_0x431719] && _0x4e649c < 16 ? _0x179623 += '<br /><span style="font-size:12px">Gamepad:' .concat(_0x378b5c.gamepad.gamepads[_0x431719].id, '</span><br />'+_this.localization('Press keyboard or gamepad')+'<br/>'+_this.localization('Press escape (esc) to clear')) : _0x179623 += '<br />Press keyboard<br/>'+_this.localization('Press escape (esc) to clear'), _0x11b11a.querySelector('.' .concat(_0x378b5c.classNames['key-setting-popup'])).innerHTML = _0x179623, _0x1e1d79.stopPropagation();
                    });
                });
            },
            'setCacheDialog': function() {
                let _this = this;
                _this.elements.dialogs.cache.innerHTML = '\n        <div class="'+_0x378b5c.classNames['dialog-container']+'">\n            <div class="'+_0x378b5c.classNames['dialog-title']+'">\n                <h4>'+_this.localization('Cache Manager')+'</h4>\n            </div>\n            <div class="'+_0x378b5c.classNames['dialog-content']+'">\n\n            </div>\n            <div class="'+_0x378b5c.classNames['dialog-buttons']+'">\n                <a href="#" onclick="return false" class="'+_0x378b5c.classNames['btn-clear-all']+'">'+_this.localization('Clear All')+'</a>\n                <a href="#" onclick="return false" class="'+_0x378b5c.classNames['btn-cancel']+'">'+_this.localization('Close')+'</a>\n            </div>\n        </div>\n        ';
                
                _0x1093f4.call(this, _this.elements.dialogs.cache.querySelector('.' .concat(_0x378b5c.classNames['btn-cancel'])), 'click', function(_0x5d6721) {
                    return _0x132da7(_this.elements.dialogs.cache, true), _this.elements.container.focus(), _0x5d6721.stopPropagation(), false;
                })
                _0x1093f4.call(this, _this.elements.dialogs.cache.querySelector('.' .concat(_0x378b5c.classNames['btn-clear-all'])), 'click', function(_0x5d6721) {
                    return _0x27f4c4.romdb && (_0x27f4c4.romdb.clear(), _this.elements.dialogs.cache.querySelector('.' .concat(_0x378b5c.classNames['dialog-content'])).innerHTML = '<div style="text-align:center">'+_this.localization('Empty')+'</div>'), _0x46992d.stopPropagation(), false;
                })
                _0x1093f4.call(this, _this.elements.dialogs.cache.querySelector('.' .concat(_0x378b5c.classNames['dialog-title'], ' a')), 'click', function(_0x46992d) {
                    return _0x27f4c4.romdb && (_0x27f4c4.romdb.clear(), _this.elements.dialogs.cache.querySelector('.' .concat(_0x378b5c.classNames['dialog-content'])).innerHTML = '<div style="text-align:center">'+_this.localization('Empty')+'</div>'), _0x46992d.stopPropagation(), false;
                })
            },
            'showLoading': function(_0x108b55) {
                _0x4d8495.show('modal-6ed698f3d04061f5', {
                    'closeByEsckey': false
                }), _0x108b55 && console.log(''), _0x132da7(this.elements.dialogs.loading, false);
            },
            'hideLoading': function() {
                _0x4d8495.close(), _0x132da7(this.elements.dialogs.loading, true);
            },
            'setLoadingDialog': function() {
                this.elements.dialogs.loading && (this.elements.dialogs.loading.innerHTML = '\n            <div class="' .concat(_0x378b5c.classNames.modal, ' ').concat(_0x378b5c.classNames['micromodal-slide'], '" id="modal-6ed698f3d04061f5" aria-hidden="true">\n                <div class="').concat(_0x378b5c.classNames.modal__overlay, '" tabindex="-1">\n                <div class="').concat(_0x378b5c.classNames.modal__container, '" role="dialog" aria-modal="true" aria-labelledby="modal-6ed698f3d04061f5-title">\n                '+this.localization('Loading')+'...\n                </div>\n                </div>\n            </div>'));
            },
            'setCheatDialog': function() {
                let _this = this;
                if (_this.elements.dialogs.cheat) {
                    _this.elements.dialogs.cheat.innerHTML = '\n            <div class="' .concat(_0x378b5c.classNames['dialog-container'], '">\n                <div class="').concat(_0x378b5c.classNames['dialog-title'], '">\n                    <h4>Cheats</h4>\n                </div>\n                <div class="').concat(_0x378b5c.classNames['dialog-content'], '">\n                    <div class="').concat(_0x378b5c.classNames['cheats-list'], '">\n                        \n                    </div>\n                </div>\n                <div class="').concat(_0x378b5c.classNames['dialog-buttons'], '">\n                    <a href="#" onclick="return false" class="').concat(_0x378b5c.classNames['cheats-add'], '">'+_this.localization('Add Cheat')+'</a>\n                    <a href="#" onclick="return false" class="').concat(_0x378b5c.classNames['btn-cancel'], '">Close</a>\n                </div>\n            </div>\n\n            \n\n            <div class="').concat(_0x378b5c.classNames.modal, ' ').concat(_0x378b5c.classNames['micromodal-slide'], '" id="modal-85cd7a1c543a484b" aria-hidden="true">\n                <div class="').concat(_0x378b5c.classNames.modal__overlay, '" tabindex="-1" data-modal-close>\n                <div class="').concat(_0x378b5c.classNames.modal__container, '" style="width:100%" role="dialog" aria-modal="true" aria-labelledby="modal-85cd7a1c543a484b-title">\n                    <div class="').concat(_0x378b5c.classNames.modal__header, '">\n                    <h2 class="').concat(_0x378b5c.classNames.modal__title, '" id="modal-85cd7a1c543a484b-title">\n                    '+_this.localization('Add Cheat Code')+'\n                    </h2>\n                    <button class="').concat(_0x378b5c.classNames.modal__close, '" aria-label="Close modal" data-modal-close></button>\n                    </div>\n                    <main class="').concat(_0x378b5c.classNames.modal__content, '" id="modal-85cd7a1c543a484b-content">\n\n                        <div class="').concat(_0x378b5c.classNames.modal__errmsg, '"></div>\n                        <strong>'+_this.localization('Code')+'</strong><br />\n                        <textarea style="width:100%;height:80px;" class="').concat(_0x378b5c.classNames['cheat-code-input'], '"></textarea><br />\n                        <strong>'+_this.localization('Description')+'</strong><br />\n                        <input type="text" class="').concat(_0x378b5c.classNames['cheat-name-input'], '" /><br />\n\n                    </main>\n                    <footer class="').concat(_0x378b5c.classNames.modal__footer, '">\n                    <button class="').concat(_0x378b5c.classNames.modal__btn, ' ').concat(_0x378b5c.classNames['modal__btn-primary'], '">'+_this.localization('Submit')+'</button>\n                    <button class="').concat(_0x378b5c.classNames.modal__btn, '" data-modal-close aria-label="Close">'+_this.localization('Close')+'</button>\n                    </footer>\n                </div>\n                </div>\n            </div>\n            ');
                    let _0x17edbf = _this.elements.dialogs.cheat.querySelector('#modal-85cd7a1c543a484b');
                    _0x1093f4.call(this, _this.elements.dialogs.cheat.querySelector('.' .concat(_0x378b5c.classNames['cheats-add'])), 'click', function(_0x2a74b5) {
                        return _0x4d8495.show('modal-85cd7a1c543a484b', {
                            'closeTrigger': 'data-modal-close'
                        }), false;
                    });
                    let _0x2c1832 = _this.elements.dialogs.cheat.querySelector('.' .concat(_0x378b5c.classNames['cheats-list']));
                    _0x1093f4.call(this, _0x17edbf.querySelector('.' .concat(_0x378b5c.classNames['modal__btn-primary'])), 'click', function(_0x1c01ce) {
                        let _0x184e2c = _0x17edbf.querySelector('.' .concat(_0x378b5c.classNames['cheat-name-input'])).value,
                            _0x15ccbb = _0x17edbf.querySelector('.' .concat(_0x378b5c.classNames['cheat-code-input'])).value;
                        if (_0x184e2c && _0x15ccbb) {
                            let _0x2c3108 = _0x2c1832.querySelectorAll('input:checked');
                            _0x17edbf.querySelector('.' .concat(_0x378b5c.classNames['cheat-name-input'])).value = '', _0x17edbf.querySelector('.' .concat(_0x378b5c.classNames['cheat-code-input'])).value = '', _0x4d8495.close();
                            let _0x5b2cff = _this.cheats.length;
                            _this.cheats.push([_0x184e2c, _0x15ccbb]), _0x2c1832.innerHTML += '<div class="' .concat(_0x378b5c.classNames['ejs-switch'], '">\n                            <input type="checkbox" value="').concat(_0x5b2cff, '" id="ejs-cheat-switch-').concat(_0x5b2cff, '">\n                            <label for="ejs-cheat-switch-').concat(_0x5b2cff, '">').concat(_0x184e2c, '</label>\n                            <a href="#" data-idx="').concat(_0x5b2cff, '" onclick="return false" class="').concat(_0x378b5c.classNames['ejs-delete-cheat'], '">&times;</a>\n                        </div>'), _0x2c3108.forEach(function(_0x1fb248, _0x7bb84b) {
                                _0x2c1832.querySelector('#ejs-cheat-switch-' .concat(_0x7bb84b)).setAttribute('checked', 'checked');
                            });
                        }
                        if ('localStorage' in window && _this.getStartName()) {
                            localStorage.setItem('' .concat(_this.system, '-').concat(_this.getStartName(), '-cheats'), JSON.stringify(_this.cheats));
                            _0x1c01ce.stopPropagation();
                        }
                        return false;
                    });
                    let _0x257001 = function() {
                        if ('localStorage' in window && _this.getStartName()) {
                            let _0x17edbf = localStorage.getItem('' .concat(_this.system, '-').concat(_this.getStartName(), '-cheats'));
                            try {
                                _0x17edbf = JSON.parse(_0x17edbf);
                            } catch (_0x101b3e) {}
                            _0x17edbf && (_this.cheats = _0x17edbf);
                        }
                        _0x2c1832.innerHTML = '';
                        if (_this.cheats && Array.isArray(_this.cheats)) {
                            _this.cheats.forEach(function(_0x245035, _0x116996) {
                                let _0x4ac35a = _0x245035[0];
                                _0x245035[1];
                                _0x2c1832.innerHTML += '<div class="' .concat(_0x378b5c.classNames['ejs-switch'], '">\n                                <input type="checkbox" value="').concat(_0x116996, '" id="ejs-cheat-switch-').concat(_0x116996, '">\n                                <label for="ejs-cheat-switch-').concat(_0x116996, '">').concat(_0x4ac35a, '</label>\n                                <a href="#" data-idx="').concat(_0x116996, '" onclick="return false" class="').concat(_0x378b5c.classNames['ejs-delete-cheat'], '">&times;</a>\n                            </div>');
                            });
                        }
                    };
                    _0x1093f4.call(_this, _0x2c1832, 'click', function(_0x576733) {
                        if (_0x576733.target && _0x576733.target.classList.contains(_0x378b5c.classNames['ejs-delete-cheat']) && _0x576733.target.getAttribute('data-idx')) {
                            let _0x5b10b7 = _0x576733.target.getAttribute('data-idx');
                            _this.cheats.splice(_0x5b10b7, 1);
                            if ('localStorage' in window && _this.getStartName()) {
                                localStorage.setItem('' .concat(_this.system, '-').concat(_this.getStartName(), '-cheats'), JSON.stringify(_this.cheats));
                            }
                            let _0x557895 = [];
                            _0x2c1832.querySelectorAll('input').forEach(function(_0xab0ba8, _0x1f3597) {
                                _0x557895[_0x1f3597] = !!_0x2c1832.querySelector('#ejs-cheat-switch-' .concat(_0x1f3597, ':checked'));
                            }), _0x557895.splice(_0x5b10b7, 1), _0x257001(), _0x557895.forEach(function(_0x2e22be, _0x2247c4) {
                                _0x2e22be && _0x2c1832.querySelector('#ejs-cheat-switch-' .concat(_0x2247c4)).setAttribute('checked', 'checked');
                            });
                        }
                        return _0x576733.stopPropagation(), false;
                    }), _0x1093f4.call(_this, _this.elements.container, 'start-game', function(_0x4c266e) {
                        _0x257001();
                    }), _0x1093f4.call(this, _this.elements.dialogs.cheat.querySelector('.' .concat(_0x378b5c.classNames['btn-cancel'])), 'click', function(_0x5785f6) {
                        _0x378b5c.resetCheat();
                        _0x2c1832.querySelectorAll('input:checked').forEach(function(_0xeb7426, _0x45b02d) {
                            let _0x27e2c1 = _this.cheats[_0xeb7426.value];
                            _0x27e2c1 && _0x378b5c.setCheat(_0x45b02d, 1, _0x27e2c1[1]);
                        });
                        _0x132da7(_this.elements.dialogs.cheat, true);
                        _this.elements.container.focus();
                        return false;
                    }), 'arcade' !== getSystem(_this.system, true) && 'mame' !== getSystem(_this.system, true) && 'mame2003' !== getSystem(_this.system, true) && 'mame2010' !== getSystem(_this.system, true) || (_0x1e2c68.element(_this.elements.buttons.cheat) && _0x132da7(_this.elements.buttons.cheat, true), _0x378b5c.allowCheat = false), _0x378b5c.setCheat || (_0x132da7(_this.elements.buttons.cheat, true), _0x378b5c.allowCheat = false);
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
                }
                _0x378b5c.connection.socketMessageEvent = 'netplay';
                _0x378b5c.connection.enableFileSharing = true;
                _0x378b5c.connection.enableLogs = true;
                _0x378b5c.connection.session = {
                    'data': true
                };
                _0x378b5c.connection.coreVer = _0x17edbf.coreVer;
                _0x378b5c.connection.sdpConstraints.mandatory = {
                    'OfferToReceiveAudio': false,
                    'OfferToReceiveVideo': false
                }
                _0x378b5c.connection.onclose = function() {};
                
                _0x378b5c.connection.iceServers = window.EJS_TURN_URLS;
                _0x378b5c.connection.maxParticipantsAllowed = 4;
                _0x378b5c.netPlayInitFrame = 0;
                var _0x1eb137 = 0,
                    _0x52eb7d = false;
                Module.postMainLoop = function() {
                    var _0xa88a13;
                    if (_0x378b5c.currentFrame = parseInt(_0x378b5c.currentFrameNum(), 0xa), _0x378b5c.connected) {
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
                    }
                }
                _0x378b5c.connection.onopen = function(_0x4b10d6) {
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
                }
                _0x378b5c.connection.onFileStart = function(_0x50eb3a) {
                    var _0x2c1832 = _0x50eb3a.name.split('-');
                    'reset' !== _0x2c1832[0x0] && 0x0 != _0x2c1832[0x0] || (_0x378b5c.inputsData = {}, _0x378b5c.disableControl(true)), _0x378b5c.progressHelper[_0x50eb3a.remoteUserId] = {}, _0x378b5c.progressHelper[_0x50eb3a.remoteUserId].max = _0x50eb3a.maxChunks, _0x378b5c.showLoading.call(_0x17edbf), _0x378b5c.connection.isInitiator ? (_0x378b5c.wait = true, _0x378b5c.systemPause(0x1), _0x27f4c4.Module.pauseMainLoop()) : _0x378b5c.inputsData = {};
                }
                _0x378b5c.connection.onFileProgress = function(_0x44a04b) {
                    var _0x17edbf = _0x378b5c.progressHelper[_0x44a04b.remoteUserId];
                    _0x17edbf.current = _0x44a04b.currentPosition || _0x44a04b.maxChunks || _0x17edbf.max;
                }
                _0x378b5c.connection.onFileEnd = function(_0x45d454) {
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
                            (async () => {
                                const state = await _0x378b5c.saveState();
                                _0x27f4c4.FS.createDataFile('/', 'game.state', state, true, true);
                                _0x27f4c4.Module.cwrap('load_state', 'number', ['string', 'number'])('game.state', 0);
                                //_0x27f4c4.FS.unlink('game.state');
                                _0x378b5c.inputsData = {};
                                const file = new File([state], '0-game.state', {
                                    'type': '',
                                    'lastModified': new Date()
                                });
                                _0x378b5c.connection.shareFile(file, _0x2a5bce);
                            })()
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
                        if (window.EJS_TURN_URLS === null || !window.EJS_TURN_URLS || window.EJS_TURN_URLS.length === 0) {
                            _0x5289c1.querySelector('#modal-7d8fd50ed642340b-content').innerHTML = (window.EJS_TURN_URLS === null || window.EJS_TURN_URLS.length === 0) ? 'Netplay Currently Unavailable' : 'Netplay initializing';
                            _0x4d8495.show('modal-7d8fd50ed642340b', {
                                'closeTrigger': 'data-modal-close'
                            });
                            return;
                        }
                        _0x378b5c.connection.iceServers = window.EJS_TURN_URLS;
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
                        _0x5cf2be = [listUrl, 'list?game_id=', _0x17edbf.config.gameId, '&domain=', window.location.hostname, '&coreVer=', _0x17edbf.coreVer].join('');
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
                    _0x378b5c.stopLoadRooms();
                    _0x132da7(_0x10625f.elements.dialogs.netplay.querySelector('.' .concat(_0x378b5c.classNames['netplay-roomlist'])), true);
                    _0x132da7(_0x10625f.elements.dialogs.netplay.querySelector('.' .concat(_0x378b5c.classNames['netplay-room'])), !0x1);
                    _0x132da7(_0x10625f.elements.dialogs.netplay.querySelector('.' .concat(_0x378b5c.classNames['btn-create-room'])), true);
                    _0x132da7(_0x10625f.elements.dialogs.netplay.querySelector('.' .concat(_0x378b5c.classNames['btn-quit'])), !0x1);
                    _0x378b5c.resetCheat();
                    _0x132da7(_0x10625f.elements.buttons.cheat, true);
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
                    if (window.EJS_TURN_URLS === null || !window.EJS_TURN_URLS || window.EJS_TURN_URLS.length === 0) {
                        _0x5289c1.querySelector('#modal-7d8fd50ed642340b-content').innerHTML = (window.EJS_TURN_URLS === null || window.EJS_TURN_URLS.length === 0) ? 'Netplay Currently Unavailable' : 'Netplay initializing';
                        _0x4d8495.show('modal-7d8fd50ed642340b', {
                            'closeTrigger': 'data-modal-close'
                        });
                        return;
                    }
                    _0x378b5c.connection.iceServers = window.EJS_TURN_URLS;
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
            window._0x378b5c = _0x378b5c;
            },
            'initKeyboard': function() {
                let _this = this,
                    _0x17edbf = this,
                    _0x2c1832 = this.elements.dialogs.gamepad.querySelector('.' .concat(_0x378b5c.classNames.overlay));
                _0x1093f4.call(this, document.body, 'keydown keyup', function(_0x459b32) {
                    if (_0x459b32.which >= 0x70 && _0x459b32.which <= 0x7b);
                    else {
                        let _0x335c01 = !_this.elements.dialogs.gamepad.hidden && !_0x2c1832.hidden,
                            _0x2eb03e = 'keydown' === _0x459b32.type;
                        if (_0x2eb03e && _0x335c01) {
                            let _0x1a3a47 = _0x2c1832.getAttribute('data-index'),
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
                            _0x1a3a47 = _0x2c1832.getAttribute('data-index');
                             _0x1394cb = _0x2c1832.getAttribute('data-id');
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
                                parseInt(_0x378b5c.controllers[_0x3863d2][_0x509939].value, 0xa) === _0x459b32.keyCode && (_0x2eb03e ? _0x509939 >= 0x10 && _0x509939 <= 0x17 ? _0x378b5c.simulateInput(_0x3863d2, _0x509939, 0x7fff) : _0x378b5c.simulateInput(_0x3863d2, _0x509939, 1) : _0x378b5c.simulateInput(_0x3863d2, _0x509939, 0));
                            });
                        });
                    }
                }), document.body.addEventListener('keydown', function(_0x14d612) {
                    let _0x2c1832 = _0x14d612.keyCode ? _0x14d612.keyCode : _0x14d612.which;
                    [0x20, 0x25, 0x26, 0x27, 0x28, 0x70, 0x71, 0x72, 0x73, 0x74, 0x75, 0x76, 0x77, 0x78, 0x79, 0x7a, 0x7b].includes(_0x2c1832) && _0x14d612.srcElement === _0x17edbf.elements.container && _0x14d612.preventDefault(), _0x14d612.srcElement.className.split(/ +/).includes(_0x378b5c.classNames.set) && _0x14d612.preventDefault();
                });
            },
            'initGamepad': function() {
                let _this = this,
                    _0x17edbf = this,
                    _0x2c1832 = this.elements.dialogs.gamepad.querySelector('.' .concat(_0x378b5c.classNames.overlay));
                let gamepad;
                try {
                    gamepad = new _0x4ad1c6();
                } catch(e) {
                    console.warn('gamepad not supported');
                    return;
                }
                _0x378b5c.gamepad = gamepad;
                gamepad.on('buttondown', function(event) {
                    if (!_this.elements.dialogs.gamepad.hidden && !_0x2c1832.hidden) {
                        let _0x387018, _0xdd4205 = parseInt(_0x2c1832.getAttribute('data-index'), 0xa),
                            _0x1f4ee2 = _0x2c1832.getAttribute('data-id');
                        if (event.gamepadIndex === parseInt(_0xdd4205, 0xa)) {
                            let _0x126d2d = null;
                            (_0x126d2d = _0x17edbf.elements.dialogs.gamepad.querySelector('[data-id="' .concat(_0x1f4ee2, '"][data-index="').concat(_0xdd4205, '"][data-type="2"]'))).setAttribute('data-value', event.index), _0x126d2d.value = 'button ' .concat(event.index + 1), _0x132da7(_0x2c1832, true);
                        }
                    } else Object.keys(_0x378b5c.controllers[event.gamepadIndex.toString()]).forEach(function(_0x3cf4d3) {
                        let _0x5cf388 = event.gamepadIndex.toString();
                        if (parseInt(_0x378b5c.controllers[_0x5cf388][_0x3cf4d3].value2, 0xa) === parseInt(event.index, 0xa) && ['24', '25', '26'].includes(_0x3cf4d3)) {
                            if (_0x3cf4d3 == '24') {//save
                                _0x378b5c.quickSaveState()
                            } else if (_0x3cf4d3 == '25') {//load
                                _0x378b5c.quickLoadState()
                            } else if (_0x3cf4d3 == '26') {//load
                                _0x378b5c.changeStateSlot()
                            }
                        }
                        parseInt(_0x378b5c.controllers[_0x5cf388][_0x3cf4d3].value2, 0xa) === parseInt(event.index, 0xa) && parseInt(_0x5cf388, 0xa) === parseInt(event.gamepadIndex, 0xa) && _0x378b5c.simulateInput(_0x5cf388, _0x3cf4d3, 1);
                    });
                });
                gamepad.on('buttonup', function(event) {
                    Object.keys(_0x378b5c.controllers).forEach(function(_0x302c3e) {
                        Object.keys(_0x378b5c.controllers[_0x302c3e]).forEach(function(_0x14eb8a) {
                            parseInt(_0x378b5c.controllers[_0x302c3e][_0x14eb8a].value2, 0xa) === parseInt(event.index, 0xa) && parseInt(_0x302c3e, 0xa) === parseInt(event.gamepadIndex, 0xa) && _0x378b5c.simulateInput(_0x302c3e, _0x14eb8a, 0);
                        });
                    });
                });
                gamepad.on('axischanged', function(event) {
                    let value = function(value) {
                        if (value > 0.5 || value < -0.5) {
                            return (value > 0) ? 1 : -1;
                        } else {
                            return 0;
                        }
                    }(event.value);
                    if (!_this.elements.dialogs.gamepad.hidden && !_0x2c1832.hidden) {
                        if (value !== 0) {
                            let _0x1f4ee2 = _0x2c1832.getAttribute('data-id'),
                                _0xdd4205 = parseInt(_0x2c1832.getAttribute('data-index'), 0xa);
                            let _0x126d2d = _this.elements.dialogs.gamepad.querySelector('[data-id="' .concat(_0x1f4ee2, '"][data-index="').concat(_0xdd4205, '"][data-type="2"]'))
                            _0x126d2d.setAttribute('data-value', event.axis + ':' + value)
                            _0x126d2d.value = event.axis + ':' + value
                            _0x132da7(_0x2c1832, true)
                        }
                    } else {
                        if (! _0x378b5c.prevButtons) {
                            _0x378b5c.prevButtons = {}
                        }
                        let quit = false
                        let _0x5cf388 = event.gamepadIndex.toString();
                        if (! _0x378b5c.prevButtons[_0x5cf388]) {
                            _0x378b5c.prevButtons[_0x5cf388] = {}
                        }
                        if (! _0x378b5c.prevButtons[_0x5cf388][event.axis]) {
                            _0x378b5c.prevButtons[_0x5cf388][event.axis] = 0
                        }
                        if (! _0x378b5c.prevButtons[_0x5cf388].buttonID) {
                            _0x378b5c.prevButtons[_0x5cf388].buttonID = 0
                        }
                        for (let w=0; w<Object.keys(_0x378b5c.controllers[_0x5cf388]).length; w++) {
                            let _0x3cf4d3 = Object.keys(_0x378b5c.controllers[_0x5cf388])[w]
                            if (! _0x378b5c.controllers[_0x5cf388][_0x3cf4d3].value2) {
                                continue
                            }
                            if (_0x378b5c.controllers[_0x5cf388][_0x3cf4d3].value2.split(':')[0] === event.axis && parseInt(_0x378b5c.controllers[_0x5cf388][_0x3cf4d3].value2.split(':')[1]) === value && ['24', '25', '26'].includes(_0x3cf4d3)) {
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
                                if (_0x378b5c.controllers[_0x5cf388][_0x3cf4d3].value2.split(':')[0] === event.axis) {
                                    _0x378b5c.prevButtons[_0x5cf388][event.axis] = value
                                    _0x378b5c.prevButtons[_0x5cf388].buttonID = _0x3cf4d3
                                    _0x378b5c.simulateInput(_0x5cf388, _0x3cf4d3, 0)
                                }
                            } else {
                                //button down
                                if ((1 === _0x378b5c.prevButtons[_0x5cf388][event.axis] && value === -1) ||
                                    (-1 === _0x378b5c.prevButtons[_0x5cf388][event.axis] && value === 1)) {
                                    _0x378b5c.simulateInput(_0x5cf388, _0x378b5c.prevButtons[_0x5cf388].buttonID, 0)
                                }
                                if (_0x378b5c.controllers[_0x5cf388][_0x3cf4d3].value2.split(':')[0] === event.axis && parseInt(_0x378b5c.controllers[_0x5cf388][_0x3cf4d3].value2.split(':')[1]) === value) {
                                    _0x378b5c.prevButtons[_0x5cf388][event.axis] = value
                                    _0x378b5c.prevButtons[_0x5cf388].buttonID = _0x3cf4d3
                                    quit = true
                                    _0x378b5c.simulateInput(_0x5cf388, _0x3cf4d3, 1)
                                }
                            }
                        };
                        if (quit) {
                            return
                        }
                        if (! _this.elements.dialogs.gamepad.hidden && !_0x2c1832.hidden) {
                            return
                        }
                    }
                    Math.abs(event.value) <= 0.1 && (event.value = 0);
                    let _0x17edbf = event.gamepadIndex;
                    let coreVer = _this.coreVer;
                    if (event.axis === 'LEFT_STICK_X') {
                        if (event.value > 0) {
                            _0x378b5c.simulateInput(_0x17edbf, 16, 0x7fff * event.value);
                            _0x378b5c.simulateInput(_0x17edbf, 17, 0);
                        } else {
                            _0x378b5c.simulateInput(_0x17edbf, 17, -0x7fff * event.value);
                            _0x378b5c.simulateInput(_0x17edbf, 16, 0);
                        }
                    } else if (event.axis === 'LEFT_STICK_Y') {
                        if (event.value > 0) {
                            _0x378b5c.simulateInput(_0x17edbf, 18, 0x7fff * event.value);
                            _0x378b5c.simulateInput(_0x17edbf, 19, 0);
                        } else {
                            _0x378b5c.simulateInput(_0x17edbf, 19, -0x7fff * event.value);
                            _0x378b5c.simulateInput(_0x17edbf, 18, 0);
                        }
                    } else if (event.axis === 'RIGHT_STICK_X') {
                        if (event.value > 0) {
                            _0x378b5c.simulateInput(_0x17edbf, 20, 0x7fff * event.value);
                            _0x378b5c.simulateInput(_0x17edbf, 21, 0);
                        } else {
                            _0x378b5c.simulateInput(_0x17edbf, 21, -0x7fff * event.value);
                            _0x378b5c.simulateInput(_0x17edbf, 20, 0);
                        }
                    } else if (event.axis === 'RIGHT_STICK_Y') {
                        if (event.value > 0) {
                            _0x378b5c.simulateInput(_0x17edbf, 22, 0x7fff * event.value);
                            _0x378b5c.simulateInput(_0x17edbf, 23, 0);
                        } else {
                            _0x378b5c.simulateInput(_0x17edbf, 23, 0x7fff * event.value);
                            _0x378b5c.simulateInput(_0x17edbf, 22, 0);
                        }
                    }
                });
                gamepad.on('disconnected', function(event) {
                    [0, 1, 2, 3].forEach(function(_0x429f30) {
                        let _0x2c1832 = gamepad.gamepads[_0x429f30];
                        _0x17edbf.elements.dialogs.gamepad.querySelector('#controls-' .concat(_0x429f30, ' .gamepad-name')).innerHTML = _0x2c1832 ? _0x2c1832.id : 'n/a';
                    });
                });
                gamepad.on('connected', function(event) {
                    Object.keys(gamepad.gamepads).forEach(function(_0x327c74) {
                        let _0x2c1832 = gamepad.gamepads[_0x327c74];
                        _0x17edbf.elements.dialogs.gamepad.querySelector('#controls-' .concat(_0x327c74, ' .gamepad-name')).innerHTML = _0x2c1832 ? _0x2c1832.id : 'n/a';
                    });
                });
            },
            'setShader': function(_0x4cbec3) {
                if ('disabled' === _0x4cbec3) _0x27f4c4.FS.unlink('/shader/shader.glslp', ''), _0x378b5c.toggleShader && _0x378b5c.toggleShader(0);
                else {
                    _0x378b5c.toggleShader && _0x378b5c.toggleShader(0);
                    let _0x17edbf = '/shader/' .concat(_0x4cbec3);
                    try {
                        _0x27f4c4.FS.writeFile('/shader/shader.glslp', _0x27f4c4.FS.readFile(_0x17edbf));
                    }catch(e){};//This shouldnt matter
                    _0x378b5c.toggleShader && _0x378b5c.toggleShader(1);
                }
            },
            'toggleVirtualGamepad': function(_0x1ed80b, forceUpdateHTML) {
                let _this = this;
                if (_0x378b5c.virtualGamepadContainer && !forceUpdateHTML) {
                    _0x132da7(_0x378b5c.virtualGamepadContainer, !_0x1ed80b);
                    return
                }
                if (!_0x378b5c.virtualGamepadContainer) {
                    _0x378b5c.virtualGamepadContainer = _0x428003('div', {
                        'class': getClass({
                            'ejs-virtual-gamepad': true
                        }),
                        'hidden': ''
                    });
                    this.elements.container.appendChild(_0x378b5c.virtualGamepadContainer);
                }
                let blockCSS = 'height:31px;text-align:center;border:1px solid #ccc;border-radius:5px;line-height:31px;';
                let html = '';
                let info;
                
                if (_this.config.VirtualGamepadSettings && function(set) {
                    if (!Array.isArray(set)) {
                        console.warn("Vritual gamepad settings is not array! Using default gamepad settings");
                        return false;
                    }
                    if (!set.length) {
                        console.warn("Vritual gamepad settings is empty! Using default gamepad settings");
                        return false;
                    }
                    for (let i=0; i<set.length; i++) {
                        if (!set[i].type) continue;
                        try {
                            if (set[i].type === 'zone' || set[i].type === 'dpad') {
                                if (!set[i].location) {
                                    console.warn("Missing location value for "+set[i].type+"! Using default gamepad settings");
                                    return false;
                                } else if (!set[i].inputValues) {
                                    console.warn("Missing inputValues for "+set[i].type+"! Using default gamepad settings");
                                    return false;
                                }
                                continue;
                            }
                            if (!set[i].location) {
                                console.warn("Missing location value for button "+set[i].text+"! Using default gamepad settings");
                                return false;
                            } else if (!set[i].type) {
                                console.warn("Missing type value for button "+set[i].text+"! Using default gamepad settings");
                                return false;
                            } else if (!set[i].id.toString()) {
                                console.warn("Missing id value for button "+set[i].text+"! Using default gamepad settings");
                                return false;
                            } else if (!set[i].input_value.toString()) {
                                console.warn("Missing input_value for button "+set[i].text+"! Using default gamepad settings");
                                return false;
                            }
                        } catch(e) {
                            console.warn("Error checking values! Using default gamepad settings");
                            return false;
                        }
                    }
                    return true;
                }(_this.config.VirtualGamepadSettings)) {
                    info = _this.config.VirtualGamepadSettings;
                } else if (['gba', 'gb', 'vb', 'nes'].includes(getSystem(_this.system, true))) {
                    info = [{"type":"button","text":"B","id":"b","location":"right","right":-10,"top":70,"bold":true,"input_value":0},{"type":"button","text":"A","id":"a","location":"right","right":60,"top":70,"bold":true,"input_value":8},{"type":"dpad","location":"left","left":"50%","right":"50%","joystickInput":false,"inputValues":[4,5,6,7]},{"type":"button","text":"Start","id":"start","location":"center","left":60,"fontSize":15,"block":true,"input_value":3},{"type":"button","text":"Select","id":"select","location":"center","left":-5,"fontSize":15,"block":true,"input_value":2}];
                    if (getSystem(_this.system, true) === 'gba') {
                        info.push({"type":"button","text":"L","id":"l","block":true,"location":"top","left":10,"top":-40,"bold":true,"input_value":10});
                        info.push({"type":"button","text":"R","id":"r","block":true,"location":"top","right":10,"top":-40,"bold":true,"input_value":11});
                    }
                } else if (getSystem(_this.system, true) === 'n64') {
                    info = [{"type":"button","text":"B","id":"b","location":"right","left":-10,"top":95,"input_value":0,"bold":true,"input_new_cores":1},{"type":"button","text":"A","id":"a","location":"right","left":40,"top":150,"input_value":8,"bold":true,"input_new_cores":0},{"type":"zone","location":"left","left":"50%","top":"100%","joystickInput":true,"inputValues":[16, 17, 18, 19]},{"type":"zone","location":"left","left":"50%","top":"0%","joystickInput":false,"inputValues":[4,5,6,7]},{"type":"button","text":"Start","id":"start","location":"center","left":30,"top":-10,"fontSize":15,"block":true,"input_value":3},{"type":"button","text":"L","id":"l","block":true,"location":"top","left":10,"top":-40,"bold":true,"input_value":10},{"type":"button","text":"R","id":"r","block":true,"location":"top","right":10,"top":-40,"bold":true,"input_value":11},{"type":"button","text":"Z","id":"z","block":true,"location":"top","left":10,"bold":true,"input_value":12},{"fontSize":20,"type":"button","text":"CU","id":"cu","location":"right","left":25,"top":-65,"input_value":23},{"fontSize":20,"type":"button","text":"CD","id":"cd","location":"right","left":25,"top":15,"input_value":22},{"fontSize":20,"type":"button","text":"CL","id":"cl","location":"right","left":-15,"top":-25,"input_value":21},{"fontSize":20,"type":"button","text":"CR","id":"cr","location":"right","left":65,"top":-25,"input_value":20}];
                } else if (['snes', 'nds'].includes(getSystem(_this.system, true))) {
                    info = [{"type":"button","text":"X","id":"x","location":"right","left":40,"bold":true,"input_value":9},{"type":"button","text":"Y","id":"y","location":"right","top":40,"bold":true,"input_value":1},{"type":"button","text":"A","id":"a","location":"right","left":81,"top":40,"bold":true,"input_value":8},{"type":"button","text":"B","id":"b","location":"right","left":40,"top":80,"bold":true,"input_value":0},{"type":"zone","location":"left","left":"50%","top":"50%","joystickInput":false,"inputValues":[4,5,6,7]},{"type":"button","text":"Start","id":"start","location":"center","left":60,"fontSize":15,"block":true,"input_value":3},{"type":"button","text":"Select","id":"select","location":"center","left":-5,"fontSize":15,"block":true,"input_value":2}];
                } else {
                    info = [{"type":"button","text":"Y","id":"y","location":"right","left":40,"bold":true,"input_value":9},{"type":"button","text":"X","id":"X","location":"right","top":40,"bold":true,"input_value":1},{"type":"button","text":"B","id":"b","location":"right","left":81,"top":40,"bold":true,"input_value":8},{"type":"button","text":"A","id":"a","location":"right","left":40,"top":80,"bold":true,"input_value":0},{"type":"zone","location":"left","left":"50%","top":"50%","joystickInput":false,"inputValues":[4,5,6,7]},{"type":"button","text":"Start","id":"start","location":"center","left":60,"fontSize":15,"block":true,"input_value":3},{"type":"button","text":"Select","id":"select","location":"center","left":-5,"fontSize":15,"block":true,"input_value":2}];
                }
                info = JSON.parse(JSON.stringify(info));


                let dataHTML = {
                    top: '',
                    left: '',
                    center: '',
                    right: ''
                }
                let leftHandedMode = false;
                if (_0x2593da && typeof _0x2593da.getCoreOptionsValue === 'function') {
                    leftHandedMode = _0x2593da.getCoreOptionsValue('left-handed-mode')==='on';
                }
                for (let i=0; i<info.length; i++) {
                    if (info[i].type !== 'button') continue;
                    let opts = {'buttons': true};
                    if (leftHandedMode && ['left', 'right'].includes(info[i].location)) {
                        info[i].location = (info[i].location==='left') ? 'right' : 'left';
                        const amnt = JSON.parse(JSON.stringify(info[i]));
                        if (amnt.left) {
                            info[i].right = amnt.left;
                        }
                        if (amnt.right) {
                            info[i].left = amnt.right;
                        }
                    }
                    opts['b_'+info[i].id.toLowerCase()] = true;
                    let style = '';
                    if (info[i].left) {
                        style += 'left:'+info[i].left+(typeof info[i].left === 'number'?'px':'')+';';
                    }
                    if (info[i].right) {
                        style += 'right:'+info[i].right+(typeof info[i].right === 'number'?'px':'')+';';
                    }
                    if (info[i].top) {
                        style += 'top:'+info[i].top+(typeof info[i].top === 'number'?'px':'')+';';
                    }
                    if (!info[i].bold) {
                        style += 'font-weight:normal;';
                    } else if (info[i].bold) {
                        style += 'font-weight:bold;';
                    }
                    info[i].fontSize = info[i].fontSize || 30;
                    style += 'font-size:'+info[i].fontSize+'px;';
                    if (info[i].block) {
                        style += blockCSS;
                    }
                    if (['top', 'center', 'left', 'right'].includes(info[i].location)) {
                        dataHTML[info[i].location] += '<div class="'+getClass(opts)+'" style="'+style+'">'+info[i].text+'</div>';
                    }
                }
                html += '<div class="'+getClass({'virtual-gamepad': true})+'" style="display: block;">';
                html += '<div class="'+getClass({'top': true})+'">';
                html += dataHTML.top;
                html += '</div>';
                html += '<div class="'+getClass({'left': true})+'">';
                html += dataHTML.left;
                html += '</div>';
                html += '<div class="'+getClass({'center': true})+'">';
                html += dataHTML.center;
                html += '</div>';
                html += '<div class="'+getClass({'right': true})+'">';
                html += dataHTML.right;
                html += '</div></div>';
                _0x378b5c.virtualGamepadContainer.innerHTML = html;
                _0x132da7(_0x378b5c.virtualGamepadContainer, !_0x1ed80b);
                
                let _0x2c1832 = getClass({
                        'virtual-gamepad': true
                    }),
                    _0x2ec721 = getClass({
                        'touch': true
                    });
                if (! _0x59aa33.isIos) {
                    _0x1093f4.call(this, _0x530042.call(this, '.' .concat(_0x2c1832)), 'touchmove', function(event) {
                        event.stopPropagation();
                    });
                }
                function createDPad(config) {
                    let _0xb30294 = config.container,
                        _0x46ee07 = config.event;
                    if (typeof _0x46ee07 !== 'function') (_0x46ee07 = function () {});
                    let _0x2af034 = _0x428003('div', {class: getClass({"dpad-bg": true})}),
                        _0x573eda = _0x428003('div', {class: getClass({"dpad-front": true})});
                    
                    function _0x12b76b(event) {
                        let _0x243fd0 = event.targetTouches[0];
                        if (_0x243fd0) {
                            let _0x30ad4f = _0x573eda.getBoundingClientRect(),
                                _0x3f2d89 = _0x243fd0.clientX - _0x30ad4f.left - _0x573eda.clientWidth / 2,
                                _0x23d024 = _0x243fd0.clientY - _0x30ad4f.top - _0x573eda.clientHeight / 2,
                                _0x10098e = 0,
                                _0x419bd0 = 0,
                                _0x21a1ad = 0,
                                _0x1f5439 = 0,
                                _0x4fda8c = Math.atan(_0x3f2d89 / _0x23d024) / (Math.PI / 180);
                            
                            _0x23d024 <= -10 && (_0x10098e = 1);
                            _0x23d024 >= 10 && (_0x419bd0 = 1);
                            _0x3f2d89 >= 10 && (_0x1f5439 = 1, _0x21a1ad = 0, (_0x4fda8c < 0 && _0x4fda8c >= -35 || _0x4fda8c > 0 && _0x4fda8c <= 35) && (_0x1f5439 = 0), _0x10098e = _0x4fda8c < 0 && _0x4fda8c >= -55 ? 1 : 0, _0x419bd0 = _0x4fda8c > 0 && _0x4fda8c <= 55 ? 1 : 0);
                            _0x3f2d89 <= -10 && (_0x1f5439 = 0, _0x21a1ad = 1, (_0x4fda8c < 0 && _0x4fda8c >= -35 || _0x4fda8c > 0 && _0x4fda8c <= 35) && (_0x21a1ad = 0), _0x10098e = _0x4fda8c > 0 && _0x4fda8c <= 55 ? 1 : 0, _0x419bd0 = _0x4fda8c < 0 && _0x4fda8c >= -55 ? 1 : 0);
                            _0x2af034.classList.toggle(getClass({"dpad-right": true}), _0x1f5439);
                            _0x2af034.classList.toggle(getClass({"dpad-left": true}), _0x21a1ad);
                            _0x2af034.classList.toggle(getClass({"dpad-up": true}), _0x10098e);
                            _0x2af034.classList.toggle(getClass({"dpad-down": true}), _0x419bd0);
                            _0x46ee07(_0x10098e, _0x419bd0, _0x21a1ad, _0x1f5439);
                        }
                        event.stopPropagation();
                    }
                    function _0x320749(event) {
                        _0x46ee07(0, 0, 0, 0);
                        _0x2af034.classList.toggle(getClass({"dpad-up": true}), false);
                        _0x2af034.classList.toggle(getClass({"dpad-down": true}), false);
                        _0x2af034.classList.toggle(getClass({"dpad-right": true}), false);
                        _0x2af034.classList.toggle(getClass({"dpad-left": true}), false);
                        event.stopPropagation();
                    }
                    
                    _0x2af034.innerHTML = '<div class="'.concat(getClass({"dpad-1": true}), '"><div class="').concat(getClass({"dpad-1-bg": true}), '"></div></div>\n    <div class="').concat(getClass({"dpad-2": true}), '"><div class="').concat(getClass({"dpad-2-bg": true}), '"></div></div>');
                    _0xb30294.append(_0x2af034);
                    _0xb30294.append(_0x573eda);
                    _0x1093f4.call(_this, _0x573eda, 'touchstart touchmove', _0x12b76b);
                    _0x1093f4.call(_this, _0x573eda, 'touchend touchcancel', _0x320749);
                }
                info.forEach((dpad, index) => {
                    if (dpad.type !== 'dpad') return;
                    let opts = {};
                    if (leftHandedMode && ['left', 'right'].includes(dpad.location)) {
                        dpad.location = (dpad.location==='left') ? 'right' : 'left';
                        const amnt = JSON.parse(JSON.stringify(dpad));
                        if (amnt.left) {
                            dpad.right = amnt.left;
                        }
                        if (amnt.right) {
                            dpad.left = amnt.right;
                        }
                    }
                    opts[dpad.location.toLowerCase()] = true;
                    const parent = _0x530042.call(this, '.'.concat(getClass({
                        'ejs-virtual-gamepad': true
                    }), ' .').concat(getClass(opts)));
                    opts['dpad_'+index] = true;
                    const elem = _0x428003('div', {
                        'class': '.'.concat(getClass({
                            'ejs-virtual-gamepad': true,
                            'dpad-container': true
                        }), ' .').concat(getClass(opts))
                    });
                    let style = '';
                    if (dpad.left) {
                        style += 'left:'+dpad.left+';';
                    }
                    if (dpad.right) {
                        style += 'right:'+dpad.right+';';
                    }
                    if (dpad.top) {
                        style += 'top:'+dpad.top+';';
                    }
                    elem.style = style;
                    parent.appendChild(elem);
                    createDPad({container: elem, event: function(up, down, left, right) {
                        if (dpad.joystickInput) {
                            if (up === 1) up=0x7fff;
                            if (down === 1) up=0x7fff;
                            if (left === 1) up=0x7fff;
                            if (right === 1) up=0x7fff;
                        }
                        _0x378b5c.syncInput(0, dpad.inputValues[0], up);
                        _0x378b5c.syncInput(0, dpad.inputValues[1], down);
                        _0x378b5c.syncInput(0, dpad.inputValues[2], left);
                        _0x378b5c.syncInput(0, dpad.inputValues[3], right);
                    }});
                })
                
                
                if (this.zoneObj) {
                    this.zoneObj.forEach((zone) => {
                        zone.destroy();
                    })
                }
                this.zoneObj = [];
                let zone;
                info.forEach((zone, index) => {
                    if (zone.type !== 'zone') return;
                    let opts = {};
                    if (leftHandedMode && ['left', 'right'].includes(zone.location)) {
                        zone.location = (zone.location==='left') ? 'right' : 'left';
                        const amnt = JSON.parse(JSON.stringify(zone));
                        if (amnt.left) {
                            zone.right = amnt.left;
                        }
                        if (amnt.right) {
                            zone.left = amnt.right;
                        }
                    }
                    opts[zone.location.toLowerCase()] = true;
                    const parent = _0x530042.call(this, '.'.concat(getClass({
                        'ejs-virtual-gamepad': true,
                    }), ' .').concat(getClass(opts)));
                    opts['zone_'+index] = true;
                    const elem = _0x428003('div', {
                        'class': '.'.concat(getClass({
                            'ejs-virtual-gamepad': true,
                        }), ' .').concat(getClass(opts))
                    });
                    parent.appendChild(elem);
                    const zoneObj = _0x3a58c8.a.create({
                        'zone': elem,
                        'mode': 'static',
                        'position': {
                            'left': zone.left,
                            'top': zone.top
                        },
                        'color': 'red'
                    });
                    zoneObj.on('end', function(_0x27f006, _0x1fb527) {
                        _0x378b5c.syncInput(0, zone.inputValues[0], 0);
                        _0x378b5c.syncInput(0, zone.inputValues[1], 0);
                        _0x378b5c.syncInput(0, zone.inputValues[2], 0);
                        _0x378b5c.syncInput(0, zone.inputValues[3], 0);
                    });
                    zoneObj.on('move', function(_0x1b060e, _0x4ae7d6) {
                        const degree = _0x4ae7d6.angle.degree;
                        const distance = _0x4ae7d6.distance;
                        if (zone.joystickInput === true) {
                            let _0x4773fe = 0, _0x4c3bc7 = 0;
                            if (degree > 0 && degree <= 45) {
                                _0x4773fe = distance / 50;
                                _0x4c3bc7 = -0.022222222222222223 * degree * distance / 50;
                            }
                            if (degree > 45 && degree <= 90) {
                                _0x4773fe = 0.022222222222222223 * (90 - degree) * distance / 50;
                                _0x4c3bc7 = -distance / 50;
                            }
                            if (degree > 90 && degree <= 135) {
                                _0x4773fe = 0.022222222222222223 * (90 - degree) * distance / 50;
                                _0x4c3bc7 = -distance / 50;
                            }
                            if (degree > 135 && degree <= 180) {
                                _0x4773fe = -distance / 50;
                                _0x4c3bc7 = -0.022222222222222223 * (180 - degree) * distance / 50;
                            }
                            if (degree > 135 && degree <= 225) {
                                _0x4773fe = -distance / 50;
                                _0x4c3bc7 = -0.022222222222222223 * (180 - degree) * distance / 50;
                            }
                            if (degree > 225 && degree <= 270) {
                                _0x4773fe = -0.022222222222222223 * (270 - degree) * distance / 50;
                                _0x4c3bc7 = distance / 50;
                            }
                            if (degree > 270 && degree <= 315) {
                                _0x4773fe = -0.022222222222222223 * (270 - degree) * distance / 50;
                                _0x4c3bc7 = distance / 50;
                            }
                            if (degree > 315 && degree <= 359.9) {
                                _0x4773fe = distance / 50;
                                _0x4c3bc7 = 0.022222222222222223 * (360 - degree) * distance / 50;
                            }
                            if (_0x4773fe > 0) {
                                _0x378b5c.syncInput(0, zone.inputValues[0], 0x7fff * _0x4773fe);
                                _0x378b5c.syncInput(0, zone.inputValues[1], 0);
                            } else {
                                _0x378b5c.syncInput(0, zone.inputValues[1], 0x7fff * -_0x4773fe);
                                _0x378b5c.syncInput(0, zone.inputValues[0], 0);
                            }
                            if (_0x4c3bc7 > 0) {
                                _0x378b5c.syncInput(0, zone.inputValues[2], 0x7fff * _0x4c3bc7);
                                _0x378b5c.syncInput(0, zone.inputValues[3], 0);
                            } else {
                                _0x378b5c.syncInput(0, zone.inputValues[3], 0x7fff * -_0x4c3bc7);
                                _0x378b5c.syncInput(0, zone.inputValues[2], 0);
                            }
                            
                        } else {
                            if (degree >= 30 && degree < 150) {
                                _0x378b5c.syncInput(0, zone.inputValues[0], 1);
                            } else {
                                window.setTimeout(function() {
                                    _0x378b5c.syncInput(0, zone.inputValues[0], 0);
                                }, 30);
                            }
                            if (degree >= 210 && degree < 330) {
                                _0x378b5c.syncInput(0, zone.inputValues[1], 1);
                            } else {
                                window.setTimeout(function() {
                                    _0x378b5c.syncInput(0, zone.inputValues[1], 0);
                                }, 30);
                            }
                            if (degree >= 120 && degree < 240) {
                                _0x378b5c.syncInput(0, zone.inputValues[2], 1);
                            } else {
                                window.setTimeout(function() {
                                    _0x378b5c.syncInput(0, zone.inputValues[2], 0);
                                }, 30);
                            }
                            if (degree >= 300 || degree >= 0 && degree < 60) {
                                _0x378b5c.syncInput(0, zone.inputValues[3], 1);
                            } else {
                                window.setTimeout(function() {
                                    _0x378b5c.syncInput(0, zone.inputValues[3], 0);
                                }, 30);
                            }
                        }
                    });
                    this.zoneObj.push(zoneObj);
                })
                
                let keys = [];
                for (let i=0; i<info.length; i++) {
                    if (info[i].type !== 'button') continue;
                    let opts = {};
                    opts['b_'+info[i].id.toLowerCase()] = true;
                    let value;
                    if (_this.newCores === 2 && info[i].input_new_cores) {
                        value = info[i].input_new_cores;
                    } else {
                        value = info[i].input_value;
                    }
                    keys.push({id: opts, number: value});
                }
                keys.forEach((a) => {
                    let element = _0x530042.call(_this, '.'.concat(_0x2c1832, ' .').concat(getClass(a.id)));
                    if (!element) return;
                    _0x1093f4.call(_this, element, 'touchstart touchend touchcancel', function(e) {
                        if (e.type === 'touchend' || e.type === 'touchcancel') {
                            _0x3a8e2f(e.target, _0x2ec721, false);
                            window.setTimeout(function() {
                                _0x378b5c.syncInput(0, a.number, 0);
                            }, 30)
                        } else {
                            _0x3a8e2f(e.target, _0x2ec721, true);
                            _0x378b5c.syncInput(0, a.number, 1)
                        }
                        e.preventDefault();
                    })
                });
                
                if (!forceUpdateHTML) {
                    const menuButton = _0x428003('div', {
                        'class': getClass({
                            'ejs__widget': true,
                            'ejs__widget_controls_toggle': true
                        })
                    }, '');
                    menuButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"/></svg>';
                    _0x530042.call(this, ".".concat(getClass({ejs__widgets: true}))).appendChild(menuButton);
                    let hideTimeout;
                    _0x1093f4.call(this, menuButton, 'mousedown touchstart', function(e) {
                        _0x3a8e2f(e.target, _0x2ec721, true);
                        clearTimeout(hideTimeout);
                        _0x5ab74d.toggleControls.call(_this, true);
                        hideTimeout = setTimeout(function() {
                            _0x5ab74d.toggleControls.call(_this, false);
                        }, 5000)
                    });
                }
            },
            'setup': function() {
                let _this = this;
                if (!this.game) {
                    console.warn('No game element found!');
                    return;
                }
                _0x378b5c.playerName = _this.config.playerName;
                _0x3a8e2f(this.elements.container, this.config.classNames.type, true);
                this.elements.container.setAttribute('tabindex', '0');
                if (this.color) {
                    let _0x17edbf = function(_0x175d8e) {
                        let _0x17edbf = _0x175d8e.toLowerCase();
                        if (_0x17edbf && /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/ .test(_0x17edbf)) {
                            if (0x4 === _0x17edbf.length) {
                                for (let _0x2c1832 = '#', _0x4c881f = 1; _0x4c881f < 0x4; _0x4c881f += 1) _0x2c1832 += _0x17edbf.slice(_0x4c881f, _0x4c881f + 1).concat(_0x17edbf.slice(_0x4c881f, _0x4c881f + 1));
                                _0x17edbf = _0x2c1832;
                            }
                            let _0x5ac4ff = [];
                            for (let _0x324169 = 1; _0x324169 < 0x7; _0x324169 += 2) _0x5ac4ff.push(parseInt('0x' .concat(_0x17edbf.slice(_0x324169, _0x324169 + 2)), 0x10));
                            return _0x5ac4ff;
                        }
                        return null;
                    }(this.color);
                    _0x17edbf && this.elements.container.setAttribute('style', '--ejs-primary-color: ' .concat(_0x17edbf[0], ', ').concat(_0x17edbf[1], ', ').concat(_0x17edbf[2]));
                }
                this.elements.wrapper = _0x428003('div', {
                    'class': this.config.classNames.video
                });
                _0x580edd(this.game, this.elements.wrapper);
                if ('video' !== _this.game.tagName.toLocaleLowerCase()) {
                    let _0x2c1832 = this.config.volume;
                    Object.defineProperty(_this.game, 'volume', {
                        'get': function() {
                            return _0x2c1832;
                        },
                        'set': function(_0x4cca18) {
                            _0x2c1832 = _0x4cca18, _0xbae705.call(_this, _this.game, 'volumechange');
                        }
                    });
                    let _0x541fe1 = _this.storage.get('muted');
                    Object.defineProperty(_this.game, 'muted', {
                        'get': function() {
                            return _0x541fe1;
                        },
                        'set': function(_0x54b6e0) {
                            let _0x2c1832 = !!_0x1e2c68.boolean(_0x54b6e0) && _0x54b6e0;
                            _0x541fe1 = _0x2c1832, _0xbae705.call(_this, _this.game, 'volumechange');
                        }
                    });
                }
                window.addEventListener('beforeunload', function(_0x34b11a) {
                    if (_this.started && _this.getStartName()) {
                        _0x27f4c4.FS.syncfs(function() {});
                        _0x378b5c.saveSavFiles();
                        _0x27f4c4.FS.syncfs(function() {});
                    }
                }, true);
                //Wille save savefiles to indexeddb
                window.saveSaveFiles = function() {
                    if (!_this.getStartName()) return;
                    console.log('saving save files');
                    _0x378b5c.saveSavFiles();
                    _0x27f4c4.FS.syncfs(false, function() {});
                }
                setInterval(function() {
                    if (_this.started) {
                        saveSaveFiles();
                    }
                }, 60000) //60000 = 1 minute
            },
            'listeners': function() {
                let _this = this;
                const elem = _0x530042.call(_this, '.' .concat(getClass({
                    'ejs__dialogs': true
                })));
                let counter = 0;
                _0x1093f4.call(_this, elem, 'dragenter', function(e) {
                    e.preventDefault();
                    counter++;
                    _0x132da7(_this.elements.dialogs.message, false);
                });
                _0x1093f4.call(_this, elem, 'dragover', function(e) {
                    e.preventDefault();
                });
                _0x1093f4.call(_this, elem, 'dragleave', function(e) {
                    e.preventDefault();
                    counter--;
                    if (counter === 0) {
                        _0x132da7(_this.elements.dialogs.message, true);
                    }
                });
                _0x1093f4.call(_this, elem, 'dragend', function(e) {
                    e.preventDefault();
                    counter = 0;
                    _0x132da7(_this.elements.dialogs.message, true);
                });
                _0x1093f4.call(_this, elem, 'drop', function(e) {
                    e.preventDefault();
                    _0x132da7(_this.elements.dialogs.message, true);
                    counter = 0;
                    const items = e.dataTransfer.items;
                    let file;
                    for (let i=0; i<items.length; i++) {
                        if (items[i].kind !== 'file') continue;
                        file = items[i];
                        break;
                    }
                    if (!file) return;
                    const fileHandle = file.getAsFile();
                    fileHandle.arrayBuffer().then(data => {
                        _0x378b5c.loadState(new Uint8Array(data), 0);
                    })
                });
                _this.elements.buttons.restart && _0x1093f4.call(_this, _this.elements.buttons.restart, 'click', function(_0x5cfc51) {
                    _0x378b5c.restartGame();
                    _0x378b5c.inputsData = {};
                    if (_0x378b5c.connected && _0x378b5c.connection.isInitiator) {
                        (async () => {
                            const state = await _0x378b5c.saveState();
                            const file = new File([state], '0-game.state', {
                                'type': '',
                                'lastModified': new Date()
                            });
                            _0x378b5c.connection.shareFile(file);
                            _0x378b5c.inputsData = {};
                            _0x378b5c.wait = true;
                            _0x378b5c.systemPause(1);
                            _0x27f4c4.Module.pauseMainLoop();
                            _0x378b5c.disableControl(true);
                        })();
                    }
                    saveSaveFiles();
                });
                _this.elements.buttons.screenRecord && _0x1093f4.call(_this, _this.elements.buttons.screenRecord, 'click', function(_0x5cfc51) {
                    if (! _this.recordData) {
                        _this.recordData = {started:false, data:[], stopped: false};
                    }
                    if (! _this.recordData.started) { //start recording
                        let options;
                        if (MediaRecorder.isTypeSupported('video/webm; codecs=h264')) {
                            options = {mimeType: 'video/webm; codecs=h264'};
                        } else if (MediaRecorder.isTypeSupported('video/webm; codecs=H264')) {
                            options = {mimeType: 'video/webm; codecs=H264'};
                        } else if (MediaRecorder.isTypeSupported('video/webm; codecs=vp9')) {
                            options = {mimeType: 'video/webm; codecs=vp9'};
                        } else if (MediaRecorder.isTypeSupported('video/webm; codecs=vp8')) {
                            options = {mimeType: 'video/webm; codecs=vp8'};
                        } else if (MediaRecorder.isTypeSupported('video/webm; codecs=avc1')) {
                            options = {mimeType: 'video/webm; codecs=avc1'};
                        } else if (MediaRecorder.isTypeSupported('video/webm; codecs=vp9.0')) {
                            options = {mimeType: 'video/webm; codecs=vp9.0'};
                        } else if (MediaRecorder.isTypeSupported('video/webm; codecs=vp8.0')) {
                            options = {mimeType: 'video/webm; codecs=vp8.0'};
                        } else {
                            options = {};
                        }
                        function gotStreams(stream) {
                            _this.elements.buttons.screenRecord.querySelector('.'.concat(getClass({
                                'ejs__tooltip': true
                            }))).innerHTML = _this.localization('Stop Screen Recording');
                            _this.recordData.stream = stream;
                            _this.recordData.recorder = new MediaRecorder(_this.recordData.stream, options);
                            _this.recordData.recorder.ondataavailable = function(e) {
                                if (e.data.size > 0) {
                                    _this.recordData.data.push(e.data)
                                }
                                if (_this.recordData.stopped) {
                                    let a = document.createElement("a")
                                    a.href = window.URL.createObjectURL(new Blob(_this.recordData.data, {type: "video/webm"}))
                                    let aname;
                                    if (typeof _this.gameName == 'string') {
                                        aname = _this.gameName
                                    }
                                    a.download = aname ? '' .concat(aname, '-recording.webm') : 'record.webm';
                                    a.click()
                                    window.URL.revokeObjectURL(a.href)
                                    delete _this.recordData
                                    _this.elements.buttons.screenRecord.querySelector('.'.concat(getClass({
                                        'ejs__tooltip': true
                                    }))).innerHTML = _this.localization('Start Screen Recording');
                                }
                            }
                            _this.recordData.recorder.start()
                            _this.recordData.started = true
                        }
                        if (window.navigator && navigator.mediaDevices && typeof navigator.mediaDevices.getDisplayMedia === 'function') {
                            _0x27f4c4.Module.pauseMainLoop();
                            _this.playing = false;
                            alert('Please check "share system audio" to have audio in the recording. We only need the audio stream so your entire screen will not be recorded');
                            let time = setTimeout(function() {
                                _this.playing = true;
                                _0x27f4c4.Module.resumeMainLoop();
                            }, 20000);
                            navigator.mediaDevices.getDisplayMedia({
                                audio: true,  //we only need the audio, we dont use the video stream at all
                                video: {mediaSource: "screen"}
                            }).then(function(stream) {
                                let canvasStream = _0x27f4c4.Module.canvas.captureStream(30);
                                try {
                                    clearTimeout(time);
                                }catch(e){}
                                let audio = stream.getAudioTracks();
                                for (let i=0; i<audio.length; i++) {
                                    canvasStream.addTrack(audio[i]);
                                }
                                gotStreams(canvasStream);
                                _this.playing = true;
                                _0x27f4c4.Module.resumeMainLoop();
                            })
                        } else {
                            let canvasStream = _0x27f4c4.Module.canvas.captureStream(30);
                            gotStreams(canvasStream);
                        }
                    } else if (_this.recordData.started) { //stop recording
                        _this.recordData.recorder.stop()
                        _this.recordData.stopped = true
                    }
                    
                });
                _this.elements.buttons.cacheManager && _0x1093f4.call(_this, _this.elements.buttons.cacheManager, 'click', function(_0x5cfc51) {
                    if (_0x27f4c4.romdb) {
                        _0x132da7(_this.elements.dialogs.cache, false);
                        let _0x3360eb = _this.elements.dialogs.cache.querySelector('.' .concat(_0x378b5c.classNames['dialog-content']));
                        _0x3360eb.innerHTML = '<div>'+_this.localization('Loading')+'</div>';
                        _0x27f4c4.romdb.getAll(function(_0x43586d) {
                            if (_0x43586d) {
                                let _0x275730 = _0x428003('table', {
                                    'style': 'width:100%;padding-left:10px;text-align:left'
                                }),
                                    _0x1ab9e9 = _0x428003('tbody');
                                _0x43586d.length > 0 ? (_0x3360eb.innerHTML = '', _0x43586d.forEach(function(_0x32b0b7, _0x2d0e11) {
                                    if (_0x32b0b7.key && !/-part-\d+$/ .test(_0x32b0b7.key)) {
                                        let _0x277c67 = [_0x32b0b7.key];
                                        for (let _0x3360eb = Math.ceil(_0x32b0b7.filesize / 0x6400000), _0x3edb35 = 1; _0x3edb35 < _0x3360eb; _0x3edb35 += 1) _0x277c67.push('' .concat(_0x32b0b7.key, '-part-').concat(_0x3edb35));
                                        let _0x3e31f6 = _0x428003('tr'),
                                            _0x5b75bd = _0x428003('td'),
                                            _0x227405 = _0x428003('td'),
                                            _0xac150b = _0x428003('td');
                                        _0x5b75bd.innerHTML = _0x32b0b7.filename, _0x227405.innerHTML = function(_0x1858c1) {
                                            let _0x2d0e11 = -1;
                                            do {
                                                _0x1858c1 /= 0x400, _0x2d0e11++;
                                            } while (_0x1858c1 > 0x400);
                                            return Math.max(_0x1858c1, 0.1).toFixed(1) + [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'][_0x2d0e11];
                                        }(_0x32b0b7.filesize), _0xac150b.innerHTML = '<a href="#" onclick="return false">Remove</a>', _0x3e31f6.appendChild(_0x5b75bd), _0x3e31f6.appendChild(_0x227405), _0x3e31f6.appendChild(_0xac150b), _0x1ab9e9.appendChild(_0x3e31f6), _0xac150b.querySelector('a').onclick = function(_0x16f22a) {
                                            _0x27f4c4.romdb.removeBatch(_0x277c67);
                                            try {
                                                _0x1ab9e9.removeChild(_0x3e31f6);
                                            } catch (_0x353628) {}
                                            return _0x16f22a.stopPropagation(), false;
                                        };
                                    }
                                }), _0x275730.appendChild(_0x1ab9e9), _0x3360eb.appendChild(_0x275730)) : _0x3360eb.innerHTML = '<div style="text-align:center">'+_this.localization('Empty')+'</div>';
                            } else _0x3360eb.innerHTML = '<div style="text-align:center">'+_this.localization('Empty')+'</div>';
                        }, function() {});
                    }
                    return false;
                })
                _this.elements.buttons.play && Array.from(_this.elements.buttons.play).forEach(function(_0x24495b) {
                    _0x1093f4.call(_this, _0x24495b, 'click', function(_0x966382) {
                        if (_this.playing) {
                            _this.playing = false;
                            _0x27f4c4.Module.pauseMainLoop();
                            if (_0x378b5c.connected && _0x378b5c.connection.isInitiator) {
                                _0x378b5c.connection.send(JSON.stringify({
                                    'act': 'pause'
                                }))
                            }
                            _0xbae705.call(_this, _this.elements.container, 'pause', false, {
                                'pause': true
                            })
                        } else {
                            _this.playing = true;
                            _0x27f4c4.Module.resumeMainLoop();
                            if (_0x378b5c.connected && _0x378b5c.connection.isInitiator) {
                                _0x378b5c.connection.send(JSON.stringify({
                                    'act': 'resume'
                                }))
                            }
                            _0xbae705.call(_this, _this.elements.container, 'pause', false, {
                                'pause': false
                            });
                        }  
                    });
                }), _this.elements.buttons.netplay && _0x1093f4.call(_this, _this.elements.buttons.netplay, 'click', function(_0x2317b9) {
                    if (window.EJS_TURN_URLS !== null && !window.EJS_TURN_URLS) {
                        (async function(server) {
                            try {
                                let resp = await fetch(server + 'webrtc');
                                window.EJS_TURN_URLS = JSON.parse(await resp.text());
                            } catch(e) {
                                window.EJS_TURN_URLS = null;
                                console.warn("Could not contact netplay server", e);
                            }
                        })(_this.listUrl);
                    }
                    _0x378b5c.disableControl(true);
                    _0x132da7(_this.elements.dialogs.netplay, false);
                    if (_0x378b5c.players.length > 0) {
                        _0x378b5c.openRoom(_0xa88a13);
                    } else {
                        _0x378b5c.stopLoadRooms();
                        _0x378b5c.loadRoomsList();
                    }
                    if (!_0x378b5c.playerName) {
                        _0x4d8495.show('modal-9de6c4e9ce2b9361', {
                            'closeByEsckey': false
                        });
                    }
                }), _this.elements.buttons.cheat && _0x1093f4.call(_this, _this.elements.buttons.cheat, 'click', function(_0x44b01a) {
                    _0x132da7(_this.elements.dialogs.cheat, false);
                });
                _this.game.stateloadField = _0x428003('input');
                _this.game.stateloadField.type = 'file';
                _this.game.stateloadField.onchange = function _0x17edbf(_0xcd4599) {
                    let _0xfd246e, _0x3fdd71 = _0xcd4599.target.files;
                    _0x3fdd71.length > 0 && ((_0xfd246e = new FileReader()).file_name = _0x3fdd71[0].name, _0xfd246e.onload = function() {
                        EJS_loadState(new Uint8Array(_0xfd246e.result));
                    }, _0xfd246e.readAsArrayBuffer(_0x3fdd71[0])), _this.game.stateloadField = _0x428003('input'), _this.game.stateloadField.type = 'file', _this.game.stateloadField.onchange = _0x17edbf;
                };
                _0x1093f4.call(_this, _this.elements.container, 'loadstate', function(_0x13504c) {
                    if (_0x378b5c.saveLoadDB.call(_this, 'load')) {
                        return;
                    }
                    _0x1e2c68.function(_this.config.onloadstate) ? _this.config.onloadstate.call(null, _this.loadState) : _this.game.stateloadField.click(), _this.elements.container.focus();
                });
                document.addEventListener('visibilitychange', function() {
                    'hidden' === document.visibilityState ? console.log('hidden') : console.log('active');
                });
            },
            'bindFunction': function() {
                let _this = this,
                    _0x17edbf = getSystem(_this.system, true);
                if (_0x27f4c4.Module && _0x27f4c4.Module._set_volume) {
                    let _0x2c1832 = _0x27f4c4.Module.cwrap('set_volume', 'null', ['number']);
                    _0x378b5c.setVolume = function() {
                        let _0x17edbf = 0;
                        _this.volume < 1 && (_0x17edbf = 0 === _this.volume ? -0x50 : 0x1e * _this.volume - 0x1e, _0x2c1832(_0x17edbf)), _this.muted && (_0x17edbf = -0x50), _0x2c1832(_0x17edbf);
                    };
                }
                if (_0x27f4c4.Module._save_file_path) {
                    _0x378b5c.getSaveFilePath = _0x27f4c4.Module.cwrap('save_file_path', 'string', []);
                } else {
                    _0x378b5c.getSaveFilePath = () => null;
                }
                // Returns a Uint8Array of the save file
                _0x378b5c.readSaveFile = function() {
                    return FS.readFile(_0x378b5c.getSaveFilePath());
                }
                _0x378b5c.setVariable = _0x27f4c4.Module.cwrap('set_variable', 'null', ['string', 'string']);
                _0x378b5c.simulateInputFn = _0x27f4c4.Module.cwrap('simulate_input', 'null', ['number', 'number', 'number']);
                let _0x2c63cc = {
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
                _0x378b5c.simulateInput = function(player, index, value) {
                    if (_0x378b5c.connected) {
                        if (_this.playing && !_0x378b5c.disableInput) {
                            var _0x35b9c1 = _0x378b5c.connection.userid,
                                _0x4d96ad = _0x378b5c.roomMaster === _0x35b9c1,
                                _0xf1bb97 = _0x378b5c.players.indexOf(_0x35b9c1),
                                _0x52e1f4 = _0x378b5c.currentFrameNum();
                            player >> 0x0 == 0x0 && (_0x2c63cc[index] !== value && (_0x4d96ad ? (_0x378b5c.inputsData[_0x52e1f4] || (_0x378b5c.inputsData[_0x52e1f4] = []), _0x378b5c.inputsData[_0x52e1f4].push({
                                'index': _0xf1bb97,
                                'key': index,
                                'status': value,
                                'frame': _0x52e1f4
                            }),_0x378b5c.simulateInputFn(_0xf1bb97, index, value)) : _0x378b5c.connection.send(JSON.stringify({
                                'act': 'sync-control',
                                'value': ['' .concat(_0xf1bb97, '|').concat(index, '|').concat(value, '|').concat(_0x52e1f4)]
                            }), _0x378b5c.roomMaster)), _0x2c63cc[index] = value);
                        }
                    } else _0x378b5c.disableInput || _0x378b5c.simulateInputFn(player, index, value);
                };
                _0x378b5c.syncInput = _0x378b5c.simulateInput;
                window.simulateInput = _0x378b5c.simulateInput;
                _0x378b5c.toggleShader = _0x27f4c4.Module.cwrap('shader_enable', 'null', ['number']);
                if (_this.coreVer !== 2) {
                    _0x378b5c.getStateInfo = _0x27f4c4.Module.cwrap('get_state_info', 'string', []);
                } else {
                    _0x378b5c.getInfoOfState = _0x27f4c4.Module.cwrap('get_state_info', 'string', []);
                    _0x378b5c.getStateInfo1 = _0x27f4c4.Module.cwrap('save_state_info', 'null', []);
                    _0x378b5c.getStateInfo = function() {
                        _0x378b5c.getStateInfo1();
                        return new Promise(function(resolve, reject) {
                            let a = _0x378b5c.getInfoOfState();
                            if (a) {
                                resolve(a);
                                return;
                            }
                            let b = setInterval(function() {
                                a = _0x378b5c.getInfoOfState();
                                if (a) {
                                    clearInterval(b);
                                    resolve(a);
                                }
                            }, 50)
                        });
                    }
                }
                _0x378b5c.saveState = async function() {
                    let _0xa88a14;
                    let _0x17edbf;
                    if (_this.coreVer !== 2) {
                        _0x17edbf = _0x378b5c.getStateInfo().split('|');
                    } else {
                        _0x17edbf = (await _0x378b5c.getStateInfo()).split('|');
                    }
                    let _0x2c1832 = _0x17edbf[0] >> 0;
                    if (_0x2c1832 > 0) {
                        _0xa88a14 = new Uint8Array(_0x2c1832);
                        for (let _0x2ef6be = _0x17edbf[1] >> 0, _0x3cc34b = 0; _0x3cc34b < _0x2c1832; _0x3cc34b++) _0xa88a14[_0x3cc34b] = _0x27f4c4.Module.getValue(_0x2ef6be + _0x3cc34b);
                    }
                    return _0xa88a14;
                };
                let _0x25a7a2 = _0x27f4c4.Module.cwrap('load_state', 'number', ['string', 'number']);
                _0x378b5c.loadState = function(_0x4389ae, _0x1d4918) {
                    let _0x91cd69;
                    _0x91cd69 = _0x4389ae;
                    try {
                        _0x27f4c4.FS.unlink('game.state');
                    } catch(e){}
                    _0x27f4c4.FS.createDataFile('/', 'game.state', _0x91cd69, true, true);
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
                        (async () => {
                            const state = await _0x378b5c.saveState();
                            const file = new File([state], '0-game.state', {
                                'type': '',
                                'lastModified': new Date()
                            });
                            _0x378b5c.connection.shareFile(file);
                            _0x378b5c.inputsData = {};
                            _0x378b5c.wait = true;
                            _0x378b5c.systemPause(1);
                            _0x27f4c4.Module.pauseMainLoop();
                            _0x378b5c.disableControl(true);
                        })();
                    }
                    _this.elements.container.focus();
                };
                _0x27f4c4.Module._set_cheat && (_0x378b5c.setCheat = _0x27f4c4.Module.cwrap('set_cheat', 'number', ['number', 'number', 'string']));
                _0x27f4c4.Module._reset_cheat && (_0x378b5c.resetCheat = _0x27f4c4.Module._reset_cheat);
                _0x378b5c.quickSaveState = async function() {
                    if (_this.started && !_0x378b5c.connected) {
                        if (_this.statesSupported === false) {
                            _0x378b5c.doMessageTransition('CANNOT CURRENTLY LOAD STATE');
                            return;
                        }
                        let slot;
                        if (_0x2593da && typeof _0x2593da.getCoreOptionsValue == 'function') {
                            slot = _0x2593da.getCoreOptionsValue('save-state-slot');
                            if (! slot) {
                                slot = 1;
                            }
                        } else {
                            slot = 1;
                        }
                        let name = slot + '-quick.state';
                        try {
                            _0x27f4c4.FS.unlink(name);
                        } catch (_0x4b4d4c) {}
                        try {
                            let _0x17edbf = await _0x378b5c.saveState();
                            _0x27f4c4.FS.createDataFile('/', name, _0x17edbf, true, true);
                            _0x378b5c.doMessageTransition('STATE SAVED TO SLOT ' + slot);
                        } catch(e) {
                            console.warn(e);
                            _0x378b5c.doMessageTransition('FAILED TO SAVE STATE TO SLOT ' + slot);
                        }
                        saveSaveFiles();
                    }
                };
                _0x378b5c.saveMsgTransitions = null;
                _0x378b5c.doMessageTransition = function(message) {
                    _this.elements.widgets.stateInfoDiv.innerText = message;
                    clearTimeout(_0x378b5c.saveMsgTransitions);
                    _0x378b5c.saveMsgTransitions = setTimeout(function() {
                        _this.elements.widgets.stateInfoDiv.innerText = '';
                    }, 1500)
                }
                _0x378b5c.quickLoadState = function() {
                    if (_this.started && !_0x378b5c.connected) {
                        if (_this.statesSupported === false) {
                            _0x378b5c.doMessageTransition('CANNOT CURRENTLY LOAD STATE');
                            return;
                        }
                        let slot;
                        if (_0x2593da && typeof _0x2593da.getCoreOptionsValue == 'function') {
                            slot = _0x2593da.getCoreOptionsValue('save-state-slot');
                            if (! slot) {
                                slot = 1;
                            }
                        } else {
                            slot = 1;
                        }
                        let name = slot + '-quick.state';
                        let success = true;
                        try {
                            _0x25a7a2(name, 0);
                            if ('arcade' === _0x17edbf) {
                                setTimeout(function() {
                                    _0x378b5c.getStateInfo();
                                    _0x25a7a2(name, 0);
                                }, 0xa);
                            }
                        } catch (_0x4ee386) {
                            success = false;
                        }
                        if (! success) {
                            _0x378b5c.doMessageTransition('FAILED TO LOAD STATE FROM SLOT ' + slot);
                        } else {
                            _0x378b5c.doMessageTransition('LOADED STATE FROM SLOT ' + slot);
                        }
                        saveSaveFiles();
                    }
                };
                _0x378b5c.changeStateSlot = function(e) {
                    let slot;
                    if (_0x2593da && typeof _0x2593da.getCoreOptionsValue == 'function') {
                        slot = _0x2593da.getCoreOptionsValue('save-state-slot');
                    }
                    if (!slot) {
                        slot = 1;
                    }
                    let newSlot;
                    if (typeof e != 'number') {
                        newSlot = slot + 1;
                    } else {
                        newSlot = e;
                    }
                    if (newSlot > 9) {
                        newSlot = 1;
                    }
                    _0x7f9f36.updateCoreOptions.call(_this, 'save-state-slot', newSlot);
                    _0x378b5c.doMessageTransition('SET SAVE STATE SLOT TO ' + newSlot);
                };
                window.EJS_loadState = function(data) {
                    _0x378b5c.loadState(data, 0);
                    setTimeout(() => {
                        if (_0x378b5c.connected) {
                            var file = new File([data], '0-game.state', {
                                'type': '',
                                'lastModified': new Date()
                            });
                            _0x378b5c.connection.shareFile(file);
                            _0x378b5c.inputsData = {};
                            _0x378b5c.wait = true;
                            _0x378b5c.systemPause(1);
                            _0x27f4c4.Module.pauseMainLoop();
                            _0x378b5c.disableControl(true);
                        }
                    }, 0x1e);
                };
                window.EJS_saveState = function() {
                    return _0x378b5c.saveState();
                }
                let _0x840cf4 = _0x27f4c4.Module.cwrap('cmd_take_screenshot', '', []);
                _0x378b5c.getScreenData = function() {
                    _0x840cf4();
                    return _0x27f4c4.FS.readFile('screenshot.png');
                };
                _0x378b5c.restartGame = _0x27f4c4.Module.cwrap('system_restart', '', []);
                _0x378b5c.currentFrameNum = _0x27f4c4.Module.cwrap('get_current_frame_count', '', []);
                _0x378b5c.saveSavFiles = _0x27f4c4.Module.cwrap('cmd_savefiles', '', []);
                _0x27f4c4.Module._get_core_options && (_0x378b5c.getGameCoreOptions = _0x27f4c4.Module.cwrap('get_core_options', 'string', []));
                _0x378b5c.systemPause = function(e) {
                    return false;
                };
                _0x378b5c.controllers = _0x2593da.storage.get('controllers');
                _0x378b5c.controllers || (_0x378b5c.controllers = JSON.parse(JSON.stringify(_0x378b5c.defaultControllers)));
            }
        }
        let _0xdcec2a = _0x378b5c;

    function _0x5005e6(_0x7f3270, _0x477158) {
        return function(_0x20890f) {
            if (Array.isArray(_0x20890f)) return _0x20890f;
        }(_0x7f3270) || function(_0x557107, _0x409476) {
            let _0x2c1832 = [],
                _0x488a47 = true,
                _0x34f76e = false,
                _0x19606f = undefined;
            try {
                for (let _0x328f4d, _0x4d9086 = _0x557107[Symbol.iterator](); !(_0x488a47 = (_0x328f4d = _0x4d9086.next()).done) && (_0x2c1832.push(_0x328f4d.value), !_0x409476 || _0x2c1832.length !== _0x409476); _0x488a47 = true);
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
    const _0x7f9f36 = {
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
                        'crt-geom.glslp': 'CRT geom',
                        'crt-mattias.glslp': 'CRT mattias'
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
                let _0xa88a13 = {};
                if (this.coreVer === 2) {
                    return {};
                }
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
                if (_0x7f9f36.coreOptionsValues) {
                    return JSON.parse(JSON.stringify(_0x7f9f36.coreOptionsValues));
                }
                let _0xa88a13 = _0x7f9f36.storage.get('core-options');
                _0x1e2c68.empty(_0xa88a13) && (_0xa88a13 = {});
                return _0xa88a13;
            },
            'getCoreOptionsValue': function(key) {
                if (_0x7f9f36.coreOptionsValues) {
                    let rv = JSON.parse(JSON.stringify(_0x7f9f36.coreOptionsValues))[key];
                    if (rv) return rv;
                }
                let _0xa88a13 = _0x7f9f36.storage.get('core-options');
                _0x1e2c68.empty(_0xa88a13) && (_0xa88a13 = {});
                return _0xa88a13[key];
            },
            'getCoreOptions': function() {
                let _0xa88a13 = {};
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
                            'default': 'nes'
                        }), _0xa88a13.fceumm_turbo_enable = {
                            'label': this.localization('Turbo Enable'),
                            'options': {
                                'None': this.localization('None'),
                                'Player 1': this.localization('Player 1'),
                                'Player 2': this.localization('Player 2'),
                                'Both': this.localization('Both')
                            },
                            'default': 'None'
                        }, _0xa88a13.fceumm_region = {
                            'label': this.localization('Region'),
                            'options': {
                                'Auto': this.localization('Auto'),
                                'NTSC': 'NTSC',
                                'PAL': 'PAL',
                                'Dendy': 'Dendy'},
                            'default': 'Auto'
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
                                'default': 'disabled'
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
                                'default': 'none'
                            },
                            'glupen64-pak2': {
                                'label': this.localization('Player 2 Pak'),
                                'options': {
                                    'none': this.localization('none'),
                                    'memory': this.localization('memory'),
                                    'rumble': this.localization('rumble')
                                },
                                'default': 'none'
                            },
                            'glupen64-pak3': {
                                'label': this.localization('Player 3 Pak'),
                                'options': {
                                    'none': this.localization('none'),
                                    'memory': this.localization('memory'),
                                    'rumble': this.localization('rumble')
                                },
                                'default': 'none'
                            },
                            'glupen64-pak4': {
                                'label': this.localization('Player 4 Pak'),
                                'options': {
                                    'none': this.localization('none'),
                                    'memory': this.localization('memory'),
                                    'rumble': this.localization('rumble')
                                },
                                'default': 'none'
                            },
                        };
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
                                'default': '100%'
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
                                'default': 0
                            },
                            'pcsx_rearmed_memcard2': {
                                'label': this.localization('Enable second memory card'),
                                'options': {
                                    'disabled': this.localization('disabled'),
                                    'enabled': this.localization('enabled')
                                },
                                'default': 'enabled'
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
                                'default': 'default'
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
                                'default': 'default'
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
                                'default': 'default'
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
                                'default': 'default'
                            },
                            'pcsx_rearmed_vibration': {
                                'label': this.localization('Enable Vibration'),
                                'options': {
                                    'disabled': this.localization('disabled'),
                                    'enabled': this.localization('enabled')
                                },
                                'default': 'enabled'
                            },
                            'pcsx_rearmed_neon_interlace_enable': {
                                'label': this.localization('Enable interlacing mode(s)'),
                                'options': {
                                    'disabled': this.localization('disabled'),
                                    'enabled': this.localization('enabled')
                                },
                                'default': 'disabled'
                            },
                            'pcsx_rearmed_neon_enhancement_enable': {
                                'label': this.localization('Enhanced resolution (slow)'),
                                'options': {
                                    'disabled': this.localization('disabled'),
                                    'enabled': this.localization('enabled')
                                },
                                'default': 'disabled'
                            },
                            'pcsx_rearmed_neon_enhancement_no_main': {
                                'label': this.localization('Enhanced resolution speed hack'),
                                'options': {
                                    'disabled': this.localization('disabled'),
                                    'enabled': this.localization('enabled')
                                },
                                'default': 'disabled'
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
                                'default': '0'
                            },
                            'fba-cpu-speed-adjust': {
                                'label': this.localization('CPU overclock'),
                                'options': ['100', '110', '120', '130', '140', '150', '160', '170', '180', '190', '200'],
                                'default': '100'
                            },
                            'fba-diagnostic-input': {
                                'label': this.localization('Diagnostic Input'),
                                'options': ['None', 'Hold Start', 'Start + A + B', 'Hold Start + A + B', 'Start + L + R', 'Hold Start + L + R', 'Hold Select', 'Select + A + B', 'Hold Select + A + B', 'Select + L + R', 'Hold Select + L + R'],
                                'default': 'None'
                            },
                            'fba-neogeo-mode': {
                                'label': this.localization('Force Neo Geo mode'),
                                'options': ['MVS', 'AES', 'UNIBIOS', 'DIPSWITCH'],
                                'default': 'MVS'
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
                        _0xa88a13 = {};
                }
                const _this = this;
                if (this.coreVer === 2) {
                    _0xa88a13 = {};
                    _0xa88a13['fps'] = {
                        'label': this.localization('FPS'),
                        'options': {
                            'show': this.localization("show"),
                            'hide': this.localization("hide")
                        },
                        'default': "hide"
                    }
                }
                if (_0xdcec2a && (_0xdcec2a.virtualGamepadContainer != 'undefined' || _0xdcec2a.virtualGamepadContainer !== null)) {
                    _0xa88a13['left-handed-mode'] = {
                        'label': this.localization('Left Handed Mode'),
                        'options': {
                            'on': this.localization('On'),
                            'off': this.localization('Off')
                        },
                        'default': 'off'
                    }
                }
                if (this.statesSupported === true) {
                    _0xa88a13['save-state-slot'] = {
                        'label': this.localization('Save State Slot'),
                        'options': [1, 2, 3, 4, 5, 6, 7, 8, 9],
                        'default': 1
                    }
                }
                if (this.statesSupported === true && window.indexedDB && this.getStartName()) {
                    _0xa88a13['save-state-location'] = {
                        'label': this.localization('Save State Location'),
                        'options': {
                            'download': this.localization('download'),
                            'keep in browser': this.localization('keep in browser')
                        },
                        'default': 'download'
                    }
                }
                try {
                    _0xdcec2a.getGameCoreOptions && _0xdcec2a.getGameCoreOptions().split('\n').forEach(function(_0x2bef5a, _0x49b64b) {
                        let _0x5995db = _0x2bef5a.split('; '),
                            _0x16274c = _0x5995db[0];
                        if (0x0 === _0x16274c.indexOf('fba-dipswitch-') || _this.coreVer === 2) {
                            let _0x757776 = _0x5995db[1].split('|'),
                                _0x1f895e = _0x16274c.split("|")[0].replace(/_/g, ' ').replace(/.+\-(.+)/, '$1');
                            _0x757776.slice(1, -1);
                            if (_0x757776.length === 1) return;
                            let options = {};
                            for (let i=0; i<_0x757776.length; i++) {
                                options[_0x757776[i]] = _this.localization(_0x757776[i]);
                            }
                            _0xa88a13[_0x16274c.split("|")[0]] = {
                                'label': _this.localization(_0x1f895e),
                                'options': options,
                                'default': (_0x16274c.split("|").length > 1) ? _0x16274c.split("|")[1] : _0x757776[0].replace('(Default) ', '')
                            };
                        }
                    });
                } catch(e) {};
                return _0xa88a13;
            },
            'supportNetPlay': function() {
                if (this.coreVer === 2) return false;
                if (!this.listUrl || !this.socketUrl) return false;
                if (this.lightgun || this.mouse) return false;
                let _0xa88a13 = window.RTCPeerConnection || window.webkitPeerConnection00 || window.webkitRTCPeerConnection || window.mozRTCPeerConnection,
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
                        'cacheManager': _0x530042.call(this, this.config.selectors.buttons.cacheManager),
                        'screenRecord': _0x530042.call(this, this.config.selectors.buttons.screenRecord),
                        'loadState': _0x530042.call(this, this.config.selectors.buttons.loadState),
                        'gamepad': _0x530042.call(this, this.config.selectors.buttons.gamepad),
                        'netplay': _0x530042.call(this, this.config.selectors.buttons.netplay),
                        'cheat': _0x530042.call(this, this.config.selectors.buttons.cheat)
                    }, this.elements.inputs = {
                        'volume': _0x530042.call(this, this.config.selectors.inputs.volume)
                    }, true;
                } catch (_0x527381) {
                    return this.debug.warn('It looks like there is a problem with your custom controls HTML', _0x527381), false;
                }
            },
            'createIcon': function(_0x43d42f, _0x42a597) {
                let _0x2c1832 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                _0x154f99(_0x2c1832, _0x5dc0c0(_0x42a597, {
                    'role': 'presentation',
                    'focusable': 'false'
                }));
                let _0x50b7a7 = document.createElement('div');
                _0x50b7a7.innerHTML = '<svg>' .concat(this.icons[_0x43d42f], '</svg>');
                for (let _0x373099 = _0x50b7a7.childNodes[0].childNodes, _0x804f4d = 0; _0x804f4d < _0x373099.length; _0x804f4d += 1) _0x2c1832.appendChild(_0x373099[_0x804f4d]);
                return _0x2c1832;
            },
            'createLabel': function(_0x185043) {
                let _0x17edbf = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    _0x2c1832 = _0xb9b2ff.get(_0x185043, this.config),
                    _0x3d681f = {};
                _0x3d681f[_0x17edbf.class] = true, _0x3d681f[this.config.classNames.hidden] = true;
                let _0x58a1d4 = Object.assign({}, _0x17edbf, {
                    'class': [_0x17edbf.class, this.config.classNames.tooltip].filter(Boolean).join(' ')
                });
                return _0x428003('span', _0x58a1d4, _0x2c1832);
            },
            'createBadge': function(_0x415aef) {
                if (_0x1e2c68.empty(_0x415aef)) return null;
                let _0x17edbf = _0x428003('span', {
                    'class': this.config.classNames.menu.value
                });
                return _0x17edbf.appendChild(_0x428003('span', {
                    'class': this.config.classNames.menu.badge
                }, _0x415aef)), _0x17edbf;
            },
            'createButton': function(_0x427a85, _0x493eb2) {
                let _0x2c1832, _0x325832, _0xcb618b, _0x25c678, _0x58309d = _0x428003('button'),
                    _0x183584 = Object.assign({}, _0x493eb2),
                    _0x2345d2 = _0x9fdcea(_0x427a85),
                    _0x2ca20d = false;
                'type' in _0x183584 || (_0x183584.type = 'button');
                let _0x34225b = getClass({
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
                    'class': getClass({
                        'icon--pressed': true
                    })
                })), _0x58309d.appendChild(_0x7f9f36.createIcon.call(this, _0x325832, {
                    'class': getClass({
                        'icon--not-pressed': true
                    })
                })), _0x58309d.appendChild(_0x7f9f36.createLabel.call(this, _0xcb618b, {
                    'class': getClass({
                        'icon--pressed': true
                    })
                })), _0x58309d.appendChild(_0x7f9f36.createLabel.call(this, _0x2c1832, {
                    'class': getClass({
                        'icon--not-pressed': true
                    })
                }))) : (_0x58309d.appendChild(_0x7f9f36.createIcon.call(this, _0x325832)), _0x58309d.appendChild(_0x7f9f36.createLabel.call(this, _0x2c1832))), _0x5dc0c0(_0x183584, _0xa949a8(this.config.selectors.buttons[_0x2345d2], _0x183584)), _0x154f99(_0x58309d, _0x183584), 'play' === _0x2345d2 ? (_0x1e2c68.array(this.elements.buttons[_0x2345d2]) || (this.elements.buttons[_0x2345d2] = []), this.elements.buttons[_0x2345d2].push(_0x58309d)) : this.elements.buttons[_0x2345d2] = _0x58309d, _0x58309d;
            },
            'createRange': function(_0x491b4a, _0x5f154a) {
                let _0x2c1832 = _0x428003('input', _0x5dc0c0(_0xa949a8(this.config.selectors.inputs[_0x491b4a]), {
                    'type': 'range',
                    'min': 0,
                    'max': 0x64,
                    'step': 0.1,
                    'value': 0,
                    'autocomplete': 'off',
                    'role': 'slider',
                    'aria-label': _0xb9b2ff.get(_0x491b4a, this.config),
                    'aria-valuemin': 0,
                    'aria-valuemax': 0x64,
                    'aria-valuenow': 0x0
                }, _0x5f154a));
                return this.elements.inputs[_0x491b4a] = _0x2c1832, _0x7f9f36.updateRangeFill.call(this, _0x2c1832), _0x2c1832;
            },
            'bindMenuItemShortcuts': function(_0x1830d1, _0x2770c2) {
                let _0x2c1832 = this;
                _0x1093f4(_0x1830d1, 'keydown keyup', function(_0x4bb9d6) {
                    if ([0x20, 0x26, 0x27, 0x28].includes(_0x4bb9d6.which) && (_0x4bb9d6.preventDefault(), _0x4bb9d6.stopPropagation(), 'keydown' !== _0x4bb9d6.type)) {
                        let _0x20ac7b, _0x51717d = _0x13f491(_0x1830d1, '[role="menuitemradio"]');
                        if (!_0x51717d && [0x20, 0x27].includes(_0x4bb9d6.which)) _0x7f9f36.showMenuPanel.call(_0x2c1832, _0x2770c2, true);
                        else 0x20 !== _0x4bb9d6.which && (0x28 === _0x4bb9d6.which || _0x51717d && 0x27 === _0x4bb9d6.which ? (_0x20ac7b = _0x1830d1.nextElementSibling, _0x1e2c68.element(_0x20ac7b) || (_0x20ac7b = _0x1830d1.parentNode.firstElementChild)) : (_0x20ac7b = _0x1830d1.previousElementSibling, _0x1e2c68.element(_0x20ac7b) || (_0x20ac7b = _0x1830d1.parentNode.lastElementChild)), _0x31cc23.call(_0x2c1832, _0x20ac7b, true));
                    }
                }, false), _0x1093f4(_0x1830d1, 'keyup', function(_0x3844f5) {
                    0xd === _0x3844f5.which && _0x7f9f36.focusFirstMenuItem.call(_0x2c1832, null, true);
                });
            },
            'createMenuItem': function(_0x52a95b) {
                let _0x17edbf = this,
                    _0x2c1832 = _0x52a95b.value,
                    _0x231912 = _0x52a95b.list,
                    _0x57313b = _0x52a95b.type,
                    _0x19be70 = _0x52a95b.title,
                    _0x4ae558 = _0x52a95b.badge,
                    _0x34a012 = void 0 === _0x4ae558 ? null : _0x4ae558,
                    _0x7dbb2e = _0x52a95b.checked,
                    _0x200580 = void 0 !== _0x7dbb2e && _0x7dbb2e,
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
                let _0x449ec7 = _0x7f9f36.getCoreOptions.call(this);
                this.listeners.bind(_0xb8fbbd, 'click keyup', function(_0x270d0d) {
                    _0x1e2c68.keyboardEvent(_0x270d0d) && 0x20 !== _0x270d0d.which || (_0x270d0d.preventDefault(), _0x270d0d.stopPropagation(), _0xb8fbbd.checked = true, Object.keys(_0x7f9f36.normalOptions).includes(_0x57313b) && _0x7f9f36.updateNormalOptions.call(_0x17edbf, _0x57313b, _0x2c1832), Object.keys(_0x449ec7).includes(_0x57313b) && (_0x449ec7[_0x57313b].netplay && _0xdcec2a.connected ? _0xdcec2a.connection.isInitiator && (_0x7f9f36.updateCoreOptions.call(_0x17edbf, _0x57313b, _0x2c1832), _0xdcec2a.connection.send(JSON.stringify({
                        'act': 'update-core-option',
                        'key': _0x57313b,
                        'value': _0x2c1832,
                        'frame': _0xdcec2a.currentFrame
                    }))) : _0x7f9f36.updateCoreOptions.call(_0x17edbf, _0x57313b, _0x2c1832)), _0x7f9f36.showMenuPanel.call(_0x17edbf, 'home', _0x1e2c68.keyboardEvent(_0x270d0d)));
                }, _0x57313b, false), _0x7f9f36.bindMenuItemShortcuts.call(this, _0xb8fbbd, _0x57313b), _0x231912.appendChild(_0xb8fbbd);
            },
            'updateVolume': function() {
                _0x1e2c68.element(this.elements.inputs.volume) && _0x7f9f36.setRange.call(this, this.elements.inputs.volume, this.muted ? 0 : this.volume), _0x1e2c68.element(this.elements.buttons.mute) && (this.elements.buttons.mute.pressed = this.muted || 0 === this.volume);
            },
            'setRange': function(_0x1c075b) {
                let _0x17edbf = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                _0x1e2c68.element(_0x1c075b) && (_0x1c075b.value = _0x17edbf, _0x7f9f36.updateRangeFill.call(this, _0x1c075b));
            },
            'updateRangeFill': function(_0x2dbde1) {
                let _0x17edbf = _0x1e2c68.event(_0x2dbde1) ? _0x2dbde1.target : _0x2dbde1;
                if (_0x1e2c68.element(_0x17edbf) && 'range' === _0x17edbf.getAttribute('type')) {
                    if (_0x13f491(_0x17edbf, this.config.selectors.inputs.volume)) {
                        let _0x2c1832 = 0x64 * _0x17edbf.value;
                        _0x17edbf.setAttribute('aria-valuenow', _0x2c1832), _0x17edbf.setAttribute('aria-valuetext', '' .concat(_0x2c1832.toFixed(1), '%'));
                    } else _0x17edbf.setAttribute('aria-valuenow', _0x17edbf.value);
                    _0x59aa33.isWebkit && _0x17edbf.style.setProperty('--value', '' .concat(_0x17edbf.value / _0x17edbf.max * 0x64, '%'));
                }
            },
            'toggleMenuButton': function(_0x249814, _0x2948e9) {
                _0x132da7(this.elements.settings.buttons[_0x249814], !_0x2948e9);
            },
            'updateNormalOptions': function(option, value) {
                this.elements.settings.buttons[option].querySelector('.' .concat(this.config.classNames.menu.value)).innerHTML = _0x7f9f36.normalOptions[option].options[value];
                let _0x2c1832 = {};
                _0x2c1832[option] = value;
                _0x7f9f36.storage.set(_0x2c1832);
                'shader' === option && _0xdcec2a.setShader(value);
                'virtual-gamepad' === option && _0xdcec2a.toggleVirtualGamepad.call(this, 'enabled' === value);
            },
            'updateCoreOptions': function(_0x41c4ad, _0x15823e) {
                if ('nds' === getSystem(this.system, true) && !_0x2d904a.wasm) return true;
                _0x7f9f36.coreOptionsValues[_0x41c4ad] = _0x15823e;
                if ('psx' === getSystem(this.system, true) && _0x27f4c4.Module.pauseMainLoop(), _0xdcec2a.setVariable(_0x41c4ad, _0x15823e), 'psx' === getSystem(this.system, true) && (setTimeout(function() {
                        _0x27f4c4.Module.resumeMainLoop();
                    }, 0x64), setTimeout(function() {
                        _0x27f4c4.Module.resumeMainLoop();
                    }, 0xc8)), 'nds' === getSystem(this.system, true) && _0x2d904a.wasm) {
                    let _0x2c1832 = this.elements.wrapper.querySelector('canvas');
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
                if ('arcade' === getSystem(this.system, true) || 'fba0.2.97.29' === getSystem(this.system, true)) {
                    let _0x567ccc = this.elements.wrapper.querySelector('canvas');
                    _0x567ccc.height = 'fba-aspect' === _0x41c4ad && 'PAR' === _0x15823e ? _0x567ccc.width / 0x10 * 0x9 : _0x567ccc.width / 4 * 3;
                }
                let _0x31bdec = _0x7f9f36.getCoreOptions.call(this),
                    _0x3efd0b = _0x7f9f36.storage.get('core-options');
                if (_0x1e2c68.empty(_0x3efd0b) && (_0x3efd0b = {}), _0x3efd0b[_0x41c4ad] = _0x15823e, _0x7f9f36.storage.set({
                        'core-options': _0x3efd0b
                    }), this.elements.settings.buttons[_0x41c4ad]) {
                    let _0xe95e6a = this.elements.settings.buttons[_0x41c4ad].querySelector('.' .concat(this.config.classNames.menu.value));
                    _0x1e2c68.object(_0x31bdec[_0x41c4ad].options) ? _0xe95e6a.innerHTML = _0x31bdec[_0x41c4ad].options[_0x15823e] : _0xe95e6a.innerHTML = _0x15823e;
                }
                if (_0x41c4ad === 'left-handed-mode') {
                    _0xdcec2a.toggleVirtualGamepad.call(this, true, true);
                }
            },
            'setOptionMenuItem': function(_0x2f0e6a, _0x85969e) {
                let _0x2c1832 = this,
                    _0x549dac = this.elements.settings.panels.home.querySelector('[role="menu"]'),
                    _0x43777f = this.elements.settings.popup.children[0];
                Object.keys(_0x2f0e6a).forEach(function(_0x4fcbcf) {
                    let _0x177975 = _0x4fcbcf,
                        _0x5f3e0f = _0x428003('button', _0x5dc0c0(_0xa949a8(_0x2c1832.config.selectors.buttons.settings), {
                            'type': 'button',
                            'class': getClass({
                                'ejs__control': true,
                                'ejs__control--forward': true
                            }),
                            'role': 'menuitem',
                            'item': _0x4fcbcf,
                            'aria-haspopup': true
                        }));
                    _0x1093f4(_0x5f3e0f, 'click', function() {
                        _0x7f9f36.showMenuPanel.call(_0x2c1832, _0x177975, false);
                    });
                    let _0x1d5857, _0x1838f9 = _0x428003('span', null, _0x2f0e6a[_0x4fcbcf].label),
                        _0x455b20 = _0x428003('span', {
                            'class': _0x2c1832.config.classNames.menu.value
                        });
                    _0x1e2c68.object(_0x85969e) && (_0x1d5857 = _0x85969e[_0x177975]), _0x1e2c68.empty(_0x1d5857) && (_0x1d5857 = _0x2f0e6a[_0x177975].default), _0x1e2c68.object(_0x2f0e6a[_0x177975].options) ? _0x455b20.innerHTML = _0x2f0e6a[_0x177975].options[_0x1d5857] : _0x455b20.innerHTML = _0x1d5857, _0x1838f9.appendChild(_0x455b20), _0x5f3e0f.appendChild(_0x1838f9), _0x549dac.appendChild(_0x5f3e0f);
                    let _0x3f3775 = _0x428003('div', {
                            'data-pane': escape(_0x177975),
                            'hidden': ''
                        }),
                        _0x288440 = _0x428003('button', {
                            'type': 'button',
                            'class': getClass({
                                'ejs__control': true,
                                'ejs__control--back': true
                            })
                        });
                    _0x288440.appendChild(_0x428003('span', {
                        'aria-hidden': true
                    }, _0x2f0e6a[_0x4fcbcf].label)), _0x288440.appendChild(_0x428003('span', {
                        'class': getClass({
                            'ejs__sr-only': true
                        })
                    }, _0xb9b2ff.get('menuBack', _0x2c1832.config))), _0x1093f4(_0x3f3775, 'keydown', function(_0x462a4d) {
                        0x25 === _0x462a4d.which && (_0x462a4d.preventDefault(), _0x462a4d.stopPropagation(), _0x7f9f36.showMenuPanel.call(_0x2c1832, 'home', true));
                    }, false), _0x1093f4(_0x288440, 'click', function() {
                        _0x7f9f36.showMenuPanel.call(_0x2c1832, 'home', false);
                    }), _0x3f3775.appendChild(_0x288440), _0x3f3775.appendChild(_0x428003('div', {
                        'role': 'menu'
                    })), _0x43777f.appendChild(_0x3f3775), _0x2c1832.elements.settings.buttons[_0x177975] = _0x5f3e0f, _0x2c1832.elements.settings.panels[_0x177975] = _0x3f3775;
                    let _0x2c172f = _0x3f3775.querySelector('[role="menu"]');
                    !function(_0x301c01) {
                        if (_0x1e2c68.element(_0x301c01))
                            for (let _0x85969e = _0x301c01.childNodes.length; _0x85969e > 0;) _0x301c01.removeChild(_0x301c01.lastChild), _0x85969e -= 1;
                    }(_0x2c172f);
                    _0x1e2c68.object(_0x2f0e6a[_0x4fcbcf].options) ? Object.keys(_0x2f0e6a[_0x4fcbcf].options).forEach(function(_0x281296) {
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
                let _this = this,
                    _0x2c1832 = {};
                if (this.config.defaultMenuOptions && this.config.defaultMenuOptions.length === undefined) {
                    _0x2c1832 = this.config.defaultMenuOptions;
                }
                _0x2c1832.orientation = _0x7f9f36.storage.get('orientation'); 
                _0x2c1832.shader = _0x7f9f36.storage.get('shader') || _0x2c1832.shader;
                if (_this.touch) {
                    _0x2c1832['virtual-gamepad'] = _0x7f9f36.storage.get('virtual-gamepad') || _0x2c1832['virtual-gamepad'];
                    _0x1093f4.call(_this, _this.elements.container, 'start-game', function() {
                        ('enabled' === _0x2c1832['virtual-gamepad'] || _0x1e2c68.empty(_0x2c1832['virtual-gamepad'])) && _0xdcec2a.toggleVirtualGamepad.call(_this, true);
                    })
                } else {
                    delete _0x7f9f36.normalOptions['virtual-gamepad'];
                }
                _0x7f9f36.setOptionMenuItem.call(this, _0x7f9f36.normalOptions, _0x2c1832);
                _0x1093f4.call(_this, _this.elements.container, 'start-game', function() {
                    let shader = _0x7f9f36.storage.get('shader');
                    if (shader !== 'disabled') {
                        _0xdcec2a.setShader(shader);
                    }
                    let _0x42a7b1 = {};
                    _0xdcec2a.getGameCoreOptions && _0xdcec2a.getGameCoreOptions().split('\n').forEach(function(_0x4a987e, _0x10bd7a) {
                        let _0x2c1832 = _0x4a987e.split('; '),
                            _0x1ddc5f = _0x2c1832[0];
                        if (0 === _0x1ddc5f.indexOf('fba-dipswitch-') || _this.coreVer === 2) {
                            let _0xbd808 = _0x2c1832[1].split('|'),
                                _0x3c4b1a = _0x1ddc5f.split("|")[0].replace(/_/g, ' ').replace(/.+\-(.+)/, '$1');
                            _0xbd808.slice(1, -1);
                            if (_0xbd808.length === 1) return;
                            let options = {};
                            for (let i=0; i<_0xbd808.length; i++) {
                                options[_0xbd808[i]] = _this.localization(_0xbd808[i]);
                            }
                            _0x42a7b1[_0x1ddc5f.split("|")[0]] = {
                                'label': _this.localization(_0x3c4b1a),
                                'options': options,
                                'default': (_0x1ddc5f.split("|").length > 1) ? _0x1ddc5f.split("|")[1] : _0xbd808[0].replace('(Default) ', '')
                            };
                        }
                    });
                    let _0x27d859 = _0x7f9f36.storage.get('core-options');
                    _0x27d859 = _0x27d859 || {};
                    _0x7f9f36.coreOptionsValues = _0x27d859;
                    _0x7f9f36.setOptionMenuItem.call(_this, _0x42a7b1, _0x7f9f36.coreOptionsValues);
                    Object.keys(_0x7f9f36.coreOptionsValues).forEach(function(_0x51fc4e, _0x4b3613) {
                        _0x7f9f36.updateCoreOptions.call(_0x2c1832, _0x51fc4e, _0x7f9f36.coreOptionsValues[_0x51fc4e]);
                    });
                    'nds' == getSystem(_this.system, true) && (_0x27f4c4.Module._fast_forward_2 ? _0x27f4c4.Module._fast_forward_2(1) : _0x27f4c4.Module._fast_forward && _0x27f4c4.Module._fast_forward(1));
                });
            },
            'updateCoreOptionMenuItems': function() {
                let _0xa88a13 = this.elements.settings.panels.home.querySelector('[role="menu"]'),
                    _0x17edbf = _0x7f9f36.getCoreOptions.call(this);
                _0xdcec2a.connected && !_0xdcec2a.connection.isInitiator ? Object.keys(_0x17edbf).forEach(function(_0x480587) {
                    _0x17edbf[_0x480587].netplay && _0xa88a13.querySelector('[item="' .concat(_0x480587, '"]')).setAttribute('disabled', '');
                }) : Object.keys(_0x17edbf).forEach(function(_0x20e093) {
                    _0xa88a13.querySelector('[item="' .concat(_0x20e093, '"]')).removeAttribute('disabled');
                });
            },
            'setCoreOptionsMenu': function() {
                this.elements.settings.panels.home.querySelector('[role="menu"]'), this.elements.settings.popup.children[0];
                let _0xa88a13 = _0x7f9f36.getCoreOptions.call(this),
                    _0x17edbf = _0x7f9f36.storage.get('core-options');
                _0x17edbf = _0x17edbf || {}
                if (this.config.defaultMenuOptions && this.config.defaultMenuOptions.length === undefined) {
                    for (let k in this.config.defaultMenuOptions) {
                        if (!_0x17edbf[k]) {
                            _0x17edbf[k] = this.config.defaultMenuOptions[k];
                        }
                    }
                    _0x2c1832 = this.config.defaultMenuOptions;
                }
                if ('undefined' != typeof EJS_DEBUG_XX && true === EJS_DEBUG_XX) {
                    console.log('Available core options: ', _0xa88a13);
                }
                _0x7f9f36.coreOptionsValues = _0x17edbf, _0x7f9f36.setOptionMenuItem.call(this, _0xa88a13, _0x17edbf);
            },
            'checkMenu': function() {
                let _0xa88a13 = this.elements.settings.buttons;
                !_0x1e2c68.empty(_0xa88a13) && Object.values(_0xa88a13).some(function(_0x200331) {
                    return !_0x200331.hidden;
                });
                _0x132da7(this.elements.settings.menu, false);
            },
            'focusFirstMenuItem': function(_0x303d68) {
                let _0x17edbf = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                if (!this.elements.settings.popup.hidden) {
                    let _0x2c1832 = _0x303d68;
                    _0x1e2c68.element(_0x2c1832) || (_0x2c1832 = Object.values(this.elements.settings.panels).find(function(_0xe94c5e) {
                        return !_0xe94c5e.hidden;
                    }));
                    let _0x2f3a13 = _0x2c1832.querySelector('[role^="menuitem"]');
                    _0x31cc23.call(this, _0x2f3a13, _0x17edbf);
                }
            },
            'toggleMenu': function(_0x28d6c6) {
                let _0x17edbf = this.elements.settings.popup,
                    _0x2c1832 = this.elements.buttons.settings;
                if (_0x1e2c68.element(_0x17edbf) && _0x1e2c68.element(_0x2c1832)) {
                    let _0x614270 = _0x17edbf.hidden,
                        _0x14f1b5 = _0x614270;
                    if (_0x1e2c68.boolean(_0x28d6c6)) _0x14f1b5 = _0x28d6c6;
                    else if (_0x1e2c68.keyboardEvent(_0x28d6c6) && 0x1b === _0x28d6c6.which) _0x14f1b5 = false;
                    else if (_0x1e2c68.event(_0x28d6c6)) {
                        let _0xcf75ac = _0x17edbf.contains(_0x28d6c6.target);
                        if (_0xcf75ac || !_0xcf75ac && _0x28d6c6.target !== _0x2c1832 && _0x14f1b5) return;
                    }
                    _0x2c1832.setAttribute('aria-expanded', _0x14f1b5);
                    _0x132da7(_0x17edbf, !_0x14f1b5);
                    _0x3a8e2f(this.elements.container, this.config.classNames.menu.open, _0x14f1b5);
                    _0x14f1b5 && _0x1e2c68.keyboardEvent(_0x28d6c6) ? _0x7f9f36.focusFirstMenuItem.call(this, null, true) : _0x14f1b5 || _0x614270 || _0x31cc23.call(this, _0x2c1832, _0x1e2c68.keyboardEvent(_0x28d6c6));
                }
            },
            'getMenuSize': function(_0x55fe13) {
                let _0x17edbf = _0x55fe13.cloneNode(true);
                _0x17edbf.style.position = 'absolute';
                _0x17edbf.style.opacity = 0;
                _0x17edbf.removeAttribute('hidden');
                _0x55fe13.parentNode.appendChild(_0x17edbf);
                let _0x2c1832 = _0x17edbf.scrollWidth,
                    _0x5edd1b = _0x17edbf.scrollHeight;
                return _0x12a55d(_0x17edbf), {
                    'width': _0x2c1832,
                    'height': _0x5edd1b
                };
            },
            'showLoadStatePanel': function() {},
            'showMenuPanel': function() {
                let _this = this,
                    _0x17edbf = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '',
                    _0x2c1832 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                    _0x7f4281 = _0x530042.call(this, '[data-pane="' .concat(escape(_0x17edbf), '"]'));
                if (_0x1e2c68.element(_0x7f4281)) {
                    let _0x3d6729 = _0x7f4281.parentNode,
                        _0x381f57 = Array.from(_0x3d6729.children).find(function(_0x57c652) {
                            return !_0x57c652.hidden;
                        });
                    if (_0x2d904a.transitions && !_0x2d904a.reducedMotion) {
                        _0x3d6729.style.width = '' .concat(_0x381f57.scrollWidth, 'px');
                        _0x3d6729.style.height = '' .concat(_0x381f57.scrollHeight, 'px');
                        let _0x29dd37 = _0x7f9f36.getMenuSize.call(this, _0x7f4281),
                            _0x37447f = function _0x17edbf(_0x40854f) {
                                _0x40854f.target === _0x3d6729 && ['width', 'height'].includes(_0x40854f.propertyName) && (_0x3d6729.style.width = '', _0x3d6729.style.height = '', _0x20109b.call(_this, _0x3d6729, _0x5a2767, _0x17edbf));
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
                    'aria-expanded': false
                }));
                let _0x2c1832 = _0x428003('div', {
                        'class': getClass({
                            'ejs__dialog': true,
                            'ejs__load-state__container': true
                        }),
                        'hidden': ''
                    }),
                    _0x2e5e96 = _0x428003('div');
                _0x2c1832.appendChild(_0x2e5e96);
                _0x530042.call(this, '.' .concat(getClass({
                    'ejs__dialogs': true
                }))).appendChild(_0x2c1832);
                this.elements.dialogs.loadState = _0x2c1832;
            },
            'setScreenRecord': function(_0x4c3fdd, _0x289259) {
                if (!window.MediaRecorder) {
                    return;
                };
                let _0x2c1832 = _0x7f9f36.createButton.call(this, 'screen-record', {
                    'aria-haspopup': true,
                    'aria-expanded': false,
                    'style': 'margin-right:auto;'
                });
                _0x4c3fdd.appendChild(_0x2c1832);
                let _0x13c0e4 = _0x428003('div', {
                        'class': getClass({
                            'ejs__dialog': true,
                            'ejs__screenRecord__container': true
                        }),
                        'hidden': ''
                    }),
                    _0xe2c02a = _0x428003('div');
                _0x13c0e4.appendChild(_0xe2c02a);
                _0x530042.call(this, '.' .concat(getClass({
                    'ejs__dialogs': true
                }))).appendChild(_0x13c0e4);
                this.elements.dialogs.screenRecord = _0x13c0e4;
            },
            'setCacheManager': function(_0x4c3fdd, _0x289259) {
                let _0x2c1832 = _0x7f9f36.createButton.call(this, 'cache-manager', {
                    'aria-haspopup': true,
                    'aria-expanded': false,
                    'style': 'margin-right:auto;'
                });
                _0x4c3fdd.appendChild(_0x2c1832);
                let _0x13c0e4 = _0x428003('div', {
                        'class': getClass({
                            'ejs__dialog': true,
                            'ejs__cacheManager__container': true
                        }),
                        'hidden': ''
                    }),
                    _0xe2c02a = _0x428003('div');
                _0x13c0e4.appendChild(_0xe2c02a);
                _0x530042.call(this, '.' .concat(getClass({
                    'ejs__dialogs': true
                }))).appendChild(_0x13c0e4);
                this.elements.dialogs.cacheManager = _0x13c0e4;
            },
            'setGamepad': function(_0x4c3fdd, _0x289259) {
                let _0x2c1832 = _0x7f9f36.createButton.call(this, 'gamepad', {
                    'aria-haspopup': true,
                    'aria-expanded': false,
                    'style': 'margin-right:auto;'
                });
                _0x4c3fdd.appendChild(_0x2c1832);
                let _0x13c0e4 = _0x428003('div', {
                        'class': getClass({
                            'ejs__dialog': true,
                            'ejs__gamepad__container': true
                        }),
                        'hidden': ''
                    }),
                    _0xe2c02a = _0x428003('div');
                _0x13c0e4.appendChild(_0xe2c02a);
                _0x530042.call(this, '.' .concat(getClass({
                    'ejs__dialogs': true
                }))).appendChild(_0x13c0e4);
                this.elements.dialogs.gamepad = _0x13c0e4;
            },
            'setMessage': function(_0x4c3fdd, _0x289259) {
                let _0x13c0e4 = _0x428003('div', {
                        'class': getClass({
                            'ejs__dialog': true
                        }),
                        'hidden': ''
                    }),
                    _0xe2c02a = _0x428003('div');
                _0x13c0e4.appendChild(_0xe2c02a);
                _0x530042.call(this, '.' .concat(getClass({
                    'ejs__dialogs': true
                }))).appendChild(_0x13c0e4);
                this.elements.dialogs.message = _0x13c0e4;
            },
            'setCheat': function(_0x328075, _0x21ca37) {
                let _0x2c1832 = _0x7f9f36.createButton.call(this, 'cheat', {
                    'aria-haspopup': true,
                    'aria-expanded': false,
                    'style': 'margin-right:auto;'
                });
                _0x328075.appendChild(_0x2c1832);
                let _0x173db3 = _0x428003('div', {
                        'class': getClass({
                            'ejs__dialog': true,
                            'ejs__cheat__container': true
                        }),
                        'hidden': ''
                    }),
                    _0x460961 = _0x428003('div');
                _0x173db3.appendChild(_0x460961);
                _0x530042.call(this, '.' .concat(getClass({
                    'ejs__dialogs': true
                }))).appendChild(_0x173db3);
                this.elements.dialogs.cheat = _0x173db3;
            },
            'setStateInfoBarWidget': function() {
                let _0xa88a13 = _0x428003('div', {
                        'class': getClass({
                            'ejs__widget': true
                        })
                    }),
                    _0x17edbf = _0x428003('div');
                _0x17edbf.style = 'color: red;font-size: 17px;padding:10px;text-align:left;text-shadow:1px 1px 1px #000'
                _0xa88a13.appendChild(_0x17edbf);
                _0x530042.call(this, '.' .concat(getClass({
                    'ejs__widgets': true
                }))).appendChild(_0xa88a13);
                this.elements.widgets.stateInfo = _0xa88a13;
                this.elements.widgets.stateInfoDiv = _0x17edbf;
            },
            'setNetplayWidgets': function() {
                let _0xa88a13 = _0x428003('div', {
                        'class': getClass({
                            'ejs__widget': true,
                            'ejs__widget_netplay': true
                        })
                    }),
                    _0x17edbf = _0x428003('div');
                _0xa88a13.appendChild(_0x17edbf);
                _0x530042.call(this, '.' .concat(getClass({
                    'ejs__widgets': true
                }))).appendChild(_0xa88a13);
                this.elements.widgets.netplay = _0xa88a13;
            },
            'setNetplay': function(_0x1859f4, _0x50544d) {
                _0x1859f4.appendChild(_0x7f9f36.createButton.call(this, 'netplay', {
                    'aria-haspopup': true,
                    'aria-expanded': false
                }));
                let _0x2c1832 = _0x428003('div', {
                        'class': getClass({
                            'ejs__dialog': true,
                            'ejs__netplay__container': true
                        }),
                        'hidden': ''
                    }),
                    _0x4f63e0 = _0x428003('div');
                _0x2c1832.appendChild(_0x4f63e0);
                _0x530042.call(this, '.' .concat(getClass({
                    'ejs__dialogs': true
                }))).appendChild(_0x2c1832);
                this.elements.dialogs.netplay = _0x2c1832;
                _0x7f9f36.setNetplayWidgets.call(this);
            },
            'toggleContextMenu': function(_0x24b1f3, _0x4b9d55) {
                if (_0x350d73(_0x24b1f3.target, getClass({
                        'ejs__dialogs': true
                    }))) {
                    let _0x2c1832 = _0x7f9f36.contextMenu.timer;
                    if (this.started) {
                        let _0x2a1dda = _0x530042.call(this, '.' .concat(getClass({
                            'ejs__contextmenu': true
                        }), ' ul'));
                        if (_0x4b9d55) {
                            _0x7f9f36.contextMenu.style.display = 'block';
                            _0x7f9f36.contextMenu.style.left = ''.concat(_0x24b1f3.layerX, 'px');
                            _0x7f9f36.contextMenu.style.top = ''.concat(_0x24b1f3.layerY, 'px');
                            let _0x1b48e7 = _0x23ffa1.call(this, '.' .concat(getClass({
                                'ejs__contextmenu': true
                            }), ' ul li'));
                            if (null === _0x2a1dda.getAttribute('menu')) {
                                let _0x14264d = _0x428003('li', {});
                                _0x14264d.appendChild(_0x428003('a', {
                                    'target': '_blank',
                                    'href': 'https://github.com/EmulatorJS/EmulatorJS' // Modifying this is against the terms of service
                                }, 'EmulatorJS v' .concat(this.version)));
                                _0x2a1dda.appendChild(_0x14264d);
                                _0x2a1dda.setAttribute('menu', '');
                            }
                            _0x2c1832 && clearTimeout(_0x2c1832), _0x2c1832 = setTimeout(function() {}, 0xfa0), _0x7f9f36.contextMenu.timer = _0x2c1832;
                        } else _0x7f9f36.contextMenu.style.display = 'none';
                    }
                }
            },
            'create': function(_0x42e40d) {
                let _this = this;
                _0x7f9f36.storage = new _0x2f61ba(this, 'ejs_' .concat(this.system, '_settings'));
                let _0x17edbf = _0x428003('div', _0xa949a8(this.config.selectors.controls.wrapper));
                _0x7f9f36.contextMenu = _0x428003('div', {
                    'class': getClass({
                        'ejs__contextmenu': true
                    }),
                    'style': 'position: absolute; display:none;z-index:9'
                })
                let contextHtml = ['<ul>', '</ul>']
                let contextFunctions = []
                function addContextHtml(title, hidden, functi0n) {
                    if (typeof functi0n == 'function') {
                        contextFunctions.push(functi0n)
                    } else {
                        contextFunctions.push(function(){})
                    }
                    let i = contextHtml.length - 1
                    if (hidden) {
                        contextHtml.splice(i, 0, '<li hidden><a href="#" onclick="return false">'+title+'</a></li>')
                    } else {
                        contextHtml.splice(i, 0, '<li><a href="#" onclick="return false">'+title+'</a></li>')
                    }
                }
                addContextHtml(_this.localization('Take Screenshot'), false, function(_0x20faaa) {
                    let _0x4e898a = _0x378b5c.getScreenData();
                    let gamep;
                    if (typeof _this.gameName == 'string') {
                       gamep = _this.gameName
                    }
                    let gamepng = gamep ? '' .concat(gamep, '-screenshot.png') : 'game.png';
                    let a = document.createElement('a');
                    a.href = URL.createObjectURL(new Blob([_0x4e898a]));
                    a.download = gamepng;
                    a.click();
                    setTimeout(function() {
                        URL.revokeObjectURL(a.src);
                    })
                    return false;
                })
                addContextHtml(_this.localization('Quick Save')+' (F2)', false, function(_0x395c73) {
                    _0x378b5c.quickSaveState();
                    _0x2593da.contextMenu.style.display = 'none';
                })
                addContextHtml(_this.localization('Quick Load')+' (F4)', false, function(_0x124f69) {
                    _0x378b5c.quickLoadState();
                    _0x2593da.contextMenu.style.display = 'none';
                })
                
                
                _0x7f9f36.contextMenu.innerHTML = contextHtml.join('')
                let a = _0x7f9f36.contextMenu.getElementsByTagName('li')
                for (let i=0; i<a.length; i++) {
                    _0x1093f4.call(_this, a[i], 'click', contextFunctions[i])
                }
                this.elements.container.appendChild(_0x7f9f36.contextMenu);
                
                
                let _0x2c1832 = _0x428003('div', {
                    'class': getClass({
                        'ejs__dialog': true,
                        'ejs__cache__container': true
                    }),
                    'hidden': ''
                });
                _0x530042.call(this, '.' .concat(getClass({
                    'ejs__dialogs': true
                }))).appendChild(_0x2c1832);
                this.elements.dialogs.cache = _0x2c1832;
                let _0x3c66db = _0x428003('div', {
                    'class': getClass({
                        'ejs__dialog': true,
                        'ejs__loading__container': true
                    }),
                    'hidden': ''
                });
                _0x530042.call(this, '.' .concat(getClass({
                    'ejs__dialogs': true
                }))).appendChild(_0x3c66db);
                this.elements.dialogs.loading = _0x3c66db;
                _0x17edbf.appendChild(_0x7f9f36.createButton.call(this, 'restart'));
                _0x17edbf.appendChild(_0x7f9f36.createButton.call(this, 'play'));
                _0x17edbf.appendChild(_0x7f9f36.createButton.call(this, 'save-state', {
                    'aria-expanded': false
                }));
                _0x7f9f36.setLoadState.call(this, _0x17edbf, _0x42e40d);
                _0x7f9f36.setScreenRecord.call(this, _0x17edbf, _0x42e40d);
                _0x7f9f36.setCacheManager.call(this, _0x17edbf, _0x42e40d);
                _0x7f9f36.supportNetPlay.call(this, _0x17edbf) && parseInt(this.config.gameId, 0xa) > 0 && _0x7f9f36.setNetplay.call(this, _0x17edbf, _0x42e40d);
                _0x7f9f36.setGamepad.call(this, _0x17edbf, _0x42e40d);
                _0x7f9f36.setMessage.call(this, _0x17edbf, _0x42e40d)
                _0x7f9f36.setStateInfoBarWidget.call(this, _0x17edbf, _0x42e40d);
                _0x7f9f36.setCheat.call(this, _0x17edbf, _0x42e40d);
                _0x17edbf.appendChild(_0x428003('span', {
                    'style': 'flex:1'
                }));
                let _0xd299b = _0x428003('div', {
                    'class': getClass({
                        'ejs__volume': true
                    })
                });
                _0xd299b.appendChild(_0x7f9f36.createButton.call(this, 'mute'));
                let _0x4bbcd0 = {
                    'max': 1,
                    'step': 0.01,
                    'value': this.config.volume
                };
                _0xd299b.appendChild(_0x7f9f36.createRange.call(this, 'volume', _0x5dc0c0(_0x4bbcd0, {})));
                this.elements.volume = _0xd299b;
                _0x17edbf.appendChild(_0xd299b);
                let _0x2746ab = _0x428003('div', {
                    'class': getClass({
                        'ejs__menu': true
                    })
                });
                _0x2746ab.appendChild(_0x7f9f36.createButton.call(this, 'settings', {
                    'aria-haspopup': true,
                    'aria-expanded': false
                }));
                let _0x262fb8 = _0x428003('div', {
                        'class': getClass({
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
                _0x174c46.appendChild(_0x17f3cb);
                _0x3f3385.appendChild(_0x174c46);
                this.elements.settings.panels.home = _0x174c46;
                _0x262fb8.appendChild(_0x3f3385);
                _0x2746ab.appendChild(_0x262fb8);
                _0x17edbf.appendChild(_0x2746ab);
                this.elements.settings.popup = _0x262fb8;
                this.elements.settings.menu = _0x2746ab;
                _0x17edbf.appendChild(_0x7f9f36.createButton.call(this, 'fullscreen'))
                let _0x19edbf = this;
                _0x17edbf.addEventListener('mousedown', function() {
                    _0x19edbf.onButtonDiv = true;
                })
                this.elements.controls = _0x17edbf;
                _0x7f9f36.setNormalOptionsMenu.call(this);
                _0x7f9f36.setCoreOptionsMenu.call(this);
                return _0x17edbf;
            },
            'inject': function() {
                let _this = this;
                this.icons = {
                    'enter-fullscreen': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M208 281.4c-12.5-12.5-32.76-12.5-45.26-.002l-78.06 78.07l-30.06-30.06c-6.125-6.125-14.31-9.367-22.63-9.367c-4.125 0-8.279 .7891-12.25 2.43c-11.97 4.953-19.75 16.62-19.75 29.56v135.1C.0013 501.3 10.75 512 24 512h136c12.94 0 24.63-7.797 29.56-19.75c4.969-11.97 2.219-25.72-6.938-34.87l-30.06-30.06l78.06-78.07c12.5-12.49 12.5-32.75 .002-45.25L208 281.4zM487.1 0h-136c-12.94 0-24.63 7.797-29.56 19.75c-4.969 11.97-2.219 25.72 6.938 34.87l30.06 30.06l-78.06 78.07c-12.5 12.5-12.5 32.76 0 45.26l22.62 22.62c12.5 12.5 32.76 12.5 45.26 0l78.06-78.07l30.06 30.06c9.156 9.141 22.87 11.84 34.87 6.937C504.2 184.6 512 172.9 512 159.1V23.1C512 10.74 501.3 0 487.1 0z"/></svg>',
                    'exit-fullscreen': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M215.1 272h-136c-12.94 0-24.63 7.797-29.56 19.75C45.47 303.7 48.22 317.5 57.37 326.6l30.06 30.06l-78.06 78.07c-12.5 12.5-12.5 32.75-.0012 45.25l22.62 22.62c12.5 12.5 32.76 12.5 45.26 .0013l78.06-78.07l30.06 30.06c6.125 6.125 14.31 9.367 22.63 9.367c4.125 0 8.279-.7891 12.25-2.43c11.97-4.953 19.75-16.62 19.75-29.56V296C239.1 282.7 229.3 272 215.1 272zM296 240h136c12.94 0 24.63-7.797 29.56-19.75c4.969-11.97 2.219-25.72-6.938-34.87l-30.06-30.06l78.06-78.07c12.5-12.5 12.5-32.76 .0002-45.26l-22.62-22.62c-12.5-12.5-32.76-12.5-45.26-.0003l-78.06 78.07l-30.06-30.06c-9.156-9.141-22.87-11.84-34.87-6.937c-11.97 4.953-19.75 16.62-19.75 29.56v135.1C272 229.3 282.7 240 296 240z"/></svg>',
                    'gamepad': '<svg viewBox="0 0 640 512"><path fill="currentColor" d="M480 96H160C71.6 96 0 167.6 0 256s71.6 160 160 160c44.8 0 85.2-18.4 114.2-48h91.5c29 29.6 69.5 48 114.2 48 88.4 0 160-71.6 160-160S568.4 96 480 96zM256 276c0 6.6-5.4 12-12 12h-52v52c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-52H76c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h52v-52c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h52c6.6 0 12 5.4 12 12v40zm184 68c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-80c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"/></svg>',
                    'load-state': '<svg viewBox="0 0 576 512"><path fill="currentColor" d="M572.694 292.093L500.27 416.248A63.997 63.997 0 0 1 444.989 448H45.025c-18.523 0-30.064-20.093-20.731-36.093l72.424-124.155A64 64 0 0 1 152 256h399.964c18.523 0 30.064 20.093 20.73 36.093zM152 224h328v-48c0-26.51-21.49-48-48-48H272l-64-64H48C21.49 64 0 85.49 0 112v278.046l69.077-118.418C86.214 242.25 117.989 224 152 224z"/></svg>',
                    'muted': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M301.2 34.85c-11.5-5.188-25.02-3.122-34.44 5.253L131.8 160H48c-26.51 0-48 21.49-48 47.1v95.1c0 26.51 21.49 47.1 48 47.1h83.84l134.9 119.9c5.984 5.312 13.58 8.094 21.26 8.094c4.438 0 8.972-.9375 13.17-2.844c11.5-5.156 18.82-16.56 18.82-29.16V64C319.1 51.41 312.7 40 301.2 34.85zM513.9 255.1l47.03-47.03c9.375-9.375 9.375-24.56 0-33.94s-24.56-9.375-33.94 0L480 222.1L432.1 175c-9.375-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94l47.03 47.03l-47.03 47.03c-9.375 9.375-9.375 24.56 0 33.94c9.373 9.373 24.56 9.381 33.94 0L480 289.9l47.03 47.03c9.373 9.373 24.56 9.381 33.94 0c9.375-9.375 9.375-24.56 0-33.94L513.9 255.1z"/></svg>',
                    'netplay': '<svg viewBox="0 0 512 512"><path fill="currentColor" d="M364.215 192h131.43c5.439 20.419 8.354 41.868 8.354 64s-2.915 43.581-8.354 64h-131.43c5.154-43.049 4.939-86.746 0-128zM185.214 352c10.678 53.68 33.173 112.514 70.125 151.992.221.001.44.008.661.008s.44-.008.661-.008c37.012-39.543 59.467-98.414 70.125-151.992H185.214zm174.13-192h125.385C452.802 84.024 384.128 27.305 300.95 12.075c30.238 43.12 48.821 96.332 58.394 147.925zm-27.35 32H180.006c-5.339 41.914-5.345 86.037 0 128h151.989c5.339-41.915 5.345-86.037-.001-128zM152.656 352H27.271c31.926 75.976 100.6 132.695 183.778 147.925-30.246-43.136-48.823-96.35-58.393-147.925zm206.688 0c-9.575 51.605-28.163 104.814-58.394 147.925 83.178-15.23 151.852-71.949 183.778-147.925H359.344zm-32.558-192c-10.678-53.68-33.174-112.514-70.125-151.992-.221 0-.44-.008-.661-.008s-.44.008-.661.008C218.327 47.551 195.872 106.422 185.214 160h141.572zM16.355 192C10.915 212.419 8 233.868 8 256s2.915 43.581 8.355 64h131.43c-4.939-41.254-5.154-84.951 0-128H16.355zm136.301-32c9.575-51.602 28.161-104.81 58.394-147.925C127.872 27.305 59.198 84.024 27.271 160h125.385z"/></svg>',
                    'pause': '<svg viewBox="0 0 320 512"><path d="M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z"/></svg>',
                    'play': '<svg viewBox="0 0 320 512"><path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z"/></svg>',
                    'restart': '<svg viewBox="0 0 512 512"><path d="M496 48V192c0 17.69-14.31 32-32 32H320c-17.69 0-32-14.31-32-32s14.31-32 32-32h63.39c-29.97-39.7-77.25-63.78-127.6-63.78C167.7 96.22 96 167.9 96 256s71.69 159.8 159.8 159.8c34.88 0 68.03-11.03 95.88-31.94c14.22-10.53 34.22-7.75 44.81 6.375c10.59 14.16 7.75 34.22-6.375 44.81c-39.03 29.28-85.36 44.86-134.2 44.86C132.5 479.9 32 379.4 32 256s100.5-223.9 223.9-223.9c69.15 0 134 32.47 176.1 86.12V48c0-17.69 14.31-32 32-32S496 30.31 496 48z"/></svg>',
                    'save-state': '<svg viewBox="0 0 448 512"><path fill="currentColor" d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z"/></svg>',
                    'screen-record': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path fill="currentColor" d="M19.994,0C8.952,0,0,8.952,0,19.995c0,11.043,8.952,19.994,19.994,19.994s19.995-8.952,19.995-19.994,C39.989,8.952,31.037,0,19.994,0z M19.994,27.745c-4.28,0-7.75-3.47-7.75-7.75s3.47-7.75,7.75-7.75s7.75,3.47,7.75,7.75,S24.275,27.745,19.994,27.745z"/></svg>',
                    'settings': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M495.9 166.6C499.2 175.2 496.4 184.9 489.6 191.2L446.3 230.6C447.4 238.9 448 247.4 448 256C448 264.6 447.4 273.1 446.3 281.4L489.6 320.8C496.4 327.1 499.2 336.8 495.9 345.4C491.5 357.3 486.2 368.8 480.2 379.7L475.5 387.8C468.9 398.8 461.5 409.2 453.4 419.1C447.4 426.2 437.7 428.7 428.9 425.9L373.2 408.1C359.8 418.4 344.1 427 329.2 433.6L316.7 490.7C314.7 499.7 307.7 506.1 298.5 508.5C284.7 510.8 270.5 512 255.1 512C241.5 512 227.3 510.8 213.5 508.5C204.3 506.1 197.3 499.7 195.3 490.7L182.8 433.6C167 427 152.2 418.4 138.8 408.1L83.14 425.9C74.3 428.7 64.55 426.2 58.63 419.1C50.52 409.2 43.12 398.8 36.52 387.8L31.84 379.7C25.77 368.8 20.49 357.3 16.06 345.4C12.82 336.8 15.55 327.1 22.41 320.8L65.67 281.4C64.57 273.1 64 264.6 64 256C64 247.4 64.57 238.9 65.67 230.6L22.41 191.2C15.55 184.9 12.82 175.3 16.06 166.6C20.49 154.7 25.78 143.2 31.84 132.3L36.51 124.2C43.12 113.2 50.52 102.8 58.63 92.95C64.55 85.8 74.3 83.32 83.14 86.14L138.8 103.9C152.2 93.56 167 84.96 182.8 78.43L195.3 21.33C197.3 12.25 204.3 5.04 213.5 3.51C227.3 1.201 241.5 0 256 0C270.5 0 284.7 1.201 298.5 3.51C307.7 5.04 314.7 12.25 316.7 21.33L329.2 78.43C344.1 84.96 359.8 93.56 373.2 103.9L428.9 86.14C437.7 83.32 447.4 85.8 453.4 92.95C461.5 102.8 468.9 113.2 475.5 124.2L480.2 132.3C486.2 143.2 491.5 154.7 495.9 166.6V166.6zM256 336C300.2 336 336 300.2 336 255.1C336 211.8 300.2 175.1 256 175.1C211.8 175.1 176 211.8 176 255.1C176 300.2 211.8 336 256 336z"/></svg>',
                    'volume': '<svg viewBox="0 0 640 512"><path d="M412.6 182c-10.28-8.334-25.41-6.867-33.75 3.402c-8.406 10.24-6.906 25.35 3.375 33.74C393.5 228.4 400 241.8 400 255.1c0 14.17-6.5 27.59-17.81 36.83c-10.28 8.396-11.78 23.5-3.375 33.74c4.719 5.806 11.62 8.802 18.56 8.802c5.344 0 10.75-1.779 15.19-5.399C435.1 311.5 448 284.6 448 255.1S435.1 200.4 412.6 182zM473.1 108.2c-10.22-8.334-25.34-6.898-33.78 3.34c-8.406 10.24-6.906 25.35 3.344 33.74C476.6 172.1 496 213.3 496 255.1s-19.44 82.1-53.31 110.7c-10.25 8.396-11.75 23.5-3.344 33.74c4.75 5.775 11.62 8.771 18.56 8.771c5.375 0 10.75-1.779 15.22-5.431C518.2 366.9 544 313 544 255.1S518.2 145 473.1 108.2zM534.4 33.4c-10.22-8.334-25.34-6.867-33.78 3.34c-8.406 10.24-6.906 25.35 3.344 33.74C559.9 116.3 592 183.9 592 255.1s-32.09 139.7-88.06 185.5c-10.25 8.396-11.75 23.5-3.344 33.74C505.3 481 512.2 484 519.2 484c5.375 0 10.75-1.779 15.22-5.431C601.5 423.6 640 342.5 640 255.1S601.5 88.34 534.4 33.4zM301.2 34.98c-11.5-5.181-25.01-3.076-34.43 5.29L131.8 160.1H48c-26.51 0-48 21.48-48 47.96v95.92c0 26.48 21.49 47.96 48 47.96h83.84l134.9 119.8C272.7 477 280.3 479.8 288 479.8c4.438 0 8.959-.9314 13.16-2.835C312.7 471.8 320 460.4 320 447.9V64.12C320 51.55 312.7 40.13 301.2 34.98z"/></svg>',
                    'cheat': '<svg viewBox="0 0 496 512"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm4 72.6c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.7-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.1-8.4-25.3-7.1-33.8 3.1z" class=""></path></svg>',
                    'cache-manager': '<svg viewBox="0 0 1800 1800"><path d="M896 768q237 0 443-43t325-127v170q0 69-103 128t-280 93.5-385 34.5-385-34.5T231 896 128 768V598q119 84 325 127t443 43zm0 768q237 0 443-43t325-127v170q0 69-103 128t-280 93.5-385 34.5-385-34.5-280-93.5-103-128v-170q119 84 325 127t443 43zm0-384q237 0 443-43t325-127v170q0 69-103 128t-280 93.5-385 34.5-385-34.5-280-93.5-103-128V982q119 84 325 127t443 43zM896 0q208 0 385 34.5t280 93.5 103 128v128q0 69-103 128t-280 93.5T896 640t-385-34.5T231 512 128 384V256q0-69 103-128t280-93.5T896 0z"/></svg>'
                }, this.id = Math.floor(0x2710 * Math.random());
                let _0x17edbf = null;
                this.elements.controls = null;
                let _0x2c1832 = {
                        'id': this.id
                    },
                    _0x270a9e = true;
                _0x1e2c68.function(this.config.controls) && (this.config.controls = this.config.controls.call(this.props)), this.config.controls || (this.config.controls = []), _0x1e2c68.element(this.config.controls) || _0x1e2c68.string(this.config.controls) ? _0x17edbf = this.config.controls : (_0x17edbf = _0x7f9f36.create.call(this, {
                    'id': this.id,
                    'seektime': this.config.seekTime,
                    'speed': this.speed,
                    'quality': this.quality
                }), _0x270a9e = false);
                let _0x1e6644, _0x3ec218 = function(_0x406126) {
                    let _0x17edbf = _0x406126;
                    return Object.entries(_0x2c1832).forEach(function(_0x3e992c) {
                        let _0x2c1832 = _0x5005e6(_0x3e992c, 2),
                            _0x47c2ec = _0x2c1832[0],
                            _0x547588 = _0x2c1832[1];
                        _0x17edbf = _0x1a0e98(_0x17edbf, '{' .concat(_0x47c2ec, '}'), _0x547588);
                    }), _0x17edbf;
                };
                if (_0x270a9e && (_0x1e2c68.string(this.config.controls) ? _0x17edbf = _0x3ec218(_0x17edbf) : _0x1e2c68.element(_0x17edbf) && (_0x17edbf.innerHTML = _0x3ec218(_0x17edbf.innerHTML))), _0x1e2c68.string(this.config.selectors.controls.container) && (_0x1e6644 = document.querySelector(this.config.selectors.controls.container)), _0x1e2c68.element(_0x1e6644) || (_0x1e6644 = this.elements.container), _0x1e6644[_0x1e2c68.element(_0x17edbf) ? 'insertAdjacentElement' : 'insertAdjacentHTML']('afterbegin', _0x17edbf), _0x1e2c68.element(this.elements.controls) || _0x7f9f36.findElements.call(this), !_0x1e2c68.empty(this.elements.buttons)) {
                    let _0xe8272c = function(_0x176a3e) {
                        let _0x2c1832 = _this.config.classNames.controlPressed;
                        Object.defineProperty(_0x176a3e, 'pressed', {
                            'enumerable': true,
                            'get': function() {
                                return _0x350d73(_0x176a3e, _0x2c1832);
                            },
                            'set': function() {
                                let _0xa88a13 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
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
        for (let _0x2c1832 = 0; _0x2c1832 < _0x217698.length; _0x2c1832++) {
            let _0x172cdb = _0x217698[_0x2c1832];
            _0x172cdb.enumerable = _0x172cdb.enumerable || false, _0x172cdb.configurable = true, 'value' in _0x172cdb && (_0x172cdb.writable = true), Object.defineProperty(_0x5c50c3, _0x172cdb.key, _0x172cdb);
        }
    }

    function _0x238270() {
        if (this.enabled) {
            let _0xa88a13 = this.player.elements.buttons.fullscreen;
            _0x1e2c68.element(_0xa88a13) && (_0xa88a13.pressed = this.active), _0xbae705.call(this.player, this.target, this.active ? 'enterfullscreen' : 'exitfullscreen', true), _0x59aa33.isIos || _0x5e0c7d.call(this.player, this.target, this.active);
        }
    }

    function _0x3c983f() {
        let _0xa88a13 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        _0xa88a13 ? this.scrollPosition = {
            'x': window.scrollX || 0,
            'y': window.scrollY || 0x0
        } : window.scrollTo(this.scrollPosition.x, this.scrollPosition.y), document.body.style.overflow = _0xa88a13 ? 'hidden' : '', _0x3a8e2f(this.target, this.player.config.classNames.fullscreen.fallback, _0xa88a13), _0x238270.call(this);
    }
    let _0x335854 = function() {
        function _0x1339df(_0x5f19c6) {
            let _0x2c1832 = this;
            ! function(_0x143a8a, _0x32a0a1) {
                if (!(_0x143a8a instanceof _0x32a0a1)) throw new TypeError('Cannot call a class as a function');
            }(this, _0x1339df), this.player = _0x5f19c6, this.prefix = _0x1339df.prefix, this.property = _0x1339df.property, this.scrollPosition = {
                'x': 0,
                'y': 0x0
            }, _0x1093f4.call(this.player, document, 'ms' === this.prefix ? 'MSFullscreenChange' : '' .concat(this.prefix, 'fullscreenchange'), function() {
                _0x238270.call(_0x2c1832);
            }), this.update();
        }
        
        let _0x17edbf, _0x2c1832, _0x50d347;
        
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
                let _0x1339df = '';
                return ['webkit', 'moz', 'ms'].some(function(_0xc1e0c3) {
                    return !(!_0x1e2c68.function(document['' .concat(_0xc1e0c3, 'ExitFullscreen')]) && !_0x1e2c68.function(document['' .concat(_0xc1e0c3, 'CancelFullScreen')]) || (_0x1339df = _0xc1e0c3, 0));
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
                                let _0x17edbf = 'moz' === this.prefix ? 'Cancel' : 'Exit';
                                document['' .concat(this.prefix).concat(_0x17edbf).concat(this.property)]();
                            }
                        } else(document.cancelFullScreen || document.exitFullscreen).call(document);
                else _0x3c983f.call(this, false);
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
        let _0x2c1832 = [],
            _0x2e7aa7 = true,
            _0x393a5f = false,
            _0x3b4eca = undefined;
        try {
            for (let _0x1aca09, _0x1bb8de = _0x458e02[Symbol.iterator](); !(_0x2e7aa7 = (_0x1aca09 = _0x1bb8de.next()).done) && (_0x2c1832.push(_0x1aca09.value), !_0x5729e1 || _0x2c1832.length !== _0x5729e1); _0x2e7aa7 = true);
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
    }
    let _0x37093c = function() {
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
                let _0x31e271 = this.emulator,
                    _0x17edbf = _0x31e271.elements;
                _0x31e271.touch = true, _0x3a8e2f(_0x17edbf.container, _0x31e271.config.classNames.isTouch, true);
            },
            setTabFocus: function(_0x20bf1f) {
                let _0x17edbf = this.emulator,
                    _0x2c1832 = _0x17edbf.elements,
                    _0x48d087 = _0x17edbf;
                if (clearTimeout(this.focusTimer), 'keydown' !== _0x20bf1f.type || 0x9 === _0x20bf1f.which) {
                    'keydown' === _0x20bf1f.type && (this.lastKeyDown = _0x20bf1f.timeStamp);
                    let _0x27d4ad, _0x967a30 = _0x20bf1f.timeStamp - this.lastKeyDown <= 0x14;
                    ('focus' !== _0x20bf1f.type || _0x967a30) && (_0x27d4ad = _0x48d087.config.classNames.tabFocus, _0x3a8e2f(_0x23ffa1.call(_0x48d087, '.' .concat(_0x27d4ad)), _0x27d4ad, false), this.focusTimer = setTimeout(function() {
                        let _0x20bf1f = document.activeElement;
                        _0x2c1832.container.contains(_0x20bf1f) && _0x3a8e2f(document.activeElement, _0x48d087.config.classNames.tabFocus, true);
                    }, 0xa));
                }
            },
            global: function() {
                let _0x31e271 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],
                    _0x17edbf = this.emulator,
                    _0x2c1832 = _0x17edbf;
                _0x1ef215.call(_0x2c1832, document.body, 'click', this.toggleMenu, _0x31e271), _0x455c85.call(_0x2c1832, document.body, 'touchstart', this.firstTouch), _0x1ef215.call(_0x2c1832, document.body, 'keydown focus blur', this.setTabFocus, _0x31e271, false, true), _0x1093f4.call(_0x2c1832, document.body, 'keyup', function(_0x4e289a) {
                    _0x2c1832.started && (0x71 === _0x4e289a.which && (_0x4e289a.shiftKey ? null === _0x2c1832.elements.buttons.saveState.getAttribute('hidden') && _0xbae705.call(_0x2c1832, _0x2c1832.elements.buttons.saveState, 'click') : _0xdcec2a.quickSaveState()), 0x73 === _0x4e289a.which && (_0x4e289a.shiftKey ? null === _0x2c1832.elements.buttons.loadState.getAttribute('hidden') && _0xbae705.call(_0x2c1832, _0x2c1832.elements.buttons.loadState, 'click') : _0xdcec2a.quickLoadState()), 0x78 === _0x4e289a.which && _0xbae705.call(_0x2c1832, _0x2c1832.elements.buttons.mute, 'click'));
                });
            },
            container: function() {
                let _0x31e271, _0x17edbf = this.emulator,
                    _0x2c1832 = _0x17edbf.elements,
                    _0x45d275 = _0x17edbf,
                    setFullscreenInterval = null;
                _0x1093f4.call(_0x45d275, _0x2c1832.container, 'mousemove mouseleave touchstart touchmove enterfullscreen exitfullscreen start-game', function(_0x1ac81c) {
                    let _0x3953b5 = _0x2c1832.controls;
                    _0x3953b5 && 'enterfullscreen' === _0x1ac81c.type && (_0x3953b5.pressed = false, _0x3953b5.hover = false);
                    let _0x2c3de3 = 0;
                    if (['touchstart', 'touchmove', 'mousemove', 'start-game'].includes(_0x1ac81c.type)) {
                        if (getSystem(_0x17edbf.system, true) === 'nds' && getSystem(_0x17edbf.system, _0x17edbf.coreVer) !== 'melonds' && _0x1ac81c.type == 'mousemove' && _0x27f4c4 && _0x27f4c4.Module && _0x27f4c4.Module.canvas && (document.pointerLockElement === _0x27f4c4.Module.canvas || document.mozPointerLockElement === _0x27f4c4.Module.canvas)) {
                            _0x5ab74d.toggleControls.call(_0x45d275, false);
                            return;
                        }
                        if (_0xdcec2a && (_0xdcec2a.virtualGamepadContainer == 'undefined' || _0xdcec2a.virtualGamepadContainer === null)) {
                            _0x5ab74d.toggleControls.call(_0x45d275, true);
                            _0x2c3de3 = _0x45d275.touch ? 0xbb8 : 0x7d0;
                            clearTimeout(_0x31e271);
                            _0x31e271 = setTimeout(function() {
                                return _0x5ab74d.toggleControls.call(_0x45d275, false);
                            }, _0x2c3de3);
                            _0x2c1832.controls.setAttribute('data-timer', _0x31e271);
                        }
                    };
                }), _0x1093f4.call(_0x45d275, window, 'resize', function(_0x3e2cc5) {
                    let _0x17edbf = _0x45d275.elements.container.clientHeight,
                        _0x2c1832 = _0x23ffa1.call(_0x45d275, '.' .concat(getClass({
                            'ejs__menu__container': true
                        }), ' [role="menu"]'));
                    Array.from(_0x2c1832).forEach(function(_0x43a16d) {
                        _0x43a16d.style.maxHeight = '' .concat(_0x17edbf - 0x5f, 'px'), _0x43a16d.style.overflow = 'auto';
                    }), _0x27f4c4.Module && _0x27f4c4.Module.canvas, _0x45d275.elements.container.clientWidth / _0x45d275.elements.container.clientHeight < 1.3 ? _0x3a8e2f(_0x45d275.elements.container, getClass({
                        'portrait': true
                    }), true) : _0x3a8e2f(_0x45d275.elements.container, getClass({
                        'portrait': true
                    }), false);
                }), _0xbae705.call(_0x45d275, window, 'resize'), _0x1093f4.call(_0x45d275, _0x45d275.elements.container, 'enterfullscreen', function(_0x586586) {
                    if (_0x27f4c4.isMobileDevice && window.screen && screen.orientation && typeof screen.orientation.lock == 'function') {
                        try {
                            screen.orientation.lock("landscape");
                        }catch(e){}
                    } else if (_0x27f4c4.isMobileDevice && window.ScreenOrientation && typeof ScreenOrientation.lock == 'function') {
                        try {
                            ScreenOrientation.lock("landscape");
                        }catch(e){}
                    }
                    if (_0x45d275.coreVer === 2 && _0x27f4c4.Module) {
                        let repeat = 50;
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
                    if (_0x27f4c4.isMobileDevice && window.screen && screen.orientation && typeof screen.orientation.unlock == 'function') {
                        try {
                            screen.orientation.unlock();
                        }catch(e){}
                    } else if (_0x27f4c4.isMobileDevice && window.ScreenOrientation && typeof ScreenOrientation.unlock == 'function') {
                        try {
                            ScreenOrientation.unlock();
                        }catch(e){}
                    }
                    if (_0x45d275.coreVer === 2 && _0x27f4c4.Module) {
                        clearInterval(setFullscreenInterval);
                        _0x27f4c4.Module.setCanvasSize(800, 600);
                    }
                    setTimeout(function() {
                        _0xbae705.call(_0x45d275, window, 'resize');
                    }, 0x12c);
                }), _0x1093f4.call(_0x45d275, _0x45d275.elements.container, 'start-game', function(_0x5b0a00) {
                    let _0x17edbf = window.document.createEvent('UIEvents');
                    _0x17edbf.initUIEvent('resize', true, false, window, 0), window.dispatchEvent(_0x17edbf), _0x3a8e2f(_0x45d275.elements.container, getClass({
                        'game-started': true
                    }), true);
                }), _0x1093f4.call(_0x45d275, _0x45d275.elements.container, 'blur', function(_0x893c7a) {
                    let _0x17edbf = _0x893c7a.currentTarget;
                    setTimeout(function() {
                        _0x17edbf.contains(document.activeElement) || _0xbae705.call(_0x45d275, _0x45d275.elements, 'blurgame');
                    }, 0);
                }), _0x1093f4.call(_0x45d275, _0x45d275.elements.container, 'focus', function(_0xe0dee3) {
                    let _0x17edbf = _0xe0dee3.currentTarget;
                    setTimeout(function() {
                        _0x17edbf.contains(document.activeElement) && _0xbae705.call(_0x45d275, _0x45d275.elements, 'focusgame');
                    }, 0);
                });
            },
            media: function() {
                let _0x31e271 = this.emulator,
                    _0x17edbf = _0x31e271.elements,
                    _0x2c1832 = _0x31e271;
                _0x1093f4.call(_0x2c1832, _0x2c1832.game, 'volumechange', function(_0x3099fe) {
                    return _0x2593da.updateVolume.call(_0x2c1832, _0x3099fe);
                }), _0x1093f4.call(_0x2c1832, _0x17edbf.container, 'contextmenu', function(_0x5c22bc) {
                    _0x2c1832.touch || _0x2c1832.lightgun || _0x2593da.toggleContextMenu.call(_0x2c1832, _0x5c22bc, true);
                    _0x5c22bc.preventDefault();
                }, false), _0x1093f4.call(_0x2c1832, _0x17edbf.container, 'mousewheel', function(_0x49c974) {
                    _0x49c974.stopPropagation();
                }, false), _0x1093f4.call(_0x2c1832, _0x17edbf.container, 'mousedown', function(_0x53ee35) {
                    if (getSystem(_0x31e271.system, true) === 'nds' && getSystem(_0x31e271.system, _0x31e271.coreVer) !== 'melonds' && _0x27f4c4 && _0x27f4c4.Module && _0x27f4c4.Module.canvas && ! _0x27f4c4.isMobileDevice && !(document.pointerLockElement === _0x27f4c4.Module.canvas || document.mozPointerLockElement === _0x27f4c4.Module.canvas) && _0x31e271.started && !_0x31e271.connected) {
                        setTimeout(function() {
                            if (_0x31e271.onButtonDiv !== true) {
                                _0x27f4c4.Module.canvas.requestPointerLock = _0x27f4c4.Module.canvas.requestPointerLock || _0x27f4c4.Module.canvas.mozRequestPointerLock;
                                _0x27f4c4.Module.canvas.requestPointerLock()
                            }
                            _0x31e271.onButtonDiv = false
                        }, 100)
                    }
                    _0x2c1832.touch || _0x2593da.toggleContextMenu.call(_0x2c1832, _0x53ee35, false);
                }, false), _0x1093f4.call(_0x2c1832, _0x2c1832.game, 'volumechange', function() {
                    _0x2c1832.storage.set({
                        'volume': _0x2c1832.volume,
                        'muted': _0x2c1832.muted
                    }), _0xdcec2a.setVolume && _0xdcec2a.setVolume();
                });
                let _0x38e17f = _0x2c1832.config.events.concat(['keyup', 'keydown']).join(' ');
                _0x1093f4.call(_0x2c1832, _0x2c1832.game, _0x38e17f, function(_0x38e438) {
                    let _0x2b4804 = _0x38e438.detail,
                        _0x1bfeb2 = void 0 === _0x2b4804 ? {} : _0x2b4804;
                    'error' === _0x38e438.type && (_0x1bfeb2 = _0x2c1832.game.error), _0xbae705.call(_0x2c1832, _0x17edbf.container, _0x38e438.type, true, _0x1bfeb2);
                });
            },
            proxy: function(_0x52d0c2, _0x500f90, _0x175ce5) {
                let _0x4bb44e = this.emulator,
                    _0x584a64 = _0x4bb44e.config.listeners[_0x175ce5],
                    _0x5269fd = true;
                _0x1e2c68.function(_0x584a64) && (_0x5269fd = _0x584a64.call(_0x4bb44e, _0x52d0c2)), _0x5269fd && _0x1e2c68.function(_0x500f90) && _0x500f90.call(_0x4bb44e, _0x52d0c2);
            },
            bind: function(_0x4a8d46, _0x8f91ad, _0x2affda, _0x41dfb1) {
                let _0x1363b1 = this,
                    _0x53b9a1 = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4],
                    _0x5209a5 = this.emulator,
                    _0x27b738 = _0x5209a5,
                    _0x5d89ff = _0x27b738.config.listeners[_0x41dfb1],
                    _0x100c9f = _0x1e2c68.function(_0x5d89ff);
                _0x1093f4.call(_0x27b738, _0x4a8d46, _0x8f91ad, function(_0x5a03ac) {
                    return _0x1363b1.proxy(_0x5a03ac, _0x2affda, _0x41dfb1);
                }, _0x53b9a1 && !_0x100c9f);
            },
            controls: function() {
                let _0x31e271 = this,
                    _0x17edbf = this.emulator,
                    _0x2c1832 = _0x17edbf.elements,
                    _0x127f22 = _0x59aa33.isIE ? 'change' : 'input';
                if (this.bind(_0x2c1832.buttons.mute, 'click', function() {
                        _0x17edbf.muted = !_0x17edbf.muted;
                    }, 'mute'), this.bind(_0x2c1832.buttons.fullscreen, 'click', function() {
                        _0x17edbf.fullscreen.toggle();
                    }, 'fullscreen'), this.bind(_0x2c1832.buttons.gamepad, 'click', function() {
                        _0x5ab74d.toggleControls.call(_0x17edbf, false), _0x132da7(_0x2c1832.dialogs.gamepad, false);
                    }, 'mute'), this.bind(_0x2c1832.buttons.saveState, 'click', function() {
                        (async function() {
                            _0xbae705.call(_0x17edbf, _0x17edbf.elements.container, 'savestate-start', false, {});
                            let _0x31e271 = await _0xdcec2a.saveState(),
                                _0x2c1832 = _0xdcec2a.getScreenData();
                            
                            if (_0x378b5c.saveLoadDB.call(_0x17edbf, 'save')) {
                                return;
                            }
                            if (_0x1e2c68.function(_0x17edbf.config.onsavestate)) _0x17edbf.config.onsavestate.call(null, {
                                'screenshot': _0x2c1832,
                                'state': _0x31e271
                            });
                            else {
                                let name = _0x17edbf.getStartName(true).split('/').pop();
                                let data = new Blob([_0x31e271]);
                                if (name.includes('.')) {
                                    name = name.substring(0, name.length-name.split('.').pop().length-1);
                                }
                                if (typeof _0x17edbf.gameName == 'string') {
                                    name = _0x17edbf.gameName
                                }
                                let _0x49f6b6 = name ? '' .concat(name, '.state') : 'game.state';
                                let a = document.createElement('a');
                                a.download = _0x49f6b6;
                                a.href = URL.createObjectURL(data);
                                a.click();
                                setTimeout(function() {
                                    URL.revokeObjectURL(a.href);
                                }, 2000);
                            }
                            _0x17edbf.elements.container.focus();
                        })();
                    	saveSaveFiles();
                    }, 'mute'), this.bind(_0x2c1832.buttons.loadState, 'click', function() {
                        _0xbae705.call(_0x17edbf, _0x17edbf.elements.container, 'loadstate', false, {});
                    }, 'mute'), this.bind(_0x2c1832.buttons.settings, 'click', function(_0x1396ee) {
                        _0x1396ee.stopPropagation(), _0x2593da.toggleMenu.call(_0x17edbf, _0x1396ee);
                    }), this.bind(_0x2c1832.buttons.settings, 'keyup', function(_0x454936) {
                        let _0x2c1832 = _0x454936.which;
                        [0xd, 0x20].includes(_0x2c1832) && (0xd !== _0x2c1832 ? (_0x454936.preventDefault(), _0x454936.stopPropagation(), _0x2593da.toggleMenu.call(_0x17edbf, _0x454936)) : _0x2593da.focusFirstMenuItem.call(_0x17edbf, null, true));
                    }, null, false), this.bind(_0x2c1832.settings.menu, 'keydown', function(_0x40072c) {
                        0x1b === _0x40072c.which && _0x2593da.toggleMenu.call(_0x17edbf, _0x40072c);
                    }), _0x59aa33.isIos) {
                    let _0x4bd188 = _0x23ffa1.call(_0x17edbf, 'input[type="range"]');
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
                        let _0x17edbf = _0x2c1832.controls.getAttribute('data-timer2');
                        clearTimeout(_0x17edbf);
                    } else {
                        let _0x29ba04 = setTimeout(function() {
                            _0x2c1832.controls.pressed = false;
                        }, 0xfa0);
                        _0x2c1832.controls.setAttribute('data-timer2', _0x29ba04);
                    }
                }), this.bind(_0x2c1832.controls, 'focusin focusout', function(_0x54e607) {
                    let _0x466a37 = _0x17edbf.config,
                        _0x2ab6f3 = _0x17edbf.elements,
                        _0x5f0669 = 'focusin' === _0x54e607.type,
                        _0x11de96 = _0x2ab6f3.controls.getAttribute('data-timer');
                    if (_0x3a8e2f(_0x2ab6f3.controls, _0x466a37.classNames.noTransition, _0x5f0669), _0x5ab74d.toggleControls.call(_0x17edbf, _0x5f0669), _0x5f0669) {
                        setTimeout(function() {
                            _0x3a8e2f(_0x2ab6f3.controls, _0x466a37.classNames.noTransition, false);
                        }, 0);
                        let _0x314d11 = _0x31e271.touch ? 0xbb8 : 0xfa0;
                        clearTimeout(_0x11de96), _0x11de96 = setTimeout(function() {
                            return _0x5ab74d.toggleControls.call(_0x17edbf, false);
                        }, _0x314d11), _0x2ab6f3.controls.setAttribute('data-timer', _0x11de96);
                    }
                }), this.bind(_0x2c1832.inputs.volume, 'wheel', function(_0x28b2d2) {
                    let _0x2c1832 = _0x28b2d2.webkitDirectionInvertedFromDevice,
                        _0x12883c = _0x42b437([_0x28b2d2.deltaX, -_0x28b2d2.deltaY].map(function(_0x1ce956) {
                            return _0x2c1832 ? -_0x1ce956 : _0x1ce956;
                        }), 2),
                        _0x247794 = _0x12883c[0],
                        _0x5dcee2 = _0x12883c[1],
                        _0x5691ae = Math.sign(Math.abs(_0x247794) > Math.abs(_0x5dcee2) ? _0x247794 : _0x5dcee2);
                    _0x17edbf.increaseVolume(_0x5691ae / 0x32);
                    let _0x47df17 = _0x17edbf.game.volume;
                    (0x1 === _0x5691ae && _0x47df17 < 1 || -0x1 === _0x5691ae && _0x47df17 > 0) && _0x28b2d2.preventDefault();
                }, 'volume', false), this.bind(_0x2c1832.controls, 'contextmenu', function(_0x1db0c5) {
                    _0x1db0c5.stopPropagation();
                }), this.bind(_0x2c1832.contextMenu, 'contextmenu', function(_0x37851d) {
                    _0x37851d.stopPropagation();
                });
            }
            
        }
        return _0x31e271;
    }();

    function _0x1a3a6c(_0x5a5a15, _0x4e2d69) {
        for (let _0x2c1832 = 0; _0x2c1832 < _0x4e2d69.length; _0x2c1832++) {
            let _0x2e1c57 = _0x4e2d69[_0x2c1832];
            _0x2e1c57.enumerable = _0x2e1c57.enumerable || false, _0x2e1c57.configurable = true, 'value' in _0x2e1c57 && (_0x2e1c57.writable = true), Object.defineProperty(_0x5a5a15, _0x2e1c57.key, _0x2e1c57);
        }
    }
    let _0x3dbc76 = function() {
        function _0x6954aa(_0x28cce1, _0x2ba0e6) {
            return new Promise(async function(resolve, reject) {
                let _0x5938bc = this;
                let _0x2136bc = function(path, isDirectory) {
                    let finpath = window.location.pathname.split('/').pop();
                    let finalpath = window.location.pathname.substring(0, window.location.pathname.length - finpath.length);
                    let split3 = finalpath.split('/')
                    let split2 = path.split('/')
                    let split1 = [ ]
                    for (let i=0; i<split3.length; i++) {
                        if (split3[i] != '') {
                            split1.push(split3[i])
                        }
                    }
                    if (! path.startsWith('/') && !path.includes('://') && !path.includes('http:') && !path.includes('https:') && !path.includes('file:') && !path.includes('blob:')) {
                        for (let w=0; w<split2.length; w++) {
                            if (split2[w] == '' || split2[w] == '.') {
                            } else if (split2[w] == '..') {
                                if (split1.length > 0) {
                                    split1 = function(origpath) {
                                        if (origpath === '/') {
                                            return '/'
                                        } else {
                                            return origpath.substring(0, origpath.length - origpath.split('/').pop().length);
                                        }
                                    }(split1.join('/')).split('/');
                                }
                            } else {
                                split1.push(split2[w]);
                            }
                        }
                        path = split1.join('/')
                        if (! path.startsWith('/')) {
                            path = '/' + path;
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
                this.localization = e => {return e};
                this.version = '3.1.6';
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
                (window.jQuery && this.game instanceof jQuery || _0x1e2c68.nodeList(this.game) || _0x1e2c68.array(this.game)) && (this.game = this.game[0]);
                this.game = this.game;
                this.game.innerHTML = '';
                this.config = _0x5dc0c0({}, _0x39ca5e, _0x6954aa.defaults, _0x2ba0e6 || {});
                if (this.config.settings && this.config.settings.volume) _0x39ca5e.volume = this.config.settings.volume;
                if (this.config.settings && this.config.settings.defaultControllers) _0x378b5c.defaultControllers = this.config.settings.defaultControllers;
                this.coreVer = 1;
                this.lightgun = this.config.lightgun;
                this.loadStateOnStart = this.config.loadStateOnStart || false;
                this.adUrl = this.config.adUrl || null;
                _0x1e2c68.string(this.config.gameName) && (this.gameName = this.config.gameName || null);
                this.mouse = this.config.mouse;
                this.multitap = this.config.multitap;
                this.cheats = this.config.cheats;
                this.cheats || (this.cheats = []);
                let server = function(newServer) {
                    if (typeof newServer === 'string') {
                        if (!newServer.endsWith('/')) newServer+='/';
                        return newServer;
                    } else {
                        return null;
                    }
                }(this.config.netplayUrl);
                this.listUrl = server;
                this.socketUrl = server;

                this.mameCore = this.config.mameCore || null;
                this.color = this.config.color;
                this.startOnLoad = this.config.startOnLoad || false;
                this.statesSupported = this.config.statesSupported || true;
                this.customPaths = function(paths) {
                    if (! paths) return {};
                    let newPaths = {};
                    for (let k in paths) {
                        if (typeof paths[k] == 'string') {
                            newPaths[k] = _0x2136bc(paths[k]);
                        }
                    }
                    return newPaths;
                }(this.config.paths);
                this.dataPath = function(path) {
                    if (typeof path != 'string') {
                        return function(origpath) {
                            let fullrequestpath = origpath
                            let finpath = fullrequestpath.split('/').pop()
                            let finalpath = fullrequestpath.substring(0, fullrequestpath.length - finpath.length)
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
                this.localization = await (async function(dataPath, customPath, lang) {
                    let localJson = {};
                    if (lang && typeof lang == 'string' && lang !== 'en-US') {
                        let url = (customPath && typeof customPath[lang+'.json'] == 'string') ? customPath[lang+'.json'] : dataPath+'localization/'+lang+'.json';
                        try {
                            let res = await fetch(url);
                            let text = await res.text();
                            localJson = JSON.parse(text);
                            _0x39ca5e.i18n = localJson.i18n;
                            _0x7f9f36.normalOptions = localJson.normalOptions;
                        } catch(e) {
                            console.warn('error setting localization', e);
                        }
                    }
                    return function(engText) {
                        if (typeof localJson[engText] == 'string') {
                            return localJson[engText];
                        }
                        if (lang && lang !== 'en-US' && ('undefined' != typeof EJS_DEBUG_XX && true === EJS_DEBUG_XX)) {
                            console.warn('Missing translation for "'+engText+'". Language is set to "'+lang+'"')
                        }
                        return engText;
                    }
                }(this.dataPath, this.customPaths, this.config.lang));
                this.config = _0x5dc0c0({}, _0x39ca5e, _0x6954aa.defaults, _0x2ba0e6 || {});
                Object.keys(this.config.classNames).forEach(function(_0x1d6b41) {
                    let _0x28cce1 = _0x5938bc;
                    if (_0x1e2c68.object(_0x28cce1.config.classNames[_0x1d6b41])) Object.keys(_0x28cce1.config.classNames[_0x1d6b41]).forEach(function(_0x42f7f2) {
                        let _0x2ba0e6 = {};
                        _0x2ba0e6[_0x5938bc.config.classNames[_0x1d6b41][_0x42f7f2]] = true, _0x5938bc.config.classNames[_0x1d6b41][_0x42f7f2] = getClass(_0x2ba0e6);
                    });
                    else {
                        let _0x2ba0e6 = {};
                        _0x2ba0e6[_0x5938bc.config.classNames[_0x1d6b41]] = true, _0x5938bc.config.classNames[_0x1d6b41] = getClass(_0x2ba0e6);
                    }
                });
                this.config.selectors.controls.wrapper = '.' .concat(getClass({
                    'ejs__controls': true
                }));
                this.config.selectors.container = '.' .concat(getClass({
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
                this.config.mute = true;
                this.eventListeners = [];
                this.listeners = new _0x37093c(this);
                this.storage = new _0x2f61ba(this, 'ejs_settings');
                this.game.emulator = this;
                _0x1e2c68.element(this.elements.container) || (this.elements.container = _0x428003('div'), _0x580edd(this.game, this.elements.container));
                let _0x5e63f0 = _0x428003('div', {
                    'class': getClass({
                        'ejs__widgets': true
                    })
                });
                this.elements.container.appendChild(_0x5e63f0);
                let _0x32c8af = _0x428003('div', {
                    'class': getClass({
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
                let webRTC = document.createElement('script');
                webRTC.src = (this.customPaths && typeof this.customPaths['webrtc-adapter.js'] === 'string') ? this.customPaths['webrtc-adapter.js'] : (this.dataPath + 'webrtc-adapter.js');
                document.body.appendChild(webRTC);
                resolve(this);
            }.bind(this))
        }
        let _0x17edbf, _0x2c1832, _0x423c42;
        _0x17edbf = _0x6954aa, _0x423c42 = [{
            'key': 'setup',
            'value': function(_0x3bb461) {
                let _0x2c1832 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    _0x3eda14 = null;
                return _0x1e2c68.string(_0x3bb461) ? _0x3eda14 = Array.from(document.querySelectorAll(_0x3bb461)) : _0x1e2c68.nodeList(_0x3bb461) ? _0x3eda14 = Array.from(_0x3bb461) : _0x1e2c68.array(_0x3bb461) && (_0x3eda14 = _0x3bb461.filter(_0x1e2c68.element)), _0x1e2c68.empty(_0x3eda14) ? null : _0x3eda14.map(function(_0x176f95) {
                    return new _0x6954aa(_0x176f95, _0x2c1832);
                });
            }
        }], (_0x2c1832 = [{
            'key': 'restart',
            'value': function() {
                this.currentTime = 0;
            }
        }, {
            'key': 'increaseVolume',
            'value': function(_0x2881c7) {
                let _0x17edbf = this.game.muted ? 0 : this.volume;
                this.volume = _0x17edbf + (_0x1e2c68.number(_0x2881c7) ? _0x2881c7 : 0);
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
                    let _0x17edbf = void 0 === _0x1c82b4 ? void 0 : !_0x1c82b4,
                        _0x2c1832 = _0x3a8e2f(this.elements.container, this.config.classNames.hideControls, _0x17edbf);
                    return _0x2c1832 && _0x2593da.toggleMenu.call(this, false), !_0x2c1832;
                }
                return false;
            }
        }, {
            'key': 'getStartName',
            'value': function(force) {
                let rv;
                const invalidCharacters = /[#<$+%>!`&*'|{}/\\?"=@:^\r\n]/ig;
                if (this.startName && (force === true || this.startName !== 'rom')) {
                    rv = this.startName;
                } else if (_0x1e2c68.string(this.config.gameUrl) && !this.config.gameUrl.startsWith('blob:')) {
                    rv = this.config.gameUrl.split('/').pop().split('?')[0].replace(invalidCharacters, '');
                } else if (this.gameName) {
                    rv = this.gameName.replace(invalidCharacters, '')+'.'+this.system;
                } else if (this.config.gameId) {
                    rv = this.config.gameId+'.'+this.system;
                } else if (_0x1e2c68.string(this.config.gameUrl) && force === true) {
                    rv = this.config.gameUrl.split('/').pop().split('?')[0].replace(invalidCharacters, '');
                } else if (force === true) {
                    rv = 'rom';
                }
                return rv;
            }
        }, {
            'key': 'loadState',
            'value': function(_0x3c6414) {
                _0xdcec2a.loadState(_0x3c6414, 0);
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
                let _0x6954aa = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
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
                let _0x17edbf = _0x52441c;
                _0x1e2c68.string(_0x17edbf) && (_0x17edbf = Number(_0x17edbf)), _0x1e2c68.number(_0x17edbf) || (_0x17edbf = this.storage.get('volume')), _0x1e2c68.number(_0x17edbf) || (_0x17edbf = this.config.volume), _0x17edbf > 1 && (_0x17edbf = 1), _0x17edbf < 0 && (_0x17edbf = 0), this.config.volume = _0x17edbf, this.game.volume = _0x17edbf, !_0x1e2c68.empty(_0x52441c) && this.muted && _0x17edbf > 0 && (this.muted = false);
            },
            'get': function() {
                return Number(this.game.volume);
            }
        }, {
            'key': 'muted',
            'set': function(_0x218306) {
                let _0x17edbf = _0x218306;
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
