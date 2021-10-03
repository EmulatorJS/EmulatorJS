fetch('https://raw.githack.com/ethanaobrien/emulatorjs/main/data/version.json').then(response => {
	if (response.ok) {
		response.text().then(body => {
			var version = JSON.parse(body);
			var usingVersion = '0.4.23-05';
			if (usingVersion != version.current_version) {
				console.log('Using emulatorjs version ' + usingVersion + ' but the newest version is ' + version.current_version + '\n\nopen https://github.com/ethanaobrien/emulatorjs to update');
			};
		});
	};
});

if (! window.EJS_pathtodata) {
	EJS_pathtodata = './'
}
var path2Send = EJS_pathtodata
var finpath = window.location.pathname.split('/').pop();
var finalpath = window.location.pathname.substring(0, window.location.pathname.length - finpath.length);
var split3 = finalpath.split('/')
var split2 = path2Send.split('/')
var split1 = [ ]
for (var i=0; i<split3.length; i++) {
	if (split3[i] != '') {
		split1.push(split3[i])
	}
}
if (! path2Send.startsWith('/') && path2Send.split('://').length == 1 && path2Send.split('http:').length == 1 && path2Send.split('https:').length == 1) {
	for (var w=0; w<split2.length; w++) {
		if (split2[w] == '' || split2[w] == '.') {
		} else if (split2[w] == '..') {
			if (split1.length > 0) {
			var split1 = split1.splice(-1,1)
		}
		} else {
			split1.push(split2[w])
		}
	}
	var path2Send = split1.join('/')
	if (! path2Send.startsWith('/')) {
		var path2Send = '/' + path2Send
	}
	path2Send = window.location.protocol + '//' + window.location.host + path2Send
	EJS_pathtodata = path2Send
}
if (EJS_pathtodata.startsWith('/')) {
	EJS_pathtodata = window.location.protocol + '//' + window.location.host + path2Send
}

if (!EJS_pathtodata.endsWith('/')) {
	EJS_pathtodata = EJS_pathtodata+'/'
}
console.log('Path to data is set to ' + EJS_pathtodata)


window.getHeadGameInfo = function(normalFunc, url) {
	if (! url.startsWith('blob:')) {
		return normalFunc(url, {})
	} else {
		return async function() {
			//console.log('blob url')
			var a = await fetch(url)
			var a = await a.blob()
			return {headers:{'content-length': a.size, 'content-type': 'text/plain'}}
		}();
	}
}

window.readAsBufferrr = function(fileBlob) {
    return new Promise(function(resolve, reject) {
        var reader = new FileReader()
        reader.onload = function(e) {
            resolve(e.target.result)
        }
        reader.readAsArrayBuffer(fileBlob)
    })
}

window.EJS_loadStateFromURL = async function() {
    if (! window.EJS_loadStateURL) {return}
    var a = await fetch(EJS_loadStateURL)
    var a = await a.blob()
    var a = await readAsBufferrr(a)
    var a = new Uint8Array(a)
    EJS_loadState(a)
}

