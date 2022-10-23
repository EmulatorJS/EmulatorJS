# Nintendo GameBoy Advance

## Code Example

```html
<div style='width:640px;height:480px;max-width:100%'>
    <div id='game'></div>
</div>

<script type='text/javascript'>
    EJS_player = '#game';
    
    // Can also be mgba
    EJS_core = 'gba';
    
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
- `gb`
- `gbc`
- `gba`

### BIOS

|  File Name  |  Description  |    md5sum   |
| ----------- | ------------- | ----------- |
| gb_bios.bin | Game Boy BIOS - Optional  | 32fbbd84168d3482956eb3c5051637f5 |
| gbc_bios.bin | Game Boy Color BIOS - Optional | dbfce9db9deaa2567f6a84fde55f9680 |
| gba_bios.bin | Game Boy Advance BIOS - Optional  | a860e8c0b6d573d191e4ec7db1b1e4f6 |
| sgb_bios.bin | Super Game Boy BIOS - Optional  | d574d4f9c12f305074798f54c091a8b4 |

### CORES

The *gba* system supports 1 core
- `mgba`

If set to `gba`, emulator will use the `mgba` core.

