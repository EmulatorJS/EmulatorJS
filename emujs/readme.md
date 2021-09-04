<h1>欢迎使用能哥修改版</h1>
<h2>版本0.4.23</h2>
<h2>怎么用</h2>
  <p>参考代码</p>

```
        <div id="game-div">
            <div id="game"></div>
        </div>
        <script type="text/javascript">
            const EJS_player = '#game',
                EJS_gameUrl = 'rooms/宝可梦 - 比卡超.7z',// 游戏文件
                EJS_gameName = EJS_gameUrl.split('/').pop(),//游戏名
                EJS_gameID = EJS_gameName.charCodeAt(0)+EJS_gameName.charCodeAt(2)+''+EJS_gameName.length, // 游戏ID 用于联机否则忽略.
                EJS_core = 'gb',//游戏核心
                EJS_biosUrl = '';// BIOS地址 有就填写
        </script>
        <script src="Mylocalforage.js"></script>
```

<h2>文件加载情况</h2>

```
        emulator.min.js --- 首次加载就缓存
        webrtc-adapter.min.js --- 同上
        v.json --- 正式使用时远程加载
        worker/extract7z.js --- 正式使用时远程加载
        worker/extractzip.js --- 正式使用时远程加载
        worker/libunrar.js --- 正式使用时远程加载
        rooms/ --- 游戏文件地址
        roomImgs/ --- 游戏文件封面
        cores/ -- 核心文件  正式使用时远程加载
        bios/
            ---msx.7z
            ---psx.7z
            ---sega.7z
            ---segacd
            ---arcade.7z
            ---bios.gg

```
