<h1>欢迎使用能哥修改版 Nenge modified versions</h1>
<h2>版本/Version 0.4.23</h2>
<h2>怎么用</h2>
  <p>参考代码</p>

```
        <div id="game-div">
            <div id="game"></div>
        </div>
        <script type="text/javascript">
            const EJS_player = '#game',
                EJS_gameUrl = 'rooms/宝可梦 - 比卡超.7z',// 游戏文件 game url
                EJS_gameName = EJS_gameUrl.split('/').pop(),//游戏名 games name
                EJS_gameID = EJS_gameName.charCodeAt(0)+EJS_gameName.charCodeAt(2)+''+EJS_gameName.length, // 游戏ID 用于联机否则忽略.game id ,not need network will unuse.
                EJS_core = 'gb',//游戏核心 games cores
                EJS_biosUrl = '';// BIOS地址 有就填写 options bios 
        </script>
        <script src="Mylocalforage.js"></script>
```

<h2>文件加载情况</h2>

```
        emulator.min.js --- 首次加载就缓存
        webrtc-adapter.min.js --- 同上 https://www.emulatorjs.com/webrtc-adapter.js
        v.json --- 正式使用时远程加载 https://www.emulatorjs.com/v.json
        worker/extract7z.min.js --- 正式使用时远程加载/server will load on https://www.emulatorjs.com/worker/extract7z.js
        worker/extractzip.min.js --- 正式使用时远程加载/server will load on https://www.emulatorjs.com/worker/extractzip.js
        worker/libunrar.min.js --- 正式使用时远程加载/server will load on https://www.emulatorjs.com/worker/libunrar.js
        worker/libunrar.js.mem --- 正式使用时远程加载/server will load on https://www.emulatorjs.com/worker/libunrar.js.mem
        rooms/ --- 游戏文件地址 rooms address
        roomImgs/ --- 游戏文件封面 rooms cover address
        cores/ -- 核心文件  正式使用时远程加载 https://www.emulatorjs.com/cores/ see root dir "cores"
        bios/  -- you can down on https://www.retrogames.cc/bios/
            ---msx.7z 
            ---psx.7z
            ---sega.7z
            ---segacd
            ---arcade.7z
            ---bios.gg

```
