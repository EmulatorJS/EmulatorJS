<h1>欢迎使用能哥修改版 Nenge modified versions</h1>
<h2>版本/Version 0.4.23</h2>
<h2>怎么用 HOW to Use</h2>
  <p>参考代码 exmple code</p>

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
        <script src="Mylocalforage.min.js"></script>
```

<h2>文件加载情况 file on load</h2>

<h4>百度一下:localforage 这个文件底部写着如何加载文件 ,you can google know how to user,under the file is it how load/show/update  jsfile/gamefile cache.</h4>

```
        Mylocalforage.min.js
```

<h4>首次加载就缓存的文件,里面含有如何加载文件以及修改显示文字, cache well it on load once, you can open replace some chinese word in this file.</h4>

```
        emulator.min.js
```
<h4> cache well it on load once ,本地测试需要下载下来 https://www.emulatorjs.com/webrtc-adapter.js</h4>

```
        webrtc-adapter.min.js
```
<h4>本地测试需要下载下来 https://www.emulatorjs.com/v.json</h4>

```
        v.json
```
<h4>本地测试需要下载下来/server will load on https://www.emulatorjs.com/worker/extract7z.js</h4>

```
        worker/extract7z.min.js
```
<h4>本地测试需要下载下来/server will load on https://www.emulatorjs.com/worker/extractzip.js</h4>

```
        worker/extractzip.min.js
```
<h4>本地测试需要下载下来/server will load on https://www.emulatorjs.com/worker/libunrar.js</h4>

```
        worker/libunrar.min.js
```
<h4>正式使用时本地测试需要下载下来远程加载/server will load on https://www.emulatorjs.com/worker/libunrar.js.mem</h4>

```
        worker/libunrar.js.mem
```
<h4>游戏文件地址 rooms address</h4>

```
        rooms/
```
<h4>游戏文件封面 rooms cover address</h4>

```
        roomImgs/
```
<h4>核心文件  正式使用时远程加载 https://www.emulatorjs.com/cores/ see root dir "cores"</h4>

```
        cores/
```
<h4>你可以到这里下载 you can down on https://www.retrogames.cc/bios/</h4>

```
        bios/  
            ---msx.7z 
            ---psx.7z
            ---sega.7z
            ---segacd
            ---arcade.7z
            ---bios.gg

```
