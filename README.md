<div align = center>

<img width = 300 src = docs/Logo-light.png#gh-dark-mode-only>
<img width = 300 src = docs/Logo.png#gh-light-mode-only> 
 
<br>
<br>

[![Badge License]][License]

Self-hosted **Javascript** emulation for various systems.

<br>

[![Button Website]][Website]
[![Button Usage]][Usage]<br>
[![Button Configurator]][Configurator]<br>
[![Button Demo]][Demo]<br>
[![Button Contributors]][Contributors]

Join our Discord server:

[![Join our Discord server!](https://invidget.switchblade.xyz/6akryGkETU)](https://discord.gg/6akryGkETU)

Or the Matrix server (#emulatorjs:matrix.emulatorjs.org):

<a href="https://matrix.to/#/#emulatorjs:matrix.emulatorjs.org" rel="noopener" target="_blank"><img src="https://matrix.to/img/matrix-badge.svg" alt="Chat on Matrix"></a>

</div>

<br>

> [!NOTE]  
> **As of EmulatorJS version 4.0, this project is no longer a reverse-engineered version of the emulatorjs.com project. It is now a complete rewrite.**

> [!WARNING]  
> As of version 4.0.9 cores and minified files are no longer included in the repository. You will need to get them separately. You can get it from [releases](https://github.com/EmulatorJS/EmulatorJS/releases) or the \* new CDN (see [this](#CDN) for more info). There is also a new version system that we will be using. (read [here](#Versioning) for more info).

> [!TIP]
> Cloning the repository is no longer recommended for production use. You should use [releases](https://github.com/EmulatorJS/EmulatorJS/releases) or the [CDN](https://cdn.emulatorjs.org/) instead.

<br>

### Ads

*This project has no ads.* <br>
*Although, the demo page currently has an ad to help fund this project.* <br>
*Ads on the demo page may come and go depending on how many people are* <br>
*funding this project.* <br>

*You can help fund this project on* ***[patreon]***

<br>

### Issues

*If something doesn't work, please consider opening an* ***[Issue]*** <br>
*with as many details as possible, as well as the console log.*

<br>

### 3rd Party Projects

EmulatorJS itself is built to be a plugin, rather than an entire website. This is why there is no docker container of this project. However, there are several projects you can use that use EmulatorJS!

Looking for projects that integrate EmulatorJS? Check out https://emulatorjs.org/docs/3rd-party

<br>

### Versioning

There are three different version names that you need to be aware of:

1. **stable** - This will be the most stable version of the emulator both code and cores will be tested before release. It will be updated every time a new version is released on GitHub. This is the default version on the Demo.
2. **latest** - This will contain the latest code but use the stable cores. This will be updated every time the *main* branch is updated.
3. **nightly** - This will contain the latest code and the latest cores. The cores will be updated every day, so this is considered alpha.

<br>

### CDN

**EmulatorJS provides a CDN** at `https://cdn.emulatorjs.org/`, allowing access to any version of the emulator.

To use it, set `EJS_pathtodata` to `https://cdn.emulatorjs.org/<version>/data/`, replacing `<version>` with `stable`, `latest`, `nightly`, or another main release.

Be sure to also update the `loader.js` path to:
`https://cdn.emulatorjs.org/<version>/data/loader.js`

<br>

### Development:

*Run a local server with:* 

1. Open a terminal in the root of the project.

2. Install the dependencies with:

   ```sh
   npm i
   ```

3. Start the minification with:

   ```sh
   node start
   ```

4. Open your browser and go to `http://localhost:8080/` to see the demo page.

<br>

<br>

#### Minifying

Before pushing the script files onto your production server it is recommended to minify them to save on load times as well as bandwidth.

Read the [minifying](minify/README.md) documentation for more info.

<br>

#### Localization

If you want to help with localization, please check out the [localization](data/localization/README.md) documentation.

<br>

**>> When reporting bugs, please specify what version you are using**

<br>
<br>
<br>

<h1 align = center>Supported Systems</h1>

<br>

<div align = center>

### Nintendo

**[Game Boy Advance][Nintendo Game Boy Advance]**   | 
**[Famicom / NES][NES / Famicom]**   | 
**[Virtual Boy][Virtual Boy]**
    
**[Game Boy][Nintendo Game Boy]**   | 
**[SNES]**   | 
**[DS][Nintendo DS]**   | 
**[64][Nintendo 64]**

<br>
<br>

### Sega

**[Master System][Sega Master System]**   | 
**[Mega Drive][Sega Mega Drive]**   | 
**[Game Gear][Sega Game Gear]**
    
**[Saturn][Sega Saturn]**   | 
**[32X][Sega 32X]**   | 
**[CD][Sega CD]**

<br>
<br>

### Atari

**[2600][Atari 2600]**   | 
**[5200][Atari 5200]**   | 
**[7800][Atari 7800]**   | 
**[Lynx][Atari Lynx]**   | 
**[Jaguar][Atari Jaguar]**

<br>
<br>

### Commodore

**[Commodore 64]** |
**[Commodore 128]** |
**[Commodore Amiga]**

**[Commodore PET]** |
**[Commodore Plus/4]** |
**[Commodore VIC-20]**

<br>
<br>

### Other

**[PlayStation]**   | 
**[PlayStation Portable]**   | 
**[Arcade]**    

**[3DO]** |
**[MAME 2003]** |
**[ColecoVision]**

</div>

<br>

## Star History

<a href="https://star-history.com/#EmulatorJS/EmulatorJS&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=EmulatorJS/EmulatorJS&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=EmulatorJS/EmulatorJS&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=EmulatorJS/EmulatorJS&type=Date" />
 </picture>
</a>

<!-- 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 --->

[License]: LICENSE
[Issue]: https://github.com/ethanaobrien/emulatorjs/issues
[patreon]: https://patreon.com/EmulatorJS

<!-- 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮   Quicklinks   🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 --->

[Configurator]: https://emulatorjs.org/editor
[Contributors]: docs/contributors.md
[Website]: https://emulatorjs.org/
[Usage]: https://emulatorjs.org/docs/
[Demo]: https://demo.emulatorjs.org/


<!-- 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮  Systems  🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 -->

[Nintendo Game Boy Advance]: https://emulatorjs.org/docs/systems/nintendo-game-boy-advance
[Nintendo Game Boy]: https://emulatorjs.org/docs/systems/nintendo-game-boy
[Nintendo 64]: https://emulatorjs.org/docs/systems/nintendo-64
[Nintendo DS]: https://emulatorjs.org/docs/systems/nintendo-ds

[Sega Master System]: https://emulatorjs.org/docs/systems/sega-master-system
[Sega Mega Drive]: https://emulatorjs.org/docs/systems/sega-mega-drive
[Sega Game Gear]: https://emulatorjs.org/docs/systems/sega-game-gear
[Sega Saturn]: https://emulatorjs.org/docs/systems/sega-saturn
[Sega 32X]: https://emulatorjs.org/docs/systems/sega-32x
[Sega CD]: https://emulatorjs.org/docs/systems/sega-cd

[Atari Jaguar]: https://emulatorjs.org/docs/systems/atari-jaguar
[Atari Lynx]: https://emulatorjs.org/docs/systems/atari-lynx
[Atari 7800]: https://emulatorjs.org/docs/systems/atari-7800
[Atari 2600]: https://emulatorjs.org/docs/systems/atari-2600
[Atari 5200]: https://emulatorjs.org/docs/systems/atari-5200

[NES / Famicom]: https://emulatorjs.org/docs/systems/nes-famicom
[SNES]: https://emulatorjs.org/docs/systems/snes

<!--
[TurboGrafs-16 / PC Engine]: https://emulatorjs.org/systems/TurboGrafx-16
[MSX]: https://emulatorjs.org/systems/MSX
[WanderSwan / Color]: https://emulatorjs.org/systems/WonderSwan
[Neo Geo Poket]: https://emulatorjs.org/systems/Neo%20Geo%20Pocket
--->
[PlayStation]: https://emulatorjs.org/docs/systems/playstation
[PlayStation Portable]: https://emulatorjs.org/docs/systems/psp
[Virtual Boy]: https://emulatorjs.org/docs/systems/virtual-boy
[Arcade]: https://emulatorjs.org/docs/systems/arcade
[3DO]: https://emulatorjs.org/docs/systems/3do
[MAME 2003]: https://emulatorjs.org/docs/systems/mame-2003
[ColecoVision]: https://emulatorjs.org/docs/systems/colecovision

[Commodore 64]: https://emulatorjs.org/docs/systems/commodore-64
[Commodore 128]: https://emulatorjs.org/docs/systems/commodore-128
[Commodore Amiga]: https://emulatorjs.org/docs/systems/commodore-amiga
[Commodore PET]: https://emulatorjs.org/docs/systems/commodore-pet
[Commodore Plus/4]: https://emulatorjs.org/docs/systems/commodore-plus4
[Commodore VIC-20]: https://emulatorjs.org/docs/systems/commodore-vic20


<!-- 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮  Badges  🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 --->

[Badge License]: https://img.shields.io/badge/License-GPLv3-blue.svg?style=for-the-badge

[Button Configurator]: https://img.shields.io/badge/Code%20Generator-992cb3?style=for-the-badge
[Button Contributors]: https://img.shields.io/badge/Contributors-54b7dd?style=for-the-badge
[Button Website]: https://img.shields.io/badge/Website-736e9b?style=for-the-badge
[Button Usage]: https://img.shields.io/badge/Usage-2478b5?style=for-the-badge
[Button Demo]: https://img.shields.io/badge/Demo-528116?style=for-the-badge
[Button Beta]: https://img.shields.io/badge/Beta-bb044f?style=for-the-badge
