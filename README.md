<h1>emulatorjs</h1>

A javascript emulator for nes, snes, and more!
The BEST emulator on the internet. No ads and self hosted!

Example page: https://coldcast.org/games/1/Super-Mario-Bros

<p>demo: <a href='https://ethanaobrien.github.io/emulatorjs/'>https://ethanaobrien.github.io/emulatorjs/</a></p>
EMULATOR JS PEOPLE - If you want to talk to me about taking this down, you can email me at ethan.a.obrien@gmail.com

<h1>Where did I get this?</h1>
<p>So I found this website called <a href='https://www.emulatorjs.com/'>emulatorjs</a> and I went into inspect and downloaded the resources. I removed the ad server, and made everything work within your own domain.</p>
https://github.com/linuxserver/emulatorjs may soon make it possible to use all this open source

<p>The emulator is not illegal - the rom is - I am not responsible for what people decide to do with this software.</p>

<p>IF SOMETHING DOES NOT WORK - Please make an issue!! Include as many details as possible and please include a log of the console!</p>

NOTE: The screen recording option does not currently support audio! only video recording is supported at this time.

<h1>IF YOU WOULD LIKE ANOTHER SYSTEM</h1>
<p>Check if the system is on <a href='https://www.emulatorjs.com/'>emulatorjs.com</a>. If it is then open an issue asking for the system you would like to emulate.</p>

<h1>HOW TO</h1>

Download this repository (Code > Download as zip) then Extract the contents

<p>MUST HOST ON WEB SERVER!! (I use <a href='https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en'>Web Server for Chrome</a> but you are welcome to use what you like)</p>

If you have questions, ask me and I will clarify (use the issues tab)

Just so you know - You DO NOT NEED the bios for most games / systems, even if it is listed. For some systems, the bios is REQUIRED

Roms can be zipped into .zip archive or .7z archive

TIPS: you can use `blob:` urls, although the save state name will be `game.state`. To have the proper file name add the following line to your configuration.
You can use this without having the gameUrl set to a `blob:` url. Just do the same thing below

```
EJS_gameName = "name of game";
```
When the user saves a state, the state will be saved with the name `name of game.state`


<h1>Supported systems!</h1>
<h2>NES / Famicom</h2>

Code example

```
<div style="width:640px;height:480px;max-width:100%">
  <div id="game"></div>
</div>
<script type="text/javascript">
    EJS_player = '#game';
    EJS_biosUrl = ''; // Url to Famicom Disk System bios
    EJS_gameUrl = ''; // Url to Game rom
    EJS_core = 'nes';
    EJS_lightgun = false; // Lightgun
    EJS_pathtodata = 'data/'; //path to all of the wasm and js files. MUST all be in the same directory!!
</script>
<script src="data/loader.js"></script>
```
Your rom MUST have one of the following extensions

```
.fds
.nes
.unif
.unf
```
You can find the famicon BIOS by looking up the md5 sum which is `ca30b50f880eb660a320674ed365ef7a`
<br><br>
<h2>SNES</h2>

Code Example

```
<div style="width:640px;height:480px;max-width:100%">
        <div id="game"></div>
      </div>
<script type="text/javascript">
    EJS_player = '#game';
    EJS_gameUrl = ''; // Url to Game rom
    EJS_core = 'snes';
    EJS_mouse = false; // SNES Mouse
    EJS_multitap = false; // SNES Multitap
    EJS_pathtodata = 'data/'; //path to all of the wasm and js files. MUST all be in the same directory!!
</script>
<script src="data/loader.js"></script>
```
Your rom MUST have one of the following extensions

```
.smc
.fig
.sfc
.gd3
.gd7
.dx2
.bsx
.swc
```
There is no bios for this system
<br><br>
<h2>Nintendo 64</h2>

Code Example

