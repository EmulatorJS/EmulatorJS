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



# emulatorjs

A javascript emulator for nes, snes, and more!
The BEST emulator on the internet. No ads and self hosted!

Example page: https://coldcast.org/games/1/Super-Mario-Bros

<p>demo: <a href='https://ethanaobrien.github.io/emulatorjs/'>https://ethanaobrien.github.io/emulatorjs/</a></p>

## Where did I get this?

So I found this website called [emulatorjs](https://www.emulatorjs.com/) and I went into inspect and downloaded the resources. I removed the ad server, and made everything work within your own domain.
https://github.com/linuxserver/emulatorjs may soon make it possible to use all this open source

The emulator is not illegal - the rom is - I am not responsible for what people decide to do with this software.

NOTE: The screen recording option does not currently support audio! only video recording is supported at this time.

## How To

1. Download this repository (Code > Download as zip) then Extract the contents
2. Load into a web server and open localhost

If you have questions, ask me and I will clarify (use the issues tab). Please search to make sure your isuue hasnt already been asked

IF SOMETHING DOES NOT WORK - Please make an issue!! Include as many details as possible and please include a log of the console!

All roms can be zipped into a `.zip`, `.rar`, or `.7z` archive


NETPLAY IS DISABLED BY DEFAULT. To enable, add this line to your code

```
EJS_gameID = 1; // ID in your website, required for netplay.
```


## Supported systems!

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

## More Features

To customize the filename of save states, add the line of code below

```
EJS_gameName = 'name of game';
```
When the user saves a state, the state will be saved with the name `name of game.state`

<br>

To add an ad to the play now screen, add the following line to your code

```
EJS_AdUrl = ''; //path to AD page
```

<br>

To change the default color of the emulator interface, add the line below

```
EJS_color = ''; //hex color id
```
You can set the color to a hex color code, for example `#FF0000` (red)

<br>

To start the emulator immediately, add this line to your code

```
EJS_startOnLoaded = true;
```
This will start the emulator instantly
Please note, the Audio cannot start until the user interacts with the page

<br>

To specify an exact path for a file, add this line to your code

```
EJS_paths = {
    "fileName": "/somepath",
    "emulator.js": "https://example.com/emulator.js",
    "n64-asmjs.data": "/asdfds.data"
}
```
If a file is not defined, it be set to default
