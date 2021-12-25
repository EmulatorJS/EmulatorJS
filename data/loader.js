fetch('https://raw.githack.com/ethanaobrien/emulatorjs/main/data/version.json').then(response => {
	if (response.ok) {
		response.text().then(body => {
			var version = JSON.parse(body);
			var usingVersion = '0.4.24';
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


var emulatorjs = document.createElement('script')
var scriptTag = document.getElementsByTagName('script')[0]
emulatorjs.async = true
emulatorjs.src = EJS_pathtodata + 'emulator.js?v=' + '0.4.24'
scriptTag.parentNode.insertBefore(emulatorjs, scriptTag)
emulatorjs.onload = function() {
    var config = {};
    config.gameUrl = EJS_gameUrl
    
    'undefined' != typeof EJS_biosUrl && (config.biosUrl = EJS_biosUrl)
    'undefined' != typeof EJS_gameID && (config.gameId = EJS_gameID)
    'undefined' != typeof EJS_gameParentUrl && (config.gameParentUrl = EJS_gameParentUrl)
    'undefined' != typeof EJS_gamePatchUrl && (config.gamePatchUrl = EJS_gamePatchUrl)
    'undefined' != typeof EJS_AdUrl && (config.adUrl = EJS_AdUrl)
    config.system = EJS_core
    config.onsavestate = null
    config.onloadstate = null
    'undefined' != typeof EJS_onSaveState && (config.onsavestate = EJS_onSaveState)
    'undefined' != typeof EJS_onLoadState && (config.onloadstate = EJS_onLoadState)
    'undefined' != typeof EJS_lightgun && (config.lightgun = EJS_lightgun)
    'undefined' != typeof EJS_gameName && (config.gameName = EJS_gameName)
    'undefined' != typeof EJS_mouse && (config.mouse = EJS_mouse)
    'undefined' != typeof EJS_multitap && (config.multitap = EJS_multitap)
    'undefined' != typeof EJS_playerName && (config.playerName = EJS_playerName)
    'undefined' != typeof EJS_cheats && (config.cheats = EJS_cheats)
    'undefined' != typeof EJS_color && (config.color = EJS_color)
    window.EJS_emulator = new EJS(EJS_player, config)
    'undefined' != typeof EJS_onGameStart && EJS_emulator.on('start-game', EJS_onGameStart);
};

