<h2>Sega Game Gear</h2>

Code example

```
<div style="width:640px;height:480px;max-width:100%">
        <div id="game"></div>
      </div>
<script type="text/javascript">
    EJS_player = '#game';
    EJS_gameUrl = ''; // Url to Game rom
    EJS_core = 'segaGG';
    EJS_pathtodata = 'data/'; //path to all of the wasm and js files. MUST all be in the same directory!!
</script>
<script src="data/loader.js"></script>
```

I do not know the file extension limits for this system.

GameGear BIOS (bootrom) - Optional	`672e104c3be3a238301aceffc3b23fd6`
