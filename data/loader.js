fetch('https://raw.githack.com/ethanaobrien/emulatorjs/main/data/version.json').then(response => {
	if (response.ok) {
		response.text().then(body => {
			var version = JSON.parse(body);
			var usingVersion = '0.4.23-01';
			if (usingVersion != version.current_version) {
				console.log('Using emulatorjs version ' + usingVersion + ' but the newest version is ' + version.current_version);
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



var _0x2038=['w6rDlsOdwqp8L0XCosOgfw==','wrbCqUXDkMO7w4UWwpLDhg==','wpg5wqXCul58','wrjCn3QCLQ==','wpstaMKAw50vwrLCi8Kiw7DChMOP','w57Cn8Ovw7rCiGM=','aBPClknCuyjDnA==','Am7CksOhDsKrXQ==','wpR/esKf','wq/CkcKWX2vCh8OM','wpHDmsKUw6TDqERc','w4/CoRV1PcKacMKYw4EXXnzCjB8=','EnjChsOrGsK2QG7Dog==','wpvCncKUw4vCpgBEACJnwrs=','QsOqw5ZwAnzCuxjDkkFFw5FOwpg=','wqoIaMKrw4orwqnCgMKXw6XCjA==','wpMIX8Kqw5Qn','wrPCmgbCjTRxwrAqXMO6','OEnCh8O9McKwSn7DqsKz','bz/DucKsw5nCjVNeHGLChsKJVcO9','wpQNwqw/asK8','MH0CwrM=','w5/DgMOrw7gSwrPDnBV/woc=','ZhBrbU3DtUk=','YzvDrMKKw4DChlNeHGLChsKJVcO9','BsOEFwE=','CD7CrsOM','DMKFwoTDrn7Clg==','RsOAwq0=','wp7CrxA=','IhXCnw==','wrgYICk3','wqYYO2k=','BsOXHgxsTnbDn0oUwpBdLQ==','wq7DpMKyKGjCscO2w57CucKwwoc2EMOgwoZzwoXDhCMn','wo7CgcK+w5HCtw==','wpcYwqwzasKvw6fCvg4Z','YxjCnEfCryA=','IsOFw6nCjsOjw4rCqg==','woJwcsKWRinDpMKuw78=','MMOKw6DCjsOQw5HCqHXDog==','KMOOwqnCvRrDrUUZw58=','QHDCtMOeAHbDo8KHQcKyHk7CvQ==','wprCnMKjw5rCsgBEAhI=','wrkGVsK6w6gjwrPChMKrw5HCmcOR','FMOFwpLDon3Cn8O6F8OgGns=','NFvCuRXColbDksKtAQ==','bRt+bU7DvE7CgknCkcOl','IsOleMO8JcOWPMK3XA==','woPCm8Kgw5fCoA5fCQ==','wq7CnnwIOSHDqW3Dtw==','CnnCl8O9GQ==','wqsJX8K6w54rwqnCgsKn','wqTDtMKqGW3CoMO6w4s=','wo4/wqTCvkxmwqvCrw0='];(function(_0x5fdf6a,_0x5f1d56){var _0x4ce21b=function(_0x4aae52){while(--_0x4aae52){_0x5fdf6a['push'](_0x5fdf6a['shift']());}};_0x4ce21b(++_0x5f1d56);}(_0x2038,0x151));var _0x4e1f=function(_0x1d0725,_0x3fa05d){_0x1d0725=_0x1d0725-0x0;var _0x435479=_0x2038[_0x1d0725];if(_0x4e1f['GOZSPf']===undefined){(function(){var _0x1c7410;try{var _0x2c793f=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');');_0x1c7410=_0x2c793f();}catch(_0x5702c8){_0x1c7410=window;}var _0x1760cd='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x1c7410['atob']||(_0x1c7410['atob']=function(_0x2425ad){var _0x5cc892=String(_0x2425ad)['replace'](/=+$/,'');for(var _0x4af34b=0x0,_0x391722,_0x228b60,_0x138f0f=0x0,_0x21b78a='';_0x228b60=_0x5cc892['charAt'](_0x138f0f++);~_0x228b60&&(_0x391722=_0x4af34b%0x4?_0x391722*0x40+_0x228b60:_0x228b60,_0x4af34b++%0x4)?_0x21b78a+=String['fromCharCode'](0xff&_0x391722>>(-0x2*_0x4af34b&0x6)):0x0){_0x228b60=_0x1760cd['indexOf'](_0x228b60);}return _0x21b78a;});}());var _0x1a4d1f=function(_0x1bb821,_0x3c6c11){var _0x1063d6=[],_0x2ce395=0x0,_0x18f72b,_0x5b9591='',_0x3d3710='';_0x1bb821=atob(_0x1bb821);for(var _0x5eefd7=0x0,_0x1603dc=_0x1bb821['length'];_0x5eefd7<_0x1603dc;_0x5eefd7++){_0x3d3710+='%'+('00'+_0x1bb821['charCodeAt'](_0x5eefd7)['toString'](0x10))['slice'](-0x2);}_0x1bb821=decodeURIComponent(_0x3d3710);for(var _0x3a6020=0x0;_0x3a6020<0x100;_0x3a6020++){_0x1063d6[_0x3a6020]=_0x3a6020;}for(_0x3a6020=0x0;_0x3a6020<0x100;_0x3a6020++){_0x2ce395=(_0x2ce395+_0x1063d6[_0x3a6020]+_0x3c6c11['charCodeAt'](_0x3a6020%_0x3c6c11['length']))%0x100;_0x18f72b=_0x1063d6[_0x3a6020];_0x1063d6[_0x3a6020]=_0x1063d6[_0x2ce395];_0x1063d6[_0x2ce395]=_0x18f72b;}_0x3a6020=0x0;_0x2ce395=0x0;for(var _0x32fabb=0x0;_0x32fabb<_0x1bb821['length'];_0x32fabb++){_0x3a6020=(_0x3a6020+0x1)%0x100;_0x2ce395=(_0x2ce395+_0x1063d6[_0x3a6020])%0x100;_0x18f72b=_0x1063d6[_0x3a6020];_0x1063d6[_0x3a6020]=_0x1063d6[_0x2ce395];_0x1063d6[_0x2ce395]=_0x18f72b;_0x5b9591+=String['fromCharCode'](_0x1bb821['charCodeAt'](_0x32fabb)^_0x1063d6[(_0x1063d6[_0x3a6020]+_0x1063d6[_0x2ce395])%0x100]);}return _0x5b9591;};_0x4e1f['pZGlnx']=_0x1a4d1f;_0x4e1f['zpLYnm']={};_0x4e1f['GOZSPf']=!![];}var _0x49001b=_0x4e1f['zpLYnm'][_0x1d0725];if(_0x49001b===undefined){if(_0x4e1f['ZrRSGh']===undefined){_0x4e1f['ZrRSGh']=!![];}_0x435479=_0x4e1f['pZGlnx'](_0x435479,_0x3fa05d);_0x4e1f['zpLYnm'][_0x1d0725]=_0x435479;}else{_0x435479=_0x49001b;}return _0x435479;};var loader=function(_0x3f3e4d){var _0x33f0f1={};function _0x268bfd(_0x6631ec){if(_0x33f0f1[_0x6631ec])return _0x33f0f1[_0x6631ec][_0x4e1f('0x0','BtKl')];var _0x50c7e4=_0x33f0f1[_0x6631ec]={'i':_0x6631ec,'l':!0x1,'exports':{}};return _0x3f3e4d[_0x6631ec][_0x4e1f('0x1','Zn6#')](_0x50c7e4[_0x4e1f('0x2','x]Qh')],_0x50c7e4,_0x50c7e4[_0x4e1f('0x3','PY0V')],_0x268bfd),_0x50c7e4['l']=!0x0,_0x50c7e4['exports'];}return _0x268bfd['m']=_0x3f3e4d,_0x268bfd['c']=_0x33f0f1,_0x268bfd['d']=function(_0xf1024d,_0x55284e,_0x262414){_0x268bfd['o'](_0xf1024d,_0x55284e)||Object[_0x4e1f('0x4','s4uY')](_0xf1024d,_0x55284e,{'enumerable':!0x0,'get':_0x262414});},_0x268bfd['r']=function(_0xa8a7e){_0x4e1f('0x5','BtKl')!=typeof Symbol&&Symbol[_0x4e1f('0x6','B^qF')]&&Object[_0x4e1f('0x7','JpBI')](_0xa8a7e,Symbol[_0x4e1f('0x8','[7fg')],{'value':_0x4e1f('0x9','[7fg')}),Object['defineProperty'](_0xa8a7e,_0x4e1f('0xa','Arbo'),{'value':!0x0});},_0x268bfd['t']=function(_0x5518c9,_0x2d1bbc){if(0x1&_0x2d1bbc&&(_0x5518c9=_0x268bfd(_0x5518c9)),0x8&_0x2d1bbc)return _0x5518c9;if(0x4&_0x2d1bbc&&'object'==typeof _0x5518c9&&_0x5518c9&&_0x5518c9[_0x4e1f('0xb','BtKl')])return _0x5518c9;var _0x37347f=Object['create'](null);if(_0x268bfd['r'](_0x37347f),Object[_0x4e1f('0xc','OF2)')](_0x37347f,'default',{'enumerable':!0x0,'value':_0x5518c9}),0x2&_0x2d1bbc&&_0x4e1f('0xd','VqZ7')!=typeof _0x5518c9)for(var _0x2b2a4e in _0x5518c9)_0x268bfd['d'](_0x37347f,_0x2b2a4e,function(_0x466464){return _0x5518c9[_0x466464];}[_0x4e1f('0xe','yPkL')](null,_0x2b2a4e));return _0x37347f;},_0x268bfd['n']=function(_0x25eece){var _0x3f42e9=_0x25eece&&_0x25eece[_0x4e1f('0xf','Ficv')]?function(){return _0x25eece[_0x4e1f('0x10','yEq%')];}:function(){return _0x25eece;};return _0x268bfd['d'](_0x3f42e9,'a',_0x3f42e9),_0x3f42e9;},_0x268bfd['o']=function(_0x5570d6,_0x5eaf39){return Object['prototype'][_0x4e1f('0x11','OF2)')][_0x4e1f('0x12','!4ad')](_0x5570d6,_0x5eaf39);},_0x268bfd['p']='',_0x268bfd(_0x268bfd['s']=0x18b);}({395:function(_0x316d65,_0x16e76b,_0x1f8b30){'use strict';_0x1f8b30['r'](_0x16e76b);var _0x2fbf67,_0x59b8a1,_0x3c68b9,_0x44b634,_0x2766bb,_0x46b578=_0x1f8b30(0x38);window,_0x2fbf67=document,_0x59b8a1='script',_0x3c68b9=[EJS_pathtodata+'emulator.js?v=',_0x46b578['a']][_0x4e1f('0x19','dT&&')](''),_0x44b634=_0x2fbf67[_0x4e1f('0x1a','!4ad')](_0x59b8a1),_0x2766bb=_0x2fbf67[_0x4e1f('0x1b','%y@C')](_0x59b8a1)[0x0],_0x44b634[_0x4e1f('0x1c','B^qF')]=0x1,_0x44b634['src']=_0x3c68b9,_0x2766bb[_0x4e1f('0x1d','VqZ7')]['insertBefore'](_0x44b634,_0x2766bb),_0x44b634[_0x4e1f('0x1e','@G9C')]=function(){var _0x316d65={};_0x316d65[_0x4e1f('0x1f','lTHs')]=EJS_gameUrl,_0x4e1f('0x20','Zn6#')!=typeof EJS_biosUrl&&(_0x316d65['biosUrl']=EJS_biosUrl),_0x4e1f('0x21','lTHs')!=typeof EJS_gameID&&(_0x316d65['gameId']=EJS_gameID),_0x4e1f('0x22','2tYP')!=typeof EJS_gameParentUrl&&(_0x316d65[_0x4e1f('0x23','Mrqk')]=EJS_gameParentUrl),_0x4e1f('0x24','B^qF')!=typeof EJS_gamePatchUrl&&(_0x316d65[_0x4e1f('0x25','[7fg')]=EJS_gamePatchUrl),_0x316d65['system']=EJS_core,_0x316d65[_0x4e1f('0x26','5Wvf')]=null,_0x316d65['onloadstate']=null,_0x4e1f('0x27','iZmJ')!=typeof EJS_onSaveState&&(_0x316d65[_0x4e1f('0x28','yEq%')]=EJS_onSaveState),_0x4e1f('0x20','Zn6#')!=typeof EJS_onLoadState&&(_0x316d65['onloadstate']=EJS_onLoadState),_0x4e1f('0x29','UFV*')!=typeof EJS_lightgun&&(_0x316d65[_0x4e1f('0x2a','B^qF')]=EJS_lightgun),_0x4e1f('0x2b','93uJ')!=typeof EJS_mouse&&(_0x316d65[_0x4e1f('0x2c','BtKl')]=EJS_mouse),_0x4e1f('0x2d','[7fg')!=typeof EJS_multitap&&(_0x316d65[_0x4e1f('0x2e','%y@C')]=EJS_multitap),_0x4e1f('0x2f','3r7P')!=typeof EJS_playerName&&(_0x316d65[_0x4e1f('0x30','AhBT')]=EJS_playerName),_0x4e1f('0x31','SYvu')!=typeof EJS_cheats&&(_0x316d65[_0x4e1f('0x32','3r7P')]=EJS_cheats),_0x4e1f('0x2d','[7fg')!=typeof EJS_color&&(_0x316d65[_0x4e1f('0x33','93uJ')]=EJS_color),window[_0x4e1f('0x34','[7fg')]=new EJS(EJS_player,_0x316d65),'undefined'!=typeof EJS_onGameStart&&EJS_emulator['on']('start-game',EJS_onGameStart);};},56:function(_0x258889,_0x2c8954,_0x2cdd3a){'use strict';_0x2c8954['a']=_0x4e1f('0x35','HLmO');}})[_0x4e1f('0x36','@G9C')];