```
<div style="width:640px;height:480px;max-width:100%">
        <div id="game"></div>
      </div>
<script type="text/javascript">
    EJS_player = '#game';
    EJS_gameUrl = ''; // Url to Game rom
    EJS_core = 'n64';
    EJS_pathtodata = 'data/'; //path to all of the wasm and js files. MUST all be in the same directory!!
</script>
<script src="data/loader.js"></script>
```
I do not know the file extension limits for this system. I know the `.z64` roms work.

There is no bios for this system
<br><br>
<h2>Nintendo Game Boy</h2>

Code example

```
<div style="width:640px;height:480px;max-width:100%">
        <div id="game"></div>
      </div>
<script type="text/javascript">
    EJS_player = '#game';
    EJS_biosUrl = '';
    EJS_gameUrl = ''; // Url to Game rom
    EJS_core = 'gb';
    EJS_pathtodata = 'data/'; //path to all of the wasm and js files. MUST all be in the same directory!!
</script>
<script src="data/loader.js"></script>
```

I do not know the file extension limits for this system.

You can find the Game Boy BIOS by looking up the md5 sum which is `32fbbd84168d3482956eb3c5051637f5`

You can find the Game Boy Color BIOS by looking up the md5 sum which is `dbfce9db9deaa2567f6a84fde55f9680`
<br><br>
<h2>Nintendo Game Boy Advance</h2>

Code example

```
<div style="width:640px;height:480px;max-width:100%">
        <div id="game"></div>
      </div>
<script type="text/javascript">
    EJS_player = '#game';
    EJS_biosUrl = '';
    EJS_gameUrl = ''; // Url to Game rom
    EJS_core = 'gba';
    EJS_pathtodata = 'data/'; //path to all of the wasm and js files. MUST all be in the same directory!!
</script>
<script src="data/loader.js"></script>
```

I do not know the file extension limits for this system.

You can find the Game Boy Advance BIOS by looking up the md5 sum which is `	a860e8c0b6d573d191e4ec7db1b1e4f6`

You can find the Game Boy BIOS by looking up the md5 sum which is `	32fbbd84168d3482956eb3c5051637f5`

You can find the Game Boy Color BIOS by looking up the md5 sum which is `dbfce9db9deaa2567f6a84fde55f9680`

You can find the Super Game Boy BIOS by looking up the md5 sum which is `d574d4f9c12f305074798f54c091a8b4`
<br><br>
<h2>Nintendo DS</h2>

Code example

```
<div style="width:640px;height:480px;max-width:100%">
        <div id="game"></div>
      </div>
<script type="text/javascript">
    EJS_player = '#game';
    EJS_gameUrl = ''; // Url to Game rom
    EJS_core = 'nds';
    EJS_pathtodata = 'data/'; //path to all of the wasm and js files. MUST all be in the same directory!!
</script>
<script src="data/loader.js"></script>
```

I do not know the file extension limits for this system.

There is no bios for this system
<br><br>
<h2>PlayStation</h2>

Code example

```
<div style="width:640px;height:480px;max-width:100%">
        <div id="game"></div>
      </div>
<script type="text/javascript">
    EJS_player = '#game';
    EJS_biosUrl = ''; // Url to Bios file
    EJS_gameUrl = ''; // Url to Game rom
    EJS_core = 'psx';
    EJS_pathtodata = 'data/'; //path to all of the wasm and js files. MUST all be in the same directory!!
</script>
<script src="data/loader.js"></script>
```
Your rom MUST have one of the following extensions

```
.bin
.cue
.img
.mdf
.pbp
.toc
.cbn
.m3u
.ccd
```
You can find the PlayStation 1 JP BIOS by looking up the md5 sum which is `8dd7d5296a650fac7319bce665a6a53c`

You can find the PlayStation 1 US BIOS by looking up the md5 sum which is `490f666e1afb15b7362b406ed1cea246`

You can find the PlayStation 1 EU BIOS by looking up the md5 sum which is `32736f17079d0b2b7024407c39bd3050`
<br><br>
<h2>Virtual Boy</h2>

Code example

