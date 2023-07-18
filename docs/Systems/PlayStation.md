# PlayStation

## Code Example

```html
<div style='width:640px;height:480px;max-width:100%'>
    <div id='game'></div>
</div>

<script type='text/javascript'>
    EJS_player = '#game';
    
    // Can also be mednafen_psx or mednafen_psx_hw
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

## ROM Type

Your **ROM** can have the following extensions:
- `cue`
- `toc`
- `m3u`
- `ccd`
- `exe`
- `pbp`
- `chd`

### BIOS

|  File Name  |  Description  |    md5sum   |
| ----------- | ------------- | ----------- |
| scph5500.bin | PS1 JP BIOS - Required for JP games | 8dd7d5296a650fac7319bce665a6a53c |
| scph5501.bin | PS1 US BIOS - Required for US games | 490f666e1afb15b7362b406ed1cea246 |
| scph5502.bin | PS1 EU BIOS - Required for EU games | 32736f17079d0b2b7024407c39bd3050 |

### CORES

The *psx* system supports 2 cores
- `mednafen_psx_hw`
- `mednafen_psx`

If set to `psx`, emulator will use the `mednafen_psx_hw` core.

