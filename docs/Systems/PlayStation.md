# PlayStation

## Code Example

```html
<div style='width:640px;height:480px;max-width:100%'>
    <div id='game'></div>
</div>

<script type='text/javascript'>
    EJS_player = '#game';
    
    // Can also be pcsx_rearmed or mednafen_psx_hw
    EJS_core = 'psx';
    
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
| scph5500.bin | PS1 JP BIOS - Required for JP games | `8dd7d5296a650fac7319bce665a6a53c` |
| scph5501.bin | PS1 US BIOS - Required for US games | `490f666e1afb15b7362b406ed1cea246` |
| scph5502.bin | PS1 EU BIOS - Required for EU games | `32736f17079d0b2b7024407c39bd3050` |
| PSXONPSP660.bin | Extracted from a PSP | `c53ca5908936d412331790f4426c6c33` |
| scph101.bin | Version 4.4 03/24/00 A | `6E3735FF4C7DC899EE98981385F6F3D0` |
| scph7001.bin | Version 4.1 12/16/97 A | `1e68c231d0896b7eadcad1d7d8e76129` |
| scph1001.bin | Version 2.0 05/07/95 A | `924e392ed05558ffdb115408c263dccf` |

### CORES

The *psx* system supports 2 cores
- `mednafen_psx`
- `pcsx_rearmed`

If set to `psx`, emulator will use the `pcsx_rearmed` core.