```
<div style="width:640px;height:480px;max-width:100%">
        <div id="game"></div>
      </div>
<script type="text/javascript">
    EJS_player = '#game';
    EJS_gameUrl = ''; // Url to Game rom
    EJS_core = 'vb';
    EJS_pathtodata = 'data/'; //path to all of the wasm and js files. MUST all be in the same directory!!
</script>
<script src="data/loader.js"></script>
```

I do not know the file extension limits for this system.

There is no bios for this system
<br><br>
<h2>Sega Mega Drive</h2>

Code example

```
<div style="width:640px;height:480px;max-width:100%">
        <div id="game"></div>
      </div>
<script type="text/javascript">
    EJS_player = '#game';
    EJS_gameUrl = ''; // Url to Game rom
    EJS_core = 'segaMD';
    EJS_pathtodata = 'data/'; //path to all of the wasm and js files. MUST all be in the same directory!!
</script>
<script src="data/loader.js"></script>
```

I do not know the file extension limits for this system.

There is no bios for this system
<br><br>
<h2>Sega Master System</h2>

Code example

```
<div style="width:640px;height:480px;max-width:100%">
        <div id="game"></div>
      </div>
<script type="text/javascript">
    EJS_player = '#game';
    EJS_gameUrl = ''; // Url to Game rom
    EJS_core = 'segaMS';
    EJS_pathtodata = 'data/'; //path to all of the wasm and js files. MUST all be in the same directory!!
</script>
<script src="data/loader.js"></script>
```

I do not know the file extension limits for this system.

bios_E.sms :	MasterSystem EU BIOS (bootrom) - Optional	840481177270d5642a14ca71ee72844c

bios_U.sms : MasterSystem US BIOS (bootrom) - Optional	840481177270d5642a14ca71ee72844c

bios_J.sms : MasterSystem JP BIOS (bootrom) - Optional	24a519c53f67b00640d0048ef7089105
<br><br>

<h2>Sega CD</h2>

Code example

```
<div style="width:640px;height:480px;max-width:100%">
        <div id="game"></div>
      </div>
<script type="text/javascript">
    EJS_player = '#game';
    EJS_gameUrl = ''; // Url to Game rom
    EJS_core = 'segaCD';
    EJS_pathtodata = 'data/'; //path to all of the wasm and js files. MUST all be in the same directory!!
</script>
<script src="data/loader.js"></script>
```

I do not know the file extension limits for this system.

You can find the MegaCD EU BIOS by looking up the md5 sum which is `e66fa1dc5820d254611fdcdba0662372`

You can find the SegaCD US BIOS by looking up the md5 sum which is `854b9150240a198070150e4566ae1290`

You can find the MegaCD EU BIOS by looking up the md5 sum which is `278a9397d192149e84e820ac621a8edd`
<br><br>
<h2>Atari Lynx</h2>

Code example

```
<div style="width:640px;height:480px;max-width:100%">
        <div id="game"></div>
      </div>
<script type="text/javascript">
    EJS_player = '#game';
    EJS_gameUrl = ''; // Url to Game rom
    EJS_core = 'lynx';
    EJS_pathtodata = 'data/'; //path to all of the wasm and js files. MUST all be in the same directory!!
</script>
<script src="data/loader.js"></script>
```

I do not know the file extension limits for this system.

There is no bios for this system
<br><br>
<h2>MSX</h2>

Code example

```
<div style="width:640px;height:480px;max-width:100%">
        <div id="game"></div>
      </div>
<script type="text/javascript">
    EJS_player = '#game';
    EJS_biosUrl = ''; // Url to Bios file
    EJS_gameUrl = ''; // Url to Game rom
    EJS_core = 'msx';
    EJS_pathtodata = 'data/'; //path to all of the wasm and js files. MUST all be in the same directory!!
</script>
<script src="data/loader.js"></script>
```

I do not know the file extension limits for this system.

<p>You can download the 'Databases' and 'Machines' folders from an <a href='http://bluemsx.msxblue.com/download.html'>official full standalone blueMSX emulator installation.</a> Get blueMSXv282full.zip near the bottom of the page.</p>
Compress the 'Databases' and 'Machines' Folders to 7z or zip archive.
<br><br>
<h2>3DO</h2>

