<h2>PlayStation</h2>

Code example

```
<div style="width:640px;height:480px;max-width:100%">
        <div id="game"></div>
      </div>
<script type="text/javascript">
    EJS_player = '#game';
    EJS_biosUrl = ''; // Url to Bios file
    EJS_gameUrl = ''; // Url to Game rom
    EJS_core = 'psx';
    EJS_pathtodata = 'data/'; //path to all of the wasm and js files. MUST all be in the same directory!!
</script>
<script src="data/loader.js"></script>
```
Your rom MUST have one of the following extensions

```
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
You can find the PlayStation 1 JP BIOS by looking up the md5 sum which is `8dd7d5296a650fac7319bce665a6a53c`

You can find the PlayStation 1 US BIOS by looking up the md5 sum which is `490f666e1afb15b7362b406ed1cea246`

You can find the PlayStation 1 EU BIOS by looking up the md5 sum which is `32736f17079d0b2b7024407c39bd3050`