var loader = function(_0x3f3e4d) {
    var _0x33f0f1 = {};

    function _0x268bfd(_0x6631ec) {
        if (_0x33f0f1[_0x6631ec]) return _0x33f0f1[_0x6631ec]['exports'];
        var _0x50c7e4 = _0x33f0f1[_0x6631ec] = {
            'i': _0x6631ec,
            'l': !0x1,
            'exports': {}
        };
        return _0x3f3e4d[_0x6631ec]['call'](_0x50c7e4['exports'], _0x50c7e4, _0x50c7e4['exports'], _0x268bfd), _0x50c7e4['l'] = !0x0, _0x50c7e4['exports'];
    }
    return _0x268bfd['m'] = _0x3f3e4d, _0x268bfd['c'] = _0x33f0f1, _0x268bfd['d'] = function(_0xf1024d, _0x55284e, _0x262414) {
        _0x268bfd['o'](_0xf1024d, _0x55284e) || Object['defineProperty'](_0xf1024d, _0x55284e, {
            'enumerable': !0x0,
            'get': _0x262414
        });
    }, _0x268bfd['r'] = function(_0xa8a7e) {
        'undefined' != typeof Symbol && Symbol['toStringTag'] && Object['defineProperty'](_0xa8a7e, Symbol['toStringTag'], {
            'value': 'Module'
        }), Object['defineProperty'](_0xa8a7e, '__esModule', {
            'value': !0x0
        });
    }, _0x268bfd['t'] = function(_0x5518c9, _0x2d1bbc) {
        if (0x1 & _0x2d1bbc && (_0x5518c9 = _0x268bfd(_0x5518c9)), 0x8 & _0x2d1bbc) return _0x5518c9;
        if (0x4 & _0x2d1bbc && 'object' == typeof _0x5518c9 && _0x5518c9 && _0x5518c9['__esModule']) return _0x5518c9;
        var _0x37347f = Object['create'](null);
        if (_0x268bfd['r'](_0x37347f), Object['defineProperty'](_0x37347f, 'default', {
                'enumerable': !0x0,
                'value': _0x5518c9
            }), 0x2 & _0x2d1bbc && 'string' != typeof _0x5518c9)
            for (var _0x2b2a4e in _0x5518c9) _0x268bfd['d'](_0x37347f, _0x2b2a4e, function(_0x466464) {
                return _0x5518c9[_0x466464];
            }['bind'](null, _0x2b2a4e));
        return _0x37347f;
    }, _0x268bfd['n'] = function(_0x25eece) {
        var _0x3f42e9 = _0x25eece && _0x25eece['__esModule'] ? function() {
            return _0x25eece['default'];
        } : function() {
            return _0x25eece;
        };
        return _0x268bfd['d'](_0x3f42e9, 'a', _0x3f42e9), _0x3f42e9;
    }, _0x268bfd['o'] = function(_0x5570d6, _0x5eaf39) {
        return Object['prototype']['hasOwnProperty']['call'](_0x5570d6, _0x5eaf39);
    }, _0x268bfd['p'] = '', _0x268bfd(_0x268bfd['s'] = 0x18b);
}({
    395: function(_0x316d65, _0x16e76b, _0x1f8b30) {
        'use strict';
        _0x1f8b30['r'](_0x16e76b);
        var _0x2fbf67, _0x59b8a1, _0x3c68b9, _0x44b634, _0x2766bb, _0x46b578 = _0x1f8b30(0x38);
        window, _0x2fbf67 = document, _0x59b8a1 = 'script', _0x3c68b9 = [EJS_pathtodata + 'emulator.js?v=', _0x46b578['a']]['join'](''), _0x44b634 = _0x2fbf67['createElement'](_0x59b8a1), _0x2766bb = _0x2fbf67['getElementsByTagName'](_0x59b8a1)[0x0], _0x44b634['async'] = 0x1, _0x44b634['src'] = _0x3c68b9, _0x2766bb['parentNode']['insertBefore'](_0x44b634, _0x2766bb), _0x44b634['onload'] = function() {
            var _0x316d65 = {};
            _0x316d65['gameUrl'] = EJS_gameUrl, 'undefined' != typeof EJS_biosUrl && (_0x316d65['biosUrl'] = EJS_biosUrl), 'undefined' != typeof EJS_gameID && (_0x316d65['gameId'] = EJS_gameID), 'undefined' != typeof EJS_gameParentUrl && (_0x316d65['gameParentUrl'] = EJS_gameParentUrl), 'undefined' != typeof EJS_gamePatchUrl && (_0x316d65['gamePatchUrl'] = EJS_gamePatchUrl), _0x316d65['system'] = EJS_core, _0x316d65['onsavestate'] = null, _0x316d65['onloadstate'] = null, 'undefined' != typeof EJS_onSaveState && (_0x316d65['onsavestate'] = EJS_onSaveState), 'undefined' != typeof EJS_onLoadState && (_0x316d65['onloadstate'] = EJS_onLoadState), 'undefined' != typeof EJS_lightgun && (_0x316d65['lightgun'] = EJS_lightgun), 'undefined' != typeof EJS_mouse && (_0x316d65['mouse'] = EJS_mouse), 'undefined' != typeof EJS_multitap && (_0x316d65['multitap'] = EJS_multitap), 'undefined' != typeof EJS_playerName && (_0x316d65['playerName'] = EJS_playerName), 'undefined' != typeof EJS_cheats && (_0x316d65['cheats'] = EJS_cheats), 'undefined' != typeof EJS_color && (_0x316d65['color'] = EJS_color), window['EJS_emulator'] = new EJS(EJS_player, _0x316d65), 'undefined' != typeof EJS_onGameStart && EJS_emulator['on']('start-game', EJS_onGameStart);
        };
    },
    56: function(_0x258889, _0x2c8954, _0x2cdd3a) {
        'use strict';
        _0x2c8954['a'] = '0.4.23';
    }
})['default'];
