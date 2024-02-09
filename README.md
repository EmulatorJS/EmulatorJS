
<div align = center>

<img width = 300 src = docs/Logo-light.png#gh-dark-mode-only>
<img width = 300 src = docs/Logo.png#gh-light-mode-only> 
 
<br>
<br>

[![Badge License]][License]
    
    
Self-hosted **Javascript** emulation for various system.

<br>

[![Button Website]][Website] 
[![Button Usage]][Usage]<br>
[![Button Configurator]][Configurator]<br>
[![Button Demo]][Demo] 
[![Button Legacy]][Legacy]
    
[![Button Contributors]][Contributors]   
 
Join our Discord server:

[![Join our Discord server!](https://invidget.switchblade.xyz/6akryGkETU)](https://discord.gg/6akryGkETU)

</div>

<br>

> [!NOTE]  
> **As of EmulatorJS version 4.0, this project is no longer a reverse-engineered version of the emulatorjs.com project. It is now a complete re-write.**

> [!WARNING]  
> As of version 4.0.9 cores and minified files are no longer included in the repository. You will need to get them separately. You can get the from [releases](https://github.com/EmulatorJS/EmulatorJS/releases) or the * new CDN (see [this](#CDN) for more info). There is also a new version system that we will be using. (read [here](#Versioning) for more info).
>
> The history of the project has been rewritten and force pushed. You will likely need to redo any active commits you have. Sorry for the inconvenience.

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

### Versioning
There are 3 different version name that you need to be aware of:
1. **stable** - This will be the most stable version of the emulator both code and cores will be tested before release. It will be updated every time a new version is released on GitHub. This is the default version on the Demo.
2. **latest** - This will contain the latest code but use the stable cores. This will be updated every time the *main* branch is updated.
3. **nightly** - This will contain the latest code and the latest cores. The cores will be updated every day, so this is consiterd alpha.

### CDN
There is a new CDN that you can use to get any version of the emulator. The cdn is `https://cdn.emulatorjs.org/`. You can use this to get the stable, latest, nightly and any other main version by setting your `EJS_pathtodata` to `https://cdn.emulatorjs.org/<version>/data/`.

### Extensions

 **[GameLibrary]**

   *A library overview for your **ROM** folder.*

<br>

### Development:

*Run a local server with:* 
```
npm i
npm start
```

<br>

**>> When reporting bugs, please specify that you are using the old version**

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

### Other
    
**[PlayStation]**   | 
**[Arcade]**   | 
**[3DO]**   | 
**[MAME 2003]**
    
</div>

<br>

***PSP is not yet supported***. Some of y'all may have seen that I pushed a "beta" ppsspp core, but this core is not ready for daily use. It still crashes randomly and any games that use 3d (so like, all of them) will just have a white screen (and might just crash). Do not open issues related to the "psp" core.


<!-- 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 --->

[License]: LICENSE
[Issue]: https://github.com/ethanaobrien/emulatorjs/issues
[patreon]: https://patreon.com/EmulatorJS


<!-- 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮   Extensions   🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 --->

[GameLibrary]: https://github.com/Ramaerel/emulatorjs-GameLibrary


<!-- 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮   Quicklinks   🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 --->

[Configurator]: https://emulatorjs.org/editor.html
[Contributors]: docs/Contributors.md
[Website]: https://emulatorjs.org/
[Legacy]: https://coldcast.org/games/1/Super-Mario-Bros
[Usage]: https://emulatorjs.org/docs/
[Demo]: https://demo.emulatorjs.org/


<!-- 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮  Systems  🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 -->

[Nintendo Game Boy Advance]: https://emulatorjs.org/systems/Nintendo%20Game%20Boy%20Advance
[Nintendo Game Boy]: https://emulatorjs.org/systems/Nintendo%20Game%20Boy
[Nintendo 64]: https://emulatorjs.org/systems/Nintendo%2064
[Nintendo DS]: https://emulatorjs.org/systems/Nintendo%20DS

[Sega Master System]: https://emulatorjs.org/systems/Sega%20Master%20System
[Sega Mega Drive]: https://emulatorjs.org/systems/Sega%20Mega%20Drive
[Sega Game Gear]: https://emulatorjs.org/systems/Sega%20Game%20Gear
[Sega Saturn]: https://emulatorjs.org/systems/Sega%20Saturn
[Sega 32X]: https://emulatorjs.org/systems/Sega%2032X
[Sega CD]: https://emulatorjs.org/systems/Sega%20CD

[Atari Jaguar]: https://emulatorjs.org/systems/Atari%20Jaguar
[Atari Lynx]: https://emulatorjs.org/systems/Atari%20Lynx
[Atari 7800]: https://emulatorjs.org/systems/Atari%207800
[Atari 2600]: https://emulatorjs.org/systems/Atari%202600
[Atari 5200]: https://emulatorjs.org/systems/Atari%205200

[NES / Famicom]: https://emulatorjs.org/systems/NES-Famicom
[SNES]: https://emulatorjs.org/systems/SNES

[TurboGrafs-16 / PC Engine]: https://emulatorjs.org/systems/TurboGrafx-16
[WanderSwan / Color]: https://emulatorjs.org/systems/WonderSwan
[Neo Geo Poket]: https://emulatorjs.org/systems/Neo%20Geo%20Pocket
[PlayStation]: https://emulatorjs.org/systems/PlayStation
[Virtual Boy]: https://emulatorjs.org/systems/Virtual%20Boy
[Arcade]: https://emulatorjs.org/systems/Arcade
[MSX]: https://emulatorjs.org/systems/MSX
[3DO]: https://emulatorjs.org/systems/3DO
[MAME 2003]: https://emulatorjs.org/systems/MAME%202003


<!-- 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮  Badges  🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 🎮 --->

[Badge License]: https://img.shields.io/badge/License-GPLv3-blue.svg?style=for-the-badge

[Button Configurator]: https://img.shields.io/badge/Configurator-992cb3?style=for-the-badge
[Button Contributors]: https://img.shields.io/badge/Contributors-54b7dd?style=for-the-badge
[Button Website]: https://img.shields.io/badge/Website-736e9b?style=for-the-badge
[Button Legacy]: https://img.shields.io/badge/Legacy-ab910b?style=for-the-badge
[Button Usage]: https://img.shields.io/badge/Usage-2478b5?style=for-the-badge
[Button Demo]: https://img.shields.io/badge/Demo-528116?style=for-the-badge
[Button Beta]: https://img.shields.io/badge/Beta-bb044f?style=for-the-badge
