
# EmulatorJS

Self-hosted **Javascript** emulation for various system.

<br>

*If something doesn't work, please consider opening an* ***[Issue]*** <br>
*with as many details as possible, as well as the console log.*

*The* ***Screen Recording*** *option currently doesn't support* ***Audio*** *.*

---

**⸢ [Example Use] ⸥ ⸢ [Emulator Demo] ⸥ ⸢ [Beta] ⸥**

---

## Where Did I Get This?

> So I found this website called [EmulatorJS.com][EJS] and <br>
> I went into inspect and downloaded the resources.<br>
> <br>
> I removed the ad server, and made everything work within your own domain.<br>
> <br>
> [This repository] may soon make it possible to use all this open source.<br>
> <br>
> The emulator is not illegal - the rom is - I am not responsible <br>
> for what people decide to do with this software.

---

## Supported Systems

#### Nintendo

**[Game Boy Advance][Nintendo Game Boy Advance]** | **[Famicom / NES][NES / Famicom]** | **[Virtual Boy][Virtual Boy]** | **[Game Boy][Nintendo Game Boy]** | **[SNES]** | **[DS][Nintendo DS]** | **[64][Nintendo 64]**

#### Sega
**[Master System][Sega Master System]** | **[Mega Drive][Sega Mega Drive]** | **[Game Gear][Sega Game Gear]** | **[Saturn][Sega Saturn]** | **[32X][Sega 32X]** | **[CD][Sega CD]**

#### Atari

**[Jaguar][Atari Jaguar]** | **[Lynx][Atari Lynx]** | **[7800][Atari 7800]** | **[2600][Atari 2600]**

#### Other

**[TurboGrafs 16 PC Engine][TurboGrafs-16 / PC Engine]** | **[WanderSwan Color][WanderSwan / Color]** | **[Neo Geo Poket][Neo Geo Poket]** | **[PlayStation]** | **[Arcade]** | **[MSX]** | **[3DO]**

---


## Usage

*For questions please use the* ***[Issue]*** *tab.*

<br>

##### Setup

1. Download this repository.<br>
    *`Code ➞ Download As Zip`*

2. Use a **WebServer** to host the emulator.

3. Use your **Browser** to navigate to `localhost`

<br>

##### ROMs

**ROMs** can be used as `zip` / `rar` / `7z` archives.

<br>

##### Netplay

By default **Netplay** is ***disabled***, <br>
to enable it, add the following:

```js
// ID in your website, required for netplay. Each game in your site should have a different ID
EJS_gameID = 1;
```

<br>

*I have successfully rewrote the server side portion* <br>
*of netplay, which you can now use to self host!*

1. Download the **[Server]**.

2. Specify the servers address with:

```js
EJS_netplayUrl = 'http://localhost:3000/'; // Absolute Url To Your Netplay Server
```

<br>

##### Custom Saves

To customize the filename of save states <br>
simply add the following lines of code.

```js
EJS_gameName = `Game Name`;
```

**➞ Save Filename:** `Game Name.state`

<br>

##### AD

To place an advertisement in front of the <br>
`play now` screen, include the following line:

```js
EJS_AdUrl = `URL`;
```

<br>

##### Interface Color

To use a different color for the emulator interface, use:

```js
EJS_color = '#FF0000'; // Hex Color Code
```

<br>

##### Direct Start

To start the emulator immediately, add this line:

```js
EJS_startOnLoaded = true;
```

*For audio to play the user still* <br>
*needs to interact with the page.*

<br>

##### Custom Paths

Paths to emulator files can be customized with:

```js
EJS_paths = {
    'fileName' : '/somepath',
    'emulator.js' : 'https://example.com/emulator.js',
    'n64-asmjs.data' : '/asdfds.data'
};
```

*If a file is not defined, the default is used.*

<br>

##### USING MAME SYSTEM

you must add the line

```
EJS_core = 'mame';
```

and the line

```
EJS_mameCore = '' // mame core options (example: '4|0')
```
set the mame core value to the mame core number (`1` - `6`) + `|` + save states supported (`0` or `1`)

<br>

# LICENSE

Licenced under the Apache License 2.0

Read the whole license [here](LICENSE)


<!----------------------------------------------------------------------------->

[Example Use]: https://coldcast.org/games/1/Super-Mario-Bros
[Emulator Demo]: https://ethanaobrien.github.io/emulatorjs/
[Beta]: https://emulatorjs.netlify.app/

[Issue]: https://github.com/ethanaobrien/emulatorjs/issues
[This repository]: https://github.com/linuxserver/emulatorjs

[EJS]: https://www.emulatorjs.com/

[Server]: https://github.com/ethanaobrien/emuserver/releases

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
