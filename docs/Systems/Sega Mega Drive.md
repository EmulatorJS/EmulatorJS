# Sega Mega Drive

## Code example

```html
<div style='width:640px;height:480px;max-width:100%'>
    <div id='game'></div>
</div>

<script type='text/javascript'>

    EJS_player = '#game';
    
    // Can also be genesis_plus_gx or picodrive
    EJS_core = 'segaMD';

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

### BIOS

|  File Name  |  Description  |    md5sum   |
| ----------- | ------------- | ----------- |
| bios_MD.bin | MegaDrive TMSS startup ROM | `45e298905a08f9cfb38fd504cd6dbc84`

### CORES

The *segaMD* system supports 2 cores
- `genesis_plus_gx`
- `picodrive`

If set to `segaMD`, emulator will use the `genesis_plus_gx` core.

