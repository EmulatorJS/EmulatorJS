# PlayStation

## Code example

```html
<div style='width:640px;height:480px;max-width:100%'>
    <div id='game'></div>
</div>

<script type='text/javascript'>

    EJS_player = '#game';
    EJS_core = 'psx';

    // URL to Bios file

    EJS_biosUrl = '';
    
    // URL to Game rom
     
    EJS_gameUrl = '';
    
    /*
     *  Path to the WASM / JS files
     *  HAS TO BE in the same directory.
     */
    
    EJS_pathtodata = 'data/';
    
</script>

<script src='data/loader.js'></script>
```

## ROM Type

Your **ROM** can have the following types:
- `bin`
- `cue`
- `img`
- `mdf`
- `pbp`
- `toc`
- `cbn`
- `m3u`
- `ccd`

## BIOS

You can search for the BIOS you need by utilizing the **MD5** checksum.

| Type | MD5 Checksum |
|------|--------------|
| PlayStation 1 JP | `8dd7d5296a650fac7319bce665a6a53c`
| PlayStation 1 US | `490f666e1afb15b7362b406ed1cea246`
| PlayStation 1 EU | `32736f17079d0b2b7024407c39bd3050`

