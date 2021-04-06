<h1>emulatorjs</h1>

A javascript emulator for nes, snes, and more!

<p>demo: <a href=https://ethanaobrien.github.io/emulatorjs/>https://ethanaobrien.github.io/emulatorjs/</a></p>

<h1>Where did I get this?</h1>
<p>So I found this website called <a href=https://www.emulatorjs.com/>emulatorjs</a> and I went into inspect and downloaded the resources. I removed the ad server, and made everything work within your own domain.</p>
<p>EMULATOR JS PEOPLE if you see this and do not want it up just make an issue and I will take it down.</p>


<h1>IF YOU WOULD LIKE ANOTHER SYSTEM</h1>
<p>Check if the system is on <a href=https://www.emulatorjs.com/>emulatorjs.com</a>. If it is then open an issue asking for the system you would like to emulate.</p>

<h1>HOW TO</h1>

Download this repository (Code > Download as zip) then Extract the contents

<p>MUST HOST ON WEB SERVER!! (I use <a href=https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en>Web Server for Chrome</a> but you are welcome to use what you like)</p>

All of the paths are relative, all files MUST stay where they are

The html that has the emulator embedded in it MUST be in the same directory as all of the files.

If you have questions, ask me and I will clarify (use the issues tab)

Just so you know - You DO NOT NEED the bios for most games / systems, even if it is listed.

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
</script>
<script src="loader.js"></script>
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
</script>
<script src="loader.js"></script>
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
</script>
<script src="loader.js"></script>
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
</script>
<script src="loader.js"></script>
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
</script>
<script src="loader.js"></script>
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
</script>
<script src="loader.js"></script>
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
</script>
<script src="loader.js"></script>
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
</script>
<script src="loader.js"></script>
```

I do not know the file extension limits for this system.

There is no bios for this system
