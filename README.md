[NES / Famicom]: docs/NES-Famicom.md
[SNES]: docs/SNES.md
[Nintendo 64]: docs/Nintendo%2064.md
[Nintendo Game Boy]: docs/Nintendo%20Game%20Boy.md
[Nintendo Game Boy Advance]: docs/Nintendo%20Game%20Boy%20Advance.md
[Nintendo DS]: docs/Nintendo%20DS.md
[PlayStation]: docs/PlayStation.md
[Virtual Boy]: docs/Virtual%20Boy.md
[Sega Mega Drive]: docs/Sega%20Mega%20Drive.md
[Sega Master System]: docs/Sega%20Master%20System.md
[Sega CD]: docs/Sega%20CD.md
[Atari Lynx]: docs/Atari%20Lynx.md
[MSX]: docs/MSX.md
[3DO]: docs/3DO.md
[Sega 32X]: docs/Sega%2032X.md
[Atari Jaguar]: docs/Atari%20Jaguar.md
[Neo Geo Poket]: docs/Neo%20Geo%20Poket.md
[Sega Game Gear]: docs/Sega%20Game%20Gear.md
[Sega Saturn]: docs/Sega%20Saturn.md
[Atari 7800]: docs/Atari%207800.md
[WanderSwan / Color]: docs/WanderSwan-Color.md
[TurboGrafs-16 / PC Engine]: docs/TurboGrafs%2016-PC%20Engine.md
[Arcade]: docs/Arcade.md
[Atari 2600]: docs/Atari%202600.md



<h1>emulatorjs</h1>

A javascript emulator for nes, snes, and more!
The BEST emulator on the internet. No ads and self hosted!

Example page: https://coldcast.org/games/1/Super-Mario-Bros

<p>demo: <a href='https://ethanaobrien.github.io/emulatorjs/'>https://ethanaobrien.github.io/emulatorjs/</a></p>

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

| Supported Systems |
|:------------------:|
| [NES / Famicom] |
| [SNES] |
| [Nintendo 64] |
| [Nintendo Game Boy] |
| [Nintendo Game Boy Advance] |
| [Nintendo DS] |
| [PlayStation] |
| [Virtual Boy] |
| [Sega Mega Drive] |
| [Sega Master System] |
| [Sega CD] |
| [Atari Lynx] |
| [MSX] |
| [3DO] |
| [Sega 32X] |
| [Atari Jaguar] |
| [Neo Geo Poket] |
| [Sega Game Gear] |
| [Sega Saturn] |
| [Atari 7800] |
| [WanderSwan / Color] |
| [TurboGrafs-16 / PC Engine] |
| [Arcade] |
| [Atari 2600] |
