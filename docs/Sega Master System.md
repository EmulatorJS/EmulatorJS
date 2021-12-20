<h2>Sega Master System</h2>

Code example

```
<div style="width:640px;height:480px;max-width:100%">
        <div id="game"></div>
      </div>
<script type="text/javascript">
    EJS_player = '#game';
    EJS_gameUrl = ''; // Url to Game rom
    EJS_core = 'segaMS';
    EJS_pathtodata = 'data/'; //path to all of the wasm and js files. MUST all be in the same directory!!
</script>
<script src="data/loader.js"></script>
```

I do not know the file extension limits for this system.

bios_E.sms :	MasterSystem EU BIOS (bootrom) - Optional	840481177270d5642a14ca71ee72844c

bios_U.sms : MasterSystem US BIOS (bootrom) - Optional	840481177270d5642a14ca71ee72844c

bios_J.sms : MasterSystem JP BIOS (bootrom) - Optional	24a519c53f67b00640d0048ef7089105
