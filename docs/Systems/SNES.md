# SNES

## Code Example

```html
<div style='width:640px;height:480px;max-width:100%'>
    <div id='game'></div>
</div>

<script type='text/javascript'>
    EJS_player = '#game';
    
    // Can also be snes9x
    EJS_core = 'snes';
    
    //SNES mouse
    EJS_mouse = false; 
    
    // SNES Multitap
    EJS_multitap = false; 
    
    // URL to BIOS file
    EJS_biosUrl = '';
    
    // URL to Game rom
    EJS_gameUrl = '';
    
    // Path to the data directory
    EJS_pathtodata = 'data/';
</script>
<script src='data/loader.js'></script>
```

### BIOS

|  File Name  |  Description  |    md5sum   |
| ----------- | ------------- | ----------- |
| BS-X.bin | BS-X - Sore wa Namae o Nusumareta Machi no<br> Monogatari (Japan) (Rev 1) - Optional  | `fed4d8242cfbed61343d53d48432aced` |
| STBIOS.bin | Sufami Turbo (Japan) - Optional | `d3a44ba7d42a74d3ac58cb9c14c6a5ca` |

### CORES

The *snes* system supports 1 core
- `snes9x`

If set to `snes`, emulator will use the `snes9x` core.

