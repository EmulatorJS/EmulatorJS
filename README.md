
# EmulatorJS

Self-hosted **Javascript** emulation for various system.

*If something doesn't work, please consider opening an* ***[Issue]*** <br>
*with as many details as possible, as well as the console log.*

*The* ***Screen Recording*** *option currently doesn't support* ***Audio*** *.*

---

**⸢ [Example Use] ⸥ ⸢ [Emulator Demo] ⸥**

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

| Nintendo | Sega | Atari |   |   |
|:--------:|:----:|:-----:|:-:|:-:|
| **[Game Boy<br>Advance][Nintendo Game Boy Advance]** | **[Master<br>System][Sega Master System]** | **[Jaguar][Atari Jaguar]** | **[TurboGrafs 16<br>PC Engine][TurboGrafs-16 / PC Engine]** | **[MSX]**
| **[Game Boy][Nintendo Game Boy]** | **[Mega<br>Drive][Sega Mega Drive]** | **[Lynx][Atari Lynx]** | **[WanderSwan<br>Color][WanderSwan / Color]** | **[3DO]**
| **[Famicom <br> NES][NES / Famicom]** | **[Game<br>Gear][Sega Game Gear]** | **[7800][Atari 7800]** | **[Neo Geo<br>Poket][Neo Geo Poket]**
| **[Virtual<br>Boy][Virtual Boy]** | **[Saturn][Sega Saturn]** | **[2600][Atari 2600]** | **[PlayStation]**
| **[SNES]** | **[32X][Sega 32X]** | | **[Arcade]**
| **[DS][Nintendo DS]** | **[CD][Sega CD]** |
| **[64][Nintendo 64]**

*If your system is not listed here, navigate to* ***[EmulatorJS.com][EJS]*** *,* <br>
*check if it's available there and if it is, simply open an* ***[Issue]*** *.*

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

##### BIOS

Some **Games** and **Systems** require <br>
a `BIOS`, though most usually ***don't***.

<br>

##### ROMs

**ROMs** can be used as `zip` / `rar` / `7z` archives.

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

<!----------------------------------------------------------------------------->

[Example Use]: https://coldcast.org/games/1/Super-Mario-Bros
[Emulator Demo]: https://ethanaobrien.github.io/emulatorjs/

[Issue]: https://github.com/ethanaobrien/emulatorjs/issues
[This repository]: https://github.com/linuxserver/emulatorjs

[EJS]: https://www.emulatorjs.com/

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
