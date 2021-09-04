<h1>在线万能模拟器</h1>

WASM方式模拟 fc, sfc,ps1,gb/gbc/gba等游戏!
这是最好的网页模拟器,没有烦人的广告!

<p>演示: <a href='https://ethanaobrien.github.io/emulatorjs/'>https://ethanaobrien.github.io/emulatorjs/</a></p>

<p>演示: <a href='https://nenge.net/emulator/app/emujs/'>https://nenge.net/emulator/app/emujs/</a></p>

<p>谷歌浏览器插件<a href='https://github.com/ethanaobrien/emulatorjs-chrome-extension'>这里</a> - 不需要联网.</p>

<h1>来源</h1>

<p>我在这个网站:<a href='https://www.emulatorjs.com/'>emulatorjs</a>找到他的代码并加以编辑.</p>
<p>EMULATOR JS PEOPLE - 我没找到这个网站的条款,应该是开源的把.</p>

<p>这是模拟器,不是盗版游戏ROM,使用者如何使用,导致的法律问题与本模拟器无关.</p>


<h1>怎么用</h1>

下载此储存库 (Code > Download as zip) 然后提取内容

<p>必须在WEB服务器中托管!! (我用 <a href='https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en'>Chrome的Web服务器</a>但是你可以随意使用)</p>

<p>如果有什么问题?那么请去问问这个16岁的天才少女:<a href="https://github.com/ethanaobrien/emulatorjs/issues">https://github.com/ethanaobrien/emulatorjs/issues</a></p>

正如您所知，大多数游戏都不需要bios，即使它已列出。对于某些系统还是需要bios

ROM可以压缩到.zip或.7z格式

<p>或者打开<a href='https://www.emulatorjs.com/'>emulatorjs.com</a>. 看看他的代码示例.只需要做出轻微改动即可.</p>

<h1>支持的游戏!</h1>


<h2>代码例子</h2>

```
    <div style="width:640px;height:480px;max-width:100%">
    <div id="game"></div>
    </div>
    <script type="text/javascript">
        EJS_player = '#game';//游戏的网页元素 ID
        EJS_biosUrl = ''; // 如果需要BIOS,这里填写,否则留空,不支持跨域
        EJS_gameUrl = ''; // 游戏文件地址,不支持跨域
        EJS_core = 'nes'; //游戏核心
        EJS_lightgun = false; // Lightgun 不知道干嘛的
        EJS_pathtodata = 'data/'; //定义asm文件的地址!!
    </script>
    <script src="data/loader.js"></script>
```

<h3>NES / Famicom 又名FC 红白机</h3>

```
    EJS_core = 'nes'; //游戏核心
    扩展名格式
    .fds
    .nes
    .unif
    .unf
```

nes的可选BIOS文件的MD5是 `ca30b50f880eb660a320674ed365ef7a`
<br><br>
<h3>SNES 又名SFC 又名超级任天堂</h3>

```
    EJS_core = 'snes'; //游戏核心
    扩展名格式
    .smc
    .fig
    .sfc
    .gd3
    .gd7
    .dx2
    .bsx
    .swc
```
没有bios
<br><br>
<h3>Nintendo 64 又名N64,任天堂扑街之作</h3>

```
    EJS_core = 'n64';
    扩展名格式
    n64
    z64
```
没有bios
<br><br>
<h3>Nintendo Game Boy/Color 这是游戏界的大哥大,土豪的象征,彩色版又叫彩game</h3>

```
    EJS_core = 'gb';
```
gb的可选BIOS文件的MD5是 `32fbbd84168d3482956eb3c5051637f5`
gbc的可选BIOS文件的MD5是 `dbfce9db9deaa2567f6a84fde55f9680`
<br><br>
<h3>Nintendo Game Boy Advance</h3>

```
    EJS_core = 'gba';
```
gba的可选BIOS文件的MD5是 `	a860e8c0b6d573d191e4ec7db1b1e4f6`

