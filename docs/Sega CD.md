<h2>Sega CD</h2>

Code example

```
<div style="width:640px;height:480px;max-width:100%">
        <div id="game"></div>
      </div>
<script type="text/javascript">
    EJS_player = '#game';
    EJS_gameUrl = ''; // Url to Game rom
    EJS_core = 'segaCD';
    EJS_pathtodata = 'data/'; //path to all of the wasm and js files. MUST all be in the same directory!!
</script>
<script src="data/loader.js"></script>
```

I do not know the file extension limits for this system.

You can find the MegaCD EU BIOS by looking up the md5 sum which is `e66fa1dc5820d254611fdcdba0662372`

You can find the SegaCD US BIOS by looking up the md5 sum which is `854b9150240a198070150e4566ae1290`

You can find the MegaCD EU BIOS by looking up the md5 sum which is `278a9397d192149e84e820ac621a8edd`