Code example

```
<div style="width:640px;height:480px;max-width:100%">
        <div id="game"></div>
      </div>
<script type="text/javascript">
    EJS_player = '#game';
    EJS_biosUrl = ''; // Url to Bios file
    EJS_gameUrl = ''; // Url to Game rom
    EJS_core = '3do';
    EJS_pathtodata = 'data/'; //path to all of the wasm and js files. MUST all be in the same directory!!
</script>
<script src="data/loader.js"></script>
```

Your rom MUST have one of the following extensions

```
.bin
.cue
.iso
```

Panasonic FZ-1	`f47264dd47fe30f73ab3c010015c155b`

Panasonic FZ-10	`51f2f43ae2f3508a14d9f56597e2d3ce`

Panasonic FZ-10	`1477bda80dc33731a65468c1f5bcbee9`

Panasonic FZ-10-E `a48e6746bd7edec0f40cff078f0bb19f`

Panasonic FZ-10-E `cf11bbb5a16d7af9875cca9de9a15e09`

Goldstar GDO-101M	`8639fd5e549bd6238cfee79e3e749114`

Sanyo IMP-21J TRY	`35fa1a1ebaaeea286dc5cd15487c13ea`

Shootout At Old Tucson	`8970fc987ab89a7f64da9f8a8c4333ff`

Panasonic FZ-1 Kanji ROM	`b8dc97f778a6245c58e064b0312e8281`

Panasonic FZ-10JA Kanji ROM	`428577250f43edc902ea239c50d2240d`

Panasonic FZ-1J Kanji ROM	`c23fb5d5e6bb1c240d02cf968972be37`
<br><br>
<h2>Sega 32X</h2>

Code example

```
<div style="width:640px;height:480px;max-width:100%">
        <div id="game"></div>
      </div>
<script type="text/javascript">
    EJS_player = '#game';
    EJS_gameUrl = ''; // Url to Game rom
    EJS_core = 'sega32x';
    EJS_pathtodata = 'data/'; //path to all of the wasm and js files. MUST all be in the same directory!!
</script>
<script src="data/loader.js"></script>
```

I do not know the file extension limits for this system.

There is no bios for this system
<br><br>
<h2>Atari Jaguar</h2>

Code example

```
<div style="width:640px;height:480px;max-width:100%">
        <div id="game"></div>
      </div>
<script type="text/javascript">
    EJS_player = '#game';
    EJS_gameUrl = ''; // Url to Game rom
    EJS_core = 'jaguar';
    EJS_pathtodata = 'data/'; //path to all of the wasm and js files. MUST all be in the same directory!!
</script>
<script src="data/loader.js"></script>
```

I do not know the file extension limits for this system.

There is no bios for this system
<br><br>
<h2>Neo Geo Poket</h2>

Code example

```
<div style="width:640px;height:480px;max-width:100%">
        <div id="game"></div>
      </div>
<script type="text/javascript">
    EJS_player = '#game';
    EJS_gameUrl = ''; // Url to Game rom
    EJS_core = 'ngp';
    EJS_pathtodata = 'data/'; //path to all of the wasm and js files. MUST all be in the same directory!!
</script>
<script src="data/loader.js"></script>
```

I do not know the file extension limits for this system.

There is no bios for this system
<br><br>
<h2>Sega Game Gear</h2>

Code example

```
<div style="width:640px;height:480px;max-width:100%">
        <div id="game"></div>
      </div>
<script type="text/javascript">
    EJS_player = '#game';
    EJS_gameUrl = ''; // Url to Game rom
    EJS_core = 'segaGG';
    EJS_pathtodata = 'data/'; //path to all of the wasm and js files. MUST all be in the same directory!!
</script>
<script src="data/loader.js"></script>
```

I do not know the file extension limits for this system.

GameGear BIOS (bootrom) - Optional	`672e104c3be3a238301aceffc3b23fd6`
<br><br>
<h2>Sega Saturn</h2>

