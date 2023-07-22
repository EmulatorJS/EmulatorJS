# Nintendo GameBoy

## Code Example

```html
<div style='width:640px;height:480px;max-width:100%'>
    <div id='game'></div>
</div>

<script type='text/javascript'>
    EJS_player = '#game';
    
    // Can also be gambatte or mgba
    EJS_core = 'gb';
    
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
| gb_bios.bin | Game Boy BIOS - Optional  | `32fbbd84168d3482956eb3c5051637f5` |
| gbc_bios.bin | Game Boy Color BIOS - Optional | `dbfce9db9deaa2567f6a84fde55f9680` |

### CORES

The *gb* system supports 2 cores
- `gambatte`
- `mgba`

If set to `gb`, emulator will use the `gambatte` core.
