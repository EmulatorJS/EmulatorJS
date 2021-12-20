<h2>Arcade</h2>

Code example

```
<div style="width:640px;height:480px;max-width:100%">
        <div id="game"></div>
      </div>
<script type="text/javascript">
    EJS_player = '#game';
    EJS_biosUrl = ''; // Url to Bios file
    EJS_gameUrl = ''; // Url to Game rom
    EJS_core = 'arcade';
    EJS_pathtodata = 'data/'; //path to all of the wasm and js files. MUST all be in the same directory!!
</script>
<script src="data/loader.js"></script>
```

Use only FBA v0.2.97.42 ROMs set
Important! all roms must use the same name at support list with extension .zip

neogeo.zip	Required for Neo Geo Games	        `410c65b2debdf4f2dac9ea2b23aa496e`

pgm.zip	    Required for IGS Games	            `653e991a39e867354d090c3394157d1c`

isgsm.zip	ISG Selection Master Type 2006 BIOS	`4a56d56e2219c5e2b006b66a4263c01c`
