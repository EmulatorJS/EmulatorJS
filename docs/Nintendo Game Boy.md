<h2>Nintendo Game Boy</h2>

Code example

```
<div style="width:640px;height:480px;max-width:100%">
        <div id="game"></div>
      </div>
<script type="text/javascript">
    EJS_player = '#game';
    EJS_biosUrl = '';
    EJS_gameUrl = ''; // Url to Game rom
    EJS_core = 'gb';
    EJS_pathtodata = 'data/'; //path to all of the wasm and js files. MUST all be in the same directory!!
</script>
<script src="data/loader.js"></script>
```

I do not know the file extension limits for this system.

You can find the Game Boy BIOS by looking up the md5 sum which is `32fbbd84168d3482956eb3c5051637f5`

You can find the Game Boy Color BIOS by looking up the md5 sum which is `dbfce9db9deaa2567f6a84fde55f9680`
