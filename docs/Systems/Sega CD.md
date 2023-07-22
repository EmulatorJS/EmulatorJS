# Sega CD

I do not know the file extension limits for this system.

## Code example

```html
<div style='width:640px;height:480px;max-width:100%'>
    <div id='game'></div>
</div>

<script type='text/javascript'>

    EJS_player = '#game';
    
    // Can also be picodrive or genesis_plus_gx
    EJS_core = 'segaCD';

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
| bios_CD_E.bin | MegaCD EU BIOS - Required | `e66fa1dc5820d254611fdcdba0662372` |
| bios_CD_U.bin | SegaCD US BIOS - Required | `2efd74e3232ff260e371b99f84024f7f` |
| bios_CD_J.bin | MegaCD JP BIOS - Required | `278a9397d192149e84e820ac621a8edd` |

### CORES

The *segaCD* system supports 2 cores
- `genesis_plus_gx`
- `picodrive`

If set to `segaCD`, emulator will use the `genesis_plus_gx` core.