gb的可选BIOS文件的MD5是`	32fbbd84168d3482956eb3c5051637f5`

gbc的可选BIOS文件的MD5是 `dbfce9db9deaa2567f6a84fde55f9680`

sgb的可选BIOS文件的MD5是 `d574d4f9c12f305074798f54c091a8b4`
<br><br>
<h3>Nintendo DS</h3>

```
    EJS_core = 'nds';
```
没有bios文件
<br><br>
<h3>PlayStation</h3>

```
    EJS_core = 'psx';
    扩展名
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
ps1 的可选JP BIOS文件的MD5是 `8dd7d5296a650fac7319bce665a6a53c`

PS1 的可选US BIOS文件的MD5是 `490f666e1afb15b7362b406ed1cea246`

PS1 的可选EU BIOS文件的MD5是 `32736f17079d0b2b7024407c39bd3050`
<br><br>
<h3>Arcade</h3>

```
    EJS_core = 'arcade';
```
使用libretro核心 FBA v0.2.97.42 ROMs set
重要! 所有ROM必须在扩展名为的支持列表中使用相同的名称.zip

neogeo.zip	Required for Neo Geo Games	        `410c65b2debdf4f2dac9ea2b23aa496e`

pgm.zip	    Required for IGS Games	            `653e991a39e867354d090c3394157d1c`

isgsm.zip	ISG Selection Master Type 2006 BIOS	`4a56d56e2219c5e2b006b66a4263c01c`
<br><br>
<h3>Virtual Boy</h3>

```
    EJS_core = 'vb';
```
<br><br>
<h3>Sega Mega Drive</h3>

```
    EJS_core = 'segaMD';
```
<br><br>
<h3>Sega CD</h3>

```
    EJS_core = 'segaCD';
```
MegaCD 的可选EU BIOS文件的MD5是 `e66fa1dc5820d254611fdcdba0662372`

SegaCD 的可选US BIOS文件的MD5是 `854b9150240a198070150e4566ae1290`

MegaCD 的可选EU BIOS文件的MD5是 `278a9397d192149e84e820ac621a8edd`
<br><br>
<h3>Atari Lynx</h3>

```
    EJS_core = 'lynx';
```
<br><br>
<h3>MSX</h3>

```
    EJS_core = 'msx';
```
<p>You can download the 'Databases' and 'Machines' folders from an <a href='http://bluemsx.msxblue.com/download.html'>official full standalone blueMSX emulator installation.</a> Get blueMSXv282full.zip near the bottom of the page.</p>
Compress the 'Databases' and 'Machines' Folders to 7z or zip archive.
<br><br>
<h3>3DO</h3>

```
    EJS_core = '3do';
    游戏扩展名
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
<h3>Sega 32X</h3>

```
    EJS_core = 'sega32x';
```
<br><br>
<h3>Atari Jaguar</h3>

```
    EJS_core = 'jaguar';
```
<br><br>
<h3>Neo Geo Poket</h3>

```
    EJS_core = 'ngp';
```
<br><br>
<h3>Sega Game Gear</h3>

```
    EJS_core = 'segaGG';
```
GameGear BIOS (bootrom) - Optional	`672e104c3be3a238301aceffc3b23fd6`
<br><br>
<h3>Sega Saturn</h3>

```
    EJS_core = 'segaSaturn';
```
Saturn BIOS - Optional	`af5828fdff51384f99b3c4926be27762`
<br><br>
<h3>Atari 7800</h3>

```
    EJS_core = 'atari7800';
```
<br><br>
<h3>Wanderswan | Color</h3>

```
    EJS_core = 'ws';
```
<br><br>
<h3>TurboGrafs-16 | PC Engine</h3>

```
    EJS_core = 'pce';
```
syscard3.pce	Super CD-ROM2 System V3.xx - Required	`38179df8f4ac870017db21ebcbf53114`