Code example

```
<div style="width:640px;height:480px;max-width:100%">
        <div id="game"></div>
      </div>
<script type="text/javascript">
    EJS_player = '#game';
    EJS_biosUrl = ''; // Url to Bios file
    EJS_gameUrl = ''; // Url to Game rom
    EJS_core = 'segaSaturn';
    EJS_pathtodata = 'data/'; //path to all of the wasm and js files. MUST all be in the same directory!!
</script>
<script src="data/loader.js"></script>
```

I do not know the file extension limits for this system.

Saturn BIOS - Optional	`af5828fdff51384f99b3c4926be27762`
<br><br>
<h2>Atari 7800</h2>

Code example

```
<div style="width:640px;height:480px;max-width:100%">
        <div id="game"></div>
      </div>
<script type="text/javascript">
    EJS_player = '#game';
    EJS_gameUrl = ''; // Url to Game rom
    EJS_core = 'atari7800';
    EJS_pathtodata = 'data/'; //path to all of the wasm and js files. MUST all be in the same directory!!
</script>
<script src="data/loader.js"></script>
```

I do not know the file extension limits for this system.

There is no bios for this system
<br><br>
<h2>Wanderswan | Color</h2>

Code example

```
<div style="width:640px;height:480px;max-width:100%">
        <div id="game"></div>
      </div>
<script type="text/javascript">
    EJS_player = '#game';
    EJS_gameUrl = ''; // Url to Game rom
    EJS_core = 'ws';
    EJS_pathtodata = 'data/'; //path to all of the wasm and js files. MUST all be in the same directory!!
</script>
<script src="data/loader.js"></script>
```

I do not know the file extension limits for this system.

There is no bios for this system
<br><br>
<h2>TurboGrafs-16 | PC Engine</h2>

Code example

```
<div style="width:640px;height:480px;max-width:100%">
        <div id="game"></div>
      </div>
<script type="text/javascript">
    EJS_player = '#game';
    EJS_biosUrl = ''; // Url to Bios file
    EJS_gameUrl = ''; // Url to Game rom
    EJS_core = 'pce';
    EJS_pathtodata = 'data/'; //path to all of the wasm and js files. MUST all be in the same directory!!
</script>
<script src="data/loader.js"></script>
```

I do not know the file extension limits for this system.

syscard3.pce	Super CD-ROM2 System V3.xx - Required	`38179df8f4ac870017db21ebcbf53114`
<br><br>
<h2>Arcade</h2>

Code example

```
<div style="width:640px;height:480px;max-width:100%">
        <div id="game"></div>
      </div>
<script type="text/javascript">
    EJS_player = '#game';
    EJS_biosUrl = ''; // Url to Bios file
    EJS_gameUrl = ''; // Url to Game rom
    EJS_core = 'arcade';
    EJS_pathtodata = 'data/'; //path to all of the wasm and js files. MUST all be in the same directory!!
</script>
<script src="data/loader.js"></script>
```

Use only FBA v0.2.97.42 ROMs set
Important! all roms must use the same name at support list with extension .zip

neogeo.zip	Required for Neo Geo Games	        `410c65b2debdf4f2dac9ea2b23aa496e`

pgm.zip	    Required for IGS Games	            `653e991a39e867354d090c3394157d1c`

isgsm.zip	ISG Selection Master Type 2006 BIOS	`4a56d56e2219c5e2b006b66a4263c01c`

<h2>Atari 2600</h2>

Code example

```
<div style="width:640px;height:480px;max-width:100%">
        <div id="game"></div>
      </div>
<script type="text/javascript">
    EJS_player = '#game';
    EJS_gameUrl = ''; // Url to Game rom
    EJS_core = 'atari2600';
    EJS_pathtodata = 'data/'; //path to all of the wasm and js files. MUST all be in the same directory!!
</script>
<script src="data/loader.js"></script>
```

I do not know the file extension limits for this system.

There is no bios for this system
<br><br>
